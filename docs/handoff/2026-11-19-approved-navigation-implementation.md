# Handoff — Approved navigation implementation — 19 November 2026

**Goal:** implement the approved navbar and mega menus in the real website while preserving URAL's design, URLs and affiliate earning paths.

**Lifecycle:** implemented and verified locally; owner authorized push/merge; **production acceptance not observed**.
**Branch:** `feat/approved-navigation`, base `0e83b102e2c6b37c20a3c72311ef9b7805168c03`.
**Workspace:** `E:\AI\Worktrees\approved-navigation`. Application source is committed through
`443f20a`; the archive/integration documentation follows it. The original checkout and its five owner
images remain untouched.

## State

- Owner approved the revised visual preview and explicitly authorized **native execution**.
- Implemented: two-row header, seven tasks, four desktop mega menus, equivalent EN/BN mobile groups,
  publication-aware link records, active task state, native anchors/disclosures, existing search and
  Email Updates action, coordinated consent/search/navigation, footer labels/discovery and no-JS navigation.
- Destinations: **Middle East → Europe & UK → Asia → Americas**; Saudi/Hajj/Umrah leads,
  London leads Europe & UK, Pakistan retains its Azad Kashmir/Neelum Valley subtitle and existing path.
- Independent review: 0 Critical, 2 Important, 0 Minor. Both material findings were independently
  reproduced and fixed in one pass, with passing regressions; no cosmetic redesign or second review.
- Final 46-command CI passed on `443f20a` (including lint/build/verify:build and 618 build checks);
  the earlier `9d9d080` run is superseded. Owner then instructed push and merge.
- Not started: post-deployment production acceptance, wider catalogue/article/trust repairs, new
  UK/Pakistan visa publication or authenticated GTM/GA4/partner receipt checks.

## Files

- `src/data/navigation.ts`, `src/utils/navigation.ts` — bilingual published records, region/group order,
  locale/query/fragment preservation, active tasks and visible search-focus fallback.
- `src/components/SiteHeader.tsx` — actual desktop disclosures and responsive drawer, focus/scroll containment.
- `src/App.tsx` — header integration, existing search/signup callbacks and internal footer alignment;
  route bodies and commercial/support bands retained.
- `src/components/StaticSiteNavigation.tsx`, `scripts/prerender.ts` — the same targets in native saved-HTML
  navigation, replaced by React on mount; search index still derives from page bodies.
- `src/components/ConsentBanner.tsx`, `src/components/GlobalSiteSearch.tsx`,
  `src/components/LanguageSwitcher.tsx`, `src/index.css` — actual consent visibility, first-party overlay
  visibility and native language controls; categories, provider gating and brand tokens unchanged.
- `scripts/test-navigation.ts`, `scripts/test-site-header.tsx`, existing signup/KKday tests,
  `scripts/verify-build.ts`, `package.json`, `.github/workflows/ci.yml` — publication, behaviour and
  saved-HTML regressions; no deployment configuration changes.
- `DESIGN.md`, strategy index and navigation spec — durable implementation rules and honest lifecycle.
- Deliberately unchanged: affiliate registry, Page 24232/flight helper, eVisas configuration,
  redirects, authored articles and English/Bengali metadata, source assets and committed feeds.

## Verification evidence

- Fresh `npm ci` exited 0; the clean committed baseline passed **44 CI commands**.
- Latest direct header regression run: **17 behavioural checks passed**, covering disclosures,
  modifier clicks, drawer keyboard/scroll, search handover, Email Updates, real consent visibility,
  saved-HTML parity, incoming fragments, first-party portal CSS, short-window scroll containment
  and lazy fragment restoration/cancellation.
- Actual browser: **46 EN/BN viewport/menu states** at 1280, 1000, 768, 390 and 320px,
  plus native pointer/keyboard, Escape/Enter/Space, Back, city filters, locale/query/fragment,
  search, signup, consent and no-JS interactions. **0 layout problems and 0 uncaught errors**
  in that sample. Six additional review-regression cases passed: 1280×600 EN/BN React/no-JS
  lower-link scroll/keyboard/click reachability, locale/Back target position, and initial lazy fragment
  plus normal page-top navigation. Four short-window captures supplement the 19 full-matrix captures.
- Preservation: **310 built canonical paths retained; 310 `<main>` bodies byte-identical** to the
  clean baseline, one static navigation block on every page, ten protected integration/content/feed
  files unchanged. The committed source sitemap has 272 paths; both builds have 310 including
  the same 19 existing scheduled posts per locale. No article was authored or live-published here.
- UI detector exited 0 on touched components/CSS. Navigation 14px links and 18px panel titles match
  the approved design; pre-existing typography/print/error-color advisories remain outside this task.
