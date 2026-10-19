# DIY process guide — 19 October 2026 source and implementation record

Scope: existing main DIY article and BN twin. Owner now authorizes source-led execution of the previous plan,
sequentially, without waiting for personal app tests. No production publication or wider-cluster certification is implied.

## Phase 1 — source verification before editing

The supplied sources and U-01–U-15 in `CONTENT-QUEUE.md` were the starting packet, not a substitute for checking
current applicability. All sources below were opened in this task on 2026-10-19 (Dhaka). Ministry/SPA mastheads show
a dynamic date; use the actual article body/publication date, not that masthead as the publication date.

| ID | Claim / affected locales | Exact primary sources and result | Decision before implementation |
|---|---|---|---|
| D-01 | Standard Umrah direct/provider channels, EN/BN | [Ministry launch](https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-launches-Nusuk-Umrah-service-to-enable-pilgrims-from-outside-the-Kingdom), publication 20 August 2025; [signup](https://umrah.nusuk.sa/registration/signup) lists Bangladesh in residence/nationality; [terms](https://umrah.nusuk.sa/TermsOfUse), chunks 0–1, define multi-service packages, variable availability, package-specific cancellation; [Ministry FAQ](https://haj.gov.sa/en/FAQ), chunk 4, external-agent accommodation/transport condition | VERIFIED/QUALIFIED: two channels in one Standard category, not visa-only or approval guarantee; record services and terms before payment. |
| D-02 | 1448H Umrah dates, EN/BN | [Ministry 1448 calendar](https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH), publication 17 May 2026, explicitly gives 9 March 2027 final issuance, 23 March final entry and 7 April final departure | VERIFIED AS PUBLISHED: retain exactly, checked 19 October; scope to Umrah pilgrims/1448, not every tourist visa or Hajj 2027 registration. Individual visa terms and later notices still apply. |
| D-03 | Stopover eligibility and price, EN/BN | [Visit Saudi stopover](https://www.visitsaudi.com/en/campaigns/saudi-stopover), chunk 0, describes up to 96h and advertises fee examples; [Saudia transit](https://www.saudia.com/transit-visa), chunk 0, requires onward ticket/destination documents/passport validity, application during booking, final costs calculated under MOFA rules and no guaranteed admission | QUALIFIED: use carrier checkout for the actual total; remove duplicated SAR 39.50/13 examples so they cannot be mistaken for the payable trip cost. No hotel promise or universal processing SLA. Flynas requires its own current carrier check. |
| D-04 | Nationality eVisa vs Package Visa, EN/BN | [Official eVisa](https://visa.visitsaudi.com/), chunk 0, lists nationality countries without Bangladesh; [Visit Saudi Package Visa](https://www.visitsaudi.com/en/campaigns/package-visa), BOTH chunks, explicitly includes Bangladesh, confirmed flights/accommodation through approved provider; FAQ specifies >=4-star licensed hotel, confirmed round-trip flight, minimum SAR 4,000/adult first two days combined + SAR 1,000 each consecutive day | VERIFIED/QUALIFIED: keep as tourist sub-route, state package prerequisites rather than implying unrestricted eVisa or cheap visa-only route. These published minimums are not a personal quote and are not converted to BDT or fed into the worksheet. Recheck live package terms. |
| D-05 | Used US/UK/Schengen visa / foreign residence fine print, EN/BN | [Tourist Visa Regulations](https://cdn.mt.gov.sa/mtportal/mt-fe-production/content/policies-regulations/documents/tourism-regulations/Tourist-Visa-Regulations-En-V012.pdf), entire fetched document, Articles 5–6; [SPA Ministry announcement](https://www.spa.gov.sa/w1919582), body dated 12 June 2023; [SPA GCC report](https://www.spa.gov.sa/w1895923), body dated 2 May 2023. Follow-up opened 19 October; full retrieval/redirect limits below | QUALIFIED published criteria: valid tourist/business visa used once, US/UK/EU permanent residence, accompanying first-degree relatives; distinguish advance eVisa/VOA. PDF revision date unconfirmed; GCC profession wording differs across official sources. Current carrier/port and digital-entry-evidence rules UNVERIFIED. EN/BN point-of-payment caution, no individual entitlement or tested flow. |
| D-06 | Biometrics in application; visitor registration after valid visa, EN/BN | [Ministry FAQ](https://haj.gov.sa/en/FAQ), chunks 3–4, application-specific Umrah biometrics, Bangladesh, face/all-ten-finger steps; visitors abroad need valid visa; [Umrah service](https://haj.gov.sa/en/E-Services/Umrah-Permit-Application), [Rawdah service](https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women) separately available | VERIFIED/QUALIFIED: correct order, no universal after-visa biometrics or resident-Nafath requirement. Exact authenticated screens remain untested; link to the separately reviewed Nusuk guide with contextual safety notes. |
| D-07 | 1448 health requirements, EN/BN | [MOH index](https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx), chunk 0, links health documents; [Umrah PDF](https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf), chunk 0 including first page, explicitly says 1447H (2026) | UNVERIFIED 1448 rules from this packet: do not copy the historical vaccination/medical conditions forward or imply no requirements. Tell reader to obtain applicable current-season/origin requirements from MOH and official application/provider and discuss personal issues with clinician. |
| D-08 | HHR basic fares/baggage, EN/BN | [Fares](https://sar.hhr.sa/travel/fares) shows SAR 162 Makkah–Madinah Economy / SAR 65 KAIA–Makkah before VAT/fees; dynamic checkout caveat. [Baggage](https://sar.hhr.sa/travel/guidelines/baggage) gives 25kg, 65 x 55 x 35cm, one hand item | VERIFIED/DYNAMIC: dated 19 October tariff snapshot, no BDT conversion or guaranteed ticket price. Exact hotel/access/transfer costs remain unquoted. |
| D-09 | Hajj boundary and deadline conflict, EN/BN | [SPA historical notice](https://www.spa.gov.sa/en/N2559888), reopened body: 14 April 2026 / 1447H; preceding 19 October [Hajj portal](https://hajj.gov.bd/) check and direct September PDFs remain recorded in `HAJJ-SOURCE-REGISTER.md` | QUALIFIED/CONFLICT: keep Umrah-not-Hajj distinction and historical notice scope; remove duplicated main-guide September deadline and long penalty details as adjacent Hajj intent, without declaring those historical facts false. Dedicated Hajj conflict remains unresolved. |
| D-10 | Budget/savings, EN/BN | U-12 is owner-preserved historical 14 October ten-day/four-sharing BDT 1,16,000–1,32,000; no dated matched supplier basket or agency offer | PRESERVE/QUALIFY: retain one semantic historical table, explicitly not repriced on 19 October; current inputs belong to `/umrah`; no invented saving, totals, FX or quote. |
| D-11 | App/network evidence, EN/BN | Published sources support official procedures, not a test on each traveller's phone/account | UNTESTED: five localized point-of-action caution boxes in the Nusuk article; privacy/no-trial-booking guidance. Source validation does not become authenticated/device/field QA. |

## Phase 2 — implementation scope

Revised full main-guide EN/BN bodies, metadata/summary, accurate 19 October update date, task links, honest CTA,
visible FAQ and six-step booking HowTo. Preserved slug, original publication date, author, prior useful links,
original 23-reference history/portal list (expanded to 26 in the visa follow-up below) and historical budget table. Existing references 1–18 remain the numbered list;
reference 10 is updated to the live checker and the historical MOH/SPA labels stay explicit. Extra portal cards are
navigation, not claim verification. No blanket hub date restamp.

## Phase 3 — evidence and remaining gates

The source-safe main-guide revision is implemented in EN/BN with the Cox's Bazar five-beat structure. Original
26 September publication, slug, author and historical budget are preserved; editorial update is 19 October 2026.
The current 26 source/portal cards retain the original 23 and add three fine-print sources (21 numbered entries plus five clearly additional portals). Ten EN and nine BN
curated links include five specialist task links; at least two sibling inbounds in each locale are tested. The
five FAQs and six explicit booking steps match FAQPage/HowTo output; CTA and target sidebar are optional data advice.
App AEO/featured-topic copies, SEO description, feed and article sitemap dates match the revision. Global
`CONTENT_UPDATED` remains 2026-10-18 because no new hub source review was performed here.

Initial implementation validation (later visa-checkpoint counts are recorded below):
- `npm run test:diy-umrah-guide`: **13 tests passed**, including actual React route, six-step order, 23 references,
  original dates, task links, conditional categories, health/fine-print/budget caveats and both App snippets.
- `npm run test:nusuk-guide`: **16 tests passed**, including five warning placements/locale, no caution text absorbed
  into procedural schema, actual React warning markup and escaped text.
- `npm run test:umrah-budget`: **25 passed**; scheduling suite and sitemap suite (**23 negative controls**) passed.
- `npm run lint`, `npm run build`, `npm run verify:build`: passed. **107 EN + 107 BN** canonical routes;
  **221 post-build checks passed**. These include all five full warning bodies/titles on both actual Nusuk static
  pages, negative controls for a removed warning, main six-step HowTo/5 FAQ and all 23 rendered source links.
- The full-body guard was adapted to verify the warning's rendered heading AND complete text, not to ignore the
  warning paragraphs. This fixes a genuine raw-author-syntax vs rendered-text mismatch without lowering coverage.
- Build retains existing non-fatal large-chunk warnings. No dependency added. No browser visual/interaction audit
  or authenticated app test is claimed. `git diff --check` passed.

Owner review, production deployment, live route checks, personal quotes and authenticated/device observations remain
separate gates. The health and fine-print limitations above are omitted/qualified in the published-source wording;
they do not turn into verified facts because tests pass. The rest of the cluster stays sequential and is not certified
by this review. Next independent asset is stopover, then hotel/rail per the closure register.


## Small-step health follow-up — 19 October 2026

Owner requested the smallest sequential action, starting with the health PDF. This step is **source inspection only**;
no article, clinical checklist, metadata, download or deployment was changed.

1. Reopened the [official MOH health index](https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx),
   both chunks. It still links the English and Arabic Umrah PDFs. Its displayed **28 September 2026 09:42 AM** last-update
   is an index-page date, not evidence that either PDF applies to 1448H or was revised on that date.
2. Followed the actual linked [English Umrah PDF](https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf).
   Its extracted opening title and scope explicitly say **Umrah — 1447H (2026)**. No separate document revision date was
   established from the inspected opening text. Its vaccination rules must not be relabelled 1448H/2027.
3. Followed the linked [Arabic Umrah PDF](https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah.pdf).
   Extracted opening text contains **١٤٤٧ / ٢٠٢٦** too, but much of the Arabic extraction is garbled. This corroborates the
   displayed season only; no full Arabic/English clinical-equivalence check or visual PDF inspection is claimed.

**Result:** the existing historical-PDF caution remains justified. These checks do **not** prove that no newer official
health document exists. Keep D-07 unresolved for current 1448 requirements; no health exemption is inferred.

**Subsequent discovery scope (performed in the follow-up below):** targeted English/Arabic discovery for an applicable 1448 Umrah notice/document
on MOH or another responsible Saudi public-health authority. Open any discovered primary document before accepting
its title/snippet. Check pilgrimage type, actual season/effective dates, revision, traveller/origin/age applicability
and supersession. Only then compare the supported requirements and make narrowly scoped EN/BN changes with tests.
Hajj documents stay in their own lane. Visa fine-print research and stopover/hotel edits wait until this health
research checkpoint is recorded as resolved or explicitly unavailable/qualified. No automatic monitoring is claimed.


## Step 1 result — expanded official health-source discovery, 19 October 2026

The owner authorized the health-source step only. Five targeted discovery queries were run:

- `site:moh.gov.sa Umrah health requirements 1448 2027 PDF`
- `site:moh.gov.sa الاشتراطات الصحية العمرة 1448`
- `site:pha.gov.sa العمرة 1448 الاشتراطات الصحية`
- `site:moh.gov.sa "1448" "Umrah" health`
- `site:pha.gov.sa "1448" "العمرة"`

Search results were leads, not proof of current policy or an exhaustive official catalogue search. The following
primary pages/documents were opened to check the relevant leads:

| Source inspected | Actual observation | Applicability decision |
|---|---|---|
| [MOH English index](https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx), opening chunk | Still links the same Umrah English/Arabic files and separate Hajj files | Navigation, not proof of a 1448 document |
| [Linked English Umrah PDF](https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf), opening chunk | Title and scope explicitly say 1447H (2026) | Historical-season evidence only; no separate 1448 revision/effective notice established |
| [Search-discovered Arabic MOH index](https://www.moh.gov.sa/HealthAwareness/Pilgrims_Health/Pages/default.aspx) | Fetch normalized to a lower-case path and returned an MOH Not Found page; indexed snippet is not the opened page | Unusable retrieval for validating a current document; not evidence of policy absence |
| [PHA Hajj health index](https://www.pha.gov.sa/ar-sa/Healthportal/Pages/HealthyofHajaj.aspx), both chunks | Links mixed-age Hajj materials and a Hajj/Umrah border-prevention guide labelled 1447; displayed index modification text is not a 1448 applicability statement | Use the actual linked document, not a page date or search hit containing 1448 elsewhere |
| PHA linked border-prevention PDF, exact URL below, opening chunk | Extracted cover/opening identifies Hajj or Umrah arrivals, year 1447 / 2026; Arabic extraction is partly garbled | Does not resolve current 1448 guidance. No full clinical comparison, inferred traveller/age exemption or policy supersession claimed |
| [PHA evidence/procedures catalogue](https://www.pha.gov.sa/ar-sa/EvidenceAndProcedures/Pages/default.aspx), first returned chunk | First catalogue page is general guidance, with pagination shown | No applicable 1448 Umrah document established in that inspected chunk; later catalogue pages were not exhaustively inspected |

Exact PHA document followed from its index:

`https://www.pha.gov.sa/ar-sa/Healthportal/Documents/%D8%AF%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%A7%D9%95%D8%AC%D8%B1%D8%A7%D8%A1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%88%D9%82%D8%A7%D9%8A%D9%94%D9%8A%D8%A9%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D9%81%D8%B0%20%D9%84%D9%84%D9%82%D8%A7%D8%AF%D9%85%D9%8A%D9%86%20%D8%A7%D9%95%D9%84%D9%89%20%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9%20%D9%84%D9%84%D8%AD%D8%AC%20%D8%A7%D9%94%D9%88%20%D8%A7%D9%84%D8%B9%D9%85%D8%B1%D8%A9%20%D9%84%D8%B9%D8%A7%D9%85%201447%D9%87%D9%80%20(2026%D9%85).pdf`

**Decision:** this bounded source-verification step is recorded; **D-07 remains UNVERIFIED for current 1448 health
requirements**. No applicable replacement or explicit extension of 1447 rules into 1448 was verified in the inspected
sources. This is **not** a claim that no newer document exists. Do not infer no vaccine requirement, an age/origin
exemption, or a current Bangladesh-specific clinical checklist from these findings.

**Repository action:** existing EN/BN historical-PDF caution retained; no article, code, PDF download, metadata,
sitemap or source date changed in this step. Documentation only; `git diff --check` passed. Build/tests were not
rerun because no runtime/content files changed; prior build results are not new evidence for this research step.

**Next serial checkpoint:** foreign-visa eligibility research. Health remains a manual source-refresh gate before
release/travel or when a new official notice appears; any later document must be inspected for Umrah/Hajj scope,
season/effective/revision dates, origin/age applicability and supersession before adding requirements. No monitoring,
official-support contact or further catalogue-page inspection is claimed.


## Foreign-visa checkpoint — 19 October 2026, after health Step 1

**Scope:** main DIY guide and BN twin only. No stopover/sightseeing/other child guide is certified by this check.
The initial redirected-help finding above is now supplemented by actual regulatory and announcement text, not
silently replaced with a search snippet. D-05 is partially resolved as published criteria; it is not personal clearance.

### Opened evidence and limits

- **English Ministry of Tourism Tourist Visa Regulations**, exact URL in D-05 / reference 19: fetched entire text
  (one chunk). Article 6(2)(b) describes valid US/UK/Schengen **tourist or business** visas used at least once to enter
  the country granting the visa; 6(2)(c) specifies **permanent** US/EU/UK residence. Both include accompanying
  first-degree relatives. Article 6(2)(d) mentions GCC residence-visa validity of at least three months and professions
  published on Visit Saudi. Article 5 includes passport/insurance requirements; no new fee or validity promise was
  copied into this narrowly scoped edit. Article 12 gives a general gazette-publication effectiveness rule, but no
  specific publication/revision/effective date was established from the retrieved PDF. The filename `V012` is **not**
  evidence of a latest revision or date. Wording is attributed to this retrieved document, not labelled a new 2026 rule.
- **SPA Ministry announcement**, reference 20: opened https://www.spa.gov.sa/w1919582; body explicitly dated
  **12 June 2023**, not the dynamic 2026 masthead. Corroborates tourist/business, valid/prior-use criteria and PR,
  introduces advance eVisa and describes arrival provisions and accompanying relatives. Historical announcement
  corroborates the categories; it does not verify today's authenticated application or current carrier fine print.
- **SPA GCC report**, reference 21: opened https://www.spa.gov.sa/w1895923, first chunk, article body dated
  **2 May 2023**; explicitly says eVisas for GCC residents **without specific professions**. This differs from the
  English PDF's profession clause. **Do not resolve by imposing an occupation list or by claiming a confirmed current
  unrestricted route.** Article now exposes this limited discrepancy and directs the traveller to current official
  requirements before payment. Three-month wording is attributed to the retrieved PDF, not presented as a newly
  verified universal current rule. GCC residency alone is not represented as automatic visa-on-arrival entitlement.
- **Additional corroborating announcement:** https://www.spa.gov.sa/en/65dafa3c62v, first chunk, body dated
  **12 June 2023**: differentiates eVisa/VOA categories and GCC-resident eVisa. No advertised instant issuance/free
  stopover claim copied from this historical announcement; not needed as a fourth new article reference.
- **Live Visit Saudi checker:** https://www.visitsaudi.com/en/plan-your-trip/visa-regulations fetched entire returned
  page: nationality prompt and FAQ questions, no detailed answers in extracted text. Existing reference 10 retained
  as the traveller's current navigation/check, not evidence that a personal eligibility result was tested.
- **Nationality eVisa portal:** https://visa.visitsaudi.com/, opening chunk, list again omits Bangladesh. This does not
  disprove the foreign-document exceptions. Keep nationality-only eligibility separate from documentary exceptions.
- **KSA Visa tourism page:** https://ksavisa.sa/visa/tourism/details fetched only a logo/link shell. Search index
  describes eVisa visa/PR/GCC and VOA visa/PR categories, but that snippet is a discovery lead, not a completed flow
  or verification of full current operational conditions. Existing KSA Visa portal card remains navigation.
- **Saudia old tourist-visa URL:** https://www.saudia.com/pages/before-flying/travel-information/hajj-and-umrah/tourist-visa
  redirected to https://www.saudia.com/explore/visit-saudi-arabia/visas. Opened destination contains inconsistent
  tourist/stopover labels and 96-hour versus one-year/90-day descriptions. Search-indexed old tourist/business,
  prior-use/stamp text was **not** treated as the current live page. No universal Saudi-national-carrier requirement,
  digital-stamp ban, port restriction, current price or processing guarantee added. Actual operating-carrier boarding
  acceptance and current arrival-port rules remain unverified, not assumed absent.

### Applied article decisions

- EN/BN replace the blanket “fine print not retrieved” paragraph with attributed legal categories, an explicit PDF
  revision-date limitation, the dated 2023 announcement, separate temporary/permanent residence and visa-type/prior-use
  distinctions, accompanying-family caution and GCC source discrepancy. No student/work-visa or temporary-residence
  entitlement, no blanket ban beyond what the cited category actually describes.
- Added three ordered primary-source cards **after original references 1–18** and **before five additional portals**:
  19 regulation, 20 June announcement, 21 GCC report; 26 cards total. Original reference numbers remain stable.
- Added `visaEligibility` to the shared EN/BN callout parser: one amber accessible note immediately after foreign-
  document criteria and before moving on. It requires exact-document/checker and carrier verification before paying,
  states application/boarding untested, leaves digital-only entry evidence unresolved, and forbids sensitive details
  in chat. Existing five Nusuk keys/placements unchanged. No fake application, account login or support contact.
- Six-step HowTo, five FAQ answers, internal links, optional CTA and unrelated snippets did not need a new eligibility
  promise. Original publication and **same-day 2026-10-19 update** preserved; no hub/global restamp. Health D-07 remains
  unverified and its caution is unchanged. No non-refundable booking recommended on an assumed entitlement.

### Validation and next step

- **17 DIY** regression tests, **16 Nusuk**, **25 budget/topic-map** tests passed; scheduling and sitemap tests
  (23 negative controls), lint and build passed. Built **107 EN + 107 BN** canonical routes.
- **225 post-build checks passed**, including full localized visa warning bodies/titles, 26 rendered source cards,
  document criteria, negative controls removing each warning body and unchanged six-step/five-FAQ output. React route
  tests also assert warning markup and placement. Build retains existing non-blocking large-chunk warnings.
- No visual/mobile-browser or authenticated application/boarding QA, deployment, official-support answer or guarantee
  that no newer amendment exists. Local evidence is not production evidence. `git diff --check` passed.
- **Next serial asset: stopover guide.** Start by auditing its own current sources and fine-print claims, including
  this Saudia redirect discrepancy, rather than inheriting this main-guide check as certification. Current carrier,
  accepted prior-entry evidence, PDF revision/effectivity and GCC operational rules remain manual source/official-
  clarification gates; no monitoring or support enquiry is claimed.
