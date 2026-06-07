# Applied Governance Public Page Plan

Phase 5 update: the two overview pages below now exist. This document records the implemented public-surface pass and the remaining follow-up work.

## Future Routes

Implemented routes:

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

Implemented page job:

- Explains AGS as the implementation-facing governance stack.
- Relates AGS to PGDL, AAG, Runtime Binding, Receipts, Governance Memory, governance profiles, HAPI, and the original AAG prototype.
- Distinguishes implemented repository evidence from documented design work.
- Avoids production-readiness and certification claims.

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

Implemented page job:

- Explains HAPI as Human Agency Preservation Infrastructure.
- Positions HAPI as the public agency-preservation and audit branch.
- Defines agency erosion, agency theater, dependency capture, true gates, false gates, meaningful refusal, and live human authority.
- Distinguishes HAPI from AGS implementation tooling.
- Keeps standard and certification language future-facing.

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

The AI research hub now includes a short `Applied Governance Branch` section sourced from `scripts/generate-ai-research-pages.mjs` and written through its `--hub-only` mode.

1. Alignment Theory research foundation
2. AI alignment research corpus
3. PCPI technical page
4. AAG as earlier action-gate prototype
5. HAPI as public agency-preservation branch
6. AGS as implementation-facing governance stack

The full generator currently drifts from the rendered page shell, so Phase 5 added a narrow hub-only path instead of rewriting all generated paper pages.

## Migration Order

1. Review the two overview pages for author approval.
2. Decide whether AGS and HAPI should get direct navigation entries or remain under AI Governance.
3. Decide whether to modernize the full AI research generator template in a later pass.
4. Review PCPI separately before changing technical measurement copy.
5. Review AGS/HAPI source links after public URLs are approved.

## Out Of Scope For First Implementation

- Full HAPI site migration.
- AGS package documentation migration.
- Rewriting generated AI research papers.
- Rewriting PCPI.
- Rewriting long essays or archive pages.
- Moving public URLs.