- Final source `443f20a` passed **all 46 CI commands**, including lint, build and **618 build checks**.
  Eager JavaScript measured **169.5 KB gzip** against the unchanged **185 KB ceiling**. The build
  generated 155 English + 155 Bengali routes, skipped IndexNow and left protected feed/config hashes
  unchanged. This is a local Windows run, not a claim of remote GitHub CI or live production acceptance.
  The earlier full run on `9d9d080` is superseded.

Local evidence lives in `.impeccable/review/` (screenshots, `implementation-checks.json`,
`preservation-checks.json`, `review-regressions.json`, `independent-review.md`, `detector.json`)
and the plan-scoped ignored scratch directory
`.superpowers/sdd/2026-11-19-approved-navigation/` (CI logs, task briefs and rulings).
These are not deployable assets. `inspection-diagnostic.json` is an earlier failure record, not
the final browser result. Before scratch cleanup, preserve the final evidence outside the repository.

## Decisions and why

- Native implementation reused the existing design and callbacks rather than shipping the external
  prototype or introducing a new account/search service.
- Home/About remain visible below 1280px; compact drawer groups replace cramped desktop links.
- Supplier promotions were removed from navigation, not from existing service/partner doorways.
  Provider identity and affiliate disclosures remain on commercial actions and relationship pages.
- Actual consent visibility takes priority over navigation; a dismissed but mounted lazy banner
  must not disable the drawer. Full search and navigation do not compete for focus/scroll locks.
- The third-party body safety valve excludes only explicitly marked first-party overlays; it was
  not disabled globally. Search focus cannot return to a removed drawer child.
- Three destination checks now inspect `<main>` rather than banning a legitimate global Things
  to Do link. Their negative control still catches unsuitable generic editorial actions.
- No-JS navigation offers native links/details and an honest guide-directory link. Interactive
  search/signup still require JavaScript; the fallback does not simulate either form.
- UK visitor visa publication precedes Pakistan visa later; no unpublished guide link was added.
- Short desktop menus scroll inside their viewport-bounded surface rather than pushing lower links
  beyond the visible window. This applies to React and native no-JS navigation.
- Fragment-bearing routes wait for the real localized/lazy target and fonts before restoring its
  position; routes without fragments retain ordinary page-top behaviour.

## Dead ends and corrections

- The first baseline attempt overlapped RED test creation, so TypeScript saw missing implementation
  modules. Repeating in a clean `git archive` snapshot passed all 44 commands; no baseline fix.
- Edge review profiles inside the repository caused `EBUSY` on Cookies in Vite's watched tests.
  Test-only profiles were moved outside the repo; do not place browser profiles in a watched worktree.
- DOM `.click()` did not reproduce native focus; inspection uses trusted CDP pointer events.
  Native Enter/Space required text and non-character keys `rawKeyDown`; no extra production key handlers.
- Cookie lazy-mount state, dropped first-load fragments and CSS-hidden body portals produced real
  failures. Each received a failing regression before its narrow fix.
- The independent review reproduced two further defects in the built site: clipped lower links in a
  1280×600 menu and fragment URLs scrolling to page top. Both were reproduced RED in
  `test-review-regressions.mjs` before the shared surface/route fixes, then re-run GREEN.

## Next step

Verify the merged `main` build and, if the host deploys automatically, observe production navigation
after deployment. Do not treat the local evidence as proof of bookings, commissions or authenticated
analytics receipt.

## Open questions and limitations

- Production integration was owner-approved on 19 November 2026. If the host auto-deploys from `main`,
  live acceptance still needs to be observed; no deployment receipt was available when this was written.
- Code and navigation checks do not prove bookings, approved commissions, payouts or authenticated
  GTM/GA4 event receipt. Catalogue metadata/accessibility claims and wider editorial parity debt remain separate.
- No physical-device, screen-reader, Lighthouse or field Core Web Vitals score was measured here.
- `npm ci` reported one low-severity advisory; follow-up audit could not reach the registry (`EAI_FAIL`).
  No dependency upgrade or audit repair was authorized or performed.
- No live form submissions, bookings, optional partner-consent grants, deployment hooks or IndexNow
  submissions were initiated. Scripted inspection suppressed external requests.

## Getting back to work

```powershell
$env:INDEXNOW_SUBMIT = '0'
npm run lint
npm run build
npm run verify:build
npm run test:navigation
npm run test:site-header
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Preview: `http://127.0.0.1:4173/` and `/bn/`. CI sequence is defined by `.github/workflows/ci.yml`;
all 46 commands must pass on final source before reporting implementation verification complete.
