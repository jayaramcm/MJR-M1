# 08 · Section-by-section redesign

This redesign uses **the current sections and content**, restyled with the "Daylight Sage" palette from [07-color-system.md](07-color-system.md) and the fixes from [02](02-section-by-section.md) to [05](05-content-and-copy.md). Each section ends with a **verdict** (keep / simplify / merge / removal candidate) for when you decide which sections to cut later.

**Colour key used in the wireframes**
`[P]` paper #FFFFFF · `[M]` mist #F6F8F4 · `[S]` sage-100 #EAF0E6 surface · `(G)` gold-500 button · `(o)` outline button · `ink` headline text · `sage` sage-600 icons and links

**Rhythm down the page:** P → M → P → M → P → M → P → M → P → (optional forest footer). Light and mid tones alternate, with **no near-black blocks**.

---

## 0. Header

```
DESKTOP [P] ─────────────────────────────────────────────────────────────────────
 MJR▮  Location  Plots & Prices  Amenities  Approvals  FAQ     ☎ 90100 55596  EN|తె  (G Book a visit)
─────────────────────────────── 1px sage-200 ─────────────────────────────────────

PHONE [P]
 MJR▮                                   ☎   🟢WA   ☰
```
- 5 links instead of 7 ("Why MJR" and "About" fold into other sections). One gold button.
- On phones, call and WhatsApp are always within thumb reach at the top. The menu holds the links and the language switch.
- **Verdict:** keep, simplified.

---

## 1. Hero + stats

