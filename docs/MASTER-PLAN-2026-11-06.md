# MASTER PLAN — URAL: international positioning, honest tools, live rates, free AI

**Version 2.0 · 6 November 2026 · Branch `arena/56e63301-ural-travel` · Baseline `c63cd5a`**

**Lifecycle: CURRENT PHASE PLAN AND EXECUTION RECORD · updated 7 November 2026.**

The original diagnostic and design baseline is retained below. Local implementation has progressed through
the truth/foundation work and the tool rebuild. The [travel-tool contracts](01-technical-seo-aeo/TRAVEL-TOOLS.md)
describe the saved implementation; dated resolution notes supersede the original design where evidence changed
the approach. Local verification is not a deployment record. Remaining voice/assistant work retains its own gates.

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
| **D5** | ~~Removing KKday would create dead links~~ — **closed as not applicable** (6 Nov): the owner kept the whole partner, only the expired card was removed, so no fallback needed re-pointing. Retained for the record in case a future task removes the partner. | `AffiliatePartners.tsx` | `resolvePartnerUrl()` routes paused partners to fallback |
| **D3** | **A payment and booking capability that does not exist — and it is a theme, not a string.** *"Contact & BDT Booking Desk — Pay in BDT via bank / bKash"* appears across **16 surfaces in two locales**: a `Service` schema node on `/contact`, two duplicated copies of that node in prerender, an indexed `<h1>`/`<p>` claiming *"Umrah e-Visa processing"* and *"BDT flight & hotel booking"*, FAQ answers published as JSON-LD (*"settled via bKash… in person at our affiliated office"*), two menus, three CTA blocks, and a whole article. **Re-scoped 7 Nov 2026 — the original register recorded one surface.** | `App.tsx:1909,1913-1915,3034-3035,3340`; `scripts/prerender.ts:512-513,2571-2574,2580-2581,4254-4257`; `src/utils/faqSchema.ts:161,376`; `src/utils/bn-faq-schema.ts:33,143`; `InteractiveTools.tsx:265,274,800`; `ExperiencesPage.tsx:1104-1111,1124-1125`; `GlobalAttractionsHub.tsx:911-912`; `TopicalAuthorityBlueprint.tsx:504-518` | `functions/api/contact.js` is a Resend email transport; there is no checkout, no PNR issuer and no visa submission path anywhere in the repo |
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
| **0** | **Truth** | ✅ **Complete** — remove everything false or stale *today*; make the site measurable | WP7 ✅ · WP0 ✅ · WP4 ✅ · WP2 ✅ · WP1 ✅ | **Phase 0 complete** |
| **1** | **Foundation** | ✅ **Complete** — one dated rate source; one number discipline | WP3 ✅ | done |
| **2** | **Tools** | ✅ **Complete** — honest converters and estimators | WP5 ✅ · WP9 ✅ | done |
| **3** | **Voice** | ✅ **Complete** — international framing across the interface | WP6 — D3a ✅ · D3b ✅ · D3c ✅ | done |
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

### WP1 — ✅ **DONE 6 November 2026** — Remove the fabricated visa claims and unify the two systems

**Objective.** One visa truth, not two contradicting ones (D2, D21, D22).

**Delivered.** The plan's assumption that one of the two Malaysia figures must be right was **wrong — both were**.
The evidence came from the primary source, so Q1 and Q11 were answered by research rather than by the owner.

**What the live check found** — Immigration Department of Malaysia eVISA FAQ, last updated **6 October 2026**
(`malaysiavisa.imi.gov.my/faq`), corroborated by Malaysian mission pages (`kln.gov.my`):

