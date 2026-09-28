# URAL — Technical SEO & Schema.org Audit

**Site audited:** https://ural-travel.pages.dev
**Audit date:** 2026-09-28
**Scope:** indexing failure diagnosis, sitemap fetch failure, Schema.org / JSON-LD implementation, on-page technical SEO.

## Follow-up implementation note — 2026-09-28

This report is the baseline audit, not a current deployment checklist. The code has since been updated; use [`SEO-KEYWORD-MAP.md`](./SEO-KEYWORD-MAP.md) for the first-pass page-intent map. The older sections below describe the audited snapshot and may contain recommendations that are now superseded.

Implemented in the repository:

- Shared page-specific title and description copy for prerendered HTML and client-side metadata.
- Clean path URLs for internal links and the generated sitemap/RSS; Cloudflare Pages Function middleware for legacy query-string URLs.
- A real static 404 page, strict client route matching, and removal of the wildcard SPA 200 fallback.
- Removal of the unsupported Bengali `hreflang` alternate while Bengali remains a client-side language toggle.
- Omission of sitemap `lastmod` until reliable per-URL modification dates are available.
- Removal of the retired `SearchAction` sitelinks-search-box markup and the unstable data-URI favicon; checked PNG favicon dimensions (16, 32, 48, 180, 192 and 512px), raster palette samples, and 16/32/48px ICO frames.
- Image SEO for all 42 source photographs: 640px/1200px WebP `srcset`s with intrinsic dimensions, descriptive alt text for content images, decorative backgrounds hidden from assistive technology, below-the-fold lazy loading, and eager/high-priority LCP images. The 1200px WebP set is 4.84 MiB versus 35.57 MiB of original JPEGs (86.4% smaller); the 640px set is 1.79 MiB. Social-preview JPEG sources are optimized to a 1200px maximum dimension and copied to stable blog/OG URLs during prerender.

**Local validation (2026-09-28):** `npm run lint` and `npm run build` pass. The build prerendered 83 route HTML files, generated 84 responsive WebP variants and 41 optimized blog JPEGs. Static-output checks found a unique title, description and canonical on every route; an actual `404.html`; and 83 sitemap URLs, each matching a prerendered file, with no query URLs or `lastmod`. RSS contains no legacy query URLs. The output emits neither Bengali `hreflang` nor retired `SearchAction`; internal blog links resolve to known slugs; route-specific image preloads are present for the home, Umrah, blog hub, and article LCP images; and middleware smoke tests returned 301s to the expected clean paths for three representative legacy URLs. Vite still reports the large JavaScript chunk: 1.73 MB minified (461 kB gzip). Image payload improvements are verified locally; field Core Web Vitals and Search Console results require production measurement.

**Deployment verification is still required:** confirm the Pages project deploys the `functions/` directory and `_routes.json`, that legacy URLs return a single 301 to their clean canonical path, and that an unknown path returns HTTP 404. Production HTTP status behavior remains unverified. Search Console data is still needed to validate keyword demand and indexing status.

Structured data and metadata help describe content; they do not guarantee rich-result display or rankings. Google's FAQ rich-result feature and sitelinks search box are retired. See the current [FAQ documentation](https://developers.google.com/search/docs/appearance/structured-data/faqpage), [sitelinks search box retirement notice](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox?hl=en), and [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

---

## 0. Executive summary — the actual answer

> **Your sitemap is fine. Your pages are not being indexed because all 83 URLs serve the exact same HTML document.**

I measured this live. Every URL on the site returns **byte-identical HTML — 19,774 bytes**:

| URL tested | Status | Bytes | Content-Type |
|---|---|---|---|
| `/` | 200 | 19,774 | text/html |
| `/umrah` | 200 | 19,774 | text/html |
| `/blog?slug=cheap-flight-booking-hacks-dhaka` | 200 | 19,774 | text/html |
| `/this-page-does-not-exist-12345` | 200 | 19,774 | text/html |
| `/og-image.jpg` | 200 | 19,774 | **text/html** |
| `/favicon.ico` | 200 | 19,774 | **text/html** |
| `/sitemap.xml` | 200 | 17,548 | application/xml ✅ |
| `/rss.xml` | 200 | 25,890 | application/xml ✅ |
| `/robots.txt` | 200 | 122 | text/plain ✅ |

