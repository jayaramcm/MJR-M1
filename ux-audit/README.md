# MJR Township: UX audit

**Audited:** 11 November 2026 · **Scope:** the whole one-page site ([index.html](../index.html), [css/styles.css](../css/styles.css), [js/main.js](../js/main.js), [js/plots-data.js](../js/plots-data.js), [plots.json](../plots.json))
**Method:** code review plus live rendering in headless Chrome at 1440×900 (desktop) and 390×844 (phone), measured with the browser's own performance data. The review rules came from three `npx ui-skills` guides (`mengto/landing-page`, `vercel-labs/web-design-guidelines`, `ibelick/baseline-ui`) and the project's own `frontend-design` skill.

---

## How to read this folder

| File | What's in it |
|---|---|
| [01-audience-and-goals.md](01-audience-and-goals.md) | Who the site is for, what each type of buyer needs to learn before they call, and how well the site answers them now |
| [02-section-by-section.md](02-section-by-section.md) | Every section in page order: what works, what doesn't, and the fix |
| [03-interactions.md](03-interactions.md) | Every interactive component (map, filters, amenities, location, FAQ, modals, forms, nav, sticky bar): how it behaves now, where it fails, and how it should behave |
| [04-accessibility-and-performance.md](04-accessibility-and-performance.md) | Technical findings with `file:line` references, page weight, and tap targets |
| [05-content-and-copy.md](05-content-and-copy.md) | Headlines, repetition, missing facts, and rewritten copy |
| [06-improvement-roadmap.md](06-improvement-roadmap.md) | Every fix in priority order, with effort, ready to work through |
| [07-color-system.md](07-color-system.md) | 60-30-10 colour analysis (measured from screenshots), why the dark tones feel heavy, and the lighter "Daylight Sage" palette with implementation steps. **Superseded on 11 Nov 2026** by the Volta SKAI look in [DESIGN.md](../DESIGN.md) |
| [08-section-redesign.md](08-section-redesign.md) | Redesign of every current section with wireframes (desktop and phone), colour roles, and keep / merge / remove verdicts |
| [screenshots/](screenshots/) | Evidence captured during the audit (`d-` = desktop, `m-` = phone) |

---

## The short version

The site looks premium and it is visually consistent. The brand colours, the hero video, the entrance render and the interactive master plan all make a strong first impression.

The problems are about **what a plot buyer can actually do and learn**:

1. **Enquiries go nowhere.** All four forms call `preventDefault()` and then only show a thank-you message or an `alert()`. No name or phone number is sent or stored ([js/main.js:978-994](../js/main.js#L978-L994)). Every lead is lost today.
2. **The page is about 63 MB on desktop and 53 MB on a phone** (measured). On the 4G connections common around Kalwakurthy, it will load slowly and use a lot of mobile data.
3. **The plot map shows plot facts that are not real yet.** Sizes such as "251.7 sq. yd.", facing directions and Sold/Available status are placeholder values, as [js/plots-data.js:9-10](../js/plots-data.js#L9-L10) says itself. Buyers will read them as facts. That is a trust and legal risk.
4. **The master plan doesn't work on phones.** At 390px wide the 104 plot numbers overlap into fragments such as "7 7 72" and "2 1 0" (see [screenshots/m-plot-selected.jpg](screenshots/m-plot-selected.jpg)), and each tap target is 22px.
5. **The questions buyers ask first are not answered:** price, distance and travel time to Hyderabad, approval type (DTCP/HMDA), bank loans, and the site address on a map.
6. **It is too long to scan.** The phone page is 14,700px, about 17 screens. Headlines are slogans in all caps, and the word "Foundation" is used as a headline idea 5 times. "Book a Site Visit" appears 9 times while WhatsApp, which most of this audience prefers, is hidden on phones.

### Health scorecard

| Area | Score | Main reason |
|---|---|---|
| Visual quality and brand | 7/10 | Premium and consistent, but heavy: dark blocks jump straight to white, with no middle tone (see [07](07-color-system.md)) |
| Clarity: can I tell what it is in 5 seconds? | 5/10 | The hero headline doesn't say "plots", "where" or "how much" |
| Decision information (price, distance, approvals) | 3/10 | The facts buyers decide on are missing |
| Interaction design | 5/10 | The desktop map is strong; on phones the map, location cards and amenities fail |
| Lead capture | 1/10 | Forms don't send anything |
| Performance | 2/10 | 53–63 MB, unoptimised PNG/JPG files, autoplaying 10 MB video |
| Accessibility | 5/10 | A global focus style exists, but modals, drawer and location cards fail for keyboard and screen-reader users |
| Trust and proof | 5/10 | RERA is shown but can't be verified with one click; no testimonials or real site photos |

### Top fixes, in order

| # | Fix | Effort |
|---|---|---|
| 1 | Connect all forms to a real endpoint (Google Sheet, CRM, or a WhatsApp/email relay) and add validation for a 10-digit mobile number | S |
| 2 | Compress images to WebP/AVIF at real display sizes; stop preloading every amenity image; make the location video play on tap | M |
| 3 | Hide plot size, facing and status, or label them "indicative", until the sales team's schedule is in [plots.json](../plots.json) | S |
| 4 | Phone master plan: a pinch/drag map with larger tap targets, or the plot list and dropdown first and the map second | M |
| 5 | Add a "Price from ₹__ / sq. yd." line, or a "Get the price list on WhatsApp" action, in the hero and in the master plan | S |
| 6 | Add km and minutes to each location card, plus a Google Maps "Get directions" link | S |
| 7 | Phone sticky bar: **Call · WhatsApp · Visit** (three actions, WhatsApp included) | S |
| 8 | Rewrite headlines in sentence case with facts: say what, where and how big | S |
| 9 | Make the RERA number a link to the TG RERA portal, and add approval type, bank-loan partners and real site photos | S |
| 11 | Lighten the colour system: daytime hero, light master-plan panel, white phone bar, gold for actions only ([07](07-color-system.md)) | M |
| 10 | Fix the modal and drawer focus handling, make location cards real buttons, and add a skip link | S |

S = under half a day · M = 1–3 days. The full list is in [06-improvement-roadmap.md](06-improvement-roadmap.md).

---

### Things to confirm with the MJR team

These findings depend on facts the code can't answer:

- The starting price or price per sq. yd. that may be shown publicly.
- The approval type (DTCP, HMDA or gram panchayat) and the banks that offer loans on these plots.
- Real drive times: Hyderabad (Shamshabad airport / ORR), Kalwakurthy town, Jadcherla.
- Whether the "Since 2012 · 9 projects · 1,200+ families" figures in About are verified.
- Whether the hero video has an audio track. If it doesn't, remove the mute button.
- Where leads should go: sales phone, email, Google Sheet or CRM.
