# Applied Governance Public Page Plan

Phase 4 planning document. The pages below were not created.

## Future Routes

Default future routes from the Phase 4 brief:

- `/pages/alignment-governance-stack.html`
- `/pages/human-agency-preservation-infrastructure.html`

## Page 1: Alignment Governance Stack

Recommended route:

- `/pages/alignment-governance-stack.html`

Recommended classification:

- current
- technical
- applied governance

Recommended source basis:

- `C:\Users\micha\Desktop\alignment-governance-stack\README.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\CHANGELOG.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\MODULAR_ARCHITECTURE.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\PGDL.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\AAG.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\RUNTIME_BINDING.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\RECEIPTS.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\GOVERNANCE_MEMORY.md`
- `C:\Users\micha\Desktop\alignment-governance-stack\docs\HUMAN_AGENCY_AUDIT.md`

Draft page job:

- Explain AGS as the implementation-facing governance stack.
- Show how it relates to PGDL, AAG, runtime binding, receipts, policy profiles, authority maps, participation checks, and governance memory.
- Distinguish it from the older standalone AAG page.
- Avoid claiming production validation or certification unless author-approved.

Recommended sections:

- What AGS Is
- Why It Exists
- Governance Path
- Main Modules
- Relationship To Alignment Theory
- Relationship To HAPI
- Status And Boundaries
- Source Notes

## Page 2: Human Agency Preservation Infrastructure

Recommended route:

- `/pages/human-agency-preservation-infrastructure.html`

Recommended classification:

- current
- applied governance
- public agency-preservation branch

Recommended source basis:

- `C:\Users\micha\Desktop\HAPI\README.md`
- `C:\Users\micha\Desktop\HAPI\02_Website\brand-language.md`
- `C:\Users\micha\Desktop\HAPI\02_Website\sitemap.md`
- `C:\Users\micha\Desktop\HAPI\02_Website\homepage-copy.md`
- `C:\Users\micha\Desktop\HAPI\components\HomePage.tsx`
- `C:\Users\micha\Desktop\HAPI\components\ResearchPage.tsx`
- `C:\Users\micha\Desktop\HAPI\components\AgencyAuditPage.tsx`
- selected HAPI PDFs after author review

Draft page job:

- Explain HAPI as Human Agency Preservation Infrastructure.
- Position HAPI as the public agency-preservation and audit branch.
- Name agency loss, false gates, refusal, authority, restoration, and continuity.
- Distinguish HAPI from AGS implementation tooling.
- Keep certification language future-facing unless author-approved.

Recommended sections:

- What HAPI Is
- The Agency Problem
- What HAPI Looks For
- Audit And Restoration
- Research Source Library
- Relationship To Alignment Theory
- Relationship To AGS
- Status And Boundaries

## AI Alignment Research Hub Adjustment

After the two overview pages are approved and drafted, the AI research hub should add a small reading-path note:

1. Alignment Theory research foundation
2. AI alignment research corpus
3. PCPI technical page
4. AAG as earlier action-gate prototype
5. HAPI as public agency-preservation branch
6. AGS as implementation-facing governance stack

That change should happen in `scripts/generate-ai-research-pages.mjs` if the generator remains source-of-truth.

## Migration Order

1. Confirm AGS and HAPI route names.
2. Confirm public status language for AGS and HAPI.
3. Update shared shell with a single AI Governance destination only if needed.
4. Draft the two overview pages.
5. Add archive/historical status to the old AAG page.
6. Update the AI research hub reading path.
7. Run editorial lint, static verification, and shell determinism checks.

## Out Of Scope For First Implementation

- Full HAPI site migration.
- AGS package documentation migration.
- Rewriting generated AI research papers.
- Rewriting PCPI.
- Rewriting long essays or archive pages.
- Moving public URLs.