That single fact produces five compounding failures:

1. **Zero unique titles, descriptions or canonicals in the served HTML.** All of it is injected client-side by `useSeoMeta` in a `useEffect`, which runs *after* Google's first indexing pass.
2. **`og:url` is hardcoded to the homepage on all 83 URLs** (`index.html:12`). You are explicitly telling crawlers every page *is* the homepage.
3. **No `<link rel="canonical">` exists in the static HTML at all** (verified: 0 occurrences). With no canonical and identical content, Google picks one URL and discards 82.
4. **Every nonexistent URL returns HTTP 200** — unlimited soft-404s, which drains crawl budget and signals a low-quality site.
5. **Zero structured data in the static HTML** (verified: 0 `application/ld+json` blocks). All schema is client-side only.

In Search Console this presents as *"Duplicate without user-selected canonical"*, *"Crawled – currently not indexed"*, and *"Discovered – currently not indexed"*.

---

## 1. Why Search Console says the sitemap "couldn't fetch"

**The sitemap itself is healthy.** Verified live:

- `HTTP 200`, `Content-Type: application/xml; charset=utf-8` — correct.
- 83 `<loc>` entries, **all 83 on the correct host** `https://ural-travel.pages.dev`. No host mismatch.
- `robots.txt` returns 200, `Allow: /`, and declares both sitemaps.

So "couldn't fetch" is **not** a server-side problem. In order of likelihood:

| # | Cause | How to confirm / fix |
|---|---|---|
| 1 | **"Couldn't fetch" is a stale status.** GSC caches the result of the *first* fetch attempt and does not automatically retry for days. If you submitted before the deploy went live, it stays red. | In GSC → Sitemaps, **delete** the entry, then re-add `sitemap.xml`. Then use **URL Inspection → Test live URL** on `https://ural-travel.pages.dev/sitemap.xml`. |
| 2 | **Submitted with the wrong value.** GSC expects the path only (`sitemap.xml`), not a full URL pasted into a prefix property, and not `/sitemap.xml` with a leading slash in some flows. | Re-submit as exactly `sitemap.xml`. |
| 3 | **Property/host mismatch.** `pages.dev` is on the Public Suffix List, so `ural-travel.pages.dev` is its own site. A property verified for a *custom domain* cannot fetch a `pages.dev` sitemap, and vice versa. | Confirm the GSC property is exactly `https://ural-travel.pages.dev/`. Your verification meta tag is present (`index.html:175`) so the prefix property will verify. |
| 4 | **71 of 83 URLs are query-string URLs** (`/blog?slug=…`, `/flights?route=…`). These are *valid* in a sitemap, but Google deprioritises parameterised URLs heavily, and combined with identical HTML they get collapsed. | See **P0-2** below — migrate to path URLs. |

**Also fix now:** `robots.txt` has no `Host` or crawl guidance issues, but once you move to a custom domain you must update both `Sitemap:` lines and every `<loc>`.

---

## 2. Root causes of non-indexing, highest impact first

### P0-1 — Client-side-only SEO metadata (critical)

`src/hooks/useSeoMeta.ts` sets `document.title`, the meta description, the canonical, `og:*` tags and all JSON-LD inside `useEffect`. That code only runs after React mounts and the 1.69 MB JS bundle parses.

Googlebot indexes in two waves. The first wave reads raw HTML. For all 83 URLs that raw HTML is identical, has no canonical, and claims `og:url = homepage`. Deduplication happens in wave one. Rendering — if it happens at all — arrives days later, against a URL Google has already clustered as a duplicate.

**Machine-understanding impact:** a crawler cannot distinguish your Umrah hub from a Nepal itinerary from a nonexistent URL. All three are the same document.

### P0-2 — Query-string routing prevents per-page HTML

Content lives at `/blog?slug=x`, `/flights?route=y`, `/visa?country=z`. Query strings cannot be prerendered to static files, so you can never give these URLs unique server-rendered HTML on Cloudflare Pages. This is the structural blocker behind P0-1.

**Fix:** migrate to path segments — `/blog/cheap-flight-booking-hacks-dhaka`, `/flights/dhaka-kathmandu`, `/visa/nepal-visa`. `useSeoMeta` already reads `segments[1]` as a fallback (`useSeoMeta.ts:198`), so the canonical logic partly supports this already. Add 301 redirects from the old query URLs in `public/_redirects`.

