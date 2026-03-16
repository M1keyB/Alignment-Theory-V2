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
    </section>
  `;
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
    html += `<p>${renderInline(buffer.join(" "))}</p>`;
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
      html += `<h${level} id="${id}">${renderInline(text)}</h${level}>`;
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${renderInline(listMatch[1])}</li>`;
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

const getCurrentPath = () => window.location.pathname.split("/").pop() || "index.html";

const buildNavIcon = (name) => {
  const paths = {
    home: '<path d="M3.5 8.5 12 2l8.5 6.5"></path><path d="M5.5 7.5V20h13V7.5"></path>',
    framework: '<rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 4v16"></path><path d="M4 10h16"></path>',
    essays: '<path d="M6 4.5h12"></path><path d="M6 9h12"></path><path d="M6 13.5h8"></path><path d="M6 18h10"></path>',
    library: '<path d="M5 5.5h5v13H5z"></path><path d="M10 5.5h4.5v13H10z"></path><path d="M14.5 5.5H19v13h-4.5z"></path>',
    more: '<circle cx="6" cy="12" r="1.25" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"></circle><circle cx="18" cy="12" r="1.25" fill="currentColor" stroke="none"></circle>',
  };

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${paths[name] || ""}
    </svg>
  `;
};

const initMobileBottomNav = () => {
  if (qs(".mobile-bottom-nav")) return;

  const currentPath = getCurrentPath();
  const inPagesDir = window.location.pathname.includes("/pages/");
  const bodyPage = document.body.dataset.page || "";
  const primaryKey = currentPath === "index.html" || bodyPage === "home"
    ? "home"
    : currentPath === "library.html" || bodyPage === "library"
      ? "library"
      : currentPath === "essays.html" || currentPath.startsWith("essay-") || bodyPage === "essays"
        ? "essays"
        : bodyPage === "framework"
          ? "framework"
          : "more";

  const links = [
    { key: "home", label: "Home", href: inPagesDir ? "../index.html" : "index.html" },
    { key: "framework", label: "Framework", href: inPagesDir ? "framework.html" : "pages/framework.html" },
    { key: "essays", label: "Essays", href: inPagesDir ? "essays.html" : "pages/essays.html" },
    { key: "library", label: "Library", href: inPagesDir ? "library.html" : "pages/library.html" },
  ];

  const nav = document.createElement("nav");
  nav.className = "mobile-bottom-nav";
  nav.setAttribute("aria-label", "Mobile primary");

  links.forEach(({ key, label, href }) => {
    const link = document.createElement("a");
    link.className = "mobile-bottom-nav__item";
    link.href = href;
    if (primaryKey === key) {
      link.setAttribute("aria-current", "page");
    }
    link.innerHTML = `
      <span class="mobile-bottom-nav__icon">${buildNavIcon(key)}</span>
      <span class="mobile-bottom-nav__label">${label}</span>
    `;
    nav.appendChild(link);
  });

  const moreButton = document.createElement("button");
  moreButton.type = "button";
  moreButton.className = "mobile-bottom-nav__item bottom-nav-toggle";
  moreButton.setAttribute("aria-expanded", "false");
  moreButton.setAttribute("aria-controls", "site-nav");
  moreButton.setAttribute("aria-label", "Open more navigation");
  if (primaryKey === "more") {
    moreButton.classList.add("is-current");
  }
  moreButton.innerHTML = `
    <span class="mobile-bottom-nav__icon">${buildNavIcon("more")}</span>
    <span class="mobile-bottom-nav__label">More</span>
  `;
  nav.appendChild(moreButton);

  document.body.appendChild(nav);
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

const ensureHeadingIds = (headings) => {
  const seen = new Set();

  headings.forEach((heading) => {
    let id = heading.id ? heading.id.trim() : "";

    if (!id) {
      id = slugify(heading.textContent || "section");
    }

    if (!id) {
      id = "section";
    }

    let uniqueId = id;
    let suffix = 2;
    while (seen.has(uniqueId) || document.getElementById(uniqueId) && document.getElementById(uniqueId) !== heading) {
      uniqueId = `${id}-${suffix}`;
      suffix += 1;
    }

    heading.id = uniqueId;
    seen.add(uniqueId);
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

const initTocFromRoot = (root) => {
  if (!root) return;

  const headings = qsa("h2, h3", root);
  ensureHeadingIds(headings);
  const toc = qs("#toc-list");
  const tocMobile = qs("#toc-list-mobile");
  if (toc) buildToc(toc, headings);
  if (tocMobile) buildToc(tocMobile, headings);

  const tocLinks = qsa(".toc-list a");
  highlightToc(headings, tocLinks);
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
    initTocFromRoot(container);
  } catch (error) {
    showMissing(container, "Artifact not found yet.");
  }
};

const initStaticToc = () => {
  const root = qs("[data-static-toc]");
  if (!root) return;
  initTocFromRoot(root);
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
  const toggles = qsa(".nav-toggle, .bottom-nav-toggle");
  if (!nav || !toggles.length) return;

  if (!nav.dataset.enhanced) {
    const frameworkLinks = [
      { href: "human-condition.html", label: "The Human Condition" },
      { href: "why-humans-build-systems.html", label: "Why Humans Build Systems" },
      { href: "from-human-regulation-to-alignment-theory.html", label: "From Human Regulation to Alignment Theory" },
      { href: "core-laws.html", label: "Core Laws" },
      { href: "scaffolding-and-counterfeit-order.html", label: "Scaffolding and Counterfeit Order" },
      { href: "coherence-markers.html", label: "Coherence Markers" },
      { href: "reintegration-conditions.html", label: "Reintegration Conditions" },
      { href: "emergency-order-and-triage.html", label: "Emergency Order and Triage" },
      { href: "when-scaffolding-hardens.html", label: "When Scaffolding Hardens" },
      { href: "auditing-counterfeit-order.html", label: "Auditing Counterfeit Order" },
      { href: "limits-of-diagnostic-application.html", label: "Limits of Diagnostic Application" },
      { href: "stress-tests-and-limits.html", label: "Stress Tests and Limits" },
      { href: "the-formation-mechanism.html", label: "The Formation Mechanism" },
      { href: "three-forms-of-order.html", label: "Three Forms of Order" },
      { href: "how-formation-fails.html", label: "How Formation Fails" },
      { href: "enforcement-coherence-and-hard-cases.html", label: "Enforcement and Hard Cases" },
      { href: "toward-a-formation-index.html", label: "Toward a Formation Index" },
      { href: "from-markers-to-indices.html", label: "From Markers to Indices" },
      { href: "metabolizing-truth.html", label: "Metabolizing Truth" },
      { href: "what-inward-coherence-is.html", label: "What Inward Coherence Is" },
      { href: "the-transition-trigger.html", label: "The Transition Trigger" },
      { href: "worked-case-study.html", label: "Worked Case Study" },
      { href: "formation-case-study.html", label: "Formation Case Study" },
      { href: "one-pattern-across-scales.html", label: "One Pattern Across Scales" },
      { href: "research-backbone.html#what-alignment-theory-adds", label: "Distinct Contribution" },
      { href: "research-backbone.html", label: "Research Backbone" },
      { href: "alignment-theory-sdt-virtue-ethics.html", label: "SDT and Virtue Ethics" },
      { href: "on-the-inner-outer-distinction.html", label: "Inner / Outer Distinction" },
      { href: "biblical-grammar.html", label: "Biblical Grammar" },
      { href: "scripture-regulation-and-inner-transformation.html", label: "Scripture and Regulation" },
      { href: "scripture-explorer.html", label: "Scripture Explorer" },
      { href: "lexicon.html", label: "Lexicon" },
      { href: "why-christ-is-structurally-central.html", label: "Why Christ Is Structurally Central" },
      { href: "metaphysical-claims.html", label: "Metaphysical Claims" },
      { href: "framework.html", label: "Framework Center" },
    ];

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const pageRoot = currentPath === "index.html" ? "pages/" : "";
    const section = document.createElement("details");
    section.className = "site-nav-section";
    if (document.body.dataset.page === "framework") {
      section.open = true;
    }

    const summary = document.createElement("summary");
    summary.className = "site-nav-summary";
    summary.textContent = "Framework Paths";

    const group = document.createElement("div");
    group.className = "site-nav-group";

    const pathLabel = document.createElement("p");
    pathLabel.className = "site-nav-cluster-label";
    pathLabel.textContent = "Follow the path →";
    group.appendChild(pathLabel);

    frameworkLinks.forEach(({ href, label }) => {
      const link = document.createElement("a");
      link.href = `${pageRoot}${href}`;
      link.textContent = label;
      if (currentPath === href) {
        link.setAttribute("aria-current", "page");
      }
      group.appendChild(link);
    });

    section.append(summary, group);
    nav.appendChild(section);
    nav.dataset.enhanced = "true";
  }

  const setExpanded = (isOpen) => {
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (toggle.classList.contains("bottom-nav-toggle")) {
        toggle.setAttribute("aria-label", isOpen ? "Close more navigation" : "Open more navigation");
        toggle.classList.toggle("is-current", isOpen || toggle.classList.contains("is-page-current"));
      } else {
        toggle.textContent = isOpen ? "Close" : "Menu";
        toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      }
    });
    document.body.classList.toggle("nav-open", isOpen);
  };

  const closeNav = () => setExpanded(false);
  const openNav = () => setExpanded(true);

  toggles.forEach((toggle) => {
    if (toggle.classList.contains("bottom-nav-toggle") && toggle.classList.contains("is-current")) {
      toggle.classList.add("is-page-current");
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
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

  document.addEventListener("click", (event) => {
    const isOpen = toggles.some((toggle) => toggle.getAttribute("aria-expanded") === "true");
    if (!isOpen) return;
    if (nav.contains(event.target) || toggles.some((toggle) => toggle.contains(event.target))) return;
    closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });
};

const initRevealMotion = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const revealTargets = [
    ...qsa(".framework-featured-card"),
    ...qsa(".framework-hub-group"),
    ...qsa(".precision-related-card"),
    ...qsa(".backbone-distinct-card"),
    ...qsa(".backbone-support-card"),
    ...qsa(".backbone-entry"),
    ...qsa(".explorer-entry-card"),
    ...qsa(".explorer-theme-card"),
    ...qsa(".explorer-synthesis-card"),
    ...qsa(".explorer-study-card"),
  ];

  const uniqueTargets = Array.from(new Set(revealTargets)).filter((el) => !el.classList.contains("reveal-on-scroll"));

  uniqueTargets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 40}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  uniqueTargets.forEach((target) => observer.observe(target));
};

const initSwipeHints = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rails = qsa(".framework-featured-track");
  if (!rails.length) return;

  rails.forEach((rail, index) => {
    const storageKey = `alignment-swipe-hint-${index}`;
    if (window.innerWidth > 720 || window.localStorage.getItem(storageKey)) return;

    window.setTimeout(() => {
      rail.classList.add("is-hinting");
      window.setTimeout(() => rail.classList.remove("is-hinting"), 1100);
      window.localStorage.setItem(storageKey, "seen");
    }, 550);
  });
};

const initCopyTools = () => {
  const copyButtons = qsa("[data-copy-target], [data-copy-text]");
  if (!copyButtons.length) return;

  const copyValue = async (value) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  };

  copyButtons.forEach((button) => {
    const defaultLabel = button.textContent.trim();

    button.addEventListener("click", async () => {
      const targetId = button.dataset.copyTarget;
      const target = targetId ? document.getElementById(targetId) : null;
      const value = button.dataset.copyText
        || (target
          ? ("value" in target ? target.value : target.textContent || "")
          : "");

      if (!value.trim()) return;

      try {
        await copyValue(value);
        button.textContent = "Copied";
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = defaultLabel;
          button.classList.remove("is-copied");
        }, 1800);
      } catch (error) {
        button.textContent = "Copy failed";
        window.setTimeout(() => {
          button.textContent = defaultLabel;
        }, 1800);
      }
    });
  });
};

const init = () => {
  loadMarkdown();
  initStaticToc();
  loadLibrary();
  initMobileBottomNav();
  initNav();
  initRevealMotion();
  initSwipeHints();
  initCopyTools();
};

document.addEventListener("DOMContentLoaded", init);
