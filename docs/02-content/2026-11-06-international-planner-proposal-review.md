# Review — "International Trip Budget Planner" proposal for `/umrah`

**Date:** 6 November 2026 · **Lifecycle:** dated review, supporting evidence. **No implementation applied.**

**Subject:** an external analysis proposing to replace the `#umrah-calculator` section on
`https://uraltravel.co.uk/umrah` with a standalone `ural-international-budget-planner.html`
(global heading, multi-currency dropdown with hardcoded rates, duration field, dynamic cost rows),
to close three claimed "lacks" and to serve an Indonesia-specific Visa/BRN/CRN question.

**Status of the submission:** the attached HTML file was **not present in this workspace**, so this review
assesses the proposal's description of it plus the code it claims to replace. The analysis also names branch
`arena/f6a8d949-marc414`; the live session branch is `arena/56e63301-ural-travel`, and that other branch does
not exist in this repository. Both are provenance problems, not style notes.

**Verdict: do not apply as written.** The proposal misdiagnoses the current section, and its central
mechanism (a fixed-rate currency converter with a duration multiplier) is the one thing this repository has
already decided, in writing and in tests, not to ship. A small subset of the proposal is worth adopting; it is
listed in §5.

---

## 1. The three claimed "lacks" are two-thirds inaccurate

| Claim | What the repository actually contains | Assessment |
|---|---|---|
| "A blank worksheet demanding BDT, no duration logic, no BRN/CRN field" | `src/components/UmrahBudgetCalculator.tsx` is a quote worksheet with **8 categories** including `visa` = "Visa, insurance and service fees", a **traveller count** (1–100), whole-party totals, automatic **per-person equal share**, an **incomplete state** that refuses to show a total until every field is filled, explicit-zero rules for bundled items, and an `aria-live` result region. Prerendered into `/umrah` (EN) and `/bn/umrah` (BN), and hydrated identically on the live page. | **Inaccurate.** It is not blank text with empty boxes, and the visa line already exists. |
| "Currency: BDT only; no Indonesia IDR/USD/SAR" | Site-level multi-currency already exists — `TravelpayoutsCustomWidget` (`BDT/USD/EUR/GBP/SAR/AED`), the `/tools/currency-converter`, and the flight handoff that sends **BDT for a Bangladesh departure and USD for every other origin** (`src/utils/flightSearch.ts`, documented in `AGENTS.md` §3). The Umrah worksheet alone is BDT-only, **by design**. | **Half-inaccurate.** "The site has no multi-currency" is false; "this worksheet does not convert" is true and intentional. |
| "Heading: 'Umrah Cost from Bangladesh' should become a global 'Trip Budget Planner'" | `SEO-KEYWORD-MAP.md` row 1 assigns `/umrah` the "Umrah cost from Bangladesh" job; the H1, `seoTitle`, FAQ schema and prerendered `dist/umrah.html` all carry it, and tests assert the shared Umrah visa anchor in that surface. | **Inaccurate as a fix.** The heading is the page's ranking intent, not an oversight. Renaming it to a generic planner abandons the query the URL was mapped to. |

The word "hidden" in "Bangladesh priority (hidden)" appears nowhere in `PRODUCT.md`,
`00-URAL-CURRENT-AUDIT.md` or `AGENTS.md`. The documented commitment is the opposite:
`PRODUCT.md` positioning #2 — **"BDT-first pricing with real multi-currency context. Costs are budgeted
in Taka first (৳), then shown in USD/EUR/GBP/SAR/AED — not converted as an afterthought."**
A USD-default dropdown with BDT demoted to fourth is a reversal of a written product commitment, so it is an
owner positioning decision, not a calculator tweak.

---

## 2. The currency-and-duration engine is the regression, not the fix

This is the decisive point. The proposal's value comes from `amount × rate` and `total ÷ days` /
`total × travellers`. Both are excluded deliberately:

