# Structural Language Batch 1 Cleanup Report

Date: 2026-06-07

## 1. Exact Files Changed

Public routes:

- `pages/about.html`
- `pages/ai-alignment-and-alignment-theory.html`
- `pages/ai-alignment-casebook.html`
- `pages/ai-alignment-glossary.html`
- `pages/alignment-theory-in-plain-language.html`
- `pages/glossary.html`
- `pages/human-agency-preservation-infrastructure.html`
- `pages/lexicon.html`
- `projects/agent-action-gate.html`

Persistent generated source:

- `scripts/generate-ai-research-pages.mjs`

Editorial and documentation:

- `AGENTS.md`
- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `docs/structural-language-linter-recommendation.md`
- `docs/structural-language-batch1-selected-edits.md`
- `docs/structural-language-batch1-retained-uses.md`
- `docs/structural-language-batch1-diff-review.md`
- `docs/structural-language-batch1-cleanup-report.md`

## 2. Edit Count

Implemented 19 sentence-level edits across 9 public-facing routes.

The pass stayed within the requested limits:

- no more than 9 public-facing routes
- no more than 25 sentence-level edits
- no route, slug, anchor, identifier, URL, PDF, or compatibility-reference changes

## 3. Skipped Items

Skipped ambiguous or precise uses, including:

- `internal structure`, `structurally costly`, and diagnostic exposure language in `pages/alignment-theory-in-plain-language.html`
- term/title uses such as `Hidden Structure`, `Structural Dependence`, `Four Structural States`, and `Shared Core Structure`
- technical uses such as `structural capacity`, `structural condition`, `structural misfit`, `structural restoration`, and `structurally requires`
- sitewide provenance phrasing: `interpretive structure`
- deep archive and stress-test pages outside the requested batch

## 4. Retained High-Visibility Uses

Documented in `docs/structural-language-batch1-retained-uses.md`.

Retained uses are mainly:

- formal theory terms
- page titles and route surfaces
- compatibility references
- concrete descriptions of arrangements, capacities, or relations
- provenance language

## 5. Generated-Source Changes

Changed `scripts/generate-ai-research-pages.mjs` before touching rendered generated HTML:

- `Pseudo-Freedom` glossary definition: `useful structure` to `useful criteria`
- `Pseudo-Freedom` casebook explanation: `recommendation structure` to `decision rubric`

## 6. Regenerated Output Changes

The supported normal generator path was run twice and remained deterministic. The `--hub-only` generator path was run twice and remained deterministic.

Because the supported normal generator path updates generated shells but does not rewrite these body sentences, the two rendered generated pages were repaired after the source edit:

- `pages/ai-alignment-casebook.html`
- `pages/ai-alignment-glossary.html`

No `--render-from-source` command was run.

## 7. Linter Review-Only Additions

Added review-only CSV entries for:

- `structural problem`
- `structural pattern`
- `structural pressure`
- `structural failure`
- `structural logic`
- `structural boundary`
- `structural layer`

`Structural` itself was not banned. No broad exceptions were added.

`AGENTS.md` and `docs/structural-language-linter-recommendation.md` now state: use structural only when it names a concrete arrangement or relationship; prefer the exact mechanism where possible.

## 8. Editorial-Lint Results

`npm run lint:editorial` passed.

Final lint counts:

- Strict hard-ban violations: 0
- Strict review matches: 326
- Archive hard-ban findings covered by baseline: 311
- New archive hard-ban findings: 0
- Archive review matches: 4092
- Protected-term matches: 6303
- Exceptions applied: 0
- Prunable baseline entries: 0

The selected structural phrases are now review-only terms. After the cleanup, no selected structural review phrase remains on the current strict public surfaces checked during this pass.

## 9. Full Validation Results

Passed:

- `npm run build`
- `node scripts\verify-static-site.mjs`
- `npm run lint:editorial`
- `npm run verify:ai-corpus`
- `npm run apply:shell`
- post-shell `node scripts\verify-static-site.mjs`
- `git diff --check`

Static verification remained at 162 HTML pages.

Generated-path validation:

- normal generator run twice; second run produced no tracked diff hash change
- `--hub-only` run twice; second run produced no tracked diff hash change
- `npm run verify:ai-corpus` passed after generator checks

Confirmed:

- local links pass
- JSON and JSON-LD remain valid
- PDFs remain reachable through static verification
- canonical metadata remains valid
- AI Governance hub links to HAPI, AGS, and AAG remain present
- Complete Map repair remains intact
- PCPI formula and scoring bands were not touched
- no external repositories changed
- no production deployment occurred

## 10. Remaining Vague Uses

Remaining selected review phrases appear in:

- deep archive and stress-test pages outside this small batch
- theological/archive pages requiring author-level review
- linter configuration and audit documentation

Examples outside this pass include `pages/social-media-and-information-stress-test.html`, `pages/one-pattern-across-scales.html`, `pages/why-multiple-fields-are-converging-on-the-same-ai-question.html`, and `pages/why-the-present-may-be-safer-than-success.html`.

## 11. Archive-Treatment Recommendation

Keep the archive treatment from `docs/structural-language-archive-treatment.md`:

- do not archive-wide replace
- revise archive/stress-test pages only in page-level batches
- preserve historical formulations unless the page is still acting as a current reading-path surface

## 12. Unresolved Human Decisions

- Whether high-visibility stress tests should be treated as active public surfaces or marked more clearly as archive.
- Whether theory terms such as `Structural Dependence` and `Four Structural States` should remain as titles long term.
- Whether `interpretive structure` should stay as the sitewide provenance phrase or be revised in a separate sitewide footer pass.

## 13. Recommended Next Pass

Run a second small batch on active-path pages that still contain review-only phrases, especially:

- `pages/why-multiple-fields-are-converging-on-the-same-ai-question.html`
- `pages/why-the-present-may-be-safer-than-success.html`
- `pages/what-the-framework-actually-claims.html`
- `pages/social-media-and-information-stress-test.html`
- `pages/one-pattern-across-scales.html`

Keep the same limits: no archive-wide replacement, no route changes, no PDF edits, and no more than 25 sentence-level edits.
