# Site perfection plan — 11 Nov 2026 (internal links + A4-deep page decisions)

**Status: Batch 1 (L01, L03, L04, L05, L06a–h, Q2, Q7) APPLIED 2026-11-11 — all gates green (lint · build · verify:build 510 · visa-claims 16 · brand-mark 12) and audit `G4 16→0`, `HUB-CHILD 41→36` (remainder = L07 attractions), `BROKEN 164→162` (L01). Batch 1 also closed a 9th G4 post the audit surfaced late (`europe-uk-usa-sightseeing…` ← `saudi-stopover` reciprocal, EN+BN) and added the BN costs-page link via `CostPlanningGuide` (Q2). Q7 verified already-satisfied (no edit needed: `nepal-pokhara` + `/costs/nepal-costs` both already link `/flights/dhaka-kathmandu`). Batch 2 (Q1, Q3a–e, Q4) and Batch 3 (L02, L07, L08, L09, L10) remain PROPOSED — not applied.**
**Authority chain:** same as [PLAN-gsc-content-2026-11-11](PLAN-gsc-content-2026-11-11.md)
(Publication Standard G1–G7 → Content Upgrade Standard → GSC-READ-2026-11-02 → that plan → this plan).
This document **supersedes the narrow 12-post scope** of PLAN §10 and **deepens Workstream A4**
beyond the external "SEO improvements" report — it does not apply either of them.

**Reproduce every number below:** `npm run build && python3 docs/02-content/audit-internal-links.py`
(rendered-DOM audit; currently exits non-zero with exactly the FAIL counts in §2 — the goal state is 0).

---

## 1. Method (why this pass goes deeper)

| Check | Source of truth |
| --- | --- |
| Full anchor graph of all **282 HTML files** (278 canonical routes + index/404), **4,172 internal edges** | `dist/` after a clean build. Static HTML contains **body/editorial links only** (site chrome hydrates client-side), so inbound counts are editorial by construction — no nav/footer contamination |
| Broken hrefs, orphans, twin links, EN/BN directory coverage | audit script |
| G4 across **all 120 posts** (60 × 2 locales), not just the ≥16-Oct 12 | audit script + reciprocal-candidate analysis |
| Hub→child for 8 hubs; child→own-hub for 7 sections | audit script |
| public vs dist sitemap parity | `scripts/prerender.ts` `generateSitemaps` (read, not guessed) |
| A4 page facts: titles, metas, FAQ counts, FAQPage, anchor texts, country cross-link matrix | dist HTML + `seoCopy.ts` + October export `docs/03-social/gsc-2026-10-22_2026-10-31/` |
| BN page positions for the protect list | October export Pages.csv (rows at position ≤ 10) |

Provenance labels used below: **[audit]** = measured 11 Nov from dist/ · **[Oct]** =
October GSC export file in repo · **[report]** = the owner's 11 Nov external report (quoted
figures, not in repo) · **[code]** = source file/line read directly.

---

## 2. Findings — ranked, with the smallest unit of work for each (PLAN A)

**Current audit state: `BROKEN x164 · G4 x16 · HUB-CHILD x41 · OWN-HUB x122 · DIRECTORY x120 · ORPHANS/TWIN/SITEMAP PASS`.**

