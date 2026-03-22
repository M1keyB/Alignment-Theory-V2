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

const GLOSSARY_TERMS = {
  "load-bearing-function": {
    label: "load-bearing function",
    definition: "A function whose degradation changes resilience, viability, developmental integrity, or durable competence rather than merely reducing efficiency.",
    related: [
      { href: "biology", path: "biological-stress-test.html" },
      { href: "education", path: "education-stress-test.html" },
      { href: "ai", path: "ai-civilization-and-human-formation.html" },
    ],
  },
  "participatory-capacity": {
    label: "participatory capacity",
    definition: "The system's active share in forming, carrying, and revising a load-bearing function rather than merely receiving its outputs.",
    related: [
      { href: "education", path: "education-stress-test.html" },
      { href: "recovery", path: "addiction-and-recovery-stress-test.html" },
      { href: "ai", path: "ai-civilization-and-human-formation.html" },
    ],
  },
  "support-relation": {
    label: "support relation",
    definition: "Any external or distributed structure that helps carry a load-bearing function over time.",
    related: [
      { href: "biology", path: "biological-stress-test.html" },
      { href: "economics", path: "economic-stress-test.html" },
      { href: "social media", path: "social-media-and-information-stress-test.html" },
    ],
  },
  "constitutive-co-regulation": {
    label: "constitutive co-regulation",
    definition: "Support that belongs to healthy functioning itself and preserves participation through shared regulation rather than replacing it.",
    related: [
      { href: "biology", path: "biological-stress-test.html" },
      { href: "parenting", path: "parenting-and-development-stress-test.html" },
      { href: "religion", path: "religion-and-spiritual-formation-stress-test.html" },
    ],
  },
  "developmental-scaffolding": {
    label: "developmental scaffolding",
    definition: "Temporary support ordered toward stronger future participation by the learner, person, institution, or system being formed.",
    related: [
      { href: "education", path: "education-stress-test.html" },
      { href: "parenting", path: "parenting-and-development-stress-test.html" },
      { href: "health", path: "health-behavior-and-lifestyle-change-stress-test.html" },
    ],
  },
  "stable-distributed-competence": {
    label: "stable distributed competence",
    definition: "Durable shared competence across persons, tools, and environments that does not hollow out the focal system's role in carrying the function.",
    related: [
      { href: "organizations", path: "organizational-systems-stress-test.html" },
      { href: "technology", path: "technology-adoption-stress-test.html" },
      { href: "politics", path: "political-systems-and-control-stress-test.html" },
    ],
  },
  "substitutive-dependence": {
    label: "substitutive dependence",
    definition: "Support that preserves output while reducing participation in the load-bearing function over time.",
    related: [
      { href: "ai", path: "ai-civilization-and-human-formation.html" },
      { href: "education", path: "education-stress-test.html" },
      { href: "recovery", path: "addiction-and-recovery-stress-test.html" },
    ],
  },
  "perturbation-test": {
    label: "perturbation test",
    definition: "The diagnostic question of what becomes visible when stress, variation, delay, loss, or disruption hits the system.",
    related: [
      { href: "biology", path: "biological-stress-test.html" },
      { href: "conflict", path: "conflict-and-polarization-stress-test.html" },
      { href: "technology", path: "technology-adoption-stress-test.html" },
    ],
  },
  "hidden-structure": {
    label: "hidden structure",
    definition: "The load-bearing arrangement or dependency pattern that is operating in a system without being clearly recognized by the participants within it.",
    related: [
      { href: "suffering", path: "suffering-and-hidden-structure-stress-test.html" },
      { href: "meaning", path: "meaning-formation-and-suffering-stress-test.html" },
      { href: "recovery", path: "addiction-and-recovery-stress-test.html" },
    ],
  },
  "borrowed-order": {
    label: "borrowed order",
    definition: "Apparent order that is being carried from outside the focal system rather than arising from strengthened participation in the function itself.",
    related: [
      { href: "education", path: "education-stress-test.html" },
      { href: "organizations", path: "organizational-systems-stress-test.html" },
      { href: "social media", path: "social-media-and-information-stress-test.html" },
    ],
  },
  "structural-dependence": {
    label: "structural dependence",
    definition: "A condition in which continuing function relies on external carrying in ways that make the focal system less able to bear the load on its own terms.",
    related: [
      { href: "economics", path: "economic-stress-test.html" },
      { href: "politics", path: "political-systems-and-control-stress-test.html" },
      { href: "technology", path: "technology-adoption-stress-test.html" },
    ],
  },
};

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

