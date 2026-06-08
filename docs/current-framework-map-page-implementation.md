# Current Framework Map Page Implementation

Date: 2026-06-08

## 1. Page Route

- Canonical public route: `/pages/map.html`
- Canonical URL: `https://alignmenttheory.org/pages/map.html`
- No new competing primary map route was created.

## 2. Prior Page Problems

- The route still presented the older diagram as the primary map.
- The page was titled `Earlier Alignment Theory Map`.
- The page used legacy navigation and footer markup rather than shared-shell markers.
- The image area and citation area used older stacked blocks that could visually collide.
- Citation content appeared twice.
- Current readers were routed toward an archival artifact instead of the current framework.

## 3. New Image Asset Path

- `assets/images/alignment-theory-current-framework-map.png`
- Intrinsic dimensions used in HTML: `1491x1055`

## 4. Old Image Preservation Path

- `assets/images/alignment-theory-complete-map.png`
- The older image remains present and reachable.

## 5. Page Metadata Changes

- Title changed to `Current Framework Map | Alignment Theory`.
- Canonical URL preserved.
- Meta description, OG description, Twitter description, and JSON-LD description now describe the current framework map.
- JSON-LD headline changed to `Current Framework Map`.

## 6. HTML Explanation Sections

The rebuilt page includes:

- Introductory current-framework text.
- Primary responsive figure and full-resolution link.
- `How To Read This Map`.
- Capacity-forming functions.
- Support relations.
- Participatory capacity.
- Internal and external alignment.
- Cross-domain research.
- HAPI.
- AGS.
- Development history.
- Citation.

## 7. HAPI And AGS Links

- HAPI link: `/pages/human-agency-preservation-infrastructure.html`
- AGS link: `/pages/alignment-governance-stack.html`

## 8. Citation-Layout Repair

- Removed duplicate citation blocks from the old page.
- Added one citation section aligned to the current page:
  - `Bower, Michael. (2026). Current Framework Map. AlignmentTheory.org.`
- Added matching BibTeX for the current route.

## 9. Reading-Path Updates

Updated current public reading paths in:

- `index.html`
- `start-here.html`
- `pages/framework.html`
- `pages/where-to-start.html`
- `assets/app.js`
- `scripts/generate-ai-research-pages.mjs`

## 10. Generator-Source Edits

- Updated `scripts/generate-ai-research-pages.mjs` so the AI Governance hub points to the Current Framework Map and uses the new current-framework map asset.
- `--render-from-source` was not used.

## 11. Regenerated Output Files

- `node scripts/generate-ai-research-pages.mjs` ran successfully and reported 12 generated AI research corpus shells updated.
- `node scripts/generate-ai-research-pages.mjs --hub-only` ran successfully and reported `pages/ai-alignment-research.html` updated.
- Content diffs remain on `pages/ai-alignment-research.html`; other generated corpus files show modified in `git status` because of line-ending normalization warnings, but `git diff --name-only` does not show content changes for those files.

## 12. Shared-Shell Changes

- Added `pages/map.html` to `scripts/apply-shared-shell.mjs`.
- Shared-shell target uses `root: "../"` and current section `THEORY`.

## 13. CSS Scope

Added narrowly scoped styles for:

- `.current-framework-map-shell`
- `.framework-map-article`
- `.framework-map-header`
- `.framework-map-figure`
- `.framework-map-image`
- `.framework-map-caption`
- `.framework-map-grid`
- `.framework-map-section`
- `.framework-map-path`
- `.framework-map-history`

## 14. Sitemap Result

- `/pages/map.html` was already present in `sitemap.xml`.
- No route rename or redirect was required.

## 15. Validation Result

- `npm run build`: passed. Static site only; no build step required.
- `node scripts/verify-static-site.mjs`: passed, 162 HTML pages verified.
- `npm run lint:editorial`: strict hard-ban violations remained 0. The command exits nonzero because 104 pre-existing archive hard-ban findings remain outside this scoped repair.
- `npm run verify:ai-corpus`: passed, 12 generated AI corpus routes verified.
- `npm run apply:shell`: passed.
- Second `npm run apply:shell`: deterministic; shared-shell target hashes were unchanged.
- Normal AI research generator repeated twice: deterministic; output hashes were unchanged on the second pass.
- `--hub-only` generator repeated twice: deterministic; hub hash stayed `80076C3946DCA0AF26235E90628FD86080F2F531421F3C3E4D3FA117DED9F543`.
- `git diff --check`: passed with line-ending warnings only.
- Browser visual review: not completed because the in-app browser runtime failed twice with the local sandbox startup error. Static link, metadata, JSON-LD, asset, and overflow-oriented CSS checks were completed instead.

## 16. Unresolved Decisions

- Whether the older `pages/framework.html` route should later be moved into Archive or rebuilt with the same shared shell.
- Whether HAPI and AGS should eventually link to external project sites when those public sites are ready.
