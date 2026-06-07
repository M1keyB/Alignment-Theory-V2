# PCPI Visual Placement Review

Phase 12 audit-only document. No styles, HTML, layout, shared shell, or generated pages were changed.

## Comparison Set

Compared conceptually against:

- `index.html`
- `start-here.html`
- `pages/human-agency-preservation-infrastructure.html`
- `pages/alignment-governance-stack.html`
- `pages/ai-alignment-research.html`

## Current Visual Style

PCPI uses the older AI research page shell:

- research hero
- metadata chips
- side table of contents
- research tools sidebar
- tables for features and scoring bands
- code blocks for formula and implementation object
- example cards
- older global header/footer navigation

The page is visually closer to the generated AI corpus pages than to the newer Phase 5 HAPI/AGS pages and shared shell surfaces.

## Match With Current Publication Shell

Partial match:

- readable white-background research style
- consistent with older AI research corpus design
- uses existing site typography and table/card styles

Mismatch:

- header/footer are older than the Phase 2/5 shared shell
- primary navigation still points to older root routes
- HAPI/AGS pages use the newer shared shell and clearer applied-governance placement

## Scannability

Strengths:

- table of contents is useful
- formula is easy to find
- feature tables are structured
- classification bands are visible
- worked examples are separated from the model definition

Weak spots:

- status labels are split across `Proposed Measurement Framework`, corpus version, PCPI version, and usage text
- research tools repeat many downloads
- license and dataset status text appears inside the formula section, which may interrupt technical reading

## Formula Presentation

Readable:

- formula is in a code block
- variables are shown as grouped means
- formula source also exists in `assets/research/pcpi_formula.md`

Later improvement:

- add a quiet status note near formula saying the penalty weight is v1/proposed and not empirically tuned
- keep formula unchanged unless separately approved

## Scoring Bands

Readable:

- band table is compact and clear
- labels are understandable

Later improvement:

- align display labels and snake_case labels in a small note
- avoid changing thresholds without separate approval

## Examples

Readable:

- example cards show prompt, output summary, scoring highlights, evidence, and classification

Later improvement:

- explicitly label examples as illustrative/starter examples if author approves
- avoid treating synthetic examples as validation

## Quiet Status Box

Recommended later:

- yes

Suggested purpose:

- PCPI v1.0
- proposed measurement framework
- starter evaluator exists
- not externally validated
- inter-rater reliability pending
- formula and bands unchanged in this pass

## CSS-Scoped Modernization

Appropriate later:

- yes, but route-scoped

Boundaries:

- PCPI route only
- no archive-wide CSS changes
- no formula or scoring changes
- visual cleanup separated from terminology changes where practical

## Shared-Shell Migration

Appropriate later:

- yes, if PCPI remains a current technical route

Current note:

- `npm run apply:shell` does not target PCPI
- adding PCPI to shared-shell targets would be a separate controlled implementation step

## Separate Visual And Terminology Changes

Recommendation:

- keep visual shell update and status wording in small controlled batches
- do not combine formula, scoring, terminology, and visual changes in one pass
