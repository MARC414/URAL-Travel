# Bangladesh hub takeover — F02 execution record

**Lifecycle:** owner-authorised integration; known browser issue retained. **Date:** 23 November 2026.

## Scope and source

- Owner instruction: take over the previously proposed F02 task, correctly, one task at a time.
- Plan: `docs/superpowers/plans/2026-11-22-international-foundation.md`, F02.
- Design: `docs/superpowers/specs/2026-11-22-international-expansion-design.md`.
- Baseline: `eb725ed8a666947dc21699d1756da01b6b17b83c` (current GitHub main at takeover).
- Worktree: `E:\AI\Worktrees\bangladesh-hub-f02`; branch `fix/bangladesh-hub-f02`.
- Original shared checkout and all Claude worktrees remain untouched.
- Initial implementation permission excluded publication. The owner subsequently requested: "merge to the main repo, and sync with local. push commit." This authorises committing and integrating this scoped hub change into main, pushing it, and the resulting normal Cloudflare deployment workflow. It does not close the documented fragment-scrolling issue or authorise F03.
- Local sync permission: the owner selected "Backup then sync". Preserve conflicting local documents in a verified external backup before updating the original main checkout; leave unrelated images and non-conflicting files in place.

## Approach and bounded rulings

- Ruling: recover the F01 hub data/component found in unmerged commit `0418fe7`, after testing its public behavior, rather than bulk-merging that branch. Current main lacks these files; unrelated analytics, homepage, preservation tooling and rewrite scripts are excluded.
- Ruling: keep `BangladeshHubView` as a lazy route adapter taking an explicit `lang`; render the same `DepartureHub` in React and saved HTML. No browser-global locale inference and no nested `<main>`.
- Ruling: F02 owns only the new hub pair's head/body/schema/sitemap wiring and tests. Existing homepage inconsistencies remain for F03/F07; no global language-tag replacement.
- Ruling: a fresh build of current main supplies this task's route/body preservation baseline. The older unmerged R02 snapshot is not substituted for current main.
- Ruling: `/sitemap` and `/bn/sitemap` automatically enumerate all built routes. Permit only one added localized hub list item in each directory, proving the remaining body bytes unchanged; all other 308 existing bodies remain byte-identical. Omitting the pair from the directories would make their completeness claim false.
- Ruling: the existing BreadcrumbList builder correctly omits `item` on its final crumb. The new test follows that valid contract; no shared schema rewrite.
- Ruling: fix the review's OG-alternate drift and schema/sitemap guard gaps within F02, because head parity and fail-closed acceptance are part of this task. Tests demonstrated each failure before the fixes.
- Ruling: retain the existing fragment-restoration implementation. A temporary extra adapter effect was removed after browser diagnostics showed it did not solve the first-load scrolling problem; do not leave a speculative duplicate scroll handler in the route view.

## Acceptance checklist

- [x] Identify latest main and locate claimed F01 work without modifying it.
- [x] Create clean isolated worktree at latest main.
- [x] Install locked dependencies and establish fresh lint/build/verification baseline.
- [x] Observe failing tests for missing hub files and incomplete EN/BN rendering.
- [x] Recover reviewed F01 data/renderer; fix only hub-local misleading wording if needed.
- [x] Wire explicit-locale React view, localized metadata/breadcrumbs and shared CollectionPage schema.
- [x] Register English route and explicit Bengali body/graph through normal bilingual generation.
- [x] Add build guards for real files, metadata, links, section parity, structured data and sitemap.
- [x] Verify only two canonical paths are added; all existing titles/canonicals and 308 bodies stay unchanged; the two directories gain only their new hub entry.
- [x] Run focused tests, all existing test scripts, lint, build and verify:build.
- [x] Check plain direct load, language switch, Back and unknown-child 404 in browser/local HTTP.
- [ ] Resolve first-load fragment scrolling before final browser acceptance.
- [x] Review scoped diff; report evidence and stop before F03/publication.

## Evidence

Status: integration authorised with the known first-load fragment-scrolling issue still open. Core implementation is locally verified; the owner's merge/push request is not recorded as proof that the browser issue is fixed.

