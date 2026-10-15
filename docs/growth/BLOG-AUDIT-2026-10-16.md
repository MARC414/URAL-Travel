# Blog Audit — All English & Bengali Articles (Report Only, No Edits Made)

**Audit date:** 16 October 2026 · **Auditor pass:** automated inventory + manual high-risk sampling
**Scope:** 48 published blog posts in `src/data/blogContent.ts` (EN) with twins in
`src/data/bengaliContent.ts` (BN), metadata/references/internal links in `src/constants.ts`
(`BLOG_DATA`), plus the 1 scheduled-pipeline draft (Kathmandu→Cox's Bazar, completed separately).
**Rule for this document:** findings + proposed fixes for owner approval. **No article was edited.**

> **Method & limits (read first):** Inventory, reference presence, dates, link targets, EN/BN word
> and number-set comparisons were computed from the repo. High-risk bodies (visa, money, legal,
> fares) were manually sampled. External URL liveness could **not** be bulk-tested from the
> sandbox (outbound network is restricted; direct requests return `000`, which means "blocked
> here", not "dead"). Reference URLs were spot-checked via page fetch — see §3. A full
> claim-by-claim re-verification of every number is the *fix-phase* work, per article, using the
> CONTENT-OS Stage 2 ledger. GSC data was not available; demand/indexing is "not measured".

---

## 1. Executive summary

| Finding | Count |
|---|---|
| Posts with **no article-level references** (fall back to generic category portals) | **41 of 48** |
| Posts with **no `updatedAt`** (reader can't tell when facts were checked) | **40 of 48** |
| Posts with article-level references | 7 (Umrah pillar 23, Dhaka–Kolkata 10, Nusuk/Rawdah 10, Saudi stopover 8, Thailand eVisa 5, Haramain hotels 3, Nepal-vs-Thailand 2) |
| Confirmed **broken reference URL** | 1 (Nepal DoI — §3) |
| EN↔BN numeric-set mismatches flagged for fix-phase verification | 30+ posts (crude set comparison; formatting noise included — §5) |
| Internal links pointing to non-existent blog slugs | **0** (all `/blog/…` links resolve to real slugs; `/costs/:id`, `/flights/:id` etc. are valid route patterns) |
| Expired-promo risk in body copy | KKday 10.10 codes (campaign ends 31 Oct 2026 per registry; sanitizer auto-hides after expiry — article becomes a stale sale page after that date) |

**The pattern:** the 7 posts refreshed in Oct 2026 (Umrah cluster, Thailand eVisa, Dhaka–Kolkata,
Nepal-vs-Thailand) meet the current evidence standard. The other 41 are pre-standard copy:
assertive prices, fees and rules with no citations, no check dates, and BN twins that were
never parity-audited. Nothing found suggests the site is misleading *by design* — but a reader
(or Google) cannot verify most money/visa claims, and several specific claims are wrong or
folklore (§2).

---

## 2. 🔴 Factual errors & folklore — fix first (sampled, high confidence)

| # | Post | Claim as published | Problem |
|---|---|---|---|
| F1 | `cheap-flight-booking-hacks-dhaka` | "Tuesday night GDS refresh… search 11:30 PM", "up to 30% cheaper", "Mon/Tue saves BDT 4,000–6,000", "Thai Lion… below BDT 33,000" | Airline-pricing folklore; no source; invented savings/figures. Violates CONTENT-OS §2.3 and v2 §6.3 blacklist. |
| F2 | `hotel-savings-guide-bangkok-kl-dubai` | "two–three BTS stations cuts rates 40%", "incognito browsers", "~$6/day Radical Storage" | Unsourced percentage; incognito claim is folklore; priced affiliate claim undated. |
| F3 | `nepal-pokhara-itinerary-bangladesh` | "Gratis Visa on Arrival in under 20 minutes", prices in BDT for everything incl. "SAARC ticket: BDT 100" (Boudhanath) | Processing-time promise; Nepal prices quoted in BDT without NPR basis or date; budget total (BDT 40–54k) conflicts with BN twin's figures (§5). |
| F4 | `dual-currency-card-endorsement-bangladesh` | "$18,000 annual travel quota… cash ceiling $5,000… $9,000 under-12" attributed to "FE/PD-1 Circular No. 33" | High-impact Bangladesh Bank claims, **zero references**. Must be re-verified against the current BB FE circular before any other edit; numbers may be stale or conflated (travel quota vs cash). |
| F5 | `flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp` | "€600 (~BDT 78,000)", Montreal "~€1,600 / BDT 2,00,000+", GACA "hotel for 6+ hour delays… SDR/SAR payouts", "claim last 3 years" | Core EC261 scope is partly right (and partly self-corrected mid-article), but BDT conversions are undated, GACA/Turkish/Montreal limits are uncited, and the 21-day baggage statement conflates declaration-of-loss with liability cap. **This is also the AirHelp-update target — audit-fix it in that task.** |
| F6 | `top-budget-family-destinations-from-dhaka` | Visa fees as facts: Malaysia "BDT 3,800–4,200; 2–4 working days", Singapore "BDT 4,200–6,500", Dubai "BDT 11,500–14,500; 3–5 days", "100% Free VOA" absolutes | Agency-market prices presented as official fees, no sources/dates. (Thailand row in the same table was already fixed to the qualified pattern — use it as the template.) |
| F7 | `dhaka-airport-outbound-immigration-checklist-noc-go` | "clear emigration in under 2 minutes", "5 MANDATORY PAPERS", "$500+ recommended" | Procedural promises and pseudo-official requirements; NOC/GO content is directionally useful but must be framed as commonly-asked practice, not law, unless sourced. |
| F8 | `singapore-visa-guide-bangladesh-agents` | "closing balance at least BDT 1,50,000 (3,00,000 family)", LOI workaround via agents | Uncited financial thresholds; LOI/agent-sponsorship wording risks implying a bypass. Verify against ICA/consulate + authorized-agent rules. EN/BN balance figures differ (§5). |
| F9 | `kkday-10-10-winter-sale-japan-tours-passes-guide` | Present-tense sale page, 30% codes | Time-boxed campaign copy. After 31 Oct 2026 the codes auto-hide but the article remains a sale announcement — needs a post-campaign disposition (update to evergreen Japan passes guide or retire). BN body is ~half EN length. |
| F10 | Umrah-cluster children without references (`hajj-registration…`, `umrah-rules-for-women…`, `ramadan-umrah…`, `wearing-ihram…`, `official-zamzam…`, `dhaka-to-jeddah-madinah-open-jaw…`, `umrah-with-elderly-parents…`, `bangladeshi-halal-food-makkah…`, `makkah-madinah-badr-taif…`, `umrah-dubai-10-day-combo…`) | Hajj costs/registration, mahram rules, customs (gold/Zamzam), fares, taxi prices | The pillar + stopover + Nusuk guides were hardened in Oct; their siblings were not. Same-cluster inconsistency is the most visible trust risk on the site. Hajj registration dates/costs are season-bound and certainly stale. |

## 3. 🟠 Source problems

- **Broken (confirmed by fetch):** `https://pokhara.immigration.gov.np/en/page/tourist-visa-2`
  returns a 404 page. Used by `nepal-vs-thailand-first-trip`. Replace with the current DoI Nepal
  tourist-visa page (immigration.gov.np) and re-verify the SAARC gratis wording on the live page.
- **Duplicate/divergent operator URL:** Haramain baggage is cited as both
  `sar.hhr.sa/travel/guidelines/baggage` and `sar.hhr.sa/web/portal/travel/guidelines/baggage`
  (the latter verified live 16 Oct: 25 kg, 65×55×35 cm). Standardise on the live portal URL.
- **Generic-portal references:** the 41 no-reference posts render *category-level* portal cards,
  honestly labelled as general links (good), but that means **no claim in those articles is
  actually cited** (bad). Fix-phase standard: article-level `references`, claim-linked, tiered
  government → operator → secondary, with checked dates in prose (Kathmandu draft is the model).
- **Not tested:** remaining ~40 reference URLs (sandbox network restriction). Fix phase must open
  each one per article (Stage 2), not trust this report.

## 4. 🟡 Structural / strategy flags

- **Off-context posts:** `havana-cuba-travel-guide-bangladesh`, `chefchaouen-morocco-travel-guide-bangladesh`
  — already flagged in CONTENT-STRATEGY-2026 as diluting the Bangladesh-outbound source context.
  Options unchanged: reframe around BD feasibility honestly, deprioritise, or retire (owner call).
- **`travel-creator-resources`** — 22 absolute/hype terms, affiliate-programme claims (80+ brands
  etc.) uncited; it's a B2B/creator page inside a traveller blog. Keep/refix is an owner call.
- **Thin posts:** `cheap-flight-booking-hacks-dhaka` (224 words), `hotel-savings…` (247),
  `maldives-budget…` (345), `singapore-visa…` (378) — below the depth of the rest; QD-Heading
  candidates for merging into stronger pages under v2 §4, or full rewrites.
- **v2 retrofit is NOT recommended wholesale:** centerpiece/component retrofits should ride along
  with each article's fix-phase rewrite, not a separate cosmetic pass.

## 5. 🟡 EN↔BN parity flags (fix-phase verification list)

Word-ratio outliers (BN/EN): `nepal-pokhara-itinerary…` 0.38, `bangladesh-travelers-iata…` 0.46,
`kkday-10-10…` 0.53, `nepal-vs-thailand…` 0.59, `halal-food-guide-bangkok…` 0.61,
`maldives-budget…` 0.61, `ramadan-umrah…` 0.61, `hajj-registration…` 0.62.
(Bengali is naturally more compact — ratio alone isn't proof; these need section-level checks.)

Number-set mismatches needing eyeball verification (examples, not exhaustive):
`nepal-pokhara` budget totals differ EN vs BN · `singapore-visa` bank-balance figures differ ·
`dual-currency-card` figures incl. helpline numbers differ · `top-budget-family-destinations`
several budget bands differ · `sri-lanka-maldives-combo` cost figures differ ·
`cheap-flight-booking-hacks` BN cites BDT 10–25k swings absent in EN.
Fix-phase rule (CONTENT-OS Stage 5): reconcile to one ledger, both locales, same numbers.

## 6. Per-article inventory (48)

Legend: Refs = article-level references · Upd = `updatedAt` · Risk = fix priority
(P0 legal/money/visa uncited · P1 fares/costs uncited · P2 evergreen/low-risk)

| Post | Refs | Upd | EN words | BN/EN | Risk |
|---|---|---|---|---|---|
| cheap-flight-booking-hacks-dhaka | 0 | – | 224 | .85 | P1 (F1) |
| nepal-vs-thailand-first-trip | 2 | 2026-10-12 | 374 | .59 | P1 (broken ref §3) |
| hotel-savings-guide-bangkok-kl-dubai | 0 | – | 247 | .85 | P1 (F2) |
| halal-food-guide-bangkok-bangladesh | 0 | – | 825 | .61 | P2 |
| nepal-pokhara-itinerary-bangladesh | 0 | – | 504 | .38 | P1 (F3) |
| dual-currency-card-endorsement-bangladesh | 0 | – | 824 | .79 | **P0 (F4)** |
| maldives-budget-trip-bangladesh-maafushi | 0 | – | 345 | .61 | P1 |
| singapore-visa-guide-bangladesh-agents | 0 | – | 378 | .68 | **P0 (F8)** |
| top-budget-family-destinations-from-dhaka | 0 | 2026-10-14 | 845 | .67 | P1 (F6) |
| dhaka-airport-outbound-immigration-checklist-noc-go | 0 | – | 461 | 1.01 | **P0 (F7)** |
| umrah-hajj-guide-bangladesh-nusuk-bdt-cost | 23 | 2026-10-14 | 1825 | .88 | ✅ done |
| makkah-madinah-hotel-zones-haramain-train-guide | 3 | 2026-10-15 | 1265 | .78 | ✅ done (§3 URL tidy) |
| hajj-registration-bangladesh-government-vs-private-package-cost | 0 | – | 691 | .62 | **P0 (F10)** |
| umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide | 0 | – | 626 | .70 | P0 (medical/visa uncited) |
| saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah | 8 | 2026-10-15 | 1722 | .83 | ✅ done |
| nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit | 10 | 2026-10-14 | 1015 | .79 | ✅ done |
| umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates | 0 | – | 602 | .68 | **P0 (F10)** |
| dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia | 0 | – | 551 | .65 | P1 (fare claims) |
| ramadan-umrah-itikaf-guide-bangladesh-booking-budget | 0 | – | 514 | .61 | P0/P1 |
| wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules | 0 | – | 597 | .64 | P1 (religious guidance — source carefully) |
| official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka | 0 | – | 513 | .74 | **P0 (customs uncited)** |
| bangladeshi-halal-food-guide-makkah-madinah-budget-meals | 0 | – | 547 | .74 | P2 |
| makkah-madinah-badr-taif-historical-ziyarah-taxi-guide | 0 | – | 766 | .71 | P1 (taxi fares) |
| umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide | 0 | – | 636 | .80 | P1 |
| abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide | 0 | – | 672 | .75 | P1/P2 |
| malaysia-islamic-heritage-putrajaya-halal-family-tour-guide | 0 | – | 554 | .75 | P2 |
| europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide | 0 | – | 682 | .75 | P1 (pass prices) |
| shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah | 0 | – | 623 | .84 | **P0 (bank product claims)** |
| rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix | 0 | – | 633 | .66 | **P0 (BB rules uncited)** |
| book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card | 0 | – | 521 | .75 | P1 (service claims — URAL's own offer; keep honest) |
| cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide | 0 | – | 583 | .82 | P0/P1 (DCC % claims) |
| thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide | 5 | 2026-10-14 | 654 | .87 | ✅ done |
| malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration | 0 | – | 485 | .83 | **P0 (visa/MDAC uncited)** |
| fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia | 0 | – | 527 | .83 | P1 (advice framed as ladder — qualify) |
| singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide | 0 | – | 639 | .80 | P1 |
| bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh | 0 | – | 543 | .81 | P0/P1 (medical visa + prices) |
| best-travel-esim-and-schengen-travel-insurance-bangladesh-guide | 0 | – | 448 | .81 | P0/P1 (Schengen insurance requirements) |
| sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost | 0 | – | 582 | .84 | P0/P1 (ETA rules) |
| bangladesh-epassport-application-renewal-64-districts-fee-guide | 0 | – | 557 | .78 | **P0 (govt fees/process uncited)** |
| flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp | 0 | – | 579 | .77 | **P0 (F5) — AirHelp task** |
| top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla | 0 | – | 605 | .79 | P1 (baggage by fare class — operator-verify) |
| bangladesh-travelers-iata-airport-codes-directory-guide | 0 | – | 784 | .46 | P2 (verify route claims e.g. ZYL–LHR) |
| chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai | 0 | – | 570 | .66 | P1 (route/fare claims) |
| havana-cuba-travel-guide-bangladesh | 0 | – | 1881 | .78 | P2 + strategy flag §4 |
| chefchaouen-morocco-travel-guide-bangladesh | 0 | – | 1628 | .78 | P2 + strategy flag §4 |
| travel-creator-resources | 0 | – | 1509 | .89 | P2 + owner call §4 |
| kkday-10-10-winter-sale-japan-tours-passes-guide | 0 | – | 1398 | .53 | P1 (F9, time-boxed) |
| dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide | 10 | 2026-10-15 | 2007 | .88 | ✅ done |
| kathmandu-to-coxs-bazar-flights-route-status-booking (draft) | 8 | 2026-10-16 | — | — | ✅ done (draft, unpublished) |

## 7. Proposed fix order (owner approval required per wave)

1. **Wave A — P0 legal/money (one article at a time, Stage 1–9):** dual-currency endorsement →
   RFCD/travel quota → shariah cards → DCC/money exchange (one money cluster, reconciled
   numbers) → ePassport → Malaysia eVisa/MDAC → Singapore visa → airport NOC/GO checklist.
2. **Wave B — Umrah-cluster siblings (F10):** Hajj registration (season-bound — re-verify
   first) → women/mahram → Zamzam/customs → elderly/medical → Ramadan → ihram → open-jaw fares
   → ziyarah/food/Dubai-combo.
3. **Wave C — compensation + AirHelp (merges with the parked AirHelp Oman update):**
   rebuild `flight-delay-cancellation…airhelp` on EC261/UK261/GACA/SHY/Montreal primary
   sources, *then* add Oman.
4. **Wave D — costs/fares (P1):** family-destinations table, Pokhara, Maldives, Singapore
   itinerary, baggage rules, CGP–Dubai, Europe passes, hotel-savings, cheap-flight hacks
   (rewrite or merge per QD verdict).
5. **Wave E — parity & hygiene:** BN section-level parity for §5 list, broken Nepal ref (can
   ride Wave D), Haramain URL tidy, KKday post-campaign disposition, Cuba/Morocco/creator
   owner decisions.

**Not recommended:** batch-editing all 41 in one pass, auto-"refreshing" dates without
re-verification, or deleting anything without GSC/backlink evidence (Gotch disposition rule).
