# MJR Township: section map (Volta SKAI look, MJR content)

**Reference:** https://voltaskai.endover.ee/en/ (homepage only) · **Design system:** [DESIGN.md](../DESIGN.md) · **Tracker:** [TRACKER.md](TRACKER.md) · **Images:** [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md)

**Rule for every section:** copy the reference's layout, spacing, type, colour and motion as closely as we can; put **MJR's content** in it, in the order an MJR plot buyer needs. No Endover images, names or copy are used. Stage 2 changes individual sections only after the user signs them off here.

Reference screenshots (1440, 768, 390 wide) are captured with the script in the scratchpad (`tools/capture.mjs`) and kept outside the repo; the same script captures the local build for side-by-side checks.

🔒 = needs data from MJR. Until supplied, the slot shows a neutral placeholder that is clearly not a fact (for example "Sales manager name to be confirmed"), never invented content.

---

## Page order

| ID | Section | Reference component | MJR purpose | Anchor |
|---|---|---|---|---|
| S00 | Header | `banner` | Brand, menu, book a visit, shortlist | – |
| S01 | Full-screen menu | `site-navigation` | Get anywhere in one tap | – |
| S02 | Hero + promo card | `hero-image` + `hero-image-promo` | What, where, how to act | `#top` |
| S03 | Overview cards | `scroll-cards` | The four things you get | `#overview` |
| S04 | Developer word + key numbers | `home-template-architecture` + `quote-arguments` | Who builds it, how big it is | `#numbers` |
| S05 | Project timeline | `animated-timeline` | Where the project stands | `#timeline` |
| S06 | Location track | `horizontal-scroll` #1 | Where it is and what's near | `#location` |
| S07 | Master plan and plot picker | `panorama-section` | Choose a plot (the signature) | `#plots` |
| S08 | Infrastructure | `home-template-modern` | What's built before you build | `#infrastructure` |
| S09 | Site-visit card | `book-a-meeting` | Talk to a person | `#visit` |
| S10 | Approvals + life inside the gate | `interior-section` + `horizontal-scroll` #2 | Trust, then lifestyle | `#approvals` |
| S11 | Amenities gallery | `final-gallery-images-section` | See the ten amenities | `#amenities` |
| S12 | About MJR + FAQ | `arguments-tab--fullscreen` | Track record, answers | `#about`, `#faq` |
| S13 | Footer: contact, form, updates, other projects | `footer gradient-dark-2` | Leave a number | `#contact` |
| S14 | Enquiry modal | contact-form modal | Visit / plot enquiry | – |
| S15 | Phone action bar | not in reference | Call · WhatsApp · Visit on phones | – |
| S16 | Promo popup | Open House popup | Site-visit invitation | – |
| S17 | Developer badge | "ENDOVER" corner badge | MJR Infra Developers mark | – |

---

## S00 · Header

**Reference:** fixed, transparent. Left: "CONTACT US" pill (chat icon + uppercase label, translucent fill). Centre: the logo in a tab that hangs from the top edge (light fill, rounded bottom corners, ~128×55 px at 1440). Right: "MENU" pill with a three-line icon (favourites heart sits beside it when used). A thin progress line runs along the very top. Over dark sections (`data-header-theme="dark"`) the pills switch to light-on-dark. Phones: the pills become icon-only squares.

