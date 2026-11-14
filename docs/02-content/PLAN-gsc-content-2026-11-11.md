# Content plan — 11 November 2026 (built on the second GSC export)

**Status:** PROPOSED — for owner approval; no URL is written from this plan until its gate row says so.
**Authority chain (nothing here overrides anything above it):**
[Strategy index](../../00-URAL-STRATEGY-INDEX.md) →
[MASTER-PLAN-2026-11-06](../MASTER-PLAN-2026-11-06.md) (direction: *international first, Bangladesh by priority*) →
[Publication Standard v2](../growth/11-PUBLICATION-STANDARD-V2.md) (G1–G7, cadence) →
[Content Upgrade Standard](../growth/10-CONTENT-UPGRADE-STANDARD.md) (acceptance) →
[GSC-READ-2026-11-02](../03-social/GSC-READ-2026-11-02.md) (baseline read + its corrections, still in force) →
**this plan.**

**What this plan is not:** a direction change, a resumption of the archived
[CONTENT-QUEUE](../growth/CONTENT-QUEUE.md), or a volume programme. The GSC report of 11 November
answers *prioritisation*, not *direction* — its own verdict agrees (§8 below).

---

## 1. The data, checked slowly against our own October export

Second export: Web, 11 Nov 2026, label "Last 3 months" — 2,290 impressions, 6 clicks, CTR 0.26%,
85 countries, 270 query rows (610 query-impressions).

| Metric | Export read 2 Nov (22–31 Oct) | Export read 11 Nov | Movement |
| --- | --- | --- | --- |
| Active days with data | 9 (23–31 Oct) | **verify — see V1** | — |
| Impressions | 1,246 | 2,290 | +84% |
| Clicks | 2 | 6 | +4 (Nusuk guide holds 2) |
| CTR | 0.16% | 0.26% | up, still sub-1% |
| Query rows (impr) | 202 (379) | 270 (610) | +34% rows |
| Bangladesh share | 656 (53%) | 1,188 (52%) | share stable |
| United Kingdom | 110 @ 30.55, 0 clk | **269 @ 25.16, 1 clk** | +145%, position −5.4 |
| United States | 62 @ 22.50 | 114 @ 25.16 | up, position slipped |
| Saudi Arabia | 51 @ 10.76 | 86 @ 11.49 | page 1 held |

Comparable pages (old → new):

| Page | Impressions | Position | Reads as |
| --- | --- | --- | --- |
| `/bn/costs/nepal-costs` | 59 → **140** | 8.2 → **7.96** | accelerating, page 1, still 0 clicks |
| `/bn/visa-free-countries` | 54 → **58** | 9.2 → 9.17 | **flat** while EN doubled |
| `/visa-free-countries` | 60 → **122** | 14.9 → 17.52 | grew, slipped toward page 2 |
| `/blog/dual-currency-card-endorsement…` | 24 → **50** | 7.8 → 7.34 | healthy, page 1 |
| `/blog/bangladesh-epassport…` | not in prior top | 171 @ **17.32** | now the site's largest page, page 2 |
| `/blog/nusuk-app-saudi-visa…` | — | 39 @ 5.85, **2 clicks** | the only page earning repeat clicks |

**Verification items before any of this is treated as settled:**

- **V1 — actual date range: owner-confirmed ≈ last one month** (owner, 11 Nov). The October export
  was *also* labelled "Last 3 months" and contained 9 days (Filters.csv proves it), so the label
  proves nothing by itself. On a ~3-week-to-1-month window: UK 110 impr (9 days) → 269 (~21–30 days)
  is **steady, ~12–13 impressions/day, not an accelerating trend**; site-wide clicks 0.22/day →
  ~0.29/day (up, from a base of almost nothing).
- **V2 — the Bengali visa-free query reads 37 impressions @ 10.16 in *both* exports.** Identical to
  the digit. Check the raw row: carried-over value or genuine coincidence. If genuinely unchanged in
  11 days while the EN page doubled, that asymmetry is a finding, not noise.
