/*
README
- Add new markdown documents in /content.
- Update /content/library.json with metadata and paths.
- Manuscript loads from /content/manuscript.md.
- Essays can be added in /content/essays and referenced from library.json.
*/

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

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

const renderMarkdown = (markdown) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let buffer = [];
  let inList = false;
  let inCode = false;
  let codeLang = "";

  const flushParagraph = () => {
    if (!buffer.length) return;
    html += `<p>${escapeHtml(buffer.join(" "))}</p>`;
    buffer = [];
  };

  const closeList = () => {
    if (inList) {
      html += "</ul>";
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
        html += `<pre><code data-lang="${codeLang}">`;
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
      html += `<h${level} id="${id}">${escapeHtml(text)}</h${level}>`;
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(listMatch[1])}</li>`;
      continue;
    }

    buffer.push(line);
  }

  flushParagraph();
  closeList();

  if (inCode) {
    html += "</code></pre>";
  }

  return html;
};

const showMissing = (target, message) => {
  target.innerHTML = `
    <div class="missing">
      <p>${message}</p>
      <p class="muted">If you opened this file directly, your browser may block local file loading. Use a local server if needed.</p>
    </div>
  `;
};

const buildToc = (container, tocTargets) => {
  container.innerHTML = "";
  if (!tocTargets.length) {
    container.innerHTML = "<li class=\"toc-empty\">No headings yet.</li>";
    return;
  }

  tocTargets.forEach((heading) => {
    const level = heading.tagName.toLowerCase();
    const li = document.createElement("li");
    li.className = level === "h3" ? "toc-item toc-item-sub" : "toc-item";
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    li.appendChild(link);
    container.appendChild(li);
  });
};

const highlightToc = (headings, tocLinks) => {
  if (!headings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  headings.forEach((heading) => observer.observe(heading));
};

const loadMarkdown = async () => {
  const container = qs("[data-markdown-src]");
  if (!container) return;

  const src = container.getAttribute("data-markdown-src");

  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error("Missing");
    const markdown = await response.text();
    const html = renderMarkdown(markdown);
    container.innerHTML = html;

    const headings = qsa("h2, h3", container);
    const toc = qs("#toc-list");
    const tocMobile = qs("#toc-list-mobile");
    if (toc) buildToc(toc, headings);
    if (tocMobile) buildToc(tocMobile, headings);

    const tocLinks = qsa(".toc-list a");
    highlightToc(headings, tocLinks);
  } catch (error) {
    showMissing(container, "Artifact not found yet.");
  }
};

const libraryTemplate = (item) => {
  const meta = [item.type, item.date, item.version].filter(Boolean);
  return `
    <article class="doc-card">
      <div class="doc-card-header">
        <h3>${escapeHtml(item.title)}</h3>
        <span class="chip">${escapeHtml(item.type)}</span>
      </div>
      <p class="doc-meta">${meta.map(escapeHtml).join(" · ")}</p>
      <p>${escapeHtml(item.abstract)}</p>
      ${item.link ? `<a class="text-link" href="${item.link}">Open artifact</a>` : ""}
    </article>
  `;
};

const loadLibrary = async () => {
  const grid = qs("#library-grid");
  if (!grid) return;

  try {
    const response = await fetch("../content/library.json");
    if (!response.ok) throw new Error("Missing");
    const data = await response.json();
    let items = Array.isArray(data) ? data : data.items || [];

    const searchInput = qs("#library-search");
    const filterButtons = qsa(".filter-button");
    let activeFilter = "all";

    const render = () => {
      const query = (searchInput?.value || "").toLowerCase();
      const filtered = items.filter((item) => {
        const matchesFilter = activeFilter === "all" || item.type === activeFilter;
        const haystack = `${item.title} ${item.abstract}`.toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        return matchesFilter && matchesSearch;
      });

      if (!filtered.length) {
        grid.innerHTML = "<div class=\"missing\"><p>No artifacts match the current filters.</p></div>";
        return;
      }

      grid.innerHTML = filtered.map(libraryTemplate).join("");
    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        activeFilter = button.dataset.filter || "all";
        render();
      });
    });

    searchInput?.addEventListener("input", render);

    render();
  } catch (error) {
    showMissing(grid, "Library catalog not found yet.");
  }
};

const initNav = () => {
  const nav = qs("#site-nav");
  const toggle = qs(".nav-toggle");
  if (!nav || !toggle) return;

  const setExpanded = (isOpen) => {
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.textContent = isOpen ? "Close" : "Menu";
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("nav-open", isOpen);
  };

  const closeNav = () => setExpanded(false);
  const openNav = () => setExpanded(true);

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.addEventListener("click", (event) => {
    if (event.target && event.target.tagName === "A") {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });
};

const init = () => {
  loadMarkdown();
  loadLibrary();
  initNav();
};

document.addEventListener("DOMContentLoaded", init);
