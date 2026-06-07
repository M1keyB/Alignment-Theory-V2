# Generated Corpus Technical Claims Review

Date: 2026-06-07

Status: Phase 9 audit-only. Claims were not verified through web research and no citations were added.

## Review Notes

- This review uses repository evidence and current rendered corpus bodies only.
- "Citation currently present" means a citation, reference link, or download link is present on or near the route. It does not mean the citation has been verified.
- Later technical review should distinguish authored theory, implemented repo evidence, external research summary, proposed measurement, and validated empirical result.

## Claims Requiring Later Review

### AI Research Hub: Behavioral QA Translation

- route: `pages/ai-alignment-research.html`
- section heading: From Research to Behavioral QA
- claim summary: The research can become behavioral QA for production AI across prompt batches, model updates, and policy changes.
- claim category: future-direction claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: yes
- recommended later action: Keep as applied translation unless implementation evidence or case studies are added.
- current status distinction: conceptual proposal

### AI Research Hub: PCPI Measurement Layer

- route: `pages/ai-alignment-research.html`
- section heading: Participatory Capacity Preservation Index
- claim summary: PCPI turns participation collapse into a measurable evaluation target and scores participation-preserving features.
- claim category: project claim
- citation currently present: yes, local PCPI page and downloads
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: yes
- recommended later action: Align with PCPI review before using stronger measurement language.
- current status distinction: documented design with partial repository evidence

### Literature Review: RLHF Positioning

- route: `pages/ai-alignment-literature-review.html`
- section heading: RLHF and Human Preference
- claim summary: RLHF improves instruction/preference following but does not provide an operational test for deployed objective fidelity over time.
- claim category: comparative claim
- citation currently present: external references on route
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: maybe
- recommended later action: Verify against cited RLHF/alignment sources before rewriting comparative wording.
- current status distinction: external claim plus Alignment Theory comparison

### Literature Review: Constitutional AI

- route: `pages/ai-alignment-literature-review.html`
- section heading: Constitutional AI
- claim summary: Constitutional AI frames principle-based alignment through rules and critique rather than only direct preference labels.
- claim category: comparative claim
- citation currently present: yes
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: no
- recommended later action: Check phrasing against Anthropic source before editorial changes.
- current status distinction: public external claim

### Literature Review: Interpretability

- route: `pages/ai-alignment-literature-review.html`
- section heading: Interpretability
- claim summary: Interpretability examines internal model mechanisms and representations, while Alignment Theory is behavior-first.
- claim category: comparative claim
- citation currently present: yes
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: no
- recommended later action: Verify external summary, then preserve the distinction between mechanism-level and behavior-level analysis.
- current status distinction: external claim plus project distinction

### Literature Review: Model Spec

- route: `pages/ai-alignment-literature-review.html`
- section heading: Model Behavior Specifications
- claim summary: OpenAI's Model Spec helps define desired assistant behavior under competing instructions, policies, and user goals.
- claim category: standards claim
- citation currently present: yes
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: no
- recommended later action: Verify current Model Spec wording before any public revision.
- current status distinction: public external claim

### Competitive Positioning: Adjacent Tool Categories

- route: `pages/ai-alignment-competitive-positioning.html`
- section heading: Observability Tools / Prompt Evals / Moderation and Safety Monitors
- claim summary: Observability, eval, moderation, safety-monitor, red-team, benchmark, and QA systems each cover different parts of deployed AI review.
- claim category: comparative claim
- citation currently present: no
- citation appears sufficient: no
- source verification needed: yes
- status wording needed: maybe
- recommended later action: Add citations or soften category-wide statements during technical review.
- current status distinction: conceptual comparison

### Who This Is For: Reader Role Claims

- route: `pages/ai-alignment-who-this-is-for.html`
- section heading: role-map sections
- claim summary: Different teams need specific drift, governance, and evaluation answers.
- claim category: project claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: no for editorial framing; yes if treated as market evidence
- status wording needed: no
- recommended later action: Keep as reader-orientation language unless expanded into market claims.
- current status distinction: conceptual proposal

### Methodology: Real Prompt-Output Batches

