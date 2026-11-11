# 01 · Audience and goals

## The site's one job

A plot buyer should leave the page with **enough confidence to take the next step**: call, send a WhatsApp message, or book a visit. They should not have to call just to learn the basics.

Land in Telangana is a high-trust, family-decided purchase. Nobody buys a plot from a website. The website's job is to:

1. **Qualify:** answer "is this for me?" (location, size, budget, legality) in under a minute.
2. **Reassure:** prove the project is legal, real and progressing.
3. **Convert:** make the next action effortless, on the channel the buyer already uses.

## Who visits

These four groups are inferred from the project (a 104-plot RERA layout on NH 167K at Kalwakurthy, 120–550 sq. yd. plots). Confirm them against real enquiry data from the sales team.

### A. Local and regional end-user: "building our home"
- **Who:** families from Kalwakurthy, Nagarkurnool, Achampet, Jadcherla and Mahbubnagar. Aged 30–55, often salaried or running a business, and the decision includes parents and the spouse.
- **Device and language:** an Android phone, mobile data, more comfortable in Telugu, uses WhatsApp daily.
- **Wants to know:** price and payment terms · the exact location and distance from town · water, power and roads · whether it's DTCP/RERA approved and can get a bank loan · when they can build.
- **Fears:** disputed title, a layout that is never developed, hidden charges.

### B. Hyderabad investor: "land near the RRR before prices rise"
- **Who:** an IT or salaried professional aged 28–45 living in Hyderabad, comparing 3–5 projects on the Srisailam and Kalwakurthy corridors.
- **Device:** phone first, laptop for comparing projects.
- **Wants to know:** price per sq. yd. · drive time to ORR, the airport and the Financial District · RRR distance · resale and appreciation story · developer track record.
- **Fears:** an over-hyped corridor, poor resale, developer credibility.

### C. NRI / Gulf / US Telugu diaspora: "buying for the family back home"
- **Who:** works abroad and buys remotely, with a relative visiting the site.
- **Wants to know:** documents to check remotely · a video walk-through · how payment and registration work from abroad · a contact reachable across time zones, which means WhatsApp.
- **Fears:** fraud, and not being able to inspect the land.

### D. The elder decision-maker
- **Who:** a parent aged 55+ who is shown the site on a family member's phone.
- **Needs:** large, readable text · Telugu · a phone number they can tap · a simple layout.

## What each group needs vs what the site gives them today

| Need | A Local | B Investor | C NRI | D Elder | On the site now? |
|---|:-:|:-:|:-:|:-:|---|
| Price or price range | ●●● | ●●● | ●●● | ●● | ❌ Hidden; "leave your number" ([index.html:152-153](../index.html#L152-L153) has it commented out) |
| Exact location and map | ●●● | ●● | ●●● | ●● | ⚠️ Address text only; no map embed or directions link |
| Distance and time to Hyderabad | ● | ●●● | ●● | – | ❌ Place names, no km or minutes |
| Approvals (RERA/DTCP), clear title | ●●● | ●●● | ●●● | ●●● | ⚠️ RERA number shown, not linked; approval type not stated |
| Bank loan availability | ●●● | ●● | ●● | ● | ❌ Missing |
| Plot sizes and availability | ●●● | ●●● | ●● | ● | ⚠️ Shown, but on placeholder data |
| Infrastructure status (roads, water, power) | ●●● | ●● | ●● | ●● | ⚠️ Listed as features; no "done vs planned" status |
| Real photos and progress | ●● | ●● | ●●● | ●● | ❌ Only renders; "Actual entrance render" is a contradiction |
| Developer track record | ●● | ●●● | ●●● | ●● | ⚠️ Project names without photos or links |
| Telugu language | ●●● | – | ● | ●●● | ❌ English only |
| WhatsApp contact | ●●● | ●● | ●●● | ● | ⚠️ Desktop only; hidden on phones ([css/styles.css:3301-3303](../css/styles.css#L3301-L3303)) |
| Book a visit | ●● | ●●● | ● (relative) | ● | ✅ Everywhere, perhaps too often |

●●● = decisive · ●● = important · ● = nice to have

## The buyer's decision journey and where the page breaks it

```
 Discover            Qualify                   Trust                 Act
 (ad / search /  →   "Is it for me?"     →     "Is it safe?"    →    Call / WhatsApp / Visit
  WhatsApp fwd)      price, place, size        RERA, title, loans,   (on a phone)
                                               developer
 ─────────────────────────────────────────────────────────────────────────────────
 Hero: ✅ looks       ❌ no price               ⚠️ RERA shown, not    ❌ forms don't send
 premium             ❌ no distances           verifiable             ⚠️ WhatsApp hidden on phones
 ⚠️ 53 MB load       ⚠️ phone map unusable     ❌ no real photos       ⚠️ 9× "Book a Site Visit"
```

**Main point:** the page puts most of its effort into the *Discover* stage (video, renders, slogans) and the least into *Qualify* and *Trust*, which are the stages where land buyers drop out.

## Primary and secondary actions

The [landing-page skill](README.md) rule is one page, one primary action. For this audience:

| Priority | Action | Why |
|---|---|---|
| **Primary** | **WhatsApp us / Call** | The fastest channel with the least friction for groups A, C and D |
| Secondary | Book a site visit | High intent, but a big step for a first visit to the site |
| Tertiary | Get the brochure or price list | A lead magnet for group B, who are comparing projects |

Today the order is reversed: "Book a Site Visit" is the gold button in 9 places, and WhatsApp is a small unlabelled chat icon that only appears on desktop.
