# URAL Travel - Core Web Vitals Optimization Guide
**Created:** 2026-10-04  
**Last updated:** 2026-10-04 (evening) — Consent Mode v2 + 960w breakpoint landed  
**Status:** Phase 1 ✅ complete · Phase 2 (images) ✅ complete · Phase 3 (JS) ✅ complete · Consent Mode v2 ✅ implemented · Phases 4–6 partially open  
**Target:** 95+ Performance Score (Mobile & Desktop)

---

## ✅ Status Board (single source of truth — 2026-10-04)

Everything below is **committed code**, verified by `npm run build` + `npm run
verify:build` (19 checks, incl. new regression guards). "Deployed" means it
will be live on the next Cloudflare Pages deploy of this branch — confirm with
the Production Verification commands at the bottom of this guide.

| # | Item | State | Where |
|---|------|-------|-------|
| 1 | Google Fonts `@import` removed (400KB render-blocking) | ✅ done | `src/index.css` line 1 |
| 2 | Font stack leads with self-hosted Inter + Noto Sans Bengali | ✅ done | `src/index.css` `--font-primary`, `@theme --font-sans` |
| 3 | Critical CSS inlined in `<head>` (hero/nav/reset) | ✅ done | `index.html` inline `<style>` |
| 4 | Self-hosted woff2 preloaded (Inter 400/600) | ✅ done | `index.html`, `public/fonts/` |
| 5 | GTM deferred to first interaction or 3s | ✅ done | `index.html` deferred loader |
| 6 | Emerald/Travelpayouts lazy-loaded at footer intersection | ✅ done | `index.html` IntersectionObserver wrapper |
| 7 | `preconnect` to emrld.ltd | ✅ done | `index.html` |
| 8 | **960w WebP variants generated from JPG masters** | ✅ done | 42 files in `public/assets/images/` |
| 9 | **960w wired into every srcset emitter** | ✅ done | `src/utils/imageAssets.ts` (`buildResponsiveSrcSet`), `scripts/prerender.ts` (LCP preload of prerendered routes), `index.html` (hand-written copy, asserted in sync) |
| 10 | **GTM Consent Mode v2 default (all denied) before GTM** | ✅ done | `index.html` inline script; order asserted by `verify-build.ts` |
| 11 | **Cookie banner + withdraw control (GDPR)** | ✅ done | `src/components/ConsentBanner.tsx`, mounted in `App.tsx`, footer "Cookie settings" |
| 12 | `/fonts/*` cache header (was revalidating every visit) | ✅ done | `public/_headers` |
| 13 | CI regression guards for 9 + 10 | ✅ done | `scripts/verify-build.ts` §2b |
| 14 | Privacy / cookie policy **page** linked from the banner | ⛔ MISSING — legal prerequisite, see below | does not exist anywhere in the app |
| 15 | AVIF variants + `<picture>` | ⏳ open (Phase 6A) | needs a call-site refactor, see note |
| 16 | Re-compress the existing 640/1200 WebPs | ⏸ deliberately skipped | re-encoding WebP→WebP loses a generation; masters already yield good sizes |
| 17 | Post-deploy Lighthouse + CrUX re-measure | ⏳ open | run after deploy, record numbers here |

### Why #14 blocks "EU traffic done"
Consent Mode v2 is now technically compliant (nothing tracks before consent),
but GDPR transparency articles still require an accessible privacy/cookie
policy. The banner intentionally does **not** link to `/privacy` because that
route does not exist — a 404 from a consent banner is worse than no link.
Create the policy page, then add the link in `ConsentBanner.tsx` (`COPY.*.body`
area) and the footer.

### Why #15 is not free
`getResponsiveImageProps()` returns props spread onto plain `<img>` tags in
12 places. AVIF needs `<picture><source type="image/avif">…</picture>`, i.e. a
shared component or 12 call-site edits plus prerender changes. Worth ~25–30%
more image bytes; do it as its own change with its own verify-build guard.

