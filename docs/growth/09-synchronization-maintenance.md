# 09 — Synchronization & Maintenance Cadence

**Perspective:** keeping every signal aligned and preventing the work in 01–08 from rotting.
**Prereqs:** all other files — this is the routine that maintains them.
**Feeds into:** everything (this is the loop that keeps it all healthy).

---

## 1. The synchronization factors — must always agree

For **every** route, these must point at the **same** absolute URL. A mismatch causes duplicate-content confusion, wrong-page indexing, or lost equity. This is the #1 thing to re-verify after any change.

| Signal | Where it lives | Must equal |
|---|---|---|
| Canonical `<link rel="canonical">` | prerendered `<head>` (via `scripts/prerender.ts`) | the page's own URL |
| `og:url` / `twitter:url` | prerendered `<head>` | the page's own URL |
| `hreflang` self-ref (`en-bd`) + `x-default` | prerendered `<head>` (rewritten per-route as of 40cf42c) | the page's own URL (NOT homepage) |
| Schema `@id` graph base (`#webpage`, `#article`, etc.) | `src/utils/schema.ts` | the page's own URL |
| Visible breadcrumb `<a href>` | component | match `BreadcrumbList` schema URLs ([02](02-internal-linking.md)) |
| `<html lang>` | `index.html` static = `en-BD`; runtime synced to `bn-BD`/`en-BD` | the page's actual language |
| Sitemap `<loc>` | `scripts/prerender.ts` | the canonical URL (with `<lastmod>` — [01](01-indexing-crawling.md) §4) |
| Title/description | `src/utils/seoCopy.ts` | unique per route, matches target keyword ([04](04-keywords.md)) |

**Golden rule:** these are all derived from one thing — the route's own URL. When you add a route, make sure the prerender pipeline generates *all* of these for it, self-referentially. When you change a URL, 301 the old one (`public/_redirects`) and update every signal.

---

## 2. The build-and-verify loop (run after EVERY change)

Never claim a change is done without this:

```bash
npm run lint
npm run build
```

Then verify in the built output (not just the browser — Google reads the static HTML):
- Grep `dist/` for the specific change you made (new link, new content, corrected canonical).
- Spot-check `dist/sitemap.xml` has all 83 `<url>` with `<lastmod>`.
- For SEO-signal changes, confirm all §1 factors still agree on 2–3 sample routes.

If lint/build fails, **fix it before reporting** — a broken build ships nothing.

---

## 3. Cadence — the recurring routines

### On every deploy (automate where possible)
- [ ] Build + verify (§2).
- [ ] Sitemap `<lastmod>` updated only for genuinely changed pages ([01](01-indexing-crawling.md) §4). If this deploy changed `src/constants.ts` or `src/data/bengaliContent.ts`, **bump `CONTENT_UPDATED` in [`src/data/contentMeta.ts`](../../src/data/contentMeta.ts)** in the same commit — otherwise the changed pages keep an old date.
- [ ] `git status` shows no diff in `public/sitemap.xml` / `public/rss.xml` after a build that changed no content (proof `<lastmod>` is stable, not build-stamped).
- [ ] IndexNow ping for changed URLs ([01](01-indexing-crawling.md) §3).
- [ ] No secret files staged ([08](08-site-cleanup.md) §5).

### Weekly
- [ ] GSC → **Pages** report: are deep pages moving Discovered/Crawled → Indexed? (Measures [01](01-indexing-crawling.md)+[02](02-internal-linking.md) working.)
- [ ] GSC → **Performance**: new impression queries → feed back into [04](04-keywords.md); fix high-impression/low-CTR titles.
- [ ] Ship 2–4 interlinked content pieces ([03](03-content-topical-authority.md)).
- [ ] Log community/backlink activity ([07](07-backlinks-free.md)).

### Monthly
- [ ] GSC → **Core Web Vitals** (CrUX): all "Good" on mobile? ([06](06-core-web-vitals.md))
- [ ] GSC → **Links**: referring domains growing? ([07](07-backlinks-free.md))
- [ ] Schema validation pass on new pages ([05](05-aeo-geo.md) §4).
- [ ] Refresh dated content (prices, visa rules) + bump `lastmod` for those pages only ([03](03-content-topical-authority.md) §6).
- [ ] Duplicate/orphan asset audit ([08](08-site-cleanup.md) §3).

### Quarterly
- [ ] Re-evaluate the Bengali `/bn/` URL decision ([03](03-content-topical-authority.md) §5).
- [ ] Full prerendered-HTML checklist across all routes ([01](01-indexing-crawling.md) §5).
- [ ] Review `emrld.ltd` performance impact with owner ([06](06-core-web-vitals.md) §5).

---

## 4. The master progress checklist (single source of truth)

Keep this updated — it's the "are we done?" from [README](README.md) §3:

- [ ] GSC verified, sitemap submitted & succeeding.
- [ ] ≥ 80% of 83 URLs indexed.
- [ ] Every page: ≥ 5 internal links in and ≥ 5 out, in `dist/` HTML ([02](02-internal-linking.md)).
- [ ] No hub/money page under 1,000 words ([03](03-content-topical-authority.md)).
- [ ] Sitemap `<lastmod>` + IndexNow live on every deploy ([01](01-indexing-crawling.md)).
- [ ] ≥ 10 quality referring domains ([07](07-backlinks-free.md)).
- [ ] CWV "Good" mobile in CrUX ([06](06-core-web-vitals.md)).
- [ ] Bengali URL strategy decided/shipped ([03](03-content-topical-authority.md)).
- [ ] `navigateTo` buttons converted to anchors ([02](02-internal-linking.md) §5).
- [ ] `.gitattributes` line-ending fix ([08](08-site-cleanup.md) §2).
- [ ] IndexNow submission wired ([01](01-indexing-crawling.md) §3).

---

## 5. Rules of engagement recap (for any tool picking this up)

1. **Order matters:** [01](01-indexing-crawling.md) → [02](02-internal-linking.md) → [03](03-content-topical-authority.md) → [04](04-keywords.md) → [05](05-aeo-geo.md) → [06](06-core-web-vitals.md) → [07](07-backlinks-free.md), with [08](08-site-cleanup.md)+[09](09-synchronization-maintenance.md) ongoing.
2. **Verify in `dist/`, not the browser.** Google reads prerendered HTML.
3. **Never commit secrets; never remove `emrld.ltd`; never delete either image dir** without owner sign-off ([README](README.md) §0 hard rules).
4. **Respect the permission tiers** ([README](README.md) §0): low = do it, medium = do it and say so, high = ask first.
5. **Keep all §1 sync factors aligned** on every route, always.
6. **Measure with GSC field data**, not lab tools, for the verdict.
7. When reporting work: run lint+build, grep `dist/` to confirm, then state plainly what shipped and what's verified.

---

## 6. Attribution for commits (from tooling policy)

Commits made while following this playbook should end with:
```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```
Pull request descriptions should end with:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
Never amend/force-push shared history; always push to a branch, never directly to `main` unless explicitly told.
