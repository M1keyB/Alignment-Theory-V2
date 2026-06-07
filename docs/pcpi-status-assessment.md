# PCPI Status Assessment

Phase 12 audit-only document. PCPI is not described here as validated unless local evidence supports that status.

## Summary

PCPI currently fits more than one category:

- conceptual framework: yes
- working evaluation rubric: yes, at least as a documented rubric
- documented scoring model: yes
- implemented tool: implemented in part
- validated instrument: no local evidence found
- unclear: yes, for operational maturity and certification status

## Conceptual Framework

Evidence found locally:

- Public page defines participatory capacity as retained user ability to understand, judge, choose, verify, learn, and act.
- The page positions PCPI as a measurement layer for participation collapse.
- Related Alignment Theory pages use participatory capacity, substitution, and support language.

Evidence not found:

- none required for conceptual status beyond local conceptual explanation.

Current wording:

- `Proposed Measurement Framework`
- `PCPI turns participatory capacity from a concept into a scoreable evaluation target.`

May overstate maturity:

- no, if the status label remains proposed.

Recommended future status wording:

- `Proposed measurement framework for scoring participatory capacity in AI assistance.`

## Working Evaluation Rubric

Evidence found locally:

- Seven positive features and six penalty features are listed.
- Feature tables explain what each feature measures.
- Scoring bands are published.
- Rubric PDF exists locally.
- Dataset template includes scored examples.

Evidence not found:

- formal rater instructions beyond local artifacts were not verified in this pass.
- inter-rater reliability evidence was not found.

Current wording:

- `Download Rubric PDF`
- `All features are scored from 0.0 to 1.0.`

May overstate maturity:

- generally no, but any claim that the rubric is calibrated would require evidence.

Recommended future status wording:

- `Working rubric and starter scoring model.`

## Documented Scoring Model

Evidence found locally:

- Formula is published in the public page and `assets/research/pcpi_formula.md`.
- Python evaluator implements the formula and bands.
- Dataset template includes feature columns, scores, classifications, substitution risk, evidence notes, rater id, model version, and timestamp.

Evidence not found:

- evidence justifying the penalty weight and threshold bands.

Current wording:

- `PCPI = clamp((PositiveParticipation * 100) - (CollapsePenalty * 60), 0, 100)`

May overstate maturity:

- no, if presented as v1 scoring model rather than empirically tuned instrument.

Recommended future status wording:

- `Documented v1 scoring model with local starter evaluator.`

## Implemented Tool

Evidence found locally:

- `assets/research/pcpi_eval.py` implements scoring and classification.
- Public page links to the evaluator as a downloadable starter script.

Evidence not found:

- no package, CLI, test suite, UI, service, or integration workflow was found in the local evidence reviewed.
- no local evidence of production use was found.

Current wording:

- `Download pcpi_eval.py for the starter evaluator script.`

May overstate maturity:

- wording is mostly careful. Claims such as commercial evals or certification should be separated from the current starter script.

Recommended future status wording:

- `Starter evaluator script, not a full evaluation platform.`

## Validated Instrument

Evidence found locally:

- the page states limitations and says it does not claim final empirical validation.
- it states inter-rater reliability is pending and weights are not empirically tuned.

Evidence not found:

- external validation study
- inter-rater reliability study
- longitudinal validation
- benchmark publication evidence
- empirical tuning evidence for the penalty multiplier

Current wording:

- `not externally validated standard`
- `Inter-rater reliability study pending`
- `Longitudinal validation is needed`

May overstate maturity:

- no in the limitation section; possible risk appears in license/certification language elsewhere if not status-labeled carefully.

Recommended future status wording:

- `Not externally validated; validation and calibration remain open work.`

## Unclear Areas

Evidence found locally:

- page uses `PCPI v1.0`, `PCPI v1`, and `PCPI v5` in nearby surfaces.
- MAI is described as under active development.
- license page says certification is administered through Alignment Theory.

Evidence not found:

- current MAI dataset access status
- certification criteria
- authority for certification language
- intended public status of PCPI v5 wording

Recommended future status wording:

- `Version, dataset, and certification language require author review before public revision.`