- **V3 — totals don't reconcile** (2,290 country vs 610 query-impressions). The report already
  flags this (§7.2); it is GSC query anonymisation, standard, and means query-level sums are floors.

**Cross-check verdict:** the report's factual spine agrees with our own October raw export wherever
the two overlap (country ordering, BD share, top query, Nusuk strength). It is safe to *prioritise*
from. It is not safe to *kill* from — see the rules carried forward.

---

## 2. Rules carried forward (they predate this report and still bind)

1. **Publication Standard v2, G1–G7** — distinct job, ≥3 primary sources, demand signal, links both
   ways, EN/BN parity, maintenance owner, cadence.
2. **Cadence: ≤1 new URL/week** while conversion measurement is broken (strategy index), ≤2 only
   after GTM events are live.
3. **§2.2 of the Standard:** this export is under 10,000 impressions on a domain under six months
   old — **absence of a query cannot fail G3**, small data cannot kill a topic, and a bulk title
   rewrite at these n's remains banned (the 2 Nov correction of the 37-title idea stands).
4. **Improve before create** (Nov 2 read §6; report §6 — both agree): the site's bottleneck is
   visibility, not inventory.
5. **GSC queries feed social too** — the Bengali queries are literal reel/carousel topics; that
   use of a thin sample was the owner-endorsed correction on 2 Nov.
6. **The archived CONTENT-QUEUE is not resumable** — new work is authorised in its own context
   (that is what this document is).

---

## 3. Workstream A — improve existing pages (no new URLs; starts immediately)

Each row is one measured change, reviewed at the **2 December** export. One variable per page.

| # | Page | Evidence (11 Nov) | Action | Not doing |
| --- | --- | --- | --- | --- |
| A1 | `/bn/costs/nepal-costs` | 140 impr @ 7.96, 0 clk | **DONE 11 Nov** — first block in `tripCosts.ts` answer now leads with dated figure `৪০,০০০–৫৪,০০০ টাকা` + 5 days + June 2026 (source: 17 Jun 2026 itinerary blog breakdown; components sum exactly 40k/54k); EN meta description carries BDT figure + year (`seoCopy.ts` — titles untouched, Bengali title defect-free proof stands); FAQ Q1 = `নেপাল ভ্রমণ খরচ কীভাবে হিসাব করব?` (GSC query verbatim). Re-judge 2 Dec | No layout rebuild; no second Nepal costs page |
| A2 | `/bn/visa-free-countries` + `/visa-free-countries` | BN flat (58 @ 9.17), EN grew then slipped (122 @ 17.52) | **DONE 11 Nov** — internal links into both pillars from the e-passport + passport-ladder posts (EN `constants.ts` + BN `bengaliContent.ts`, one each; hrefs verified in dist: EN → `/visa-free-countries`, BN → `/bn/visa-free-countries`); `VISA_FREE_FAQS` 7th entry = full BN query `বাংলাদেশের পাসপোর্ট দিয়ে ভিসা ছাড়া কোন কোন দেশে যাওয়া যায় ২০২৬?` with EN twin, answer-first. Re-judge 2 Dec | No new visa-free article |
| A3 | `/blog/bangladesh-epassport…` | 171 @ 17.32 — largest page | **DONE 11 Nov** — dated/sourced FAQ block (3 EN queries verbatim: `passport fee bangladesh 2026`, `passport renewal requirements`, `passport renewal in bangladesh`) + FAQPage JSON-LD on EN+BN (both emit FAQPage with 3 questions in dist); fee table kept near top (first figure ~16% into body); one-variable title test at `seoCopy.ts:332` → `Bangladesh e-Passport Fees 2026: 48 vs 64 Pages, Renewal & RPO List | URAL` (74 ch, was 52) — **revert if worse, re-judge 2 Dec**; `updatedAt: 2026-11-11` | No claims beyond the Claims Ledger |
| A4 | `/flights/dhaka-dubai` (63 @ 60.4), `/flights/dhaka-kathmandu` (52 @ 41.2), `/flights/dhaka-singapore` (41 @ 56.6) | report §4D | Per-page title/meta/FAQ/internal-link pass, hub links from `/flights` | No new route pages; positions 40–60 are an authority problem, expect slow movement |
| A5 | `/blog/nusuk-app-saudi-visa…` | 39 @ 5.85, 2 clk | Protect: use as the pattern (question-shaped title, specific answer) when editing A1–A3 | Don't touch what is working |
| A6 | `/blog/dual-currency-card-endorsement…` | 50 @ 7.34 | Freshness pass only (rates/rules dated) | — |

