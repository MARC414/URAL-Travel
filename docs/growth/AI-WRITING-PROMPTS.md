# URAL AI Writing Prompts — Stage-by-Stage Production Pack

**Prepared:** 14 October 2026

**Use with:** [the master optimization guide](../../URAL-CONTENT-OPTIMIZATION-GUIDE.md), [strategy index](../../00-URAL-STRATEGY-INDEX.md), [current audit](../../00-URAL-CURRENT-AUDIT.md), [`CONTENT-OS.md`](CONTENT-OS.md), [article acceptance standard](10-CONTENT-UPGRADE-STANDARD.md), [method research](../02-content/METHOD-NOTES.md) and `AGENTS.md`.

**Authority reconciled 26 October 2026:** these are supporting prompts for explicitly authorized work.
The master optimization guide governs methodology conflicts. Former cluster plans and the queue remain
historical; the current social programme is a separate production register, not article-rewrite approval.

> **Reconstruction note:** this prompt pack is reconstructed because the prior session's file and commit were unavailable in this checkout. It follows the stage sequence and constraints provided in the task prompt and the current repository contract. It is not represented as a recovered or verbatim-upgraded prior draft.

---

## 0. Start here — context prompt

Paste this at the start of each content task, then add the task-specific brief:

```text
You are helping produce or refresh one explicitly authorized URAL Travel Intelligence content asset for Bangladeshi travelers. Before drafting, read the current owner task, URAL-CONTENT-OPTIMIZATION-GUIDE.md, 00-URAL-STRATEGY-INDEX.md, 00-URAL-CURRENT-AUDIT.md, AGENTS.md, docs/growth/CONTENT-OS.md, docs/growth/10-CONTENT-UPGRADE-STANDARD.md and relevant research under docs/02-content/. Old queue entries and cluster plans are historical, not authorization. Inspect the current English and Bengali page, metadata, AEO snippets, internal links, references, schema/rendering contract, and generated output where relevant.

Work stage by stage. Do not skip the claims ledger. Do not invent Bangladesh search volume, keyword difficulty, prices, availability, visa terms, official deadlines, distances, or legal consequences. Research primary sources; record each source URL and checked date. Escalate material conflicts before drafting. Do not create a competing URL when the decision is to update an existing URL. Keep English and Bengali at full decision-level parity. Cite material claims inline and in the source list. Treat SEO/AEO methods as editorial heuristics, not ranking guarantees.

End each stage with its required output and gate result. If a gate fails, stop and name the exact missing evidence or decision.
```

## 0.5 House voice and reader contract

```text
Write in URAL's house voice: calm, direct, locally informed, and candid about uncertainty. Speak to a traveler planning from Bangladesh; use BDT first where a verified price exists, name the passport and departure context, and link to the actual official source. Avoid agency-bashing, miracle savings, fake urgency, generic travel inspiration, and “insider secret” claims that have no evidence.

Lead with the reader's actual friction and answer the primary question without hype. Prefer short, factual sentences and practical choices. Explain who qualifies, what each option includes, what it does not include, and what can change. Put caveats beside the claim rather than hiding them in a disclaimer. Do not imply that URAL has personally booked, tested, interviewed, or measured something unless the repository contains evidence that it did.

Respect religious language and distinctions. Never conflate Hajj with Umrah, religious guidance with legal visa permission, or a visa with a permit. Where a rule is seasonal or conditional, say so. “DIY” means the traveler handles the itinerary and bookings; it does not mean every visa route is agent-free or that official service requirements disappear.

In Bengali, localize naturally for Bangladeshi readers. Preserve the same eligibility, prices, date basis, exclusions, warnings, route steps, source links, and FAQ answers as English. Do not shorten the Bengali page into a teaser.
```

## Method Rules — apply, do not recite

Use the sourced methods in [`METHOD-NOTES.md`](../02-content/METHOD-NOTES.md) as editorial tools, not algorithm promises:

