# First-pass keyword-to-URL map

**Status:** implementation hypothesis, prepared 2026-09-28. No Search Console query export or Bangladesh-filtered keyword-tool dataset was available, so this map makes **no search-volume, difficulty, or ranking claims**. Validate it against Search Console page/query data before expanding titles or content around any term.

## Priority pages and intent boundaries

| Priority | URL | Primary query hypothesis | Supporting language / user need | Page's distinct job |
|---|---|---|---|---|
| 1 | `/umrah` | Umrah cost from Bangladesh | DIY Umrah from Dhaka; BDT Umrah budget; Saudi visa and Nusuk planning | Broad planning hub: cost framework, visa/Nusuk, Makkah–Madinah logistics and next steps. Keep year-sensitive prices clearly dated and sourced. |
| 1 | `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` | DIY Umrah from Bangladesh | Umrah visa from Bangladesh; how to use Nusuk; independent Umrah checklist | Detailed process article that supports the hub. Avoid making it another broad cost landing page; link budget intent to `/umrah`. |
| 1 | `/blog/hajj-registration-bangladesh-government-vs-private-package-cost` | Hajj registration Bangladesh | official Hajj portal; government vs private package; registration steps | Seasonal, official-process intent. Refresh each season and distinguish confirmed government information from estimates. |
| 1 | `/visa/nepal-visa` | Nepal visa for Bangladeshi citizens | Nepal visa on arrival; documents; stay limits and repeat-entry rules | Destination-specific entry rules. Direct readers to official immigration guidance and show when rules were checked. |
| 1 | `/visa/thailand-visa` | Thailand visa from Bangladesh | visa process; application route; requirements for Bangladeshi passport holders | General process and eligibility hub. Do not target the same document/bank-evidence long-tail as the detailed article. |
| 1 | `/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide` | Thailand visa documents from Bangladesh | eVisa application documents; financial evidence; application steps | Specific preparation and troubleshooting article supporting the general Thailand visa page. Avoid presenting a fixed bank balance as an official universal threshold. |
| 1 | `/visa/malaysia-visa` | Malaysia visa from Bangladesh | Malaysia eVisa process; eligibility; required documents | Application-process hub for Bangladeshi travelers. |
| 1 | `/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration` | Malaysia Digital Arrival Card for Bangladesh travelers | MDAC; Malaysia arrival-card timing; pre-departure steps | Arrival-card and airport-preparation article, separate from eVisa application intent. |
| 1 | `/flights/dhaka-kathmandu` | Dhaka to Kathmandu flight price | Dhaka–Kathmandu flights; route duration; airline and fare comparison | Commercial route page. State that fares change and avoid implying a live quote unless the widget provides one. |
| 1 | `/blog/cheap-flight-booking-hacks-dhaka` | cheap flights from Dhaka | flexible travel dates; baggage fees; fare alerts and comparison tips | Informational booking advice across routes, not a second Kathmandu flight page. |
| 1 | `/costs/nepal-costs` | Nepal trip cost from Bangladesh | Nepal travel budget in BDT; flight, stay, food and transport costs | Cost estimation and budget categories only; link itinerary planning to `/destinations/nepal-guide`. |
| 1 | `/destinations/nepal-guide` | Nepal 5-day itinerary from Bangladesh | Kathmandu and Pokhara itinerary; route and transport planning | Day-by-day trip plan, not the primary cost calculator. Link the cost question to `/costs/nepal-costs`. |
| 2 | `/destinations/thailand-guide` | Bangkok itinerary from Bangladesh | four-day route; markets, temples and local transport | Destination itinerary for Bangkok; keep visa-process intent on `/visa/thailand-visa` and cost estimation on `/costs/thailand-costs`. |
| 2 | `/destinations/malaysia-guide` | Kuala Lumpur itinerary from Bangladesh | city sights, transport and trip planning | Destination itinerary; keep application intent on `/visa/malaysia-visa` and arrival-card questions with the supporting MDAC article. |
| 2 | `/destinations/dubai-guide` | Dubai itinerary from Bangladesh | city route, transport and attraction planning | Destination itinerary; keep UAE entry requirements on the visa guide and cost estimates on `/costs/dubai-costs`. |
| 2 | `/destinations/singapore-guide` | Singapore 4-day itinerary from Bangladesh | MRT, attraction and halal-food planning | Destination itinerary; keep entry-process questions on `/visa/singapore-visa` and cost estimates on `/costs/singapore-costs`. |
| 2 | `/destinations/maldives-guide` | Maldives 5-day itinerary from Bangladesh | local-island stays, transfers and activities | Destination itinerary; keep entry requirements on `/visa/maldives-visa` and cost estimates on `/costs/maldives-costs`. |
| 2 | `/blog/nepal-pokhara-itinerary-bangladesh` | Kathmandu to Pokhara itinerary from Dhaka | intercity transport choices; 5-day route planning | More detailed route-planning article; support, rather than duplicate, the destination itinerary page. |
| 1 | `/blog/dual-currency-card-endorsement-bangladesh` | dual-currency card endorsement Bangladesh | passport endorsement; overseas card payments; bank preparation | Banking preparation guide. Explain current rules with an official Bangladesh Bank/bank source and a checked date. |
| 1 | `/blog/dhaka-airport-outbound-immigration-checklist-noc-go` | Dhaka airport immigration checklist | outbound documents; NOC/GO; passport, ticket and visa checks | Departure-readiness checklist. Qualify requirements by traveler, destination and airline rather than presenting every item as mandatory for everyone. |
| 2 | `/blog/top-budget-family-destinations-from-dhaka` | family trips from Dhaka on a budget | destination comparison; entry rules; broad BDT planning | Comparison article; keep estimates dated and link each destination to its itinerary and cost page. |
| 2 | `/flights` | flights from Dhaka | routes, airlines and fare comparison | Route directory. Let each `/flights/:route` page own route-specific fare intent. |
| 2 | `/costs` | trip costs from Bangladesh | international travel budget in BDT | Budget directory. Individual destination cost pages own country-specific cost queries. |

## On-page implementation notes

- Page titles and descriptions are managed in `src/utils/seoCopy.ts`, shared by the React metadata hook and the prerender script. The custom copy is limited to priority pages; the remaining routes receive compact versions of their existing page-specific copy.
- Keep the broad hub and supporting article visibly distinct: a route page answers route/fare questions, a visa page answers entry-process questions, a destination page answers itinerary questions, and a cost page answers budget questions.
- Use internal links with descriptive, natural anchors between the matching hub, detail page and supporting article. Do not repeat the exact-match phrase in every link or force the same query onto multiple pages.
- Visa, Hajj/Umrah, currency and travel-cost details can change. Cite the responsible official source in the page body, show a “checked” date where practical, and label estimates as estimates.
- Bengali text is currently a client-side language toggle, not a separate crawlable URL. No Bengali `hreflang` target is emitted until stable Bengali page URLs exist.

## Validation plan

1. Export Search Console queries and pages for the Bangladesh country filter; map each query cluster to one canonical URL and look for pages competing for the same intent.
2. Compare impressions, clicks, CTR and position by query/page over a representative period. Use this evidence to revise the hypotheses; do not infer demand from these labels alone.
3. Re-check official visa, Hajj, card-endorsement and arrival-card guidance before refreshing time-sensitive copy.