Explicitly **withdrawn from the report's implied to-do:** any bulk title/meta rewrite across
"top-ranking pages" — same defect the 2 Nov correction killed, now at n=140 instead of n=59
(one page can justify *one* measured test; thirty pages cannot).

---

## 4. Workstream B — new URLs (gated, ≤1/week, G1–G7 all green first)

| # | Candidate | Signal | Gate risk | Next step |
| --- | --- | --- | --- | --- |
| B1 | Dhaka → Manali reachability answer | 3 impr @ 27 (Oct) → **10 impr @ 25.6 (Nov)** — repeated across two exports | G1/G2: Manali has no airport (nearest Kullu/KUU); no direct service; intent is *how-to-reach*, likely a **section or a concise comparison**, not a route page. [GAP-005](../03-social/FUTURE-CONTENT-GAPS.md) already says: verify destination/airport first | Verify route + airlines + entry evidence, then decide section-vs-URL |
| B2 | WhatsApp Question Log | 0 questions logged | G3 is satisfied by owner/reader questions — there are none yet | Log stays open; it remains the named blog queue |
| B3 | Report's "country visa guides" (SG documents, US visitors, UK diaspora…) | see §5 | **G1 fails as written**: `/visa/{singapore,thailand,malaysia,dubai,nepal,maldives,saudi-arabia}-visa` all exist in the sitemap, EN+BN; the US/UK suggestions are positioning questions, not query gaps | Section-upgrade candidates on existing owners only; no new URLs |

**Deliberately not listed:** Umrah/Hajj articles (cluster shipped 16 Oct–10 Nov; Article B remains
deprioritised per the Nov 2 read), any "budget travel" general article (owner: `/blog/top-budget-family-destinations-from-dhaka`),
any airport-code tool content (report itself rates it low value).

---

## 5. Workstream C — the England/UK cluster: **status = archived, trigger now fired, owner decision required**

**It was not deleted and not forgotten.** The six briefs live at
[`docs/history/2026-10-strategy-baseline/growth/19-S4-UK-DIASPORA-DRAFTS-PLAN.md`](../history/2026-10-strategy-baseline/growth/19-S4-UK-DIASPORA-DRAFTS-PLAN.md)
under a HISTORICAL banner; scheduling was **HELD**, not cancelled, with trigger *"≥100 non-Google
sessions/month **or** GSC shows UK impressions."*

Then two things happened in order:

1. **6 Nov — direction change.** `PRODUCT.md` and `docs/05-future-research/README.md` now state
   explicitly that a **UK/diaspora content pivot remains unapproved and out of scope**; the briefs
   are "prior prompts, not finished drafts… mixed passport/residency assumptions are not current
   instructions."
2. **11 Nov — the GSC trigger fired.** UK = **#2 country, 269 impressions, 1 click, position 25.16**
   (was 110 @ 30.55). The report itself lists UK opportunities (BD travel info for UK visitors,
   UK–BD flights, diaspora services).

So: the archived plan's own trigger is met, but current governance says the pivot needs *your*
approval, not an agent's initiative — which is why this is a decision row, not a work item.

### The owner's monetisation question (11 Nov, verbatim intent)

> ".co.uk is monetisation-friendly… Asian traffic gets impressions but won't click to buy or
> book… should I wait more to switch to UK, and focus on Asia?"

**Answer recorded (mentor recommendation, pending owner confirm): wait-vs-switch is a false
choice. Run two tracks, and fix the measurement leak before either track can be judged:**

