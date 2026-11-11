# Image brief for Antigravity: MJR Township website

**Task for the agent:** generate or edit the images listed below, save them with the exact file names given, and convert them to web files with the commands in [step 4](#4-convert-to-web-files). **Do not edit `index.html`, `css/` or `js/`.** Wiring the images into the page is tracked separately in [TRACKER.md](TRACKER.md) (Phase 5).

**Project in one line:** MJR Township is a gated **plotted** development (open residential plots, not houses or apartments) of 104 plots on 7.93 acres, on the 150 ft Tirupati Highway (NH 167K) at Kalwakurthy, Telangana, India. Buyers buy land and build later.

**Look (updated 11 Nov 2026):** the site now uses the Volta SKAI look: warm sand backgrounds, brown ink, large rounded images. Images should feel warm and soft so they sit on that palette. Section IDs (S02, S03 …) refer to [SECTION-MAP.md](SECTION-MAP.md).

---

## 0. Slot map: which image goes where

Every image slot on the new page, its ratio, what fills it today, and what replaces it. "Today" files already exist; the page uses them until the IMG file is delivered.

| Slot | Ratio (desktop / phone) | Today | Replace with |
|---|---|---|---|
| S01 menu hover images (9) | 4:5 | Reused from the slots below | – |
| S02 hero | full screen | Video `hero-compressed.mp4` (phones: `web/hero-video-960.mp4`), poster `web/hero-video-poster.webp` | – (IMG-01/02 now used in S06, S12, menu) |
| S02 promo card image | half card | `web/internal-road.webp` | ✅ IMG-03 |
| S03 card 1 · gate and wall | 3:2 | `web/s03-gate.webp` | – |
| S03 card 2 · roads | 3:2 | `web/internal-road.webp` | ✅ IMG-03 |
| S03 card 3 · parks | 3:2 | `web/s03-parks.webp` | ✅ IMG-09 |
| S03 card 4 · layout | 3:2 | `web/s03-layout.webp` (top-down plan render) | – |
| S04 portrait | 4:5 | none (placeholder) | Real photo of the MD 🔒, not generated |
| S06 location track (6 images) | 9:8 and 4:5 | `web/hero-aerial-1600.webp`, `web/loc-1…3.webp` (stills from the location videos, soft), `web/loc-temple.webp` | Sharper Hyderabad / airport renders (P3) |
| S08 infrastructure pair | 3:2 + 3:4 | `web/infra-water.webp`, `web/infra-ev.webp` | ✅ IMG-13, IMG-14 |
| S09 site-visit image | half card | `web/visit-pavilion.webp` | Real photo of the sales manager 🔒, not generated |
| S09 decorative cut-out | free, transparent | `web/cutout-gazebo.webp` | – |
| S10 expanding image | full screen | `web/documents-desk.webp` | ✅ IMG-15 |
| S10 certificate | 2:3 | `web/rera-certificate.webp` | – (real scan) |
| S10 track #2 (6 images) | 9:8 and 4:5 | `web/amenity-*.webp` | ✅ IMG-05–14 |
| S11 gallery (11) | 15×24, 18×22, 25×18 rem crops | `web/amenity-*.webp`, `web/gallery-grass.webp` | ✅ IMG-05–14 |
| S12 background | full screen 16:9 | CSS dark gradient | **IMG-16 still needed** |
| S12 accordion images (6) | 4:5 | reused renders | – |
| S13 other projects (3) | 2:1 | none (placeholder) | Real photos 🔒, not generated |
| S16 popup image | 2:1 | `web/og-share.webp` | ✅ IMG-04 |

---

## 1. Style rules for every image

| Rule | Detail |
|---|---|
| Light | **Warm, soft daylight**: late morning or early golden hour, sun low from the left, pale warm sky. Never night, full sunset or harsh noon. |
| Colour | Warm and natural: greens leaning olive, soil and stone warm beige, highlights creamy. Saturation about 15% lower than a typical real-estate render, so images sit on the sand (`#F4EBE4`) page. No purple, navy or cold blue casts. |
| Place | Telangana, Deccan plateau: flat to gently rolling land, red-brown soil, neem, palm and rain trees, bougainvillea. Not a tropical resort, not a golf course, no skyscrapers. |
| What's built | Blacktop internal roads (30 ft and 40 ft wide), kerbs, drains, streetlights, avenue trees, a compound wall and the entrance gate. **Plots are empty land** with small boundary stones at the corners. No houses on the plots. |
| People | Optional, small and natural (an Indian family walking, an older couple). Never posed close-ups. |
| Text | **No text, signage lettering, logos or numbers anywhere in the image.** AI text comes out garbled. The site adds its own captions. |
| Camera | Realistic architectural render, 35 mm feel, horizon level, no fisheye, no heavy vignette, no lens flare. |

**Global negative prompt (add to every generation):**
`text, letters, words, logo, watermark, signage lettering, numbers, night, deep sunset, neon, oversaturated, cold blue cast, purple, navy, skyscrapers, high-rise, apartments, villas on plots, houses on plots, golf course, snow, fisheye, lens flare, heavy vignette, blurry, distorted geometry, extra limbs`

---

## 2. Reference files to attach

| File | Why |
|---|---|
| `Assets/entrance-mjr.jpg` | The real gate design and highway frontage. Match the gate's shape, timber and stone, and the palm-lined road behind it. |
| `Assets/layout MJR.png` | The real layout: a long site with a diagonal boundary on the north-east side, a grid of internal roads, park areas and the 150 ft highway along the bottom edge. Aerial images must follow this shape. |
| `Assets/Top-Down Residential Landscape Masterplan.png` | Planting and road style seen from above. |
| `Assets/web/amenity-*.webp` | The current amenity set, for the regrade task (P2). |

---

## 3. The images

Priority: **P1** is needed for the redesign, **P2** improves consistency, **P3** is optional.

### IMG-01 · Hero, daytime aerial (desktop): P1

| | |
|---|---|
| Used in | S02 hero, full screen behind the title (keep the centre calm: a large serif title sits on it); crops also feed S03 card 4, S06 and S12 |
| Save as | `Assets/source/hero-aerial.png` |
| Size | 2400 × 1350 (16:9) |
| Attach | `entrance-mjr.jpg`, `layout MJR.png` |

**Prompt**
> Realistic architectural aerial render, three-quarter view from about 120 m up and slightly in front of the site, looking across a gated residential plotted development in Telangana, India, on a clear morning. In the foreground a wide 150 ft four-lane highway with a few cars runs left to right. On the far side of the highway stands the entrance gate from the reference image: a timber-clad portal on stone pillars, set into a low cream compound wall. Behind the gate, a neat grid of black asphalt internal roads with white kerbs, streetlights and young avenue trees divides the land into rows of **empty, levelled residential plots** with small white boundary stones at each corner and light-brown soil with patches of grass. The site boundary on the right runs diagonally away from the highway, lined with trees. Two small landscaped parks with a terracotta-roofed pavilion sit inside the layout. Beyond the site: open farmland, scattered neem and palm trees, a soft hazy horizon. Warm morning sunlight from the left, gentle shadows, natural sage-green palette, slightly muted saturation, crisp detail.

**Check before saving**
- [ ] Plots are empty land (no houses).
- [ ] The highway is in the foreground and the gate faces it.
- [ ] A diagonal boundary is visible, matching the layout reference.
- [ ] No text, logos or flags with lettering.
- [ ] Daylight, not dusk.

### IMG-02 · Hero, phone crop: P1

| | |
|---|---|
| Used in | S02 hero on phones (full screen) |
| Save as | `Assets/source/hero-aerial-portrait.png` |
| Size | 1080 × 1920 (9:16) |
| Attach | IMG-01 |

**Prompt**
> Recompose the attached aerial render as a 9:16 portrait: keep the entrance gate in the lower third, centred, with the highway along the bottom and the grid of internal roads and empty plots rising up the frame towards the horizon. Same light, colours and detail as the source. Do not add anything new.

### IMG-03 · Internal road at eye level: P2

| | |
|---|---|
| Used in | S03 card 2 (roads) and the S06 location track |
| Save as | `Assets/source/internal-road.png` |
| Size | 2000 × 1333 (3:2) |
| Attach | `entrance-mjr.jpg` (for materials) |

**Prompt**
> Realistic eye-level render standing in the middle of a 40 ft black asphalt internal road inside a new gated plotted layout in Telangana, India, on a clear morning. White concrete kerbs and a covered storm-water drain on both sides, slim modern streetlights every 30 m, a row of young neem and rain trees with tree guards. On both sides, empty levelled residential plots with light-brown soil, low grass and small white corner boundary stones. In the distance, the inside of a low cream compound wall and a small park with a terracotta-roofed pavilion. One Indian family of three walking away from the camera at the edge of the road, small in frame. Warm morning sunlight from the left, long soft shadows, sage-green and earth palette, slightly muted saturation.

**Check:** empty plots; drains, kerbs, streetlights and trees visible; no text.

### IMG-04 · Social share image: P2

| | |
|---|---|
| Used in | Link previews (`og:image`), and crops for the S02 promo card and S16 popup |
| Save as | `Assets/source/og-share.png` |
| Size | 1200 × 630 |
| Attach | IMG-01 (or `entrance-mjr.jpg` if IMG-01 isn't ready) |

**Prompt**
> Crop and recompose the attached render to 1200 × 630, keeping the entrance gate and the start of the internal roads in the centre-right and leaving calm sky and highway on the left third. No text, no logo. Same light and colours.

(The project name is added by the website team, not by the generator.)

### IMG-05 to IMG-14 · Amenity set regrade: P2

Edit the existing images so all ten look like one photo shoot. **Keep the content and composition**: this is a colour and clean-up pass, not a new image.

| ID | Source | Save as | Specific fixes |
|---|---|---|---|
| IMG-05 | `Assets/Swimming-pool.png` | `Assets/source/amenity-pool.png` | Tone down the turquoise water to a natural blue-green; remove resort-style umbrellas if they look like a hotel |
| IMG-06 | `Assets/Park.jpg` | `Assets/source/amenity-lawn.png` | Even out the grass colour; keep the pavilion |
| IMG-07 | `Assets/children-play-area.png` | `Assets/source/amenity-play.png` | Mute the primary-red slide and swing colours slightly |
| IMG-08 | `Assets/outdoor-fitness-area.png` | `Assets/source/amenity-fitness.png` | Mute the bright yellow equipment slightly |
| IMG-09 | `Assets/three-parks.png` | `Assets/source/amenity-parks.png` | Reduce the flower reds |
| IMG-10 | `Assets/senior-citizen-park.png` | `Assets/source/amenity-senior.png` | Keep the couple natural; soften the background flowers |
| IMG-11 | `Assets/Pergolas-and-sit-outs.png` | `Assets/source/amenity-pergola.png` | None beyond the grade |
| IMG-12 | `Assets/open-space.png` | `Assets/source/amenity-yoga.png` | None beyond the grade |
| IMG-13 | `Assets/MJR_8_Water Tank_HD.jpg` | `Assets/source/amenity-water.png` | None beyond the grade |
| IMG-14 | `Assets/ev-charging.jpg` | `Assets/source/amenity-ev.png` | **Remove all lettering and logos** on the canopy and chargers; blank panels instead |

**Edit prompt (use for each, plus its specific fix):**
> Regrade this render to match a single consistent look: clear warm morning daylight from the left, light blue sky, natural sage-leaning greens, saturation about 15% lower, gentle contrast, no vignette. Remove any text, lettering, logos or numbers. Keep every object, the composition and the camera angle exactly as they are. Output 1600 × 1200 (4:3), cropping evenly from the edges if needed.

**Check:** put all ten side by side. They should look like one shoot, with no single image noticeably brighter, greener or more saturated than the rest.

### IMG-15 · Approvals backdrop: P3

| | |
|---|---|
| Used in | S10 expanding image (full width, behind nothing), if the masterplan render is not wanted there |
| Save as | `Assets/source/documents-desk.png` |
| Size | 2400 × 1350 (16:9) |

**Prompt**
> Top-down photo of a clean light wooden desk in soft daylight, with a closed cream document folder, a fountain pen and a small potted plant at the edges, leaving a large empty area in the centre. Calm, neutral, natural colours. No text, no logos, no paper with writing.

### IMG-16 · Dark earth background for About + FAQ (S12): P2

| | |
|---|---|
| Used in | S12, full-screen background behind the heading, cards and accordion (text sits on top, so it must stay dark and calm) |
| Save as | `Assets/source/earth-texture.png` |
| Size | 2400 × 1350 (16:9) |

**Prompt**
> Abstract close-up of flowing, layered contour lines like a topographic survey map carved in dark chocolate-brown clay, soft curved ridges catching a faint warm copper light from the upper right, very dark overall (most of the frame near #322622), smooth gradients, shallow depth of field, calm and premium. No text, no objects, no people.

**Check:** dark enough that cream text (`#E3CDBB`) reads clearly anywhere on it; no hard bright spots in the centre third.

---

## Do **not** generate these

These must be real, or exported from the drawings. A generated version would mislead buyers.

| Item | Why | Who supplies it |
|---|---|---|
| Photos of the site as it is today (roads, gate, progress) | Must be real and dated | MJR site team |
| Photos of past MJR projects (Greens, Enclave, Meadows) | Proof of track record | MJR |
| Buyer or testimonial photos | Must be real people who agreed | MJR sales |
| Portraits of the MD (S04) and sales team (S09, S13, menu) | Real people the visitor will meet | MJR |
| The RERA certificate | A legal document | Already in `Assets/` (real scan) |
| Maps and distances | Must be accurate | Google Maps link or static map export |
| A recoloured master-plan image | Plot outlines must line up exactly with the coordinates in `js/plots-data.js`; AI will shift them | Architect's CAD/SVG export (the site already recolours the plan in code) |
| Logos and icons | Brand files | Already in `Assets/` |

---

## 4. Convert to web files

After saving the originals in `Assets/source/`, run from the project root (ffmpeg is installed on this machine):

```bash
cd "Assets"
mkdir -p web
# Hero (two widths)
ffmpeg -y -i source/hero-aerial.png -vf "scale=1600:-2" -c:v libwebp -quality 74 web/hero-aerial-1600.webp
ffmpeg -y -i source/hero-aerial.png -vf "scale=900:-2"  -c:v libwebp -quality 74 web/hero-aerial-900.webp
ffmpeg -y -i source/hero-aerial-portrait.png -vf "scale=800:-2" -c:v libwebp -quality 74 web/hero-aerial-portrait.webp
# Internal road and share image
ffmpeg -y -i source/internal-road.png -vf "scale=1400:-2" -c:v libwebp -quality 74 web/internal-road.webp
ffmpeg -y -i source/og-share.png -q:v 3 web/og-share.jpg
# S12 background
ffmpeg -y -i source/earth-texture.png -vf "scale=1920:-2" -c:v libwebp -quality 70 web/earth-texture.webp
# Amenities (overwrites the current web copies with the regraded ones)
for n in pool lawn play fitness parks senior pergola yoga water ev; do
  ffmpeg -y -i "source/amenity-$n.png" -vf "scale=720:-2" -c:v libwebp -quality 70 "web/amenity-$n.webp"
done
```

**Size targets:** each hero WebP under 320 KB, each amenity under 110 KB, the share JPG under 200 KB. If a file is larger, lower `-quality` by 5 and re-run.

## 5. Hand-back checklist

- [ ] Every file is saved with the exact name above, in `Assets/source/` (originals) and `Assets/web/` (converted).
- [ ] Every image passes its own checks and the style rules in section 1.
- [ ] Nothing from the "Do not generate" list was generated.
- [ ] `index.html`, `css/` and `js/` are unchanged.
- [ ] Reply with the list of files made, their sizes in KB, and any image you're unsure about.
