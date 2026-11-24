# URAL International Expansion — Site Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: `executing-plans`, or `subagent-driven-development` when the owner selects delegation. Read the master, corrected spec and execution record before each task. Implement only approved scope.

**Goal:** introduce a useful bilingual Bangladesh doorway and complete the international homepage promise without moving existing content.
**Architecture:** lightweight hub/copy records feed shared React/static rendering; explicit per-route locale profiles preserve existing deep-page labels. Nullable airport selection and the existing hosted handoff get targeted tests before homepage defaults change.
**Tech Stack:** existing React/TypeScript/Vite/Tailwind, tsx/node:assert, happy-dom, prerender and verify-build scripts. No added dependency.
**Spec:** [Corrected design](../specs/2026-11-22-international-expansion-design.md), sections 4–7/9; [master](2026-11-22-international-expansion-master.md).

## Global Constraints
- R01–R03 source/build/scheduling evidence and base-scope approval required. Builds and previews are not publication.
- Base new routes: `/bangladesh`, `/bn/bangladesh`; no `/uk` route, redirect or new article in this release.
- `/` and `/bn/` share the international reader decisions; old articles keep their specific audiences, URLs and metadata.
- No site-wide `en-BD` replacement, forced geo detection, new prices, fixed FX constants or compulsory London origin.
- Currency follows selected origin until manually chosen; dated FX and BDT worksheet inputs stay unchanged.
- Preserve Page 24232, native locale `en`/`bn`, exact campaign IDs, consent, safe links, real 404s and performance budgets.
- One task is one testable checkpoint; shared App/prerender/metadata edits are serial. Only explicit assigned files may be staged if authorised.

## Review Focus
1. Missing translated route or language switch points to the wrong hub: F01/F02/F07.
2. Blank airport becomes directory[0] or a guessed code; swapping partially selected fields crashes: F04.
3. Manual GBP/BDT override is lost on origin/locale navigation; stale rates treated as current: F05/F06.
4. International copy says worldwide while the no-JS body still says Bangladesh-only: F03/F07/F09.
5. Menu structure gets recreated, old guide disappears, unrelated scheduled posts publish: F08/F09/F10.

---

## File structure and ownership

Create:
- `src/data/departureHubs.ts`: small typed EN/BN hub records and canonical link destinations; no full article import.
- `src/components/DepartureHub.tsx`: semantic static-safe hub rendering from those records; no supplier widget or network side effect.
- `src/data/homePositioning.ts`: paired homepage intro/metadata/feature copy; no prices or counters.
- `src/utils/pageLocale.ts`: touched-path locale profile/alternate annotations, using existing locale URL helpers.
- `scripts/test-departure-hubs.tsx`, `scripts/test-home-positioning.tsx`, `scripts/test-page-locale.ts`.
- `scripts/test-flight-widget-state.tsx`: mounted selection/swap/manual currency regressions.

Modify only at the owning tasks:
- `src/App.tsx`: `getRouteDetails`, `SectionType`, rendering, document language, homepage widget/skeleton props, navigation/footer integration.
- `scripts/prerender.ts`: route registration, bilingual hub body, metadata/head/sitemap annotations and saved homepage copy.
- `index.html`: existing first-paint hero/crawl directory and root metadata, not a new layout.
- `src/utils/coreSeoCopy.ts`, `src/data/bengaliContent.ts`: homepage/new hub SEO records and existing locale integration.
- `src/data/homeFaqs.ts`: paired international-homepage FAQ records; visible content and schema share the same localized source.
- `src/components/TravelpayoutsWidget.tsx`, `TravelpayoutsCustomWidget.tsx`, `InteractiveTools.tsx`: assigned defaults/validation only.
- `src/utils/flightSearch.ts`: selected-origin currency mapping only; `flightWhiteLabel.ts` remains the hosted contract.
- `src/hooks/useSeoMeta.ts`, `LanguageSwitcher.tsx`: consistent scoped head/switcher behaviour.
- Existing navigation model/header, only if it exists after R01; do not assume it has shipped.
- `scripts/verify-build.ts`, `package.json`, CI: add regression coverage, preserve old guards and budgets.

