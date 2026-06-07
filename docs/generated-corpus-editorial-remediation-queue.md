# Generated Corpus Editorial Remediation Queue

Date: 2026-06-07

Status: Phase 9 audit-only. Proposed edits are not implemented.

## Queue

### 1. Literature Review: RLHF And Human Preference

- route: `pages/ai-alignment-literature-review.html`
- section heading: RLHF and Human Preference
- line or nearby text anchor: `pages/ai-alignment-literature-review.html:127`
- flagged term, phrase, or pattern: `landscape`
- reason for review: hard-ban term in generated body copy
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: replace vague term
- technical meaning that must be preserved: Alignment Theory is being positioned beside RLHF within the AI alignment field
- confidence: high

### 2. AI Research Hub: Orientation Line

- route: `pages/ai-alignment-research.html`
- section heading: AI Alignment Research
- line or nearby text anchor: orientation sentence near line 89
- flagged term, phrase, or pattern: `not only`
- reason for review: contrast formula appears in a high-visibility hub sentence
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: remove repeated transition
- technical meaning that must be preserved: output acceptability and objective fidelity are different tests
- confidence: medium

### 3. Executive Summary: Opening Abstract

- route: `pages/ai-alignment-executive-summary.html`
- section heading: Executive Summary
- line or nearby text anchor: opening abstract near line 73
- flagged term, phrase, or pattern: `not only`
- reason for review: contrast formula repeats a pattern used across the corpus
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: shorten sentence
- technical meaning that must be preserved: AI drift is a deployed-system problem as well as a training and compliance problem
- confidence: medium

### 4. Executive Summary: What Alignment Theory Adds

- route: `pages/ai-alignment-executive-summary.html`
- section heading: What Alignment Theory Adds
- line or nearby text anchor: sentence near line 123
- flagged term, phrase, or pattern: `not only`
- reason for review: repeated contrast formula
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: remove repeated transition
- technical meaning that must be preserved: repeated outputs should keep serving the intended objective under changing conditions
- confidence: medium

### 5. Literature Review: External-Source Summary Phrases

- route: `pages/ai-alignment-literature-review.html`
- section heading: several external-method sections
- line or nearby text anchor: repeated "helps frame" / "helps define" comparative wording
- flagged term, phrase, or pattern: repeated comparative summary formula
- reason for review: wording may blur the difference between source summary and Alignment Theory claim
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: split paragraph
- technical meaning that must be preserved: external research areas are adjacent references, not claimed as identical to Alignment Theory
- confidence: medium

### 6. Competitive Positioning: Tool Category Comparisons

- route: `pages/ai-alignment-competitive-positioning.html`
- section heading: Observability Tools / Prompt Evals / Moderation and Safety Monitors
- line or nearby text anchor: repeated category summaries
- flagged term, phrase, or pattern: broad comparison claims without citations
- reason for review: comparative claims should be checked before copy tightening
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: Alignment Theory is presented as a complement to adjacent tools, not a replacement
- confidence: medium

### 7. Who This Is For: Role Cards

- route: `pages/ai-alignment-who-this-is-for.html`
- section heading: role-map sections
- line or nearby text anchor: repeated "Why they care / AT answers / Read first" pattern
- flagged term, phrase, or pattern: repeated card formula
- reason for review: structure is useful but may feel mechanical across every role
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: shorten sentence
- technical meaning that must be preserved: each reader role needs a distinct reason and first reading path
- confidence: medium

### 8. Methodology: Sensitive Data And Review Controls

- route: `pages/ai-alignment-methodology.html`
- section heading: Redaction and Sensitive Data
- line or nearby text anchor: sentence near line 130
- flagged term, phrase, or pattern: claims about protected attributes and handling controls
- reason for review: privacy and compliance language may need legal or operational review
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: sensitive production data needs privacy review before evaluation
- confidence: high

### 9. Methodology: Before/After Comparison

- route: `pages/ai-alignment-methodology.html`
- section heading: Before/After Comparison
- line or nearby text anchor: sentence near line 150
- flagged term, phrase, or pattern: `not only`
- reason for review: repeated contrast formula
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: remove repeated transition
- technical meaning that must be preserved: drift pattern, correction rate, escalation rate, and objective-fit movement matter beyond pass rate
- confidence: medium

### 10. Glossary: Defined Detector Terms

- route: `pages/ai-alignment-glossary.html`
- section heading: Drift Categories
- line or nearby text anchor: glossary entries for pseudo-selfhood, dead obedience, pseudo-freedom, and scalable misalignment
- flagged term, phrase, or pattern: terminology requiring author review
- reason for review: these terms are protected if author-approved but should not be polished away or expanded silently
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: preserve as technical vocabulary
- technical meaning that must be preserved: detector categories and formal glossary status
- confidence: high

### 11. Limitations: PCPI v1 Limitations

- route: `pages/ai-alignment-limitations.html`
- section heading: PCPI v1 Limitations
- line or nearby text anchor: lines near 162-167
- flagged term, phrase, or pattern: validation and tuning claims
- reason for review: technical status should remain cautious and evidence-linked
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: PCPI is proposed and still needs empirical tuning and validation
- confidence: high

### 12. Casebook: Candidate Outputs

- route: `pages/ai-alignment-casebook.html`
- section heading: Case Examples
- line or nearby text anchor: candidate-output examples
- flagged term, phrase, or pattern: generic language inside examples
- reason for review: weak wording may be intentional because it models drift; do not clean it automatically
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: preserve as technical vocabulary or verify example intent
- technical meaning that must be preserved: candidate outputs show failure patterns
- confidence: high

### 13. Casebook: Empirical Label

- route: `pages/ai-alignment-casebook.html`
- section heading: page title and opening
- line or nearby text anchor: title and abstract area
- flagged term, phrase, or pattern: `Empirical` paired with synthetic examples
- reason for review: title may imply real data while body states examples are synthetic
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: examples are synthetic unless real telemetry is later added
- confidence: high

### 14. Hub: Enterprise Translation

- route: `pages/ai-alignment-research.html`
- section heading: Enterprise Translation
- line or nearby text anchor: lines near 177-188 and 260-262
- flagged term, phrase, or pattern: enterprise/product claims
- reason for review: implementation and product-positioning language should match HAPI and AGS decisions
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: behavioral QA is a proposed applied translation of the research
- confidence: medium

### 15. Citation Page: PCPI Citation Title

- route: `pages/how-to-cite.html`
- section heading: Suggested Citation for PCPI
- line or nearby text anchor: PCPI citation examples
- flagged term, phrase, or pattern: title consistency for PCPI
- reason for review: PCPI naming is flagged for later author review in `docs/pcpi-placement-review.md`
- likely source-of-truth file: `scripts/generate-ai-research-pages.mjs`
- recommended edit type: human decision required
- technical meaning that must be preserved: citation target and route must remain stable
- confidence: medium
