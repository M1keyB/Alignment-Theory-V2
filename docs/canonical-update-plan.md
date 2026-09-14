# Canonical update implementation plan

Date: 2026-09-14. Source: Michael Nathan Bower, *Alignment Theory: From Support/Substitution to Coherent Agency Under Constraint*, working canonical handoff, read in full before edits. The synthesis is not peer reviewed.

## Inspection and existing conditions

- Inventory: 335 files, 162 public HTML pages, two shared shell fragments, one stylesheet, one browser script, Markdown manuscripts/essays, library metadata, PDFs, research ZIP, spreadsheet and PCPI evaluation artifacts. The full route/content/link/style/artifact inventory is in `canonical-update-inventory.json`.
- Static HTML is served directly. `assets/app.js` supplies navigation, tables of contents, glossary help and older Markdown/library rendering. `assets/styles.css` contains the established monochrome journal styling and scoped modern-page rules.
- Eight pages use the explicit shared-shell updater. The AI corpus has its own generator and shell. The theory center and several reference pages still use legacy navigation.
- `scripts/generate-ai-research-pages.mjs` owns the research hub and versioned AI corpus. Update the hub's source and output together; retain paper bodies, downloads, version labels, and implementation caveats.
- Earlier batch utilities (`restructure-meta-framework.mjs`, `render-static-content.js`) are migration/archive tools, not the ordinary build. Do not rerun them over current pages.
- Existing overlap: Start Here/Where to Start; root definitions/glossary/lexicon; root Research/archive Papers; current About/archive About; old AI overview/current research hub; Framework/Current Framework Map. Keep URLs and distinguish roles.
- The current PNG map is embedded in Map, Framework, and the AI research hub/generator. Preserve both older PNG assets as history; replace current displays with a responsive HTML diagram and a new SVG overview.
- Initial static verification passes for all 162 pages. There are no meta-refresh redirects. No route needs to move.
- Initial editorial lint fails before this work: 0 strict violations, 207 baseline-covered archive findings, 104 unbaselined archive findings; 5,624 protected matches. Save full hard-ban locations and protected frequencies separately. Do not change the baseline or rewrite historical papers to conceal existing failures.
- The repository's external AGS/HAPI audits support retaining the current status caveats. They do not establish new implementation claims from the September conceptual handoff.

## Sitemap and migration map

The primary navigation remains Start Here, Theory, Research, Notes, AI Governance, Archive, About, Subscribe.

| Route/surface | Concrete change |
| --- | --- |
| `/`, `/start-here.html`, `/about.html`, `/papers.html` | State coherent agency under constraint, retained support/substitution mechanism, foundation/application hierarchy and working status. |
| `/pages/revised-framework-center.html` | Current September synthesis with spine, glossary links, constraints, authority, continuity, internalization, limits and provenance. Keep the existing route/title. |
| `/pages/revised-framework-center-2026-05-06.html` | New dated archive preserving the previous center's main content, with an archive notice and return link. |
| `/pages/map.html`, `/pages/framework.html` | Update the diagram itself, distinguish conceptual sequence from causal proof, show support/substitution across participation and branch to HAPI/AGS. |
| `/pages/constraint-agency-alignment.html` | New canonical conceptual page: usable agency, true/false constraints, legitimate gates and inspectable evaluation questions. |
| `/definitions.html` | Current canonical glossary; retain earlier definitions as explicitly dated history. |
| `/pages/human-agency-preservation-infrastructure.html` | Human/institutional application, legitimate constraints, live authority and Levels 0–5 maturity model. |
| `/pages/alignment-governance-stack.html` | Foundation link, delegated operational agency, ten-node operator trajectory grouped into five planes, Handoff Integrity and both continuity tests; retain package/status caveats. |
| `/pages/convergence-log.html` | Research log with source date, domain, mapping, non-mapping, evidence strength, chronology and influence uncertainty. Verify sources where available; label unverified handoff examples explicitly. |
| `/pages/ai-alignment-research.html` and generator | Updated conceptual orientation, map and branch links, preserving versioned research. |
| `/pages/library.html` | Discoverable dated May center and earlier conceptual records. |
| Older entry/theory/interpretation pages | Add dated context notices only where the old formulation could be mistaken for the current whole framework. Preserve article prose and citations. |
| `alignment-theory-canonical.md`, `ai-summary.json`, `attribution.json`, `llms.txt`, `/for-ai-systems.html`, `/cite.html` | Align preferred summaries, definitions and reading paths; keep prior formulations visibly historical. |
| Shared fragments, shell updater, stylesheet, sitemap, editorial config | Broader global description; coherent current navigation; minimal diagram styles; new routes and strict current-page coverage. |

## Edit order and review gates

1. Save this plan and pre-edit inventory/lint evidence.
2. Preserve the May center, then update entry pages and shell. Review their diff before touching longer material.
3. Implement canonical center, definitions, constraint page, diagrams, HAPI and AGS additions.
4. Add convergence and interpretive separation; update hub generator, exports, links and dated historical notices. Long papers remain unchanged below their notices.
5. Run available build, editorial lint, generated-corpus verification, JavaScript syntax checks and static verification. Check anchors, redirects, sitemap coverage, archive preservation, generator consistency, and browser rendering/navigation.
6. Report exact changed files, any pre-existing failures and missing external evidence. No deployment is part of this implementation.
