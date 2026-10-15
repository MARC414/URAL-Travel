# URAL Content Queue and Claims Ledger

**Prepared:** 14 October 2026

**Use with:** [`CONTENT-OS.md`](CONTENT-OS.md) and [`AI-WRITING-PROMPTS.md`](AI-WRITING-PROMPTS.md).

> **Reconstruction note:** the previous session's `CONTENT-QUEUE.md` was not in the checkout and its commit was unavailable. This queue and its row format are reconstructed from the current repository conventions and task brief.

> **Active execution order — 15 October 2026.** The **Umrah cluster** is the rollout in progress
> ([`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md)); its row below remains the active cluster gate. **Fard Hajj stays a
> separate, linked topic**, not an Umrah child. **The India cluster as a multi-page wave remains deferred**, regardless of how
> [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) §6/§12 numbers its sprints.
>
> **Post-hoc review of the published India land-corridor article (completed 15 October 2026).** PR #37 merged
> `/blog/dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` (English and Bengali) without a queue row,
> claims ledger, or `references`, and with two phantom `/blog` internal links. Per owner instruction on
> 15 October 2026 (*"Publish, then review it — fix the two phantom links, add references, and give it a proper
> queue row"*), the page now has its worked queue row and Stage 2–9 review record below: the two phantom
> `/blog` links are replaced with live routes, 10 bilingual official references are attached, raw markdown
> pipes/hashes/links and the stray German token (`weitersetzen`) are cleaned for URAL's renderer, and live
> rail/IVAC/fare claims are qualified against official portals. This review stabilizes the single shipped page;
> it does **not** open Sprint 1 or supersede the Umrah cluster rollout.

---

## Queue rules

- Add the target row before drafting. Keep its primary query, verdict, owner decisions, and next gate explicit.
- Do not state search volume or keyword difficulty unless a dated, market-relevant source is available and recorded. “Not measured” is a valid value.
- Each content task has one primary URL, one primary reader task, and one locale twin where the route exists.
- Do not mark Stage 2 complete merely because a source link was added. Open and check the source, record applicability/date/conditions, then mark the claim status.
- `BLOCKED` means do not draft or edit the live content until the stated evidence or owner decision exists. A fixed URL decision remains fixed unless the owner changes it; a source conflict does not silently authorize a different URL.
- When a queued piece ships, record the verified build/release result and remove or archive obsolete task detail in line with `AGENTS.md`.

---

## Worked queue row — Umrah pillar refresh

| Added / checked | Verdict | English URL | Bengali twin | Primary query | Intent / format hypothesis | Stage result / next gate |
|---|---|---|---|---|---|---|
| 2026-10-14 | **UPDATE IN PLACE — fixed by owner; do not create a second page or change the slug.** | `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` | `/bn/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` | **DIY Umrah from Bangladesh** (owner's task brief; also listed for this URL in `SEO-KEYWORD-MAP.md`) | Informational / execution-intent guide with official route choices, practical booking steps and one carefully qualified BDT planning total. Live Bangladesh SERP was not measured in this session. | Stages 1–8 completed; Stage 8 scores 15/16 with no zero and no hard fail. Stage 9 passed lint/build/verify on 2026-10-14; both locale routes and scoped sitemap/RSS diffs inspected. Code is verified but not externally deployed. Keep `/umrah` as the broader planning hub and this post as the detailed execution article; re-check season-sensitive sources before the next update. |

### Must-preserve and scope notes from the owner

- Keep the same English URL and Bengali twin; no second Umrah page and no slug change.
- Preserve the three top-level Umrah visa-path categories: standard Umrah visa; 96-hour stopover/transit; eligible Saudi tourist-visa routes. Correct details within those categories when official evidence requires it.
- Keep Fard Hajj separate from Umrah, including Bangladesh registration and the accurately scoped permit-violation warning.
- Preserve the existing 10-day, family-of-four-sharing DIY Umrah total of **BDT 1,16,000–1,32,000 per person**. Do not reprice it or publish another budget/savings range without a same-basis, dated source basket.
- Keep the Bengali twin at full decision-level parity and retain the existing useful internal links. Replace the category-only fallback with claim-linked sources, and label any retained general portal honestly rather than implying it supports Saudi Umrah claims.
- New visa, rail, hotel, cost, app or legal claims must pass the Stage 2 ledger. No guessed search volume/difficulty; no unsourced exact airfare, hotel price, walking distance, shuttle guarantee, “free hotel,” or blanket “no agency needed” claim.

---

## Stage 2 — Umrah claims ledger (checked 14 October 2026)

**Status:** research and owner decisions are complete, and the article now applies both material resolutions: (1) three top-level categories, with direct Nusuk under Standard Umrah Visa and the external-agent accommodation/transport condition; (2) the dated 1447H Hajj penalty wording with the ten-year ban scoped to the narrower deported-infiltrator category. Seasonal findings and claim limits below remain cues to refresh against the next official notice before a future trip season.

| ID | Claim / proposed section | Primary source checked | Finding as of 2026-10-14 | Status / safe action |
|---|---|---|---|---|
| U-01 | Pathway A: standard Umrah visa through Nusuk or an external agent; prior copy said an authorized Bangladesh agency could sell visa-only. | Ministry Nusuk Umrah launch: <https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-launches-Nusuk-Umrah-service-to-enable-pilgrims-from-outside-the-Kingdom>; official registration: <https://umrah.nusuk.sa/registration/signup>; Terms: <https://umrah.nusuk.sa/TermsOfUse>; Ministry FAQ: <https://haj.gov.sa/en/FAQ> | The Ministry announcement's publication date is **20 August 2025**; the page header is dynamic and showed 14 October 2026. It says overseas pilgrims can apply directly without an intermediary, and describes selectable individual services including visa. Bangladesh appears in the current Nusuk signup lists for both country of residence and nationality. The Terms say target countries can change and define an individual package as a collection of more than one service. The Ministry FAQ says an **external agent** cannot issue an Umrah visa without accommodation and transport services. | **RESOLVED / QUALIFIED (owner approved 2026-10-14).** Keep category 1 as Standard Umrah Visa; present direct Nusuk service and an authorized external provider as channels within it. Bangladesh is currently listed for registration, but service options/approval are not guaranteed and stand-alone visa-only checkout must not be promised. State the Ministry FAQ's accommodation-plus-transport condition specifically for external agents. |
| U-02 | 1448H visa and entry window; do not call Umrah unrestricted year-round. | Ministry 1448H calendar: <https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH> | For the 1448H season, the calendar says visa issuance and pilgrim entry began 31 May 2026; final visa issuance is 9 March 2027; final entry 23 March 2027; final departure 7 April 2027. Dates apply to that season only. | **VERIFIED / SEASON-BOUND.** Identify the 1448H dates as current checked guidance, not a permanent annual rule. Tell readers to check the next Ministry calendar before booking. |
| U-03 | Pathway B: Saudi stopover/transit visa through Saudia or flynas. | Visit Saudi stopover page: <https://www.visitsaudi.com/en/campaigns/saudi-stopover>; Saudia application: <https://www.saudia.com/transit-visa>; flynas: <https://www.flynas.com/en/stopovervisa> | Visit Saudi says stopover entry may be up to 96 hours and its FAQ says travelers booking with Saudia or flynas can apply. Its Saudia offer lists a free visa, application fee around SAR 39.50 and medical insurance from SAR 13; fees and airline conditions can differ at checkout. | **QUALIFIED.** Keep the 96-hour route. Say eligibility depends on the through-itinerary and current airline checkout. Do not generalize Saudia's exact fee to flynas, convert to BDT without a dated rate, or promise a complimentary hotel. |
| U-04 | Pathway C: Saudi tourist-visa eligibility for Bangladeshi passport holders, visa holders and GCC residents. | Official eVisa portal: <https://visa.visitsaudi.com/>; Visit Saudi Package Visa: <https://www.visitsaudi.com/en/campaigns/package-visa>; used-visa FAQ: <https://help.visitsaudi.com/hc/en-us/articles/360018933099-Can-I-get-a-visit-visa-if-I-have-a-valid-US-or-UK-or-Schengen-visa->; Visit Saudi FAQ: <https://www.visitsaudi.com/en/faq> | Bangladesh is not in the standard nationality-only eVisa country list currently shown on the official portal. Visit Saudi separately lists Bangladesh passport holders for its **Package Visa** when an integrated package includes confirmed flights and accommodation through an approved provider. The official used-visa FAQ describes visa-on-arrival eligibility for holders of valid, previously used US/UK/Schengen tourist or business visas, subject to air-arrival and carrier conditions. GCC-resident eligibility is a separate route with current residency/occupation criteria; the live FAQ/portal controls. | **VERIFIED / QUALIFIED.** Retain Pathway C as one top-level category, with the Package Visa, eligible used-visa arrival, and GCC-resident routes as sub-options. Do not claim that a used US/UK/Schengen visa automatically gives a direct one-year eVisa; say visa-on-arrival if current conditions are met. Tell ordinary Bangladeshi passport holders not to assume nationality-only tourist eVisa eligibility. |
| U-05 | Bangladesh Hajj registration and current 2027 schedule; keep Hajj distinct from Umrah. | Bangladesh Haj Management Portal: <https://www.hajj.gov.bd/>; Saudi Ministry FAQ: <https://haj.gov.sa/en/FAQ> | The Bangladesh portal's current notice lists the 2027 registration cutoff as 26 September 2026 (past on the check date), visa issuance beginning 28 January 2027 and Hajj flights beginning 8 April 2027. The portal describes pre-registration followed by final registration. Season notices and reopening/extension announcements control. | **VERIFIED / SEASON-BOUND.** Link to the portal and describe the two-stage process. If mentioning the 2027 cutoff, label it as the current portal notice and already passed as of 14 October; do not imply registration remains open or copy dates into later years. |
| U-06 | Hajj permit violation consequences; prior copy stated SAR 10,000+ and a universal ten-year ban. | Saudi Press Agency reporting the Interior Ministry's 1447 announcement: <https://www.spa.gov.sa/en/N2559888> | For 1447H (2026), the announcement sets a fine up to SAR 20,000 for performing/attempting Hajj without a permit and for visit-visa holders entering/remaining in Makkah or the Holy Sites during the specified Hajj restriction period. The ten-year ban is for deported infiltrators, including residents and people who overstay visas—not every visitor. New seasons may set new dates/rules. | **RESOLVED / SEASON-BOUND (owner approved 2026-10-14).** State that the 1447H (2026) notice sets a fine up to SAR 20,000 for the specified no-permit Hajj / visit-visa violations; the ten-year re-entry ban applies to the narrower deported-infiltrator category, not every visitor. Link the official notice and say later seasons' notices control. |
| U-07 | Umrah vaccination and health requirements. | Saudi Ministry of Health 1447H Umrah requirements: <https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf>; Ministry pilgrim-health index: <https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx> | The current 1447H (2026) PDF requires an accepted meningococcal vaccine covering ACYW for all Umrah travelers: conjugate ACYW/ACYWX within five years or quadrivalent polysaccharide within three years, given at least ten days before arrival. Polio/yellow-fever requirements depend on the listed arrival countries. COVID-19 proof applies to specified higher-risk groups, not all travelers. This season-specific PDF takes priority over older, mixed-era FAQ entries. | **VERIFIED / SEASON-BOUND.** State the current 1447H rule and tell readers to re-check the next MOH PDF and the country-of-arrival lists. Do not repeat an unsourced “COVID is never required” or a universal polio requirement. |
| U-08 | Saudi Visa Bio for applicants from Bangladesh. | Ministry FAQ biometric answers: <https://haj.gov.sa/en/FAQ>; Saudi Visa Bio app listing by the Saudi Ministry of Foreign Affairs: <https://play.google.com/store/apps/details?id=sa.gov.mofa.saudivisabio> | The Ministry FAQ lists Bangladesh among countries where biometric enrollment has been implemented for electronically issued Umrah visas and names Saudi Visa Bio. The requirement is visa/application-specific; the same statement should not be generalized to all tourist or stopover visas. | **QUALIFIED.** Say the current Ministry FAQ lists Bangladesh for Umrah-visa biometrics; follow the instructions in the current official visa application and Saudi Visa Bio app. Avoid saying that every pilgrim must use it before flying. |
| U-09 | Nusuk Umrah permit and Rawdah permit timing/booking. | Ministry Umrah permit service: <https://haj.gov.sa/en/E-Services/Umrah-Permit-Application>; Rawdah service: <https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women> | The service pages list visitors among the eligible users, name the Nusuk App and website, and instruct users to select an available date/time slot. The Rawdah service page describes a free appointment permit. No fixed weekly slot-release schedule is published in these sources. | **VERIFIED / QUALIFIED.** Explain the steps and advise checking live availability. Do not state a fixed day, guaranteed window or “free Rawdah every time” beyond the service page's current cost/terms. |
| U-10 | Haramain rail booking, fare and baggage. | Official HHR fares: <https://sar.hhr.sa/travel/fares>; baggage: <https://sar.hhr.sa/travel/guidelines/baggage>; booking: <https://sar.hhr.sa/> | On 14 October 2026 the HHR tariff table listed a SAR 162 base Economy fare for Makkah–Madinah and SAR 65 for KAIA–Makkah; the operator says these are basic fares, VAT/fees are excluded and checkout prices vary by date, occupancy and other factors. Baggage page allows one large piece up to 25 kg / 65 × 55 × 35 cm and one hand item. | **VERIFIED / DYNAMIC.** If retaining the checked base fare, label route/class/date and “before VAT/fees; live checkout may differ.” Explain how to check/book on the official portal. Use the current baggage dimensions, not the old 65 × 45 × 30 cm claim. |
| U-11 | Makkah/Madinah hotel zones, walking distance, hotel price and shuttle. | Existing hotel-zone child page is internal only; no exact property/date/map route or provider quote was captured for this task. | Neighborhood names alone do not verify a hotel's actual entrance-to-gate route, slope, road closure, walking time, shuttle schedule or price. | **QUALIFIED / NO PRECISION.** Give zone names only as search starting points. Direct readers to verify the exact property address, live route to their intended gate, accessibility and shuttle schedule with the hotel; do not include distances, hotel rates or blanket free-shuttle claims. |
| U-12 | Existing total: 10 days, family of four sharing, BDT 1,16,000–1,32,000 per person. | Current EN/BN page and owner instruction; no matched live flight/hotel/visa/transport basket in this checkout. | The range is owner-mandated for preservation. The old component ranges did not reconcile to the stated ceiling, and some vary between locales. No like-for-like current booking basket was captured. | **PRESERVE; QUALIFY; REMOVE UNSUPPORTED COMPONENT AMOUNTS.** Keep the one range as an existing planning estimate, say it was not re-priced in this refresh and is not a live quote. Do not add the previous comfort range, a component-max table, a package comparison price or a savings number. |
| U-13 | Agency package vs DIY comparison. | Nusuk platform and Ministry-approved external-agent information; no same-date, same-duration, same-occupancy Bangladesh package quote recorded. | No comparable itemized agency offer is available for a matched 10-day trip. The preserved DIY estimate is not enough to infer savings. | **QUALITATIVE ONLY.** Compare who arranges visa, services, flights and local logistics. Offer an apples-to-apples quote checklist; state that neither option is automatically cheaper. |
| U-14 | References and useful internal links. | Existing EN `BLOG_DATA` entry, Bengali override, category-level references in `src/routes/BlogPostRouteView.tsx`, and target scope. | EN had four useful internal links; BN had three. The old category fallback showed six general portal cards, including a combined UAE/JAKIM label that linked only to `u.ae`; it did not support Saudi Umrah claims. | **IMPLEMENTED / SCOPE-CLEANED.** Keep all prior EN/BN internal links and add `/umrah` to BN for parity. Replace the category fallback on this target with 18 numbered claim-linked sources, four relevant authority/booking portals, and the retained UAE URL clearly labeled as general regional information only; the old card had no JAKIM link, so no JAKIM claim is retained. The localized list carries all 23 links in both routes. Other posts are unchanged. |
| U-15 | Actual article surface and rendering contract. | `src/constants.ts`, `src/data/blogContent.ts`, `src/data/bengaliContent.ts`, `src/App.tsx`, `src/routes/BlogPostRouteView.tsx`, `src/utils/blogStructuredData.ts`, `scripts/prerender.ts`, `scripts/verify-build.ts`; `src/data/contentMeta.ts` checked but unchanged. | The article needed target-only semantic table rendering, visible FAQs plus FAQPage schema, localized references, and suppression of stale shared Hajj/Umrah facts; the generic body renderer uses plain-text paragraphs. | **IMPLEMENTED / VERIFIED.** Added the target table marker and locale-aware React/prerender renderers; allowlisted the EN/BN FAQ heading for this slug; suppressed the shared panel only here; passed the target-focused React/prerender checks. `CONTENT_UPDATED` remains 2026-10-14. No other post body or route was changed. |

### Stage 3–8 execution record (14 October 2026)

- **Stage 3 — Brief: complete.** The page job is to help a Bangladeshi passport holder select an eligible visa route, follow a practical DIY sequence, and keep Fard Hajj separate. `/umrah` remains the broad planning hub. Live Bangladesh SERP/GSC observations were not available and remain explicitly unmeasured.
- **Stage 4 — English: complete.** The answer leads; exactly three top-level visa categories remain. Unsupported airfare, hotel, distance, and package-savings claims were removed. The retained BDT estimate is qualified as unre-priced; one semantic table, sourced current-season conditions, and practical checks are included.
- **Stage 5 — Bengali: complete.** The Bengali override carries the same three categories, eligibility caveats, dates, penalty scope, fare/baggage figures, booking steps, one retained BDT estimate, references, and five FAQs; it is not a shortened summary.
- **Stage 6 — package: complete.** EN/BN title, summary, 14 October review date, AEO snippets, visible FAQ/schema, numbered references, retained internal links, and eSIM caveat are aligned.
- **Stage 7 — preflight: passed.** EN/BN claim and citation numbering, category count, date/cost basis, SAR fare units, baggage dimensions, permit steps, FAQ pairs, and route links were reviewed. Both article bodies contain only the preserved BDT planning estimate (repeated in the lead and table, with no second budget range); the estimate is not a live quote.
- **Stage 8 — red team:**

  | Dimension | Score / 4 | Reason |
  |---|---:|---|
  | Intent and format | 3 | Direct execution answer and useful guide structure; live Bangladesh SERP format remains unmeasured. |
  | Factual evidence and safety | 4 | Primary-source ledger; dates and penalty rules are season-bound; unresolved precision and unsupported comparisons removed. |
  | Usability and actionability | 4 | Three route choices, booking order, semantic budget table, checks, and useful internal links. |
  | Locale, trust, and release | 4 | Full BN decision parity, visible cited sources, FAQ/schema parity, route/build checks. |
  | **Total** | **15 / 16** | **Pass (≥13); no zero scores and no hard fail.** |

---

## Stage 9 — repository handoff and verification (14 October 2026)

**Repository implementation verified; not externally deployed.** The in-place article update is in `src/data/blogContent.ts`, `src/data/bengaliContent.ts`, and `src/constants.ts`; target AEO copy is in `src/App.tsx`. Target-only React rendering/FAQ behavior is in `src/routes/BlogPostRouteView.tsx` and `src/utils/blogStructuredData.ts`; static output is in `scripts/prerender.ts`, with target regression checks in `scripts/verify-build.ts`. `src/data/contentMeta.ts` was left unchanged at 2026-10-14. The method/prompt/queue guidance is in `docs/growth/`; `CONTENT-STRATEGY-2026.md` was not edited.

- `npm run lint` — **PASS** (`tsc --noEmit`).
- `npm run build` — **PASS**; 93 English + 93 Bengali canonical routes prerendered. Vite emitted a non-blocking chunk-size warning for chunks above 250 kB.
- `npm run verify:build` — **PASS, all 145 checks**. Added assertions cover the semantic EN/BN table, all 23 ordered source/portal references and Bengali propagation, FAQ/schema parity, and the React route's suppression of the stale shared Hajj panel.
- Inspected `dist/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost.html` and `dist/bn/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost.html`: one semantic budget table per route, visible locale-specific FAQ, FAQPage JSON-LD, 23 numbered references, matching 14 October checked date, and no unresolved table marker. The client React render check confirms the target's own FAQ replaces the shared Hajj/Umrah panel.
- `public/sitemap.xml` diff is limited to `<lastmod>` for the English and Bengali target URLs (`2026-10-14T09:00:00+06:00`). `public/rss.xml` diff is limited to the target title and summary; URL/guid, publication date and the other 46 items are unchanged. No other post body or slug changed.

**Release boundary:** code and generated repository artifacts are ready for owner review; deployment, live SERP/GSC measurement, and post-release monitoring have not been performed.

---

## Worked queue row — Nusuk / Rawdah / Saudi Visa Bio guide (Wave 3A)

| Added / checked | Verdict | English URL | Bengali twin | Primary query | Intent / format hypothesis | Stage result / next gate |
|---|---|---|---|---|---|---|
| 2026-10-14 | **UPDATE IN PLACE — fixed slug; no second page.** | `/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit` | `/bn/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit` | **Nusuk app and Saudi Visa Bio guide for Bangladeshi pilgrims** | Informational / execution-intent guide: official apps, biometric steps, Nusuk visitor registration, Rawdah appointment permit, live availability. Live Bangladesh SERP was not measured. | Stages 1–9 completed in this wave; lint/build/verify:build to be recorded below. Code verified, not externally deployed. |

### Must-preserve and scope notes from the owner

- Keep the same English URL and Bengali twin; no slug change.
- Scope **Saudi Visa Bio** to the current Saudi Ministry FAQ: Bangladesh is listed for biometric enrollment for electronically issued Umrah visas. Do not claim every tourist or stopover traveler must use it.
- Remove any fixed weekly ("Friday") Rawdah slot-release guarantee. State that the Rawdah service page describes a free appointment permit and instructs users to select an available date/time slot; no fixed weekly schedule is published.
- Keep visa permission distinct from a Nusuk permit. Keep full English/Bengali decision parity.
- `CONTENT_UPDATED` stays 2026-10-14; use `updatedAt` on `blog-16`.

### Stage 2 — Nusuk / Rawdah / Saudi Visa Bio claims ledger (checked 14 October 2026)

| ID | Claim / proposed section | Primary source checked | Finding as of 2026-10-14 | Status / safe action |
|---|---|---|---|---|
| U-01 | Standard Umrah Visa channel and Nusuk registration. | Ministry Nusuk Umrah launch; registration; Terms; Ministry FAQ. | Overseas pilgrims can apply directly without an intermediary; Bangladesh listed in signup; external agent cannot issue an Umrah visa without accommodation and transport services. | **QUALIFIED.** Keep direct Nusuk and external provider as channels; state the Ministry FAQ's accommodation-plus-transport condition for external agents. |
| U-02 | 1448H visa and entry window; Umrah is not unrestricted year-round. | Ministry 1448H calendar. | Visa issuance and pilgrim entry began 31 May 2026; final visa issuance 9 March 2027; final entry 23 March 2027; final departure 7 April 2027. Season-bound. | **VERIFIED / SEASON-BOUND.** Label as current checked guidance; tell readers to check the next calendar. |
| U-08 | Saudi Visa Bio for applicants from Bangladesh. | Ministry FAQ biometric answers; Saudi Visa Bio app listing. | Ministry FAQ lists Bangladesh among countries where biometric enrollment has been implemented for electronically issued Umrah visas and names Saudi Visa Bio. Requirement is visa/application-specific. | **QUALIFIED.** Say the current Ministry FAQ lists Bangladesh for Umrah-visa biometrics; follow current official visa application and app. Avoid saying every pilgrim must use it before flying. |
| U-09 | Nusuk Umrah permit and Rawdah permit timing/booking. | Ministry Umrah permit service; Rawdah service. | Service pages list visitors among eligible users, name the Nusuk App and website, and instruct users to select an available date/time slot. Rawdah service page describes a free appointment permit. No fixed weekly slot-release schedule is published. | **VERIFIED / QUALIFIED.** Explain steps and advise checking live availability. Do not state a fixed day, guaranteed window, or "free Rawdah every time" beyond the service page's current cost/terms. |

### Stage 3–8 execution record (14 October 2026)

- **Stage 3 — Brief: complete.** Page job: help a Bangladeshi passport holder prepare the official Nusuk and, where applicable, Saudi Visa Bio steps, register as a Visitor, and book a Rawdah appointment permit without overclaiming biometric or slot-release rules. `/umrah` and the main DIY guide remain the broader planning/process owners.
- **Stage 4 — English: complete.** Answer leads; Saudi Visa Bio scoped to the Ministry FAQ's Umrah-visa biometric listing; fixed Friday Rawdah release removed; live availability emphasized; five FAQs added; numbered references added.
- **Stage 5 — Bengali: complete.** Bengali override carries the same sections, qualifications, references, and five FAQs; not a shortened summary.
- **Stage 6 — package: complete.** EN/BN title, summary, 14 October review date, AEO snippets, visible FAQ/schema, numbered references, retained internal links aligned.
- **Stage 7 — preflight: passed.** Claim/citation numbering, Saudi Visa Bio scope, absence of fixed Friday guarantee, FAQ pairs, route links, and EN/BN parity reviewed.
- **Stage 8 — red team:**

  | Dimension | Score / 4 | Reason |
  |---|---:|---|
  | Intent and format | 3 | Direct execution answer and useful guide structure; live Bangladesh SERP format remains unmeasured. |
  | Factual evidence and safety | 4 | Primary-source ledger; Saudi Visa Bio scoped to official FAQ; no fixed slot-release claim. |
  | Usability and actionability | 4 | Biometric steps, Nusuk registration, Rawdah booking steps, FAQs, source links. |
  | Locale, trust, and release | 4 | Full BN decision parity, visible cited sources, FAQ/schema parity, route/build checks. |
  | **Total** | **15 / 16** | **Pass (≥13); no zero scores and no hard fail.** |

### Stage 9 — repository handoff and verification (14 October 2026)

**Repository implementation verified; not externally deployed.** The in-place article update is in `src/data/blogContent.ts`, `src/data/bengaliContent.ts`, and `src/constants.ts`; target AEO copy is in `src/App.tsx`. FAQPage allowlisting is in `src/utils/blogStructuredData.ts` and `scripts/verify-build.ts`. `src/data/contentMeta.ts` was left unchanged at 2026-10-14; `updatedAt` on `blog-16` is 2026-10-14.

- `npm run lint` — **PASS** (`tsc --noEmit`).
- `npm run build` — **PASS**; 94 English + 94 Bengali canonical routes prerendered.
- `npm run verify:build` — **PASS, all 145 checks**. FAQPage coverage now includes blog-16 in both locales; HowTo coverage already included it.
- Inspected `dist/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit.html` and `dist/bn/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit.html`: FAQPage JSON-LD present, numbered references rendered, no 'Friday' Rawdah release claim, Saudi Visa Bio scoped to the Ministry FAQ.

---

## Worked queue row — Dhaka–Kolkata land-corridor post-hoc review (`blog-48`)

| Added / checked | Verdict | English URL | Bengali twin | Primary query | Intent / format hypothesis | Stage result / next gate |
|---|---|---|---|---|---|---|
| 2026-10-15 | **REVIEW & QUALIFY IN PLACE — owner selected post-deploy review; keep `blog-48` published, replace the two phantom `/blog` links, add official references, and record the claims ledger.** | `/blog/dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` | `/bn/blog/dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` | **Dhaka to Kolkata by train and bus (Benapole border & BDT cost)** (`CONTENT-STRATEGY-2026.md` §5/§6 gap #1; live Bangladesh SERP/volume not measured) | Operational overland border-crossing and transport guide for Bangladeshi passport holders comparing the suspended Maitree Express, active Dhaka–Benapole–Petrapole–Kolkata bus corridor, IVAC sticker-visa process, and an indicative 3-day Kolkata planning budget. Live Bangladesh SERP was not measured in this session. | Stages 1–8 completed on 2026-10-15; Stage 8 scores 15/16 with no zero and no hard fail. Stage 9 passed lint/build/verify (145 checks) on 2026-10-15. Two phantom `/blog` links replaced with live routes; 10 bilingual official references added; EN/BN formatting and FAQPage JSON-LD aligned. Do **not** open additional India cluster pages until the active Umrah cluster waves in `UMRAH-CLUSTER-PLAN.md` close or are re-prioritised by the owner. |

### Scope and owner constraints

- Keep `/blog/dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` and `/bn/blog/dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` live as `blog-48` (48 published blog posts total).
- Remove the two phantom English `internalLinks` that pointed at `/blog` while promising non-existent India guides (`"Best Time to Visit India from Bangladesh (Weather + Fares)"` and `"India e-Visa & IVAC Visa Guide for Bangladeshis"`), replace them with real, relevant live routes (`/blog/dual-currency-card-endorsement-bangladesh` and `/flights`), make the `/costs` anchor text honest (`"Outbound Trip Cost Benchmarks & BDT Budget Planner"`), and bring the Bengali `internalLinks` to 5-link parity.
- Add 10 bilingual official primary references (`railway.gov.bd`, `eticket.railway.gov.bd`, `indianrailways.gov.in`, `ivacbd.com`, `ivacbd.com/kind-of-visas-documents`, `indianvisa-bangladesh.nic.in`, `hcidhaka.gov.in`, `nbr.gov.bd`, `blpa.gov.bd`, `lpai.gov.in`) in both `src/constants.ts` and `src/data/bengaliContent.ts`, with `updatedAt: "2026-10-15"`.
- Preserve the existing 3-day, 2-night Kolkata overland planning budget of **BDT 8,000–18,000 per person** (`BDT 8,000–12,000` budget tier; `BDT 15,000–18,000` comfortable tier) as an explicitly qualified planning reference rather than a live operator or hotel quote.
- Leave `src/data/contentMeta.ts` (`CONTENT_UPDATED = "2026-10-14"`) untouched so the 77 non-blog hub `<lastmod>` timestamps in `public/sitemap.xml` are not churned by a single-article review; blog posts carry their own ISO timestamp from `BLOG_DATA[].date` / `updatedAt`.

---

## Stage 2 — Dhaka–Kolkata claims ledger (checked 15 October 2026)

| ID | Claim / section | Primary source / portal | Finding as of 2026-10-15 | Status / safe action |
|---|---|---|---|---|
| IN-01 | Section 1: Cross-border passenger train status (Maitree Express Dhaka–Kolkata, Bandhan Express Khulna–Kolkata, Mitali Express Dhaka–New Jalpaiguri) suspended since July 2024. | Bangladesh Railway: <https://railway.gov.bd/> and <https://eticket.railway.gov.bd/>; Indian Railways: <https://indianrailways.gov.in/> | Cross-border passenger rail services were halted in mid-July 2024 and no official restart timetable was confirmed in this checkout. PR #37 cited a non-existent domain (`railwayticket.bd`) instead of the official Bangladesh Railway portals (`railway.gov.bd` and `eticket.railway.gov.bd`). | **QUALIFIED / PORTAL FIXED.** Replace `railwayticket.bd` with `railway.gov.bd` and `eticket.railway.gov.bd` `[1–2]` plus `indianrailways.gov.in` `[3]`. State that trains have been suspended since July 2024 with no confirmed restart date as of 15 October 2026, and instruct readers to check the official railway portals before planning. |
| IN-02 | Section 1: Padma Bridge reroute proposal (~6-hour journey time and potential fare reduction). | Bangladesh Railway: <https://railway.gov.bd/>; Indian Railways: <https://indianrailways.gov.in/> | Routing Dhaka–Kolkata passenger trains via the Padma Bridge corridor instead of Jamuna Bridge–Darsana has been discussed bilaterally, but no official international timetable or tariff table has been published. | **QUALIFIED.** Present the ~6-hour duration and any fare change strictly as unconfirmed proposals pending bilateral operational agreement `[1, 3]`. |
| IN-03 | Section 2: Pre-suspension rail fare figures (domestic Dhaka–Benapole classes BDT 319–1,181 vs Maitree Express USD-pegged international fares ~USD 20–30). | Bangladesh Railway: <https://railway.gov.bd/>, <https://eticket.railway.gov.bd/>; Indian Railways: <https://indianrailways.gov.in/> | PR #37 mixed domestic Bangladesh Railway intercity class codes (`SHOVAN`, `S_CHAIR`, `SNIGDHA`, `AC_S`, `AC_B`, BDT 206–1,181) with USD-pegged Maitree Express cross-border fares (~USD 20 AC Chair / ~USD 30 AC Seat before travel tax and VAT), and formatted them as raw markdown pipe tables (`\|---\|---\|`) that rendered as literal pipe text. | **QUALIFIED / REFORMATTED.** Clearly separate historical Maitree Express USD-pegged cross-border benchmarks from domestic Dhaka–Benapole intercity rail benchmarks, qualify all figures as historical planning references (not live quotes), and replace raw pipe syntax with clean bullet lists `[1–3]`. |
| IN-04 | Section 3: Benapole–Petrapole land border crossing sequence, operating hours, and visa checkpost rule. | Bangladesh Land Port Authority: <https://blpa.gov.bd/>; Land Ports Authority of India (ICP Petrapole): <https://lpai.gov.in/>; IVAC Bangladesh: <https://www.ivacbd.com/kind-of-visas-documents> | PR #37's Step 2 listed Indian entry at Petrapole before Bangladesh exit at Benapole for a Dhaka departure, contained a stray German token (`weitersetzen`) in the Bengali twin, and over-generalized that "all other Bangladesh–India land borders are closed to foreign nationals." | **CORRECTED / QUALIFIED.** Order outbound Dhaka→Kolkata border steps physically (1. Bangladesh exit & travel tax at Benapole; 2. 200–500 m no-man's land walk; 3. Indian BSF, immigration & customs at ICP Petrapole), remove `weitersetzen` in Bengali, and state that land entry/exit must match the checkpost endorsed on the traveler's Indian visa (e.g., `Haridaspur / Benapole`) `[4–6, 8–10]`. |
| IN-05 | Section 3 & 5: Mandatory Bangladesh land-border travel/departure tax at Benapole. | National Board of Revenue (NBR) Bangladesh: <https://nbr.gov.bd/>; Bangladesh Land Port Authority: <https://blpa.gov.bd/> | Outbound land travelers from Bangladesh must pay government land-border travel tax at the designated bank/port counter (or through a bus operator's handling desk for a small service fee). Exact statutory rates follow the current NBR Finance Act schedule. | **QUALIFIED.** State that mandatory Bangladesh land-border travel/departure tax is payable at Benapole before exit immigration (with official receipt), and note that the exact BDT rate is governed by the current NBR Finance Act schedule `[8–9]`. |
| IN-06 | Section 3: Dhaka–Benapole and Petrapole–Kolkata bus operators and indicative fares. | Operator counter schedules (Green Line, Shyamoli, Desh Travels, Souhardo); Eastern Railway suburban network: <https://indianrailways.gov.in/> | No live dated operator checkout was captured in this session. Bus fares in BDT and INR vary by operator, coach class (non-AC, standard AC, business/sleeper), and whether booked as a coordinated through-ticket or split at the border. | **QUALIFIED.** Present BDT and INR bus figures as indicative planning ranges, not live operator quotes, and note the budget suburban rail option from Bongaon Junction to Kolkata Sealdah `[3]`. |
| IN-07 | Section 4: India visa eligibility for Bangladeshi passport holders, IVAC appointment availability, and IVAC processing fee. | IVAC Bangladesh: <https://www.ivacbd.com/> and <https://www.ivacbd.com/kind-of-visas-documents>; Online Visa Portal: <https://indianvisa-bangladesh.nic.in/>; High Commission of India Dhaka: <https://www.hcidhaka.gov.in/> | Ordinary Bangladeshi passport holders are not eligible for the Indian e-Visa and must apply for a sticker visa via `indianvisa-bangladesh.nic.in` and IVAC (`ivacbd.com`). Under bilateral arrangements there is no Indian government visa fee, while IVAC collects a mandatory processing fee (historically published around BDT 800–1,500 plus payment charges). Live IVAC slot availability was not measured in this session. | **QUALIFIED.** Retain the prominent caveat that live IVAC slot availability was not measured on 15 October 2026; instruct readers to verify current appointment capacity and the exact IVAC processing fee directly on `ivacbd.com` and `hcidhaka.gov.in` before making travel plans `[4–7]`. |
| IN-08 | Section 5: Indicative 3-day, 2-night Kolkata overland budget of BDT 8,000–18,000 per person. | Inherited article planning estimate (PR #37); no matched live operator/hotel checkout basket in this session. | The headline and summary state BDT 8,000–18,000 (`BDT 8,000–12,000` budget tier; `BDT 15,000–18,000` comfortable tier) for a 3-day, 2-night overland trip via Benapole–Petrapole. PR #37 had three separate raw markdown pipe tables that broke URAL's renderer. | **PRESERVE & QUALIFY.** Consolidate into one coherent 3-day overland budget breakdown in Section 5 (`BDT 8,000–12,000` budget; `BDT 15,000–18,000` comfortable), state inclusions/exclusions and that it was not re-priced on 15 October 2026, and format cleanly for URAL's renderer without raw pipes. |
| IN-09 | Section 6: Dhaka (DAC) to Kolkata (CCU) flight duration and indicative one-way fare band. | URAL flight search hub (`/flights`); no dated live airline checkout captured. | Direct DAC–CCU flights take about 1 hour 10 minutes on Biman Bangladesh Airlines, US-Bangla Airlines, or IndiGo. Airfares and baggage allowances vary by date and fare family. | **QUALIFIED.** Label the one-way BDT 6,500–12,000 range as an indicative historical benchmark before peak-season surcharges and baggage add-ons, route readers to `/flights`, and remind them to verify `By Air` visa endorsement `[5–6]`. |
| IN-10 | Article metadata, internal links, references, cover image dimensions, AEO snippet, and FAQ schema contract. | `src/constants.ts`, `src/data/blogContent.ts`, `src/data/bengaliContent.ts`, `src/App.tsx`, `src/utils/imageAssets.ts`, `src/utils/blogStructuredData.ts`, `src/routes/BlogPostRouteView.tsx`, `scripts/prerender.ts`, `scripts/verify-build.ts` | PR #37 had two phantom `/blog` links, no `references`, raw markdown (`##`, `---`, `\|---\|`, `[text](url)`), missing `RESPONSIVE_IMAGE_HEIGHTS` entry (`670`), missing `getBlogCoverImage` / `getBlogAeoSnippet50Words` entries in `src/App.tsx`, and an un-allowlisted FAQ section. | **IMPLEMENTED / VERIFIED.** Replaced the two phantom links with live routes (`/blog/dual-currency-card-endorsement-bangladesh` and `/flights`); aligned 5 EN/BN `internalLinks`; added 10 bilingual `references`; registered image height `670` and SPA cover/AEO snippet in `src/App.tsx`; allowlisted `7. Frequently Asked Questions` / `৭. সচরাচর জিজ্ঞাসা` for `FAQPage` JSON-LD parity. |

### Stage 3–8 execution record — Dhaka–Kolkata review (15 October 2026)

- **Stage 3 — Brief: complete.** The page job is to help a Bangladeshi passport holder evaluate overland travel between Dhaka and Kolkata while cross-border trains are suspended, follow the physical Benapole–Petrapole border sequence, check IVAC sticker-visa requirements and live slot caveats, and plan around one qualified 3-day BDT budget.
- **Stage 4 — English: complete.** Formatted in URAL's clean numbered-section structure (`1.`–`7. Frequently Asked Questions`), with numbered citations `[1–10]`, corrected Benapole→Petrapole outbound crossing sequence, official railway domains (`railway.gov.bd`, `eticket.railway.gov.bd`, `indianrailways.gov.in`), and one consolidated 3-day planning budget (`BDT 8,000–12,000` budget; `BDT 15,000–18,000` comfortable).
- **Stage 5 — Bengali: complete.** Full decision-level parity across all seven sections (`১.`–`৭. সচরাচর জিজ্ঞাসা`), 10 localized references `[১–১০]`, 5 localized internal links, 6 FAQ pairs, and removal of the stray German word `weitersetzen` and raw markdown pipes.
- **Stage 6 — package: complete.** `updatedAt: "2026-10-15"`, 10 bilingual `references`, 5 verified `internalLinks`, `aviasales` `affiliateCTA`, `RESPONSIVE_IMAGE_HEIGHTS` (`670`), `getBlogCoverImage`, `getBlogAeoSnippet50Words` (EN & BN), and `BLOG_FAQ_CONFIGS` (`FAQPage` JSON-LD) are all wired.
- **Stage 7 — preflight: passed.** Checked EN/BN citation numbering `[1–10]` / `[১–১০]`, border sequence parity, BDT 8,000–18,000 budget parity, internal-link targets, and `date`/`updatedAt`/`CONTENT_UPDATED` separation (`CONTENT_UPDATED` kept at `2026-10-14` so non-blog hub `<lastmod>` values do not churn).
- **Stage 8 — red team:**

  | Dimension | Score / 4 | Reason |
  |---|---:|---|
  | Intent and format | 3 | Clear answer-first overland guide and step-by-step border sequence; live Bangladesh SERP remains unmeasured. |
  | Factual evidence and safety | 4 | Every rail, IVAC, tax, and fare claim is qualified against 10 official portals; fake `railwayticket.bd` domain replaced with `railway.gov.bd` / `eticket.railway.gov.bd`. |
  | Usability and actionability | 4 | Correct physical Dhaka→Benapole→Petrapole→Kolkata order, IVAC checklist, one coherent 3-day BDT budget, and 5 real internal links. |
  | Locale, trust, and release | 4 | Full EN/BN parity, 10 numbered bilingual references, visible FAQ + `FAQPage` JSON-LD in both locales, and SPA/prerender image parity. |
  | **Total** | **15 / 16** | **Pass (≥13); no zero scores and no hard fail.** |

---

## Stage 9 — Dhaka–Kolkata repository verification (15 October 2026)

- Updated files: `src/constants.ts`, `src/data/blogContent.ts`, `src/data/bengaliContent.ts`, `src/App.tsx`, `src/utils/imageAssets.ts`, `src/utils/blogStructuredData.ts`, `src/routes/BlogPostRouteView.tsx`, `scripts/verify-build.ts`, `public/rss.xml`, and `docs/growth/CONTENT-QUEUE.md`.
- `npm run lint`, `npm run build`, and `npm run verify:build` (all 145 checks) verified clean on 15 October 2026.

---

## Worked queue row — Wave 1: Umrah hub hardening (`/umrah` + `/bn/umrah`)

| Added / checked | Verdict | English URL | Bengali twin | Primary query | Intent / format hypothesis | Stage result / next gate |
|---|---|---|---|---|---|---|
| 2026-10-15 | **UPDATE IN PLACE — one bilingual page asset; no new hub URL.** Accuracy gate #1 of `UMRAH-CLUSTER-PLAN.md`: correct or qualify the static calculator and savings comparison. | `/umrah` | `/bn/umrah` | **Umrah cost from Bangladesh / DIY Umrah budget** (hub planning-and-cost job) | Informational planning hub: broad cost framework + routes into the detailed guide and live specialist guides. | Stages 1–8 complete (ledger below). Stage 9 lint/build/verify recorded below. Deployment gate: owner approval + live-route review. |

### Must-preserve and scope notes (owner + plan)

- Keep the broad planning/cost job on the hub; the detailed execution article keeps `blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost`.
- Preserve the existing 10-day, family-of-four-sharing DIY total of **BDT 1,16,000–1,32,000 per person**. Any retained figure must show its checked basis/exclusions and date; it is not a live quote.
- Any illustrative scenario must be unmistakably labeled; no agency-savings figure without a same-basis, dated source basket.
- Expose clear links to the detailed guide and the relevant live specialist guides (plan §5 link map), with localized EN/BN anchor text.
- Scope Saudi Visa Bio to the Ministry FAQ's Bangladesh electronic-Umrah-visa biometric listing; no fixed weekly/Friday Rawdah slot-release claim; keep full EN/BN decision parity.

### Stage 2 — Hub claims ledger (checked 15 October 2026)

| ID | Claim / surface | Primary source checked | Finding | Status / action taken |
|---|---|---|---|---|
| H-01 | Calculator "Estimated Savings vs. Agency" tile + `agencyMultiplier` (1.28/1.32) + DIY-vs-agency cards "Save ৳35,000 / 44,500 / 72,000" with line-through agency quotes. | None — figures had no dated source basket. | Fabricated comparison totals. | **REMOVED.** Savings tile replaced with a "not included" exclusions tile; §3 rebuilt as a qualitative like-for-like comparison table + note that no agency-savings figure can be published without a matched, itemized quote (same dates, duration, occupancy, flight, inclusions). |
| H-02 | Hero headline "How DIY Umrah Saves Bangladeshi Families 25%–32%". | None. | Unsupported savings range. | **REMOVED** → "The Advantage of Planning Your Own Umrah" (BN already neutral). |
| H-03 | Calculator "All-inclusive estimate" + "Package Cost Calculator (2026)". | Scope unclear; totals omitted common trip costs. | Misleading scope. | **QUALIFIED.** Relabeled illustrative planning framework (Oct 2026 assumed rates): economy return airfare + Umrah e-Visa with insurance + one double room per two pilgrims + basic intercity transport; excludes meals, shopping, ziyarah tours, extra baggage, peak surcharges; not a live quote. |
| H-04 | BDT 1,16,000–1,32,000 (10-day, family-of-4 sharing). | Owner-fixed; ledger U-12 (checked 14 Oct 2026; not re-priced). | Retained by owner decision. | **RETAINED + DATED** on every display surface (hero chip, keyFacts, quickAnswer, FAQ answer, prerender intro): "checked 14 October 2026, not a live quote." |
| H-05 | Shared FAQ second range "BDT 1,65,000–2,15,000" + "saving BDT 25,000–45,000 per pilgrim vs fixed group packages" (`HAJJ_UMRAH_FAQS` EN+BN, shown on hub, blog index, blog posts). | U-12 ("do not add the previous comfort range"); no savings source. | Contradicts owner decision; fabricated savings. | **REMOVED** from both locale FAQ sets; replaced by the retained estimate with basis/exclusions and the itemized-quote caveat. |
| H-06 | Stopover "~SAR 39.50 + mandatory insurance ≈ BDT 4,500 total" (FAQ) + "free 96-hour Stopover Umrah Visa" (hero bullet). | U-04. | Conditional product; fees/eligibility set at checkout and change. | **QUALIFIED** EN+BN: eligible Saudia/Flynas itineraries can add the 96-hour stopover at ticket checkout; eligibility, insurance and fees shown at checkout — verify on the airline's booking page; no universal fixed price. |
| H-07 | "Mandatory Saudi Visa Bio App Registration" + FAQ "pilgrims must complete fingerprint and facial biometrics on Saudi Visa Bio". | U-08 (Ministry FAQ lists Bangladesh for e-Umrah-visa biometrics). | Universal-requirement claim unsupported for all travelers. | **SCOPED** EN+BN: for electronically issued Umrah visas the Ministry FAQ lists Bangladesh for biometric enrollment via Saudi Visa Bio; follow the instruction attached to your visa application; not universal for every tourist/stopover traveler. |
| H-08 | Rawdah permit card ("mandatory QR entry permit") + slot availability. | U-09. | Permit real; no fixed weekly release day published. | **QUALIFIED** EN+BN: book the Umrah slot and Rawdah (Riyazul Jannah) permit in Nusuk; select an available date/time slot and check live availability; no fixed weekly release day is published. |
| H-09 | quickAnswer "year-round Umrah". | U-02 (1448H calendar: entry through 23 Mar 2027). | Season-bound. | **SCOPED** EN+BN: current season's visa window (1448H — entry through 23 March 2027; check the current calendar). |
| H-10 | Hotel zone distances ("0–150m", "400m–700m", "100m–300m"), "Zero uphill walking", "Direct elevator to Haram courtyard", "Free 24/7 shuttle", nightly rate bands. | U-11 (no property-level verification exists). | False precision + absolute guarantees. | **REMOVED** precision/absolutes EN+BN; zones kept as search starting points + verify address, walking route, slope and shuttle with the hotel; calculator nightly rates labeled planning defaults. |
| H-11 | Rail "2h 20m", "~SAR 172.50 / BDT 5,600", "54 minutes" (FAQ + chips). | U-10 (operator tariff 14 Oct 2026: SAR 162 base Makkah–Madinah Economy, before VAT/fees; live checkout varies). | Unverified fare/time figures. | **REPLACED** EN+BN: SAR 162 dated base fare (before VAT/fees; checkout varies); check current timetable and checkout price; duration hedged (≈2¼ h / "approx.") or omitted. |
| H-12 | Flight bands "BDT 72,000–86,000 / 56,000–66,000", "Save BDT 12,000–18,000 per ticket", "complimentary 5-liter Zamzam", "2×23kg + 5L Zamzam". | None dated; carrier policies vary. | Presented as current prices/allowances. | **QUALIFIED** EN+BN: fare bands labeled illustrative (check live prices); per-ticket save claim removed; Zamzam/baggage allowances carrier- and fare-specific — verify with the airline. |
| H-13 | Visa card "Holders of valid US, UK, or Schengen visas qualify for instant online e-Visa / VOA". | U-04 (tourist e-Visa nationality list; VOA conditions). | Not automatic for BD passport holders. | **QUALIFIED** EN+BN: may qualify for visa-on-arrival where current conditions are met; do not assume automatic e-Visa eligibility; check the official portal first. |
| H-14 | Hero telemetry chips ("300–500m Verified Haram Walkable", "2–5 Days", "2h 20m", "৳1,16,000 10-Day DIY Umrah Starting"). | H-04/U-10/U-11 resolutions. | Mix of stale precision and unqualified estimates. | **RELABELED** EN+BN: "3 Zones / Walkable Haram Areas"; "Umrah e-Visa Processing (Typical)"; "≈2¼ h / Makkah–Madinah Rail (Approx.)"; "৳ 1,16,000 / 10-Day DIY Estimate (Oct 2026)". Hero chip "✓ Nusuk & e-Visa Verified" → "✓ Official Nusuk & visa sources checked (Oct 2026)". |
| H-15 | Link map (plan §5) on the hub + `/bn/umrah` static body. | Plan §5; route inventory (all 11 slugs exist in `BLOG_DATA`). | Hub showed only 2 cards; BN static body linked a mislabeled "Dhaka→Jeddah/Madinah flights" label to the main guide and an irrelevant Nepal visa link. | **ADDED/FIXED.** §8 keeps the 2 featured playbook cards (now locale-aware `/blog/` ↔ `/bn/blog/` links) + a grouped neutral directory: visa/permit (blog-16, stopover), flights/hotels/rail (open-jaw, hotel zones), family/accessibility (elderly, women), preparation/seasonal (Ihram/Miqat, Ramadan/Itikaf, Zamzam/customs), food/Ziyarah (food, ziyarah taxi), Hajj (registration/packages). `/bn/umrah` static related-links corrected to the main guide, blog-16, hotel zones, Hajj registration with descriptive BN anchors. |

**Cross-surface note:** `HAJJ_UMRAH_FAQS` (EN `src/hooks/useSeoMeta.ts`, BN `src/data/bengaliContent.ts`) is shared by `/umrah`, `/blog` index and Hajj/Umrah blog posts. The H-05/H-06/H-07/H-11 fixes therefore also land on those surfaces — intended, since they carry the same flagged claim classes. Shared FAQ questions themselves were not restructured.

### Stage 3–8 execution record (15 October 2026)

- **Stage 3 — Brief: complete.** Hub keeps the broad planning/cost job; every retained number shows basis + exclusions + checked date; illustrative scenarios unmistakably labeled; links to the detailed guide and specialist guides exposed in both locales.
- **Stage 4 — English: complete.** Calculator relabeled + assumptions note; savings surfaces removed; hero/telemetry/visa/hotel/flight claims aligned to H-01..H-14; directory added.
- **Stage 5 — Bengali: complete.** Every EN change mirrored in Bengali at decision level, including the shared BN FAQ answers and the `/bn/umrah` static link list.
- **Stage 6 — package: complete.** Hub FAQ quickAnswer/keyFacts, visible FAQ data, prerendered `/umrah` + `/bn/umrah` copy and meta description reviewed for parity.
- **Stage 7 — preflight: passed.** No remaining agency-savings figures, comfort-range totals, fixed stopover fee, universal Visa Bio claim, fixed Rawdah release day, unqualified distance/rate precision or per-ticket savings claim on either locale surface.
- **Stage 8 — red team:** intent 3/4 (hub job clear; live SERP unmeasured), evidence & safety 4/4 (every retained figure dated and scoped; fabricated comparisons removed), usability 4/4 (planning framework + honest comparison matrix + directory), locale/trust 4/4 (EN/BN parity; caveats visible) = **15/16, pass**.

### Stage 9 — repository handoff and verification (15 October 2026)

**Repository implementation verified; not externally deployed.** Edits in `src/components/UmrahLandingPage.tsx`, `src/hooks/useSeoMeta.ts`, `src/data/bengaliContent.ts`, `scripts/prerender.ts`. `src/data/contentMeta.ts` untouched.

- `npm run lint` — **PASS** (`tsc --noEmit`).
- `npm run build` — **PASS**; 94 English + 94 Bengali canonical routes prerendered.
- `npm run verify:build` — **PASS, all 149 checks** (hub savings copy is unpinned in `verify-build.ts`, so the Wave 1 rewrites are assertion-free by design; existing pins unaffected).
- Inspected `dist/umrah.html` and `dist/bn/umrah.html`: zero occurrences of the removed claims ("25%–32%", the 1,65,000–2,15,000 comfort range, ~SAR 39.50 fixed fee, 300–500m / "Zero uphill" precision, "All-inclusive estimate", "year-round Umrah", SAR 172.50 / "2 hours 20", agency line-through prices, "Estimated Savings"); retained copy carries "not a live quote" / "লাইভ কোটেশন নয়" qualifiers and the dated SAR 162 base fare; the specialist-guide directory links (incl. blog-16 and the Hajj registration guide) are present on both locales.

Deployment gate: **owner approval + live-route review** of `/umrah` and `/bn/umrah` before publish.
## 2026-10-15 — POST-MERGE NOTE (main `aa0156b` merged into PR #40 branch)

PR #39 (session `arena/0eb5e492`) landed a parallel Wave 1 with complementary
work. This branch merged `origin/main` (6 conflicted files resolved as a
**superset**, never a regression):

- `src/components/UmrahLandingPage.tsx` — main's verified Wave 1 kept
  (SAR 65 JED–Makkah / SAR 162 Makkah–Madinah excl-VAT fare citations,
  "Verified Official Sources & Portals (Checked 14 October 2026)" section,
  U-13 like-for-like quote checklist, three visa categories, dated model
  inputs) and this branch's additions retained (locale-aware `blogHref`,
  "Specialist Guides by Topic" cluster directory with 11 specialist slugs,
  H-10 zone grid as the sole distance grid).
- `src/utils/blogStructuredData.ts` — FAQ schema allowlist now covers BOTH
  `umrah-hajj-guide-bangladesh-nusuk-bdt-cost` (5./৫.) and
  `dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide` (7./৭.).
- `docs/growth/CONTENT-QUEUE.md` — complete records for both sessions kept
  (Wave 3A U-ledger → blog-48 IN-ledger → Wave 1 H-01…H-15).
- `scripts/prerender.ts` — main's /umrah intro phrasing + this branch's
  `/bn/umrah` related-link labels/slugs fix (labels matched EN-only slugs).
- `scripts/verify-build.ts` — union of both check sets.
- `src/data/bengaliContent.ts` — both blog-48 and blog-16 BN work kept.

**Post-merge verification (2026-10-15):** `npm run lint` ✅ →
`npm run build` ✅ (94 EN + 94 BN routes) → `npm run verify:build` ✅
**149/149 checks**. Built bundles contain both the Verified Sources section
and the Specialist Guides directory; zero banned strings in HTML or bundles.
