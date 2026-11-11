# MJR Township redesign: tracker

**Branch:** `v2` (local only, nothing committed or pushed) · **Design system:** [DESIGN.md](../DESIGN.md) · **Section spec:** [SECTION-MAP.md](SECTION-MAP.md) · **Images:** [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md) · **Earlier audit:** [ux-audit/](../ux-audit/README.md)

**What changed on 11 Nov 2026:** the site is being rebuilt on the look and motion of the Volta SKAI homepage (https://voltaskai.endover.ee/en/), section by section, with MJR's own content and images. The earlier "Daylight Sage" v2 (white, sage, gold) is retired; its lead capture, master plan, data and accessibility work are kept.

- **Stage 1:** replicate every reference section as closely as possible with MJR content (this tracker).
- **Stage 2:** the user reviews each section (S00–S17) and asks for changes; tracked in the sign-off table in [SECTION-MAP.md](SECTION-MAP.md#stage-2-sign-off).

Status key: ✅ done · 🟡 partly done · ⏳ not started · 🔒 waiting on MJR data or a decision

---

## Stage 1 phases

| Phase | What | Status |
|---|---|---|
| 0 | Capture the reference: section screenshots at 1440 / 768 / 390, fonts, colours, type scale, breakpoints | ✅ |
| 1 | Documentation: DESIGN.md, SECTION-MAP.md, this tracker, IMAGE-PROMPTS.md slot map | ✅ |
| 2 | Foundation: tokens, viewport rem scale, fonts, type classes, buttons, header, menu, scroll helper, Lenis | ✅ |
| 3 | Sections S00–S17 built, each checked against its reference screenshot | ✅ |
| 4 | QA: side-by-side screenshots, forms, keyboard, reduced motion, page weight | 🟡 |
| 5 | New images from Antigravity wired into their slots | 🟡 15 of 16 in (IMG-16 not delivered) |
| 6 | Real data from MJR | 🔒 |
| 7 | Growth: Telugu, structured data, analytics | ⏳ |
| 8 | Launch | ⏳ |

## Phase 0 · Reference capture ✅

- [x] Headless Chrome capture of 13 reference sections at three widths (76 screenshots, kept in the session scratchpad, not in the repo).
- [x] Fonts: TT Ramillas (display, 300/400) and Specter (UI, 450/500), both paid. Free stand-ins chosen by side-by-side render: **Newsreader** and **Figtree**.
- [x] Palette (by frequency in the reference CSS) and roles; contrast measured. The reference label grey fails contrast on sand, so small labels get a darker `--label` shade.
- [x] Root scale: `html{font-size}` 4.2667vw / 2vw / 1.25vw / 16px at 768 / 1201 / 1728.
- [x] Libraries used by the reference: Bootstrap, Lenis, Embla, Fancybox, Three.js, Alpine, Livewire, Cookiebot. We keep only Lenis.
- [x] Elements found beyond the section list: a site-wide "Open House" popup (S16) and a developer corner badge (S17).

## Phase 1 · Documentation ✅

- [x] [DESIGN.md](../DESIGN.md) rewritten for the new system.
- [x] [SECTION-MAP.md](SECTION-MAP.md): S00–S17, reference component → MJR content, with a stage-2 sign-off table.
- [x] [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md): slot map, warmer style rules, hero re-sized to full screen (16:9 / 9:16), new IMG-16 (S12 background), portraits added to "do not generate".
- [x] This tracker.

## Phase 2 · Foundation ✅

- [x] `:root` tokens and the viewport rem scale in [css/styles.css](../css/styles.css).
- [x] Newsreader + Figtree from Google Fonts (self-hosting is a Phase 4 item).
- [x] Type classes `.h-xl … .h-xs`, `.label`, `.label-l`, gradient headings `.grad-1/.grad-2`.
- [x] Buttons: `.btn`, `.btn-light`, `.pill`, `.read-more`.
- [x] Header (S00) with theme switching; full-screen menu (S01) as a `<dialog>`.
- [x] Scroll helper (`--p` on `[data-progress]`) and Lenis (`js/vendor/`, pinned), both off under reduced motion.

## Phase 3 · Sections ✅

All of S00–S17 are built; status per section is in the sign-off table in [SECTION-MAP.md](SECTION-MAP.md#stage-2-sign-off).

- [x] Server: `Updates` added to the interest allowlist; an optional one-line `message` (max 500 characters) is now stored. Tests: `npm test` → 4 passing.
- [x] Images converted for the new slots into `Assets/web/` (`s03-*`, `loc-1…4`, `loc-temple`, `infra-*`, `visit-pavilion`, `cutout-gazebo`, `approvals-wide`, `gallery-grass`, `faq-water`, `internal-road`, `documents-desk`, `hero-aerial-portrait`). No files deleted.
- [x] Lenis 1.1.13 vendored at `js/vendor/lenis.min.js`.

## Phase 4 · QA 🟡

- [x] Reference vs local screenshots per section at 1440 and 390 (headless Chrome). 768 not yet compared.
- [x] `npm test` passes. In the browser: the modal posts a lead and shows the thank-you; a bad number is rejected with a message. (Footer and updates forms use the same handler; not each submitted separately.)
- [x] Menu opens, its links close it and scroll to the section; plot select → inspector → shortlist heart → header count and menu list; plan CTA opens the plot enquiry; lightbox next/prev; one FAQ open at a time with its image; no console errors; no sideways scroll at 390.
- [ ] Keyboard-only pass and reduced-motion pass by hand.
- [x] Page weight: first load 2.9 MB desktop, 1.9 MB phone with the hero video (target < 3 MB). Whole page on a phone after scrolling: 4.4 MB. (Before the video: 1.0 MB / 0.9 MB.)
- [x] Hero video: plays at 1440 and 390, the line changes, the pause button stops both, it pauses off screen, and reduced motion shows the poster with a still line. Text fits at 320, 390, 768, 1024 and 1440.
- [ ] Self-host and subset the two fonts.
- [ ] gzip/brotli for HTML, CSS and JS (or let the host do it).
- [ ] Remove about 300 MB of unused files from the deploy (old videos, HD JPGs, SVG cards). Needs the user's OK, since it deletes files.

## Phase 5 · Images ⏳

Slot-by-slot list: [IMAGE-PROMPTS.md § 0](IMAGE-PROMPTS.md#0-slot-map-which-image-goes-where).

| ID | Image | Slot | Priority | Generated | Wired in |
|---|---|---|---|---|---|
| IMG-01 | Hero aerial (delivered at 3:2, cropped to fill; 900 / 1600 / 2400 px copies) | S02, S06, S12, menu | P1 | ✅ | ✅ |
| IMG-02 | Hero portrait (delivered at 4:5) | S02 phones | P1 | ✅ | ✅ |
| IMG-03 | Internal road | S02 promo, S03 card 2, S12 | P2 | ✅ | ✅ |
| IMG-04 | Share image | og:image (`og-share.jpg`, 166 KB), S16 popup | P2 | ✅ | ✅ |
| IMG-05–14 | Amenity regrade (10) | S03 card 3, S08, S10, S11, menu | P2 | ✅ 10 of 10 | ✅ |
| IMG-15 | Documents desk | S10 expanding image | P3 | ✅ | ✅ |
| IMG-16 | Dark earth texture | S12 | P2 | ⏳ not delivered | S12 uses the CSS dark gradient until then |
| J1–J5 | Project journey chapters ([brief](IMAGE-PROMPTS-S05-S06.md)) | S05 | P1 | ✅ | ✅ |
| L1–L5 | Location photos ([brief](IMAGE-PROMPTS-S05-S06.md)) | S06 | P1 | ✅ (delivered at 9:8, cropped to 16:9 and 4:5) | ✅ |
| V1 | Site visit welcome ([brief](IMAGE-PROMPTS-S09-S12-S13.md)) | S09 | P2 | ✅ | ✅ |
| C1 | Contact band background | S13 | P2 | ✅ | ✅ |
| N1 | Navy topographic texture | S12 | P3 | ✅ | ✅ (under a lighter glow) |
| I1–I3 | Infrastructure: power, security, drainage ([brief](IMAGE-PROMPTS-S08.md)) | S08 | P2 | ✅ | ✅ (I2 also replaces the old flag-lettered gate render in S03 card 1, the S04 flip card, the FAQ and the menu) |

## Phase 6 · Real data from MJR 🔒

| Needed | Goes to | Today |
|---|---|---|
| **Plot schedule** (size, facing, status for all 104) | [js/plots-data.js](../js/plots-data.js) → S07 | Indicative values. **Traced sizes come out at 169–1,197 sq. yd., which contradicts the advertised 120–550**, so the "Up to 150" filter finds nothing. |
| Price per sq. yd. (or range) that can be shown | S02 promo, S07 info box, S12 FAQ | "Get the price list on WhatsApp" |
| MD's quote, name, title and portrait | S04 | Placeholder line from About |
| Sales manager names, roles, emails, portraits | S01, S09, S13 | Sales line only |
| Project milestone dates | S05 | "To be confirmed" |
| DTCP / HMDA layout number | S10, S12 FAQ | Not shown |
| Power: underground or overhead | S08 | Not stated |
| Banks that lend on these plots | S12 FAQ | Not shown |
| Drive times: Kalwakurthy town, Jadcherla, airport, ORR, Financial District | S06 | Place names only |
| Exact map pin (lat/long) | `loadMap` in [js/main.js](../js/main.js) | Searches by name (`shortcut:`) |
| Confirm "since 2012 · 9 projects · 1,200+ families" | S12 cards | Shown as before |
| Other projects: photos and links | S13 carousel | Names and towns only |
| Office hours | S01 contact card | Not shown |
| Booking amount, payment schedule, registration costs | S12 FAQ | Not shown |
| Brochure PDF | A "Get the brochure" action | None |
| Where leads go in production (Sheet, CRM, email) | [server.js](../server.js) `appendFile` (`shortcut:`) | `.leads/leads.jsonl` |

## Phase 7 · Growth ⏳

- [ ] Telugu: EN | తె switch in S01 (Noto Serif Telugu + Noto Sans Telugu).
- [ ] `RealEstateListing` + `FAQPage` JSON-LD.
- [ ] Analytics events: WhatsApp, call, form submit, plot selected, shortlist.
- [ ] Filter state in the URL (`?road=40`).

## Phase 8 · Launch ⏳

- [ ] Real-device pass: Android Chrome (low-end), iPhone Safari, desktop Chrome and Edge.
- [ ] Screen-reader pass (NVDA or TalkBack).
- [ ] Lighthouse: performance ≥ 90 mobile, accessibility ≥ 95.
- [ ] Every 🔒 item resolved or consciously deferred.

---

## Kept from the Daylight Sage v2

| Kept | Where |
|---|---|
| `POST /api/enquiry`: validation (name, Indian mobile), interest allowlist, 4 KB limit, dot-path refusal, JSONL store | [server.js](../server.js), 3 tests in [test/lead.test.js](../test/lead.test.js) |
| WhatsApp fallback when sending fails | [js/main.js](../js/main.js) |
| Master plan: SVG polygons over the plan image, filters, zoom, plot `<select>`, phone sideways scroll | [js/plots-data.js](../js/plots-data.js), [js/main.js](../js/main.js) |
| Native `<dialog>` menu and enquiry; skip link; focus ring; 44px targets; reduced motion | [index.html](../index.html), [css/styles.css](../css/styles.css) |
| WebP images in `Assets/web/`; map loads only on tap; no autoplay video | `Assets/web/`, `loadMap` |

## Decision log

| Decision | Why | Reversible? |
|---|---|---|
| Volta SKAI look adopted; Daylight Sage retired | User's direction (11 Nov 2026): replicate the reference section by section, MJR content | Yes: Daylight Sage is in git history |
| MJR images only, in the reference's slots | Reference photos are Endover's copyright | – |
| Newsreader + Figtree instead of TT Ramillas + Specter | The reference fonts are paid; these were the closest free match side by side | Swap the two `font-family` tokens if licences are bought |
| Homepage only | Reference sub-pages are out of scope for stage 1; "read more" links scroll within the page | Add sub-pages in stage 2 if wanted |
| Master plan takes the reference's 360° panorama slot (S07) | MJR has no 3D view; the plan is the most useful thing in that position | – |
| Phone action bar kept (S15) though the reference has none | MJR buyers act by phone and WhatsApp | Remove in stage 2 if the user prefers |
| Small labels use `--label` `#7C6058`, not the reference `#AE928A` | Reference grey is 2.45:1 on sand, below the 4.5:1 minimum | – |
| Viewport-scaled root font size copied from the reference | Needed to match its proportions at every width | Cap it in stage 2 if text zoom is a problem |
| Headings use the logo green `#36512B` on light surfaces (user, 11 Nov 2026) | Brand colour from the township logo | Swap `--green` in `:root` |
| Light gradient headings now fade green → sage `#7E9673` | Brand colour; also fixes the earlier 2:1 faded-word contrast (now above 4:1) | – |
| Phone page is now about 18,800 px (22 screens) | The reference phone page is about 20,000 px; the earlier Daylight Sage page was 9,166 px | Shorten in stage 2 by section |
| Hero video brought back (`hero-compressed.mp4`) with a changing line | User's request (11 Nov 2026): the still hero text read too faint | Swap the `<video>` back for the IMG-01 `<picture>` if weight matters more |
| Footer contact band removed; FAQ and footer merged into one navy ending (11 Nov 2026) | User's request | In git history; `contact-band.webp` (C1) is no longer used |
| Amenities gallery (S11) and its lightbox removed (11 Nov 2026) | User's request | In git history; amenity links now go to `#life` |
| Approvals section removed (11 Nov 2026) | User's request | The markup is in git history; RERA is still shown in the hero, journey, FAQ and footer |
| Only Lenis kept from the reference's libraries | Everything else is done with CSS, `<dialog>`, `<details>` and one scroll helper | – |

## How to run

```bash
npm start        # http://localhost:2000
npm test         # lead validation tests
```
