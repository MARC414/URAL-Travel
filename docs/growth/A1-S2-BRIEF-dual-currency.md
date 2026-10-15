# A1-S2 — v2 Brief: `dual-currency-card-endorsement-bangladesh`

**Segment:** A1-S2 (brief only — no prose) · **Date:** 16 October 2026
**Ledger:** [`A1-CLAIMS-LEDGER.md`](A1-CLAIMS-LEDGER.md) M1–M5 (owner-approved safe wordings)
**URL verdict:** UPDATE IN PLACE. Same slug, same title intent, EN + BN together. No new URL.

## 1. Page job (one sentence)

A Bangladeshi resident with a passport and a bank card learns **how to get foreign exchange
endorsed and activated so their card actually works for travel payments** — what the quota is,
what endorsement is, the exact steps, and what to do when a payment is declined.

**Primary query (owner/task-derived, demand not measured):** "dual currency card endorsement
Bangladesh / passport dollar endorsement" — informational + procedural.
**Intent/format:** procedural guide. SERP format not re-measured this segment — recorded as
hypothesis per CONTENT-OS; the page's own job does not depend on it.

## 2. Centerpiece (v2 §2 — procedural row)

| Element | Spec |
|---|---|
| H1 | Existing title intent kept: *How to Get Dual-Currency Card Endorsement in Bangladesh (Passport Dollar Endorsement Guide)* — add year only via `updatedAt`, not title churn |
| Direct answer | `QuickAnswer`: endorsement definition + M1 quota one-liner + "stamp alone is not enough — activate the FC/e-commerce part" |
| Trust strip | "Checked 16 October 2026 against Bangladesh Bank FEPD-1 Circular 33 (6 Sep 2026) and GFET card rules" |
| Primary next action | Internal: currency-cost tool `/tools?tab=currency`; then the endorsement checklist (in-page) |

## 3. QD verdicts (v2 §4) — every candidate query decided

| Candidate query | Verdict | Reason |
|---|---|---|
| How to endorse a dual-currency card / passport dollar endorsement | **QD-Page** (this URL) | Distinct procedural job; owns the cluster's entry point |
| What is passport endorsement? $18,000 quota? cash limit? | QD-Heading (§1) | Same job, scannable answer, M1 ledger |
| Which documents / which bank desk / TM form? | QD-Heading (§2) | Core procedure |
| Why was my card declined above $300 online? | QD-Heading (§3, short) + **QD-Link** → RFCD article | This page gives the M2 safe explanation; the deep fix belongs to `rfcd-account-vs-travel-quota…` |
| RFCD vs travel quota — which is better? | QD-Section (§4 summary table/list) + QD-Link | Full comparison lives on the RFCD article; duplicating it here caused the current drift |
| How to avoid DCC abroad? | QD-Section (§5, rule only) + QD-Link → cash/DCC guide | M4 rule without percentages; detail lives on sibling |
| Shariah-compliant dual-currency cards | **QD-Link only** | Sibling owns it; this page must not borrow its product claims |
| I have no card — pay in BDT/bKash | **QD-Link only** → `book-flights-makkah-hotels-in-bdt…` | Commercial service page owns it; body §5 (WhatsApp pitch) is **dropped** (see §6) |
| Money-changer endorsement fee BDT 300 | QD-Section (§2 note) | M5 QUALIFIED wording; clearly separated from bank charges |
| Named bank products & hotlines (EBL Aqua, 16230…) | **Drop from body** | Perishable, unverified this segment; replaced by "what to ask any AD bank" (see Recommendation R1) |

## 4. Component table (v2 §3 — brief format)

| # | Heading (task/question) | Intent | Component (inventory) | Ledger IDs | Modality | Link out |
|---|---|---|---|---|---|---|
| — | Centerpiece answer | Direct answer | `QuickAnswer` + trust strip | M1 | Factual | — |
| 1 | What passport dollar endorsement is — and the $18,000 quota | Define | Prose (definition→rule→attribute, §6.1) + key-facts list | M1 | Factual | — |
| 2 | Step by step: endorse at an AD bank | Procedure | **Numbered checklist** (documents → AD branch → TM form/stamp → fee note → activate) | M1, M5 | Factual | — |
| 3 | Activate the foreign-currency & e-commerce part (the step people miss) | Procedure | Numbered checklist + "say this to your bank" quote block | M2 (practice part) | Factual | — |
| 4 | If a big flight/hotel payment is declined (the $300 rule) | Diagnose | Prose (rule→exception→action, M2 safe wording) | M2 | Factual | → RFCD article |
| 5 | Travel-quota card vs RFCD — in one view | Compare | Structured list (table if renderer supports for this slug; otherwise definition list — see R3) | M1, M3 | Factual | → RFCD article |
| 6 | Paying abroad: choose local currency | Rule | Short prose + do/don't list | M4 | Factual | → cash/DCC guide |
| 7 | Practical notes (checked-date reminder, keep endorsement receipts, quota is per calendar year & per person) | Judgement | Segmented practical section (v2 §6.2) — **no new facts** | M1–M5 restated only | Practical | — |
| 8 | FAQ (max 4: quota per person? can I endorse $18k at once? stamp but card still fails? cash over $5k?) | Remaining Qs | FAQ block + schema parity | M1, M2 | Factual | — |
| — | References | Trust | References block: P1 (BB Circ. 33), P3 (GFET Ch.19), P2 (RFCD circ. letter), P4 (EBL RFCD), S1 (BSS fee report — labelled secondary) | — | — | External, tier-labelled |

