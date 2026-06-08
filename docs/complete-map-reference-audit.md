# Complete Map Reference Audit

Audit date: 2026-06-07

## Summary

`/pages/map.html` exists and is still linked from current public pages. The route is valid, but several visible references describe the earlier diagram as the current full framework map. The AI alignment research hub is generator-owned by `scripts/generate-ai-research-pages.mjs`.

## Matches

- `pages/map.html:6`
  - Visible wording: browser title, `The Complete Map | Alignment Theory`
  - Link destination: `https://alignmenttheory.org/pages/map.html`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: yes
  - Reason: presents the older diagram as current and complete.

- `pages/map.html:7`, `pages/map.html:16`, `pages/map.html:17`, `pages/map.html:21`, `pages/map.html:22`, `pages/map.html:30`
  - Visible wording: meta, Open Graph, Twitter, and JSON-LD references to `The Complete Map`
  - Link destination: `https://alignmenttheory.org/pages/map.html`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: yes
  - Reason: metadata overstates the artifact as the current complete map.

- `pages/map.html:56`
  - Visible wording: `The Complete Map`
  - Link destination: current page
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: yes
  - Reason: page-facing title needs to identify the diagram as earlier.

- `pages/map.html:75`
  - Visible wording: `This is the single-page summary of the entire framework. All other pages on this site interpret or measure pieces of this map.`
  - Link destination: none
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: yes
  - Reason: explicitly mislabels the earlier map as the current full framework.

- `pages/map.html:79-80`
  - Visible wording: linked map image with alt text naming `Alignment Theory Complete Map`
  - Link destination: `../assets/images/alignment-theory-complete-map.png`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: yes
  - Reason: image needs clearer historical alt text and visible full-resolution link text.

- `pages/map.html:85`, `pages/map.html:94`, `pages/map.html:97`
  - Visible wording: citation history names `Complete Map`
  - Link destination: `https://alignmenttheory.org/map`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/map.html`
  - Later edit needed: no
  - Reason: preserved citation history should remain intact unless author approves a citation revision.

- `pages/framework.html:73-89`
  - Visible wording: section labeled `Complete Map`; paragraph says it is the `single-page summary of the entire framework`
  - Link destination: `map.html`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/framework.html`
  - Later edit needed: yes
  - Reason: the framework page repeats the same current-framework overclaim.

- `pages/where-to-start.html:145`
  - Visible wording: `The Complete Map`; `If you read one thing, read this. It shows the entire framework on a single page and explains why every other section exists.`
  - Link destination: `map.html`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/where-to-start.html`
  - Later edit needed: yes
  - Reason: oversells the earlier map as the primary reading path.

- `scripts/generate-ai-research-pages.mjs:940-947`
  - Visible wording: `New here? Start with the Complete Map.`; `This one-page diagram shows how the entire framework connects... Most readers start here.`; `View the Complete Map`
  - Link destination: `map.html`
  - Public-facing: source for generated page
  - Generated: source generator
  - Persistent source location: `scripts/generate-ai-research-pages.mjs`
  - Later edit needed: yes
  - Reason: generator-owned AI hub copy oversells the earlier diagram.

- `pages/ai-alignment-research.html:80-87`
  - Visible wording: generated copy matching the AI hub source
  - Link destination: `map.html`
  - Public-facing: yes
  - Generated: yes
  - Persistent source location: `scripts/generate-ai-research-pages.mjs`
  - Later edit needed: yes, through regeneration
  - Reason: generated output should be updated from the generator source.

- `assets/app.js:1466`
  - Visible wording: search/index item `The Complete Map`; description `Single-page visual summary of Alignment Theory...`
  - Link destination: `map.html`
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `assets/app.js`
  - Later edit needed: yes
  - Reason: public search/index wording describes the earlier map as a current visual summary.

- `assets/app.js:448` and `scripts/generate-ai-research-pages.mjs:495`
  - Visible wording: provenance statement naming `The Complete Map and PCPI framework`
  - Link destination: license link nearby
  - Public-facing: yes
  - Generated: `scripts/generate-ai-research-pages.mjs` is generator source; `assets/app.js` is static runtime source
  - Persistent source location: same files
  - Later edit needed: no
  - Reason: provenance note does not direct readers to the map as current framework.

- `pages/license.html:76`
  - Visible wording: `The Complete Map, essays, papers, and framework documentation...`
  - Link destination: none
  - Public-facing: yes
  - Generated: no
  - Persistent source location: `pages/license.html`
  - Later edit needed: no
  - Reason: licensing reference is not a reading-path claim.

- `sitemap.xml:524`
  - Visible wording: URL entry for `/pages/map.html`
  - Link destination: `https://alignmenttheory.org/pages/map.html`
  - Public-facing: yes
  - Generated: likely generated by sitemap script
  - Persistent source location: `sitemap.xml`, with script support in `scripts/update-sitemap.mjs`
  - Later edit needed: no
  - Reason: route compatibility requires keeping `/pages/map.html`.
