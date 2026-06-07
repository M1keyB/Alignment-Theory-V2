# External AGS Source Audit

Phase 4 read-only audit of `C:\Users\micha\Desktop\alignment-governance-stack`.

No external AGS files were edited.

## Repository Status

- Path exists: `C:\Users\micha\Desktop\alignment-governance-stack`
- Project name in `package.json`: `alignment-governance-stack`
- Package version in `package.json`: `0.1.0`
- Package manager: `pnpm@9.12.3`
- Current local release evidence from `CHANGELOG.md`: `v1.12.0 - AGS Continuity Console and Read-Only Evidence Ingestion`

The `package.json` version appears stale compared with the local changelog. Future public copy should cite the changelog or a tagged release after author confirmation.

## Top-Level Shape

Observed top-level areas:

- `apps`
- `docs`
- `evals`
- `examples`
- `packages`
- `README.md`
- `CHANGELOG.md`
- `AGENTS.md`
- `package.json`
- `pnpm-workspace.yaml`

This is a TypeScript monorepo, not a static website folder.

## Local Summary

AGS is the implementation-facing governance stack. Its README frames AGS as open-source public-interest infrastructure for agentic AI. It focuses on runtime governance, human agency, authorization, receipts, evidence, and review.

The local thesis language centers on:

- proposal not outrunning objection
- action not outrunning discernment
- execution not outrunning authorization
- memory not outrunning human review

## Documented Path

The README describes the governed path as:

1. Human and organizational authority
2. Governance substrate
3. Semantic context and admissibility
4. Agent reasoning and proposal formation
5. PGDL
6. AAG
7. Business-level runtime admissibility
8. Machine-level execution binding
9. Execution environments and consequence
10. Receipts and evidence
11. Governance memory and internalization
12. Human agency audit

## Main Local Modules

The README and docs reference these implementation areas:

- Integration Adapters
- Company Alignment Profile Generator
- Alignment Gap Detector / Policy Conflict Analyzer
- Policy Profiles with Hard Boundaries
- Authority Map / Approval Validation
- Human Participation Quality
- PGDL
- Policy Resolution
- AAG
- Runtime Binding
- Decision Closure Artifact
- Receipts
- Agency Fingerprint
- Governance Memory
- Agency Chain Mapper
- Governance Reality Reports / Audit Core
- Structural Babel Detection
- Governance Absorption Capacity / Babel Velocity
- Eval Suite
- Developer CLI
- Continuity Console

## Sampled Docs

| File | Phase 4 reading |
|---|---|
| `README.md` | Primary AGS overview and module map. |
| `CHANGELOG.md` | Best local evidence for release status. Latest heading observed: `v1.12.0`. |
| `docs/MODULAR_ARCHITECTURE.md` | Vendor-neutral reference architecture and required governance functions. |
| `docs/PGDL.md` | Pre-Gate Deliberation Layer; matures proposals before the hard gate. |
| `docs/AAG.md` | Action gate imported into AGS as `@alignment-governance-stack/aag-core`. |
| `docs/RUNTIME_BINDING.md` | Checks actual execution against permits to prevent drift between proposal and action. |
| `docs/RECEIPTS.md` | Proof artifacts after governance checks and final decision. |
| `docs/GOVERNANCE_MEMORY.md` | Read-only continuity layer that analyzes receipts and recommends human review. |
| `docs/HUMAN_AGENCY_AUDIT.md` | Capstone evaluation of whether the system preserves human judgment, refusal, participation, and authority. |
| `docs/HUMAN_PARTICIPATION.md` | Checks whether the right human participated with real authority. |
| `docs/POLICY_PROFILES.md` | Organization-specific constraints and hard boundaries. |
| `docs/RUNTIME_GOVERNANCE_PROFILE_DESIGN.md` | Early internal profile-design plan; not a completed public promise. |
| `docs/ECOSYSTEM_MAP.md` | Neutral registry template with status terms. Starts blank locally. |
| `docs/CONTINUITY_CONSOLE.md` | Local-first operator console with read-only evidence ingestion. |

## Public Placement Recommendation

AGS should eventually have a public overview page at:

- `/pages/alignment-governance-stack.html`

That page should position AGS as an applied implementation branch of Alignment Theory, distinct from:

- foundational Alignment Theory
- the HAPI public agency-preservation layer
- the older AAG v0.3.0 prototype page

## Boundary Notes

- Do not edit AGS files from the Alignment Theory repo.
- Do not present AGS as a finished certification system without author confirmation.
- Treat AAG inside AGS as newer than the old standalone public AAG prototype page.
- Treat Continuity Console as local-first/read-only evidence tooling unless the AGS repo changes.

## Author Decisions Needed

- Which AGS release number should public AlignmentTheory.org copy cite?
- Should the AGS overview link to an external repo, a future package page, or a local explanatory page only?
- Should AGS be framed as research infrastructure, developer infrastructure, or both?
- Should the old AAG project page be marked historical once the AGS page exists?
