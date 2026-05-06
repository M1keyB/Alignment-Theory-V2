import fs from "fs";
import path from "path";

const root = process.cwd();

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(rel));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(rel.replace(/\\/g, "/").replace(/^\.\//, ""));
    }
  }
  return out;
};

const files = walk(".");
const requiredTokens = [
  "<title>",
  'name="description"',
  'rel="canonical"',
  'name="author"',
  'name="dcterms.date"',
  'name="license"',
  'property="og:title"',
  'property="og:site_name"',
  'name="twitter:card"',
  "application/ld+json",
];

const metadataIssues = [];
const linkIssues = [];

for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), "utf8");

  for (const token of requiredTokens) {
    if (!html.includes(token)) metadataIssues.push(`${file} missing ${token}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(raw)) continue;

    const clean = raw.split("#")[0].split("?")[0];
    if (!clean) continue;

    const target = clean.startsWith("/")
      ? clean.slice(1)
      : path.normalize(path.join(path.dirname(file), clean)).replace(/\\/g, "/");

    const normalized = target || "index.html";
    if (!fs.existsSync(path.join(root, normalized))) {
      linkIssues.push(`${file} -> ${raw} (${normalized})`);
    }
  }
}

JSON.parse(fs.readFileSync(path.join(root, "ai-summary.json"), "utf8"));

if (metadataIssues.length || linkIssues.length) {
  if (metadataIssues.length) {
    console.error("Metadata issues:");
    console.error(metadataIssues.join("\n"));
  }
  if (linkIssues.length) {
    console.error("Missing local link targets:");
    console.error(linkIssues.join("\n"));
  }
  process.exit(1);
}

console.log(`Verified ${files.length} HTML pages.`);
console.log("Required metadata and JSON-LD are present.");
console.log("Local href/src targets exist.");
console.log("ai-summary.json is valid JSON.");
