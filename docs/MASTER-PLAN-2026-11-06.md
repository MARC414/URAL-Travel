# MASTER PLAN — URAL: international positioning, honest tools, live rates, free AI

**Version 2.0 · 6 November 2026 · Branch `arena/56e63301-ural-travel` · Baseline `c63cd5a`**

**STATUS: PLAN ONLY. Nothing in this document has been applied to the codebase.**

Version 2.0 is a full rewrite, restructured into **phases** and audited for internal consistency. It supersedes
v1.1 completely. The rewrite found **eight new defects** the first draft missed, including a **pricing
contradiction inside the site's own SEO schema** (D21) and a **second, unguarded visa-claim system that
contradicts the first** (D22).

### Document map

| Part | What it is for |
|---|---|
| **0** | How to read this plan; risk register and severity scale |
| **1** | Strategic position, and why it is a decision rather than an assumption |
| **2** | The complete defect register — **24 defects**, all verified with file:line |
| **3** | International rules (testable) |
| **4** | Phase structure — five phases, in dependency order |
| **5** | Work packages WP0–WP10 with acceptance criteria and rollback |
| **6** | Rejected alternatives (so they are not re-proposed) |
| **7** | Legal and licence constraints |
| **8** | Verification matrix |
| **9** | Open decisions for the owner |
| **10** | Plain-language summary |
| **11** | Unresolved items carried forward |
| **A** | Addendum: cost calculator detail (absorbed into WP9) |
| **B** | Addendum: self-corrections and audit trail of this plan |

### Provenance of every number in this document

- Code inspected at `c63cd5a` on `arena/56e63301-ural-travel`, **6 November 2026**. Line references are exact.
- Gates re-run today: `npm run build` **pass** (133 EN + 133 BN routes); `npm run verify:build` → **469 checks
  passed** (77 negative controls); `npm run test:umrah-budget` → **25 tests passed**.
- Live rates from `https://open.er-api.com/v6/latest/BDT`, payload timestamp **`Fri, 06 Nov 2026 00:02:31 +0000`**.
- Provider terms read directly: `exchangerate-api.com/docs/free` and `/terms`, 6 November 2026.
- Cloudflare Workers AI: free allocation and the 28 July 2026 model change, from Cloudflare's changelog.
- **Every defect below was re-checked at least twice**; the two findings I withdrew are recorded in Addendum B.

---

# Part 0 — How to read this plan

**Severity scale**

| Mark | Meaning | Response |
|---|---|---|
| 🔴 **P0** | Live defect: visible to readers, states something false, or can cost them money | Fix immediately; precedes all feature work |
| 🟠 **P1** | Material correctness or credibility problem | Fix in this cycle |
| 🟡 **P2** | Structural, consistency or maintainability issue | Fix in this cycle if cheap; else schedule |
| ⚪ **P3** | Housekeeping | Opportunistic |

**Rule of engagement for every work package:** a package is done only when its acceptance criteria pass *and*
`verify:build` (469 + new) and `test:umrah-budget` (25 + new) are green, in **both** locales. `AGENTS.md` §2b
makes EN/BN parity a requirement, not a nicety.

---

# Part 1 — Strategic position

**URAL is an international travel-intelligence site. Bangladesh is the home market and keeps every advantage; it
is no longer named as the site's only audience.**

Three testable commitments:

1. **International by default, Bangladesh by priority.** Display currency follows the reader's origin (BDT for a
   Dhaka departure, USD otherwise), always overridable, never forced. Tools are named by function; the audience is
   named in the subtitle.
2. **No claim the product cannot support.** No approval percentages, no undated prices, no "pay in BDT" where no
   payment exists, no exchange rate without a date and a source.
3. **Free to run.** Every package costs **£0**: Cloudflare Pages/Workers free tier, ExchangeRate-API Open Access,
   Workers AI free allocation.

### 1.1 Why this must be written down before it is built

`PRODUCT.md` §Product Purpose and `docs/05-future-research/README.md` both currently describe broader international
travel as *"future research, not current instructions"* (**D11**). Until amended, any contributor — human or AI —
reading the repository will correctly conclude this plan is out of scope. **WP0 exists only to fix that.**

### 1.2 The through-line that connects every finding

The plan is not a list of unrelated repairs. It is one diagnosis repeated on five surfaces:

> **URAL repeatedly presents a typed-in number as if it were a checked fact.**

- Exchange rates typed in by hand → up to **−12.2%** wrong (D7, D25).
- Visa outcomes typed in by hand → **"100% approval rates"** (D2).
- Trip prices typed in by hand → 41% of every total is an undated airfare (D16).
- A payment capability that does not exist → **"Pay in BDT"** (D3).
- A promotion that ended six days ago → still in the menu (D4).

The fix is one discipline, applied five times: **every number carries a date and a source, or it does not
render.**

---

# Part 2 — The complete defect register

**25 live defects**, numbered D1–D29. All verified 6 November 2026.

