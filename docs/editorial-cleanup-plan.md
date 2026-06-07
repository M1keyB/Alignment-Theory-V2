# AlignmentTheory.org Editorial Cleanup Plan

Audit date: 2026-06-06

Status: plan only. Do not begin implementation until the author approves the plan.

## Guardrails

- Preserve the quiet archive / research aesthetic.
- Do not redesign the site as a marketing page.
- Do not delete pages, downloads, PDFs, or older formulations during the first cleanup pass.
- Do not rewrite long papers, essays, generated research corpus pages, quotations, citations, code, filenames, URLs, or archival documents without separate review.
- Treat `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv` as a review aid, not as an automatic replacement list.
- Preserve protected theory vocabulary when it names a real concept.

## Phase 0: Approval And Setup

Goal: confirm scope before public changes.

Actions:

- Review `docs/site-audit.md`.
- Decide canonical routes for Start Here, About, Contact, Papers, AI Alignment, PCPI, and Agent Action Gate.
- Decide whether "Essays" should become "Notes" in the primary navigation.
- Confirm whether `projects/agent-action-gate.html` should continue to feature release `v0.3.0`.
- Confirm whether PCPI should be standardized as "Participatory Capacity Preservation Index" across the site.

Deliverable:

- Approved route map and nav labels.

## Phase 1: Shared Shell And Public Entry Pages Only

Goal: make the main reading path coherent without rewriting the archive.

Allowed files:

- Shared shell source, generator, or repeated header/footer markup if no shared shell exists yet.
- `assets/styles.css` only for shell-level support, not a redesign.
- `index.html`
- `start-here.html`
- `pages/where-to-start.html`
- `pages/revised-framework-center.html`
- `pages/stress-tests.html`
- `pages/papers.html`
- `papers.html`
- `pages/ai-alignment-research.html`
- `pages/participatory-capacity-preservation-index.html`
- `projects/agent-action-gate.html`
- `about.html`
- `contact.html`

Do not edit in phase 1:

- `pages/essay-*.html`
- `content/essays/*.md`
- `content/manuscript.md`
- `pages/manuscript.html`
- Long framework papers
- Stress-test paper bodies beyond entry-card metadata if needed
- Generated AI research paper bodies unless the generator is updated intentionally
- PDFs and downloadable datasets

Implementation actions:

- Replace the duplicated global nav with one coherent primary nav:
  - Start Here
  - Theory
  - Research
  - Notes
  - AI Governance
  - Archive
  - About
  - Subscribe, only if approved
- Keep older root routes live.
- Make the root homepage point clearly to the approved reader path.
- Make Start Here point to the revised framework center, stress tests, AI research corpus, PCPI, essay/notes index, and archive.
- Make Revised Framework Center the conceptual hub.
- Make Stress Tests a first-class research section.
- Make AI Governance point to AI Research, PCPI, AAG, and any approved future governance pages.
- Add archive labels only to entry-level archive surfaces, not to every old page yet.
- Run the editorial linter only on phase 1 files and report remaining hard-ban matches.

Acceptance criteria:

- The shared header and footer no longer conflict.
- New readers can reach Where to Start, Revised Framework Center, Stress Tests, AI Research, PCPI, and AAG from the first viewport or primary nav path.
- No long-form archival, essay, or paper copy has been rewritten.
- Local link validation passes.

## Phase 2: Route Canonicalization Without Deletion

Goal: reduce duplicate-page confusion while preserving URLs.

Actions:

- Choose canonical pages for About, Contact, Papers, and Cite.
- Add clear internal links from duplicate pages to their canonical counterparts.
- Use canonical metadata consistently.
- If redirects are desired, add them only after confirming the hosting strategy.
- Label noncanonical duplicates as archive, short entry, or legacy page.

Acceptance criteria:

- Duplicate routes remain live.
- Readers can tell which page is the current destination.
- Search metadata no longer implies multiple equal canonicals for the same content.

## Phase 3: Entry-Page Prose Cleanup

Goal: clean high-visibility copy before touching long works.

Allowed pages:

- Homepage
- Start Here / Where to Start
- Revised Framework Center
- Papers entry
- Stress Tests hub
- AI Research hub introduction
- PCPI entry framing
- AAG project summary
- About
- Contact

Actions:

- Apply `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`.
- Remove hard-ban terms from newly revised public prose unless quoted, cited, technical, or intentionally preserved.
- Reduce repeated review terms only where they are decorative or vague.
- Preserve defined terms such as Alignment Theory, internal alignment, external alignment, participatory capacity, load-bearing function, support relation, AI governance, AAG, PGDL, Runtime Binding, Receipts, Governance Memory, and substrate.
- Keep uncertainty visible where claims are developing.

Acceptance criteria:

- Remaining hard-ban matches are listed with file paths and line numbers.
- Protected-term frequency is reported separately.
- No claims are inflated.

## Phase 4: Research And Generated Pages

Goal: update AI research surfaces without hand-editing generated pages into drift.

Actions:

- Inspect `scripts/generate-ai-research-pages.mjs`.
- Decide whether generated pages should be edited through the generator only.
- Standardize AI research corpus status labels and version naming.
- Confirm PCPI name and acronym across AI Terms, AI Research, PCPI, and downloads.
- Confirm AAG, PGDL, Runtime Binding, Receipts, Governance Memory, AGS, and HAPI placement.

Acceptance criteria:

- Generated files can be regenerated without losing approved copy.
- AI research pages present one consistent corpus status.
- Applied governance projects are clearly separated from theory pages and archive pages.

## Phase 5: Archive Labeling

Goal: preserve older formulations while reducing reader confusion.

Actions:

- Create an Archive landing page or improve `pages/library.html`.
- Label earlier formulation pages at the top with a short archival notice.
- Keep archival prose intact unless separately reviewed.
- Link archive pages back to current equivalents where available.

Acceptance criteria:

- Older work remains discoverable.
- Archive pages no longer compete with current entry points.

## Phase 6: Essays / Notes Review

Goal: decide whether the essay layer becomes Notes, remains Essays, or splits.

Actions:

- Review `pages/essays.html` and `content/essays/*.md`.
- Decide whether essays are dated notes, formal essays, theological reflections, or archive items.
- Apply editorial cleanup one essay at a time only after author review.
- Keep source Markdown and generated HTML in sync.

Acceptance criteria:

- The Notes/Essays layer has a clear editorial purpose.
- No essay is silently rewritten.

## Phase 7: Long Papers And PDFs

Goal: avoid accidental theory changes.

Actions:

- Review each long paper independently.
- Treat PDF content as frozen unless a new edition is explicitly approved.
- Update landing-page summaries before updating paper bodies.
- Keep citation metadata and download links intact.

Acceptance criteria:

- Paper updates are versioned intentionally.
- Existing citations and downloads remain valid.

## Validation For Each Implementation Phase

Run:

- `npm run build`
- `node scripts/verify-static-site.mjs`
- A scoped editorial linter scan for edited public files
- Internal link audit after any route/nav change

Report:

- Changed files
- Validation results
- Remaining hard-ban matches with file paths and line numbers
- Any protected terms with unusually high frequency
- Any content that needs author judgment before revision
