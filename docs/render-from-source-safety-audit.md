# Render From Source Safety Audit

Date: 2026-06-07

Status: Phase 9 audit-only. `--render-from-source` was inspected but not executed.

## Code Path

The flag is handled in `scripts/generate-ai-research-pages.mjs` after the `--hub-only` branch:

```text
node scripts/generate-ai-research-pages.mjs --render-from-source
```

## What The Flag Reads

- hardcoded `papers` array
- `pcpiPaper`
- `howToCiteItem`
- `glossaryEntries`
- `externalRefs`
- renderer helpers such as `pageHead()`, `shell()`, `renderHub()`, `renderCite()`, `renderPaper()`, `paperSections()`, `relatedBlock()`, and `researchTools()`
- current process working directory for `pagesDir`

It does not read the current rendered HTML bodies before writing.

## What The Flag Writes

It writes:

- `pages/ai-alignment-research.html`
- `pages/how-to-cite.html`
- one page for each `papers` entry

That is the full 12-route generated corpus.

## Overwrite Scope

- rewrites all 12 generated pages: yes
- can change `<main>` body text: yes
- can change metadata: yes
- can change canonical tags: yes
- can change navigation: yes
- can change status notices: yes

## Safety Findings

- The path uses older full-page templates rather than the current rendered HTML as the baseline.
- It can overwrite Phase 5 Applied Governance hub changes unless current hub sections are fully represented in `renderHub()`.
- It can overwrite Phase 7 shell changes because it uses `shell()` rather than the Phase 7 in-place shell transform.
- It can overwrite Phase 8 lineage notice behavior unless the full render output is later passed through the normal transform.
- It can roll metadata back to generator defaults from `pageHead()`, including older author/date/template behavior already identified in the Phase 7 implementation notes.
- It bypasses the body-preservation strategy used by the normal generator mode.
- It is likely deterministic by inspection because it writes static strings from hardcoded source data, but deterministic output is not the same as safe output.

## Conclusion

Conclusion: legacy path; keep quarantined.

`--render-from-source` should not be used for routine generation until the embedded source data, metadata template, shell template, hub sections, and status-notice behavior are audited and brought into alignment with current rendered pages.

## Safeguards Required Before Any Later Use

- commit or stash all current work first
- record pre-run hashes for all 12 files and all 12 `<main>` bodies
- run in a disposable branch or copied working tree
- compare route-by-route diffs
- compare metadata and canonical tags against `scripts/generated-ai-corpus-routes.mjs`
- verify Phase 5 hub links to HAPI, AGS, and AAG survive
- verify the Phase 7 generated shell survives or is reapplied
- verify the Phase 8 lineage notice survives or is reapplied
- run `npm run verify:ai-corpus`
- run `node scripts/verify-static-site.mjs`
- require author approval before retaining any body changes
