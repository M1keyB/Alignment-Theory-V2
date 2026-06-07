# Phase 11 Editorial Linter Implementation

Phase 11 implemented the first editorial-linter pass. No public prose was rewritten, no visual redesign was started, no pages were moved or deleted, and `--render-from-source` was not run.

## Implemented Files

- `scripts/lint-editorial.mjs`
- `scripts/editorial-lint-config.mjs`
- `docs/editorial/editorial-lint-baseline.json`
- `docs/editorial/editorial-lint-exceptions.json`
- `docs/editorial-linter-implementation.md`
- `docs/phase11-editorial-linter-implementation.md`

Updated:

- `package.json`
- `AGENTS.md`
- `docs/editorial-linter-integration-plan.md`

## Command Wiring

Added:

```json
"lint:editorial": "node scripts/lint-editorial.mjs",
"lint:editorial:baseline": "node scripts/lint-editorial.mjs --write-baseline"
```

The linter uses only Node built-ins.

## Scan Model

Strict public surfaces:

- root public entry pages
- `notes/index.html`
- applied-governance public entry pages
- the 12 generated AI research corpus routes from `scripts/generated-ai-corpus-routes.mjs`

Generated public source:

- `scripts/generate-ai-research-pages.mjs`

Archive scope:

- public HTML under configured HTML roots that is not classified as strict current public surface

Excluded from rendered HTML matching:

- script blocks
- style blocks
- pre/code blocks
- comments
- HTML tags and attributes

The linter does not scan PDFs, CSV data, ZIP contents, image metadata, or planning docs by default.

## Baseline

`npm run lint:editorial:baseline` wrote `docs/editorial/editorial-lint-baseline.json`.

Historical archive hard-ban baseline count:

```text
190
```

Routine lint does not rewrite the baseline. New archive hard-ban fingerprints fail the routine command until reviewed or intentionally rebaselined.

## Exceptions

`docs/editorial/editorial-lint-exceptions.json` is present and empty:

```json
{
  "version": 1,
  "exceptions": []
}
```

No Phase 11 exceptions were used.

## Routine Lint Result

Final `npm run lint:editorial` result:

```text
Strict hard-ban violations: 0
Strict review matches: 324
Archive hard-ban findings covered by baseline: 190
New archive hard-ban findings: 0
Archive review matches: 4067
Protected-term matches: 6487
Exceptions applied: 0
Prunable baseline entries: 0
```

Protected-term frequency:

```text
alignment: 3509
constraint: 1092
coherence: 1020
agency: 296
load-bearing: 218
governance: 190
authority: 131
infrastructure: 29
substrate: 2
```

Remaining strict review samples are review-only and do not fail the command. The highest recurring review terms are `framework`, `architecture`, `continuity`, `explore`, `role`, and `evolving`.

## Negative Test

A temporary visible hard-ban word was inserted into `index.html`.

Expected result:

```text
Strict hard-ban violations: 1
index.html:176 [strict-public/hard-ban] delve
```

The temporary text was removed immediately. The clean linter run then passed with zero strict hard-ban violations.

## Generated Corpus Preservation

Checks run:

```powershell
npm run verify:ai-corpus
node scripts\generate-ai-research-pages.mjs
npm run verify:ai-corpus
node scripts\generate-ai-research-pages.mjs --hub-only
npm run verify:ai-corpus
```

Results:

- verifier passed before generator checks
- normal generator reported 12 shell updates
- no generated page diff remained after normal generator mode
- hub-only mode reported `pages/ai-alignment-research.html`
- no generated page diff remained after hub-only mode
- verifier passed after both generator modes
- `--render-from-source` was not run
- no generated corpus body rewrite was performed

## Full Validation

Commands run:

```powershell
npm run build
node scripts\verify-static-site.mjs
npm run lint:editorial
npm run verify:ai-corpus
npm run apply:shell
node scripts\verify-static-site.mjs
git diff --check
npm run apply:shell
```

Results:

- `npm run build`: passed; static site reports no build step required
- `node scripts\verify-static-site.mjs`: passed; verified 162 HTML pages
- `npm run lint:editorial`: passed
- `npm run verify:ai-corpus`: passed; verified 12 generated AI corpus routes
- `npm run apply:shell`: passed
- second static verification after shared shell: passed
- `git diff --check`: passed; Git printed LF-to-CRLF warnings only
- second `npm run apply:shell`: passed and left no public page diff

## Notes

- The linter currently reports to console only, so routine validation does not dirty the worktree.
- Archive hard-ban findings are tracked, not rewritten.
- Review terms remain advisory.
- Protected theory terms are counted separately so repeated technical vocabulary can be reviewed manually.
- Public copy, archival pages, PCPI, and generated body prose were left unchanged.
