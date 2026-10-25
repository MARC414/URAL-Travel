> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: superseded fixed legal/money/visa execution sequence. The old approval and "next step" below apply only to that historical work.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# Wave A — Segmented Execution Plan (P0 legal/money/visa)

**Approved by owner:** 16 October 2026 · **Mode:** slow, segmented, re-audited. One article at a
time; owner approval between segments. No batch edits. Follows `CONTENT-OS.md` Stages 1–9 and
`CONTENT-SYSTEM-V2.md` (component briefs, QD verdicts, dual modality).

## Why segmented (mistake control)

The first-pass audit already produced one overstatement (see §4, item M1) that a slower
claim-level re-check corrected. Therefore every article passes **small, separately-approved
segments**, and any segment can send the article back. The auditor's own claims are treated as
UNVERIFIED until sourced — the same rule as article claims.

## Sub-waves (order fixed; articles may not leapfrog)

| Sub-wave | Articles | Why grouped |
|---|---|---|
| **A1 — Money cluster** | 1. `dual-currency-card-endorsement-bangladesh` 2. `rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix` 3. `shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah` 4. `cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide` | All four cite the same Bangladesh Bank quota/RFCD/DCC facts. Numbers must be reconciled **once** in a shared ledger, then reused — editing them separately guarantees contradictions. |
| **A2 — Government documents** | 5. `bangladesh-epassport-application-renewal-64-districts-fee-guide` 6. `dhaka-airport-outbound-immigration-checklist-noc-go` | Official fees/process; NOC/GO is practice-vs-law framing. |
| **A3 — Visas** | 7. `malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration` 8. `singapore-visa-guide-bangladesh-agents` | Embassy/immigration primary sources; highest traveller-harm risk if wrong. |

## Segments per article (stop-points ✋ = owner approval needed to continue)

| Seg | Work | Output | Gate |
|---|---|---|---|
| **S0 Re-audit** | Re-read EN+BN body, metadata, snippets, links; list every factual claim verbatim | Claim inventory (no fixes proposed yet) | — |
| **S1 Claims ledger** ✋ | Open primary source per claim (BB circular PDF, embassy, ICA, DIP…); classify VERIFIED / QUALIFIED / CONFLICT / UNVERIFIED / DROP | Ledger table in `CONTENT-QUEUE.md` (or wave file) with exact URLs + dates checked | Owner sees CONFLICT/UNVERIFIED items before any prose |
| **S2 v2 brief** ✋ | QD verdict, centerpiece, component table, modality plan, BN parity plan | Brief table (CONTENT-SYSTEM-V2 §3 format) | Owner approves scope |
| **S3 English draft** | Rewrite EN from ledger only; unverified lines removed/softened | Draft in repo file(s) | Internal only |
| **S4 Bengali parity** | Full-parity BN; reconcile every number to ledger | BN draft + parity checklist | Internal only |
| **S5 Package** | Title/summary/snippets/FAQ/references (tiered, claim-linked)/internal links; `updatedAt` | Metadata diff | Internal only |
| **S6 Red team** | Stage 7 preflight + Stage 8 scoring (≥13/16, no zero, no hard fail incl. v2 fails) | Score table + fix list | Fail → back to S3 |
| **S7 Handoff** ✋ | Implement, `lint/build/verify:build`, inspect `dist/` EN+BN, diff-scope check | Verification report | **Owner approves before any publish/schedule action (unchanged rule)** |

**Cross-article rule for A1:** S1 is done for all four money articles first (one shared
Bangladesh Bank ledger), then S2–S7 run per article in order. This is the one deliberate
exception to "one article at a time", because the facts are shared.

---

## 4. Re-audit of A1 money cluster — claim inventory (S0, completed 16 Oct 2026)

### Shared claims appearing in multiple articles (reconcile once)

