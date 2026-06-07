# Editorial Linter Integration Plan

Phase 4 audit document, updated after the Phase 11 first implementation pass. No public copy was rewritten.

## Goal

Add an editorial lint command that reports hard-ban and review-term matches in public-facing source files while protecting quotations, citations, code, and archive material.

## Current Inputs

- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`
- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`

The CSV has two main classes:

- Hard-ban terms and phrase templates.
- Review terms that can be valid when precise, but should be checked for clustering or vague usage.

## Implemented Commands

Phase 11 added:

```json
"lint:editorial": "node scripts/lint-editorial.mjs",
"lint:editorial:baseline": "node scripts/lint-editorial.mjs --write-baseline"
```

The script currently produces:

- a deterministic console report
- nonzero exit for hard-ban matches on strict current public surfaces and generated public source
- nonzero exit for archive hard-ban matches not represented in the baseline
- zero exit for review-term and protected-term reports

The script does not write a routine report file because ordinary lint runs should not dirty the worktree.

## Scan Scope

Default scan:

- Root HTML entry pages.
- `pages/*.html` public pages that are current, not archival.
- `notes/index.html`.
- `content/**/*.md`.
- `content/library.json`.
- Source scripts that write public prose, including `scripts/generate-ai-research-pages.mjs`.

Optional expanded scan:

- All public HTML.
- Project/archive pages.
- AI-readable root artifacts.

Excluded by default:

- `docs/` planning and audit material, except when checking new docs before commit.
- `assets/` binary files.
- PDFs.
- ZIP files.
- CSV data.
- Code blocks.
- JSON keys where the key is not public copy.
- URLs.
- Citations and bibliography entries.
- Quoted passages.
- Known archive pages unless baseline mode is requested.

## Matching Rules

- Match hard-ban phrases case-insensitively.
- Match hard-ban single words on word boundaries.
- Preserve original line and column in the report.
- Label each result as `hard-ban` or `review`.
- Allow per-line suppression comments only in source files, not rendered HTML.
- Support a baseline file so old archive matches do not block new entry-page edits.

## Suggested Report Format

Each result should include:

- severity
- term
- file path
- line number
- excerpt with the matched text marked
- source classification: current, archive, technical, essay, paper, unclear
- recommended action: rewrite, review, allow as citation, allow as quote, or move to archive baseline

## Integration Points

| Use case | Command behavior |
|---|---|
| Entry-page edit | Run default scan and fail on new hard-ban matches. |
| Generator edit | Scan `scripts/generate-ai-research-pages.mjs` plus generated output after regeneration. |
| Hub-only generator edit | Scan the generator section source and the changed rendered hub page only, then confirm no unrelated generated pages changed. |
| Archive review | Run expanded scan and write report without failing. |
| New planning docs | Scan new docs before commit, but do not treat planning docs as public copy by default. |
| Release check | Run default scan after `npm run apply:shell` and static verification. |

## Phase 6 Requirements

Phase 5 and Phase 6 exposed a split between generated public HTML and manually maintained public HTML. The future linter should classify inputs before deciding whether a match is actionable.

Manual public HTML:

- scan rendered files directly
- fail on new hard-ban matches in current public entry pages
- report review terms separately

Generated public HTML:

- scan both generator source and rendered output
- fail only when the durable source also contains the hard-ban match, unless the rendered output is the only current source
- record which generated routes changed before scanning

Source Markdown:

- scan Markdown sources before rendered HTML when a page has a source marker
- preserve code blocks, quotations, and citations

JSON inputs:

- scan values that become public copy
- ignore private keys and structural identifiers unless they render as labels

Templates:

- scan shared shell fragments and generator templates because one match can spread across many pages

Archive material:

- report by default, but do not fail unless the archive page is being promoted or edited
- support a baseline file for existing matches

PDF text:

- treat as a separate optional mode because PDF extraction can produce false line numbers
- do not fail the default site check on PDF text

Protected technical vocabulary:

- track frequency for terms such as Alignment Theory, agency, governance, infrastructure, PGDL, AAG, Runtime Binding, Receipts, Governance Memory, permit, authority, refusal, execution, and audit
- do not remove protected terms merely because they recur

Documented exceptions:

- allow source-level suppression only with a reason
- include the reason in the report

## First Implementation Phase

Complete in Phase 11:

1. Built `scripts/lint-editorial.mjs`.
2. Read the CSV directly with a dependency-free parser.
3. Classified strict current public pages, generated public source, and archive HTML.
4. Excluded script, style, pre, code, comments, and HTML tags from rendered HTML scans.
5. Added archive baseline support in `docs/editorial/editorial-lint-baseline.json`.
6. Added documented exception support in `docs/editorial/editorial-lint-exceptions.json`.
7. Failed on strict current hard-ban matches and new archive hard-ban matches.
8. Reported review terms and protected-term frequency separately.

Deferred:

- Markdown report output for audit runs.
- Column numbers.
- Rich source maps from generated HTML back to generator data objects.
- PDF text extraction mode.
- Markdown quote and citation handling beyond the current HTML/source scan.

## Author Decisions Needed

- Should archive pages be ignored by default or tracked through a baseline file?
- Should hard-ban matches in AI-readable artifacts fail the build?
- Should citations and quotations require explicit markup to be skipped?
- Should the linter scan rendered HTML, generator source, or both for generated pages?

## Phase 9 Generated Corpus Audit Additions

The generated AI corpus now has a split source model:

- normal generator mode preserves current rendered `<main>` bodies and updates shell, canonical tags, body class, and route notices
- `--render-from-source` can rewrite all 12 generated pages from embedded source data and remains quarantined
- body-copy cleanup must be checked against both rendered HTML and durable generator source objects

Future linter behavior should distinguish:

- new violations introduced by a patch
- historical or baseline violations already present in generated bodies
- allowed documentation references to flagged terms in audit queues
- protected project vocabulary such as Alignment Theory, PCPI, AAG, HAPI, AGS, governance, authority, refusal, execution, audit, workflow, and substrate
- generated body copy from `papers`, `glossaryEntries`, `renderHub()`, and `renderCite()`
- generated interface copy from shell, status notices, nav, buttons, and cards
- source copy in `scripts/generate-ai-research-pages.mjs`
- rendered output in `pages/*.html`
- citation examples, BibTeX blocks, URLs, code, and quoted examples

Recommended generated-corpus linter mode:

1. Read `scripts/generated-ai-corpus-routes.mjs` for the 12 generated routes.
2. Scan rendered `<main>` bodies for public output.
3. Scan `scripts/generate-ai-research-pages.mjs` source sections that feed those bodies.
4. Treat candidate-output examples in the casebook as examples, not automatic cleanup targets.
5. Fail only on new hard-ban matches in edited current public copy unless a suppression or review-queue entry marks an intentional reference.
6. Report protected-term frequency separately from hard-ban and review-term matches.
