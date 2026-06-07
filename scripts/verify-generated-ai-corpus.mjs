import fs from "node:fs";
import path from "node:path";
import { generatedAiCorpusRoutes } from "./generated-ai-corpus-routes.mjs";

const root = process.cwd();
const pagesDir = path.join(root, "pages");
const siteUrl = "https://alignmenttheory.org";

const failures = [];

const fail = (message) => {
  failures.push(message);
};

const files = new Set();
const canonicalPaths = new Set();

for (const route of generatedAiCorpusRoutes) {
  if (files.has(route.file)) {
    fail(`Duplicate generated route file entry: ${route.file}`);
  }
  files.add(route.file);

  if (canonicalPaths.has(route.canonicalPath)) {
    fail(`Duplicate generated canonical path entry: ${route.canonicalPath}`);
  }
  canonicalPaths.add(route.canonicalPath);
}

for (const route of generatedAiCorpusRoutes) {
  const filePath = path.join(pagesDir, route.file);
  if (!fs.existsSync(filePath)) {
    fail(`Missing generated corpus file: pages/${route.file}`);
    continue;
  }

  const html = fs.readFileSync(filePath, "utf8");
  const canonicalTags = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map((match) => match[0]);

  if (canonicalTags.length !== 1) {
    fail(`Expected exactly one canonical tag in pages/${route.file}; found ${canonicalTags.length}`);
  } else {
    const href = canonicalTags[0].match(/\bhref="([^"]+)"/i)?.[1];
    const expected = `${siteUrl}${route.canonicalPath}`;
    if (!href) {
      fail(`Canonical tag is missing href in pages/${route.file}`);
    } else if (!href.startsWith(`${siteUrl}/`)) {
      fail(`Canonical URL is not absolute on alignmenttheory.org in pages/${route.file}: ${href}`);
    } else if (href !== expected) {
      fail(`Canonical URL mismatch in pages/${route.file}: expected ${expected}, found ${href}`);
    }
  }

  if (!/<body\b[^>]*class="[^"]*\bgenerated-ai-corpus-page\b[^"]*"/i.test(html)) {
    fail(`Missing generated-ai-corpus-page body class in pages/${route.file}`);
  }
}

const hubPath = path.join(pagesDir, "ai-alignment-research.html");
if (fs.existsSync(hubPath)) {
  const hub = fs.readFileSync(hubPath, "utf8");
  const requiredHubLinks = [
    "human-agency-preservation-infrastructure.html",
    "alignment-governance-stack.html",
    "../projects/agent-action-gate.html",
  ];

  for (const link of requiredHubLinks) {
    if (!hub.includes(`href="${link}"`)) {
      fail(`AI Governance hub is missing link: ${link}`);
    }
  }
}

if (failures.length) {
  console.error("Generated AI corpus verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Verified ${generatedAiCorpusRoutes.length} generated AI corpus routes.`);
console.log("Canonical tags are unique, absolute, and route-matched.");
console.log("Generated corpus body class is present.");
console.log("AI Governance hub links to HAPI, AGS, and AAG.");
