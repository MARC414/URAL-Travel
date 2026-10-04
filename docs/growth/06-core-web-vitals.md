# 06 — Core Web Vitals (remaining & advanced)

**Perspective:** the performance ranking factor and UX. Most P0 items are already fixed; this covers what's left.
**Prereqs:** none, but do after content exists ([03](03-content-topical-authority.md)) so you're not optimizing empty pages.
**Feeds into:** [09](09-synchronization-maintenance.md).

---

## 1. What's already fixed (commit 40cf42c) — don't regress

- **Asset caching (was the P0 bug):** `public/_headers` now serves `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`. Content-hashed bundles were previously served `max-age=0, must-revalidate` — every visit re-downloaded everything. **Never weaken this.**
- **Code splitting:** `vite.config.ts` uses **function-form** `manualChunks` matching resolved module paths. The object-form version silently failed (`react-dom/client` is a different module than `react-dom`), leaving ~190 KB of React DOM in the app chunk. Result: index chunk 1,414,637 → 901,531 bytes (−36%), `vendor-react` 193,814 B, `content-data` 330,321 B. **If you touch `manualChunks`, keep it function-form and rebuild-verify the chunk sizes.**
- **`<head>` order:** charset → viewport → LCP preload → font preconnects → metadata → gtag.js → `emrld.ltd` last.
- **`emrld.ltd`** downgraded from `preconnect` to `dns-prefetch`.

---

## 2. The remaining big win: the 901 KB index chunk

The app chunk is still ~901 KB (uncompressed; ~372 KB Brotli on the wire). Two heavy sources:

- **`App.tsx` ≈ 449 KB** — large monolith. Route components are *already* lazy-loaded (7 of them via `React.lazy`), which is good. Remaining work: split out any large inline data/JSX and ensure nothing forces all routes into the initial chunk.
- **`src/constants.ts` ≈ 350 KB** — all site content in one module, now isolated as the `content-data` chunk. It's still large and loads eagerly if imported at the top level.

### Advanced fixes (medium risk — say so, don't ask)
1. **Dynamic-import heavy blog bodies.** The full text of 41 posts shouldn't ship in the initial payload. Move long-form bodies to per-post modules (or JSON) loaded on demand when a post route renders. Biggest single reduction available.
2. **Split `constants.ts` by domain** (flights, hotels, visa, destinations, costs, blog) so each route only pulls its slice. Combine with route-level `React.lazy` (already present) so each route's data rides its own chunk.
3. **Confirm `content-data` isn't eagerly imported** by the initial route. If the homepage imports the whole `constants.ts`, the split doesn't help on first paint — import only what the homepage needs.
4. Keep `chunkSizeWarningLimit: 250` so regressions are visible in build output.

**Verify:** after each change, `npm run build` and compare chunk byte sizes in the Vite output. The initial (homepage) transfer should shrink.

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