| Claim that was live | Where | Official position |
| --- | --- | --- |
| Malaysia processing **"48-72 hours"** | `InteractiveTools.tsx:229` | **"2 - 7 working days"**, excluding weekends, public holidays, incomplete/query/interview cases |
| Malaysia processing **"2-4 working days"** | `constants.ts:989/1015/1624`, `blogContent.ts`, `blogSnippets.ts` | same — understated by roughly half |
| **"100% approval rates"** when bank statement ≥ BDT 80,000 | `InteractiveTools.tsx:229` | *"does not guarantee that the eVISA will be issued"*; the mission *"reserves the right to refuse … without providing any reason"* |
| India → Malaysia **"Visa On Arrival"** | `InteractiveTools.tsx:236` | Indian nationals are **exempt from the visa** for social visits until 31 Dec 2026, and India is **not** on the 31-nationality eVISA list |
| **"6-month"** bank statement | `constants.ts:976/992` | statements for the **last 3 months**, plus return ticket and accommodation proof |
| Bengali "৪ থেকে ৭ কার্যদিবসে" | `bengaliContent.ts:691` | ✅ already correct — the only surface that was |

**Delivered, in order.**
1. **Deleted the parallel system.** `visaEligibilityMap`, its two `useState` hooks, the "Visa Checker" tab button and
   the whole evaluator panel are gone from `InteractiveTools.tsx` (65,272 → 58,151 bytes). No replacement matrix was
   built: 12 assertions across 12 passport/destination pairs, with no date and no source, cannot be maintained.
2. **Removed it from navigation.** The `App.tsx` mega-menu card, the footer tool list, `ToolTabId`,
   `TOOL_TAB_TO_SLUG` and the `TOOL_PAGE_SEO` entry in `toolRoutes.ts`, plus four prerender link lists and the
   related-links table.
3. **Redirected, permanently, in both languages:** `/tools/visa-checker → /tools` and `/bn/tools/visa-checker →
   /bn/tools` in `public/_redirects`; `?tab=visa-checker` deliberately left unmapped in `functions/_middleware.js` so
   it falls through to the hub rather than 301-ing at a deleted page. `/tools` is the honest target — `/visa` still
   holds the guide, and the plan's original `/visa` target would have implied the tool still existed.
4. **Corrected the figures** to the official **2-7 working days** with *"apply at least 14 days before departure"*
   and a **checked 6 November 2026** date, at every location; "6-month statement" → "last 3 months" on `/costs`;
   "100% approval" removed from `constants.ts:1624`; "100% Online e-Visa" labels de-hyped.
5. **Truth guard** — `scripts/test-visa-claim-integrity.ts` (8 tests, `npm run test:visa-claims`, wired into CI).
   Chosen over extending `verify:build` because it needs to parse quoted durations, not match a flat blocklist.

**Two defects in the guard itself, both found by negative control, not by review.**
- The first version was a **blocklist** of the five strings live on 6 Nov. A negative control introduced an
  undeclared *"1-2 working days"* and it **passed**. Replaced with a parser that compares any quoted duration's upper
  bound against the official 7.
- The parser then matched only hyphenated ranges, so restoring *"2 **to** 4 working days"* **passed**. Widened to
  accept `-`, `–`, `—` and `to`.
This is why the suite ships with three assertions whose only job is to prove the checks can still fail.

**Debt ratchet.** While step 1 was in flight, the five not-yet-corrected claims were declared in a `KNOWN_DEBT` list
so the suite could be green without claiming the site was clean. Each entry had to be deleted as its figure was
fixed — a "the debt is still real" test failed until it was. **The list is now empty and permanently must be.**

