# Complete Map Reading Path Repair

Date: 2026-06-07

## 1. Exact Files Changed

- `pages/map.html`
- `pages/framework.html`
- `pages/where-to-start.html`
- `pages/ai-alignment-research.html`
- `scripts/generate-ai-research-pages.mjs`
- `assets/app.js`
- `docs/complete-map-reference-audit.md`
- `docs/complete-map-display-repair-audit.md`
- `docs/current-framework-map-plan.md`
- `docs/complete-map-reading-path-repair.md`

## 2. Map Asset Findings

- Asset path: `assets/images/alignment-theory-complete-map.png`
- Asset exists: yes
- File type: PNG
- Dimensions: 1448 x 1086
- Size: 1,610,016 bytes

The image asset was preserved. No asset was renamed, moved, or deleted.

## 3. Embed Repair

`pages/map.html` now:

- Presents the page as `Earlier Alignment Theory Map`.
- Keeps the existing image route and direct PNG link.
- Adds intrinsic image dimensions: `width="1448"` and `height="1086"`.
- Uses historical-artifact alt text.
- Provides visible text linking to the full-resolution image.
- Tells small-screen readers to open the full-resolution image when needed.

## 4. Wording Changes

Removed public reading-path claims that the old diagram is the single-page summary of the current project.

Updated:

- Map page title, metadata, JSON-LD headline/description, and H1.
- Map page explanatory text and status note.
- Framework page map section wording.
- Where to Start related-card wording.
- AI Alignment Research hub callout wording.
- Public runtime search/index entry in `assets/app.js`.

Citation history on the map page was preserved.

## 5. Generator-Source Changes

`scripts/generate-ai-research-pages.mjs` was updated so the embedded hub source no longer oversells the older map.

Generator behavior note: `node scripts/generate-ai-research-pages.mjs --hub-only` updates only the applied-governance section in the existing hub file. It does not render the full hub from the embedded `renderHub()` source. The AI Governance hub contains one targeted rendered-output repair because the supported `--hub-only` mode does not control all reading-path copy. The direct output edit is stable under the supported normal shell path but must be reviewed if the quarantined `--render-from-source` mode is ever used.

## 6. Regenerated Outputs Changed

Commands run:

- `node scripts\generate-ai-research-pages.mjs`
- `npm run verify:ai-corpus`
- `node scripts\generate-ai-research-pages.mjs --hub-only`
- `npm run verify:ai-corpus`

Result:

- The 12 generated AI corpus shells were refreshed.
- The current tracked diff after validation shows a public hub change in `pages/ai-alignment-research.html`.
- No generated AI corpus body files remain as tracked diffs.

## 7. Route Compatibility Result

- `/pages/map.html` was kept.
- The map image path was kept.
- No redirect was added.
- No existing map asset was removed.
- Local-link verification passed.

## 8. Editorial-Lint Result

`npm run lint:editorial` passed.

- Strict hard-ban violations: 0
- Strict review matches: 326
- Archive hard-ban findings covered by baseline: 190
- New archive hard-ban findings: 0
- Archive review matches: 4071
- Protected-term matches: 6493
- Exceptions applied: 0
- Prunable baseline entries: 0

Protected-term frequency:

- alignment: 3514
- constraint: 1093
- coherence: 1020
- agency: 296
- load-bearing: 218
- governance: 190
- authority: 131
- infrastructure: 29
- substrate: 2

## 9. Validation Result

Passed:

- `npm run build`
- `node scripts\verify-static-site.mjs`
- `npm run lint:editorial`
- `npm run verify:ai-corpus`
- `npm run apply:shell`
- `node scripts\verify-static-site.mjs`
- `git diff --check`

Static verifier result:

- 162 HTML pages verified.
- Required metadata and JSON-LD are present.
- Local href/src targets exist.
- `ai-summary.json` and `attribution.json` are valid JSON.
- JSON-LD blocks are valid JSON.

Shared-shell determinism:

- Second `npm run apply:shell` pass changed no tracked diff hash.
- Before hash: `5ce9911f38e07a7e920c52657c41e164a31ffb15`
- After hash: `5ce9911f38e07a7e920c52657c41e164a31ffb15`

`git diff --check` passed with LF-to-CRLF warnings only.

## 10. Current-Framework-Map Plan

Plan created:

- `docs/current-framework-map-plan.md`

Planned future route:

- `/pages/current-framework-map.html`

The new route was not created during this repair pass.

## 11. Unresolved Decisions

- Whether HAPI and AGS should appear as current public terms, project names, or external-link labels.
- Whether the future current map should be primarily textual, visual, or both.
- Whether PCPI belongs in the research layer only or also in the governance layer.
- Whether theological source-alignment language belongs in the first view of the future map or in a provenance layer.
- Whether `/pages/map.html` should receive a stronger archive label after `/pages/current-framework-map.html` exists.
