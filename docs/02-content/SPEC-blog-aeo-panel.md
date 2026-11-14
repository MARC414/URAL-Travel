# SPEC — page-specific "Essential Travel Insights" panels

Status: **Phase 0 + Phase 1 shipped 14 Nov 2026**. Phase 2 (authoring the 17
Bangladesh panels) is queued. Owner decision recorded below.

## The problem

Two blocks at the foot of every blog article came from one source and said the
same thing everywhere:

| Block | Source before this change | Why it was wrong |
| --- | --- | --- |
| "Essential Travel Insights" summary + key facts | `src/routes/BlogPostRouteView.tsx` — one inline hard-coded Bangladesh payload (hajj.gov.bd registration, "SAR 300" fee, "10-Day DIY Umrah Budget BDT 1,16,000–1,32,000") | Printed on **20** Hajj/Umrah + Ziyarah articles: 17 Bangladesh-intent and 3 UK (`umrah-hajj-guide-united-kingdom-2026`, `uk-umrah-packages-atol-operator-checks`, `uk-to-saudi-flights-umrah-direct-or-connecting`), with the visa walkthrough joining on 15 Nov. BDT budgets and Dhaka routing inside GBP articles. |
| FAQ accordion | `faqs={localizedHajjFaqs}` → `HAJJ_UMRAH_FAQS` (`src/hooks/useSeoMeta.ts`), 8 Bangladesh questions | Every article already ends with its own author-written FAQ (server-rendered, and the source of its `FAQPage` JSON-LD). A browser showed two "Frequently Asked Questions" blocks that disagreed — the article said ETA/e-visa/waiver for a British passport, the panel said hajj.gov.bd and SAR 300. |

Two structural causes made it spread:

1. **A denylist, not an allowlist.** `BlogPostRouteView.tsx` rendered the panel
   when `category` matched and the slug was not one of ten hand-listed
   exceptions, so anything new inherited the Bangladesh block by default.
2. **Two renderers.** Blog pages are prerendered by `scripts/prerender.ts` from
   markdown; the panel lived only in the React view. Measured on 14 Nov 2026:
   **0 of 126** prerendered blog pages in `dist/` contained
   `id="travel-intelligence-panel"`, while 6 `/costs/*` pages did. The block
   written for answer engines was in no shipped HTML at all.

Adjacent Bangladesh defaults on the same UK pages: the eSIM sidebar copy ("before
flying from Dhaka", "keeping a Bangladesh SIM for OTPs"), the "Compare Flights
from Dhaka" CTA, the author bio line about Bangladesh's digital content industry,
and `BlogArticleNavigation`'s server-rendered heading "More Travel Guides for
Bangladeshi Flyers".

## Owner decisions (14 Nov 2026)

- **B-only**: per-post panel data driven from frontmatter. No category default,
  no automatic derivation from prose.
- **Keep the panel**, but only where a post declares its own facts — which is
  also the answer to the "B-lite" question: an article without data carries no
  panel, so nothing generic can return. Reversible per post, not per template.
- **Both audience labels, used where they are accurate**: "UK travellers" for
  travel-mechanics pages (flights, pillar, ATOL) and "British passport holders"
  where the rule is passport-based (the visa walkthrough). Bengali labels are
  stored in the genitive form that precedes "জন্য".
- **Phase 2 keeps per-post facts**, not an identical visa/cost/routing cluster —
  the whole complaint was that one block cannot serve twenty pages.
- **Phase 2 order**: Hajj/Umrah posts first, then Ziyarah/stopover.

## What now exists

Frontmatter (`content/blog/README.md` documents it): `audience`,
`audienceLabelEn`, `audienceLabelBn`, `aeoSummary`, `aeoSummaryBn`, `aeoFacts[3]`
with `label`/`labelBn`/`value`/`valueBn`.

Validation in `scripts/scheduledPosts.ts`:

- all-or-nothing (any `aeo*`/`audience` key requires the full bilingual set);
- exactly three facts, every field non-empty in both locales;
- `value` must carry a four-digit year, `valueBn` a Bengali-numeral year — an
  undated figure cannot reach the panel;
- `audience` must be `uk` or `bd`.

Rendering: `getBlogAeoPanel()` (`src/utils/blogAeoPanel.ts`) feeds both the React
view and `renderBlogAeoPanelHtml()` in `scripts/prerender.ts`, so the panel is in
the shipped HTML for crawlers and identical after hydration. `TravelIntelligence`
(`src/components/AeoInspector.tsx`) takes `audience` + optional label overrides,
no longer prints a FAQ accordion for articles, and keeps the FAQ list only for the
hub pages that legitimately own it (`/umrah`, `/costs/*`).

Guards added to `verify:build`:

- every post with panel data ships the panel in `dist/blog/<slug>.html` and
  `dist/bn/blog/<slug>.html` (kills the client-only regression class);
- `audience: uk` panels may not contain `hajj.gov.bd`, `BDT`, `Dhaka` or
  `Bangladesh`, and every English fact must stay dated;
- no page repeats the FAQ heading;
- the old fixture that expected a *shared* panel on an Umrah-category post now
  asserts its absence;
- the "shared Umrah framing carries the dated official fee anchor" surface moved
  from `BlogPostRouteView` to `src/components/UmrahLandingPage.tsx`, the last
  place that shared panel still lives, and that copy gained the
  "estimated at 300 Saudi Riyals (checked 15 Oct 2026)" anchor so it quotes the
  Ministry fee instead of only a BDT planning estimate.

## Phase 2 queue (Bangladesh cluster, 17 posts)

Author `aeoFacts` per post from its own dated material, in this order:

1. Hajj/Umrah (11): `hajj-registration-bangladesh-…`, `nusuk-app-saudi-visa-bio-…`,
   `tawaf-sai-…`, `hajj-rites-…`, `makkah-hotel-sectors-…`,
   `where-to-stay-madinah-…`, `makkah-budget-shuttle-…`,
   `makkah-to-madinah-haramain-…`, `family-elderly-umrah-hotels-…`,
   `makkah-hotel-walking-time-…`, `hajj-umrah-accommodation-…`
2. Ziyarah/stopovers (6): `makkah-madinah-badr-taif-…`, `umrah-dubai-10-day-…`,
   `abu-dhabi-sheikh-zayed-…`, `malaysia-islamic-heritage-…`,
   `europe-uk-usa-sightseeing-…`, `bangladeshi-halal-food-guide-…`

Acceptance per batch: `npm run build` + `npm run verify:build` green, panel in
both locales, `audience: bd`, SAR/BDT figures dated, no duplicate FAQ heading.
