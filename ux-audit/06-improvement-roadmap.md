# 06 · Improvement roadmap

Priorities: **P0** = blocks launch or loses leads · **P1** = big effect on clarity or conversion · **P2** = polish.
Effort: **S** < ½ day · **M** 1–3 days · **L** > 3 days. *Needs data* = waiting on the MJR team.

## P0: fix before launch

| # | Item | Effort | Details |
|---|---|---|---|
| 1 | Connect all 4 forms to a real destination (Sheet / CRM / email) with success and error states | S | [03 §12-13](03-interactions.md#12-modals) |
| 2 | Validate a 10-digit Indian mobile; replace the company-number placeholder | S | [03 §13](03-interactions.md#13-enquiry-form) |
| 3 | Hide or label placeholder plot data (size, facing, status) as indicative | S | [02 §4](02-section-by-section.md#4-master-plan-plot-finder) |
| 4 | Load the real plot schedule into `plots.json`; one data source for the map and the list | M · *needs data* | [03 §9](03-interactions.md#9-plot-schedule) |
| 5 | Compress images to WebP with `srcset` and dimensions; remove the amenity preload; location video plays on tap only | M | [04](04-accessibility-and-performance.md#quick-performance-fixes-about-1-day-of-work) |
| 6 | "Download Brochure" must deliver a brochure (PDF or WhatsApp) | S · *needs PDF* | [03 §12](03-interactions.md#12-modals) |

## P1: clarity and conversion

| # | Item | Effort | Details |
|---|---|---|---|
| 7 | **Colour system: "Daylight Sage"** tokens, remove dark surfaces, gold for actions only | M | [07](07-color-system.md) |
| 8 | Hero rewrite: what, where, price from; daytime media; stats visible on phones | S · *needs price* | [08 §1](08-section-redesign.md#1-hero--stats) |
| 9 | Headlines → sentence case, factual; cut the slogan paragraphs | S | [05](05-content-and-copy.md) |
| 10 | Location → distance rows + static map + Google Maps link | S · *needs times* | [08 §3](08-section-redesign.md#3-location) |
| 11 | Approvals moved up; RERA verify link; DTCP; bank loans | S · *needs data* | [08 §4](08-section-redesign.md#4-approvals-moved-up-from-6th) |
| 12 | Phone sticky bar: Call · WhatsApp · Book, white bar, visible on the plot panel | S | [03 §14](03-interactions.md#14-mobile-sticky-bar) |
| 13 | Phone master plan: list-first, full-screen pinch map, 32px+ pins | M | [03 §7](03-interactions.md#7-master-plan-map) |
| 14 | Status colours: green / grey-hatch / gold ring; recoloured layout image without navy | S · *needs export* | [07 §3](07-color-system.md#status-colours-master-plan) |
| 15 | Filter match count next to the filters; filter state in the URL | S | [03 §6](03-interactions.md#6-plot-filters) |
| 16 | FAQ: 10–12 hard questions as native `<details>`, plus FAQ schema | S · *needs answers* | [02 §8](02-section-by-section.md#8-faq) |
| 17 | Contact: channel list + 2-field form, no slogan box | S | [08 §9](08-section-redesign.md#9-talk-to-us-contact) |
| 18 | Nav down to 5 items; call and WhatsApp in the phone header | S | [08 §0](08-section-redesign.md#0-header) |
| 19 | Reduce "Book a Site Visit" from 9 instances to 3 | S | [05 §6](05-content-and-copy.md#6-cta-vocabulary-use-only-these) |

## P1: accessibility (do it together with #7)

| # | Item | Effort |
|---|---|---|
| 20 | Modals → `<dialog>`; drawer `inert` when closed, Esc to close, focus return | S |
| 21 | Location cards → `<button>`; `aria-pressed` on all chip groups | S |
| 22 | Linked labels, `name`/`autocomplete` on all inputs | S |
| 23 | Skip link; `scroll-margin-top`; reduced-motion for smooth scroll and the location video | S |
| 24 | Minimum font size 14px (labels) / 16px (body); headings out of ALL CAPS in the source | S |
| 25 | Amenities ARIA cleanup (or replace with a grid, #27) | S |

## P2: polish and growth

| # | Item | Effort |
|---|---|---|
| 26 | Telugu version of the key copy + EN / తె switch | M · *needs translation* |
| 27 | Amenities → photo grid with Ready / Planned tags + lightbox | M |
| 28 | About → past-project photo cards + 2–3 buyer testimonials | S · *needs content* |
| 29 | Real dated site photos next to the renders | S · *needs photos* |
| 30 | OG / Twitter tags, `RealEstateListing` JSON-LD, `theme-color` | S |
| 31 | Server: cache headers for `/Assets`, gzip | S |
| 32 | Remove 53 unused assets (about 120 MB) from the deploy folder | S |
| 33 | Unify tokens; update DESIGN.md to match the CSS | S |
| 34 | WhatsApp deep links pre-filled with the plot number from the inspector | S |
| 35 | Analytics events: WhatsApp click, call click, form submit, plot selected | S |

## Suggested order of work

1. **Week 1:** P0 items 1–3 and 5–6, plus quick P1 wins 9, 12, 18, 19 and 20–24. These are all code or copy changes with no outside data needed.
2. **Week 2:** colour system (#7) and section redesign ([08](08-section-redesign.md)), starting with the hero, master plan and location.
3. **Once the MJR team sends data** (price, plot schedule, approvals, drive times, photos): items 4, 8, 10, 11, 14, 16, 28 and 29.
4. **Then:** decide which sections to remove, using the table at the end of [08](08-section-redesign.md#removal-candidates-for-your-later-decision), then do Telugu (#26).

## How to check it worked

| Check | Today | Target |
|---|---|---|
| Phone page weight (first load) | ≈ 52.5 MB | < 3 MB |
| Phone page length | ≈ 17 screens | ≤ 10 (≤ 8 after removals) |
| Dark pixel share, hero / master plan | 52–66% / 38–48% | < 15% |
| Tap targets < 44px (excluding map pins) | ≈ 20 | 0 |
| 5-second test: "what, where, how much?" | Fails | 3 of 3 answered above the fold |
| Leads received from the forms | 0 (not connected) | Every submission received |