- **Koray / query network:** map the connected questions, prerequisites, attributes, constraints, and follow-ups around one reader task. Keep a page's macro-context stable; use micro-contexts as supporting sub-questions under that task. Move a distinct task to a child page and connect it with a contextual internal link. Never stuff every related entity into one URL.
- **Contextual vectors and EAV:** make the subject, attribute, value, unit, date, condition, and source explicit where they matter. Order headings from the broad page job to narrower sub-intents. Use query/attribute maps to find omissions, not to assert that Google uses a secret checklist.
- **Answer extraction:** use a descriptive title/H1; put a direct, standalone answer near the top; use question-led or task-led headings; answer immediately under each heading; add a table or numbered sequence only when it improves a real comparison or action. Keep source, date, and qualifier attached to answerable facts. Koray's “heading vectors” language is a practitioner model, not a guarantee of a featured snippet.
- **Gotch / intent and teardown:** inspect current results for the target query and market, determine the dominant intent and format, compare relevant ranking pages at page level, and record what they cover, what they omit, their proof and weak spots, and what a Bangladeshi reader still needs. Treat competitor outlines as a gap inventory, not a copying template.
- **Gotch / upgrade first:** look at the existing asset, its query/page performance if available, links and age, and the cost of preserving its accumulated value. Improve, consolidate, redirect, or retire only with evidence and permission appropriate to the change. For the same intent on a chosen URL, upgrade that URL; do not publish a near-duplicate.
- **Information gain:** add a source-backed local constraint, first-party data, useful decision rule, or verified step a generic competitor cannot supply. If no original evidence exists, be transparent and do not invent a first-hand angle.
- **No proxy for success:** word count, content scores, “semantic terms,” schema, and an answer box do not prove quality or ranking. Use them only when they serve reader comprehension and the repository contract.
- **v2 visual semantics (see [`CONTENT-SYSTEM-V2.md`](../02-content/CONTENT-SYSTEM-V2.md)):** specify the centerpiece for the page's intent and a render component for every section in the brief; keep text as short as the verified ledger allows. Factual sections open definition→rule→attribute; practical/judgement sections are visually segmented, may use editorial first/second person, and must never fabricate experience, reviews, or community answers. Never write, structure, or schedule content to evade AI detection, spam filters, or platform rules — §9 of the v2 file lists rejected tactics that must be escalated to the owner, not implemented.

---

## Cluster rollout — map the hub and children before drafting

Use this prompt before Stage 1 when the assignment spans a topic cluster. It produces a roadmap only; it does not draft or publish the whole cluster.

```text
CLUSTER PLAN — ROADMAP ONLY

Only when the owner explicitly requests cluster planning, plan a phased URAL content cluster for: [topic / reader task / country or market]. The audience is [audience]. The owner wants [goal or constraint]. Read the current owner task, URAL-CONTENT-OPTIMIZATION-GUIDE.md, 00-URAL-STRATEGY-INDEX.md, 00-URAL-CURRENT-AUDIT.md, AGENTS.md, docs/growth/CONTENT-OS.md and the relevant supporting research in docs/02-content/. Inspect the existing site inventory, hub pages, child guides, English/Bengali twins, internal links, and correctly scoped Search Console data. Do not resume an archived plan or expand the authorized page set unasked.

Do not start by assuming a new hub is needed. First identify the best existing hub for the broad reader task. Recommend updating that URL in place when it already serves the intent. Propose a new URL only when the existing inventory shows a distinct, non-cannibalizing reader task and the owner approves it.

Use Koray-informed query/context and entity-attribute mapping to identify the cluster boundary, major sub-tasks, prerequisites, and relevant follow-up questions. Use Gotch-informed intent and page-level competitor review to identify gaps and decide which existing pages deserve an update first. These are planning heuristics, not ranking guarantees. Inspect current market/language SERPs and GSC if available; otherwise label intent, demand, and format observations “not measured.” Do not invent search volume, difficulty, traffic, conversion, or priority scores.

Return a cluster map with one row per candidate URL and these fields:
- role: hub or supporting guide;
- existing URL and locale twin, or “proposed—owner approval required”;
- action: keep, update in place, create, consolidate, or defer;
- one reader job and primary query/query family, with its evidence source;
- intent/format hypothesis and the date/market observed, or “not measured”;
- page boundary: what belongs here and what belongs on a sibling page;
- official/primary source owners needed, evidence gaps, and seasonal/high-risk claims;
- useful incoming/outgoing internal links, distinguishing currently live URLs from planned ones;
- language parity, dependencies, priority tier with evidence-based reason, and release gate.

Then propose a staged release sequence:
1. Wave 0: inventory, query/SERP/GSC review where available, source map, URL/cannibalization decision, and owner approval of the cluster plan.
2. Wave 1: audit and update the chosen hub first, or confirm it is already fit. Do not create a duplicate hub. Take only this one article asset—including its English and Bengali locale routes—through Stages 1–9 and the owner-controlled publish check.
3. Wave 2: take the single highest-priority supporting article, including its locale twin, through the same gates and publish only after its own review/build check.
4. Later waves: one article asset (EN/BN route pair) per release by default. The owner sets the cadence. Do not draft, implement, or publish all the cluster children in one batch.
5. After each release: verify the live EN/BN routes and metadata; link the new child from the hub and add reciprocal/contextual links only where useful. Never emit links to unpublished or nonexistent URLs. Record the release date and a measurement checkpoint.
6. After the planned cluster is live: review its combined query/page performance and coverage, then add or revise pages only for evidence-backed gaps. Backlink outreach may be planned separately and deferred; it is not a reason to invent thin pages.

Do not write any full article in this planning pass. Do not deploy or auto-publish. End by naming the first release ticket and asking for owner approval to start it. If the inventory, URL decision, evidence, or owner constraints are incomplete, list those blockers and stop.
```

