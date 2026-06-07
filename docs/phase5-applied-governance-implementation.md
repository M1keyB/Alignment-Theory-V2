# Phase 5 Applied Governance Implementation

Date: 2026-06-06

## Pages Created

- `pages/human-agency-preservation-infrastructure.html`
- `pages/alignment-governance-stack.html`

Both pages use the existing Phase 1 visual system and include shared header/footer markers.

## Source Documents Used

Local Alignment Theory sources:

- `docs/generated-ai-corpus-audit.md`
- `docs/external-ags-source-audit.md`
- `docs/external-hapi-source-audit.md`
- `docs/applied-governance-placement.md`
- `docs/applied-governance-public-page-plan.md`
- `docs/research-source-intake-manifest.md`
- `docs/aag-public-page-audit.md`
- `docs/ai-alignment-public-status-audit.md`

External AGS sources, read-only:

- `C:\Users\micha\Desktop\alignment-governance-stack\README.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\CHANGELOG.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\PGDL.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\AAG.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\RUNTIME_BINDING.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\RECEIPTS.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\GOVERNANCE_MEMORY.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\RUNTIME_GOVERNANCE_PROFILE_DESIGN.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\HUMAN_AGENCY_AUDIT.md`

External HAPI sources, read-only:

- `C:\Users\micha\Desktop\HAPI\README.md`
- `C:\Users\micha\Desktop\HAPI\02_Website\brand-language.md`
- `C:\Users\micha\Desktop\HAPI\components\OfferingsPage.tsx`

## Claims Included

HAPI page:

- HAPI stands for Human Agency Preservation Infrastructure.
- HAPI addresses agency erosion, agency theater, dependency capture, false gates, true gates, meaningful refusal, and live human authority.
- Local HAPI evidence includes a Next.js site, planning notes, route components, source-library index, and early service language.
- Standard and certification language remains future-facing.

AGS page:

- AGS is the implementation-facing stack for governed delegated AI actions.
- Local AGS evidence includes TypeScript packages, examples, documentation, evals, CLI work, receipt-history analysis, and a local-first Continuity Console.
- PGDL, AAG, Runtime Binding, Receipts, Governance Memory, and Human Agency Audit are described from local AGS docs.
- Governance profile selection is documented design work, not current runtime selection.
- The public AAG page remains the original v0.3.0 prototype record.

## Claims Deliberately Excluded

- No claim that HAPI is a finished certification authority.
- No claim that AGS is production-ready.
- No claim that every documented AGS design item is implemented.
- No newer public AAG version claim.
- No external public HAPI or AGS URL claim.
- No claims based on unread HAPI PDF contents.

## Current-Status Wording

HAPI status box states that HAPI is an active external project with a local Next.js website, source-library index, audit language, and early service model. It does not claim completed public standard status.

AGS status box states that AGS contains implemented TypeScript packages, examples, documentation, evals, a CLI, and a local-first Continuity Console, while some areas remain documented design work.

## Links Added

New page links:

- HAPI overview to AGS overview, AAG prototype, AI Governance hub, and PCPI.
- AGS overview to HAPI overview, AAG prototype, AI Governance hub, and PCPI.

AI Governance hub links:

- `pages/human-agency-preservation-infrastructure.html`
- `pages/alignment-governance-stack.html`
- `projects/agent-action-gate.html`

AAG historical notice links:

- `pages/human-agency-preservation-infrastructure.html`
- `pages/alignment-governance-stack.html`

## Generated Files Changed

`scripts/generate-ai-research-pages.mjs` was updated with an `Applied Governance Branch` source section and a `--hub-only` mode.

The full generator initially rewrote all 12 generated AI research outputs because the generator template is older than the rendered pages. Those generated outputs were restored. The hub-only mode was then run and changed only:

- `pages/ai-alignment-research.html`

## Sitemap

`scripts/update-sitemap.mjs` was added as a narrow sitemap-only generator because `scripts/restructure-meta-framework.mjs` is broad and remains frozen for Phase 5.

## Future Work

- Decide whether to modernize the full AI research generator template.
- Decide whether HAPI and AGS remain under AI Governance or receive direct navigation entries.
- Review PCPI separately.
- Review external public URLs before adding off-site links.
- Review long papers, essays, and archive pages in separate passes.
