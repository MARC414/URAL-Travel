# HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE

**Withdrawn planning draft, 22 November 2026. Do not execute any task below.**
The corrected proposal removes unsupported title-rewrite/earnings claims, separates real translated
pairs from different hubs, scopes language changes and requires actual source/build/account evidence.
Old relative links refer to the original location, not current navigation. Start at
`docs/superpowers/plans/2026-11-22-international-expansion-master.md` instead.

# Front Door, Bangladesh Edition and First Revenue — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The owner must review this plan and choose an execution method before any task is started.

**Goal:** Make `/` read as an international English travel site, give the existing Bangladesh corpus a labelled `/bangladesh` edition, and earn the first revenue from pages that already rank — without changing any existing URL, redirect, canonical or page body.

**Architecture:** Three lanes with different clocks. Lane A edits five pages that already have impressions (revenue, week 1). Lane B changes the English locale declaration from `en-BD` to `en` with `x-default`, adds `/bangladesh`, and repositions the homepage hero/search (foundation, weeks 1–3). Lane C opens new UK URLs only, after B settles. No existing path is renamed, moved or redirected.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS 4, `tsx` prerendering via `scripts/prerender.ts`, node:assert + happy-dom test scripts. No added dependencies.

**Spec:** [2026-11-22-uk-international-positioning-design.md](../specs/2026-11-22-uk-international-positioning-design.md)

## Global Constraints

- **No existing URL changes.** No renames, no relocations, no new redirects, no deletions. `/bangladesh` is the only added English path.
- **English targeting becomes `en`** (`hreflang`, `inLanguage`, `og:locale`, `<html lang>`) with `x-default` on `/`. Bengali stays `bn-BD`. **Formatting locales (`Intl.*`) are not part of this change.**
- **Number rule:** every published money figure carries a date and a source or does not render. No fixed FX constants in `src/`; rates come from the dated endpoint via `src/utils/rateData.ts`.
- **Consent:** all scripts/iframes gated through `src/utils/consent.ts`; no direct `localStorage`/`document.cookie`.
- **Affiliate:** every outbound link resolves through `src/components/AffiliatePartners.tsx`; anchors carry `rel="noopener noreferrer sponsored"`; promo text passes `sanitizeExpiredPromoText`.
- **Build proof:** `npm run lint`, `npm run build`, `npm run verify:build` exit 0. No eager-JS or font-budget increase.
- **Both locales first-class.** A feature that works only in English is unfinished.
- **No fabricated claims:** no invented schedules, prices, provider coverage or passport eligibility.
- **Dependency:** Lane B Task B5 requires the already-approved navigation plan (`2026-11-19-approved-navigation.md`) to have shipped, because it creates `src/data/navigation.ts`. If it has not shipped, B5 is deferred, not improvised.

## Review Focus

1. **A ranking page loses position after a title edit.** `/visa-free-countries` and `/bn/costs/nepal-costs` rank at position 7–10 *because* of their current titles. A rewrite must preserve the ranking phrase verbatim and only add to it (Tasks A2, A3).
2. **The hreflang cluster becomes invalid.** Adding `/bangladesh` to the homepage cluster can leave `/bn/` un-updated or point `x-default` at the wrong member, which suppresses the whole cluster (Tasks B1, B6).
3. **Currency detection falls back to a hardcoded rate** when the rates endpoint is unavailable. Unknown rate must render no total, never a constant (Task B4).
4. **A UK passport claim is published without verified provider coverage.** eVisas coverage is not established for UK visitor visas; the placement map must not gain a UK entry without owner-supplied evidence (Task A4).
5. **`/bangladesh` and `/` compete for the same query, or `/` becomes unreachable from Bangladesh pages.** Every BD page must link to `/bangladesh`, and `/bangladesh` must not target the same head term as `/` (Tasks B3, B4).

---

## Lane A — Revenue (start immediately, week 1)

Goal: money from pages that already rank. Every task here edits an existing page. No new authority is needed, because these pages are already visible.

### Task A1: Capture the revenue baseline and select the five pages

**Files:**
- Create: `docs/growth/REVENUE-BASELINE-2026-11-22.md`

**Interfaces:**
- Produces: the fixed list of five page paths that A2–A5 operate on, and their baseline impressions/position/clicks. Later tasks cite this file by path.