## Standard checkpoint protocol

For each coding task: write the named assertions below; run and observe the relevant red test; implement
the exact interface/content; rerun green plus affected old tests; review the assigned diff and record
evidence. Commit only if authorised, naming the task ID. Do not repeat full builds for every tiny
pure helper; F02, F03, F07 and F09 own integrated build proof.

## F01 — A useful Bangladesh hub, shared by English and Bengali

**Files:** create `departureHubs.ts`, `DepartureHub.tsx`, `test-departure-hubs.tsx`; wire `test:departure-hubs`.
**Interfaces:** `DepartureMarket = "bangladesh" | "uk"`;
`DepartureHubRecord = { market: DepartureMarket; path: string; updatedAt: string; copy: Record<Language,{ title: string; description: string; h1: string; intro: string; qualification: string }>; sections: readonly { id: string; title: Record<Language,string>; links: readonly { path: string; label: Record<Language,string> }[] }[] }`;
`DEPARTURE_HUBS: Partial<Record<DepartureMarket,DepartureHubRecord>>` initially contains Bangladesh only.
`DepartureHub({ record, lang }: { record: DepartureHubRecord; lang: Language }): React.ReactElement`.

- [ ] Test `bangladesh_sections_and_destinations_match`: SSR EN/BN has one H1, same section IDs and same canonical destination set after stripping `/bn`; no duplicate/self links; every target belongs to R02 baseline; both locales are nonempty. Test `unpublished_uk_is_absent`.
- [ ] Run `npx tsx scripts/test-departure-hubs.tsx`; expect missing implementation failure.
- [ ] Write hub orientation, not new visa rules. Sections: flights (`/flights` and selected existing dhaka-* routes), entry (`/visa`, `/visa-free-countries`), money (`/banking`, `/costs`), preparation (`/pre-departure`), pilgrimage (`/umrah` and the existing Bangladesh DIY article). Choose only real baseline targets; Bengali anchors are explicit and natural.
- [ ] Render native anchors through existing locale helpers; identify Bangladesh departure/passport context without implying every visitor holds that passport. Link international Home by language. No copied article bodies, price quotes, new currency engine or fake application service.
- [ ] Run `npm run test:departure-hubs` and lint; record reviewed paired wording, destination set and checkpoint. No public route exists yet.

## F02 — Register the real EN/BN hub pair end to end

**Files:** modify App `SectionType`/`getRouteDetails`/route view, prerender `buildAllRoutes`/`buildBengaliBody`, core SEO and Bengali SEO records; add verify-build hub guards.
**Consumes:** F01 records/component; existing `collectionPageSchema`, locale helpers and content recency rules.
**Produces:** `/bangladesh` and `/bn/bangladesh` in React, saved HTML, self-canonicals, breadcrumb graph and sitemap. No other new route.

- [ ] Add failing build assertions `bangladesh_pair_is_complete`: both files, localized title/description/H1, one H1, real in-locale links, self canonical/og:url/WebPage ID, and CollectionPage/ItemList entries matching visible links. No URAL Product/Offer schema. Unknown `/bangladesh/not-a-guide` remains 404.
- [ ] Run build then verify:build separately; observe the new missing-pair failure. Do not count unrelated baseline failures as this task's red evidence.
- [ ] Add one route family using the existing App parser, lazy rendering and error boundary. Add handwritten/generated Bengali metadata and early explicit hub rendering in `buildBengaliBody`, avoiding its generic duplicate H1/intro. The route has real BN copy, so it is not added to `DEFERRED_BN_GROUPS`.
- [ ] Register both entries using normal bilingual generation; use actual material-edit dates for the new record, not a supplier-check date. Ensure static includes the same F01 component with no mounted marketing widget.
- [ ] Run lint/build/verify:build; compare R02 baseline with allowed additions exactly the pair. Existing routes unchanged; capture direct load, Back and language-switch results. Checkpoint only assigned source/test/generated artefacts justified by this task; never `dist/`.

