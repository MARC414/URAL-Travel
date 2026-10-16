# A1-S2 — v2 Brief: `rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix`

**Segment:** A1-S2 (brief only) · **Date:** 16 October 2026 · **Ledger:** `A1-CLAIMS-LEDGER.md` M1–M3
**URL verdict:** UPDATE IN PLACE (slug/title intent kept; the slug's "300-dollar-limit-fix"
framing stays, the body must finally match it honestly).

## 1. Page job

A Bangladeshi traveller whose card was declined on a large flight/hotel payment learns
**why the $300 online limit exists, the two legitimate ways around it (documented bank
approval on a travel-quota card; an RFCD account whose card pays online at actual), and
which fits their situation.**

Relationship to article 1 (just rebuilt): that page *defines* endorsement/quota and links
here for the decline problem. This page must not re-teach endorsement — one summary
paragraph + link back.

## 2. Centerpiece (procedural/comparative hybrid)

- QuickAnswer: "$300 is Bangladesh Bank's general online-payment cap (GFET Ch. 19);
  travel payments can be processed larger only with your bank's documented approval;
  RFCD cards are expressly allowed to pay online at the actual amount (2024 circular)."
- Trust strip: "Checked 16 October 2026 against Bangladesh Bank GFET Ch. 19 and FE
  Circular Letter No. 05 (9 May 2024), and bank RFCD pages (EBL, SIBL)."
- Next action: decision table (§3) → endorsement guide (article 1) → currency tool.

## 3. QD verdicts

