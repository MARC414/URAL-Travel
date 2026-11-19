# Approved URAL Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The owner must review this plan and choose execution method before implementation.

**Goal:** apply the owner-approved two-row navbar, four mega menus and equivalent EN/BN mobile navigation without changing existing URLs, page bodies or affiliate integrations.

**Architecture:** a small typed navigation model supplies desktop and mobile membership; one focused `SiteHeader` component owns disclosure/drawer state. `App.tsx` retains routing, lazy full-site search, language and subscription actions. Existing footer layout remains; internal labels/membership align with the header, with static navigation emitted from the same model during prerendering.

**Tech Stack:** existing React 19, TypeScript, Vite 6, Tailwind CSS 4, lucide-react, tsx/node:assert and happy-dom. No added dependencies.

**Spec:** [navigation design](../specs/2026-11-19-navigation-and-earning-flow-design.md), particularly sections 4–5, navigation portions of 7–8, and the 19 November visual-approval resolution. Wider catalogue/trust work in sections 6/9 is **not this subproject**.

## Global Constraints

- Owner visual approval: "yes, approved", 19 November 2026. Final deployment approval remains pending.
- Utility row: **Home · About Us · Our Partners · Contact | Search · WhatsApp · EN / বাংলা**. Home/About visible on every breakpoint, not only inside the drawer.
- Primary row: **Destinations · Things to Do · Flights · Hotels · Visa Guides · Umrah & Hajj · Guides & Tools**, plus **Email Updates / ইমেইল আপডেট**. Only Destinations, Things to Do, Visa Guides and Guides & Tools have panels.
- Destinations: four columns in **Middle East → Europe & UK → Asia → Americas** order. Other panels: three columns. Same order/links in EN/BN and mobile.
- Preserve navy/emerald/ivory/gold, genuine wordmark, existing fonts/tokens; 1200px container and 24px mobile side padding. Desktop at `xl` (1280px); narrower viewports use the drawer. No new fixed bar or homepage redesign.
- Preserve all existing URLs, redirects, canonicals, hreflang, genuine 404s and page bodies. No new visa guide, domain, language, CMS migration or public prototype route.
- Native anchors plus adjacent disclosure buttons; one open panel; click/Enter/Space, Escape/focus restoration, outside/route closure. Touch-driven controls ≥44px; no hover-only menus or application-menu roles.
- Preserve Page 24232, affiliate registry, eVisas campaigns/widget placements, consent and subscription delivery. Navigation is internal discovery, not new outbound booking/tracking logic.
- No prices, FX constants, expiry slogans or private deal terms in navigation. Hajj remains distinct from Umrah; regional ordering is a business/reader priority, not proof of UK demand or a ranking boost.
- Worktree only for application edits/builds. No UI push, PR creation, main integration, deploy hook, IndexNow submission or unrelated scheduled publication in this execution.

## Review Focus

1. Modified clicks, browser Back and fragments: ordinary navigation remains native; local routing cannot strip city filters, UTMs or in-page targets (Tasks 1/2).
2. First visit and competing overlays: drawer/search/consent must not create two focus traps or leave body scroll locked; resizing to desktop releases a hidden drawer (Task 2).
3. Email action from drawer or already-subscribed state: close/unlock first, then scroll/focus the existing shared card; never imply an account (Task 2).
4. Future/partial publication: missing BN copy or unpublished visas never enter a locale's menu; a complete published record adds a link without header-layout edits (Tasks 1/3).
5. Static first paint and loading budgets: saved navigation must match React without duplicated forms, indexing menu boilerplate as article copy, loading the full catalogue eagerly or raising existing budgets (Tasks 3/4).

---

## Scope, baseline and file map

Observed baseline: local HEAD and remote `main` matched `0e83b102e2c6b37c20a3c72311ef9b7805168c03` during planning. Recheck before execution; do not overwrite later contributors' work. Five untracked owner images remain outside this work. Previous 44-command baseline success and prototype 42-state success are **not** implementation test results.

The earlier design spans two independently reviewable subprojects. This plan implements **navigation only**, plus label-only footer alignment and saved-HTML navigation. `/experiences`, `/attractions`, attraction titles/facilities/calculators, destination next-step panels, article rewrites and analytics remediation remain separately scoped. Keep their routes reachable; do not describe those defects as repaired.

