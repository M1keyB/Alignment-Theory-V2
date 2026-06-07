# Phase 8 Generated Corpus Status And Canonical Implementation

Date: 2026-06-07

Status: complete. Batch 2 only.

## Phase 7 Commit

- `67b1d44 phase7: modernize generated AI corpus shell`

## Exact Generated Routes

- `pages/ai-alignment-research.html`
- `pages/how-to-cite.html`
- `pages/ai-alignment-executive-summary.html`
- `pages/ai-alignment-three-layer-blueprint.html`
- `pages/ai-alignment-literature-review.html`
- `pages/ai-alignment-competitive-positioning.html`
- `pages/ai-alignment-who-this-is-for.html`
- `pages/ai-alignment-methodology.html`
- `pages/ai-alignment-glossary.html`
- `pages/ai-alignment-lineage.html`
- `pages/ai-alignment-limitations.html`
- `pages/ai-alignment-casebook.html`

## Status Categories Assigned

- current hub:
  - `pages/ai-alignment-research.html`
- current reference:
  - `pages/how-to-cite.html`
  - `pages/ai-alignment-executive-summary.html`
  - `pages/ai-alignment-literature-review.html`
  - `pages/ai-alignment-who-this-is-for.html`
  - `pages/ai-alignment-glossary.html`
- current technical research:
  - `pages/ai-alignment-three-layer-blueprint.html`
  - `pages/ai-alignment-competitive-positioning.html`
  - `pages/ai-alignment-methodology.html`
  - `pages/ai-alignment-limitations.html`
  - `pages/ai-alignment-casebook.html`
- development history:
  - `pages/ai-alignment-lineage.html`

No generated route was classified as `historical framing` or `unclear` in this pass.

## Notices Added

One visible notice was added outside `<main>`:

- `pages/ai-alignment-lineage.html`

Notice text:

```text
This page records the development history of the AI research corpus. Use the research hub for the current reading path.
```

## Pages Left Without Notices

The other 11 generated pages were left without visible notices because their current role is clear from title, page structure, and the Phase 6/7 AI Governance hub path.

## Canonical Behavior

- Generated route metadata now lives in `scripts/generated-ai-corpus-routes.mjs`.
- `scripts/generate-ai-research-pages.mjs` reads that manifest for the 12 generated files.
- Normal generator mode normalizes generated corpus canonical tags to `https://alignmenttheory.org` plus the route's manifest path.
- Each generated page is expected to canonicalize to itself.
- No compatibility canonical exception was added for the generated corpus.

## Verification Script

Added:

- `scripts/verify-generated-ai-corpus.mjs`

The script verifies:

- every expected generated file exists
- no duplicate generated file entries exist
- no duplicate canonical path entries exist
- each generated page has exactly one canonical tag
- canonical URLs are absolute
- canonical URLs match the intended route
- each generated page has `generated-ai-corpus-page` on `<body>`
- the AI Governance hub links to HAPI, AGS, and AAG

## Package Command

Added:

```json
"verify:ai-corpus": "node scripts/verify-generated-ai-corpus.mjs"
```

## Body-Hash Preservation

Normal generator run after Phase 8 implementation:

- Updated 12 generated AI research corpus shells.
- `<main>` content hash changes: none.

## Generator Mode Verification

- normal generator mode remains the supported shell-update and status/canonical path.
- `--hub-only` remains available for the Applied Governance Branch section.
- `--render-from-source` remains available but unaudited for routine use.
- `--render-from-source` was not executed in Phase 8.

## Deferred Editorial Work

- `pages/ai-alignment-literature-review.html:127` remains in the generated body review queue.
- Generated body copy was not rewritten.
- Generator source data and rendered output should be reviewed together in Batch 3.

## Deferred Technical Review

Later review is still needed for:

- AI research corpus technical claims
- methodology and evaluation protocol
- casebook examples
- PCPI relationship and terminology
- AAG, HAPI, and AGS relationship to the generated corpus

## Validation Results

Commands run:

```powershell
npm run build
node scripts/verify-static-site.mjs
npm run verify:ai-corpus
node scripts/generate-ai-research-pages.mjs
npm run verify:ai-corpus
node scripts/generate-ai-research-pages.mjs --hub-only
npm run verify:ai-corpus
npm run apply:shell
node scripts/verify-static-site.mjs
git diff --check
```

Additional determinism checks:

- normal generator mode was run twice; the second run changed no generated route hashes
- `--hub-only` was run twice; the second run changed no generated route hashes
- shared shell was run twice; the second run changed no HTML hashes

Results:

- `npm run build`: passed. Static site placeholder reported no build step required.
- `node scripts/verify-static-site.mjs`: passed before and after shared shell. Verified 162 HTML pages.
- `npm run verify:ai-corpus`: passed after initial implementation, after normal generation, and after `--hub-only`.
- `git diff --check`: passed with line-ending warnings only.
- Final `<main>` body-hash comparison against the Phase 8 baseline: no differences.
- New public-facing notice, interface copy, and script additions hard-ban matches: 0.
- New documentation includes one required review-queue mention of the pre-existing flagged term.
- Pre-existing generated corpus body hard-ban matches: 1, recorded in `docs/generated-corpus-editorial-review-queue.md`.
- PCPI was not edited.
- `--render-from-source` was not executed.
