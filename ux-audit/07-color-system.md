# 07 · Colour system: 60-30-10 analysis and a lighter palette

> You asked about a "60 30 20" rule. The usual design rule is **60-30-10**, which adds up to 100%: 60% dominant (base), 30% secondary, 10% accent. This file uses 60-30-10.

---

## 1. What the page actually looks like today (measured)

Every audit screenshot was sampled pixel by pixel in the browser. **Dark** = luminance below 70/255. **Light** = near-white and unsaturated. **Gold** = brand-gold hue. **Deep green** = dark, saturated green.

| Screen | Dark | Light | Gold | Deep green | How it reads |
|---|--:|--:|--:|--:|---|
| Desktop hero | **66%** | 10% | 1.3% | 20% | Night scene; almost black |
| Desktop Why MJR | 18% | 50% | 1.7% | 4% | Fine |
| Desktop Location | 4% | 74% | 1.1% | 2% | Light |
| Desktop Master plan (top) | 19% | 64% | 0.6% | 24% | Dark panel starts |
| Desktop Master plan (plot selected) | **38%** | 38% | 2.3% | **30%** | Heavy |
| Desktop Amenities | 5% | 73% | 1.6% | 2% | Light |
| Desktop Trust / About / FAQ / Contact | 2% | 92–96% | 0.4–2.6% | 1.5% | Very light, almost empty |
| Phone hero | **52%** | 11% | **7.8%** | 17% | Dark, with a lot of gold |
| Phone location | 9% | 78% | 5.0% | 6% | Dark sticky bar at the bottom |
| Phone Master plan (plot selected) | **48%** | 19% | 2.2% | **47%** | Heaviest screen on the site |
| Phone amenities | 8% | 78% | 4.9% | 6% | Dark sticky bar at the bottom |

### What this means

- The page is **not** "too dark" on average. Most sections are 73–96% white.
- The heaviness comes from **three concentrated dark blocks** (the night hero, the master-plan panel, and the phone sticky bar) **plus dark, heavy typography** on white.
- So the page jumps between **pure white and near-black green with almost nothing in between**. There's no real "30%" tone. That on/off contrast is what reads as clumsy. The rhythm is: dark → white → white → **very dark** → white → white → white…
- The actual split is about **75% white · 22% dark green/ink · 2% gold**. That is a 75-22-2 layout with no middle tone, not 60-30-10.

---

## 2. Why it feels heavy: root causes

