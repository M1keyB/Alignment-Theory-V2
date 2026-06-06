# Editorial Linter Integration Plan

Phase 4 audit document. No public copy was rewritten.

## Goal

Add an editorial lint command that reports hard-ban and review-term matches in public-facing source files while protecting quotations, citations, code, and archive material.

## Current Inputs

- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`
- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md`

The CSV has two main classes:

- Hard-ban terms and phrase templates.
- Review terms that can be valid when precise, but should be checked for clustering or vague usage.

## Proposed Command

Add a future script:

```json
"lint:editorial": "node scripts/lint-editorial.mjs"
```

The script should produce:

- `docs/editorial-lint-report.md`
- nonzero exit only for new hard-ban matches outside allowed zones
- zero exit for review-term reports

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
| Archive review | Run expanded scan and write report without failing. |
| Release check | Run default scan after `npm run apply:shell` and static verification. |

## First Implementation Phase

1. Build `scripts/lint-editorial.mjs`.
2. Read the CSV directly.
3. Classify source files with a small route map.
4. Exclude code blocks and quoted blocks.
5. Produce a Markdown report.
6. Fail only on hard-ban matches in current public source files.

## Author Decisions Needed

- Should archive pages be ignored by default or tracked through a baseline file?
- Should hard-ban matches in AI-readable artifacts fail the build?
- Should citations and quotations require explicit markup to be skipped?
- Should the linter scan rendered HTML, generator source, or both for generated pages?
