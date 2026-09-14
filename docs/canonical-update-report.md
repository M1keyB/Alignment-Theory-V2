# Canonical website update ? 2026-09-14

Implemented in the existing AlignmentTheory-CODEX workspace after reading the full canonical handoff and editorial references and inventorying all 162 original public pages. The site now has 165 public pages. Existing URLs remain available; no redirect or deletion was required.

## Conceptual changes

- The public center now defines alignment as the preservation of coherent agency under constraint. Support/substitution remains a central mechanism, including the four support relations and capacity-forming functions.
- The framework center, homepage, entry pages, glossary and machine-readable references connect capacity ? participation ? support/substitution ? constraints ? agency ? authority ? continuity ? governance ? internalization.
- New Constraint/Agency/Alignment and Convergence Log pages supply constraint and gate distinctions and carefully bounded external comparisons.
- HAPI is the human/institutional application. AGS is the application to delegated operational agency. Neither replaces Alignment Theory as the foundation.
- The maps themselves now show the canonical relations, HAPI/AGS branches and ten-node trajectory across five distinct planes. A new SVG replaces current displays of the historical PNG; the PNGs remain available.
- Delegated authority, semantic/runtime continuity, Handoff Integrity, Governance Memory and internalization have explicit places in the current account. Governance Memory recommends changes for human review; it does not silently change policy or authority.
- Biblical/Babel material is identified as philosophical/theological interpretation. Independent parallels are comparisons, with chronology and limits, rather than validation or implied influence.

## Preservation and navigation

The previous framework center is preserved at `pages/revised-framework-center-2026-05-06.html`. Older definitions remain as dated historical content. Historical support, inner/outer and theological pages receive context notices rather than rewritten arguments. Existing paper bodies, downloads, citations, prototype status caveats and older image assets are retained.

The shared navigation now survives runtime JavaScript initialization on current pages. The existing journal styling remains; diagrams adapt to small screens, and current pages have a visible mobile menu. Updated asset version queries prevent reuse of stale CSS/JavaScript on changed pages. The sitemap includes all 165 pages and distinguishes current entry routes from the preserved May framework.

## Validation

- `npm.cmd run build`: passed; this static project explicitly has no compilation step.
- `npm.cmd run verify:ai-corpus`: passed for all 12 generated routes.
- `node scripts/verify-static-site.mjs`: passed for all 165 HTML pages, local href/src targets, metadata, JSON-LD and JSON references.
- JavaScript syntax checks passed for the browser script and changed executable generators/shell/sitemap scripts.
- Internal fragment check: no missing targets. Existing URLs remain in place; there are no meta-refresh redirects to validate.
- Installed headless Chrome: 15 current routes at 1440px and 390px; one H1 per page, eight primary navigation links, no document horizontal overflow or duplicate IDs, visible mobile menu controls with open/Escape-close behavior. Both trajectory diagrams contain ten nodes. Screenshots were inspected. The in-app browser could not initialize, so local Chrome supplied the browser checks.
- Preservation comparisons: all 20 checks passed, including original historical main content after removing the added notice, original May framework body, unchanged editorial baseline and unchanged existing PDFs/PNGs.
- `npm.cmd run lint:editorial`: still exits 1 because of historical findings. Current strict hard-ban violations: **0**. Baseline-covered archive findings: **221**; unbaselined archive findings: **88** (104 before this update). Protected-term matches: **6,058**, reported separately. One narrowly scoped exception covers an unchanged sentence copied into the dated May archive. No baseline regeneration or broad exception was used. Scope/fingerprint changes affect baseline counts; the reduction is not a claim that all historical prose was cleaned.
- No project test or typecheck command is defined. The existing verification commands and browser checks were used.

Full remaining hard-ban locations are in `canonical-update-editorial-report.md`; before/after JSON files contain contexts and separate protected-term frequency. Browser, anchor and preservation results are in `canonical-update-qa/`.

## Limits requiring further direction

