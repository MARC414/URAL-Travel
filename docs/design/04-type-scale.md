# Type scale audit — URAL

## Declared ramp (src/index.css)
| Step | Size | Role |
|---|---|---|
| text-xs | 12 px | metadata, badges |
| text-sm | 14 px | nav links, labels |
| text-base | 16 px | body copy |
| text-lg | 18 px | card titles |
| text-xl | 20 px | section subheadlines |
| text-2xl | 24 px | section headings |
| text-3xl | 30 px | major section titles |
| text-4xl | 36 px | page headings |
| text-hero | 56 px | hero H1 desktop |

## Findings
- Sub-12 px arbitrary sizes (`text-[Npx]` with N ≤ 11): **396 hits** in src/.
- `text-xs` (12 px) usages: **770**.
- PR #27 raised a 9 px step to 10 px; 9 px is now a defect, not a step.
- Two micro steps remain: `label-micro` (11 px, ~189 usages) and `label-micro-sm` (10 px, ~185 usages). Nothing below 10 px.

## Action
- Treat any new text below 10 px as a defect.
- Normalise 13.5 / 14.5 / 15 px one-offs to the nearest ramp step when a file is touched.
- Bengali glyphs need ≥ 1.5 line-height; verify per template (see 05-bengali-type.md).
