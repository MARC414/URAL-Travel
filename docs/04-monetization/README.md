# 04 — Monetization and affiliate references

[Strategy index](../../00-URAL-STRATEGY-INDEX.md) · [Current audit](../../00-URAL-CURRENT-AUDIT.md)

URAL's model is editorial travel intelligence with affiliate referrals and a human-contact path. The current audit records unresolved handoff, attribution and desk-fulfillment questions; this folder does not introduce a new revenue plan.

## Supporting research

- [Travel affiliate research report](DEEP-RESEARCH-TRAVEL-AFFILIATE-MONETIZATION-REPORT-2026.md) — retained source collection and market hypotheses. Its old rollout, programme assumptions and forecasts are not active strategy; known arithmetic and commission-basis problems are flagged at the top.
- [Historical Drive/referral research](../history/2026-10-strategy-baseline/growth/14-DRIVE-REFERRAL-SYNDICATION-PLAN.md) — programme and syndication leads require current confirmation.
- [Compensation evidence](../growth/C1-COMPENSATION-EVIDENCE-2026-10-16.md) and [eSIM/insurance evidence](../growth/C2-ESIM-INSURANCE-REVIEW-2026-10-16.md) — dated source records, not campaign instructions.

## Implementation references

- `src/components/AffiliatePartners.tsx` owns the canonical partner registry, fallback rules and promotion-expiry helpers.
- `src/utils/analytics.ts`, `index.html` and the published GTM container participate in measurement. The audit identifies gaps; a data-layer push alone is not proof of GA4 receipt.
- `public/travelpayouts-wl.html` is the white-label implementation; `/api` delivery code is under `functions/api/`.
- [AGENTS.md](../../AGENTS.md) retains implementation conventions. Affiliate clicks, creator referrals, enquiries and approved commissions are distinct outcomes.
