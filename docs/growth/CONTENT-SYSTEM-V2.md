# URAL Content System v2 — Visual Semantics, Topical Maps & Dual-Modality Writing

**Prepared:** 16 October 2026
**Source research:** Julian Goldie × Koray Tuğberk Gübür podcast (visual semantics / layout-aware
ranking / topical maps), summarized by the owner 16 October 2026. Practitioner claims — treated
as editorial heuristics, never as documented Google guarantees (see §9).
**Status in the document hierarchy:** This file **upgrades the execution layer**. It does not replace
[`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) (plan of record), the active cluster plan,
or the queue. Read order remains [`CONTENT-OS.md`](CONTENT-OS.md) §1; this file is read after
[`METHOD-NOTES.md`](METHOD-NOTES.md).

> **One-line version:** Match the page's *visible layout* to the reader's intent, specify the visual
> component for every section *in the brief*, write factual sections in definition→rule→attribute
> order, keep text as short as the task allows, and cover the topic network measurably better than
> relevant competitors — without ever fabricating experience, reviews, or "community" content.

---

## 1. What v2 changes (and what it does not)

| Area | v1 (existing) | v2 upgrade |
|---|---|---|
| Page structure | Answer-first headings, EAV ledger | **+ Centerpiece rule (§2):** intent-matched above-the-fold block |
| Briefs | Outline + source map | **+ Component column (§3):** every H2 names its render component |
| Topical planning | Query network, macro/micro context | **+ QD-Page / QD-Heading / QD-Section decision (§4)** and competitor-coverage gap method (§5) |
| Writing | House voice, short factual sentences | **+ Dual-modality sentence rules (§6):** factual order vs. practical-voice sections |
| Text length | "Be useful before comprehensive" | **+ Concision budget (§7):** no filler tokens; every paragraph earns its place |
| Tools | Affiliate/search widgets exist | **+ Tool-first rule (§8):** functional intent gets a working tool above the fold |
| Evaluation | Stage 8 red team, 13/16 | **+ v2 hard fails (§10)** and component/visual checks in Stage 7–8 |
| Publishing cadence | One article (EN+BN) per wave, owner-approved | **Unchanged.** No randomized schedules, no volume ramps (§9.2) |

Nothing in v2 relaxes the claims ledger, bilingual parity, or owner-approval gates.

---

## 2. Visual semantics & the centerpiece rule

Koray's claim: Google evaluates above-the-fold visual structure ("centerpiece annotations",
layout-aware ranking patents). URAL treats this as a *design discipline*, not a ranking promise:

**Centerpiece rule — the first screen of every content page must contain, in this order:**
1. H1 stating the page's one job (entity + task + market where relevant).
2. The direct answer or the working tool — whichever the intent demands (§8).
3. A dated trust strip: `Checked <date>` + the basis (e.g. "against Embassy / operator pages")
   wherever the page makes time-sensitive claims.
4. The primary next action (search, checklist, or the next guide), labelled honestly
   (affiliate links keep `rel="sponsored"` per `AGENTS.md`).

**Layout-matches-intent table (use in Stage 3 briefs):**

| Dominant intent | Centerpiece | Early supporting component |
|---|---|---|
| Functional ("search / book / check") | Working search/tool widget | Key-facts strip, then guide sections |
| Informational ("what / how / rules") | QuickAnswer block with the direct answer | Contents/jump nav, then ordered steps |
| Comparative ("X vs Y / cost") | Verdict summary + comparison table | Criteria sections, then FAQ |
| Procedural ("step-by-step visa/permit") | Numbered checklist with current status/date | Document table, fees table, FAQ |
| Transactional research ("price / fare") | Dated fare basis + what it excludes | Fare table, booking steps, recheck warning |

**Design-as-effort (legitimate half of the claim):** Use URAL's own components, class names and
layouts (they already exist in `src/components/` and `BlogPostRouteView.tsx`). Never paste
generic AI-generated page scaffolding into the site. This is a maintainability and brand rule;
it is **not** an "AI-detection evasion" technique (§9.1).

---

## 3. Component-spec briefs (mandatory from v2)

Every Stage 3 brief now carries a **Component column**. A section without a named component
defaults to plain prose — and must justify why prose is the best format.

**Approved component inventory (renderer-supported today):**

| Component | Use for | Source of truth |
|---|---|---|
| `QuickAnswer` | Direct answer block near top | `src/components/QuickAnswer.tsx` |
| Semantic table | Comparisons, fees, baggage, schedules | Blog renderer (Umrah budget-table pattern) |
| Numbered checklist | Ordered procedures, document steps | Body list rendering |
| FAQ block | Distinct remaining reader questions | Visible FAQ + matching `FAQPage` schema |
| References block | Claim-linked sources, tier-labelled | `references` frontmatter/`BLOG_DATA` |
| Internal-link cards/list | Next-step navigation | `internalLinksEn/Bn` |
| Flight/hotel search widget | Functional intent, fare checking | `TravelpayoutsWidget` / custom widget |
| Interactive tool | Calculators, checklists, eligibility helpers | `src/components/InteractiveTools.tsx` |
| Visa/destination guide block | Structured visa/cost data | Existing guide data + routes |
| Labelled partner callout | Monetised next action | `AffiliatePartners.tsx` (`sponsored`) |
| Responsive image + alt | Place/route illustration | `ResponsiveImage`, `imageAssets.ts` |

**Rules:**
- If a brief wants a component not in this inventory, it becomes a **dev ticket**, not writer
  improvisation. The article ships with the best supported fallback.
- Components replace prose; they don't decorate it. If a table says it, don't repeat it in
  paragraphs below.
- Every component must render identically in EN and BN (labels localized, data identical).

**Brief template (v2 — replaces the Stage 3 outline format):**

| # | Heading (question/task) | Intent | Component | Entities & facts (ledger IDs) | Modality (§6) | Internal link out |
|---|---|---|---|---|---|---|

---

## 4. Query Deserves a Page / Heading / Section (QD decision)

For every candidate query in a topical map, decide — and record in the queue row:

| Verdict | Test | Action |
|---|---|---|
| **QD-Page** | Distinct reader job, distinct decision, enough verified substance for a standalone page | New/update URL (owner approval for new URLs) |
| **QD-Heading** | Same job as parent, needs its own scannable answer | H2/H3 on the owning page |
| **QD-Section** | Qualifier, exception, or one-paragraph answer | Paragraph/list item under the relevant heading |
| **QD-Link** | Another URAL page already owns it | Contextual internal link only — do not duplicate the answer |
| **Drop** | No verified source, no reader value, or off source-context | Record and drop |

A query's search volume is **never** the test (URAL does not invent BD volume/KD). Tests are:
reader job, intent difference, source availability, and cannibalization risk.

---

## 5. Topical maps & the coverage-gap method

1. **Inventory:** List URAL's existing URLs for the topic first (update-before-create still wins).
2. **Competitor set:** Up to 8 *relevant* competitors — Bangladesh-outbound travel sites,
   official portals, and airlines — not generic global travel blogs. Record sitemap/section
   inventory with the date checked. Competitor pages are a coverage inventory, never copy.
3. **Gap map:** Build the unified query network (Koray EAV method, `METHOD-NOTES.md` §2),
   mark each node Covered-by-URAL / Covered-by-competitors-only / Covered-by-nobody /
   Unverifiable, then apply §4 verdicts.
4. **Coverage target:** Aim to cover the *verified, reader-relevant* network more completely
   than the best competitor — Koray's "20–30% more depth/breadth" is a directional ambition,
   **not a page quota**. Ten unverifiable pages are worse than zero.
5. **Maturity, honestly:** After a cluster ships, wait for real Search Console data
   (impressions/queries over a stated period, typically ~90 days) before expanding it.
   This replaces any "warm-up" ritual: we measure, we don't perform activity for algorithms.
6. **Off-model topics:** If competitors cover a commercial topic URAL can't serve
   (e.g. direct booking), cover it *informationally* only when it completes a reader's
   decision — otherwise QD-Link or Drop.

---

## 6. Dual-modality sentence rules

Google-facing rationale (practitioner claim): factual and experiential language are scored
differently. URAL's editorial rationale is simpler: **rules need precision; decisions need
judgement.** Keep the two visibly separate.

### 6.1 Factual modality (rules, fees, eligibility, procedures)

Use this order at the start of a factual section, adapted — never forced where the source's
own logic differs:

1. **Definition ("is-a"):** *"`X` is …"* — name the thing and its category.
   > "A Saudi stopover visa is a transit permission issued through Saudia or flynas…"
2. **Rule/predicate:** what it does, who it applies to, under what condition.
   > "It allows eligible through-passengers up to 96 hours in Saudi Arabia…"
3. **Attribute ("X of Y"):** the deciding attributes — cost, validity, limit, deadline —
   each with unit, date checked, and source beside it.
   > "The fee of the stopover visa is shown at airline checkout; the limit of the stay is 96 hours [n]."

After the opening triad, write normally. **Legal/visa accuracy outranks grammar templates:**
if the official source orders conditions differently, follow the source and note it in the ledger.

### 6.2 Practical modality (judgement, trade-offs, reader questions)

- Visually segmented (own heading, e.g. "Practical notes" / "Common reader questions").
- Editorial first/second person is allowed ("In practice, check…", "You'll want to…").
- **Never fabricate** first-hand experience, interviews, reviews, forum posts, or "community"
  answers. If URAL has no first-hand evidence, write guidance, not testimony.
- No new facts may appear here that aren't in the claims ledger. Opinions choose between
  verified options; they don't invent options.

### 6.3 Blacklist (house style, factual sections)

Avoid in factual modality: hype adjectives ("ultimate", "secret", "guaranteed", "cheapest ever"),
agency-bashing, fake urgency, unqualified absolutes ("always/never/free" without source),
and LLM-filler transitions ("In today's fast-paced world", "look no further", "delve").

---

## 7. Concision budget (the legitimate "token" rule)

- The primary query's core entities appear naturally in the H1, the centerpiece answer,
  and the first heading — because readers scan, not to game token percentages.
- Every paragraph must add a fact, a step, a decision rule, or a caveat. Delete the rest.
- Prefer a table/list/component over prose when the information is structured (§3).
- No target word count. Length = what the verified ledger supports.
- Bengali follows the same budget — parity is measured in *decisions preserved*, not words.

---

## 8. Tool-first diversification

Where intent is functional, a working tool outranks an article:
- Prefer improving existing tools (`InteractiveTools`, flight/hotel search, visa guides)
  over writing prose that describes a tool.
- Articles with functional sub-intents embed the tool or link to it contextually at the
  point of need — not in a generic sidebar.
- New tool ideas enter the queue as QD-Page (functional) rows with the same evidence gates;
  a tool that displays fares/schedules must use live or clearly-dated data (never fake
  schedules — see `AGENTS.md` §3).

---

## 9. Explicitly NOT adopted (do not resurrect)

The source podcast mixes legitimate craft with evasion tactics. The following are **rejected**
for URAL, regardless of claimed ranking benefit:

1. **AI-detection bypass** — no writing, code-cleaning, or token-shrinking *for the purpose of*
   evading AI/scaled-content detection. URAL's defence is genuine verification and editing.
2. **Warm-up rituals & proxies** — no aging Reddit/social accounts, proxies, or performed
   activity. Distribution uses URAL's real, owned channels only.
3. **Randomized publishing schedules** — publishing cadence stays owner-approved and steady
   (existing scheduled-publishing workflow). Randomization to mimic humans is deception.
4. **Volume ramps** — no mass page generation. BrowserStack-style scaled output is the
   failure mode this whole system exists to avoid.
5. **Fake UGC / forum sections** — no invented community Q&A, reviews, or personas (§6.2).
6. **Syndication spam** — no exact-match subdomains, IMDb/podcast/ebook spam, or "echo"
   duplication. Legitimate adaptation of URAL's own content for URAL's own channels,
   with canonical links back, is fine.
7. **Attribute-claim link schemes** — no buying/engineering external links to manufacture
   "AI consensus". External links are earned via useful tools, data, and partnerships
   (see `07-backlinks-free.md`).

Any future instruction to adopt these must be escalated to the owner as a policy change,
not implemented silently.

---

## 10. Evaluation additions (Stages 7–8)

**Stage 7 preflight — add:**
- [ ] Centerpiece matches the intent table (§2); checked-date strip present if claims are dated.
- [ ] Every H2's rendered component matches its brief component (§3) in EN **and** BN `dist/` HTML.
- [ ] No fact appears in prose that a table/component already states (duplication check).
- [ ] Practical-modality sections contain zero unledgered facts and zero fabricated experience.

**Stage 8 red team — new hard fails (block release regardless of score):**
- Fabricated experience, review, interview, or community content.
- Brief promised a component that does not render in the built page.
- Centerpiece answers a different intent than the page's declared job.
- A QD-Page published where QD-Heading/QD-Link was the recorded verdict (cannibalization).

The 13/16 threshold, no-zero rule, and existing hard fails are unchanged.

---

## 11. How to apply v2, in order

1. New cluster/topic → §5 gap map + §4 verdicts → queue rows (owner-approved).
2. Stage 3 brief → v2 brief table (§3) + layout-intent row (§2).
3. Stage 4 draft → §6 modalities, §7 concision.
4. Stage 5 BN → same components, same modalities, same ledger.
5. Stages 7–8 → §10 checks.
6. Stage 9 + publishing → unchanged owner-controlled flow in `AI-WRITING-PROMPTS.md`.

**Existing 48 articles are NOT retrofitted by this document.** They change only through the
planned audit → owner-approved fix cycle.
