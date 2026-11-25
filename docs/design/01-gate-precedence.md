# Gate precedence — URAL

When two design authorities disagree, this list is the arbiter. Record any new ruling here before acting on it.

## Authorities (highest to lowest)
1. `DESIGN.md` (repo root) — locked visual contract.
2. Impeccable (vendored, `.claude/skills/impeccable`) — project-configured; includes the `overused-font` deviation for Inter.
3. Hallmark (external) — used in **audit mode only**: Floor/Reflex/Finish gates, `sloplint`, `audit`/`redesign` verbs. No themes, no scaffold, no stamp.

## Rulings

| # | Hallmark says | URAL reality | Ruling |
|---|---|---|---|
| 1 | Floor 9/67: never an eyebrow, never tracked-caps labels | 123 hits in 35 files | `DESIGN.md` decides per case. Retire decorative ones; keep one functional label style. |
| 2 | Floor 13: ~80 words per screen | Long-form Read pages carry 1,500+ words | Waive in **Read** mode; enforce in **Persuade/Operate** mode. |
| 3 | Floor 1: every colour through a token | 656 arbitrary hex + 5,533 arbitrary classes | Uphold. Biggest real win. |
| 4 | Floor 30a: never emoji as an icon | 243 glyph hits in 24 files | Uphold where it is an icon; data strings are exempt. |
| 5 | Floor 10a: never `transition: all` | 104 hits in 26 files | Uphold. |
| 6 | Floor 34: never `100vw` | 29 hits in 19 files | Uphold. |
| 7 | Floor 63: never middle-dot meta strings | 198 hits (70 in blog body — content, exempt) | Judge case by case. |
| 8 | Floor 12/44b: hero fits 1280×800 | Homepage hero excluded by owner | Applies to money-page heroes only. |
| 9 | Hallmark CSS stamp on line 1 | URAL has `DESIGN.md` + Tailwind | No stamp. Hallmark runs in audit mode only. |
| 10 | Impeccable detector (59 rules, `overused-font` deviation) | Applied in PR #27 | Impeccable stays authoritative for URAL-specific rules; Hallmark is the second opinion. |

## Open rulings (need owner decision)
- Tracked-caps labels: keep one functional style, or retire entirely? (see `07-labels.md`)
- Bengali type: no automated guard exists; manual BN pass per template required.
- LCP preload: per-route `lcpImageUrl` added only where a hero image exists.

## Waiver log
| Date | Gate | Reason |
|---|---|---|
| 2026-10-13 | Impeccable `overused-font` (Inter) | Self-hosted, subsetted, metric-matched to Noto Sans Bengali via `size-adjust`. |
| (planned) | Hallmark Floor 13 (~80 words/screen) | Does not apply to Read-mode pages. |
| (planned) | Hallmark Floor 12/44b (hero fits 1280×800) | Homepage hero excluded by owner decision. |
