# URAL — Technical SEO, AEO & Core Web Vitals Audit

**Site audited:** https://ural-travel.pages.dev/
**Audit date:** 28 September 2026
**Scope:** live production site (Cloudflare Pages) + source at `MARC414/URAL-Travel@main`
**Stack:** React 19 · Vite 6 · TypeScript · Tailwind 4 · Cloudflare Pages + Pages Functions

---

## 1. Executive summary

The site is in **much better technical shape than its previous audit**. Every one of the
earlier P0 defects — duplicate HTML across all 83 URLs, soft-404s, query-string
canonicals, missing structured data in the raw HTML — has been genuinely fixed and
verified live. Prerendering works, the entity graph is well-built, and AI crawlers are
already allowlisted.

What remained were **delivery-layer and Core Web Vitals problems**, not indexing
problems. The two most expensive defects were a missing cache rule for immutable assets
and a complete absence of code splitting. Both are now fixed in this change set.

| Severity | Count | Status |
| --- | --- | --- |
| P0 — Core Web Vitals | 2 | ✅ fixed |
| P1 — SEO / AEO correctness | 5 | ✅ 4 fixed · 1 flagged for owner decision |
| P2 — Entity & content quality | 3 | ✅ fixed |
| P3 — Hygiene | 2 | 📋 documented, no code change |

---

## 2. Verified as already fixed (regression check)

These were previously P0 blockers. All re-verified against the live site — **no action needed.**

| Check | Previous state | Verified 28 Sep 2026 |
| --- | --- | --- |
| Per-URL HTML | Byte-identical 19,774 B on all 83 URLs | Unique per route (22,318 / 19,316 / 16,565 B) |
| `<title>` per URL | Identical | Unique per route |
| Unknown URL response | HTTP 200 soft-404 | **HTTP 404** (correct) |
| `<link rel=canonical>` in raw HTML | absent | present, 1 per page |
| `ld+json` in raw HTML | absent | 2 blocks per page |
| Sitemap URL format | 71 of 83 were `?query=` style | **0** — all path-style |
| `/blog?slug=…` | served SPA shell (duplicate) | **301 → `/blog/<slug>`**, single hop |
| Article dates | hard-coded, identical everywhere | real per-post ISO dates with `+06:00` offset |
| Entity `@id` graph | one node only | full graph: `#organization`, `#website`, `#webpage`, `#article`, `#faq`, `#breadcrumb` |
| Compression | — | `content-encoding: br` on HTML, JS and CSS |
| AI crawler access | — | GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot allowed |

> **Note on two earlier suspicions that proved wrong.** Content *is* correctly
> prerendered (an earlier check missed it because blog pages emit
> `<div id="root"><main` with no whitespace). And JS *is* Brotli-compressed (a curl
> measurement had auto-decompressed the response).

---

## 3. P0 — Core Web Vitals defects (fixed)

### 3.1 Content-hashed assets were served `max-age=0, must-revalidate`

**Verified live:**

```
GET /assets/index-BAZjQAaJ.js
cache-control: public, max-age=0, must-revalidate
```

`public/_headers` contained rules for `sitemap.xml`, `rss.xml` and `robots.txt` **but no
rule for `/assets/*`**, so Cloudflare Pages applied its conservative default.

**Why this is severe.** Vite emits content-hashed filenames — the hash changes whenever
the bytes change, so the file at any given URL is immutable forever. Serving it with
`must-revalidate` forces a network round-trip to revalidate the main JS and CSS bundle on
**every repeat visit and every internal navigation**, directly inflating FCP and LCP for
returning users. This is the single highest-ROI fix on the site: one file, measurable
improvement for all returning traffic.

**Fixed** in [`public/_headers`](public/_headers):

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

Rule ordering matters here — Pages applies the *first* matching rule per header name, so
the specific immutable-asset rules must precede the `/*` fallback. The fallback keeps
prerendered HTML fresh (`max-age=0, must-revalidate`) because HTML content changes
without a URL change, with `stale-while-revalidate=60` to keep TTFB low.

### 3.2 Vendor code and content were trapped in the app chunk

**Correction to the figure quoted earlier in this engagement.** The 372,791 bytes measured
on the live site is the *Brotli-compressed* transfer size. The actual uncompressed bundle
is **1,414,637 bytes** — roughly 3.8× larger than first reported. Uncompressed size is
what governs parse and compile cost on the main thread, so the TBT impact is
correspondingly larger than the transfer figure suggests.

