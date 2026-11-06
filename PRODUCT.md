# Product

<!-- impeccable:product-schema 1 -->

**Authority:** product and brand constraints are retained here for tooling. Current diagnostic
facts and unresolved gaps are in [the 25 October audit](00-URAL-CURRENT-AUDIT.md); task priorities
come from [the strategy index](00-URAL-STRATEGY-INDEX.md) and the current owner request.

## Platform

web

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 (`@theme` tokens in `src/index.css`).
Static prerendering via `scripts/prerender.ts`, deployed on Cloudflare Pages. Pages Functions
handle contact/subscription requests under `functions/api/`; `functions/_middleware.js` handles
legacy redirects. Dated route counts and verification results live in the current audit.

## Users

**Primary:** Bangladeshi travellers and prospective travellers, planning outbound trips
from Dhaka. They are price-sensitive, budget in BDT, hold a Bangladeshi passport, and
plan on a mid-range Android phone over variable mobile data. Many are first-time
outbound travellers for whom a visa checklist is the difference between booking and not.
A recurring high-intent subset is Hajj/Umrah pilgrims.

**Secondary:** readers of Bangladeshi origin living abroad, planning trips home or onward.
They read the same guides in Bengali.

**Tertiary:** non-Bangladeshi visitors who arrive on destination or visa content.

Reader language is a first-class split, not a translation afterthought: English at `/…`,
Bengali at `/bn/…`, on distinct crawlable URLs.

## Product Purpose

URAL (উড়াল) is an editorial **Travel Intelligence Platform**. It exists to answer the
question a Bangladeshi traveller actually has — *"can I go, what does it cost in BDT, and
what do I do first?"* — before they spend money on a booking.

Success means a reader leaves with a decision made and a next action taken (search a
flight, open a visa checklist, contact the desk) rather than a list of links.

The current direction is **international travel intelligence, with Bangladesh as the home market
and priority**. URAL serves readers worldwide; Bangladeshi readers keep every advantage they have
today. Umrah remains the initial commercial/content learning cycle, and Fard Hajj remains distinct
and linked. Direction confirmed by the owner on 6 November 2026 — see
[the master plan](docs/MASTER-PLAN-2026-11-06.md).

## Direction — international first, Bangladesh by priority (6 November 2026)

URAL is an international travel-intelligence site. Bangladesh is the home market and keeps every
advantage: BDT remains the default for a Dhaka departure, and Bangladesh-specific guidance (passport
dollar endorsement, NOC, DAC procedures, bKash/bank routes) is unchanged. International readers
receive a first-class experience: display currency follows the reader's origin, tools are named by
what they do, and no surface addresses a single passport as though it were the only reader.

Three consequences that are testable, not aspirational:

- **Currency follows origin.** BDT for a Bangladesh departure, USD for every other origin, always
  overridable, never forced. This extends the rule the flight search already implements
  (`AGENTS.md` §3) rather than reversing Bangladesh-first pricing.
- **Tools are named by function**; the audience is named in the subtitle. A tool labelled "BDT
  Currency Converter" tells a reader in Jakarta the site is not for them; "Currency Converter — live
  daily rates, with BDT-first guidance for Bangladesh" serves both.
- **No third language in this phase.** `Language` remains `"en" | "bn"`. International reach and
  framing come first; additional locales are a separate, funded project with their own parity budget.

## Number rule

**Every published money figure carries a date and a source, or it does not render.**

- Fixed exchange-rate constants are not permitted in **new** `src/` code. Rates come from the dated
  rates endpoint and are shown with the date they were fetched and the provider attribution their
  licence requires.
  **Migration debt, recorded 6 November 2026:** **18** rate literals still ship in five places and must
  not be extended — `TravelpayoutsCustomWidget.tsx` (5), `TravelpayoutsWidget.jsx` (5),
  `InteractiveTools.tsx` (4), `src/App.tsx` inline converter (4), and `src/constants.ts` (7 prose
  strings, of which 6 are `exchangeRateText`). Removing them is work package WP3 in
  [the master plan](docs/MASTER-PLAN-2026-11-06.md); until then the rule is a rule for new code, and
  the debt above is the recognised exception. **Do not read this rule as a claim that the site is
  already compliant.**
