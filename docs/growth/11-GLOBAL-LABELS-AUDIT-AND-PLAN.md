# Global labels, Bangladesh-first experience
## Audit and staged plan for removing "BDT" from tool names

**Status:** proposal — nothing in this document has been applied.
**Date:** 13 November 2026 · **Scope:** labels only. No content, no URLs, no money text.

---

## 1. What you asked for, restated

> Move the site from "a Bangladesh site" to "a site that works everywhere", where Bangladeshi readers
> still see their own things first. Content stays as it is for now. Only the names of the buttons and
> the tools that are useful to anybody should stop being called BDT.

That splits into two separate questions, and they should not be answered in the same PR:

| Question | What it really changes | Risk |
|---|---|---|
| **A. What are the tools called?** | Button/tool/UI strings | Low — if titles and URLs are left alone |
| **B. Who is the site for?** | Positioning: currency defaults, ordering, new market pages | Medium — but it is *content and defaults*, not labels |

This plan covers A completely and sets out B as a later, separate phase. My recommendation in
§7 is to do A first and small, because A is the cheap half and it buys most of the "global" feel.

---

## 2. The finding: "BDT" is doing four different jobs

A scan of `src/**/*.{ts,tsx}` and `content/blog/*.md` found **1,057 occurrences of "BDT" in 58 files**.
They are not one thing. Renaming them as if they were would be the mistake.

| # | Job it does | Occurrences | Example | Verdict |
|---|---|---|---|---|
| 1 | **Money fact** — an amount, a rate, a range | **595** | `BDT 1,16,000–1,32,000`; `1 USD ≈ 100 BDT` | **Never touch.** It is the currency, not a label |
| 2 | **Prose** — body sentences that talk about money | **164** | "enter the BDT totals for the same dates" | **Keep.** Editing prose is the content change you excluded |
| 3 | **Tool or button name** | **147 occurrences / 121 distinct strings** | "BDT Calculator", "Trip Cost Calculator in BDT", "Open BDT Currency Tool" | **This is the rename set** |
| 4 | **URL, slug or code identifier** | **51 in source + 3 live slugs** | `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost`, `blogLinks.ts` keyword `"bdt"` | **Do not rename.** Redirects and lost link equity |
| 5 | **SEO title / description field** | **32** flagged, plus ~20 cost-page titles | "…5-Day Trip Cost Calculator in BDT" | **Later phase, with monitoring** (§5, Wave 3) |

Within bucket 3, the 121 distinct strings are again two different things:

- **~38 true tool names** — buttons, badges, `<h2>`s, aria labels. Safe to universalise.
- **83 internal-link anchor strings** in `src/constants.ts` and `src/data/bengaliContent.ts`
  (`{ text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" }`).
  Cosmetic, but anchor text is a (weak) relevance signal — a separate wave.

### What is already in place, and helps

- `preferredCurrencyForOrigin()` returns **BDT for Bangladesh origins, USD otherwise** —
  the mechanism for "BD readers first" already exists and does not depend on a label.
- The white-label flight search takes an explicit `currency` and `locale` parameter.
- The Bengali tree (`/bn/**`) already targets Bangladeshi readers directly.

So the experience can stay Bangladesh-first while the *names* go neutral. That is the whole trick:
**default the currency by origin, not the label by market.**

---

## 3. Direct answer: will this break SEO, AEO or functionality?

### SEO — mostly no, with two real exceptions

| Change | SEO effect | Why |
|---|---|---|
| Button, badge, aria label | **None measurable** | Buttons do not rank; they are not in `<title>`, `<h1>` or body text |
| `<h2>` inside a tool page | **Small, positive-to-neutral** | "Cost Calculator" is the broader, more competitive and more useful head term; it is not a downgrade |
| Internal anchor text (83) | **Small, uncertain** | Anchor text feeds the link graph. Low weight internally, but it is the one part that could nudge rankings |
| `<title>` / meta description / article headline | **Real risk** | These are the ranking assets. "BDT cost" titles match Bangladeshi queries that currently send traffic. Changing them means re-earning those positions |
| Slug rename (3 live URLs) | **Real risk** | 301s, sitemap churn, loss of backlink equity, and the redirect can never be removed |

**The honest mentor answer you need:** replacing "BDT Calculator" with "Cost Calculator" will **not**
make the site rank globally. Global reach comes from content, language and internal structure — that is
Phase B, and it is a content programme. What the label change does is remove an *exclusion signal* from
your buttons: a reader in London is not told "this tool is not for you". That is worth doing; it is just
not the thing that moves rankings.

### AEO — one rule, and it is enforceable

The risk is **schema text drifting from visible text**. Your `FAQPage` answers and the `#faq` copy must
stay word-for-word consistent; your existing gates already check this. Two consequences:

1. If a Q&A says "the BDT calculator" and you rename the button, the *answer* can still say BDT — that
   stays consistent because the answer describes what the tool does with money.
2. **Keep the phrase "BDT calculator" once per tool page, in body copy**, e.g.
   "Prices are shown in Bangladeshi Taka (BDT) by default for readers in Bangladesh."
   This preserves the entity/query association for anyone who searches it, while the button reads
   universally. Removing the phrase from *both* button and body is how you lose the query.

### Functional — low, but three concrete traps

1. **Tests assert label text.** 15 test files mention BDT. Most assert money facts (safe). At least
   `scripts/test-umrah-budget.ts:93` (`"Whole-party totals by category (BDT)"`) and
   `scripts/verify-build.ts` assertions pin label strings. Every rename must land in the same commit as
   its assertion, or the gate goes red — which is the correct behaviour.
