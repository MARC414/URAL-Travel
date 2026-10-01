# Expert Plan — Crawlable `/bn/…` Bengali URLs + Reciprocal hreflang

**Goal:** Turn Bengali from a client-only `lang==="bn"` toggle into a set of real, crawlable, self-canonicalizing `/bn/…` URLs with a reciprocal `en-bd / bn-bd / x-default` hreflang cluster — without regressing Core Web Vitals for the English majority.

**Status:** Plan for review. Grounded in the actual codebase (line anchors below). This validates and corrects the "Gemini 3.8 Flash" 5-phase draft.

---

## 0. The one architectural insight everything hangs on

The app mounts with `createRoot(...).render(...)` ([src/main.tsx:21](src/main.tsx)) — **not** `hydrateRoot`. So the prerendered HTML in each `dist/**.html` file is **thrown away the instant React mounts**; it exists purely for crawlers and first paint.

Two consequences the Gemini plan did not state:

1. **Language must be a pure function of the URL.** If a user lands on `/bn/umrah`, the server-written HTML is Bengali, but React currently initializes `lang` from `localStorage` (default `"en"`, [src/App.tsx:819](src/App.tsx)). That would repaint the page into English a few ms after load — a jarring flash *and* a cloaking signal (crawler sees Bengali, rendered DOM becomes English). **Fix: `lang` is derived from the path (`/bn` ⇒ `bn`, else `en`), authoritative over localStorage.** This single change is what makes `/bn/` both crawlable and consistent.

2. **Every `/bn/…` page needs a genuinely Bengali crawl body**, not just a Bengali `<title>`. A `bn-BD` page whose body prose is English is a quality/cloaking problem. This is where the real content-coverage work is (see §6).

---

## 1. What the Gemini draft got right vs. wrong

| Gemini claim | Verdict | Correction |
|---|---|---|
| Adopt `/bn/…` ISO subdirectory, English ASCII slugs after `/bn/` | ✅ Correct | Keep. Slugs stay ASCII; only title/H1/body/JSON-LD are Bengali. |
| `getRouteDetails` strips `bn` segment, forces `lang` | ✅ Correct | Return a `locale` field; make `lang` derive from it (§2). |
| LanguageSwitcher `<button>` → `<a href>` | ✅ Correct | Crawlers follow `<a>`, not `<button>`. (§3) |
| `navigateTo` locale-aware | ✅ Correct, but under-specified | Auto-prefix `/bn` by current locale so **existing** `navigateTo("/x")` call sites need **zero edits** (§2). |
| Self-referential canonicals, 3-tag hreflang on both pages | ✅ Correct | Template today ships only 2 self tags, lowercase `en-bd` + `x-default` ([index.html:41-42](index.html)). Add `bn-bd`. (§4) |
| `BENGALI_SEO_COPY` + `og:locale bn_BD` + Bengali JSON-LD `inLanguage: "bn-BD"` | ✅ Correct | `getSeoCopy` ([seoCopy.ts:468](src/utils/seoCopy.ts)) and `webPageSchema` ([schema.ts:152](src/utils/schema.ts)) both need a `locale` param. (§4) |
| **Prerender writes `dist/bn/<route>/index.html`** | ❌ **Wrong** | Prerender writes **flat** files: `dist/<…>/<name>.html` ([prerender.ts:1649-1654](scripts/prerender.ts)). The existing writer already handles arbitrary depth, so Bengali routes need **no change** to the writer — `/bn/umrah` ⇒ `dist/bn/umrah.html`, `/bn` ⇒ `dist/bn.html`. (§4) |
| "Ensure `_middleware.js` legacy query redirects work under `/bn`" | ❌ Unnecessary for v1 | Legacy `?query=` links only ever existed for English. `/bn` has no legacy inbound URLs. Keep `/bn` **out** of the Function (`_routes.json` unchanged) so it serves as pure static files — fastest path, best CWV. (§5) |
| Implies Bengali content needs new client loading | ❌ Already done | `bengaliContent.ts` is already lazy-imported ([src/App.tsx:844-846](src/App.tsx)); as a dynamic import it is already its own Rollup chunk, so English visitors never download it. (§5) |
| 41 blogs + flights/hotels/visa/costs Bengali | ⚠️ Partial | Those localizers exist. **`destinations` has NO `getLocalizedDestinations`** — zero Bengali data. Gemini listed `/bn/destinations/*` as if ready; it is a content gap. (§6) |

