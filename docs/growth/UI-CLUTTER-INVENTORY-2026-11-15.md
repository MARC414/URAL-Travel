# UI clutter inventory — decision sheet

**Lifecycle: proposal, awaiting owner approval · 15 November 2026.** Nothing in this
document has been applied except item S1, which the owner approved on the same day.
Counts come from `node scripts/ui-clutter-inventory.mjs` against this commit; they
are a starting point for a decision, not a work order. A match can be a label, a
prose sentence or a required disclosure, so each row needs a human check against a
real page before deletion.

Why this exists: the owner is removing repeated labels and rows page by page so the
site answers one question — "what do I need for this destination?" — without
decorative scaffolding. This sheet turns 142 pages of that work into one list that
can be ticked, then applied in batches with `verify:build` between each batch.

## Already done (15 November 2026)

| ID | What | Where | State |
|---|---|---|---|
| S1 | "Popular Hubs:" row and its destination chips | Flight widget (`TravelpayoutsWidget.tsx`), hotel/flight widget (`TravelpayoutsCustomWidget.tsx`), plus the matching skeleton band in `App.tsx` | **Removed**, owner-approved |

## 1. Shortcut rows of the same family

| ID | Candidate | Where | Count | Risk if removed | Decision |
|---|---|---|---|---|---|
| S2 | "Popular hotel areas:" chip row | Homepage hotel search panel | 1 page | Low — the hotel widget still searches any city | [ ] remove |
| S3 | "Jump to a Popular Destination" panel | 404 route | 1 page | Low — the 404 still links home, guides and search | [ ] remove |
| S4 | "More Essential Hubs:" bottom bar | Sitemap page | 1 page | Low — duplicates the site navigation above it | [ ] remove |
| S5 | "Some popular searches…" paragraph | Flights index | 1 page | Low — prose only, no commercial link | [ ] remove |

## 2. Answer and fact blocks that repeat each other

| ID | Candidate | Where | Count | Risk if removed | Decision |
|---|---|---|---|---|---|
| A1 | `QuickAnswer` block | Blog header, flights, hotels, visa, visa-free, costs | 6 views | **Medium** — this block is the extractable answer AI search engines quote, and several schema checks read the same text. Removing it changes AEO output, not just layout | [ ] review per page |
| A2 | "…at a glance" fact tables | Destinations (2), flights, visa, costs, attractions, banking | 17 blocks | **Medium** — some hold the only dated source line on the page | [ ] review per page |

If A1 and A2 shrink, do it as one decision: keep exactly one answer block per page,
at the top, and delete the duplicate fact table below it.

## 3. Eyebrow and badge stacks

| ID | Candidate | Where | Count | Risk if removed | Decision |
|---|---|---|---|---|---|
| B1 | Uppercase micro-label above a heading ("QUICK IATA REFERENCE", "FLIGHT SEARCH", "PLAN YOUR NEXT TRIP FROM DHAKA"…) | Homepage and route heroes | 13 | Low — decorative; the heading below already carries the meaning | [ ] remove |
| B2 | Rounded status badges inside cards ("v2", "Live", "New") | Cards and panels | ~20 | Low | [ ] remove |

## 4. Hype wording that is not a claim we can defend

| ID | Candidate | Where | Count | Risk if removed | Decision |
|---|---|---|---|---|---|
| C1 | "Trusted by", "Verified partner", "100% Free", "No travel agent needed", "Best price guaranteed" | Cards, widgets, embed panels | 24 | Low to remove; **keep** anything that is a factual disclosure rather than a boast | [ ] remove hype only |

## 5. Repeated disclosure lines

| ID | Candidate | Where | Count | Risk if removed | Decision |
|---|---|---|---|---|---|
| D1 | Commission / "not a government site" sentences repeated inside blocks | Widgets, embeds, experiences, destination views | 9 | **High if removed everywhere** — a paid placement needs a label at the placement and the site footer needs the commission line. The homepage now relies on its ad caption plus the footer | [ ] consolidate, do not blanket delete |
| D2 | Per-block ad captions | eVisas placements | 5 | Required | [ ] keep |

## 6. Whole panels repeated across routes

These are not lines, they are sections. Counts are the number of views that render them.

| ID | Component | Views | Note |
|---|---|---|---|
| E1 | `TravelEssentials` | 6 | Same hub on home, blog, costs, destinations, hotels |
| E2 | `TravelpayoutsCustomWidget` | 5 | Home, umrah, destinations, hotels, tools |
| E3 | `QuickAnswer` | 6 | See A1 |
| E4 | `MultiPartnerBlogCallout`, `RadicalStorageContextualCallout`, `JourneyHelpPanel` | 2 each | Article sidebar and footer stack |

Removing any of E1–E4 is a conversion decision, not a cleanup decision. It changes
what a reader can book from a page.

## 7. Do not remove

- Dated source lines and "checked on" notes: the Number rule requires a date and a
  source for every published money figure.
- `Advertisement` labels and the eVisas private-service wording.
- Official-portal links, passport qualifications (Thailand), Morocco's residence
  condition, and the "not an approval guarantee" sentences.
- Canonical, hreflang, JSON-LD and skip-link markup.

## How to apply an approved batch

1. Regenerate the counts: `node scripts/ui-clutter-inventory.mjs`.
2. Delete only the ticked rows, one batch per area (widget / route / card).
3. Run `npm run lint`, `npm run build`, `npm run verify:build`.
4. Check the touched routes in a browser at 320, 390, 768 and 1280 CSS pixels, in
   English and Bengali. Removing a row cannot be verified by the build alone.
5. Update this sheet: tick the row, record the date, and delete the entry once the
   work has shipped (a finished to-do does not belong in the repo).