| Row | Finding (evidence) | One edit (smallest unit) | Verify | Not doing |
| --- | --- | --- | --- | --- |
| **L01 ✓ DONE (B1)** | `/blog/undefined` empty anchor renders on **/banking + /bn/banking** **[audit]** — root: `scripts/prerender.ts:1456-1458` always emits `<p><a href="/blog/${method.nodeSlug}">` while 2 of 5 `BANKING_PAYMENT_METHODS` are slug-less **by design** ("deleted article" comment at :1455) **[code]** | Wrap that `<p><a…>` in a `method.nodeSlug ?` guard in `renderBankingHubSections` | `grep -c 'blog/undefined' dist/banking.html dist/bn/banking.html` → `0/0` · audit BROKEN drops by 2 | No `bankingHubData.ts` edits (the missing slugs are intentional) |
| **L02** | `/flights/ktm-dhaka` publishes title **"Flights from Dhaka to Dhaka (Nepal) 2026"** + meta "Compare flights from Dhaka to Dhaka" — wrong origin on the page itself (H1 is correct "Kathmandu → Dhaka" from `route.from/to`) **[audit+code]**. Root: generic title `prerender.ts:1702` and link-text `:758` both hardcode "Dhaka" as origin | Add a `seoCopy.ts` entry for `/flights/ktm-dhaka` (EN + BN): title "Kathmandu to Dhaka Flights…", description from route data — overrides both title and meta with **zero template blast radius** (alternative: origin-aware `:1702/:758` — only if owner prefers template fix) | dist title/desc contain the Kathmandu→Dhaka direction · byte-diff titles of the other 8 routes = unchanged | No other route title edits (standing rule: one variable; this row is a *defect fix*, flagged for owner because it changes a title) |
| **L03 ✓ DONE (B1)** | `/flights` **EN hub lists 8/9 routes — missing `/flights/ktm-dhaka`**; BN hub already lists its twin **[audit]**. (All other hubs: 0 missing) | Add one `<li>` to the nonstop list `prerender.ts:1253-1260` (mirror the BN counterpart ~`:3272`), anchor "Kathmandu to Dhaka" | audit `HUB-CHILD /flights` → PASS | Hub copy otherwise untouched |
| **L04 ✓ DONE (B1)** | `/tools` **EN hub links 1/5 tools** (only airport-codes; the other four tool pages unreachable from their own hub). BN hub links all 5 **[audit]** — BN list at `prerender.ts:3704-3714` **[code]** | EN `/tools` article body: add links to `budget-calculator`, `currency-converter`, `flight-delay-claim`, `packing-checklist` (mirror BN list), locate EN builder by grepping the EN tools article section | audit `HUB-CHILD /tools` → PASS | BN untouched (already complete) |
| **L05 ✓ DONE (B1)** | `/umrah` hub links **7 posts, zero of the 8-post Makkah/Madinah cluster** (home links all 8; `/blog` hub links all 60 — so this is hub-specific) **[audit]** — the structural gap PLAN §10 named, now measured wider | Curated post list on `/umrah` (`prerender.ts` ~`:620-660`, locate by grep `"Umrah & Hajj preparation"`): add **2 entries** — `hajj-umrah-accommodation-guide-makkah-madinah` + `makkah-hotel-sectors-abraj-al-bait-jabal-omar` | both hrefs present in `dist/umrah.html` (+ BN twin) | No other hub lists; not all 8 (smallest leverage first) |
| **L06a–h ✓ DONE (B1) + europe reciprocal** | **16 G4 failures = 8 posts × 2 locales**, all at `inbound_posts = 1` (outbound 11–21, blog→blog 4–8, hub/money ≥1 all green) **[audit]**. Each candidate below already receives a link from the target (P→X exists, X→P missing), so the fix is reciprocal + topically safe | Per row: add **one** link to the source post's `internalLinksEn` **and** `internalLinksBn` (constants.ts) | audit `G4` → PASS (0) | No outbound removals; no new posts |
|  | ↳ L06a `bumrungrad…` ← `thailand-evisa…` (also feeds A4 Thailand) |  |  |  |
|  | ↳ L06b `can-you-make-money…` ← `travel-creator-resources` |  |  |  |
|  | ↳ L06c `chefchaouen…` ← `havana-cuba…` (far-off-destination pair) |  |  |  |
|  | ↳ L06d `hajj-rites-mina-arafah…` ← `umrah-hajj-guide…` (pillar → rite article) |  |  |  |
|  | ↳ L06e `hajj-umrah-accommodation…` ← `makkah-hotel-sectors…` (**PLAN §10's highest-leverage item**, same target) |  |  |  |
|  | ↳ L06f `kathmandu-to-coxs-bazar…` ← `nepal-pokhara-itinerary…` (PLAN §10's pair-item, second source) |  |  |  |
|  | ↳ L06g `malaysia-islamic-heritage…` ← `top-budget-family-destinations…` |  |  |  |
|  | ↳ L06h `umrah-dubai-10-day-combo…` ← `saudi-stopover…` |  |  |  |
| **L07** | **164 broken anchors**: all 36 attraction detail pages (EN+BN) link their **city switcher + breadcrumb** to `/attractions/{city}` routes that are **client-only** — not prerendered, not in the sitemap **[audit+code: prerender.ts:2295-2320, App.tsx:1199]** | **Decision row — owner picks one:** **(b, recommended now)** rewire switcher/breadcrumb targets to the `/attractions` hub (static-honest, matches the indexable set); **(a)** prerender the ~20 city pages (+ sitemap rows) — only if attractions ever become a GSC target (0 impressions today **[Oct]**); **(c)** leave as-is (relies on JS rendering) | (b): audit `BROKEN` → only L01 residue; (a): +20 files, sitemap +20 | Not doing (a) in this pass without an explicit owner choice |
| **L08** | **`/bn/sitemap` is a skeleton: 19 anchors** (hub links + 5 tools) vs **EN `/sitemap`: 140 anchors covering 144/144 EN pages** — 120 BN pages get no directory inbound **[audit]** | Render the BN directory from the same page-level generator as EN (locate: site-directory builder `prerender.ts` ~`:2473-2500` + `bnDirectory` helper `:1030`) | audit `DIRECTORY` → PASS (BN missing → 0) | EN directory untouched; `/sitemap.html` HTML not redesigned |
| **L09** | **122 pages never link back to their own section hub** (flights 18 · visa 14 · costs 12 · hotels 12 · destinations 20 · attractions 36 · tools 10) — the shared "More trip-planning hubs" section lists *other* hubs only **[audit, builder `prerender.ts:946`]** | One edit: section-aware **own-hub entry** added first in the shared `planning-hub-links` builder → fixes the ~76 pages that carry the section in one change; attractions 36 ride on L07; tools 10 on L04/L09 follow-up | audit `OWN-HUB` → 0 after L04+L07+this | No visible redesign; single added line per page |
| **L10** | `/flights/dhaka-los-angeles` title carries a literal `…` ("…(United States)… \| URAL") — `compactTitle` truncation (`seoCopy.ts:757`), 0 query traction **[audit+code]** | P3: seoCopy entry with a shorter LA title (or shorten the generic) — do **last** | no `…` in dist title; other titles stable | Not paired with L02 (two title variables ≠ one) |

**Explicitly healthy — evidence rows, no work (these correct assumptions from both quoted reports):**

- **Orphans: 0** (only verification files, expected) · **Twin links: 0 missing (282/282)**
- **Sitemap:** public snapshot **254 vs dist 278 = the 12 scheduled posts × 2 locales — BY DESIGN**
  (`generateSitemaps` filters `SCHEDULED_BLOG_DIRECTORY`; dist is what deploys) **[code]** → *no action*
- **Hub→child:** /visa, /costs, /hotels, /destinations, /blog = 0 missing (both locales)
- **EN directory:** 144/144 pages covered
- **All 8 new cluster posts are linked from home and from `/blog`** — the gap was only the /umrah hub (L05) + two G4 posts (L06e/f)

---

## 3. PLAN B — the visa/route "SEO improvements", taken deeper (A4)

### 3.1 What the external report implied vs what is actually true

| Report implies | Audited reality **[audit, Oct, code]** |
| --- | --- |
| Strengthen the 4 EN visa guides | Pages exist EN+BN; **titles already query-shaped** (SG "…Documents & Process", MY "…eVisa & MDAC", TH "…Process & Documents", AE "…Tourist eVisa"). Real gaps: **FAQ counts SG 2 · MY 1 · AE 1 · TH 6** vs the query clusters; TH meta description still says **"updated November 30, 2022"** |
| Route pages: hub links + verify anchor text | **Hub→route links already exist for all 8 dhaka-\* routes** with matched anchors ("Dhaka to Dubai Flight Schedule & Fares" etc.; home + costs + destinations + blogs all link in, 11–15 inbound each). Only **ktm-dhaka** is missing (Plan A L02+L03 — it has just 2 inbound: BN twin + directory) |
| Cross-links from matching visa + costs pages | **Complete**: 4 countries × {visa, costs, flights, hotels, destinations} — every pair linked (matrix checked). The one real hole: **Thailand money pages (visa/costs/bangkok-route/bangkok-hotels) do NOT link the thailand-evisa blog** — the page closest to page 2 (20 impr @ 30.7 **[Oct]**) |
| (not mentioned) | **Near-duplicate EN titles**: `/visa/thailand-visa` "…Process & Documents" vs the blog "…Documents & Process" — word-swapped twins competing on the same head query **[audit]** |
| (not mentioned) | EN `/tools` hub misses 4 tools · BN directory skeleton · `/blog/undefined` · ktm-dhaka wrong-direction title · LA `…` title (Plan A) |

### 3.2 Protect list (adopted rule — no copy/title/meta edits)

**56 BN pages sat at position ≤ 10 in the October export [Oct]** — including the report's named
winners (`bn/hotels/singapore-hotels` 7.0, `bn/costs/thailand-costs` 6.71, `bn/blog/malaysia-evisa…`
 6.0, `bn/flights/dhaka-dubai` 4.33, `bn/blog/halal-food-guide-bangkok` 2.5, `bn/blog/fresh-bangladeshi-passport…` 4.86)
plus `bn/tools` 2.0, `bn/hotels/bangkok-hotels` 5.8, `bn/blog/dhaka-kolkata…` 6.67.
**Rule:** these get **no title, meta, FAQ or copy rewrites** in this pass. Outbound additions only
where a bilingual journey needs them — and **twin links already exist on 282/282 pages**,
so today that means *nothing to do* on the protect list itself. Re-judge all at 2 Dec.

### 3.3 Action rows (smallest units; one variable per page; none applied)

| Row | Action (evidence) | Edit location | Verify | Not doing |
| --- | --- | --- | --- | --- |
| **Q1** | **thailand-evisa blog title de-duplication**: differentiate from `/visa/thailand-visa` (word-swapped twins) toward its distinct job — documents + bank-balance queries (20 impr @ 30.7, closest to page 2 **[Oct]**) | `seoCopy.ts:301` (blog entry) — **one title variable** | dist: two titles no longer near-identical; other titles byte-stable · **revert if worse, re-judge 2 Dec** | No description change in the same pass |
| **Q2 ✓ DONE (B1)** | **Thailand money pages → blog links (4 missing)**: visa TH, costs TH, dhaka-bangkok, bangkok-hotels each add one link to the thailand-evisa blog, anchor on "documents / bank balance" phrasing | each page's link list (constants TH visa config · costs guide data · prerender route links) | 4 hrefs in dist; cross-link matrix thailand row all-`Y` including blog | No reverse removals; SG/MY money→blog links already exist |
| **Q3a** | `/visa/singapore-visa` FAQ +2 (currently 2): **documents checklist** ("singapore visa documents" cluster — report **[report]**, entry point) + authorized-agent fee/processing question (answer-first, dated where money) | `constants.ts` visa FAQ array (pattern at `:1159`) + BN twin for G5 parity | FAQPage question count 2→4 on both locales; query string present verbatim | No title/meta edit (already matched) |
| **Q3b** | `/visa/malaysia-visa` FAQ +2 (currently 1): `malaysia visa for bangladeshi` (3 @ 64.7) + `malaysia visa fee for bangladeshi tourist` (2 @ 70) **[Oct]** | same config family (MY block) + BN twin | count 1→3; verbatim Qs in FAQPage | Position 56.2 needs authority, not copy — see Q6 |
| **Q3c** | `/visa/dubai-visa` FAQ +2 (currently 1): `uae visit visa for bangladeshi` (**9 @ 93.4 — largest EN visa query in the export [Oct]**) + documents/sponsor question | same config family (AE block) + BN twin | count 1→3; verbatim Qs | EN page's 86.9 vs BN 24.9 gap **[Oct]** gets FAQ+links only, no rewrite |
| **Q3d** | `/flights/dhaka-dubai` FAQ +2 (currently 1): `dhaka to dubai air ticket price` (4 @ 74.8) + `dac to dxb flight` (5 @ 48.2, airline/duration angle) **[Oct]** | route FAQ config + BN twin | count 1→3; verbatim Qs | Route pages dhaka-singapore (3 FAQs), dhaka-kathmandu (8), dhaka-bangkok (2) — **no edits** (one-variable discipline) |
| **Q3e** | `/visa/thailand-visa` FAQ +1: `thai visa fee for bangladeshi` (4 @ 82.3) **[Oct]** — the page has 6 FAQs but not the fee question | TH visa FAQ block + BN twin | count 6→7; verbatim Q | — |
| **Q4** | **Stale date in live meta**: TH visa description says "updated November 30, 2022" **[audit]** | `seoCopy.ts` TH visa entry: **option (a) recommended** — remove/reword the date (no external claim) · option (b) re-date only after a live portal check (outside this sandbox) | dist meta no longer carries 2022 | **Never invent a new date** (Number rule) |
| **Q5** | Protect-list adoption (§3.2) as a standing rule row | none (rule only) | — | — |
| **Q6** | **Explicit non-actions with evidence:** `/visa/malaysia-visa` @56.2 = authority problem → no copy work, re-judge 2 Dec · hub/route anchor rework = unnecessary (already query-shaped) · "create visa/costs/flight pages" = they all exist · bulk title/meta rewrites = still banned (Nov 2 §2.2, n=140) | — | — | — |
| **Q7 ✓ DONE (B1) — already satisfied, no edit needed** | **kathmandu return-leg authority**: ktm-dhaka currently 2 inbound; while L02+L03 land, add one contextual link from `nepal-pokhara-itinerary` (and/or `/costs/nepal-costs`) using "Kathmandu to Dhaka" anchor | blog/costs link lists (same lists as L06f) | ktm-dhaka inbound ≥ 4 | — |

**Why this beats the report's list:** every page it wanted *created* already exists; the measurable
defects are (1) FAQ thinness against queries that already produce impressions, (2) one
title near-collision, (3) one stale date, (4) missing money→blog links where a page is one push from
page 2 — plus five structural link bugs the report never looked for (Plan A). Positions 40–60
(EN dubai visa, malaysia visa, route pages) move with **links + age** — L-rows and Q2/Q7 are the
link side; nothing here claims copy alone will move them. Judge at the **2 Dec** export.

---

## 4. Review & gates

| Gate | When |
| --- | --- |
| Audit script → FAIL counts drop (164→2, 16→0, 41→0, 122→0, 120→0) | after each applied row |
| Full chain `lint · build · verify:build · visa-claims · brand-mark` | after each applied batch |
| GSC re-export re-judge of Q1 (title revert-if-worse), Q3 pages, A1–A6 | 2 Dec 2026 |
| Owner decision required first | L07 option choice; L02 (title change = defect fix, still flagged) |

**Nothing in this document has been applied to the site.** The only files written this session
alongside it: `docs/02-content/audit-internal-links.py` (the reproducible auditor).
