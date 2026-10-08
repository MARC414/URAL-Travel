# 01 — Google Indexing & Crawling

**Perspective:** getting all 83 pages indexed, not just the homepage.
**Prereqs:** none — this is the first thing to fix.
**Feeds into:** [02-internal-linking.md](02-internal-linking.md), [09-synchronization-maintenance.md](09-synchronization-maintenance.md).

---

## 1. The problem, stated precisely

Only the homepage (`/`) is indexed. Google has *discovered* the other URLs (they're in the sitemap and linked from the homepage) but files them under **"Discovered – currently not indexed"** or **"Crawled – currently not indexed"** and defers indexing.

This is **not** a technical blocker (there is no `noindex`, no robots block, canonicals are correct). It is a **priority/quality** decision by Google. A new site with no external authority gets a small crawl budget, and Google spends it on pages it judges most valuable. Right now that's only the homepage, because:

### Root cause A — internal-linking dead-ends (the big one)
Verified from the built `dist/`:
- Homepage prerenders **83 crawlable `<a href>` links** — the full site graph.
- **Each blog post prerenders exactly 1 internal link** (`href="/blog"`, "← Back to All 41 Bangladesh Travel Guides").
- The `/flights` hub prerenders only **6** links (its own child routes).

So link equity flows *into* the homepage and dies there. Deep pages are near-orphans. Google sees pages that nothing meaningfully links to and concludes they're low-priority. **Fix in [02-internal-linking.md](02-internal-linking.md) — this is the #1 lever.**

### Root cause B — thin content on hub/money pages
- `/flights` hub prerenders ~803 characters of body content vs the homepage's ~4,511.
- Thin pages are the exact profile Google leaves in "Crawled – currently not indexed."
- **Fix in [03-content-topical-authority.md](03-content-topical-authority.md).**

### Root cause C — no freshness signal in the sitemap
- `sitemap.xml` now carries a `<lastmod>` on every URL (done, §4). Google uses `<lastmod>` to prioritize crawl. The sitemap lists 171 URLs: 89 English and 82 Bengali (`https://ural-travel.pages.dev/bn/` is the Bengali home).
- **Fix below in §4.**

### Root cause D — the site is new with zero backlinks
- No external site vouches for these pages. **Fix in [07-backlinks-free.md](07-backlinks-free.md).**

> **Do not** blame the sitemap "not being fetched." Google's docs are explicit: a sitemap is a *discovery hint*, and "submitting a sitemap doesn't guarantee that all the items in your sitemap will be crawled and indexed." If GSC shows the sitemap as read (even "Couldn't fetch" that later clears), the sitemap is doing its job. Indexing is decided by A–D above, not by the sitemap.

---

## 2. Google Search Console — do this manually, once

These steps require a human with the Google account. A tool cannot verify domain ownership.

1. Go to https://search.google.com/search-console → **Add property**.
2. Choose **URL prefix**, enter `https://ural-travel.pages.dev/`.
3. Verify via the **HTML tag** method: GSC gives a `<meta name="google-site-verification" content="...">` tag.
   - **Where it goes:** add it to `index.html` `<head>` (it will prerender into every page, which is fine), **or** as a `_headers` / DNS TXT record. The meta tag in `index.html` is simplest — put it right after the `charset`/`viewport` block. Commit and deploy first, then click Verify.
4. Once verified: **Sitemaps** → submit `sitemap.xml` (enter just `sitemap.xml`).
5. **Request indexing for the homepage and top 5 money pages** via URL Inspection → Request Indexing. This nudges the queue; don't spam it.

### Why GSC may say "Couldn't fetch" the sitemap
Common, usually harmless causes — check in this order:
- **It was just submitted.** Fetch status can lag hours to a day. Re-check later before doing anything.
- **The URL you typed.** Submit `sitemap.xml`, not the full URL, not `/public/sitemap.xml`.
- **Cloudflare challenge / bot check** intercepting Googlebot. Verify `https://ural-travel.pages.dev/sitemap.xml` returns `200` with `Content-Type: application/xml` (or `text/xml`) using `curl -I`. It does today — confirmed live.
- **A stale/empty sitemap from a bad build.** Confirm the built `dist/sitemap.xml` has all 171 `<url>` entries after `npm run build`. Also confirm `https://ural-travel.pages.dev/bn/` returns `200` (not a redirect). The Bengali home is built to `dist/bn/index.html` so it matches the sitemap and canonical.
- **Line-ending noise** turning the file invalid — it is valid today; keep it that way (see [08-site-cleanup.md](08-site-cleanup.md) on CRLF/LF).

If it still says "Couldn't fetch" after 48h with a valid live `200` XML file, use **Validate/Retry** in GSC — it almost always clears. Do not rebuild the sitemap format chasing this; the format is correct.

---

## 3. Bing & IndexNow — free, fast, underused

- Add the property in **Bing Webmaster Tools** (https://www.bing.com/webmasters). You can *import* directly from GSC. Bing also feeds DuckDuckGo and (via crawl data) some AI answer engines.
- **IndexNow is half-wired and must be finished.** The key file already exists at `public/uralindexnow2026bangladesh83pages.txt`, but **nothing submits URLs**. This is a remaining task:

### Task: wire up IndexNow submission on deploy
- After every build/deploy, POST changed URLs to `https://api.indexnow.org/indexnow` with the key.
- Simplest implementation: a small step in `scripts/prerender.ts` (or a separate `scripts/indexnow.ts` run in the deploy pipeline) that, after generating the URL list, sends:
  ```
  POST https://api.indexnow.org/indexnow
  Content-Type: application/json
  { "host": "ural-travel.pages.dev",
    "key": "uralindexnow2026bangladesh83pages",
    "keyLocation": "https://ural-travel.pages.dev/uralindexnow2026bangladesh83pages.txt",
    "urlList": [ ...all 83 absolute URLs... ] }
  ```
- **Note:** the key file's *contents* must equal the key value in the URL/body. Verify the file contains exactly `uralindexnow2026bangladesh83pages` (matching the filename stem) — if it contains something else, use that.
- Bing, Yandex, Seznam, Naver honor IndexNow. Google does not consume it directly but it costs nothing.
- **Permission tier:** medium (adds a network call to the build). Say so in the commit, don't ask.

---

## 4. Add `<lastmod>` to the sitemap — required

`scripts/prerender.ts` builds `sitemap.xml`. It currently emits `<url><loc>` with no `<lastmod>`. Add one.

- **Best signal:** per-URL last-content-change date. If the route's content is data-driven from `src/constants.ts`, you likely don't have per-route timestamps — so use the next best thing.
- **Acceptable pragmatic approach:** use the build date (ISO 8601, `YYYY-MM-DD`) for all URLs, OR better, the git last-commit date of the source file that drives each route. Build date is fine to start.
- Also set realistic `<changefreq>` and `<priority>` (homepage/hubs `weekly`/`0.9`; blog posts `monthly`/`0.6`). These are weak hints but harmless.
- **Do not** fake future dates or bump `lastmod` on every build for unchanged pages — Google learns to distrust it. Only change `lastmod` when the page's content actually changed. (A build-date-for-all approach is acceptable initially but graduate to per-file git dates.)
- **Shipped (2 Oct 2026) — the graduated implementation, and why it is not a git lookup.** Data-driven pages now read `CONTENT_UPDATED` from [`src/data/contentMeta.ts`](../../src/data/contentMeta.ts), a committed date; blog posts keep their own exact `post.date`. The git-derived version this section recommended **failed in production**: Cloudflare Pages builds from a shallow checkout, so `git log` for `src/constants.ts` returned nothing and the code fell back to *today's* date — stamping the deploy date onto 77 of 159 URLs on rebuilds where nothing changed, while a locally-built sitemap (full history) disagreed with CI. A committed constant is identical in every environment and moves only on a real content change.
  - **Maintenance:** bump `CONTENT_UPDATED` whenever `src/constants.ts` or `src/data/bengaliContent.ts` changes materially. `prerender.ts` warns in the build log once the value is older than `CONTENT_UPDATED_MAX_AGE_DAYS` (180), so it cannot rot silently. Never make the value fresher than reality — the safe failure mode is staleness, not freshness.

**Verify:** after build, `dist/sitemap.xml` must show `<lastmod>` on every `<url>`, and two consecutive builds of an unchanged tree must produce a **byte-identical** `public/sitemap.xml` (`git diff --exit-code public/sitemap.xml`).

---

## 5. Prerendered-HTML checklist (run after every build)

Google's first wave reads static HTML. For each route in `dist/`, confirm:
- [ ] `<title>` and `<meta name="description">` are unique and route-specific (managed in `src/utils/seoCopy.ts`).
- [ ] `<link rel="canonical">` = the page's own absolute URL.
- [ ] `hreflang` self-reference is the page's own URL (fixed per-route in prerender as of `40cf42c`) — **not** the homepage.
- [ ] No `noindex` anywhere except intentionally on `/?admin`, `/?inspector`, `/?onboarding` (these are query-param states, already disallowed in robots.txt).
- [ ] Schema `@graph` `@id`s use the page's own URL as the base.
- [ ] Body content is present in the HTML source (not injected only by JS).

Automate this as a post-build script when time allows (see [09-synchronization-maintenance.md](09-synchronization-maintenance.md)).

---

## 6. What NOT to do

- Don't add `noindex` to "fix" duplicate-content fears — canonicals already handle that.
- Don't submit the sitemap repeatedly; once is enough, resubmit only after structural URL changes.
- Don't create doorway pages or programmatic thin pages to inflate the count — Google penalizes this and it's the opposite of what this niche needs.
- Don't emit `bn-BD` hreflang until real Bengali URLs exist (see [03](03-content-topical-authority.md)).

---

## 7. Order of operations (this file's mini-checklist)

1. [x] Add `<lastmod>` to sitemap (§4) — deploy.
2. [ ] Verify GSC + submit sitemap + request-index top pages (§2).
3. [ ] Add Bing, import from GSC (§3).
4. [ ] Wire IndexNow submission into deploy (§3).
5. [ ] Then go do [02-internal-linking.md](02-internal-linking.md) — that's what actually moves pages from Discovered → Indexed.
6. [ ] Re-check GSC Pages report weekly; log progress in [09](09-synchronization-maintenance.md).