## F03 — Complete the international homepage message, not a new redesign

**Files:** create `homePositioning.ts`, `test-home-positioning.tsx`; modify `src/data/homeFaqs.ts`, App hero/features/home headings/visible FAQ/schema gates, index first-paint shell, prerender homepage sections/visible FAQ/schema, EN/BN SEO records and matched verify-build expectations.
**Interface:** `getHomePositioning(lang: Language): { h1Lines: readonly [string,string]; subtitle: string; title: string; description: string; features: readonly string[]; bangladeshLinkLabel: string }`.
FAQ interfaces: `getHomeFaqs(lang: Language): HomeFaq[]`, `getHomeFaqHeading(lang: Language): string`; retain English compatibility aliases `HOME_FAQS`/`HOME_FAQ_HEADING` if other current callers need them, but both homepage renderers use the localized helpers.

- [ ] Test `international_home_is_paired_and_specific`: EN H1 lines remain `Plan Your Trip` / `From Anywhere`; exact paired subtitle from design section 6; no Bangladesh-only universal premise or unsupported fixed statistics; visible BD doorway; EN/BN same action destinations. Test `home_faqs_are_bilingual_and_schema_matches_visible_answers`: four orientation questions in each locale, same qualifications/destinations, no inherited undated price estimates; visible FAQ strings exactly match each locale's schema. Add static hero/text/FAQ parity assertions, not only source-string checks.
- [ ] Run `npx tsx scripts/test-home-positioning.tsx`; prove the existing exclusive subtitle/counters are the failing condition.
- [ ] Reuse the existing hero imagery/layout/fonts and action bar. Apply shared copy to visible intro, pills and capability bar; remove hardcoded `50+`, `15+`, `100% BD` assertions rather than inventing replacement statistics. In `homeFaqs.ts`, author EN/BN four orientation questions from design section 6: editorial/not-seller role, official passport/residence checks, currency selection, Bangladesh doorway. Replace the homepage's Bangladesh-only FAQ content, remove EN-only visible/schema gates and render both from localized helpers; do not copy unsupported old price estimates into another page. Keep Bangladesh value in a clearly labelled link/section, not every global heading.
- [ ] Update `index.html` first-paint hero and crawl-directory introduction, and the Bengali homepage body/SEO. Keep existing deep links but label BD-specific collections truthfully; do not erase the article directory. Update assertions for touched exact copy only.
- [ ] Run homepage test, lint/build/verify:build. Inspect root saved HTML and React in both languages; underlying Bangladesh article metadata stays unchanged. Do not rebrand About, contact address or company location to claim a UK operation.

## F04 — Support truly unselected airports safely

**Files:** modify `TravelpayoutsWidget.tsx`; create `test-flight-widget-state.tsx`; extend `test-flight-search.ts` only for the new empty-state assertions.
**Interfaces:** selected airport state `AirportSelection = { code: string; city: string; name: string; country: string; flag: string } | null`;
explicit widget props `defaultOrigin?: string | null`, `defaultDestination?: string | null`.
Omitted props retain current legacy defaults; explicit `null` selects nothing. Keep known-alias lookup behaviour; blank/unmatched free text may not produce a selected fictional airport.

