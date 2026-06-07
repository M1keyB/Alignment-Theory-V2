# Applied Governance Placement

Phase 5 update: the first public overview routes now exist. This document remains the placement map for later applied-governance work.

## Placement Rule

AlignmentTheory.org should distinguish foundational theory, public agency-preservation work, implementation infrastructure, and historical prototypes.

## Recommended Branches

| Branch | Primary purpose | Public status | Recommended route or area |
|---|---|---|---|
| Alignment Theory | Foundational theory and research map for coherence, pressure, formation, failure, stress tests, and AI alignment. | Current canonical core. | `/pages/where-to-start.html`, `/pages/revised-framework-center.html`, `/pages/stress-tests.html`, `/pages/ai-alignment-research.html` |
| AI Alignment Research Corpus | Research-facing corpus on agent alignment, human control, participation, PCPI, and related papers. | Current research section with generated/mixed pages. | `/pages/ai-alignment-research.html` |
| PCPI | Index and measurement work for participatory capacity and preservation of intent. | Current technical research page; needs separate review before public rewrite. | `/pages/participatory-capacity-preservation-index.html` |
| AAG v0.3.0 page | Older standalone Agent Action Gate prototype. | Historical once AGS page exists. | `projects/agent-action-gate.html` |
| AGS | Implementation-facing Alignment Governance Stack. | Public overview created in Phase 5; external repo remains read-only. | `/pages/alignment-governance-stack.html` |
| HAPI | Public Human Agency Preservation Infrastructure, agency audit, restoration, and institutional language. | Public overview created in Phase 5; external repo remains read-only. | `/pages/human-agency-preservation-infrastructure.html` |
| Alignment Notes | Ongoing notes and shorter public reading path. | Current public section. | `notes/index.html` |
| Archive | Earlier formulations, internal/external framing, and older route forms. | Keep live, mark carefully. | Existing pages by classification from `docs/site-audit.md` |

## Relationship Model

Alignment Theory remains the root conceptual project. The current site should make that clear through the revised framework center, stress tests, essay index, and AI research corpus.

HAPI is the public-facing agency-preservation branch. It translates agency loss, false gates, refusal, authority, audit, restoration, and continuity into institutional and civic language.

AGS is the implementation-facing branch. It turns governance ideas into package-level components: PGDL, AAG, runtime binding, receipts, policy profiles, authority maps, governance memory, participation checks, and audit tooling.

AAG v0.3.0 should be treated as an earlier prototype page, not the current endpoint of the applied-governance story.

## Public Navigation Implication

The shared shell should eventually point readers through:

1. Where to Start
2. Revised Framework Center
3. Stress Tests
4. Research
5. AI Governance
6. Notes
7. Archive

The AI Governance area can later contain:

- AGS overview
- HAPI overview
- AAG historical/prototype page
- PCPI technical page
- AI Alignment Research Corpus

## Phase 5 Completed Scope

Completed in Phase 5:

- Added `/pages/human-agency-preservation-infrastructure.html`.
- Added `/pages/alignment-governance-stack.html`.
- Added both new pages to the controlled shared-shell target list.
- Added a short generated-source section to the AI Governance hub.
- Added a historical status notice to `projects/agent-action-gate.html`.

Long papers, essays, generated AI research pages, PCPI, and archive pages should remain unchanged until reviewed one group at a time.

## Author Decisions Needed

- Should AGS and HAPI live under a single "AI Governance" navigation item?
- Should the old AAG page get a visible historical note in the next implementation pass?
- Should PCPI be presented as part of AI alignment research or applied governance?
- Should HAPI be introduced on AlignmentTheory.org before its own public site is finalized?
