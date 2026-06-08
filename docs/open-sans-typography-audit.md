# Open Sans Typography Audit

Date: 2026-06-08

## Scope

This audit covers the controlled Open Sans typography pass. It inspected:

```text
assets/styles.css
index.html
start-here.html
about.html
papers.html
notes/index.html
pages/map.html
pages/revised-framework-center.html
pages/human-agency-preservation-infrastructure.html
pages/alignment-governance-stack.html
pages/participatory-capacity-preservation-index.html
assets/fragments/site-header.html
assets/fragments/site-footer.html
scripts/apply-shared-shell.mjs
```

Search terms:

```text
font-family
font-weight
font-style
Georgia
Times
serif
sans-serif
system-ui
monospace
```

## Current Global Font Stacks

The global body stack is serif:

```css
body {
  font-family: "Georgia", "Times New Roman", Times, serif;
}
```

The stylesheet does not define font variables before this pass.

Headings generally inherit the serif body stack unless a component-specific selector overrides weight or other heading details.

## Selectors Using Serif Fonts

Public-facing serif selectors found in `assets/styles.css`:

```text
body
.field input
.precision-formula
```

`body` controls the primary publication voice. `.field input` and `.precision-formula` are page/component-specific serif overrides.

## Selectors Using Sans-Serif Fonts

The stylesheet uses repeated Arial/Helvetica stacks for navigation, labels, metadata, buttons, cards, tables, notices, search UI, generated AI corpus tools, map captions, and archive UI.

Representative selectors include:

```text
.nav-toggle
.site-nav
.architecture-line
.citation-block footer
.research-card-kicker
.research-table thead th
.framework-hub-label
.framework-featured-affordance
.framework-featured-kicker
.stress-summary-row strong
.button
.lexicon-meta-block h4
.translation-cell h4
.grammar-entry-grid h3
.field
.search-trigger
.threshold-subtitle
.threshold-tab
.toc-mobile summary
.backbone-distinct-label
.precision-threshold-card h4
.precision-variable-symbol
.framework-map-caption
.framework-map-full-resolution
.framework-map-mobile-note
.framework-map-path
.explorer-theme-note h4
.explorer-block h4
.regulation-model-card h3
.page-article .toc-desktop h2
.page-article .toc-list a
.doc-body th
.constraint-list
.site-footer-copy
.source-note
.route-status-note
.phase1-kicker
.phase1-section-header p
.nav-planned
body.generated-ai-corpus-page .research-toc
body.generated-ai-corpus-page .research-tools
```

These should move to the shared UI font variable rather than continuing to repeat Arial/Helvetica.

## Selectors Using Monospace Fonts

No explicit monospace stack was found before this pass. Technical blocks are styled by selectors such as:

```text
.citation-block pre
.citation-card pre
.research-code-block
.doc-body pre
.framework-map-citation pre
.search-footer-hint kbd
.formula-block
.manuscript pre
body.generated-ai-corpus-page .research-code-block
body.generated-ai-corpus-page pre
pre
code
```

These selectors should receive or preserve `var(--font-mono)` where they represent code, command examples, machine-readable identifiers, formulas, receipts, or citation export blocks.

## Page-Specific Overrides

The audited HTML files and shared header/footer fragments do not contain inline font-family overrides.

Typography is controlled through `assets/styles.css` and the shared shell script only injects existing header/footer markup into selected pages.

## Legacy Selectors

Later archive and generated-corpus sections duplicate UI font stacks rather than sharing a variable. These are legacy style layers and should be updated narrowly to the new variables without broad archive redesign.

The `phase1` selectors inherit body typography for long-form copy and only set UI font stacks for labels/navigation.

## Typography Inconsistencies

- Public body text uses Georgia/Times while many labels and navigation areas use Arial/Helvetica.
- Headings inherit the serif body stack, but the requested system calls for Open Sans headings.
- Technical blocks have code-like styling but no explicit monospace font stack.
- `.field input` uses the old serif publication stack even though form controls should follow the UI/body Open Sans system.
- `.precision-formula` uses the old serif publication stack even though formulas and machine-readable material should remain distinct with monospace.

## Selectors That Should Remain Unchanged In Role

The following selector groups should keep their functional role while receiving the appropriate font variable:

```text
pre
code
kbd
.citation-block pre
.citation-card pre
.research-code-block
.doc-body pre
.framework-map-citation pre
.formula-block
.manuscript pre
body.generated-ai-corpus-page .research-code-block
body.generated-ai-corpus-page pre
```

These should remain monospace.

Italic styles such as `.grammar-note`, `.loading`, `.missing`, `.hero-note`, `.synthesis-clarification-intro`, and related note styles should remain italic; the pass does not require rewriting their meaning or copy.