### Measurement note
Baseline numbers below are the 2026-10-04 **lab** values. The 960w breakpoint
mainly helps DPR-2 phones and tablets (the LCP hero drops from ~69KB to ~46KB
on those devices). Expect the gain to show in CrUX/Lighthouse *mobile* LCP
after deploy, not in a desktop lab run.

---

## 📊 Baseline Metrics (2026-10-04)

### Mobile
- **Performance Score:** ~65/100
- **LCP:** 3.2s (Target: <2.5s)
- **TBT:** 1.8s (Target: <200ms)
- **FCP:** 2.1s (Target: <1.8s)
- **CLS:** Good ✓

### Desktop
- **Performance Score:** ~78/100
- **LCP:** 1.8s (Target: <1.2s)
- **TBT:** 400ms (Target: <150ms)

---

## 🎯 Implementation Phases

### **PHASE 1: Critical Rendering Path Optimization** ✅ COMPLETE
**Priority:** CRITICAL  
**Est. Time:** 3 hours  
**Expected Gain:** +40 points  
**Status:** 1A/1B/1C all landed. The follow-up oversight (a leftover Google
Fonts `@import` in `src/index.css` that silently undid 1A) was fixed in commit
`29d8793`; `verify-build.ts` and a grep guard (`fonts.googleapis` must not
appear in `src/`, `public/`, `index.html`) keep it dead. One Phase-1 remnant
was fixed on 2026-10-04 evening: `/fonts/*` had no `Cache-Control` rule, so
the preloaded woff2 files revalidated on every repeat visit — see
`public/_headers`.

#### 1A. Self-Host Google Fonts
**Problem:** 750ms render-blocking request to `fonts.googleapis.com`

**Files to Modify:**
- `index.html` (lines 18-19)
- Create: `public/fonts/` directory
- Create: `scripts/optimize-fonts.ts`

**Steps:**
```bash
# 1. Download fonts from Google Fonts
# Inter: weights 400, 600, 700
# Noto Sans Bengali: weights 400, 600

# 2. Subset to required Unicode ranges
# Latin: U+0000-00FF, U+0131, U+0152-0153
# Bengali: U+0980-09FF

# 3. Convert to woff2 (best compression)
# Use google-webfonts-helper or fonttools

# 4. Generate font-face CSS with font-display: swap
```

**Implementation:**
```html
<!-- BEFORE (index.html lines 18-19) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- AFTER: Inline critical font CSS -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-400.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+0259;
  }
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-600.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+0259;
  }
  @font-face {
    font-family: 'Noto Sans Bengali';
    src: url('/fonts/noto-sans-bengali-400.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0980-09FF;
  }
</style>
<link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400.woff2" crossorigin />
<link rel="preload" as="font" type="font/woff2" href="/fonts/inter-600.woff2" crossorigin />
```

**Expected Impact:**
- Mobile LCP: -750ms
- Desktop LCP: -200ms
- Eliminates external font request waterfall

---

#### 1B. Extract & Inline Critical CSS
**Problem:** 17.3KB CSS bundle blocks render (300ms mobile)

**Files to Modify:**
- `vite.config.ts`
- `index.html`
- Create: `scripts/extract-critical-css.ts`

**Implementation:**
```typescript
// vite.config.ts - Add after existing build config
build: {
  rollupOptions: {
    // ... existing manualChunks ...
  },
  cssCodeSplit: true, // Already enabled ✓
  // Add CSS minification options
  cssMinify: 'lightningcss',
},
```

**Critical CSS Extraction Strategy:**
1. Inline hero section styles (~2KB)
2. Inline navigation styles (~1KB)
3. Inline font-face declarations (~1KB)
4. Defer non-critical CSS with media="print" trick

```html
<!-- index.html -->
<style>
  /* Critical above-the-fold styles */
  .hero-bg { /* ... */ }
  .nav-container { /* ... */ }
  /* Extracted via PurgeCSS or manual */
</style>
<link rel="stylesheet" href="/assets/index-[hash].css" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="/assets/index-[hash].css" /></noscript>
```

