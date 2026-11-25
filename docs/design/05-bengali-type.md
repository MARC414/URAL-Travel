# Bengali type audit — URAL

## Known good
- Inter is self-hosted, subsetted, metric-matched to Noto Sans Bengali via `size-adjust` (the `overused-font` Impeccable deviation exists for this reason).
- Bengali glyphs in a `font-serif` heading resolve to Noto Sans Bengali — expected and correct.
- `.ural-page-title` and `.ural-section-title` set `font-family` themselves (fixed after the Privacy Policy regression).

## Risks (to verify per template)
- Line-height ≥ 1.5 for BN body; headings use `leading-relaxed tracking-normal` for BN (already in `DepartureHub`).
- Mixed EN/BN strings (e.g. airport codes, prices) must not break wrap.
- Hallmark gates (body 16 px, leading 1.5–1.65) do not know about Bengali glyph height — needs a manual BN pass per template.

## Action
Every redesign spec (Phase 3) must include a "Bengali delta" row and every PR a BN screenshot check. No automated guard exists yet.
