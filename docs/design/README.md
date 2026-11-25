# Design — URAL Travel Intelligence

This folder holds the design audit and planning artefacts for the URAL site.
It is **plan-only** by default: nothing here deploys or merges without explicit owner approval.

## Precedence (who wins when two rules disagree)

1. `DESIGN.md` (repo root) — the locked visual contract.
2. Impeccable — vendored at `.claude/skills/impeccable` (project-configured, includes the `overused-font` deviation for Inter).
3. Hallmark — external gates, used in **audit mode only** (no themes, no scaffold, no stamp).

Any Hallmark Floor finding that contradicts `DESIGN.md` is waived **on record**, not silently obeyed or dropped.

## Waiver log

| Date | Gate | Reason |
|---|---|---|
| 2026-10-13 | impeccable `overused-font` (Inter) | Inter is self-hosted, subsetted, metric-matched to Noto Sans Bengali via `size-adjust`; load-bearing for bilingual layout. See `DESIGN.md` → Typography. |
| (planned) | Hallmark Floor 13 (~80 words/screen) | Does not apply to Read-mode pages (long-form guides). Enforced on Persuade/Operate surfaces only. |
| (planned) | Hallmark Floor 12/44b (hero fits 1280×800) | Homepage hero is excluded from redesign by owner decision. Applies to money-page heroes only. |

## Scope
- Hero of the homepage is **excluded** (owner decision, 6 Nov 2026).
- All other pages and sections are in scope.
- Nothing deploys or merges to `main` without explicit owner instruction.

## Status
Tier 0 foundation: steps 1–4 complete (docs created). Step 5 (baseline capture) pending tooling (puppeteer).