Create:
- `src/data/navigation.ts` — lightweight bilingual published-link records, curated panel/group order; no import of full content or affiliate registry.
- `src/utils/navigation.ts` — pure model construction, locale URL and active-route helpers.
- `src/components/SiteHeader.tsx` — utility/primary rows, disclosures, responsive drawer and coordinated focus/scroll handling.
- `src/components/StaticSiteNavigation.tsx` — no-JS native links/disclosures from the same model, no form, widget or second client header.
- `scripts/test-navigation.ts`, `scripts/test-site-header.tsx` — pure-model and mounted happy-dom behaviour/SSR tests.

Modify:
- `src/App.tsx` — replace old header/drawer, wire existing callbacks, label-only internal footer alignment; leave footer support/commercial bands and route bodies intact.
- `src/translations.ts` — replace visible `signUpCta` values with Email Updates/ইমেইল আপডেট, retaining the key to avoid unrelated churn.
- `src/components/LanguageSwitcher.tsx` — native modified clicks and touch sizing for the touched header control; preserve locale destinations.
- `src/index.css` — scoped header rules/anchor offset only; no global visual refresh.
- `scripts/prerender.ts` — insert static navigation after page-shell assembly; body/search/schema generators unchanged.
- `scripts/verify-build.ts` — add saved-navigation integrity and measured anchor-clearance assertions; preserve existing guards.
- `scripts/test-signup-cta.ts`, `scripts/test-kkday-card-expiry.ts` — replace old presentation expectations with behavioural regressions, never simply delete coverage.
- `package.json`, `.github/workflows/ci.yml` — wire only the two new tests; no deployment changes.
- `DESIGN.md` — record implemented navigation rules after verification, not before code exists.

## Approved link contract

All paths below are English canonical bases; locale helpers preserve query/fragment and produce `/bn/` for the Bengali homepage. English pages must not receive prefixed URLs. Use approved prototype wording for titles/subtitles, naturally paired in Bengali; do not copy its standalone CSS, srcdoc bridge or mock actions into production.

| Panel / group | Canonical targets in order |
|---|---|
| Destinations / parent | `/destinations` |
| Middle East | `/umrah` (Saudi Arabia — Umrah & Hajj), `/visa/saudi-arabia-visa` (Saudi Arabia visa guide), `/destinations/dubai-guide` |
| Europe & UK | `/destinations/london-guide`, `/destinations/paris-guide`, `/destinations/italy-guide` |
| Asia | `/destinations/nepal-guide`, `/destinations/thailand-guide`, `/destinations/malaysia-guide`, `/destinations/singapore-guide`, `/destinations/maldives-guide`, `/destinations/kashmir-guide` (Pakistan — Azad Kashmir & Neelum Valley) |
| Americas | `/destinations/new-york-guide` |
| Things to Do / parent | `/experiences` |
| Browse by region | `/experiences/asia`, `/experiences/europe` (Europe, UK & USA) |
| City shortcuts | `/experiences/asia?city=dubai-klook`, `/experiences/asia?city=bangkok-klook`, `/experiences/asia?city=singapore-kl`, `/experiences/europe?city=london`, `/experiences/europe?city=paris` |
| Understand before booking | `/attractions`, `/destinations` |
| Visa Guides / parent | `/visa` |
| Asia | `/visa/nepal-visa`, `/visa/thailand-visa`, `/visa/malaysia-visa`, `/visa/singapore-visa`, `/visa/maldives-visa` |
| Middle East | `/visa/dubai-visa`, `/visa/saudi-arabia-visa` |
| Prepare & get help | `/visa-free-countries`, `/visa-assistance` (Application Assistance), `/pre-departure` |
| Guides & Tools / parent | `/tools` |
| Read & plan | `/blog`, `/costs` |
| Tools | `/tools/currency-converter`, `/tools/budget-calculator`, `/tools/packing-checklist`, `/tools/airport-codes` |
| Prepare & resolve | `/banking`, `/pre-departure`, `/resources`, `/glossary`, `/tools/flight-delay-claim` |

