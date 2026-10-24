# 21-Day URAL Social Media Launch Plan

**Site:** `https://uraltravel.co.uk` · **Handles:** `@uraltravelbd` (Facebook / Instagram / LinkedIn / TikTok / X) · **Window:** Day 1 → Day 21 (freeze ends ~2026-11-13 per `15`)
**Owner:** solo founder · **Tools:** Canva + CapCut (phone) · **Daily cost:** ~30 min after Day 0 batch · **Status:** executable from Day 0, no designer required
**Companions:** `12-POST-MIGRATION-ROADMAP.md` (rules) · `13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md` (ids) · `14-DRIVE-REFERRAL-SYNDICATION-PLAN.md` (satellites) · `15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md` (queue of record)

> **One-line thesis:** at near-zero impressions, technical depth multiplies zero. The bottleneck is distribution. This plan manufactures the first 100 non-Google sessions and the first attributable affiliate clicks without touching a canonical, a title, or a template — then hands a measured trigger to the frozen backlog.

---

## Decisions (locked 2026-10-24)

| Decision | Choice |
|---|---|
| Capacity | **Solo founder** — 30 min/day, one Canva master, one CapCut end-card. No designer variants. |
| Voice | **EN/BN alternating** — Mon/Wed/Fri EN, Tue/Thu BN, Sat/Sun bilingual carousel. Diaspora reads both; BN corpus exists (`src/data/bengaliContent.ts`). |
| Surfaces | **Keep all** — IG + FB Page, TikTok + YT Shorts + X, Medium + Substack + Reddit, optional Pinterest. |
| Substack | **3 issues** (Days 3, 10, 17) then decide by open rate. |
| Reddit | **Yes — 10:1 groundwork** — 6 answer-only comments before any native post. |

---

## 1) Domain Sync Check — do once on Day 0 (5 min)

Do this before the first post ships so every CTA attributes correctly. Checkboxes are console-side; no deploy.

- [ ] **Canonical / head** — open any prerendered URL's view-source (`https://uraltravel.co.uk/visa-free-countries`): `<link rel="canonical">`, `og:url`, `twitter:url`, JSON-LD `@id` all resolve to `https://uraltravel.co.uk/...` (not `ural-travel.pages.dev`, not `www.`). Already verified `258/258` in `dist/` (`13` §2.1).
- [ ] **OG image** — `https://uraltravel.co.uk/og-image.jpg` loads; `og:image` on view-source points there.
- [ ] **Bios — all 5** — Facebook / Instagram / LinkedIn / TikTok / X bios and link-in-bio all point to `https://uraltravel.co.uk` (not `pages.dev`). Footer + JSON-LD `sameAs` already unified on `uraltravel.co.uk`.
- [ ] **Affiliate plumbing — the money check** (`15` §2.2, still open): Travelpayouts → new project (`url = https://uraltravel.co.uk`, id `589561`, marker `675992`) → **active, not archived** → Programs tab lists Aviasales/Hotellook, Tiqets, Klook, KKday, Welcome Pickups / Kiwitaxi / GetTransfer, Airalo, AirHelp → **Drive → Unlock Drive → Link switching ON** per program → `trs=589561` verified on `TiqetsEmbedWidget`, `WelcomePickupsEmbed`, `AffiliatePartners`, `TravelpayoutsCustomWidget`. Then **one tagged click per family** (`&sub_id=soc_test_wl`, `soc_test_tiqets`, …) must appear in Reports → Clicks within 24 h — otherwise social is sending traffic to zero attribution.
- [ ] **Freeze window on the wall** — write `FREEZE ENDS ~2026-11-13 (Day 21)` on the calendar. No new URLs, no canonical/title/H1/schema edits, no hero batches until then. Fact fixes and turning a dead widget off are the only deploy-legal on-site edits (`15` §3).

*If the Travelpayouts check fails, stop and fix it before Day 1. Every other row's ROI is zero until this is green.*

---

## 2) Goals & KPIs

### North star

≥ **100 sessions from non-Google sources in 21 days**, with the first `affiliate_partner_click` rows attributable by `sub_id` — not vanity impressions.

### Leading vs lagging

| Type | Metric | Where | Target at Day 21 |
|---|---|---|---|
| **Lagging (business)** | Sessions from non-Google (social + referral + direct) | GA4 Acquisition | ≥ 100 |
| **Lagging (money)** | `affiliate_partner_click` with a `sub_id` | GA4 Events + TP Reports → Clicks | ≥ 20 clicks, ≥ 3 families |
| **Leading (content)** | Saves on visa/Umrah carousels | IG Insights | ≥ 8 saves per carousel avg |
| **Leading (video)** | 3-sec views / hook retention | TikTok + YT Studio + Reels | ≥ 35% hook retention |
| **Leading (satellite)** | Medium canonical correct + Substack opens | Medium view-source + Substack dashboard | 3/3 correct, ≥ 35% open rate |
| **Leading (distribution health)** | Reddit standing (no warnings) | Reddit inbox | 0 warnings |

### Checkpoints

| Day | Must be true |
|---|---|
| **7** | 6 posts shipped on schedule, Substack #1 sent, Medium #1 imported, first Reddit answers posted, Day 0 dashboard check green. |
| **14** | ≥ 45 non-Google sessions, ≥ 8 affiliate clicks, Medium #2 + Substack #2 shipped, 6 Reddit answers done. |
| **21** | ≥ 100 non-Google sessions, ≥ 20 clicks, 7/7/3/3/6+1 surfaces shipped, Day 22 handoff decision made. |

Failure to hit Day 7 leading metrics → fix hooks/CTAs before adding volume. Do not add platforms.

---

## 3) Non-Negotiable Principles

1. **Site is master, satellites are satellites** (`14` §0). Canonicals, affiliate links, and disclosures live only on `uraltravel.co.uk`.
2. **One URL, one job.** Every post drives to the *matching* cluster page — never the homepage. Homepage landings convert worst (`15` §5).
3. **10:1 on Reddit. Zero affiliate links in comments.** Domain removal is permanent (`14` §4.3).
4. **Wait for indexing before Medium import.** Publish on site → confirm in GSC URL Inspection → Day 2–5 Import story → verify canonical resolves to your page (`14` §4.1). Our 3 imports use pages indexed since migration, so this is already satisfied — still verify.
5. **Freeze-compliant.** All 21 days reuse **existing** URLs and copy. No H1/meta/canonical/schema work.
6. **Tag or it didn't happen.** Every outbound link carries `utm_source / utm_medium / utm_campaign` **and** a Travelpayouts `sub_id` family so GA4 custom dimensions (S1) can attribute it (`14` §4.4).

