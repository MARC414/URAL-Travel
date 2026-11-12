# Site perfection plan — 11 Nov 2026 (internal links + A4-deep page decisions)

**Status: Batch 1 (L01, L03, L04, L05, L06a–h, Q2, Q7) APPLIED 2026-11-11 — all gates green (lint · build · verify:build 510 · visa-claims 16 · brand-mark 12) and audit `G4 16→0`, `HUB-CHILD 41→36` (remainder = L07 attractions), `BROKEN 164→162` (L01). Batch 2 (Q1, Q3a–e) APPLIED 2026-11-11 — gates green (lint · build 139+139 · verify:build 510 · visa-claims 16 · brand-mark 12); EN FAQPage counts 2→4 / 1→3 / 1→3 / 1→3 / 6→7, BN static parity now 4/3/3/3/7 with visible sections; `CONTENT_UPDATED` + tripCosts `updatedAt` bumped to 2026-11-11 (sitemap rebuilt); audit unchanged `exit=120`, `G4 PASS`. **Q4 NOT applied** — date removal reverted, blocked on a `verify:build` guard that requires the dated caveat (owner decision, see row). Batch 3 (L02, L07, L08, L09, L10) remains PROPOSED — not applied.**
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

**Current audit state: `ALL 8 PASS · exit 0` as of Batch 3 (2026-11-11, pre-deploy — re-judge 14 days post-deploy per §6).** Historical baseline: `BROKEN x164 · G4 x16 · HUB-CHILD x41 · OWN-HUB x122 · DIRECTORY x120`; Batch 1 took G4/HUB-CHILD→0, Batch 3 took BROKEN/HUB-CHILD-residue/OWN-HUB/DIRECTORY→0. `BROKEN x164` note: the 2 `/blog/undefined` (L01) were fixed in Batch 1 before the audit ever ran on this plan.

