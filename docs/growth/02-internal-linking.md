# 02 — Internal Linking (page by page, line by line)

**Perspective:** the single highest-leverage on-site fix. Turns the homepage's crawl equity into indexed deep pages.
**Prereqs:** understand [01-indexing-crawling.md](01-indexing-crawling.md) §1 root cause A.
**Feeds into:** [01](01-indexing-crawling.md) (indexing), [03](03-content-topical-authority.md) (content gives you things to link to), [04](04-keywords.md) (anchor text).

---

## 1. The core rule you must internalize

**Only `<a href="...">` links pass crawl equity. `<button onClick={navigateTo(...)}>` does not.**

This site navigates with `window.history.pushState` via a `navigateTo()` helper. Several internal-linking UI elements — notably the "Also Plan For This Trip" cross-sell sections — are rendered as `<button onClick>`, **not** anchors. To a user they look like links. To Googlebot they are invisible dead ends: no `href`, no crawl, no equity.

**Every internal navigation that should pass SEO value must render as a real `<a href="/route">` in the prerendered HTML**, even if it *also* calls `navigateTo()` via `onClick` (intercept the click for SPA behavior, but keep the real `href` so crawlers and "open in new tab" work). The pattern:

```tsx
// GOOD — crawlable AND SPA-fast
<a
  href={route}
  onClick={(e) => { e.preventDefault(); navigateTo(route); }}
>
  {label}
</a>

// BAD — invisible to Google, breaks middle-click / new-tab
<button onClick={() => navigateTo(route)}>{label}</button>
```

Do this everywhere internal navigation happens. Audit `App.tsx` and every component for `onClick={() => navigateTo` and `onClick={() => navigateTo(...)` on non-anchor elements. **Convert them all to anchors.** This is low-risk content work.

---

## 2. The current link graph (verified from `dist/`)

| Page type | Internal `<a href>` links OUT | Verdict |
|---|---|---|
| Homepage `/` | 83 (full graph) | Over-linked hub; fine |
| Blog post (each of 41) | **1** (`/blog` back-link only) | **Critical dead-end** |
| `/flights` hub | 6 (child routes only) | Too thin |
| Other hubs (hotels/visa/destinations/costs) | ~7 each | Weak |

The blog is where 41 of your 83 pages live, and each one is a near-orphan. **Fixing the blog interlinking alone should move the needle most.**

---

## 3. The link architecture you're building toward

Target a **hub-and-spoke with lateral links** (a "topic cluster" model):

```
                 Homepage (hub of hubs)
                       │
   ┌──────────┬────────┼────────┬──────────┐
 Flights    Hotels   Visa   Destinations  Costs   ← category hubs
   │          │        │         │          │
 route     route    route     guide      cost    ← money pages / spokes
 pages     pages    pages     pages       pages
   └──────────┴────────┴─────────┴──────────┘
              cross-links between related spokes
                       │
                    Blog posts  ← support content, link UP to money pages
                                  and ACROSS to related posts
```

**Rules:**
- **Every page links UP** to its parent hub and to the homepage (the header/logo already does homepage; ensure a visible breadcrumb `<a>` to the hub too).
- **Every hub links DOWN** to all its spokes (mostly done) **and laterally** to 2–3 sibling hubs.
- **Every spoke links ACROSS** to 3–5 genuinely related spokes (e.g., "Dubai visa guide" → "Dubai hotels", "Dubai flights", "Dubai cost", "Dubai destinations guide").
- **Every blog post links to 3–5 relevant money pages and 3–5 related blog posts**, plus the back-to-blog link it already has.
- Breadcrumbs on every page as real `<a>` links (you already emit `BreadcrumbList` schema with `#breadcrumb` `@id` — make the *visible* breadcrumb anchors match it).

---

## 4. Page-by-page linking spec

Work through these in priority order. For each, add contextual, in-body `<a href>` links with descriptive anchor text (see §6). All changes are to prerendered content, so **verify in `dist/` after build.**

