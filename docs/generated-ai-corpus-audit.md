# Generated AI Corpus Audit

Phase 4 audit document. Created after the Phase 3 route-status commit `7688069`.

## Purpose

This audit identifies which AI-alignment public pages are generated or script-mutated, what writes them, and where later editorial cleanup should happen so changes persist.

## Current Status

- The repo is a static HTML site.
- `package.json` does not run a real build pipeline. `npm run build` prints a static-site message.
- The active shared-shell script is `scripts/apply-shared-shell.mjs`.
- The AI research generator is present but not wired into `package.json`.
- The broad meta restructure script is present but should not be rerun in its current form without review.
- No active `data-markdown-src` markers were found in current public HTML, so `scripts/render-static-content.js` has no Markdown-backed public pages to render at this time.

## AI Research Pages Written By `scripts/generate-ai-research-pages.mjs`

The generator writes 12 public HTML files under `pages/`. The source copy is hardcoded in the script, mostly in the `papers` array plus the hub and citation renderers.

| Public route | Rendered file | Generator source | Persistence rule |
|---|---|---|---|
| `/pages/ai-alignment-research.html` | `pages/ai-alignment-research.html` | `renderHub()` | Later durable edits should update `scripts/generate-ai-research-pages.mjs` or the generator should be retired. |
| `/pages/how-to-cite.html` | `pages/how-to-cite.html` | `renderCite()` and `howToCiteItem` | Later durable edits should update the generator source. |
| `/pages/ai-alignment-executive-summary.html` | `pages/ai-alignment-executive-summary.html` | `papers[slug=ai-alignment-executive-summary]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-three-layer-blueprint.html` | `pages/ai-alignment-three-layer-blueprint.html` | `papers[slug=ai-alignment-three-layer-blueprint]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-literature-review.html` | `pages/ai-alignment-literature-review.html` | `papers[slug=ai-alignment-literature-review]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-competitive-positioning.html` | `pages/ai-alignment-competitive-positioning.html` | `papers[slug=ai-alignment-competitive-positioning]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-who-this-is-for.html` | `pages/ai-alignment-who-this-is-for.html` | `papers[slug=ai-alignment-who-this-is-for]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-methodology.html` | `pages/ai-alignment-methodology.html` | `papers[slug=ai-alignment-methodology]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-glossary.html` | `pages/ai-alignment-glossary.html` | `papers[slug=ai-alignment-glossary]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-lineage.html` | `pages/ai-alignment-lineage.html` | `papers[slug=ai-alignment-lineage]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-limitations.html` | `pages/ai-alignment-limitations.html` | `papers[slug=ai-alignment-limitations]` | Later durable edits should update the `papers` data. |
| `/pages/ai-alignment-casebook.html` | `pages/ai-alignment-casebook.html` | `papers[slug=ai-alignment-casebook]` | Later durable edits should update the `papers` data. |

The script also defines `pcpiPaper` with slug `participatory-capacity-preservation-index`, but the script does not currently write `pages/participatory-capacity-preservation-index.html`. It only includes PCPI in hub reading paths and card data.

## PCPI Page Status

| Public route | Rendered file | Current source status | Persistence rule |
|---|---|---|---|
| `/pages/participatory-capacity-preservation-index.html` | `pages/participatory-capacity-preservation-index.html` | Public HTML exists. It is referenced by the AI research generator but is not written by it. | Treat as manually maintained until a PCPI generator/source file is added. |

PCPI should receive its own later technical review because it has dataset, formula, and download/publication implications.

## Broad Meta Script

`scripts/restructure-meta-framework.mjs` is a broad site-mutating script. It can write:

- Root HTML pages such as `start-here.html`, `convergence-map.html`, `core-constraints.html`, `applications.html`, `definitions.html`, `ai-terms.html`, `for-ai-systems.html`, `ai-alignment.html`, and `cite.html`.
- Existing HTML pages across the site via a full HTML file loop.
- `robots.txt`
- `llms.txt`
- `ai-summary.json`
- `attribution.json`
- `alignment-theory-canonical.md`
- `sitemap.xml`

The script contains older root-page copy and metadata. It should be frozen until its scope and output are reviewed against the Phase 2 and Phase 3 route decisions.

## Static Content Renderer

`scripts/render-static-content.js` can:

- Replace `<section id="doc-body" ... data-markdown-src="...">` blocks with rendered Markdown.
- Render the library grid in `pages/library.html` from `content/library.json`.

No active `data-markdown-src` markers were found in the current HTML inventory. The renderer should be used only when updating the library or after a future Markdown-backed page is added intentionally.

## Shared Shell Script

`scripts/apply-shared-shell.mjs` updates only:

- `index.html`
- `start-here.html`
- `about.html`
- `papers.html`
- `notes/index.html`

It reads:

- `assets/fragments/site-header.html`
- `assets/fragments/site-footer.html`

This is the right first implementation surface for shared navigation and footer changes after author approval.

## Files To Edit Later

| Desired later change | Durable edit target |
|---|---|
| Shared header/footer on public entry pages | `assets/fragments/site-header.html`, `assets/fragments/site-footer.html`, then `npm run apply:shell`. |
| AI research hub and generated paper-page copy | `scripts/generate-ai-research-pages.mjs`, unless the generator is retired. |
| AI-readable root metadata | Review and update source inside `scripts/restructure-meta-framework.mjs`, or replace it with a narrower metadata script. |
| Library cards | `content/library.json`, then `node scripts/render-static-content.js` if intentionally used. |
| PCPI public page | Current rendered HTML, unless a PCPI source/generator is added first. |

## Recommendations

1. Freeze `scripts/restructure-meta-framework.mjs` until it is split into smaller tasks.
2. Add comments near the generated AI research pages or in a route map so future edits do not get overwritten by the generator.
3. Before editing AI research copy, decide whether to keep the generator as source-of-truth or convert the 12 pages to manually maintained archive pages.
4. Keep Phase 5 limited to shared shell and entry pages unless the author approves generator cleanup.