2. **Bengali parity.** Each English label needs a Bengali twin, written for Bengali readers rather than
   transliterated, and codepoint-verified (0980–09FF only — this project has leaked Devanagari twice).
   "BDT ক্যালকুলেটর" → "খরচ ক্যালকুলেটর" is natural; "Cost Calculator" → "কস্ট ক্যালকুলেটর" is not.
3. **`blogLinks.ts` keyword list** contains `"bdt"` as a topic tag. That is a *classification* keyword, not
   a label. Removing it changes which posts get recommended to each other. Leave it.

No `#bdt`-style anchors exist. No analytics event names contain BDT. Those risks are absent — I checked.

---

## 4. Bangladesh-first, without a Bangladesh-only name

Four mechanisms, none of which touch your content:

1. **Currency default by origin** — already implemented: BD departures open in BDT, everything else in USD.
2. **A visible "Currency" selector** on every money tool, BDT preselected for BD readers. This is what
   makes the tool genuinely universal instead of just renamed. *Recommended, Wave 1 companion.*
3. **Content order** — the homepage and hubs keep the Bangladeshi reader's paths first (unchanged).
4. **The `/bn` tree and BD-specific guides** (visa, Dhaka routes, Umrah from Bangladesh) are the real
   first-show signal — far stronger than any button name.

The rule I would hold to: **default to the reader's currency, never assume the reader's country.**

---

## 5. The staged plan

Each wave is one PR, one concern, gates green before the next. Every wave is revertible as a single
commit.

### Wave 0 — baseline (needed before anything changes)
- Record current titles, impressions and query mix for the tool pages and the 20 "…in BDT" cost posts.
- Freeze: no `<title>`, `<h1>`, slug or money-string edits during Waves 1–2.
- Optional guard: a `verify:build` check that the count of BDT tool labels never *increases*.

### Wave 1 — the ~38 true tool names *(recommended first move)*
Scope: `SitemapPage.tsx`, `UmrahLandingPage.tsx`, `GlobalAttractionsHub.tsx`, `BlogPostRouteView.tsx`,
`App.tsx` tool-hub copy, `TripCostEstimator`, `UmrahBudgetCalculator`, `CurrencyConverter` labels.
- "Open BDT Currency Tool" → "Open Currency Converter"
- "Trip Cost Calculators (BDT)" → "Trip Cost Calculators"
- "1. BDT Cost Calculator" / "১. BDT বাজেট ক্যালকুলেটর" → "1. Cost Calculator" / "১. খরচ ক্যালকুলেটর"
- "…& BDT SLOT PLANNER" → "…& Slot Planner"
- "Your quotes & allowance (BDT)" → "Your quotes & allowance"
- `(BDT)` suffix in cost-page links → dropped; currency shown by the selector instead

Gates: `lint` · `tsc` · affected tests updated in the same commit · rendered HTML inspected ·
BN codepoint scan · `verify:build` at full count (514 today).

### Wave 2 — the 83 internal anchor strings
Only after Wave 1 has been live and stable. Same gates, plus: internal-link counts unchanged,
no duplicate paths (this project fails on duplicates), anchor text still descriptive.

### Wave 3 — SEO titles (the risky one, and optional)
20 cost-page titles and ~12 article titles carry "in BDT" / "BDT Cost". Options, in order of preference:

1. **Do nothing.** Keep them. They are ranking assets; the button is already neutral. *(My default.)*
2. **Market-split titles later:** keep "BDT" for the `/bn` and BD pages, use neutral titles for new
   English/global pages. No existing ranking is disturbed.
3. **Rewrite in place** — only with the Wave 0 baseline in hand, one URL at a time, four weeks apart.

### Wave 4 — actually going global (separate programme)
Currency defaults per market, new destination pages, `hreflang` expansion beyond `en-bd`/`bn-bd`,
and market-specific internal linking. This is a content project measured in weeks, not a rename.

---

## 6. Hard do-not-touch list

- Every amount, range and rate (`BDT 1,16,000`, `1 USD ≈ 100 BDT`, `৳`). 595 occurrences.
- The three live slugs containing `bdt`, and `blogLinks.ts`'s `"bdt"` keyword.
- `translations.ts` key `bdtCurrency` and the currency code `BDT` in code, tests, `rates`, `normalizeUpstreamRates`.
- FAQ/schema answers that state money in BDT — schema and visible text move together or not at all.
- Any prose sentence about paying in BDT. That is content, and content is frozen.

---

## 7. My recommendation, as your mentor

**Do Wave 1, and only Wave 1, next.** It is ~38 strings, it is the part a foreign reader actually sees
as a closed door, and it carries no measurable SEO risk because titles and URLs stay untouched. It also
gives us a clean rehearsal: one concern, full gates, real HTML inspected, revertible in one commit.

Then stop and let it sit. Wave 2 is cosmetic-but-linked-to-relevance and Wave 3 is where money is lost
if it goes wrong; neither needs to be decided this week.

**One thing I would not do:** rename the tool names *and* the titles in the same pass. That is exactly
the "big task at a time" failure mode we have already been burned by — if rankings dip afterwards, you
will not know which half caused it.

---

## 8. Three decisions I need from you

1. **Titles:** keep "…in BDT" in article and cost-page titles for now (my recommendation), or
   universalise them too?
2. **Currency selector:** add a visible "Currency" control with BDT preselected for Bangladeshi readers
   (my recommendation), or keep BDT hard-set on BD-facing tools?
3. **Language of the new names:** "Cost Calculator" for English — and for Bengali, "খরচ ক্যালকুলেটর"
   (natural Bengali) rather than "কস্ট ক্যালকুলেটর" (transliteration)?
