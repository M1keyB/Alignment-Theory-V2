# Load-Bearing Terminology Audit

Audit date: 2026-06-07

## Inventory Summary

Initial repository inventory found 373 textual matches across 70 files for `load-bearing`, `load bearing`, and Unicode dash variants.

File categories found:

- Public HTML pages and generated HTML
- Generator and restructuring source files
- JavaScript glossary/search-index copy
- Markdown documentation
- Editorial configuration and baseline files
- XML sitemap route entries
- PDF metadata
- Content source Markdown

## Implementation Classification

### Replaced In Current Public Reading Path

- `start-here.html`: one public-facing abstract use replaced with `capacity-forming functions`.
- `pages/where-to-start.html`: public-facing conceptual copy and card headings replaced with `capacity-forming`.
- `pages/about.html`: public-facing project description replaced with `capacity-forming functions`.
- `pages/revised-framework-center.html`: current framework center now uses `capacity-forming functions`.
- `pages/load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html`: visible title, metadata, JSON-LD, H1, and formal definition replaced with `capacity-forming functions`; old route retained.
- `pages/how-to-use-alignment-theory.html`: visible copy and metadata replaced with `capacity-forming functions`.
- `pages/shared-core-structure-across-domains.html`: active framework comparison copy replaced with `capacity-forming functions`; old structural metaphor rewritten as `supporting structure`.
- `pages/what-the-framework-actually-claims.html`: current claims language replaced with `capacity-forming functions`.
- `pages/glossary.html`: visible glossary entries replaced with `capacity-forming function`, `participatory capacity`, or direct support language.
- `pages/lexicon.html`: revised framework terms replaced with `capacity-forming function`.
- `pages/alignment-theory-in-plain-language.html`: plain-language bridge text replaced with `capacity-forming`.

### Replaced In AI/Human-Agency Context

- `pages/ai-civilization-and-human-formation.html`: AI-era human function language replaced with `agency-forming`.
- `pages/load-bearing-human-capacities-in-the-ai-age.html`: visible title, metadata, JSON-LD, H1, headings, and body copy replaced with `agency-forming`; old route and PDF filename retained.
- `pages/why-multiple-fields-are-converging-on-the-same-ai-question.html`: visible button text and sentence replaced with `agency-forming`.
- `pages/why-the-present-may-be-safer-than-success.html`: visible button text and body copy replaced with `agency-forming`.

### Replaced In Persistent Publishing Sources

- `assets/app.js`: glossary labels, definitions, search/index titles, descriptions, and tags replaced.
- `scripts/generate-ai-research-pages.mjs`: generated AI lineage source text replaced.
- `pages/ai-alignment-lineage.html`: rendered output adjusted to match the updated generated source because `--render-from-source` remains quarantined.
- `scripts/restructure-meta-framework.mjs`: dormant restructuring source text replaced, without running the script.

### Editorial Guardrails Updated

- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`: `load-bearing` and `load bearing` moved to hard-ban phrases.
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`: added `load-bearing` and `load bearing`.
- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`: updated replacement guidance.
- `scripts/editorial-lint-config.mjs`: removed `load-bearing` from protected vocabulary and added replacement terms.
- `scripts/lint-editorial.mjs`: added Unicode dash/space normalization for the banned phrase family.
- `AGENTS.md`: replaced protected vocabulary entry and added direct instruction against default abstract use.

## Retained Occurrences And Reasons

- Route slugs and URLs such as `pages/load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html`: retained for route compatibility.
- Route slugs and URLs such as `pages/load-bearing-human-capacities-in-the-ai-age.html`: retained for route compatibility.
- `assets/load-bearing-human-capacities-in-the-ai-age.pdf`: retained because PDF binaries were not modified during this pass.
- `sitemap.xml`: retained because it records existing public routes.
- `data-term="load-bearing-function"`, `id="load-bearing-function"`, and `href="#load-bearing-function"`: retained as compatibility identifiers.
- `docs/capacity-forming-functions-terminology.md`: intentional policy quotations.
- `AGENTS.md`, editorial blacklist, CSV, and style guide: intentional guardrail mentions.
- `docs/complete-map-reading-path-repair.md`: retained historical lint-frequency metric from an earlier report.
- `docs/editorial/editorial-lint-baseline.json`: retained historical baseline contexts; should be regenerated only during a deliberate baseline maintenance pass.
- Older stress-test and archive pages still contain abstract uses. They were not fully rewritten in this pass because the safe broad scripted replacement was rejected and those pages require author review to preserve argument structure.

## Human Decision Required

The author should decide whether older stress-test pages are current enough to receive sentence-level terminology edits now, or whether they should remain archival until reviewed by domain.

## Reconciliation Update

After the linter rule change and archive-baseline reconciliation, the final repository-wide search found 521 textual matches across 65 files. This number is larger than the initial 373 because the new terminology docs and regenerated editorial baseline intentionally quote or record the banned phrase.

Final classification:

- Intentional audit, policy, guardrail, or baseline quotation: 309
- Compatibility slug, route, or URL reference: 152
- Historical archive body occurrence: 42
- `data-term` compatibility identifier: 7
- Anchor compatibility identifier: 2
- Sitemap URL: 2
- PDF filename or PDF metadata reference: 1
- Compatibility/unclear code reference reviewed manually: 6

Representative retained compatibility references:

- `assets/app.js:26` keeps the `load-bearing-function` glossary key for runtime compatibility while the visible label now reads `capacity-forming function`.
- `assets/app.js:728`, `assets/app.js:1457`, and `assets/app.js:1490` retain old route slugs while visible labels now use `capacity-forming` or `agency-forming`.
- `pages/ai-alignment-lineage.html:88`, `pages/ai-alignment-lineage.html:117`, and `pages/ai-alignment-lineage.html:133` retain the old anchor target while visible text now reads `Capacity-Forming Function`.
- `sitemap.xml:509` and `sitemap.xml:514` retain current public URLs.
- `assets/load-bearing-human-capacities-in-the-ai-age.pdf` retains the PDF title metadata because PDF binaries were not modified.

Historical archive examples retained for later sentence-level review:

- `pages/addiction-and-recovery-stress-test.html`
- `pages/biological-stress-test.html`
- `pages/boundary-conditions-and-failure-cases-of-alignment-theory.html`
- `pages/community-and-high-control-group-stress-test.html`
- `pages/conflict-and-polarization-stress-test.html`
- `pages/economic-stress-test.html`
- `pages/education-stress-test.html`
- `pages/health-behavior-and-lifestyle-change-stress-test.html`
- `pages/how-the-revised-model-maps-to-the-dmn.html`
- `pages/stress-tests.html`
- `pages/the-four-structural-states-of-support-and-participation.html`
- `pages/thermodynamic-stress-test.html`
- `pages/why-structural-dependence-hides-behind-functional-success.html`

Action:

- Retain compatibility references.
- Retain intentional audit, baseline, and guardrail quotations.
- Retain older archive body occurrences temporarily under the archive hard-ban baseline.
- Revise high-visibility archive pages later in controlled batches with sentence-level edits.
