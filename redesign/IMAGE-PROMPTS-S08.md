# Image brief for Antigravity: Infrastructure selector (S08)

**Task for the agent:** generate the 3 images below, save them in `Assets/source/` with the exact file names given, then convert them with the commands in [step 4](#4-convert-to-web-files). **Do not edit `index.html`, `css/` or `js/`, and do not overwrite or delete any existing file.**

**Project in one line:** MJR Township is a gated **plotted** development (open residential plots, not houses or apartments): 104 plots on 7.93 acres on the 150 ft Tirupati Highway (NH 167K) at Kalwakurthy, Telangana, India.

---

## 1. Where the images go

The Infrastructure section is navy (`#1D2856`). Visitors pick an item (Roads · Water · Power · EV charging · Security · Drainage) and a large photo of it fades in beside the list. Roads, Water and EV charging already have their own photos. These three still use stand-ins:

| ID | Item | Line shown with it | Stand-in today |
|---|---|---|---|
| **I1** | Power | Power lines and streetlights | `internal-road.webp` |
| **I2** | Security | Gated entrance and compound wall | `s03-gate.webp` (has MJR lettering on flags) |
| **I3** | Drainage | Storm-water drains on every road | `journey-03-roads.webp` (same photo as Roads) |

**Slot:** the photo fills a rounded frame about 850 × 560 px on desktop (roughly **3:2**) and full width at 16:10 on phones. Keep the subject **in the centre**; the bottom-left corner may carry a small caption on phones.

---

## 2. Style rules

| Rule | Detail |
|---|---|
| Light | Clear **early-morning sun**, warm and low from the left, soft long shadows, pale sky. Never night or sunset (I1 shows streetlights in daylight, switched off). |
| Colour | Natural and warm, saturation about 15 % below a typical render; red-brown soil, olive greens, cream stone. It must sit well on deep navy `#1D2856`. |
| The site | Blacktop 30/40 ft roads, white kerbs, covered drains, slim modern streetlights, young avenue trees with tree guards, a cream compound wall, the timber-and-stone entrance gate. **Plots are empty land** with small white boundary stones. **No houses.** |
| People | None needed. If any, small and natural, never facing the camera, no uniforms with logos. |
| Text | **No text, lettering, logos, numbers, flags with lettering, signage words or warning-sign text anywhere.** |
| Camera | Realistic photographic render, 35 mm feel, level horizon, no fisheye, no vignette, no lens flare. |

**Negative prompt (add to every generation):**
`text, letters, words, logo, watermark, flags with logos, signage lettering, warning sign text, numbers, night, sunset, neon, oversaturated, purple, skyscrapers, apartments, houses on plots, villas, golf course, fisheye, lens flare, heavy vignette, blurry, distorted geometry, tangled wires`

**Attach as references:** `Assets/entrance-mjr.jpg` (gate design; copy the gate, not its flags), `Assets/source/internal-road.png` (road, kerb, drain and streetlight style), `Assets/source/hero-aerial.png` (overall layout).

---

## 3. The images

### I1 · Power

| Save as | `Assets/source/infra-power.png` · **1920 × 1280 (3:2)** |
|---|---|

> Realistic eye-level photograph along a straight 40 ft blacktop internal road in a new gated plotted layout in Telangana, early morning. A neat row of slim modern LED streetlight poles runs along the left kerb into the distance, and a tidy line of electricity poles with a few clean overhead lines and a small fenced electrical substation box sits at the edge of an empty plot on the right. Young avenue trees in tree guards, white kerbs, empty levelled plots with white corner stones. Warm low light from the left, long shadows, orderly and well built.

**Check:** lines are few and tidy (no tangle); streetlights are off; no text on the substation box; empty plots.

### I2 · Security

| Save as | `Assets/source/infra-security.png` · **1920 × 1280 (3:2)** |
|---|---|

> Realistic photograph from the highway side, slightly elevated, of the timber-and-stone entrance gate from the reference set into a long cream compound wall, early morning. A small cream security cabin with a window stands just inside the gate; the sliding metal gate is half open; the compound wall continues left and right with neat shrubs along its base; behind the gate the blacktop internal road leads into the layout with streetlights and young trees. No flags. Warm low light from the left, calm and secure mood.

**Check:** no flags, no lettering on the gate, cabin or wall; the wall reads clearly as continuous; daylight.

### I3 · Drainage

| Save as | `Assets/source/infra-drainage.png` · **1920 × 1280 (3:2)** |
|---|---|

> Realistic close-to-eye-level photograph of the edge of a blacktop internal road in a new plotted layout in Telangana, early morning: a white concrete kerb and, beside it, a covered storm-water drain made of neat precast concrete slabs with small regular openings, running straight into the distance along the road. A narrow footpath and young avenue trees in tree guards beside it, empty levelled plots beyond. Clean, dry, well-finished construction. Warm low light from the left with long shadows that show the slab texture.

**Check:** the drain is clearly the subject; no water flooding; no text on slabs; empty plots.

---

## 4. Convert to web files

```bash
cd Assets
for f in infra-power infra-security infra-drainage; do
  ffmpeg -y -i "source/$f.png" -vf "scale=1400:-2" -c:v libwebp -quality 72 "web/$f.webp"
done
```

**Size target:** each under 200 KB; if larger, lower `-quality` by 5 and run again.

## 5. Hand-back checklist

- [ ] 3 originals in `Assets/source/` and 3 WebP files in `Assets/web/`, exact names as above.
- [ ] Each passes its check and the style rules (no text anywhere, empty plots, daylight).
- [ ] No existing file was overwritten or deleted; `index.html`, `css/` and `js/` are unchanged.
- [ ] Reply with the file list, sizes in KB, and anything you're unsure about.

## 6. For the website team (after delivery)

In S08, change three `<img class="infra-shot">` tags (keep `data-name` / `data-line`):

| Item | New `src` | Size | alt |
|---|---|---|---|
| Power | `Assets/web/infra-power.webp` | 1400 × 933 | Streetlights and tidy power lines along an internal road |
| Security | `Assets/web/infra-security.webp` | 1400 × 933 | The entrance gate, security cabin and compound wall |
| Drainage | `Assets/web/infra-drainage.webp` | 1400 × 933 | A covered storm-water drain beside the road kerb |