```
DESKTOP [P]
┌───────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────┐  ┌──────────────────────────────────────────┐ │
│ │ TG RERA P01600010465 ✓ (sage)│  │                                          │ │
│ │                               │  │   DAYTIME video / poster                 │ │
│ │ Residential plots on the      │  │   (entrance + plotted roads, 24px radius)│ │
│ │ Tirupati Highway, Kalwakurthy │  │                                          │ │
│ │ (ink, 700, sentence case)     │  │                              ⏸ (small)   │ │
│ │                               │  └──────────────────────────────────────────┘ │
│ │ 104 plots, 120–550 sq. yd.,   │                                               │
│ │ 5 min from Kalwakurthy town.  │                                               │
│ │ From ₹__ / sq. yd.            │                                               │
│ │ (G WhatsApp for price list)   │                                               │
│ │ (o View available plots)      │                                               │
│ └──────────────────────────────┘                                               │
│ ┌─[S]──────────────────────────────────────────────────────────────────────┐   │
│ │ ▢ 7.93 acres │ ⌂ 104 plots │ ▱ 120–550 sq. yd. │ ═ 30 & 40 ft roads │ 150 ft hwy │
│ └──────────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────────────┘

PHONE [P]
 TG RERA ✓
 Residential plots on the
 Tirupati Highway, Kalwakurthy
 From ₹__ / sq. yd.
 [ daytime image, 16:10, rounded ]
 (G WhatsApp for price list)
 (o View available plots)
 104 plots · 120–550 sq. yd. · 150 ft hwy  ← one line, sage icons
```
- **Colour:** text on white, so no dark scrim is needed. Media is framed rather than full-bleed, which gives a calmer, editorial look. The stats strip sits on `[S]` sage with ink numbers.
- If you prefer to keep a full-bleed video: use the **day** footage and a gradient only on the bottom 40%, under the text (`linear-gradient(to top, rgba(31,42,28,.55), transparent)`).
- Remove: the "Scroll" cue, the mute button (unless there's audio), and the all-caps kicker.
- **Verdict:** keep, redesigned. This is the most important change.

---

## 2. Why MJR

```
DESKTOP [M]
 Four reasons buyers choose MJR Township            (ink h2)

 ┌─[P]──────────┐ ┌─[P]──────────┐ ┌─[P]──────────┐ ┌─[P]──────────┐
 │ ✓ (sage)      │ │ ⌖            │ │ ═            │ │ ↗            │
 │ Approved      │ │ On NH 167K   │ │ Roads, power │ │ Near the     │
 │ TG RERA       │ │ 5 min from   │ │ & drainage   │ │ proposed RRR │
 │ P01600010465  │ │ Kalwakurthy  │ │ laid (photo) │ │ __ km        │
 └───────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

 ┌───────────────────────────────┐ ┌──────────────────────────────┐
 │ Entrance: architectural render│ │ Site today: photo, Nov 2026  │
 └───────────────────────────────┘ └──────────────────────────────┘

PHONE: 2×2 pillar grid, then render + photo stacked (or swipeable)
```
- The pillars become the headline content. Remove the slogan paragraph and the "See the Location" button.
- Putting a **render and a real photo side by side** builds more trust than either one alone.
- **Colour:** `[M]` background, white cards with a 1px sage-200 border and no shadow, sage icons.
- **Verdict:** simplify. It could **merge into the hero** (the pillars become the stats strip) if you need to shorten the page.

---

## 3. Location

```
DESKTOP [P]
 __ min to Hyderabad's airport, 5 min to Kalwakurthy      (ink h2)

 ┌───────────────────────────────┐  ┌─[S]──────────────────────────────┐
 │ Kalwakurthy town     5 min    │  │                                  │
 │ ─────────────────────────────  │  │   STATIC MAP (light style)       │
 │ Jadcherla           __ min    │  │   ● MJR Township                 │
 │ Shamshabad airport  __ km/min │  │   ○ Kalwakurthy ○ Jadcherla      │
 │ ORR (Tukkuguda)     __ km/min │  │   ○ Airport  — NH 167K            │
 │ Financial District  __ km/min │  │                                  │
 │ ─────────────────────────────  │  │   (o Open in Google Maps ↗)      │
 │ Schools · Hospitals · Temples │  └──────────────────────────────────┘
 │  ▸ expandable lists (details) │
 └───────────────────────────────┘

PHONE: distance rows → map image → "Open in Google Maps"
```
- **Rows instead of cards.** Numbers aligned right, tabular figures. One hairline divider per row in sage-200.
- The 4 videos (about 60 MB in total) are replaced by one static map image (about 150 KB). If you want to keep a video, show one "▶ Watch the drive from Kalwakurthy" link that opens a modal.
- Schools, hospitals and landmarks go into `<details>`, so they're available without taking space.
- **Verdict:** keep, redesigned around numbers.

---

## 4. Approvals (moved up from 6th)

```
DESKTOP [M]
 Approvals, title and bank loans                                  (ink h2)
 ┌─[P]──────────────────────────────────────────┐  ┌─[P]─────────────────┐
 │ ✓ TG RERA P01600010465        Verify ↗ (sage)│  │ [certificate photo] │
 │ ✓ DTCP layout no. ____                        │  │                     │
 │ ✓ Survey no. 720 & 729, clear title           │  └─────────────────────┘
 │ ✓ Loans: SBI · HDFC · ____                    │
 │ ✓ Documents shared before you book            │
 │ (o Get the documents on WhatsApp)             │
 └───────────────────────────────────────────────┘
```
- **Colour:** checkmarks in sage-600 and ink text. **No gold button here**; it's an outline button, because this section reassures rather than sells.
- **Verdict:** keep and move up. It's short but has a big effect on trust.

---

## 5. Choose your plot (master plan)

```
DESKTOP [P]
 Choose your plot                                               (ink h2)
 Size ▾ [All] [≤150] [151–200] [201–300] [300+]   Road ▾ [Any] [30 ft] [40 ft]   ● 23 plots
 ┌─[M] panel, 1px sage-200, radius 24 ─────────────────────────────────────────────┐
 │ ┌─[S] flat map canvas ─────────────────────────────┐ ┌─[P] inspector card ─────┐ │
 │ │                                                    │ │ Plot 45     ● Available│ │
 │ │   recoloured layout: white plots, light-grey roads │ │ Block B2 · 40 ft road  │ │
 │ │   ▢ available (pale green)  ▨ sold (grey hatch)    │ │ ───────────────────────│ │
 │ │   ◎ selected = gold ring                           │ │ Size  ~250 sq. yd.*    │ │
 │ │                                     + − ⟲   N↑    │ │ Facing  South          │ │
 │ └────────────────────────────────────────────────────┘ │ Price  Ask us          │ │
 │  ▢ Available  ▨ Sold  ┆ Not for sale  ◎ Selected     │ (G WhatsApp about      │ │
 │  Updated 1 Nov 2026 · *indicative, confirm with sales │     Plot 45)           │ │
 │                                                        │ (o Book a visit)       │ │
 │                                                        └────────────────────────┘ │
 └──────────────────────────────────────────────────────────────────────────────────┘

PHONE [P]
 Choose your plot
 [Size ▾] [Road ▾]                 23 plots
 [ List | Map ]   ← segmented toggle, List by default
 ┌──────────────────────────────┐
 │ Plot 45 · ~250 sq. yd.        │
 │ 40 ft road · South   ● Avail. │
 │ (o Ask on WhatsApp)           │
 └──────────────────────────────┘
 … 10 cards, "Show more"
 Map view = full-screen sheet, pinch/drag, 32px+ pins, inspector as bottom sheet
```
- **Colour:** the panel changes from `#142212` to `[M]` mist with a `[S]` sage map. The legend goes underneath the map. Gold appears **only** as the selected ring and the one WhatsApp button.
- The match count sits **next to the filters**, so cause and effect are visible together.
- **Verdict:** keep. This is the site's signature feature, so the bold design effort goes here. It needs the real plot data first (see the roadmap).

---

## 6. Amenities

```
DESKTOP [M]
 10 amenities inside the gate                                (ink h2)
 ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
 │ img  │ │ img  │ │ img  │ │ img  │ │ img  │
 │Pool  │ │Lawn  │ │Water │ │EV    │ │Play  │
 │Ready │ │Ready │ │Ready │ │Planned│ │Ready │   ← status tag: sage = ready, grey = planned
 └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
 ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
 │Fitness│ │Parks │ │Senior│ │Pergola│ │Yoga  │
 └──────┘ └──────┘ └──────┘ └──────┘ └──────┘
 Images are indicative. (ink-3, 14px)

PHONE: 2-column grid, tap → full-screen lightbox with ‹ ›
```
- Removes the accordion, tabs, stepper, stage card, dark caption, 3 copies of each image and the second headline.
- Live / Play / Relax can stay as small sage labels above groups, or be dropped.
- **Verdict:** simplify. It's a candidate to **shrink to a single row of 5 key amenities** plus a "See all 10" link.

---

## 7. About MJR

```
DESKTOP [P]
 MJR Infra Developers: 9 projects since 2012               (ink h2)
 2012 founded · 9 projects · 1,200+ families     (one line, ink numbers, tabular)

 ┌─ MJR Greens, Jadcherla ─┐ ┌─ MJR Enclave ─┐ ┌─ MJR Meadows ─┐
 │ [photo]  ___ plots       │ │ [photo]        │ │ [photo]        │
 │ Sold out · 2019          │ │ …              │ │ …              │
 └──────────────────────────┘ └────────────────┘ └────────────────┘

 "Quote from a buyer, in their words." (Name, Town)   ×2–3, or one 30-second video
```
- Remove the "Our approach" card and the generic MD quote (or keep the MD quote with a photo).
- **Verdict:** keep, but it **needs real content** (photos, testimonials). If those aren't available, it's a candidate to **merge into Approvals** as a single "Developer: MJR Infra, 9 projects since 2012" line.

---

## 8. FAQ

```
DESKTOP [M]
 Questions buyers ask us                                  (ink h2)
 ┌────────────────────────────────────────────────────────────────┐
 │ ▸ What is the price per sq. yd.?                            +  │
 │ ▸ Is it DTCP approved, and can I get a bank loan?           +  │
 │ ▸ What is the booking amount and payment schedule?          +  │
 │ ▸ Are registration and stamp duty extra?                    +  │
 │ ▸ When can I start building?                                +  │
 │ ▸ Can NRIs buy? How do I pay from abroad?                   +  │
 │ … (10–12 total, native <details>, hairline sage-200 dividers) │
 └────────────────────────────────────────────────────────────────┘
```
- Single column, no cards, no dark indicator. The `+` is sage-600.
- **Verdict:** keep, with new questions. Remove the questions already answered higher up the page.

---

## 9. Talk to us (contact)

```
DESKTOP [P]
 Talk to our sales team                                       (ink h2)
 ┌─ Channels ───────────────────┐  ┌─[M] form card ───────────────────────┐
 │ ☎  +91 90100 55596  (Call)   │  │ Name                                 │
 │ 🟢 WhatsApp us               │  │ [                              ]     │
 │ ✉  sales@mjrinfra.com        │  │ Mobile number                        │
 │ ⌖  Office: ________ (Map ↗)  │  │ [ 10-digit mobile number…      ]     │
 │ 🕘 Mon–Sat, 9 am–7 pm         │  │ I want: [Price list] [Site visit]    │
 │                               │  │         [Investment info]            │
 │                               │  │ (G Call me back)                     │
 │                               │  │ We reply within __ minutes.          │
 └───────────────────────────────┘  └──────────────────────────────────────┘
```
- Remove the "Your vision deserves…" slogan box and its competing buttons.
- **Verdict:** keep, simplified. **The form must be connected before launch.**

---

## 10. Footer

```
[forest #2F4A2B, the ONE dark band, optional] or [M]
 MJR▮  Survey No. 720 & 729, NH 167K, Kalwakurthy · TG RERA P01600010465
 Location · Plots · Amenities · Approvals · FAQ · Contact
 ☎ · WhatsApp · Email · Instagram · YouTube
 Disclaimer (ink-3 / 70% white, 13px) · © 2026 MJR Infra Developers
```
- **Verdict:** keep. A forest-green footer gives the page a solid base without making the main content heavy.

---

## Phone sticky bar (all sections)

```
[P] white, 1px sage-200 top border, safe-area padding
 (o ☎ Call)   (o 🟢 WhatsApp)   (G Book visit)
 On the master plan, when a plot is selected: (o ☎) (G WhatsApp about Plot 45)
```

---

## Removal candidates (for your later decision)

| Section | Candidate action | Saves on a phone | Condition |
|---|---|---|---|
| Why MJR | Merge into the hero stats and Approvals | ≈ 2 screens | If the hero carries the 4 facts |
| Amenities | Shrink to 5 cards + "See all" | ≈ 1.5 screens | – |
| About MJR | Merge into Approvals as one developer line | ≈ 1.5 screens | If no testimonials or photos are available |
| Location video | Remove (static map instead) | ≈ 1 screen + 60 MB | – |
| Contact slogan box | Remove | ≈ 0.5 screen | – |

With all of these applied, the page has 6 sections: **Hero → Location → Approvals → Choose your plot → FAQ → Talk to us**, about 8 phone screens long.
