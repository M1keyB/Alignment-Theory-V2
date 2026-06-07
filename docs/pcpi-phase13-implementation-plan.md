# PCPI Phase 13 Implementation Plan

Phase 12 planning document for a later controlled implementation pass. Do not implement until approved.

## Boundaries

- PCPI route only
- no formula changes unless separately approved
- no scoring-band changes unless separately approved
- no new claims
- no silent citation changes
- no broad rewrite
- no route changes
- no archive-wide CSS changes
- visual and editorial edits separated where practical
- HAPI cross-link added only if approved
- editorial linter required
- static verifier required
- route-level diff review required

## Batch A: Status Wording And Route Clarity

Scope:

- clarify PCPI v1.0 / v1 / v5 wording
- clarify proposed status
- clarify starter evaluator status
- clarify validation limitations
- clarify dataset and MAI maturity
- clarify certification language or route users to license page with restrained wording

No formula or scoring changes.

Recommended first batch:

- yes

Reason:

- status clarity reduces the largest risk before visual or prose cleanup.

## Batch B: Scoped Visual Modernization

Scope:

- PCPI route only
- quiet status box
- clearer formula/status placement
- improved spacing around feature tables and examples if needed
- optional shared-shell migration after target list approval

Do not combine with formula changes.

## Batch C: High-Confidence Editorial Cleanup

Scope:

- remove or reduce repeated PCPI phrases
- reduce repeated contrast rhythm where it does not add technical content
- keep feature names, formula, bands, examples, and limitations intact
- preserve technical terms

Requirements:

- run editorial linter
- report remaining hard-ban and review terms
- no broad rewrite

## Batch D: HAPI Cross-Linking

Scope:

- add one restrained HAPI link if approved
- add one PCPI backlink if approved
- include status wording distinguishing PCPI from the full HAPI audit model

Recommended timing:

- after Batch A

## Batch E: Formula Or Scoring Revision

Scope:

- only after separate approval
- may include feature weighting, threshold review, domain-specific rubrics, rater calibration, validation design, or implementation tests

Out of scope unless separately approved:

- changing formula
- changing bands
- changing examples
- claiming validation

## Required Validation For Any Batch

Run:

```powershell
npm run build
node scripts\verify-static-site.mjs
npm run lint:editorial
npm run verify:ai-corpus
git diff --check
```

If shared shell target changes:

```powershell
npm run apply:shell
node scripts\verify-static-site.mjs
```

## Recommended First Pass

Start with Batch A: status wording and route clarity.

Do not start with visual modernization or prose cleanup until the version, maturity, and naming decisions are settled.