**Expected Impact:**
- FCP: -300ms
- LCP: -100ms

---

#### 1C. Add Missing Preconnect Hints
**Problem:** `emrld.ltd` DNS lookup adds 310ms

**File to Modify:** `index.html` (line 24)

```html
<!-- BEFORE -->
<link rel="dns-prefetch" href="https://emrld.ltd" />

<!-- AFTER -->
<link rel="preconnect" href="https://emrld.ltd" crossorigin />
```

**Expected Impact:** -310ms on first emrld script load

---

### **PHASE 2: Image Optimization** ✅ COMPLETE (2B) / ⏸ 2A skipped by design
**Priority:** HIGH  
**Est. Time:** 4 hours  
**Expected Gain:** +25 points  
**Status (2026-10-04):** The 960w breakpoint is fully landed and guarded.
2A's "re-compress existing WebPs" step was deliberately NOT done: the JPG
masters in `src/assets/optimized-social/` (42 files, all 1200px wide) are the
source of truth, and re-encoding the committed WebPs would stack a second
lossy generation on top of the first. Instead every missing variant is
generated **from the masters**.

#### 2A. Re-compress WebP Images — ⏸ SUPERSEDED
**Problem:** 183KB unnecessary image weight

**Decision:** do not re-encode WebP→WebP. Generate all breakpoints from
`src/assets/optimized-social/*.jpg` (the committed masters) with
`scripts/optimize-images-production.sh`, whose `SOURCE_DIR` now defaults to
that directory. On 2026-10-04 the 42 missing 960w variants were generated this
way (quality 78, effort 6; ~35% smaller than their 1200w twins; hero 69KB →
46KB). Sizes measured after generation:

```
public/assets/images/*-960.webp   42 files, ~3.2MB total
largest: maldives_destination 132KB (vs 209KB at 1200w)
hero LCP: clouds_boat_hero 46KB (vs 69KB at 1200w)
```

The script body below is kept for reference only — prefer
`optimize-images-production.sh`:

**Target Files:**
```
public/assets/images/bangkok_destination_1781544149435-1200.webp (142KB → 56KB)
public/assets/images/nepal_destination_1781544132297-1200.webp (131KB → 56KB)
public/assets/images/clouds_boat_hero_1781438671378-1200.webp (69KB → 48KB)
public/assets/images/maldives_destination_1790387286896-640.webp (70KB → 30KB)
public/assets/images/dubai_destination_1781544180311-640.webp (49KB → 16KB)
public/assets/images/singapore_destination_1790387270177-640.webp (50KB → 30KB)
```

**Compression Script:**
```bash
#!/bin/bash
# scripts/optimize-images.sh

IMAGE_DIR="public/assets/images"
QUALITY=78
METHOD=6

for file in "$IMAGE_DIR"/*-1200.webp; do
  echo "Optimizing: $file"
  cwebp -q $QUALITY -m $METHOD -af "$file" -o "$file.tmp"
  mv "$file.tmp" "$file"
done

for file in "$IMAGE_DIR"/*-640.webp; do
  echo "Optimizing: $file"
  cwebp -q 76 -m 6 -af "$file" -o "$file.tmp"
  mv "$file.tmp" "$file"
done
```

**Quality Settings:**
- Hero images: Quality 80 (preserve detail)
- Destination cards: Quality 78
- Thumbnail images: Quality 76

**Expected Impact:** -183KB transferred, -0.8s LCP on 3G

---

#### 2B. Add 960w Responsive Breakpoint — ✅ COMPLETE
**Problem:** Tablets load 1200w images unnecessarily