---

## 2. Phase 1 — URL-driven routing core (`src/App.tsx`)

All anchors below are current line numbers.

### 2.1 `getRouteDetails` — detect & strip `/bn` ([App.tsx:980](src/App.tsx))
Right after `const segments = url.pathname.split("/").filter(Boolean);` ([App.tsx:983](src/App.tsx)):

```ts
let locale: Language = "en";
let segs = segments;
if (segments[0] === "bn") {
  locale = "bn";
  segs = segments.slice(1);
}
```
Then replace `const root = segments[0] || "";` / `const subSegment = segments[1] || null;` with `segs[0]` / `segs[1]`. **Everything else in the function is unchanged** — `/bn/umrah` now parses identically to `/umrah`, just with `locale="bn"`. Home case `/bn` ⇒ `segs=[]` ⇒ `section="home"`. Return `locale` in the object ([App.tsx:1058](src/App.tsx)).

### 2.2 Make `lang` derive from the URL (authoritative)
- Initializer ([App.tsx:819-825](src/App.tsx)): seed from the path to kill first-paint flash on SSR'd `/bn` pages:
  ```ts
  const [lang, setLang] = useState<Language>(() =>
    typeof window !== "undefined" && window.location.pathname.startsWith("/bn") ? "bn" : "en"
  );
  ```
- Pull `locale` out of the existing destructure ([App.tsx:1061](src/App.tsx)) and sync:
  ```ts
  const { section, parameterId, isLanding, isAdmin, locale } = getRouteDetails();
  useEffect(() => { setLang(locale); }, [locale]);
  ```
  `localStorage` is **demoted** — it no longer gates render language (prevents the English repaint). Keep writing it on explicit toggle only if we want cross-session memory; it must never override the URL. The existing `document.documentElement.lang` + bengali lazy-load effect ([App.tsx:840-847](src/App.tsx)) and `pageLanguage` ([App.tsx:1101](src/App.tsx)) are already correct once `lang` tracks the URL.

### 2.3 Locale-path helper + locale-aware navigation ([App.tsx:1602-1611](src/App.tsx))
```ts
const toLocalePath = (path: string, target: Language) => {
  const base = path.replace(/^\/bn(?=\/|$)/, "") || "/";   // → English base
  if (target === "en") return base;
  return base === "/" ? "/bn" : `/bn${base}`;               // idempotent
};
```
Split `navigateTo` into a low-level pusher + a locale-aware wrapper so **no existing call site changes**:
```ts
const pushPath = (path: string) => {                 // = current navigateTo body
  const cleanPath = normalizeRoutePath(path);
  if (typeof window !== "undefined") window.history.pushState({}, "", cleanPath);
  setCurrentPath(cleanPath);
  window.scrollTo({ top: 0, behavior: "smooth" });
  setMobileMenuOpen(false);
};
const navigateTo = (path: string) =>
  pushPath(lang === "bn" ? toLocalePath(normalizeRoutePath(path), "bn") : path);
```
So in Bengali mode every `navigateTo("/flights/dhaka-kathmandu")` already in the file resolves to `/bn/flights/dhaka-kathmandu` automatically. The language switch (next phase) calls `pushPath(toLocalePath(pathname, newLang))` directly to cross locales without double-prefixing.

> **Note:** `normalizeRoutePath` ([App.tsx:1584](src/App.tsx)) maps legacy `?route=`→clean and `/pre-departure`→`/sitemap` on the English base *before* the `/bn` prefix is applied — correct ordering, no change needed there.