| Row | Finding (evidence) | One edit (smallest unit) | Verify | Not doing |
| --- | --- | --- | --- | --- |
| **L01 ✓ DONE (B1)** | `/blog/undefined` empty anchor renders on **/banking + /bn/banking** **[audit]** — root: `scripts/prerender.ts:1456-1458` always emits `<p><a href="/blog/${method.nodeSlug}">` while 2 of 5 `BANKING_PAYMENT_METHODS` are slug-less **by design** ("deleted article" comment at :1455) **[code]** | Wrap that `<p><a…>` in a `method.nodeSlug ?` guard in `renderBankingHubSections` | `grep -c 'blog/undefined' dist/banking.html dist/bn/banking.html` → `0/0` · audit BROKEN drops by 2 | No `bankingHubData.ts` edits (the missing slugs are intentional) |
| **L02 ✓ DONE (B3)** | `/flights/ktm-dhaka` published title **"Flights from Dhaka to Dhaka (Nepal) 2026"** + meta "Compare flights from Dhaka to Dhaka" — wrong origin (H1 was correct) **[audit+code]**. Root: generic title `prerender.ts` flight ternary + link-text `:758` both hardcode "Dhaka" as origin | **Applied (defect fix, owner-flagged):** `seoCopy.ts` entries EN+BN ("Kathmandu to Dhaka Flights: Price & Route Guide \| URAL" / BN title+quickAnswer-derived desc); id-scoped template branch `r.id === "ktm-dhaka"` in the EN flight title+description ternary (mirrors the `dhaka-kathmandu` precedent — feeds `/sitemap` directory anchor); origin-aware `getTripCrossLinks` text (`${flight.from}` → byte-identical for all Dhaka-origin routes); `BN_PLACES.Dhaka` extracted from source + BN detail h1 `bnPlace(bn.from)` (was hardcoded ঢাকা → wrong on this route); search-alias ownership: `"kathmandu to dhaka flight"` + `"ktm to dac"` + BN twin moved from `/flights/dhaka-kathmandu` to a new `/flights/ktm-dhaka` key (L02 title flip exposed the misroute; guard still 66/66) | dist EN title = "Kathmandu to Dhaka Flights: Price & Route Guide \| URAL" ✓ · EN meta Kathmandu→Dhaka ✓ · BN title/dir ✓ · BN h1 `কাঠমান্ডু → ঢাকা…` ✓ · other 8 EN route titles byte-identical ✓ · audit `search-query` guard passes ✓ | No other route titles; Q4 untouched; BN quickAnswer ১ঘণ্টা২৫মিনিট vs keyFacts ৩০ pre-existing mismatch left alone |
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
| **L07 ✓ DONE (B3, owner chose (a) 2026-11-11)** | **164→162 broken anchors** (Batch 1 removed the 2 L01): all 36 attraction detail pages (EN+BN) link city switcher + breadcrumb to client-only `/attractions/{city}` routes **[audit+code: prerender.ts:2295-2320, App.tsx:1199]** | **Applied (prerender-hub, superseded plan's (b)):** new prerendered routes `/attractions` + `/bn/attractions` (extracted App.tsx hub title/desc, `TIQETS_TOP_ATTRACTIONS` 18+18-item directory, `collectionPageSchema`, breadcrumbs, cross-link to `/experiences`); EN detail pages gain a "complete directory" paragraph linking the hub; BN switcher/breadcrumb city-links **removed** (cityLinks dropped from `productLinks`; hub gets `সব আকর্ষণ ও পাস` + each detail gets one hub anchor via `getBengaliRouteSeo`); `public/_redirects` `/attractions /experiences 301` **removed** (shipped redirect was masking the gap); modulepreload regex now matches the hub | audit `BROKEN → PASS (0)` · `HUB-CHILD /attractions` both locales 18/18 · `ORPHANS → PASS` (hub has inbound) · `/attractions.html` + `/bn/attractions.html` exist · `verify:build` 510/510 (incl. `attraction-data` preload on 19 pages) | Client-only `/attractions/{city}` routes stay JS-rendered (not prerendered — the hub covers them); no new city pages |
| **L08 ✓ DONE (B3)** | **`/bn/sitemap` was a skeleton: 19 anchors** vs EN 140+ — 120 BN pages had no directory inbound **[audit]** | **Applied:** BN directory section 4 rendered from the shared page-level generator (all `bnRoutes` + posts, `renderLinkSection("complete-page-directory", "সব বাংলা ট্রাভেল গাইড", …)`) **and** BN section 3 own-hub added (rides the same edit as L09) | audit `DIRECTORY → PASS` (BN missing = 0; 140/140 BN pages covered) · dist probe: `/bn/sitemap.html` anchors cover every BN page | EN directory untouched; `/sitemap.html` HTML not redesigned |
| **L09 ✓ DONE (B3)** | **122 pages never linked back to their own section hub** — shared "More trip-planning hubs" listed *other* hubs only **[audit, builder `prerender.ts` `sitewideHubLinks`]** | **Applied (section-aware own-hub prepended to the shared builder, EN + BN):** `ownHubLink` first, target = `parentHubPath ?? "/tools"` + `ownHubLink`; EN tools fallback = `/tools` (tools pages are section-own); BN mirrors via `getBengaliSeoCopy(ownHubEn)` + BN routes map (tools → `/bn/tools`); `/tools` `parentHubPath: ""` sentinel kept falsy so the fallback wins | audit `OWN-HUB → PASS (0)` · dist: own-hub `<a href>` present on EN+BN flights/visa/costs/hotels/tools/destinations spot-probes · `verify:build` 510/510 | No visible redesign; single list item added per page; attractions36 fixed via L07 hub anchors |
| **L10 ✓ DONE (B3, last)** | `/flights/dhaka-los-angeles` title carried a literal `…` (compactTitle truncation), 0 query traction **[audit+code]** | **Applied:** `seoCopy.ts` entry EN "Dhaka to Los Angeles Flights: Route & Fares \| URAL" + BN "Los Angeles ফ্লাইট গাইড: ভাড়া, সময় ও ভিসা \| URAL" (shortened, no `…`) | dist EN+BN LA titles contain no `…` ✓ · other titles stable ✓ | Applied **after** L02 (standing rule: one title variable per window) |


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

### 3.3 Action rows (smallest units; one variable per page; Q2/Q7 = B1, Q1/Q3 = B2)

| Row | Action (evidence) | Edit location | Verify | Not doing |
| --- | --- | --- | --- | --- |
| **Q1 ✓ DONE (B2)** | **thailand-evisa blog title de-duplication**: differentiate from `/visa/thailand-visa` (word-swapped twins) toward its distinct job — documents + bank-balance queries (20 impr @ 30.7, closest to page 2 **[Oct]**) | `seoCopy.ts:302` (blog entry) — **one title variable** — applied: "Thailand e-Visa from Bangladesh: Documents & Bank Balance Guide \| URAL" (58 ch) | dist: two titles no longer near-identical ✓ (visa page keeps "Process & Documents"); other titles untouched (diff scope = this line only) · **revert if worse, re-judge 2 Dec** | No description change in the same pass |
| **Q2 ✓ DONE (B1)** | **Thailand money pages → blog links (4 missing)**: visa TH, costs TH, dhaka-bangkok, bangkok-hotels each add one link to the thailand-evisa blog, anchor on "documents / bank balance" phrasing | each page's link list (constants TH visa config · costs guide data · prerender route links) | 4 hrefs in dist; cross-link matrix thailand row all-`Y` including blog | No reverse removals; SG/MY money→blog links already exist |
| **Q3a ✓ DONE (B2)** | `/visa/singapore-visa` FAQ +2 (currently 2): **documents checklist** ("singapore visa documents" cluster — report **[report]**, entry point) + authorized-agent fee/processing question (answer-first, dated where money) | `constants.ts` visa FAQ array + BN twin via `BENGALI_VISA_OVERRIDES.faqs` (Option B full parity) | FAQPage question count 2→4 on both locales ✓ (EN+BN static); query string present verbatim ✓ | No title/meta edit (already matched) |
| **Q3b ✓ DONE (B2)** | `/visa/malaysia-visa` FAQ +2 (currently 1): `malaysia visa for bangladeshi` (3 @ 64.7) + `malaysia visa fee for bangladeshi tourist` (2 @ 70) **[Oct]** | same config family (MY block) + BN override faqs | count 1→3 ✓ both locales; verbatim Qs in FAQPage ✓ | Position 56.2 needs authority, not copy — see Q6 |
| **Q3c ✓ DONE (B2)** | `/visa/dubai-visa` FAQ +2 (currently 1): `uae visit visa for bangladeshi` (**9 @ 93.4 — largest EN visa query in the export [Oct]**) + documents/sponsor question | same config family (AE block) + BN override faqs | count 1→3 ✓ both locales; verbatim Qs ✓ | EN page's 86.9 vs BN 24.9 gap **[Oct]** gets FAQ+links only, no rewrite |
| **Q3d ✓ DONE (B2)** | `/flights/dhaka-dubai` FAQ +2 (currently 1): `dhaka to dubai air ticket price` (4 @ 74.8) + `dac to dxb flight` (5 @ 48.2, airline/duration angle) **[Oct]** | route FAQ config + `BENGALI_FLIGHTS_OVERRIDES["dhaka-dubai"].faqs` | count 1→3 ✓ both locales; verbatim Qs ✓ (airlines/duration from site data only ✓) | Route pages dhaka-singapore (3 FAQs), dhaka-kathmandu (8), dhaka-bangkok (2) — **no edits** (one-variable discipline) |
| **Q3e ✓ DONE (B2)** | `/visa/thailand-visa` FAQ +1: `thai visa fee for bangladeshi` (4 @ 82.3) **[Oct]** — the page has 6 FAQs but not the fee question | TH visa FAQ block + BN override faqs | count 6→7 ✓ both locales; verbatim Q ✓ | — |
| **Q4 ✓ RESOLVED (i) KEEP — live check 11 Nov 2026** | **Stale date in live meta**: TH visa description says "updated November 30, 2022" **[audit]** | **Live check against primary** (Royal Thai Embassy Dhaka TR page, fetched 11 Nov 2026): the page itself displays `data last updated 30 Nov 2022` and still publishes **BDT 60,000/person · 120,000/family** verbatim [RESEARCH-uk-umrah-hajj-2026-11-11.md §6] → the date is the *source's own stamp*, figures match the primary today. **(iii) re-date = impossible without inventing a newer date** (source not updated since); (ii) remove = would delete an accurate honesty signal. **Decision: keep as-is; guard `b2ThaiGuideMetaIsSafe` untouched; verify stays 510/510** | No code change; override available to owner but the live check gives no honest basis to re-date | Never invent a date (Number rule) |
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

**Batches 1 and 2 (Q1/Q3 rows above) have been applied to the site; Batch 3 and Q4 await approval.** The only other file written this session
alongside it: `docs/02-content/audit-internal-links.py` (the reproducible auditor).