- Differentiate an official fee, a supplier quote, a live fare, a historical estimate, a reader's own
  input and an FX conversion. Never present one as another.
- If a rate or price is unknown or unavailable, omit the figure or show the last dated value **with
  its date**. Never show `0`, never show a stale rate without a date, and never show an undated point
  price as though it were checked.
- A reader-supplied figure is the reader's, not ours: a worksheet may sum it but must not silently
  convert it, and must never present an incomplete worksheet as a complete budget.

Implementation order, defects found and open decisions live in
[the master plan](docs/MASTER-PLAN-2026-11-06.md); the editorial method is
[the content optimization guide](URAL-CONTENT-OPTIMIZATION-GUIDE.md), which this rule does not replace.

## Positioning

Three product commitments:

1. **Bangladeshi-passport-specific visa guidance.** Step-by-step checklists written for
   the passport the reader actually holds, not a generic "visa requirements" table.
2. **BDT-first pricing with real multi-currency context.** For a Bangladesh departure, costs are
   budgeted in Taka first (৳) and then shown in USD/EUR/GBP/SAR/AED — not converted as an
   afterthought. For every other origin the display currency follows the reader's origin (see
   *Currency follows origin* above). Any converted figure is dated and attributed; see the Number
   rule.
3. **Decision-level bilingual parity.** Both locales have crawlable articles and their own
   language relationships. The current audit records remaining editorial-link and interface gaps;
   parity is a requirement, not a claim that every surface has passed review.

## Operating Context

- Affiliate monetisation through Travelpayouts (hosted white-label **Page 24232** at
  `flights.uraltravel.co.uk`, `marker=675992`, project `trs=589561`) plus Aviasales, Kiwi.com, Klook, Tiqets, AirHelp, KKday,
  KiwiTaxi, Welcome Pickups, Airalo, QEEQ and related partners. Partner links must use
  the registry in `src/components/AffiliatePartners.tsx`; the audit identifies bypassing embeds.
- Time-limited partner promos are gated on an expiry date and sanitised in blog body text
  *and* prerendered HTML through the registry helpers. Validate each promotional surface.
- Analytics is Google Tag Manager under **Consent Mode, default-denied**, loaded deferred
  by the loader. Production sent GA4 requests with denied-consent flags in the audit;
  the affiliate Drive loader remained marketing-consent gated. Event forwarding is incomplete.
- Outbound affiliate anchors must carry `rel="noopener noreferrer sponsored"`.

## Capabilities and Constraints

**Confirmed capabilities**
- Global flight search (curated Dhaka benchmarks + hosted white-label handoffs) and hotel-partner
  handoffs. The audited generic hotel link does not transmit the selected city, dates or guests.
  The [hosted-search reference](docs/04-monetization/FLIGHT-WHITE-LABEL.md) records configuration
  and provider-side activation evidence separately from website build checks.
- Step-by-step visa checklists for Nepal, Thailand, Malaysia, UAE/Dubai, Singapore,
  Maldives, Schengen and Saudi Arabia (tourist, medical, and Umrah).
- Destination guides, trip-budget guides, interactive tools, Hajj/Umrah preparation.
- A bilingual article library; the current audit records 51 articles per language on 25 October 2026.
- Multi-currency display (BDT, USD, EUR, GBP, SAR, AED) and an EN/BN language switcher
  with synchronised `<html lang>`. Inspected widget FX rates are fixed, not a live feed.

**Hard constraints**
- **BDT and Bengali text are load-bearing.** The Taka sign ৳ (U+09F3) appears in prices on
  *English* pages, and the Bengali `@font-face` `unicode-range` deliberately excludes
  U+09F2–09F3 so that one glyph cannot pull the 57 KiB Bengali font onto every English
  route's critical path. `scripts/verify-build.ts` asserts this. Do not "restore" the
  contiguous `U+0980-09FF` range.