- [ ] **Step 1: Export the Pages report** from GSC for 22 Oct – 22 Nov 2026, sorted by impressions descending, and Queries filtered to Bangladesh as a second file.
- [ ] **Step 2: Write the baseline table** into the new file: path, impressions, clicks, average position, top query. Include the 42%-zero-click page-1 set from `docs/03-social/GSC-READ-2026-11-02.md`.
- [ ] **Step 3: Select five pages** by this rule, recorded in the file with a one-line reason each: (a) `/visa-free-countries`, (b) `/bn/visa-free-countries`, (c) the highest-impression Bengali cost page, (d) the highest-impression visa checklist, (e) the highest-impression blog post.
- [ ] **Step 4: Commit.**

```bash
git add docs/growth/REVENUE-BASELINE-2026-11-22.md
git commit -m "docs: capture revenue baseline and select five pages"
```

### Task A2: Answer-first restructure of `/visa-free-countries`

**Files:**
- Modify: the page record in `src/constants.ts` (locate the `visa-free-countries` entry) and its rendered copy in `src/App.tsx` if the body is inline there
- Modify: `src/data/bengaliContent.ts` only if a paired BN override exists
- Test: `scripts/verify-build.ts` (existing rendered-content assertions)

**Interfaces:**
- Consumes: the page path from A1.
- Produces: nothing later tasks import.

- [ ] **Step 1: Record the current title and H1 verbatim** in `REVENUE-BASELINE-2026-11-22.md` so a revert is possible.
- [ ] **Step 2: Rewrite the title and meta description** so the ranking phrase is preserved at the front and the value is added after it. Do not remove any word that appears in the top query.
- [ ] **Step 3: Add a 60-word answer block** immediately after the H1, answering "which countries can I visit visa-free" directly, with the source and date of the underlying rule set.
- [ ] **Step 4: Run the build and read the output.**

```bash
npm run build
```
Expected: build succeeds; `dist/visa-free-countries.html` contains the new title, the answer block before any card grid, and the unchanged canonical.

- [ ] **Step 5: Verify no money figure appears without a date and source** on the touched surface.

- [ ] **Step 6: Commit.**

```bash
git add src/constants.ts src/App.tsx src/data/bengaliContent.ts dist
git commit -m "fix(visa-free): answer-first restructure and title for zero-click page-1 query"
```

### Task A3: Push the Bengali visa-free query into the top five

**Files:**
- Modify: `src/data/bengaliContent.ts`
- Modify: 3 Bengali articles in `src/data/blogContent.ts` (internal links only)

**Interfaces:**
- Consumes: the query string and position recorded in A1.

- [ ] **Step 1: Align the Bengali H1** with the literal query wording recorded in A1, keeping the existing meaning.
- [ ] **Step 2: Add an answer-first block** in Bengali mirroring A2's structure — same meaning, natural Bengali, technical terms in English where that is the accurate wording.
- [ ] **Step 3: Add three curated Bengali inbound links** from the highest-impression Bengali articles to `/bn/visa-free-countries`, with natural Bengali anchor text. Bengali links have no fallback; author them explicitly.
- [ ] **Step 4: Build and verify the anchors exist in saved HTML.**

```bash
npm run build
npm run verify:build
```
Expected: exit 0; `dist/bn/visa-free-countries.html` carries the new H1; the three source articles contain the new anchor.

- [ ] **Step 5: Commit.**

### Task A4: Add a transactional close to four ranking visa pages

**Files:**
- Modify: the four visa page records in `src/constants.ts`
- Modify: `src/data/evisaProgram.ts` (placement map only)
- Modify: `src/components/EvisaPanels.tsx` only if a new panel variant is needed
- Test: `scripts/verify-build.ts`

**Interfaces:**
- Consumes: the registry API in `src/components/AffiliatePartners.tsx` (`AFFILIATE_LINKS`, `resolvePartnerUrl`, `isPromoActive`).
- Produces: nothing later tasks import.

- [ ] **Step 1: For each of the four pages, add three labelled facts** — official government fee with date and source, processing time with date and source, and the official application URL as the primary action.
- [ ] **Step 2: Add an eVisas assistance link** only where the placement map already establishes coverage (UAE, Morocco, Thailand). **Do not add a UK entry.** If a page's passport does not qualify, the official route remains the only action and the panel is omitted.
- [ ] **Step 3: Verify every new outbound anchor** carries `rel="noopener noreferrer sponsored"` and a nearby provider disclosure.
- [ ] **Step 4: Build and assert the declared affiliate next steps appear in static HTML.**

