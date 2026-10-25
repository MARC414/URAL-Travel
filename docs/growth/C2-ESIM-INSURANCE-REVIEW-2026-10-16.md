# C2 — eSIM and travel insurance: review and proposed update plan

> **SUPPORTING EVIDENCE — DATED SOURCE RECORD.** The source checks and limitations remain useful. The proposed rewrite, old approval request and next steps below are historical, not an active task. No source date is refreshed by this cleanup. Current direction: [strategy index](../../00-URAL-STRATEGY-INDEX.md).

Checked **2026-10-16**. Documentation only; live edits await plan approval.

## Short plan for the owner

Update the existing English and Bengali article together. Keep its URLs and Airalo/Yesim partner links. **AHTPO11 and all AirHelp promotion settings remain untouched.**

1. Help readers choose between a travel eSIM, home-operator roaming and a local SIM without unsupported savings claims.
2. Add a practical **Airalo–Oman** section: check the actual Oman package, supported network, data/voice features, validity and activation instructions before buying. No separate Oman page.
3. Explain compatible/unlocked phones, installation versus activation, and how keeping a Bangladesh number available for bank SMS differs from buying mobile data.
4. Correct the insurance section: Schengen medical-insurance requirements are not a universal rule for every destination; a medical policy does not automatically insure baggage, flight delays or existing illnesses.
5. Remove unsupported promises such as “90% of headaches”, “instant 5G”, “45-minute queues”, “three times cheaper” and guaranteed two-/three-minute delivery.
6. Give both languages the same useful steps, limitations, sources and next actions. Fix misleading links and target-page callouts; do not redesign shared tools or change other articles.

**Approval requested:** this update plan and its bounded target-page rendering work. No live article, shared widget, affiliate setting, publication date, feed or sitemap has been changed. The detailed record below exists for implementation accuracy; it is not another questionnaire for the owner.

## 1. Selection and scope

- **Owner instruction:** set aside unfinished C1, keep AHTPO11, move to C2, review the whole existing article and show a short plan before editing. The owner says promotion proof was already supplied; no repeat proof request is part of C2. This supersedes the earlier instruction to wait for C1 completion. C1 is paused, not completed or released.
- **Branch/baseline:** `arena/9081bd01-ural-travel`; HEAD and the previously fetched `origin/main` both `ce36ebeb9c783ca19ba0fb6445da723def6364bc`. Required merge is an ancestor of HEAD. PR #44/RFCD remains untouched. No new remote fetch was needed for this documentation pass.
- **Asset:** `blog-37`, `/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide` and `/bn/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide` on `https://ural-travel.pages.dev`.
- **Verdict:** update in place, one bilingual asset. No separate Oman page, insurance sales page, phone guide or compensation article.
- **Reader task:** a traveller planning from Bangladesh needs to arrange usable connectivity and suitable travel medical insurance before departure. Oman is a destination example inside this existing task, not a new visa/flight topic.
- **Primary query hypothesis:** travel eSIM and travel insurance from Bangladesh; secondary questions include Airalo Oman, bank SMS abroad and Schengen insurance. Owner selection and the existing asset support this hypothesis; Bangladesh SERP positions, GSC queries, volume, KD, backlinks and conversions were not measured.
- **Intent:** informational buying/preparation guidance with comparative and procedural sub-sections. No fake live quote engine or measured “best” ranking.
- **Constraints:** no AirHelp changes, no AHTPO11 removal/rewording, no C1 shared-widget implementation, no RFCD changes, no batch A/B work. Other pages' errors are recorded rather than silently fixed.
- **Governance applied:** AGENTS, CONTENT-OS, CONTENT-SYSTEM-V2, AI-WRITING-PROMPTS, METHOD-NOTES, CONTENT-QUEUE, BLOG-AUDIT and WAVE-A-PLAN. The latest owner sequence overrides the older wave order. Evidence precedes prose; the proposed plan still requires approval before drafting/implementation.

## 2. Current-surface inventory

Inspection is of repository source and committed XML, not a production crawl or newly built HTML. No `dist` or `node_modules` directory is present; no build/install was run.

