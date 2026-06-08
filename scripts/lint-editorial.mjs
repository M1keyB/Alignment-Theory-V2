import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  editorialSourceFiles,
  excludedDirectories,
  generatedSourceFiles,
  historicalHtmlRoots,
  protectedVocabulary,
  strictPublicSurfaces,
} from "./editorial-lint-config.mjs";

const root = process.cwd();
const writeBaseline = process.argv.includes("--write-baseline");

const normalizePath = (filePath) => filePath.split(path.sep).join("/");
const toAbsolute = (filePath) => path.join(root, filePath);
const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, " ").trim();
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function readText(filePath) {
  return fs.readFileSync(toAbsolute(filePath), "utf8");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [header, ...records] = rows.filter((record) => record.some(Boolean));
  const keys = header.map((value) => value.trim());

  return records.map((record) =>
    Object.fromEntries(keys.map((key, index) => [key, (record[index] ?? "").trim()])),
  );
}

function csvEntries() {
  const records = parseCsv(readText(editorialSourceFiles.csv));
  const seen = new Set();

  return records
    .map((record) => ({
      category: record.category,
      term: record.term_or_pattern,
      instruction: record.instruction,
    }))
    .filter((entry) => entry.category && entry.term)
    .filter((entry) => {
      const key = `${normalizeText(entry.category)}|${normalizeText(entry.term)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function classifyEntry(entry) {
  const category = entry.category.toLowerCase();
  if (category.includes("hard-ban")) return "hard-ban";
  if (category.includes("review")) return "review";
  return "review";
}

function termRegex(term) {
  const cleaned = term.trim();
  if (/^load[-\s\u2010\u2011\u2012\u2013\u2014]bearing$/i.test(cleaned)) {
    return /\bload[-\s\u2010\u2011\u2012\u2013\u2014]bearing\b/gi;
  }

  if (cleaned.includes("___")) {
    const parts = cleaned.split("___").map((part) => escapeRegex(part.trim()));
    const pattern = parts
      .filter(Boolean)
      .map((part) => part.replace(/\\ /g, "\\s+"))
      .join("[\\s\\S]{0,180}");
    return new RegExp(pattern, "gi");
  }

  const escaped = escapeRegex(cleaned).replace(/\\ /g, "\\s+");
  const isWord = /^[A-Za-z][A-Za-z'-]*$/.test(cleaned);
  const prefix = isWord ? "\\b" : "";
  const suffix = isWord ? "\\b" : "";
  return new RegExp(`${prefix}${escaped}${suffix}`, "gi");
}

function stripHtml(raw) {
  return raw
    .replace(/<script\b[\s\S]*?<\/script>/gi, "\n")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "\n")
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, "\n")
    .replace(/<code\b[\s\S]*?<\/code>/gi, "\n")
    .replace(/<!--[\s\S]*?-->/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/g, '"')
    .replace(/&lsquo;|&rsquo;|&#8216;|&#8217;/g, "'");
}

function lineNumberAt(text, offset) {
  let line = 1;
  for (let index = 0; index < offset; index += 1) {
    if (text[index] === "\n") line += 1;
  }
  return line;
}

function contextAt(text, offset, length) {
  const start = Math.max(0, offset - 90);
  const end = Math.min(text.length, offset + length + 90);
  return text
    .slice(start, end)
    .replace(/\s+/g, " ")
    .trim();
}

function fingerprint({ file, matchedEntry, context }) {
  return crypto
    .createHash("sha1")
    .update(`${normalizePath(file)}|${normalizeText(matchedEntry)}|${normalizeText(context)}`)
    .digest("hex");
}

function loadJson(filePath, fallback) {
  const absolute = toAbsolute(filePath);
  if (!fs.existsSync(absolute)) return fallback;
  return JSON.parse(fs.readFileSync(absolute, "utf8"));
}

function loadExceptions() {
  const data = loadJson(editorialSourceFiles.exceptions, { version: 1, exceptions: [] });
  return (data.exceptions ?? []).filter((exception) => exception.status !== "inactive");
}

function isExcepted(finding, exceptions) {
  return exceptions.some((exception) => {
    if (normalizePath(exception.file ?? "") !== finding.file) return false;
    if (normalizeText(exception.matchedEntry ?? "") !== normalizeText(finding.matchedEntry)) return false;
    if (!exception.anchor) return false;
    return normalizeText(finding.context).includes(normalizeText(exception.anchor));
  });
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(toAbsolute(dir), { withFileTypes: true })) {
    const relative = normalizePath(path.join(dir, entry.name));
    if (entry.isDirectory()) {
      if (excludedDirectories.includes(relative) || excludedDirectories.includes(entry.name)) continue;
      walk(relative, files);
    } else {
      files.push(relative);
    }
  }
  return files;
}

function historicalHtmlFiles() {
  const files = new Set();
  for (const dir of historicalHtmlRoots) {
    if (!fs.existsSync(toAbsolute(dir))) continue;
    for (const file of walk(dir)) {
      if (file.endsWith(".html")) files.add(file);
    }
  }
  return [...files].sort();
}

function collectTargets() {
  const strict = new Set(strictPublicSurfaces.filter((file) => fs.existsSync(toAbsolute(file))));
  const generatedSource = new Set(generatedSourceFiles.filter((file) => fs.existsSync(toAbsolute(file))));
  const archive = historicalHtmlFiles().filter((file) => !strict.has(file));

  return [
    ...[...strict].map((file) => ({ file, scope: "strict-public", kind: "html" })),
    ...[...generatedSource].map((file) => ({ file, scope: "generated-source", kind: "source" })),
    ...archive.map((file) => ({ file, scope: "archive", kind: "html" })),
  ];
}

function scanFile(target, entries, protectedTerms, exceptions) {
  const raw = readText(target.file);
  const text = target.kind === "html" ? stripHtml(raw) : raw;
  const findings = [];

  for (const entry of entries) {
    const severity = classifyEntry(entry);
    const isProtected =
      severity === "review" && protectedTerms.has(normalizeText(entry.term));
    const regex = termRegex(entry.term);
    let match;

    while ((match = regex.exec(text)) !== null) {
      const context = contextAt(text, match.index, match[0].length);
      const finding = {
        file: target.file,
        scope: target.scope,
        severity: isProtected ? "protected" : severity,
        category: entry.category,
        matchedEntry: entry.term,
        match: match[0],
        line: lineNumberAt(text, match.index),
        context,
      };
      finding.fingerprint = fingerprint(finding);
      finding.excepted = isExcepted(finding, exceptions);
      findings.push(finding);

      if (match.index === regex.lastIndex) regex.lastIndex += 1;
    }
  }

  return findings;
}

function formatFinding(finding) {
  const marker = finding.excepted ? " excepted" : "";
  return `${finding.file}:${finding.line} [${finding.scope}/${finding.severity}${marker}] ${finding.matchedEntry} :: ${finding.context}`;
}

function writeBaselineFile(findings) {
  const baselineFindings = findings
    .filter((finding) => finding.scope === "archive")
    .filter((finding) => finding.severity === "hard-ban")
    .filter((finding) => !finding.excepted)
    .map((finding) => ({
      fingerprint: finding.fingerprint,
      file: finding.file,
      term: finding.matchedEntry,
      category: finding.category,
      line: finding.line,
      context: finding.context,
    }))
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.term.localeCompare(b.term));

  const data = {
    version: 1,
    generatedAt: new Date().toISOString(),
    scope: "Historical archive hard-ban findings only. Routine lint must not rewrite this file.",
    count: baselineFindings.length,
    findings: baselineFindings,
  };

  fs.writeFileSync(toAbsolute(editorialSourceFiles.baseline), `${JSON.stringify(data, null, 2)}\n`);
  return data;
}

function report(findings, baseline) {
  const active = findings.filter((finding) => !finding.excepted);
  const strictHard = active.filter(
    (finding) =>
      (finding.scope === "strict-public" || finding.scope === "generated-source") &&
      finding.severity === "hard-ban",
  );
  const strictReview = active.filter(
    (finding) =>
      (finding.scope === "strict-public" || finding.scope === "generated-source") &&
      finding.severity === "review",
  );
  const protectedFindings = active.filter((finding) => finding.severity === "protected");
  const archiveHard = active.filter(
    (finding) => finding.scope === "archive" && finding.severity === "hard-ban",
  );
  const archiveReview = active.filter(
    (finding) => finding.scope === "archive" && finding.severity === "review",
  );

  const baselineFingerprints = new Set((baseline.findings ?? []).map((finding) => finding.fingerprint));
  const currentArchiveHardFingerprints = new Set(archiveHard.map((finding) => finding.fingerprint));
  const newArchiveHard = archiveHard.filter((finding) => !baselineFingerprints.has(finding.fingerprint));
  const prunableBaseline = (baseline.findings ?? []).filter(
    (finding) => !currentArchiveHardFingerprints.has(finding.fingerprint),
  );

  console.log("Editorial lint report");
  console.log(`Strict hard-ban violations: ${strictHard.length}`);
  console.log(`Strict review matches: ${strictReview.length}`);
  console.log(`Archive hard-ban findings covered by baseline: ${archiveHard.length - newArchiveHard.length}`);
  console.log(`New archive hard-ban findings: ${newArchiveHard.length}`);
  console.log(`Archive review matches: ${archiveReview.length}`);
  console.log(`Protected-term matches: ${protectedFindings.length}`);
  console.log(`Exceptions applied: ${findings.filter((finding) => finding.excepted).length}`);
  console.log(`Prunable baseline entries: ${prunableBaseline.length}`);

  const protectedCounts = new Map();
  for (const finding of protectedFindings) {
    protectedCounts.set(finding.matchedEntry, (protectedCounts.get(finding.matchedEntry) ?? 0) + 1);
  }

  if (protectedCounts.size > 0) {
    console.log("\nProtected-term frequency:");
    for (const [term, count] of [...protectedCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
      console.log(`  ${term}: ${count}`);
    }
  }

  if (strictHard.length > 0) {
    console.log("\nStrict hard-ban violations:");
    for (const finding of strictHard.slice(0, 80)) console.log(formatFinding(finding));
  }

  if (newArchiveHard.length > 0) {
    console.log("\nNew archive hard-ban findings:");
    for (const finding of newArchiveHard.slice(0, 80)) console.log(formatFinding(finding));
  }

  if (strictReview.length > 0) {
    console.log("\nStrict review sample:");
    for (const finding of strictReview.slice(0, 40)) console.log(formatFinding(finding));
  }

  return {
    strictHard,
    strictReview,
    archiveHard,
    archiveReview,
    newArchiveHard,
    prunableBaseline,
    protectedFindings,
  };
}

const entries = csvEntries();
const exceptions = loadExceptions();
const protectedTerms = new Set(protectedVocabulary.map(normalizeText));
const targets = collectTargets();
const findings = targets.flatMap((target) => scanFile(target, entries, protectedTerms, exceptions));

if (writeBaseline) {
  const baseline = writeBaselineFile(findings);
  console.log(`Wrote ${editorialSourceFiles.baseline}`);
  console.log(`Historical archive hard-ban baseline count: ${baseline.count}`);
  process.exit(0);
}

const baseline = loadJson(editorialSourceFiles.baseline, { version: 1, findings: [] });
const result = report(findings, baseline);

if (result.strictHard.length > 0 || result.newArchiveHard.length > 0) {
  process.exit(1);
}