Saudi cross-links do not invent a Saudi destination record; the direct primary `/umrah` link remains. Do not reorder the main row or other panels merely because the owner reordered **Destinations**. UK/Pakistan visa entries remain absent; UK visitor visa publication has priority later, not permission now.

### Task 1: Shared, publication-aware navigation model

**Files:** create `src/data/navigation.ts`, `src/utils/navigation.ts`, `scripts/test-navigation.ts`; modify `package.json` and `.github/workflows/ci.yml` to run `test:navigation`.

**Interfaces:** `NavigationMenuId = 'destinations' | 'activities' | 'visas' | 'tools'`; `NavigationRecord` contains `id`, canonical `path`, `label: Record<Language,string>`, optional paired `subtitle`, `publishedLocales: readonly Language[]`, and `memberships: readonly {menu: NavigationMenuId; group: string; order: number}[]` (possibly empty, or multiple for approved cross-links). `NavigationModel` has `utility`, seven ordered `primary` entries and `menus` keyed by menu ID; each menu has a parent record and ordered groups. `buildNavigation(records: readonly NavigationRecord[], lang: Language): NavigationModel`; `navigationHref(path: string, lang: Language): string`; `activeNavigationMenu(path: string): NavigationMenuId | null`. Keep source records tiny; publication tasks add records here, never arbitrary provider IDs or header JSX.

- [ ] **Baseline/isolation gate:** load using-git-worktrees; create an isolated branch from reconfirmed main; retain owner files. Capture baseline canonical paths/redirect configuration and hashes of affiliate/flight/eVisas configuration. Set `INDEXNOW_SUBMIT=0`; record how ignored generated modules/dependencies are supplied without changing main. Reconcile due scheduled posts, never publish them under this task.
- [ ] **Write failing tests** with node:assert: primary labels equal the seven approved labels; destinations group labels equal `['Middle East','Europe & UK','Asia','Americas']`; exact targets equal the table above; EN/BN canonical membership equal after normalization; only locale-published records included. Inject a synthetic `/visa/test-visitor-visa` record with `publishedLocales: []` (absent), `['en']` (EN only), then `['en','bn']` (both); adding the complete record must update the visa group without editing header markup. This fixture is not a real UK/Pakistan slug.
- [ ] **Add URL/active-state assertions:** `/experiences/asia?city=dubai-klook#tickets` becomes `/bn/experiences/asia?city=dubai-klook#tickets`; `/` becomes `/bn/`; double prefixes are forbidden. `/attractions/london:992434` activates Things to Do, not Destinations; `/visa-assistance` activates Visa Guides, not About; `/banking` activates Guides & Tools; Home exact-match does not activate on every route.
- [ ] **Run red:** `npx tsx scripts/test-navigation.ts`; expect missing-module/assertion failure before implementation.
- [ ] **Implement the records/helpers** using the approved contract and existing locale policy. Do not import `constants.ts`, Bengali article bodies or ExperiencesPage into the eager graph. Publication flags are checked against actual built paths in Task 3; a record flag alone never proves publication.
- [ ] **Run green:** `npm run test:navigation`; every model/URL assertion passes. Wire the command to CI before type-check/build.
- [ ] **Checkpoint:** inspect changed paths and record the task result. Local task commits only on the isolated branch; no push/main integration.

### Task 2: Real React header, drawer and existing actions

**Files:** create `src/components/SiteHeader.tsx`, `scripts/test-site-header.tsx`; modify `src/App.tsx`, `src/translations.ts`, `src/components/LanguageSwitcher.tsx`, `src/index.css`, `scripts/test-signup-cta.ts`, `scripts/test-kkday-card-expiry.ts`, `package.json`, `.github/workflows/ci.yml`.

**Interfaces:** `SiteHeaderProps`: `lang: Language`, `currentPath: string`, `model: NavigationModel`, `getHref(path:string):string`, `onNavigate(path:string):void`, `onLanguageChange(lang:Language):void`, `localeHrefs:{en:string;bn:string}`, `utilitySearch: React.ReactNode`, `searchOpen:boolean`, `consentOpen:boolean`, `onRequestSearch(trigger:HTMLElement):void`, `onEmailUpdates():void`. Header owns the four disclosure refs and drawer state; render existing `TopBarWhatsApp`/`LanguageSwitcher`. App supplies its existing lazy TopBar search node and navigation/subscription callbacks. Track the real search opener separately from the input ref so closing search on mobile returns focus to a visible control.

