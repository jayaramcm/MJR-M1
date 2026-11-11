# MJR Township: design system (Volta SKAI look)

The site takes its whole look and motion from the Volta SKAI homepage (https://voltaskai.endover.ee/en/): warm sand pages, brown ink, a light display serif with gradient headings, small uppercase labels, rounded media, and scroll-driven motion. The **content and its order** are MJR's: what a plot buyer needs to know and do. Section-by-section spec: [redesign/SECTION-MAP.md](redesign/SECTION-MAP.md). Progress: [redesign/TRACKER.md](redesign/TRACKER.md).

This replaces the earlier "Daylight Sage" system (white, sage, gold; Anek Latin + Hind). That version is in git history and in [ux-audit/07-color-system.md](ux-audit/07-color-system.md).

## Scale: everything is in rem, and rem follows the viewport

Copied from the reference so layouts scale exactly like it:

| Viewport | `html { font-size }` | 1rem at a typical width |
|---|---|---|
| < 768px | `4.2666667vw` | 16.6px at 390 |
| 768–1200px | `2vw` | 15.4px at 768 |
| 1201–1727px | `1.25vw` | 18px at 1440 |
| ≥ 1728px | `16px` | 16px |

Breakpoints: `768px`, `1201px`, `1728px`. Write every size in rem (not px) so it scales.

## Colour (tokens in `:root` in [css/styles.css](css/styles.css))

| Token | Hex | Use |
|---|---|---|
| `--sand` | `#F4EBE4` | Page background |
| `--sand-2` | `#EBDCD0` | Alternate surface, gallery wash |
| `--cream` | `#FCF8F4` | Lightest surface, header logo tab |
| `--clay` | `#E3CDBB` | Quote card, text and buttons on dark |
| `--line` | `#DCD4CD` | Rules and borders on light |
| `--line-2` | `#C8BBB0` | Stronger borders, inactive segments |
| `--green` | `#36512B` | **Logo green: every heading on a light surface** (7.5:1 on sand, 8.9:1 on white) |
| `--green-2` | `#7E9673` | End of the green gradient on light headings |
| `--ink` | `#1F1C1B` | Strong text: names, form input, values |
| `--ink-2` | `#2B2826` | Body and subtext: a soft black (12.5:1 on sand); replaced the old brown `#715852` |
| Button gold | `#B07F1A → #E6C877 → #B07F1A` | Primary buttons: a metallic logo-gold gradient with a soft bevel; the highlight sweeps across on hover. Text `#1F1C1B` (4.7:1 or better on every stop). Replaced the brown buttons |
| `--gold-a` → `--gold-b` | `#8F6410` → `#B8892A` | Gold highlight words in light headings (deep end of the logo gold; visible part stays above 3:1) |
| `--gold-solid` | `#9A6C12` | Gold words in headings without the gradient (3.9:1) |
| `--ink-2` | `#715852` | Body text, outline buttons |
| `--muted` | `#AE928A` | Reference label colour: large text (24px+), icons, rules and labels on dark only |
| `--label` | `#5E5853` (neutral grey, 6:1; was brown `#7C6058`) | Small uppercase labels and captions on light (4.9:1); replaces `--muted` wherever text is small |
| `--terracotta` | `#A36752` | Large serif text only (accordion titles, links on dark), developer badge fill |
| `--terracotta-ink` | `#8C5A4A` | Terracotta for small text on light (4.9:1) |
| `--night` | `#322622` | Legacy dark brown; no longer used for sections (dark surfaces are navy) |
| `--navy` (S05, S12, contact band, popup) | `#1D2856` | Project journey background, from the MJR Infra logo; text `#C9CFE6`, labels `#9FA9CF` (6:1), done/accent `#CA982C` logo gold (5.4:1) |
| `--night-2` | `#261A16` | End of dark gradients |
| `--error` | `#C44F47` | Form errors only |

Gradients:
- Dark band (footer, S09 card, S12): `linear-gradient(115deg, #49332C, #261A16)`.
- Gradient headings `.grad-1` / `.grad-3` (on light): text clip from `--green` to `--green-2`; the visible part stays above 4:1 on sand. `.grad-2` (on dark): the reference warm grey `#D5CEC7` → `#76726E`. Headings on dark sections (hero, S09 card, S12, footer, popup) are cream or clay, never green. Revealed by scroll: `--reveal` goes 0→1 as the heading crosses the viewport.

Contrast (measured): `--ink-2` on `--sand` 5.5:1 · `--ink` 10:1 · `--clay` on `--night` 9.6:1. The reference's own label grey `#AE928A` is 2.45:1 on sand, which fails for small text, so small labels use `--label` instead: the one deliberate colour difference from the reference. On dark, text is `--clay` or `--cream`; `--muted` is fine there (5.1:1).

## Headings on light sections

Green gradient (`.grad-1`) with one or two key words wrapped in `<span class="hl">`, which take the gold gradient and reveal with the same scroll effect: "A gated plotted layout on the 150 ft **Tirupati Highway**", "Planned around how people will live here in **ten years**", "On NH 167K, **five minutes** from Kalwakurthy town", "Choose **your plot**", "Everything is in place **before you build**", "Walk the plots **with our team**", "**Ten amenities** inside the gate". Use it sparingly: one highlight per heading.

## Type

Free stand-ins for the reference's paid fonts, picked by side-by-side render:

| Role | Reference | MJR | Weights |
|---|---|---|---|
| Display (headings, numbers, quotes) | TT Ramillas | **Newsreader** (Google Fonts, variable, opsz) | 300, 400 |
| UI (body, labels, buttons, forms) | Specter | **Figtree** (Google Fonts) | 400, 500 |

| Class | Font | Size phone / tablet / desktop (rem) | Line | Tracking | Notes |
|---|---|---|---|---|---|
| `.h-xl` | Newsreader 300 | 3.75 / 5 / 6.25 | 0.93 / 0.9 | −0.05em | Hero title, uppercase |
| `.h-l` | Newsreader 400 | 1.875 / 2.5 / 3.75 | 1.05 / 1 | −0.03em | Section headings, usually `.grad-1` |
| `.h-m` | Newsreader 400 | 1.875 / 1.875 / 2.625 | 1.05 | −0.02em | Sub-section headings, card titles |
| `.h-s` | Newsreader 400 | 1.5 / 1.5 / 1.875 | 1.07 | −0.02em | List titles, captions |
| `.h-xs` | Newsreader 400 | 1.125 / 1.125 / 1.5 | 1.15 | −0.02em | Small serif labels |
| `.label` | Figtree 500 | 0.6875 / 0.75 / 0.8125 | 1.3 | 0.05em | UPPERCASE, `--label` (`--muted` on dark) |
| `.label-l` | Figtree 500 | 0.875 / 0.875 / 0.9375 | 1.25 | 0.05em | UPPERCASE names and roles |
| body | Figtree 400 | 0.9375 / 0.875 / 0.875 | 1.45 | 0 | `--ink-2` |

Body text never goes below 14px on screen at any width (`max(0.875rem, 14px)`).

Telugu (later): Noto Serif Telugu for display, Noto Sans Telugu for UI, same sizes.

## Shape and spacing

| Element | Radius |
|---|---|
| Pills (header buttons, segments) | 0.5rem |
| Buttons | 0.5rem |
| Cards, images, plan canvas | 0.75rem |
| Header logo tab | 0 0 0.75rem 0.75rem |

- Page gutter: 2.0625rem desktop (33px at 1440), 1.25rem phone. Content column (`.container-content`): starts at 5.125rem from the left on desktop.
- Section rhythm: 7.5rem between sections on desktop, 5rem on phones.
- Rules: 1px `--line` (light) or `rgba(227,205,187,.2)` (dark).
- Shadows: none, except the S16 popup and the plan info box.

## Buttons

| Class | Look |
|---|---|
| `.btn` (primary) | Figtree 500, UPPERCASE, 0.05em, `--ink` fill on light (`#715852` hover), `--cream` text, inset 1px `#B0734E66` ring, height 2.75rem |
| `.btn-light` | `--clay` text, translucent `--ink-2` fill: used on dark and over images |
| `.pill` | Header pills: translucent fill, icon + label; icon-only below 768px |
| `.read-more` | Small uppercase label above a serif `.h-s` link with underline: "TAKE A CLOSER LOOK / Choose your plot" |

Tap targets: 44px minimum. Focus: 2px `--ink` outline, 2px offset (`--clay` on dark).

## Motion

One scroll helper in [js/main.js](js/main.js) writes a progress value `--p` (0→1) on every `[data-progress]` element in one `requestAnimationFrame` loop. CSS turns that into: gradient-heading reveal, S03 card growth and counter, S05 timeline fill, S06/S10 sideways tracks, S10 expanding image, S11 gallery drift. Smooth scrolling uses **Lenis** (one vendored, pinned file in `js/vendor/`).

`prefers-reduced-motion: reduce`: no Lenis, `--p` fixed at 1, tracks become plain vertical lists, no popup animation, the hero video stays on its poster and the hero line stops changing. The hero has a pause button for the video and changing line together; both also pause when the hero is off screen. Everything must read correctly with motion off.

## Scroll

- Top progress bar: a white strip (the same white as the logo holder) whose scrolled part fills in logo green (`--green`), on every screen size.
- Menu and anchor jumps take about 1.1 s whatever the distance (Lenis, ease-out).
- Pinned sections are kept short: S06 holds for 2.4 screens; the S10 sideways strip moves at twice the scroll speed (half a screen of scroll per screen of sideways movement).
- An open dialog keeps the page behind it still (`html:has(dialog[open])`), and dialogs don't pass their scroll on to the page.

## Components

The section list, content and reference mapping are in [redesign/SECTION-MAP.md](redesign/SECTION-MAP.md) (S00–S17). Shared rules:
- **Header** theme follows `data-header-theme="light|dark"` on each section.
- **Dialogs** (menu, enquiry, lightbox) are native `<dialog>`.
- **Lead forms** post name + 10-digit mobile + interest to `/api/enquiry` ([server.js](server.js)); on failure the visitor sees the phone number and a pre-filled WhatsApp link.
- **Accordion** is `<details name="faq">` (one open at a time, no script).
- **Master plan** keeps its SVG polygons from [js/plots-data.js](js/plots-data.js); status colours: available `--clay`, sold `--line-2` with hatch, not for sale `--sand-2` dashed, selected `--ink` outline.
- **Shortlist** (header heart) stores plot numbers in browser storage only; the page works without it.

## Imagery

Only MJR's own images, placed in the reference's slots at the slot's ratio. Renders are labelled **Artist's impression** (the reference's "AI" label slot). Warm, soft daylight to sit on the sand palette; no text or logos in images. Slot list and Antigravity prompts: [redesign/IMAGE-PROMPTS.md](redesign/IMAGE-PROMPTS.md). Web copies live in `Assets/web/` as WebP.
