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

---

## 9. Decision log (13 November 2026)

| # | Decision | Choice | Consequence |
|---|---|---|---|
| 1 | Titles that say "in BDT" | **Keep for now** | Waves 1–2 cannot touch `<title>`, `<h1>`, meta description, or article headlines |
| 2 | Visible currency control | **Yes** — BDT preselected for Bangladeshi readers | See §11: the pattern already exists, so this is extension, not invention |
| 3 | Bengali wording for the universal name | **"কস্ট ক্যালকুলেটর"** (transliteration) | Applied exactly as chosen |

**One caution on decision 3, recorded once and then respected.** Bangladeshi readers search
"খরচ ক্যালকুলেটর" and "কত টাকা লাগবে" far more than "কস্ট". So the plan pairs the transliterated
*label* with the natural *body phrase* — the button says "কস্ট ক্যালকুলেটর", and the page's own
sentence still says "খরচ ক্যালকুলেটর" once, which keeps the query match without contradicting the
label. This is the same principle as keeping "BDT calculator" in body copy: the label can be brand
language, the sentence must be search language.

---

## 10. Exact Wave 1 change list — the strings, not a category

The earlier estimate of "~38 tool names" was an over-count from a keyword filter: it included prose
sentences and SEO descriptions. Curated by hand, the true button/badge/tool-title set is **20 items
(22 strings, EN+BN)**. Nothing else in Wave 1.

| # | File:line | Current | Proposed |
|---|---|---|---|
| 1 | `SitemapPage.tsx:86` | "Open BDT Currency Tool" | "Open Currency Converter" |
| 2 | `SitemapPage.tsx:1077` | "BDT Budget" / "BDT বাজেট" | "Trip Budget" / "ট্রিপ বাজেট" |
| 3 | `SitemapPage.tsx:1316` | "Trip Cost Calculators (BDT)" | "Trip Cost Calculators" *(BN already natural — unchanged)* |
| 4 | `UmrahLandingPage.tsx:79` | "BDT budget tool reviewed: 18 October 2026" | "Budget tool reviewed: 18 October 2026" + BN twin |
| 5 | `UmrahLandingPage.tsx:314` | "1. BDT Cost Calculator" / "১. BDT বাজেট ক্যালকুলেটর" | "1. Cost Calculator" / "১. কস্ট ক্যালকুলেটর" |
| 6 | `UmrahLandingPage.tsx:350` | "…INTERACTIVE BDT CALCULATOR" (H2) | "…INTERACTIVE COST CALCULATOR" |
| 7 | `GlobalAttractionsHub.tsx:290-291` | "Live Availability Calendar & BDT Calculator" / BN | "Live Availability Calendar & Cost Calculator" / "লাইভ অ্যাভেইলেবিলিটি ক্যালেন্ডার ও কস্ট ক্যালকুলেটর" |
| 8 | `ExperiencesPage.tsx:564-565` | "…Skip the Line in BDT" / BN | "…Skip the Line" / "…(BDT গাইড)" → "…গাইড" |
| 9 | `ExperiencesPage.tsx:649` | BN "লাইভ সিটি পাস ও BDT ক্যালকুলেটর" | "লাইভ সিটি পাস ও কস্ট ক্যালকুলেটর" |
| 10 | `ExperiencesPage.tsx:654` | "Calculate Full-Day City Bundle in BDT" | "Calculate Full-Day City Bundle" |
| 11 | `TripCostEstimator.tsx:128` | "Your quotes & allowance (BDT)" / BN | "Your quotes & allowance" / "আপনার কোটেশন ও বরাদ্দ" |
| 12 | `UmrahBudgetCalculator.tsx:89-90` | "Whole-party totals by category (BDT)" / BN | "Whole-party totals by category" / "পুরো দলের খাতওয়ারি মোট" |
| 13 | `BlogPostRouteView.tsx:1544` | "Open Umrah BDT Calculator" / "Umrah BDT ক্যালকুলেটর" | "Open Cost Calculator" / "কস্ট ক্যালকুলেটর খুলুন" |
| 14 | `App.tsx:2806` | "Top Residency Experiences in BDT" | "Top Residency Experiences" |
| 15 | `App.tsx:3227` | "Nusuk permit & DIY BDT cost" | "Nusuk permit & DIY cost" |
| 16 | `App.tsx:3297` | "3-tier BDT cost matrices by country" | "3-tier cost matrices by country" |
| 17 | `App.tsx:4186` | "…convert BDT, check what to pack…" / BN twin | "…convert currency, check what to pack…" / "…কারেন্সি কনভার্ট করুন…" |
| 18 | `PriceAlertModal.tsx:259` | "3. Target Budget in BDT (Optional)" | "3. Target Budget (Optional)" |
| 19 | `toolRoutes.ts:141` | "…display your estimate in BDT" | "…display your estimate in your currency" |
| 20 | `ContactRouteView.tsx:465` | BN "হোটেল বুকিং সহায়তা (BDT)" | "হোটেল বুকিং সহায়তা" |

