# Image brief for Antigravity: Site visit (S09), About + FAQ (S12) and Contact (S13)

**Task for the agent:** generate the 3 images below, save them in `Assets/source/` with the exact file names given, then convert them with the commands in [step 4](#4-convert-to-web-files). **Do not edit `index.html`, `css/` or `js/`, and do not overwrite or delete any existing file.** Each image has a new, unique name; the website team swaps them in afterwards.

**Project in one line:** MJR Township is a gated **plotted** development (open residential plots, not houses or apartments): 104 plots on 7.93 acres on the 150 ft Tirupati Highway (NH 167K) at Kalwakurthy, Telangana, India. Buyers buy land and build later.

---

## 1. Where the images go

| ID | Section | What the slot looks like | Today (stand-in) |
|---|---|---|---|
| **V1** | S09 · Site visit: white card, photo on the left, "Walk the plots with our team" on the right | Photo fills the left half of the card, about 670 × 540 px on desktop (roughly 5:4); full width 16:10 on phones | `journey-05-your-plot.webp` (family on a plot) |
| **C1** | S13 · Contact band: full-width photo behind the contact block, deep navy overlay on the **left 55 %**, white enquiry form floating on the **right** | Full width × about 780 px on desktop (about 2:1); tall portrait crop on phones | `location-01-site.webp` (aerial) |
| **N1** | S12 · About MJR + FAQ: navy section (`#1D2856`) | Full-screen **background texture** behind cream text, a large image on the right and gold numbers | plain navy gradient |

---

## 2. Style rules

| Rule | Detail |
|---|---|
| Light (V1, C1) | Clear **early-morning sun**, warm and low from the left, soft long shadows, pale sky. Never night or full sunset. |
| Colour | Natural and warm, saturation about 15 % below a typical render; red-brown soil, olive greens, cream stone. Must sit well beside deep navy `#1D2856` and warm sand `#F4EBE4`. |
| The site | Blacktop 30/40 ft roads with white kerbs, covered drains, slim streetlights, young avenue trees, a cream compound wall, the timber-and-stone entrance gate. **Plots are empty land** with small white boundary stones. **No houses or apartments.** |
| People | Natural Indian people, never posed to camera. **No one may be presented as a specific MJR employee**: no name badges, no logo shirts. |
| Text | **No text, lettering, logos, numbers, flags with lettering or signage words anywhere.** |
| Camera | Realistic photographic render, 35 mm feel, level horizon, no fisheye, no vignette, no lens flare. |

**Negative prompt (add to every generation):**
`text, letters, words, logo, watermark, name badge, uniform logo, signage lettering, flags with logos, numbers, night, sunset, neon, oversaturated, purple, skyscrapers, apartments, houses on plots, villas, golf course, fisheye, lens flare, heavy vignette, blurry, distorted geometry, extra fingers, deformed hands`

**Attach as references:** `Assets/entrance-mjr.jpg` (gate design; copy the gate, not its flags), `Assets/source/hero-aerial.png` (site layout), `Assets/source/internal-road.png` (road, kerb and streetlight style).

---

## 3. The images

### V1 · Site visit welcome (S09)

| Save as | `Assets/source/visit-welcome.png` · **1600 × 1280 (5:4)** |
|---|---|

> Realistic eye-level photograph at the entrance of a new gated plotted layout in Telangana, early morning. Just inside the timber-and-stone entrance gate, a friendly site guide in a plain light-blue shirt and beige trousers (no badge, no logo) welcomes an Indian family of three who have just arrived: the guide gestures warmly towards the layout, the father holds a folded site plan (lines only, no writing), the mother and a young child look along the road. Behind them a 40 ft blacktop road with white kerbs, streetlights and young avenue trees runs into the layout, with empty levelled plots on both sides. Warm low sunlight from the left, natural, relaxed, welcoming mood. Keep the people in the centre-left two thirds; the right edge can be road and trees.

**Check:** nobody looks into the camera; no text on shirts, plan or gate; empty plots; daylight.

### C1 · Contact band background (S13)

| Save as | `Assets/source/contact-band.png` · **2400 × 1200 (2:1)** |
|---|---|

> Realistic wide aerial photograph from about 150 m, early morning, of the gated plotted layout from the reference: the entrance gate on the four-lane highway, cream compound wall, a grid of blacktop internal roads with streetlights and young trees, two green parks, **empty plots**. Compose it so that the **left 55 % of the frame is calm**: soft morning sky, distant hazy farmland and the highway running away into the distance, with no strong details there. The layout itself sits in the **right 45 %**. Warm low sunlight, gentle haze, quiet and premium.

**Check:** the left half is calm enough for white text over a navy overlay; the layout is on the right; no text; no buildings on the plots.

### N1 · Navy topographic texture (S12)

| Save as | `Assets/source/about-navy-texture.png` · **2400 × 1350 (16:9)** |
|---|---|

> Abstract, very dark background: fine flowing topographic contour lines, like a land-survey map, drawn in slightly lighter navy over a deep navy base (#1D2856 to #111836), a soft brighter glow in the top-left corner, faint and elegant, low contrast, smooth gradients, subtle paper grain. No text, no numbers, no objects, no people.

**Check:** dark enough that cream text (`#FCF8F4`) and small light-blue labels (`#9FA9CF`) stay easy to read anywhere on it; contour lines stay subtle; nothing bright in the middle.

---

## Do **not** generate

| Item | Why | Who supplies it |
|---|---|---|
| Photos of other MJR projects (Greens, Enclave, Meadows) for the footer carousel | Must be real; a generated image would misrepresent a real project | MJR |
| Portraits of the sales team or the MD | Real people the visitor will meet | MJR |
| Logos, the RERA certificate, maps | Brand files and legal documents already in `Assets/` | – |

---

## 4. Convert to web files

From the project root (ffmpeg is installed):

```bash
cd Assets
ffmpeg -y -i source/visit-welcome.png      -vf "scale=1400:-2" -c:v libwebp -quality 72 web/visit-welcome.webp
ffmpeg -y -i source/contact-band.png       -vf "scale=2000:-2" -c:v libwebp -quality 70 web/contact-band.webp
ffmpeg -y -i source/about-navy-texture.png -vf "scale=1920:-2" -c:v libwebp -quality 65 web/about-navy-texture.webp
```

**Size targets:** V1 under 220 KB, C1 under 320 KB, N1 under 150 KB. If larger, lower `-quality` by 5 and run again.

## 5. Hand-back checklist

- [ ] 3 originals in `Assets/source/` and 3 WebP files in `Assets/web/`, exact names as above.
- [ ] Each image passes its own check and the style rules (no text anywhere, empty plots, daylight for V1 and C1).
- [ ] C1 has a calm left half; N1 is dark and subtle.
- [ ] No existing file was overwritten or deleted; `index.html`, `css/` and `js/` are unchanged.
- [ ] Reply with the file list, sizes in KB, and anything you're unsure about.

## 6. For the website team (after delivery)

| Slot | Change |
|---|---|
| V1 | In S09, `<img class="visit-img">`: `src="Assets/web/visit-welcome.webp" width="1400" height="1120"`, alt "Our team welcoming a family at the MJR Township gate". |
| C1 | In S13, `<img class="contact-bg">`: `src="Assets/web/contact-band.webp" width="2000" height="1000"`. Check the overlay still keeps the left text readable. |
| N1 | In `css/styles.css`, S12 `.tabs { background: … }`: add `url(../Assets/web/about-navy-texture.webp) center / cover` as the last layer, under the two existing gradients. |
