# Open Sans Typography Implementation

Date: 2026-06-08

## 1. Exact Files Changed

Typography pass files:

```text
assets/styles.css
docs/open-sans-typography-audit.md
docs/open-sans-typography-implementation.md
docs/open-sans-typography-visual-review-checklist.md
```

Separate prerequisite commit:

```text
docs/generated-corpus-worktree-reconciliation.md
```

## 2. Previous Font Stacks

The previous body stack was:

```css
"Georgia", "Times New Roman", Times, serif
```

The previous repeated UI stack was:

```css
"Arial", "Helvetica", sans-serif
```

No explicit global monospace variable existed before this pass.

## 3. Google Fonts Import

Open Sans now loads through `assets/styles.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap");
```

No font files were downloaded into the repository.

## 4. New Font Variables

The root variables are:

```css
--font-body: "Open Sans", Arial, sans-serif;
--font-heading: "Open Sans", Arial, sans-serif;
--font-ui: "Open Sans", Arial, sans-serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

## 5. Selectors Updated

Global selectors:

```text
body
h1, h2, h3, h4, h5, h6
```

Repeated UI selectors were moved from the old Arial/Helvetica stack to `var(--font-ui)`.

The final hierarchy layer applies Open Sans UI weight to navigation, buttons, labels, metadata, tables, citations, cards, map explanatory sections, footer copy, and generated AI corpus tools.

## 6. Monospace Selectors Preserved

The following remain monospace through `var(--font-mono)`:

```text
pre
code
kbd
samp
.citation-block pre
.citation-card pre
.research-code-block
.doc-body pre
.manuscript pre
.framework-map-citation pre
.formula-block
.precision-formula
body.generated-ai-corpus-page .research-code-block
body.generated-ai-corpus-page pre
```

## 7. Scoped Wrapping Fixes

No layout or wrapping fixes were required in this pass.

## 8. Current Framework Map Result

`pages/map.html` was inspected for the visible title, subtitle, introduction, current map image, full-resolution link, explanatory sections, HAPI section, AGS action path, development-history section, citation block, and footer.

The map copy and image were not changed.

## 9. Representative Legacy-Page Review

Representative pages inspected:

```text
index.html
start-here.html
about.html
papers.html
pages/map.html
pages/framework.html
pages/glossary.html
pages/ai-alignment-research.html
pages/human-agency-preservation-infrastructure.html
pages/alignment-governance-stack.html
pages/participatory-capacity-preservation-index.html
projects/agent-action-gate.html
```

No inline page-level font-family overrides were found. These pages continue to use `assets/styles.css`.

## 10. Validation Results

Passed:

```text
npm run build
node scripts/verify-static-site.mjs
npm run verify:ai-corpus
npm run apply:shell
node scripts/verify-static-site.mjs
git diff --check
npm run apply:shell
```

Static site verification remained at:

```text
Verified 162 HTML pages.
```

AI corpus verification reported:

```text
Verified 12 generated AI corpus routes.
```

Editorial lint did not pass, but reported:

```text
Strict hard-ban violations: 0
Strict review matches: 341
Archive hard-ban findings covered by baseline: 207
New archive hard-ban findings: 104
Archive review matches: 4088
Protected-term matches: 6302
Prunable baseline entries: 104
```

This typography pass did not change public copy.

## 11. Unresolved Decisions

- Whether to rebaseline or separately resolve the existing archive editorial-lint findings remains outside this typography pass.
- Visual review in the browser should decide whether the Open Sans hierarchy feels sufficiently restrained on older archive pages.
