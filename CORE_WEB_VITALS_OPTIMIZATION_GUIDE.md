# URAL Travel - Core Web Vitals Optimization Guide
**Created:** 2026-10-04  
**Status:** Implementation In Progress  
**Target:** 95+ Performance Score (Mobile & Desktop)

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

### **PHASE 1: Critical Rendering Path Optimization** ✅ IN PROGRESS
**Priority:** CRITICAL  
**Est. Time:** 3 hours  
**Expected Gain:** +40 points

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

### **PHASE 2: Image Optimization**
**Priority:** HIGH  
**Est. Time:** 4 hours  
**Expected Gain:** +25 points

#### 2A. Re-compress WebP Images
**Problem:** 183KB unnecessary image weight

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

#### 2B. Add 960w Responsive Breakpoint
**Problem:** Tablets load 1200w images unnecessarily

**Files to Modify:**
- All image components using srcset
- `scripts/prerender.ts` (image generation logic)

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

### **PHASE 3: JavaScript Optimization**
**Priority:** HIGH  
**Est. Time:** 3 hours  
**Expected Gain:** +20 points

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

### **PHASE 5: Network & Caching Headers**
**Priority:** MEDIUM  
**Est. Time:** 1 hour  
**Expected Gain:** +5 points (repeat visits)

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

**Last Updated:** 2026-10-04 12:09 UTC+06:00

- [x] Phase 1A: Self-host fonts ✅ COMPLETED
- [x] Phase 1B: Extract critical CSS ✅ COMPLETED
- [x] Phase 1C: Add preconnect hints ✅ COMPLETED
- [ ] Phase 2A: Re-compress images
- [ ] Phase 2B: Add 960w breakpoint
- [ ] Phase 3A: Defer GTM
- [ ] Phase 3B: Lazy-load Emerald
- [ ] Phase 3C: Remove polyfills
- [ ] Phase 4A: Optimize chunks
- [ ] Phase 5A: Add cache headers

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