| Query | Verdict |
|---|---|
| Why is my card declined over $300 online? | **QD-Page core** (§1–2) |
| How to pay a $600–$2,500 flight/hotel on a TQ card | QD-Heading (§2, practice framed as bank's decision) |
| What is an RFCD account / who can open / deposit rules | QD-Heading (§3) |
| RFCD vs travel quota comparison | QD-Heading (§4 comparison list) |
| RFCD card online payment "at actual" | QD-Heading (§3, P2-cited) |
| How to endorse / quota basics | QD-Section summary + QD-Link → article 1 |
| DCC abroad | QD-Link → cash guide |
| Shariah RFCD/cards | QD-Link → Shariah article |
| No-card BDT booking | QD-Link → BDT booking article |

## 4. Component table

| # | Heading | Component | Ledger | Modality | Link |
|---|---|---|---|---|---|
| 1 | Why the $300 decline happens | Prose (rule→scope→exceptions) | M2 | Factual | — |
| 2 | Option A: documented approval on your TQ card | Numbered checklist (ask before paying, ticket/hotel proof, no guarantees) | M2 | Factual | → article 1 |
| 3 | Option B: RFCD account — rules that matter | Checklist + facts list ($10k, FMJ, 30-day FMJ window, no remittance-in, currencies per bank) | M3 | Factual | — |
| 4 | RFCD vs travel quota — which fits you | Structured list (source of funds, cap behaviour, expiry, card use) | M1–M3 | Factual | — |
| 5 | Practical notes (RFCD is for brought-back cash only; keep FMJ/declaration papers; terms differ per bank) | Segmented practical section, no new facts | M3 | Practical | — |
| 6 | FAQ (4: freelance income into RFCD? — No. Open before travel? — funded only on return. Supplementary cards? — up to 2 per SIBL. Does RFCD remove POS limits too? — circular covers online; ask bank) | FAQ block | M2, M3 | Factual | — |
| — | References: P1 (Circ. 33), P3 (GFET Ch. 19), P2 (RFCD letter), P4 (EBL), P5 (SIBL) | References block | — | — | — |

## 5. Drops / fixes carried from the ledger

- "solves this problem permanently", "5-minute fix", "banks immediately lift the cap" — DROP.
- MCC code ranges (3000–3299 etc.) — DROP (uncited).
- "open within 30 days" error — FIX to FMJ-only window (M3).
- "earns interest, never expires" RFCD claims — bank-specific: state only what EBL/SIBL pages
  support (interest/profit per bank terms; balances freely transferable), no absolutes.
- Summary's "two permanent solutions" + invented declined-SMS scene — rewrite at S5.
- BN rebuilt from ledger at S4 (known numeric drift flagged in audit).

## 6. Recommendations (my judgement)

- **R1:** Keep the comparison as a structured list (same renderer constraint as article 1).
- **R2:** Recommend Option A/B by *situation*, not a winner: one-off big ticket → ask bank
  first; frequent traveller holding leftover cash → RFCD. No "game-changer" language.
- **R3:** Travelpayouts placement: none new here — this page's affiliateCTA and article 1's
  placement already cover flights/eSIM; adding another would duplicate. Revisit cluster-wide
  at the end of A1, not per page.
- **R4:** Title keeps "$300" (it's the searcher language + slug), body leads with the rule.

## Gate

✋ Owner approval = S3 EN draft. S1 facts are already approved (shared ledger M1–M3).

## S3–S5 execution record (16 Oct 2026)

- No recoverable local RFCD draft commit was present in this checkout, so EN and BN were rebuilt from
  approved ledger wordings M1–M3 and this brief. EN is 905 words; BN preserves the same six sections,
  decision rules, five citations, four FAQs, five internal destinations and number set.
- S5 package: H1/search title and summaries rewritten without the invented decline SMS or "permanent
  solution" promise; `updatedAt` set to `2026-10-16`; five article-specific references added (three
  Bangladesh Bank primary documents plus EBL and SIBL operator pages); EN/BN AEO snippets rewritten;
  target FAQ config added for the visible four-question sections.
- Existing Aviasales `affiliateCTA` retained with source-safe copy; no new body or partner placement was
  added. The public blog-map answer and contextual tooltip for this URL were corrected from "zero/no cap"
  framing to Bangladesh Bank's "online payment at actual" wording.

## S6 preflight and red-team record (16 Oct 2026)

- Source liveness rechecked: all five reference URLs opened; GFET Ch. 19 ¶17 supplies the USD 300 general
  online-purchase rule, ¶14/¶16 the separate visa/hotel provisions, and FE Circular Letter No. 05 the
  RFCD "at actual" wording. EBL and SIBL still publish the deposit/card terms used.
- Automated source preflight: **54/54 PASS** — slug/date, six-section EN/BN structure, number/decision
  parity, citations [1]–[5], four visible FAQs per locale, five references, five internal links and
  forbidden-claim scan. Absolutist scan found only sourced requirements or explicit negations/caveats.
- No `HowTo` node was added: this URL's dominant intent is comparative; its visible, schema-matched
  component is `FAQPage`. The Option A steps remain a readable checklist without recasting the whole page
  as a procedural HowTo.

| Dimension | Score / 4 | Evidence / reason | Remaining limitation |
|---|---:|---|---|
| Intent & coverage | 3 | Answers the $300 decline, documented-bank route, RFCD eligibility and situation-based choice without duplicating the endorsement guide | Fresh SERP/demand measurement was not part of this segment |
| Factual evidence | 4 | Every material rule maps to M1–M3; 3 primary BB documents + 2 bank operator pages; uncertainties and bank discretion are explicit | None |
| Usability & actionability | 3 | Quick answer, Option A checklist, RFCD facts, structured comparison, practical notes and 4 distinct FAQs | Renderer-supported structured list used instead of a semantic comparison table, per approved R1 |
| Locale, trust & release | 4 | EN/BN decision parity; matched references/links/FAQ schema; checked date and canonical slug retained | None |
| **Total** | **14/16** | **PASS** | No zero and no hard fail |

**Hard fails:** none. v2 centerpiece, component, fabricated-experience and QD checks all pass.

## S7 handoff record (16 Oct 2026)

- `npm run lint` PASS · `npm run build` PASS (94 EN + 94 BN canonical routes) ·
  `npm run verify:build` PASS — **all 162 checks**.
- Built EN/BN inspected: `en-BD` / `bn-BD`, self-canonical plus complete three-link hreflang clusters,
  `dateModified` 2026-10-16, four visible FAQs matching four-question `FAQPage` nodes, all five reference
  URLs, four sibling-blog links plus the tools route, and zero dropped hype/MCC/rate strings.
- S7 locale defect found and fixed: hydrated Bengali contextual, recommended-next and related-step anchors
  now call `getLocalizedRouteHref`, so their visible `href`s retain `/bn/` just like prerendered HTML.
- Search metadata now says "how documented travel approval works" rather than promising a cap clear;
  title/description are distinct in both locales. RSS changes only this item's title/description; sitemap
  changes only this slug's EN+BN `lastmod`.
- **Not deployed or merged.** PR review is the owner gate. Wave C remains next after this RFCD release;
  Airalo-Oman belongs in the existing eSIM article's turn, not a new URL.