### Cluster plan gate

The owner approves the hub, page boundaries, URLs/actions, internal-link plan, priority order, and release cadence before article drafting starts. A cluster map is a roadmap—not permission to publish every row. For each approved URL, use Stages 1–9 below independently, then follow the publish-and-measure process after Stage 9.

---

## Stage 1 — Decide, inspect, and queue

### Prompt

```text
STAGE 1 — SELECTION AND QUEUE

Inspect the site inventory, SEO-KEYWORD-MAP.md, current audit and owner-approved scope, the target URL, locale twin, existing cluster, and internal links. If the authorized request spans multiple pages, use the “Cluster rollout” prompt above and obtain the owner's map/order decision. Only the approved release wave proceeds to drafting. Identify this page's primary job and likely query. Decide whether this is a new URL, update in place, consolidation, or no-op. Use the owner-provided decision if one exists; do not reopen a fixed decision without a material safety/source conflict.

Record the task row in the current owner-approved task/PR context before research or drafting; do not append to the historical CONTENT-QUEUE.md. Include: checked date, exact canonical URL(s), action/verdict, primary query and where it came from, audience, intent hypothesis, the one-sentence page job, must-preserve constraints, connected pages, current publish/update dates, and next gate.

Do not invent or estimate Bangladesh search volume or difficulty. If SERP/GSC/keyword-tool data is not accessible, say “not measured.” Treat SERP format as a hypothesis until a dated live SERP review is recorded.
```

### Required output

- A queue row with the URL and locale twin, explicit verdict, primary query, owner constraints, and gate status.
- A short cannibalization check: similar URLs, how this page differs, and planned links.

### Gate

No primary query, no existing-page inspection, no recorded verdict, or unresolved owner decision → stop before Stage 2.

---

## Stage 2 — Build the claims ledger (hard gate)

### Prompt

```text
STAGE 2 — CLAIMS LEDGER

Before prose, split the proposed article into individual factual claims: dates, amounts, eligibility, visa validity, legal rules, required steps, transport fares/timing/baggage, hotel distance/price, app permit availability, comparative claims, and savings. Find the responsible primary source for each one. Open the source and record exact wording, URL, checked date, effective period, audience/passport/route/party applicability, and any conflicting official page.

Classify each claim VERIFIED, QUALIFIED, CONFLICT, UNVERIFIED, or DROP. Add safe publishable wording and the section that will use it. If a claim cannot be verified, do not guess: remove the precision, describe the route to checking it, or leave it out. Do not treat search-result snippets as the final source when the primary page can be opened. Do not treat a provider marketing claim as a universal guarantee.

Compare the ledger with the live page. Preserve owner-mandated values unless an owner-decision conflict is found; do not silently change an existing cost basis. If a required item conflicts with a current primary source, pause and show the owner the exact wording on both sides before drafting.
```

### Ledger template

| ID | Proposed claim | Claim type / locale | Primary source + exact URL | Checked / effective date | Applies to | Status | Safe wording / action |
|---|---|---|---|---|---|---|---|
| C-01 |  |  |  |  |  |  |  |