### Flagged — need your word before they move (not in Wave 1)
- `translations.ts:27` — homepage hero highlight **"Flights, Hotels & Visas in BDT"**. That is brand
  copy on the first screen of the site. Neutral version: "Flights, Hotels & Visas". Say the word and it
  joins Wave 1; otherwise it stays.
- `BlogPostRouteView.tsx:1641` — "Book Hotel & Flight in BDT (WhatsApp)". That is a **payment method**
  (the WhatsApp desk settles in Taka), not a tool name. My recommendation: keep.

### Tests that must change in the same commit
`scripts/test-umrah-budget.ts:93` asserts `"Whole-party totals by category (BDT)"` — item 12 breaks it
by design. Any `verify:build` assertion pinned to these labels gets found and updated in the same PR;
the gate going red is the correct signal, not an obstacle.

---

## 11. Decision 2 is already half-built

`TripCostEstimator.tsx` already carries a real currency control:

- `displayCurrency = currencyChoice ?? preferredCurrencyForOrigin(origin)` (line 40)
- a visible `<select id="trip-display-currency">` with BDT/USD (line 168)
- graceful fallback to BDT when a USD rate is unavailable (line 49, 192)

So "universal tool, Bangladeshi default" is **already true** on the estimator, and the label on that
page is the only thing lying about it. The remaining work for decision 2 is small and belongs with
Wave 1 as a companion:

1. widen the selector beyond BDT/USD (EUR, GBP available from the same rates table) — optional;
2. add the same control to `UmrahBudgetCalculator` (it currently hard-sets BDT);
3. label the control "Currency" / "কারেন্সি", with BDT preselected for BD origins.

---

## 12. Status

- **Wave 1 executed on owner approval (13 Nov 2026):** the 20 rows of §10 plus the `/experiences`
  H1 — 21 items, 34 strings including Bengali twins. Titles, meta descriptions, slugs, prose, money
  strings, FAQ/schema answers and the 83 internal anchors were **not** touched.
- Two rows needed a word added rather than deleted (`toolRoutes` "in your chosen currency") because a
  pure deletion left the sentence ungrammatical; both were listed before execution.
- The Bengali `(BDT)` suffixes were removed with byte-level edits on the existing strings — never
  retyped — because four hand-typed replacements did not match the file's codepoints on the first pass.
- `scripts/test-umrah-budget.ts` assertion updated in the same commit, and a negative assertion added
  so the old label cannot creep back.
- Verification: old strings absent and new strings present for all 17 English pairs in the shipped
  bundle; `verify:build` 514/514; lint, tsc and 10 test scripts pass. `test:journey-help` fails on a
  clean checkout of `672d8a2` as well (10 cluster posts lack `journeyStage`) — pre-existing, unrelated.

### Superseded note (kept for the record)
- This document was originally report-only: **no label, title, URL or money string changed** until the
  owner approved §10 on 13 November 2026.
- Wave 1 as listed in §10 is ready to execute on your word: one PR, ~20 edits, tests updated in the
  same commit, rendered EN+BN HTML inspected, Bengali codepoint scan, `verify:build` at full count.
- Waves 2–4 remain undecided and unstarted.
