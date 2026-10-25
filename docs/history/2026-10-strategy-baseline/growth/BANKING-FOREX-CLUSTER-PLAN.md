> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: superseded Banking-first rollout. Dated query evidence, source decisions and URL ownership remain useful; "active cluster" and release-order instructions below are historical.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# Banking & Forex topic-cluster plan for Bangladesh travellers

**Prepared:** 19 October 2026

**Use with:** [`A1-CLAIMS-LEDGER.md`](../../../growth/A1-CLAIMS-LEDGER.md), [`CONTENT-OS.md`](../../../growth/CONTENT-OS.md),
[`CONTENT-QUEUE.md`](CONTENT-QUEUE.md), [`10-CONTENT-UPGRADE-STANDARD.md`](../../../growth/10-CONTENT-UPGRADE-STANDARD.md),
[`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md), and [`SEO-KEYWORD-MAP.md`](../../../../SEO-KEYWORD-MAP.md).

This is the active cluster plan for URAL's money-and-banking topic. It opens a second cluster alongside
[`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md). It does not supersede the site-wide gap inventory in
[`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) — it owns the release order, page ownership and per-node gates for
this cluster, exactly as the Umrah plan does for its own. Demand numbers below are **not measured**: the only
first-party query evidence this plan uses is a short Search Console query list supplied by the owner on 19 October 2026,
recorded in §1. No Bangladesh volume, difficulty, CTR or ranking claim appears anywhere in this document.

## 1. Cluster decision and page ownership

The money cluster already had five live articles that linked to each other inconsistently, and no hub. The problem was
not missing topics; it was that a reader landing on any one article could not see the shape of the whole decision. The
fix is one hub that owns the map and five existing nodes that own the detail — no new blog slugs.

**Owner-supplied GSC queries (19 October 2026, no volume data attached):**
`dollar endorsement limit in passport bangladesh`, `ডুয়েল কারেন্সি কার্ড` (dual-currency card), `for endorsement`, and
`noc`. These are treated as *query language to match*, not as demand evidence.

| Surface | Cluster role | Primary reader job / query hypothesis | Boundary |
|---|---|---|---|
| `/banking` and `/bn/banking` | **Hub — the map** | Understand the whole money picture for a trip: how much foreign exchange a passport can hold, why a card declines, what an RFCD account is, where NOC fits, and which node answers the rest. Matches the broad `for endorsement` and `noc` questions. | Owns the overview, the eight FAQ pairs and the routing. Does **not** repeat any node's step-by-step detail, and cites no figure the node does not also cite. |
| `/blog/dual-currency-card-endorsement-bangladesh` | **Endorsement node** | How passport dollar endorsement actually works at an Authorized Dealer bank: the USD 18,000 calendar-year ceiling, the USD 5,000 cash sub-limit, and the card-activation step that is separate from endorsement. Matches `dollar endorsement limit in passport bangladesh`. | Owns the endorsement mechanics and the two-step (endorse, then activate) explanation. Does not own the RFCD comparison or the cash-versus-card decision. |
| `/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix` | **Quota-limit node** | Why a single online purchase above USD 300 declines, what the bank can do about a documented travel payment, and where an RFCD account changes the rule. | Owns the USD 300 rule and the RFCD-vs-travel-quota comparison. Owns the EBL/SIBL RFCD deposit terms. |
| `/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah` | **Islamic-card node** | How a Shariah-compliant debit, prepaid or Ujrah charge card differs from a conventional interest-bearing card, framed as questions to ask each bank rather than a product ranking. Matches `ডুয়েল কারেন্সি কার্ড` for the Halal-travel reader. | Owns the Mudaraba/Al-Wadiah/Ujrah model explanation and the quota-is-product-neutral point. Names no bank product as "best" and publishes no inventable fee or profit rate. |
| `/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card` | **No-card booking node** | How to book flights, Makkah/Madinah or Asian hotels and transfers in BDT through a settlement desk when no endorsed card is ready, and what to keep for the airport immigration folder. Carries the `noc` intent into a practical checklist. | Owns the BDT-assisted booking workflow and the documents-to-carry list. Points NOC and GO rules at the Dhaka-airport checklist node rather than restating them. |
| `/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide` | **Cash-and-DCC node** | Whether to buy SAR in Dhaka or carry USD, and the terminal rule that governs Dynamic Currency Conversion. | Owns the choose-local-currency rule and the money-changer-fee point. Publishes **no** DCC percentage and no per-destination cash amount as a rule. |

Two adjacent surfaces deliberately stay outside this cluster's link mesh but remain reachable from it:
`/blog/dhaka-airport-outbound-immigration-checklist-noc-go` (departure paperwork) and `/umrah` (trip-cost planning).
They own their intents; the money nodes link to them, not the other way around.

## 2. The evidence base: A1 M1–M5

Every figure in this cluster traces to a row in [`A1-CLAIMS-LEDGER.md`](../../../growth/A1-CLAIMS-LEDGER.md), checked 16 October 2026 and
re-checked 19 October 2026 against primary Bangladesh Bank sources (P1–P6), two bank RFCD pages (P4–P5), and one
secondary wire item (S1). The five safe wordings are the ceiling on what any node in this cluster may assert:

- **M1 — travel entitlement.** Since 6 September 2026 (Bangladesh Bank FEPD-1 Circular No. 33) the ceiling is
  **USD 18,000 per calendar year** for an adult resident; minors under 12 remain at 50% (up to USD 9,000); at most
  **USD 5,000** may be released as US-dollar notes, the remainder non-cash. It is a **ceiling released against
  documents**, never an automatic allowance. Citation form everywhere is **FEPD-1 Circular No. 33 (6 September 2026)**.
- **M2 — the USD 300 online rule.** GFET Volume 1 Chapter 19 ¶17 caps a **single online purchase at USD 300** under the
  general online-payment paragraph. A larger *documented travel* payment may be processed by the bank, but approval is
  the bank's decision — the reader is told to ask **before** paying. Cards issued against an RFCD account are expressly
  allowed to pay online **at actual** (FE Circular Letter No. 05, 9 May 2024).
- **M3 — RFCD.** Deposits up to **USD 10,000** need no customs declaration; a larger FMJ-declared amount must be
  deposited **within 30 days of arrival**; an RFCD account **cannot** receive inward remittance or foreign income.
- **M4 — DCC.** No regulator or network publishes a fixed DCC markup. The rule is **choose the local currency**; the
  markup is whatever the terminal and network apply. No percentage is printed.
- **M5 — money-changer fee.** Bangladesh Bank **FEPD-2 Circular No. 01 (7 January 2026)** caps the licensed money-changer
  passport endorsement fee at **BDT 300 per passport**, irrespective of the amount, and requires the fee to be displayed
  and receipted. It is the money changer's fee, not a bank fee, and it caps the fee, not the purchase. **VERIFIED 19
  October 2026 against the primary circular** (P6); the BSS report (S1) stays on the hub as the news of record.

Two additions sit outside A1 but are used by single nodes: the Saudi Ministry of Hajj and Umrah FAQ (`haj.gov.sa/en/FAQ`)
on the no-card booking node for the Umrah-context sentence, and BSS (`bssnews.net/business/348822`) on the hub as the
secondary record of M5. Both are listed as references on the page that uses them.

## 3. Accuracy gates before promotion

The A1 ledger certifies the *shared* facts. It does not certify a product name, a bank's current fee, or a page's link
list. Before any node is promoted on the hub, refreshed, or re-excerpted:

1. **Drop uncited precision.** APR ranges, "saves X%", per-destination cash amounts, and DCC percentages must not
   reappear. Where a comparison was previously a product ranking (a "top five cards" list), it is now a set of questions
   to ask that bank, because no per-bank product page was opened for this cluster.
2. **Keep citations in the safe form.** `FE/PD-1` is wrong; use **FEPD-1**. State the ceiling as a ceiling.
3. **Re-check dynamic sources at release time.** Circular amounts, bank RFCD terms, and the money-changer fee cap can
   change. Sources were last re-checked **19 October 2026**: every URL in the ledger's source table was re-opened live
   (P1, P2, P3, P6 as `application/pdf`; P4, P5, S1 as live pages). FEPD-2 Circular No. 07 (17 October 2026) is on the
   watch list — see the ledger's M5 note.
4. **Do not treat the hub's FAQ as new evidence.** The eight FAQ pairs restate M1–M4 and the two node-owned points; they
   add no figure. A reader who trusts the hub is trusting the same sources the nodes cite.
5. **Bengali parity is a gate, not a nice-to-have.** `getLocalizedBlogs("bn")` gives Bengali `internalLinks` **no
   English fallback**, so a Bengali override without its own link array ships a Bengali page with no editorial links.
   Every node in this cluster carries its own Bengali link set and Bengali body parity at the same claim level.

## 4. Cluster map as it stands (19 October 2026)

These are facts about the current repository, not a completion claim; the queue row in
[`CONTENT-QUEUE.md`](CONTENT-QUEUE.md) is the dated record.

- The hub exists at `/banking` and `/bn/banking`, prerendered by `scripts/prerender.ts` with FAQPage JSON-LD, a
  BreadcrumbList, an xhtml:link hreflang pair, and an explicit `lastmod` of `2026-10-19T09:00:00+06:00`. Its content is
  authored once in `src/data/bankingHubData.ts`, which both the prerenderer and `BankingHubLandingPage.tsx` read, so the
  crawlable HTML and the React view cannot drift.
- The five nodes carry `updatedAt: "2026-10-19"`, a link to `/banking`, and 6–7 internal links per locale with at least
  two blog→blog links and one money/hub target, meeting the floor in
  [`10-CONTENT-UPGRADE-STANDARD.md`](../../../growth/10-CONTENT-UPGRADE-STANDARD.md) §3.
- Three nodes that had no `references` (the Islamic-card, no-card-booking and cash/DCC articles) now carry three
  primary or clearly-labelled sources each, ordered consistently with the endorsement node (FEPD-1 first, GFET Chapter 19
  second).
- The uncited product claims (named cards, APR/profit-rate ranges, DCC percentages, per-destination cash amounts) were
  removed or reframed as questions, per gate 1 above.
- A renderer defect surfaced while inspecting the pages: the English prerenderer emitted inline `**emphasis**` markers
  as literal asterisks into the crawlable HTML, while the Bengali renderer stripped them. The English path now strips
  them too, so 0 of 50 English blog pages carry literal markers. This is site-wide and is recorded in
  [`CONTENT-QUEUE.md`](CONTENT-QUEUE.md) under "Publication-system fix".

### 4b. Follow-ups from this pass — resolved 19 October 2026

The three defects below were reported in the 19 October hub pass and handed forward. All three were fixed the same day,
and `verify:build` now enforces two of them:

- **Bengali pages had no crawlable link back to their English twin.** Resolved: `scripts/prerender.ts` gained
  `addBengaliLinkSections`, which appends a "ইংরেজিতে পড়ুন — Read this page in English" section to every Bengali route
  and gives the Bengali homepage the 50-guide directory the English homepage keeps in `index.html`'s `<nav>`. Measured:
  `dist/bn/index.html` went from 20 to 71 crawlable hrefs (50 of them Bengali blog guides), and every Bengali page now
  links its English counterpart.
- **Strong emphasis parity.** Resolved: the English body renderer now emits `<strong>` instead of deleting `**`, so the
  crawlable HTML carries the same emphasis the React view renders. FAQ answers keep the markers stripped on both sides
  because they are mirrored into plain-text JSON-LD. The paragraph-survival check compares text with the emphasis tags
  removed exactly as the `**` marker was (`stripInlineEmphasisTags`).
- **The homepage FAQ answer and its FAQPage node disagreed.** Resolved: `src/data/homeFaqs.ts` is the single array behind
  the visible block, the static FAQPage node and the React render, and `index.html` now carries a `<!-- HOME_FAQ -->`
  marker the prerenderer fills. The React route renders the visible section too — it previously existed only in the
  static HTML and disappeared on hydration. `verify:build` asserts visible == schema == source.

A fourth guard was added because the content contract could not see this cluster's shape: `verify:build` now fails if
`dist/banking.html` or `dist/bn/banking.html` loses its FAQPage node, if the hub drops any of its five node links, if a
node stops linking `/banking`, or if `FE/PD-1` reappears in a cluster page. Each assertion has a negative control.

## 5. What this plan does **not** open

- **No new blog post.** Every node already exists at a stable slug; the cluster was completed by hardening and linking,
  not by adding pages. A genuinely new intent would need a separate evidenced proposal.
- **No new hub URL beyond `/banking`.** The hub is the one new route; it is not a rebuild of `/tools?tab=currency` (the
  calculator) or of `/umrah` (trip cost).
- **India and Schengen remain out of scope.** The Dhaka↔Kolkata land route is `CONTENT-STRATEGY-2026.md` §6 gap #1 and is
  explicitly **not** this cluster's work.
- **Per-bank product pages are out of scope.** Comparing specific named cards would require opening each bank's own
  product page and recording fees in a mini-ledger; until that exists, this cluster teaches the questions to ask.

## 6. Internal-link map

Plan links only to live destinations. All six routes in §1 are prerendered to `dist/`, so no link defers on publication.

- **Hub down:** `/banking` links each of the five nodes and the two cross-cluster surfaces, grouped by task (endorse and
  activate, pay above USD 300, Islamic cards, no-card booking, cash and DCC).
- **Node up:** every node links back to `/banking` with localized anchor text, and to the two or three sibling nodes that
  answer the immediate next question.
- **Node across:** the endorsement node and the Islamic-card node each point to the other; the quota-limit node points to
  both; the cash/DCC node points to the quota-limit node. The mesh is deliberate — any entry point reaches any other in
  two hops.
- **Cross-cluster:** the no-card booking node points to the Dhaka-airport checklist (`noc`/`go`) and to `/umrah`; the
  Islamic-card node points to `/umrah`. Anchors are descriptive in both locales, never "click here".

## 7. Measurement and the definition of a released node

For each node and for the hub, record: the EN and BN paths, the owner approval, the deploy date, the source-check date,
the live-route result, and any sitemap/RSS or `lastmod` change. Verify the live pages' HTTP response, `<html lang>`,
canonical, hreflang pair, title, H1, visible FAQ and its JSON-LD, cited-source links, and that every internal
destination resolves.

Use Search Console when access is available: page- and query-level impressions, clicks, CTR and query mix for Bangladesh
over a stated range, with index status and seasonality noted. The four queries in §1 are the ones the owner reported,
with no volume attached; do not infer demand from them. If data is unavailable or thin, record "not measured" and do not
claim that an edit caused a ranking change.

A node is ready to close only after the owner approves publication, the EN/BN routes pass live checks, planned links
resolve, and the queue row records the release and the measurement checkpoint. A green build is necessary and not
sufficient: `npm run verify:build` asserts the structural half of the contract (links resolve, no self/duplicate links,
schema present), not whether a claim is true.