| Track | What | Why now |
| --- | --- | --- |
| **1 — Visibility (keep Asia/BD)** | Workstream A improvements only; no new Asian country pages | 52% of impressions, the passport/visa/Umrah moat is built, and the site's *only* repeat clicks (Nusuk, 2 of 6) came from this audience. This track funds rankings, not revenue. |
| **2 — Revenue (start UK, gated)** | Archived briefs 1→2→4→5→6 (brief 3 last), ≤1/week, G1–G7, stale terms re-verified (UMM/BIC/GBP-ticket-proof) | UK is #2 country at ~13 impr/day *today*; content takes weeks to rank, so "wait 2 more months for data" = UK revenue starts 2 months later. GBP/Aviasales design already exists in the briefs. **1 click is not a strategy — it is a pilot.** |
| **0 — Measurement (before judging either)** | GTM conversion events (P0 since 25 Oct) + Travelpayouts `?sub_id=` verification | Without it, "UK converts better" stays a hypothesis: 6 clicks total, zero conversions. The Dec 2 export cannot answer a revenue question alone. |

**South Asia — parked, deliberately.** Bhutan/Kashmir have **no query evidence** (one "Kashmir
hotel" impression in SEARCH-EVIDENCE does not establish a guide); new countries there would be
exactly the scatter the owner rejected. The only repeated South-Asia signal is
`dhaka to manali flight` (3→10 impr across exports) → handled as B1/GAP-005 (verify, likely a
section). **Nepal is the South Asia strategy** — deepen the winner (A1: position 7.96, 0 clicks),
do not widen the map.

**Decision checkpoint: 2 December 2026** (the owner's own "first 2–3 months" rule): UK
impressions trend + GTM conversion data together decide *scale, hold, or shelve* the UK track.
Governance stays as written — each brief still requires owner approval before publishing.

**Owner decision, 11 November 2026:** focus accepted as **gated start** — *"I will focus on
UK-umrah-hajj guide fully, maintaining SEO, AEO, natural writing, authentic verified info from
govt sources and other true links, live record, practical outlook."* Research phase opened in
[SPEC-uk-umrah-hajj-guide.md](SPEC-uk-umrah-hajj-guide.md) (source matrix, five open questions,
gates checklist). No URL ships until its gates are green.

**Status, 12 November 2026:** the first cluster URL (`/blog/umrah-hajj-guide-united-kingdom-2026`)
is green on SPEC §6 and **publishes 12 November 2026** (owner moved it forward from the 17th;
the weekly cap was removed the same day — see Publication Standard G7). G4 in-links (BD pillar EN+BN and `/umrah` hub EN+BN) ship in the same release.
GBP snapshot captured 12 Nov (KAYAK: LHR→JED from £347 return, MAN→JED from £326); the visa-fee
and package rows record checked "no published figure" states instead of estimates.

### UK cluster calendar (owner-approved 12 November 2026, weekly cap removed)

The owner approved the seven supporting URLs and asked for consecutive daily slots. A slot only
publishes when its article has passed G1–G6 — a date with no finished article simply passes, no
placeholder ships.

| Slot | URL intent | Status |
| --- | --- | --- |
| 12 Nov | `/blog/umrah-hajj-guide-united-kingdom-2026` (pillar) | **published** (moved forward from 17 Nov) |
| 13 Nov | `/blog/uk-umrah-packages-atol-operator-checks` — ATOL, operator vetting, quote sanity check | **scheduled** |
| 14 Nov | UK→Saudi flights: LHR/MAN/BHX, direct vs 1-stop, seasons, baggage | **published 14 Nov 2026** — `content/blog/uk-to-saudi-flights-umrah-direct-or-connecting.md`, `status: scheduled` + `publishDate: 2026-11-14`; cover `uk_saudi_flights_20261114` (640/960/1200 webp+avif, social JPEG, height 800); inbound links from the pillar and the ATOL page; keyword-map row added; build 143 EN/143 BN, verify:build 517/517 |
| 15 Nov | UK passport → Umrah visa, step by step (ETA / e-visa / waiver) | **scheduled 15 Nov 2026** — `content/blog/uk-passport-umrah-visa-eta-evisa-waiver-step-by-step.md`, `status: scheduled` + `publishDate: 2026-11-15` (09:00 Dhaka gate); cover `uk_umrah_visa_20261114`; inbound links and keyword-map row in place; verified in preview build, absent from production sitemap until the gate opens |
| 16 Nov | Hajj 2027 from the UK: registration, dates, packages, costs | **scheduled 16 Nov 2026** — `content/blog/hajj-2027-uk-dates-nusuk-registration-cost.md`, `status: scheduled` + `publishDate: 2026-11-16` (09:00 Dhaka gate); expects 14–19 May 2027 (Arafah 15 May, Eid 16 May) on the Umm al-Qura calendar, records that only 1448 licensing is open and Nusuk Hajj still sells 1447 inventory, and quotes the 14 Nov 2026 Heathrow–Jeddah snapshot (£347 with stops, £669 non-stop); cover `hajj_2027_uk_20261116` (640/960/1200 webp+avif, social JPEG, height 800); inbound links from the pillar and the ATOL page; keyword-map row added |
| 17 Nov | Ramadan Umrah 2027 from the UK: dates, fares, crowd planning | **scheduled 17 Nov 2026** — `content/blog/ramadan-umrah-2027-uk-dates-fares-last-ten-nights.md`, `status: scheduled` + `publishDate: 2026-11-17`; Ramadan 1448 8 Feb – 8 Mar 2027, Eid 9 Mar, last ten nights from sunset 27 Feb, 27th night 5–6 Mar; three-window choice (opening, middle, last ten), Nusuk permit mechanics, dated Heathrow/Manchester fares (£347/£669 and £326/£515) and the ACWY ten-day clock; cover `ramadan_umrah_uk_20261117`; inbound links from the pillar and the visa page; keyword-map row added |
| 18 Nov | Umrah from the UK with elderly parents / family: hotels, access | queued |
| 19 Nov | Umrah + Madinah / stopover combinations from the UK | queued |

**Options remain:** keep archived · gated candidate (recommended above) · full cadence
(briefs 1→2→4→5→6, brief 3 last, six gates each, hreflang stays `en-bd`/`bn-bd`, GBP embeds
`currency=GBP&locale=en-gb`, S2 disclosure verified first).

---

## 6. Workstream D — social (aligned with the register, not the blog cadence)

Phase A register rows are `PUBLISHED` (52 flipped, 2026-11-10); dates/URLs blank until supplied.
GSC-derived candidates for the next social cycle (per the 2 Nov owner-endorsed use: *queries as
topics*, not as ranking decisions):

- `নেপাল ভ্রমণ খরচ` / Nepal cost query (page already at position ~8) → carousel with dated BDT table.
- Visa-free query (position ~10) → "কোন দেশে যাওয়া যায়" list reel, linking the BN page.
- `passport fee bangladesh 2026` (position 1) → fee-snapshot story, sourced.
- Report's own caution adopted: **not every query becomes a post** — engagement × relevance ×
  verified source first (its §7.6).

Governed by [PRODUCTION-HANDBOOK](../03-social/PRODUCTION-HANDBOOK.md) + register; the blog's
≤1/week cap does not apply to social, and vice versa.

---

## 7. Workstream E — measurement (P0; gates the whole plan's confidence)

1. **GTM conversion events** — still open since the 25 Oct audit; the report independently lists
   GA4 as its #2 missing input. Until live, clicks cannot be tied to value and cadence stays at 1/week.
2. **Next export: 2 December 2026** (per Nov 2 read §7), with the additions agreed then:
   1-month range *and* full range, BD-filtered query list, CTR-ascending page list, same 6 tabs.
3. **12-month GSC is impossible** — the property is weeks old. The report's own wish cannot be met
   until ~April 2027; plan around that instead of pretending.

---

## 8. What the report gets right / where it over-reaches

**Right:** improve-existing is the biggest opportunity; Nusuk is the pattern; query/country/page
totals don't reconcile; average position ≠ exact rank; social should not post every keyword; and
its own answer to *"enough to fix direction?"* is **No** — which matches Publication Standard §2.2
and the fact that direction was already fixed, by you, on 6 November.

**Over-reaches (handled above):** it suggests creating country visa guides, cost pages and flight
pages **that already exist** (7 visa pages, costs pages, 9 route pages — all EN+BN in the sitemap);
it never checked G1. Its "last 3 months" needs V1. Its Bengali top-query row needs V2. Its
six-pillar "architecture" describes the SEO-KEYWORD-MAP we already run — no restructure is proposed.

---

## 9. Review dates

| Date | Check |
| --- | --- |
| **2 Dec 2026** | Re-export; A1–A6 measured (one variable each); B1 verified; decide B-queue for December |
| **90 days after each new URL** | Publication Standard §3: earns impressions for its own query, or merge + 301 |
| **Owner decision, on sight of §5** | UK cluster: keep archived / gated candidate / reinstate — **resolved 11 Nov: gated start, see SPEC** |
| **12 Nov 2026** | UK umrah-hajj pillar publishes (moved forward from 17 Nov at owner's request): confirm EN+BN live, G4 in-links resolve, sitemap entry; G6 fast-moving review by 15 Feb 2027; baseline at the 2 Dec export |
| **13–19 Nov 2026** | UK cluster articles 2–8 publish in consecutive daily slots (see cluster calendar, §5) |

---

## 10. Internal-link audit of recent posts (11 Nov 2026)

> **Superseded in scope, same day:** the whole-site version of this audit (282-page rendered-DOM
> graph, G4 across all 120 posts, hub/directory/sitemap/anchor checks) with smallest-unit fix rows
> now lives in [PLAN-site-perfection-2026-11-11](PLAN-site-perfection-2026-11-11.md).
> **Neither document has been applied** — both are plan-only pending owner go-ahead.

Scope: all 12 posts published ≥ 16 Oct 2026 (`content/blog/`). G4 asks ≥4 internal links per
locale in the article (≥2 blog→blog, ≥1 hub/money) **and** ≥2 existing posts linking in.

**Outbound (frontmatter `internalLinksEn`/`internalLinksBn`): all 12 pass** — 4–10 links per
locale, blog→blog and hub/money present (exceptions below).

| Post (publish date) | Inbound from other posts | Verdict |
| --- | --- | --- |
| nusuk-hotel-brn-rawdah-gate-guide (11-03) | **7** | OK — most-linked new post |
| makkah-hotel-sectors (11-04) | 6 | OK |
| where-to-stay-madinah (11-05) | 4 | OK |
| makkah-budget-shuttle (11-06) | 2 | OK |
| haramain-train-vs-bus (11-07) | 2 | OK |
| family-elderly-umrah (11-08) | 2 | OK |
| makkah-hotel-walking-time (11-09) | **1** | ⚠ needs 1 more inbound |
| hajj-umrah-accommodation-guide (11-10) | **0** | ❌ newest post, nobody links in yet — add ≥2 (candidate: `umrah-hajj-guide` internalLinks + `/umrah` hub) |
| turn-travel-experience (10-25) | 1 | ⚠ off-cluster, low priority |
| can-you-make-money… (10-24) | 1 | ⚠ off-cluster, low priority |
| kathmandu-to-coxs-bazar (10-16) | 1 | ⚠ pair with coxs-bazar guide (each → the other + 1 more) |
| coxs-bazar-travel-guide (10-16) | 1 | ⚠ same |

**Structural gap:** the 8-post Makkah/Madinah cluster cross-links well internally (3–7
cluster-mates each) but **no hub links into it** — `/umrah`, the `umrah-hajj-guide` post and
prerender hub lists contain **zero** references to the new cluster. The two inbound fixes above
(umrah-hajj-guide + /umrah hub → accommodation guide) are the highest-leverage links on the
site right now: they route the pillar's authority to the newest money-adjacent content.