---

## 4) Pillars — mapped to live URLs (no new pages needed)

| Pillar | Live pages it drives to | Social job | Save / Share / Click trigger |
|---|---|---|---|
| **A — Umrah & Hajj** | `/umrah`, `/costs/saudi-arabia`, blog: `umrah-hajj-guide-bangladesh-nusuk-bdt-cost`, `makkah-madinah-hotel-zones-haramain-train-guide-bangladesh`, `nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit`, `umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates`, `saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah`, `wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules`, `ramadan-umrah-itikaf-guide-bangladesh-booking-budget`, `official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport`, `bangladeshi-halal-food-guide-makkah-madinah-budget-meals`, `makkah-madinah-badr-taif-historical-ziyarah-taxi-guide`, `dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia` | Highest GBP AOV (hotels, transfers, Tiqets) — authority builder | **Share** to family WhatsApp groups |
| **B — Flights (DAC corridors)** | `/flights`, `/flights/dhaka-kathmandu`, `/flights/ktm-dhaka`, `/flights/dhaka-los-angeles`, blog: `cheap-flight-booking-hacks-dhaka`, `top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla`, `chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai`, `dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` | Benchmark fares, cheapest-month hooks | **Click** to widget search |
| **C — Visas & Visa-Free** | `/visa-free-countries`, `/visa`, `/visa/thailand`, `/visa/malaysia`, `/visa/singapore`, `/visa/nepal`, `/visa/saudi-arabia`, blog: `thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide`, `malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration`, `singapore-visa-guide-bangladesh-agents`, `fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia`, `bangladesh-epassport-application-renewal-64-districts-fee-guide` | Save-trigger checklists | **Save** (checklist) |
| **D — Destinations (12 hubs)** | `/destinations`, `/destinations/nepal`, `/destinations/thailand`, `/destinations/malaysia` … `/hotels/bangkok`, `/hotels/kuala-lumpur` … `/experiences`, blog: `nepal-pokhara-itinerary-bangladesh`, `maldives-budget-trip-bangladesh-maafushi`, `singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide`, `sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost`, `havana-cuba-travel-guide-bangladesh`, `chefchaouen-morocco-travel-guide-bangladesh`, `europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide`, `abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide` | Wanderlust + Klook/KKday/Tiqets stays | **Click** for itineraries |
| **E — Banking & Forex (RFCD)** | `/banking`, `/costs/*`, blog: `dual-currency-card-endorsement-bangladesh`, `rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix`, `shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah`, `cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide`, `book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card` | Diaspora-specific pain (bKash vs card, $300 limit, DCC) | **Save + Share** |
| **F — Pre-Departure & Tools** | `/pre-departure`, `/tools`, `/tools/*`, `/experiences`, blog: `dhaka-airport-outbound-immigration-checklist-noc-go`, `flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp`, `best-travel-esim-and-schengen-travel-insurance-bangladesh-guide`, `bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh` | Checklist + eSIM/Airalo + AirHelp | **Save** (airport checklist) |

> **No new pages are created in this window.** Every CTA maps to a URL above that already exists and that prerender + `verify:build` (345/345) covers.

---

## 5) Format System — every asset has a spec

| Format | Spec | Cadence (21d) | Tool | Notes |
|---|---|---|---|---|
| **Static — single** | 1080×1350 (4:5 feed), navy `#0B192C` + gold `#F6B73C` + ivory, ≤ 18 words, one CTA | 7 | Canva | Faces > skylines for CTR; ≤ 20% text on image |
| **Carousel** | 1080×1350, 5–7 slides, slide 1 hook, slides 2–5 payload, slide 6 CTA, slide 7 follow | 6 | Canva | Export as 7× PNG or one PDF carousel for LinkedIn |
| **Reel / Short / TikTok** | 1080×1920 (9:16), 7–25s, burned-in captions (SRT), hook in 0–2s, end-card 2s | 7 | CapCut | B-roll + type + phone VO — no shoot |
| **Story** | 1080×1920, poll/quiz/link sticker | Daily | IG/FB | Reposts feed + one sticker |
| **Medium Import** | `Import story` from canonical, 1 CTA to matching cluster | 3 (D7, D14, D21) | Medium | Tags: `Travel`, `Bangladesh`, `Umrah`, `Budget Travel`, `Visas`. Verify canonical in view-source. |
| **Substack Issue** | 250–400 word excerpt dispatch, *not* full text, `Read the full guide →` | 3 (D3, D10, D17) | Substack | Excerpt only; never the same body twice |
| **Reddit answer** | 10:1 rule, text-only, link only if genuinely helpful + sub allows it, never affiliate link | 6 + 1 post | Reddit | Link in comment, never title |
| **Pinterest Pin** (optional) | 1000×1500, repins carousel cover | 3 | Pinterest | Lowest effort — skip if short on time |

### Brand tokens