### Gate

No draft until all core legal, safety, eligibility, and cost claims are verified or explicitly qualified; all `CONFLICT` items are resolved by source or owner; and no unsupported precision remains.

---

## Stage 3 — Write the editorial brief

### Prompt

```text
STAGE 3 — BRIEF

Using the Stage 1 decision and Stage 2 ledger, create a one-page brief. State: the reader and moment of need; primary query; intent and requested outcome; dominant page format seen in a dated local SERP review (or “not checked”); macro-context and page boundary; query network of prerequisites, attributes, sub-questions and follow-ups; micro-context sections that stay within this task; facts/proof that make the page specifically useful to a Bangladeshi reader; must-include/must-not-claim items; one cost model if applicable; source map; existing pages to link to and from; and a short section outline.

Inspect competing pages by relevance, not just domain name. Make a gap table with (a) expected/table-stakes coverage, (b) what a useful competing page answers, (c) the unanswered Bangladesh-specific question, and (d) URAL's evidence-backed contribution. Do not copy a competitor's headings. Separate this intent from `/umrah`, visa, hotel, train, Hajj, or child-guide intents; link to them rather than duplicating their full answer.

Apply the master guide's reconciled use of CONTENT-SYSTEM-V2.md: record a QD-Page / QD-Heading / QD-Section / QD-Link verdict for each candidate query, select the first useful block, and specify each section's supported format, ledger IDs, qualifications and internal link. A component's existence elsewhere does not prove the article renderer supports it; use a supported fallback or record a scoped development dependency.

Do not add sections simply to make the page longer. Each section must complete a step, answer a related sub-question, support a decision, or establish a necessary boundary.
```

### Required output

- Primary task, query, intent/format evidence (or a marked hypothesis), page boundary, query-network map, differentiated outline, evidence map, and internal-link plan.

### Gate

If the outline serves multiple competing page jobs or the same intent as another URL without a clear consolidation plan, revise the brief before drafting.

---

## Stage 4 — Draft the English page

### Prompt

```text
STAGE 4 — ENGLISH DRAFT

Draft the complete English page from the approved brief and verified ledger only. Preserve the approved URL and the owner's must-preserve items. Open with a human but restrained hook that names the actual decision or friction. Put a direct answer to the primary query in the first screen; follow it with a concise trip/eligibility summary only where the facts support it.

Use a clear H1 and a contextual H2/H3 hierarchy. The first sentence under a question heading should answer that question, qualify the answer, and be understandable if extracted without surrounding paragraphs. Make each step actionable: the reader knows what to do, where, when, and what to verify. Cite primary sources next to the changing legal or price claim and repeat them in the reference list.

For comparisons, use one apples-to-apples comparison only. For a trip-cost page, use one cost table and identify trip length, party size, room-sharing, checked date, included/excluded items, and what is a variable quote. Never state guaranteed savings unless a matched and sourced calculation proves them. Do not insert named hotels, precise walking distances, fares, fees, timings, or complimentary benefits without the corresponding evidence.

Keep the length proportionate to the task. Do not add generic filler, claims about URAL's experience that are not documented, or blanket statements that remove real-world conditions.
```

### Required output

- Complete English draft with source links; a countable answer near the top; one coherent comparison/cost model where applicable.

### Gate

Every factual sentence maps to the ledger; no hard-fail conflict or unsupported precision; same URL and page job remain intact.

---

## Stage 5 — Localize into Bengali at full parity

### Prompt

```text
STAGE 5 — BENGALI LOCALIZATION

Localize the approved English draft for Bengali-speaking Bangladeshi travelers. Do not translate word-for-word and do not summarize. Preserve every material answer, route, eligibility condition, risk, date, figure, cost basis, inclusion/exclusion, caveat, source URL, internal-link destination, and FAQ. Use fluent Bengali with familiar local terms and keep official product or portal names recognizable. Explain an English term the first time it is needed rather than assuming all readers know it.

Compare English and Bengali section by section. Build a parity checklist that flags any content present in one version but absent or materially weakened in the other. Use the correct `/bn/` locale link for the twin and keep sibling links local where the equivalent page exists. The Bengali version must answer the same primary query and support the same reader decisions.
```

### Required output