- [ ] **Write failing mounted happy-dom tests** using React `act`: all four buttons toggle the correct `aria-controls`; one panel open; parent click navigates but chevron click does not; Escape closes and focuses the actual trigger without reopening it on focus; outside click and changed `currentPath` close; Ctrl/Meta/Shift/middle-click anchors are not prevented. Include modified language clicks.
- [ ] **Write overlay/action tests:** drawer Tab/Shift-Tab cycles visible controls; Escape/backdrop restores burger and old overflow; search or consent customization closes navigation before taking focus; resize beyond `xl` releases a hidden drawer. Email Updates closes the drawer before calling the existing delayed signup action; keep already-subscribed/missing-card tests. Update the old Sign Up copy assertions and source-wiring tests to target mounted header output.
- [ ] **Replace the old KKday header-card requirement:** test the new header has no supplier promotion block in either locale; retain expiry-boundary, registry resolution, KKday/KKday Hotels functionality and `/kkday-hotels` routing checks. Preserve existing activity/partner entry paths; do not restore the old sale card to satisfy a stale source grep.
- [ ] **Run red:** `npx tsx scripts/test-site-header.tsx`, `npm run test:signup-cta`, `npm run test:kkday-card`; the new presentation/interaction assertions fail on old behaviour.
- [ ] **Implement SiteHeader and App wiring:** preserve `sticky-site-header`, `main-navbar-sticky`, `mobile-menu-burger`, `mobile-intent-drawer`, `btn-signup-cta`, existing shared signup IDs and lazy search. Remove only obsolete App menu/drawer state/effects/JSX, not route/affiliate logic. Keep prototype's two-row silhouette, four/three-column distribution, Inter menu face, dark panel, gold active underline and readable 14px main links. Parent links remain native; hover is optional enhancement, not auto-opening on focus. Mobile starts with compact trust links and the seven matching tasks; children scroll inside the drawer.
- [ ] **Coordinate overlays:** automatic consent notice remains available/nonmodal; consent customization and full search take precedence over navigation. Suppress competing focus restoration when another dialog is opening. Give mobile search/language controls ≥44px targets; existing full search remains functional, not the prototype's menu-only search.
- [ ] **Adjust only touched sticky offsets:** measure the 112px desktop / compact mobile header and ensure fragment/jump targets clear it; prefer one shared offset over unrelated per-page edits. Preserve hero flush alignment and CSS focus/reduced-motion rules.
- [ ] **Run green:** `npm run test:site-header`, `npm run test:signup-cta`, `npm run test:kkday-card`, `npm run test:navigation`. Wire `test:site-header` before the CI build; update only stale test/comment wording.
- [ ] **Checkpoint:** inspect extraction for accidental route/body/widget changes; record results on the isolated branch.

### Task 3: Footer consistency and saved-HTML discovery

**Files:** create `src/components/StaticSiteNavigation.tsx`; modify `src/App.tsx` internal footer links, `scripts/prerender.ts`, `scripts/verify-build.ts`; extend the two new suites.

**Interfaces:** `StaticSiteNavigation({model,lang,currentPath}:{model:NavigationModel;lang:Language;currentPath:string}): React.ReactElement` renders one static-marked navigation block with real anchors and native `<details>` disclosures. Prerender imports the same lightweight model; it does not duplicate a hardcoded menu or change `PrerenderRoute.bodyHtml`. React replaces the root normally; static markup must not remain as a second live header.

