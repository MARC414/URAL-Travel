# Label system audit — URAL

## Findings
- Tracked-caps labels (`tracking-widest/wider` + uppercase): **123 hits in 35 files** (Hallmark Floor 67).
- `uppercase` anywhere: **203 hits in 50 files**.
- DESIGN.md reserves uppercase tracked labels for section eyebrows, field labels, metadata.

## Ruling (owner decision, 25 Nov 2026)
Keep tracked caps for section eyebrows only (per `DESIGN.md` Label role: `--ls-widest: 0.12em` when uppercase). Retire tracked caps from table heads, tags, nav links and metadata. Apply per-file during page redesigns, not as a global codemod.

## Action
- Decide ruling (open question to owner).
- Then apply by codemod in one pass; do not mix with page redesigns.
