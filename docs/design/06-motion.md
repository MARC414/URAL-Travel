# Motion audit — URAL

## Findings
- `transition-all`: **104 hits in 26 files** (Hallmark Floor 10a — never `transition: all`).
- `100vw`: **29 hits in 19 files** (Hallmark Floor 34).
- `h-screen`: **2 hits** (`App.tsx`, `UkHubView.tsx`) — use `dvh`/`svh`.
- `prefers-reduced-motion` coverage: not yet measured; needs per-file check.

## Action
- Replace `transition-all` with named properties when a file is touched.
- Replace `100vw` with `100%` + `overflow-x: clip` on `html`/`body`.
- Add `prefers-reduced-motion: reduce` fallback to every animation; verify in Phase 6.