Route-level splitting was **already in place** — `App.tsx` lazy-loads `UmrahLandingPage`,
`ExperiencesPage`, `SitemapPage`, `InteractiveTools`, `TopicalAuthorityBlueprint`,
`TravelpayoutsOnboarding` and `PriceAlertModal` via `React.lazy`, and images already carry
`loading="lazy"`. Credit where due; the earlier audit note claiming no code splitting was
wrong.

What was *not* split was React itself and the content corpus. `vite.config.ts` had no
`build` section at all, so both sat in the entry chunk.

A first attempt using the object form of `manualChunks` barely helped — it produced a
`vendor-react` chunk of only **3,899 bytes**. The object form matches a package's *entry*
module, but `main.tsx` imports `react-dom/client`, which is a different module from
`react-dom`, so all ~190 KB of React DOM stayed in the app chunk. Matching on the resolved
module path instead catches every submodule.

**Measured result of the fix:**

| Chunk | Before | After |
| --- | --- | --- |
| `index` (app) | 1,414,637 B | **901,531 B** (−36%) |
| `vendor-react` | 3,899 B | 193,814 B |
| `content-data` | — | 330,321 B |

Total bytes are essentially unchanged — this is a *caching and invalidation* fix, not a
payload-reduction fix. React now stays cached across every deploy, and `src/constants.ts`
(≈350 KB of blog and route content) caches independently of component code, so editing a
component no longer invalidates the content for returning visitors. Paired with §3.1's
`immutable` header, a returning visitor now re-downloads only what actually changed.

`chunkSizeWarningLimit: 250` makes future size regressions fail loudly.

> **Note:** `motion` is listed in `package.json` but imported nowhere. Naming it in
> `manualChunks` would have failed the Rollup build — caught by grep before the first
> build ran. See §6.1.

### 3.2b Remaining: 901 KB app chunk is dominated by two monolithic files

This is now the **largest remaining Core Web Vitals issue**, and it is a refactor rather
than a config change, so I have not attempted it:

- `src/App.tsx` — **449 KB of source** in a single file
- `src/constants.ts` — **350 KB of source** (41 blog posts, all route content)

Because every page is prerendered, this JavaScript does not block FCP or LCP — the HTML
already carries the content. It costs **TBT and INP**: the main thread must parse,
compile and hydrate ~900 KB before the page becomes responsive, which is punishing on
mid-range Android over a Bangladeshi mobile network.

**Recommended approach, in value order:** load per-post blog bodies via dynamic
`import()` keyed on slug (the prerendered HTML already contains the text, so hydration is
the only consumer); then break `App.tsx`'s per-route JSX into the route components that
are already lazy-loaded. Both need careful testing against hydration mismatches, which is
why they are a follow-up rather than part of this pass.

### 3.3 `<head>` ordering starved the LCP image

`gtag.js` was the **very first element in `<head>`**, above `<meta charset>`. Two
distinct problems:

1. **Correctness** — `<meta charset>` should land within the first 1024 bytes; the
   analytics block pushed it to line 13.
2. **Performance** — on a cold connection the browser has a limited number of
   connections. Opening one to `googletagmanager.com` *before* the hero-image preload was
   issued put roughly 90 KB of analytics JavaScript ahead of the LCP resource, and its
   parse/compile added to TBT before first paint.

**Fixed** in [`index.html`](index.html). Order is now: `charset` → `viewport` → LCP
preload → font preconnects → metadata → analytics and affiliate tags last. The
`emrld.ltd` `preconnect` was also downgraded to `dns-prefetch`, which warms DNS without
holding a TLS connection the critical path needs.

---

## 4. P1 — SEO & AEO correctness

### 4.1 Bengali content has no indexable URL (strategic — needs your decision)

This is the most consequential finding in the audit and it is **not a bug I can fix in a
config file.**

`LanguageSwitcher` is a pure client-side React state toggle. It does not change the URL,
and `src/` contains no router (`react-router-dom` is installed but never imported). The
prerendered HTML contains **English only**. Consequences:

- Every word of Bengali content is invisible to Google, Bing and every AI crawler.
- There is no URL that could ever rank for a Bengali query.
- `hreflang` cannot legitimately declare `bn-BD`, because no Bengali URL exists to point at.

**What I did:** added *correct* self-referential hreflang (`en-bd` + `x-default`) rather
than the `en-BD`/`bn-BD`/`x-default` triple originally planned. Declaring two languages
for one URL is self-contradictory and Search Console reports it as an error, so it would
have been worse than nothing.