> **Numbering note — why four numbers are absent.** IDs are stable across versions so earlier discussions still
> resolve. Four from v1.0/v1.1 were retired when v2.0 re-checked them:
> **D13** (an `id="false"` duplicate that did not exist — my grep artefact; see Addendum B#1),
> **D20** (folded into D14/D16 — it was the same "no provenance on output" problem),
> **D23** (folded into D22 — the missing build guard is the point of D22, not a separate defect),
> **D24** (folded into D21 — the Malaysia BDT 80,000 figure appears in both content systems; that is D21's
> contradiction). No number is reused, so cross-references stay valid.

## 2.1 P0 — Live defects (fix first)

| ID | Finding | Location | Evidence |
|---|---|---|---|
| **D2** | **Fabricated visa certainty.** Verbatim: *"An eVisa is easily applied for online with **100% approval rates** when bank statements show BDT 80,000+ per person. Processing duration: 48-72 hours."* | `src/components/InteractiveTools.tsx:184` | No source, date or link on any of the 12 cells (`:180-199`). Typo in production: `" Embassy Sticker Required"` (leading space, `:195`) |
| **D21** | **🔴 The site contradicts itself on the Malaysia visa fee, inside its own SEO data.** `/costs` publishes `"Total costs are around BDT 3,800 to 4,200, and approval typically arrives in 2-4 working days."` while `/tools/visa-checker` says **"48-72 hours"** (= 2–3 working days) and **"100% approval"**. Two public surfaces, two answers, both undated. | `src/constants.ts:989`, `:1015`, `:1624` vs `InteractiveTools.tsx:184` | Direct quote comparison; this text also feeds FAQ/JSON-LD, so the contradiction is machine-readable |
| **D22** | **🔴 A second, unguarded visa-data system exists that contradicts the first.** `VISA_DATA` (`src/constants.ts:721+`) is the *good* system: dated, sourced, with caveats. `visaEligibilityMap` (`InteractiveTools.tsx:180-199`) is a *parallel* system with no source, no date and no guard. The build **only checks that `tools/visa-checker.html` exists** — never that it is true (`verify-build.ts:983, 1017`). | the two systems, above | `verify:build` grep: `visa-checker` appears twice, both structural |
| **D17** | **The cost calculator charges children as adults.** Slider caption reads *"3 (Couple + 1)"* (`:404`) but arithmetic applies 3 × full airfare, meals, transport, tickets. A 2-adult + 1-child family is quoted **BDT 249,000**. | `InteractiveTools.tsx:404` (`"3 (Couple + 1)"`) vs `:142-146` arithmetic | Measured: 1/3/5 persons → BDT 90,500 / 249,000 / 407,500 |
| **D8** | **Progress bar reports 100% before completion.** `Math.round((checkedCount / checklist.length) * 105)` | `InteractiveTools.tsx:174` | Clamped at `:565`/`:570`, which hides but does not fix; a 20-item list reads 100% at 19/20 |

## 2.2 P1 — Material correctness and credibility

| ID | Finding | Location | Evidence |
|---|---|---|---|
| **D7** | **Three hand-typed exchange-rate tables, all materially wrong.** Worst error **−12.2%**. | `TravelpayoutsCustomWidget.tsx:49-54`; `InteractiveTools.tsx:98-104`; inline converter `App.tsx:~4197-4245` | §2.4 measurement table |
| **D25** | **🆕 A fourth rate table, this time inside published prose.** `TRIP_COSTS_DATA.exchangeRateText` prints six rate strings as reader-facing content: `"1 THB ≈ 3.28 BDT"`, `"1 MYR ≈ 27.20 BDT"`, `"1 AED ≈ 32.20 BDT"`, `"1 NPR ≈ 0.88 BDT"`, `"1 SGD ≈ 91.50 BDT"`, `"1 USD ≈ 122 BDT"`. THB is off by **−11.9%** and MYR by **−11.6%**. Because the same wrong rate appears in *both* the widget and the prose, the reader sees one **consistent** wrong number — which is more convincing, not less. | `src/constants.ts:1862, 1934, 1978, 2022, 2066, 2110` | §2.4 |
| **D4** | **KKday menu card promotes a promotion that expired 2026-10-31** (six days before this audit), duplicating Klook in the same column. The promo-code path is correctly gated by `isPromoActive`, but the **Feature Callout Card container is not**. | `AffiliatePartners.tsx:94-108`; card in `App.tsx` Experiences mega-menu ~2776-2850 | Its own `expiredFallbackBehavior` says it should have switched on 1 Nov |
| **D5** | **Removing KKday would create dead links** — it is the registered fallback for `klook` (`:182`) and `kkdayHotels` (`:238`). | `AffiliatePartners.tsx` | `resolvePartnerUrl()` routes paused partners to fallback |
| **D3** | **"Contact & BDT Booking Desk — Pay in BDT via bank / bKash"** promises a payment capability that does not exist. | `App.tsx:3044-3045` | `functions/api/contact.js` is a Resend email transport; no checkout anywhere |
| **D16** | **Preset trip prices with no date, no source, no seasonality.** Airfare is **41%** of the default total (BDT 90,500 of which 37,000). | `InteractiveTools.tsx:113-138` | Measured default state |
| **D26** | **🆕 Dateless BDT totals published as facts in article/FAQ prose.** `quickAnswer` fields state e.g. *"A 5-day Nepal trip… costs roughly BDT 45,000… about BDT 65,000… BDT 1,20,000+"* with no "checked on" date, and these strings are syndicated into FAQ/JSON-LD. | `src/constants.ts:1877` and `keyFacts`/`faqs` for all six countries | 6 country records; 4 dateless "roughly BDT" framings |
| **D27** | **🆕 Garbled vendor name shipped as advice:** *"Book tourist buses like **Sofa Template**…"* (almost certainly "Sofa Travels"/"Sajha"). | `src/constants.ts:1873` | Verbatin grep |

## 2.3 P2 — Structural and consistency

| ID | Finding | Location | Evidence |
|---|---|---|---|
| **D1** | Umrah worksheet is BDT-only at the formatter (`currency: "BDT"` hardcoded in one `Intl.NumberFormat`). The reviewer's claim that *the site* lacks multi-currency is nonetheless wrong — it exists on three other surfaces. | `UmrahBudgetCalculator.tsx:9-11` | Single-currency formatter; multi-currency elsewhere |
| **D14** | **The cost tool has three names.** Menu: *"Trip Budget Calculator"*; metadata: *"Trip Cost Estimator"* (`toolRoutes.ts:111`); heading: *"Interactive Outbound Budget Estimator (BDT)"*. | three files | greps quoted |
| **D15** | **The calculator is never prerendered.** `TOOL_SLUGS` pages emit only an `<h1>`, subtitle, a two-sentence block and links. With JS delayed, `/tools/budget-calculator` describes a tool the reader cannot see. | `prerender.ts:2469-2498` | Contrast: Umrah worksheet ships 8 inputs in static HTML |
| **D19** | **`/costs` and the estimator disagree on coverage.** Menu sells `/costs` as "3-tier BDT budgets for **6** countries"; the calculator has **4**. | `App.tsx` menu copy vs `calcRates` keys | Both live |
| **D28** | **🆕 No tool usage is measured.** `pushDataLayerEvent` exists and fires for affiliate clicks, page views and WhatsApp — but **zero events fire from any tool**. We cannot answer "is the calculator used?" or "did the converter change behaviour?", which is exactly the evidence needed to decide whether a tool earns its menu place. | `src/utils/analytics.ts`; no calls in `InteractiveTools.tsx` or `UmrahBudgetCalculator.tsx` | grep: 5 event names exist, none tool-related |
| **D9** | Menu names every tool by its Bangladeshi frame, telling a non-Bangladeshi reader the site is not for them. | `App.tsx:2960-3050` | Labels quoted in Part 3.2 |
| **D6** | `/kkday-hotels` is orphaned — no menu entry links to it, and it competes with `/hotels`. | `App.tsx:1201, 2013-2024, 2139` | No navigation link exists |
| **D11** | International framing is explicitly out of scope in the repo's own strategy documents. | `PRODUCT.md`; `docs/05-future-research/README.md` | Verbatim "future research, not current instructions" |
| **D12** | Language union closed at two locales. | `src/translations.ts:1` | `type Language = "en" \| "bn"` |
| **D18** | Calculator caps are 1–14 days and 1–5 travellers, undocumented. A 21-day trip or a family of 6 cannot be estimated. | `InteractiveTools.tsx:376-378, 394-396` | Range inputs |
| **D10** | No AI surface. Free allocation 10,000 neurons/day; three documented-free models moved to Workers **Paid** on 28 July 2026. | greenfield | Cloudflare changelog 2026-07-28 |
| **D29** | **🆕 A fifth rate table was missed by v1.0–v2.0.** `TravelpayoutsWidget.jsx:38-45` defines its own `CURRENCY_CONFIG` with 5 `rateFromBdt` literals (USD 1/120, EUR 1/130, GBP 1/152, SAR 1/32, AED 1/32.7) and converts at `:1689-1690`. Discovered while writing WP0, when checking whether the repo could honestly claim compliance with the new Number rule. | `src/components/TravelpayoutsWidget.jsx:38-45, 1689-1690` | grep `rateFromBdt: 1 /` returns two files, not one |

## 2.4 D7 / D25 measured — every published rate, against the live market

| Where the number is published | Currency | Site says (BDT per unit) | Live, 6 Nov 2026 | Error |
|---|---|---|---|---|
| `InteractiveTools` widget | MYR | 27.03 | 30.78 | **−12.2%** |
| `TRIP_COSTS_DATA` prose | THB | 3.28 | 3.72 | **−11.9%** |
| `TRIP_COSTS_DATA` prose | MYR | 27.20 | 30.78 | **−11.6%** |
| `InteractiveTools` widget | AED | 30.30 | 33.92 | **−10.7%** |
| `InteractiveTools` widget | THB | 3.333 | 3.724 | **−10.5%** |
| `TravelpayoutsCustomWidget` | GBP | 152.00 | 167.67 | **−9.3%** |
| `InteractiveTools` widget | NPR | 0.885 | 0.824 | +7.4% |
| `TRIP_COSTS_DATA` prose | NPR | 0.88 | 0.824 | +6.8% |
| `TravelpayoutsCustomWidget` | EUR | 130.00 | 139.88 | −7.1% |
| `TRIP_COSTS_DATA` prose | AED | 32.20 | 33.92 | −5.1% |
| `InteractiveTools` widget | USD | 119.05 | 124.60 | −4.5% |
| `TravelpayoutsCustomWidget` | USD | 120.00 | 124.60 | −3.7% |
| `TravelpayoutsCustomWidget` | SAR | 32.00 | 33.22 | −3.7% |
| `TravelpayoutsCustomWidget` | AED | 32.70 | 33.92 | −3.6% |
| `TRIP_COSTS_DATA` prose | USD | 122.00 | 124.60 | −2.1% |

**Reader-facing consequence:** on a **BDT 160,000** visa line, 1/120 prints **$1,333** where the live rate gives
**$1,284** — a **$49** error on one line, invisible and authoritative-looking. This is the same rule
`docs/growth/CONTENT-OS.md` already states: *"A BDT conversion needs the SAR/BDT rate source and date."*

## 2.5 Defect → work package map (nothing is orphaned)

| Defect | Fixed by |
|---|---|
| D2, D21, D22 | WP1 |
| D4, D5, D6, D27 | WP2 |
| D8 | WP7 |
| D7, D25, D29 | WP3 |
| D1 | WP5 |
| D9, D14 | WP6 |
| D15, D16, D17, D18, D19, D26 | WP9 |
| D3 | WP6 (copy) + WP2 (menu) |
| D28 | WP4 (instrumentation) |
| D11 | WP0 |
| D10 | WP8 |
| D12 | Accepted constraint — see Part 3.5 |

---

# Part 3 — International rules (testable)

**3.1 Currency follows origin.** Mirrors the rule already implemented for flight search (`AGENTS.md` §3,
`src/utils/flightSearch.ts`): **BDT for a Bangladesh departure, USD for every other origin, never overriding an
explicit choice.** Extending an existing rule is why this is not a reversal of product principle.

**3.2 Rename by function; audience in the subtitle.**

| Current | New label | New subtitle |
|---|---|---|
| BDT Currency Converter | Currency Converter | Live daily rates, with BDT-first guidance for Bangladesh |
| Trip Budget Calculator / Trip Cost Estimator / Interactive Outbound Budget Estimator | **Trip Cost Estimator** *(one name, three places)* | Indicative costs by country — replace with your own quotes |
| Visa Odds Checker | **removed** (D2) | — |
| Contact & BDT Booking Desk | Contact & Trip Help | Talk to a person · WhatsApp +8801784385335 |
| Pre-Departure & Embassy Hub | Pre-Departure & Embassy Hub | DAC baggage rules, Zamzam and emergency contacts |
| Trip Cost & Budget Matrices | Trip Cost & Budget Matrices | 3-tier planning budgets · destination set matched to the estimator |

**3.3 Nothing Bangladeshi is deleted.** `/banking` (dollar endorsement, USD 18,000 ceiling, $300 rule) is the
best-sourced content on the site and stays unchanged. DAC/bKash/bank guidance stays. Only the *framing* stops
addressing a single passport.

**3.4 `/umrah` keeps its heading.** *"Umrah Cost from Bangladesh"* is the mapped query (`SEO-KEYWORD-MAP.md` row 1)
and is asserted across `verify:build` (`SHARED_UMRAH_EN_ANCHOR`/`_BN_ANCHOR`). A currency selector is **added
beside** it.

**3.5 No third language in this plan.** `Language = "en" | "bn"` (D12). Each locale is a full crawlable duplicate;
a third doubles maintenance and the Bengali parity requirement still has open gaps
(`docs/02-content/2026-11-05-en-bn-parity-audit.md`). International *reach and framing* first; languages as a
separate, funded project.

---

# Part 4 — Phase structure

The first draft was a flat list, which hid the dependencies. Five phases, each shippable and verifiable on its own.

| Phase | Name | Goal | Packages | Effort |
|---|---|---|---|---|
| **0** | **Truth** | Remove everything false or stale *today*; make the site measurable | WP7 ✅ · WP0 ✅ · WP1, WP2, WP4 | 1.5 days left |
| **1** | **Foundation** | One dated rate source; one number discipline | WP3 | 1–2 days |
| **2** | **Tools** | Make the converters and estimators honest and useful | WP5, WP9 | 4–6 days |
| **3** | **Voice** | International framing across the interface | WP6 | 0.5 day |
| **4** | **Assistant** | The free AI helper, last, on a verified corpus | WP8 | 4–6 days |

**Why this order and not another.** Phase 0 first because two of its items (WP1, WP2) remove claims that are false
*right now*, and a feature shipped on top of a false claim compounds it. Phase 1 before Phase 2 because both
calculators need the same dated rate. Phase 4 last because a retrieval corpus can only be trusted after Phase 0–2
has removed the contradictory sources — otherwise the AI would faithfully retrieve the "100% approval" line.

**Total: 13–18 working days. £0.**

---

# Part 5 — Work packages

Each package: objective · exact change · acceptance · rollback. Execution order within a phase is listed.

---

## PHASE 0 — TRUTH

### WP0 — Governance paragraphs — ✅ **DONE 6 November 2026** *(blocks WP5, WP6, WP9)*

**Objective.** Stop the repository contradicting the new direction.

**Delivered — six documents, no code:**
- **`PRODUCT.md`** — replaced the "UK/diaspora… future research" direction sentence with *international
  first, Bangladesh by priority*; added a **Direction** section (currency follows origin; tools named by
  function; no third language in this phase) and the **Number rule**; amended Positioning #2 so
  "BDT-first" no longer reads as contradicting origin-based currency.
- **`00-URAL-STRATEGY-INDEX.md`** — direction header updated to 6 November 2026, with Europe/rail,
  comparison engines, additional languages and a domain change explicitly still unapproved.
- **`AGENTS.md`** — §0 direction updated; the Number rule stated for all future code and content. This
  matters most: it is the first file any AI agent reads.
- **`URAL-CONTENT-OPTIMIZATION-GUIDE.md`** — direction line updated; its "Prices, totals and dates"
  section now points at the product-level Number rule.
- **`docs/growth/CONTENT-OS.md`** and **`docs/growth/README.md`** — direction updated.
- **`docs/05-future-research/README.md`** — international positioning removed from "future research";
  the remaining unapproved items are listed explicitly so the folder still withholds what it should.

**Integrity check run.** Grep for `Bangladesh-first travel intelligence` now returns **nothing** outside
`docs/history/` (which is correctly historical). No build guard reads these documents, so no gate is
affected.

**Honesty finding — D29.** Writing an absolute rule ("no fixed rate constants in `src/`") forced the
question *is the repo compliant?* It is not: **18 rate literals remain in five places**, including a
**fifth table v1.0–v2.0 had missed** (`TravelpayoutsWidget.jsx:38-45`). Rather than publish a rule the
repository violates, the rule was written as **"new code" + an explicit migration-debt list**, naming
the five files and their counts, and stating that WP3 removes them. **The rule must not be read as a
claim of current compliance.**

**Rollback:** six doc edits; revert individually.

### WP1 — 🔴 Remove the fabricated visa claims and unify the two systems *(1 day)*

**Objective.** One visa truth, not two contradicting ones (D2, D21, D22).

**Change, in order.**
1. **Delete the parallel system:** remove `visaEligibilityMap` (`InteractiveTools.tsx:180-199`) and its state
   (`:177-178`). Do **not** try to "fix" its wording — the defect is that it exists as an unsourced second source.
2. **Remove `visa-checker` from the menu** (`App.tsx:2960-3050`) and from `TOOL_TAB_TO_SLUG` /
   `TOOLS_SLUGS` (`src/utils/toolRoutes.ts`), so the sitemap drops the URL.
3. **Redirect** `/tools/visa-checker` → `/visa` in `functions/_middleware.js`, one hop, matching the existing
   legacy-redirect pattern.
4. **Reconcile the Malaysia contradiction (D21).** Whichever processing-time figure is correct, make
   `src/constants.ts:989/1015/1624` and `VISA_DATA` (`:721+`) agree, and put a **checked-on date** on both. Delete
   the "100% approval" framing from `constants.ts` if it appears in the syndicated FAQ text.
5. **Add a truth guard.** Extend `verify:build` to fail if any banned pattern (`100% approval`, guaranteed
   approval, `Sofa Template`) appears in `src/` or `dist/`, in either locale. Reuse the
   `SHARED_UMRAH_BANNED_PATTERNS` mechanism (`verify-build.ts:6468-6475`) rather than inventing a new one.

**Acceptance.** `verify:build` green; grep for `100% approval` returns nothing in `src/`/`dist/`; no
`visa-checker` in sitemap; `/tools/visa-checker` 301s to `/visa`; Malaysia processing time identical on every
surface. **Rollback:** restore the menu entry and map block from git.

---

### WP2 — 🟠 De-clutter the Experiences menu, and de-risk KKday *(0.5 day · must ship with WP1)*

**Objective.** Remove an expired promotion from prime menu space without creating dead affiliate links (D4, D5,
D6, D27).

**Change — order matters.**
1. **First, re-point fallbacks** in `AffiliatePartners.tsx`: `klook` (`:182`) `"kkday"` → `"kiwi"`;
   `kkdayHotels` (`:238`) `"kkday"` → `"klook"`.
2. **Then decide KKday's status** (owner Q2). Option A (recommended): keep the registry entries for deep-link
   continuity, delete **only** the Feature Callout Card (`App.tsx` ~2776-2850). Option B: remove the partner
   entirely, including `KKDAY_PROMO`.
3. **Fix the actual bug:** if a promo card is ever rendered again, its **container** must be wrapped in
   `isPromoActive(...)`, not just its text.
4. **Decide `/kkday-hotels`** (owner Q3): keep unlisted, or delete with a 301 → `/hotels`.
5. **Fix the vendor-name typo** (D27) as part of this copy pass.

**Acceptance.** No menu card renders for an expired promo; `resolvePartnerUrl("klook")` returns a live URL;
`/kkday-hotels` either 301s or is intentionally unlisted; `verify:build` green. **Rollback:** registry and menu
block together.

---

### WP4 — 🟠 Turn on tool measurement *(0.5 day · new · enables every later judgement)*

**Objective.** Answer "does this tool earn its menu place?" with evidence instead of opinion (D28).

**Change.** Add `pushDataLayerEvent` calls — using the existing helper in `src/utils/analytics.ts`, no new
dependency:
- `tool_open` — `{ tool: "budget-estimator" | "currency-converter" | "packing" | "airports", locale }`
- `tool_result` — fired once per calculation, with **no personal data** (no amounts, no dates, no destination
  query text — only the tool name, the tier or currency code, and a coarse band such as party size 1/2–3/4+).
- `tool_limit_shown` — for the AI helper later; fired when the allowance message appears.

**Constraint.** This is analytics, not profiling: no entered money values, no free text, and it must sit inside the
existing consent model (`ConsentBanner`) — check that the events are gated by the same consent state as the
existing affiliate events before shipping.

**Acceptance.** Events appear in GTM Preview for each tool; no amount or free-text value is transmitted; consent
gating verified in both accept and reject states. **Rollback:** remove the three call sites.

---

### WP7 — 🔴 Fix the progress-bar overshoot — ✅ **DONE 6 November 2026**

**Delivered.**
- **`src/utils/checklistProgress.ts`** (new) — the arithmetic extracted as a pure function with a written
  contract: 0→0, all→100, monotonic, clamped, empty-list and non-finite inputs safe.
- **`src/components/InteractiveTools.tsx:175`** — now calls `checklistProgress(checkedCount, checklist.length)`;
  the `* 105` is gone. The `Math.min(…,100)` guards at the two render sites stay as harmless defence.
- **`scripts/test-checklist-progress.ts`** (new) — **9 tests**, including a **negative control** that asserts the
  old formula really was wrong (`buggy(3,12) === 26`), so the suite cannot silently stop testing anything.
- **Wired into CI** (`package.json` `test:checklist-progress`, `.github/workflows/ci.yml`) — it runs on every push
  rather than sitting unused.

**Measured before → after.** Default state was **26% Ready** for 3 of 12 ticked; it is now **25%**. Every value
was inflated: 11/12 read 96% (true 92%), 12/12 computed 105% and depended on a clamp, and a 20-item list would
have shown a full 100% with an item still unticked.

**Verification run in this change:** `npm run lint` clean · `npm run build` pass · `npm run verify:build`
**469/469** · `npm run test:umrah-budget` **25/25** · `npm run test:checklist-progress` **9/9** · regression
re-proved by reintroducing `* 105` (suite failed) and restoring it (suite passed) · shipped bundle contains
`Math.round(c/s*100)` and **zero** occurrences of `105`.

**Rollback:** revert two files (`checklistProgress.ts` delete, `InteractiveTools.tsx` one line) plus the test. No
other surface depends on the helper.

---

## PHASE 1 — FOUNDATION

### WP3 — 🟠 One dated rate source, and the end of hand-typed rates *(1–2 days · blocks WP5, WP9)*

**Objective.** Replace **four** rate locations (D7 widget tables + D25 prose strings) with one dated, credited,
server-cached source.

**New `functions/api/rates.js`**, following `functions/api/contact.js` conventions:
- Upstream `https://open.er-api.com/v6/latest/BDT`, **at most once per 24h**, keyed off the response's own
  `time_next_update_unix`.
- `caches.default` with `s-maxage` until the next update; **serve stale up to 24h** on upstream failure so no tool
  breaks.
- Return **normalised** data only: `{ base, rates, sourceDate, fetchedAt, provider, eol }`. Never the raw payload;
  never a public pair endpoint.
- Read `time_eol_unix`; alert if non-zero.
- No key, no secret, no cost. CORS: same-origin only, never wildcard.

**Retire all four locations**

| Location | Change |
|---|---|
| `TravelpayoutsCustomWidget.tsx:49-54` | `rateFromBdt` constants → fetched; **keep the option labels**, they drive the flight handoff and must not regress |
| `InteractiveTools.tsx:98-104` | `conversionRates` → fetched |
| `App.tsx` inline converter (~4197-4245) | → fetched |
| **`TravelpayoutsWidget.jsx:38-45`** ✅ *found 6 November during WP0* | `CURRENCY_CONFIG.rateFromBdt` (5 literals) → fetched; keep the option labels for the hosted handoff |
| **`src/constants.ts:1862, 1934, 1978, 2022, 2066, 2110`** | **`exchangeRateText` prose strings → generated from the dated rate at render time, showing the date.** If a currency is unavailable, omit the line rather than print a stale one |

**Fallback rule.** On failure, degrade to **BDT-only display with the caveat** — never `0`, never a stale rate
without its date.

**Acceptance.** Every rate-bearing surface shows a real date and the attribution string
`Rates By Exchange Rate API`. Grep for `rateFromBdt: 1 /`, `rate: 0.0084` and any `≈ [0-9.]+ BDT` literal returns
nothing. Simulated upstream failure still renders. `verify:build` green + new checks.

---

## PHASE 2 — TOOLS

### WP5 — Currency choice on the Umrah worksheet *(2 days · one control)*

**Objective.** Answer "not BDT-only" without reintroducing the rejected engine (D1).

**Design — one control in the section header, not per row:**

```
What will your family's Umrah budget be?
Your quote-based worksheet · Not market prices
                          [ Display currency: ৳ BDT ▾ ]
Rates updated 6 November 2026 · reference only · Rates by Exchange Rate API
```

**Rules.**
1. **Inputs never change currency.** Selector changes **display only**; the 8-category whole-party contract that
   25 tests protect is untouched.
2. **Default:** BDT for a Bangladesh origin, USD otherwise; explicit choice always wins; no IP-only geolocation.
3. **Conversion always labelled:** "converted at the 6 Nov 2026 reference rate (1 BDT = 0.008026 USD) — your bank
   differs."
4. **No `days` field.** 5 of 8 categories are not daily quantities (see §6).
5. **Formatter becomes currency-aware:** `UmrahBudgetCalculator.tsx:9-11` maps `en-BD`/`bn-BD` for BDT and
   sensible locales per currency, keeping Bengali numerals on `/bn`.
6. **Missing rate → BDT display + caveat.** Never blank, never zero.

**Preserved invariants:** incomplete → **no total**; explicit `0` valid; equal-share labelled as equal-share; static
HTML/no-JS; EN+BN via the shared component (`prerender.ts:1652` EN, `:3629` BN; `verify-build.ts:6601, 6615`).

**New tests:** incomplete still null; unconverted display keeps entered currency; missing rate degrades to BDT not
zero; BN keeps Bengali currency formatting; attribution present.

---

### WP9 — The Trip Cost Estimator, rebuilt as two layers *(2–3 days · incorporates Addendum A)*

**Objective.** Fix D14–D19, D16, D17, D26: the calculator currently presents our typed-in prices as if they were
checked facts, and charges children as adults.

**Option chosen: Option 3 — rebuild.** (Options 1 "retire" and 2 "leave as-is" are recorded in §6.)

**Layer 1 — Indicative, clearly labelled.**
- **One name everywhere** (D14): *"Trip Cost Estimator"* in menu, metadata and heading.
- **A visible "indicative prices last checked <date>"** stamp on the result. **No stamp → no number.**
- **Fix airfare first (D16):** it is 41% of every total. Replace the `flightBdt` constant with the live
  flight-search handoff (`src/utils/flightSearch.ts`) or, at minimum, a dated **range** rather than a false point
  value.
- **Server-render the initial state** (D15) so the tool exists in HTML.
- **Currency follows origin** (WP3 source), with the dated caveat.

**Layer 2 — "Use your own quote".** Every preset line is overridable. The moment the reader replaces one, the
label changes from *"our estimate"* to *"your quote"*. This gives the two calculators a **shared philosophy**
instead of opposing ones:

| Line | Preset | Overridable |
|---|---|---|
| Airfare | live handoff / dated range | yes |
| Lodging | per room-night by tier | yes (rooms × nights shown) |
| Meals | per person-day | yes |
| Transport | per person-day | yes |
| Tickets | per person-day | yes |

**Fix the party model (D17) — the part readers feel.** Replace the single "Companions" slider with **Adults /
Children / Infants**:
- Adults: full fare, full meals.
- Children: rooms unchanged (`ceil(people/2)`), but airfare and tickets flagged *"child fare — replace with your
  airline's quote"* rather than silently charging adult fare.
- Infants: no seat, no meals line.
- **Never label 3 people "Couple + 1" while charging three adult fares.**

**Raise and document the caps (D18):** days 1–30, travellers 1–12, limit stated in the label.

**Reconcile with `/costs` (D19, D26):** pick one canonical destination set (owner Q9) and make `/costs`, the menu
subtitle and the estimator agree. Put a **checked-on date** on the `TRIP_COSTS_DATA` quick answers, or remove their
specific BDT totals in favour of a dated range.

**Acceptance.** One name in three places; result carries a dated stamp or shows no total; airfare is live/range;
adults/children/infants separated with the child line flagged; initial state renders without JS; currency choice
works; caps documented; `/costs` and estimator agree on coverage; no dateless "roughly BDT" total remains in
syndicated FAQ text. `verify:build` + new checks for the date stamp and the three-name regression.

---

## PHASE 3 — VOICE

### WP6 — Relabel the menu, and fix the payment promise *(0.5 day)*

Apply the Part 3.2 table in **both locales** in `App.tsx:2960-3050`, plus the mobile menu if it duplicates labels.
Move the DAC/bKash detail into subtitles rather than deleting it. Separately, fix **D3**: rename *"Contact & BDT
Booking Desk"* / *"Pay in BDT via bank / bKash"* to *"Contact & Trip Help"* / *"Talk to a person"* unless the owner
confirms URAL genuinely takes BDT payment off-site (Q4).

**Acceptance.** No menu label begins with "BDT" or names one passport as the audience; the detail survives in
subtitles; no payment claim without a payment path; both locales; `verify:build` green.

---

## PHASE 4 — ASSISTANT

### WP8 — Free AI helper with four hard gates *(4–6 days · last)*

**Objective.** One scoped helper that answers only from verified content, with the limit handled as a feature.

**Scope.** One question box, **one page** (Umrah hub, below the visa note). Not a site-wide chat.

**Architecture — retrieval-augmented generation.**
1. **Corpus:** claims ledger (`docs/growth/A1-CLAIMS-LEDGER.md`), dated Umrah source reviews, published Umrah
   cluster articles — **and only after WP1 has removed the contradictory visa sources.** Chunk into Workers KV/D1
   (free plan).
2. **Retrieve** locally. No chunk above threshold → **refuse** and show the relevant page. A refusal is correct.
3. **Generate** from retrieved passages only.
4. **Gate** (below).

**Model choice — verified.** Free set: `@cf/zai-org/glm-4.7-flash`, `@cf/google/gemma-4-26b-a4b-it`,
`@cf/nvidia/nemotron-3-120b-a12b`. **Excluded** — now Workers Paid, HTTP 403 / error 5035 on Free:
`@cf/moonshotai/kimi-k2.6`, `kimi-k2.7-code`, `@cf/zai-org/glm-5.2` (changelog 2026-07-28). **Confirm the model's
plan requirement in the dashboard before shipping** — the most likely thing to break.

**Budget.** 10,000 neurons/day, resets 00:00 UTC ≈ **74 conversations/day** on a 70B model (~2,000 in / 400 out)
or **~120/day** on an 8B. Reserve-before-call counter with a **hard 10,000 cap**; on Free, overage fails closed
rather than billing. Instrument refusals and cap-hits from day one (WP4).

**The four non-negotiables — enforced in code, not in the prompt:**

| # | Gate | Implementation |
|---|---|---|
| a | Answer only from retrieved passages | No passage above threshold → **no model call at all** |
| b | Every answer shows source + date | Rendered beneath, from chunk metadata |
| c | Permanent "not official guidance — verify at the official portal" | Part of the response template, not model output |
| d | Never states a price, processing time or visa validity unless verbatim in a source | Post-generation regex gate that **discards the draft and refuses**. Corpus = `SHARED_UMRAH_BANNED_PATTERNS` (`verify-build.ts:6468-6475`) **plus** the new `100% approval` / `Sofa Template` patterns from WP1, so the AI and content suites cannot drift apart |

**Limit message — international first (owner requirement, revised).**

> **Our free assistant has used its allowance for today.**
> It returns at **00:00 UTC** — that is **6:00 AM in Dhaka**, **7:00 AM in Jakarta**, **3:00 AM in Riyadh**,
> **12:00 AM in London**.
> Meanwhile: [Saudi visa guide] · [Umrah budget worksheet] · [Nusuk guide] — or message us on WhatsApp and a
> person will reply.

Behaviour: show the reader's own timezone first where detectable, UTC second; the box **stays visible** with the
message (never a spinner, never a generic error); offer the **human route**; **no countdown timer**; the allowance
is counted **before** answering so the message is never a broken promise. If the timezone is undetectable, show UTC
plus Dhaka and Jakarta.

**Acceptance.** Negative controls: a draft containing **"BDT 15,500"**, **"2–5 working days"** or **"100%
approval"** is refused. With the counter forced to 10,000, the limit message renders with all named times and the
WhatsApp link. An empty corpus match renders a refusal. No answer renders without a source line or the disclaimer.

---

# Part 6 — Rejected alternatives, with reasons

| Rejected | Reason |
|---|---|
| The `ural-international-budget-planner.html` replacement | Fixed undated rates (reintroduces D7); a `days` multiplier invalid for 5 of 8 categories — measured **14× inflation** (BDT 633,800 → 8,873,200); no Bengali; script-rendered totals; fabricated BRN/CRN fee |
| Publishing our own rates API | Licence forbids redistribution; access would be revoked |
| Using AI to "check" official pages | An LLM cannot verify; it invents confidently. Deterministic fetch + record instead, at zero neuron cost |
| Deleting BDT or the "Umrah cost from Bangladesh" heading | Mapped query; asserted by build guards |
| A currency dropdown on each of the 8 worksheet rows | Clutter plus arithmetic ambiguity |
| A global `days` multiplier on the Umrah worksheet | Valid on the cost estimator (all five lines are per-day/per-person) but **invalid** on the worksheet (3 of 8). The difference is the category list, not the code — which is why it is not "fixed by analogy" |
| **Retiring the cost estimator entirely (Option 1)** | Cheapest and safest, and legitimate if unfunded — but it discards one of the most engaging surfaces. Rebuild chosen instead |
| **Leaving the cost estimator as-is (Option 2)** | Keeps D16/D17 live; it is the pattern already removed from `/umrah` |
| Keeping the Visa Odds Checker under a new name | The claims are the defect, not the label — and D22 shows the deeper issue is a *second unsourced system* |
| A third language now | Closed union; parity gaps already open |
| Reusing the Umrah worksheet's quote-only model for the cost estimator | A pilgrimage package has no defensible preset; a city break does, **provided it is dated** |

---

# Part 7 — Legal and licence constraints (non-negotiable)

From `exchangerate-api.com/docs/free` and `/terms`, read 6 November 2026:

- **Attribution is mandatory** on Open Access: `<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>`. Their docs explicitly allow it to be discreet and in keeping with our design.
- **Caching permitted; redistribution forbidden.** Data "cannot be re-distributed — caching is for customer end-use only", and may not power "any product or service that offers programmatic or automatic access to exchange rate data". Hence **no public `/api/rates`**, no "API" marketing page.
- **Disclaimer to carry, not soften:** rates are "only suitable for informational or illustrative purposes… Use… for actual transactions or as financial data is explicitly not recommended."
- **Tiers:** Open Access = no key, once/day, rate-limited (429 clears in 20 min) · Free keyed = 1,500/month, no attribution · Pro = 60-min updates, 30,000/month, $10/mo. We use Open Access; limits are irrelevant at our scale because the data refreshes daily.

**Platform constraints:** existing conventions from `functions/api/contact.js` — CORS allowlist (never wildcard),
per-IP rate limit answering 429, fail loudly (503) rather than reporting false success, no third-party form relay.

---

# Part 8 — Verification matrix

| Gate | Current | Required after |
|---|---|---|
| `npm run build` | pass (133 EN + 133 BN) | pass at every step |
| `npm run verify:build` | **469 passed** (77 negative controls) | 469 + new, none weakened |
| `npm run test:umrah-budget` | **25 passed** | ≥25 + currency-display tests |
| New: no rate constants in `src/` | — | enforced |
| New: no `≈ [0-9.]+ BDT` literal in prose | — | enforced |
| New: attribution on every rate surface | — | enforced |
| New: no `visa-checker` in menu/sitemap | — | enforced |
| New: banned claim patterns absent (`100% approval`, `Sofa Template`) | — | enforced |
| New: no menu card for an expired promo | — | enforced |
| New: one name per tool across menu/metadata/heading | — | enforced |
| New: estimator shows a dated stamp or no total | — | enforced |
| New: progress bar monotonic 0→100 | ✅ **enforced** (`test:checklist-progress`, 9 tests incl. negative control) | done |
| New: tool events fire and carry no amounts | — | enforced |
| New: AI gate refuses `BDT 15,500` / `2–5 working days` / `100% approval` | — | enforced |
| New: AI limit message names UTC + 4 cities | — | enforced |

**Definition of done:** all gates green; both locales structurally identical; every money figure carries a date and
a source; no surface states a claim the product cannot support; zero ongoing cost.

---

# Part 9 — Open decisions required from the owner

| # | Question | Recommendation | Blocks |
|---|---|---|---|
| Q1 | Visa Odds Checker: delete permanently, or rebuild as a dated lookup? | Delete now (WP1). Rebuild later **only** by projecting `VISA_DATA`, never a second hand-written table | WP1 |
| Q2 | KKday: card only, or partner entirely? | Card only (Option A); fallbacks re-pointed first | WP2 |
| Q3 | Does `/kkday-hotels` earn anything? | If no → delete + 301 to `/hotels` | WP2 |
| Q4 | Do you actually take BDT payment off-site? | If no → rename to "Contact & Trip Help" | WP6 |
| Q5 | Which free model, given the July 2026 change? | Start with `glm-4.7-flash`; verify plan in dashboard | WP8 |
| Q6 | Approve the WP0 paragraphs? | Yes — unblocks Phases 2–3 | WP0 |
| Q7 | Cost estimator: retire or rebuild? | Rebuild (Option 3) | WP9 |
| Q8 | Any dated source for the preset prices, or must airfare go live? | Live/range; an undated point fare is indefensible | WP3, WP9 |
| Q9 | `/costs` says 6 countries, the estimator has 4 — which is canonical? | `/costs` set; extend the estimator to match | WP9 |
| Q10 | Retire `/costs` prose rate strings or generate them? | Generate from WP3 and show the date; never a literal | WP3 |
| Q11 | Is Malaysia's true processing time 2–4 working days (VISA_DATA) or 48–72 hours? | Investigate against the live portal before publishing either | WP1 |

---

# Part 10 — Plain-language summary

1. **Today the money numbers are typed in by hand and are up to 12% wrong.** Four places, including the prose. We
   replace them with one free daily feed that states its date.
2. **The Visa Odds Checker promises "100% approval"** — and contradicts the site's own `/costs` page about
   Malaysia. It goes; the good, sourced visa pages stay.
3. **The KKday offer ended six days ago** and still takes menu space next to Klook. The card goes.
4. **The menu says "Pay in BDT". There is no payment system.** Rename it honestly.
5. **The cost calculator charges a child as an adult** and its airfare figure — 41% of every total — has no date.
   We rebuild it so the reader can replace our guesses with their own quotes.
6. **The Umrah page gets one currency dropdown** that changes what you *see*, not what you *type*.
7. **The converter becomes a proper tool**, with the date shown and four new currencies.
8. **One AI question box**, answering only from checked notes, showing its source, refusing to quote prices — and
   when its free allowance runs out, saying *"come back at 00:00 UTC (6 AM Dhaka, 7 AM Jakarta)"* with a human to
   talk to.
9. **We turn on measurement** so "does this tool deserve a menu slot?" becomes evidence, not opinion.
10. **Cost: £0**, on free tiers throughout.

### Glossary

| Term | Meaning |
|---|---|
| Rate source / API | A website publishing today's exchange rates; we ask once a day |
| Cache | Remembering an answer so we do not ask again all day |
| Neuron | Cloudflare's unit of AI work; 10,000 free per day |
| Allowance / cap | Those 10,000 units; measured before answering |
| Retrieval / RAG | Answering from our own checked notes, not from the internet |
| Guard / negative control | An automatic check that fails the build if something wrong ships; a *negative control* proves the guard can fail |
| Attribution | The credit line we must show the free rate service |
| Fallback partner | The link used automatically if a partner is paused |

---

# Part 11 — Unresolved, carried forward

- **Bengali parity gaps** for articles remain open (`docs/02-content/2026-11-05-en-bn-parity-audit.md`). This plan
  must not widen them.
- **Umrah visa specifics** stay as published: Ministry FAQ, government fee "estimated at 300 Saudi Riyals"
  (checked 15 October 2026), entry window and permitted stay as printed on the visa (the FAQ itself gives 30 days
  in one answer and 90 in another). A **BRN is a booking reference, not a fee** — budget the booking, not the
  number. Indonesian applicants apply through a Kemenag-licensed **PPIU**, not directly.
- **Search demand is unmeasured** for most pages; `docs/02-content/04-keywords.md` treats queries as hypotheses.
  WP4 starts to fix the *usage* half of that.
- **`/costs` revenue and `/kkday-hotels` revenue** unknown — Q3, Q9.
- **AI corpus licensing:** keep the corpus to URAL-authored content and the ledger only.
- **165 BDT literals in `src/constants.ts` and 177 in `src/data/blogContent.ts`** are dateless. This plan fixes the
  six rate strings and the six country quick-answers; a full audit of the remainder is a separate, larger piece of
  work and is explicitly **not** claimed here.

---

# Addendum A — Cost calculator: the analysis behind WP9

Retained for reference; WP9 is the actionable summary.

- **What it does today:** four destinations; a 1–14 day slider; a 1–5 "Companions" slider; a low/mid/high toggle;
  five fixed categories. `flightBdt × peeps`, `lodging × days × ceil(peeps/2)`, and meals/transport/tickets
  `× days × peeps`.
- **Why that model is defensible here and not on `/umrah`:** all five lines here are genuinely per-day or
  per-person. On the Umrah worksheet only 3 of 8 categories are. The arithmetic is the same; the category list is
  not.
- **Measured default state:** Thailand, mid, 1 person, 5 days → **BDT 90,500**, of which airfare **BDT 37,000
  (41%)**.
- **Party-model consequences:** 1/3/5 persons → BDT 90,500 / 249,000 / 407,500, with 1/2/3 rooms and no child or
  infant handling.
- **Airfare sensitivity:** if the true return fare is BDT 26,000 or 48,000, the total is wrong by up to **BDT
  22,000 on airfare alone** — more than any other single input.
- **Naming:** three different names across menu, metadata and heading (D14).

---

# Addendum B — Audit trail and self-corrections

Recorded so this plan's own errors do not propagate.

| # | What I said earlier | Correction | How verified |
|---|---|---|---|
| 1 | `/umrah` has a duplicated `id="false"` | **False alarm.** My grep matched `aria-invalid="false"`. `/umrah` has 17 ids, all unique; `/bn/umrah` 15, all unique | Re-parsed both files with a DOM parser |
| 2 | The worst rate error is GBP at −9.3% | **Incomplete.** The worst is **MYR at −12.2%** in `InteractiveTools`, and the prose strings in `TRIP_COSTS_DATA` add THB −11.9% and MYR −11.6% that v1.0 missed entirely | Full table recomputed against the live payload, §2.4 |
| 3 | v1.0 plan treated the visa checker as a simple claim-wording problem | **Understated.** There are *two* systems (D22) and the build guards existence, not truth | `verify-build.ts:983, 1017` |
| 4 | v1.0 plan omitted the cost calculator entirely | **Gap in my own work**, corrected in v1.1 Addendum A and now WP9 | Owner question |
| 5 | v1.0 had a flat work-package list | **Restructured** into five phases with explicit dependency reasons, Part 4 | This document |
| 6 | v1.0 had no instrumentation plan, so its own success criteria ("judge tools on use") were unmeasurable | **D28 added; WP4 added** | `src/utils/analytics.ts` grep: no tool events |
