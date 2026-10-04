# 08 — Site Cleanup (files, code, weight)

**Perspective:** reduce risk, weight, and confusion. Ongoing hygiene.
**Prereqs:** none, but coordinate with [06-core-web-vitals.md](06-core-web-vitals.md) (bundle) — same battle from different angles.
**Feeds into:** [09](09-synchronization-maintenance.md).

---

## 1. First, the image "duplication" — it is NOT duplication

The owner noted "many images are stored twice." **Verified: they are not duplicates.** Two directories with different roles and **zero basename overlap:**

| Directory | Size | Count | Role |
|---|---|---|---|
| `public/assets` | 7.0 MB | 84 | Responsive **WebP** display images shown on pages |
| `public/img` | 6.9 MB | 41 | **JPG** social/OG cards at 1200×670 for `og:image`/`twitter:image` |

They serve different purposes (on-page display vs social-share preview) in different formats. **Do not delete either directory or try to merge them** — you'd break either page visuals or social sharing. If genuine byte-identical duplicates exist *within* a directory, that's a separate check (§3).

---

## 2. Line-ending noise (recurring, must be controlled)

The build has repeatedly shown `sitemap.xml`/`rss.xml` as "modified" with an empty diff — pure LF→CRLF churn from the build on Windows. This pollutes commits and can, in the worst case, produce an invalid sitemap ([01](01-indexing-crawling.md)).

**Fix once, properly (low risk):**
- Add a `.gitattributes` normalizing line endings, e.g. force `*.xml`, `*.txt`, `*.json` (and source files) to `LF`:
  ```
  * text=auto eol=lf
  *.xml text eol=lf
  *.txt text eol=lf
  ```
- This stops the phantom-diff churn and keeps generated files stable.
- Until then, the workaround is `git checkout -- public/sitemap.xml public/rss.xml` before committing to drop pure-EOL changes — but the `.gitattributes` fix is the right permanent solution.

---

## 3. Genuine duplicates & dead assets (audit, then act)

- **Byte-identical files:** hash all images (e.g., by content hash) and report any true duplicates *within* a directory. Remove only confirmed duplicates, and only after checking nothing references them.
- **Orphaned assets:** images/files not referenced anywhere in `src/` or the build output. Report the list; delete only after the owner confirms (medium risk — say so).
- **Oversized source images:** any display image far larger than its rendered size should be recompressed ([06](06-core-web-vitals.md) §3).

---

## 4. Code cleanup

- **`react-router-dom` is installed but unused** — the site routes via `window.history.pushState`/`navigateTo`, not react-router. Confirm it's truly unused (grep imports), then remove it from `package.json` to cut install weight and confusion. **Medium risk** (dependency change) — verify build after.
- **Phantom `motion` dependency:** `motion` is imported nowhere. It was correctly *excluded* from `manualChunks` (listing it would fail the Rollup build). If it's in `package.json` but unused, remove it; if it's not a dependency at all, ensure no config references it.
- **Dead code / unused exports:** run the linter and a dead-export check; remove what's provably unused. Don't over-prune shared utilities.
- **`constants.ts` monolith (~350 KB):** not "unnecessary," but its size is a CWV problem — see [06](06-core-web-vitals.md) §2 for the split strategy. Cleanup and performance meet here.

---

## 5. Config & meta files sanity

- `public/_headers`, `public/_redirects`, `public/_routes.json`, `functions/_middleware.js` — keep, they're load-bearing (caching, 301s, routing). **Don't "clean" these away.**
- Confirm `.gitignore` still ignores `.env*` (except `!.env.example`) and never tracks the parent-folder secret files (`Gemini AP Key.txt`, `Doamin.txt`). **Hard rule — never commit secrets** ([README](README.md) §0).
- The IndexNow key file `public/uralindexnow2026bangladesh83pages.txt` must stay (needed by [01](01-indexing-crawling.md) §3).

---

## 6. What NOT to remove (load-bearing — protect these)

- `emrld.ltd` script (revenue — [06](06-core-web-vitals.md) §5). **High risk — never remove without owner.**
- Either image directory (§1).
- `scripts/prerender.ts` and its outputs.
- Cloudflare config files (§5).
- The IndexNow key file.

---

## 7. Verification & success metric

- [ ] `.gitattributes` added; no more phantom EOL diffs.
- [ ] Confirmed-unused deps removed; `npm run build` still green.
- [ ] Orphaned-asset list produced and cleared with owner sign-off.
- [ ] No secret files ever staged (`git status` clean of them, always).
- **Success:** smaller `node_modules`, cleaner diffs, no accidental secret exposure, and a lighter bundle feeding [06](06-core-web-vitals.md).