| # | Cause | Evidence |
|---|---|---|
| 1 | **Night-time hero video.** The first screen is 52–66% near-black. | [screenshots/d-hero.jpg](screenshots/d-hero.jpg); `Hero-day-and-night` footage |
| 2 | **Master-plan panel uses 3 heavy colours at once:** deep-green panel `#142212`, saturated grass texture PNG, and **navy** plot cells `#1D2856` from the layout image | [css/styles.css:1430](../css/styles.css#L1430), [screenshots/d-plot-selected.jpg](screenshots/d-plot-selected.jpg) |
| 3 | **Headlines are dark blocks:** weight 800, tight tracking (−0.025em), ALL CAPS, near-black `#142212`, up to 54px | [css/styles.css:175-179](../css/styles.css#L175-L179); 18 rules use weight 800 |
| 4 | **Dark controls everywhere:** the active filter chip, the active interest chip, the location icon tile, the FAQ indicator, the FAB and the phone sticky bar are all solid dark green | css lines 624, 1972, 2515, 2797, 2934, 3145 |
| 5 | **Gold means 4 things:** buttons, eyebrow text, "Sold" plots and "Selected" | css lines 264, 454, 771, 848, 1656, 1790 |
| 6 | **Token drift:** the CSS has 5 greens (`#2F4A2B #2F4A32 #243A21 #1A2B17 #142212`), 5 golds (`#C9962E #CA982C #CF9E39 #D6A53D #F3C66F`), plus navy and slate-grey. [DESIGN.md](../DESIGN.md) lists different hexes (`#36512B`, `#CA982C`). | `grep` of styles.css |
| 7 | **Gold text fails contrast:** `#C9962E` on white is **2.7:1** (AA needs 4.5:1), so the eyebrows look washed out *and* the headlines look heavy | "WHY MJR TOWNSHIP", plot kicker |
| 8 | **Saturated stock or AI imagery** (tropical pool, golf course, night city) adds noise that doesn't match the palette | Amenities, location video |
| 9 | **Shadows tinted green** under white cards make the light areas look slightly muddy | `--shadow-*` uses `rgba(20,34,18,…)` |

---

## 3. The proposed palette: "Daylight Sage"

The idea: **land in daylight.** The page should feel like standing on the site on a clear morning: open sky (white), fields (soft sage), and one gold marker that says *act here*. Deep forest green stays as the brand's signature, but is used **as ink, not as a paint bucket**.

### 60%: Base (backgrounds, breathing room)
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Main background, cards |
| `--mist` | `#F6F8F4` | Alternate section background (replaces `#F5F7F4`; almost the same) |

### 30%: Secondary (structure, surfaces, imagery)
| Token | Hex | Use | Contrast on white |
|---|---|---|---|
| `--sage-100` | `#EAF0E6` | Map canvas, inspector, feature cards, active chip fill | surface |
| `--sage-200` | `#D6E1D0` | Borders, dividers, inactive chip border | surface |
| `--sage-600` | `#4F6B47` | Icons, links, secondary emphasis, "Available" text | **6.0:1 ✓** |
| `--forest` | `#2F4A2B` | Logo, active nav underline, the **single** dark band (optional, footer only) | 9.8:1 ✓ |
| *photography* | – | Daylight, green-dominant photos count toward this 30% | – |

### 10%: Accent (action only)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--gold-500` | `#C9962E` | **Primary button fill only**, the selected-plot ring, focus ring | ink text on gold 6.2:1 ✓ |
| `--gold-700` | `#8A6418` | Gold-coloured *text* on light backgrounds (if eyebrows are kept) | **5.4:1 ✓** |

### Text (neutral, not counted in 60-30-10)
| Token | Hex | Replaces | Contrast |
|---|---|---|---|
| `--ink` | `#1F2A1C` | `#142212` (slightly softer) | 14.9:1 ✓ |
| `--ink-2` | `#435240` | same | 8.3:1 ✓ |
| `--ink-3` | `#647261` | same (captions only, ≥14px) | 5.1:1 ✓ |

### Status colours (master plan)
| Status | Fill | Border / text | Pattern | Why |
|---|---|---|---|---|
| Available | `#DCEBD3` | `#2F4A2B` | none | Green = go |
| Sold | `#E4E6E1` | `#4A5246` | diagonal hatch | Grey = gone; the hatch helps colour-blind users |
| Not for sale | `#F6F8F4` | `#8A9386` dashed | dashed | Neutral, clearly different |
| Selected | (keeps its status fill) | **3px `#C9962E` ring** + shadow | – | Gold = "your choice" |
| Filtered out | 30% opacity | – | – | Unchanged |

**Remove navy entirely.** Ask for the layout export ([Assets/layout MJR.png](../Assets/layout%20MJR.png)) with plot cells in white or `--sage-100`, roads in `#E4E6E1`, and green spaces in `#CFE0C4`. Better still, ask for SVG, so status colours are drawn into the plan itself instead of floating pins.

### Rules
1. **One gold button per screen.** Secondary actions use an outline in `--sage-600`.
2. **No solid dark surfaces bigger than a button**, except optionally the footer.
3. **Gold is never a status colour.** (It's an action colour.)
4. **Headlines:** weight 700 (not 800), sentence case, `letter-spacing: -0.01em`, colour `--ink`.
5. **Shadows are neutral:** `rgba(16, 24, 16, .06)` at most, and only on floating elements (modals, the sticky bar). Cards get a 1px `--sage-200` border and no shadow.
6. **Imagery:** daylight versions only, with a small, consistent look (slightly lower saturation, warm daylight). No night scenes, golf courses or skyscrapers.

---

## 4. Target split after the change

| Role | Target | Comes from |
|---|---|---|
| 60% base | white + mist backgrounds | Section backgrounds, cards |
| 30% secondary | sage surfaces + daylight green imagery + `--sage-600` icons | Map canvas, feature cards, chips, photos |
| 10% accent | gold buttons + ink headlines | One gold button per view, selected plot |

Measure it the same way after the change: the hero and master-plan screens should drop from 38–66% dark to **under 15%**.

---

## 5. Before → after, component by component

| Component | Now | After |
|---|---|---|
| Hero | Night video with a dark gradient over the whole frame | **Daytime** clip/poster with a bottom-only gradient behind the text; or a split layout (text on `--paper`, media framed on the right) |
| Hero stats bar | Frosted dark glass | White card, `--sage-200` dividers, `--sage-600` icons, ink numbers |
| Eyebrows | Gold caps, 2.7:1 | Remove them (the frontend-design skill flags caps eyebrows as template filler), or use `--gold-700` sentence case |
| Accent bar under headings | Dark green 48×3 | Remove (it's decoration) |
| Filter chips (active) | Solid dark green, white text | `--sage-100` fill, `--forest` text, 1.5px `--forest` border |
| Master-plan panel | `#142212` panel + grass PNG + navy cells | `--mist` panel, flat `--sage-100` map canvas, recoloured plan, white inspector card |
| Plot pins | Cream / gold (sold) / navy text | Status colours from §3, 32px minimum |
| Location icon tiles | Solid green when active | `--sage-100` tile, `--sage-600` icon; active = 2px `--sage-600` border |
| Amenity stage | Dark card + dark caption | Plain image, caption underneath in ink |
| FAQ indicator | Solid dark circle | Plain `+`/`−` in `--sage-600` |
| Interest chips | Dark selected state | Same as filter chips |
| Phone sticky bar | `#142212` bar, 8% of every screen | White bar, 1px `--sage-200` top border, `[Call] [WhatsApp] [Book visit]` with only Book in gold |
| WhatsApp FAB | Dark green circle | WhatsApp green `#25D366` glyph on white, or merged into the sticky bar |
| Modal backdrop | 72% dark green | 45% `#1F2A1C` |
| Footer | White | Optional: the **one** `--forest` band, giving a calm, solid ending |

---

## 6. How to implement (CSS)

1. **Replace the tokens** in `:root` ([css/styles.css:1-66](../css/styles.css#L1-L66)) with the palette above. Keep the old names as aliases for one release so nothing breaks:
   ```css
   :root {
     --paper:#FFFFFF; --mist:#F6F8F4;
     --sage-100:#EAF0E6; --sage-200:#D6E1D0; --sage-600:#4F6B47; --forest:#2F4A2B;
     --gold-500:#C9962E; --gold-700:#8A6418;
     --ink:#1F2A1C; --ink-2:#435240; --ink-3:#647261;
     /* legacy aliases */
     --brand-green: var(--forest); --brand-gold: var(--gold-500);
     --brand-green-deep: var(--ink); --surface-tinted: var(--mist);
     --text-primary: var(--ink); --border-subtle: var(--sage-200);
     --shadow-sm: 0 6px 20px rgba(16,24,16,.06);
   }
   ```
2. **Find and replace the stray hex values:** `#2F4A32`, `#243A21`, `#1A2B17`, `#CA982C`, `#CF9E39`, `#F3C66F`, `#1D2856`, `#1C2D5C`, `#475569`, `#94A3B8` → tokens.
3. **Turn dark surfaces light** at these selectors: `.hero-card-frame` (674), `.masterplan-workbench` (1430), `.filter-chip.active` (1972), `.amenity-stage-card` (2265), `.location-corridor-card.active .corridor-icon` (2515), `.location-video-frame` (2537), `.faq-card.active .faq-toggle-indicator` (2797), `.interest-chip.selected` (2934), `.mobile-sticky-bar` (3145), `.floating-contact-fab` (624).
4. **Gold text → `--gold-700`** at lines 454, 458, 771, 797, 848, 935, 1177, 1238, 1358.
5. **Headline weight 800 → 700**, remove `text-transform`, and retype the capitalised headings in sentence case in [index.html](../index.html).
6. Update [DESIGN.md](../DESIGN.md) so it matches. It currently lists hex values the CSS doesn't use.