| Surface | Current state / issue |
|---|---|
| `src/data/blogContent.ts`, target body | Two main sections: eSIM versus roaming/local SIM, then insurance. Includes 24h/90% framing, immediate 5G, universal free OTP, airport queues/prices, $4.50–9/BDT550–1,100, regional coverage, hospital bills, Schengen requirements, instant policy acceptance and Saudi senior-cover recommendation. No Oman section. |
| `src/data/bengaliContent.ts`, target override | Same core overclaims; omits EN's Saudi insurance paragraph and Schengen territory/repatriation detail. BN additionally promises policy email in two minutes and implies insurance produces visa approval. BN author is Zayan Rahman, whereas EN is Farhan Momen. Four recommended links versus five in EN. |
| `src/constants.ts`, `BLOG_DATA` `blog-37` | EN title promises “Best” and “Mandatory” insurance across destinations. Summary adds 45 minutes/3x, SMS depends on internet, Thailand mandatory insurance and broad eSIM price claims. Publication 2026-09-27, six-minute reading time, Family & Budget. No article references or `updatedAt`. |
| `src/App.tsx`, target `getBlogAeoSnippet50Words` EN/BN entries | BDT1,200/day roaming saving, $4.50–9, 5G at landing. EN says **$30,000+**, not the legal **EUR30,000** Schengen minimum. BN omits the insurance minimum entirely. |
| `src/utils/seoCopy.ts` | Neutral EN title “Travel eSIM & Insurance Guide from Bangladesh”; description mentions Airalo/roaming and Umrah, SE Asia, Schengen. This does not correct raw title/summary used elsewhere. BN needs explicit package review. |
| `src/utils/blogStructuredData.ts` | No target FAQ/HowTo configuration. Current bodies have no FAQ. Article schema uses source metadata; do not create schema-only answers. |
| `src/routes/BlogPostRouteView.tsx` | QuickAnswer uses summary. Generic body rendering, fallback references, CTA headline/body and `AiraloEsimWidget`. Mid-body BN label says “Saudi / travel eSIM” even for a broader guide. Target-specific sponsored wording and locale-correct action are needed, not a global relabel. |
| `src/components/AffiliatePartners.tsx` | Airalo/Yesim active registry and provider URLs; `AiraloEsimWidget()` returns `AiraloEmbed`. No insurance provider in affiliate registry. Reward rates are publisher commission, not customer discount. Preserve URLs/IDs and all AirHelp configuration. |
| `src/components/AiraloEmbed.tsx` | Already cautious about coverage/validity/OTP charges and correctly says select destination on provider website. It is **English-only**, including on BN target; links are provider-level redirects, not Oman deep links. Do not falsely call it a live side-by-side quote or country-prefilled checkout. A target-local translated callout is the proposed fallback; shared component redesign not requested. |
| `/tools`: `ToolsRouteView`, `InteractiveTools` | Tools page includes a provider eSIM block, but the interactive tab union only accepts converter/calculator/packing/visa-checker/airhelp/airports. **`/tools?tab=esim` does not open an eSIM tab** and falls back to calculator. No insurance comparison engine was found. Correct this article's link label/destination instead of inventing a tab. |
| `scripts/prerender.ts` | Target EN body uses generic paragraph path; BN `bnParagraphs` flattens lines and strips bold. Umrah table handling is slug-specific, not automatic support for arbitrary Markdown tables. Target semantic checklist/table/CTA needs a scoped renderer path if chosen; SPA and static BN/EN must be checked together. Article headline/summary/date come from metadata. |
| `public/sitemap.xml`, `public/rss.xml` | Both target lastmods 2026-09-27T09:00:00+06:00. RSS EN item contains original overclaim title/summary; pubDate 27 Sep 2026. No current changes. Later only the target item and target route dates should materially change. |
| `index.html`, prerender directory | Existing homepage link targets the same asset; no new URL necessary. Anchor says best eSIM/insurance; neutral generator anchor already exists. No homepage cleanup included in this proposal. |
| `src/utils/blogAltText.ts`, image mapping | Smartphone, passport, boarding pass, insurance document. Existing image is illustrative, not proof of service performance. Reuse; no new artwork or testimonial. |

**Existing link map:** Nusuk guide; dual-currency endorsement guide; Europe/UK/USA sightseeing guide; `/tools`; EN-only `/tools?tab=esim`. Keep relevant intent, but remove unsupported numerical assertions in target anchors (BN currently repeats $18,000 quota; do not re-audit or restate money rules here). Label Europe link as sightseeing, not a full Schengen visa-process guide. Use a single honestly labelled `/tools` link where useful, with full BN counterpart. Do not promise an insurance comparison tool.