- **Core Web Vitals are a product constraint, not a nice-to-have.** The audience is on
  mid-range Android over variable mobile data. `verify:build` fails the build if eager JS
  exceeds the guarded gzip budget (205 KB at the audited commit), and the prerender suite guards
  sitemap, hreflang, JSON-LD and font-preload correctness.
- **Never display a fabricated flight schedule.** Unlisted routes open the live search
  engine instead of inventing a timetable. This is a trust rule, not a UI preference.
- Search defaults to Dhaka (DAC) but accepts any global origin/destination.

**Open decisions**
- The audit's desk-fulfillment and measurement questions remain unresolved. Prior design
  phases are historical; no redesign is opened by this product context.

## Brand Commitments

- **Name:** URAL / উড়াল — "the ascent", flight. The brand mark is a stylised ascent.
- **Palette (binding, self-chosen):** navy `#0B1426` as the grounded base, emerald
  `#0F4A3F` as the brand accent, ivory `#F5F1E8` as the light surface, and gold `#F6B73C`
  as the editorial highlight. Gold is deliberately *not* a text colour on light surfaces —
  see DESIGN.md for the ink token that replaces it.
- **Voice:** plain, practical, specific. It writes like an experienced traveller giving a
  friend the real answer, including the boring caveats. It does not oversell.
- **Editorial integrity:** a single named editor (see `src/data/authorProfiles.ts`) is
  accountable for every guide; claims are limited to the supplied public portfolio.

## Evidence on Hand

- **Real editorial corpus:** English and Bengali articles in `src/data/blogContent.ts`,
  `src/data/bengaliContent.ts` and the scheduled `content/blog/` sources. The current audit
  verifies 102 Article-schema URLs and the built article bodies.
- **Real data files:** `src/data/tiqetsAttractionsData.ts`, `src/data/blogIndex.ts`,
  `src/constants.ts` (route records), `src/data/bengaliContent.ts`.
- **A named editor profile** with a verified public portfolio and documentary credits.
- **Verification infrastructure as evidence:** `scripts/verify-build.ts`
  and `.github/workflows/ci.yml`.
- **Absences future work must not fabricate:** there are no customer testimonials, no
  press mentions, no booking-volume or savings statistics, and no awards. The Trustpilot
  widget renders third-party reviews and must stay clearly attributed to Trustpilot —
  never restyled as URAL's own claims.

## Product Principles

1. **Answer before you sell.** The visa/cost/eligibility answer comes first and in full;
   the affiliate CTA is the *next step* after the answer, never a substitute for it.
2. **Trust is the product.** No invented schedules, no fabricated stats, no expired promos,
   no unlabelled sponsored links. These are requirements; implementation gaps remain documented
   in the current audit rather than being declared universally resolved.
3. **Both languages are first-class.** A feature that only works in English is unfinished.
4. **The phone on mobile data is the reference device.** Performance work is audience
   respect, not an engineering scoreboard.
5. **Speed of comprehension beats comprehensiveness.** A reader should find their answer in
   seconds; depth exists behind clear entry points, not in front of them.

## Accessibility & Inclusion

- Target WCAG 2.1 AA. Contrast-aware tokens are used rather than eyeballed values — see
  `--color-brand-gold-ink` and `--color-text-muted` in `src/index.css`, both chosen against
  measured ratios and documented in place.
- `prefers-reduced-motion` is honoured in `src/index.css` and in the partner marquee.
- Keyboard access is a requirement: a skip link, visible focus rings, and no keyboard
  traps. The flight/hotel search widgets are the highest-risk surface for this and must be
  verified whenever they change.
- Bengali typography is not an afterthought: the Bengali faces are self-hosted, subsetted
  by `unicode-range`, and preloaded only on `/bn/` routes.