| ID | Claim (as published) | Where | Re-audit status 16 Oct |
|---|---|---|---|
| M1 | Adult travel quota **USD 18,000/calendar year**, raised from $12,000 by **FE(PD)-1 Circular No. 33**; cash notes max **$5,000**; under-12 **$9,000** (50%) | dual-currency, rfcd, shariah (+ summary metadata in constants) | **Corroborated by secondary reporting** (The Report, Views Bangladesh, Banking Gurukul — all dated 6–8 Sep 2026, agreeing on circular no., date, $5k cash cap, 50% child rule). Audit v1's "may be conflated" was too sceptical. Still requires the **primary BB circular PDF** at S1 before republication. Note exact department naming to copy from the circular itself. |
| M2 | Banks impose a default **$300–$500 single-transaction e-commerce cap**; call bank to raise it for travel MCCs | dual-currency, rfcd | Plausible bank practice, **not a BB rule**. Articles mostly frame it as bank configuration — keep that framing, name it as "many banks' default", never as regulation. S1: check 1–2 named banks' published card terms if cited. |
| M3 | **RFCD:** deposit up to **$10,000** cash without declaration; above that with **FMJ** form; funds freely remittable; international debit card against balance | rfcd, dual-currency | Corroborated by bank pages (SIBL, Combank) + secondary explainers. **Correction needed:** article's "open within 30 days of arrival" — secondary sources say the 30-day window applies to depositing **> $10k (FMJ)** amounts; ≤ $10k may be deposited any time after return. Verify on a bank/BB page at S1. Also "no $300 cap on RFCD cards" is an inference — qualify or drop at S1. |
| M4 | **DCC markup 4.5–6.5%** (cash guide) / "lose 4–6%" (dual-currency) / "5% trap" (title claims) | cash, dual-currency | Directionally standard advice (choose local currency) but the % is **unsourced and inconsistent across articles**. S1: either find a citable source or rewrite as "a markup set by the merchant's bank, typically several percent" with no false precision. |
| M5 | Money-changer endorsement fee max **BDT 300**, display + receipt duty, "BB circular 7 Jan 2026" | dual-currency | Specific and checkable — S1 must open that circular or drop the date/figure. |

### Article-specific risk notes (S0)

- **dual-currency:** named bank products (EBL Aqua, City Amex, BRAC Tara…) and hotlines (16230/16234/16221) are perishable — S1 verifies or generalises. "Cards are automatically blocked without physical stamp" overstates: endorsement + FC part activation is the accurate mechanism.
- **rfcd:** MCC code ranges (3000–3299/4511, 3501–3999/7011) are plausible but uncited; "solves this problem permanently" is hype (v2 blacklist). RFCD cannot receive remittances/freelance income — article omits this limit; adding it is genuine information gain.
- **shariah:** religious-product claims (Mudaraba/Al-Wadiah/Ujrah structures, "zero interest ever") need each bank's own product page at S1; APR comparison "20–27%" uncited; lounge-access perks perishable. Do not let Shariah framing borrow the shared quota claim without the M1 ledger entry.
- **cash/DCC:** "buy SAR in Dhaka saves 2.5–3.5% vs double conversion" is arithmetic folklore — rewrite as spread explanation without invented %. Destination cash amounts (SAR 1,000–1,500 etc.) must be labelled planning suggestions, not rules. "Post-2017 $100 bills" type tips need dating or removal.

### Mistakes log (auditor's own, kept deliberately)

| # | Mistake | Caught how | System fix |
|---|---|---|---|
| 1 | Audit v1 implied the $18,000 quota "may be stale/conflated" | S0 re-check against dated Sep 2026 reporting | Auditor claims get UNVERIFIED status until sourced (this file, §1) |
| 2 | Sandbox curl `000` initially resembled mass link-rot | Recognised as network restriction; spot-checked via fetch instead | Liveness only via page fetch, per-URL, in S1 |
| 3 | NotebookLM (CXP) asserted "CXB handles no VoA" | Contradicted by CAAB AIP listing | External reviews are inputs, never authorities |

## 5. Next step awaiting approval

**A1-S1: shared Bangladesh Bank claims ledger** — open the primary BB circular(s) (travel quota
Circular 33/2026, RFCD chapter of FE regulations, money-changer fee circular), plus 2–3 bank
product pages, and return the M1–M5 ledger with exact wording for owner sign-off.
No article prose changes in S1.
