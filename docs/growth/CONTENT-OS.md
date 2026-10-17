# URAL Content Operating System

**Prepared:** 14 October 2026

**Purpose:** a repeatable, evidence-led production and refresh workflow for URAL's English and Bengali content.

> **Reconstruction note:** the previous session's `CONTENT-OS.md` was not present in this checkout, and its referenced commit was not available in local Git history. This file is reconstructed from the current repository's `AGENTS.md`, the existing growth playbook and content strategy, the code-level publishing contract, and the stage requirements supplied for this work. It does not claim to reproduce the missing version.

---

## 1. Authority and scope

Read these documents in this order before a content task:

1. [`../../AGENTS.md`](../../AGENTS.md) — repository, safety, and documentation rules.
2. [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) — plan of record. Treat it as strategy, not a scratchpad; do not rewrite it as part of a content task.
3. This file — pipeline rules and release contract.
4. [`AI-WRITING-PROMPTS.md`](AI-WRITING-PROMPTS.md) — stage-by-stage work instructions.
5. [`CONTENT-QUEUE.md`](CONTENT-QUEUE.md) — work record, decisions, evidence ledger, and gate status.
6. [`METHOD-NOTES.md`](METHOD-NOTES.md) — sourced Koray/Gotch methods and the limits on how they are applied.
7. The target article and its live code/build representation — do not assume the metadata, body, localized content, or references are already in sync.