### P0-3 — Soft 404s on every unknown URL

`public/_redirects` line 4 (`/* /index.html 200`) returns 200 for everything, including `/og-image.jpg` and `/favicon.ico`, which **do not exist** and currently return HTML with `Content-Type: text/html`.

**Consequences:** broken Open Graph image on every social share and in Google's cache; infinite soft-404 surface; wasted crawl budget.

**Fix:** add the real files, and serve a genuine 404 for unknown routes (see P1-4).

### P0-4 — Third-party script that hijacks native DOM methods (trust risk)

`index.html:179-186` loads `https://emrld.ltd/NTQwMjc3.js?t=540277` with `data-cfasync="false"`, `nowprocket`, `data-no-defer` — attributes whose purpose is to evade optimisation and deferral.

I fetched and inspected the payload. It overrides `window.open`, `Element.prototype.setAttribute`, `Element.prototype.cloneNode`, `Element.prototype.replaceChild`, and installs a global `click` listener. That is the standard **pop-under / click-interception** pattern.

Separately, `src/main.tsx:12` and `index.html:28` add `'emrld'` and `'emerald'` to a list of console keywords that are actively suppressed — the code deliberately hides this script's errors.

**Why this matters for indexing:** unexpected redirects and click interception are explicit Google Safe Browsing and spam-policy triggers. A site flagged this way loses indexing regardless of how good its schema is.

**This is a business decision, not a bug, so I have not removed it.** If it is not deliberate revenue you control, delete lines 179–186 of `index.html`. You already monetise through Travelpayouts affiliate links, which carry none of this risk.

### P0-5 — Over-broad error suppression hides real failures

`index.html:24-173` and `src/main.tsx:7-106` suppress `console.error`, `console.warn`, `window.onerror` and `unhandledrejection` for keywords including `'failed'`, `'load'`, `'http'`, `'status'`, `'script'`, `'network'`, `'error 0'`.

`'load'` alone matches almost every React error message. If the app crashes during hydration, **nothing surfaces** — not in your console, not in Lighthouse, not in GSC's rendered-HTML view. You would have no signal that Googlebot sees a blank page.

**Fix:** restrict the suppression list to the genuinely noisy cases (`ResizeObserver loop`, `grecaptcha`, the specific ad hostname) and delete the generic keywords.

### P1-6 — Bengali content is entirely unindexable

`src/data/bengaliContent.ts` is 2,098 lines of Bengali translations, switched client-side by `LanguageSwitcher` **without changing the URL**. Verified: `hreflang` appears **0 times** in the served HTML.

Google has no URL to index the Bengali version against, so roughly half your content can never rank — in a market where Bengali-language search intent is the majority.

**Fix:** serve Bengali at `/bn/...` paths, add reciprocal `hreflang` (`en-BD`, `bn-BD`, `x-default`), and add those URLs to the sitemap.

### P1-7 — 1.69 MB JavaScript bundle

`/assets/index-CgD5Tl6y.js` is 1,686,348 bytes uncompressed, single-chunk. This directly suppresses render-based indexing (Googlebot abandons slow renders) and destroys Core Web Vitals / INP.

**Fix:** route-level `React.lazy()` code splitting; move `constants.ts` (3,522 lines) and `bengaliContent.ts` (2,098 lines) into lazily-fetched JSON rather than bundling them into the main chunk.

---

## 3. Schema.org audit — what exists, what is wrong, what is missing

### 3a. What is currently emitted

`useSeoMeta` is called **exactly once** in the entire application (`src/App.tsx:946`), driving all 83 pages through one conditional block. Types present across `src/`:

`HowToStep` ×26, `ListItem` ×14, `Airport` ×12, `TouristDestination` ×6, `PriceSpecification` ×6, `MonetaryAmount` ×6, `HowTo` ×6, `Flight` ×6, `Airline` ×6, `ItemList` ×4, `GovernmentService` ×4, `GovernmentOrganization` ×4, `Question` ×3, `FAQPage` ×3, `Answer` ×3, `Organization` ×2, `GovernmentPermit` ×2, `Audience` ×2, `WebPage` ×1, `LodgingBusiness` ×1, `BreadcrumbList` ×1, `BlogPosting` ×1, `Accommodation` ×1.