const normalizePrimaryNav = (nav) => {
  if (!nav) return;

  const currentPath = getCurrentPath();
  const inPagesDir = window.location.pathname.includes("/pages/");
  const bodyPage = document.body.dataset.page || "";
  const base = inPagesDir ? "" : "pages/";
  const homeHref = inPagesDir ? "../index.html" : "index.html";

  const links = [
    { href: homeHref, label: "Home", match: () => currentPath === "index.html" || bodyPage === "home" },
    { href: `${base}where-to-start.html`, label: "Where to Start", match: () => currentPath === "where-to-start.html" },
    { href: `${base}framework.html`, label: "Framework", match: () => currentPath === "framework.html" || bodyPage === "framework" },
    { href: `${base}stress-tests.html`, label: "Stress Tests", match: () => currentPath === "stress-tests.html" },
    { href: `${base}papers.html`, label: "Papers", match: () => currentPath === "papers.html" || bodyPage === "papers" },
    { href: `${base}essays.html`, label: "Essays", match: () => currentPath === "essays.html" || currentPath.startsWith("essay-") || bodyPage === "essays" },
    { href: `${base}library.html`, label: "Library", match: () => currentPath === "library.html" || bodyPage === "library" },
    { href: `${base}about.html`, label: "About", match: () => currentPath === "about.html" || bodyPage === "about" },
    { href: `${base}contact.html`, label: "Contact", match: () => currentPath === "contact.html" || bodyPage === "contact" },
  ];

  nav.innerHTML = links.map(({ href, label, match }) => {
    const current = match() ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");
};

const FRAMEWORK_MAP_GROUPS = [
  {
    key: "core",
    label: "Core Framework",
    items: [
      { href: "where-to-start.html", label: "Where to Start" },
      { href: "alignment-theory-in-plain-language.html", label: "In Plain Language" },
      { href: "parables-and-real-life-translations.html", label: "Parables and Translations" },
      { href: "revised-framework-center.html", label: "Revised Framework Center" },
      { href: "how-to-use-alignment-theory.html", label: "How to Use Alignment Theory" },
      { href: "load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html", label: "Load-Bearing Function and the Four Modes of Support" },
      { href: "boundary-conditions-and-failure-cases-of-alignment-theory.html", label: "Boundary Conditions and Failure Cases" },
      { href: "what-the-framework-actually-claims.html", label: "What the Framework Actually Claims" },
      { href: "participation-co-regulation-and-substitution.html", label: "Participation, Co-Regulation, and Substitution" },
    ],
  },
  {
    key: "stress-tests-core",
    label: "Stress Tests — Canonical Core",
    items: [
      { href: "stress-tests.html", label: "All Stress Tests" },
      { href: "shared-core-structure-across-domains.html", label: "Shared Core Structure Across Domains" },
      { href: "biological-stress-test.html", label: "Biological Stress Test" },
      { href: "addiction-and-recovery-stress-test.html", label: "Addiction and Recovery Stress Test" },
      { href: "education-stress-test.html", label: "Education Stress Test" },
      { href: "religion-and-spiritual-formation-stress-test.html", label: "Religion and Spiritual Formation Stress Test" },
      { href: "organizational-systems-stress-test.html", label: "Organizational Systems Stress Test" },
      { href: "community-and-high-control-group-stress-test.html", label: "Community and High-Control Groups Stress Test" },
    ],
  },
  {
    key: "stress-tests-full",
    label: "Stress Tests — Full Set",
    items: [
      { href: "economic-stress-test.html", label: "Economic Stress Test" },
      { href: "parenting-and-development-stress-test.html", label: "Parenting and Development Stress Test" },
      { href: "health-behavior-and-lifestyle-change-stress-test.html", label: "Health Behavior and Lifestyle Change Stress Test" },
      { href: "political-systems-and-control-stress-test.html", label: "Political Systems and Control Stress Test" },
      { href: "leadership-and-authority-stress-test.html", label: "Leadership and Authority Stress Test" },
      { href: "social-media-and-information-stress-test.html", label: "Social Media and Information Stress Test" },
      { href: "conflict-and-polarization-stress-test.html", label: "Conflict and Polarization Stress Test" },
      { href: "technology-adoption-stress-test.html", label: "Technology Adoption Stress Test" },
      { href: "thermodynamic-stress-test.html", label: "Thermodynamic Stress Test" },
      { href: "suffering-and-hidden-structure-stress-test.html", label: "Suffering and Hidden Structure Stress Test" },
      { href: "meaning-formation-and-suffering-stress-test.html", label: "Meaning Formation and Suffering Stress Test" },
      { href: "self-help-and-human-formation-stress-test.html", label: "Self-Help and Human Formation Stress Test" },
      { href: "why-structural-dependence-hides-behind-functional-success.html", label: "Why Structural Dependence Hides Behind Functional Success" },
    ],
  },
  {
    key: "branches",
    label: "Applied Branches",
    items: [
      { href: "ai-civilization-and-human-formation.html", label: "AI Civilization and Human Formation" },
      { href: "biology-and-adaptive-systems.html", label: "Biology and Adaptive Systems" },
    ],
  },
  {
    key: "reference",
    label: "Reference",
    items: [
      { href: "lexicon.html", label: "Lexicon" },
      { href: "glossary.html", label: "Glossary" },
    ],
  },
  {
    key: "earlier",
    label: "Earlier Framing",
    note: "These pages reflect earlier formulations of Alignment Theory and remain useful as bridges into the current framework.",
    subdued: true,
    items: [
      { href: "on-the-inner-outer-distinction.html", label: "On the Inner / Outer Distinction" },
      { href: "ai-alignment-and-alignment-theory.html", label: "AI Alignment and Alignment Theory" },
    ],
  },
  {
    key: "archive-paths",
    label: "Archive / Development Paths",
    note: "These pages preserve the developmental path of the framework and the conceptual route that led to the revised model.",
    subdued: true,
    items: [
      { href: "research-backbone.html", label: "Framework Paths" },
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
    ],
  },
];

const initNav = () => {
  const nav = qs("#site-nav");
  const toggles = qsa(".nav-toggle, .bottom-nav-toggle");
  if (!nav || !toggles.length) return;

  normalizePrimaryNav(nav);

  if (!nav.dataset.enhanced) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const pageRoot = currentPath === "index.html" ? "pages/" : "";
    const frameworkLink = nav.querySelector('a[href$="framework.html"]');
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

    FRAMEWORK_MAP_GROUPS.forEach(({ label, items, note, subdued }) => {
      const cluster = document.createElement("div");
      cluster.className = `site-nav-cluster${subdued ? " site-nav-cluster--subdued" : ""}`;

      const clusterLabel = document.createElement("p");
      clusterLabel.className = "site-nav-cluster-label";
      clusterLabel.textContent = label;
      cluster.appendChild(clusterLabel);

      if (note) {
        const clusterNote = document.createElement("p");
        clusterNote.className = "site-nav-cluster-note";
        clusterNote.textContent = note;
        cluster.appendChild(clusterNote);
      }

      items.forEach(({ href, label: itemLabel }) => {
        const link = document.createElement("a");
        link.href = `${pageRoot}${href}`;
        link.textContent = itemLabel;
        if (currentPath === href) {
          link.setAttribute("aria-current", "page");
        }
        cluster.appendChild(link);
      });

      group.appendChild(cluster);
    });

    section.append(summary, group);
    nav.appendChild(section);

    if (frameworkLink) {
      const wrapper = document.createElement("div");
      wrapper.className = "site-nav-item site-nav-item--has-dropdown";
      frameworkLink.parentNode.insertBefore(wrapper, frameworkLink);
      wrapper.appendChild(frameworkLink);

      const dropdown = document.createElement("div");
      dropdown.className = "site-nav-dropdown";

      const dropdownLabel = document.createElement("p");
      dropdownLabel.className = "site-nav-dropdown-label";
      dropdownLabel.textContent = "Framework map";
      dropdown.appendChild(dropdownLabel);

      const dropdownList = document.createElement("div");
      dropdownList.className = "site-nav-dropdown-list";

      FRAMEWORK_MAP_GROUPS.forEach(({ label, items, note, subdued }) => {
        const cluster = document.createElement("section");
        cluster.className = `site-nav-dropdown-cluster${subdued ? " site-nav-dropdown-cluster--subdued" : ""}`;

        const clusterLabel = document.createElement("p");
        clusterLabel.className = "site-nav-dropdown-cluster-label";
        clusterLabel.textContent = label;
        cluster.appendChild(clusterLabel);

        if (note) {
          const clusterNote = document.createElement("p");
          clusterNote.className = "site-nav-dropdown-cluster-note";
          clusterNote.textContent = note;
          cluster.appendChild(clusterNote);
        }

        items.forEach(({ href, label: itemLabel }) => {
          const link = document.createElement("a");
          link.className = "site-nav-dropdown-link";
          link.href = `${pageRoot}${href}`;
          link.textContent = itemLabel;
          if (currentPath === href) {
            link.setAttribute("aria-current", "page");
          }
          cluster.appendChild(link);
        });

        dropdownList.appendChild(cluster);
      });

      const dropdownFooter = document.createElement("a");
      dropdownFooter.className = "site-nav-dropdown-footer";
      dropdownFooter.href = `${pageRoot}revised-framework-center.html`;
      dropdownFooter.textContent = "Open revised center ->";

      dropdown.append(dropdownList, dropdownFooter);
      wrapper.appendChild(dropdown);

      const desktopQuery = window.matchMedia("(min-width: 961px)");

      const setDropdownOpen = (isOpen) => {
        wrapper.classList.toggle("is-open", isOpen);
        frameworkLink.setAttribute("aria-expanded", isOpen ? "true" : "false");
      };

      frameworkLink.setAttribute("aria-haspopup", "true");
      frameworkLink.setAttribute("aria-expanded", "false");

      const closeDropdown = () => {
        setDropdownOpen(false);
      };

      frameworkLink.addEventListener("click", (event) => {
        if (!desktopQuery.matches) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setDropdownOpen(!wrapper.classList.contains("is-open"));
      });

      document.addEventListener("click", (event) => {
        if (!desktopQuery.matches) return;
        if (wrapper.contains(event.target)) return;
        closeDropdown();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeDropdown();
        }
      });

      window.addEventListener("resize", () => {
        if (!desktopQuery.matches) {
          closeDropdown();
        }
      });
    }

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

const initGlossaryNotes = () => {
  const notes = qsa("[data-term]");
  if (!notes.length) return;

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const pageRoot = currentPath === "index.html" ? "pages/" : "";

  const closeAll = () => {
    notes.forEach((note) => note.classList.remove("is-open"));
  };

  notes.forEach((note) => {
    const key = note.dataset.term;
    const entry = GLOSSARY_TERMS[key];
    if (!entry) return;

    note.classList.add("term-note");
    note.setAttribute("tabindex", "0");
    note.setAttribute("role", "button");
    note.setAttribute("aria-expanded", "false");
    note.setAttribute("aria-label", `Explain ${entry.label}`);

    if (!note.dataset.termBound) {
      const popover = document.createElement("span");
      popover.className = "term-popover";

      const body = document.createElement("span");
      body.className = "term-popover-body";
      body.textContent = entry.definition;
      popover.appendChild(body);

      if (entry.related?.length) {
        const related = document.createElement("span");
        related.className = "term-popover-related";
        related.textContent = "Related: ";

        entry.related.forEach(({ href, path }, index) => {
          const link = document.createElement("a");
          link.href = `${pageRoot}${path}`;
          link.textContent = href;
          related.appendChild(link);
          if (index < entry.related.length - 1) {
            related.appendChild(document.createTextNode(" · "));
          }
        });

        popover.appendChild(related);
      }

      note.appendChild(popover);
      note.dataset.termBound = "true";
    }

    const repositionPopover = () => {
      const pop = note.querySelector(".term-popover");
      if (!pop) return;
      // Reset to CSS default (left: 0 relative to the term-note)
      pop.style.left = "";
      const popRect = pop.getBoundingClientRect();
      const noteRect = note.getBoundingClientRect();
      const margin = 8;
      if (popRect.right > window.innerWidth - margin) {
        // Shift popover left by the overflow amount (relative to the note)
        const overflow = popRect.right - (window.innerWidth - margin);
        pop.style.left = `${-overflow}px`;
      }
      // After any right-edge adjustment, clamp to left edge too
      const adjusted = pop.getBoundingClientRect();
      if (adjusted.left < margin) {
        pop.style.left = `${margin - noteRect.left}px`;
      }
    };

    const setOpen = (open) => {
      note.classList.toggle("is-open", open);
      note.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) repositionPopover();
    };

    note.addEventListener("mouseenter", () => setOpen(true));
    note.addEventListener("mouseleave", () => setOpen(false));
    note.addEventListener("focus", () => setOpen(true));
    note.addEventListener("blur", () => setOpen(false));
    note.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !note.classList.contains("is-open");
      closeAll();
      setOpen(willOpen);
    });
  });

  document.addEventListener("click", closeAll);
};

