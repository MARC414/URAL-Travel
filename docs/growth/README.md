# URAL Growth Playbook — Master Index & Rules of Engagement

**Prepared:** 29 September 2026
**Site:** https://ural-travel.pages.dev/
**Audience:** any human or AI tool that works on this site after this document was written.
**Status of the code:** the fixes in [`../../SEO-AEO-AUDIT-2026-09.md`](../../SEO-AEO-AUDIT-2026-09.md) are already committed and live (commit `40cf42c`). This playbook covers everything that is **still remaining**, in the order it should be done.

---

## 0. Read this section before touching anything

This playbook is deliberately split into numbered files. Each file owns one perspective and links to the others where they interact. **Do not merge them, and do not do the work out of order** — the sequence is dependency-ordered, not arbitrary. Internal linking (02) is worthless before content depth (03); backlinks (07) are wasted on pages that aren't indexed (01).

### Hard rules — never violate these

These come from the security and correctness constraints established while building this site. A tool that breaks one of these is doing damage, not work.

1. **Never commit secrets.** The parent folder `E:\e-COMMERCE BUSINESS WEBSITE\URAL` contains `Gemini AP Key.txt` and `Doamin.txt`. Never `git add` them, never initialize git in that parent folder, never print their contents. `.env*` stays gitignored except `.env.example`.
2. **Never silently remove the `emrld.ltd` script.** It is the Travelpayouts affiliate revenue script and it hijacks native DOM methods. Its presence is a business decision the site owner must make, not a tool. See [06-core-web-vitals.md](06-core-web-vitals.md#emrld).
3. **Every URL is prerendered.** The build (`npm run build`) runs `scripts/prerender.ts`, which generates static HTML for all routes (173 as of 2026-10-13) plus `sitemap.xml` and `rss.xml`. **Metadata, canonical, hreflang, schema and internal links must be correct in the prerendered HTML, not just in React** — Google's first-wave crawl reads the static HTML. Any content change must be verified in `dist/` after a build, not just in the browser.
4. **Keep the four synchronization factors aligned** on every page: canonical URL, `og:url`/`twitter:url`, `hreflang` self-reference, and the schema `@id` graph must all point at the same URL. See [09-synchronization-maintenance.md](09-synchronization-maintenance.md).
5. **Verify before you claim.** After any change, run `npm run lint && npm run build`, then grep the built `dist/` output to confirm the change actually shipped. Never report a fix as done without checking the built HTML.
6. **Bengali content is not crawlable yet.** It is a client-side toggle with no distinct URL. Do not emit `bn-BD` hreflang until real Bengali URLs exist. See [01-indexing-crawling.md](01-indexing-crawling.md) and [03-content-topical-authority.md](03-content-topical-authority.md).
   - **Status update (2 October 2026):** resolved in commit `9146458`. The prerender now emits **83 crawlable `/bn/` routes** with reciprocal `hreflang` clusters and `inLanguage` schema (verified in `dist/sitemap.xml` and `dist/bn/**`). Bengali content **is** crawlable — link Bengali posts to `/bn/...` URLs.

### The three permission tiers (from the site owner's standing instructions)

- **Low risk — just do it:** editing content, adding internal links, fixing metadata, adding schema, writing new blog posts, image compression.
- **Medium risk — do it but say so:** installing dependencies, changing build config, refactoring `App.tsx`, deleting files.
- **High risk — stop and ask the owner first:** anything touching the affiliate script, deleting whole directories, changing routing architecture, publishing to external services, force-pushing.

---

## 1. The one-paragraph situation summary

The site is technically sound: prerendered, correct canonicals, a clean schema `@id` graph, Brotli compression, AI-crawler allowlisting, and (as of commit `40cf42c`) fixed asset caching, code splitting, `<head>` order, hreflang, robots.txt grouping, and `<html lang>` syncing. **What is holding back traffic is not technical SEO — it is authority:** there are **zero backlinks**, and it is not yet confirmed which pages Google has indexed.

> ### ⚠️ Re-measured against `dist/` on 2026-10-13 — read this before acting on §1's original diagnosis
>
> The paragraph above was rewritten after measurement. **Three of the four on-site problems this
> playbook was written to fix no longer exist**, and building against them would be wasted work:
>
> | Original diagnosis (29 Sept) | Measured in the built output (13 Oct) |
> |---|---|
> | "deep pages have almost no internal links" | **0 orphans.** Blog posts carry 29–33 unique internal links each; the homepage 105; 241 distinct internal URLs linked. |
> | "hub and route pages are thin" | Route pages carry **800–1,200 words** of prerendered copy with proper H1/H2/FAQ structure. |
> | implied duplicate-content risk | Pairwise 8-gram overlap between route pages is **0.4–0.9%** — none. |
> | "the Bengali audience has no indexable page" | **Resolved 2 Oct** (commit `9146458`): 83 crawlable `/bn/` routes with reciprocal hreflang (see §0 rule 6). |
>
> **What actually remains:** zero backlinks (file 07) and unverified indexing (file 01). The site
> builds **173 routes** (90 EN + 83 BN), not the 83 stated throughout this playbook.
>
> **One real outlier:** `dist/experiences.html` renders ~230 words against ~1,100 on comparable
> routes. Fixing that one page is worthwhile; re-running the internal-linking audit is not.
>
> **Before doing work from files 02, 03 or 04, open Google Search Console and look at the actual
> indexed-page count.** This playbook's diagnostic layer was written from an outside-in reading of
> the site and has since been falsified by its own build output. Verify the premise, then work.

---

## 2. File map — do them in this order

| # | File | Perspective | Why this order |
|---|---|---|---|
| 01 | [01-indexing-crawling.md](01-indexing-crawling.md) | **Google indexing** — why only the homepage is indexed, GSC setup, sitemap `lastmod`, IndexNow | Nothing else matters if pages aren't indexed. Start here. |
| 02 | [02-internal-linking.md](02-internal-linking.md) | **Internal linking** — page-by-page link graph, the exact fix for the blog dead-end problem | The single highest-leverage on-site fix. Feeds indexing directly. |
| 03 | [03-content-topical-authority.md](03-content-topical-authority.md) | **Content** — thin-page fixes, content upgrades, new articles for topical authority | Thin pages don't get indexed or rank; this is the fuel. |
| 04 | [04-keywords.md](04-keywords.md) | **Keywords** — audience-matched terms, intent mapping, extends the existing keyword map | Directs where 02 and 03 point. |
| 05 | [05-aeo-geo.md](05-aeo-geo.md) | **AEO / GEO** — being cited by ChatGPT, Perplexity, Google AI Overviews | This niche is answer-engine-friendly; big free upside. |
| 06 | [06-core-web-vitals.md](06-core-web-vitals.md) | **Core Web Vitals** — the remaining 901 KB bundle, image weight, INP | Ranking tiebreaker and UX; do after content exists to serve. |
| 07 | [07-backlinks-free.md](07-backlinks-free.md) | **Off-site authority** — free backlink methods that work for a Bangladesh travel site | Only worthwhile once pages are indexed and worth linking to. |
| 08 | [08-site-cleanup.md](08-site-cleanup.md) | **Hygiene** — duplicate images, unused deps, unnecessary files, code weight | Ongoing; reduces risk and weight. |
| 09 | [09-synchronization-maintenance.md](09-synchronization-maintenance.md) | **Synchronization & cadence** — keeping every SEO signal aligned, weekly/monthly routines | The routine that keeps 01–08 from rotting. |

> **10 is not a step in the sequence.** [`10-CONTENT-UPGRADE-STANDARD.md`](10-CONTENT-UPGRADE-STANDARD.md) is the
> standing acceptance contract for every article written or upgraded. Read it before starting any item in 03. It
> covers the three-file rule for metadata, the internal-linking minimums, the affiliate relevance matrix, the
> sources/external-link policy, the house voice, and what `npm run verify:build` now enforces. When it and a planning
> document disagree about *how a post must be wired*, file 10 wins; when they disagree about *what to build next*, the
> cluster plan wins.

---

## 2A. Content execution layer

The numbered files above are the technical growth playbook. Use these separate documents to plan and ship individual content updates; they do not replace or rewrite [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md), the plan of record:

- [CONTENT-OS.md](CONTENT-OS.md) — editorial evidence rules, bilingual stage gates, cluster sequencing, repository handoff, and release boundaries.
- [AI-WRITING-PROMPTS.md](AI-WRITING-PROMPTS.md) — copy-paste prompts for cluster planning, one-article-at-a-time drafting (with EN/BN twins), build verification, owner-approved publishing, and measurement.
- [CONTENT-QUEUE.md](CONTENT-QUEUE.md) — active work rows and claims ledgers; no volume/KD guesses.
- [UMRAH-CLUSTER-PLAN.md](UMRAH-CLUSTER-PLAN.md) — Umrah hub/spoke ownership, accuracy gates, and one-article-per-wave rollout.
- [BANKING-FOREX-CLUSTER-PLAN.md](BANKING-FOREX-CLUSTER-PLAN.md) — the money cluster opened 19 October 2026: `/banking` hub, five live node owners, the A1 M1–M5 evidence base, and the per-node gates.
- [A1-CLAIMS-LEDGER.md](A1-CLAIMS-LEDGER.md) — the shared money-cluster claims ledger (Bangladesh Bank facts M1–M5) that both the hub and every money node cites.
- [METHOD-NOTES.md](METHOD-NOTES.md) — primary-source research and the URAL adaptation of Koray Gübür and Nathan Gotch methods.
- [CONTENT-SYSTEM-V2.md](CONTENT-SYSTEM-V2.md) — 16 Oct 2026 upgrade: visual semantics/centerpiece rule, component-spec briefs, QD-Page/Heading/Section decisions, topical coverage-gap method, dual-modality sentence rules, and the tactics explicitly not adopted.
- [10-CONTENT-UPGRADE-STANDARD.md](10-CONTENT-UPGRADE-STANDARD.md) — the normative per-article acceptance contract: field locations, internal-linking minimums, affiliate relevance, sources and external links, voice, build proof, and the measured debt register.

> ### ⏸ SITE FROZEN — 24 October 2026
>
> On-site work stops at "technically correct + basic analytics"; effort moved to social
> distribution. **[`15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md`](15-SITE-FREEZE-AND-DEFERRED-BACKLOG.md)
> is now the queue of record** — it sequences everything still open in files 12, 13 and 14 and
> names the signal that re-opens each item. Read it before proposing any on-site work.
> **The one task that is still open:** [`17-GA4-MEASUREMENT-RUNBOOK.md`](17-GA4-MEASUREMENT-RUNBOOK.md)
> — ~15 minutes of GA4 console work (custom dimensions + key events) that must happen **before the
> first social post**, because GA4 never backfills a custom dimension. Part B of that file is the
> social cadence and the stop rules.
>
> The active execution plan for the distribution phase is
> **[`16-21-DAY-SOCIAL-MEDIA-PLAN.md`](16-21-DAY-SOCIAL-MEDIA-PLAN.md)** (opened 24 October 2026) —
> read it before proposing any social work.
>
> The measured inventory the freeze sits on is
> [`18-CONTENT-AUDIT-2026-10-24.md`](18-CONTENT-AUDIT-2026-10-24.md) — full repo + build inspection
> (352/352 checks, 260 routes). Its §6 surface ordering is analysis for the Day-22 review, not the
> locked decision in `16`.
>
> Companion records from the migration:
> [`12-POST-MIGRATION-ROADMAP.md`](12-POST-MIGRATION-ROADMAP.md) (phases),
> [`13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md`](13-POST-MIGRATION-STATUS-AUDIT-2026-10-24.md)
> (what is done vs open),
> [`14-DRIVE-REFERRAL-SYNDICATION-PLAN.md`](14-DRIVE-REFERRAL-SYNDICATION-PLAN.md)
> (Drive, program approvals, referral, syndication).

> ### Which document wins on "what do we build next?" — 15 October 2026, amended 19 October 2026
>
> The **active cluster plan** does, with its row in [`CONTENT-QUEUE.md`](CONTENT-QUEUE.md). Each topic keeps
> its own plan; where two plans disagree about *what to build next*, the one whose cluster the owner has most
> recently opened governs. Order of work today:
>
> 1. **Banking & Forex — opened 19 October 2026.** [`BANKING-FOREX-CLUSTER-PLAN.md`](BANKING-FOREX-CLUSTER-PLAN.md);
>    hub `/banking` + `/bn/banking`, then the five `Banking & Payments` node owners hardened and interlinked.
>    Evidence base is [`A1-CLAIMS-LEDGER.md`](A1-CLAIMS-LEDGER.md) M1–M5.
> 2. **Umrah cluster — plan valid, remaining waves paused by owner sequencing.**
>    [`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md); hub `/umrah` + `/bn/umrah` (wave 1), then the
>    already-verified main DIY guide (wave 2), then one bilingual child asset per wave. Opening the money
>    cluster does not close or cancel the Umrah waves; they resume when the owner re-prioritises them.
> 3. **Fard Hajj — separate, linked topic.** `hajj-registration-bangladesh-government-vs-private-package-cost`
>    is a peer page the Umrah guide links to; it is never an Umrah child.
> 4. **India — unscheduled gap.** [`CONTENT-STRATEGY-2026.md`](CONTENT-STRATEGY-2026.md) §6 ranks the
>    Dhaka↔Kolkata land route first and §12 opens with "Sprint 1 — the India pillar". That is the *gap
>    analysis*, not the *schedule*; §5, §6 and §12 now carry dated deferral notes. **A tool that recommends
>    Dhaka↔Kolkata as the first cluster is reading the strategy file's sprint list and missing the cluster plan.**
>
> These documents are tracked on `main` (merged in PR #36, 14 October 2026). If a checkout or another AI tool
> cannot see them, that checkout is stale or on another branch — refresh it (`git fetch && git pull`) rather than
> re-creating the files.

`CONTENT-OS.md`, `AI-WRITING-PROMPTS.md`, `CONTENT-QUEUE.md`, and `METHOD-NOTES.md` were reconstructed on 14 October 2026 because the prior session's versions and referenced commit were not present in the checkout. Treat them as current execution guidance, not as a verbatim recovery. `UMRAH-CLUSTER-PLAN.md` was prepared on 15 October from that guidance and the current repository inventory.

---

## 3. Definition of "done" for the whole playbook

The site is "100% optimized to rank and earn" when all of the following are true and verified:

- [ ] Google Search Console verified, sitemap submitted and showing "Success" with pages moving from Discovered → Indexed.
- [ ] ≥ 80% of the 83 URLs indexed (check GSC Pages report).
- [ ] Every page has ≥ 5 contextual internal links in and ≥ 5 out, in the **prerendered** HTML (see 02).
- [ ] No page under 1,000 words of prerendered body content on money/hub pages (see 03).
- [ ] Sitemap carries `<lastmod>` and IndexNow pings on every deploy (see 01).
- [ ] At least 10 quality free backlinks from relevant Bangladesh/travel sources (see 07).
- [ ] Core Web Vitals "Good" in CrUX for mobile (see 06).
- [ ] A Bengali URL strategy decided and, if pursued, `/bn/` pages live and interlinked (see 03).

Track this checklist in [09-synchronization-maintenance.md](09-synchronization-maintenance.md); update it as items complete.
