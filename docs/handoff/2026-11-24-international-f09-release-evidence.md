# F09 release evidence — international foundation (24 November 2026)

This is execution evidence, not deployment approval. F10 still needs explicit owner
acceptance before any integration or publish step.

## 1. Exact command results

Run separately from a clean tree at `0273c43` plus the F09 working changes:

| Command | Exit code |
|---|---|
| `npm run lint` (regenerates scheduled posts, `tsc --noEmit`) | 0 |
| `npm run build` (157 EN + 156 BN canonical routes) | 0 |
| `npm run verify:build` | 0 |
| All 50 `test:*` npm scripts, run one by one | 50/50 passed, 0 failures |

Logs: `C:\Users\HP\AppData\Local\Temp\opencode\f09-release.log` and the numbered
`f09-*` logs in the same directory. No fixed assertion total is claimed here; the
counts are observations from this run.

## 2. Route/content preservation (R02 contract)

R02 tooling did not exist in the repo, so F09 created it red-first:

- `src/utils/routeBaseline.ts`: `RouteSnapshot`, `RouteBaseline`,
  `assertRoutePreservation()` and `captureBaselineFromDist()`. The comparison
  rejects removed routes, duplicate paths, canonical/title/H1/body drift and
  unexpected additions, and names the offending path in every failure.
- `scripts/capture-route-baseline.ts` with `npm run capture:route-baseline`.
- `scripts/test-route-preservation.ts` (8 checks, watched RED before implementation),
  wired as `npm run test:route-preservation` in package.json and CI.
- `verify-build.ts` now compares a fresh dist against the fixture using the
  manifest, failing the build on any unapproved drift.

Baseline: revision `16c92ad` (the parent of the first Bangladesh-hub commit),
built in a detached worktree with a linked `node_modules`; fixture
`scripts/fixtures/route-baseline-pre-international.json` (310 routes). Current
build: 313 routes. Diff:

- Added (3): `/bangladesh`, `/bn/bangladesh`, `/uk` — all in the manifest.
- Removed: none.
- Changed (21): home pair; `/costs` + `/bn/costs` and `/bn/flights` (F08 directory
  intros); `/sitemap` + `/bn/sitemap` (hub list additions and home title refresh);
  14 UK pillar articles in EN and BN. The article-body drift was traced to the
  eVisas UK context injected by the separately authorised PR #150, which postdates
  the baseline — not an article rewrite by F01–F09.
- The precise allow-list and reasons are in
  `docs/releases/2026-11-24-international-manifest.json`.

## 3. Saved pages and running browser

Representative set: `/`, `/bn/`, both Bangladesh hubs, `/flights/dhaka-kathmandu`,
`/visa` + `/bn/visa`, `/costs` + `/bn/costs`, `/banking`, `/destinations`, one UK
article pair, and a nonexistent URL.

- Saved HTML: parsed by the capture tool for every route (one H1, canonical, title,
  main body present); the 313-route comparison above proves no unapproved body or
  metadata change on any other page.
- Running browser (local `vite preview`, default harness viewport 800x592): all
  representative pages listed above loaded with one H1 and no error boundary. The
  404 route showed "This Travel Page Doesn't Exist" with `noindex, follow`.
- Methodology note: calling `browser.stop()` on a tab aborts in-flight lazy chunk
  fetches and produces a false "Failed to fetch dynamically imported module"
  error. The successful pass above waited for load without stopping the tab; the
  chunk was confirmed served normally when requested directly.

## 4. Coverage already enforced elsewhere

Money/date/source omissions and labelled cache states are covered by the rates
and travel-tool suites; no fake availability or counts are added by F01–F09;
affiliate journey, answer-desk, sitemap, flight, widget, locale and hub suites
are among the 50 green suites. No eager-JS or font budget measurement was added
in this pass.

## 5. Unresolved / not claimed

- `/destinations` renders **two `<main>` landmarks after hydration** (the saved
  HTML has one). It is pre-existing and outside the release-proof scope; it is
  recorded here rather than silently patched.
- No viewport-resize control exists in this browser harness, so the
  390/768/1280 and 320px stress matrix, native new-tab, full consent
  grant/withdraw and blocked-storage matrix were not executed here. F08's mounted
  checks cover 390/768/1280 for the header; that is not a real-device sweep.
- Field Core Web Vitals and Lighthouse were not measured. Nothing here claims a
  performance score.
- No live/partner-dashboard check (PR receipt, provider acceptance) was performed.

## 6. Stop condition

One implementation preview and this evidence are presented to the owner. Await
explicit scope/integration/deployment acceptance before F10. No push to `main`,
no deploy hook, no IndexNow submission and no unrelated scheduled publication.
