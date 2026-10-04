# Google Tag Manager Consent Mode Integration
**Required For:** GDPR/ePR Compliance  
**Affects:** EU visitors + Bangladesh users visiting from EU  
**Priority:** CRITICAL (Legal Requirement)  
**Status:** ✅ TECHNICAL IMPLEMENTATION COMPLETE (2026-10-04) — banner, head
default state, withdrawal path and CI guard all shipped and smoke-tested.
⛔ LEGAL STEP STILL OPEN: the privacy/cookie policy page does not exist yet;
the banner deliberately ships without a policy link rather than linking to a
404. Create the page, then add the link in `ConsentBanner.tsx`.

> **Deviation from the snippets below (deliberate):** the GTM loader stays
> *deferred* (first interaction or 3s) instead of being replaced by the
> synchronous snippet shown in Step 1 — reverting to synchronous GTM would
> give back the ~180ms TBT win from the Core Web Vitals work. Consent Mode
> works identically because the default-state script still runs first and
> `dataLayer` replays when GTM boots. Consent writes go through
> `window.uralConsent`, not a bare `window.gtag` call, for the same reason.

---

## ⚠️ Why This Is Critical

**Current State:** GTM loads analytics without user consent  
**Risk:** GDPR Articles 6 & 7 violation  
**Penalty:** Up to €20M or 4% global revenue  
**Timeline:** Must implement before serving EU traffic

---

## 🎯 Implementation Strategy

### Option 1: Google Consent Mode v2 (Recommended)
**Best For:** Sites already using GTM + GA4

**Pros:**
- Google-native solution
- Conversion modeling when consent denied
- No third-party dependency

**Cons:**
- Requires cookie banner implementation
- Only works with Google tags

---

### Option 2: Third-Party CMP
**Best For:** Sites needing multi-vendor consent

**Popular Options:**
- **Cookiebot** (€9/mo, easy integration)
- **OneTrust** (enterprise, expensive)
- **CookieYes** (free tier available)

**Pros:**
- Handles UI + consent logic
- Multi-vendor support
- Automatic policy updates

**Cons:**
- Monthly cost
- External dependency
- Slower page load

---

## 🔧 Implementation: Consent Mode v2

### Step 1: Update GTM Snippet in index.html

**Find:** Lines 169-176 (or 163-169 in nested dir)

**Replace With:**
```html
<!-- Google Consent Mode v2 -->
<script>
  // Set default consent state BEFORE GTM loads
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',  // Always required
    'wait_for_update': 500  // Wait 500ms for consent banner
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TMPVL82B');</script>
<!-- End Google Tag Manager -->
```

---

### Step 2: Create Cookie Consent Banner

**Create:** `src/components/ConsentBanner.tsx`

```typescript
import { useState, useEffect } from 'react';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    } else {
      // Apply stored consent on page load
      updateConsent(consent === 'accepted');
    }
  }, []);

  const updateConsent = (granted: boolean) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': granted ? 'granted' : 'denied',
        'ad_user_data': granted ? 'granted' : 'denied',
        'ad_personalization': granted ? 'granted' : 'denied',
        'analytics_storage': granted ? 'granted' : 'denied',
        'functionality_storage': granted ? 'granted' : 'denied',
        'personalization_storage': granted ? 'granted' : 'denied',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    updateConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    updateConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            We use cookies to improve your experience and analyze site traffic.
            {' '}
            <a href="/privacy" className="underline">Privacy Policy</a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 3: Add Banner to App.tsx

```typescript
import { ConsentBanner } from './components/ConsentBanner';

function App() {
  return (
    <>
      <ConsentBanner />
      {/* Rest of app */}
    </>
  );
}
```

---

### Step 4: Verify Implementation

**Chrome DevTools Test:**

1. Open DevTools → Application → Cookies
2. Clear all cookies
3. Reload page
4. Before clicking banner:
   - Check Network tab: GTM fires but analytics denied
   - Check Console: `gtag consent default` logged
5. Click "Accept":
   - Check Console: `gtag consent update granted` logged
   - Check Network: Analytics requests now fire

**GA4 Verification:**

1. Admin → Data Settings → Data Collection
2. Consent Mode status should show "Active"
3. Behavior:
   - Denied consent = modeled conversions
   - Granted consent = full tracking

---

## 🌍 Region-Specific Consent (Advanced)

**Only show banner to EU users:**

```typescript
const isEU = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const euCountries = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB','IS','LI','NO'];
    return euCountries.includes(data.country);
  } catch {
    return true; // Show banner if geolocation fails (safe default)
  }
};

useEffect(() => {
  isEU().then(inEU => {
    if (inEU && !localStorage.getItem('cookie-consent')) {
      setVisible(true);
    }
  });
}, []);
```

---

## 📋 Compliance Checklist

### Technical Implementation
- [x] Consent Mode v2 default state in `<head>` (index.html, before deferred GTM)
- [x] Cookie banner UI implemented (src/components/ConsentBanner.tsx, EN+BN)
- [x] Accept/Decline handlers update consent (via window.uralConsent → dataLayer)
- [x] Consent choice persisted in localStorage (key `ural-cookie-consent`, try/catch)
- [x] Consent state applied on page reload (synchronously in the head script)
- [x] Withdrawal path (footer "Cookie settings" → openBanner, GDPR Art. 7(3))
- [x] CI guard: consent default must ship before GTM loader (verify-build.ts)
- [ ] Tested in Chrome DevTools on the deployed site (post-deploy step)
- [ ] Verified in GA4 admin panel (post-deploy step)

### Legal Requirements
- [ ] Privacy policy updated
- [ ] Cookie policy page created
- [ ] "Legitimate interest" basis documented
- [ ] Data retention periods specified
- [ ] User rights explained (access, deletion)
- [ ] DPO contact information provided (if required)

### Bangladesh-Specific
- [ ] Comply with Digital Security Act 2018
- [ ] Bangladesh Bank guidelines for financial data
- [ ] No transfer of Bangladeshi user data outside BD without disclosure

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong: Loading GTM before consent default
```html
<!-- WRONG ORDER -->
<script src="gtm.js"></script>
<script>gtag('consent', 'default', {...})</script>
```

### ✅ Right: Consent default before GTM
```html
<!-- CORRECT ORDER -->
<script>gtag('consent', 'default', {...})</script>
<script src="gtm.js"></script>
```

---

### ❌ Wrong: Not waiting for user choice
```javascript
// Sets granted immediately (bypasses consent)
gtag('consent', 'default', { analytics_storage: 'granted' });
```

### ✅ Right: Default denied, update on accept
```javascript
gtag('consent', 'default', { analytics_storage: 'denied' });
// Later, on user accept:
gtag('consent', 'update', { analytics_storage: 'granted' });
```

---

## 🔗 Resources

- [Google Consent Mode v2 Official Docs](https://support.google.com/analytics/answer/9976101)
- [GDPR Checklist for Developers](https://gdpr.eu/checklist/)
- [Bangladesh Digital Security Act 2018](http://bdlaws.minlaw.gov.bd/act-1261.html)
- [Consent Mode Debugging Tool](https://tagassistant.google.com/)

---

## 💬 Need Help?

**Legal Questions:**  
Consult a GDPR lawyer specializing in digital services.

**Technical Issues:**  
Check Google Tag Manager community forum or hire a GTM consultant.

**Bangladesh Law:**  
Contact Bangladesh Bank or Ministry of ICT for clarification.

---

**Document Version:** 1.0  
**Last Updated:** 2026-10-04  
**Status:** Ready for Implementation