- **Navy** `#0B192C` (backgrounds, scrim) · **Gold** `#F6B73C` (CTAs, accents) · **Ivory** `#FFF8E7` (text on navy). Type: `Outfit` / `Inter` per `src/index.css`.
- Photography from `public/assets/images/` derivatives and `E:\e-COMMERCE BUSINESS WEBSITE\URAL\image-masters-backup\` masters — not mismatched stock. Registered dims in `src/utils/imageAssets.ts` (e.g., `bangkok_destination_1781544149435`, `rfcd_foreign_currency_banking_1790486762760`).
- Copy tone: Dhaka-specific, price-aware, checklist-first — not generic wanderlust. Every factual claim cites its page's `keyFacts`/`visaRequirement`/`priceRangeBdt`, never invented.

### Tagging — copy-paste, never retype

```
?utm_source={instagram|tiktok|facebook|linkedin|x|medium|substack|reddit}
&utm_medium={social|referral|newsletter}
&utm_campaign=21d_{pillar}
&sub_id={soc|med|sub|red}_{pillar}_d{NN}
```

| Surface | `sub_id` prefix | Example |
|---|---|---|
| IG/FB/TikTok/X/Pinterest | `soc_` | `soc_visa_d03` |
| Medium | `med_` | `med_umrah_d14` |
| Substack | `sub_` | `sub_visa_d03` |
| Reddit | `red_` | `red_umrah_d15` |

GA4 reads `affiliate_partner_click` + `travelpayouts_referral_click` on `link_label` (single key — `link_text`/`partner_label` bug fixed `12` §P1). Every outbound click must fire with `link_label` populated.

---

## 6) The 21-Day Calendar

### Weekly arc

| Week | Theme | Hero pillars | Why this order |
|---|---|---|---|
| **Week 1 — Foundations (Days 1–7)** | "We moved. We're alive. Here's what we do." | **C** (Visas) + **A** (Umrah teaser) | Builds saves (checklists) before asking for clicks; lets indexing settle before first Medium import |
| **Week 2 — The Money Pillar (Days 8–14)** | "Umrah properly, with UK money" | **A** + **E** (Banking/RFCD) | Highest affiliate intent; monetises Week 1 audience |
| **Week 3 — Escape & Book (Days 15–21)** | "Where you'd actually go next" | **B** (Flights) + **D** (Destinations) | Converts wanderlust into widget searches; closes on a booking CTA as the watch window ends |

### Cadence

- **AM 08:30 BST** — IG + FB Page cross-post (carousel or reel, alternating). Diaspora commutes; BDT audience is afternoon.
- **PM 18:30 BST** — TikTok + YT Shorts + X cut-down of AM (same hook, tighter, burned captions). LinkedIn: carousel PDF at 09:00 BST on Mon/Wed/Fri.
- **Stories** — poll/quiz repost of feed, daily.
- **Satellites** — per table below (manual at 19:00 BST).

### Master Table

| Day | Lang | Pillar | Format (AM) | Hook (slide 1 / 0–2s) | CTA link (example) |
|---|---|---|---|---|---|
| **1 — Mon** | EN | — | **Static** (We moved) | `We moved → uraltravel.co.uk ✈️ Same guides, new home.` | `/` (pinned post, no UTM needed) |
| **2 — Tue** | BN | C | **Carousel** | `ভিসা ছাড়া কোথায় যাবেন? ৪১ দেশের তালিকা` | `/bn/visa-free-countries` |
| **3 — Wed** | EN | C | **Carousel** | `Visa-free with a Bangladeshi passport: 41 countries (2026)` | `/visa-free-countries` |
| **4 — Thu** | BN | A | **Reel** | `উমরাহ খরচ ২০২৬: কোথায় টাকা যায়?` | `/bn/umrah` |
| **5 — Fri** | EN | F | **Static checklist** | `DAC airport outbound: 9 docs they actually ask for` | `/pre-departure` |
| **6 — Sat** | BL | D | **Carousel** | `KTM in 1h 30m — Dhaka ↔ Kathmandu for BDT 28k?` | `/flights/dhaka-kathmandu` |
| **7 — Sun** | EN | C | **Reel** | `Thailand e-Visa from Dhaka: 6 docs, no agent needed` | `/visa/thailand` |
| **8 — Mon** | EN | A | **Carousel** | `Nusuk + Saudi Visa Bio: 2 apps, 1 Rawdah permit` | `/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit` |
| **9 — Tue** | BN | — | **Repost only** | *(Buffer — best of Week 1 reshared)* | — |
| **10 — Wed** | BN | A | **Reel** | `মক্কা-মদিনা হোটেল জোন: হারাম থেকে হাঁটা দূরত্ব কত?` | `/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh` |
| **11 — Thu** | EN | E | **Carousel** | `RFCD vs $300 quota: the fix for frequent flyers` | `/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix` |
| **12 — Fri** | EN | A | **Static** | `Women on Umrah: mahram, gates, Rawdah — 2026 rules` | `/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates` |
| **13 — Sat** | BL | A | **Reel** | `Ihram: Dhaka airport vs mid-air miqat?` | `/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules` |
| **14 — Sun** | BN | E | **Carousel** | `Dual-currency card: endorsement কোথায়, কত ডলার?` | `/blog/dual-currency-card-endorsement-bangladesh` |
| **15 — Mon** | EN | B | **Carousel** | `Cheapest month to fly DAC ↔ KTM/DXB — BDT 28k benchmark` | `/flights` |
| **16 — Tue** | BN | — | **Repost only** | *(Buffer — best of Week 2 reshared)* | — |
| **17 — Wed** | EN | D | **Reel** | `Singapore in 4 days: MRT + Mustafa + halal, under BDT…` | `/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide` |
| **18 — Thu** | BN | D | **Carousel** | `মালদ্বীপ বাজেট: Maafushi vs resort — BDT কত?` | `/blog/maldives-budget-trip-bangladesh-maafushi` |
| **19 — Fri** | EN | B | **Reel** | `CGP → DXB direct: flydubai vs Biman, baggage compared` | `/blog/chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai` |
| **20 — Sat** | BL | F | **Static** | `Flight delayed 3h+? AirHelp pays up to €600` | `/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp` |
| **21 — Sun** | EN | E | **Carousel** | `BDT → SAR without DCC: the 3% you're losing at exchange` | `/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide` |

BL = bilingual slides (EN title + BN subtitle). Every row above has a PM cut-down + Stories poll — omitted from the table for density.

### Satellite milestones (inside the 21 days)