---

## 3. Phase 2 — Crawlable `<LanguageSwitcher/>` + reciprocal links

### 3.1 `src/components/LanguageSwitcher.tsx` → real anchors
Add `enHref`/`bnHref` props; render `<a>` with SPA onClick:
```tsx
<a href={enHref} onClick={(e) => { e.preventDefault(); onToggle("en"); }} …>EN</a>
<a href={bnHref} onClick={(e) => { e.preventDefault(); onToggle("bn"); }} …>বাংলা</a>
```
Crawlers now follow both language URLs from every page (reinforcing hreflang with on-page links); users keep instant SPA switching.

### 3.2 Wire it in `App.tsx` (both mounts: [App.tsx:1652](src/App.tsx) & 2449)
```tsx
const pathname = typeof window !== "undefined" ? window.location.pathname : currentPath.split("?")[0];
<LanguageSwitcher
  lang={lang}
  enHref={toLocalePath(pathname, "en")}
  bnHref={toLocalePath(pathname, "bn")}
  onToggle={(nl) => { pushPath(toLocalePath(pathname, nl)); localStorage.setItem("ural_lang", nl); }}
/>
```

### 3.3 "Copy Ready FB Post" blog button
Grep for the copy handler; the copied URL must become `${BASE_URL}/bn/blog/${slug}` when `isBn`. One-line conditional.

---

## 4. Phase 3+4 — SEO copy, schema, hreflang, prerender (`scripts/prerender.ts`, `src/utils/*`)

### 4.1 Bengali SEO copy — `src/utils/seoCopy.ts`
- Add `export const BENGALI_SEO_COPY: Record<string, SeoCopy>` keyed by the **English base path** (same keys as `PRIORITY_SEO_COPY`), with native Bengali `title`/`description`/H1.
- Extend `getSeoCopy(path, title, description, locale: Language = "en")` ([seoCopy.ts:468](src/utils/seoCopy.ts)): when `locale==="bn"`, look up `BENGALI_SEO_COPY[normalizePath(stripBn(path))]`, falling back to a Bengali-generated default (never silently English).

### 4.2 `webPageSchema` / graph `inLanguage` — `src/utils/schema.ts`
`webPageSchema` already accepts `inLanguage` ([schema.ts:152-194](src/utils/schema.ts)). Pass `"bn-BD"` for Bengali routes in `prerenderDistHtmlFiles` ([prerender.ts:1559](scripts/prerender.ts), currently hard-coded `"en-BD"`). Same for Article/Collection nodes built per route.

### 4.3 Prerender a second locale pass — `scripts/prerender.ts`
**Route model.** Add to `PrerenderRoute`: `locale: "en" | "bn"`, `enUrl: string`, `bnUrl: string` (the hreflang pair; identical on both members of a pair). Parameterize `buildAllRoutes(locale)` so the data arrays and static label strings are locale-selected:
- `locale==="bn"` pulls `getLocalizedBlogs("bn")`, `getLocalizedFlights("bn")`, `getLocalizedHotels("bn")`, `getLocalizedVisas("bn")`, `getLocalizedCosts("bn")`, `getLocalizedHajjFaqs("bn")` from `src/data/bengaliContent.ts`, and routePath becomes `/bn${enPath}`.
- A small `bn`/`en` label table covers section headings, breadcrumb labels, and hub-intro prose that are not data-driven, so **no `/bn` body ships English prose**.

`main()` ([prerender.ts:1659](scripts/prerender.ts)):
```ts
const enRoutes = buildAllRoutes("en");
const bnRoutes = buildAllRoutes("bn");
addInternalLinkSections(enRoutes); addInternalLinkSections(bnRoutes);
applySharedSeoCopy(enRoutes, "en"); applySharedSeoCopy(bnRoutes, "bn");
const routes = [...enRoutes, ...bnRoutes];
generateSitemapXml(routes); generateRssXml(); prerenderDistHtmlFiles(routes);
```

