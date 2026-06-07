# Generated AI Corpus Source Map

Date: 2026-06-07

Status: Phase 9 audit-only source map. No generator mode was executed while building this map.

## Architecture Summary

- Route list, canonical paths, status categories, and optional notices live in `scripts/generated-ai-corpus-routes.mjs`.
- The current normal generator path in `scripts/generate-ai-research-pages.mjs` reads the rendered 12 HTML files and updates shell, canonical tags, body class, and optional status notices in place.
- `--hub-only` reads and writes only `pages/ai-alignment-research.html`, replacing or inserting the Applied Governance Branch section.
- `--render-from-source` writes all 12 generated HTML files from embedded generator data and templates. It is a legacy path for now.
- There is no source Markdown or JSON input for generated body copy.
- Direct HTML body edits survive the normal generator mode but do not survive `--render-from-source`.

## Shared Source Locations

- page body source for paper routes: `papers` array in `scripts/generate-ai-research-pages.mjs`
- glossary body source: `glossaryEntries` plus the `ai-alignment-glossary` paper object
- hub body source: `renderHub()` plus `papers`, `pcpiPaper`, `externalRefs`, and helper functions
- citation body source: `renderCite()`, citation helpers, `papers`, `pcpiPaper`, and `howToCiteItem`
- metadata source in legacy render path: `pageHead()`
- metadata source in normal mode: preserved from current rendered HTML
- canonical source in normal mode: `scripts/generated-ai-corpus-routes.mjs`
- status notice source: `scripts/generated-ai-corpus-routes.mjs`
- navigation source in normal mode: `corpusHeader` and `corpusFooter`
- related links source: `related` arrays on paper objects plus `paperBySlug`

## Route Map

### `pages/ai-alignment-research.html`

- title: AI Alignment Research | Alignment Theory
- status category: current hub
- body source: `renderHub()`, with cards and reading order built from `papers`, `pcpiPaper`, `externalRefs`, and hardcoded hub sections
- metadata source: current rendered HTML in normal mode; `pageHead()` in `--render-from-source`
- template source: `renderHub()`, `shell()`, `corpusHeader`, `corpusFooter`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: generator template and source objects
- unresolved source questions: whether the hub body should be converted to a structured data object before editorial cleanup

### `pages/how-to-cite.html`

- title: How to Cite Alignment Theory | Alignment Theory
- status category: current reference
- body source: `renderCite()`, citation helpers, `papers`, `pcpiPaper`, and `howToCiteItem`
- metadata source: current rendered HTML in normal mode; `pageHead()` in `--render-from-source`
- template source: `renderCite()`, citation card helpers, `shell()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: generator template and citation helper data
- unresolved source questions: whether citation formats should be checked against a citation style source before copy edits

### `pages/ai-alignment-executive-summary.html`

- title: Executive Summary: Alignment Theory AI Alignment Research | Alignment Theory
- status category: current reference
- body source: `papers` entry with slug `ai-alignment-executive-summary`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether PDF text or rendered HTML should be treated as the editorial baseline

### `pages/ai-alignment-three-layer-blueprint.html`

- title: The Three-Layer Blueprint for AI Alignment | Alignment Theory
- status category: current technical research
- body source: `papers` entry with slug `ai-alignment-three-layer-blueprint`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether layer names are final enough for source-level glossary linking

### `pages/ai-alignment-literature-review.html`

- title: Literature Review: AI Alignment Approaches and the Drift Detection Gap | Alignment Theory
- status category: current reference
- body source: `papers` entry with slug `ai-alignment-literature-review`, plus `externalRefs`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `referenceList()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether external-source summaries should receive a citation review before editorial cleanup

### `pages/ai-alignment-competitive-positioning.html`

- title: Competitive Positioning: Alignment Theory vs Observability, Evals, and Safety Monitors | Alignment Theory
- status category: current technical research
- body source: `papers` entry with slug `ai-alignment-competitive-positioning`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether vendor/tool-category comparisons need external references before promotion

### `pages/ai-alignment-who-this-is-for.html`

- title: Who This Is For: Role Map for AI Alignment Research | Alignment Theory
- status category: current reference
- body source: `papers` entry with slug `ai-alignment-who-this-is-for`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether role labels should align with HAPI and AGS public terminology

### `pages/ai-alignment-methodology.html`

- title: Real Case Methodology and Evaluation Protocol | Alignment Theory
- status category: current technical research
- body source: `papers` entry with slug `ai-alignment-methodology`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether methodology claims need separate protocol evidence before public revision

### `pages/ai-alignment-glossary.html`

- title: Formal Glossary of Alignment Theory Terms for AI Systems | Alignment Theory
- status category: current reference
- body source: `papers` entry with slug `ai-alignment-glossary` and `glossaryEntries`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, glossary branch of `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object and glossary entries
- unresolved source questions: whether terms should later move to a shared glossary data file

### `pages/ai-alignment-lineage.html`

- title: Framework Evolution and Research Lineage | Alignment Theory
- status category: development history
- body source: `papers` entry with slug `ai-alignment-lineage`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: `scripts/generated-ai-corpus-routes.mjs`
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether lineage should remain generated or become an archive/manual page later

### `pages/ai-alignment-limitations.html`

- title: Limitations, Critiques, and Open Problems | Alignment Theory
- status category: current technical research
- body source: `papers` entry with slug `ai-alignment-limitations`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether limits should be linked to a claims-evidence register

### `pages/ai-alignment-casebook.html`

- title: Empirical Drift Casebook and Evaluation Cases | Alignment Theory
- status category: current technical research
- body source: `papers` entry with slug `ai-alignment-casebook`
- metadata source: current rendered HTML in normal mode; `pageHead(paper)` in `--render-from-source`
- template source: `renderPaper()`, `paperSections()`, `relatedBlock()`, `researchTools()`
- notice source: none
- canonical source: `scripts/generated-ai-corpus-routes.mjs`
- direct HTML edits survive regeneration: yes in normal mode; no in `--render-from-source`
- later body edits should occur in: source object
- unresolved source questions: whether casebook examples should remain synthetic-only or connect to a reviewed evaluation dataset later