| Day | Surface | Action | Canonical / content discipline |
|---|---|---|---|
| **1** | All bios | Update every bio link → `https://uraltravel.co.uk`; pin the "We moved" static | — |
| **3** | **Substack #1** | Excerpt: *"3 visa changes for Bangladeshi travellers this month"* → `/visa-free-countries` | 280 words, excerpt only, `utm_source=substack&sub_id=sub_visa_d03` |
| **7** | **Medium #1** | **Import story** — visa-free guide (`/visa-free-countries`) | Import, not paste; verify `rel=canonical` → `uraltravel.co.uk` in view-source |
| **10** | **Substack #2** | Excerpt: *"Umrah cost breakdown 2026 — where the money goes"* → `/umrah` | 320 words, BN excerpt variant available |
| **12–17** | **Reddit** | 6 **answer-only** comments (`r/bangladesh`, `r/Umrah`, `r/visas`, `r/travel`) — no link unless genuinely helpful + sub allows it | 10:1 rule; link in comment, never title; never affiliate link |
| **14** | **Medium #2** | **Import** — Umrah budgeting article (`makkah-madinah-hotel-zones-…` or the Umrah budget cluster) | Same import discipline |
| **17** | **Substack #3** | Excerpt: *"Cheapest month to fly DAC ↔ KTM/DXB — BDT 28k benchmark"* → `/flights` | 260 words |
| **18** | **Reddit post** | First native **post** — only if karma threshold + sub rules allow (e.g., `r/bangladesh` checklist post) | Link in 1st comment; no affiliate |
| **21** | **Medium #3** | **Import** — Banking/RFCD explainer (`/banking` or `dual-currency-card-endorsement-…`) | Last import before handoff |

---

### Per-Day Detail (copy → visual → CTA → tags)

> Each day below is the **brief** for the AM feed post (IG/FB). The PM cut-down reuses the same hook narrowed to 7–9s with burned captions. Stories = 1 poll/quiz sticker reposting the feed. Hashtags from §9. All factual claims must match the page's `keyFacts`/`priceRangeBdt`/`visaRequirement` — never invent a number.

#### Day 1 — Mon — EN — Pinned "We moved"

- **Format:** Static 1080×1350
- **Visual:** Navy field, gold `URAL` wordmark, `uraltravel.co.uk` large, small `ex ural-travel.pages.dev → 301` trust line at bottom. No photo — typographic only.
- **Copy:** `We moved.` / `Same Dhaka-first guides.` / `New home: uraltravel.co.uk` / `Fares · Visas · Umrah · Stays — in BDT & GBP.`
- **Caption (EN):** `Same guides, new address. URAL is now at uraltravel.co.uk ✈️ — flights, visas, Umrah and stays for Bangladeshi travellers, in BDT and GBP. Save this for your next trip. #URALTravel`
- **CTA:** Pin to profile. Link in bio → `https://uraltravel.co.uk/?utm_source=instagram&utm_medium=social&utm_campaign=21d_launch&sub_id=soc_launch_d01`
- **Satellite:** Update all 5 bios today.

#### Day 2 — Tue — BN — Pillar C — Visa-free carousel

- **Format:** Carousel 7 slides
- **Slides:** 1 Hook: `ভিসা ছাড়া কোথায় যাবেন? ৪১ দেশের তালিকা (২০২৬) ✈️` · 2–3 Asia · 4 Africa · 5 Americas/Oceania · 6 Tip: `পাসপোর্ট মেয়াদ ৬ মাস + রিটার্ন টিকিট = ঝামেলা কম` · 7 CTA: `পুরো তালিকা + থাকার মেয়াদ → লিঙ্ক বায়োতে`
- **Caption (BN):** `বাংলাদেশি পাসপোর্টে ভিসা ছাড়া ৪১ দেশ — ২০২৬ আপডেট। স্লাইডে ৪১ দেশের গ্রুপ + থাকার মেয়াদ। পুরো গাইড + টিপস বায়ো লিঙ্কে। সেভ করে রাখুন, বন্ধুকে শেয়ার করুন।`
- **Tags:** `?utm_source=instagram&utm_medium=social&utm_campaign=21d_visa&sub_id=soc_visa_d02`
- **Link:** `https://uraltravel.co.uk/bn/visa-free-countries?...`
- **PM cut:** 12s country montage + VO `ভিসা ছাড়া ৪১ দেশ — তালিকা বায়োতে`

#### Day 3 — Wed — EN — Pillar C — Visa-free carousel (EN twin)

- **Format:** Carousel 7 slides (EN twin of Day 2 — not a repost, same data, English copy for reach)
- **Slides:** 1 `Visa-free with a Bangladeshi passport: 41 countries (2026)` · 2–5 Regions + stay length · 6 Pro tip: `6-month passport + return ticket = fewer questions at DAC` · 7 CTA
- **Caption (EN):** `41 countries visa-free on a Bangladeshi passport — 2026 update. Swipe for regions + allowed stay. Full list + tips on site — link in bio. Save for your next trip.`
- **Tags:** `?utm_source=instagram&utm_medium=social&utm_campaign=21d_visa&sub_id=soc_visa_d03`
- **Link:** `https://uraltravel.co.uk/visa-free-countries?...`
- **Satellite — Substack #1 (19:00 BST):** 280-word excerpt: *"3 visa changes that matter this month for Bangladeshi travellers"* — one paragraph each on Thailand e-Visa, Malaysia MDAC, visa-free deltas. Ends `Read the full list →` with `utm_source=substack&sub_id=sub_visa_d03`.

#### Day 4 — Thu — BN — Pillar A — Umrah cost Reel

- **Format:** Reel 20s — B-roll: `umrah_makkah_haram_guide_1790430007679` + `ramadan_makkah_night_1790484415220` (already in `imageAssets.ts`), gold price-chip overlays
- **Hook 0–2s (burned):** `উমরাহ ২০২৬: খরচ কোথায় যায়? ৬০ সেকেন্ডে হিসাব`
- **VO (BN):** `ভিসা + বিমান + হোটেল + ট্রান্সফার — কোনটা কত? BDT + SAR দুটোতেই হিসাব দেখুন।`
- **End-card 2s:** `পুরো বাজেট ক্যালকুলেটর → uraltravel.co.uk/umrah` + QR
- **Caption:** `উমরাহ খরচ ২০২৬ — BDT + SAR দুটোতেই ব্রেকডাউন। ফুল গাইড বায়োতে। হজ-যাত্রী পরিবারের সাথে শেয়ার করুন।`
- **Tags:** `&sub_id=soc_umrah_d04` → `https://uraltravel.co.uk/bn/umrah?...`

#### Day 5 — Fri — EN — Pillar F — DAC outbound checklist (save magnet)

