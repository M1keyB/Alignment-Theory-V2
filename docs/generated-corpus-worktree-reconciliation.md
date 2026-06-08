# Generated Corpus Worktree Reconciliation

Date: 2026-06-08

## Scope

This checkpoint reconciled the generated AI corpus pages before the Open Sans typography pass.

No typography edits were made. No AI corpus regeneration was run. No Git line-ending policy or config was changed.

## Initial Git State

Branch:

```text
alignment-theory-phase2-foundation
```

Latest map repair commit:

```text
a671926 fix: publish current framework map
```

`git status --short` initially reported eleven modified generated pages:

```text
pages/ai-alignment-casebook.html
pages/ai-alignment-competitive-positioning.html
pages/ai-alignment-executive-summary.html
pages/ai-alignment-glossary.html
pages/ai-alignment-limitations.html
pages/ai-alignment-lineage.html
pages/ai-alignment-literature-review.html
pages/ai-alignment-methodology.html
pages/ai-alignment-three-layer-blueprint.html
pages/ai-alignment-who-this-is-for.html
pages/how-to-cite.html
```

## Diff Findings

The following commands produced no content, raw, numeric, summary, or name-only diff output:

```text
git diff --stat
git diff --name-only
git diff --raw
git diff --numstat
git diff --summary
git diff --ignore-space-at-eol --stat
git diff --ignore-space-at-eol --name-only
git diff --exit-code -- [eleven generated pages]
git diff --ignore-space-at-eol --exit-code -- [eleven generated pages]
```

Git did print warnings that LF would be replaced by CRLF the next time Git touched those files.

Conclusion: no meaningful content differences were found. No file-mode differences were found. The dirty state was consistent with line-ending/index-cache metadata.

## EOL Metadata

`git ls-files --eol` reported the same pattern for all eleven files:

```text
i/lf    w/mixed attr/
```

`git config --show-origin --get core.autocrlf` reported:

```text
file:C:/Program Files/Git/etc/gitconfig true
```

`git config --show-origin --get core.eol` returned no configured value.

`git check-attr -a -- pages/ai-alignment-casebook.html` returned no file-specific attributes.

## Index Refresh

`git update-index --refresh` did not clear the dirty state on the first attempt. It reported that the eleven generated pages needed update.

## Targeted Restore

After both diff exit-code checks confirmed no meaningful content differences, the eleven reported files were restored with:

```text
git restore --worktree -- [eleven generated pages]
```

Then:

```text
git update-index --refresh
git status --short
```

reported a clean tracked worktree before this documentation note was added.

## Map Repair Preservation

`git show --stat --oneline a671926` confirmed the map repair remains committed.

`git show --name-only --oneline a671926` confirmed the committed repair includes:

```text
assets/images/alignment-theory-current-framework-map.png
pages/map.html
assets/styles.css
assets/app.js
scripts/apply-shared-shell.mjs
scripts/generate-ai-research-pages.mjs
index.html
start-here.html
pages/ai-alignment-research.html
pages/framework.html
pages/where-to-start.html
docs/current-framework-map-page-implementation.md
docs/current-framework-map-page-repair-audit.md
docs/current-framework-map-plan.md
docs/current-framework-map-visual-review-checklist.md
```

`pages/map.html` was not unintentionally modified during this reconciliation.

## Final State

The generated corpus dirty status was cleared. The only expected remaining worktree entry after this note is the untracked reconciliation file:

```text
docs/generated-corpus-worktree-reconciliation.md
```

The Open Sans typography pass can proceed after this checkpoint, subject to the next task's clean-worktree requirements and the user's decision about whether to keep or discard this untracked note.
