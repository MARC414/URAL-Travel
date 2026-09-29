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
3. **Every URL is prerendered.** The build (`npm run build`) runs `scripts/prerender.ts`, which generates static HTML for all 83 routes plus `sitemap.xml` and `rss.xml`. **Metadata, canonical, hreflang, schema and internal links must be correct in the prerendered HTML, not just in React** — Google's first-wave crawl reads the static HTML. Any content change must be verified in `dist/` after a build, not just in the browser.
4. **Keep the four synchronization factors aligned** on every page: canonical URL, `og:url`/`twitter:url`, `hreflang` self-reference, and the schema `@id` graph must all point at the same URL. See [09-synchronization-maintenance.md](09-synchronization-maintenance.md).
5. **Verify before you claim.** After any change, run `npm run lint && npm run build`, then grep the built `dist/` output to confirm the change actually shipped. Never report a fix as done without checking the built HTML.
6. **Bengali content is not crawlable yet.** It is a client-side toggle with no distinct URL. Do not emit `bn-BD` hreflang until real Bengali URLs exist. See [01-indexing-crawling.md](01-indexing-crawling.md) and [03-content-topical-authority.md](03-content-topical-authority.md).

### The three permission tiers (from the site owner's standing instructions)

- **Low risk — just do it:** editing content, adding internal links, fixing metadata, adding schema, writing new blog posts, image compression.
- **Medium risk — do it but say so:** installing dependencies, changing build config, refactoring `App.tsx`, deleting files.
- **High risk — stop and ask the owner first:** anything touching the affiliate script, deleting whole directories, changing routing architecture, publishing to external services, force-pushing.

---

## 1. The one-paragraph situation summary

The site is technically sound: prerendered, 83 unique pages, correct canonicals, a clean schema `@id` graph, Brotli compression, AI-crawler allowlisting, and (as of commit `40cf42c`) fixed asset caching, code splitting, `<head>` order, hreflang, robots.txt grouping, and `<html lang>` syncing. **What is holding back traffic is not technical SEO — it is depth and authority:** deep pages have almost no internal links pointing at them, hub and route pages are thin, there are zero backlinks, the sitemap has no freshness signal, and the Bengali audience has no indexable page. That is what this playbook fixes.

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