- **Format:** Static 1080×1350 — checklist with 9 checkboxes, navy/gold, `DAC ✈️` header
- **Items (from `/pre-departure` + `dhaka-airport-outbound-immigration-checklist-noc-go`):** Passport (6 mo) · Visa/e-Visa print · Return ticket · Hotel proof · NOC/GO (govt staff) · Currency endorsement / RFCD note · eSIM · Cash USD/SAR · Boarding pass
- **Hook:** `DAC outbound: 9 docs they actually ask for`
- **Caption (EN):** `DAC immigration checklist — the 9 things they actually ask for at Dhaka airport (NOC/GO, endorsement, return ticket…). Save this before you fly. Full pre-departure guide in bio.`
- **Tags:** `&sub_id=soc_predep_d05` → `https://uraltravel.co.uk/pre-departure?...`

#### Day 6 — Sat — Bilingual — Pillar D — Dhaka ↔ Kathmandu

- **Format:** Carousel 6 slides — route map + fare benchmark + visa note
- **Hook:** `KTM in 1h 30m — Dhaka ↔ Kathmandu from BDT 28k?`
- **Slides:** 1 Hook · 2 `BDT 28,000–40,000 RT (Economy)` · 3 `Biman · Himalaya · 1h 30m direct` · 4 `Visa: Free 30-day on arrival (1st entry/year)` · 5 `Best book: 4–8 weeks ahead` · 6 CTA `Check live fares →`
- **Caption (BL):** `Dhaka ↔ Kathmandu — 90 minutes, from BDT 28k return. Swipe for airlines, visa & best time to book. Live fares in bio. #VisitNepal`
- **Link:** `https://uraltravel.co.uk/flights/dhaka-kathmandu?...&sub_id=soc_flights_d06`

#### Day 7 — Sun — EN — Pillar C — Thailand e-Visa Reel

- **Format:** Reel 18s — B-roll `passport_stamps_boarding_window_1790486849797` + `bangkok_destination_1781544149435`
- **Hook 0–2s:** `Thailand e-Visa from Dhaka: no agent needed`
- **VO:** `thaievisa.go.th — 6 docs, BDT 60k bank proof, 60-day TR. Full doc list + portal steps on site.`
- **Caption:** `Thailand e-Visa for Bangladeshis — the 6-document checklist and the thaievisa.go.th steps. Agent not needed. Guide in bio.`
- **Link:** `https://uraltravel.co.uk/visa/thailand?...&sub_id=soc_visa_d07`
- **Satellite — Medium #1 (19:00 BST):** `Import story` from `https://uraltravel.co.uk/visa-free-countries` → verify `rel=canonical` in Medium view-source → 1 CTA to `/visa/thailand` at foot. Tags: `Travel`, `Bangladesh`, `Visas`.

#### Day 8 — Mon — EN — Pillar A — Nusuk + Saudi Visa Bio

- **Format:** Carousel 6 slides — phone mockups + step chips
- **Hook:** `Nusuk + Saudi Visa Bio: 2 apps, 1 Rawdah permit`
- **Slides:** 1 Hook · 2 `Step 1: Saudi Visa Bio (biometrics)` · 3 `Step 2: Nusuk (Rawdah slot)` · 4 `Common fail: wrong app / late slot` · 5 `BDT tip: do biometrics before Nusuk` · 6 CTA
- **Caption:** `Umrah apps decoded — Nusuk + Saudi Visa Bio in 5 slides. Save before you apply, share with your group. Full guide in bio.`
- **Link:** `.../blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit?...&sub_id=soc_umrah_d08`

#### Day 9 — Tue — BN — Buffer / Repost

- **Format:** Story repost of best performer (Days 2–8 by saves) + poll: `পরের গাইড কোনটা? উমরাহ হোটেল / ভিসা / RFCD`
- **Post:** Reshare Day 4 or Day 5 carousel to feed as "ICYMI" — no new shoot, 2-min schedule.

#### Day 10 — Wed — BN — Pillar A — Hotel zones + Haramain

- **Format:** Reel 22s — B-roll `masjid_nabawi_arches_1790484388265` + `haramain_bullet_train_1790484312808`
- **Hook:** `মক্কা-মদিনা হোটেল: হারাম থেকে হাঁটা দূরত্ব কত?`
- **VO:** `Ajyad vs Misfalah vs Haramain train — হাঁটা, ভাড়া, সময়। পুরো জোন গাইড বায়োতে।`
- **Link:** `.../blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh?...&sub_id=soc_umrah_d10`
- **Satellite — Substack #2 (19:00 BST):** 320-word excerpt: *"Umrah 2026 — where the money actually goes"* (visa + flight + hotel + transfer + food). Ends `Try the BDT budget calculator →` + `utm_source=substack&sub_id=sub_umrah_d10`.

#### Day 11 — Thu — EN — Pillar E — RFCD vs $300 quota

- **Format:** Carousel 7 slides — compare table + RFCD explainer
- **Hook:** `RFCD vs $300 quota: the fix for frequent flyers`
- **Slides:** 1 Hook · 2 `$300/trip limit?` · 3 `RFCD = your own USD account` · 4 `Who qualifies` · 5 `How to open (bank list)` · 6 `When to use which` · 7 CTA `Full RFCD guide →`
- **Caption:** `The $300 travel quota is real — RFCD is the legal fix for frequent flyers. Swipe for who qualifies + how to open. Save this if you fly 3+ times/year.`
- **Link:** `.../blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix?...&sub_id=soc_banking_d11`

#### Day 12 — Fri — EN — Pillar A — Women on Umrah

- **Format:** Static 1080×1350 — respectful photo + 4 rule chips (navy, gold dividers)
- **Hook:** `Women on Umrah: mahram, gates, Rawdah — 2026 rules`
- **Chips:** Mahram rules · Ladies' gates · Rawdah access · Hotel proximity tip
- **Caption:** `Umrah rules for women (2026) — mahram, ladies' gates, Rawdah permits. Respectful, current, sourced. Share with your group. Full guide in bio.`
- **Link:** `.../blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates?...&sub_id=soc_umrah_d12`
- **Reddit this week (Days 12–14):** 3 answer-only comments in `r/Umrah` / `r/bangladesh` / `r/visas` — text answers from the guides, no link unless the OP asks for a source.

#### Day 13 — Sat — Bilingual — Pillar A — Ihram / miqat

- **Format:** Reel 20s — B-roll `ihram_preparation_set_1790484426740`
- **Hook:** `Ihram: Dhaka airport vs mid-air miqat?`
- **VO:** `DAC vs transit vs Jeddah — where to enter ihram on each routing. Miqat map + rulings on site.`
- **Link:** `.../blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules?...&sub_id=soc_umrah_d13`