**What you should do** if Bengali traffic matters — this is a real project, not a config
tweak: serve Bengali from distinct URLs (`/bn/…`), prerender those routes, then add
reciprocal `hreflang` between each `en`/`bn` pair. Bengali-language travel search from
Dhaka is a genuinely under-served query space, so the upside is real.

### 4.2 robots.txt named groups silently disabled the disallow rules

A subtle and easy-to-miss defect. robots.txt groups **do not merge** — a crawler obeys
only the single most specific `User-agent` group that matches it and ignores all others,
including `*`. The file read:

```
User-agent: *
Allow: /
Disallow: /?admin
Disallow: /?inspector
Disallow: /?onboarding

User-agent: Googlebot
Allow: /            # ← this group is complete in itself
```

So **Googlebot and every named AI crawler were exempt from all three disallows** and free
to crawl the admin, inspector and onboarding views. The explicit allowlist had quietly
undone the protections above it.

**Fixed** in [`public/robots.txt`](public/robots.txt): every group now repeats the full
rule set (with a comment explaining why that duplication must not be "tidied away"), and
the AEO allowlist is widened to cover `ChatGPT-User`, `Claude-SearchBot`,
`Perplexity-User`, `meta-externalagent`, `Amazonbot`, `MistralAI-User`, `DuckAssistBot`,
`cohere-ai`, plus `Applebot` and `Googlebot-Image`.

### 4.3 `<html lang>` never updated on language switch

`index.html` hard-codes `lang`, and nothing in `src/` ever assigns
`document.documentElement.lang`. Switching the UI to Bengali left the document claiming
English, so screen readers applied English pronunciation to Bengali text — **WCAG 3.1.1 /
3.1.2 failure**.

**Fixed** in [`src/App.tsx`](src/App.tsx) with an effect keyed on `lang`, and the static
attribute is now `en-BD` so it matches `inLanguage` in the schema graph and does not flip
at hydration.

### 4.4 hreflang absent entirely

No `hreflang` existed anywhere on the site. Added to `index.html` **and** to the
per-route rewrite in [`scripts/prerender.ts`](scripts/prerender.ts) — without the second
half, all 83 pages would have declared the homepage as their alternate, which Search
Console reports as "no return tag" and discards wholesale.

### 4.5 `emrld.ltd` third-party script — flagged, not removed

**I have deliberately not removed this.** It is the Travelpayouts affiliate script and
therefore plausibly load-bearing for revenue — that is your call, not mine.

You should nonetheless know what it does: it **hijacks native DOM methods** at runtime.
That is a legitimate technique for affiliate link rewriting, but it means the script can
observe and modify any part of the page, it is an unaudited third party on every page
load, and it contributes to INP. It is already `async` with an `onerror` guard, and I
downgraded its `preconnect` to `dns-prefetch` so it no longer competes for a connection
on the critical path. If you can scope it to only the pages carrying affiliate links,
that would cut its cost substantially.

---

## 5. P2 — Entity & content quality (fixed)

### 5.1 Homepage FAQ duplicated `/umrah` content three ways

`scripts/prerender.ts` appended `...HAJJ_UMRAH_FAQS.slice(0, 2)` to the homepage FAQ set.
The same array is emitted **in full** on `/umrah` (line 188) and on **every** Hajj/Umrah
blog post (line 886) — so those two Q&A pairs appeared at three different URLs.

This matters more for AEO than for classic SEO. Google has largely retired FAQ rich
results for non-authoritative domains, but answer engines actively parse `FAQPage` and
**select one canonical URL per answer**, discarding the duplicates. Duplicated Q&A
pairs mean the homepage competes against its own topic hub and usually loses.

**Fixed:** replaced with two homepage-scoped questions — visa-free destinations for
Bangladeshi passport holders, and an explicit "is URAL a travel agency?" answer. The
second is deliberate AEO framing: it states plainly that URAL is an independent
intelligence desk that links to source booking, which is exactly the disambiguation an
answer engine needs to describe the brand correctly.

### 5.2 `WebPage.image` unresolved

`webPageSchema()` inlined an `ImageObject` under `primaryImageOfPage` with **no `@id`**
and provided no `image` property. Parsers treat an un-`@id`'d inline node as a distinct
entity, so the page's image was not consolidated.

**Fixed** in [`src/utils/schema.ts`](src/utils/schema.ts): the `ImageObject` now carries a
stable `@id` (`<url>#primaryimage`) plus `contentUrl`, and both `primaryImageOfPage` and
`image` reference it by `@id` — one image entity per page instead of two.

### 5.3 Analytics parse cost before first paint

