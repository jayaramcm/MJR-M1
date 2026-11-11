# Image brief for Antigravity: hero promo card (S02)

**Task for the agent:** generate the image below, save it as `Assets/source/promo-plots.png`, convert it with the command in step 4. **Do not edit `index.html`, `css/` or `js/`, and do not overwrite or delete any existing file.**

**Project in one line:** MJR Township is a gated **plotted** development (open residential plots, not houses): 104 plots from 120 to 550 sq. yd. on 7.93 acres, on the 150 ft Tirupati Highway (NH 167K), Kalwakurthy, Telangana, India.

---

## 1. The slot and why the current image changes

The promo card sits right under the hero video. Left half: "104 plots from 120 to 550 sq. yd." and a gold *Get the price list on WhatsApp* button. **Right half: this image** (about 455 × 370 px on desktop, roughly 5:4; full width at 3:2 on phones).

The current image (`internal-road.webp`) is a straight road photographed head-on: the empty asphalt fills almost half the frame, the family is tiny, and the plots, which are what the card is selling, are barely visible. It stays in use for the "30 and 40 ft roads" overview card; the promo card gets this new one.

**What the new image must say in one glance:** *wide, ready plots of different sizes, and a family choosing theirs.*

---

## 2. Prompt

| Save as | `Assets/source/promo-plots.png` · **1600 × 1280 (5:4)** · attach `Assets/source/hero-aerial.png` (layout), `Assets/source/internal-road.png` (road, kerb, streetlight style), `Assets/entrance-mjr.jpg` (gate, background only) |
|---|---|

> Realistic low-altitude drone photograph, about 25 metres up, three-quarter view looking across a new gated residential plotted layout in Telangana, India, in warm golden early-morning light from the left. In the foreground and middle ground, a row of **empty, levelled residential plots of clearly different widths**, each one neatly marked at its corners with small white boundary stones and faint white lime lines, red-brown soil with patches of fresh grass. A 40 ft blacktop internal road with white kerbs, slim streetlights and young avenue trees in tree guards **curves gently** along one side of the plots (the road takes no more than a quarter of the frame). On the corner of one plot, in the right-centre of the frame, a young Indian couple with a small child stand together, seen from behind and the side; the woman points across their plot, the man holds a folded site plan with lines only. Behind them, a landscaped park with a terracotta-roofed pavilion and palm trees, the cream compound wall, and soft farmland and haze on the horizon in the top fifth of the frame. Warm, calm, optimistic mood, long soft shadows, natural saturation.

**Negative prompt:**
`text, letters, words, logo, watermark, signage, numbers on plots, flags, houses on plots, villas, apartments, skyscrapers, night, sunset, neon, oversaturated, fisheye, lens flare, heavy vignette, empty road dominating the frame, symmetrical one-point road perspective, blurry, distorted geometry, extra limbs, faces to camera`

---

## 3. Checks before saving

- [ ] Plots are the subject: at least four or five empty plots of visibly different sizes, with corner stones.
- [ ] The road is a supporting element (a quarter of the frame at most), curving, not dead straight and centred.
- [ ] The family is clearly visible (not tiny) in the right-centre third, not looking at the camera.
- [ ] The key content sits in the centre so both the 5:4 desktop crop and the 3:2 phone crop work.
- [ ] No houses, no text or numbers anywhere, daylight.

## 4. Convert

```bash
cd Assets
ffmpeg -y -i source/promo-plots.png -vf "scale=1400:-2" -c:v libwebp -quality 72 web/promo-plots.webp
```

Target under 200 KB; if larger, lower `-quality` by 5 and run again.

## 5. For the website team (after delivery)

In S02, `<img class="promo-img">`: `src="Assets/web/promo-plots.webp" width="1400" height="1120"`, alt "A family choosing their plot among empty, marked plots beside an internal road". Keep `internal-road.webp` in the overview card. If you use `.vercelignore`, `promo-plots.webp` is already allowed (all of `Assets/web/` ships except the listed unused files).