**File writing: no change.** The flat writer ([prerender.ts:1649-1654](scripts/prerender.ts)) already produces `dist/bn/umrah.html`, `dist/bn/flights/dhaka-kathmandu.html`, and `dist/bn.html` from the `/bn…` routePaths. The body-injection guard `if (r.routePath !== "/")` ([prerender.ts:1640](scripts/prerender.ts)) means `/bn` **does** get its body injected — so author an explicit **Bengali home crawl body** (Bengali mirror of the English directory in [index.html:182-275](index.html), links pointing to `/bn/*`). The English `/` keeps the template body.

**hreflang 3-tag cluster.** Add a `bn-bd` line to the template ([index.html:42](index.html), after `en-bd`):
```html
<link rel="alternate" hreflang="bn-bd" href="https://ural-travel.pages.dev/bn" />
```
In `prerenderDistHtmlFiles` ([prerender.ts:1595-1602](scripts/prerender.ts)) rewrite **all three** per route using the pair:
- `en-bd` → `r.enUrl`, `bn-bd` → `r.bnUrl`, `x-default` → `r.enUrl` — identical on both pages ⇒ valid reciprocal return tags.

> **Correctness guard:** only emit the `bn-bd` tag (and the sitemap `xhtml` cluster) when the Bengali counterpart was actually generated. Otherwise an English page could point `bn-bd` at a non-existent `/bn/destinations/x` (see §6). Build a `Set` of generated `/bn` paths and gate on it.

**og:locale.** Rewrite `og:locale` per locale (`en_BD`/`bn_BD`) and add an `og:locale:alternate` ([index.html:54](index.html) is currently hard-coded `en_BD`).

**canonical** stays self-referential — `/bn/umrah` canonicals to itself, **never** to `/umrah` ([prerender.ts:1587-1590](scripts/prerender.ts) already uses `r.canonicalUrl`; just ensure bn routes carry the `/bn` canonical).

### 4.4 Sitemap hreflang annotations — `generateSitemapXml` ([prerender.ts:1474](scripts/prerender.ts))
Add `xmlns:xhtml="http://www.w3.org/1999/xhtml"` to `<urlset>` and, per `<url>`, emit the `en-bd / bn-bd / x-default` `<xhtml:link>` triplet (belt-and-suspenders with on-page tags). ~166 URLs total. `rss.xml` stays English-only (it mirrors `BLOG_DATA`).

### 4.5 `src/hooks/useSeoMeta.ts` — `/bn` awareness
Canonical is derived from `window.location.pathname` with hard-coded `baseUrl`. Make it `/bn`-aware: keep canonical self-referential for `/bn/*`, set `inLanguage="bn-BD"`, preserve the `/bn` prefix in the legacy `?query=`→clean `history.replaceState` upgrade, and (recommended) refresh the 3-tag hreflang cluster on SPA navigation. Lower priority than the static HTML (Googlebot trusts raw HTML first) but keeps JS-rendered state correct.

---

## 5. Phase 5 — Infra decisions (deliberately minimal)

- **`public/_routes.json`:** unchanged. `/bn/*` is **not** added to `include`, so it serves as static files with no Function hop — best latency/CWV. (Correction to Gemini.)
- **`functions/_middleware.js`:** unchanged for v1 (no legacy `/bn` query URLs exist). *Optional future-proofing:* strip a leading `/bn` before matching `LEGACY_QUERY_ROUTES` so `/bn/flights?route=x` would also 301 to `/bn/flights/x`.
- **`vite.config.ts`:** no change required — `bengaliContent.ts` is reached only via dynamic `import()` so it is already a separate async chunk; English visitors never fetch it. **Verify** post-build that the chunk is distinct (optionally add an explicit `manualChunks` rule naming it for stability). Bengali's ~397 KB loads only for `/bn` visitors — expected and isolated.