```bash
npm run build
npm run verify:build
```
Expected: exit 0; each touched page's saved HTML contains its declared next step and the disclosure line.

- [ ] **Step 5: Commit.**

### Task A5: Verify one enquiry event actually reaches GA4

**Files:**
- Modify: the analytics module under `src/utils/` that emits the WhatsApp/enquiry event (locate via `grep -r "virtual_page_view" src/`)
- Modify: `scripts/verify-build.ts` only if an assertion is missing

**Interfaces:**
- Produces: a confirmed event name that Lane C reuses for UK pages.

- [ ] **Step 1: Identify the current event name and payload** for a WhatsApp/desk enquiry and record it in `REVENUE-BASELINE-2026-11-22.md`.
- [ ] **Step 2: Add the event if it is missing**, gated on the correct consent category, with a stable first-party placement field.
- [ ] **Step 3: Build and confirm the event string is present in saved HTML or the loaded bundle.**

- [ ] **Step 4: Owner action — confirm receipt** in GA4 real-time with consent granted. Record the result and date in the baseline file. If access is unavailable, record that exact remaining task and do not claim measurement readiness.

- [ ] **Step 5: Commit.**

### Task A6: Create the 30-day revenue scorecard

**Files:**
- Create: `docs/growth/REVENUE-SCORECARD.md`

- [ ] **Step 1: Write the scorecard** with the five paths, their baseline row from A1, and columns for day-30 impressions, clicks, position and enquiries.
- [ ] **Step 2: State the pass condition** from the design (`clicks > 0 on at least 3 of 5`; `no position loss > 2`) and the re-export date (22 December 2026).
- [ ] **Step 3: Commit.**

---

## Lane B — Foundation (weeks 1–3)

Goal: the site declares itself international English, has a Bangladesh edition, and a front door that serves neither audience badly.

### Task B1: Change the English locale declaration from `en-BD` to `en`

**Files:**
- Modify: `index.html` (`<html lang>`, the three `<link rel="alternate">` tags)
- Modify: `scripts/prerender.ts` (the per-route hreflang rewrite block, the sitemap hreflang emitter, `og:locale`, and every `inLanguage: "en-BD"` literal)
- Modify: `src/utils/schema.ts` (every `inLanguage = "en-BD"` default)
- Modify: `scripts/verify-build.ts` (the `lang="en-BD"` fixture and any locale assertion)
- Test: `scripts/sitemapValidation.ts` (existing hreflang assertions)

**Interfaces:**
- Produces: `EN_LOCALE_TAG = "en"` and `BN_LOCALE_TAG = "bn-BD"` exported from a single module (put it beside the existing locale helpers) so Tasks B6 and Lane C do not re-declare literals.
- **Does not change** `src/utils/rates.ts` `Intl.NumberFormat("en-BD")` — that is formatting, not targeting. Leave it.

- [ ] **Step 1: Add the failing assertion** in `scripts/verify-build.ts`: built English HTML must not contain `hreflang="en-bd"` or `inLanguage":"en-BD"`, and must contain `hreflang="en"` and `x-default`.
- [ ] **Step 2: Run the build to confirm the assertion fails.**

```bash
npm run build && npm run verify:build
```
Expected: FAIL naming `en-bd`.

- [ ] **Step 3: Replace the English locale tag** everywhere in the targeting surface with the exported constant. Leave every `Intl.*` locale untouched.
- [ ] **Step 4: Run the build and verify in `dist/`.**

```bash
npm run build && npm run verify:build
```
Expected: exit 0. In `dist/index.html`: `<html lang="en">`, `hreflang="en"`, `x-default`, `og:locale: en_GB` or `en_US` (choose one and use it consistently), and no `en-bd`. In `dist/bn/index.html`: `bn-BD` unchanged.

- [ ] **Step 5: Spot-check three deep pages** in both locales for self-canonical, self-referential hreflang and unchanged `@id` graphs.
- [ ] **Step 6: Commit.**

### Task B2: Add the `/bangladesh` route

**Files:**
- Create: `src/components/BangladeshEdition.tsx`
- Modify: `src/App.tsx` (route resolution)
- Modify: `scripts/prerender.ts` (route registration, sitemap entry, hreflang cluster)
- Test: `scripts/verify-build.ts`

