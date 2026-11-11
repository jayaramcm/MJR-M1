# MJR Township @ Kalwakurthy — Contemporary Editorial Design System (`DESIGN.md`)

## 1. Architectural Reference & Aesthetic Direction (`karthikeya.net` + Brand Identity)

Re-architected from the ground up inspired by the spatial architecture of **https://www.karthikeya.net/**, elevated into a **premium, contemporary real-estate showcase** in MJR Township's brand palette (`#36512B` Canopy Green & `#CA982C` Ochre Gold) using all 13 sections of `content.md` and MJR's real visual assets.

### Key Structural Signatures Adapted from `karthikeya.net`
1. **Spacious Contemporary Header (`#siteHeader`):**
   - Left: Official `MJR Township @ Kalwakurthy` SVG emblem.
   - Center: Clean horizontal navigation links with an active bottom accent bar (`Overview · Master Plan · Amenities · Location · Plot Options · About MJR · Contact`).
   - Right: Framed dual-column contact pill (`+91-90100 55596` | `sales@mjrinfra.com`) paired with action buttons (`Download Brochure` & `Schedule a Site Visit`).
2. **Framed Rounded Hero Stage (`28px` radius) + Overlapping Brand-Green Snapshot Band:**
   - The Hero video (`Assets/hero-compressed.mp4`, poster `Assets/hero-poster.jpg`, `muted playsinline preload="metadata"`) sits inside a wide, rounded architectural frame (`border-radius: 28px`) with left-aligned editorial typography and a vertical `01 — 02 — 03` architectural index indicator on the left edge.
   - Directly overlapping the bottom of the Hero (`margin-top: -64px`), a full-width **Brand-Green (`#36512B`) Snapshot Band** presents `MJR TOWNSHIP AT A GLANCE` in 5 crisp architectural dashed-frame cards (`7.93 Acres*`, `104`, `120–550 sq. yd.`, `30 & 40 FT`, `150 FT`) with custom vector icons.
3. **2-Column Editorial Split Sections (Big Left Display Headline + Short Accent Rule | Right Narrative & Interactive Modules):**
   - Throughout the page, sections use `karthikeya.net`'s signature asymmetric 2-column split: a bold, large-scale left column (`h2` + `48px × 3px` accent bar) paired with a right column carrying body copy, interactive accordions, or feature matrices.
4. **Panoramic Rounded Media Stage & Interactive Cadastral Master Plan:**
   - Full-bleed rounded media showcases (`24px` radius) with floating glassmorphic caption overlays (`Assets/entrance-mjr.jpg`, `Assets/Layout Plan_Master_HD.jpg`, `Assets/mjr-location-1.mp4`).
   - Interactive Master Plan workbench with zoom/pan, high-contrast status fills (`--status-avail: #A9CF98`, `--status-reserved: #94A3B8`, `--status-sold: #7A8A76`), SVG hatch patterns, and `"Availability as of [date] · Confirm availability with our team"`.
5. **Interactive Accordion + Visual Preview Stage (Amenities & Location):**
   - Just like `karthikeya.net`'s interactive project feature list on the left paired with large rounded imagery on the right, **Section 7 (Amenities)** and **Section 8 (Location)** pair interactive category/hub rows on the left with a dynamic visual showcase on the right.
6. **Sticky Right-Edge Vertical Tab (Desktop) & Smart Auto-Hiding Bottom Bar (Mobile):**
   - Desktop features the signature right-edge vertical `Schedule a Site Visit` tab.
   - Mobile (`<= 900px`) features the bottom action bar (`Schedule a Site Visit` + `Call`) that automatically hides when the enquiry form (`#contact`) or plot inspector CTA is in view or when the keyboard is open.

---

## 2. Brand Color Tokens

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--brand-green` | `#36512B` | Dominant Brand Color (from `TownShip logo_Final_New_Web_1.svg` `.st1`). Used for the overlapping Snapshot Band, section accent rules, active states, and closing CTA band. |
| `--brand-green-deep` | `#162312` | Deep Survey Forest Ink. Used for primary display typography, dark Master Plan stage, and footer. |
| `--brand-gold` | `#CA982C` | Brand Ochre Gold Accent (from `TownShip logo_Final_New_Web_1.svg` `.st3`). Reserved for primary CTA buttons and active plot highlights. |
| `--surface-canvas` | `#FFFFFF` | Crisp gallery white primary background (matching `karthikeya.net`'s clean contemporary canvas). |
| `--surface-tint` | `#F4F6F2` | Subtle cool botanical stone surface for alternating sections (`Why MJR`, `About MJR`, `Enquiry`). |
| `--border-subtle` | `#DCE3D8` | Crisp structural border for cards, pills, and dividers. |
| `--status-avail` | `#A9CF98` | Available plot fill (`10.7:1` on `#162312`) + solid stroke. |
| `--status-reserved` | `#94A3B8` | Reserved plot fill (`5.8:1` on `#162312`) + diagonal hatch pattern. |
| `--status-sold` | `#7A8A76` | Sold plot fill (`4.5:1` on `#162312`) + cross-hatch pattern. |

---

## 3. Typography (2 Typefaces)

- **Display (`--font-display`):** `Plus Jakarta Sans` (`700` / `800`, tight `-0.03em` tracking) paired with `Newsreader` (`500` / `600` editorial serif accents at large display sizes `>= 28px`) for a contemporary architectural presence matching `karthikeya.net`'s bold proportions.
- **Body & UI (`--font-sans`):** `Plus Jakarta Sans` (`400`, `500`, `600`, `700`, `tabular-nums`) for all navigation, body copy, specs, filters, and buttons.
