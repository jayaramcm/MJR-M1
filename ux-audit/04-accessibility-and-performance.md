# 04 · Accessibility and performance

These findings use the `vercel-labs/web-design-guidelines` rule set (fetched 11 Nov 2026) plus the `baseline-ui` checks, in terse `file:line` format.

## Measured (headless Chrome, 11 Nov 2026)

| Metric | Desktop 1440×900 | Phone 390×844 |
|---|---|---|
| **Data transferred after load** | **≈ 62.9 MB** | **≈ 52.5 MB** |
| Page height | 9,910 px (≈ 11 screens) | 14,691 px (≈ 17 screens) |
| Interactive elements | 217 | 217 |
| Interactive elements smaller than 44×44 px | 127 | 124 (104 are map pins) |
| Horizontal overflow | none | none |

**Largest downloads:** `mjr-location-1.mp4` 10.3 MB (desktop autoplay) · `MJR_8_Water Tank_HD.jpg` 7.5 MB · `entrance-mjr.jpg` 6.0 MB · `ev-charging.jpg` 5.7 MB · `three-parks.png` 3.9 MB · `Pergolas-and-sit-outs.png` 3.6 MB · `layout MJR.png` 3.3 MB · `children-play-area.png` 3.2 MB · `Swimming-pool.png` 3.0 MB · `open-space.png` 3.0 MB · `outdoor-fitness-area.png` 2.9 MB · `senior-citizen-park.png` 2.8 MB · `Lush Grassland Garden Clusters.png` 2.6 MB · `hero-compressed.mp4` 1.9 MB.

**Target:** under 3 MB on first load for a phone. Every image above can be **150–400 KB as WebP** at its real display size (none is shown wider than about 1300px).

**Repo hygiene:** 53 files in [Assets/](../Assets/) aren't referenced by the site, including about 120 MB of unused `*-scrub.mp4`, `hero-day-and-night.mp4` and `hero-mjr-2.mp4`. Move them out of the deployed folder.

---

## index.html

index.html:12-17 - add `<meta name="theme-color">`, Open Graph/Twitter tags and `RealEstateListing` + `FAQPage` JSON-LD
index.html:22 - no skip link to `#mainContent`
index.html:64 - menu toggle missing `aria-expanded` / `aria-controls`
index.html:78 - closed drawer still focusable (transform only); add `inert`/`visibility:hidden`
index.html:81 - `&times;` close OK; drawer not closable with Esc
index.html:101-109 - FAB label says "WhatsApp or Call", opens WhatsApp only; generic icon
index.html:118 - hero `<video>` autoplays; add `fetchpriority="high"` on the poster
index.html:128-140 - toggle buttons need `aria-pressed` and changing labels; SVGs missing `aria-hidden`
index.html:146 - ALL CAPS kicker in markup; use CSS `text-transform` if needed (screen readers may spell caps out)
index.html:283 - large image without `width`/`height` (layout shift); 6 MB file
index.html:348, 564, 830, 854, 892, 980, 1098, 1107, 1124 - headings typed in ALL CAPS in the source
index.html:368, 386, 402, 418 - `<article>` used as a button; not focusable; no keyboard handler
index.html:371, 389, 405, 421 - decorative SVGs missing `aria-hidden="true"`
index.html:440 - autoplaying looping video with no pause control (WCAG 2.2.2); poster is the hero image
index.html:479-492 - filter chips need `aria-pressed`
index.html:503 - inline style; availability text overwritten by JS
index.html:532 - "Click…" copy for touch users
index.html:584 - `role="tablist"` wraps accordion triggers (invalid ARIA nesting)
index.html:610-785 - each amenity image is in the DOM 3 times
index.html:796, 811, 818 - several overlapping `aria-live` regions
index.html:820 - `h4` directly after `h2` (skipped level)
index.html:1130, 1135 - inputs missing `name` and `autocomplete` (`name`, `tel`)
index.html:1135 - placeholder is the company phone number; use "10-digit mobile number…"
index.html:1139 - `<label>` not linked to a control; use `<fieldset><legend>`
index.html:1141-1147 - interest chips need `aria-pressed`
index.html:1164 - success message should be revealed into an `aria-live` region, not toggled with `display`
index.html:1190, 1200, 1215, 1228, 1231 - footer `h4` with no `h3` above; inline style at line 1231
index.html:1266, 1290, 1311 - modal markup has no focus management; use `<dialog>`
index.html:1273-1282, 1298-1303, 1320-1325 - modal labels lack `for`; inputs lack `id`, `name` and `autocomplete`

