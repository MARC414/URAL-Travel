# 05 — AEO / GEO (Answer Engine & Generative Engine Optimization)

**Perspective:** getting cited by ChatGPT, Perplexity, Google AI Overviews, Claude, Copilot — a large and growing free traffic source this niche is perfect for.
**Prereqs:** [03-content-topical-authority.md](03-content-topical-authority.md) (you need answer-worthy content first).
**Feeds into:** [04-keywords.md](04-keywords.md) (question phrasing), [09](09-synchronization-maintenance.md).

---

## 1. Why this niche is an AEO goldmine

People ask assistants exactly the questions this site answers: "Do Bangladeshi passport holders need a visa for Dubai?", "How much does Umrah cost from Bangladesh?", "Cheapest month to fly Dhaka to Bangkok?" Answer engines pull from well-structured, clearly-sourced pages. If URAL is the clearest answer, it gets cited — and citations drive referral traffic **and** brand searches that then help classic SEO.

---

## 2. What's already done (as of commit 40cf42c) — do not undo

- **`robots.txt` allowlists AI crawlers** individually (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Amazonbot, MistralAI-User, DuckAssistBot, cohere-ai, plus classic bots). **Each named group repeats the full disallow set** — a crawler obeys only its most-specific `User-agent` group and ignores `*`. If you add rules, add them to **every** group, not just `*`.
- **Schema `@graph`** with stable `@id`s (`#organization`, `#website`, `#webpage`, `#article`, `#faq`, `#breadcrumb`, `#primaryimage`).
- **Homepage FAQ de-duplicated** — homepage FAQs are now unique, not sliced from the Hajj/Umrah set.

---

## 3. The rules for being answer-engine-friendly

### 3.1 Answer the question in the first sentence
Every page/section that targets a question must **lead with the direct answer**, then elaborate. Answer engines extract the concise answer near the top. "Bangladeshi passport holders need a pre-arranged visa for the UAE; visa-on-arrival is not available. Here's how to get one…" ✅

### 3.2 Use real question headings
`<h2>`/`<h3>` phrased as the actual question ("How much does a UAE visa cost from Bangladesh?"), immediately followed by a short, self-contained answer. This maps directly to `FAQPage` schema.

### 3.3 One answer, one URL — no FAQ duplication
Answer engines (and Google's FAQ rich results) pick **one** URL per answer. If the same Q&A appears in `FAQPage` schema on multiple pages, you fragment authority and may get none chosen. **Each FAQ question should live in exactly one page's schema.** This was fixed on the homepage; enforce it as new FAQs are added (see [03](03-content-topical-authority.md) §6). Maintain a simple registry (a comment block or a `faqRegistry` in `src/constants.ts`) so no question is reused.

### 3.4 Structured, extractable formatting
- Short paragraphs, bulleted lists, comparison tables (visa types, costs, best months).
- Explicit numbers with units and dates ("৳X as of Sep 2026").
- Definitions and "what is / how to / how much" framing.

### 3.5 Freshness and specificity
Answer engines favor current, specific, sourced info. Dated prices and cited official sources ([03](03-content-topical-authority.md) §3) make URAL a safer citation than vague competitors.

---

## 4. Schema roadmap (extend what exists)

Add these schema types where relevant (via `src/utils/schema.ts`, keeping the `@id` graph consistent per [09](09-synchronization-maintenance.md)):
- **`FAQPage`** — on hub pages and Q&A-shaped posts (already used; expand, no duplicates).
- **`HowTo`** — for step-by-step content (applying for a visa, booking Umrah). High AEO value.
- **`Article` / `BlogPosting`** with `author` + `publisher` (`#organization`) and `datePublished`/`dateModified`.
- **`BreadcrumbList`** — already emitted; keep visible breadcrumbs matching ([02](02-internal-linking.md)).
- **`Organization`** with `sameAs` links to your social/profile pages ([07](07-backlinks-free.md)) — strengthens entity recognition.
- **`ImageObject`** with stable `#primaryimage` `@id` — already done.

**Validate** every schema change at https://validator.schema.org and Google's Rich Results Test. Broken schema is worse than none.

---

## 5. Off-page AEO signals

Answer engines synthesize from many sources. Being **mentioned** matters even without a link:
- Get URAL cited on Reddit, Quora, travel forums, and Bangladeshi community sites ([07](07-backlinks-free.md)) — LLMs ingest these.
- Consistent NAP/brand across the web (entity consistency) helps engines recognize URAL as *the* Bangladeshi travel resource.
- Wikipedia/Wikidata presence (if genuinely notable later) is a strong entity signal — don't force it.

---

## 6. Verification & success metric

- [ ] Top question pages lead with a direct answer in sentence 1.
- [ ] No FAQ question duplicated across pages' schema (check the registry).
- [ ] Schema validates clean in Rich Results Test.
- [ ] `HowTo` added to at least the visa and Umrah step guides.
- **Success:** referral traffic from `chatgpt.com`, `perplexity.ai`, etc. appears in analytics; brand searches ("URAL travel") rise in GSC. Test manually by asking the engines the target questions and seeing if URAL is cited over time.
