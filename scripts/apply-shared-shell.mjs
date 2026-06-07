import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const markers = {
  header: {
    start: "<!-- SHARED-HEADER:START -->",
    end: "<!-- SHARED-HEADER:END -->",
  },
  footer: {
    start: "<!-- SHARED-FOOTER:START -->",
    end: "<!-- SHARED-FOOTER:END -->",
  },
};

const currentKeys = [
  "START",
  "THEORY",
  "RESEARCH",
  "NOTES",
  "AI_GOVERNANCE",
  "ARCHIVE",
  "ABOUT",
  "SUBSCRIBE",
];

const targets = [
  { file: "index.html", root: "", current: "" },
  { file: "start-here.html", root: "", current: "START" },
  { file: "about.html", root: "", current: "ABOUT" },
  { file: "papers.html", root: "", current: "RESEARCH" },
  { file: "notes/index.html", root: "../", current: "NOTES" },
  { file: "pages/human-agency-preservation-infrastructure.html", root: "../", current: "AI_GOVERNANCE" },
  { file: "pages/alignment-governance-stack.html", root: "../", current: "AI_GOVERNANCE" },
];

const headerTemplate = readUtf8("assets/fragments/site-header.html");
const footerTemplate = readUtf8("assets/fragments/site-footer.html");

for (const target of targets) {
  const absolutePath = path.join(repoRoot, target.file);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Shared shell target is missing: ${target.file}`);
  }

  const original = fs.readFileSync(absolutePath, "utf8");
  const eol = original.includes("\r\n") ? "\r\n" : "\n";
  const header = renderFragment(headerTemplate, target, eol);
  const footer = renderFragment(footerTemplate, target, eol);

  let next = replaceRegion(original, markers.header, header, target.file, eol);
  next = replaceRegion(next, markers.footer, footer, target.file, eol);

  if (next !== original) {
    fs.writeFileSync(absolutePath, next, "utf8");
  }
}

function readUtf8(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Shared shell fragment is missing: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function renderFragment(template, target, eol) {
  let rendered = template
    .replace(/\r\n|\n/g, "\n")
    .replaceAll("{{ROOT}}", target.root);

  for (const key of currentKeys) {
    const attribute = key === target.current ? ' aria-current="page"' : "";
    rendered = rendered.replaceAll(`{{CURRENT_${key}}}`, attribute);
  }

  const leftover = rendered.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error(`Unresolved shared shell placeholder in ${target.file}: ${leftover.join(", ")}`);
  }

  return rendered.replace(/\n/g, eol);
}

function replaceRegion(html, marker, rendered, file, eol) {
  const startIndex = html.indexOf(marker.start);
  const endIndex = html.indexOf(marker.end);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Shared shell markers missing in ${file}: ${marker.start} / ${marker.end}`);
  }

  if (html.indexOf(marker.start, startIndex + marker.start.length) !== -1) {
    throw new Error(`Duplicate shared shell start marker in ${file}: ${marker.start}`);
  }

  if (html.indexOf(marker.end, endIndex + marker.end.length) !== -1) {
    throw new Error(`Duplicate shared shell end marker in ${file}: ${marker.end}`);
  }

  if (endIndex < startIndex) {
    throw new Error(`Shared shell markers are out of order in ${file}: ${marker.start}`);
  }

  const before = html.slice(0, startIndex + marker.start.length);
  const after = html.slice(endIndex);
  return `${before}${eol}${rendered}${eol}${after}`;
}
