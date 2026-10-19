# Saudi stopover — source and implementation record

Checked **19 October 2026 (Dhaka)**. Scope: existing stopover article EN/BN, its metadata/snippets/CTA, rendered
FAQ/procedure and point-of-action cautions. Not the wider cluster, an authenticated booking, or a deployment.

## Claim decisions before editing

| ID | Claim | Opened primary evidence / retrieval | Decision |
|---|---|---|---|
| S-01 | Up to 96 hours vs visa validity | https://www.visitsaudi.com/en/campaigns/saudi-stopover opening chunk: up to 96h, Saudia single entry, 3-month validity; https://www.saudia.com/transit-visa both chunks: 90-day validity from issue, up to 96h, non-extendable, one stopover per booking | VERIFIED AS PUBLISHED / carrier-scoped. Distinguish validity from stay; use issued visa and airline's permitted arrival/departure window, no invented clock convention. |
| S-02 | Universal Bangladesh eligibility / no used visa needed | Saudia transit page conditions: passport >=6 months (bilateral caveat), confirmed onward ticket, destination visa/residence unless exempt. FAQ oddly says noneligible people can apply; not a nationality approval result. Visit Saudi describes offer, not a Bangladesh entitlement | QUALIFIED. Do not infer unconditional prior-visa exemption or nationality eligibility from an absent condition. Check exact documents/route before payment; distinguish onward-destination permission from a Saudi tourist-visa exception. |
| S-03 | Same flynas/Saudia checkout | https://www.flynas.com/en/stopovervisa redirects to /en homepage; first two returned homepage chunks inspected, booking form has Stop Over Booking / RUH/JED, not personal visa approval. Guessed /en/stopover returned 404. Search-discovered /en-eu/stopovervisa returned 404 content. Duplicate chunk request returned same chunk 0. No application submitted | UNVERIFIED detailed current flynas conditions; do not describe as identical Saudia flow. Homepage is navigation only. |
| S-04 | flynas launch and current rule | https://www.flynas.com/en/media-center/news-updates/stopover-visa fetched complete: 30 January 2023 launch, visa after airline-ticket purchase, 3-month validity/4-day stay, Umrah mentioned. Search-indexed regional guides have destination/visa/procedure/processing variations but live versions not retrieved | HISTORICAL corroboration, not a 2026 checkout/eligibility test. Article labels launch date, leaves current flynas prerequisites/refunds/timing for official confirmation; no four-hour/instant promise or indexed country list. |
| S-05 | Cost / free hotel | Visit Saudi opening Saudia offer: free visa fee, approx SAR39.50 application, insurance from SAR13. Saudia transit: fees/service/medical/insurance per MOFA; hotel bookings for round-trip/selected destinations. No priced personal basket or free-night entitlement verified | QUALIFIED. Promotional line items are published, so remove “no fees published anywhere.” Explain they are not all-in; use actual checkout/invoice, no BDT/FX estimate. No hotel entitlement or categorical proof that no offer exists; written booking-specific inclusion needed. Remove unsupported launch-promotion history. |
| S-06 | Booking/application/payment/issuance order | Saudia transit both chunks: Seats & Extras/Additional Services during booking; passport photo 200x200 max20KB in FAQ; combined flight/visa payment; email visa/insurance, marketing says instantly. https://www.saudia.com/en-US/help/faqs/stopovervisa-faq redirects to general FAQ with booking answers, no stopover-detail answers exposed | VERIFIED published Saudia sequence, not a tested UI. No invented universal SLA or “no processing time published.” Do not guarantee issuance on payment, universal photo specs, or universal ability/inability to add later; ask carrier if ticket already exists. |
| S-07 | Saudi tourist exception vs stopover | Earlier main-guide foreign-visa check in DIY-UMRAH-SOURCE-REVIEW.md: actual regulation + dated SPA, current checker details and carrier/digital-entry evidence limits remain open | Link to main guide's qualified categories and official checker; no copied air-only/carrier/stamp restrictions or duplicated tourist fee/validity guarantee. This pass does not newly verify those rules. |
| S-08 | Umrah vs Rawdah vs general mosque visit | https://haj.gov.sa/en/E-Services/Umrah-Permit-Application and https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women fetched complete, separate available appointment services, visitors included, displayed service update 20Sep2026. Visit Saudi opening uses broad Umrah/Ziyarah Nusuk wording | Separate services, subject to availability; Rawdah permit not described as mandatory for all Prophet's Mosque prayer. Use visitor instructions via reviewed Nusuk guide, do not copy generic Nafath as universal foreigner requirement. No QR/admission guarantee. |
| S-09 | 4-day itinerary / rail | Old article calls itinerary realistic, fixes train time, includes SAR65/162 historical fares and prescribes both cities with Jeddah return. No actual rail/hotel/transfer itinerary priced or tested this pass | EDITORIAL ILLUSTRATION, not feasibility promise. Single-city Makkah base plan; optional Madinah only if actual train, permits, transfer buffers and onward flight work. No current fare, fixed journey time or mandatory optional Ziyarah. Link hotel/rail specialist; reference8 navigation not fare refresh. |
| S-10 | General visa overview conflicting descriptions | Earlier checkpoint opened Saudia old tourist URL redirect to https://www.saudia.com/explore/visit-saudi-arabia/visas with conflicting tourist/stopover labels and stay/validity descriptions | Do not silently pick general-page wording. This check uses dedicated transit source + Visit Saudi; source ambiguity remains a carrier clarification gate if personal booking disagrees. |

