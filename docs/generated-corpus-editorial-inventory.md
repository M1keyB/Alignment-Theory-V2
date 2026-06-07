# Generated Corpus Editorial Inventory

Date: 2026-06-07

Status: Phase 9 audit-only. No generated body copy was edited.

## Scan Notes

- Scope: preserved `<main>` bodies of the 12 generated corpus routes.
- Inputs: `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`, `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`, and `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`.
- Raw review-term counts overcount because `align` is matched inside `alignment`.
- Protected project vocabulary is not treated as an error when it names the framework or a technical part of the system.

## Summary

- hard-ban matches in generated `<main>` bodies: 1
- known hard-ban body match: `pages/ai-alignment-literature-review.html:127`, term `landscape`
- highest recurring protected terms: Alignment Theory, alignment, framework, constraint, governance, agency, architecture, PCPI
- most common pattern issue: repeated compressed explanatory sentences beginning with `This...`
- highest technical-review need: methodology, limitations, casebook, PCPI-related claims, and comparative claims about adjacent AI alignment work

## Route Inventory

### `pages/ai-alignment-research.html`

- title: AI Alignment Research | Alignment Theory
- hard-ban matches: none
- review-term matches: high, mostly protected terms such as alignment, framework, constraint, agency, governance, and architecture
- repeated sentence patterns: many compressed card summaries and repeated "This paper..." phrasing
- repeated transitions: low
- repeated three-part lists: moderate, mainly in reading-path and layer summaries
- repeated contrast formulas: one visible `not only` pattern in the orientation line
- generic summary language: moderate in hub cards
- abstract language density: moderate
- valid project vocabulary: Alignment Theory, AI governance, behavioral drift, PCPI, Realignment Layer, Agent Action Gate
- terms needing human review: enterprise, behavioral QA, measurable evaluation target, production AI
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: repeated card-summary formulas
- quotations or source-derived wording: external references section
- suggested priority: light cleanup

### `pages/how-to-cite.html`

- title: How to Cite Alignment Theory | Alignment Theory
- hard-ban matches: none
- review-term matches: moderate, mostly protected citation subject terms
- repeated sentence patterns: citation-card repetition is expected
- repeated transitions: none
- repeated three-part lists: citation format groupings are structural
- repeated contrast formulas: none
- generic summary language: low
- abstract language density: low
- valid project vocabulary: Alignment Theory, PCPI, Three-Layer Blueprint
- terms needing human review: citation title forms and author-name consistency
- clear AI-style wording problems: none
- possible AI-style wording problems: none
- quotations or source-derived wording: citation examples and BibTeX code blocks
- suggested priority: no action until citation review

### `pages/ai-alignment-executive-summary.html`

- title: Executive Summary: Alignment Theory AI Alignment Research | Alignment Theory
- hard-ban matches: none
- review-term matches: high, mostly protected terms
- repeated sentence patterns: repeated "X layer defines..." and "need..." structures
- repeated transitions: low
- repeated three-part lists: moderate
- repeated contrast formulas: several `not only` and "not enough" constructions
- generic summary language: moderate
- abstract language density: moderate
- valid project vocabulary: Objective Layer, Constraint Layer, Realignment Layer, behavioral drift, PCPI
- terms needing human review: enterprise translation, governance layer, behavioral QA
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: contrast-heavy explanatory rhythm
- quotations or source-derived wording: none identified
- suggested priority: light cleanup

### `pages/ai-alignment-three-layer-blueprint.html`

- title: The Three-Layer Blueprint for AI Alignment | Alignment Theory
- hard-ban matches: none
- review-term matches: high, mostly protected technical terms
- repeated sentence patterns: repeated layer-definition formula
- repeated transitions: low
- repeated three-part lists: moderate to high because the page defines a layered model
- repeated contrast formulas: moderate
- generic summary language: low
- abstract language density: moderate but tied to technical model terms
- valid project vocabulary: Objective Layer, Constraint Layer, Realignment Layer, Measurement Layer, detector categories, correction modes
- terms needing human review: runtime pipeline, judge model, confidence downgrade
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: some summary sentences can be shortened
- quotations or source-derived wording: none identified
- suggested priority: light cleanup after technical review

### `pages/ai-alignment-literature-review.html`

- title: Literature Review: AI Alignment Approaches and the Drift Detection Gap | Alignment Theory
- hard-ban matches: `pages/ai-alignment-literature-review.html:127`, term `landscape`
- review-term matches: high, with protected terms and external-field vocabulary
- repeated sentence patterns: several "X helps..." comparative sentences
- repeated transitions: low
- repeated three-part lists: low
- repeated contrast formulas: moderate
- generic summary language: moderate
- abstract language density: moderate
- valid project vocabulary: Alignment Theory, drift detection gap, runtime behavioral drift, model behavior specifications
- terms needing human review: RLHF, Constitutional AI, scalable oversight, interpretability, Model Spec, runtime monitoring
- clear AI-style wording problems: the flagged `landscape` term
- possible AI-style wording problems: repeated "helps frame" wording
- quotations or source-derived wording: external references are listed, but summary wording is generated body copy
- actual context of queued hit: section `RLHF and Human Preference`; sentence compares Alignment Theory with RLHF inside the broader AI alignment field
- likely source location: `scripts/generate-ai-research-pages.mjs`, `papers` entry slug `ai-alignment-literature-review`, section `RLHF and Human Preference`
- suggested priority: moderate cleanup

