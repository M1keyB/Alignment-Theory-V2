# Route Canonicalization Plan

Date: 2026-06-06

Status: planning only. No redirects, deletions, page moves, or archive edits are included in Phase 2.

## Current Duplicate Or Overlapping Routes

- About: `about.html` and `pages/about.html`
- Contact: `contact.html` and `pages/contact.html`
- Papers: `papers.html` and `pages/papers.html`
- Cite: `cite.html` and `pages/how-to-cite.html`
- Start Here / Where To Start: `start-here.html` and `pages/where-to-start.html`
- AI alignment entry material: `ai-alignment.html`, `pages/ai-alignment-and-alignment-theory.html`, and `pages/ai-alignment-research.html`
- Glossary / definitions material: `definitions.html`, `pages/glossary.html`, `pages/lexicon.html`, and `pages/ai-alignment-glossary.html`
- Framework material: root overview pages and many older `/pages/` framework routes

## Current Root Entry Pages

- `index.html`
- `start-here.html`
- `about.html`
- `contact.html`
- `papers.html`
- `cite.html`
- `definitions.html`
- `core-constraints.html`
- `convergence-map.html`
- `applications.html`
- `ai-alignment.html`
- `ai-terms.html`
- `for-ai-systems.html`
- `burnout-over-endurance.html`
- `notes/index.html`

## Current `/pages/` Archive Routes

The `/pages/` directory contains the main archive and most long-form research pages. Current hub candidates inside `/pages/` include:

- `pages/where-to-start.html`
- `pages/revised-framework-center.html`
- `pages/stress-tests.html`
- `pages/papers.html`
- `pages/essays.html`
- `pages/ai-alignment-research.html`
- `pages/participatory-capacity-preservation-index.html`
- `pages/library.html`

Large route groups in `/pages/` include revised framework pages, stress tests, AI alignment corpus pages, essay pages, theological interpretation pages, and older framework pages. These should remain live until the author approves labels, canonical metadata, or redirects.

## Recommended Canonical Routes

- Home: `/`
- Start Here: `/start-here.html`
- Theory: `/pages/revised-framework-center.html`
- Research: `/papers.html`
- Notes: `/notes/`
- AI Governance: `/pages/ai-alignment-research.html`
- Archive: `/pages/library.html`
- About: `/about.html`
- Contact: `/contact.html`
- Cite: `/pages/how-to-cite.html` unless the author prefers `/cite.html`
- PCPI: `/pages/participatory-capacity-preservation-index.html`
- Agent Action Gate: `/projects/agent-action-gate.html`

## Routes That Should Remain Archival

- Older root overview pages that predate the revised public path
- `pages/framework.html`
- `pages/manuscript.html`
- `pages/core-axioms.html`
- `pages/core-laws.html`
- Earlier AI alignment explainer routes outside the current corpus hub
- Existing essay pages until the Notes / Essays decision is made
- Older theological and interpretation pages until reviewed one at a time

## Routes That May Eventually Redirect

- `pages/about.html` to `/about.html`
- `pages/contact.html` to `/contact.html`
- `pages/papers.html` to `/papers.html`
- `cite.html` to `/pages/how-to-cite.html`, or the reverse if `/cite.html` is chosen
- `pages/where-to-start.html` to `/start-here.html`, if the author chooses the root route as canonical
- `ai-alignment.html` to `/pages/ai-alignment-research.html`, if the older route is no longer a distinct entry

Redirects should wait for a hosting decision and a confirmed canonical map.

## Routes Requiring A Human Decision

- Whether About should use `/about.html` or `pages/about.html` as canonical
- Whether Papers should use `/papers.html` or `pages/papers.html` as canonical
- Whether older Essays should remain archival once Notes is active
- Whether the Agent Action Gate public version reference is current
- Whether older AI alignment pages should be labeled as historical
- Whether `cite.html` should stay as a short root route or point to `pages/how-to-cite.html`
- Whether `pages/where-to-start.html` should remain a separate archive route

## Why Deletion Is Deferred

Many older pages carry provenance for how Alignment Theory developed. Deleting or moving them during shell migration would mix route cleanup with editorial review. Phase 2 only creates the shared shell and planning documents, so old URLs stay live while later phases decide labels, canonical metadata, and redirect behavior.

## Later Migration Batches

Later batches can add pages to the controlled target list in `scripts/apply-shared-shell.mjs` after each page receives valid shared header and footer markers. Each batch should stay small enough to review with `git diff`, link validation, and a scoped editorial scan.
