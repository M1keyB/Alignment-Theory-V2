# AI Framework Banner Source Map

Date: 2026-06-08

## Insertion Source

The persistent insertion source was `scripts/restructure-meta-framework.mjs`.

The relevant source objects were:

- `workMetaBlock`, which inserted the `AI alignment layer` line when `ai` was true.
- `attributionCallout`, which inserted the full `Part of the Alignment Theory Framework` banner.
- `isAiRelated`, which used broad filename and body-content regex checks. Because the site-wide header/footer and many pages mention AI, this classified unrelated pages as AI-related.
- the final `for (const file of allHtmlFiles())` loop, which stripped prior work metadata and attribution callouts and reinserted them.

## Affected Routes

Initial search found 148 HTML/source occurrences of the banner and 148 occurrences of the AI metadata. Most public occurrences were static HTML outputs previously touched by the broad restructuring script.

## Persistence

Direct HTML edits persist as long as `scripts/restructure-meta-framework.mjs` is not rerun in its old form. This pass changed the script so future use relies on an explicit `aiContextFiles` allowlist and compact route notes.

## Regeneration Risk

`npm run apply:shell` does not restore the banner. `scripts/generate-ai-research-pages.mjs` does not contain the banner text or AI-layer metadata string. The risky script is `scripts/restructure-meta-framework.mjs`; it should remain quarantined and should not be run as a broad site transformation without review.

## Safe Persistent Fix

The script now uses explicit route classification instead of broad content scanning. It no longer contains the old full banner paragraph, and it inserts compact AI context notes only for named AI routes.

## Risky Scripts

Do not run `scripts/restructure-meta-framework.mjs` as a broad cleanup pass without checking its output first. Do not use `--render-from-source` for AI corpus pages during this cleanup.