- [x] Test `explicit_null_origin_destination_are_unselected`, `partial_swap_is_safe`, `unmatched_text_is_not_an_airport`, and `incomplete_form_has_no_route_handoff`. SSR null props have no selected DAC/KTM; mounted selection/type/clear/swap stays safe; search requires two real selected codes and dates. Generic provider chooser links may remain clearly labelled; none may imply a completed route search.
- [x] Run `npx tsx scripts/test-flight-widget-state.tsx`; observe the current empty-to-directory[0] behaviour fail.
- [x] Implement nullable input and committed-query state; handle all `.code`/`.city` uses, date comparison, search/retry and swap. A freeform string is not selected until a local/remote result with a real code is chosen. Do not restore sample fares or invent lookup fallback codes.
- [x] Preserve omitted-prop behaviour for existing route-specific callers. Null/empty cannot flow through `findAirportInfo` into the first directory item; show localized field guidance and appropriate focus after validation.
- [x] Run widget tests and `npm run test:flight-search` in both languages. Stub remote autocomplete/network in tests; no partner application. Record omitted versus explicit-null controls and checkpoint.

**Checkpoint — 23 November 2026.** Built on `feat/f04-safe-unselected` after the `f787698`
production restore. `findAirportInfo` returns `AirportSelection | null` (blank/unmatched returns
`null`; the fabricated `q.slice(0,3)` airport is gone), state and committed query are nullable,
`buildFlightSearchCode` is never called with `undefined`, and the inline results block renders only
with a committed query. `scripts/test-flight-widget-state.tsx` mounts the real component with
`react-dom/client` in happy-dom; it failed against the pre-F04 widget (SSR rendered `(DAC)` for
explicit `null`) and passes now. Controls recorded:

| Caller | Props | Result |
| --- | --- | --- |
| Homepage (`App.tsx`) | omitted | Dhaka → Kathmandu, BDT; unchanged legacy behaviour |
| `TravelpayoutsEmbed` | `"DAC"` / `"KTM"` | unchanged |
| Explicit null (F06 target) | `null` / `null` | empty fields with localized guidance, no route handoff, USD until a Bangladesh origin is chosen |

`@ts-nocheck` was removed from `TravelpayoutsWidget.tsx`; `tsc --noEmit` now checks the nullable
state, so this class of post-mount crash fails `npm run lint`. The homepage surface itself is not
switched to explicit `null` here — that remains F06.

## F05 — Selected-origin currency, with manual choice protected

**Files:** modify `flightSearch.ts`, both flight widget callers where needed, `test-flight-search.ts`, `test-flight-widget-state.tsx`.
**Interface:** extend `preferredCurrencyForOrigin(origin: string): "BDT" | "GBP" | "USD"`.
Recognised UK mapping for this release: `LHR, LGW, MAN, BHX, STN, LTN, EDI, GLA, BRS, NCL, LPL, BFS, BHD, EMA, ABZ`.
This is a currency mapping, not a claim of flights or a complete UK airport directory. Bangladesh mapping is preserved; other/unknown -> USD.

- [x] Add exact assertions: DAC/CGP/ZYL -> BDT; every listed UK code, lowercase and whitespace -> GBP; JFK/DXB/RAJ/empty/unknown -> USD. Preserve distinction between real Bangladesh codes and similar foreign codes.
- [x] Add mounted `manual_currency_survives_origin_change_and_swap`: choose EUR, change DAC to LHR and swap, display/handoff remains EUR; without manual choice DAC -> BDT, LHR -> GBP, JFK -> USD. Locale change must not infer nationality.
- [x] Run flight and widget tests red; then implement the narrow pure map and existing `currencyChosenRef`/caller logic. Update old London=USD expectations, not unrelated URL or consent guards. Preserve explicit legacy-bookmark currency.
- [x] Run `npm run test:flight-search`, widget tests and `npm run test:rates`. GBP provider preference does not require fetching FX; converted published totals still require valid dated rates. Expired/missing data cannot become a constant or zero.
- [x] Check identical route/date/cabin/adult encoding and provider locale `bn`, never `/bn/` on the hosted provider. Record the approved policy change and checkpoint.