const initStickyHeader = () => {
  const header = qs(".site-header");
  if (!header) return;
  const enterCompactAt = 88;
  const leaveCompactAt = 6;
  let isCompact = false;
  let frame = null;

  // Inject back-to-top button
  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(backToTop);

  const reserveHeaderOffset = () => {
    const shouldRestoreCompact = isCompact;
    header.classList.remove("scrolled");
    const expandedHeight = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-offset", `${expandedHeight}px`);
    if (shouldRestoreCompact) {
      header.classList.add("scrolled");
    }
  };

  const syncHeaderState = () => {
    frame = null;
    const y = window.scrollY;
    if (!isCompact && y >= enterCompactAt) {
      isCompact = true;
    } else if (isCompact && y <= leaveCompactAt) {
      isCompact = false;
    }

    header.classList.toggle("scrolled", isCompact);
    backToTop.classList.toggle("is-visible", y > 300);
  };

  reserveHeaderOffset();
  syncHeaderState();
  window.addEventListener("scroll", () => {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(syncHeaderState);
  }, { passive: true });
  window.addEventListener("resize", () => {
    reserveHeaderOffset();
    syncHeaderState();
  });
};

const SEARCH_DATA = [
  // Framework / Core
  { title: "Where to Start", url: "where-to-start.html", section: "Framework", desc: "Entry point for understanding Alignment Theory and its structure.", tags: ["intro", "overview", "start", "guide", "begin"] },
  { title: "Revised Framework Center", url: "revised-framework-center.html", section: "Framework", desc: "The updated core of Alignment Theory: load-bearing functions, participatory capacity, and four modes of support.", tags: ["load-bearing", "participatory capacity", "four modes", "co-regulation", "scaffolding", "substitution", "distributed competence", "center"] },
  { title: "What the Framework Actually Claims", url: "what-the-framework-actually-claims.html", section: "Framework", desc: "Precise statement of Alignment Theory's claims and scope.", tags: ["claims", "scope", "precision", "definition"] },
  { title: "Load-Bearing Function, Participatory Capacity, and the Four Modes of Support", url: "load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html", section: "Framework", desc: "Core definitions of load-bearing function and the four support modes.", tags: ["load-bearing function", "participatory capacity", "four modes", "co-regulation", "scaffolding", "substitution", "distributed competence"] },
  { title: "Participation, Co-Regulation, and Substitution", url: "participation-co-regulation-and-substitution.html", section: "Framework", desc: "Why participatory capacity replaced internal/external as the framework's center.", tags: ["participation", "co-regulation", "substitution", "internal", "external", "revised"] },
  { title: "How the Revised Model Maps to the DMN", url: "how-the-revised-model-maps-to-the-dmn.html", section: "Framework", desc: "Mapping revised Alignment Theory to Default Mode Network dynamics.", tags: ["DMN", "default mode network", "neuroscience", "Raichle", "Buckner", "Andrews-Hanna", "Newberg", "brain", "cognition", "neural"] },
  { title: "The Four Structural States of Support and Participation", url: "the-four-structural-states-of-support-and-participation.html", section: "Framework", desc: "The 2×2 structure mapping support presence against participation level.", tags: ["four states", "support", "participation", "structural states", "2x2", "matrix"] },
  { title: "Boundary Conditions and Failure Cases of Alignment Theory", url: "boundary-conditions-and-failure-cases-of-alignment-theory.html", section: "Framework", desc: "Where the framework reaches its limits and how it fails.", tags: ["limits", "failure", "boundary conditions", "edge cases"] },
  { title: "Shared Core Structure Across Domains", url: "shared-core-structure-across-domains.html", section: "Framework", desc: "The repeating load-bearing structure found across biology, education, addiction, religion, and more.", tags: ["cross-domain", "shared structure", "pattern", "universal", "domains"] },
  { title: "The Formation Mechanism", url: "the-formation-mechanism.html", section: "Framework", desc: "How structural formation works across domains.", tags: ["formation", "mechanism", "structure", "how"] },
  { title: "How to Use Alignment Theory", url: "how-to-use-alignment-theory.html", section: "Framework", desc: "A practical guide to applying the framework.", tags: ["guide", "apply", "how to", "practical", "use"] },
  { title: "Framework", url: "framework.html", section: "Framework", desc: "The main framework hub page.", tags: ["framework", "hub", "overview", "map"] },
  // Stress Tests — Core
  { title: "Biological Stress Test", url: "biological-stress-test.html", section: "Stress Tests", desc: "Framework applied to biological systems, evolutionary pressure, and adaptive capacity.", tags: ["biology", "evolution", "adaptive systems", "homeostasis", "organism", "physical", "cells", "embodied"] },
  { title: "Addiction and Recovery Stress Test", url: "addiction-and-recovery-stress-test.html", section: "Stress Tests", desc: "How substitutive dependence and participatory capacity appear in addiction and recovery.", tags: ["addiction", "recovery", "dependence", "substance", "relapse", "sobriety", "drugs", "alcohol"] },
  { title: "Education Stress Test", url: "education-stress-test.html", section: "Stress Tests", desc: "Framework applied to education systems, learning, and knowledge formation.", tags: ["education", "learning", "school", "teaching", "knowledge", "student", "curriculum"] },
  { title: "Religion and Spiritual Formation Stress Test", url: "religion-and-spiritual-formation-stress-test.html", section: "Stress Tests", desc: "How religious institutions and spiritual practices carry or erode participatory capacity.", tags: ["religion", "spirituality", "church", "faith", "spiritual formation", "prayer", "practice", "DMN"] },
  { title: "Organizational Systems Stress Test", url: "organizational-systems-stress-test.html", section: "Stress Tests", desc: "Framework applied to organizational structure, authority, and collective competence.", tags: ["organizations", "management", "leadership", "institution", "corporate", "teams", "workplace"] },
  { title: "Community and High-Control Groups Stress Test", url: "community-and-high-control-group-stress-test.html", section: "Stress Tests", desc: "How high-control communities and cults erode participatory capacity.", tags: ["community", "cults", "high-control groups", "coercion", "authority", "social control", "manipulation"] },
  // Stress Tests — Full Set
  { title: "Economic Stress Test", url: "economic-stress-test.html", section: "Stress Tests", desc: "Framework applied to economic systems, markets, and financial dependency.", tags: ["economics", "markets", "finance", "poverty", "wealth", "dependency", "money"] },
  { title: "Parenting and Development Stress Test", url: "parenting-and-development-stress-test.html", section: "Stress Tests", desc: "Framework applied to parenting and developmental scaffolding.", tags: ["parenting", "development", "childhood", "attachment", "family", "child", "adolescent"] },
  { title: "Health Behavior and Lifestyle Change Stress Test", url: "health-behavior-and-lifestyle-change-stress-test.html", section: "Stress Tests", desc: "Framework applied to health behavior change and lifestyle formation.", tags: ["health", "lifestyle", "behavior change", "habit", "wellness", "exercise", "diet"] },
  { title: "Political Systems and Control Stress Test", url: "political-systems-and-control-stress-test.html", section: "Stress Tests", desc: "Framework applied to political systems, power, and structural control.", tags: ["politics", "power", "government", "control", "democracy", "authoritarianism", "state"] },
  { title: "Social Media and Information Stress Test", url: "social-media-and-information-stress-test.html", section: "Stress Tests", desc: "How social media platforms carry and erode participatory cognitive capacity.", tags: ["social media", "information", "attention", "platform", "digital", "internet", "algorithm"] },
  { title: "Conflict and Polarization Stress Test", url: "conflict-and-polarization-stress-test.html", section: "Stress Tests", desc: "Framework applied to conflict dynamics and political polarization.", tags: ["conflict", "polarization", "tribalism", "division", "politics", "war"] },
  { title: "Technology Adoption Stress Test", url: "technology-adoption-stress-test.html", section: "Stress Tests", desc: "How technology adoption affects participatory capacity.", tags: ["technology", "adoption", "tools", "AI", "automation", "digital", "software"] },
  { title: "Suffering and Hidden Structure Stress Test", url: "suffering-and-hidden-structure-stress-test.html", section: "Stress Tests", desc: "What suffering reveals about hidden structural arrangements.", tags: ["suffering", "hidden structure", "pain", "loss", "adversity", "hardship"] },
  { title: "Meaning Formation and Suffering Stress Test", url: "meaning-formation-and-suffering-stress-test.html", section: "Stress Tests", desc: "How meaning is formed through or despite suffering.", tags: ["meaning", "suffering", "purpose", "narrative", "Viktor Frankl", "existential"] },
  { title: "Stress Tests", url: "stress-tests.html", section: "Stress Tests", desc: "All stress tests and domain applications of the framework.", tags: ["stress tests", "applications", "domains", "all"] },
  // Applied Branches
  { title: "AI Civilization and Human Formation", url: "ai-civilization-and-human-formation.html", section: "Applied", desc: "How AI at civilizational scale affects human participatory capacity and formation.", tags: ["AI", "artificial intelligence", "civilization", "formation", "automation", "AGI", "technology", "machine learning", "LLM"] },
  { title: "Biology and Adaptive Systems", url: "biology-and-adaptive-systems.html", section: "Applied", desc: "The biology branch of Alignment Theory applied to adaptive systems.", tags: ["biology", "adaptive systems", "evolution", "homeostasis", "cells", "organisms"] },
  { title: "Why Multiple Fields Are Converging on the Same AI Question", url: "why-multiple-fields-are-converging-on-the-same-ai-question.html", section: "Applied", desc: "Cross-disciplinary convergence on AI and participatory capacity.", tags: ["AI", "convergence", "fields", "interdisciplinary", "neuroscience", "education", "psychology"] },
  { title: "Why Structural Dependence Hides Behind Functional Success", url: "why-structural-dependence-hides-behind-functional-success.html", section: "Applied", desc: "How systems can appear to function well while structural dependency grows invisibly.", tags: ["structural dependence", "functional success", "hidden", "dependency", "invisible"] },
  { title: "Load-Bearing Human Capacities in the AI Age", url: "load-bearing-human-capacities-in-the-ai-age.html", section: "Applied", desc: "Which human capacities are load-bearing and what AI substitution risks.", tags: ["AI", "human capacities", "load-bearing", "skills", "cognition", "agency", "automation"] },
  { title: "Why the Present May Be Safer Than Success", url: "why-the-present-may-be-safer-than-success.html", section: "Applied", desc: "Why an earlier phase may preserve more capacity than a later successful one.", tags: ["present", "success", "safety", "capacity", "fragility", "growth"] },
  // Papers
  { title: "Papers", url: "papers.html", section: "Papers", desc: "All working papers and formal research outputs.", tags: ["papers", "research", "publication", "formal"] },
  { title: "Alignment Diagnostic", url: "alignment-diagnostic.html", section: "Papers", desc: "Diagnostic tool for identifying structural alignment patterns.", tags: ["diagnostic", "assessment", "tool", "measure", "index"] },
  { title: "Human Signal", url: "human-signal.html", section: "Papers", desc: "The human signal paper on participatory markers.", tags: ["signal", "human", "markers", "measurement", "indicators"] },
  // Essays
  { title: "Essays", url: "essays.html", section: "Essays", desc: "All essays on Alignment Theory topics.", tags: ["essays", "writing", "all"] },
  { title: "Counterfeit Order: When External Control Replaces Coherence", url: "essay-counterfeit-order-when-external-control-replaces-coherence.html", section: "Essays", desc: "How external control produces the appearance of order without real coherence.", tags: ["counterfeit order", "external control", "coherence", "performance", "fake"] },
  { title: "Why Performance Is Easier Than Transformation", url: "essay-why-performance-is-easier-than-transformation.html", section: "Essays", desc: "Why behavioral performance is structurally easier than genuine formation.", tags: ["performance", "transformation", "formation", "behavior", "change"] },
  { title: "Low Agency Increases Steerability", url: "essay-low-agency-increases-steerability.html", section: "Essays", desc: "How low agency makes systems more steerable and less structurally robust.", tags: ["agency", "steerability", "control", "autonomy", "compliance", "manipulation"] },
  { title: "The Default Mode Network and the Self-Model", url: "essay-the-default-mode-network-and-the-self-model.html", section: "Essays", desc: "How the DMN underlies self-modeling and identity formation.", tags: ["DMN", "default mode network", "self", "identity", "neuroscience", "brain", "self-model"] },
  { title: "Renewal of the Mind: A Regulatory Reading of Romans 12:2", url: "essay-renewal-of-the-mind-a-regulatory-reading-of-romans-12-2.html", section: "Essays", desc: "Reading Romans 12:2 through a regulatory and neuroscientific lens.", tags: ["Romans", "renewal", "mind", "scripture", "transformation", "neuroscience", "DMN", "bible"] },
  { title: "The Law Written Within: Why Internalization Is the Biblical Goal", url: "essay-law-written-within-why-internalization-is-the-biblical-goal.html", section: "Essays", desc: "Biblical internalization of law as structural formation.", tags: ["law", "internalization", "bible", "scripture", "formation", "heart", "covenant"] },
  { title: "Salience, Threat, and Why Fear Narrows the Self", url: "essay-salience-threat-and-why-fear-narrows-the-self.html", section: "Essays", desc: "How fear and threat salience narrow participatory capacity.", tags: ["salience", "threat", "fear", "self", "anxiety", "stress", "amygdala"] },
  { title: "Prestige, Dominance, and the Loss of Voluntary Alignment", url: "essay-prestige-dominance-and-the-loss-of-voluntary-alignment.html", section: "Essays", desc: "How prestige and dominance dynamics affect voluntary alignment.", tags: ["prestige", "dominance", "power", "status", "alignment", "voluntary", "hierarchy"] },
  { title: "Psychedelics, Unity, and Why State Access Is Not Formation", url: "essay-psychedelics-unity-and-why-state-access-is-not-formation.html", section: "Essays", desc: "Why psychedelic peak states differ from genuine structural formation.", tags: ["psychedelics", "unity", "mystical", "psilocybin", "state", "formation", "drugs", "experience"] },
  { title: "Why Self-Help Feels Hollow", url: "essay-why-self-help-feels-hollow.html", section: "Essays", desc: "Why self-help produces performance rather than genuine structural change.", tags: ["self-help", "formation", "hollow", "performance", "transformation", "books", "productivity"] },
  { title: "When Systems Replace Truth", url: "essay-when-systems-replace-truth.html", section: "Essays", desc: "How systems substitute for truth-engagement and erode participatory capacity.", tags: ["systems", "truth", "replacement", "ideology", "control", "ideology"] },
  { title: "False Religion: Beyond Church", url: "essay-false-religion-beyond-church.html", section: "Essays", desc: "How false religion operates in secular as well as religious contexts.", tags: ["false religion", "church", "secular", "performance", "ritual", "ideology"] },
  { title: "Agency, Executive Control, and Inner Regulation", url: "essay-agency-executive-control-and-inner-regulation.html", section: "Essays", desc: "How agency, executive function, and inner regulation are structurally related.", tags: ["agency", "executive control", "regulation", "prefrontal cortex", "self-control", "executive function", "neuroscience"] },
  { title: "Exodus and Freedom Without Inner Structure", url: "essay-exodus-and-freedom-without-inner-structure.html", section: "Essays", desc: "Why freedom from external constraint is insufficient without internal formation.", tags: ["exodus", "freedom", "structure", "formation", "bible", "liberation", "constraint"] },
  { title: "Armageddon Patterns: Hidden Disorder Becoming Historical", url: "essay-armageddon-patterns-hidden-disorder-becoming-historical.html", section: "Essays", desc: "How hidden disorder becomes visible at civilizational scale.", tags: ["armageddon", "disorder", "historical", "civilization", "collapse", "scale"] },
  { title: "The Kingdom Within / In Your Midst", url: "essay-the-kingdom-within-in-your-midst.html", section: "Essays", desc: "Reading 'the kingdom of God is within you' through a structural lens.", tags: ["kingdom", "within", "bible", "scripture", "formation", "inward", "Luke"] },
  { title: "The Word: Reality Before Interpretation", url: "essay-the-word-reality-before-interpretation.html", section: "Essays", desc: "How the Word functions as a pre-interpretive structural contact.", tags: ["word", "logos", "interpretation", "reality", "scripture", "bible"] },
  { title: "Why Fruit Is Not Performance", url: "essay-fruit-not-performance-why-outward-behavior-is-not-enough.html", section: "Essays", desc: "Why outward fruit differs structurally from performance of it.", tags: ["fruit", "performance", "formation", "behavior", "bible", "virtue"] },
  { title: "Gatekept Clarity", url: "essay-gatekept-clarity.html", section: "Essays", desc: "How clarity is withheld and used as a control mechanism.", tags: ["gatekeeping", "clarity", "control", "information", "authority", "access"] },
  // Tools & Reference
  { title: "Alignment Diagnostic Tool", url: "tools.html", section: "Tools", desc: "Interactive diagnostic for assessing alignment in a system.", tags: ["diagnostic", "tool", "assessment", "interactive", "measure"] },
  { title: "Scripture Explorer", url: "scripture-explorer.html", section: "Tools", desc: "Tool for exploring scripture through an Alignment Theory lens.", tags: ["scripture", "bible", "explorer", "tool", "search"] },
  { title: "Send a Case", url: "send-a-case.html", section: "Tools", desc: "Submit a case for framework analysis.", tags: ["case", "submit", "analysis", "apply"] },
  { title: "Lexicon", url: "lexicon.html", section: "Reference", desc: "Key terms and definitions in Alignment Theory.", tags: ["lexicon", "glossary", "definitions", "terms", "vocabulary", "concepts"] },
  { title: "Glossary", url: "glossary.html", section: "Reference", desc: "Comprehensive A-Z term reference with links to relevant pages.", tags: ["glossary", "terms", "definitions", "A-Z", "reference", "vocabulary", "concepts"] },
  { title: "Library", url: "library.html", section: "Reference", desc: "Full archive of Alignment Theory documents and resources.", tags: ["library", "archive", "documents", "resources", "all pages"] },
  { title: "About", url: "about.html", section: "Reference", desc: "About Alignment Theory and the research project.", tags: ["about", "project", "author", "who"] },
];

