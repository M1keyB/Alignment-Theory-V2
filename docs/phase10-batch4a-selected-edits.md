# Phase 10 Batch 4A Selected Edits

Date: 2026-06-07

Status: selected before source edits. Batch 4A only.

Confirmed generated route filenames:

- `pages/ai-alignment-research.html`
- `pages/ai-alignment-executive-summary.html`
- `pages/ai-alignment-literature-review.html`

## Selected Edits

### 1. Literature Review Hard-Ban Cleanup

- route: `pages/ai-alignment-literature-review.html`
- section heading: RLHF and Human Preference
- nearby text anchor: `pages/ai-alignment-literature-review.html:127`
- original wording: `Alignment Theory treats RLHF as part of the broader landscape while focusing on post-deployment behavioral QA.`
- proposed wording: `Alignment Theory treats RLHF as part of the broader AI alignment field while focusing on post-deployment behavioral QA.`
- reason: resolves the known hard-ban term without changing the comparison
- source-of-truth location: `scripts/generate-ai-research-pages.mjs`, `papers` entry with slug `ai-alignment-literature-review`, section `RLHF and Human Preference`
- technical meaning that must remain unchanged: Alignment Theory is positioned beside RLHF within the AI alignment field
- confidence: high

### 2. Hub Orientation Contrast Cleanup

- route: `pages/ai-alignment-research.html`
- section heading: AI Alignment Research
- nearby text anchor: orientation sentence near line 89
- original wording: `Alignment is not only whether an output is acceptable; alignment is whether the system remains ordered toward its intended objective over time.`
- proposed wording: `Alignment asks whether an output is acceptable and whether the system remains ordered toward its intended objective over time.`
- reason: removes a repeated contrast formula while preserving both evaluation tests
- source-of-truth location: `scripts/generate-ai-research-pages.mjs`, `renderHub()` orientation line
- technical meaning that must remain unchanged: output acceptability and objective fidelity are both part of the evaluation frame
- confidence: high

### 3. Executive Summary Opening Abstract Cleanup

- route: `pages/ai-alignment-executive-summary.html`
- section heading: Executive Summary
- nearby text anchor: opening abstract near line 73
- original wording: `It frames AI drift as an operational problem for deployed systems, not only a training-time or policy-compliance question.`
- proposed wording: `It frames AI drift as an operational problem for deployed systems, alongside training-time and policy-compliance questions.`
- reason: removes a repeated contrast formula without adding a claim
- source-of-truth location: `scripts/generate-ai-research-pages.mjs`, `papers` entry with slug `ai-alignment-executive-summary`, `abstract`
- technical meaning that must remain unchanged: AI drift is relevant after deployment as well as during training and policy review
- confidence: high

### 4. Executive Summary Practical Question Cleanup

- route: `pages/ai-alignment-executive-summary.html`
- section heading: What Alignment Theory Adds
- nearby text anchor: sentence near line 123
- original wording: `The practical question is not only whether a single answer looks acceptable. It is whether repeated outputs keep serving the actual objective under changing prompts, users, product incentives, model versions, and policy layers.`
- proposed wording: `The practical question is whether repeated outputs keep serving the actual objective under changing prompts, users, product incentives, model versions, and policy layers, even when a single answer looks acceptable.`
- reason: removes a repeated contrast formula while preserving the operational question
- source-of-truth location: `scripts/generate-ai-research-pages.mjs`, `papers` entry with slug `ai-alignment-executive-summary`, section `What Alignment Theory Adds`
- technical meaning that must remain unchanged: a single acceptable answer does not prove repeated objective fidelity
- confidence: high

## Skipped Queue Items

- Literature Review repeated external-source summary phrasing: skipped because citation and comparative-claim review should happen first.
- Hub Enterprise Translation: skipped because HAPI and AGS positioning remains an author decision.
- Other route items: skipped because Batch 4A is limited to three routes and the first pass should avoid technical-review items.