**Checkpoint — 24 November 2026.** `preferredCurrencyForOrigin` now returns `"BDT" | "GBP" | "USD"`; UK gateways (15 codes) map to GBP, Bangladesh codes to BDT, everything else to USD. The two flight widgets already follow it; TripCostEstimator and UmrahBudgetCalculator keep their BDT/USD display set (GBP coerces to USD there) so no unrelated UI change. Legacy-bookmark currency is untouched. `test-flight-search.ts` asserts every UK code in both cases and whitespace; `test-flight-widget-state.tsx` adds `manual_currency_survives_origin_change_and_swap`. All 46 suites, build and verify:build pass.

## F06 — Apply defaults at surfaces, not globally

**Files:** modify App homepage widget and its inline exported `TravelpayoutsWidgetSkeleton`; existing compact widget invocation if exposed on home; `InteractiveTools.tsx` only its globally presented inquiry defaults/qualifications; add widget/home assertions.
**Consumes:** F04 null semantics and F05 mapping. The skeleton currently lives inside `App.tsx`, not a standalone file.

- [x] Test `home_skeleton_and_widget_have_same_defaults`: `/` and `/bn/` origin/destination unselected and USD; newly scoped Bangladesh search/context has DAC origin, **unselected destination**, BDT; deep `dhaka-*` destination stays route-specific. Compact global forms must not hide a Dhaka/KTM fallback; extend their selected-input validation within this task if they appear on the global surface, rather than passing an empty string into a fallback extractor. **Coverage note (24 Nov 2026):** the saved home HTML is built from the source `index.html` template rather than from an `App` render, and it contains no flight widget, so there is no skeleton-level default to assert. The unselected contract is proven by the mounted widget test (`explicit_null_origin_destination_are_unselected`) and a browser check, not by saved HTML.
- [x] Test `global_inquiry_does_not_assume_dhaka_or_passport`: globally presented inquiry has no silent DAC/DXB selection; user-selected route survives; free help role remains. Mark BDT-input worksheet explicitly; no rewritten spending model or required bank-document claim for every nationality.
- [x] Apply explicit null props on both home locales, truthful skeleton placeholders and `showQuickRoutes={false}` on the international homepage (existing Dhaka quick routes remain in their Bangladesh collection). Keep default props on untouched deep calls.
- [x] Where a newly scoped Bangladesh surface actually mounts search, pass `defaultOrigin="DAC"` and `defaultDestination={null}` explicitly, with BDT-by-origin. Do not add a widget merely to satisfy a label. Keep both origin and destination defaults on untouched destination-specific deep calls. Keep multilingual selected input state independent of passport eligibility.
- [x] Run home/widget/flight/rates/answer-desk tests, then inspect null, DAC, LHR and manual override handoffs. Document touched call sites; unrelated tools are not redesigned.

**Checkpoint — 24 November 2026.** Homepage `App.tsx` now passes `defaultOrigin={null} defaultDestination={null} showQuickRoutes={false}` to the international widget; the saved home HTML contains no flight widget at all (it is a template shell that React replaces on hydration), so the unselected state is proven by the mounted widget test and a browser check rather than by prerendered markup. `InteractiveTools` inquiry defaults are now empty with an explicit empty option and "any origin/destination" preview. Bangladesh surfaces that mount search keep `defaultOrigin="DAC"` (none currently do — BangladeshHubView has no widget; do not add one just to satisfy a label). Touched call sites: `App.tsx` (homepage widget) and `InteractiveTools.tsx` (inquiry selects + message). All 46 suites, build and verify:build pass.

## F07 — Scoped locale policy and correct head in both runtimes

**Files:** create `pageLocale.ts`, `test-page-locale.ts`; modify App document language/pageLanguage, `useSeoMeta.ts`, `LanguageSwitcher.tsx`, prerender head/sitemap emission and touched schema calls, root index metadata.
**Interfaces:** `getPageLocaleProfile(path: string, lang: Language): { languageTag: string; ogLocale: string; englishHreflang: string }`;
`getPageAlternates(path: string, bnAvailable: boolean): readonly { hreflang: string; href: string }[]`.
Use `toEnglishBasePath`, `siteUrl`, `SITE_ORIGIN`. Existing paths except `/` and the new hub retain old profile values. Optional UK profile is added in G05, not new route registration here.

