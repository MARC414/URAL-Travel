# Impeccable (vendored)

**Source:** https://github.com/pbakaus/impeccable
**Version:** 4.5.2
**License:** Apache 2.0 — see [`LICENSE`](./LICENSE) and [`NOTICE.md`](./NOTICE.md)

Design guidance skill + deterministic anti-pattern detector, vendored into this project so
that every contributor and AI agent gets the same design guardrails without a network
install step.

## Why this is committed

The site is built and maintained with AI assistance. That means design rules that live only
in a person's head do not survive — they drift. This project already has one scar from
exactly that failure: `--font-serif` named "Lora" and "Playfair Display" for months while
neither file was ever shipped, so 205 headings silently rendered in Georgia/Cambria/Times,
and the Privacy Policy page rendered every heading in Inter because three shared title
classes did not set a font-family (see `docs/history/2026-10-impeccable-application.md`).

`PRODUCT.md` and `DESIGN.md` at the repo root are the written rules. This skill is the
tooling that reads them.

## How to use it

The skill is consumed by Claude Code (`.claude/skills/` + `.claude/agents/`), not by the
build. It is **not** imported by `src/`, does not appear in `dist/`, and has zero effect on
visitors or on the performance budget asserted in `scripts/verify-build.ts`.

```bash
npx impeccable detect src/ index.html     # run the 59-rule detector
npx impeccable detect <url> --viewport 390x844   # needs a Chromium browser
```

Then, inside Claude Code: `/impeccable <command> <target>` — e.g. `audit`, `critique`,
`polish`, `typeset`.

## Local modifications from upstream

Only one, and it is mechanical: internal path references were rewritten from
`.agent/skills/impeccable/` to `.claude/skills/impeccable/` (16 files, 75 references) to
match this project's provider directory. Skill content is otherwise byte-identical to
upstream v4.5.2.

## Updating

```bash
npx impeccable update
```

Re-apply the path rewrite afterwards if the install target differs. Impeccable's README
documents `npx impeccable install` as the supported path; it requires
`impeccable.style` to be reachable, which is why the bundle is committed here.

## Detector configuration

`.impeccable/config.json` records deliberate deviations from the detector's defaults, each
with a written reason. Currently one entry: `overused-font` for **Inter**, because this
project's Inter is self-hosted, subsetted, and metric-matched to Noto Sans Bengali via
`size-adjust`, which makes it load-bearing for bilingual layout rather than an unexamined
default. See `DESIGN.md` → Typography.
