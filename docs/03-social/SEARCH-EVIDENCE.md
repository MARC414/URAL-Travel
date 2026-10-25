# Search evidence — corrected historical and early new-domain signals

**Owner-supplied 26 October 2026.** The corrected historical query table in the current owner request is authoritative for this programme. Older conflicting query lists must not be used to select topics. Original research remains preserved as history.

## 1. Dataset boundaries

| Dataset | File | What is available | What is missing |
|---|---|---|---|
| Historical pages.dev queries | [GSC-HISTORICAL-QUERIES.csv](GSC-HISTORICAL-QUERIES.csv) | 60 corrected rows; each has zero clicks; 118 impressions summed across the supplied rows | Date range, country/device/search-type filters, complete export and query-page join |
| Historical pages.dev pages | [GSC-HISTORICAL-PAGES.csv](GSC-HISTORICAL-PAGES.csv) | 23 rows with metrics; one `/tools` row without values from the additional raw paste | Same missing scope fields; incomplete `/tools` values |
| Current .co.uk queries | [GSC-CURRENT-QUERIES.csv](GSC-CURRENT-QUERIES.csv) | 15 named early query signals | Per-query clicks/impressions and scope fields; blanks are not zero |
| Current .co.uk pages | [GSC-CURRENT-PAGES.csv](GSC-CURRENT-PAGES.csv) | 28 rows, each zero clicks and 1–6 impressions; 50 impressions across the supplied rows | Date range/filters and complete export |

Row sums are transcription checks, not full-property totals. The two domains are separate datasets. Do not calculate growth, migration loss or a combined CTR from them. Do not infer query-level clicks from page clicks. Query anonymization, reporting scope or omitted rows could affect the difference; this packet does not establish the explanation.

The long irrelevant MTB query is retained under the owner's corrected label `[irrelevant MTB query]`, rather than using its text as a content idea. Historical `/bn` remains as supplied; routing normalization for asset selection does not rewrite the evidence.

## 2. Classification rules

| Label | Meaning in this strategy |
|---|---|
| STRONG | Relatively strongest observed page evidence and/or repeated family evidence across the supplied data and established content; still small, dated and not market validation |
| USEFUL SECONDARY | Helpful query language, modest historical visibility, existing keyword support or early .co.uk direction |
| EXPERIMENTAL | A potentially useful idea with too little, ambiguous or poorly matched evidence for a main campaign decision |
| NOISE | Irrelevant, wrong-intent, utility, site-search or unrelated observations excluded from selection |

Priority is separate: **HIGH** for an important immediate decision/update, **MEDIUM** for supporting/optional use, **LOW** for a later test, **HOLD** for no current promotion. A strong topic with unsafe copy is HIGH priority and NEEDS-UPDATE at the same time.

Individual one-impression rows are never STRONG merely because the family is important. No existing page is deleted because it has no supplied performance row.

## 3. Family decisions and asset links

