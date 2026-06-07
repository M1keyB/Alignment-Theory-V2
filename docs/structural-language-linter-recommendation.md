# Structural Language Linter Recommendation

Date: 2026-06-07

Inspected files:

- `scripts/editorial-lint-config.mjs`
- `scripts/lint-editorial.mjs`
- `docs/editorial/AI_LANGUAGE_BLACKLIST.txt`
- `docs/editorial/AI_LANGUAGE_LINTER_LIST.csv`
- `AGENTS.md`

Batch 1 update: review-only reporting has now been added for the selected structural phrases. `Structural` itself remains allowed.

## Recommendation

Do not make `structural` a hard-ban word. It is part of legitimate theory, route titles, technical descriptions, archive language, and compatibility references.

Use structural only when it names a concrete arrangement or relationship. Prefer the exact mechanism where possible.

Review-only reporting now covers these selected phrases:

- `structural problem`
- `structural pattern`
- `structural pressure`
- `structural failure`
- `structural change`
- `structural insight`
- `structural logic`
- `structural boundary`
- `structural layer`

## Suggested Linter Behavior

- Severity: review-only.
- Build behavior: do not fail builds automatically.
- Scope: start with strict public/current surfaces; report archive findings separately.
- Ignore: quotations, page titles, identifiers, URLs, slugs, route inventories, code, JSON keys, and compatibility references.
- Output: include nearby sentence and ask the reviewer to name the exact mechanism, boundary, layer, rule, or failure.

## Rationale

The audit found both precise uses and vague uses. A hard ban would create false positives in technical architecture language, historical titles, and route compatibility references. A review-only rule would catch the weak prose pattern without forcing global rewrites.