**Before item 2 sets your agenda, read the active cluster plan when one exists** — currently
[`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md). Item 2 supplies the site-wide inventory, the gap register and the
scoring model; the cluster plan supplies the release order, page ownership and per-wave gates for the cluster being
built. Where the two disagree about *what to build next*, the cluster plan and the queue row win. Today that means
the **Umrah cluster is in progress**, **Fard Hajj stays a separate linked topic** (its own registration/package
page, not an Umrah child), and the India pillar in `CONTENT-STRATEGY-2026.md` §5/§6/§12 is an unscheduled gap.

If a source, legal rule, code contract, or owner instruction appears to conflict with a content requirement, stop before drafting or changing the live claim. Record the exact conflict, source, date checked, and the narrow decision needed. Do not silently “resolve” a high-impact legal or cost discrepancy.

This execution layer governs editorial work. It does not replace routing, authoring, design, or affiliate conventions documented elsewhere in the repository.

## 2. Editorial operating principles

1. **Update before creating.** Search the live URL inventory, `SEO-KEYWORD-MAP.md`, internal links, and existing cluster before proposing a new URL. One page owns one primary task/query. If the existing URL already serves it, prefer a material update in place unless the owner explicitly chooses otherwise.
2. **Intent before terms.** Describe what the reader is trying to accomplish, what answer format would satisfy it, and what they need to do next. A keyword list is evidence, not the brief.
3. **No invented Bangladesh data.** Never state search volume, keyword difficulty, an agency price, a hotel fare, an airline fare, or a visa fee from memory. Use dated first-party data or clearly label the value unverified and omit it from publishable copy.
4. **Claims have owners and evidence.** A number, eligibility statement, legal rule, deadline, process step, named product, or “must” statement needs a source appropriate to that claim. Put the source next to the claim in the ledger, and in the article where a reader needs it.
5. **Separate what is known from what is inferred.** Official page wording, a live quote, a measured route distance, a site's interpretation, and editorial advice are different evidence classes. Label them accurately.
6. **Be useful before being comprehensive.** Answer the main question early; expand only into closely related micro-contexts that help the same reader complete that task. Link adjacent intents to dedicated child guides rather than turning every page into a duplicate hub.
7. **Bilingual parity means task parity.** English and Bengali must answer the same decision questions, retain the same material conditions and caveats, and link to the corresponding locale. Localization may change order, examples, and phrasing; it may not weaken facts or omit uncomfortable qualifications.
8. **One query, one cost model.** Use one consistent cost table per page. State trip length, party size/room-sharing basis, date checked, inclusions and exclusions. Do not add a second range or a “save X” claim unless it is derived from a matched, sourced comparison.
9. **AEO is a clarity practice, not a guarantee.** A concise answer, descriptive headings, and source-linked facts make content easier to understand and extract. They do not guarantee a featured snippet, rich result, citation, or ranking.
10. **Preserve stable site signals.** Existing slug, canonical, reciprocal locale relationship, references, useful internal links, author entity, and article schema must remain coherent. Material dates change only when the content truly changes.

## 3. Evidence standard

### 3.1 Preferred evidence by claim

| Claim type | Preferred evidence | Minimum record |
|---|---|---|
| Visa eligibility, permits, immigration law, Hajj restrictions | The responsible government ministry/embassy/official visa portal; official airline page for carrier-specific processes | Exact eligibility/condition, country/passport applicability, source URL, checked date, effective or seasonal date if stated |
| Bangladesh Hajj registration, fees, dates | Bangladesh Ministry of Religious Affairs / official Hajj portal notice or service page | Stage, applicant type, current Hajj year, fee/date if published, checked date |
| Rail booking, timetable, baggage, fare | Official operator portal, fare page, ticket checkout, or published terms | Route, class, travel date if price is quoted, checked date, what is dynamic |
| Flight fare or airline benefit | Airline's own dated itinerary/checkout/terms | Origin/destination, travel dates, passenger count, cabin/bag conditions, fare basis, checked date |
| Hotel price or walking distance | Property's own live booking page for a specific date/room, plus a defensible route/map source for distance | Property, exact dates, occupancy, room/cancellation/tax basis, mapped start/end point, checked date |
| A package-vs-DIY comparison | A licensed provider's written or live itemized quote and a DIY basket matched on dates, duration, occupancy, baggage and inclusions | Both baskets, all inclusions/exclusions, sources, checked date, calculation |
| General SEO method | Original material from the named practitioner or their own company/platform | URL, page title, author/ownership, access date, the exact rule being adapted |

A government or airline site is not automatically evidence for a price it does not publish. A third-party ranking or SEO tool may help discovery, but it does not turn an unverified claim into a verified one.

### 3.2 Claims-ledger fields

Every substantive draft begins with a ledger containing:

- claim ID and proposed wording;
- claim type and affected language(s);
- source URL and source owner;
- date checked and, when relevant, effective date / travel date / Hajj year;
- applicability (Bangladeshi ordinary passport, visa category, airline, route, party size);
- status: `VERIFIED`, `QUALIFIED`, `CONFLICT`, `UNVERIFIED`, or `DROP`;
- safe wording, follow-up needed, and the section where it will appear.

`CONFLICT`, `UNVERIFIED`, and `DROP` claims must not be polished into assertive prose. Resolve them, explicitly qualify them, or omit them. Escalate owner-decision conflicts before changing the live article.

### 3.3 Price and date handling

- Use ISO calendar dates in the evidence ledger (`YYYY-MM-DD`). In reader-facing copy, name the date and market clearly (e.g., “checked 14 October 2026”).
- Distinguish an official fixed fee from an itinerary quote, a live fare, an estimated budget, an exchange-rate conversion, and an agency service fee.
- A BDT conversion needs the SAR/BDT rate source and date. Do not multiply a stale exchange rate into a precise amount.
- When prices are dynamic and no dated live quote is captured, link to the official booking/checking route and say that availability and total vary; do not print a false precision.
- Do not silently replace a published total with a newly sourced but differently scoped total. Reconcile trip duration, party size, room-sharing, transport, taxes, insurance, meals, and optional visits first.

## 4. The stage gates

The prompts live in `AI-WRITING-PROMPTS.md`; this is the short gate map.

| Stage | Required output | Gate to continue |
|---|---|---|
| 1. Select / queue | URL verdict, primary query, audience, intent hypothesis, owner constraints, scope | Existing-page/cluster check done; no invented metrics; decision recorded |
| 2. Verify | Claims ledger with primary sources and dated checks | High-impact claims verified or explicitly escalated; no silent conflicts |
| 3. Brief | Query network, macro/micro scope, SERP/format notes, differentiation, outline, link map — **v2: component column per section, layout-intent/centerpiece choice, QD verdicts** | One clear job, no cannibalization, sources mapped to sections |
| 4. English draft | Complete source-backed draft with answer-first lead — **v2: factual definition→rule→attribute openings; segmented practical-modality sections with no unledgered facts** | Every assertive factual detail maps to ledger; no unsupported number |
| 5. Bengali localization | Full-parity Bengali version, not a short summary | Same task, qualifications, source trail, FAQs, and internal-link intent |
| 6. Publication package | Title, description, AEO answer, FAQ, references, internal links, update date | Metadata matches body; FAQs are unique/visible; references resolve |
| 7. Editorial preflight | Cross-language/content consistency, page contract, link and source checks | No mismatched totals, slugs, facts, language parity, or broken links |
| 8. Red-team audit | Four-dimension 0–4 score, hard-fail check, fix list | At least 13/16; no zero; no hard fail |
| 9. Repository handoff | All required data/code edits, generated files, lint/build/verification, diff audit | Built HTML is correct and all gates are green; generated-file changes are in scope |

A later stage does not override a failed earlier gate. If Stage 2 exposes an owner-decision conflict, drafting pauses even when the URL verdict in Stage 1 is already fixed.

### Cluster planning and release order

For multi-page work, map the hub and supporting pages before drafting. Audit the existing site first: update a suitable hub in place instead of creating a duplicate, and give each child page one distinct reader job. Use available SERP and GSC evidence to prioritize; otherwise say “not measured.” Do not invent search metrics or produce all cluster pages in one drafting or publishing batch.

Default release order is **hub first, then one supporting article per release wave**, publishing each article's English and Bengali locale routes together. The rollout currently in progress is the Umrah cluster ([`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md)); Fard Hajj remains a separate linked pillar, not one of its children, and no other cluster from [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) §6/§12 opens until the owner closes or re-prioritises those waves. The owner approves the page set, boundaries, links, and cadence. At each wave, take that one article asset through Stages 1–9 and owner review. Link to live pages only; after a child is deployed, add useful links from the hub and related live pages. Do not add `href`s to planned pages. A completed Stage 9 means the repository build is verified, not that the page has been deployed. Follow the owner-controlled post-deploy checks and measurement process in `AI-WRITING-PROMPTS.md`; do not require a ranking gain before starting the next scheduled wave.