const initSearch = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const pageRoot = currentPath === "index.html" ? "pages/" : "";

  const header = qs(".site-header");
  if (!header) return;

  const searchBtn = document.createElement("button");
  searchBtn.type = "button";
  searchBtn.className = "search-trigger";
  searchBtn.setAttribute("aria-label", "Search");
  searchBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span class="search-trigger-hint">⌘K</span>`;
  header.appendChild(searchBtn);

  const overlay = document.createElement("div");
  overlay.className = "search-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Search");
  overlay.innerHTML = `
    <div class="search-box">
      <div class="search-input-row">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input type="search" class="search-input" placeholder="Search pages, essays, terms…" autocomplete="off" spellcheck="false" />
        <button type="button" class="search-close" aria-label="Close search">Esc</button>
      </div>
      <ul class="search-results" role="listbox" aria-label="Search results"></ul>
      <p class="search-empty" hidden>No results — try a different term.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector(".search-input");
  const results = overlay.querySelector(".search-results");
  const empty = overlay.querySelector(".search-empty");
  let activeIdx = -1;

  const open = () => {
    overlay.classList.add("is-open");
    input.value = "";
    results.innerHTML = "";
    empty.hidden = true;
    activeIdx = -1;
    setTimeout(() => input.focus(), 50);
  };

  const close = () => {
    overlay.classList.remove("is-open");
    searchBtn.focus();
  };

  const scoreItem = (item, query) => {
    const q = query.toLowerCase();
    const titleLower = item.title.toLowerCase();
    const descLower = item.desc.toLowerCase();
    const tagsStr = item.tags.join(" ").toLowerCase();
    let s = 0;
    if (titleLower.startsWith(q)) s += 100;
    else if (titleLower.includes(q)) s += 60;
    if (tagsStr.includes(q)) s += 40;
    if (descLower.includes(q)) s += 20;
    const words = q.split(/\s+/).filter(Boolean);
    if (words.length > 1) {
      words.forEach(w => {
        if (titleLower.includes(w)) s += 10;
        if (tagsStr.includes(w)) s += 8;
        if (descLower.includes(w)) s += 4;
      });
    }
    return s;
  };

  const renderResults = (query) => {
    if (!query.trim()) {
      results.innerHTML = "";
      empty.hidden = true;
      activeIdx = -1;
      return;
    }
    const scored = SEARCH_DATA
      .map(item => ({ item, s: scoreItem(item, query) }))
      .filter(({ s }) => s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 10);
    activeIdx = -1;
    if (!scored.length) {
      results.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    results.innerHTML = scored.map(({ item }) => {
      const url = `${pageRoot}${item.url}`;
      return `<li role="option" class="search-result-item" data-url="${escapeHtml(url)}" aria-selected="false">
        <a href="${escapeHtml(url)}" class="search-result-link" tabindex="-1">
          <span class="search-result-title">${escapeHtml(item.title)}</span>
          <span class="search-result-meta">${escapeHtml(item.section)}</span>
          <span class="search-result-desc">${escapeHtml(item.desc)}</span>
        </a>
      </li>`;
    }).join("");
  };

  const setActive = (idx) => {
    const items = qsa(".search-result-item", results);
    items.forEach((el, i) => {
      el.setAttribute("aria-selected", i === idx ? "true" : "false");
      el.classList.toggle("is-active", i === idx);
    });
    activeIdx = idx;
    if (idx >= 0 && items[idx]) items[idx].scrollIntoView({ block: "nearest" });
  };

  input.addEventListener("input", () => renderResults(input.value));

  input.addEventListener("keydown", (e) => {
    const items = qsa(".search-result-item", results);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(Math.min(activeIdx + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(Math.max(activeIdx - 1, 0));
    } else if (e.key === "Enter") {
      const target = activeIdx >= 0 ? items[activeIdx] : items[0];
      if (target) window.location.href = target.dataset.url;
    } else if (e.key === "Escape") {
      close();
    }
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  overlay.querySelector(".search-close").addEventListener("click", close);
  searchBtn.addEventListener("click", open);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      overlay.classList.contains("is-open") ? close() : open();
    } else if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      close();
    }
  });
};

const init = () => {
  loadMarkdown();
  initStaticToc();
  loadLibrary();
  initMobileBottomNav();
  initNav();
  initStickyHeader();
  initSearch();
  initRevealMotion();
  initSwipeHints();
  initCopyTools();
  initGlossaryNotes();
};

document.addEventListener("DOMContentLoaded", init);