- Bengali title, summary, complete body, internal-link anchors, translated reference labels, CTA copy as appropriate, and a section-by-section parity check.

### Gate

Any omitted qualification, different numerical range, collapsed section, broken locale link, or substantially thinner answer → revise before Stage 6.

---

## Stage 6 — Metadata, AEO, FAQ, references, and links

### Prompt

```text
STAGE 6 — PUBLICATION PACKAGE

Prepare an honest title/H1, search title if separate, meta description/summary, category, author, read time, updated date, image alt/caption if applicable, and English/Bengali AEO snippets that answer the same primary query in roughly 40–60 words. The snippet must be self-contained and must not introduce a number or claim absent from the body and claims ledger.

Write 3–6 genuinely useful FAQs only if they answer distinct remaining questions. Phrase each question as a real reader query; answer it directly in the first sentence; include conditions and a source where needed. Check the existing FAQ/schema corpus before adding questions; do not duplicate another page's FAQ answer simply to make this page longer. Structured data must match visible, source-backed content. Do not promise FAQ rich results or AI citations.

Build the article-specific reference list from sources actually cited in the draft. Prefer government portals, the carrier/operator responsible for a service, and primary booking/terms pages. Use accurate English/Bengali source labels, exact URLs, and dates in the visible prose/ledger where needed. Check every internal link against the current route inventory and choose anchors that describe the destination.

Confirm the existing page's canonical slug, reciprocal English/Bengali route, author/schema identity, required `BLOG_DATA` fields, and article category before handoff. Do not create a reference list of sources that were not opened or used.
```

### Required output

- EN/BN title and summary, EN/BN AEO snippets, FAQ set, reference list, internal-link list, and metadata-diff summary.

### Gate

Metadata overpromises the body, snippet disagrees with body, FAQ duplicates another page, a source is dead/mismatched, or a locale URL is wrong → fix before Stage 7.

---

## Stage 7 — Editorial and implementation preflight

### Prompt

```text
STAGE 7 — PREFLIGHT

Run a fact consistency pass against the ledger; reconcile all amounts and sums; verify that a comparison does not contain a second cost table; search both language versions for absolute words (“always,” “never,” “all,” “guaranteed,” “free,” “mandatory”) and ensure each is justified; and verify that dates refer to the correct season or travel window.

Check title, H1, answer, body, summary, AEO snippets, FAQ, reference list, schema, cross-language parity, and internal links against one another. Confirm the same approved slug remains in English and Bengali. Confirm each FAQ is visible and page-specific. Verify no unrelated post is included in scope.

Produce a preflight checklist with PASS/FAIL and a minimal fix list. Do not call the item ready if a factual or parity check fails.
```

### Gate

All factual, link, cost arithmetic, locale, and scope checks pass before red-team scoring.

---

## Stage 8 — Red-team audit (0–16)

### Prompt

```text
STAGE 8 — RED TEAM

Audit the final English and Bengali content as a skeptical Bangladeshi traveler, a source editor, a legal/visa fact checker, and a build-contract reviewer. Score four dimensions from 0 to 4 and quote specific evidence from the page for each score:

1. Intent satisfaction and query-network coverage.
2. Factual integrity, source quality, checked dates, and treatment of uncertainty.
3. Usability, answer extraction, practical steps, cost arithmetic, and no misleading comparison.
4. Bengali parity, trust, links/references, and repository/publishing readiness.

Total the score out of 16. A score of 13 or more is required, with no dimension at 0 and no hard fail. Hard fails include: materially wrong legal/visa/permit claim; unsupported or fabricated price, penalty, or “saving”; conflicting trip totals; missed must-preserve item; incorrect slug/canonical/locale pairing; English/Bengali material mismatch; fabricated first-hand experience; broken official citation; or any claim that could lead a traveler to violate Hajj/visa/entry rules.

List each hard fail separately. Give the smallest concrete fix for each weakness and re-score after fixes. If the audit cannot verify an item, score it as a gap; do not pass it on the assumption that a reader will double-check.
```

### Required output

| Dimension | Score / 4 | Evidence / reason | Fix |
|---|---:|---|---|
| Intent & coverage |  |  |  |
| Factual evidence |  |  |  |
| Usability & actionability |  |  |  |
| Locale, trust & release |  |  |  |
| **Total** | **/16** |  |  |

