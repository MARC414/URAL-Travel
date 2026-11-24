# International foundation — release summary (24 November 2026)

Status: **integrated in `main`, deployment pending explicit owner approval.**
This is a record of the exact source set landed, not a publish authorisation.

## 1. Scope and approval

- Owner direction: "start F10" on 24 November 2026, following the merged F09
  release-proof branch. Integration work may proceed; the UI deploy/push to `main`
  still requires a separate explicit "deploy" instruction because a push may
  deploy through the owner's normal process.
- Scope: the international foundation slice F01–F09 only. Readiness (R) and
  growth/pilot (G) companions, extra languages, a domain change and Europe/rail
  expansion remain unapproved and are not part of this release.
- Landed revision set: baseline `16c92ad` (pre-hub) → `6a1da70` (F09 PR #157).
  Merged PRs in this range include #148–#157, including the F04 homepage hotfix,
  the /uk repair (#153), scoped locale policy (#154), discoverability (#155),
  F08 copy/viewport completion (#156) and release proof (#157).

## 2. Staging audit (before any integration)

In the owner's main checkout, `git status --short` shows only the six known
untracked owner-supplied files (the navigation plan and five images) and no
staged changes. `git ls-files dist` is empty, and no key/credential file is
tracked (`.env.example` is a documented template with no live values). Raw
evidence logs live under the temp directory, not in the repository. If CI
regenerates scheduled posts or other source during the release build, rerun the
route-manifest comparison before publishing.

## 3. What is actually in the source set

- Bangladesh EN/BN departure hub and its reciprocal hreflang/sitemap pair.
- Repaired, English-only `/uk` hub: seven UK pillar posts, one `<main>` landmark,
  `en-gb` + x-default only, `og:locale` `en_GB`, hub-dated lastmod, footer link.
- International homepage: unselected departure/destination (`null` props, no
  fabricated airport, no Dhaka quick routes), localized guidance, mounted
  regression tests; legacy deep calls keep their DAC/KTM defaults.
- Currency: hosted flight search maps Bangladesh gateways to BDT, UK gateways
  to GBP and everything else to USD; a visitor's explicit choice wins. The
  estimator and Umrah worksheet keep their BDT/USD display set. This is a
  planning reference, not a transaction quote; dated rates are still required
  for converted published totals.
- Scoped locale policy (`src/utils/pageLocale.ts`) used by both the saved head
  and the mounted client, so stale alternate tags cannot accumulate on route
  changes. Deep English guides keep their shipped `en`/`en_US` values.
- Discoverability: hub entry in Guides & Tools → Prepare, footer/home links in
  both locales, hub entries in the generated site-search index with ranking
  support; approved primary labels and geographic order unchanged.
- Release guard: R02-style route preservation fixture and manifest; 310 baseline
  routes → 313 built routes, with three approved additions and 21 approved
  changes, all named and justified.

## 4. Evidence and unresolved items

Full execution evidence:
[`2026-11-24-international-f09-release-evidence.md`](2026-11-24-international-f09-release-evidence.md).
Key facts: lint/build/verify:build exit 0; 50/50 test suites pass; 313-route
preservation guard passes. Unresolved and deliberately not claimed: the full
320–1280px real-device consent/keyboard matrix, field Web Vitals/Lighthouse,
live partner-dashboard receipts, and a pre-existing nested `<main>` on
`/destinations` after hydration. Those are recorded, not hidden or patched here.

## 5. Post-deployment checks (owner approval first)

After the owner approves deployment and CI finishes, check on the live domain:

1. `/` and `/bn/` canonical, `<html lang>`, `og:locale`, reciprocal hreflang and
   visible body; homepage widget starts unselected and has no error box.
2. `/bangladesh` and `/bn/bangladesh` pair: one H1, one `<main>`, matching
   sections/destinations, localized next steps, no cross-hub alternates.
3. `/uk`: one `<main>`, seven UK cards, `en-gb` + x-default only, no `bn`/`bn-bd`
   alternate, `og:locale` `en_GB`, footer link present.
4. Representative old routes (Dhaka flight, visa, cost, banking, destination and
   a blog article pair): titles, H1, bodies, canonicals and curated destinations
   unchanged from the manifest; 404 still `noindex, follow`.
5. Currency handoff: DAC → BDT, LHR → GBP, JFK → USD, manual override survives
   origin change and swap; rates/consent states and direct partner links remain.
6. Re-run `npm run verify:build` locally and the manifest comparison if CI
   changed any generated source during the release build.

## 6. Regression handling and review window

Use an owner-approved targeted fix, or revert only this release's own commits,
if a check fails. Never reset or discard another tool's work or the six owner
untracked files. Set the formal review window from the **actual deployment date**
(the date above is the integration/preparation date, not a deployed-release
claim). Until then, F10 items 2 and 3 stay unchecked in the plan.