- [x] Test exact profiles: `/` EN -> `en/en_GB/en`; `/bangladesh` EN -> `en-BD/en_BD/en-BD`; BN -> `bn-BD/bn_BD` with English alternate matching its page. Existing `/visa/nepal-visa` remains its current EN-BD profile. Test absolute/query/fragment normalization and no fabricated counterpart when BN unavailable.
- [x] Test alternate sets: homepage only `/`, `/bn/`, x-default `/`; Bangladesh pair only `/bangladesh`, `/bn/bangladesh`, x-default English hub. No cross-hub alternates or deep-page-to-home alternates. Use case-insensitive comparisons for unchanged existing tags.
- [x] Run page-locale tests red; implement tiny pure helpers. Wire App, `useSeoMeta`, schema callers, static head and sitemap to the same profile/alternate list. Remove previous alternate nodes when switching route so stale en-bd/en pairs cannot accumulate. Keep schema default functions unchanged for untouched pages; pass explicit language for touched page nodes.
- [x] Language switcher uses target page's real language label, honours native modifier clicks and maps `/bangladesh` <-> `/bn/bangladesh`. Logo/Home remains its locale home. Do not turn a BD hub language switch into international Home. Preserve query/fragment behaviour.
- [x] Run page-locale/home/hub tests, `npm run test:sitemaps`, lint/build/verify:build. Compare static and mounted head before/after Home -> BD hub -> old article -> BN -> Back. Keep valid OG syntax and real self-canonicals. Do not strip all `en-bd` occurrences from dist.

**Checkpoint — 24 November 2026.** Created `src/utils/pageLocale.ts` (`getPageLocaleProfile`, `getPageAlternates`, `getBengaliAlternateHreflang`) and `scripts/test-page-locale.ts` (11 checks, watched red before implementation). Wired the same helpers into the saved head/sitemap (`scripts/prerender.ts`), the mounted head (`src/hooks/useSeoMeta.ts` now reconciles the whole managed alternate set instead of patching one tag), `App` document language, `LanguageSwitcher` hreflang/lang attributes and the touched home FAQ schema nodes. Untouched deep pages keep their shipped `en`/`en_US` and `bn`/`bn_BD` values — the plan bullet saying `/visa/nepal-visa` has an EN-BD profile did not match the shipped head, and a site-wide en-BD replacement is forbidden by the global constraints, so the shipped values were preserved and asserted. The one intentional change is the English home `og:locale`: `en_US` -> `en_GB`, with the Bengali home alternate updated to match. Browser evidence (local preview): direct `/` and `/bangladesh` heads match the policy; SPA `/bangladesh` -> `/visa` removed en-bd/bn-bd and installed en/bn/x-default; BN switch and Back restored correct profiles; no stale alternates accumulated. `en-bd` remains on the Bangladesh hub in dist. lint, build, verify:build exit 0; 48/48 test suites pass.

## F08 — Discoverability and clear scope inside the existing structure

**Files:** approved navigation model/header if available; App footer/home directory descriptions; prerender static navigation/search-index creation; existing directory intro owners; no article body rewrites.
**Consumes:** R01 integration choice, F02 published pair and existing `SiteSearchEntry` interface.