- [ ] **Write failing SSR/build assertions:** one static nav block on `/`, `/bn/`, representative `/umrah`, `/visa`, `/attractions`, `/blog` pages; group/target parity with React model; every menu target's path exists in the generated route set for its locale, ignoring only query/fragment for existence. UK/Pakistan visa records absent; valid Pakistan destination present. Check query strings unchanged, root URLs canonical and escaping safe. Static menu links must not supply fake article references or satisfy blog-link gates intended for article bodies.
- [ ] **Write footer assertions:** approved internal labels include Home/About/Partners/Contact, Things to Do `/experiences`, Individual attraction guides `/attractions`, Application Assistance `/visa-assistance`; preserve `/kkday-hotels`, `/privacy`, `/resources`, `/sitemap`, cookie-settings action and all existing outbound destinations/attributes. Retain support-band and single pre-footer signup checks.
- [ ] **Run red:** new SSR tests and `npm run verify:build` against an isolated baseline build; expect absent-navigation/presentation assertions, not unrelated baseline errors.
- [ ] **Implement:** preserve the footer's existing responsive grid and support/legal/commercial blocks. Use model labels for shared internal links, adding the attraction-directory path without a new giant list. Keep actual provider identity on outbound service links; do not alter registry URLs, disclosures or source artwork. Inject static navigation inside root, before main, after the existing page-shell replacement; keep homepage eVisas/FAQ/directory markers intact. Search-index generation continues from route body, not newly added shell navigation.
- [ ] **Verify:** `npm run test:navigation`, `npm run test:site-header`, `npm run build`, `npm run verify:build`; saved menus and React membership match in both locales. Existing budgets/metadata/schema/content-reference tests continue to pass unchanged. Do not claim whole-body parity repairs from these shell checks.
- [ ] **Checkpoint:** no edits to `constants.ts`, blog bodies, eVisas settings, redirects or authored image files; review any generated feed diff instead of discarding it.

### Task 4: Bounded real-browser acceptance and deployment handoff

**Files:** verification artifacts outside deployable graph; update `DESIGN.md` navigation section and handoff/spec lifecycle only when implementation evidence exists. Archive the executed work order under `docs/history/` when the work lands, updating pointers; do not leave a finished task list described as current work.

**Interfaces:** the deliverable is the isolated application branch, its local running implementation preview, exact command results, URL/affiliate preservation evidence and a separate deployment-approval request. No new application feature/API.

- [ ] **Run the complete existing CI npm-command sequence plus both new suites** from `.github/workflows/ci.yml`, in order and without an overall short timeout; save exit codes. Required lint/build/verify:build must each exit 0. Compare baseline canonical set and feed/redirect/config hashes; explain any source additions or build-only due articles rather than silently dropping them. Existing eager JS/search-index/font ceilings stay as currently enforced; no budget increase to make tests green.
- [ ] **One batched browser inspection:** real implementation at 1280, 768, 390 and 320px, EN/BN, closed header/all four menus/mobile groups. Check the full four-column revision, Tab/Enter/Space/Escape, Back, modified clicks, city filters, locale/UTM/fragment preservation, route-active state, signup scroll/focus, search loading/failure, consent first visit/customize/withdrawal and breakpoint changes. Test no overflow, clipping, inaccessible links or new console errors. Stub submissions; never send a test enquiry, grant unknown partner widgets consent or initiate real bookings.
- [ ] **Fix material defects in one batch; confirm once**, then stop cosmetic iteration. If source/baseline failures fall outside navigation, report the specific blocker and request scope; do not start an unrelated repair programme.
- [ ] **Record verified implementation rules/evidence:** exact scope, local command results, screenshots, preserved URLs/integrations, remaining catalogue/analytics limitations. Authenticated GTM/GA4/Travelpayouts outcomes remain separate; navigation success does not establish bookings or commissions. No measured Lighthouse/field performance number unless actually run.
- [ ] **STOP for separate final deployment approval.** Present the implemented preview and local evidence. Do not merge/push to main, create a remotely deploying PR, invoke scheduled hooks or claim the change is live. Subsequent integration/deployment requires the owner's explicit new approval and fresh production verification.

## Plan review and execution choice

- [x] Self-review: scoped navigation requirements mapped to tasks; approved region revision replaces the older three-column constraint; interfaces and review-focus tests aligned; legacy presentation-test conflicts identified.
- [x] Owner approved implementation with native execution, 19 November 2026. Deployment remains a separate gate.
- [ ] Tasks 1–4 implemented/verified on an isolated branch.
- [ ] Owner separately approves production integration/deployment.

Recommended: **native execution in this session**, with one fresh whole-branch reviewer at the end. The model/header/static tasks share tight interfaces; implementing them together avoids repeated context/setup while preserving a final independent check. Subagent-driven execution remains available if the owner prefers separate implementer/reviewer gates per task. No subagents are dispatched for this planning step.
