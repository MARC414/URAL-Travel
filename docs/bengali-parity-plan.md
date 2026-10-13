# Bengali Parity Programme — working tracker

**Status: IN PROGRESS.** This file is a live tracker for a multi-session programme.
Delete it when the programme completes (AGENTS.md §7 — docs are not archives).

---

## Why this exists

The site publishes in English and Bengali. Measured against the built output on
2026-10-14, the figures were:

| Page group | English body | Bengali body | Ratio |
|---|---:|---:|---|
| Home | 1,024 | 45 | 4% |
| /visa hub | 1,338 | 80 | 6% |
| /visa/nepal-visa | 923 | 169 | 18% |
| /flights hub | 1,152 | 91 | 8% |
| /hotels hub | 1,200 | 95 | 8% |
| /costs hub | 1,073 | 95 | 9% |
| /contact | 343 | 42 | 12% |
| /about | 724 | 55 | 8% |
| /visa-free-countries | 1,755 | 55 | 3% |
| /umrah | 773 | 636 | 82% |
| **Blog (median of 47)** | **965** | **625** | **65%** |

So the problem is **not** the blog — that was already written properly, post by
post, and is the model to copy. The problem is every **hub and detail page**,
which ships a Bengali heading, one intro paragraph and a link list. Those pages
are not translations and must not be presented as such.

Two defers fed this:

- `DEFERRED_BN_GROUPS` in `src/utils/localeRoutes.ts` switches off `/destinations`
  entirely — 7 English routes with no Bengali twin at all.
- Everywhere else, the Bengali twin exists but is a shell.

## The standard this programme holds

A page is at **parity** when a Bengali reader gets the same facts, the same
figures, the same caveats and the same sourcing as an English reader — written
in Bengali for a Bengali reader, never machine-translated, never an English body
under a Bengali heading.

Where parity is not yet reached, the page must not claim it. The About page
claimed parity site-wide; that was false and was corrected in Unit 0.

## Tier 1 — full parity (a Bengali reader's real questions)

| Section | Routes | Units |
|---|---:|---|
| **A. Destinations** (hub + 6 guides) | 7 | A1–A8 |
| **B. Visa-free countries** (the flagship pillar) | 1 | B1–B2 |
| **C. Visa** (hub + 6 guides) | 7 | C1–C8 |
| **D. Costs** (hub + 6 guides) | 7 | D1–D8 |
| **E. Trust pages** (/about, /contact, /privacy) | 3 | E1–E3 |
| **F. Umrah** parity review (already 82%) | 1 | F1 |

## Tier 2 — honest summary level

These keep a summary, but the summary must be true and must say what it is.
No parity claim, no English body under a Bengali heading.

| Section | Routes |
|---|---:|
| G. Flights (hub + 6 routes) | 7 |
| H. Hotels (hub + 6 areas) | 7 |
| I. Home, /tools, /sitemap, /experiences, /blog hub | 5 |
| J. Blog — 1 missing override, 5 stale override keys | small |

---

## Section A — Destinations (ACTIVE)

The one fully-deferred section, and the top of the funnel for every trip.
Six countries: Nepal, Thailand, Malaysia, Dubai, Singapore, Maldives.

Per destination, writing required: `country`, `title`, `description`,
`bestTimeToVisit`, 4–5 itinerary days (day title + 3 activities each),
3 `localTransport` entries, `budgetBdt`, `quickAnswer`, 4 `keyFacts`, 5 `faqs`.
That is ~43 strings of real Bengali per destination, ~260 for the section.

| Unit | Deliverable | State |
|---|---|---|
| A0 | Recon: data shape, consumer chain, scale | ✅ done |
| A0b | Defect sweep — four defects found and fixed (see below) | ✅ done |
| A3 | 🇹🇭 Thailand — written at parity (4 days, 3 transport, 5 key facts, 5 FAQs, 39 nested strings) | ✅ done |
| A4 | 🇲🇾 Malaysia — written at parity (4 days, 3 transport, 5 key facts, 5 FAQs, 39 nested strings) | ✅ done |
| A1 | `src/data/bengaliDestinations.ts` + `getLocalizedDestinations()` + client wiring | ✅ done |
| A2 | Nepal guide | ✅ done |
| A3 | Thailand guide | ☐ |
| A4 | Malaysia guide | ☐ |
| A5 | Dubai guide | ☐ |
| A6 | Singapore guide | ☐ |
| A7 | Maldives guide | ☐ |
| A8 | Prerender body branch — render the localized data as crawlable Bengali | ☐ |
| A9 | Lift the deferral + Bengali SERP copy for all 7 routes | ☐ |
| A10 | Verify: 92/92 routes, reciprocal hreflang, sitemap clusters, build checks | ☐ |

**Deferral lifts only at A9.** Removing `/destinations` from
`DEFERRED_BN_GROUPS` before all six guides are written would ship English-bodied
`bn-BD` pages — the exact failure the deferral was added to prevent.

## Recommended order after Section A

B first (the flagship page, highest external value), then C and D (highest
search volume for a Bengali reader), then E, F. Tier 2 last.

---

## Standing rules for every unit

1. **Facts, figures and caveats must match the English page exactly.** No
   softened claims, no dropped caveats, no invented numbers.
2. **BDT amounts stay in Latin digits** (`BDT 20,000`); durations, days and
   counts use Bengali digits (`৫ দিন`). This matches the existing house
   convention in `src/data/bengaliContent.ts`.
3. **Place names are transliterated** (`কাঠমান্ডু`, `পোখারা`), never left in
   Latin script inside Bengali prose. Airport and app names keep their Latin
   form (`KTM`, `Pathao`) because they are searched that way.