## Sources not claimed reviewed in full

Visit Saudi campaign returned six chunks; only relevant opening offer/Umrah text inspected. flynas homepage returned
six chunks; opening two inspected, not later material or authenticated checkout. Search snippets are leads only.
No application, paid quote, support contact, slot booking, private credentials or usable QR requested/used. No newer
notice's absence inferred. Current-season health limits from the main guide remain open; not a new vaccine checklist.

## Implementation / validation

Applied to the existing EN/BN article, keeping its slug, original 27 September publication and five curated links.
Editorial update is 2026-10-19. Ten localized source/navigation cards distinguish actual evidence, historical launch
and untested portal navigation. The old redirected foreign-visa help reference is replaced with the official checker;
foreign-document detail is linked to the separately reviewed main guide rather than claimed newly verified here.

- Rewrote for named reader → dated quick answer → question headings → practical sequence → contextual qualifications.
  Saudia sequence is explicitly carrier-specific; flynas current detailed eligibility remains unverified. Removed
  unconditional prior-visa exemption, booking-equivalence assertion, universal fee/publication claims, unverified
  historical hotel-promotion story, fixed rail times/fares and guaranteed two-city framing. Madinah is optional.
- Two shared accessible EN/BN amber notes: `stopoverEligibility` before payment decisions, `stopoverPermits` before
  itinerary commitment. Exact-document/airline checks, refund risk, current-season health/access and appointment
  availability stay local to the action; no fake booking, trial slot or sensitive data request.
- Added one Saudia-only six-step HowTo and six visible FAQs with corresponding JSON-LD. Cautions stay out of HowTo.
  Retained visitor/account/visa-before-permits sequence; distinguished Rawdah from ordinary mosque visits.
- App EN/BN snippets and SEO description aligned; price-free, optional Airalo data CTA replaces the unverified
  3GB/$8 headline and activation/entry implication. Five internal links and >=2 sibling inbounds tested in each locale.
- Generic client-only visa-price panel suppressed on this procedural guide, as for main/Nusuk. Its independent
  existing regression fixture now uses the flight article; its guard was preserved, not removed or claimed as a
  fresh flight-article source review. No hub/global content date advanced; stopover sitemap/RSS lastmod follows
  its actual 19 October update.

### Executed checks

- `npm run test:stopover-guide`: **17 passed**, EN/BN source/date/citation checks, retired-claim controls, six-step /
  six-FAQ extraction, two caution placements, carrier/visa distinctions, illustrative plan, links/inbounds/optional
  CTA, actual React route warning markup/full escaped text and aligned App snippets. Wired into package scripts/CI.
- DIY **17**, Nusuk **16**, budget/topic-map **25** tests passed; scheduling, sitemap suite (**23 negative controls**)
  and lint passed. Build generated **107 EN + 107 BN** canonical routes; **235 build checks passed**.
- Initial React full-text unit assertion encountered apostrophe escaping, not missing output; it now compares the
  complete React-escaped warning text. Initial build verification similarly exposed unsupported hexadecimal
  apostrophe decoding in full-body/structured-text comparisons. Both normalizers now recognize decimal, hexadecimal
  and named apostrophes, with two explicit positive encoding checks. Full-text caution coverage remains intact;
  four stopover negative controls reject a removed warning body in each locale. No warning text was waived.
- Existing non-blocking Vite large-chunk warning remains. `git diff --check` passed. No new dependencies, visual/
  mobile-browser QA, authenticated transaction, supplier quote, support answer, deployment or live production check.

## Progress boundary and next asset

This is the third core Umrah article pair revised in the current closure cycle, after main DIY and Nusuk. The hub's
quote-input mechanism is separately implemented; it is not a complete fresh audit of every hub fact. Nine of twelve
core Umrah article pairs still need independent review, plus the adjacent Hajj asset. Some older audits exist but
are not counted as refreshed/closed here. All these articles already exist; the count measures this accuracy-upgrade
cycle, not site construction, weighted effort or publication completion. Two optional travel bridges are outside
that core count. Next asset: hotels/Haramain, with property-specific claims and separate rail conditions.

Before release, recheck volatile sources and leave unverified flynas/current eligibility, health and personal-
booking conditions qualified. Owner approval, visual review and deployed EN/BN/live graph/schema/feed checks remain
separate. No automatic source monitoring or completion date is promised.