| ID | Family / actual evidence | Class | Priority | Decision |
|---|---|---|---|---|
| SF-01 | Payments: GPH-01 endorsement **5 / 270**; historical `ডুয়েল কারেন্সি কার্ড`, `dual currency card bangladesh`, `dollar endorsement limit in passport bangladesh` each **0 / 1**; current RFCD and `/banking` each **0 / 1** | STRONG for family priority; RFCD/eSIM/product angles are supporting inference | HIGH | Start SOC-001; distinct payment angles SOC-009/013/017. Cash/DCC stays SOC-060 NEEDS-UPDATE |
| SF-02 | Departure: GPH-02 immigration **2 / 137**; `dhaka airport immigration` **0 / 3**, reverse wording **0 / 1**; current e-Passport **0 / 2** | STRONG for immigration; passport secondary | HIGH | Correct existing immigration source before SOC-057; passport SOC-063 has its own gate |
| SF-03 | Flights: `direct flights from dhaka` **0 / 25**, `flights from dhaka` **0 / 4**; hub **0 / 70**; Saudi-flight article **0 / 10**; repeated small Jeddah/Madinah queries; new KTM/Dubai pages **0 / 2** each | STRONG family direction; no demonstrated booking/traffic success | HIGH | Use SOC-003/016's complete-trip comparisons. No current nonstop list, fare or weekday-price promise |
| SF-04 | Umrah: hub **0 / 60**, DIY article **0 / 8**; visa query **0 / 4**, `travel for umrah` **0 / 3**, several one-impression visa/cost/DIY queries; elderly BN page **0 / 1** on each supplied property | STRONG overall family direction; individual family/app angles secondary | HIGH | Existing eligibility, family, app and budget-method assets. No new broad Umrah article |
| SF-05 | Airport information: airport-code tool **0 / 17** historical, **0 / 3** current; several code queries at **0 / 1**; `sharjah international airport` current with no count | USEFUL SECONDARY | MEDIUM | SOC-007 explains codes. Directory's service promise and article's gateway claim require U-09 before tool-led promotion |
| SF-06 | Entry questions: VOA wording **0 / 2** and **0 / 1** historical; visa hub **0 / 12**; UAE page **0 / 5** current and several current UAE query variants without counts | USEFUL SECONDARY | MEDIUM | Existing UAE/visa owners; no automatic “visa open” verdict. SOC-061 held for applicable official evidence |
| SF-07 | Nepal/Kathmandu: current BN Nepal costs **0 / 6**; current KTM flight page **0 / 2**; Nepal-budget and two KTM-flight query variants without counts | USEFUL SECONDARY | MEDIUM | Keep cost and route pages as separate owners. SOC-062 after cost/itinerary reconciliation |
| SF-08 | Thailand/Malaysia support: historical Thailand destination **0 / 11**; current BN Thailand guide **0 / 2**, Thailand costs **0 / 1**, Malaysia costs **0 / 1**; Thailand budget-calculator query has no count | USEFUL SECONDARY | LOW | Existing articles/pages are a later regional sequence, after current-rule and cost-basis review |
| SF-09 | Hajj: current EN and BN registration pages **0 / 1** each; `www হজ গভ বিডি ২০২৭` listed without metrics. Ramadan relevance comes from existing content/seasonal inference, not measured query demand here | USEFUL SECONDARY for Hajj; EXPERIMENTAL for unsupplied Ramadan demand | MEDIUM, seasonal HOLD | Review applicable official notices; separate Hajj from Umrah; reuse current article rather than create a new season URL |
| SF-10 | Other regional/budget assets: current family comparison, Sri Lanka–Maldives and Maldives route **0 / 1** each; Singapore hotel **0 / 2**; no strong matched-budget evidence | EXPERIMENTAL campaign fit | LOW | Preserve existing roles; no itinerary/price ranking from one impression |
| SF-11 | Ziyarah: historical EN **0 / 2**, current BN **0 / 5**. Zamzam: current EN **0 / 2** | USEFUL SECONDARY | MEDIUM | Repair bounded claims, relevant links and misleading baggage/CTA summaries before promotion |
| SF-12 | Manali **0 / 9** historical plus current name; LA **0 / 6**; Paro **0 / 1**; other long-haul/medical/combination content lacks meaningful supplied fit evidence | EXPERIMENTAL | LOW; unsafe sources HOLD | Investigate the exact question only after Phase A. No invented Manali flight route or international pivot |
| SF-13 | Professional/creator and community formats: source-method value and platform fit; no supplied creator-search performance or real Reddit threads | EXPERIMENTAL | MEDIUM LinkedIn; LOW/HOLD extra channels | Four English professional texts; creator interest kept separate; optional adaptations and replies held |

**Notation:** clicks / impressions. A source family's class is not a source-quality certificate. Asset-level `search_signal` can be weaker than its family when the particular angle is an editorial inference.

## 4. Important small and ambiguous signals

- `ktm to dac` is a reverse/inbound query, not evidence of demand for DAC → KTM. The existing inbound route retains its separate audience.
- `noc`, `for endorsement`, `fare cost`, `airticket`, `খরচ কেমন হতে পারে`, `travel price near`, `from bangladesh`, `in bd` and `guide car hotel` are too ambiguous individually to justify a new asset or a query-page assignment. Broader families may have better independent evidence.
- `the platinum fashion mall` and `bangkok 45` each have one historical impression; at most they are later destination leads.
- `fsg airport code` does not establish a relevant Bangladesh departure. Do not let a lookup fragment select a route campaign.
- `bangladesh visa check online by passport number` appears to serve a different/inbound or administrative intent; exclude it from the current outbound programme rather than invent a match.
- Historical home **1 / 56** and hotels **1 / 13** show some entry activity, not proof that the homepage or generic hotel handoff converts best.
- A London destination page's single current impression is not evidence for a UK pivot.

## 5. Noise excluded

`oddschecker`, all supplied `site:pages.dev` variants, `yes`, `isd`, `original?`, `erpor?`, `such as?`, the irrelevant MTB query, `masranga instagram id` and the current `/privacy` impression do not select the campaign. No gambling, social-account or generic pages.dev content is proposed.

## 6. Existing research used below GSC

1. [SEO-KEYWORD-MAP.md](../../SEO-KEYWORD-MAP.md): exact page ownership, primary query hypotheses and supporting language.
2. [04-keywords.md](../02-content/04-keywords.md): English/Bengali/Banglish phrasing; unsupported competition/volume assertions are not inherited.
3. Owner project `blog_topic_list.xlsx`: historical topic/intent columns, not a new 50-article commission.
4. [Current audit](../../00-URAL-CURRENT-AUDIT.md) and the 25 October 51-article inventory: source usefulness, contradictions and next-action limitations.
5. [Method notes](../02-content/METHOD-NOTES.md), [content system](../02-content/CONTENT-SYSTEM-V2.md), existing source reviews and historical social references: decision-led formats and evidence boundaries.
6. External social/platform research: presentation and workflow, not invented search demand or URAL conversion benchmarks.

## 7. Missing fields to add when available

Add each property's actual date range, search type, country/device filters, export date and complete page/query exports. For attribution, obtain the specific query-by-page view rather than reconstructing it. Add current GA4 and partner results only when actually inspected. This improves the numerical baseline without restarting broad keyword research.

The new evidence changes the earlier “GSC unavailable” assumption. It does not resolve the current audit's measurement, delivery, affiliate or desk-fulfillment findings.