**Interfaces:**
- Produces: `BANGLADESH_PATH = "/bangladesh"` and the page's canonical/`og:url`/schema `@id` all resolving to that one URL.

- [ ] **Step 1: Write the failing assertion** in `scripts/verify-build.ts`: `dist/bangladesh.html` exists, returns one `<h1>`, carries `hreflang="en-BD"`, and its hreflang cluster lists `/`, `/bangladesh`, `/bn/` reciprocally.
- [ ] **Step 2: Confirm it fails.**

- [ ] **Step 3: Create the component** rendering a single `<h1>` and a short intro stating this is the Bangladesh edition, then empty section placeholders for B3.
- [ ] **Step 4: Register the route** in `src/App.tsx` and `scripts/prerender.ts`, add the sitemap entry with an explicit `lastmod`, and add it to the homepage hreflang cluster.
- [ ] **Step 5: Build and verify.**

```bash
npm run build && npm run verify:build
```
Expected: exit 0; `dist/bangladesh.html` present; `dist/sitemap.xml` contains it once with the three-way cluster; `/bn/` cluster updated to list it.

- [ ] **Step 6: Commit.**

### Task B3: Populate the Bangladesh edition from existing pages

**Files:**
- Modify: `src/components/BangladeshEdition.tsx`
- Test: `scripts/verify-build.ts`

**Interfaces:**
- Consumes: existing canonical paths only. **Creates no new content and no new URLs.**

- [ ] **Step 1: Add four sections**, each linking to existing live URLs and nothing else: *Flights from Dhaka* (`/flights`), *Costs in Taka* (`/costs`), *Visa guides for a Bangladeshi passport* (`/visa`, `/visa-free-countries`), *Money, endorsement and NOC* (`/banking`, `/pre-departure`).
- [ ] **Step 2: Add a single line explaining** that this edition assumes a Bangladesh departure and a Bangladeshi passport, and that other readers should use the international home.
- [ ] **Step 3: Assert in `verify-build.ts`** that every link on `/bangladesh` resolves to a route present in the sitemap.
- [ ] **Step 4: Build and verify.**

- [ ] **Step 5: Add a `/bangladesh` link** to the footer of every English page (one shared footer component, one edit) so the edition is discoverable and `/` is not a dead end.
- [ ] **Step 6: Commit.**

### Task B4: Reposition the homepage hero, search default and currency

**Files:**
- Modify: `src/App.tsx` (hero copy, search default origin, currency selection)
- Modify: `src/translations.ts` (EN/BN hero strings)
- Modify: `src/components/TravelpayoutsWidget.tsx` (default origin only)
- Test: `scripts/verify-build.ts`