## 5. Bengali parity plan

- BN is **not** a translation of the old BN: rebuild from the same ledger. Known BN-only drift
  to eliminate: BN's "BDT 200–575 bank service charge" (absent in EN, unsourced) — **drop**;
  BN hotline/app claims — drop with R1; BN quota citation — align to FEPD-1 Circular 33.
- Same 8 sections, same numbers ($18,000 / $5,000 / $9,000 / $300 / BDT 300), same links
  (BN internal links to `/bn/blog/…` twins where they exist).
- Parity measured on decisions preserved (v2 §7), checked section-by-section at S4.

## 6. Recommendations (my judgement — owner may overrule)

- **R1 — Drop all named bank products, app names and hotline numbers.** They are the fastest-rotting
  content on the page, none were re-verified this segment, and the reader's real need is
  *what to ask any AD bank*. Replace with card *types* (debit/prepaid/credit) + a script.
  This also removes 6 future audit liabilities from one page.
- **R2 — Drop body §5 (WhatsApp sales pitch).** Editorial body should not carry the sales close;
  the page already has `affiliateCTA` and will QD-Link to the BDT-booking article. Keeps the
  guide trustworthy and the commercial offer in its labelled place.
- **R3 — Comparison as structured list, not a new table component.** The blog renderer only
  special-cases tables for specific slugs; don't couple this content fix to a dev change.
  File the generic semantic-table support as a separate dev ticket if wanted later.
- **R4 — Keep the existing title/slug/category and the 5 current internal links** (all resolve);
  retitle two anchors that carry dropped claims: "($300 Cap Fix)" → "(the $300 online-payment
  rule)", "(Avoid 5% DCC Trap)" → "(choose local currency and avoid DCC)".
- **R5 — Length discipline:** target ≈700–900 EN words (from 824, but with folklore removed
  the *verified* density rises). No filler sections to hit a count.
- **R6 — `updatedAt` set at S5** to the S3 completion date; date in metadata
  ("September 26, 2026") stays as original publish date.

## 7. Gate

✋ **Owner approval of this brief (incl. R1–R4 drops) = go for S3 English draft.**
S3 will use only M1–M5 safe wordings; anything not in the ledger does not enter the draft.

## Addendum — GSC baseline (owner-supplied, 16 Oct 2026; period as exported)

- This page is the site's top blog page in the export: **61 impressions, 2 clicks**
  (`/blog/dual-currency-card-endorsement-bangladesh`). Next blog page: airport checklist, 22/0.
- Matching queries seen: "dollar endorsement limit in passport bangladesh" (1 imp.),
  "ডুয়েল কারেন্সি কার্ড" (1 imp.). Volumes are very small — treat as directional, not demand proof.
- Consequence: preserve slug/title/H1 intent exactly; post-S7 checkpoint compares this page's
  impressions/clicks/queries against this baseline over a stated equal period. Do not claim
  causation from small numbers.

## S3–S6 execution record (16 Oct 2026)

- S3 EN draft, S4 BN rebuild (number-set parity identical; BN-only BDT 200–575 dropped), S5 package
  (5 references, updatedAt 2026-10-16, anchors retitled, snippets rewritten, CONTENT_UPDATED bumped).
- S6 preflight: 14/14 checks PASS (absolutist scan, citations, parity, metadata, slug).
- S6 defect found & fixed: HowTo structured-data config was keyed to the old headings/step
  formats — §2 steps restructured to parser formats (EN "Step N:", BN numbered-bold), config
  regexes updated, FAQ config added for this slug (EN §8 / BN §৮). Generic FAQ surfaces
  (faqSchema, prerender homepage FAQ) citation form corrected to FEPD-1. The Shariah article's
  own "FE/PD-1" instances remain for its A1 turn — out of scope here.
- Stage 8 score: Intent 3/4 (GSC-aligned; demand/SERP not measured) · Factual 4/4 ·
  Usability 3/4 (rendering proof deferred to S7) · Locale/trust 3/4 (dist proof deferred) =
  **13/16 — PASS at threshold, no zero, no hard fail.** S7 build/dist inspection must confirm
  HowTo/FAQ schema actually emit; if not, score drops and S6 reopens.

## S7 handoff record (16 Oct 2026)

- `npm run lint` PASS · `npm run build` PASS (94 EN + 94 BN routes) · `npm run verify:build` PASS — all 162 checks.
- dist EN+BN inspected: canonical correct, dateModified 2026-10-16, **HowTo + FAQPage schema emit in both locales** (S6 conditional pass confirmed), 5 references render (3× bb.org.bd + EBL + BSS), zero old "FE/PD-1"/"5% DCC" strings in this page's HTML.
- Affiliate: pre-existing `affiliateCTA` (aviasales) retained in metadata and rendered client-side as before; no new body affiliate links were added (owner-approved R2). Internal links (4 blog + /tools) render in prerendered HTML.
- Sitemap diff = expected CONTENT_UPDATED lastmod roll + this post's RSS description. No other post body/metadata changed.
- **Not deployed.** Owner publish decision pending; GSC baseline filed in this brief for post-publish comparison.
