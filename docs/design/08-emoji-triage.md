# Emoji triage — URAL

## Findings
- Emoji glyphs in src/: **243 hits in 24 files** (Hallmark Floor 30a — never an emoji as an icon).

## Top offenders
| File | Count |
|---|---|
| `src/data/tiqetsAttractionsData.ts` | 37 |
| `src/App.tsx` | 31 |
| `src/components/GlobalAttractionsHub.tsx` | 30 |
| `src/components/AffiliatePartners.tsx` | 29 |
| `src/components/SitemapPage.tsx` | 22 |
| `src/components/PriceAlertModal.tsx` | 16 |
| `src/routes/DestinationsRouteView.tsx` | 10 |
| `src/utils/shareCaption.ts` | 10 |

## Action
Classify each: **icon** (replace with `lucide-react`), **content** (keep, e.g. flag in a country name), or **delete**. `lucide-react` is already a dependency (62 import sites). Apply per-file, not globally, so context is preserved.