- [x] Test `published_hub_is_discoverable`: header Guides & Tools/prepare group, footer planning links and homepage contain localized Bangladesh hub; local search finds EN/BN hub. Unpublished UK entry absent. Keep existing seven primary labels and approved geographic order.
- [x] If approved model exists, add its hub record within the existing group. If absent, STOP the header change until R01's separate owner decision is fulfilled; footer/home/search additions can proceed without creating a parallel header/model.
- [x] Clarify user-facing directory boundaries only: Flights includes global search plus labelled Dhaka guides; Visa directory's existing records are labelled by passport scope and link to generic assistance; Costs/Banking remain explicitly Bangladesh/BDT; destination cards accurately identify the existing guide audience. Do not rewrite country rules or strip titles to look international.
- [x] Add both hub entries to the existing lazy generated site-search index, not a new search service. Static nav/footer and React share the same destinations. Existing article paths remain reachable; a new directory label cannot imply unpublished UK guides.
- [x] Run available navigation/search tests, hub/home tests and build/verify:build. Check at 390/768/1280px in EN/BN with keyboard. If header integration is unresolved, record base release blocked for final nav acceptance rather than silently deleting the new doorway.

**Completion note — 24 November 2026.** Directory intros were scoped without touching article bodies: the Flights intro now says the live search covers any route worldwide while the curated guides below are Dhaka routes (EN source in `FlightsIndex.tsx`, saved BN body in `coreSeoCopy.ts`); the Costs intro names Bangladesh and BDT in both locales. Visa, Costs and destination intros were re-read from the saved HTML and already stated their passport/departure scope. `test-discoverability.tsx` asserts all of this in EN and BN. Responsive/keyboard evidence: mounted SiteHeader checks at 390/768/1280 in EN and BN (hub is a focusable real anchor in the desktop panel or mobile drawer; Enter activates it; Escape closes the drawer) and a real-browser keyboard pass at the harness default viewport (800px): burger Enter opened the drawer, Guides & Tools Enter opened the group, hub focus + Enter navigated to /bangladesh and the head became en-BD/en_BD with no error. This harness has no viewport-resize control, so the 390/768/1280 numbers are mounted checks, not real-device or Lighthouse measurement. lint, build, verify:build exit 0; 49/49 suites pass.

**Checkpoint — 24 November 2026.** F07 merged as PR #154; F08 branched from that merge. The approved navigation model exists in the repo, so the Bangladesh doorway was appended to `tools`/`prepare` as record `bangladesh-hub` (EN/BN labels, both locales published) without changing the seven primary labels, the geographic group order or the order of the existing prepare links. The footer's Plan Your Trip column and the homepage hero already offer localized hub links in both locales, verified by mounting the real App. Both EN/BN hub entries were already in the generated site-search index; they now carry the `hub` kind, and hub intent tokens promote them for their own market-name query (a plain 'Bangladesh' search previously ranked the hub 35th behind generic articles). New `npm run test:discoverability` (5 checks incl. built search index) is registered in CI. lint, build, verify:build exit 0; 49/49 suites pass. **Two items remain open, deliberately unchecked:** directory-boundary copy review (Flights/Visa/Costs/destination card intros) and the 390/768/1280px EN/BN keyboard sweep. The plan line 'Unpublished UK entry absent' is superseded by PR #153: /uk is live, so it remains in search and the footer; no new UK guide was added here.

## F09 — Release proof, not a projected test count

**Files:** add focused assertions to `verify-build.ts`; consume R02 fixture/comparison and current approved addition/change manifest; update execution evidence only.