#### Day 14 — Sun — BN — Pillar E — Dual-currency endorsement

- **Format:** Carousel 6 slides — card mock + steps
- **Hook:** `Dual-currency card: endorsement কোথায়, কত ডলার?`
- **Slides:** 1 Hook · 2 `Endorsement = passport seal` · 3 `Bank list + docs` · 4 `Limit + validity` · 5 `RFCD vs card — কখন কোনটা?` · 6 CTA
- **Caption (BN):** `Dual-currency card endorsement — কোন ব্যাংকে, কত ডলার, কী লাগে। স্লাইডে পুরো প্রসেস। সেভ করুন।`
- **Link:** `.../blog/dual-currency-card-endorsement-bangladesh?...&sub_id=soc_banking_d14`
- **Satellite — Medium #2 (19:00 BST):** `Import story` from the Umrah hotel-zones or Nusuk guide — verify canonical. This is the money-pillar import.

#### Day 15 — Mon — EN — Pillar B — Flights hub

- **Format:** Carousel 6 slides — DAC hub map + benchmarks
- **Hook:** `Cheapest month to fly DAC ↔ KTM/DXB — BDT 28k benchmark`
- **Slides:** 1 Hook · 2 `DAC → KTM BDT 28–40k RT` · 3 `DAC → DXB CGP → DXB direct` · 4 `DAC → LAX 1–2 stops, BDT 150–240k` · 5 `Book 4–8 weeks ahead (short), 3–5 months (long)` · 6 CTA `Check live fares →`
- **Link:** `https://uraltravel.co.uk/flights?...&sub_id=soc_flights_d15`
- **Reddit:** answer in `r/travel` / `r/bangladesh` on DAC fares — factual, no promo tone.

#### Day 16 — Tue — BN — Buffer / Repost

- **Format:** Repost best of Days 10–15 + story Q&A box: `প্রশ্ন আছে? পরের Reel-এ উত্তর দেব`
- **No new shoot.**

#### Day 17 — Wed — EN — Pillar D — Singapore 4-day

- **Format:** Reel 22s — B-roll `singapore_mrt_gardens_bay_1790520762227` + `singapore_destination_1790387270177`
- **Hook:** `Singapore in 4 days: MRT + Mustafa + halal`
- **VO:** `Day 1 Marina Bay, Day 2 Little India, Day 3 Sentosa, Day 4 Mustafa — BDT budget + halal tips on site.`
- **Link:** `.../blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide?...&sub_id=soc_dest_d17`
- **Satellite — Substack #3 (19:00 BST):** 260-word excerpt: *"Cheapest month to fly DAC ↔ KTM/DXB"* → `/flights` + DAC→LAX teaser. `sub_flights_d17`.

#### Day 18 — Thu — BN — Pillar D — Maldives Maafushi

- **Format:** Carousel 6 slides — Maafushi vs resort, boat vs seaplane, BDT costs
- **Hook:** `মালদ্বীপ বাজেট: Maafushi vs resort — BDT কত?`
- **Slides:** 1 Hook · 2 `Maafushi guesthouse BDT …` · 3 `Resort BDT …` · 4 `Speedboat vs seaplane` · 5 `Halal + visa-free 30d` · 6 CTA
- **Link:** `.../blog/maldives-budget-trip-bangladesh-maafushi?...&sub_id=soc_dest_d18`
- **Reddit — first native post (only if eligible):** `r/bangladesh` — *"Bangladeshi passport: Maafushi on a budget — what I wish I knew (facts + costs)"* — link in **first comment**, not title. If karma insufficient, post stays as 2 more answers.

#### Day 19 — Fri — EN — Pillar B — CGP → DXB

- **Format:** Reel 20s — airport B-roll `dhaka_airport_widebody_airlines_tarmac_1790520836931`
- **Hook:** `CGP → DXB direct: flydubai vs Biman, baggage compared`
- **VO:** `Chattogram to Dubai — direct options, baggage 20–30kg, best book window.`
- **Link:** `.../blog/chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai?...&sub_id=soc_flights_d19`

#### Day 20 — Sat — Bilingual — Pillar F — AirHelp

- **Format:** Static 1080×1350 — delay claim card, `€600` chip in gold
- **Hook:** `Flight delayed 3h+? You may be owed €600`
- **Copy:** `EU261 + AirHelp — check eligibility in 2 min. Dhaka departures via EU hubs count.`
- **CTA:** `Check your flight →` (AirHelp via `AFFILIATE_LINKS.airhelp`, tagged `sub_id=soc_tools_d20` if link supports it; otherwise UTM only)
- **Link:** `.../blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp?...&sub_id=soc_tools_d20`

#### Day 21 — Sun — EN — Pillar E — DCC / exchange (closes on money)

- **Format:** Carousel 7 slides — DCC trap explainer + comparison table
- **Hook:** `BDT → SAR without DCC: the 3% you're losing`
- **Slides:** 1 Hook · 2 `What is DCC?` · 3 `ATM "pay in BDT?" — always choose SAR` · 4 `Card vs cash vs RFCD — when each wins` · 5 `Jeddah airport exchange tip` · 6 `BDT→SAR calculator on site` · 7 CTA
- **Caption:** `BDT → SAR without the 3% DCC loss — swipe for the trap + the fix. Calculator + tips in bio. Last post of our 21-day launch — what's next? You tell us.`
- **Link:** `.../blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide?...&sub_id=soc_banking_d21`
- **Satellite — Medium #3 (19:00 BST):** `Import story` from the banking/RFCD guide — closes the money pillar.

---

## 7) Repurposing Engine

```
1 long article (site, already live)
 └─► 1 carousel (5 facts from FAQs/keyFacts — never invent)
     └─► 1 Reel (carousel VO + B-roll, 18s) + 3 cut-downs (TikTok / YT Shorts / X, 7–9s)
         └─► 1 Story poll/quiz
             └─► 1 satellite (Substack excerpt OR Medium Import — never both for the same article)
```