---

## 6. Content coverage — the real work (and the gap Gemini missed)

Prerendering `/bn` for a route whose localizer returns English (the `getLocalized*` fns fall back to the English object when no override exists, e.g. [bengaliContent.ts:1772-1790](src/data/bengaliContent.ts)) ships an English-bodied `bn-BD` page. Coverage today:

| Route group | Bengali data today | Action |
|---|---|---|
| Blog (41) | ✅ `BENGALI_BLOG_OVERRIDES` | Ship `/bn/blog/*` |
| Flights / Hotels / Visa / Costs | ✅ override maps | Ship `/bn/*` |
| Hajj/Umrah FAQs | ✅ `BENGALI_HAJJ_UMRAH_FAQS` | Ship `/bn/umrah` |
| Hubs, `/tools`, `/experiences`, `/contact`, `/sitemap`, home | ⚠️ metadata only | Add Bengali `BENGALI_SEO_COPY` + Bengali hub-intro/link-list body (short, scaffoldable) |
| **`destinations/*`** | ❌ **no `getLocalizedDestinations`** | **Decide:** (a) add a `getLocalizedDestinations` + `BENGALI_DESTINATIONS_OVERRIDES` and ship, or (b) defer `/bn/destinations/*` and let the §4.3 guard drop their `bn-bd` tags until written. |

Recommendation: generate `/bn` for every group **except** destinations in the first release (guard drops their hreflang cleanly), then add Bengali destinations copy as a fast follow so the cluster completes. This avoids broken hreflang while shipping the ~90% of Bengali corpus that already exists.

---

## 7. Phase 6 — `SEO-KEYWORD-MAP.md`
Append a Bengali keyword→`/bn/…` table (e.g. `/bn/umrah` → *বাংলাদেশ থেকে ওমরাহ খরচ ২০২৬*; `/bn/visa/nepal-visa` → *নেপাল ভিসা বাংলাদেশিদের জন্য*; `/bn/flights/dhaka-kathmandu` → *ঢাকা টু কাঠমান্ডু বিমান ভাড়া*). Documentation only.

---

## 8. Risks & validation

- **Flash-of-English / cloaking** — mitigated by §2.2 (lang from URL at init).
- **Broken return tags** — mitigated by the generated-set guard (§4.3) and identical en/bn pair on both pages.
- **CWV regression for English** — none expected; Bengali chunk is dynamic-import isolated (§5).
- **Double `/bn` prefix** — `toLocalePath` is idempotent; switcher uses `pushPath` directly.

**Validation checklist (post-build, before deploy):**
1. `dist/bn.html`, `dist/bn/umrah.html`, `dist/bn/flights/dhaka-kathmandu.html` exist and contain Bengali `<title>`, H1, body, and `<script data-seo-schema>` with `inLanguage:"bn-BD"`.
2. Each pair's three hreflang tags are byte-identical and resolve (no 404) — spot-check with a crawler/`curl`.
3. `/bn/umrah` canonical = `…/bn/umrah` (self), **not** `/umrah`.
4. `sitemap.xml` lists both locales with `xhtml:link` clusters; count ≈ 2× current minus any deferred.
5. `npm run lint` (`tsc --noEmit`) clean; `npm run build` completes; load `/bn/umrah` in-browser → no repaint to English, no console errors, network shows the Bengali chunk only on `/bn`.
6. Rendered-DOM text matches the prerendered Bengali (no cloaking).

**Rollout order:** Phase 1 → 2 (routing + switcher, verify SPA + deep-link) → 3+4 (prerender/schema/hreflang/sitemap) → 6 (content gaps) → 7 (keyword map). Phases 1–4 are the shippable core.

---

### Build commands (from `AGENTS.md`)
```bash
npm run lint   # tsc --noEmit
npm run build  # vite build + tsx scripts/prerender.ts
```

---