- [x] Run lint, build, verify:build separately, then all touched tests: route preservation, hub/home/page-locale/widget/flight/sitemap/rates/affiliate journey/answer desk. Record each actual exit code; no fixed assertion total.
- [x] Compare baseline path set plus only approved additions. Unchanged deep article title/H1/body/canonical remain unchanged; only approved home/directory/shared-shell changes are allowed. Reconcile separately authorised scheduled posts and real missing routes; never overwrite baseline to hide a regression.
- [x] Inspect no-JS saved pages and running browser: `/`, `/bn/`, both BD hubs, one existing Dhaka flight, visa, cost, banking, destination and UK article pair. Same substantive sections, claims, sources, curated link destinations and next actions. Do not treat a minimum link count as full parity.
- [ ] Browser matrix: EN/BN at 390/768/1280 and 320px stress on header/drawer/consent; native new-tab, Tab/Enter/Escape/focus, Back/forward, route changes, query/fragment, locale switching, empty-search validation and manual currency. Test grant/withdraw marketing consent and blocked storage with direct partner links still available.
- [ ] Verify money/date/source omissions and labelled cache states, no false hotel-input carryover, no new fake counts/availability, genuine 404s, measured eager JS/fonts within unchanged budgets. Report unmeasured field CWV honestly.
- [ ] Present one implementation preview, exact evidence and unresolved external checks. Stop for owner acceptance/deployment permission; do not enter cosmetic redesign loops.

**Checkpoint — 24 November 2026 (partial, stop for acceptance).** Built the missing R02 contract red-first (`routeBaseline.ts`, capture CLI, 8-check preservation test, manifest fixture) and added two failing-safe assertions to `verify-build.ts`. Baseline revision `16c92ad` built in a detached worktree: 310 routes; current build 313; exactly 3 approved additions and 21 approved changes, all named with reasons in `docs/releases/2026-11-24-international-manifest.json`. The 14 UK article body changes were traced to the separately authorised eVisas PR #150, not this release. lint/build/verify:build exit 0 and 50/50 suites pass; exact codes and the representative saved-page/browser audit are in `docs/handoff/2026-11-24-international-f09-release-evidence.md`. **Still open and deliberately unchecked:** the full 390/768/1280 + 320px browser/consent matrix (this harness has no viewport control; F08 mounted checks are not a real-device sweep), field CWV/budget measurement, and the final preview/acceptance step. One real defect was found and recorded rather than patched: `/destinations` renders two `<main>` landmarks after hydration (saved HTML has one). No push to main or deploy until the owner accepts.

## F10 — Approved deployment and durable documentation

**Files:** after explicit approval, update inline relevant sections of `PRODUCT.md`, `DESIGN.md`, `AGENTS.md`, strategy index and travel-tool/locale references for actual landed behaviour; history/archive finished work orders per repo lifecycle.

- [x] Record explicit scope/revision and integration/deployment approval. A push to main may deploy; do not use it before permission. Confirm no unrelated due posts, secrets, owner images, raw evidence or dist artefacts are staged.
- [ ] Integrate and deploy only the reviewed source set through the owner's normal process. If CI changes source/generation, repeat the addition-manifest comparison before publishing.
- [ ] Check production canonical pair, language/metadata/body, menu, null/default flight handoff, rates/consent and representative old routes after release. Confirm provider/report receipt separately where authenticated access is approved.
- [x] Update durable docs to facts true in that release; record new currency rule without claiming site-wide passport neutrality or source perfection. Remove stale "nothing applied" notes only for the exact package landed; other master-plan work remains unapproved.
- [ ] Archive executed work orders and preserve a short release/evidence summary. If a regression occurs, use an owner-approved targeted fix or revert only this release's own changes; never reset/discard another tool's work. Set review windows from actual release date, not this plan's date.

**Checkpoint — 24 November 2026 (pre-deployment).** Scope recorded: this release is the F01–F09 foundation slice at merged revision `6a1da70`; staging audit is clean (six known owner untracked files only, no staged changes, no tracked dist or secrets). Durable docs updated: `PRODUCT.md` and `TRAVEL-TOOLS.md` now state the BDT/GBP/USD origin mapping and the BDT/USD-only display set in the worksheets and estimator; `AGENTS.md` and the strategy index link the landed scope while keeping unapproved work unapproved. The exact landed set, evidence link and post-deployment checks are in `docs/handoff/2026-11-24-international-release-summary.md`. **Still unchecked:** integration/deploy and post-release live checks (awaiting explicit deploy permission), and formal archiving of finished work orders (deferred until the release is actually deployed).