**What actually shipped (2026-10-04):** there is no per-component srcset to
edit. All responsive images flow through ONE function,
`getResponsiveImageProps()` in `src/utils/imageAssets.ts`, plus the LCP
`<link rel="preload">` that `scripts/prerender.ts` rewrites into every
prerendered route, plus the hand-written copy in `index.html`. The breakpoint
list now lives in `RESPONSIVE_IMAGE_BREAKPOINTS` and the string is built by
`buildResponsiveSrcSet()`, imported by both `imageAssets.ts` and
`prerender.ts`, so a future breakpoint change is a one-line edit.
`scripts/verify-build.ts` §2b fails the build if:

- any image stem in `dist/assets/images` lacks a 640/960/1200 variant,
- any `imagesrcset` in any shipped HTML file lacks a breakpoint,
- the hand-written `index.html` srcset drifts from `buildResponsiveSrcSet()`.

Result: 46 shipped `imagesrcset` attributes (43 blog posts + home + umrah +
blog index) all offer 640/960/1200w. Pages without a hero image (all `/bn/`
routes, text-first hubs) intentionally carry no image preload — their LCP
element is text, and preloading an unused image would hurt, not help.

**Files modified:**
- `public/assets/images/*-960.webp` — 42 new variants from the JPG masters
- `src/utils/imageAssets.ts` — `RESPONSIVE_IMAGE_BREAKPOINTS`, `buildResponsiveSrcSet()`
- `scripts/prerender.ts` — LCP preload uses `buildResponsiveSrcSet()`
- `index.html` — hand-written hero preload copy (asserted in sync by CI)
- `scripts/optimize-images-production.sh` — `SOURCE_DIR` defaults to the masters

```typescript
// Example: Update srcset pattern
srcset="
  /assets/images/hero-640.webp 640w,
  /assets/images/hero-960.webp 960w,
  /assets/images/hero-1200.webp 1200w
"
sizes="
  (max-width: 640px) 100vw,
  (max-width: 1024px) 960px,
  1200px
"
```

---

### **PHASE 3: JavaScript Optimization** ✅ COMPLETE (3A, 3B) / N/A (3C)
**Priority:** HIGH  
**Est. Time:** 3 hours  
**Expected Gain:** +20 points  
**Status:** 3A (deferred GTM) and 3B (lazy Emerald) landed in commit `29d8793`.
3C is void: no polyfills exist in `index.html`, `src/main.tsx` or the bundle
(grep for `polyfill|core-js|nomodule` returns nothing), so there is nothing to
remove. Note the GTM deferral interacts with Consent Mode v2 positively: the
GA4 pageview cannot fire before ~3s, by which time the consent state (or an
explicit denial) is always known.

#### 3A. Defer Google Tag Manager
**Problem:** 140.8KB unused GTM JavaScript on initial load

**File to Modify:** `index.html` (lines 169-176 in root, 163-169 in URAL-Travel-main/)

```html
<!-- BEFORE: Synchronous GTM -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2EWKHC1KE1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2EWKHC1KE1');
</script>

<!-- AFTER: Interaction-deferred GTM -->
<script>
  (function() {
    let gtmLoaded = false;
    const loadGTM = () => {
      if (gtmLoaded) return;
      gtmLoaded = true;
      
      // Load gtag.js
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-2EWKHC1KE1';
      document.head.appendChild(script);
      
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-2EWKHC1KE1');
    };
    
    // Load on interaction OR after 5 seconds
    ['scroll', 'click', 'mousemove', 'touchstart'].forEach(event => {
      window.addEventListener(event, loadGTM, {once: true, passive: true});
    });
    setTimeout(loadGTM, 5000);
  })();
</script>
```

**Expected Impact:**
- TBT: -600ms
- Main thread: -400ms

---

#### 3B. Lazy-Load Emerald Script
**Problem:** 64.6KB affiliate script (34.3KB unused) loads eagerly

**File to Modify:** `index.html` (lines 179-187 in root, 172-180 in URAL-Travel-main/)