- route: `pages/ai-alignment-methodology.html`
- section heading: Collection
- claim summary: Real prompt-output batches should include timestamps, model versions, prompt templates, policy versions, and relevant metadata.
- claim category: technical claim
- citation currently present: no
- citation appears sufficient: no
- source verification needed: yes
- status wording needed: maybe
- recommended later action: Decide whether this is a proposed protocol or a recommended standard, then cite relevant governance or eval practice if needed.
- current status distinction: documented design

### Methodology: Sensitive Data Handling

- route: `pages/ai-alignment-methodology.html`
- section heading: Redaction and Sensitive Data
- claim summary: Sensitive data should be removed or transformed before analysis, and protected attributes require privacy review and handling controls.
- claim category: legal claim
- citation currently present: no
- citation appears sufficient: no
- source verification needed: yes
- status wording needed: yes
- recommended later action: Require legal/privacy review before expanding this language.
- current status distinction: practical caution, not legal advice

### Methodology: Human Review Conditions

- route: `pages/ai-alignment-methodology.html`
- section heading: Human Review
- claim summary: Human review enters the loop for uncertain cases, high-impact decisions, sensitive domains, threshold calibration, and governance signoff.
- claim category: technical claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: maybe
- recommended later action: Keep as proposed evaluation protocol unless implementation evidence is added.
- current status distinction: documented design

### Glossary: Detector Categories

- route: `pages/ai-alignment-glossary.html`
- section heading: Drift Categories
- claim summary: Terms such as False Authority, Dead Obedience, Participation Collapse, and Metric Drift name detector categories for AI behavior.
- claim category: project claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: no for internal terminology; yes for empirical claims
- status wording needed: yes
- recommended later action: Mark as Alignment Theory terminology unless backed by external validation.
- current status distinction: authored framework vocabulary

### Lineage: Development History

- route: `pages/ai-alignment-lineage.html`
- section heading: research-lineage sections
- claim summary: The AI branch developed from internal/external alignment distinctions into runtime architecture and behavioral QA.
- claim category: historical claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: yes, using repository history or dated docs
- status wording needed: maybe
- recommended later action: Add dates or internal references only after author review.
- current status distinction: internal development narrative

### Limitations: Validation Needs

- route: `pages/ai-alignment-limitations.html`
- section heading: Validation Needs
- claim summary: Synthetic casebooks can explain detector logic, but production telemetry and controlled comparisons are required to establish reliability.
- claim category: empirical claim
- citation currently present: no
- citation appears sufficient: no
- source verification needed: yes
- status wording needed: no, current wording is cautious
- recommended later action: Preserve caution and add evidence only when validation exists.
- current status distinction: limitation statement

### Limitations: PCPI Multiplier And Longitudinal Validation

- route: `pages/ai-alignment-limitations.html`
- section heading: PCPI v1 Limitations
- claim summary: PCPI needs human validation, empirical tuning, domain-specific rubrics, and longitudinal validation.
- claim category: empirical claim
- citation currently present: local PCPI references exist elsewhere
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: no, current wording is cautious
- recommended later action: Coordinate with PCPI review before editing.
- current status distinction: documented limitation

### Casebook: Synthetic Examples

- route: `pages/ai-alignment-casebook.html`
- section heading: opening and case sections
- claim summary: Case examples are synthetic and should not be treated as empirical validation.
- claim category: empirical claim
- citation currently present: no
- citation appears sufficient: unclear
- source verification needed: no for the caution itself; yes for any later empirical use
- status wording needed: no
- recommended later action: Preserve caution and avoid upgrading examples to evidence.
- current status distinction: synthetic example set

### Casebook: PCPI Scores

- route: `pages/ai-alignment-casebook.html`
- section heading: PCPI Smoking-Gun Examples
- claim summary: Example PCPI scores are assigned to prompt-output examples.
- claim category: technical claim
- citation currently present: local PCPI route linked
- citation appears sufficient: unclear
- source verification needed: yes
- status wording needed: yes
- recommended later action: Confirm scores against `assets/research/pcpi_eval.py` or mark them as illustrative.
- current status distinction: unclear status