1. **The worksheet says so on the page.** The live copy states URAL "supplies no preset prices,
   **assumes no exchange rate** and claims no agency savings." A hardcoded `rateFromBdt` table would make
   that sentence false in the same `section`.
2. **Editorial policy forbids it.** `URAL-CONTENT-OPTIMIZATION-GUIDE.md` ("Prices, totals and dates"):
   *"Fixed widget exchange rates are not live rates"*, and a total requires
   "dates + party size + room sharing + duration + inclusions/exclusions + **currency + quote timestamp**".
   `docs/growth/CONTENT-OS.md`: *"A BDT conversion needs the SAR/BDT rate source and date. Do not multiply a
   stale exchange rate into a precise amount."* The proposal supplies neither a rate source nor a date.
3. **The exclusion has a recorded origin.** `docs/history/.../UMRAH-CLUSTER-PLAN.md` ¶110 records the
   18 October 2026 resolution: the hub was **replaced** with a user-quote worksheet
   "with no preset prices, assumed FX or savings arithmetic." Re-introducing FX arithmetic reopens a resolved
   defect rather than adding a feature.
4. **The duration arithmetic is simply wrong for this category list.** Of the 8 lines, `flights`, `visa`,
   `extras` (payment/FX fees, assistance) and `contingency` are not per-day quantities. A `days` field that
   multiplies or divides the grand total would either inflate a visa fee by the number of nights or do
   nothing at all. "14-day logic is now just typing 14" only works if every line is per-night — which is a
   *preset-price model*, i.e. exactly what was removed.