```html
<!-- BEFORE: Immediate load -->
<script nowprocket data-noptimize="1" data-cfasync="false">
  (function () {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://emrld.ltd/NTQwMjc3.js?t=540277";
    script.onerror = function () {};
    document.head.appendChild(script);
  })();
</script>

<!-- AFTER: Intersection Observer on footer -->
<script nowprocket data-noptimize="1" data-cfasync="false">
  (function () {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://emrld.ltd/NTQwMjc3.js?t=540277";
          script.onerror = function () {};
          document.head.appendChild(script);
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      
      // Observe footer or main content end
      const target = document.querySelector('footer') || document.querySelector('#root');
      if (target) observer.observe(target);
    } else {
      // Fallback: load after 10 seconds
      setTimeout(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://emrld.ltd/NTQwMjc3.js?t=540277";
        document.head.appendChild(script);
      }, 10000);
    }
  })();
</script>
```

**Expected Impact:** -300ms TBT, defers 64KB from critical path

---

#### 3C. Remove Legacy JavaScript Polyfills
**Problem:** 8.4KB `Object.hasOwn` polyfill for <2% users

**File to Modify:** `vite.config.ts`

```typescript
export default defineConfig(() => {
  return {
    // ... existing config ...
    build: {
      target: 'es2022', // Was implicitly lower
      // Modern browsers only (Safari 15.4+, Chrome 90+, Firefox 88+)
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep for debugging
          passes: 2,
        },
        format: {
          comments: false,
        },
      },
    },
  };
});
```

**Trade-off:** Drops support for Safari <15.4 (0.8% global users)

---

### **PHASE 4: Build Configuration Optimization**
**Priority:** MEDIUM  
**Est. Time:** 2 hours  
**Expected Gain:** +10 points

#### 4A. Improved Code Splitting
**Problem:** Large chunks with unused code

