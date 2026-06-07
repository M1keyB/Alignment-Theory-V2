# PCPI Placement Review

Date: 2026-06-06

Status: review only. The PCPI page was not rewritten in Phase 6.

## Current Route

- `pages/participatory-capacity-preservation-index.html`

## Page Title

- `Participatory Capacity Preservation Index (PCPI) | Alignment Theory`

The visible H1 is:

- `Participatory Capacity Preservation Index (PCPI) v1.0`

## Current Subject

PCPI is presented as a proposed measurement framework for evaluating whether AI systems preserve or erode human understanding, judgment, choice, verification, learning, and agency.

The page includes:

- PCPI paper download
- rubric PDF
- CSV dataset template
- XLSX dataset template
- `pcpi_eval.py`
- formula reference
- classification bands
- worked examples and limitations

## Relationship To Alignment Theory

PCPI belongs to the Alignment Theory measurement layer. It operationalizes participatory capacity by scoring whether AI assistance preserves user participation or becomes substitution.

It is currently linked from the AI Governance hub and from the generated AI research corpus reading order.

## Possible Relationship To HAPI

PCPI may become useful to HAPI because both focus on agency preservation, substitution, dependency, and participation. HAPI is broader and more institutional; PCPI is currently AI-output and evaluation focused.

The HAPI page should not absorb PCPI automatically. A later pass can add a cross-link from HAPI to PCPI if the author wants HAPI to cite PCPI as one technical measurement tool.

## Status Classification

PCPI is:

- conceptual: yes, it defines participatory capacity and substitution boundaries
- evaluative: yes, it defines features, penalties, formula, and bands
- implemented in part: yes, `assets/research/pcpi_eval.py` implements the scoring function and classifications
- empirical validation status: needs evidence review

## Found Local Files

- `pages/participatory-capacity-preservation-index.html`
- `assets/research/Participatory_Capacity_Preservation_Index_PCPI_v1.pdf`
- `assets/research/PCPI_Rubric_v1.pdf`
- `assets/research/PCPI_Dataset_Template_v1_with_24_Starter_Examples.csv`
- `assets/research/PCPI_Dataset_Template_v1_with_24_Starter_Examples.xlsx`
- `assets/research/pcpi_eval.py`
- `assets/research/pcpi_formula.md`

## Found Formula

`assets/research/pcpi_formula.md` defines:

```text
PCPI = clamp((PositiveParticipation * 100) - (CollapsePenalty * 60), 0, 100)
```

It lists seven positive participation features and six collapse penalty features. The Python evaluator uses the same structure.

## Should PCPI Remain Foundational?

Yes for now. PCPI should remain a foundational Alignment Theory / AI Governance measurement route rather than being moved into HAPI.

Reason: the current public page, downloads, formula, and evaluator are framed as AI alignment and participatory-capacity measurement. HAPI may later link to it, but HAPI should not inherit the page until the author reviews the relationship.

## Later HAPI Cross-Link

A later HAPI pass can add a restrained link from HAPI to PCPI if the link is framed as:

- one measurement tool related to agency preservation
- not the whole HAPI audit model
- not a completed certification standard

## Terminology Review Needed

Yes.

Terms needing author review:

- `Participatory Capacity Preservation Index`
- `PositiveParticipation`
- `CollapsePenalty`
- `capacity_building`
- `capacity_preserving`
- `mixed_at_risk`
- `capacity_eroding`
- `participation_collapse`
- `MAI` references and licensing language

## Claims Needing Evidence Review

- validation status
- dataset status
- commercial/certification licensing language
- whether the starter examples are enough to describe a dataset template publicly
- whether PCPI should be named as a metric, measurement framework, index, rubric, or evaluator

## Visible Status Labeling

No immediate Phase 6 label was added.

Recommended later label: keep PCPI visibly current, but clarify that it is a proposed measurement framework with a lightweight evaluator and starter dataset template. Avoid implying broad empirical validation until reviewed.

## Recommended Future Action

1. Review PCPI terminology with the author.
2. Review the PDF, rubric, formula, Python evaluator, and dataset template together.
3. Decide whether PCPI remains under AI Governance, gains a HAPI cross-link, or receives a short HAPI note.
4. Modernize PCPI shell/navigation only after the generated AI corpus template plan is settled.
5. Add status language only after claims review.