### 4.1 Blog posts (highest priority — 41 orphans)
For **each** blog post, add, in the article body or a "Related" footer block rendered as anchors:
1. **2–3 links to money pages** the post's topic maps to. Example: a "Best time to visit Dubai" post → `/destinations/dubai-guide`, `/flights` (or the Dubai flight route), `/visa` (Dubai/UAE visa).
2. **3–5 links to related blog posts** (same destination or theme).
3. Keep the existing "← Back to All Guides" link.

Where to source the mapping: the blog metadata already lives in `src/constants.ts`. Consider adding a `relatedRoutes: string[]` and `relatedPosts: string[]` field per post and rendering them as an anchor list. **Medium risk (touches data model) — say so, don't ask.**

### 4.2 `/flights` hub and the other four hubs
- Add a proper intro paragraph (see [03](03-content-topical-authority.md) — this doubles as the thin-content fix).
- Add lateral `<a>` links to the other hubs ("Planning your trip? See [hotels], [visas], [costs].").
- Ensure all child route pages are linked with **destination-specific anchor text**, not generic "view".

### 4.3 Hub child / route pages (flights/hotels/visa/destinations/costs spokes)
For each, add a **"Complete your trip" block** as anchors linking to the *same destination's* other categories. This is the "Also Plan For This Trip" section — **it must be anchors, not buttons** (see §1). This single conversion likely fixes a large share of the orphaning, because these cross-sells already exist as buttons; they just aren't crawlable.

### 4.4 Destination guide pages
- Link to the matching flights route, hotels, visa, and cost pages for that destination.
- Link to 2–3 related destination guides.
- Link to relevant blog posts.

### 4.5 Homepage
- Already links to everything. **Do not add more** — it's already dense. If anything, ensure the anchor text is descriptive rather than repetitive.

### 4.6 Footer & header
- Put the 5 category hubs in the footer as `<a>` links on **every** page (site-wide equity to hubs).
- Header logo → homepage (likely already an anchor; verify).

---

## 5. The `navigateTo` conversion — concrete task

1. Grep the codebase for every `onClick={() => navigateTo(` and `onClick={()=>navigateTo(` on `<button>`, `<div>`, `<span>`.
2. Convert each to an `<a href={route}>` with `onClick={(e) => { e.preventDefault(); navigateTo(route); }}`.
3. If styling breaks (buttons vs anchors), add a shared className; don't revert to buttons.
4. The route each button navigates to is already known (the `navigateTo` argument) — use it as the `href`.
5. Build, then grep `dist/` for the newly expected `href`s to confirm they prerender.

**This is the most important single task in the entire playbook.** Do it carefully.

---

## 6. Anchor text rules

- **Descriptive, keyword-relevant, natural.** "Dubai visa requirements for Bangladeshi passport holders" ✅ — "click here" / "read more" ❌.
- **Vary it.** Don't use the identical anchor for the same target every time (looks manipulative). Use natural variants.
- **Match search intent**, drawn from [04-keywords.md](04-keywords.md). Anchor text is a ranking signal for the *target* page.
- Keep anchors to a natural length — a phrase, not a sentence.

---

## 7. Verification (never skip)

After building:
- [ ] Pick 3 blog posts in `dist/` — each now has ≥ 6 internal `<a href>` links.
- [ ] `/flights` and other hubs each have ≥ 8 outbound links including lateral hub links.
- [ ] No remaining `navigateTo` `<button>` where a link is intended (grep `dist/` for the absence of expected hrefs).
- [ ] Visible breadcrumb anchors match the `BreadcrumbList` schema URLs.
- [ ] Re-request indexing in GSC for a few improved pages and watch the Pages report over 1–2 weeks.

---

## 8. Success metric

Within 2–4 weeks of shipping §4.1 + §5 and finishing [01](01-indexing-crawling.md), the GSC Pages report should show deep pages migrating from "Discovered/Crawled – currently not indexed" to "Indexed." If they don't, the blocker is content depth ([03](03-content-topical-authority.md)) or authority ([07](07-backlinks-free.md)), not linking.
