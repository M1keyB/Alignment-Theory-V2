# Generated Corpus Editorial Source Edit Plan

Date: 2026-06-07

Status: Phase 9 audit-only. No editorial edits were implemented.

## Rule For Later Implementation

Do not edit generated corpus body copy directly as the durable source. Direct rendered-HTML edits survive the current normal generator mode, but they will be overwritten by `--render-from-source`. Durable edits should be made in the embedded generator source data or templates, followed by route-specific diff review.

## Route Plans

### `pages/ai-alignment-research.html`

- body source location: `renderHub()` plus source objects used by hub cards
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes, after source/template edits
- normal generator mode preserves the edit: only if the rendered HTML is already updated; source edits require a controlled render path or manual sync
- `--render-from-source` would overwrite the edit: yes, unless the edit is made in `renderHub()`
- route-specific diff review required: yes
- human approval required before implementation: yes

### `pages/how-to-cite.html`

- body source location: `renderCite()`, citation helpers, `papers`, `pcpiPaper`, `howToCiteItem`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only if rendered HTML is updated
- `--render-from-source` would overwrite the edit: yes, unless the edit is made in citation source/template
- route-specific diff review required: yes
- human approval required before implementation: yes, especially for citation formats

### `pages/ai-alignment-executive-summary.html`

- body source location: `papers` entry with slug `ai-alignment-executive-summary`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if the source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes

### `pages/ai-alignment-three-layer-blueprint.html`

- body source location: `papers` entry with slug `ai-alignment-three-layer-blueprint`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after technical review

### `pages/ai-alignment-literature-review.html`

- body source location: `papers` entry with slug `ai-alignment-literature-review`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after citation review

### `pages/ai-alignment-competitive-positioning.html`

- body source location: `papers` entry with slug `ai-alignment-competitive-positioning`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after comparative-claim review

### `pages/ai-alignment-who-this-is-for.html`

- body source location: `papers` entry with slug `ai-alignment-who-this-is-for`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes

### `pages/ai-alignment-methodology.html`

- body source location: `papers` entry with slug `ai-alignment-methodology`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after evidence and privacy review

### `pages/ai-alignment-glossary.html`

- body source location: `papers` entry with slug `ai-alignment-glossary` and `glossaryEntries`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object or glossary entry is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after terminology review

### `pages/ai-alignment-lineage.html`

- body source location: `papers` entry with slug `ai-alignment-lineage`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after historical-status review

### `pages/ai-alignment-limitations.html`

- body source location: `papers` entry with slug `ai-alignment-limitations`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after technical review

### `pages/ai-alignment-casebook.html`

- body source location: `papers` entry with slug `ai-alignment-casebook`
- exact file to edit later: `scripts/generate-ai-research-pages.mjs`
- generator regeneration required: yes
- normal generator mode preserves the edit: only after rendered HTML is updated
- `--render-from-source` would overwrite the edit: no if source object is edited first; yes if only rendered HTML is edited
- route-specific diff review required: yes
- human approval required before implementation: yes, after casebook review

## Batch 4A Candidate Source Locations

Best first source edits:

- `papers` entry `ai-alignment-literature-review`, section `RLHF and Human Preference`
- `renderHub()` orientation copy in `ai-alignment-research.html`
- `papers` entry `ai-alignment-executive-summary`, sections `abstract` and `What Alignment Theory Adds`

These have clear source locations, low technical risk if phrased conservatively, and high reader visibility.
