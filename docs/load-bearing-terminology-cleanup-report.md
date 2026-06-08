# Load-Bearing Terminology Cleanup Report

Date: 2026-06-07

## 1. Exact Files Changed

Public and source files:

- `AGENTS.md`
- `start-here.html`
- `assets/app.js`
- `pages/about.html`
- `pages/where-to-start.html`
- `pages/revised-framework-center.html`
- `pages/load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html`
- `pages/how-to-use-alignment-theory.html`
- `pages/shared-core-structure-across-domains.html`
- `pages/what-the-framework-actually-claims.html`
- `pages/glossary.html`
- `pages/lexicon.html`
- `pages/alignment-theory-in-plain-language.html`
- `pages/ai-civilization-and-human-formation.html`
- `pages/load-bearing-human-capacities-in-the-ai-age.html`
- `pages/why-multiple-fields-are-converging-on-the-same-ai-question.html`
- `pages/why-the-present-may-be-safer-than-success.html`
- `pages/ai-alignment-lineage.html`
- `scripts/generate-ai-research-pages.mjs`
- `scripts/restructure-meta-framework.mjs`

Editorial and documentation files:

- `docs/capacity-forming-functions-terminology.md`
- `docs/load-bearing-terminology-audit.md`
- `docs/load-bearing-terminology-cleanup-report.md`
- `docs/current-framework-map-plan.md`
- `docs/editorial-cleanup-plan.md`
- `docs/generated-corpus-editorial-inventory.md`
- `docs/load-bearing-archive-treatment-decision.md`
- `docs/load-bearing-reconciliation-status.md`
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`
- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`
- `docs/editorial/editorial-lint-baseline.json`
- `scripts/editorial-lint-config.mjs`
- `scripts/lint-editorial.mjs`

## 2. Total Occurrences Found

Initial read-only inventory found 373 textual occurrences across 70 files.

## 3. Public-Facing Occurrences Replaced

Replaced current-reader terminology on:

- homepage-adjacent entry copy in `start-here.html`
- `pages/where-to-start.html`
- current theory center pages
- glossary and lexicon surfaces
- plain-language bridge page
- AI-era human agency pages
- runtime search/index copy in `assets/app.js`

## 4. Generated-Source Occurrences Replaced

Updated `scripts/generate-ai-research-pages.mjs` so the AI lineage source object uses `Capacity-Forming Function`.

Because `--render-from-source` remains quarantined, the existing rendered page `pages/ai-alignment-lineage.html` received a narrow matching output repair. This mirrors the Complete Map hub persistence pattern: the persistent source now contains the correct wording, but the full render path remains intentionally unused.

## 5. AI-Readable Artifact Occurrences Replaced

Updated public JSON-LD blocks embedded in edited HTML pages.

Regenerated `docs/editorial/editorial-lint-baseline.json` after moving `load-bearing` from protected/review vocabulary to a hard-ban term. The regenerated baseline preserves historical archive findings while enforcing the new rule on strict public surfaces.

## 6. Documentation Occurrences Replaced

Updated:

- AGENTS guidance
- Current Framework Map plan
- editorial cleanup plan
- generated-corpus editorial inventory
- editorial style guide
- terminology policy

## 7. Retained Occurrences And Reasons

Retained:

- `load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html`: route compatibility.
- `load-bearing-human-capacities-in-the-ai-age.html`: route compatibility.
- `assets/load-bearing-human-capacities-in-the-ai-age.pdf`: PDF binary/filename retained.
- `sitemap.xml` route entries: existing public URLs retained.
- `data-term`, `id`, and `href` compatibility identifiers: retained to avoid breaking glossary/anchor behavior.
- editorial blacklist, CSV, style guide, AGENTS, and new terminology docs: intentional guardrail mentions.
- `docs/complete-map-reading-path-repair.md`: historical lint count retained.
- older archive/stress-test pages: retained pending author review because the safe broad scripted replacement was rejected and sentence-level edits are needed to preserve domain-specific claims.

## 8. Human Decisions Still Required

- Whether older stress-test pages should be rewritten now or marked as archival until domain review.
- Whether old route slugs should eventually redirect to cleaner `capacity-forming` route names.
- Whether the PDF titled `Load-Bearing Human Capacities in the AI Age` should be regenerated under the visible title `Agency-Forming Human Capacities in the AI Age`.
- Whether the editorial baseline should be regenerated after archive strategy is decided.

## 9. Linter Changes

- `load-bearing` and `load bearing` are now hard-ban phrases in `AI_LANGUAGE_LINTER_LIST.csv`.
- Unicode hyphen and dash variants are matched by `scripts/lint-editorial.mjs`.
- `load-bearing` was removed from protected vocabulary.
- Replacement vocabulary was added: `capacity-forming function(s)` and `agency-forming function(s)`.

## 10. AGENTS.md Changes

`AGENTS.md` now says not to use `load-bearing` as a default abstract metaphor, and to use:

- `capacity-forming functions` for the formal Alignment Theory concept
- `agency-forming functions` in HAPI-specific contexts
- direct plain language elsewhere

## 11. Terminology-Policy Summary

Canonical term:

- `capacity-forming functions`

Canonical definition:

- Capacity-forming functions are activities that people, groups, or systems must continue to perform in order to retain the ability to act, judge, adapt, and remain responsible.

HAPI/human-agency term:

- `agency-forming functions`

Plain-language fallback:

- `essential functions`

## 12. Validation Results

Completed validation:

- `npm run build` passed.
- `node scripts\verify-static-site.mjs` passed before and after shell application; 162 HTML pages verified.
- `npm run lint:editorial` passed after baseline regeneration.
- `npm run verify:ai-corpus` passed.
- `npm run apply:shell` passed.
- `git diff --check` passed; Git reported LF-to-CRLF working-copy warnings only.
- A second `npm run apply:shell` pass produced no tracked diff hash change.

Editorial lint final counts:

- Strict hard-ban violations: 0.
- Strict review matches: 326.
- Archive hard-ban findings covered by baseline: 311.
- New archive hard-ban findings: 0.
- Archive review matches: 4071.
- Protected-term matches: 6301.

Negative test:

- A temporary public sentence containing `load-bearing` in `start-here.html` produced one strict hard-ban failure, as expected.
- After removing the temporary sentence, `npm run lint:editorial` passed again.

Generator refresh:

- `node scripts\generate-ai-research-pages.mjs` was run twice; the second run produced no tracked diff hash change.
- `node scripts\generate-ai-research-pages.mjs --hub-only` was run twice; the second run produced no tracked diff hash change.
- `npm run verify:ai-corpus` passed after both generator paths.

Final terminology search:

- Initial inventory: 373 textual matches across 70 files.
- Post-cleanup search: 521 textual matches across 65 files, larger because the new policy docs and regenerated lint baseline intentionally quote the banned phrase.
- Final classified retained matches: 309 intentional audit/policy/guardrail/baseline quotations, 152 compatibility slug/route/URL references, 42 historical archive body occurrences, 7 `data-term` identifiers, 2 anchor compatibility identifiers, 2 sitemap URLs, 1 PDF filename/metadata reference, and 6 reviewed compatibility or unclear code references.

Remaining archive occurrences are retained intentionally. The archive treatment recommendation is documented in `docs/load-bearing-archive-treatment-decision.md`: do not archive-wide replace; revise older archive/stress-test pages later in controlled, sentence-level batches.

Recommended next pass:

- Run a separate structural-language audit for older archive pages and stress tests.
- Decide whether to rename public route slugs, regenerate the PDF under the new visible title, and prune baseline entries after archive review.
