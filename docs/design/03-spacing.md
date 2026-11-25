# Spacing audit — URAL

## Declared scale (src/index.css)
- `--section-py: 5rem` (80 px) — all sections
- `--section-py-sm: 3rem` (48 px) — smaller sections
- `--route-stack-gap: 2.5rem` (40 px) — between major route sections
- `--route-stack-gap-mobile: 1.75rem` (28 px)
- `--container-px: 1.5rem` (24 px) mobile side padding
- `--container-max: 1200px`
- Tailwind default scale (0.25 rem steps) is also used heavily.

## Findings
- Raw arbitrary spacing (`p-[…]`, `m-[…]`, `gap-[…]`) in `src/`: **1 hit**. Essentially clean — the scale is respected in TSX.
- Off-scale values (13.5 px, 14.5 px, 15 px one-offs) are the real drift; normalise as touched.
- Section rhythm is consistent (`80 / 48 / 40 / 28`) per DESIGN.md.

## Action
No global codemod needed. Normalise off-scale values when a file is already being edited (Hallmark Finish, not Floor).