**Interfaces:**
- Consumes: `src/utils/rateData.ts` for any conversion; `src/utils/flightSearch.ts` for the handoff currency rule (already: BDT for a Bangladesh departure, USD otherwise, never overriding a visitor's choice).
- Produces: nothing later tasks import.

- [ ] **Step 1: Write the failing assertions:** `dist/index.html` must not present a Bangladesh departure as the only option; no fixed FX literal is introduced in `src/`; the hero `<h1>` is passport-neutral.
- [ ] **Step 2: Rewrite the hero** to a passport-neutral headline and subtitle, with the primary action being the flight search and the secondary being the Bangladesh edition.
- [ ] **Step 3: Change the search default origin** so the origin field starts empty or detected, never hardcoded to Dhaka. The destination field stays free-text with autocomplete.
- [ ] **Step 4: Make currency follow the reader's origin** through the existing rule, and confirm no new constant is introduced. If a rate is unavailable, render no total.
- [ ] **Step 5: Build and verify in `dist/`**, then check the flight handoff still carries route, dates, currency and locale correctly.

```bash
npm run build && npm run verify:build
```
Expected: exit 0; no eager-JS budget change; hero neutral; origin not prefilled with DAC.

- [ ] **Step 6: Commit.**

### Task B5: Add the Bangladesh edition to navigation — **blocked until the approved navigation plan ships**

**Files:**
- Modify: `src/data/navigation.ts` (created by `2026-11-19-approved-navigation.md`)
- Modify: `src/utils/navigation.ts` if a group helper is needed
- Test: `scripts/test-navigation.ts`

**Interfaces:**
- Consumes: `NavigationRecord` from the navigation plan (`id`, `path`, `label`, `subtitle`, `publishedLocales`, `memberships`).
- **If `src/data/navigation.ts` does not exist, stop and report.** Do not create a parallel navigation model.

- [ ] **Step 1: Add one record** for `/bangladesh` with an English label and subtitle, `publishedLocales: ['en']`, and membership in the utility row.
- [ ] **Step 2: Assert in `scripts/test-navigation.ts`** that the record appears in the utility row for `en` and **does not** appear for `bn`.
- [ ] **Step 3: Run the navigation tests and the build.**

- [ ] **Step 4: Verify in saved HTML** that the static navigation includes the link and the Bengali pages do not.

- [ ] **Step 5: Commit.**

### Task B6: Prove the whole declaration in built output

**Files:**
- Modify: `scripts/verify-build.ts` (consolidate the assertions from B1–B5 into one named block)
- Create: `docs/01-technical-seo-aeo/LOCALE-DECLARATION-2026-11-22.md`

- [ ] **Step 1: Write one verification block** asserting, across `dist/`: English pages emit `hreflang="en"` + `x-default` and never `en-bd`; Bengali pages emit `bn-BD`; `/bangladesh` emits `en-BD`; the homepage cluster is three-way reciprocal; canonical, `og:url`, hreflang self-reference and schema `@id` agree on every sampled page.
- [ ] **Step 2: Record the before/after** in the new reference document, including the exact URL count before and after (`304` at the time of planning — reconfirm, do not trust this number).
- [ ] **Step 3: Run the full suite.**

```bash
npm run lint && npm run build && npm run verify:build
```
Expected: all exit 0.

- [ ] **Step 4: Commit.**

---

## Lane C — UK doors (after Lane B ships; specification only)

These are **new URLs**, never rewrites. Each becomes its own plan once Lane B is verified, because each needs fresh source research that should not be done speculatively.

| Phase | Surface | Why it can win | Monetisation |
|---|---|---|---|
| C1 | British-passport eVisa pages, one per destination with a verified eVisas route (Turkey, Egypt, India, Sri Lanka, Saudi, Kenya, Azerbaijan) | Long-tail transactional queries where incumbents are generic | eVisas application assistance — highest value per conversion on the site |
| C2 | UK261 flight-compensation hub | Underserved, no destination authority needed | AirHelp |
| C3 | Extend the existing `/blog/umrah-hajj-guide-united-kingdom-2026` into a UK DIY Umrah cluster (Haramain train, Nusuk for UK residents, ATOL vs DIY) | The asset already exists; audience has money | Flights, hotels, eSIM, insurance |

**Acceptance contract for every C page:** body, ≥3 primary references, ≥4 internal links (≥2 blog→blog, ≥1 hub), one relevant affiliate CTA, Bengali parity where a Bengali twin is authored, and build proof. No UK page may claim eVisas coverage until the owner supplies evidence for that passport.

**Do not start C1 until** Lane B Task B6 passes — the UK pages need a settled `en` declaration and a live `/bangladesh` to link against.

---

## Verification summary

| Gate | Command | Pass condition |
|---|---|---|
| Types | `npm run lint` | exit 0 |
| Build | `npm run build` | exit 0, one new English route |
| Contract | `npm run verify:build` | exit 0, including the new locale assertions |
| URL inventory | compare `dist/sitemap.xml` before/after | exactly one added English URL, zero removals |
| Locale | grep `dist/` for `en-bd` | zero matches in English output |
| Money | grep touched pages | every figure has a date and a source |
| Affiliate | grep touched pages for `<a` | all carry `rel="noopener noreferrer sponsored"` |
| Enquiry | GA4 real-time, owner | at least one event received |

## Assumed decisions (spec §12, unanswered at planning time)

The plan proceeds on the recommended answer to each open decision. If the owner chooses otherwise, only the named task changes.

| Decision | Assumed | Changes if reversed |
|---|---|---|
| Lane A before or alongside Lane B | Lane A starts first | Execution order only; no task content |
| `/bangladesh` English-only | English-only, no `/bn/bangladesh` twin | Adds a BN twin to B2/B3 and a fourth cluster member |
| London/UK kept in the homepage grid's first row | Kept | B4 Step 2 only |

## Execution order

1. **Lane A, Tasks A1–A6** — one week, no dependency on Lane B.
2. **Lane B, Tasks B1–B4 and B6** — one to two weeks, concurrent with or after Lane A.
3. **Lane B, Task B5** — only after the approved navigation plan ships.
4. **Lane C** — new plan, after B6 passes.
