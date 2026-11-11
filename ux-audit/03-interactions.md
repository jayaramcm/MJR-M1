# 03 · Interaction breakdown

Every interactive element on the page, how it works today, where it fails (desktop / phone / keyboard / screen reader), and how it should work.

Legend: ✅ works · ⚠️ partly · ❌ broken or missing

---

## Inventory

| # | Component | Where | Desktop | Phone | Keyboard | Screen reader |
|---|---|---|:-:|:-:|:-:|:-:|
| 1 | Sticky header + scrollspy | [index.html:27](../index.html#L27), [main.js:48](../js/main.js#L48) | ✅ | ⚠️ | ✅ | ⚠️ |
| 2 | Mobile menu drawer | [index.html:77-98](../index.html#L77-L98) | – | ⚠️ | ❌ | ❌ |
| 3 | Hero video play / mute | [index.html:127-141](../index.html#L127-L141) | ⚠️ | ⚠️ | ✅ | ❌ |
| 4 | WhatsApp floating button | [index.html:101-109](../index.html#L101-L109) | ⚠️ | ❌ hidden | ✅ | ⚠️ |
| 5 | Location cards → video | [index.html:367-448](../index.html#L367-L448) | ⚠️ | ❌ | ❌ | ❌ |
| 6 | Plot filters (size / road) | [index.html:474-496](../index.html#L474-L496) | ⚠️ | ⚠️ | ✅ | ⚠️ |
| 7 | Master plan map (pins, zoom) | [main.js:172-340](../js/main.js#L172-L340) | ✅ | ❌ | ⚠️ | ⚠️ |
| 8 | Plot dropdown + inspector | [main.js:342-505](../js/main.js#L342-L505) | ✅ | ✅ | ✅ | ⚠️ |
| 9 | Plot schedule (results list) | [main.js:555-640](../js/main.js#L555-L640) | ⚠️ | ⚠️ | ✅ | ⚠️ |
| 10 | Amenities accordion + tabs + stepper | [index.html:582-825](../index.html#L582-L825) | ⚠️ | ⚠️ | ✅ | ❌ |
| 11 | FAQ accordion | [main.js:887-906](../js/main.js#L887-L906) | ✅ | ✅ | ✅ | ⚠️ |
| 12 | Modals (Visit / Brochure / Plot) | [index.html:1266-1330](../index.html#L1266-L1330) | ⚠️ | ⚠️ | ❌ | ❌ |
| 13 | Enquiry form + interest chips | [index.html:1125-1168](../index.html#L1125-L1168) | ❌ | ❌ | ⚠️ | ⚠️ |
| 14 | Mobile sticky action bar | [index.html:1253-1260](../index.html#L1253-L1260), [main.js:1000](../js/main.js#L1000) | – | ⚠️ | ✅ | ✅ |

---

## 1. Header and scrollspy
- **Now:** nav links scroll smoothly to `sectionTop − 82px` ([main.js:96](../js/main.js#L96)). Scrollspy runs on every scroll event and reads `offsetTop` for every section ([main.js:104-116](../js/main.js#L104-L116)).
- **Problems:** the 82px offset is hard-coded while the header height is a CSS variable, so they can drift apart. Footer links and the hero buttons (`#master-plan`, `#location`) don't use this handler, so they rely on native jumps and **land under the sticky header** because no section has `scroll-margin-top`. The active link has no `aria-current`. Smooth scrolling ignores `prefers-reduced-motion`.
- **Should:** add `section[id] { scroll-margin-top: var(--header-height) }` in CSS and delete the JS offset maths. Use `IntersectionObserver` for scrollspy and set `aria-current="true"`. Wrap `scroll-behavior: smooth` in `@media (prefers-reduced-motion: no-preference)`.

## 2. Mobile drawer
- **Now:** opens with a class plus `body overflow:hidden`. It closes on ✕, on a backdrop tap, or when a link is tapped.
- **Problems:** Esc doesn't close it. Focus isn't moved into the drawer or trapped there, and isn't returned to "Menu" afterwards. The toggle has no `aria-expanded` or `aria-controls`. **When closed, the drawer is still in the tab order** because it's only moved with `transform`. There's no `overscroll-behavior: contain`, so the page behind scrolls on iOS.
- **Should:** use a `<dialog>` element, or add `inert` and `visibility:hidden` when closed. Move focus to the first link on open, close on Esc, and return focus to the toggle.

## 3. Hero video controls
- **Now:** pause toggles playback and swaps the icon through `innerHTML`; mute toggles sound.
- **Problems:** the `aria-label` stays "Toggle Video Playback" whatever the state. Mute is shown even if the clip has no audio. Under reduced motion the whole video *and its controls* are hidden (`display:none`, [css/styles.css:696-701](../css/styles.css#L696-L701)), so check that the poster still appears behind them.
- **Should:** use `aria-pressed` and change the label ("Pause video" / "Play video"). Remove mute if there's no audio. Pause the video when it scrolls off-screen, which also saves battery.

## 4. WhatsApp floating button
- **Now:** a bottom-right green circle with a generic chat-bubble icon on desktop. **Hidden at ≤900px** ([css/styles.css:3301-3303](../css/styles.css#L3301-L3303)).
- **Problems:** hidden exactly where WhatsApp is used most, on phones. The icon isn't the WhatsApp logo, so it isn't recognised. The label says "WhatsApp or Call", but it only opens WhatsApp.
- **Should:** on phones, put WhatsApp inside the sticky bar (see #14). On desktop, keep the floating button with a WhatsApp glyph and a short "Chat on WhatsApp" label on hover/focus.

## 5. Location cards → video
- **Now:** clicking an `<article>` swaps the `<source>` and calls `video.load()` ([main.js:860-882](../js/main.js#L860-L882)).
- **Problems:** articles can't be focused, so **keyboard and screen-reader users can't use this at all**. Nothing shows the cards are clickable: no hover cursor, and no "▶ watch" hint. Each switch downloads a new **10–19 MB** file. On phones the video sits *below* the four cards, so tapping changes something off-screen. The video never pauses and has no controls.
- **Should:** if the video stays, make the cards `<button aria-pressed>`, show a "▶ Watch the route" label, use `preload="none"` with a poster per card, and scroll the video into view on phones. **Better:** replace the video with distance rows and a static map (see [02](02-section-by-section.md#3-location)). Then there's nothing to interact with, which is the cleaner choice.

## 6. Plot filters
- **Now:** single-select chips; changing one re-renders the schedule and dims pins on the map.
- **Problems:** the chips have no `aria-pressed`. **There's no visible count** of matching plots near the chips. The result message appears *below* the map, out of view. On phones the filter card fills a whole screen before the map ([screenshots/m-master-plan.jpg](screenshots/m-master-plan.jpg)). There are two "Reset" controls (the zoom Reset and the filter Reset), which is confusing. The filter state isn't in the URL, so a buyer can't share "40 ft plots over 300 sq. yd." with family.
- **Should:** a compact filter row ("Size ▾ · Road ▾ · **23 plots**"), with `aria-pressed` on the chips and the state in the URL (`?size=300+&road=40`). On phones, use one horizontal scrollable chip row.

## 7. Master plan map
- **Now (desktop):** a plot click zooms ×2.45 to the plot, outlines it, turns the compass to its facing and fills the inspector. Clicking empty map resets. +/− change the zoom between 0.75 and 2.0.
- **Problems**
  - **Phone:** the 22×22px pins with 10.5px text ([css/styles.css:1627-1635](../css/styles.css#L1627-L1635)) **overlap and can't be read**. There's no pinch-zoom or drag-pan. The +/− buttons zoom around the centre, not where you're looking. Accurate tapping is impossible, since the recommended minimum target is 44px.
  - **Unclear:** clicking the selected plot again *deselects* it, and clicking empty grass resets everything. Both are easy to do by accident.
  - **Meaning:** gold = Sold, gold = buttons, gold = "selected" ring. The legend's "Available" and "Selected" swatches look the same.
  - **Keyboard:** 104 pins are 104 tab stops. There's no arrow-key movement and no "skip map" link.
  - **Screen reader:** the pin labels are good ("Plot 45, Available"), but the 104 buttons have no list or grouping, and selecting one gives no announcement except the inspector's `aria-live` re-rendering the *whole* panel, which is noisy.
  - The panel is redrawn with `innerHTML` on every selection, which loses focus if the user was in the dropdown.
- **Should**
  - **Phone:** show a list first ("Plots matching your filters", as cards). A "Map" toggle opens the map full-screen with pinch and pan, and pins scale up to a 32px minimum as you zoom in.
  - Selecting a plot stays put until the user taps ✕ or another plot. Tapping empty space does nothing.
  - Colour meaning: see [07-color-system.md](07-color-system.md#status-colours-master-plan).
  - Keyboard: make the pins a `role="grid"` with arrow-key movement (one tab stop), plus a "Skip map, use dropdown" link.
  - Update only the changed fields in the inspector, and announce a short line ("Plot 45 selected, 251 sq. yd., available").

## 8. Plot dropdown and inspector
- **Works well:** the label, keyboard use and native select are fine on phones.
- **Problems:** the dropdown has 104 options in the format "Plot #45 — 251.7 sq. yd. (Available)", which is long to scroll on phones. The disabled "Not for sale" button uses inline styles ([main.js:400](../js/main.js#L400)). The panel kicker repeats information in all-caps gold.
- **Should:** group the options with `<optgroup>` by block (A1, B2, …), round the sizes, and show availability only after the data is real.

## 9. Plot schedule
- **Now:** because [plots.json](../plots.json) is empty, it always shows "Request plots matching…" with a "Get Matching Plots" button.
- **Problems:** it contradicts the map, which already knows the sizes. It uses an inline `onclick` with string-built arguments ([main.js:577](../js/main.js#L577)). When it is populated, a table with 104 rows and a "Enquire About This Plot" button on each would be heavy on phones.
- **Should:** one data source. On phones, render cards (Plot · size · road · facing · [Enquire]) and limit to 10 with a "Show more".

## 10. Amenities
- **Now:** three levels of control. A category trigger expands the category and selects its first item; amenity rows are `role="tab"` with arrow-key support; prev/next arrows cycle through all 10; and on phones a second inline image expands under the row.
- **Problems:** `role="tablist"` contains accordion buttons and tabs at the same time, which is invalid ARIA. The stage, caption, details and stepper are **four live regions** announcing the same change. On phones, the category trigger *collapses* the group if it's already open, but on desktop it *selects* instead, so the same control behaves differently. Users have no reason to step through amenities one at a time.
- **Should:** a static photo grid with a "Ready / Planned" tag. Tapping a card opens a simple lightbox (a `<dialog>` with prev/next and Esc). It has one pattern and no hidden state.

## 11. FAQ
- **Works:** one open at a time, `aria-expanded` updates.
- **Problems:** no `aria-controls`/`id` link; the "+" indicator doesn't turn into "−"; only one answer can be open at a time, so answers can't be compared.
- **Should:** native `<details><summary>`, which gives keyboard support, screen-reader support and find-in-page (Ctrl+F) for free. Allow several open at once.

## 12. Modals
- **Now:** a class toggles visibility. Esc, the backdrop or ✕ closes it.
- **Problems**
  - **Focus is never moved into the dialog**, not trapped, and not returned afterwards ([main.js:939-948](../js/main.js#L939-L948)). Keyboard users stay on the page behind it.
  - Labels aren't linked to inputs (no `for`/`id`, [index.html:1273-1278](../index.html#L1273-L1278)).
  - **"Download Brochure" downloads nothing**: it shows an `alert()` and closes.
  - The "Book a Site Visit" form asks for a *callback time* in free text, not a *visit date*.
  - `alert()` is used as the success message ([main.js:990](../js/main.js#L990)).
- **Should:** native `<dialog>` with `showModal()`, which gives focus trapping and Esc handling for free. Labelled inputs. Brochure: after the form, **start the PDF download and send it on WhatsApp**. Visit: a date picker (next 14 days) and a time slot. Replace `alert()` with an in-dialog success state ("Booked for Sat 15 Nov, 11 am. We'll confirm on WhatsApp.").

## 13. Enquiry form
- **Problems:** no submission (see the README). No `name`/`autocomplete` attributes. The placeholder is the company's phone number. No validation of 10-digit Indian mobile numbers (`pattern="[6-9][0-9]{9}"`, `inputmode="numeric"`). The interest chips have no `aria-pressed` and only allow one choice, though "Investment" plus "Price details" is common. The success message is always in the DOM and shown by changing `display`, so screen readers may not announce it. The "Buying a plot" option duplicates the form's whole purpose.
- **Should:** 2 required fields (name, mobile) and 1 optional chip set. Show a sending state on the button ("Sending…"), then a success message focused for screen readers. Put error text next to each field.

## 14. Mobile sticky bar
- **Now:** "Book a Site Visit" + "Call", dark green background. It hides when the contact section, the plot inspector, a modal or the keyboard is visible.
- **Problems:** WhatsApp is missing. The dark bar takes **about 8% of every phone screen** and adds to the "heavy" feel. It hides *while the plot inspector is in view*, which is exactly when a buyer wants to call about that plot. The `visualViewport` keyboard detection runs alongside focusin/out, so the two can disagree.
- **Should:** **[Call] [WhatsApp] [Book visit]** on a white bar with a hairline top border (see [07](07-color-system.md)). Keep it visible on the master plan, and change the middle button to "WhatsApp about Plot 45" when a plot is selected.

---

## Interaction principles for the redesign

1. **One pattern per job.** Choosing = list or map. Browsing = grid. Questions = details/summary. Contact = 3 channels.
2. **Nothing important is hidden behind an interaction.** Distances, prices, statuses and approvals are visible without clicking.
3. **Every action says what happens next.** "WhatsApp for price list", not "Get Matching Plots".
4. **Phone first:** 44px targets, thumb-reach actions at the bottom, no hover-only cues.
5. **Native elements first:** `<dialog>`, `<details>`, `<button>`, `<select>`. Less custom JavaScript means fewer accessibility bugs.
