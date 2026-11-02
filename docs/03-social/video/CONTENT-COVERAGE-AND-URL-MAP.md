# Reel ↔ content coverage and URL map

**Status: current · 2 November 2026.** Companion to the two Hajj/Umrah reels in
this folder (`ural-hajj-umrah-reel-9x16-photo.mp4`, `…-share.mp4`).

Answering one question: **if a viewer watches the reel and goes to the site,
does the site have what the reel promised — and which URLs are involved?**

## 0. The decision in one line

**Two new articles, one defect fix, one structural page.**

Originally this audit recommended section upgrades only, under the
zero-new-article rule. On 2 November 2026 the owner overruled that and
[Publication Standard v2](../../growth/11-PUBLICATION-STANDARD-V2.md) replaced
the freeze with a gated standard. The two gaps below are now being written as
articles:

- `tawaf-sai-seven-circuits-step-by-step-guide`
- `hajj-rites-mina-arafah-muzdalifah-day-by-day`

Full spec: [PLAN-tawaf-and-hajj-rites](../../02-content/PLAN-tawaf-and-hajj-rites.md).
The reasoning for each — and the case where a section still beats a new URL —
is retained below as evidence.

## 1. What the reels promise

Ten scenes, same narration in both cuts.

| # | Time | On-screen Bangla | Promise type | Owner today | Verdict |
| --- | --- | --- | --- | --- | --- |
| 1 | 0.0 | হজ ও উমরাহ / পবিত্র ভূমির স্বপ্ন | mood | Cluster as a whole | ✅ |
| 2 | 5.8 | কিন্তু প্রশ্নটা একটাই — যাব কীভাবে, খরচ কত, প্রথমে কী করব? | mood | `/umrah` + pillar | ✅ |
| 3 | 13.3 | ধাপে ধাপে / মিনা · আরাফাহ মুজদালিফা · প্রতিটি ধাপের প্রস্তুতি | **specific claim** | `hajj-registration…` covers packages + Mina/Arafat **accommodation** | ❌ **Gap A** |
| 4 | 20.8 | ইহরাম / মিকাত থেকে তালবিয়া | specific claim | `wearing-ihram…-miqat-rules` (43× ihram, 23× miqat, 12× Talbiyah) | ✅ Strong |
| 5 | 28.0 | ভিসা / চেকলিস্ট, ধাপে ধাপে | specific claim | `nusuk-app…` (24× Nusuk) + stopover visa | ✅ Strong |
| 6 | 32.6 | বাজেট / সব হিসাব টাকায় · ফ্লাইট · হোটেল · ভিসা · খাবার | specific claim | Pillar `[[UMRAH_BUDGET_TABLE]]` + calculator on `/umrah` | ✅ (Umrah; Hajj partial) |
| 7 | 37.8 | নারী, বয়স্ক, প্রথম যাত্রী / আলাদা আলাদা গাইড | specific claim | `umrah-rules-for-women`, `umrah-with-elderly-parents` | ✅ (first-timer ⚠️ thin) |
| 8 | 43.7 | হজ ও উমরাহর বিস্তারিত গাইড | umbrella | Pillar (Umrah-weighted) + Hajj registration | ⚠️ Partial |
| 9 | 49.0 | তাওয়াফ / সাত প্রদক্ষিণ, এক ইবাদত | **specific claim** | None — no article explains tawaf or sa'i as a rite | ❌ **Gap B** |
| 10 | 53.4 | যাত্রার আগেই জেনে নিন · uraltravel.co.uk | CTA | `/umrah` | ✅ |

**Gap A evidence.** Across all English bodies: `Muzdalifah` appears **once**, in
the ziyarah taxi article, describing what a car can drive past off-season.
`Arafah` appears twice, both about accommodation. `Qurbani`, `tawaf al-ifadah`
and the 8–13 Dhul-Hijjah order: **zero**.

**Gap B evidence.** `tawaf` appears 8 times across the English bodies and 10
across the Bengali, always in passing — elderly mobility (1), women's gates (4),
Ramadan crowding/fasting (3), plus two references from the Hajj article.
No article explains the seven circuits, the starting point, or Safa–Marwa.
`/umrah` does not mention tawaf or sa'i at all. `Marwa` appears once, as
"Al-Marwah Gate 25" in a gate list.

## 2. URL inventory — everything related to these two videos

All absolute URLs are `https://uraltravel.co.uk` + the path.

### 2.1 Hubs, landing and route pages

| URL | Bengali | Role |
| --- | --- | --- |
| `/umrah` | `/bn/umrah` | Primary landing page; hero, booking paths, DIY itinerary, **BDT budget calculator**, Hajj/Umrah FAQ. The reel's end-card target. |
| `/flights/dhaka-madinah` | `/bn/flights/dhaka-madinah` | Only Saudi route page in the site. Search-intent entry for flights. |
| `/blog` | `/bn/blog` | Index; the cluster is reachable from here only via category filter. |