No requested conceptual website section remains blocked. The handoff describes a developing framework, not new empirical results or a certification of external software. Existing implementation-status caveats remain: this update does not establish production readiness of HAPI/AGS components, implement those external repositories, or resolve the framework's open empirical questions. Historical papers have not been retrospectively rewritten into the September synthesis. A separate author-directed paper revision or historical editorial cleanup would be additional work.

## Exact changed files

57 tracked files modified; 21 new files added (including this report and QA artifacts).

### Modified

- `about.html`
- `ai-summary.json`
- `ai-terms.html`
- `alignment-theory-canonical.md`
- `applications.html`
- `assets/app.js`
- `assets/fragments/site-footer.html`
- `assets/fragments/site-header.html`
- `assets/styles.css`
- `attribution.json`
- `cite.html`
- `convergence-map.html`
- `core-constraints.html`
- `definitions.html`
- `docs/editorial/editorial-lint-exceptions.json`
- `for-ai-systems.html`
- `index.html`
- `llms.txt`
- `notes/index.html`
- `pages/ai-alignment-casebook.html`
- `pages/ai-alignment-competitive-positioning.html`
- `pages/ai-alignment-executive-summary.html`
- `pages/ai-alignment-glossary.html`
- `pages/ai-alignment-limitations.html`
- `pages/ai-alignment-lineage.html`
- `pages/ai-alignment-literature-review.html`
- `pages/ai-alignment-methodology.html`
- `pages/ai-alignment-research.html`
- `pages/ai-alignment-three-layer-blueprint.html`
- `pages/ai-alignment-who-this-is-for.html`
- `pages/alignment-governance-stack.html`
- `pages/alignment-theory-in-plain-language.html`
- `pages/biblical-grammar.html`
- `pages/constraint-model.html`
- `pages/framework.html`
- `pages/glossary.html`
- `pages/how-to-cite.html`
- `pages/how-to-use-alignment-theory.html`
- `pages/human-agency-preservation-infrastructure.html`
- `pages/lexicon.html`
- `pages/library.html`
- `pages/load-bearing-function-participatory-capacity-and-the-four-modes-of-support.html`
- `pages/map.html`
- `pages/on-the-inner-outer-distinction.html`
- `pages/participation-co-regulation-and-substitution.html`
- `pages/revised-framework-center.html`
- `pages/structural-reasoning-and-theological-commitment.html`
- `pages/the-four-structural-states-of-support-and-participation.html`
- `pages/what-the-framework-actually-claims.html`
- `pages/where-to-start.html`
- `papers.html`
- `scripts/apply-shared-shell.mjs`
- `scripts/editorial-lint-config.mjs`
- `scripts/generate-ai-research-pages.mjs`
- `scripts/update-sitemap.mjs`
- `sitemap.xml`
- `start-here.html`

### Added

- `assets/images/alignment-theory-canonical-map-2026-09-14.svg`
- `docs/canonical-update-editorial-after.json`
- `docs/canonical-update-editorial-before.json`
- `docs/canonical-update-editorial-report.md`
- `docs/canonical-update-inventory.json`
- `docs/canonical-update-plan.md`
- `docs/canonical-update-qa/alignment-governance-stack-1440.png`
- `docs/canonical-update-qa/alignment-governance-stack-390.png`
- `docs/canonical-update-qa/anchor-check.json`
- `docs/canonical-update-qa/browser-results.json`
- `docs/canonical-update-qa/editorial-lint.txt`
- `docs/canonical-update-qa/index-1440.png`
- `docs/canonical-update-qa/index-390.png`
- `docs/canonical-update-qa/map-1440.png`
- `docs/canonical-update-qa/map-390.png`
- `docs/canonical-update-qa/preservation-checks.json`
- `docs/canonical-update-qa/svg-overview.png`
- `docs/canonical-update-report.md`
- `pages/constraint-agency-alignment.html`
- `pages/convergence-log.html`
- `pages/revised-framework-center-2026-05-06.html`
