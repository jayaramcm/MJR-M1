# Image brief for Antigravity: Project journey (S05) and Location (S06)

**Task for the agent:** generate the 10 images below, save them in `Assets/source/` with the exact file names given, then convert them with the commands in [step 4](#4-convert-to-web-files). **Do not edit `index.html`, `css/` or `js/`, and do not overwrite or delete any existing file.** Every image here has a new, unique name, so nothing else on the website changes. The website team wires the files into the two sections afterwards.

**Project in one line:** MJR Township is a gated **plotted** development (open residential plots, not houses or apartments): 104 plots on 7.93 acres, on the 150 ft Tirupati Highway (NH 167K) at Kalwakurthy, Nagarkurnool district, Telangana, India. Buyers buy land and build later.

---

## 1. What the two sections are, and why the images change

| Section | What it shows | Background | Problem with the current images |
|---|---|---|---|
| **S05 · Project journey** "From open land to your plot" | 5 chapters, one photo each, in story order: layout approved → RERA registered → roads and drains → parks and amenities → your plot | Deep navy `#1D2856` | All five are re-used from other sections (a transparent plan drawing, a stock desk, the road, a park, the gate with flag lettering). They don't tell one story. |
| **S06 · Location** three steps beside a route map that draws itself | Step 01 the site on the highway, step 02 the way to Hyderabad, step 03 schools and hospitals close by. Each step shows one wide photo, and steps 02 and 03 add a small upright photo overlapping its corner. | Warm sand `#F4EBE4` | Blurry stills from an old video, a generic skyscraper city, and a re-used hero image. |

**Idea for S05:** one site, one story. Chapters 01, 03 and 04 are the **same aerial camera position** at three stages of work, so scrolling feels like watching the layout being built. Chapter 02 is the paperwork moment on site, chapter 05 is the buyer standing on their own plot.

---

## 2. Style rules for all 10 images

| Rule | Detail |
|---|---|
| Light | Clear **early-morning sun**, low and warm from the left, soft long shadows, pale sky with a few clouds. Never night, dusk or full sunset. |
| Colour | Natural and warm: red-brown Deccan soil, olive greens, cream stone. Saturation about 15% below a typical real-estate render. Shadows slightly cool so the image sits well next to deep navy (S05) and warm sand (S06). No neon, no purple. |
| Place | Telangana, Deccan plateau: flat to gently rolling land, neem, palm and rain trees, bougainvillea, scattered rocks. Not a resort, not a golf course. |
| The site | Blacktop internal roads (30 and 40 ft), white kerbs, covered drains, slim streetlights, young avenue trees with tree guards, a cream compound wall, the timber-and-stone entrance gate. **Plots are empty land** with small white boundary stones at the corners. **No houses or apartments on the plots.** |
| People | Small and natural (Indian families, a surveyor, site workers in safety vests). No posed close-ups, no faces facing camera in the aerial shots. |
| Text | **No text, lettering, logos, flags with lettering, numbers or signage words anywhere.** Paper and drawings show lines only, never readable writing. |
| Camera | Realistic photographic render, 35 mm feel, level horizon, no fisheye, no vignette, no lens flare. |
| Safe areas | S05: keep the **bottom-left quarter calm** (soil, road, grass): a large outlined step number "01"–"05" is laid over it by the website. S06: keep the subject **in the centre third**, because phones crop these to 4:3. |

**Negative prompt (add to every generation):**
`text, letters, words, logo, watermark, flags with logos, signage lettering, numbers, night, sunset, dusk, neon, oversaturated, purple, skyscrapers, high-rise towers, apartments, villas on plots, houses on plots, golf course, snow, fisheye, lens flare, heavy vignette, blurry, distorted geometry, extra limbs, deformed hands`

---

## 3. The images

### Reference files to attach

| File | Use it for |
|---|---|
| `Assets/source/hero-aerial.png` | The site from above: gate on the highway, road grid, diagonal north-east boundary, two parks. Match this layout in J1, J3, J4, L1. |
| `Assets/entrance-mjr.jpg` | The real entrance gate design (timber portal on stone pillars). **Copy the gate shape, not the flags or lettering.** |
| `Assets/layout MJR.png` | The real plot and road layout. |
| `Assets/source/internal-road.png` | Road, kerb, drain and streetlight style (J3, J5). |
| `Assets/source/amenity-parks.png`, `amenity-pergola.png` | Park and pergola style (J4). |

---

### S05 · Project journey (5 images, 16:9)

Shown at 16:9 on desktop and 16:10 on phones, about 700 px wide on a navy page. **Generate at 1920 × 1080.**

#### J1 · Chapter 01 "The layout is approved"

| Save as | `Assets/source/journey-01-layout.png` · 1920 × 1080 · attach `hero-aerial.png`, `layout MJR.png` |
|---|---|

> Realistic aerial photograph, three-quarter view from about 120 m up, looking across a large flat plot of cleared, levelled red-brown land in rural Telangana, India, early morning. The 150 ft four-lane highway runs along the bottom of the frame. On the land, the future layout is **marked out but not yet built**: straight white lime-powder lines trace the grid of internal roads and the rows of rectangular plots, small wooden survey pegs with orange tape at the corners, the shape of the site following the reference layout with a diagonal boundary on the right. A surveyor with a tripod and theodolite and one assistant stand small near the centre-right. A few neem trees at the edges, open farmland and palms beyond, soft haze on the horizon. Warm low sunlight from the left with long shadows. Keep the bottom-left quarter simple: highway verge and bare soil.

**Check:** no roads built yet, no buildings; lines are lime on soil; layout shape matches the reference; bottom-left calm.

#### J2 · Chapter 02 "Registered with TG RERA"

| Save as | `Assets/source/journey-02-documents.png` · 1920 × 1080 · attach `entrance-mjr.jpg` |
|---|---|

> Realistic photograph, eye level, a simple folding site table standing on the levelled red-brown land of a new plotted layout in Telangana, early morning. On the table: a large **approved layout drawing** spread flat (blue-grey linework of roads and plot rectangles only, absolutely no writing or numbers), held down by a smooth stone and a white hard hat, a closed cream document folder with an embossed round government-style seal (no letters) and a fountain pen. Two hands of a site engineer rest on the drawing (no face in frame). In the soft-focus background: the timber-and-stone entrance gate from the reference, a low cream compound wall and young trees. Warm side light from the left, shallow depth of field.

**Check:** nothing readable on paper or seal; the gate behind is the MJR design without flags; bottom-left is plain table surface or soil.

#### J3 · Chapter 03 "Roads, drains and streetlights"

| Save as | `Assets/source/journey-03-roads.png` · 1920 × 1080 · attach **your J1 output**, `internal-road.png` |
|---|---|

> Use exactly the same camera position, height, angle and horizon as the attached J1 image. The same site, some months later: the internal road grid is now **fresh black asphalt** with white concrete kerbs on both sides and covered storm-water drains, a road roller and a small paver finishing one last road with two workers in orange safety vests, slim streetlight poles standing along every road, young avenue trees planted in tree guards. Plots between the roads are still **empty levelled soil** with small white boundary stones. The compound wall is built along the highway and the entrance gate stands at the front. Same warm early-morning light from the left.

**Check:** identical viewpoint to J1 (you should be able to cross-fade the two); plots empty; no houses.

#### J4 · Chapter 04 "Parks and amenities"

| Save as | `Assets/source/journey-04-parks.png` · 1920 × 1080 · attach **your J1 output**, `amenity-parks.png`, `amenity-pergola.png` |
|---|---|

> Same camera position, height, angle and horizon as the attached J1 image. The layout is now complete: finished asphalt roads with kerbs and streetlights, avenue trees grown a little fuller, and the **landscaped open spaces are finished**: a green park with curving paths, a terracotta-roofed pergola with benches, flowering shrubs, a small swimming pool with a cream deck, a children's play area with muted-colour equipment, and a lawn. A few families walk in the park, very small in frame. The residential plots remain **empty levelled land** with boundary stones. Warm early-morning light from the left.

**Check:** same viewpoint as J1 and J3; parks match the amenity style; plots still empty; no houses.

#### J5 · Chapter 05 "Your plot, in your name"

| Save as | `Assets/source/journey-05-your-plot.png` · 1920 × 1080 · attach `internal-road.png`, `entrance-mjr.jpg` |
|---|---|

> Realistic eye-level photograph inside a finished gated plotted layout in Telangana, early morning golden light from the left. In the centre-right third, an Indian couple in their thirties with a young child stand on **their own empty plot**, seen from behind and slightly to the side, the father resting a hand on a small white corner boundary stone, the mother pointing across the plot as if planning where the house will go. The plot is levelled red-brown soil with a little grass. Behind them: a blacktop 40 ft road with white kerbs, a streetlight and young avenue trees, and in the far background the timber-and-stone entrance gate. Hopeful, calm, quiet mood. Keep the bottom-left quarter as plain soil and grass.

**Check:** faces not posed to camera; the plot is empty land; no lettering on the gate; bottom-left calm.

---

### S06 · Location (5 images)

Each step shows a **wide 16:9 photo** (about 450 × 250 px on desktop, full width on phones) and, in steps 02 and 03, a **small 4:5 photo** overlapping its bottom-right corner (about 150 × 190 px). Keep the subject in the centre, and keep the **bottom-right quarter of the wide photos calm**, because the small photo covers it.

#### L1 · Step 01 "Right on the highway" (wide, 16:9)

| Save as | `Assets/source/location-01-site.png` · 1920 × 1080 · attach `hero-aerial.png`, `entrance-mjr.jpg` |
|---|---|

> Realistic aerial photograph from about 200 m, looking along the 150 ft four-lane Tirupati Highway as it runs from the bottom of the frame towards the horizon. On the right side of the highway, centred in the frame, the gated plotted layout from the reference: entrance gate on the highway, cream compound wall, grid of black internal roads with streetlights and avenue trees, two green parks, **empty plots**. Further along the highway in the distance, the low rooftops of a small Telangana town (Kalwakurthy) with a water tower and trees, in soft morning haze. Farmland and scattered palms elsewhere. Warm early-morning light from the left.

**Check:** the layout reads clearly in the centre; the town is small and low-rise in the distance; no skyscrapers.

#### L2 · Step 02 "Towards Hyderabad" (wide, 16:9)

| Save as | `Assets/source/location-02-highway.png` · 1920 × 1080 |
|---|---|

> Realistic photograph from a low drone height, standing above the centre of a smooth four-lane divided highway in rural Telangana that runs dead straight towards a bright horizon, early morning. A planted median with oleander shrubs, white lane markings, a few cars and one truck travelling away from the camera, a blank green overhead gantry sign with **no text at all**. Flat farmland, palms and neem trees on both sides, a faint line of distant hills. A sense of an easy, open drive towards the city. Warm low light from the left.

**Check:** sign has no words; no city skyline; the road leads the eye to the centre.

#### L3 · Step 02, small photo: airport and Outer Ring Road (4:5)

| Save as | `Assets/source/location-03-airport.png` · 1200 × 1500 |
|---|---|

> Realistic portrait photograph, a passenger jet low in a pale morning sky on final approach, passing above a wide modern expressway interchange with curving flyovers and green landscaped verges near Hyderabad, India. The plane in the upper-middle third, the interchange curving through the lower two thirds. Soft warm light, gentle haze, calm and clean.

**Check:** no airline name or logo on the plane; no signage words; not a recognisable real terminal building.

#### L4 · Step 03 "Everything else, close by": schools (wide, 16:9)

| Save as | `Assets/source/location-04-school.png` · 1920 × 1080 |
|---|---|

> Realistic eye-level photograph outside a modern two-storey school campus in a small Telangana town, early morning. Cream and terracotta school buildings behind a low wall and an open gate, a tree-lined road in front, a group of Indian schoolchildren in neat uniforms with backpacks walking in with a parent, seen from the side and behind. Neem trees, bougainvillea on the wall, warm low light from the left. Friendly, safe, everyday mood.

**Check:** no name board or lettering on the gate or wall; children not posed; the scene is in the centre third.

#### L5 · Step 03, small photo: hospitals (4:5)

| Save as | `Assets/source/location-05-hospital.png` · 1200 × 1500 |
|---|---|

> Realistic portrait photograph of the clean, modern entrance of a mid-size multispeciality hospital in a Telangana town, early morning: a cream and glass three-storey building, a covered drop-off porch, a parked ambulance with only a plain red stripe, landscaped palms and lawn in front, a few people walking in. Calm, reassuring mood, warm low light from the left.

**Check:** no hospital name, red-cross lettering or signage words; no logo on the ambulance; building in the centre.

---

## Do **not** generate

| Item | Why |
|---|---|
| Umamaheshwaram Temple, Gollatha Gudi or any named real place | A generated version would misrepresent a real landmark. If a temple image is wanted, use a real licensed photograph. |
| A map or a "drive time" graphic | Must be accurate. The page already has a live Google Maps link. |
| The RERA certificate itself | A legal document; the real scan is already used elsewhere. |

---

## 4. Convert to web files

After saving the 10 originals in `Assets/source/`, run from the project root (ffmpeg is installed):

```bash
cd Assets
# S05 · Project journey (shown about 700 px wide, 2x for sharp screens)
for f in journey-01-layout journey-02-documents journey-03-roads journey-04-parks journey-05-your-plot; do
  ffmpeg -y -i "source/$f.png" -vf "scale=1400:-2" -c:v libwebp -quality 72 "web/$f.webp"
done
# S06 · Location, wide 16:9 photos
for f in location-01-site location-02-highway location-04-school; do
  ffmpeg -y -i "source/$f.png" -vf "scale=1400:-2" -c:v libwebp -quality 72 "web/$f.webp"
done
# S06 · Location, small 4:5 photos
for f in location-03-airport location-05-hospital; do
  ffmpeg -y -i "source/$f.png" -vf "scale=900:-2" -c:v libwebp -quality 72 "web/$f.webp"
done
```

**Size targets:** each `journey-*` and large `location-*` WebP under 250 KB, each small one under 150 KB. If a file is larger, lower `-quality` by 5 and run it again.

## 5. Hand-back checklist

- [ ] 10 originals in `Assets/source/` and 10 WebP files in `Assets/web/`, with the exact names above.
- [ ] J1, J3 and J4 share one camera position (put them side by side and check the horizon and the road grid line up).
- [ ] Every image passes its own check and the style rules in section 2: empty plots, no houses, **no text anywhere**, daylight.
- [ ] S05 images have a calm bottom-left quarter; S06 wide images keep the subject in the centre and a calm bottom-right quarter.
- [ ] No existing file was overwritten or deleted; `index.html`, `css/` and `js/` are unchanged.
- [ ] Reply with the list of files, their sizes in KB, and any image you're unsure about.

## 6. For the website team (after delivery)

Swap the image paths in `index.html` only (no CSS changes needed; the slots already have the right shapes):

| Slot | Current file | New file |
|---|---|---|
| S05 chapter 01 | `web/s03-layout.webp` | `web/journey-01-layout.webp` |
| S05 chapter 02 | `web/documents-desk.webp` | `web/journey-02-documents.webp` |
| S05 chapter 03 | `web/internal-road.webp` | `web/journey-03-roads.webp` |
| S05 chapter 04 | `web/amenity-parks.webp` | `web/journey-04-parks.webp` |
| S05 chapter 05 | `web/s03-gate.webp` | `web/journey-05-your-plot.webp` |
| S06 step 01 `.loc-photo` | `web/hero-aerial-1600.webp` | `web/location-01-site.webp` |
| S06 step 02 `.loc-photo` | `web/loc-1.webp` | `web/location-02-highway.webp` |
| S06 step 02 `.loc-photo-sm` | `web/loc-2.webp` | `web/location-03-airport.webp` |
| S06 step 03 `.loc-photo` | `web/loc-3.webp` | `web/location-04-school.webp` |
| S06 step 03 `.loc-photo-sm` | `web/loc-temple.webp` | `web/location-05-hospital.webp` |

Only the S05 and S06 `<img>` tags change; the old files stay in place because other sections still use some of them. Update each `width`/`height` attribute and `alt` text to match the new image.