- Locked install succeeded after the first 120-second timeout; package/lock dependencies unchanged. npm reported its existing install-script policy warning for esbuild; no script-approval settings changed.
- Baseline `npm run lint`, `npm run build`, `npm run verify:build`: exit 0; 155 EN + 155 BN routes, all 618 checks.
- Initial SSR test: exit 1, `en: view must not nest main`.
- Initial built-page test: exit 1, `F02: missing saved hub page bangladesh.html`.
- New integrated `verify:build` guard before registration: exit 1, exactly two missing saved hub pages.
- Shared route-view test after recovery: exit 0, both languages have all five sections and the same 15 guide destinations.
- Registered build: exit 0, 156 EN + 156 BN routes. First verification exposed the new hub's material-edit date needing a route-scoped allowance in the existing lastmod guard, plus the test's incorrect final-breadcrumb assumption. Neither required changing existing routes or weakening general assertions.

## Final verification and open acceptance item

- Closing run after the final source changes: `npm run lint`, `npm run build`, `npm run verify:build`, and every `test:*` script: **47 commands, 44 test suites, zero failures**. Build verification: **653 checks**; generated **156 EN + 156 BN canonical routes**.
- `npm run test:bangladesh-hub-build -- --baseline C:\Users\HP\AppData\Local\Temp\opencode\f02-baseline.json`: exit 0. All 310 previous titles/canonicals unchanged; 308 body hashes unchanged; each directory differs only by one new localized hub list item; exactly two new canonical paths.
- `git diff --check`: exit 0. Dependency versions and lockfile unchanged. The verified implementation is prepared on `fix/bangladesh-hub-f02`; Git history records the integration revision.
- Review found OG alternate-locale drift after language switching and incomplete negative coverage for array-valued Offer schema and an extra English sitemap alternate. New tests failed first; the fixes now pass the mounted EN → BN → EN test and both negative controls. No second reviewer run was substituted for the test evidence.
- Browser direct EN/BN pages: one H1/main, all five sections, 15 correct localized guide links, matching descriptions, self-canonical and CollectionPage ID, exact hub alternates. Language switching and Back retain the query and `#money`, change the body/head language correctly, and restore the section beneath the header during in-app navigation.
- Responsive browser measurements at **390, 768 and 1280px**, both languages: no horizontal overflow, all five sections and 15 links present, body text 16px/18px, guide-link height at least 46px. The mechanical UI detector returned `[]`. Screenshot capture was unavailable; no screenshot-based visual approval is claimed.
- HTTP artifact verification used a read-only local static server with **no SPA fallback**: both hub URLs return 200; both `/bangladesh/not-a-guide` and `/bn/bangladesh/not-a-guide` return 404 with the existing noindex error page. Vite preview alone returns its SPA fallback for unknown paths, so it was not used as 404 evidence. This is local artifact verification, not a Cloudflare deployment test.
- **Open item:** on a first full-page load with `#money`, browser diagnostics show the section initially lands below the header, then the viewport returns to the top. Back and ordinary language switching restore the section. The later scroll's origin is not established; this issue is not declared fixed by green tests. A temporary adapter-restoration experiment passed its isolated test but did not solve the real browser observation and was removed.
- At the end of the initial implementation the original shared checkout and other worktrees were untouched, and no commit/push/merge/deployment had occurred. The later owner-authorised integration updates original local main after verified document backup. Other worktrees and unrelated owner assets remain outside the integration.

## Changed files

- UI/data: `src/components/BangladeshHubView.tsx`, `src/components/DepartureHub.tsx`, `src/data/departureHubs.ts`.
- Routing/SEO: `src/App.tsx`, `src/hooks/useSeoMeta.ts`, `src/utils/coreSeoCopy.ts`, `src/utils/departureHubSchema.ts`, `scripts/prerender.ts`.
- Verification: `scripts/bangladeshHubChecks.ts`, `scripts/test-departure-hubs.tsx`, `scripts/test-bangladesh-hub-build.ts`, `scripts/verify-build.ts`, `package.json`, `.github/workflows/ci.yml`.
- Generated source sitemaps: `public/sitemap.xml`, `public/sitemap.txt`.
- This execution record. No `dist/`, owner assets or unrelated branch changes are staged.

**Next single task:** diagnose and fix the first-load fragment scroll before closing its browser acceptance or starting F03. The authorised main push is limited to this hub implementation and its verification/evidence.
