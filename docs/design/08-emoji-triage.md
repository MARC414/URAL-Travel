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

## Ruling (owner decision, 25 Nov 2026)
Keep emoji where they are part of a text label (e.g. badge strings like "🧳 MUSEUM SECURITY"). Replace only when an emoji is used as a standalone icon. Apply per-file during page redesigns.
