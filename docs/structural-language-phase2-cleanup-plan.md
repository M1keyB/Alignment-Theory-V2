# Structural Language Phase 2 Cleanup Plan

Date: 2026-06-07

This plan is for a later implementation pass. No cleanup was implemented during the audit.

## Limits

- No more than 10 public-facing files.
- No more than 25 sentence-level edits.
- Current public surfaces first.
- Generated source edited before rendered output.
- No archive-wide replacement.
- No PDF binary edits.
- No route changes.
- No slug changes.
- No compatibility-reference changes.
- Route-level diff review required.
- Editorial lint required.

## Recommended Files

| Order | File | Total flagged | Vague | Repeated | Unclear | Direction |
| ---: | --- | ---: | ---: | ---: | ---: | --- |
| 1 | pages/alignment-theory-in-plain-language.html | 6 | 2 | 1 | 3 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 2 | pages/glossary.html | 4 | 2 | 1 | 1 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 3 | pages/human-agency-preservation-infrastructure.html | 2 | 0 | 0 | 2 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 4 | pages/lexicon.html | 2 | 2 | 0 | 0 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 5 | pages/about.html | 1 | 0 | 0 | 1 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 6 | pages/ai-alignment-and-alignment-theory.html | 1 | 0 | 0 | 1 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 7 | pages/ai-alignment-casebook.html | 1 | 0 | 0 | 1 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 8 | pages/ai-alignment-glossary.html | 1 | 0 | 0 | 1 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |
| 9 | projects/agent-action-gate.html | 1 | 1 | 0 | 0 | Review sentence by sentence; name the actual boundary, process, layer, rule, or dependency. |

## Proposed Batch

Start with the first 6 to 10 files above, stopping at 25 sentence-level edits. If a generated corpus file is selected, edit `scripts/generate-ai-research-pages.mjs` or route metadata first and then regenerate only through the supported path approved for that content. Do not edit rendered generated HTML unless the persistence note for that page says direct output repair is required and documented.

## Review Checklist

1. Confirm clean worktree.
2. Inspect the exact sentence and surrounding paragraph.
3. Decide whether `structural` names a concrete arrangement.
4. If vague, replace the sentence with the actual mechanism.
5. Preserve titles, slugs, anchors, URLs, citations, quotations, and archive provenance.
6. Run `npm run lint:editorial`, `node scripts\verify-static-site.mjs`, and `npm run verify:ai-corpus` where generated corpus pages are touched.
