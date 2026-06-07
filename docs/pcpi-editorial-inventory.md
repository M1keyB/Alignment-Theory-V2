# PCPI Editorial Inventory

Phase 12 audit-only document. PCPI was not edited and no exceptions were added.

## Linter Status

Phase 11 final routine lint result before this audit:

```text
Strict hard-ban violations: 0
Strict review matches: 324
Archive hard-ban findings covered by baseline: 190
New archive hard-ban findings: 0
Protected-term matches: 6487
Exceptions applied: 0
```

During Phase 12, the shell escalation layer stopped accepting additional command execution because the session hit a usage limit. Because of that, the requested fresh `npm run lint:editorial` run could not be completed after the Phase 12 docs were added.

## PCPI Linter Classification

PCPI is current/technical in the site audit, but the Phase 11 linter config does not currently include `pages/participatory-capacity-preservation-index.html` in strict public surfaces.

Current linter treatment:

- PCPI public page is archive-scope / baseline-managed by the linter
- PCPI is not a strict surface in `scripts/editorial-lint-config.mjs`
- this should be corrected or intentionally documented before a later PCPI edit pass

Recommendation:

- add PCPI to strict surfaces before Phase 13 if PCPI remains a current public technical route

## Hard-Ban Matches

No PCPI hard-ban count was freshly produced in Phase 12 because command execution became unavailable.

Manual inspection found at least one exact public-page phrase that should be reviewed later as an intentional documentation target:

- Section: `Why PCPI Exists`
- Anchor: `AI alignment is not only about whether an output is safe, fluent, or acceptable.`
- Reason: negation-first review/hard-ban pattern in editorial guide

The dataset sample contains synthetic model-output text with public examples that may include intentionally bad outputs. These should be treated as evaluation examples, not automatic cleanup text.

## Review-Term Matches

Likely review terms visible in PCPI:

- proposed
- metric
- measurement framework
- framework
- agency
- alignment
- participation
- capacity
- evaluation
- implementation
- validation
- standard
- certification
- benchmark
- active development
- strongest

These are not automatic errors. Most are technical terms or status words. They need review mainly where they imply maturity beyond local evidence.

## Protected-Term Matches

Protected or technical vocabulary that should remain where precise:

- Alignment Theory
- participatory capacity
- human agency
- AI alignment
- agency
- verification
- judgment
- substitution
- participation collapse
- audit-adjacent terms such as evidence and validation

## Repeated Sentence Patterns

Observed patterns to review later:

- short declarative PCPI statements repeated in adjacent sections
- repeated `PCPI is...` openings
- repeated contrast between helpful AI appearance and hidden substitution
- repeated `measures whether...` phrasing

These are normal for a technical explainer, but a later cleanup can reduce repetition without changing claims.

## Dense Paragraphs

Most PCPI content is broken into tables, examples, and code blocks. Dense areas:

- attribution callout
- license/dataset callout
- related research cards
- validation limitations list if status language is expanded later

## Vague Transitions

Potentially review:

- `PCPI exists to measure that erosion`
- `PCPI is strongest when measured across batches`
- `AI can look helpful while quietly becoming substitution`

These are comprehensible, but a later edit could make the evidence status and method more specific.

## Repeated Contrast Formulas

The page repeatedly contrasts:

- safe/fluent output vs participatory preservation
- assistance vs substitution
- automation that carries the right load vs automation that steals a load
- capacity-building vs participation collapse

These contrasts are central to PCPI. Later cleanup should reduce formulaic rhythm only where the same contrast repeats without adding a new method, feature, or consequence.

## Terminology Requiring Human Review

- PCPI expansion
- PCPI v1.0 vs PCPI v1 vs PCPI v5
- metric vs index vs rubric vs evaluator
- MAI benchmark
- certification
- substitution boundary test
- participation collapse
- smoking-gun question
- commercial evals

## Wording That Should Remain

- feature names
- formula variables
- classification labels
- limitation statements
- score bands
- citation metadata
- evidence notes in examples

## Suggested Editorial Priority

Recommendation: moderate cleanup, but only after status and terminology decisions.

Priority order:

1. status wording and version clarity
2. certification and MAI wording review
3. PCPI expansion/name standardization
4. only then light prose cleanup

Do not start with broad rewrite.
