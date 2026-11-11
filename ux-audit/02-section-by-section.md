# 02 · Section-by-section review

The sections are reviewed in page order. Each one has **Works**, **Problems** and **Fix**. Screenshots are in [screenshots/](screenshots/).

Current order: Header → Hero + stats → Why MJR → Location → Master plan → Amenities → Approvals (Trust) → About → FAQ → Contact → Footer

---

## 0. Header and navigation
[index.html:27-98](../index.html#L27-L98) · [screenshots/d-hero.jpg](screenshots/d-hero.jpg)

**Works:** sticky, clean, shows the phone number on desktop, and the scrollspy underline shows where you are on the page.

**Problems**
- The desktop header has **7 links + a phone number + 2 buttons**, which is crowded. "Why MJR", "About" and "Approvals" all answer the same question ("can I trust you?").
- FAQ is not in the top nav, but it is in the footer.
- On phones, the **"Menu" button is the only header action**. The phone number and WhatsApp are missing from the header.
- The menu toggle has no `aria-expanded` and the drawer can't be closed with Esc ([js/main.js:72-86](../js/main.js#L72-L86)).
- The closed drawer is only moved off-screen with `transform`, so keyboard users tab through 11 invisible links ([css/styles.css:535-545](../css/styles.css#L535-L545)).

**Fix**
- Desktop nav: **Location · Plots & Prices · Amenities · Approvals · FAQ**, with the phone number and one gold button.
- Phone header: logo · phone icon · WhatsApp icon · Menu.
- Hide the closed drawer with `visibility: hidden` (or `inert`) and add Esc to close it.

---

## 1. Hero and stats bar
[index.html:115-250](../index.html#L115-L250) · [screenshots/d-hero.jpg](screenshots/d-hero.jpg), [screenshots/m-hero.jpg](screenshots/m-hero.jpg)

**Works:** a strong video and a clear stats bar (7.93 acres · 104 plots · 120–550 sq. yd. · roads · 150 ft highway). Two clear buttons. The stats bar is the best piece of content on the page.

**Problems**
- **The headline says nothing specific.** "A Foundation for Your Future." could belong to any developer, insurer or school. In the 5-second test, a visitor can't tell it's *plots* at *Kalwakurthy* at *a price*.
- The kicker is all-caps and tracked out, and it gets cut off on phones ("…DEVELOPMENT · KALWAKURTHY" wraps awkwardly).
- **There is no price signal.** The `Plots starting from ₹__ Lakhs` line is commented out ([index.html:152-153](../index.html#L152-L153)).
- **On phones the stats bar is pushed below the fold.** The visitor sees the video and two buttons, but none of the five facts.
- A **mute button** is shown on a video that may have no sound ([index.html:134-140](../index.html#L134-L140)). Its icon only swaps through `innerHTML`, and its label doesn't change state.
- The play/pause icon doesn't change for screen readers, because the `aria-label` is always "Toggle Video Playback".
- "Scroll" cue: a decorative extra that pushes the stats down.
- Reduced-motion users get `display:none` on the video. Make sure the poster still shows, so the hero isn't blank.

**Fix**
- Headline: **"Residential plots on the Tirupati Highway, Kalwakurthy"**
- Sub: **"104 RERA-registered plots, 120–550 sq. yd., 5 minutes from Kalwakurthy town. Prices from ₹__ per sq. yd."**
- Buttons: **[WhatsApp for price list]** (gold) · **[View available plots]** (outline)
- On phones, show 3 stats directly under the buttons: *104 plots · 120–550 sq. yd. · RERA ✓*. The rest can scroll sideways.
- Remove the mute button unless the video has audio. Remove the "Scroll" cue.

---

## 2. Why MJR
[index.html:255-338](../index.html#L255-L338) · [screenshots/d-why-mjr.jpg](screenshots/d-why-mjr.jpg)

**Works:** the entrance image is the best visual on the site. The four pillars (Approved · Location · Infrastructure · Growth) are the right topics.

**Problems**
- "Make Your Next Move Count." is another slogan. The paragraph under it ("A property decision is about more than where you buy…") says nothing a buyer can use.
- **The four pillars are the real content, but they're small and sit at the bottom.** The proof is buried under a slogan.
- "Actual entrance render" contradicts itself: "actual" suggests a photo, "render" means it's not real. Buyers in this market have been misled by renders before.
- "Growth Corridor: Rising demand along the Kalwakurthy belt" has no source and no number.
- The image is 6.1 MB.
- The section's CTA ("See the Location") just scrolls to the next section, so it adds nothing.

**Fix**
- Merge this section with the hero stats, or turn it into a **"4 reasons in 10 seconds"** strip with the pillars as the headline content.
- Caption the image **"Entrance: architectural render"**. Add one real site photo next to it, with its date.
- Growth: replace the claim with facts, e.g. *"Proposed Regional Ring Road: ~__ km away · Kalwakurthy–Hyderabad: __ min"*.

---

## 3. Location
[index.html:343-451](../index.html#L343-L451) · [screenshots/d-location.jpg](screenshots/d-location.jpg), [screenshots/m-location.jpg](screenshots/m-location.jpg)

**Works:** grouping by purpose (Hyderabad / Education / Healthcare / Around) is right, and the named landmarks are specific.

**Problems**
- **No distances or travel times anywhere.** "To Hyderabad: Financial District, Gachibowli, RGIA, ORR…" is a list of places with no km and no minutes. This is the single most important location fact for group B.
- **There's no map and no "Get directions" link.** The address appears only as text in Trust and Footer.
- The opening paragraph lists four highway names, which is hard reading for anyone.
- **The cards are `<article>` elements with click handlers** ([index.html:368](../index.html#L368), [js/main.js:865](../js/main.js#L865)). They are not focusable or keyboard-operable, and nothing tells the user they are clickable.
- The video panel shows generic aerial renders (golf courses and towers in [screenshots/d-location.jpg](screenshots/d-location.jpg)) that don't look like Kalwakurthy. Buyers who know the area will notice.
- Each video is **10–19 MB and autoplays**. The location video uses the hero poster ([index.html:441](../index.html#L441)), and it has no pause control.
- On phones the video sits under four long cards. Tapping a card changes a video the user can't see.

**Fix**
- Turn each card into a **distance row**: `Shamshabad Airport · 95 km · 1 hr 45 min`.
- Add a static map image (not an embedded iframe) of the site with major towns marked, and a **"Open in Google Maps"** button.
- Make the video play only on tap, with its own poster, or replace it with the static map.
- Make the cards `<button>`s with `aria-pressed`.

---

## 4. Master plan (plot finder)
[index.html:456-554](../index.html#L456-L554) · [js/main.js:172-670](../js/main.js#L172-L670) · [screenshots/d-master-plan.jpg](screenshots/d-master-plan.jpg), [screenshots/d-plot-selected.jpg](screenshots/d-plot-selected.jpg), [screenshots/m-plot-selected.jpg](screenshots/m-plot-selected.jpg)

**Works (desktop):** this is the site's strongest feature. Clicking a plot zooms to it, outlines its shape, turns the compass, and fills a clear inspector panel (size, direction, road, position, highlights) with an "Enquire about Plot #45" button. A dropdown offers a second way to pick a plot.

**Problems**
- **The data is placeholder.** Sizes are worked out from pixel areas ("251.7 sq. yd." looks precise but is estimated), and Sold/Available and facing are made up. [js/plots-data.js:9-10](../js/plots-data.js#L9-L10) says *"replace them with the sales team's schedule before launch."* Showing these values publicly risks a dispute when a buyer asks for "Plot 45, available, 251.7 sq. yd.".
- **Two data sources disagree.** The map uses `plots-data.js`, which has 104 plots. The schedule list below uses `plots.json`, which has 0. So the filter dims plots on the map while the list underneath says *"Request plots matching…"*.
- **The availability date is hard-coded** as "October 2026" ([js/main.js:6](../js/main.js#L6), [plots.json](../plots.json)). It's already out of date.
- **Phone: the map is unusable.** The 22px pins overlap ("7 7 72", "2 1 0"), there's no pinch or drag, and the +/− buttons zoom around the centre. The filters take a full phone screen before the map appears ([screenshots/m-master-plan.jpg](screenshots/m-master-plan.jpg)).
- **Gold means "sold".** Gold is also the colour of every main button and of "selected", so users read gold plots as highlighted or premium.
- In the legend, "Available" (white square) and "Selected" (white outline) are almost the same.
- The filters sit *above* the map, but their result ("Your preference: …") appears *below* it, so users can't see cause and effect.
- The hint "Click any plot number…" says "click" to people on touchscreens.
- The heading "YOUR FUTURE ADDRESS" doesn't say this is where you choose a plot.

**Fix**
- **Until real data arrives:** show plot numbers and the layout only, and replace the size, facing and status text with *"Ask for current size and price"*. Or label everything **"Indicative: confirm with sales"**.
- One data source: make `plots.json` the source of truth and generate the map from it.
- Status colours: **Available = green**, **Sold = grey with a cross-hatch**, **Selected = gold ring**. Keep gold for actions only.
- Filters: show a live count next to them ("**23 plots match**").
- Phone: start with a **list view** (cards sorted by size, filtered), plus a "View on map" toggle that opens a full-screen map you can pinch and drag.
- Rename the section **"Choose your plot"** and the nav link **"Plots & Prices"**.

---

## 5. Amenities
[index.html:559-844](../index.html#L559-L844) · [screenshots/d-amenities.jpg](screenshots/d-amenities.jpg), [screenshots/m-amenities.jpg](screenshots/m-amenities.jpg)

**Works:** good photography, sensible Live/Play/Relax grouping, and keyboard arrow navigation between amenities.

**Problems**
- **It's over-built for 10 items.** It has 3 levels of interaction (category accordion → amenity tab → prev/next stepper), plus a separate inline preview on phones. Each image appears **3 times in the DOM** (thumbnail, inline preview, stage).
- The JavaScript **preloads all 10 full-size images on page load** ([js/main.js:692-698](../js/main.js#L692-L698)), about 30 MB, which cancels out `loading="lazy"`.
- `role="tablist"` wraps accordion buttons that aren't tabs. That's invalid ARIA ([index.html:584](../index.html#L584)), and the heading jumps from `h2` to `h4` ([index.html:820](../index.html#L820)).
- **Done vs planned is unclear.** "EV charging: provision… with a station planned". Is the pool built? Buyers need to know what exists and what is promised.
- There are 3 headlines in one section: "A LITTLE MORE SPACE TO LIVE WELL." + "MORE THAN YOU EXPECT. EXACTLY WHAT YOU NEED." + "LIVE / PLAY / RELAX".
- The images look like generic stock or AI renders (the pool shows a tropical resort).

**Fix**
- Replace the section with a **simple grid of 10 photo cards** (2 columns on phones, 5 on desktop). Each card has an image, a name, and a status tag: **Ready**, **Under construction** or **Planned**. Tapping a card opens a lightbox. No accordion, tabs or stepper.
- One headline, one disclaimer line.

---

## 6. Approvals (Trust)
[index.html:849-881](../index.html#L849-L881) · [screenshots/d-trust.jpg](screenshots/d-trust.jpg)

**Works:** the RERA number and full survey address are stated plainly, and "we will walk you through the documents" is the right promise.

**Problems**
- The RERA number is **not a link** to the TG RERA portal, so it can't be checked in one click.
- The approval type (DTCP/HMDA/GP), bank-loan eligibility and title-clearance details are missing. These are what buyers ask about.
- The folder image is a mock-up, not the certificate.
- The section sits **6th**, after amenities. Trust is a reason to keep reading, so it belongs near the top.

**Fix**
- Move it up so it comes right after the location (see the proposed order below).
- Use a checklist layout: ✓ TG RERA P01600010465 *(verify →)* · ✓ DTCP approved · ✓ Clear title, survey no. 720 & 729 · ✓ Loans from SBI / HDFC / … · ✓ Documents shared before booking.

---

## 7. About MJR
[index.html:886-970](../index.html#L886-L970) · [screenshots/d-about-mjr.jpg](screenshots/d-about-mjr.jpg)

**Problems**
- "Since 2012" and "12+ years of experience" say the same thing twice.
- The past projects are text pills only, with no photos, plot counts or "fully sold" status.
- The MD quote is generic and the MD has no photo. "Our approach" restates the brand promise.
- **No customer voices.** There are 1,200+ families served but not one testimonial.

**Fix:** stats → **2012 · 9 projects · 1,200+ families**. Past projects as photo cards ("MJR Greens, Jadcherla · 120 plots · Sold out 2019"). Add 2–3 short buyer testimonials with name and town, or a 30-second video, ideally in Telugu.

---

## 8. FAQ
[index.html:975-1087](../index.html#L975-L1087) · [screenshots/d-faq.jpg](screenshots/d-faq.jpg)

**Problems:** only 7 questions, and 4 repeat information already on the page (location, plot count, gated community, RERA). The **hard questions** are missing.

**Add:** Is it DTCP approved? · Can I get a bank loan? · What's the booking amount and payment schedule? · Are registration and stamp duty extra? · When can I start building? · Is water and electricity connected to each plot? · Can NRIs buy, and how do I pay from abroad? · What are the maintenance charges? · Can I resell?
Also add `FAQPage` JSON-LD so the answers appear in Google results.

---

## 9. Contact / enquiry
[index.html:1092-1172](../index.html#L1092-L1172) · [screenshots/d-contact.jpg](screenshots/d-contact.jpg)

**Problems**
- **The form doesn't send anything** ([js/main.js:978-985](../js/main.js#L978-L985)).
- The phone placeholder is **MJR's own number**, `+91 90100 55596` ([index.html:1135](../index.html#L1135)). It looks pre-filled, and users may think it's already done.
- Left and right columns compete. There's a slogan box with "Book a Site Visit" + "Call Sales" *next to* a form, so the user sees three actions at once.
- The heading "A PLACE TO BUILD YOUR FUTURE." doesn't say "contact us".
- No office address, hours, map or WhatsApp. The callback select says "business hours" but the hours aren't stated.

**Fix:** heading **"Talk to our sales team"**. Left column: phone, WhatsApp, email, office address with a map link, and hours. Right column: the form, using the placeholder *"10-digit mobile number"*. Remove the slogan box.

---

## 10. Footer
[index.html:1179-1248](../index.html#L1179-L1248)

Fine overall. Minor issues: the headings are `h4` with no `h3` above them; "Other Projects" aren't links; the copyright year is hard-coded. Add WhatsApp and social links.

---

## Proposed section order

Ordered by the buyer journey in [01-audience-and-goals.md](01-audience-and-goals.md): qualify → trust → explore → act.

| # | Section | Change from today |
|---|---|---|
| 1 | **Hero**: what, where, price from, 3 key stats | Rewritten |
| 2 | **Why buy here**: 4 reasons with facts | Why MJR, made shorter |
| 3 | **Location**: distances and map | Moved up one place, gains numbers |
| 4 | **Approvals and loans**: checklist | Moved up from 6th |
| 5 | **Choose your plot**: map / list | Same place, mobile list view |
| 6 | **Amenities**: simple grid with status | Simplified |
| 7 | **About MJR and buyer stories** | Gains testimonials |
| 8 | **FAQ**: 10–12 hard questions | Expanded |
| 9 | **Talk to us**: contact channels + form | Simplified |

Estimated phone length after the changes: about 9–10 screens, down from about 17.