**Decision:** `PASS` only at ≥13/16, no zero, and no hard fail. A hard fail blocks release regardless of score.

---

## Stage 9 — Repository handoff and build proof

### Prompt

```text
STAGE 9 — REPOSITORY HANDOFF

Implement only the approved content and code changes for this post. Update the existing BLOG_DATA entry in src/constants.ts (including `updatedAt` and article references as needed), the English BLOG_BODY entry in src/data/blogContent.ts, the mandatory BENGALI_BLOG_OVERRIDES entry in src/data/bengaliContent.ts, and both target-slug AEO snippets in src/App.tsx. Bump src/data/contentMeta.ts only when appropriate under its documented date contract. Keep the slug unchanged. Regenerate public/sitemap.xml and public/rss.xml through the build; inspect their diff for target-only changes.

Run `npm run lint`, `npm run build`, and `npm run verify:build`. Read each complete result, record exit code and verifier check count, then inspect the generated EN and /bn/ HTML to confirm title, canonical, hreflang, language, dateModified, main body, FAQs, references, and links. Search built files for the critical preserved claims. Confirm there are no content changes to other posts and no unrelated sitemap/RSS changes. Report the diff summary, exact validation results, and remaining unverified claims.
```

### Repository checklist

- [ ] `src/constants.ts`: current post metadata, `updatedAt`, references, internal links.
- [ ] `src/data/blogContent.ts`: English body.
- [ ] `src/data/bengaliContent.ts`: mandatory, full-parity Bengali override.
- [ ] `src/App.tsx`: English and Bengali answer snippets.
- [ ] `src/data/contentMeta.ts`: update only when the committed date must change.
- [ ] `public/sitemap.xml` and `public/rss.xml`: generated and diff-limited to this update.
- [ ] `npm run lint` green.
- [ ] `npm run build` green; inspect `dist/` EN and Bengali routes.
- [ ] `npm run verify:build` green; report check count.
- [ ] No other post body/metadata changed.

---

## After Stage 9 — Owner-controlled publishing and measurement

Stage 9 proves the repository build; it does **not** deploy the site. Run this step only for the current approved release wave.

### Prompt

```text
PUBLISH ONE RELEASE WAVE — NO BATCH PUBLISHING

Use the approved cluster roadmap and the Stage 9 handoff for the current article asset only. Do not publish every planned hub/child page together. Default to one article per release wave, publishing its English and Bengali locale routes together; the owner sets the cadence and explicitly approves each live release. Do not deploy, submit URLs, or publish through an external service unless the owner has authorized that action.

Before release, confirm the exact English URL and Bengali twin, approved copy, source links, internal links to already-live pages, canonical/hreflang, visible FAQs/schema, review date, noindex status, and the target-only sitemap/RSS output. Do not link to planned pages until they are live. If this is the hub wave, publish or update the hub first; a supporting page is a later wave. If the hub already meets the brief, leave it unchanged and document that decision.

After owner approval and deployment, open both live locale routes and verify that they load, canonical/hreflang and language are correct, official source links work, internal links resolve, and no draft marker or stale copy remains. Confirm the sitemap and RSS carry only the expected release changes. Record the deployment date, URLs, verification result, and any rollback issue in the queue. Do not say “indexed” until Search Console confirms it.

Set a dated measurement checkpoint using the page's GSC query/page data when available. Compare a stated period and market, note seasonality and low data volume, and report impressions, clicks, CTR, and query changes without claiming causation from one change. If GSC is unavailable, record “not measured” and name the access blocker. Ranking movement is not a gate for the next scheduled release: after this URL is live and verified, proceed to the next approved wave on the owner's cadence. Do not begin backlink outreach unless it is separately approved; backlink work is not required to complete this content release.
```

### Release record

| Wave | URL(s) published | Owner approval | Deploy date | Live EN/BN and SEO checks | Sitemap/RSS scope | GSC checkpoint / result | Next wave |
|---|---|---|---|---|---|---|---|
| 1 — hub |  |  |  |  |  |  |  |

### Gate

Do not mark a wave published until the owner has approved the release and both live locale routes pass the post-deploy checks. Do not bundle future cluster pages into the wave. Schedule the next page only after the current wave is verified; do not require a ranking gain before continuing.