# Implementation status (verified against the deployed build)

This plan was authored alongside the Phase 1–3 branch `feat/bengali-crawlable-urls`
(commit `ac36a0f`). It has since been implemented in full on
`arena/01a0f74c-ural-travel` (PR #6), which supersedes that branch, and the
hand-written Bengali copy from it is included here.

| Phase | Status | Where |
| --- | --- | --- |
| 1 — URL-authoritative routing | ✅ shipped | `src/App.tsx` (`getRouteDetails().locale`, `toLocalePath`, `pushPath`/`navigateTo`) |
| 2 — Crawlable switcher | ✅ shipped | `src/components/LanguageSwitcher.tsx` renders `<a href>` for both locales |
| 3 — Bengali SEO copy + locale-aware schema | ✅ shipped | `src/utils/seoCopy.ts` (35 hand-written entries), `src/data/bengaliContent.ts` (generated detail copy), `webPageSchema`/`articleSchema` `inLanguage` |
| 4 — Prerender pass, hreflang, sitemap | ✅ shipped | `scripts/prerender.ts` → 83 English + 76 Bengali routes, `xhtml:link` clusters |
| 5 — Infra | ✅ as planned | `_routes.json` unchanged: `/bn/*` is served as pure static files, no Function hop |
| 6 — Content coverage | ⚠️ partially deferred | everything except `/destinations/*` — see below |
| 7 — Bengali keyword map | ⏳ not started | append a keyword→`/bn/…` table to `SEO-KEYWORD-MAP.md` |

## Copy precedence (important when editing titles)

`scripts/prerender.ts` and `src/App.tsx` apply the same order, so the HTML a
crawler reads and the `<title>` React writes can never disagree:

1. **Hand-written** Bengali SERP copy in `BENGALI_SEO_COPY` (`src/utils/seoCopy.ts`) —
   covers 35 routes (hubs, static pages, all flight/hotel/visa/cost guides).
2. **Generated** copy from `getBengaliRouteSeo()` (`src/data/bengaliContent.ts`) —
   used for the 41 blogs, and as the fallback for detail routes.
3. Nothing → no `/bn` page is generated for that route at all.

The on-page `<h1>` always comes from (2) where available; it is intentionally
longer and more descriptive than the SERP title.

## Known gaps / next steps

- **`/bn/destinations/*` is not generated.** There is no `getLocalizedDestinations`
  and no `BENGALI_DESTINATIONS_OVERRIDES`, so those pages would ship English prose
  on a `bn-BD` URL. `DEFERRED_BN_GROUPS` in `src/utils/localeRoutes.ts` withholds
  both the route and its `bn-bd` hreflang tag. To enable: write the Bengali
  destination copy, add the overrides, remove the group from that list, and add
  the 6 paths to `BENGALI_SEO_COPY`.
- **Bengali FAQ sets** are only available for Hajj/Umrah (`getLocalizedHajjFaqs`).
  Flight/hotel/visa/cost pages therefore omit `FAQPage` schema in Bengali rather
  than publishing English Q&A on a Bengali page — a rich-result opportunity once
  the questions are translated.
- **13 blog meta descriptions end in an ellipsis.** The blog copy is generated
  from `BENGALI_BLOG_OVERRIDES`; where a summary's first clause exceeds 160
  chars there is no clean sentence boundary to stop at (the generator closes at a
  `,`/`—` boundary when one exists, which cut the count from 62 to 13). Writing 41
  hand-written blog descriptions — the same treatment the 35 routes above got —
  is the clean fix.
- **Bengali detail bodies are thinner than their English twins** (~1.2–1.4 KB vs
  ~2.5 KB). The English boilerplate was deliberately not machine-translated; each
  group instead has its own short Bengali guidance block before the internal
  links.
- **The deploy fix is a prerequisite** for any of this to reach production: see
  the `fix(deploy)` commit (`bun.lock` v2 / out-of-sync `package-lock.json`).
