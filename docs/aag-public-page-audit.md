# Agent Action Gate Public Page Audit

Date: 2026-06-06

Status: audit only. The AAG page was not rewritten in Phase 3.

## Public Page Route

- `projects/agent-action-gate.html`

## Version String Currently Shown

- `v0.3.0` appears in the meta description, visible chips, release links, page body, validation status, and status section.

## Repository Evidence Supporting Or Contradicting That Version

- Supporting local evidence:
  - `projects/agent-action-gate.html` repeatedly presents `v0.3.0`.
  - `pages/ai-alignment-research.html` links AAG as `v0.3.0`.
  - `pages/agent-runtime-control-boundary.html` describes AAG capabilities that match the public project page: TypeScript implementation, local HTTP API, n8n demo workflow, cyber-capable agent protection, JSONL decision receipts, and eval suite.
- Contradicting local evidence:
  - No local file found a newer public AAG version string.
  - No local source file establishes a replacement public version.
- External release link:
  - The page links to `https://github.com/mnbower-research/agent-action-gate/releases/tag/v0.3.0`.
  - This pass did not verify GitHub over the network.

## Concepts Currently Represented

- Agent Action Gate: present.
- Pre-execution action control: present.
- Four routes: `allow`, `require_approval`, `revise_action`, and `block`.
- Decision receipts: present as JSONL decision receipts.
- Human approval: present in approval workflow language.
- Agent Runtime Control Boundary: represented indirectly and linked through the research hub.
- Cyber-capable detector coverage: present.
- n8n workflows: present.
- Relationship to Alignment Theory and the AI research hub: present.

## Concepts Absent From The Page

- Pre-Gate Deliberation Layer: absent by name.
- Runtime Binding: absent by name.
- Governance Memory: absent by name.
- Governance profiles: absent by name.
- Alignment Governance Stack: absent by name.
- Human Agency Preservation Infrastructure: absent by name.
- Delegated agency: absent by name.
- Live human authority: absent by name.

## Concepts Partly Present

- Receipts: present as `JSONL decision receipts`, but not framed as a larger governance component.
- Human authority: present through approval and review language, but not named as live human authority.

## Page Status

- The page appears current for the local public AAG route, but incomplete relative to the newer governance vocabulary listed in `AGENTS.md` and `docs/new-research-intake-map.md`.

## Recommended Future Update Scope

- Confirm the public AAG version before changing `v0.3.0`.
- Decide whether AAG should remain a standalone project page or become one page inside a larger AI governance section.
- Add PGDL, Runtime Binding, Receipts, Governance Memory, governance profiles, AGS, HAPI, delegated agency, and live human authority only after source material is identified.
- Keep implementation claims tied to repository evidence and release evidence.

## Questions Requiring Human Confirmation

- Is `v0.3.0` still the intended public release?
- Should the page name PGDL or wait for a separate PGDL page?
- Should Receipts remain an AAG implementation detail or become a separate governance concept?
- Should the page link to HAPI or AGS when those surfaces exist?
- Should live human authority become the preferred term over human approval in public copy?
