# Complete Map Display Repair Audit

Audit date: 2026-06-07

## Asset

- Map asset path: `assets/images/alignment-theory-complete-map.png`
- Asset exists: yes
- Image dimensions: 1448 x 1086 pixels
- File type: PNG
- File size: 1,610,016 bytes

## Current Embed

- Current HTML embed: `pages/map.html` wraps the image in an anchor linking to `../assets/images/alignment-theory-complete-map.png`.
- Current image class: `complete-map-image`
- Current figure class: `complete-map-figure`
- Current alt text: `Alignment Theory Complete Map: 12-step framework from Creator Alignment through Separation, Dead Obedience, Pseudo-Freedom, Babel Risk, AI Inheritance, and Realignment. Maps theological, structural, and AI parallels.`
- Width and height behavior: no explicit intrinsic `width` or `height` attributes on the image; CSS sets `width: 100%` and `height: auto`.
- Responsive behavior: page container uses `max-width: min(1520px, calc(100vw - 2rem))`; image scales down to fit width.
- Whether the image is linked: yes.
- Whether the link opens the direct image: yes, through `target="_blank"` and `rel="noopener"`.

## CSS Findings

Relevant CSS in `assets/styles.css`:

- `.map-page` widens the page to fit the map.
- `.complete-map-figure a` displays as a block.
- `.complete-map-image` displays as a block, uses full available width, and keeps automatic height.

No CSS rule was found that should collapse the image. The main display issue is the reading surface: the page does not provide visible text that tells users to open the image directly for full-resolution reading, and the image lacks intrinsic dimensions.

## Concerns

- Mobile readability: the full diagram will be too dense on small screens when scaled to viewport width.
- Accessibility: alt text should describe the earlier map without naming it as the current complete framework.
- Reading path: page copy currently says the diagram is the single-page summary of the entire framework.
- Direct image access: the image itself links to the PNG, but the direct-image link has no visible text.

## Exact Repair Required

- Keep `pages/map.html` and the existing PNG asset in place.
- Change page title and page-facing heading to `Earlier Alignment Theory Map`.
- Add a status note pointing new readers to `/start-here.html` and `/pages/revised-framework-center.html`.
- Replace claims that the diagram is the current complete framework.
- Add intrinsic `width="1448"` and `height="1086"` to the image.
- Replace the alt text with historical-artifact wording.
- Keep the image wrapped in a direct link to the PNG.
- Add visible direct-image link text near the figure.
- Add mobile-facing instruction to open the full-resolution image when needed.