- No article is repurposed twice as full text.
- `/visa-free-countries` and the Umrah budget cluster stay **exclusive** to the site as canonicals — satellites only import or excerpt them once each (`14` §4.5).
- B-roll sources: `public/assets/images/` + `E:\e-COMMERCE BUSINESS WEBSITE\URAL\image-masters-backup\` + the same photo that powers the article's hero — never mismatched stock.

---

## 8) Production Workflow — how a solo founder ships it in 30 min/day

### Day 0 — Batch (3 hours, once)

1. **Pick 7 source pages** that map to A–F (the 21 rows above use 19 distinct URLs — 7 pillars × repurposing covers them; shortlist: visa-free, Thailand e-Visa, Umrah hub, Nusuk, RFCD, dual-currency, DAC checklist).
2. **Write 21 hooks + captions** into one sheet (EN/BN alternating per master table). Pull B-roll file names from `src/utils/imageAssets.ts` — write the exact file stem into the sheet so Day N is copy-paste.
3. **Lock templates:** one Canva carousel master (1080×1350, navy/gold/ivory, `Outfit` for headings, `Inter` for body, 18-word max on cover), one Reel end-card (2s, `ural.travel.co.uk` + QR, gold on navy). Duplicate — never redesign.
4. **Schedule Week 1** in Meta Business Suite (FB + IG) + TikTok scheduler. Substack/Medium are manual.

### Daily (30 min)

| Min | Task |
|---|---|
| 0–5 | Pull today's row — hook, caption, link+tags, B-roll file stem |
| 5–20 | Edit Reel in CapCut (VO on phone, auto-captions, end-card) or duplicate carousel in Canva (replace 5 slides) |
| 20–28 | Schedule AM + PM, set Story sticker, paste UTM+sub_id from sheet — never retype |
| 28–30 | Post 1 Reddit answer if scheduled (Days 12–17) — text-only, 3 sentences of value first |

### Scheduling — BST (diaspora window)

- **AM 08:30 BST** — IG + FB cross-post
- **PM 18:30 BST** — TikTok / YT Shorts / X cut-down
- **Satellites 19:00 BST** — Medium/Substack manual
- Diaspora scroll peaks: 07:00–09:00 & 18:00–22:00 BST. BDT audience gets the same post at their afternoon — acceptable trade for one schedule.
- **Buffer days (9, 16)** are repost-only — no shoot, no edit.

---

## 9) Hashtag & Hook Systems

### Hashtag ladder (use 8–10 per post, in this order)

| Tier | Tags | Count |
|---|---|---|
| **Branded** | `#URALTravel` `#Ural` `#উড়াল` | 2–3 |
| **Niche (high intent)** | `#BangladeshiPassport` `#VisitNepal` `#Umrah2026` `#RFCD` `#DualCurrency` `#DAC` | 3 |
| **Broad** | `#BudgetTravel` `#TravelBangladesh` `#VisaFree` | 2 |
| **Location** | `#Dhaka` `#KTM` `#DXB` `#Makkah` (one per post, matching the CTA) | 1 |

Never exceed 10; never paste the same block 21 times — swap the location + niche tag per pillar.

### Hook library — 30 Dhaka-specific hooks (pick, don't invent)

One per post; all tested for save/share intent:

1. `Visa-free with a Bangladeshi passport: 41 countries (2026)`
2. `ভিসা ছাড়া কোথায় যাবেন? ৪১ দেশের তালিকা`
3. `DAC outbound: 9 docs they actually ask for`
4. `উমরাহ ২০২৬: খরচ কোথায় যায়?`
5. `Nusuk + Saudi Visa Bio: 2 apps, 1 Rawdah permit`
6. `RFCD vs $300 quota: the fix for frequent flyers`
7. `Dual-currency card: endorsement কোথায়, কত ডলার?`
8. `BDT → SAR without DCC: the 3% you're losing`
9. `Thailand e-Visa from Dhaka: no agent needed`
10. `Malaysia MDAC: the arrival card everyone forgets`
11. `Singapore in 4 days: MRT + Mustafa + halal`
12. `মালদ্বীপ বাজেট: Maafushi vs resort`
13. `KTM in 1h 30m — Dhaka ↔ Kathmandu from BDT 28k`
14. `CGP → DXB direct: flydubai vs Biman`
15. `Cheapest month to fly DAC ↔ KTM/DXB`
16. `Women on Umrah: mahram, gates, Rawdah — 2026 rules`
17. `Ihram: Dhaka airport vs mid-air miqat?`
18. `Makkah hotels: walking distance from Haram?`
19. `Flight delayed 3h+? You may be owed €600`
20. `eSIM vs roaming: BDT 800 saves BDT 8,000`
21. `Hajj vs Umrah: cost, quota, timeline — side by side`
22. `bKash → BDT booking: flights without a card?`
23. `Zamzam + dates + gold: Jeddah customs limits`
24. `Halal in Makkah on BDT 500/meal?`
25. `Ziyarah taxi: Badr, Taif, Quba — what to pay`
26. `ePassport renewal: 64 districts, fees, timeline`
27. `Travel history ladder: Nepal → Maldives → Malaysia`
28. `Havana or Chefchaouen — halal on a Bangladeshi passport?`
29. `Stopover 96h: Umrah on a Saudi transit`
30. `We moved → uraltravel.co.uk`

---

## 10) Copy Bank — caption templates

### EN carousel

```
{Hook} — {1-line value prop}. Swipe for {what's inside: e.g., regions + stay length}.
Save before you fly, share with your group.
Full guide + tips → link in bio. #URALTravel
```

### BN carousel

```
{Hook} — {১ লাইনে কী পাবেন}। স্লাইডে {ভিতরে কী আছে}।
সেভ করে রাখুন, বন্ধুকে শেয়ার করুন।
পুরো গাইড বায়ো লিঙ্কে। #URALTravel
```

### Reel (EN/BN)

```
{POV or question hook} ✈️ {1-line payoff}.
Full {checklist/cost/map} on site — link in bio.
Follow @uraltravelbd for BDT-first travel guides.
```

---

## 11) Measurement — what we watch and when we cut

