# 04 — Monetization and affiliate references

[Strategy index](../../00-URAL-STRATEGY-INDEX.md) · [Current audit](../../00-URAL-CURRENT-AUDIT.md)

URAL's model is editorial travel intelligence with affiliate referrals and a human-contact path. The current audit records unresolved handoff, attribution and desk-fulfillment questions; this folder does not introduce a new revenue plan.

## Supporting research

- [Travel affiliate research report](DEEP-RESEARCH-TRAVEL-AFFILIATE-MONETIZATION-REPORT-2026.md) — retained source collection and market hypotheses. Its old rollout, programme assumptions and forecasts are not active strategy; known arithmetic and commission-basis problems are flagged at the top.
- [Historical Drive/referral research](../history/2026-10-strategy-baseline/growth/14-DRIVE-REFERRAL-SYNDICATION-PLAN.md) — programme and syndication leads require current confirmation.
- [Compensation evidence](../growth/C1-COMPENSATION-EVIDENCE-2026-10-16.md) and [eSIM/insurance evidence](../growth/C2-ESIM-INSURANCE-REVIEW-2026-10-16.md) — dated source records, not campaign instructions.

## Implementation references

- `src/components/AffiliatePartners.tsx` owns the canonical partner registry, fallback rules and promotion-expiry helpers.
- `src/components/KlookHotelOffers.tsx` owns the route-lazy Klook deep-link helpers and curated picks; keep them out of the eager registry module. `HOTELS_DATA` in `src/constants.ts` defines published hotel guides, not the search widget's city suggestions.
- `src/utils/analytics.ts`, `index.html` and the published GTM container participate in measurement. The audit identifies gaps; a data-layer push alone is not proof of GA4 receipt.
- [Hosted flight search](FLIGHT-WHITE-LABEL.md) records Page 24232, DNS, native deep links and provider activation evidence. `src/utils/flightSearch.ts` owns the website handoff; `public/travelpayouts-wl.html` is only a legacy compatibility bridge. `/api` delivery code is under `functions/api/`.
- [AGENTS.md](../../AGENTS.md) retains implementation conventions. Affiliate clicks, creator referrals, enquiries and approved commissions are distinct outcomes.

### Klook verification boundaries

- The registered fallback direction is `klookHotels → klook → kkday`. A general Klook programme pause overrides a still-active hotel-link entry in the deep-link helpers. Never append Klook's `u` or `sub_id` to a fallback URL; the Klook spotlight and updated attraction/experience deep-link CTAs hide when that programme is paused. This is not a claim that every legacy registry consumer has the same programme-level gate.
- `npm run verify:build` checks pause scenarios, published guide/pick mappings, EN/BN property links and lazy-module isolation. Guides without curated picks retain a generic collection handoff; do not invent property IDs or claim a city-prefilled hotel search without testing it.
- Run `npm run verify:klook:live` deliberately, not in CI. Probes use `verify_*` SubIDs so they can be excluded from visitor reports. `redirect-only` means the property path and affiliate marker survived, but HTTP 401/403/429 left page access unverified. Other error responses fail; a paused programme/link is reported as not tested, not a successful zero-link run.
- **4 November 2026 evidence:** a real Bangkok-card browser click reached `/hotels/detail/279724/` with `aff_pid=675992`, then displayed Klook's device check. All 12 automated property redirects matched their IDs and marker but returned HTTP 403. This does not establish bookable inventory, Travelpayouts report receipt, programme eligibility or commission earnings.
- The owner must separately confirm the browser test's `hotel_bkk_pratunam_vince` SubID in Travelpayouts Performance. Klook's final `aff_sid` field being empty does not itself establish whether Travelpayouts recorded the click.