## css/styles.css

css/styles.css:69 - `scroll-behavior: smooth` not wrapped in `prefers-reduced-motion: no-preference`
css/styles.css:109 - ✓ global `:focus-visible` style exists
css/styles.css:535-545 - drawer hidden only with `transform`
css/styles.css:696-701 - reduced motion hides hero video and controls; location video not covered
css/styles.css:852, 1069, 1306, 1316, 1753, 1805, 1874, 1892, 2352 - text at 0.70–0.74rem (11–12px); too small for the older audience; minimum 0.875rem
css/styles.css:1627-1635 - map pins 22×22 px, 10.5px text; below the 44px touch target
css/styles.css:1640 - transitions `width`, `height` and `font-size` (layout properties); animate `transform` only
css/styles.css:1643 - `will-change: transform` permanently on 104 pins
css/styles.css:1653-1657 - Sold uses the brand gold, the same as the CTA and selection colours
css/styles.css:2909-2912 - field focus only changes the border colour; add a visible ring
css/styles.css:(15 rules) - `backdrop-filter` on large surfaces; costly on low-end Android
css/styles.css - z-index values from 1 to 2000 with no scale; define `--z-header / --z-overlay / --z-modal`
css/styles.css - no `touch-action: manipulation` or `overscroll-behavior: contain` on the drawer and modals
css/styles.css - gold `#C9962E` used as text on white (eyebrows) gives **2.7:1 contrast and fails WCAG AA**; see [07](07-color-system.md)

## js/main.js

js/main.js:6 - availability date hard-coded ("October 2026"), now out of date
js/main.js:96 - hard-coded 82px header offset; use CSS `scroll-margin-top`
js/main.js:104-116 - scrollspy reads `offsetTop` on every scroll event; use IntersectionObserver
js/main.js:147-161 - icon swap through `innerHTML`; labels never update
js/main.js:335 - unthrottled `resize` → `applyView` loops over 104 pins
js/main.js:481 - inspector rebuilt with `innerHTML`; loses focus and re-announces the whole panel
js/main.js:577, 616 - inline `onclick` with interpolated strings; use event delegation
js/main.js:692-698 - preloads all 10 full-size amenity images (≈ 30 MB) on load
js/main.js:865 - click handler on a non-interactive element
js/main.js:939-948 - modal opens without moving focus; no trap; no focus return
js/main.js:978-994 - **forms never submit data**; `alert()` used for success
js/main.js:1030-1039 - sticky bar hides while the plot inspector is visible (the moment the buyer most wants to call)

## js/plots-data.js

js/plots-data.js:9-10 - sizes, facing and availability are placeholder values but are shown as facts
js/plots-data.js:16 - hard-coded SOLD set; must come from the sales schedule

---

## Quick performance fixes (about 1 day of work)

1. Convert all images to WebP at 1600px and 800px using `<img srcset>`, with `width`/`height` set. Expect about 55 MB → under 4 MB.
2. Remove the amenity preload loop. Lazy-load the stage image.
3. Location video: `preload="none"`, no autoplay, plays on tap, one MB-sized clip. Or a static map instead.
4. Hero: keep `hero-compressed.mp4` (1.9 MB) but serve a 720p version under 1 MB to phones (`<source media>`), or a still image on `prefers-reduced-data` / Save-Data.
5. `layout MJR.png` (3.3 MB) → WebP or SVG. The grass background PNG (2.6 MB) → a flat colour (see [07](07-color-system.md)).
6. Server: add `Cache-Control: max-age` for `/Assets/*` ([server.js](../server.js) sends `no-cache` for everything), and gzip for HTML/CSS/JS.