| Signal | Where | Read when | Action |
|---|---|---|---|
| `affiliate_partner_click` by `sub_id` / `partner_name` / `link_label` | GA4 Events + TP Reports → Clicks | Daily (GA4), weekly (TP) | — |
| Sessions by `utm_source` / `utm_campaign` | GA4 Acquisition | Daily | Kill or double the **pillar**, not the platform |
| `travelpayouts_referral_click` by `referral_sub_id` | GA4 | Daily | Separate from affiliate; do not conflate |
| GSC: `uraltravel.co.uk` indexed pages / queries / countries | GSC | Weekly 10 min (`15` §2.1) | Expect 20–40% dip for 1–4 weeks; no on-site fix |
| Reddit mod warnings / karma | Reddit inbox | Immediate | That subreddit closed permanently on first warning |
| Medium canonical | View-source on each Medium post | Each import | Must resolve to `uraltravel.co.uk`, not `medium.com` |

### Stop rules

| Condition | Action |
|---|---|
| Any surface sends **≥ 30 sessions / 30 days with 0 `affiliate_partner_click`** | **Cut it, don't optimise it** (`14` §6) |
| A pillar gets clicks but no saves, or saves but no clicks | Keep the pillar for the other metric — saves build GSC brand queries, clicks build revenue; they don't need to be the same post |
| Reddit post draws a warning | That sub is closed for the 21 days — do not re-test |
| Medium import cannibalises (ranks above origin) | Pause Medium; audit canonical — should not happen via Import story, but check |

### S1 — the 15-min console task to do before Day 1

Per `15` §4/S1 — no deploy, no code:

- [ ] GA4 → Custom definitions → event-scoped dimensions: `referral_sub_id`, `partner_name`, `link_label`, `affiliate_page_path`, `affiliate_destination`, `page_location`.
- [ ] GA4 → Mark `affiliate_partner_click` + `travelpayouts_referral_click` + `whatsapp_inquiry` as **key events**.
- [ ] GA4 → Default URL → `https://uraltravel.co.uk`; Unwanted referrals → `ural-travel.pages.dev`, sandbox hosts.
- [ ] Annotate consent default (`analytics_storage: denied`, `wait_for_update: 500`, not geo-fenced) so you don't misread a consent dip as a migration dip (`12` §P1).

Without S1, the 21 days are **unmeasurable** — social proves nothing.

---

## 12) Risks & Guardrails

| Risk | Mitigation |
|---|---|
| Watch-window violation (canonical/title/schema change) | Calendar drives only to **existing** URLs; copy lives on social, not on-site. New URLs deferred to S4. |
| Cannibalisation (satellite outranks origin) | Full text never on Substack; Medium only via **Import story** after indexing; no-index on satellites never. |
| Reddit domain removal | 10:1 rule, text-only, affiliate links never in comments, link in comment not title (`14` §4.3). |
| Attribution silently zero | Day 0 dashboard check (`15` §2.2) — project 589561 active, programs re-attached, Drive unlocked, Link switching ON, one tagged click per family. |
| Consent misread (GA4 dip = migration dip) | Annotate before reading baseline (`12` §P1); consent is not geo-fenced. |
| Burnout | 30 min/day after Day 0 batch; buffer days 9 + 16 are repost-only. |
| BN quality | BN captions cross-checked against `src/data/bengaliContent.ts` tone; no raw machine-BN without a native read. |
| Fact drift | Every price/visa/duration cites the page's `priceRangeBdt`/`visaRequirement`/`duration` — never from memory. If the page updates, the social sheet updates. |

---

## 13) Handoff — Day 22 decides which frozen item comes back

Day 21 is not "done" — it is a **trigger check** against `15` §6. Pick the **first trigger that fires**:

| Trigger | Unfreezes |
|---|---|
| ≥ 100 sessions/month from any non-Google source | **S4** — UK/diaspora test cluster (5–10 URLs: Umrah from London/Manchester, UK→DAC visa logistics, GBP budget templates) |
| GSC shows UK impressions for any query | **S2** (disclosure + `/how-we-make-money/`) first, then S4 |
| First affiliate click with non-zero earnings | **S6** — conversion depth on that page only |
| ≥ 300 organic sessions/month | **S5** — P6b hero batches 1→2 |
| A brand/sponsor asks for a media kit | S2, S3, S5 immediately |
| A page converts > 3% on social traffic | S6 on *that* page only |

If **none** fires at Day 21: extend social for 14 days before unfreezing anything — distribution is still the constraint. Do not unfreeze on boredom, Lighthouse, or "it has been a month" (`15` §6 anti-triggers).

### What to bring to the Day 22 review

1. GA4: sessions by `utm_campaign` (which pillar won), `affiliate_partner_click` by `sub_id` (which surface converts), saves by post (which checklist is the lead magnet).
2. GSC: `uraltravel.co.uk` URL count toward 254, `pages.dev` decay, first UK queries if any.
3. Travelpayouts: clicks by `sub_id` vs GA4 — if TP shows 0 but GA4 shows clicks, re-check `trs=589561` + program attachment.
4. One decision: **which single S-item** to open next — never two at once (`12` dependency graph).

---

## 14) File Map — where everything referenced lives

| Concern | File |
|---|---|
| Freeze / queue of record | `docs/growth/15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md` |
| Satellite playbook (Medium/Substack/Reddit) | `docs/growth/14-DRIVE-REFERRAL-SYNDICATION-PLAN.md` §4 |
| Referral programme | `docs/growth/14-DRIVE-REFERRAL-SYNDICATION-PLAN.md` §3 |
| Watch rules + audience model | `docs/growth/12-POST-MIGRATION-ROADMAP.md` P3 + P6 |
| Status audit (ids, guards) | `docs/growth/13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md` |
| Brand tokens | `src/index.css`, `brand-kit/` |
| Image masters + dims | `src/utils/imageAssets.ts`, `public/assets/images/`, `E:\…\image-masters-backup\` |
| Analytics keys | `src/utils/analytics.ts` (`affiliate_partner_click`, `travelpayouts_referral_click`, `link_label`) |
| Social links / OG | `src/utils/schema.ts`, `src/hooks/useSeoMeta.ts`, `index.html` |
| Content inventory | `src/constants.ts`, `src/data/blogContent.ts`, `src/data/bengaliContent.ts` |

---

*Plan authored as senior travel marketing operator for a solo founder — graphic, short-video, and satellite surfaces sequenced so Week 1 builds saves, Week 2 monetises, Week 3 converts. Every CTA is freeze-compliant and tagged; every satellite respects canonical. Ship Day 0, measure by Day 7, decide by Day 22.*