Covered by §3.3 — resolved by the `<head>` reorder.

---

## 6. P3 — Hygiene (documented, no code change)

### 6.1 Five unused production dependencies

`@google/genai`, `react-router-dom`, `express`, `dotenv` and `motion` are listed under
`dependencies` but **never imported anywhere** in the repo (verified by full-tree grep for
each module specifier).

They do **not** ship in the bundle — Vite tree-shakes modules that are never imported —
so this is not a Core Web Vitals issue. It is install-time weight and needless
supply-chain surface. `@google/genai` in particular is large. Removing them is safe but I
left `package.json` alone, since `express` and `dotenv` may be intended for a local dev
server you run outside this repo.

`motion` being a phantom dependency had one concrete consequence: my first version of the
`manualChunks` config listed it as a vendor chunk, which would have **failed the Rollup
build**, since a manual-chunk entry naming a module outside the graph is an error. Caught
and removed before commit.

### 6.2 `_routes.json` invokes a Worker on six hub pages

```json
{ "version": 1, "include": ["/flights","/hotels","/visa","/destinations","/costs","/blog"] }
```

This is correctly scoped — narrowing `include` is exactly right, and it keeps the Function
off the other 77 routes. The residual cost is that `/flights` and the five sibling hubs
pay a Worker invocation even without a legacy query string, since `_middleware.js` falls
through to `context.next()`. TTFB measured **0.698 s**, which is acceptable but not
excellent. Not worth changing: the 301 consolidation it buys is worth more than the few
milliseconds it costs.

---

## 7. Changes made in this pass

| File | Change |
| --- | --- |
| `public/_headers` | `/assets/*` → `max-age=31536000, immutable`; brand/favicon TTLs; security headers on `/*` |
| `vite.config.ts` | added `build` block: `manualChunks` vendor split, `chunkSizeWarningLimit: 250`, `cssCodeSplit` |
| `index.html` | `<head>` reordered (charset → viewport → LCP preload → … → analytics last); hreflang added; `emrld.ltd` preconnect → dns-prefetch; `lang="en-BD"` |
| `scripts/prerender.ts` | per-route hreflang rewrite; homepage FAQ de-duplicated |
| `src/utils/schema.ts` | `ImageObject` given stable `@id`; `image` now references it |
| `src/App.tsx` | effect syncs `document.documentElement.lang` with the language toggle |
| `public/robots.txt` | disallow rules repeated per group (fixes the override bug); AEO allowlist widened |

---

## 8. Build verification

`npm run lint` (`tsc --noEmit`) passes with **zero errors**. `npm run build` succeeds and
regenerates all 83 prerendered routes, `sitemap.xml`, `rss.xml`, `og-image.jpg` and 41
optimized blog JPEGs.

Verified in the built output, not just the source:

| Check | Result |
| --- | --- |
| `<meta charset>` byte offset | **621** (was ~50 before gtag; must be < 1024) |
| gtag.js byte offset | **9,108** (moved off the critical path) |
| `<html lang>` | `en-BD` |
| Per-route hreflang | rewrites correctly — blog page declares its own URL, not the homepage |
| Homepage FAQ | 4 questions, **zero** Hajj/Umrah duplicates |
| `WebPage.image` | resolves to `#primaryimage`, matching `primaryImageOfPage` |
| `dist/_headers` | `/assets/*` → `max-age=31536000, immutable` present |
| Deploy artifacts | `_headers`, `_routes.json`, `robots.txt`, `sitemap.xml` all emitted |

---

## 9. Recommended next steps, in order of value

1. **Deploy and re-measure.** The `_headers` and chunking fixes only take effect on
   deploy. Confirm `cache-control: immutable` on `/assets/*` and that `vendor-react`,
   `content-data` and `index` arrive as separate chunks.
2. **Decide on Bengali URLs** (§4.1). Largest untapped opportunity; needs product input.
3. **Split `App.tsx` and `constants.ts`** (§3.2b). Largest remaining CWV work — a real
   refactor, best done with hydration testing.
4. **Scope `emrld.ltd` to affiliate pages only** (§4.5), if revenue attribution allows.
5. **Field data.** Everything here is lab analysis plus live header inspection. Once
   Search Console and CrUX have 28 days post-deploy, check real-user LCP and INP — CrUX
   is the only source reflecting actual Bangladeshi mobile conditions, which no lab test
   approximates well.
6. **Drop the five unused dependencies** (§6.1) once you have confirmed `express` and
   `dotenv` aren't used by an external dev script.
