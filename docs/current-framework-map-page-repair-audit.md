# Current Framework Map Page Repair Audit

Date: 2026-06-08

## Repository State

- Initial branch check found a clean worktree on `main`.
- Switched to the existing expected branch: `alignment-theory-phase2-foundation`.
- Confirmed clean worktree after switching.
- Recent branch head: `d08530d fix: make navigation dropdown opaque`.
- No production deploy or merge action was performed.

## Asset Confirmation

- New supplied asset exists: `assets/images/alignment-theory-current-framework-map.png`.
- New asset dimensions: `1491x1055`.
- Older preserved asset remains in place: `assets/images/alignment-theory-complete-map.png`.
- The older asset was not overwritten or deleted.

## Current `pages/map.html`

- The route exists and is indexed in `sitemap.xml`.
- The page title, visible heading, OG title, Twitter title, and JSON-LD headline still say `Earlier Alignment Theory Map`.
- The page presents `alignment-theory-complete-map.png` as the primary diagram.
- The page describes itself as a historical artifact instead of the current public map.
- The page uses older header/footer markup rather than the controlled shared-shell markers.
- The page includes duplicate citation material: a short citation paragraph plus a separate citation block.
- Metadata and citation wording still refer to `The Complete Map` and the earlier diagram.

## Layout Findings

- Current map styles are tied to `.map-page`, `.complete-map-figure`, and `.complete-map-image`.
- The old page uses several legacy blocks near the image: work metadata, attribution callout, figure caption, full-resolution note, citation paragraph, button group, citation block, and source note.
- The overlapping behavior is likely caused by the combination of legacy page markup, wide image scaling, duplicate citation blocks, and old archive-style content stacked without the current article shell.
- The page needs a single figure, a visible full-resolution image link, one clean citation block, and scoped map-page spacing.

## Shared Shell

- `assets/fragments/site-header.html` and `assets/fragments/site-footer.html` define the current publication shell.
- `scripts/apply-shared-shell.mjs` targets `index.html`, `start-here.html`, `about.html`, `papers.html`, `notes/index.html`, HAPI, and AGS.
- `pages/map.html` is not currently in the controlled shared-shell target list.
- The map page should be added as a scoped target with `root: "../"` and a current section of `THEORY`.

## Reading-Path Findings

Current public-facing map references were found in:

- `pages/ai-alignment-research.html`
- `scripts/generate-ai-research-pages.mjs`
- `pages/where-to-start.html`
- `pages/framework.html`
- `assets/app.js`

Likely actions:

- Update the AI Governance hub through `scripts/generate-ai-research-pages.mjs`, then regenerate output.
- Update `assets/app.js` search and archive labels from older-map wording to current-map wording.
- Update `pages/where-to-start.html` and `pages/framework.html` only where the visible reading path should now point to the current map.
- Preserve old filenames and provenance wording where they refer to historical assets or licensing.

## Sitemap

- `sitemap.xml` already contains `https://alignmenttheory.org/pages/map.html`.
- No slug rename or redirect is needed.

## Editorial Lint Baseline

Baseline run before page rewrite:

- Strict hard-ban violations: 0
- Strict review matches: 326
- Archive hard-ban findings covered by baseline: 207
- New archive hard-ban findings: 104
- Archive review matches: 4092
- Protected-term matches: 6303
- Exceptions applied: 0
- Prunable baseline entries: 104

The new archive hard-ban findings are pre-existing archive findings and are outside this controlled map repair. This pass should keep strict hard-ban violations at 0 and avoid adding broad exceptions.

## Implementation Notes

- Rebuild `pages/map.html` as the canonical Current Framework Map page.
- Use `assets/images/alignment-theory-current-framework-map.png` as the primary visual.
- Preserve `assets/images/alignment-theory-complete-map.png` through a development-history link.
- Use a scoped body class and scoped CSS.
- Keep PCPI wording careful: documented scoring model and early evaluation tool, not externally validated or empirically calibrated.