**Verification.** lint clean · `tsc --noEmit` clean · build pass (**132 EN + 132 BN**, was 133: the tool's page is gone)
· `verify:build` **470/470** · visa-claims **8/8** · umrah-budget **25/25** · checklist-progress **9/9** ·
tool-analytics **10/10** · kkday-card **7/7**. No `dist/**/*.html` contains "Visa Odds Checker", "100% approval" or
the evaluator heading; `dist/tools/visa-checker.html` and its Bengali twin no longer exist; sitemaps carry **0**
references; both 301s ship in `dist/_redirects`.
`verify:build` independently caught a guard that had been scraping the deleted block and gone hollow — it now holds
that copy as a fixture and additionally asserts the checker stays removed.

**Known gap — recorded, not papered over.** No Bangladesh-specific official statement of a Dhaka High Commission
processing delay was found; the mission pages are generic. The copy therefore quotes the portal's own range and its
own 14-day advice, and invents no local figure. If a future check finds a Dhaka-specific service standard, add it with
its date and source.

**Rollback.** `git revert` this commit; the matrix, navigational entries and figures return together.

**Original plan text, kept for the record:**
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

### WP2 — 🟠 De-clutter the Experiences menu — ✅ **DONE 6 November 2026 (scope: card only)**

**Owner decision.** *"Remove the KKday card only — the offer has expired, so no benefit to keep it. But keep the
KKday functionality set up earlier; don't keep the expired 31 October offer."*

**Delivered — the expired offer is gone; HD functionality untouched.**
- The **Feature Callout Card container** is now gated on `isPromoActive(KKDAY_PROMO.expiresAt)`
  (`src/App.tsx`, Experiences mega-menu). It renders nothing today and **returns automatically** when a future
  `expiresAt` is set — so a new campaign needs no code change.
- The unreachable "evergreen fallback" copy (*"KKday Asia Travel Passes" / "Check terms" / "KKday Passes ↗"*) was
  **deleted**. It could never render once the container is gated, and leaving it in implied a fallback that did
  not exist.
- **`scripts/test-kkday-card-expiry.ts`** (new) — **7 tests**, wired into `package.json` and CI.

**The actual bug, stated precisely.** `isPromoActive(...)` guarded the card's *copy* while the card's own `<div>`
rendered unconditionally. So from 1 November 2026 the menu carried a KKday card advertising a finished 10.10 sale,
sitting beside **Klook**, which is the featured partner in the same column with a live boost through 31 December.
Its own `expiredFallbackBehavior` said it should have switched on 1 November — nothing enforced that.

**What was deliberately NOT changed (the owner's "keep the functionality" instruction):**
- `AFFILIATE_LINKS.kkday` and `AFFILIATE_LINKS.kkdayHotels` — unchanged.
- Both registry entries (`kkday`, `kkdayHotels`) — unchanged, so `resolvePartnerUrl()` still resolves.
- `/kkday-hotels` page, route and section handler — unchanged.
- `KKdayPromoBanner` — already correctly date-gated **and already covered by an existing `verify:build` guard**
  that mocks the clock (`verify-build.ts:3440-3470`). It was never the problem.
- `sanitizeExpiredPromoText()` — unchanged; it already strips expired campaign text from blog bodies.

**Consequence for the earlier plan text:** WP2's "re-point the fallbacks first" step is **no longer required**,
because no partner was removed. D5 (dead-link risk from deleting KKday) is closed as *not applicable* under this
scope. D6 (`/kkday-hotels` orphan) remains **open** pending Q3 — the owner kept the page, so its discoverability
is still a live question, not something this change should decide.

**Verification:** lint clean · build pass · `verify:build` **469/469** · `test:kkday-card` **7/7** ·
regression re-proved by un-gating the container (suite failed with *"the card container is not wrapped in an
isPromoActive gate"*) then restoring. Built HTML confirms **no prerendered page** carries `1010TOURS`,
`KKday 30% Sale` or `30% OFF Flash`; the strings survive only inside the JS bundle as the gated (currently dead)
branch, which is correct.

**Rollback:** one gate and one copy change in `App.tsx`, plus the test file.

## PHASE 1 — FOUNDATION

### WP3 — ✅ **DONE 7 November 2026** — One dated rate source, and the end of hand-typed rates *(unblocks WP5, WP9)*

**Delivered in `0f2b8484`** (66 files, +2752/−3015) — the commit message names the travel-tool and fare work, so the
WP3 half is recorded here: **all fixed rate constants were deleted from `src/`**; `functions/api/rates.js` and
`src/utils/rateData.ts` are now the only rate source, and `src/utils/rates.ts` the only browser client.

**7 November implementation resolution.** The endpoint and client now share `rateData.ts`. They read the
provider's real top-level Unix timestamps, validate the base and finite rates, preserve the date through cache
failure, bound stale use and render linked attribution from the displayed payload. Cache storage is per Cloudflare
location, not a global once-per-day job. The home card links to the converter route; flight handoffs keep currency
preferences independent of local FX. The
[current contract](01-technical-seo-aeo/TRAVEL-TOOLS.md#exchange-rates) controls maintenance.

The executed work order is replaced by the implementation contract linked above. Rate normalization,
direction, corrupt payloads, blocked storage, retry delays, stale bounds and unavailable-FX behavior are covered
by `test:rates`; static output and fixed-rate regressions are covered by `verify:build`.

---

## PHASE 2 — TOOLS

### WP5 — ✅ **DONE 7 November 2026** — Currency choice on the Umrah worksheet

**Delivered — verified, not assumed.** `UmrahBudgetCalculator.tsx` holds `currencyChoice: "BDT" | "USD" | null`,
defaulting to `preferredCurrencyForOrigin(origin)`, so the control follows origin until the visitor chooses and then
keeps an explicit choice across origin changes. One selector, not per-row. An "Equal share per traveller" result is
labelled, with a note that equal sharing is arithmetic and not the child/infant fare. All eight whole-party inputs
remain BDT. `test:umrah-budget` **26/26**, including *"Umrah currency defaults follow origin while all eight inputs
remain BDT"* (DAC/ZYL → BDT, LHR → USD). `verify:build` checks the EN/BN controls in `dist`. Nothing was left to do.

**7 November implementation resolution.** The shared worksheet now has BDT/USD display choice, dated provider
attribution, a labelled BDT fallback and explicit equal sharing. An explicit choice survives origin changes. The
eight whole-party input categories retain their calculation contract. See the
[current contract](01-technical-seo-aeo/TRAVEL-TOOLS.md#umrah-and-currency-conversion).

The executed control work order is replaced by the shared worksheet implementation. `test:umrah-budget`
covers its arithmetic, unknown/zero inputs and origin defaults; rate failure and conversion contracts use
`test:rates` plus bilingual browser checks.

---

### WP2b — Tool tab honesty pass *(owner-requested 7 November 2026)*

The owner kept the WhatsApp contact channel deliberately: *"I need people to contact me through WhatsApp."* So the
question was never whether to have it, but whether the labels told the truth.

**Kept, relabelled where the label overstated the thing.**
- **Airport Codes tab.** `AIRPORTS_DIRECTORY` holds exactly **32** entries and the badge says "32 Verified Air Hubs" —
  that figure is true and was left alone. The WhatsApp generator is honest by construction: its prefilled message
  asks URAL *"to point me to the airline or the site that sells this route … so I can compare the all-in price
  myself."* It never claims URAL books. **Changed:** the heading from "1-Click WhatsApp Fare Question" to
  "1-Click WhatsApp Contact — Flights, Routes & Documents", and added a scope line stating that URAL does not sell
  tickets and points readers to the airline and official portal. That makes an existing contact channel clearer, not
  smaller.
- **AirHelp tab.** Left visible and unmistakably attributed to AirHelp in its label. **Defect found and fixed:** the
  widget opened four affiliate links with **no affiliate disclosure at all** in the widget. The footer carries a
  site-wide disclosure, but an 11px footer line does not carry a whole tab sitting beside tools URAL actually built.
  Added the same wording `JourneyHelpPanel` already uses, in both locales.

**Guards added (14 tests in `test:visa-claims`):** the site-wide footer disclosure must exist in both locales, and a
tab that is wholly an affiliate placement must disclose locally. Negative control: deleting AirHelpWidget's
disclosure fails the suite with the named check.

---

### WP9 — ✅ **DONE 7 November 2026** — The Trip Cost Estimator, rebuilt as two layers *(incorporates Addendum A)*

**7 November evidence-led implementation resolution.** The saved `/costs` matrices had no recorded supplier
sources or price-collection dates. The owner's delegated implementation decision and Number rule therefore require
quote-based output: named reader sources, their checked date, exact minor-unit arithmetic and no total/breakdown
until required costs are present. Current airfare comes through the hosted search handoff. Six destination guides
now supply bilingual cost-category and quote-comparison guidance. Hotel rooms/nights are explicit; adult, child and
infant airfare is covered separately or by an explicit whole-party quote; child admission is never an adult-price
fallback. Menus, metadata and the shared EN/BN initial HTML use **Trip Cost Estimator**.

The original preset design is superseded. A future
indicative-price layer requires actual supplier evidence before any figures can render. The
[current estimator contract](01-technical-seo-aeo/TRAVEL-TOOLS.md#trip-cost-estimator) supersedes it.

The executed rebuild work order is replaced by `TripCostEstimator`, `tripCostEstimator.ts`, the bilingual
`tripCosts.ts` records and their shared prerender components. `test:trip-estimator` covers calculation
invariants and EN/BN rendering; `verify:build` checks the saved pages. The former source-free prices and
mixed category units are not retained as a market-price layer.

---

## PHASE 3 — VOICE

### WP6 — Relabel the menu, and fix the payment promise *(1.5–2 days, not 0.5 — re-scoped 7 November 2026)*

**Scope correction (7 Nov 2026).** WP6 assumed D3 was two strings at `App.tsx:3044-3045`. It is a theme across
**16 surfaces and one whole article** (corrected D3 row in §2.2). Shipping the two-string version would remove the
visible label and leave the same claim in JSON-LD, in prerendered HTML, and in a post Google already indexes.
D3 splits into three independently shippable slices:

| Slice | What | Surfaces | Effort |
|---|---|---|---|
| **D3a — machine-readable identity** | The `Service` node and the `/contact` meta must describe *information and planning*, not booking, visa processing or payment. Fix all three copies (app + both prerender branches) **and** the indexed `<h1>`/`<p>` in the same commit, or the static HTML keeps contradicting the app. | `App.tsx:1909,1913-1915`; `prerender.ts:2571-2574,2580-2581,4254-4257` | 2–3 h |
| **D3b — visible CTAs** | Menu labels, WhatsApp generators, and the two partner blocks: no payment claim without a payment path. Keep DAC/bKash *guidance* in subtitles where it genuinely helps the reader; remove it where it is a sales promise. | `App.tsx:3034-3035,3340`; `InteractiveTools.tsx:265,274,800`; `ExperiencesPage.tsx:1104-1111,1124-1125`; `GlobalAttractionsHub.tsx:911-912`; `prerender.ts:512-513` | 3–4 h |
| **D3c — the article** | `/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card` plus its snippet, SEO copy, cover, alt text, sitemap entry and internal links. **Owner decision, not a copy edit:** rewrite as a *payment-methods* guide with no URAL booking claim, or delete with a 301. Until decided, `blogSnippets.ts:44-45,137-138` must not claim URAL books or issues tickets. | 8 files + sitemap | 0.5 day if rewritten |

D3a goes first because it is the only slice that is *legally identifying*: it is the machine-readable answer to
"what is this business". D3b is the visible half of the same sentence. D3c waits for the owner's article decision.

**D3b — shipped 7 November 2026** (`0f2b8484`). Every "pay in BDT / message our Dhaka desk / pay in Taka via bKash"
claim was replaced with platform-checkout guidance: `ExperiencesPage.tsx` (banner body), `GlobalAttractionsHub.tsx`
(advisory bullet 2), `App.tsx` and `InteractiveTools.tsx`. Verified: `grep` for "message our dhaka desk" and "pay in
Bangladeshi Taka via" returns **0**. The surviving "Payment Guide" headings are guidance, not a payment offer, and stay.

**D3c — DECIDED AND DELIVERED 7 November 2026: deleted, not rewritten.** Owner chose deletion with a 301.

Deleted: the article body in both locales (`blogContent.ts`, `bengaliContent.ts`), its `BLOG_DATA` and BN records,
its `bankingHubData` method card, its `blogIndex` entry, alt text, cover image, snippet, SEO copy, the four
`prerender.ts` link lists, `BlogPostRouteView`'s keyword matcher, its `TopicalAuthorityBlueprint` keyword node, and a
hardcoded `<li>` in `index.html` itself (the last one only surfaced because `verify:build` compares homepage blog
links against `BLOG_DATA`).

Redirected: `/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card → /banking` and its `/bn/`
twin → `/bn/banking`. The banking hub keeps the underlying guidance — endorsement, RFCD, card vs cash — without a
booking promise. `BANKING_PAYMENT_METHODS.nodeSlug` became optional and both renderers now guard it, so the
still-useful "BDT settlement" method card no longer links to a deleted page.

Build: **131 English + 131 Bengali** routes (132 → 131), 52 blog covers.

**Superseded note — the earlier partial fix.** The following was true between the two commits and is kept for the
record: Rewording the three titles from "Pay" to "Settle" did
not resolve the ambiguity my review flagged: the article's STEP-BY-STEP section said *"Message **the desk** your travel
dates … and a passport bio-page scan"* and *"pay by bKash or Nagad"* without ever naming who "the desk" was, on a
domain the reader is already on. A reader would reasonably supply URAL. Fixed by naming the actor explicitly — the
section now opens *"This section describes the route used by licensed travel agencies and airline offices in Dhaka.
**URAL is not that desk** — it does not take your payment, your documents or your booking"* — and Step 2 warns the
reader to send identity documents only to the business they are actually paying. **The rewrite-or-301 decision still
belongs to the owner** and is unchanged.

**Q4 is resolved** (owner, 7 November 2026): URAL takes no payment for travel services. A paid consultation may
exist later, and must be disclosed on the page that offers it — not implied in a menu label.

The menu relabel (D9/D14, Part 3.2 table) is unaffected by the split: apply it in both locales to
`App.tsx:2960-3050` plus the mobile menu.

**Acceptance.** No page publishes a `Service` whose `serviceType` or `description` names booking, ticket issuance,
visa processing or local payment; `grep` for `PNR tickets`, `e-Visa processing` and `settled via bKash` returns
nothing in `src/` **or** `scripts/prerender.ts`; both locales; `verify:build` green.

**D3a — shipped 7 November 2026.** `Service` node replaced in all three copies (`App.tsx` + both `prerender.ts`
branches) with `serviceType: "Travel Information"`, an `@id` of `…#service-travel-information`, and a description that
states URAL does not sell, book or issue flights, visas, hotels or tickets and takes no payment. The indexed `/contact`
`<h1>`/`<p>` were rewritten in the same change, and the visible React hero (`ContactRouteView.tsx`) now carries the
same heading. The page's own summary answer, key facts, trust bullet and the `SERVICE_CONTACT_FAQS` /
`BN_SERVICE_CONTACT_FAQS` entries (payment, IATA agency desks, price-alert automation) were corrected because they
sat on the same page and would otherwise contradict the new heading. `lint` 0, `build` 132 EN + 132 BN,
`verify:build` 470/470. Two items deliberately left for their own slices (both pre-existing):

- `/contact` still links *"How to book travel in BDT by bKash or bank transfer"* in its related-guides list; that anchor
  disappears when D3c is decided.
- The Bengali `/contact` page renders the English FAQ list and gains no Bengali `FAQPage` node in prerender — an
  EN/BN parity gap, not a payment claim. Next candidate for a one-file step.

---

## PHASE 4 — ASSISTANT

### WP8 — ⛔ **NOT STARTED — blocked on infrastructure, not on effort** — Free AI helper with four hard gates

**Owner decision 7 November 2026: yes in principle, but only if it gives real help.** *"I think we should apply AI helper
in the site if it is not able to render any real help"* — i.e. ship it when it works, not before. That matches the
plan's own gate better than a scaffold would.

**Why it cannot be built here.** Verified in this repository: there is **no** `wrangler.toml`, no Workers AI binding,
no KV/D1 namespace, no AI function under `functions/api/` (only `contact.js`, `rates.js`, `subscribe.js`), and no
authenticated free-plan token. A helper with no corpus would render a chat box that cannot answer — a public promise
with nothing behind it, which is the exact defect class this plan exists to remove (D5, D6, the KKday card, the Visa
Odds Checker).

**Rejected: offline-mock scaffolding.** A UI with stubbed answers and gates tested against fixtures would look
finished and behave like a lie. Gates proven against *mock* ingestion prove nothing about real ingestion — the exact
lesson from WP1, where the visa guard passed on fictional data twice.

**To unblock, in order:**
1. Create the Cloudflare Workers project and bind Workers AI + one KV namespace; record the binding names in `wrangler.toml`. (Owner action — needs the account.)
2. Choose the model from the **free-verified** set and confirm its plan requirement in the dashboard *before* shipping. `@cf/moonshotai/kimi-k2.6`, `kimi-k2.7-code` and `@cf/zai-org/glm-5.2` now require Workers **Paid** (changelog 2026-07-28) and fail with 403 / error 5035 on Free.
3. Author the corpus from sources that already exist and are dated: the Umrah hub, the dated Saudi source reviews, and `SHARED_UMRAH_BANNED_PATTERNS`. No new research.
4. Then build UI + gates + limit messaging + negative controls, in that order.

**Budget reality.** 10,000 neurons/day on Free ≈ **74 conversations/day** (70B, ~2,000 in / 400 out) or **~120/day**
(8B). Overage fails closed — no bill — which is the right failure mode. Instrument refusals and cap-hits from day one.

**Still-unanswered question for the owner:** the corpus is Umrah-only per the plan. Is that the intent, or should the
first version answer broader travel questions? A narrow box that refuses most questions is honest but may disappoint;
a broad box without a broad corpus is the failure mode above.

**Original scope, unchanged:**

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
| Earlier rejection of quote-only output for the cost estimator | **Superseded 7 November:** no supplier provenance was recorded for the saved city-break prices. The current implementation uses sourced, dated reader entries and provider search handoffs. Presets need actual evidence before publication |

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
| New: no menu card for an expired promo | ✅ **enforced** (`test:kkday-card`, 7 tests incl. container-gate proof) | done |
| New: one name per tool across menu/metadata/heading | — | enforced |
| New: estimator shows a dated stamp or no total | — | enforced |
| New: progress bar monotonic 0→100 | ✅ **enforced** (`test:checklist-progress`, 9 tests incl. negative control) | done |
| New: tool events fire and carry no amounts | ✅ **enforced** (`test:tool-analytics`, 10 tests incl. allowlist + injection proof) | done |
| New: AI gate refuses `BDT 15,500` / `2–5 working days` / `100% approval` | — | enforced |
| New: AI limit message names UTC + 4 cities | — | enforced |

**Definition of done:** all gates green; both locales structurally identical; every money figure carries a date and
a source; no surface states a claim the product cannot support; zero ongoing cost.

---

# Part 9 — Open decisions required from the owner

| # | Question | Recommendation | Blocks |
|---|---|---|---|
| Q1 | ~~Visa Odds Checker: delete permanently, or rebuild as a dated lookup?~~ | ✅ **Resolved 6 Nov by evidence, not preference.** Deleted permanently, no rebuild. It had no source and no date, and four of its twelve cells contradicted the official FAQ. Any future visa help is a dated lookup pointing at the official portal | resolved |
| Q2 | ~~KKday: card only, or partner entirely?~~ | ✅ **Answered 6 Nov: card only.** Functionality retained; expired offer hidden behind a date gate | resolved |
| Q3 | Does `/kkday-hotels` earn anything? | If no → delete + 301 to `/hotels` | WP2 |
| Q4 | ~~Do you actually take BDT payment off-site?~~ | ✅ **Resolved 7 Nov 2026 by the owner: no.** URAL takes no payment for travel services. A paid consultation may exist later and must be disclosed on the page that offers it, never implied in a menu label | resolved → D3b |
| Q5 | Which free model, given the July 2026 change? | Start with `glm-4.7-flash`; verify plan in dashboard | WP8 |
| Q6 | Approve the WP0 paragraphs? | Yes — unblocks Phases 2–3 | WP0 |
| Q7 | Cost estimator: retire or rebuild? | Rebuild (Option 3) | WP9 |
| Q8 | Any dated source for the preset prices, or must airfare go live? | Live/range; an undated point fare is indefensible | WP3, WP9 |
| Q9 | `/costs` says 6 countries, the estimator has 4 — which is canonical? | `/costs` set; extend the estimator to match | WP9 |
| Q10 | Retire `/costs` prose rate strings or generate them? | Generate from WP3 and show the date; never a literal | WP3 |
| Q11 | ~~Is Malaysia's true processing time 2–4 working days or 48–72 hours?~~ | ✅ **Resolved 6 Nov: neither.** Official FAQ (updated 6 Oct 2026) states **2 - 7 working days**. Both site figures understated it | resolved |

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

- **Historical 6 November baseline — superseded by the 7 November rebuild:** four destinations; a 1–14 day slider; a 1–5 "Companions" slider; a low/mid/high toggle;
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