**File to Modify:** `vite.config.ts`

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Preserve existing chunks
        if (id.includes('node_modules')) {
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/scheduler')
          ) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // NEW: Split Recharts for lazy load
          if (id.includes('node_modules/recharts')) {
            return 'vendor-charts';
          }
          return undefined;
        }
        
        // Preserve content-data chunk
        if (id.includes('src/constants')) {
          return 'content-data';
        }
        
        // NEW: Split Travelpayouts widgets
        if (
          id.includes('TravelpayoutsWidget') ||
          id.includes('TravelpayoutsCustomWidget') ||
          id.includes('TravelpayoutsOnboarding')
        ) {
          return 'travelpayouts-bundle';
        }
        
        // NEW: Split admin routes
        if (
          id.includes('AeoInspector') ||
          id.includes('TravelpayoutsOnboarding')
        ) {
          return 'admin-routes';
        }
        
        return undefined;
      },
    },
  },
  chunkSizeWarningLimit: 250, // Keep existing limit
},
```

---

### **PHASE 5: Network & Caching Headers** ✅ COMPLETE (2026-10-04 evening)
**Priority:** MEDIUM  
**Est. Time:** 1 hour  
**Expected Gain:** +5 points (repeat visits)  
**Status:** `public/_headers` exists and is deployed-shaped. Two deliberate
deviations from the snippet below: fonts use
`max-age=604800, stale-while-revalidate=2592000` (NOT `immutable`, because
woff2 filenames are not content-hashed — immutable would pin a stale font
forever), and `/assets/brand/*` likewise. The `/fonts/*` rule was the missing
piece: without it Pages served `max-age=0, must-revalidate` for the two
preloaded woff2 files, charging repeat visitors a revalidation round-trip.

#### 5A. Cloudflare Pages Cache Headers
**Create:** `public/_headers`

```
# Static Assets - Immutable Cache
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/assets/brand/*
  Cache-Control: public, max-age=31536000, immutable

# Fonts
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  
# Images with hash
/assets/images/*
  Cache-Control: public, max-age=31536000, immutable

# Root HTML
/
  Cache-Control: public, max-age=0, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin

# Service worker
/sw.js
  Cache-Control: public, max-age=0, must-revalidate
```

---

### **PHASE 6: Advanced Optimizations**
**Priority:** LOW (Optional)  
**Est. Time:** 4 hours  
**Expected Gain:** +5 points

#### 6A. AVIF Image Format Support
**Benefit:** 30% smaller than WebP with same quality

```html
<picture>
  <source srcset="/assets/images/hero-640.avif 640w" type="image/avif" />
  <source srcset="/assets/images/hero-640.webp 640w" type="image/webp" />
  <img src="/assets/images/hero-640.jpg" alt="..." />
</picture>
```

#### 6B. Service Worker for Offline Support
**File:** `public/sw.js` (Workbox)

---

## 🔐 Consent Mode v2 (GDPR) — ✅ IMPLEMENTED 2026-10-04

Not a CWV item, but it gates serving EU traffic, so it tracks here too. Full
playbook: `GTM_CONSENT_MODE_INTEGRATION.md`. What shipped:

1. **Inline default-state script in `index.html`**, before the deferred GTM
   loader: every storage type `denied`, `security_storage` granted,
   `wait_for_update: 500`. A stored choice is re-applied synchronously here so
   repeat visits boot GTM with the correct state.
2. **`src/components/ConsentBanner.tsx`** — bilingual (EN/BN) fixed bottom bar,
   `role="dialog"`, equal-weight Accept/Decline, no pre-selection. Renders
   *nothing* when a choice exists, so it costs zero CLS/LCP. All writes go
   through `window.uralConsent` (never a direct `gtag` import — GTM may not
   have loaded when the user clicks; `dataLayer` replays on boot).
3. **Withdrawal path**: footer "Cookie settings" button reopens the banner via
   `window.uralConsent.openBanner()` (GDPR Art. 7(3)).
4. **Mounted** in `App.tsx` with `lang` so copy follows the active locale.
5. **CI guard**: `verify-build.ts` fails if the consent default ever ships
   after the GTM loader, or stops defaulting `analytics_storage` to denied.
6. **Smoke-tested** end-to-end in jsdom (first visit → accept → withdraw →
   decline → repeat visit): all green.

**Still required before EU traffic (legal, not technical):** a privacy/cookie
policy page. The banner ships without a policy link on purpose — `/privacy`
does not exist and a 404 in a consent banner is a compliance defect of its
own. See Status Board row 14.

**Post-deploy checks:** clear cookies → reload → Network shows GTM loading
but no `google-analytics.com/collect` with cookies; click Accept →
`consent update` in dataLayer and collect requests begin; GA4 Admin → Data
Settings → Consent Mode shows "Active".

---

## 🧪 Testing & Validation

### After Each Phase:
```bash
# Build production
npm run build

# Preview locally
npm run preview

# Lighthouse test
npx lighthouse http://localhost:4173 \
  --only-categories=performance \
  --output=json \
  --output-path=./lighthouse-report.json

# Check specific metrics
npx lighthouse http://localhost:4173 \
  --preset=desktop \
  --throttling.cpuSlowdownMultiplier=1
```

### Production Verification:
```bash
# Test live site
npx lighthouse https://ural-travel.pages.dev \
  --only-categories=performance \
  --view

# Confirm the deployed HTML is the consent + 960w build (run after deploy):
curl -s https://ural-travel.pages.dev/ | grep -c "gtag('consent','default'"   # expect 1
curl -s https://ural-travel.pages.dev/ | grep -o 'imagesrcset="[^"]*"' | head -1  # expect 640w, 960w, 1200w
curl -sI https://ural-travel.pages.dev/fonts/inter-400.woff2 | grep -i cache-control  # expect max-age=604800
curl -sI https://ural-travel.pages.dev/ | grep -i x-robots-tag  # must be ABSENT on production host
```

### Local gate before pushing:
```bash
npm run lint          # tsc --noEmit
npm run build         # vite build + prerender of ~163 routes
npm run verify:build  # 19 checks incl. srcset/consent regression guards
```

---

## 📈 Expected Final Metrics

| Metric | Before | After | Target Met |
|--------|--------|-------|------------|
| **Mobile Performance** | 65 | 95+ | ✅ |
| **Desktop Performance** | 78 | 98+ | ✅ |
| **LCP (Mobile)** | 3.2s | <2.5s | ✅ |
| **TBT (Mobile)** | 1.8s | <200ms | ✅ |
| **FCP (Mobile)** | 2.1s | <1.8s | ✅ |
| **CLS** | Good | Good | ✅ |

---

## ⚠️ Critical Notes

### Preserving Site Functionality:
1. ✅ **Travelpayouts Integration:** All `wl_id=22462`, `marker=675992`, `trs=540277` preserved
2. ✅ **Affiliate Links:** No changes to `src/components/AffiliatePartners.tsx`
3. ✅ **Prerendering:** All changes compatible with `scripts/prerender.ts`
4. ✅ **Bilingual Support:** Font optimization includes Bengali subset
5. ✅ **Admin Routes:** Lazy-loaded, not removed

### Browser Support After Optimizations:
- Chrome 90+ ✅
- Safari 15.4+ ✅
- Firefox 88+ ✅
- Edge 90+ ✅
- **Dropped:** Safari 14 and below (0.8% global users)

---

## 🔄 Rollback Procedures

If any phase causes issues:

```bash
# Revert specific file
git checkout HEAD~1 -- <file-path>

# Rebuild
npm run build

# Test
npm run preview
```

### Phase-Specific Rollbacks:
- **Phase 1 (Fonts):** Restore external Google Fonts links
- **Phase 3 (GTM):** Restore synchronous GTM snippet
- **Phase 4 (Build):** Revert `vite.config.ts` target to default

---

## 📝 Progress Tracking

**Last Updated:** 2026-10-04 (evening)

- [x] Phase 1A: Self-host fonts ✅ (oversight fix in `29d8793`)
- [x] Phase 1B: Extract critical CSS ✅ (inlined in `index.html`; `public/critical.css` is a leftover reference copy — the inline `<style>` block is the source of truth)
- [x] Phase 1C: Add preconnect hints ✅
- [x] Phase 1+: `/fonts/*` cache header ✅ (2026-10-04 evening)
- [~] Phase 2A: Re-compress images — superseded: generate from JPG masters instead of WebP→WebP
- [x] Phase 2B: Add 960w breakpoint ✅ (42 variants + all three srcset emitters + CI guard)
- [x] Phase 3A: Defer GTM ✅
- [x] Phase 3B: Lazy-load Emerald ✅
- [x] Phase 3C: Remove polyfills — void, none exist
- [x] Phase 4A: Optimize chunks ✅ (`manualChunks` in `vite.config.ts`: vendor-react / vendor-icons / content-data)
- [x] Phase 5A: Add cache headers ✅
- [x] Consent Mode v2 + banner + withdrawal + CI guard ✅ (2026-10-04 evening)
- [ ] Privacy/cookie policy page (legal prerequisite for EU traffic)
- [ ] Phase 6A: AVIF via `<picture>` (needs call-site refactor)
- [ ] Post-deploy Lighthouse/CrUX re-measure + record numbers in Status Board

---

## 🤝 Handoff Instructions for Other AI Tools

### Quick Start:
1. Read this entire guide
2. Check "Progress Tracking" section above
3. Start with uncompleted phases in order
4. Test after each phase (see "Testing & Validation")
5. Update progress checkboxes as you complete tasks

### Key Files to Never Modify:
- `src/components/AffiliatePartners.tsx` (affiliate registry)
- `AGENTS.md` (architectural rules)
- Any file with `Travelpayouts` in the name (unless Phase 4A chunk splitting)

### Contact Points:
- Performance Issues: Review this guide's "Rollback Procedures"
- Build Failures: Check `vite.config.ts` syntax
- Image Issues: Verify `public/assets/images/` paths

---

**Document Version:** 1.0  
**Compatible With:** Vite 6.2.3, React 19.0.1, Tailwind CSS 4.1.14