### 2.2 The Hajj/Umrah cluster — 17 posts

| English | Bengali | What it owns |
| --- | --- | --- |
| `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` | ✅ | **PILLAR** — visa routes, Nusuk, BDT budget table |
| `/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules` | ✅ | Ihram, miqat, Talbiyah — scene 4 |
| `/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit` | ✅ | Nusuk, biometrics, Rawdah permit — scene 5 |
| `/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah` | ✅ | 96-hour stopover visa route — scene 5 |
| `/blog/hajj-registration-bangladesh-government-vs-private-package-cost` | ✅ | Hajj registration, govt vs private, Mina/Arafat **accommodation** — scene 3 host |
| `/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates` | ✅ | Women: mahram, gates, ihram — scene 7 |
| `/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide` | ✅ | Elderly, wheelchair, medical — scene 7 |
| `/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget` | ✅ | Ramadan Umrah, itikaf |
| `/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh` | ✅ | Hotel zones, Haramain train |
| `/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide` | ✅ | Ziyarah: Badr, Taif, historical sites |
| `/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport` | ✅ | Customs: Zamzam, dates, gold |
| `/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals` | ✅ | Halal food, meal budget — scene 6 |
| `/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card` | ✅ | Booking in BDT, bKash, bank transfer |
| `/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah` | ✅ | Shariah-compliant cards, umrah spending |
| `/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia` | ✅ | Open-jaw flight strategy |
| `/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla` | ✅ | Airlines, baggage rules |
| `/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide` | ❌ **missing** | Umrah + Dubai combo |

### 2.3 Adjacent URLs the cluster links to

| URL | Bengali | Why it matters here |
| --- | --- | --- |
| `/blog/dhaka-airport-outbound-immigration-checklist-noc-go` | ✅ | Pre-departure documents; linked from the pillar |
| `/blog/dual-currency-card-endorsement-bangladesh` | ✅ | Passport endorsement / card activation; linked from the pillar |
| `/banking` | `/bn/banking` | Banking hub for the two money articles |
| `/tools/budget-calculator` | ✅ | Generic trip cost tool (not Umrah-specific) |
| `/tools/packing-checklist` | ✅ | Generic; no ihram-specific packing |
| `/tools/visa-checker` | ✅ | Generic; no Saudi entry in `/visa/` family |
| `/downloads/ural-hajj-preparation-checklist-2027-en.pdf` | ❌ **EN only** | Embedded in the Hajj article via `[[HAJJ_RESOURCE_DOWNLOAD]]` |

### 2.4 Infrastructure that does not exist

The page families exist for other destinations but have **no Saudi member**:

| Missing URL | Family it should join |
| --- | --- |
| `/visa/saudi-arabia-visa` | 6 country visa pages exist (`/visa/dubai-visa` …); the pattern is `/visa/{id}` |
| `/destinations/saudi-arabia` | 10 destination guides exist |
| `/hotels/makkah`, `/hotels/madinah` | 6 hotel pages exist |

Consequence: a viewer who acts on the reel enters at `/umrah` or a blog post and
never encounters a destination, visa or hotel page for Saudi Arabia. That is a
structural hole in the funnel, not a missing blog post — see §4.3.

## 3. Coverage matrix by reel beat

| Beat | Covered | Depth | Fix |
| --- | --- | --- | --- |
| Opening mood | yes | — | none |
| Visa / Nusuk / checklist | yes | strong | none |
| Ihram / miqat / Talbiyah | yes | strong | none |
| Budget in BDT | yes | strong for Umrah | add Hajj cost range to pillar (UP-2b) |
| Women / elderly | yes | strong | none |
| First-time traveller | partial | one paragraph | add a short section to the pillar (UP-5, optional) |
| Mina · Arafah · Muzdalifah rites | **no** | — | **UP-1** |
| Tawaf / sa'i | **no** | — | **UP-2** |
| Umbrella "detailed guides" | partial | Umrah-weighted | covered by UP-1 + UP-2 |

## 4. Decision

### 4.1 Historical recommendation (superseded)

The owner chose new articles for Gap A and Gap B; see §0 and the plan document.
The section-upgrade route below remains valid as a cheaper fallback if the
articles are ever pulled.

**UP-1 · Tawaf and sa'i as a rite**
Host: `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` (pillar + `/bn/`).
New section, ~350–500 words each language: where tawaf begins (the Black Stone
corner), seven circuits, what counts as a circuit, men's ramal in the first
three, sa'i between Safa and Marwa, what breaks it, and what a wheelchair or
elderly pilgrim does. Link to `umrah-rules-for-women` (gates/crowds),
`umrah-with-elderly-parents` (mobility), `ramadan-umrah-itikaf-guide` (crowd
timing).
Sources: Nusuk / haj.gov.sa rite guidance, dated.