**MJR content**
- Left pill: **Book a site visit** (opens S14, `data-enquiry="visit"`).
- Centre tab: MJR Township logo (`Assets/TownShip logo_Final_New_Web_1.svg`).
- Right: **Menu** pill + **Shortlist** heart with a count of plots saved in S07 (browser storage; opens the menu's shortlist list).
- Top line: page scroll progress.

**Motion:** theme flips per section via IntersectionObserver on `[data-header-theme]`.

## S01 · Full-screen menu

**Reference:** overlay panel. Left column: a large image that cross-fades to the hovered link's image. Right column: language switch (EST | ENG), big serif main links, small uppercase secondary links, then contact cards (department, name, phone, email). Top/bottom scroll fades. Close button replaces the menu pill.

**MJR content**
- Language: **EN** | **తె** (తె shown as "coming soon" until the Telugu copy exists).
- Main links (each with its hover image): Overview · Location · Master plan · Infrastructure · Approvals · Amenities · About MJR · FAQ · Contact.
- Secondary: Purchase process and loans 🔒 (scrolls to FAQ until written) · Documents · Book a site visit.
- Contact cards: **Sales** – name 🔒, +91 90100 55596, WhatsApp, sales@mjrinfra.com. **Site office** – address, hours 🔒.
- Shortlist block (only when plots are saved): the saved plot numbers with "Ask about these plots" (WhatsApp, pre-filled).

**Build:** native `<dialog>` (focus trap, Esc, focus return), as today.

## S02 · Hero + promo card

**Reference:** full-bleed image/video, 100vh. Title in display serif, very large, uppercase, centred, semi-transparent white. Small round "AI" label bottom-left (marks a generated image). Scroll indicator (label + animated line). A promo card overlaps the hero's bottom edge, centred: left half light gradient with heading-m + text + primary button, right half image. Phones: card sits below the image, full width.

**MJR content**
- **Video** (changed 11 Nov 2026 at the user's request): the original entry video `Assets/hero-compressed.mp4` (10 s, night to day around the MJR monument, 1.9 MB); phones get `Assets/web/hero-video-960.mp4` (0.9 MB). Poster: its first frame, `hero-video-poster.webp`. Started by script, not `autoplay`: reduced-motion and data-saver visitors see the poster only; it pauses when scrolled out of view. A pause/play button (bottom right) stops the video and the changing line together.
- Text sits in the sky, above the monument: label **MJR TOWNSHIP · KALWAKURTHY**, then **RESIDENTIAL PLOTS** (solid cream, weight 400, soft shadow over a dark radial scrim), then a **changing line** in italic clay that slides and un-blurs every 3.2 s: "on the Tirupati Highway" → "five minutes from Kalwakurthy" → "from 120 to 550 sq. yd." → "in a gated, RERA-registered layout". Screen readers get one static h1: "Residential plots on the Tirupati Highway, Kalwakurthy". Below it, a small glass button **Explore the township →** scrolls to S03. The reference's scroll indicator (label + animated line) was removed at the user's request.
- The aerial stills (IMG-01/02) moved out of the hero; IMG-01 still appears in S06, S12 and the menu.
- Label (the "AI" slot): **Artist's impression**.
- Promo card: label "TG RERA P01600010465" · heading "104 plots from 120 to 550 sq. yd." · text "A gated, RERA-registered layout on NH 167K, five minutes from Kalwakurthy town." · button **Get the price list on WhatsApp** · image: IMG-03 internal road.

## S03 · Overview cards

**Reference:** two columns split by a thin vertical rule. Left (sticky): small uppercase label, large gradient serif title, and at the bottom a counter "2 / 4" with the current card's caption. Right: four rounded images stacked; each one grows as it enters and the left caption/counter follows the active card. Phones: one column, each image followed by its "n / 4" and caption, staggered left/right.

**MJR content**
- Label: **MJR TOWNSHIP**. Title: "A gated plotted layout on the 150 ft Tirupati Highway".
- Cards: 1 "An entrance gate and compound wall around all 7.93 acres" (`s03-gate.webp`) · 2 "30 and 40 ft blacktop roads with drains and streetlights" (IMG-03 `internal-road.webp`) · 3 "Three parks and ten amenities inside the gate" (`s03-parks.webp`) · 4 "104 plots on 7.93 acres, from 120 to 550 sq. yd." (`s03-layout.webp`). The night render `MJR_Township_Standing_HR.jpg` is not used: it is a dusk scene with the MJR logo in it, against the image rules.

## S04 · Developer word + key numbers

**Reference:** centred gradient title block, then two columns: a quote card (accent-light fill, large quote mark, two paragraphs, author name in uppercase, role, firm logo, portrait inset bottom-right) and a 2×2 grid of arguments (big serif number + uppercase caption, divided by thin rules; the fourth cell is "TAKE A CLOSER LOOK / Prices and plans" link).

**MJR content**
- Title: label **THE LAYOUT**, heading "Planned around how people will live here in ten years".
- Quote card: MD's quote 🔒 (two short paragraphs about why this site and how it was planned), name and title 🔒, MJR Infra Developers logo, portrait 🔒. Placeholder until supplied: the existing About line "Every layout starts with one question: how will people live here five and ten years from now?" credited to "MJR Infra Developers".
- Numbers: **7.93** ACRES · **104** PLOTS · **120–550** SQ. YD. · link cell "TAKE A CLOSER LOOK / Choose your plot" → `#plots`.
- **Changes (11 Nov 2026, user):** the three numbers count up once when they scroll into view (ease-out, 1.8 s; screen readers get the final values; still under reduced motion). The quote card is a **flip card**: front is white with a gold quote mark (logo gold `#CA982C`), the first sentence in green serif, a divider, and a round logo avatar beside the name; on hover it turns over (a "Talk to the team →" button does the same for touch and keyboard) to a contact side over the gate image: "Ask the people who planned the layout", **Book a site visit** + **WhatsApp**, and "Back to the note". The hidden side is `inert`.

## S05 · Project journey (redesigned 11 Nov 2026)

**Look:** navy section (`#1D2856`, from the MJR Infra logo) with a soft lighter glow top right; cream headings, gold (`#CA982C`, logo gold) for what is done. Left column is sticky: label **PROJECT JOURNEY**, heading "From open land to your plot", one-line intro, a five-step **rail** (nodes + a gold line that fills as you scroll; the step in view gets a ring; each step is a link to its chapter), and a Done / Coming up key. Right column: five **chapters**, each a photo with a large outlined step number (gold when done), a status chip, a short line, a title and two sentences. The chapter in view is full strength, the others are dimmed. Phones: no rail, chapters stacked.

**Content (only facts we have):**
1. **The layout is approved** · Done · date to be confirmed 🔒 · `s03-layout.webp`
2. **Registered with TG RERA** · Done · P01600010465 with a "Check it yourself" link · `documents-desk.webp`
3. **Roads, drains and streetlights** · Coming up · date to be confirmed 🔒 · `internal-road.webp`
4. **Parks and amenities** · Coming up · date to be confirmed 🔒 · `amenity-parks.webp`
5. **Your plot, in your name** · Your step · actions **Choose your plot** (gold) and **Book a site visit** · `s03-gate.webp`

When MJR confirms dates or finishes a step, change its chip and the `is-done` class on the chapter and the rail item.

## S06 · Location (redesigned 11 Nov 2026)

**Look:** light sand section. On wide screens it pins for three screens of scroll: on the left, the heading "On NH 167K, five minutes from Kalwakurthy town" and three steps that cross-fade (each a title, two sentences and a photo pair); on the right, a white **route map card** on a faint survey-dot grid. Progress dashes under the steps.

**The map** is real: the base map `Assets/web/location-basemap.svg` (152 KB) is drawn from OpenStreetMap data (motorways, national highways, main roads, the Outer Ring Road, the Krishna and other major rivers, Srisailam reservoir) in the site palette, and the green route is the actual driving route from the site to Hyderabad (OSRM over OSM, via Amangal on the Srisailam highway). Towns are placed at their real coordinates. Credit in the legend: "Map data © OpenStreetMap contributors" (required by the ODbL). The site pin is approximate (a point on NH 167K about 3 km from Kalwakurthy) and says so; rebuild with `redesign/tools/build-location-map.cjs` once the surveyed lat/long is known. A small photo callout (aerial thumbnail, "MJR Township · NH 167K · Kalwakurthy") sits beside the pin in step 01.
- The whole map stays in view for all three steps (no zoom; changed at the user's request).
- Step 01 **Right on the highway**: the site, its callout card and Kalwakurthy are highlighted.
- Step 02 **Towards Hyderabad**: the green route **draws itself** from the site north along the Srisailam highway to the airport and Hyderabad, with a gold marker travelling along it.
- Step 03 **Everything else, close by**: Jadcherla, Nagarkurnool and Srisailam light up.
Phones and reduced motion: no pinning; all three steps stacked and the whole map shown with the route drawn (labels drawn larger on phones).

**Below:** a white address card (pin icon, full address, **Show on the map** which loads Google Maps only on tap, **Get directions**, **Copy address**), then **What's nearby** in four columns with line icons: Towards Hyderabad · Schools and colleges · Hospitals · Around Kalwakurthy, and "Drive times will be added once our team confirms them" 🔒.

**Images (Antigravity, wired 11 Nov 2026):** step 01 `location-01-site.webp`; step 02 `location-02-highway` + `location-03-airport`; step 03 `location-04-school` + `location-05-hospital`; the callout uses `location-01-site`. The section pins for 2.4 screens, with a compact layout for screens under 820 px tall. Exact site pin 🔒: the SVG pin sits beside Kalwakurthy (marked `shortcut:` in the markup).

## S07 · Master plan and plot picker (re-laid out 11 Nov 2026)

Same features and ids as before; cleaner layout.
- **Desktop:** left column of two white cards: **Filter** (Road width: Any · 30 ft · 40 ft · Highway; Plot size: All sizes · Up to 150 · 151–200 · 201–300 · Over 300, as pill toggles, the active one in logo green; the live count with the number in large green serif) and **Your plot** (plot list, the selected plot's status, heart, size/road/facing/block, a WhatsApp pill and the indicative note, then the full-width enquiry button). Right: one white card with the plan and a quiet legend row underneath; it stays in view (sticky) beside the longer left column. "Show the whole plan" floats on the plan after zooming to a plot. The selected plot is outlined in green.
- **Tablet:** plan full width, the two cards side by side under it.
- **Phones:** filters, then the plan (scrolls sideways), then the plot card.

## S08 · Infrastructure (navy selector, 11 Nov 2026)

Navy section. Left: INFRASTRUCTURE, "Everything is in place **before you build**" (gold highlight), and six tabs (Roads · Water · Power · EV charging · Security · Drainage), each an icon and a name; the selected tab turns white and shows one line. Right: a large photo that cross-fades to the selected item. Click, hover (desktop) or arrow keys / Home / End change it; it is an ARIA tab list with one tab stop. Phones: the tabs are a swipeable chip row above the photo (the selected chip centres itself) and a caption chip on the photo carries the line.

Photos: Roads `journey-03-roads`, Water `infra-water`, EV `infra-ev`; Power, Security and Drainage use stand-ins until **I1–I3** from [IMAGE-PROMPTS-S08.md](IMAGE-PROMPTS-S08.md) arrive.

## S09 · Site visit (light, 11 Nov 2026)

One white card: photo on the left: **V1 `visit-welcome.webp`**, a site guide welcoming a family at the gate (from [IMAGE-PROMPTS-S09-S12-S13.md](IMAGE-PROMPTS-S09-S12-S13.md)), and on the right: label SITE VISIT, "Walk the plots with our team", one line, three points with icons (stand on the plots, go through the documents, get the price list), **Book a site visit** + a phone pill. The dark-brown card and the decorative cut-out are gone.

## S10 · Life inside the gate (approvals removed 11 Nov 2026)

The approvals block (opening photo, three proof cards, RERA certificate, documents link) was **removed at the user's request**. RERA stays visible in the hero promo card, journey chapter 02, the FAQ and the footer; the menu's "Documents and RERA" link now goes to the FAQ. What remains here is the sideways strip **Life inside the gate** (parks and pergolas · play and fitness · a quiet park for elders), now its own section `#life`.

## S11 · Amenities gallery (removed 11 Nov 2026)

Removed at the user's request, together with its lightbox. The menu and footer "Amenities" links and the Infrastructure "See the amenities" link now go to S10 **Life inside the gate** (`#life`), which still shows the parks, pergolas, play and fitness areas and the elders' park.

## S12 · About MJR + FAQ (navy, 11 Nov 2026)

The one dark-blue section among the later sections (S05 is the other navy block). Navy `#1D2856` with a lighter glow top-left; cream headings, light-blue labels, gold numbers (2012 · 9 · 1,200+ 🔒 confirm) and gold chevrons. FAQ accordion (one open at a time) on the left; on the right a large image that stays in view and changes with the open question, now using the new photography (site aerial, approved drawing, parks, roads, highway, family on their plot). The background is **N1 `about-navy-texture.webp`** (subtle contour lines) under the navy glow.

## S13 · Footer (rebuilt 11 Nov 2026)

1. **Contact band:** a full-width site photo, **C1 `contact-band.webp`** (calm farmland and highway on the left, the layout on the right) under a navy overlay. Left: CONTACT, "Talk to the MJR sales team", one line, and four contact lines with round icons (phone, WhatsApp, email, address). Right: a white **Get a call back** form (name, mobile, I'd like: price list / site visit / investment advice, optional message), posting to `/api/enquiry`.
2. **WhatsApp updates strip:** a white card with a WhatsApp icon, "Price list and updates on WhatsApp", and name + WhatsApp number + Join (`interest=Updates`).
3. **Other MJR projects:** light green cards with a large faint "MJR" monogram, name, town and "Ask about it"; carousel arrows and a green progress line. Real photos 🔒.
4. **Bottom:** light. Logo in its own colours, serif links in green with gold dots, RERA number, website, ©, legal note.

## S14 · Booking dialog (rebuilt 11 Nov 2026)

One `<dialog id="enquiry">` for site visits, plot enquiries and the price list (`data-enquiry="visit|plot|price"`).
- **Desktop:** a centred two-panel card over a blurred navy backdrop. Left: the V1 photo with "How a visit works" (1 we call to fix a time · 2 we meet you at the gate · 3 walk the plots, see the documents, get the price list) and Call / WhatsApp pills. Right: label, dynamic title and line, boxed fields with labels above (name; mobile with a fixed +91 prefix), **When suits you?** chips (This weekend · A weekday · Not sure yet; visits only), an optional note, a full-width gold button, and the privacy line with the RERA number.
- **Phones:** a bottom sheet that slides up, with a photo strip on top and the form below.
- The preferred time is sent inside the lead message ("Preferred time: This weekend · …"), since the server stores one message line. Errors outline the fields at fault; Esc and the backdrop close it.

## S15 · Phone action bar

Not in the reference; kept because MJR buyers act by phone. Phones only: Call · WhatsApp · Book a visit, in the S00 pill style, hidden while the footer form is on screen.

## S16 · Promo popup

**Reference:** after a few seconds, a card slides in bottom-right (image top, dark gradient body, centred heading-m, text, button, close X). Once closed it stays closed.

**Look (11 Nov 2026):** navy card with a gold button, image `journey-05-your-plot.webp`.

**MJR content:** heading "See the plots in person", text "Our team will meet you at the gate and walk you through the roads, parks and plots. Pick a day that suits you.", button **Book a site visit**, image `s03-gate.webp`. ("Every day" was dropped: visiting hours are not confirmed.) Shown once per visitor (browser storage), never on phones while the action bar is visible, and never covering S07.

## S17 · Developer badge

**Reference:** small brand badge fixed bottom-right ("ENDOVER" on red). **MJR:** "MJR INFRA" badge linking to mjrinfra.com.in, in the terracotta accent.

---

## Stage 2 sign-off

| ID | Built | Matches reference (1440 / 768 / 390) | User sign-off | Stage 2 notes |
|---|---|---|---|---|
| S00 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S01 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S02 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S03 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S04 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S05 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S06 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S07 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S08 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S09 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S10 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S11 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S12 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S13 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S14 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S15 | ✅ | – | ⏳ | |
| S16 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
| S17 | ✅ | 🟡 checked at 1440 and 390; 768 not yet | ⏳ | |
