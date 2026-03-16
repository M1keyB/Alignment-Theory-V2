const fs = require("fs");
const path = require("path");

const root = process.cwd();
const readText = (filePath) => fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\"/g, "&quot;")
  .replace(/'/g, "&#39;");

const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

const buildInlineRenderer = (footnotes, citationState, options = {}) => {
  const allowFootnotes = options.allowFootnotes !== false;
  const pattern = allowFootnotes
    ? /\[\^([^\]]+)\]|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g
    : /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

  return (value) => {
    let html = "";
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(value)) !== null) {
      html += escapeHtml(value.slice(lastIndex, match.index));

      if (allowFootnotes && match[1]) {
        const footnoteId = match[1];
        const definition = footnotes[footnoteId];

        if (!definition) {
          html += escapeHtml(match[0]);
        } else {
          if (!citationState.lookup[footnoteId]) {
            citationState.order.push(footnoteId);
            citationState.lookup[footnoteId] = citationState.order.length;
          }

          citationState.anchorCounts[footnoteId] = (citationState.anchorCounts[footnoteId] || 0) + 1;
          const anchorId = `cite-${slugify(footnoteId)}-${citationState.anchorCounts[footnoteId]}`;

          if (!citationState.firstAnchor[footnoteId]) {
            citationState.firstAnchor[footnoteId] = anchorId;
          }

          html += `<sup class="citation"><a href="#ref-${slugify(footnoteId)}" id="${anchorId}">[${citationState.lookup[footnoteId]}]</a></sup>`;
        }
      } else {
        const label = match[allowFootnotes ? 2 : 1];
        const href = match[allowFootnotes ? 3 : 2];
        html += `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
      }

      lastIndex = pattern.lastIndex;
    }

    html += escapeHtml(value.slice(lastIndex));
    return html;
  };
};

const extractFootnotes = (lines) => {
  const footnotes = {};
  const contentLines = [];

  lines.forEach((line) => {
    const footnoteMatch = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (footnoteMatch) {
      footnotes[footnoteMatch[1]] = footnoteMatch[2].trim();
      return;
    }

    contentLines.push(line);
  });

  return { footnotes, contentLines };
};

const buildReferences = (footnotes, citationState) => {
  if (!citationState.order.length) return "";

  const renderReferenceInline = buildInlineRenderer(footnotes, citationState, { allowFootnotes: false });
  const items = citationState.order.map((footnoteId) => {
    const refId = `ref-${slugify(footnoteId)}`;
    const backlink = citationState.firstAnchor[footnoteId]
      ? ` <a class="reference-backlink" href="#${citationState.firstAnchor[footnoteId]}" aria-label="Back to citation">↩</a>`
      : "";

    return `<li id="${refId}">${renderReferenceInline(footnotes[footnoteId])}${backlink}</li>`;
  }).join("");

  return `
        <section class="references" aria-labelledby="references-title">
          <h2 id="references-title">References</h2>
          <ol>
            ${items}
          </ol>
        </section>`;
};

const renderMarkdown = (markdown) => {
  const normalizedLines = markdown.replace(/\r\n/g, "\n").split("\n");
  const { footnotes, contentLines } = extractFootnotes(normalizedLines);
  const lines = contentLines;
  let html = "";
  let buffer = [];
  let inList = false;
  let inCode = false;
  let codeLang = "";
  const citationState = {
    order: [],
    lookup: {},
    anchorCounts: {},
    firstAnchor: {},
  };
  const renderInline = buildInlineRenderer(footnotes, citationState);

  const flushParagraph = () => {
    if (!buffer.length) return;
    html += `\n        <p>${renderInline(buffer.join(" "))}</p>`;
    buffer = [];
  };

  const closeList = () => {
    if (inList) {
      html += "\n        </ul>";
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      if (!inCode) {
        flushParagraph();
        closeList();
        inCode = true;
        codeLang = escapeHtml(line.slice(3).trim());
        html += `\n        <pre><code data-lang="${codeLang}">`;
      } else {
        html += "</code></pre>";
        inCode = false;
        codeLang = "";
      }
      continue;
    }

    if (inCode) {
      html += `${escapeHtml(rawLine)}\n`;
      continue;
    }

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      html += `\n        <h${level} id="${id}">${renderInline(text)}</h${level}>`;
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!inList) {
        html += "\n        <ul>";
        inList = true;
      }
      html += `\n          <li>${renderInline(listMatch[1])}</li>`;
      continue;
    }

    buffer.push(line);
  }

  flushParagraph();
  closeList();

  if (inCode) {
    html += "</code></pre>";
  }

  html += buildReferences(footnotes, citationState);

  return `${html}\n      `;
};

const libraryTemplate = (item) => {
  const meta = [item.type, item.date, item.version].filter(Boolean).map(escapeHtml).join(" · ");
  return `
      <article class="doc-card">
        <div class="doc-card-header">
          <h3>${escapeHtml(item.title)}</h3>
          <span class="chip">${escapeHtml(item.type)}</span>
        </div>
        <p class="doc-meta">${meta}</p>
        <p>${escapeHtml(item.abstract)}</p>
        ${item.link ? `<a class="text-link" href="${item.link}">Open artifact</a>` : ""}
      </article>`;
};

const pagesDir = path.join(root, "pages");
const pageFiles = fs.readdirSync(pagesDir).filter((file) => file.endsWith(".html"));

let updatedCount = 0;

for (const file of pageFiles) {
  const pagePath = path.join(pagesDir, file);
  let html = readText(pagePath);

  const mdMatch = html.match(/<section id="doc-body" class="doc-body"[^>]*data-markdown-src="([^"]+)"[^>]*>[\s\S]*?<\/section>/);
  if (mdMatch) {
    const mdPath = path.resolve(path.dirname(pagePath), mdMatch[1]);
    const markdown = readText(mdPath);
    const rendered = renderMarkdown(markdown);
    html = html.replace(
      /<section id="doc-body" class="doc-body"[^>]*data-markdown-src="[^"]+"[^>]*>[\s\S]*?<\/section>/,
      `<section id="doc-body" class="doc-body" data-static-toc>${rendered}</section>`
    );
    fs.writeFileSync(pagePath, html);
    updatedCount += 1;
  }
}

const libraryPath = path.join(root, "pages", "library.html");
let libraryHtml = readText(libraryPath);
const libraryData = JSON.parse(readText(path.join(root, "content", "library.json")));
const libraryCards = libraryData.map(libraryTemplate).join("\n");
libraryHtml = libraryHtml.replace(
  /<section class="library-grid" id="library-grid" aria-live="polite">[\s\S]*?<\/section>/,
  `<section class="library-grid" id="library-grid" aria-live="polite">${libraryCards}\n    </section>`
);
fs.writeFileSync(libraryPath, libraryHtml);

console.log(`Updated ${updatedCount} markdown-backed pages and rendered library cards.`);
