# Travel tools — data and calculation contracts

**Lifecycle: CURRENT IMPLEMENTATION REFERENCE · 7 November 2026**

## Exchange rates

`functions/api/rates.js` fetches ExchangeRate API Open Access with BDT as the base.
`src/utils/rateData.ts` is the shared validation contract. The rate date comes from
the provider's top-level `time_last_update_unix`; `fetchedAt` is a separate retrieval
timestamp. A missing timestamp, incorrect base, invalid rate or expired payload is
unavailable, never today's rate by default.

- The edge cache refreshes at the provider's next update, bounded by a day from
  retrieval. Cloudflare cache storage is per location; this is not a global cron.
- On a failed refresh, a labelled cached copy can survive for one extra day, with
  an absolute limit of 48 hours from the source update and any earlier provider EOL.
- Failed requests have a retry delay. Concurrent requests within an isolate and
  concurrent browser widgets are coalesced.
- Browser session storage is optional. A blocked store does not remove attribution.
- `RatesNotice` renders the actual source timestamp, a clickable
  **Rates By Exchange Rate API** credit, reference-only wording and the cached-data
  notice when applicable. Conversion helpers reject non-finite or expired values.
- `rateLine(from, to, rates, locale)` divides the target quote by the source quote.
  Provider rates are units of foreign currency per BDT, not the inverse.

The endpoint supplies URAL's own display. Currency choices in flight-search links
are provider preferences; they do not depend on a local FX conversion succeeding.

## Trip Cost Estimator

`TripCostEstimator.tsx` owns the interface. `tripCostEstimator.ts` owns pure parsing,
validation, dates and calculation. `/tools/budget-calculator` remains the canonical
URL in both languages, and the name is **Trip Cost Estimator** throughout navigation.

The former destination presets had no recorded supplier-price provenance. They
are not inputs to this implementation. Readers enter supplier quotes and personal
allowances, name those sources, and record when they checked them. This is visibly
reader-supplied provenance, not a claim that URAL verified the supplier's price.

| Input | Calculation basis |
| --- | --- |
| Airfare | Either a round-trip quote per adult plus whole-group child and infant quotes, or one explicit whole-party quote |
| Accommodation | Tax-inclusive room rate × selected rooms × occupied hotel nights |
| Meals | Daily allowance × days × adults and children |
| Local transport | Average daily allowance × days × adults and children |
| Adult admissions | Entire-trip quote per adult × adults |
| Child admissions | Entire-trip total for all children; never an adult-price fallback |
| Other costs | Whole-party total including visa, insurance, payment fees, shopping, infant extras and reserve as applicable |

- Duration: 1–30 days. Party: 1–12 people, including at least one adult. Rooms:
  1–12. Hotel nights can be adjusted from the initial `days − 1` value.
- Infants do not receive the daily meal/transport multiplier. Their airfare is
  explicitly covered; other infant needs belong in the other-costs entry.
- A blank is unknown. An explicitly entered zero means included/not applicable.
  Missing required costs, invalid inputs or absent source/date prevent **both** the
  total and the priced breakdown. Inactive child/infant fields are ignored.
- Amounts are parsed into integer poisha. Equal share is rounded only after summing
  and includes everyone; it is not an actual adult/child fare allocation.
- Inputs stay BDT. Display defaults to BDT for a Bangladesh departure and USD for
  other origins. An explicit selection wins. Missing USD rates produce a labelled
  BDT result. Display changes never change input amounts.
- Any input edit requires recalculation, so a former result cannot masquerade as
  the updated trip. Sources and amounts stay local; usage events carry coarse bands.
- Flight handoffs keep the route, departure/return dates, adult count, locale and
  selected currency. A one-day trip retains a same-day round trip. Children and
  infants must be added on the provider. Groups over nine use a generic handoff
  with group-quote guidance rather than a silently clamped search.

## Six destination guides

`src/data/tripCosts.ts` contains complete English/Bengali records for Nepal,
Thailand, Malaysia, Dubai/UAE, Singapore and Maldives. `src/constants.ts` re-exports
the English records; `getLocalizedCosts` supplies the matching Bengali records.

The guides describe cost categories, units, comparison checks and official
checking routes. They publish no unsupported price matrices, currency literals
or `PriceSpecification` ranges. Visa fees and shopping are separate from attraction
tickets. `CostPlanningGuide` and `CostPlanningHub` share the editorial rendering
between React and saved HTML. Each destination opens the corresponding estimator.

## Umrah and currency conversion

The Umrah worksheet retains its eight whole-party BDT inputs. Its currency selector
changes display only, follows origin until the visitor chooses, and uses the same
dated rate notice and BDT fallback. The equal-share result is labelled explicitly.

The Currency Converter supports the ten foreign currencies listed in its controls.
It loads current available reference data, accepts a valid BDT input, and suppresses
conversion output for invalid amounts or unavailable rates. The home card links to
the converter route so the rate tool remains outside the eager home bundle.

The flight widget's old simulated fares and date-based price forecast are not
rendered. The date-comparison action opens the hosted provider's current search.

## Verification

Run `npm run lint`, `npm run build`, `npm run verify:build`, `npm run test:rates`,
`npm run test:trip-estimator`, `npm run test:umrah-budget`,
`npm run test:flight-search` and `npm run test:tool-analytics`.

The build verifies actual EN/BN tool controls and cost-guide references in `dist`,
the honest initial state, source/date requirements and absence of fixed FX strings.
Browser checks must cover both languages, desktop and narrow layouts, input errors,
children/infants, whole-party quotes, currency selection and unavailable FX.

### Local verification record — 7 November 2026

- Lint and production build passed; 132 English and 132 Bengali routes generated.
- `verify:build`: 502 checks passed. Eager home JavaScript measured 204.4 KB gzip
  against the existing 206 KB limit.
- Estimator: 42 checks; rates: 10; Umrah worksheet/topic map: 26; tool analytics:
  10; checklist progress: 9. Flight-search regression checks passed.
- The local Pages handler fetched the actual upstream response successfully and
  retained its 7 November 2026 source date. Edge-cache failure cases used fixtures.
- Chromium checks covered English and Bengali calculations, explicit currency
  choice, child/infant requirements, whole-party fares, invalid-input suppression,
  provider handoff parameters and unavailable-FX BDT output. Layouts were checked
  at 1440px and 390px using same-origin browser frames, plus the normal browser tab.
  Tool controls met the 44px target and had no horizontal overflow.
- The targeted saved-HTML sweep found no legacy fixed-FX literals or the previously
  removed URAL payment/sales disclaimer phrases. Broader editorial content debt
  remains tracked by the existing non-blocking report.

These are local checks; this record does not assert a live deployment.