## 5. Existing-page refresh contract

For a refresh, record before editing:

- the canonical English URL and locale twin(s);
- current title, primary query, publish date, and last meaningful update date;
- existing AEO snippets, FAQ/schema, references, internal links, and cost claims;
- claims that must be preserved verbatim or in substance;
- claims to re-check, qualify, remove, or leave unchanged;
- the exact files needed for the repo handoff.

Do not change a slug to make a headline prettier. Do not create a competing post when the decision is to update in place. Keep adjacent hub/child pages distinct: the hub gives orientation and routes readers; a process article does the detailed execution work, then links back to the hub and to narrowly relevant children.

## 6. URAL repository handoff contract

For an existing blog post, inspect the exact types and rendering before editing. The usual content surfaces are:

- `src/constants.ts`: the `BLOG_DATA` metadata entry, `updatedAt`, `references`, internal links, summary and CTA as applicable;
- `src/data/blogContent.ts`: English `BLOG_BODY` entry;
- `src/data/bengaliContent.ts`: mandatory `BENGALI_BLOG_OVERRIDES` entry; this repository's build contract requires the Bengali body for published blog routes;
- `src/App.tsx`: English and Bengali answer snippets for the target slug;
- `src/data/contentMeta.ts`: `CONTENT_UPDATED` for material data-driven site-content updates. Bump only if its current date differs from the true edit date; never make up a date to force a sitemap change;
- `public/sitemap.xml` and `public/rss.xml`: regenerate via the normal build/prerender workflow and include only expected changes.

A content update must not touch unrelated posts. The built/prerendered HTML is the release artifact to inspect, not just the TypeScript source.

### Required verification

Run, in order:

```bash
npm run lint
npm run build
npm run verify:build
```

Then inspect:

- the EN and `/bn/` prerendered HTML for the same slug;
- visible title, canonical, hreflang, language, dateModified, body, FAQ, and references;
- the `FAQPage` node in the `dist` HTML of **both** locales: the prerender pairs every line from the FAQ heading to the next numbered heading, so any paragraph left after the FAQ block makes the count odd and silently deletes the schema while the visible FAQ still renders correctly — `npm run test:scheduling` now asserts the pairing rule for every scheduled post;
- the sitemap entries and RSS item for the target post;
- `git diff -- public/sitemap.xml public/rss.xml` to confirm no unrelated feed or URL changes;
- the verifier's total check count and any warnings.

Report the exact command results and any remaining limitations. “Build passed” is not equivalent to “content verified.”

## 7. Ownership and stale-document rule

`CONTENT-STRATEGY-2026.md` is the strategy plan of record. A task may record a dated execution decision in the queue and implement it, but must not rewrite strategy to make the task look pre-approved. This queue and ledger are operational records; after work lands, keep only information that remains useful for future reviews, and move genuinely historical evidence to `docs/history/` in line with `AGENTS.md`.