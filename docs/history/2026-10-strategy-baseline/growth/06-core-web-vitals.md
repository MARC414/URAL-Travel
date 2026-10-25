> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.**
>
> Archived 25 October 2026: former performance plan. Bundle sizes and load-order claims are historical; the old affiliate preconnect instruction conflicts with the current consent-gated implementation. Do not restore it.
> Current authority: [strategy index](../../../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../../../00-URAL-CURRENT-AUDIT.md).

# 06 — Core Web Vitals (remaining & advanced)

**Perspective:** the performance ranking factor and UX. Most P0 items are already fixed; this covers what's left.
**Prereqs:** none, but do after content exists ([03](03-content-topical-authority.md)) so you're not optimizing empty pages.
**Feeds into:** [09](09-synchronization-maintenance.md).

---

## 1. What's already fixed (commit 40cf42c) — don't regress

- **Asset caching (was the P0 bug):** `public/_headers` now serves `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`. Content-hashed bundles were previously served `max-age=0, must-revalidate` — every visit re-downloaded everything. **Never weaken this.**
- **Code splitting:** `vite.config.ts` uses **function-form** `manualChunks` matching resolved module paths. The object-form version silently failed (`react-dom/client` is a different module than `react-dom`), leaving ~190 KB of React DOM in the app chunk. Result: index chunk 1,414,637 → 901,531 bytes (−36%), `vendor-react` 193,814 B, `content-data` 330,321 B. **If you touch `manualChunks`, keep it function-form and rebuild-verify the chunk sizes.**
- **`<head>` order:** charset → viewport → LCP preload → font preconnects → metadata → gtag.js → `emrld.ltd` last.
- **Cache policy (v2, 2026-10-04 night):** `/assets/*`, `/fonts/*` and `/assets/brand/svg/*` are `max-age=31536000, immutable`. Anything served immutable must be *immutable by name*: our fonts and brand SVGs are versioned (`inter-400-v1.woff2`, `ural-wordmark-v1.svg`) because they are not content-hashed — bump the `-vN` suffix before editing them, and note that `npm run verify:build` fails otherwise. Favicons stay at 7 days on purpose (favicon caches do not reliably revalidate). Lighthouse's *efficient cache lifetimes* audit flags **anything under 30 days**, which is why the earlier 7-day font rule still appeared in reports.
- **`emrld.ltd`** carries a `preconnect` **without** `crossorigin` (it was briefly downgraded to `dns-prefetch`, then restored as a preconnect). The missing `crossorigin` is deliberate: the affiliate script is injected as a plain async `<script>`, so it performs a no-cors request and could never reuse a CORS-mode connection — which is exactly what Lighthouse reports as an "unused preconnect".

---

## 2. Homepage first-load and route chunks (implemented 2026-10-11)

The homepage now serves its hero image, visible heading/copy, and primary links in
static HTML before React mounts. Inter 700 is preloaded on `/` only. The Travelpayouts
30-day chart is a separate ~110 KB gzip chunk requested only after a visitor opens it.
All 11 non-home route views use route-specific lazy chunks. Content records use a
small eager slug/count index; the 201.7 KB minified `content-data` chunk is fetched
only after a content-backed route is requested.

`npm run verify:build` measures the eager homepage JavaScript and fails above the budget;
it also asserts the static hero copy/CTAs, route chunks, chart deferral, and that
`content-data` is not preloaded by the homepage.

**Budget history (measured, never projected):** 181.6 KB when this section was written;
199.9 KB on `origin/main` on 19 October 2026, after the Umrah wave, leaving 0.1 KB of
headroom. The budget was therefore raised from 200 KB to **205 KB** on 19 October 2026, when
the Banking & Forex hub route and the single-sourced homepage FAQ (`src/data/homeFaqs.ts`)
measured 201.5 KB. The hub's own FAQ payload was moved into its lazy chunk before the raise
— the remaining 1.6 KB (route branch, SEO copy, homepage FAQ data, hub icons) is genuinely
eager, because React clears `#root` and the homepage FAQ has to be rendered by React rather
than left in the pre-hydration markup. This is a build measurement, not a post-deploy
Lighthouse/CrUX score; remeasure the live site after deployment.

### Next measurement
- Use PageSpeed Insights / Lighthouse on the deployed homepage and record LCP/TBT/INP.
- Keep `chunkSizeWarningLimit: 250` so regressions in route-only chunks remain visible.

---

## 3. Images

- `public/assets` = 84 responsive WebP display images (7.0 MB); `public/img` = 41 JPG social/OG cards at 1200×670 (6.9 MB). **These are NOT duplicates** — different roles. See [08-site-cleanup.md](08-site-cleanup.md) before "de-duplicating" anything.
- **Advanced image work:**
  - Ensure every `<img>` has explicit `width`/`height` (or `aspect-ratio`) to keep **CLS = 0**.
  - LCP image is preloaded (done in `<head>`) — confirm it's the *actual* largest element per route; the preload currently targets one image and may be homepage-specific.
  - Use `loading="lazy"` on below-the-fold images, `fetchpriority="high"` only on the LCP image.
  - `srcset`/`sizes` for responsive serving (the WebP set exists — make sure it's wired to `srcset`).
  - Consider AVIF alongside WebP for further savings (optional).

---

## 4. INP / interactivity

- The `emrld.ltd` script hijacks native DOM methods and can inflate INP/TBT. It's loaded last, which helps. **Measure its INP cost** in a Lighthouse trace; if severe, discuss `async`/defer strategy with the owner. **Do not remove it** (revenue — [§5](#emrld)).
- Avoid long tasks on interaction; keep event handlers light.
- gtag.js is standard; keep it after content, before `emrld.ltd`.

---

## 5. <a id="emrld"></a>The `emrld.ltd` script — standing constraint

- It is the **Travelpayouts affiliate revenue script**. It **hijacks native DOM methods** (a documented behavior of this script family).
- **Never silently remove it.** Its cost/benefit is a business decision for the site owner. A tool may *measure* and *report* its performance impact and *propose* options (defer, conditional load), but must not delete or disable it without explicit owner approval. **High risk — always ask.**

---

## 6. Measurement & success metric

- **Measure real users:** GSC → Core Web Vitals report (CrUX field data) is what Google actually ranks on. Lighthouse is lab-only — use it for diagnosis, not the verdict.
- Targets (mobile, 75th percentile): **LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.**
- [ ] Initial homepage transfer reduced after §2 work (verify in build output + PageSpeed Insights).
- [ ] CLS = 0 (all images sized).
- [ ] GSC CWV report shows all URLs "Good" for mobile.
- **Do this after content depth ([03](03-content-topical-authority.md)) and indexing ([01](01-indexing-crawling.md))** — a fast empty page ranks for nothing.
