# Method Notes — Koray Gübür + Nathan Gotch, adapted for URAL

**Research checked:** 14 October 2026

**Scope:** primary-source material from Koray Tuğberk Gübür / Holistic SEO & Digital, Nathan Gotch / Gotch SEO, and Rankability (Nathan Gotch's company).
**Purpose:** turn the source material into editorial actions for URAL without treating practitioner terminology, tool scores, or case-study outcomes as Google guarantees.

> **Reconstruction note:** the previous session's `METHOD-NOTES.md` and its referenced commit were not available in this checkout. This is a new, sourced research note, not a recovered version. The high-level strategy remains in [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md); this file does not replace or rewrite that plan.

---

## 1. Executive method: connect the query network to a page-level job

The most useful shared idea is not “add more keywords.” It is to define what a page must help a reader accomplish, inspect the related question space, compare what relevant pages currently answer, then make a better and better-supported page on the right URL.

For URAL, apply it in this order:

1. **Choose the page's macro-context.** State its one primary task, audience, market, and decision. Example: “A Bangladeshi passport holder planning a self-managed Umrah trip needs a lawful route, a practical order of operations, and a cost basis they can audit.”
2. **Map its query network.** List prerequisites, entity attributes, constrained variants, operational steps, likely follow-up questions, and the answer format each needs. Derive these from the actual page, current SERP, GSC/query data when available, official sources, and real customer questions—not guessed Bangladesh search volume.
3. **Separate macro from micro context.** Keep the page centered on the primary task. Add micro-contexts only when they help complete that same task. A separate intent gets a sibling URL and a contextual link, not an oversized section that competes with the sibling.
4. **Teardown relevant results at page level.** Record intent, format, coverage, evidence, omissions, and remaining reader questions. Competitor headings are an inventory of possible coverage, never a draft to copy.
5. **Add an evidence-backed delta.** Supply the local condition, practical step, source, decision rule, or first-party data that the competing page does not provide. If the evidence is unavailable, label the gap rather than filling it with confident prose.
6. **Upgrade the existing asset when the intent is already owned.** Preserve its URL and accumulated links, answer the same main task more fully, correct dated claims, and then measure again when Search Console data is available.

This is a URAL production method informed by the linked authors. It is not a claim that either author's framework is a documented Google ranking factor.

---

## 2. Koray Tuğberk Gübür: actionable rules

### 2.1 Query network: build question families, not a keyword pile

Gübür's source material treats a semantic content network as coordinated pages/briefs that cover related query templates and contexts. His 2024 “Query Gap Analyzer” describes finding important context signifiers in a query network, comparing competitor strength, and using query-length distribution as a way to reason about query breadth. His 2025 discussion of AI search describes connected macro- and micro-contexts and multiple passages/briefs aligned around related attributes.

**URAL implementation:**

- Start with the person's job and the central entity; do not begin with a list of synonyms.
- For each candidate query, record: the entity, the attribute or relationship being asked about, the action/query template (`what`, `how`, `which`, `cost`, `compare`, `can I`), the user intent, qualifiers (passport, origin, season, family/age, date), the expected answer type, the official source needed, and the likely next question.
- Cluster questions that share the same decision and answer format. Give each cluster a clear parent page and use child pages for meaningfully different tasks.
- Include short and long query formulations when they reveal different constraints; query length is a prompt to inspect breadth, not evidence of Bangladesh demand or a reason to write more copy.
- Use GSC queries or a dated SERP review if available. Mark data access and market context. If unavailable, say “not measured”; do not invent volume, difficulty, conversion rates, or a “best” keyword.

### 2.2 Contextual vectors: make subject, relation, and qualification explicit

In Gübür's writing, a contextual vector is a way of thinking about the vocabulary, entities, attributes, and connected contexts that identify the subject. His lexical-semantics article argues that nearby words and their relationships help establish a document's main and micro-contexts. His EAV article gives a concrete content-planning structure: entity, attribute, value, with attribute prioritization and accurate values.

**URAL implementation:** build an editorial EAV map for any factual, procedural page:

| Entity | Attribute / relation | Value or answer | Qualifier / unit / date | Source | Section / link |
|---|---|---|---|---|---|
| Saudi Umrah visa | permitted stay | 90 days if confirmed for this route | visa type and season | current Ministry page | visa route section |
| Haramain train ticket | baggage allowance | current operator rule | kg + dimensions + checked date | official HHR rule | rail step |

This is a fact-organization tool, not a request to mention every entity. Prioritize the attributes that decide the reader's task; leave irrelevant attributes out. Put a value's unit, eligibility condition, effective period, and source close enough that neither a human nor an extractor has to infer them.

### 2.3 Macro-context vs. micro-context

Gübür describes a page's macro-context as its main purpose and micro-contexts as related narrower contexts. His topical-map writing also discusses adjacent contexts and “contextual bridges” to connect related topics while retaining the navigation reason.

**URAL implementation:**

- The H1 and opening answer establish the page's macro-context: who, what task, and which market.
- H2s represent distinct supporting sub-intents or steps within that same job.
- H3s contain qualifiers, cases, and steps that belong under that parent question.
- A section that changes the reader's job, decision, or dominant format is usually a separate cluster node. Keep only the minimum boundary explanation on the parent and link to the specialist article.
- A contextual internal link should explain why the next page is useful; an anchor such as “Haramain train booking and current fares” is more informative than “click here.”

**Example for religious travel:** on a DIY-Umrah execution article, visa choices, booking and preparation order, Nusuk permits, Makkah/Madinah transfer, and a single scoped budget can be supporting micro-contexts. Fard Hajj registration and sanctions are a legal boundary that deserves a precise short distinction and a link to the Hajj-specific guide; a full package/camp tutorial is a separate macro-context.

### 2.4 Page structure for answer retrieval and extraction

Gübür's “Heading Vectors” discussion describes a hierarchy of headings and candidate answer passages under a contextual parent. His topical-authority article explicitly relates that terminology to a Google patent; it remains his interpretation and should not be represented as a Google-endorsed editorial rule.

**Practical URAL structure:**

1. Write one descriptive H1 for the page's macro job.
2. Answer the primary query near the top in a self-contained paragraph. Name the subject and relevant condition instead of starting with “it,” “they,” or an unexplained acronym.
3. Use H2s for major questions, decisions, or ordered steps. The reader should understand the section even when scanning the table of contents.
4. Start a question-led section with the direct answer, then explain exceptions, rationale, and next action.
5. Use a list for sequential actions, a table for genuinely comparable choices/amounts, and prose for nuance. Don't force every fact into a table.
6. Put a source, checked date, unit, scope, and condition beside time-sensitive answers. Use the visible body and structured data consistently.
7. Keep FAQ questions unique to this URL's task; don't copy the cluster's answers into every child page.

This structure serves people, conventional retrieval, and answer extraction. It does not guarantee a featured snippet, AI citation, or ranking.

### 2.5 Source context, adjacent topics, and site-wide consistency

Gübür's work on topical maps and “3 Suggestions about Topical Authority” discusses source context, topic-aligned site language, contextual bridges, and avoiding traffic detached from the business/source purpose. For URAL, that supports using the existing editorial center—outbound trip planning from Bangladesh—rather than importing generic destination copy.

**Practical use:** keep the Bangladesh-passport and outbound-planning context clear in the page and its relevant navigation/links. A bridge to forex, airport departure, or hotel booking should exist because the reader genuinely needs that next page. Do not add them as semantic decoration or repeat their whole answer locally.

---

## 3. Nathan Gotch: actionable research, teardown, and upgrade rules

### 3.1 Select for relevance and intent before optimizing terms

In “How to Create SEO Content That Ranks,” Gotch describes a workflow spanning keyword selection/qualification, competition, search-intent strategy, content strategy, creation, optimization, and publishing. His page emphasizes that volume is not equivalent to value and recommends inspecting the actual results for a target query to determine whether the winning format is informational or commercial.

**URAL implementation:**

- Define the desired reader outcome first; use the target query as a shorthand for a task, not as the whole brief.
- Search the target query in the intended market and language, record date/device/location where practical, and classify what the result page actually serves: guide, comparison, booking product, official portal, local provider, video, or another format.
- Match the page's intent and format to that result evidence and URAL's useful role. Do not force a long-form blog post on a query whose primary answer is a live booking service or official application portal.
- Choose a target based on fit, value, and a realistic ability to help. Use real Search Console or approved keyword-tool data when available; never claim a data point from memory.

### 3.2 Competitor gap and page-level teardown

Gotch's 2025 competitor-analysis guide distinguishes broader competitive research from page-level comparison and specifically says to identify where the page is less relevant, then upgrade existing assets by closing relevant gaps. The examples use content optimization tools, but the editorial action does not require buying or copying a tool's score.

**A repeatable manual teardown:**

| Lens | Questions to record |
|---|---|
| Intent and format | What task does this result satisfy? What page type and answer format dominates? |
| Coverage | Which sub-questions, steps, entities, attributes, and constraints are addressed? What is conspicuously missing? |
| Evidence and authority | Are rules linked to the responsible source? Is the date, author, method, or original proof visible? |
| Differentiation | What genuinely useful, sourceable detail can URAL add for Bangladeshi passport holders and departures? |
| UX and extraction | Can the reader find the answer and next action quickly? Are headings, lists, tables, mobile reading, and links clear? |
| Outcome | What does the reader still need to know or do after reading? Is this page meant to inform, compare, or convert? |

Classify gaps as **required for task completion**, **useful but optional**, **already covered elsewhere**, or **not justified**. This avoids copying the fullest competitor page wholesale and protects the topical boundary between URAL's pillar and child pages.

### 3.3 Content audit and disposition

In the “High-Impact vs. Low-Impact SEO Actions” episode, Gotch recommends auditing pages for outdated, thin, duplicate, or poor content and deciding—based on existing data—whether to improve, redirect, or delete. He notes that a page with meaningful linking root domains can justify improvement even when the content is weak. His current consulting material likewise describes beginning many engagements with high-value existing pages before net-new production.

**URAL implementation for each candidate URL:**

1. Check current title, intent, body, dates, indexability, internal links, citations, and related pages.
2. Pull Search Console/analytics data if authorized; separate impressions, clicks, CTR, positions, and conversion outcomes. Record the period and do not infer causation from a short change.
3. Inspect existing backlinks/link equity and internal role where data is available.
4. Diagnose stale facts, intent mismatch, cannibalization, missing local evidence, weak differentiation, poor extraction, and conversion friction.
5. Choose a disposition deliberately: **improve in place** when URL and intent remain right; **consolidate/redirect** when duplicate or obsolete pages serve the same job; **retire** only when evidence and owner permissions support it. Do not delete simply because a page is underperforming.
6. After an in-place upgrade, preserve the URL, correct the material gaps, keep useful links, update the checked date, and record what changed. Measure after recrawl with a comparison period appropriate to the query/season.

### 3.4 Content upgrades: fix the actual gap, then remeasure

Use a content-upgrade pass in this order:

- confirm that the intended page appears for the intended query and that a different URAL URL is not competing for the same task;
- re-check today's intent and page format;
- compare a small set of genuinely relevant ranking pages and note missing subtopics/questions, weak or stale evidence, poor structure, and unaddressed user needs;
- use GSC query/page data to surface real low-hanging variants or mismatches when accessible;
- update facts and original evidence before polishing related terms;
- add only gap-closing sections, better steps, useful comparisons, proof, contextual links, and extraction-friendly answers;
- remove stale/duplicated claims and align title, summary, snippet, FAQ, references, and schema;
- record the new date, publish, verify the built page, and monitor later.

The “upgrade existing assets” recommendation is a prioritization principle, not proof that every update will lift rankings. No page-level optimization tool, content grade, word-count target, or competitor count is a substitute for judgment and source verification.

### 3.5 Authority and originality

Gotch's work treats link/competitive context and content relevance as separate diagnostic lenses; his contemporary material also warns against generic mass AI content and stresses differentiation, evidence, and human review. For URAL, authority should be demonstrated through usable Bangladesh-specific details, attributed expertise, primary citations, transparent data basis, and a coherent internal cluster—not through unsupported claims of being “the best” or a made-up saving.

---

## 4. How the methods combine in URAL's workflow

| Pipeline stage | Koray-informed action | Gotch-informed action | URAL-specific control |
|---|---|---|---|
| Stage 1 — queue | Check topic map, query family, source context, and page boundary | Confirm current asset and intent; consider update vs. new | Record fixed owner verdict and primary query; no invented BD volume/KD |
| Stage 2 — evidence | Build entity–attribute–value and context map | Check page-level evidence gaps and competitor claims | Primary-source claims ledger with checked dates; stop on conflicts |
| Stage 3 — brief | Macro/micro hierarchy, query network, contextual links | SERP intent/format teardown; must-cover vs. gap | One page job; section-level source map and link plan |
| Stage 4 — English | Explicit entities, attributes, relationships, and context | Intent-satisfying, differentiated, scannable draft | First-screen answer; sourced BDT/passport reality; no false precision |
| Stage 5 — Bengali | Preserve entity/attribute and cross-language context | Preserve the same user task and usefulness | Full parity check, not a summary translation |
| Stage 6 — package | Answer-ready hierarchy, topic-consistent links | Honest title/intent, FAQ and helpful references | Matching EN/BN snippets, unique FAQs, visible sources |
| Stage 8 — audit | Check context, coverage, and unsupported breadth | Check intent, relevance, evidence, and page outcome | 13/16 minimum, no zeros, no hard fails |
| Stage 9 — release | Keep cluster and URL graph coherent | Verify updated asset and measure later | `dist/` inspection, content-contract checks, scoped sitemap/RSS diff |

---

## 5. Limits and non-claims

- “Topical authority,” “contextual vector,” “microsemantics,” “heading vector,” and similar terms in these sources are practitioner concepts. They are not a publicly documented checklist that URAL can claim Google follows exactly.
- Koray's case studies describe his own projects and interpretations; their performance outcomes are not a promise or causal proof for URAL.
- Gotch's content-gaps and tool workflows help structure investigation; ranking-tool recommendations and scores are not independent evidence that a page is complete.
- SERPs vary by country, language, personalization, device, and time. Record the observation date and market; do not treat one snapshot as permanent truth.
- Search volume, keyword difficulty, competitor traffic, or conversion estimates are not inferable from memory. Use access-controlled, dated data if needed; otherwise state that it was not measured.
- A concise answer, FAQ, structured data, internal link, longer page, or update date does not guarantee a snippet, citation, rich result, traffic increase, or ranking.
- A tool's current product page describes its own product. It is a primary source for what the tool says it does, not proof that the proposed workflow is objectively superior.

---

## 6. Primary-source reading list (checked 14 October 2026)

### Koray Tuğberk Gübür / Holistic SEO & Digital

1. **“What is Topical Authority? How does Topical Authority Work?”** — macro/micro intent, contextual hierarchy, topical coverage, and his explanation of heading vectors/candidate answer passages.
   https://www.holisticseo.digital/theoretical-seo/topical-authority/
2. **“How to Expand a Topical Map for Higher Topical Authority?”** — topical-map expansion, query templates, source context, adjacent context, and contextual bridges.
   https://www.holisticseo.digital/seo-research-study/topical-map
3. **“Importance of Entity, Attribute, Value (EAV) Architecture for SEO”** — attribute/value selection, prioritization, question generation, answer pairing, and content configuration.
   https://www.holisticseo.digital/seo-research-study/entity-attribute-value
4. **“Importance of Lexical Semantics and Semantic Similarity (Closeness) for SEO”** — main vs. micro-context, lexical relationships, contextually relevant nearby language, and query expansion as a planning thought exercise.
   https://www.holisticseo.digital/seo-research-study/lexical-semantics
5. **“Importance of Entity-oriented Search Understanding: Beyond Strings”** — entities, correlated/sequential queries, query themes, and contextualized query coverage.
   https://www.holisticseo.digital/seo-research-study/entity-seo
6. **“Koray's Agents (Generative AI Agents for Semantic SEO and Topical Authority)”** — Query Gap Analyzer, context signifiers, competitor gap, and query-length distribution. This is an account of his agent workflow, not a public data source for Bangladesh metrics.
   https://medium.com/@ktgubur/korays-agents-generative-ai-agents-for-semantic-seo-and-topical-authority-d4b247fac72a
7. **“Thoughts on AI Search and AI-based SEO”** — his 2025 view of query fan-out, representative sources, and macro/micro-context networks. Use as a practitioner's prediction/interpretation, not established universal Google behavior.
   https://medium.com/@ktgubur/thoughts-on-ai-search-and-ai-based-seo-3a909099e180
8. **“3 Suggestions about Topical Authority”** — source context, site-wide language, and relevance to a source's business purpose.
   https://medium.com/@ktgubur/3-suggestions-about-topical-authority-1cd73963a9cb

### Nathan Gotch / Gotch SEO

9. **“How to Create SEO Content That Ranks in 2025”** — selection/qualification, intent, competition, relevance, and a practical creation/optimization sequence.
   https://www.gotchseo.com/how-to-create-seo-content/
10. **“SEO Competitor Analysis: The Complete Guide (for 2025)”** — broad and page-level analysis, relevance comparison, content gaps, and the recommendation to upgrade existing assets.
    https://www.gotchseo.com/seo-competitor-analysis/
11. **“High-Impact vs. Low-Impact SEO Actions” (Episode 2)** — content audit dispositions for dated, thin, duplicate, or poor URLs and the use of existing link/data evidence.
    https://www.gotchseo.com/episode-2/
12. **“How to Use Google Search Console (Like an SEO Pro)”** — use first-party query/page evidence and inspect live intent before acting on a query.
    https://www.gotchseo.com/google-search-console/
13. **Nathan Gotch — AEO consulting process** — current description of diagnosing existing high-value pages, identifying gaps, prioritizing fixes, and building a roadmap. The original `nathangotch.com/consulting/` currently resolves to the consultant site; accessed content is at:
    https://aeoconsultant.ai/
14. **“AI SEO for Dummies” / 30-day workflow** — baseline, evidence library, focused content improvements, off-site proof, review, and 90-day roadmap.
    https://nathangotch.com/dummies/
15. **About Nathan Gotch** — source identity and current bio context.
    https://nathangotch.com/about/

### Rankability (company co-founded by Nathan Gotch)

16. **Copywriter product/workflow** — Rankability's own description of SERP plus AI-cited-source research, brief, knowledge-base-grounded drafting, uniqueness, optimization, and finalization. Vendor/product description only.
    https://www.rankability.com/products/copywriter/
17. **Auditor product/workflow** — Rankability's own description of crawl-scope, investigation, and post-fix checks. The product page distinguishes a technical site audit from a page-level content audit. Vendor/product description only.
    https://www.rankability.com/products/auditor/
18. **“10 Best SEO Tools for Agencies (My 2026 Stack)” by Nathan Gotch** — a recent first-person example of establishing a visibility baseline, auditing a page, inspecting cannibalization and missing proof/differentiation, updating the asset, and tracking later changes. The page discusses his own tool stack and is not independent validation of Rankability.
    https://www.rankability.com/blog/best-seo-tools-for-agencies/
