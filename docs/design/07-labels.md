# Label system audit — URAL

## Findings
- Tracked-caps labels (`tracking-widest/wider` + uppercase): **123 hits in 35 files** (Hallmark Floor 67).
- `uppercase` anywhere: **203 hits in 50 files**.
- DESIGN.md reserves uppercase tracked labels for section eyebrows, field labels, metadata.

## Decision needed
Keep one functional tracked-caps style, or retire tracked caps entirely. This is a brand decision, not a mechanical one — record the ruling in `01-gate-precedence.md` before any codemod.

## Action
- Decide ruling (open question to owner).
- Then apply by codemod in one pass; do not mix with page redesigns.
