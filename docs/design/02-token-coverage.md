# Token coverage audit — URAL

Scanned 187 files in src/. Found **762 hex colour references**, of which 16 distinct values are declared tokens in src/index.css.

## Declared tokens (src/index.css) — the source of truth

| Token | Value |
|---|---|
| `--color-brand-navy` | #0B1426 |
| `--color-brand-emerald` | #0F4A3F |
| `--color-brand-ivory` | #F5F1E8 |
| `--color-brand-gold` | #F6B73C |
| `--color-brand-gold-dark` | #D4941A |
| `--color-brand-gold-ink` | #8A5A00 |
| `--color-brand-gold-light` | #FDF0CC |
| `--color-navy-deepest` | #0B1426 |
| `--color-navy-dark` | #0B1426 |
| `--color-navy-mid` | #1E293B |
| `--color-navy-soft` | #334155 |
| `--color-bg-white` | #FFFFFF |
| `--color-bg-light` | #F5F1E8 |
| `--color-bg-subtle` | #FBF9F4 |
| `--color-text-primary` | #0B1426 |
| `--color-text-secondary` | #475569 |
| `--color-text-muted` | #64748B |
| `--color-border-faint` | #F1F5F9 |
| `--color-border-subtle` | #E2E8F0 |
| `--color-border-default` | #CBD5E1 |
| `--color-surface-soft` | #F1F5F9 |
| `--color-text-white` | #FFFFFF |

## Top 20 arbitrary hex values (by usage count)

| Hex | Count | Nearest declared token |
|---|---|---|
| #f6b73c | 555 | _classify_ |
| #ffc654 | 22 | _classify_ |
| #07c369 | 20 | _classify_ |
| #ffffff | 12 | _classify_ |
| #0b192c | 11 | _classify_ |
| #0b1426 | 11 | _classify_ |
| #06ad5d | 10 | _classify_ |
| #d4941a | 10 | _classify_ |
| #071120 | 9 | _classify_ |
| #f5ad24 | 5 | _classify_ |
| #e5a832 | 5 | _classify_ |
| #64748b | 5 | _classify_ |
| #081322 | 4 | _classify_ |
| #1e3a5f | 4 | _classify_ |
| #000 | 4 | _classify_ |
| #00b67a | 4 | _classify_ |
| #8a5a00 | 4 | _classify_ |
| #b8860b | 3 | _classify_ |
| #1a365d | 2 | _classify_ |
| #ffd26a | 2 | _classify_ |

## Top 12 files by arbitrary hex count

| File | Count |
|---|---|
| /src/App.tsx | 129 |
| /src/components/TravelpayoutsWidget.tsx | 57 |
| /src/components/PrivacyPolicyPage.tsx | 44 |
| /src/components/TravelpayoutsCustomWidget.tsx | 43 |
| /src/routes/DestinationsRouteView.tsx | 42 |
| /src/index.css | 36 |
| /src/components/UmrahLandingPage.tsx | 32 |
| /src/components/PartnerLogoMarquee.tsx | 31 |
| /src/components/GlobalAttractionsHub.tsx | 29 |
| /src/components/InteractiveTools.tsx | 20 |
| /src/components/ConsentBanner.tsx | 17 |
| /src/components/ExperiencesPage.tsx | 17 |

## Classification guide (to be filled in)

- **Replace** — swap to nearest declared token (the majority).
- **Promote** — genuinely new colour, add to `@theme` (max ~6 new tokens).
- **Exception** — one-off with a written reason (e.g. a partner brand colour).

## Promotions applied (owner decision, 25 Nov 2026)
- `--color-brand-gold-bright: #FFD783` added to `src/index.css` `@theme`. `EditorialPageHero.tsx` now uses `text-brand-gold-bright` / `[&_a:hover]:text-brand-gold-bright` instead of `text-[#FFD783]`.

Values appearing 5+ times that have no close token match: review the top-20 table above and decide per value. Suggested: `#FFD783` (gold highlight on navy, used in EditorialPageHero) → promote as `--color-brand-gold-bright`.

---
Generated 2026-11-25 by Tier 0 scan.