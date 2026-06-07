# Preview Deployment Review Checklist

Status: prepared for preview review only. Do not treat this as production approval.

## Scope

Review these routes after a non-production preview is available:

- `/`
- `/start-here.html`
- `/about.html`
- `/papers.html`
- `/notes/`
- `/pages/ai-alignment-research.html`
- `/pages/human-agency-preservation-infrastructure.html`
- `/pages/alignment-governance-stack.html`
- `/projects/agent-action-gate.html`
- `/pages/participatory-capacity-preservation-index.html`

## Route Review Matrix

For each route, verify:

- Desktop layout renders without overlap, clipped text, or broken spacing.
- Mobile layout remains readable and keeps navigation usable.
- The page is black, white, and gray only, except for intentionally preserved asset colors.
- Shared navigation is present, consistent, and points to the intended current pages.
- Nested-route links resolve correctly from the page location.
- Typography is readable for long-form research text.
- Section spacing is generous but not inflated.
- Borders and dividers are restrained and consistent.
- Tables remain legible on desktop and mobile.
- Status notes are visible, dated when appropriate, and not overpromoted.
- Canonical URL is present and points to the intended public URL.
- Archive links are discoverable without competing with current entry pages.
- HAPI and AGS links point to the intended current pages or external destinations.
- PCPI status wording remains clearly research-status language, not a finished-product claim.

## Cross-Site Checks

- Footer appears consistent across current pages.
- Header appears consistent across current pages.
- No broken images or missing media placeholders appear.
- Subscribe anchor works from current entry pages.
- PDF links open or download correctly.
- Formula notation is readable and not squeezed on mobile.
- PCPI scoring-band tables are readable on mobile.
- Archive pages remain usable and visibly separate from the current reading path.
- No production-only analytics, embeds, or scripts fail in preview.
- Browser console has no route-level errors on the reviewed pages.

## Required Manual Decisions Before Production

- Confirm the actual hosting platform and production branch/source.
- Confirm whether pushing a non-main branch creates a preview or does nothing.
- Confirm whether branch protection or deployment approvals exist.
- Confirm whether the PCPI page belongs in the main Research path, AI Governance path, or both.
- Confirm whether HAPI and AGS are current public-facing terms or should be framed as project names.