5. **Travellers already exist.** The proposal lists it as a gap ("`<input id="travellers">` automatically
   divide/multiply") while the shipped component already divides to an equal per-person share and already
   warns that equal sharing is not a child/adult fare allocation.

Net effect if merged: the page would print a precise multi-currency figure derived from an undated rate
table, plus a per-day total built from mixed per-trip and per-night lines. That is fabricated precision, and
it is the failure mode the current component was written to prevent.

---

## 3. The BRN/CRN question is real, but the proposal's answer invents its number

The underlying user need is legitimate. The Indonesia case is not a calculator limitation:

- Indonesian pilgrims **cannot self-apply**. Visa submission runs through a **PPIU** (Penyelenggara
  Perjalanan Ibadah Umroh) licensed by the Indonesian Ministry of Religious Affairs, because only a licensed
  PPIU holds Nusuk/Nusuk Masar access to lodge the application and validate hotel *tasreh*.
- Since the June 2025 tightening, a bare **BRN** is no longer sufficient; hotel approval inside Nusuk gates
  issuance. An "auto-fill BRN/CRN" feature is therefore impossible twice over: no public API *and* the values
  are agent-held, not traveller-held.

So the honest treatment is **guidance plus a manual line item**, which the worksheet already supports via its
`visa` category. What the proposal adds on top is a specific band — *"SAR 300 gov + insurance + BRN/CRN
agency fee ~USD 100–200"* — and that figure appears in no source in this repository. A dated web check on
6 November 2026 corroborates only the fee the repo already publishes: a government Umrah visa fee of
**SAR 300** (the Ministry FAQ calls it "estimated", checked 15 October 2026) plus mandatory medical insurance
commonly quoted at **SAR 100–180**, with any agent/package charge priced at issuance and not publishable as a
constant. The $207–$328 USD total in the proposal is an invented sum.

Also worth stating plainly: **a BRN is a booking reference, not a fee.** The thing that costs money is the
hotel/transport package that generates it — which is why the current copy says the all-in figure is
"what the approved platform or agent shows at issuance" and publishes no BDT total.

---

## 4. Concrete breakages if the HTML were dropped in

| Guard | Location | What breaks |
|---|---|---|
| Prerender markup identity for both locales | `scripts/verify-build.ts` §6598–6610, `scripts/prerender.ts` §1652, §3629 | The same React component must render into `/umrah` **and** `/bn/umrah`. A hand-written English-only HTML island fails both the BN page and the markup-equality assertion. |
| "No fabricated initial total" | `scripts/test-umrah-budget.ts` | Dynamic cost rows with default rows (`["Flights", …]`) ship a nonzero or misleading initial state; the 12 existing assertions cover empty→null, explicit zero, partial totals and money rounding. |
| EN/BN parity (hard requirement, owner clarification 5 Nov 2026) | `AGENTS.md` §2b, parity audit | No Bengali copy exists in the attached HTML. `/bn/umrah` would silently regress. |
| Design tokens and the Gold Ink / Taka rules | `DESIGN.md` | Custom CSS bypasses `@theme` tokens; `৳` handling and gold-on-light contrast are explicitly guarded. |
| Shared Umrah visa framing | `SHARED_UMRAH_BANNED_PATTERNS` (`verify-build.ts` §6468) | A preset "visa / entry fee" row re-introduces a price band into a surface that may only carry the dated SAR anchor — and no BDT visa price. |
| CSP note | `public/_headers` §101 | The file already records that inline script needs a nonce/hash project. An inline `<script>` block is not free. |

The proposal's own hedge — *"Because no tool auto-fills BRN/CRN without the paid API, add a placeholder"* — is
correct about capability but wrong about placement: a placeholder inside a price input is a price.

---

## 5. What is worth adopting (scoped, and not applied here)

Ordered by value-to-risk. Each is separately testable; none requires the HTML file.

**A. BRN/CRN + PPIU guidance note beside the visa line (highest value, lowest risk).**
One short note in both locales: the visa line is the all-in figure your approved platform or agent shows at
issuance; a hotel/transport booking reference is now part of issuance; Indonesian applicants apply through a
Kemenag-licensed PPIU, not directly. Reuse the existing dated anchor ("estimated at 300 Saudi Riyals",
checked 15 October 2026) and publish **no** BDT/USD total and **no** agency-fee band.

**B. Per-line quote currency label, with no conversion (good idea, different implementation).**
Let each line record the currency the quote was issued in (`SAR`, `USD`, `IDR`, `BDT`) as a label only, and if
a converted figure is wanted, let the **reader** supply their own rate with a caption saying it is their rate,
not URAL's. That answers "no need to manually convert" without URAL inventing a rate. Requires the
`verify:build` money-format assertions to be extended first.

**C. Per-night accommodation mode (only if the whole-party contract is re-tested).**
`rooms × nights × tax-inclusive rate` for the Makkah and Madinah lines, with the other six lines remaining
whole-party totals, and the per-person share kept as equal-share-only. Do not attach `days` to the grand
total.

**D. Global-default currency, if the owner wants it — as a positioning decision.**
Note that the site already achieves "global, Bangladesh-first" in the flight handoff (BDT for a Bangladesh
departure, USD for every other origin, never overriding a user's choice). Extending that *rule* to the
worksheet is defensible; a hardcoded six-currency converter is not. This changes `PRODUCT.md` commitment #2,
so it is an owner call, and the `SEO-KEYWORD-MAP` mapping for `/umrah` would need to be revisited alongside it.

**E. Not recommended:** renaming the H2/H1 to "Trip Budget Planner", adding an inline `<script>` island, or
publishing any USD/BDT visa total.

---

## 6. Answers to the two direct questions

**"Is it possible to shift?"** Yes — but the shift is editorial, not a file replacement. The global framing
already exists at site level (multi-currency widgets, departure-country currency handoff, global affiliate
search). What the Umrah *hub* needs is not conversion arithmetic; it is the BRN/CRN/PPIU reality stated in
plain words, in both languages, on the line where a reader is already typing their agent's number.

**"Does this solve the 'Lack'?"** It solves the *perception* of a Bangladesh-only page and it solves nothing
about BRN/CRN, which it concedes. What it costs is the worksheet's core claim — that the page does not
invent rates or prices — and six build guards. That trade is not worth taking.

---

## 7. Provenance

- Reviewed at commit `c63cd5a` on `arena/56e63301-ural-travel`.
- Files read: `src/components/UmrahBudgetCalculator.tsx`, `src/utils/umrahBudget.ts`,
  `src/components/UmrahLandingPage.tsx`, `src/components/TravelpayoutsCustomWidget.tsx`,
  `src/components/InteractiveTools.tsx`, `src/utils/flightSearch.ts`, `scripts/test-umrah-budget.ts`,
  `scripts/verify-build.ts` (§6462–6620), `scripts/prerender.ts` (§1652, §3629), `PRODUCT.md`, `DESIGN.md`,
  `AGENTS.md`, `SEO-KEYWORD-MAP.md`, `URAL-CONTENT-OPTIMIZATION-GUIDE.md`, `docs/growth/CONTENT-OS.md`,
  `docs/history/2026-10-strategy-baseline/growth/UMRAH-CLUSTER-PLAN.md`.
- External check (6 Nov 2026): the SAR 300 / SAR 100–180 insurance split corroborated across several travel
  sources as an *estimated* government fee with insurance priced by provider; no source found for a fixed
  BRN/CRN agency fee, and none for self-service Indonesian applications. Treated as corroboration only — the
  published figure remains the Ministry's "estimated at 300 Saudi Riyals", checked 15 October 2026.

---

# Part II — Continued review, with a rebuilt baseline (6 November 2026)

Part I assessed the proposal against the source. Part II re-ran the repository so the verdict rests on measured
behaviour, and it separates **what the proposal gets wrong** from **two real gaps found on the way**, which are
independent of the proposal and worth fixing regardless.

## 8. Baseline re-established before judging

Installed dependencies (`npm ci`, 138 packages) and rebuilt from `c63cd5a` on `arena/56e63301-ural-travel`:

| Gate | Result |
|---|---|
| `npm run build` | Pass — 133 EN + 133 BN canonical routes, sitemap/hreflang/rss regenerated |
| `npm run verify:build` | **All 469 checks passed** (77 of them negative controls, i.e. the suite proves it can fail) |
| `npm run test:umrah-budget` | **25 tests passed** |

So the section the proposal calls a "blank worksheet" is a component with 25 passing tests and 469 verified
build-checks standing behind it. Any replacement must not merely look better — it must keep that suite green or
conscientiously rewrite it. The proposal addresses none of them.

## 9. The worksheet is already accessible without JavaScript — the proposal's is not

Measured on the prerendered output:

| Measure | `/umrah` | `/bn/umrah` |
|---|---|---|
| Cost inputs present in static HTML | 8 | 8 |
| Traveller input present | yes | yes |
| `<fieldset>` + `<legend>` grouping | 1 / 1 | 1 / 1 |
| Labelled fields | 9 | 9 |
| `aria-live` result region | 1 | 1 |
| Duplicate element ids | **0** | **0** |

The current worksheet is server-rendered React: every field, label and caveat exists in the HTML before any
script runs, so it works on a slow Android connection and is indexable. The proposal's dynamic `#costRows`
regions, `grandTotal` and `perPerson` outputs are script-rendered; with JavaScript delayed or blocked on the
primary device — a mid-range Android on variable mobile data, per `PRODUCT.md` — the reader sees an empty
table and no total, and the crawler sees no cost content at all. This is a downgrade in the site's weakest
network conditions.

Layout risk is real too: `DESIGN.md` requires verification at **390px** as the primary case. A five-column row
(description + amount + currency + rate + converted) at 390px either scrolls horizontally or collapses into
something the reader cannot map to its label.

## 10. The proposal asks to rebuild a model that already exists elsewhere on the site

The request is essentially "preset price × days × travellers ÷ people". That component is
`InteractiveTools` → `/tools/budget-calculator`, with `calcRates` per country, `calcDays`, `calcPeeps` and
`lodging × days × ceil(peeps/2)` double-sharing. It is live and prerendered.

That is the empirical proof for Part I §2: URAL already has the preset model, on the *tools* surface, where
preset estimates are the point. The `/umrah` hub was **deliberately moved off** that model on 18 October 2026
because a pilgrimage package has no defensible preset rate. The proposal is not adding a capability — it is
copying the model from a page where it is appropriate onto a page where it was removed on purpose.

## 11. Quantified: what the proposed arithmetic does to a real family's numbers

Using a realistic 4-person, 14-night Bangladesh quote across the eight existing categories
(flights 192,000 + visa 160,000 + Makkah 126,000 + Madinah 70,000 + transport 18,000 + meals 44,800 +
extras 8,000 + contingency 15,000 BDT):

- Reader's true whole-party total: **BDT 633,800**; equal share **BDT 158,450**.
- If `days` is applied to the grand total, as described: **6,338,000** (10 days) or **8,873,200** (14 days) —
  i.e. **10× to 14× the truth.**
- Fixed-rate drift with no rate date, on the visa line alone: BDT 160,000 reads as **$1,333** at 1/120,
  **$1,280** at 1/125, **$1,231** at 1/130 — a **$103 spread between two plausible undated rates**, on one line,
  before the eight lines are summed.

A duration field is only correct where a category is genuinely daily. Testing the eight real categories:

| Scales with `days` | Does not scale with `days` |
|---|---|
| Makkah accommodation (room-nights) | Flights, baggage, taxes |
| Madinah accommodation (room-nights) | Visa, insurance, service fees |
| Meals (person-days) | Rail/airport transfers (mixed) |
| | Connectivity, assistance, visits, FX fees |
| | Contingency reserve |

**3 of 8 categories scale; 5 of 8 do not.** One top-level `days` input therefore cannot be correct for this
category list — and the three that do scale correctly would need *nights* and *rooms*, not elapsed days, or the
hotel lines are still wrong.

## 12. Two gaps found in the current code (independent of the proposal)

Recorded here because the review process surfaced them. **Neither is fixed in this change** — this is a review,
not an implementation — and both are pre-existing on `main`.

**C1 — `progressPercent` can report 100% before the checklist is complete.**
`src/components/InteractiveTools.tsx:174`:
`Math.round((checkedCount / checklist.length) * 105)`. The `Math.min(..., 100)` clamp at lines 565 and 570
masks it in the common case, but with 12 items the progress bar reaches a full 100% at **12/12 only** by
accident of rounding; any future item count changes it. With 20 items, 19 checked gives 99.75 → clamped 100
while one item is unticked. It is a one-character defect (`105` → `100`) with a visible trust cost on a
checklist whose whole purpose is "am I ready?".

**C2 — the same file hardcodes preset prices and a double-sharing assumption** (`calcRates`, and
`Math.ceil(calcPeeps / 2)` commented "Assume double sharing"). This is permitted on `/tools` as an indicative
estimator, but it is the exact pattern the `/umrah` hub forbids. If §B or §C of Part I §5 is ever adopted, the
two models must not drift into each other.

## 13. What the BRN/CRN guidance should actually say (content spec, not code)

Part I §5A proposed this note; the dated check on 6 November 2026 sharpens it considerably. The finding is that
**the BRN conversation is about the package, not the visa fee**, and that Indonesia travels through a different
channel — which the repository has already reasoned about once, in
[`SOURCE-REQUESTS.md`](../02-content/SOURCE-REQUESTS.md) p.205: Indonesia is absent from the Saudi tourist-eVisa
list because it is *"the largest Umrah market in the world"* travelling through a different channel, not because
of any judgement about the market.

Safe, source-shaped content, for both locales, no invented numbers:

1. **The visa line is the all-in figure at issuance.** The Ministry's official FAQ states a government fee
   "estimated at 300 Saudi Riyals" (checked 15 October 2026) and says an external agent cannot issue an Umrah
   visa without an accommodation-and-transport service package. Insurance and the package are priced at
   issuance. → Already published in this exact form across the cluster; reuse, do not re-source.
2. **A booking reference is a gate, not a line item.** A BRN is a Booking Reference Number generated when a
   hotel or transport booking is lodged through a Saudi-licensed provider. It has no fee of its own; the cost is
   the booking behind it. Budget the *booking*, not the *number*. This single sentence would have prevented the
   proposal's "$207–$328" figure, which corresponds to no line a reader will ever be charged.
3. **Independently sourced corroboration, dated 6 November 2026, for the shape of the 2026 rule:** standalone
   applications without a linked Nusuk hotel and transport booking are no longer accepted; the hotel must be
   licensed and registered in Nusuk Masar, where the property approves the request; transport evidence is
   expected for arrival, intercity and departure legs. This is *travel-trade and agency* reporting, not a
   Ministry circular — so it may state the shape of the rule, but must not be presented as an official fee
   schedule, and should be labelled as dated third-party reporting under the guide's source tiers.
4. **Indonesia specifically:** visa submission runs through a PPIU licensed by the Indonesian Ministry of
   Religious Affairs, with Nusuk/Nusuk Masar access to lodge the application and validate the hotel. A traveller
   cannot self-apply, so no calculator — this one or the proposal's — can substitute for the PPIU. State the
   channel; publish no rupiah or dollar total.
5. **Do not** print an "agency fee (~$100–$200)" band, a BDT visa total, a currency-converted visa figure, or
   the proposal's $207–$328 aggregate. Each would fail `SHARED_UMRAH_BANNED_PATTERNS`' intent and the
   `CONTENT-OS.md` rule that a BDT conversion needs a rate source and date.

Placement answer: this belongs beside the `visa` field as a short note, and — for the Indonesia/bilingual
audience — in the visa cluster, not in a currency dropdown. A dropdown with `IDR` answers a question nobody
asked; `IDR` appears **nowhere** in the current codebase's currency tables, and `Language` is a closed
`"en" | "bn"` union, so "Indonesia" here means an *English-reading Indonesian planning a trip*, not a
localized Indonesian site.

## 14. Answers the proposal cannot give, and what would unblock it

| Question the proposal raises | Answer from the repository |
|---|---|
| "Set the default to USD (Global) but keep BDT available" | This is a reversal of `PRODUCT.md` positioning #2 ("BDT-first pricing… not converted as an afterthought"). Owner decision, not a code change. |
| "The attached HTML is a complete replacement" | It cannot be: no Bengali, no prerender parity, no test coverage, and an inline script with no CSP path. |
| "You must instruct the user to manually type ~$207–$328" | The instruction is defensible; the number is not. Budget the booking, not the BRN. |
| "Bangladesh priority hidden in backend" | Nothing in `PRODUCT.md`, the audit or `AGENTS.md` describes a hidden-priority strategy. Please point to the document if it exists; otherwise this is a new positioning decision to be written down first. |

**What would make a future revision acceptable:** (a) a dated rate source with a visible date, or a
reader-supplied rate; (b) per-line units — `per person`, `per room-night`, `per trip` — instead of one global
`days`; (c) EN/BN parity in the same change; (d) server-rendered fields, no inline script; (e) the existing 25
tests and 469 checks either kept green or explicitly superseded with an owner-approved rationale.

## 15. Recommendation

**Reject the file; accept the need.** Adopt Part I §5A + §13 as a small bilingual note on the visa line, route
the Indonesia/PPIU detail into the visa cluster, and treat any currency or duration work as a separate,
owner-approved change to a resolved model — with the arithmetic above as the reason it is not a like-for-like
swap. Fix C1 while nearby (§12) as its own one-line change. Nothing in this review is applied.
