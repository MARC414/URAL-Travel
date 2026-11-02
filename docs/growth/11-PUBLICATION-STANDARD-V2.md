# 11 — Publication Standard v2 (supersedes the zero-new-article rule)

**In force:** 2 November 2026, by owner instruction.
**Supersedes:** the "current standalone-article recommendation: zero" line in
[FUTURE-CONTENT-GAPS](../03-social/FUTURE-CONTENT-GAPS.md) and the
"does not authorize new articles" line in [CONTENT-OS](CONTENT-OS.md).
**Does not change:** [10 — Content Upgrade Standard](10-CONTENT-UPGRADE-STANDARD.md),
which remains the acceptance contract for every article, new or upgraded.

## 1. Why this replaced the old rule

The zero-new-article rule was written as a **guardrail against bloat**: at the
time, the risk was adding URLs faster than the site could maintain, link and
verify them. That risk was real. But the rule's side effect was that genuine
coverage gaps could not be filled — the two gaps found on 2 November (tawaf/sa'i,
and the Hajj rites sequence) were not "bad ideas", they were simply
unrepresentable under a rule that permitted no new URLs at all.

The upgrade keeps the discipline and removes the freeze. A new article is now
**permitted, and gated**, rather than prohibited.

Critically: nothing in the evidence suggests volume was the bottleneck. The
[25 October audit](../../00-URAL-CURRENT-AUDIT.md) concluded the likely
bottlenecks are "distribution and conversion reliability, rather than
insufficient publishing volume." v2 therefore permits a **slow, gated** new-URL
cadence, not a publishing programme.

## 2. The seven gates — all must pass before a new URL is written

| # | Gate | Test | Fail behaviour |
| --- | --- | --- | --- |
| G1 | **Distinct job** | A question no live URL owns, checked against `public/sitemap.xml` + `SEO-KEYWORD-MAP.md` + a grep of the cluster. Memory is not evidence. | Add it to the existing owner as a section. |
| G2 | **Evidence** | ≥3 references, primary first (ministry, regulator, operator, airport, airline), each with `name`, `nameBn`, HTTPS `url`, and a checked date. | Do not write. Find the source or drop the claim. |
| G3 | **Demand signal** | At least one of: a GSC query, an owner-supplied reader question, or an explicitly labelled hypothesis with a review date. "A keyword tool suggested it" is not a signal. | Label the article an unvalidated hypothesis, and cap it at one per month. |
| G4 | **Links both ways** | ≥4 `internalLinks` in the article (≥2 blog→blog, ≥1 hub/money), **and** ≥2 existing posts link *into* it in the same release (EN and BN arrays both). | Not a release. Hold it. |
| G5 | **Locale parity** | English and Bengali body at publish time, same facts, same caveats, explicitly written BN `internalLinks`. | Publish nothing, or publish English only *without* a `/bn/` URL in the sitemap. |
| G6 | **Maintenance owner** | A named owner and a review interval: `seasonal` (recheck each season), `static` (recheck annually), or `fast-moving` (90 days). | Do not publish. Orphaned pages decay silently. |
| G7 | **Cadence** | ≤2 new URLs per week. No same-day batches of unrelated posts. | Queue it. The queue is not a backlog of promises; it is an ordering. |

## 3. Short is allowed. Thin is not.

- **Target length for a single-question article: 700–1,000 words** per locale.
  A focused article that answers one thing well beats a 2,000-word article that
  answers four things vaguely.
- **Under 600 words is allowed only if** the article still passes G1–G7, cites
  ≥3 primary sources, and has a table, list or sequence the reader can act on.
  Pure prose under 600 words is a stub — merge it into its parent.
- **Length is never a goal.** The measurable target is that the page earns
  impressions for its own query within 90 days; if it does not, it is merged
  into its parent and 301'd. A short article that never earns an impression is
  worse than no article, because it dilutes the cluster.

## 4. Stop doing (the patterns that caused the freeze)

1. **Burst publishing.** September 2026 shipped 36 posts in one month, then
   none for weeks. Batches like that read as volume, not coverage, and they are
   impossible to evaluate. Cadence > batch size.
2. **New URL when a section would do.** If the existing owner can serve the
   query with a 400-word section, that is the answer — the map's "one page owns
   one job" boundary is unchanged.
3. **Adding a `/bn/` route without the Bengali body.** An English page on a
   `/bn/` URL is a defect, not parity.
4. **Publishing without a measurement plan.** See §5. An article added to a
   funnel you cannot measure cannot be judged, only believed.
5. **Trusting the owner's or the tool's memory of the inventory.** On 2 November
   the working assumption was that the Nusuk app had no article; in fact
   `nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit` is 2,032 words with
   a Bengali twin, and is one of the strongest posts in the cluster. Check the
   built site, not the recollection.

## 5. Measurement is a precondition, not a phase

The 25 October audit classified measurement as **P0** and the public GTM
container still lacks forwarding for URAL's custom events. The current GSC
exports in the repository carry **no click or impression values** ("NOT
SUPPLIED"). Until both are fixed:

- New URLs are capped at **one per week**, not two.
- Every article ships with its intended query and its review date recorded, so
  that the first usable export can be read against an intention rather than a
  guess.

This is not a reason to publish nothing. It is a reason to publish slowly and
record intentions.

## 6. What this changes in practice

| Old rule | v2 |
| --- | --- |
| New standalone articles: zero. | New articles permitted, gated by G1–G7. |
| Coverage gaps become "section upgrades" by default. | Sections still preferred when they fit (G1); a new URL is legitimate when the job is genuinely distinct. |
| Publishing frequency unaddressed. | ≤2/week, no batches; ≤1/week while measurement is broken. |
| Length unaddressed. | 700–1,000 words for single-question articles; <600 words only with a strong structure. |
| No decay policy. | 90-day impression check, then merge + 301. |

## 7. Current applications

| Candidate | Status under v2 |
| --- | --- |
| `tawaf-sai-seven-circuits-step-by-step-guide` | **Passes G1–G7.** G3 = owner request + reel gap; G6 = static. Plan: `docs/02-content/PLAN-tawaf-and-hajj-rites.md`. |
| `hajj-rites-mina-arafah-muzdalifah-day-by-day` | **Passes G1–G7.** G6 = seasonal. Same plan. |
| `/visa/saudi-arabia-visa` | **A page, not an article** — does not require G1–G7, but requires the same evidence standard and a named maintenance owner (fast-moving). Spec: `docs/02-content/SPEC-visa-saudi-arabia-visa.md`. |
| Bengali override for `umrah-dubai-10-day-combo-trip…` | **Defect fix**, not content. Do it first; it is cheap and it is currently wrong. |

## 8. Backlog rule

The queue lists orderings, not promises. An item enters only with G1 and G3
satisfied; it is written only when G2, G4, G5 and G6 can be met in the same
release. Anything that has sat in the queue for 90 days without a signal is
deleted, not carried.