4. **No page claims parity until it has it.**

---

## Defects found while auditing (2026-10-14) — both fixed

**1. The client did not honour `DEFERRED_BN_GROUPS`.** The prerender has always
refused to publish deferred routes in Bengali; the client's `navigateTo()` and
`getLocalizedRouteHref()` did not consult the same gate. So on every Bengali
page, 7 menu links (the destinations hub + six guides) resolved to `/bn/…`
URLs that do not exist: the SPA rendered them, but the address bar URL 404d on
refresh, on share, and for any crawler. The footer's "Plan Your Trip" column
added an 8th when it was written.

Fixed in the two helpers rather than at the five surfaces that render those
links (desktop mega-panel, mobile drawer, drawer CTA, homepage grid, footer),
so future surfaces inherit the fix. The fallback is the English path — a page
that exists — and because `lang` is derived from the URL, the whole UI follows
into English coherently. **This self-heals at A9**: once the Bengali guides
ship, `hasBengaliCounterpart()` returns true and the links return to `/bn/…`
with no further edit.

**2. `bnLinkList` converted paths to Bengali before resolving aliases.**
`/pre-departure` aliases to `/sitemap` (which has a Bengali page), but the
Bengali link builder applied `toBengaliPath()` first, producing
`/bn/pre-departure` — a 404 in the crawlable HTML of three Bengali blog pages.
The English link builder already resolved aliases first; the Bengali one did
not. Every Bengali internal link is built by that one function, so the fix
covers all of them.

**Standing check after any Bengali work:** sweep every built page for internal
links that do not resolve. A full sweep on 2026-10-14 checked 4,501 internal
links across 179 pages and found zero dead targets.

**3. Three destination guides never mentioned the visa requirement.** Nepal (the
free-visa destination) named it six times; Thailand, Malaysia and the UAE named
it zero times, and those are the three where a Bangladeshi passport holder needs
an advance application. Each guide linked to its own visa page, but nothing in
the guide itself said a visa was needed. Each now carries one key fact and one
FAQ, stating only what the site's own visa pages already publish (`538fda7`).

**4. Detail pages carried no FAQ content in their static HTML, and two verticals
carried no key facts either.** `getFaqSchemaForPage()` reads its record from a
fifth parameter, `routeItems`. The client passed it on all twelve calls; the
prerenderer passed it on none of its five detail-page calls, so the lookup
always returned `null` and both consumers went silent — the `FAQPage` node and
the visible FAQ section built from the same object. Destinations and costs also
never rendered `keyFacts`, though flights, hotels and visa did.

Fixed by passing the five datasets and emitting the two missing key-facts
sections (`6082fce`). Across the 30 detail pages: **crawlable words 21,401 →
26,922 (+26%)**, **FAQPage schema 0/30 → 30/30**. This matters to the Bengali
programme directly — the renderer that now emits the English answers is the same
one that will emit the Bengali answers.

Not a defect: the Bengali builder deliberately strips `FAQPage` nodes from the
English detail routes (`prerender.ts` ~2558). English FAQ schema must not appear
on a Bengali page. Bengali detail pages emit their own `bn-BD` FAQ schema when
they have their own answers, the way the Umrah route and the Bengali blog posts
already do. **This is a per-unit requirement at A3–A9, not a separate fix.**

---

---

## Unit log

### A3 — Thailand — DONE
`src/data/bengaliDestinations.ts`, entry `thailand-guide`. Every field of the
English guide is translated: 6 prose fields, 4 itinerary days × 3 activities,
3 local-transport options, 5 key facts and 5 FAQs — 39 nested strings. The
counts match the English source exactly, so neither locale is a summary of the
other. `schemaMarkup` deliberately stays English (machine-read JSON-LD).

Checked by script, 22 assertions, all passing: locale arrays agree in length and
order; every nested string contains Bengali; the English array is byte-identical
to before; the Bengali title is its own text; BDT amounts keep Latin digits
while counts use Bengali digits; the visa key fact says "Visa on Arrival নেই".

Cost: the lazy Bengali chunk went 520,767 → **531,742 bytes (+11 KB)**. English
routes load none of it. At this rate all six guides add roughly 65 KB to a chunk
only Bengali readers ever download.

**Dormant until A9, by design.** `/bn/destinations` is still deferred, so no
Bengali URL, no hreflang, no sitemap entry, and nothing links to the page —
`_redirects` has no SPA fallback, so it genuinely 404s. A8 switches the
prerendered body to Bengali and A9 lifts the deferral for the whole section at
once. Until then this copy is verified data waiting for its route.

Remaining in Section A: **A4 Malaysia → A5 Dubai → A6 Singapore → A7 Maldives**,
then A8 prerender body, A9 lift deferral + Bengali SERP copy, A10 verify 92/92.

### A4 — Malaysia — DONE
`malaysia-guide`. Same contract as A3: 6 prose fields, 4 itinerary days × 3
activities, 3 transport options, 5 key facts, 5 FAQs, 39 nested strings, all
Bengali. Counts match the English source exactly.

The visa FAQ reproduces the figures on `/visa/malaysia-visa` — checked
programmatically, not by eye: BDT 3,800 to 4,200, bank balance BDT 80,000,
2 to 4 working days, all confirmed present in both the visa page and the guide.
JAKIM halal certification and the free GOKL city bus are stated by name, as the
English page does.

Bengali chunk: 531,742 → **542,081 bytes**. Roughly 10 KB per guide, so the
remaining two plus the hub land near 575 KB — still a chunk only Bengali readers
download. tsc clean, 92 EN + 85 BN routes, verify:build 80/80, sweep 0/4,501.
