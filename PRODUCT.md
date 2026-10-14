# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript + Vite 6 + Tailwind CSS 4 (`@theme` tokens in `src/index.css`).
Static prerendering via `scripts/prerender.ts` (173 routes: 90 English + 83 Bengali),
deployed on Cloudflare Pages. No server runtime; the only backend surface is
`functions/api/subscribe.js` (Cloudflare Function) plus `functions/_middleware.js`.

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
flight, open a visa checklist, set a price alert) rather than a list of links.

## Positioning

Three things a generic travel aggregator cannot truthfully copy:

1. **Bangladeshi-passport-specific visa guidance.** Step-by-step checklists written for
   the passport the reader actually holds, not a generic "visa requirements" table.
2. **BDT-first pricing with real multi-currency context.** Costs are budgeted in Taka
   first (৳), then shown in USD/EUR/GBP/SAR/AED — not converted as an afterthought.
3. **Genuinely bilingual editorial at parity.** Bengali is not machine-translated filler;
   both locales carry full articles, FAQ schema, and their own hreflang cluster.

## Operating Context

- Affiliate monetisation through Travelpayouts (white label `wl_id=22462`, `marker=675992`,
  `trs=540277`) plus Aviasales, Kiwi.com, Klook, Tiqets, AirHelp, KKday,
  KiwiTaxi, Welcome Pickups, Airalo, QEEQ and related partners. All partner URLs resolve
  through the registry in `src/components/AffiliatePartners.tsx` — never hardcoded.
- Time-limited partner promos are gated on an expiry date and sanitised in blog body text
  *and* prerendered HTML, so an expired coupon can never ship.
- Analytics is Google Tag Manager under **Consent Mode, default-denied**, loaded deferred
  behind the consent banner. No marketing origin is contacted before the visitor chooses.
- Every outbound affiliate link carries `rel="noopener noreferrer sponsored"`.

## Capabilities and Constraints

**Confirmed capabilities**
- Global flight and hotel search (curated verified Dhaka routes + live white-label search).
- Step-by-step visa checklists for Nepal, Thailand, Malaysia, UAE/Dubai, Singapore,
  Maldives, Schengen and Saudi Arabia (tourist, medical, and Umrah).
- Destination guides, trip-budget guides, interactive tools, Hajj/Umrah preparation.
- 47 long-form blog articles in both English and Bengali.
- Multi-currency display (BDT, USD, EUR, GBP, SAR, AED) and an EN/BN language switcher
  with synchronised `<html lang>`.

**Hard constraints**
- **BDT and Bengali text are load-bearing.** The Taka sign ৳ (U+09F3) appears in prices on
  *English* pages, and the Bengali `@font-face` `unicode-range` deliberately excludes
  U+09F2–09F3 so that one glyph cannot pull the 57 KiB Bengali font onto every English
  route's critical path. `scripts/verify-build.ts` asserts this. Do not "restore" the
  contiguous `U+0980-09FF` range.
- **Core Web Vitals are a product constraint, not a nice-to-have.** The audience is on
  mid-range Android over variable mobile data. `verify:build` fails the build if eager JS
  exceeds a 200 KB gzip budget, and a prerender assertion suite (80 checks) guards
  sitemap, hreflang, JSON-LD and font-preload correctness.
- **Never display a fabricated flight schedule.** Unlisted routes open the live search
  engine instead of inventing a timetable. This is a trust rule, not a UI preference.
- Search defaults to Dhaka (DAC) but accepts any global origin/destination.

**Open decisions**
- Whether the decorative monospace treatment (10px uppercase tracked labels) survives the
  Phase 2/3 refinement pass. The role is currently served by a system mono stack, so this
  is a design decision, not a font-loading one.

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

- **Real editorial corpus:** 47 long-form articles in English and 47 in Bengali
  (`src/data/blogContent.ts`, `src/data/bengaliContent.ts`), each with Article/BlogPosting
  JSON-LD and a full body in prerendered HTML.
- **Real data files:** `src/data/tiqetsAttractionsData.ts`, `src/data/blogIndex.ts`,
  `src/constants.ts` (route records), `src/data/bengaliContent.ts`.
- **A named editor profile** with a verified public portfolio and documentary credits.
- **Verification infrastructure as evidence:** `scripts/verify-build.ts` (80 assertions)
  and `.github/workflows/ci.yml`.
- **Absences future work must not fabricate:** there are no customer testimonials, no
  press mentions, no booking-volume or savings statistics, and no awards. The Trustpilot
  widget renders third-party reviews and must stay clearly attributed to Trustpilot —
  never restyled as URAL's own claims.

## Product Principles

1. **Answer before you sell.** The visa/cost/eligibility answer comes first and in full;
   the affiliate CTA is the *next step* after the answer, never a substitute for it.
2. **Trust is the product.** No invented schedules, no fabricated stats, no expired promos,
   no unlabelled sponsored links. Every one of those is a rule already enforced in code.
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