All of it is injected client-side. **None of it is in the HTML Google first reads.**

### 3b. Incorrect / invalid markup

| Severity | Issue | Location | Why it breaks machine understanding |
|---|---|---|---|
| **Critical** | **All 41 blog posts share one hardcoded `datePublished` (`2026-09-26`) and `dateModified` (`2026-09-27`).** Meanwhile `BLOG_DATA` already stores a real per-post `date` (e.g. `"June 12, 2026"`) that the schema **ignores**. | `App.tsx:873-874` | Identical dates across 41 articles is a textbook templated-content signal. It also destroys freshness ranking and any "Updated" display. |
| **Critical** | **Fabricated FAQPage.** For every non-Hajj post the code builds a fake FAQ where the *question is the article title* and the *answer is the article summary*, then appends **two unrelated Umrah FAQs**. | `App.tsx:896-902` | A Nepal itinerary page ships Saudi visa Q&A. The same two questions are duplicated across dozens of unrelated URLs. This violates Google's FAQPage guidelines (answers must be visibly present in Q&A form) and is a manual-action risk. Since Aug 2023 FAQ rich results only display for authoritative government/health sites — so this carries **all** the risk and **zero** upside. |
| **Critical** | `BlogPosting` has **no `image`**. | `App.tsx:868-889` | `image` is required for Article rich results. Without it the markup is ineligible, full stop. |
| **High** | `publisher` is an `Organization` with **no `logo`**. | `App.tsx:884-888` | Google requires `publisher.logo` as an `ImageObject` for Article. Reported as an error in Search Console. |
| **High** | `author` is an `Organization`, not a `Person` — even though `BLOG_DATA` stores real named authors with credentials (`"Zayan Rahman (Senior Travel Researcher)"`). | `App.tsx:879-883` | Discards your strongest E-E-A-T signal on visa and financial-quota content, which is YMYL-adjacent and judged strictly. |
| **High** | **No entity graph.** Exactly **one** `@id` exists in the whole codebase (`App.tsx:877`). No `@graph`, no cross-references. | project-wide | Every node is an orphan. Google cannot connect Article → WebPage → WebSite → Organization, so no entity consolidation and no knowledge panel. |
| **Medium** | `BreadcrumbList` self-links the final crumb to the current page. | `App.tsx:904-908` | Google's guidance is to omit `item` on the last element. Minor, but flagged in testing tools. |
| **Medium** | `/experiences` and `/sitemap` set `seoBreadcrumbs` but never set `seoSchema` — **no schema at all**. | `App.tsx:918-943` | Two hub pages invisible as entities. |
| **Medium** | No `inLanguage` anywhere, on a bilingual EN/BN site. | project-wide | Google must guess the language of every page. |

### 3c. Missing entirely

| Type | Where it belongs | Value lost |
|---|---|---|
| **`WebSite`** + `SearchAction` | static `index.html` | No sitelinks searchbox; no site-level entity to attach anything to. |
| **`Organization` / `TravelAgency`** (site-wide, with `logo`, `sameAs`, `contactPoint`) | static `index.html` | No brand entity, no knowledge panel, no logo in results. You have a real Dhaka desk and phone (+8801784385335) and get zero credit for it. |
| **`LocalBusiness`** (via `TravelAgency`) | homepage + `/contact` | No local pack eligibility for "travel agency Dhaka" style queries. |
| **`WebPage`** per URL | every page | Nothing binds Article/FAQ nodes to a specific URL. |
| **`Article`** (correctly formed) | 41 blog posts | No Article rich results, no Top Stories, no author attribution. |
| **`Service`** | `/contact`, `/tools`, `/visa` | Your commercial offering (visa assistance, BDT booking) is machine-invisible. |
| **`Product`** + `Offer` | `/experiences`, eSIM, Umrah packages | No price/availability in results for bookable inventory. |
| **`TouristTrip`** | `/destinations` (6 itineraries) | The single most expressive type for a 5-day itinerary — unused. |
| **`ImageObject`** with dimensions | all images | No image-search eligibility. |
| **`SpeakableSpecification`** | guides | No voice-assistant surface. |
| **`Person`** (authors) | blog | No author entity. |

---

## 4. Production-ready JSON-LD

I have implemented all of this as typed generators in **`src/utils/schema.ts`** (new file). Below are the literal outputs to verify against.