**UP-2 · Hajj rites sequence**
Host: `/blog/hajj-registration-bangladesh-government-vs-private-package-cost`.
New section: 8–13 Dhul-Hijjah in order — Mina, Arafah, Muzdalifah, Jamarat,
qurbani, halq, tawaf al-ifadah — as a numbered sequence with what the pilgrim
does each day. Also add a Hajj cost band to the pillar (UP-2b), since scene 6
says "সব হিসাব টাকায়" and today only Umrah has a table.
Sources: haj.gov.sa / Nusuk current-season guidance, dated. Do not publish from
memory — the rite order is stable but the operational detail is not.

**UP-3 · Bengali override for `umrah-dubai-10-day-combo-trip…`**
Defect, not content: the `/bn/blog/` URL exists in the sitemap but serves
English, because there is no entry in `BENGALI_BLOG_OVERRIDES`. Either add the
override or drop the BN URL from the sitemap. Shipping an English page on a
`/bn/` route is worse than not having the URL.

**UP-5 (optional) · First-time traveller section**
One short section in the pillar, or a `travellerType` block on `/umrah`, rather
than a new post.

### 4.2 What not to create

Both "do not create" bullets that used to sit here — no standalone tawaf guide,
no standalone Hajj rites article — are **withdrawn by the 2 November decision.**
They were written under the freeze. The risks they named are real and are now
handled by the plan instead: each new article is wired into the pillar so
authority still concentrates, and either is merged back into its parent if it
earns no impressions within 90 days (v2 §3).

If a new URL *is* later justified, the test is in FUTURE-CONTENT-GAPS §"Future
sequence": name the question, the source, the distinct job, the internal links,
the EN/BN scope and the maintenance burden.

### 4.3 The one structural decision for the owner

`/visa/saudi-arabia-visa` is the highest-value missing URL in the whole funnel: it is
an existing template, the searcher intent is huge, and six sibling pages already
prove the pattern. This is a **page, not an article** — it does not consume the new-URL
allowance. It is also the one item here that needs real source work
(eligible visa categories change), so it should be scheduled, not improvised.

## 5. If you would rather change the reel than the site

Cheapest honest option: two on-screen lines.

| Scene | Today | Change to | Result |
| --- | --- | --- | --- |
| 13.3 | মিনা · আরাফাহ মুজদালিফা / প্রতিটি ধাপের প্রস্তুতি | মিনা ও আরাফাহর আবাসন / যাচাই করে নিন | Matches `hajj-registration…` |
| 49.0 | তাওয়াফ / সাত প্রদক্ষিণ, এক ইবাদত | যিয়ারাহ / বাদর · তাইফ · ঐতিহাসিক স্থান | Matches the ziyarah article |

Rebuild: `python3 .video/build.py --program photo` (≈10 min). Only the two
headline strings change; timings are unaffected.

## 6. Link plan for publication

| Placement | Link | Note |
| --- | --- | --- |
| Reels / TikTok / Shorts bio | `/bn/umrah` | Bangla audience; landing page carries the calculator |
| End card (already burned in) | `uraltravel.co.uk` | No path — keeps the video reusable if the path changes |
| Facebook caption (Bangla) | `/bn/umrah` | plus the pillar in the first comment |
| YouTube description | `/umrah` + pillar + ihram + Nusuk | English-first audience |
| Story swipe-up | `/umrah#budget` | wherever the calculator anchor exists |

## 7. Acceptance criteria per upgrade

- [ ] UP-1 section present in **both** EN and BN, with the same claims.
- [ ] UP-2 section is a numbered day-by-day sequence and is **dated**.
- [ ] Both sections cite Nusuk / haj.gov.sa; no unsourced operational detail.
- [ ] Both linked from `/umrah` (not only from the host article).
- [ ] Internal links added: tawaf section ↔ women, elderly, Ramadan; Hajj rites
      ↔ ziyarah, hotel zones, Zamzam customs.
- [ ] UP-3: `/bn/blog/umrah-dubai…` either renders Bangla or is out of the sitemap.
- [ ] 
- [ ] `npm run verify:build` passes; both locales prerender the new text.

## 8. How this was verified

- Cluster membership: slugs in `src/data/blogContent.ts` + `src/sitemap.xml`
  (`grep -iE "hajj|umrah|ihram|nusuk|ziyarah|zamzam|ramadan|saudi|jeddah|madinah"`).
- Bengali parity: keys in `BENGALI_BLOG_OVERRIDES` (`src/data/bengaliContent.ts`).
- Rite coverage: case-insensitive counts of `tawaf`, `sa'i`, `Mina`, `Arafat`,
  `Muzdalifah`, `Jamarat`, `Qurbani`, `Marwa` per post body.
- Page families: `VISA_DATA`, `DESTINATIONS_DATA`, `HOTELS_DATA` in
  `src/constants.ts` — no Saudi member in any of the three.
- Download card: `src/routes/BlogPostRouteView.tsx` lines 80–90.