### `pages/ai-alignment-competitive-positioning.html`

- title: Competitive Positioning: Alignment Theory vs Observability, Evals, and Safety Monitors | Alignment Theory
- hard-ban matches: none
- review-term matches: high, mostly protected and category terms
- repeated sentence patterns: repeated "X tools..." comparison form
- repeated transitions: low
- repeated three-part lists: moderate because tool categories are enumerated
- repeated contrast formulas: moderate
- generic summary language: moderate
- abstract language density: moderate
- valid project vocabulary: observability, evals, moderation, safety monitors, red teaming, PCPI
- terms needing human review: competitive positioning, enterprise translation, behavioral QA
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: category summaries may be too broad without citations
- quotations or source-derived wording: none identified
- suggested priority: moderate cleanup after comparative-claim review

### `pages/ai-alignment-who-this-is-for.html`

- title: Who This Is For: Role Map for AI Alignment Research | Alignment Theory
- hard-ban matches: none
- review-term matches: moderate to high, mostly role labels and protected terms
- repeated sentence patterns: repeated "Why they care / AT answers / Read first" formula
- repeated transitions: structural repetition by design
- repeated three-part lists: moderate
- repeated contrast formulas: low
- generic summary language: moderate
- abstract language density: low to moderate
- valid project vocabulary: AI product teams, prompt engineers, ML engineers, compliance officers, enterprise buyers
- terms needing human review: role list, enterprise buyer framing, support automation teams
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: repeated role-card formula may feel mechanical
- quotations or source-derived wording: none identified
- suggested priority: light cleanup

### `pages/ai-alignment-methodology.html`

- title: Real Case Methodology and Evaluation Protocol | Alignment Theory
- hard-ban matches: none
- review-term matches: moderate, mostly protected and technical process terms
- repeated sentence patterns: several protocol sentences with "should"
- repeated transitions: low
- repeated three-part lists: moderate
- repeated contrast formulas: one `not only` pattern
- generic summary language: low
- abstract language density: moderate
- valid project vocabulary: PCPI, detector review, human review, before/after comparison, telemetry
- terms needing human review: sensitive data, protected attributes, judge review, human adjudication, validation
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: "real case methodology" should be checked against actual evidence status
- quotations or source-derived wording: none identified
- suggested priority: moderate cleanup after evidence review

### `pages/ai-alignment-glossary.html`

- title: Formal Glossary of Alignment Theory Terms for AI Systems | Alignment Theory
- hard-ban matches: none
- review-term matches: high, mostly protected technical terms
- repeated sentence patterns: glossary-entry structure is expected
- repeated transitions: none
- repeated three-part lists: low
- repeated contrast formulas: low
- generic summary language: low
- abstract language density: high by format, but mostly definitional
- valid project vocabulary: internal alignment, external alignment, objective drift, false authority, participation collapse, metric drift
- terms needing human review: scalable misalignment, pseudo-selfhood, dead obedience, pseudo-freedom
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: some definitions may need tighter status labels
- quotations or source-derived wording: formal definitions
- suggested priority: no action until terminology review

### `pages/ai-alignment-lineage.html`

- title: Framework Evolution and Research Lineage | Alignment Theory
- hard-ban matches: none
- review-term matches: high, especially alignment, framework, evolution, load-bearing, and architecture
- repeated sentence patterns: repeated development-history progression
- repeated transitions: moderate
- repeated three-part lists: low
- repeated contrast formulas: moderate
- generic summary language: moderate
- abstract language density: moderate
- valid project vocabulary: internal/external alignment, load-bearing function, participatory capacity, runtime architecture
- terms needing human review: enterprise endpoint, behavioral QA, production behavior
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: some history claims may need clearer dating or status labels
- quotations or source-derived wording: none identified
- suggested priority: light cleanup after historical-status review

### `pages/ai-alignment-limitations.html`

- title: Limitations, Critiques, and Open Problems | Alignment Theory
- hard-ban matches: none
- review-term matches: moderate, mostly protected terms and governance terms
- repeated sentence patterns: limitation list structure is expected
- repeated transitions: low
- repeated three-part lists: moderate
- repeated contrast formulas: low
- generic summary language: low
- abstract language density: moderate
- valid project vocabulary: validation needs, PCPI limitations, detector categories, correction routes
- terms needing human review: legal review, domain-specific rubrics, collapse penalty multiplier, longitudinal validation
- clear AI-style wording problems: none urgent
- possible AI-style wording problems: none before evidence review
- quotations or source-derived wording: none identified
- suggested priority: moderate cleanup after technical review

### `pages/ai-alignment-casebook.html`

- title: Empirical Drift Casebook and Evaluation Cases | Alignment Theory
- hard-ban matches: none
- review-term matches: moderate to high, mostly protected detector terms
- repeated sentence patterns: case structure is expected
- repeated transitions: low
- repeated three-part lists: moderate
- repeated contrast formulas: low
- generic summary language: moderate in candidate-output examples, some of which may intentionally model weak output
- abstract language density: moderate
- valid project vocabulary: false authority, dead obedience, generic filler, participation collapse, metric drift, PCPI
- terms needing human review: empirical, synthetic examples, smoking-gun examples, PCPI scores
- clear AI-style wording problems: none urgent in explanatory prose
- possible AI-style wording problems: some candidate outputs intentionally sound generic and should be protected as examples
- quotations or source-derived wording: synthetic prompt-output examples
- suggested priority: moderate cleanup after technical review
