# Editorial Linter Implementation

Phase 11 added a dependency-free editorial linter for public-facing copy checks. It is a guardrail for current public pages and public prose generators, not a rewrite tool.

## Commands

```powershell
npm run lint:editorial
npm run lint:editorial:baseline
```

`npm run lint:editorial` runs the routine check. It prints a console report and exits nonzero when either condition is true:

- a strict current public page or generated public source contains an unexcepted hard-ban match
- archive HTML contains an unexcepted hard-ban match that is not already in the baseline

`npm run lint:editorial:baseline` rewrites `docs/editorial/editorial-lint-baseline.json` with the current historical archive hard-ban findings. Use it only when intentionally rebaselining archive material.

## Inputs

- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `docs/editorial/editorial-lint-exceptions.json`
- `docs/editorial/editorial-lint-baseline.json`
- `scripts/editorial-lint-config.mjs`
- `scripts/generated-ai-corpus-routes.mjs`

The CSV is parsed directly by `scripts/lint-editorial.mjs`. The script deduplicates repeated CSV entries by category and term.

## Scan Scope

Strict current public surfaces are listed in `scripts/editorial-lint-config.mjs`. They include the root entry pages, current applied-governance entry pages, `notes/index.html`, and the generated AI research corpus routes.

Generated public source currently includes:

- `scripts/generate-ai-research-pages.mjs`

Archive scope includes public HTML under the configured HTML roots that is not classified as strict current public surface. Archive hard-ban findings are tracked through the baseline rather than rewritten during this phase.

## Exclusions

Rendered HTML scans remove:

- `<script>` blocks
- `<style>` blocks
- `<pre>` blocks
- `<code>` blocks
- HTML comments
- tags and attributes

The default scan does not extract PDF text, ZIP contents, CSV data, image metadata, or docs planning prose.

## Matching

The linter treats CSV categories containing `hard-ban` as hard-ban entries. CSV categories containing `review` are review entries.

Single-word entries use word-boundary matching. Phrase entries use case-insensitive phrase matching. Template entries using `___` allow bounded text between template parts.

Protected theory vocabulary is counted separately when it appears as a review term. These matches do not fail the command and should be read as frequency data for manual review.

## Baseline

`docs/editorial/editorial-lint-baseline.json` records historical archive hard-ban findings by stable fingerprint. The fingerprint uses:

- normalized file path
- normalized matched entry
- normalized nearby context

Routine lint does not rewrite the baseline. If an archive page gains a new hard-ban match, the routine command fails until the page is reviewed or the archive baseline is intentionally regenerated.

## Exceptions

`docs/editorial/editorial-lint-exceptions.json` is intentionally empty after Phase 11.

An exception should be narrow and should include:

- `file`
- `matchedEntry`
- `anchor`
- `reason`
- `status`

Broad file-level or term-level exceptions should not be used. Exceptions are for documented quotations, citations, formal definitions, or unavoidable public references.

## Report Shape

The console report includes:

- strict hard-ban violations
- strict review matches
- archive hard-ban findings covered by baseline
- new archive hard-ban findings
- archive review matches
- protected-term matches
- exceptions applied
- prunable baseline entries
- protected-term frequency
- samples for strict review matches

Routine lint does not write a Markdown report because a validation command should not dirty the worktree.

## Deferred Work

- Markdown audit report output for intentional audit runs.
- Column numbers.
- Markdown source scanning with quote and citation handling.
- PDF text extraction mode.
- More precise source mapping for generated corpus body data.
- Optional expanded scan for docs that are intended for publication.