### 4.1 Site-level graph — paste into static `index.html` `<head>`

This must be in the raw HTML so it exists before JavaScript runs. It is identical on every page, which is correct for site-level entities.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": "https://ural-travel.pages.dev/#organization",
      "name": "URAL",
      "legalName": "URAL Travel Intelligence",
      "url": "https://ural-travel.pages.dev/",
      "description": "Travel intelligence, visa checklists, and BDT-priced flight, hotel, Umrah and Hajj planning for Bangladeshi outbound travelers.",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://ural-travel.pages.dev/#logo",
        "url": "https://ural-travel.pages.dev/brand/ural-logo-512.png",
        "contentUrl": "https://ural-travel.pages.dev/brand/ural-logo-512.png",
        "width": 512,
        "height": 512,
        "caption": "URAL"
      },
      "image": { "@id": "https://ural-travel.pages.dev/#logo" },
      "telephone": "+8801784385335",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "addressCountry": "BD"
      },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+8801784385335",
        "contactType": "customer support",
        "areaServed": "BD",
        "availableLanguage": ["English", "Bengali"]
      }],
      "areaServed": [
        { "@type": "Country", "name": "Bangladesh" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "Thailand" },
        { "@type": "Country", "name": "Malaysia" },
        { "@type": "Country", "name": "Nepal" },
        { "@type": "Country", "name": "Singapore" },
        { "@type": "Country", "name": "Maldives" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ],
      "knowsLanguage": ["en", "bn"],
      "sameAs": ["https://wa.me/8801784385335"]
    },
    {
      "@type": "WebSite",
      "@id": "https://ural-travel.pages.dev/#website",
      "url": "https://ural-travel.pages.dev/",
      "name": "URAL",
      "description": "Travel Intelligence for Bangladeshi Outbound Travelers",
      "publisher": { "@id": "https://ural-travel.pages.dev/#organization" },
      "inLanguage": ["en-BD", "bn-BD"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://ural-travel.pages.dev/sitemap?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>
```

> **Before deploying:** create `public/brand/ural-logo-512.png`. A `logo` pointing at a 404 invalidates the Organization node. Use a real PNG/JPG (not SVG), square, ≥112×112, ideally 512×512.

### 4.2 Blog article page — `/blog/{slug}`

Generated by `articleSchema()` + `webPageSchema()` + `breadcrumbSchema()`. Example for the real post `cheap-flight-booking-hacks-dhaka`, using its **real** stored date and author:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#webpage",
      "url": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka",
      "name": "5 Insider Secrets to Booking Cheaper Flights from Dhaka in 2026",
      "description": "Outbound airfare from Hazrat Shahjalal International Airport (DAC) can fluctuate by BDT 12,000 to BDT 25,000 overnight...",
      "isPartOf": { "@id": "https://ural-travel.pages.dev/#website" },
      "about": { "@id": "https://ural-travel.pages.dev/#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://ural-travel.pages.dev/img/blog/cheap-flight-booking-hacks-dhaka.jpg"
      },
      "datePublished": "2026-06-12T09:00:00+06:00",
      "dateModified": "2026-06-12T09:00:00+06:00",
      "breadcrumb": { "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#breadcrumb" },
      "inLanguage": "en-BD"
    },
    {
      "@type": "Article",
      "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#article",
      "isPartOf": { "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#webpage" },
      "mainEntityOfPage": { "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#webpage" },
      "headline": "5 Insider Secrets to Booking Cheaper Flights from Dhaka in 2026",
      "description": "Outbound airfare from Dhaka (DAC) can swing BDT 12,000-25,000 overnight. Five proven booking strategies for Bangladeshi travelers.",
      "image": {
        "@type": "ImageObject",
        "url": "https://ural-travel.pages.dev/img/blog/cheap-flight-booking-hacks-dhaka.jpg"
      },
      "datePublished": "2026-06-12T09:00:00+06:00",
      "dateModified": "2026-06-12T09:00:00+06:00",
      "author": {
        "@type": "Person",
        "@id": "https://ural-travel.pages.dev/#/author/Zayan%20Rahman",
        "name": "Zayan Rahman",
        "jobTitle": "Senior Travel Researcher",
        "worksFor": { "@id": "https://ural-travel.pages.dev/#organization" }
      },
      "publisher": { "@id": "https://ural-travel.pages.dev/#organization" },
      "articleSection": "Cheap Flight Tips",
      "inLanguage": "en-BD"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://ural-travel.pages.dev/blog/cheap-flight-booking-hacks-dhaka#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ural-travel.pages.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Travel Blog", "item": "https://ural-travel.pages.dev/blog" },
        { "@type": "ListItem", "position": 3, "name": "5 Insider Secrets to Booking Cheaper Flights from Dhaka in 2026" }
      ]
    }
  ]
}
```

Note: `author` and `datePublished` come from `BLOG_DATA` — `parseAuthor()` and `toIsoDate()` in `schema.ts` handle the conversion.

### 4.3 FAQPage — `/umrah` only (where the Q&A is actually rendered)

```json
{
  "@type": "FAQPage",
  "@id": "https://ural-travel.pages.dev/umrah#faq",
  "mainEntityOfPage": { "@id": "https://ural-travel.pages.dev/umrah#webpage" },
  "inLanguage": "en-BD",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can Bangladeshi citizens apply for an Umrah visa and use the Nusuk app in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bangladeshi passport holders can obtain a 90-day Saudi Umrah e-Visa in 2 to 5 working days through a Ministry-authorized Umrah agency in Dhaka (BDT 15,500-19,500 including medical insurance), via a 96-hour Saudia/Flynas Stopover Visa, or via a Saudi Tourist e-Visa/VOA if holding a valid used US, UK, or Schengen visa."
      }
    }
  ]
}
```

**Rule:** delete the fabricated FAQ generation at `App.tsx:896-902` entirely. Emit `FAQPage` only on pages that visibly render an accordion of those exact questions. The eight `HAJJ_UMRAH_FAQS` are genuinely good — use them on `/umrah` and Hajj/Umrah posts only.

### 4.4 Service — `/contact`

```json
{
  "@type": "Service",
  "@id": "https://ural-travel.pages.dev/contact#service-visa-assistance",
  "name": "Bangladesh Outbound Visa Assistance & BDT Booking Desk",
  "description": "Visa checklist review, document preparation, and flight/hotel booking in Bangladeshi Taka via bKash or bank transfer for Bangladeshi passport holders.",
  "serviceType": "Visa Assistance",
  "provider": { "@id": "https://ural-travel.pages.dev/#organization" },
  "areaServed": { "@type": "Country", "name": "Bangladesh" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://ural-travel.pages.dev/contact",
    "servicePhone": "+8801784385335",
    "availableLanguage": ["English", "Bengali"]
  }
}
```

### 4.5 Product + Offer — `/experiences`, eSIM, Umrah packages

Only emit when a real price exists. A `Product` without an `Offer` is an error in Search Console.

```json
{
  "@type": "Product",
  "@id": "https://ural-travel.pages.dev/experiences#product-airalo-saudi-esim",
  "name": "Saudi Arabia Travel eSIM for Umrah (5 GB / 30 days)",
  "description": "Prepaid data eSIM covering Makkah, Madinah and Jeddah, activated before departure from Dhaka.",
  "image": "https://ural-travel.pages.dev/img/travel_esim_smartphone_insurance.jpg",
  "sku": "airalo-saudi-5gb-30d",
  "brand": { "@type": "Brand", "name": "Airalo" },
  "offers": {
    "@type": "Offer",
    "url": "https://ural-travel.pages.dev/experiences",
    "price": 2100,
    "priceCurrency": "BDT",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://ural-travel.pages.dev/#organization" }
  }
}
```

> **Do not** add `aggregateRating` or `review` unless you render genuine first-party reviews on the page. Self-serving review markup is a manual-action trigger. Your `TrustpilotReviews` component shows third-party reviews — those belong to Trustpilot's markup, not yours.

### 4.6 TouristTrip — `/destinations/{country}`

```json
{
  "@type": "TouristTrip",
  "@id": "https://ural-travel.pages.dev/destinations/nepal-guide#trip",
  "name": "Nepal 5-Day Kathmandu & Pokhara Itinerary from Dhaka",
  "description": "Day-by-day 5-day Nepal itinerary for Bangladeshi travelers, with free visa-on-arrival guidance and BDT cost breakdown.",
  "provider": { "@id": "https://ural-travel.pages.dev/#organization" },
  "touristType": ["Bangladeshi outbound travelers", "Budget families", "First-time international travelers"],
  "itinerary": {
    "@type": "ItemList",
    "numberOfItems": 2,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "TouristDestination", "name": "Kathmandu" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "TouristDestination", "name": "Pokhara" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "price": 48000,
    "priceCurrency": "BDT",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://ural-travel.pages.dev/#organization" }
  }
}
```

### 4.7 HowTo — visa / e-passport / Nusuk guides

Your existing `HowTo` markup (26 `HowToStep` nodes) is the strongest thing in the codebase. Keep it, but bind it to the page and ensure steps mirror visible content:

```json
{
  "@type": "HowTo",
  "@id": "https://ural-travel.pages.dev/visa/thailand-visa#howto",
  "name": "How to Apply for a Thailand e-Visa from Bangladesh",
  "description": "Step-by-step Thailand e-Visa application for Bangladeshi passport holders via thaievisa.go.th.",
  "totalTime": "P15D",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "BDT", "value": 3800 },
  "supply": [
    { "@type": "HowToSupply", "name": "e-Passport valid 6+ months" },
    { "@type": "HowToSupply", "name": "Bank statement showing BDT 60,000+" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Create a thaievisa.go.th account",
      "text": "Register on the official Thai e-Visa portal with the email you will use for all correspondence.",
      "url": "https://ural-travel.pages.dev/visa/thailand-visa#step-1"
    }
  ]
}
```

### 4.8 CollectionPage — `/blog`, `/destinations`, `/flights` hubs

Use `collectionPageSchema()`. Emits `CollectionPage` + `ItemList` so Google understands these as indexes rather than thin duplicates.

---

## 5. Prioritised fix roadmap

### P0 — Do these first. Nothing else matters until they are done.

| # | Fix | Files | Effort |
|---|---|---|---|
| **P0-1** | **Prerender all routes to static HTML.** Each URL must ship its own `<title>`, meta description, self-referencing `<link rel="canonical">`, correct `og:url`, and its `@graph`. | build pipeline | 1–2 days |
| **P0-2** | **Migrate query-string routes to path routes** + 301 the old ones. Prerequisite for P0-1. | `App.tsx`, `_redirects`, `sitemap.xml` | 1 day |
| **P0-3** | **Remove the hardcoded `og:url`** from `index.html:12` — it currently tells every page it is the homepage. Replace with per-page value at prerender time. | `index.html` | 5 min |
| **P0-4** | **Add the site-level `@graph`** (§4.1) to static `index.html`, and create `public/brand/ural-logo-512.png`. | `index.html` | 30 min |
| **P0-5** | **Create the missing `/og-image.jpg`** (1200×630) and `/favicon.ico`. Both currently return HTML. | `public/` | 20 min |
| **P0-6** | **Decide on `emrld.ltd`** (§P0-4). If not deliberate, delete `index.html:179-186`. | `index.html` | 5 min |
| **P0-7** | **Delete the fabricated FAQPage** at `App.tsx:896-902`. | `App.tsx` | 15 min |
| **P0-8** | **Use real dates and authors** from `BLOG_DATA` via `toIsoDate()` / `parseAuthor()`. Remove the hardcoded dates at `App.tsx:873-874`. | `App.tsx` | 30 min |

### How to implement P0-1 (prerendering on Cloudflare Pages)

After P0-2 gives you path-based routes:

1. `npm i -D vite-plugin-prerender-spa` *or* write a post-build script using `playwright`/`puppeteer`.
2. Enumerate all 83 routes from the same source that generates `sitemap.xml` (`src/utils/sitemapGenerator.ts`) so they can never drift apart.
3. For each route: load the built SPA, wait for `useSeoMeta` to finish, serialise `document.documentElement.outerHTML`, write to `dist/<route>/index.html`.
4. Cloudflare Pages serves those files directly; the SPA still hydrates on top.
5. Change `_redirects` line 4 from `/* /index.html 200` to `/* /404.html 404` so unknown URLs return a real 404.

Simpler alternative if you would rather not maintain a prerender step: migrate to **Astro** or **Next.js static export**. Given 83 mostly-static content pages, this is a genuinely good fit and removes the whole class of problem.

### P1 — Significant

| # | Fix | Detail |
|---|---|---|
| P1-1 | Wire `src/utils/schema.ts` into `useSeoMeta` | Replace ad-hoc objects with one `@graph` per page. |
| P1-2 | Add `Article` `image` for all 41 posts | Copy hero images to `public/img/blog/<slug>.jpg` for stable absolute URLs — bundled hashed assets change every build. |
| P1-3 | Bengali at `/bn/*` + `hreflang` | Unlocks ~half the content for the majority-language market. |
| P1-4 | Real 404 page | Stops the soft-404 surface. |
| P1-5 | Narrow the error suppression | Remove `'load'`, `'failed'`, `'http'`, `'status'`, `'script'`, `'network'` from the keyword lists. |
| P1-6 | Code-split the 1.69 MB bundle | `React.lazy()` per route; lazy-load `constants.ts` and `bengaliContent.ts`. |
| P1-7 | Add `Service` + `Product` schema | §4.4, §4.5. |
| P1-8 | Fix the last breadcrumb crumb | Omit `item` on the final element. |

### P2 — Worth doing

- `TouristTrip` on the 6 itinerary pages (§4.6).
- `CollectionPage` + `ItemList` on hub pages (§4.8).
- `inLanguage` on every node.
- `ImageObject` with `width`/`height` for image-search eligibility.
- Move the `google-site-verification` meta to a DNS TXT record so it survives HTML changes.
- Self-referencing `hreflang` including `x-default`.
- Add `Content-Security-Policy` and `Referrer-Policy` headers in `public/_headers` — currently only `x-content-type-options` is set.
- `lastmod` in `sitemap.xml` driven by real per-post dates.

### P3 — Polish

- `SpeakableSpecification` on guide pages.
- `Person` author pages at `/authors/{slug}` to give the `@id` a real landing page.
- RSS `<atom:link rel="self">`.
- `theme-color` meta.

---

## 6. Other issues found

| Issue | Evidence | Fix |
|---|---|---|
| **Unused dependencies bloating install** | `react-router-dom`, `@google/genai`, `express`, `dotenv` are declared but **imported nowhere** in `src/` (verified). `metadata.json` claims `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` with no Gemini code. | Remove from `package.json`, or adopt `react-router-dom` as part of P0-2 — it would give you real routing instead of the hand-rolled `pushState` in `App.tsx:954`. |
| **`package.json` name is `react-example`** | `package.json:2` | Rename to `ural-travel`. |
| **`clean` script references a nonexistent `server.js`** | `package.json:10` | Remove. |
| **`App.tsx` is 5,708 lines** | — | Split per route; enables code splitting (P1-6). |
| **TypeScript not strict** | `tsconfig.json` has no `strict`, no `include` | Enable `strict: true`. |
| **Mocked clock** | `App.tsx:967` hardcodes `"June 14, 2026 - 04:32 AM (Dhaka)"` | Use real time or remove — a visibly wrong date undermines trust. |
| **No tests, no linting** | only `tsc --noEmit` | Add ESLint. |
| **`Cache-Control: max-age=0, must-revalidate` on HTML** | measured | Fine for HTML; ensure hashed `/assets/*` get a long `max-age` in `_headers`. |

---

## 7. Verification checklist after deploying

1. `curl -s https://<domain>/blog/<slug> | grep -c 'rel="canonical"'` → must be `1`.
2. Compare byte sizes of three different URLs — they must **differ**.
3. `curl -o /dev/null -w "%{http_code}" https://<domain>/nonexistent-xyz` → must be `404`.
4. Rich Results Test on a blog URL → `Article` valid, **no** `FAQPage` unless visibly rendered.
5. Schema Markup Validator → one `@graph`, all `@id` references resolving.
6. GSC → URL Inspection → **Test live URL** → *View rendered HTML*: confirm unique `<title>` and the `@graph`.
7. Delete and re-submit `sitemap.xml`.
8. Request indexing for the 12 hub pages; let the 41 posts be discovered via the sitemap.

---

## 8. Expected outcome

P0-1 through P0-3 are the whole game. Until each URL returns its own HTML with its own canonical, no amount of structured data will get 83 pages indexed — Google is currently looking at one document served 83 times.

Once per-URL HTML ships, expect discovery within days and indexing over 2–4 weeks. The schema work in §4 then determines *how well* those pages rank and whether they earn rich results — but it cannot substitute for the P0 fixes.
