# Load-Bearing Reconciliation Status

Date: 2026-06-07

## Current Branch

`alignment-theory-phase2-foundation`

## Modified Files

All tracked modified files are expected terminology-cleanup, editorial-guardrail, or persistent-source files:

- `AGENTS.md` — expected; project guidance updated.
- `assets/app.js` — expected; runtime glossary/search-index copy updated.
- `docs/current-framework-map-plan.md` — expected; future map term updated.
- `docs/editorial-cleanup-plan.md` — expected; editorial-plan protected term updated.
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt` — expected; added banned phrase forms.
- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv` — expected; moved phrase to hard-ban rule.
- `docs/editorial/ANTI_AI_SLOP_STYLE_GUIDE.md` — expected; replacement guidance updated.
- `docs/editorial/editorial-lint-baseline.json` — expected; regenerated after moving the term to hard-ban while preserving archive findings.
- `docs/generated-corpus-editorial-inventory.md` — expected; terminology note updated.
- `pages/about.html` — expected; current public description updated.
- `pages/ai-alignment-lineage.html` — expected; rendered AI lineage wording aligned to generator source.
- `pages/ai-civilization-and-human-formation.html` — expected; agency-forming context updated.
- `pages/alignment-theory-in-plain-language.html` — expected; public bridge copy updated.
- `pages/glossary.html` — expected; glossary terms updated.
- `pages/how-to-use-alignment-theory.html` — expected; public guide copy and metadata updated.
- `pages/lexicon.html` — expected; lexicon terms updated.
- `pages/load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html` — expected; visible title, metadata, and definition updated while preserving route.
- `pages/load-bearing-human-capacities-in-the-ai-age.html` — expected; visible title and body updated while preserving route/PDF link.
- `pages/revised-framework-center.html` — expected; current framework center updated.
- `pages/shared-core-structure-across-domains.html` — expected; active theory comparison copy updated.
- `pages/what-the-framework-actually-claims.html` — expected; claim statement updated.
- `pages/where-to-start.html` — expected; entry-path copy updated.
- `pages/why-multiple-fields-are-converging-on-the-same-ai-question.html` — expected; AI-human-agency wording updated.
- `pages/why-the-present-may-be-safer-than-success.html` — expected; AI-human-agency wording updated.
- `scripts/editorial-lint-config.mjs` — expected; protected vocabulary updated.
- `scripts/generate-ai-research-pages.mjs` — expected; generated AI lineage source updated.
- `scripts/lint-editorial.mjs` — expected; Unicode dash/space matching added.
- `scripts/restructure-meta-framework.mjs` — expected; dormant source updated, not run.
- `start-here.html` — expected; entry-page wording updated.

## Untracked Files

All untracked files are expected terminology-cleanup documentation:

- `docs/capacity-forming-functions-terminology.md`
- `docs/load-bearing-archive-treatment-decision.md`
- `docs/load-bearing-reconciliation-status.md`
- `docs/load-bearing-terminology-audit.md`
- `docs/load-bearing-terminology-cleanup-report.md`

## Generated Outputs

Generated output changed directly in one case:

- `pages/ai-alignment-lineage.html`

Reason: the persistent generator source was updated in `scripts/generate-ai-research-pages.mjs`, but `--render-from-source` remains quarantined. The rendered output was adjusted narrowly to match the source wording.

## Unrelated Changes

No unrelated files were found in the pre-validation status check.

## Complete Map Repair

The Complete Map repair remains present:

- `pages/map.html` still presents `Earlier Alignment Theory Map`.
- The full-resolution image link remains present.
- `pages/ai-alignment-research.html` still directs readers to Start Here or the Revised Framework Center instead of overselling the earlier map.

## Safe To Validate

Yes. The changed-file set is understood and limited to the terminology cleanup, editorial linter guardrails, documentation, and one documented rendered-output alignment.