Repository search included the exact slug, eSIM/insurance, Airalo/Yesim, Asialink/Menalink, Oman, 90%, 45-minute queues, three-times price and BDT1,200/day variants. `blogIndex` confirms the existing asset; no second eSIM/insurance article was found in the inspected inventory. Other articles link into this guide; none is opened for rewriting. Strategy already separates the planned Schengen visa-process job from this insurance/connectivity guide. `SEO-KEYWORD-MAP.md` has no explicit target eSIM/insurance row from the inspected search. Shared Saudi-product schema and other cross-sell claims are outside C2, not newly validated by this review.

## 3. Opened primary sources

All checks below: **2026-10-16**. Unless stated, no publication/effective date was exposed; these are dated observations, not proof the offer will remain unchanged. Only the described sections were read. Product pages are not legal authorities, medical bills or performance tests.

| ID | Source owner / exact URL | What was actually opened and supports use |
|---|---|---|
| S01 | Airalo — [Oman product](https://www.airalo.com/oman-esim) | Product body lists Oman, **Omantel** as primary network, data-only selection and unlimited-duration options. Title advertises “from $4.00” but no matching fixed-data package was exposed in the retrieved selection. Do not combine that title with an invented allowance. No checkout/device/network test; no speed or universal app access guarantee. |
| S02 | Airalo — [installation and validity](https://www.airalo.com/help/getting-started-with-airalo/E8DFWD88SHUX/when-can-i-install-my-esim/EQOCBMXDPSB2) | Main help text opened: stable internet to install; some validity periods start at installation, most on supported network in coverage area; selected for mobile data; allotted data is for the entire period, not daily. |
| S03 | Airalo — [device compatibility](https://www.airalo.com/help/about-airalo/NFHQSUXFCZOM/what-devices-support-esim/D2N6OZSVVM9W) | Opening requirements and device caveats read: eSIM-compatible, not carrier/network locked, not rooted/jailbroken; regional variants matter. List labelled September 2026. Do not copy the long device list: its blanket mainland-China iPhone exclusion differs from Apple's current exceptions (S04). Check manufacturer/exact model. An initial guessed help URL redirected to the category; only the correct linked page supports this entry. |
| S04 | Apple — [Using Dual SIM with an eSIM](https://support.apple.com/en-us/109317) | Dual SIM, separate data/voice lines and carrier unlock conditions opened. Supports distinction between home line and travel data; does not verify every Android configuration, free roaming or bank delivery. Regional device exceptions differ from S03. |
| S05 | Grameenphone — [SMS Roaming](https://roaming.grameenphone.com/personal/services/roaming/sms-roaming) | Full page: incoming SMS free **on this SMS roaming product**, initial prepaid recharge USD1, migration constraints. Not proof for Robi/Banglalink/Airtel, all packs or every bank's OTP. No monetary claim about all operators is cleared. |
| S06 | Airalo — [Asia](https://www.airalo.com/asia-esim), [Middle East and North Africa](https://www.airalo.com/middle-east-and-north-africa-esim) | Product sections opened; 18/13 country-network counts shown, but individual country/network lists not exposed. Current main labels are geographical; not proof every legacy Asialink/Menalink plan or trip is covered. S01 links to MENA as broader coverage including Oman; exact selected-package conditions still need checking. |
| S07 | Yesim — [Oman product](https://yesim.app/country/oman/) | Product table and technical detail opened: data-only, network-connection validity start, activation within 180 days, hotspot depends on operator, speed/Fair Usage Policy caveats. One observed fixed package is 1GB/30 days/USD6.60; not a final Bangladesh checkout quote or matched comparison with Airalo. Prefer no price table in this update. |
| S08 | EUR-Lex / EU — [Visa Code, consolidated 11 June 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02009R0810-20240611) | **Art 15 text opened (chunk 4)**: emergency treatment/hospital care, medical repatriation/death; minimum EUR30,000; territory/intended stay; multiple entry first intended visit plus obligation on later stays; residence-country principle, recoverability and exemptions. Applies to relevant short-stay applicants, not all national visas or every passport category. Consolidation is a documentation tool; official acts linked there govern. |
| S09 | German Embassy Dhaka — [Schengen visiting family/friends checklist](https://dhaka.diplo.de/bd-en/service/2689060-2689060) | Checklist opened for Bangladesh applications where Germany/Estonia is main destination: medical insurance all Schengen countries, duration of requested visa, EUR30,000 and repatriation; credit-card medical insurance not accepted in this checklist. Do not generalize this local checklist to every consulate or describe it as tourist-specific. |
| S10 | Delta Life — [Overseas Mediclaim](https://www.deltalife.org/overseas-mediclaim-policy) | Full product page opened: Bangladeshi nationals/resident foreigners, before departure, premium depends on age/duration, emergency care/repatriation, exclusions including pre-existing conditions. Links July 2026 rate sheets but no quote captured. Its own “universally accepted” and “about an hour” marketing are not adopted as independent consular/issuance guarantees. |
| S11 | Delta Life — [B&H policy wording v9](https://www.deltalife.org/assets/userfiles/OMP_Terms_and_Conditions_v9.pdf) | Opening coverage, medical limits/deductibles and exclusions read. Existing known/treated conditions and travel for treatment exclusions. Proof that “supplemental insurance guarantees pre-existing stabilization” is unsafe; not a recommendation or full audit of this policy. Issue/commencement dates set by purchased schedule, no effective edition date retrieved. |
| S12 | Green Delta — [B&H policy wording](https://green-delta.com/wp-content/uploads/2024/03/BH-Policy-Wording_-Including-19-Covid-Cover-2.pdf) | Opening coverage/exclusions read; medical-history declaration, medical evacuation approval, known/treated prior-year conditions excluded. File path is March 2024, not proof of current purchaser-specific policy. Corroborates need to read terms; no copied assistance phone numbers or coverage maximum. |
| S13 | Visit Saudi — [Stopover Transit Visa](https://www.visitsaudi.com/en/campaigns/saudi-stopover) | Opening Saudia offer explicitly itemizes medical insurance separately from free visa/application charges. Supports route-specific checkout explanation, not “every Saudi visa fee includes comprehensive cover”. Numeric fees are unnecessary for this article and will not be repeated. |
| S14 | Royal Thai Embassy Dhaka — [TR tourist visa page](https://dhaka.thaiembassy.org/en/publicservice/tourist-visa-tr-2?page=5d83296315e39c2540006a60&menu=5d83296215e39c2540006a10) | Page dated 7 Dec 2022, updated 7 Dec 2023; requirements are images, not substantively retrieved text. Insufficient to assert a current 2026 blanket insurance mandate **or** blanket exemption. A guessed `/en/page/visa` returned Page Not Found; navigated via actual visa index to this page. |
| S15 | Saudi Council of Health Insurance — [mandatory policy page](https://www.chi.gov.sa/en/Rules/Pages/healthInsurance.aspx) | Direct fetch HTTP500. Search excerpt alone not verification. Do not claim current Umrah policy benefits were reviewed; link the existing Umrah guide for route planning and ask readers to inspect issued policy rather than promising senior cover. |

**Other limitations:** no current Malaysia visa-category insurance rule was opened, no Bangladesh bank/each-mobile-operator OTP delivery test, no Airalo/Yesim account/checkout, no local airport SIM offer or comparable roaming quote. Search for Oman access restrictions did not retrieve an opened Airalo/regulator notice; unrelated/reseller/first-person travel pages were not used as proof. No claim of an Oman ban, all websites being accessible, blocked-site workaround or guaranteed WhatsApp voice/video service will be added. Airalo-branded lookalike domains are not Airalo primary sources.

## 4. Claim ledger

Each row inherits checked **2026-10-16**, source owner/URL/date from §3, and applies to EN+BN unless specified. Status covers current wording; actions are for the proposed rewrite, not edits already made. `R` below means directly inspected repository source in §2.

| ID | Claim / gap and type | Status | Evidence, scope and safe action |
|---|---|---|---|
| C01 | Buy two products 24h ahead, prevent 90% of headaches; prevalence/process | DROP | No measurement. S02 activation rules vary; insurance for visa application can be needed much earlier. Replace with a pre-purchase checklist, no fixed 24h prescription. |
| C02 | Instant 5G from runway touchdown, 3-minute eSIM download; performance | CONFLICT | S01–S04/S07 depend on device, supported network, settings and plan. Remove timing/speed guarantees; distinguish installed from connected. |
| C03 | Every iPhone/Samsung/Pixel supports two lines and physical SIM remains in slot1; compatibility | QUALIFIED | S03/S04 exact model, regional variant, unlock and configuration matter. Avoid a copied model list or universal physical-SIM claim. |
| C04 | Free banking SMS from GP/Robi/Banglalink/Airtel automatically while using Airalo/Yesim; telecom | CONFLICT | S04/S05 support two lines and one GP product, not all operators or bank delivery. Keep home-number roaming eligibility separate from travel-data purchase; check operator and bank, charges and line settings. |
| C05 | No mobile internet means no SMS OTP; technical, summary | CONFLICT | S04/S05 separate mobile data and SMS line. Data eSIM is not a replacement number for bank SMS; do not guarantee OTP arrival even with roaming. |
| C06 | Midnight flights, 45-minute airport queues, tourist bundles $25–35/3x cost; statistics/comparison | DROP | No schedules, observations or matched offers. Local SIM is a valid alternative; do not disparage kiosks or fabricate savings. |
| C07 | $4.50–9 / BDT550–1,100 buys 1–5GB/7–30 days across named destinations/providers; price | UNVERIFIED | S01/S06/S07 don't establish a matched basket. Remove blanket ranges; link current provider offers and check allowance, validity, currency and final charges. No undated BDT conversion. |
| C08 | BDT1,200/day roaming saved; AEO price | DROP | No home-operator/destination/pack quote. Compare actual needs and terms, not an invented daily penalty. |
| C09 | Asialink/Menalink automatically covers Malaysia/Thailand/Singapore and Umrah/Dubai; coverage | QUALIFIED | S06 regional products exist, retrieved full country lists absent. Use current regional-product categories and require every stop on selected plan list. No unconditional border-switch guarantee. |
| C10 | New Oman section: Airalo offers Oman data eSIMs, primary network Omantel; product | VERIFIED | S01 current product body. Attribute network as currently listed, not universal performance or guarantee for all future packages; reader checks selected plan. |
| C11 | Oman cheapest price/data, 5G, unlimited full speed, hotspot/phone number, regional package; package details | QUALIFIED | S01 partial product information, S07 plan-specific caveats. No invented cheapest plan or like-for-like ranking. State data-only as observed and tell readers to check calls/SMS, fair use, tethering, coverage, validity and top-ups for chosen package. No unverified threshold. |
| C12 | Install before travel always delays validity until landing; activation | CONFLICT | S02 says some begin on installation. Read validity first, use stable internet, keep instructions; do not burn a short plan by following a universal early-install rule. |
| C13 | Travel eSIMs banned or unblock apps in Oman; potential new legal/service claim | UNVERIFIED | No opened official notice. Do not add either claim. Preparation advice follows S02, not unsupported regulatory assertions. |
| C14 | Minor one-day admission costs USD3,000–10,000/BDT3.5–12 lakh; medical price | DROP | No hospital quote/diagnosis/treatment basis. Remove scare figures; explain insured benefits and exclusions instead. |
| C15 | Schengen EUR30,000 medical cover with repatriation; law | VERIFIED | S08 Art15; apply to relevant short-stay ordinary-passport applicants, include urgent care/hospital/death, territory and dates, separate multi-entry rule. S09 demonstrates Bangladesh application checklist. Avoid unnecessary country count. |
| C16 | EN AEO $30,000+ equals Schengen minimum; currency | CONFLICT | S08 specifies **EUR**, not USD. Use legal currency consistently across metadata/body/FAQ. Omit ~$35,000 conversion. |
| C17 | Every Bangladeshi applies through VFS, any medical certificate accepted, insurance assures visa approval; legal/service | CONFLICT | S08/S09 application category, consulate, coverage and exceptions matter. Insurance is one requirement, not visa approval. Do not make an insurer's acceptance slogan the authority. |
| C18 | Thailand/Malaysia/Schengen/Umrah all uniformly require purchased travel insurance; law | UNVERIFIED | S14 old/image-only, Malaysia primary unreviewed, S15 inaccessible. Do not claim general mandatory/exempt status. Explain destination/visa-specific checks; Schengen rule is separately verified. |
| C19 | Any policy provides instant English PDF, BN in two minutes, accepted by all embassies/airlines; service | DROP | S10–S12 do not establish universal issuance or acceptance. Get certificate in time for application and check specific checklist. No unsupported insurer recommendation. |
| C20 | Medical policy automatically covers lost bags/flight delay; insurance | CONFLICT | S08 medical minimum; S10–S12 named medical benefits/exclusions, not universal disruption cover. Check separately listed baggage/delay benefits and terms; don't reproduce C1 legal payouts. |
| C21 | Saudi Umrah/stopover medical insurance universally bundled into visa fee; product | QUALIFIED | S13 shows separate line items for named route, S15 not opened. Tell readers to check issued insurance and checkout; no universal bundled fee, no numeric Saudi benefits. Keep route-specific detail in existing guide. |
| C22 | Anyone aged60+ should add a policy so delay/pre-existing stabilization is covered; insurance/advice, EN only | CONFLICT | S10–S12 contain pre-existing exclusions. Ask insurer about declared conditions, age eligibility, exclusions, deductibles and written confirmation; do not guarantee coverage by buying another policy. Restore same advice in BN. |
| C23 | “Best” product/traveller-switching consensus; comparative | DROP | No field test or matched ranking. Compare fit, not popularity or URAL first-hand experience. |
| C24 | Tools hub compares insurance / `tab=esim` opens comparison; navigation | CONFLICT | R: no supported eSIM tab or insurance comparator found. Correct target link/label, do not build new functionality implicitly. |
| C25 | BN is full parity and same author; editorial | CONFLICT | R: missing Saudi section, missing Schengen caveats/fifth link, extra two-minute promise, different author. Preserve EN author identity as canonical and localize it accurately; no invented co-author. Restore substantive parity, not unsupported claims. |
| C26 | Airalo callout is bilingual, prefilled Oman checkout and independent advice; commercial | QUALIFIED | R: existing widget English-only/provider-level, sponsored attributes present. Use target-local translated sponsored callout with central partner URLs, no preselection claim. Source references use direct official URLs. |
| C27 | Choosing insurance: premium, sum insured, deductible, exclusions all mean same thing; missing decision support | VERIFIED | S08/S10–S12 distinguish limit, premium and conditions. Explain these as separate checks; no fixed premium, claim reimbursement or medical advice. |
| C28 | Metadata, schema, RSS neutral because SEO title is restrained; publishing | CONFLICT | R: AEO, raw summary/H1, Article schema and RSS retain claims. Update all target surfaces together after approval; references numbered/visible with checked date. |

### Evidence disposition

The plan can proceed to owner review without asserting the unresolved details: no fixed eSIM prices/savings, no Oman ban/app-access claim, no blanket Thailand/Malaysia insurance rule, no precise Saudi benefit or senior-cover guarantee. Retained factual scope has primary support above. If later drafting needs a specific price/package/regulatory or insurance promise, reopen that claim first; a caveat is not a substitute for evidence.

## 5. Proposed rewrite brief (Stage 3 — awaiting approval)

### Page job and structure

**Working H1:** “Travel eSIM & Insurance from Bangladesh: Oman, Umrah & Schengen”. Bengali to preserve the same job naturally; title is provisional, not live metadata.

**Centerpiece:** QuickAnswer plus a compact “Before you buy” checklist and visible checked date. This is preparation guidance, not a working eligibility calculator or live quote tool. A giant price table would overstate the available evidence, so it is not the centerpiece.

**Practical value:** separate data from home-number SMS, installation from activation, legal visa minimum from insurance benefits, and provider listing from real-world performance. Use the verified Oman listing as an example, not a claim of field testing.

| # | Heading / reader question | Intent | Component | Facts | Modality | Internal next step |
|---|---|---|---|---|---|---|
| 0 | What should I arrange before leaving Bangladesh? | Informational | Existing QuickAnswer + checked-date strip | C01–C05, C15–C22 | Direct factual answer | Jump to connectivity/insurance |
| 1 | eSIM, home roaming or local SIM: what fits your trip? | Comparative | Three short labelled decision blocks; no price ranking | C03–C09, C23 | Practical judgement from verified constraints | `/tools`, accurately labelled provider browsing |
| 2 | What should you check before buying an Oman eSIM? | Destination qualifier | Compact checklist, source-linked current product note | C10–C13 | Factual then practical | No new Oman URL |
| 3 | How do you prepare your phone and keep your Bangladesh number available? | Procedural | Numbered checklist with activation warning | C02–C05, C12 | Factual steps, no delivery guarantee | Existing card guide with neutral anchor |
| 4 | What insurance does a Schengen visa require? | Legal/informational | Short rule block + certificate checklist | C15–C17 | Definition → rule → conditions | Relevant official consulate checklist, not sightseeing as visa authority |
| 5 | What should families check for other trips and existing illnesses? | Practical/coverage | Separate policy checklist: ages, dates, exclusions, deductible, assistance, baggage/delay | C14, C18–C22, C27 | Factual boundaries followed by practical advice | Existing Umrah/stopover guide; no copied fee amounts |
| 6 | Common questions | Clarification | Visible FAQ block (same content drives any schema) | C03–C05, C10–C12, C15, C20–C22 | Short sourced answers | No duplicated mini-guide |
| 7 | Sources and next steps | Verification/commercial | Numbered References + locale links + labelled sponsored callout | C24–C28 | Transparent | Provider-level Airalo/Yesim links, unchanged IDs |

**FAQ candidates:** Does this phone support eSIM? Can I receive bank SMS on a data eSIM? When does validity start? Can I use an Oman-only plan in UAE? Is USD30,000 enough to represent the Schengen minimum? Does medical insurance include existing conditions or baggage? Each answer must retain scope and be visible in EN/BN before schema is added. No universal OTP, territorial coverage or claim acceptance answer.

### Query and scope map

| Query/task | Decision |
|---|---|
| eSIM and travel-insurance preparation from Bangladesh | Existing page owns the task; UPDATE, no new QD-Page |
| Airalo Oman availability and choosing a plan | QD-Heading on this asset |
| eSIM compatibility/activation; bank SMS while abroad | QD-Heading with manufacturer/operator source links, not a new phone manual |
| Schengen medical minimum and certificate checks | QD-Heading; no complete visa-application process |
| Family/older traveller exclusions; baggage versus medical cover | QD-Section, no medical treatment recommendation |
| Passport endorsement/payment limits; Nusuk permits; Umrah visa route | QD-Link to existing owning guide; do not republish unverified numbers |
| Oman flights, immigration, sightseeing; C1 compensation; discount campaigns | Outside this article update |

**Source/coverage comparison, not a ranking study:** Airalo and Yesim product/help pages answer package/setup questions; GP answers one home-operator SMS product; EUR-Lex and the Dhaka checklist answer medical-insurance rules; insurer terms expose exclusions. The existing article fails to connect these distinctions reliably. No measured competitor superiority or “20–30% better” claim. Search discovery was not a localized SERP audit and no competitor sitemap inventory was completed; the plan is based on reader task, existing-page deficiencies and opened primary sources.

### Render and publication contract

- Existing generic text rendering is not proof of semantic list/table parity. Implementation should use a **target-only semantic block/render path** for the chosen short lists/headings and local sponsored callout in React and prerender. This is bounded development work in the proposal, not permission for a site-wide renderer refactor.
- Reuse existing typography/components. No new calculator, quote API, reviews, comparison scores, image or schema type simply for decoration.
- Full EN/BN parity: same decisions, amounts/units, caveats, sources, FAQ and link intent. Localize the author to Farhan Momen to match the existing EN canonical record. Fix the current English-only embedded callout on this target without changing shared consumers.
- Article-specific numbered references and visible checked date. Retain publication 2026-09-27. Set `updatedAt` only after substantive verified work; preserve canonical/hreflang and image.
- Refresh target H1/summary, cards, EN/BN AEO, SEO, visible FAQ and matching Article/FAQ metadata together. No HowTo by default; simple preparation steps do not require an extra schema claim.
- Keep Airalo/Yesim affiliate URLs/IDs, `target="_blank"` and `rel="noopener noreferrer sponsored"`; clearly label commercial links. Don't imply site checkout/insurance brokerage or Oman auto-selection.
- Keep AHTPO11, its promotion and all C1/AirHelp files/branches untouched. No broad registry or shared widget cleanup. Any necessary shared change beyond a target-conditional render path requires explicit scope approval.
- Generated changes after approval: only this EN RSS item's updated title/summary and the two target sitemap lastmods, plus target HTML. Original RSS publication date unchanged. Check for accidental unrelated generated churn.

## 6. Validation and next action

This pass: source inspection, opened primary texts, branch/ancestry, documentation links/table structure and whitespace checks. No live edits, installation, lint/build, runtime widget test, checkout, purchase, claim submission, deployment, commit or push.

**Next action:** owner reviews the short plan at the top. Approval permits the staged EN draft and full-parity BN/package work under this scope; unresolved claims remain excluded as described. Before any repository handoff run `npm run lint`, `npm run build`, `npm run verify:build`; inspect both target HTML pages, schema, canonical/hreflang, internal/outbound links, target-only sitemap/RSS diff and responsive presentation. Confirm no AHTPO11 or AirHelp changes. Report actual results, not inherited counts.
