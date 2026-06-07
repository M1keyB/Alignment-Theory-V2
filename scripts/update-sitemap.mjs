import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://alignmenttheory.org";
const updateDate = "2026-05-06";

const allHtmlFiles = () => {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
      if (entry.name === ".git" || entry.name === "node_modules") continue;
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(rel);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        out.push(rel.replace(/\\/g, "/"));
      }
    }
  };

  walk(".");
  return out
    .map((file) => file.replace(/^\.\//, ""))
    .filter((file) => !file.startsWith("assets/fragments/"))
    .sort();
};

const urlFor = (file) => {
  if (file === "index.html") return `${site}/`;
  return `${site}/${file.replace(/\\/g, "/")}`;
};

const escapeHtml = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const sitemapPriority = (file) => {
  if (file === "index.html") return "1.0";
  if (["start-here.html", "core-constraints.html", "convergence-map.html", "applications.html", "ai-alignment.html"].includes(file)) return "0.95";
  if (["burnout-over-endurance.html", "papers.html", "about.html", "contact.html"].includes(file)) return "0.9";
  if (file.startsWith("pages/") || file.startsWith("projects/")) return "0.65";
  return "0.5";
};

const sitemapFiles = allHtmlFiles();
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map((file) => `  <url>
    <loc>${escapeHtml(urlFor(file))}</loc>
    <lastmod>${updateDate}</lastmod>
    <priority>${sitemapPriority(file)}</priority>
  </url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemapXml, "utf8");
console.log(`Generated sitemap.xml with ${sitemapFiles.length} HTML pages.`);
