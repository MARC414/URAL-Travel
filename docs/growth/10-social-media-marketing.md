# 10 — Social Media & Content Marketing Strategy (Bangladesh-first)

**Perspective:** turning the site's verified content into reach, trust and revenue on Facebook, Instagram, LinkedIn and WhatsApp.
**Prereqs:** [03](03-content-topical-authority.md) (content depth), [04](04-keywords.md) (intent), [09](09-synchronization-maintenance.md) (cadence).
**Feeds into:** [07](07-backlinks-free.md) (brand mentions become links), [09](09-synchronization-maintenance.md) (the weekly loop), and the newsletter backend (`functions/api/subscribe.js`).
**Prepared:** 2 October 2026 · **Owner:** URAL Dhaka Desk · **Review cycle:** monthly, or whenever an official portal changes a rule.

> **Why now (what changed this week):** the Bengali prerender is live — 76 crawlable `/bn/` URLs with reciprocal `hreflang` clusters (`/bn/costs/nepal-costs` ↔ `/costs/nepal-costs`), plus 83 English routes. **Every Bangla post can now link to a Bangla page that Google can index.** Before this, Bengali content was a client-side toggle with no URL, so social traffic to Bengali had nowhere to land. This document is written for the post-`/bn/` world.

---

## 0. Assets this strategy stands on (verified in the repo, 2026-10-02)

| Asset | Where | Use in social |
|---|---|---|
| Facebook **@uraltravelbd** | `src/utils/schema.ts` → `URAL_SOCIAL_LINKS` | Primary channel, Bangla-first |
| Instagram **@uraltravelbd** | same | Carousels + Reels, bilingual |
| LinkedIn **/company/ural-travel-bangladesh** | same | English authority + B2B/partnerships |
| WhatsApp **+8801784385335** | same | Conversion desk (BDT booking, no-card) |
| 83 EN + 76 BN prerendered routes | `scripts/prerender.ts` | Every CTA lands on a real, crawlable page |
| 41 blog guides, 6 visa guides, 6 destination cost datasets | `src/constants.ts` | The content mine — never write a post from scratch |
| "Copy Ready FB Post" button on every blog page | `src/App.tsx` (share bar) | Generates a caption + link from `getBlogAeoSnippet50Words()` |
| Newsletter capture + source labels | `functions/api/subscribe.js` | Owned audience; `source` field tracks placement |
| Brand kit (navy `#0B192C`, gold `#F6B73C`, 3 colorways) | `src/URAL-brand-assets/` | Templates, avatars, covers |
| Bengali SERP copy + plan | `BENGALI-SEO-PLAN.md` | Tone reference for BN headlines |

**Nothing in this file requires a code change.** If you want new site features for social (e.g. a `/bn/` landing page for a campaign), that is a content task for [03-content-topical-authority.md](03-content-topical-authority.md), not a marketing improvisation.

---

## 1. Positioning — the introduction arc (posts 1–4 answer "what is URAL?")

### 1.1 The one-liner (use everywhere)

- **Bangla:** URAL (উড়াল) — বাংলাদেশিদের জন্য একটি ফ্রি **ট্রাভেল ইন্টেলিজেন্স ডেস্ক**; যেখানে প্রতিটি নিয়ম অফিসিয়াল সোর্স থেকে যাচাই করা, প্রতিটি খরচ টাকায় হিসাব করা, আর বুকিং হয় সোর্স প্রাইসে।
- **English:** URAL is a free **Travel Intelligence Desk** built for Bangladeshi travelers — every rule verified against official portals, every trip priced in BDT, every booking one tap away at source price.

### 1.2 What URAL is / does / for whom

| Question | Answer (this is your bio, headline, pinned post, and LinkedIn "About") |
|---|---|
| **What it is** | An editorial travel intelligence platform and Dhaka support desk. Not a ticket-selling agency, not a visa broker. |
| **What it does** | (1) Verifies visa/entry/baggage rules against official portals and dates every claim. (2) Prices full trips in BDT — flights, hotels, food, transit, tickets. (3) Links you to book at source price, or books for you in BDT over WhatsApp if you have no endorsed card. |
| **Who it serves** | **Bangladeshis first** — first-time passport holders, families, Umrah pilgrims, medical travelers, NRB families. Then **anyone with any passport**: the guides and cost datasets work for all outbound travel from Dhaka and beyond. |
| **Why it exists** | Because the Bangla travel feed is full of unverified screenshots, agent hearsay and re-posted 2023 rules. URAL's purpose is to give one place where the rule is checked at the source, the price is in your currency, and the receipt is visible. |

### 1.3 The Intelligence System — the differentiator, in five layers

This is not a tagline; it is a description of what the site actually ships. Use it in every explainer post.

| Layer | What it means in practice | Proof point in the product |
|---|---|---|
| **1. Source verification** | Every claim traces to a government/operator portal, never to another blog | Receipts table (Appendix C) — `hajj.gov.bd`, `nusuk.sa`, `thaievisa.go.th`, `imi.gov.my`, `epassport.gov.bd`, `bb.org.bd`, `nbr.gov.bd`, `gaca.gov.sa` |
| **2. BDT-first economics** | Cost tables in Taka, with the FX rate stated | `TRIP_COSTS_DATA` — Nepal, Thailand, Malaysia, Dubai, Singapore, Maldives |
| **3. Step-by-step procedure** | The actual sequence, documents, and failure points — not "apply online" | 41 blog guides + 6 visa guides |
| **4. Banking & payment reality** | Dual-currency endorsement, the $300 single-transaction cap, RFCD vs Travel Quota, no-card BDT booking | Blog: `dual-currency-card-endorsement-bangladesh`, `rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix`, `book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card` |
| **5. Human desk** | A real Dhaka WhatsApp line that books in BDT (bank transfer / bKash / Nagad) | `wa.me/8801784385335` |

### 1.4 What URAL is *not* (say this early — it buys credibility)

- Not a visa guarantee. No one can guarantee a visa; URAL shows the requirements and the source.
- Not a discount club. No invented "50% off" — where a promo exists, it is gated by `isPromoActive()` in code and disclosed as affiliate.
- Not a news page. Rules change → URAL updates the page **and** posts a dated correction.

---

## 2. Authenticity protocol — hard rules, checked before every post

These are the same standards the site holds itself to (see `AGENTS.md` §1 and the audit docs). A post that breaks one of these damages the only asset this brand has: being the account that is *right*.

1. **Source + date on every factual claim.** Format: `সূত্র: thaievisa.go.th · যাচাই: ২ অক্টো ২০২৬`. If a screenshot is used, the URL bar must be visible.
2. **One official portal per claim.** Never cite "an agency said" or a Facebook post. If two official sources conflict, say so and show both.
3. **Volatile numbers carry "as of".** Fares, fees and FX move. Write `আজকের যাচাই অনুযায়ী` and link the page that gets updated.
4. **Corrections are public and timestamped.** Edit the post, add `সংশোধনী (তারিখ): ...` and, if reach was high, post the correction as its own short post. Never silently delete.
5. **No fabricated urgency or scarcity.** No countdown timers, no "মাত্র ২টি সিট বাকি" unless the operator's own system says so.
6. **Affiliate disclosure, in Bangla, plainly.** `কিছু লিংকে বুক করলে URAL ছোট একটি রেফারেল কমিশন পায় — আপনার দাম বাড়ে না।` This mirrors the site's own footer language.
7. **Never advise on visa outcomes, medical decisions, or religious rulings.** Show the official rule and the official channel. Route medical questions to the hospital's own page (e.g. the Bumrungrad guide), religious specifics to the cited authority (`nusuk.sa`, `hajj.gov.bd`).
8. **Verify before posting (2-minute check):** is the page still live? does the CTA URL return 200 on `ural-travel.pages.dev`? is the Bengali post linking a `/bn/` page, not an English one?

**Save-worthy proof format for images:** official portal screenshot (URL bar visible) + one-line conclusion + `যাচাই: [date]` stamp + URAL mark. That layout *is* the brand. Keep it identical every time.

---

## 3. Hook library — first 7 words decide everything

Facebook truncates around 125 characters and Reels in ~3 seconds. Write the hook first, the body second.

| Formula | When to use | Ready hook (BN, copy-paste) |
|---|---|---|
| **Cost shock** | Cost-reveal carousels | `এজেন্সি ৮০ হাজার চায় — নিজে করলে ৫৪ হাজার। নেপালের পূর্ণ হিসাব খুলে দেখাই।` |
| **Rule alert** | A portal changed something | `থাইল্যান্ড e-Visa নিয়ম বদলেছে — পুরনো তথ্যে আবেদন করলে টাকা নষ্ট।` |
| **Passport pride** | Positive national angle | `বাংলাদেশি পাসপোর্টে যেসব দেশে ভিসা ছাড়াই ঢুকতে পারবেন — নেপাল, মালদ্বীপ, আরও…` |
| **Myth vs verified** | De-bunking agent hearsay | `"ক্রেডিট কার্ড আছে, তাই যেকোনো টিকিট কিনতে পারব" — এই ধারণাটাই ৯৫ হাজার টাকার লেনদেন আটকে দেয়।` |
| **Emotional stake** | Umrah/Hajj, parents, first trip | `বাবা-মায়ের প্রথম ওমরাহ — কোন হোটেল জোন, কোন ট্রেন, কত টাকা। সব একসাথে।` |
| **Insider de-mystify** | Explainer posts | `ভিসা ফাইল জমা দিলে ভেতরে আসলে কী হয়? প্রতিটি ধাপ, অফিসিয়াল সোর্সসহ।` |

**Hook rules:** address the reader as **আপনি**; put the number in the first line; never bury the destination; one idea per post; no clickbait the article cannot pay off.

---

## 4. The launch sequence — 10 posts, first 14 days

Post at **9–11 PM Bangladesh time** (peak scroll for the BD audience) on Facebook, cross-posted to Instagram. LinkedIn post 9 goes out Tuesday 9–10 AM. Post 5 is the flagship — do not move it earlier than day 5; posts 1–4 build the "who is this account" context it needs.

### Post 1 — "URAL কী?" (the anchor intro) · Day 1 · Facebook + Instagram

**Goal:** explain what the site is, does and for whom — in one scroll.
**Format:** single image or 30–45 s Reel; brand navy background, gold wordmark, three bullet lines appearing on screen.
**Hook (first line / first 3 s):** `এজেন্সি নয় — এটি একটি ট্রাভেল ইন্টেলিজেন্স ডেস্ক।`

**Caption (BN, copy-paste):**
> **URAL (উড়াল) কী?**
> বাংলাদেশিদের জন্য একটি ফ্রি ট্রাভেল ইন্টেলিজেন্স প্ল্যাটফর্ম।
> ✅ ভিসা, ইমিগ্রেশন আর ব্যাগেজের প্রতিটি নিয়ম — অফিসিয়াল পোর্টাল থেকে যাচাই করা, তারিখসহ
> ✅ প্রতিটি ট্রিপের খরচ — ফ্লাইট, হোটেল, খাবার, যাতায়াত — **টাকায়** হিসাব করা
> ✅ বুকিং হয় **সোর্স প্রাইসে** — কার্ড না থাকলে ঢাকার WhatsApp ডেস্কে bKash/ব্যাংক ট্রান্সফারে
> 🌍 বাংলাদেশিদের জন্য আগে, তবে যেকোনো পাসপোর্টের যাত্রীর জন্য কাজ করে।
> 👉 শুরু করুন: https://ural-travel.pages.dev/bn
> 💬 WhatsApp: +8801784385335
> #URAL #TravelIntelligence #বাংলাদেশ #ভ্রমণ #ভিসা

**English version (same image, cross-post to LinkedIn or Instagram later):** "URAL is a free Travel Intelligence Desk built for Bangladeshi travelers — every rule verified at the official source, every trip priced in BDT, every booking at source price. Not an agency. Start here: https://ural-travel.pages.dev"
**CTA:** `/bn` · **UTM:** `?utm_source=facebook&utm_medium=social&utm_campaign=launch-ural-intro&utm_content=post-01-bn`
**Receipts shown:** none needed — this post is the promise; posts 2–4 prove it.

---

### Post 2 — "৭টি ভুল তথ্য যা আপনার টাকা নষ্ট করছে" · Day 2 · Facebook + Instagram (carousel)

**Goal:** create the "I've been told this" recognition moment; every myth links to the page that debunks it.
**Format:** 8-slide carousel (1 title + 7 myths), 1080×1350.

**Myths (each one is already documented on the site — link the matching page in the caption comment):**

1. "এজেন্সি ছাড়া ভিসা হয় না" → Thailand, Malaysia, Nepal and Saudi all have official direct channels. Guide: `thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide`
2. "ভিসা পেতে বেশি টাকা দিলে নিশ্চিত" → no official fee depends on what an agent charges. Fees are published.
3. "ক্রেডিট কার্ড থাকলে যেকোনো টিকিট কেনা যায়" → the $300 single-transaction cap. Guide: `rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix`
4. "ওমরাহ করতে হজের সিরিয়ালের জন্য অপেক্ষা করতে হয়" → year-round Umrah e-Visa. Guide: `umrah-hajj-guide-bangladesh-nusuk-bdt-cost`
5. "বিদেশে টাকা নিয়ে গেলে কিছুই বলতে হয় না" → customs declaration and DCC charges. Guides: `official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport`, `cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide`
6. "পাসপোর্ট Renew করলে আবার পুলিশ ভেরিফিকেশন লাগে" → waived for unchanged data. Guide: `bangladesh-epassport-application-renewal-64-districts-fee-guide`
7. "নেপাল-মালদ্বীপে গেলে পাসপোর্টে কোনো লাভ নেই" → the opposite: a travel-history ladder is how you build a passport that gets approved. Guide: `fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia`

**Hook:** `আপনার পরিচিত কেউ এই ৭টি ভুল তথ্য এখনও বিশ্বাস করে?`
**Caption ends with:** `কোনটির পূর্ণ গাইড চান — কমেন্টে নাম্বার লিখুন (১–৭), লিংক পাঠিয়ে দিচ্ছি।` ← this is the auto-DM trigger (§7.3)
**CTA:** `/bn/blog` · **UTM:** `...&utm_campaign=launch-myths&utm_content=post-02-bn`
**Receipts:** each slide footer carries the portal name it is checked against.

---

### Post 3 — Live demo: DAC flight search · Day 3 · Facebook (native video) + Reels

**Goal:** prove "book at source price" is real, not a claim.
**Format:** 60–90 s unedited screen recording (mobile screen mirror): open `ural-travel.pages.dev/bn/flights/dhaka-bangkok`, type dates, show the live fare, then open `travelpayouts-wl.html` and show the same route at the partner engine. No cuts that hide loading; authenticity is the point.

**Caption (BN):**
> ঢাকা → ব্যাংকক, আজকের লাইভ ভাড়া। স্ক্রিন রেকর্ডিং, কোনো এডিট নেই।
> নিজে দেখুন কেন দাম বদলায়, আর কেন এজেন্সি কোটেশনের সাথে অনলাইন দাম মেলে না।
> 🔎 নিজের তারিখে নিজে দেখুন: https://ural-travel.pages.dev/bn/flights/dhaka-bangkok
> কার্ড নেই? কনফার্মড PNR নিতে WhatsApp করুন: +8801784385335
**CTA:** `/bn/flights/dhaka-bangkok` · **UTM:** `...&utm_campaign=launch-demo&utm_content=post-03-bn`
**Receipts:** none required — the recording is the receipt. Add `দাম লাইভ, তারিখভেদে বদলায়` in the caption.

---

### Post 4 — How one guide gets built (Intelligence explainer) · Day 4 · Facebook + Instagram

**Goal:** show the verification process that makes URAL different; this is the trust keystone.
**Format:** 5-slide carousel or 45 s Reel: (1) portal open → (2) rule extracted → (3) checked in BDT → (4) written with date → (5) published with the source line.

**Caption (BN):**
> একটি গাইড প্রকাশের আগে যা হয়:
> ১. অফিসিয়াল পোর্টাল খুলি (যেমন thaievisa.go.th, nusuk.sa, bb.org.bd)
> ২. নিয়মটি হুবহু পড়ি, তারিখ নোট করি
> ৩. ফি ও খরচ আজকের রেটে টাকায় হিসাব করি
> ৪. প্রতিটি দাবির পাশে সোর্স ও তারিখ বসাই
> ৫. ভুল ধরা পড়লে — পাবলিক সংশোধনী দিই, চুপচাপ মুছে ফেলি না
> এজন্যই URAL-এর প্রতিটি পাতায় "সূত্র" লেখা থাকে।
> 👉 দেখুন: https://ural-travel.pages.dev/bn/blog
**CTA:** `/bn/blog` · **UTM:** `...&utm_campaign=launch-intelligence&utm_content=post-04-bn`
**Receipts:** screen-record the actual portal page during the video — no mock-ups.

---

### Post 5 — FLAGSHIP: "১০ দিনের ওমরাহ, জনপ্রতি ১ লাখ ১৬ হাজার" · Day 5–6 · Facebook + Instagram (carousel + Reel)

**Goal:** the highest-intent, highest-emotion post in the launch set. This is the one that gets saved and shared to family groups.
**Format:** 7-slide carousel (budget breakdown) + 60 s Reel (Makkah/Madinah b-roll with the numbers as text overlay).
**Data source:** the site's own framework — `BDT 1,16,000 – 1,32,000 / জন` for a 10-day DIY plan, `Umrah e-Visa BDT 15,500 – 19,500 (2–5 দিন)`. Re-verify each line item on the day you post, then stamp the date.

**Hook:** `১০ দিনের ওমরাহ — জনপ্রতি ১ লাখ ১৬ হাজার টাকা। খরচের প্রতিটি লাইন খুলে দেখাই।`

**Caption (BN):**
> **১০ দিনের ওমরাহ — টাকায় পূর্ণ হিসাব (এজেন্সি প্যাকেজ নয়, নিজে করার ফ্রেমওয়ার্ক)**
> ✈️ ঢাকা → জেদ্দা/মদিনা (রিটার্ন)
> 🕋 মক্কা হোটেল — হারাম থেকে হাঁটার দূরত্ব অনুযায়ী রেট বদলায়
> 🚄 হারামাইন ট্রেন: মক্কা ↔ মদিনা
> 🍽️ খাবার + স্থানীয় যাতায়াত
> 🪪 Umrah e-Visa: BDT ১৫,৫০০ – ১৯,৫০০ (২–৫ দিন)
> 👉 জনপ্রতি: **BDT ১,১৬,০০০ – ১,৩২,০০০**
> ⚠️ দাম ও নিয়ম তারিখভেদে বদলায় — প্রতিটি লাইনের সোর্স ও যাচাইয়ের তারিখ কমেন্টে দিয়েছি।
> 🕋 নিয়ম যাচাই: nusuk.sa · hajj.gov.bd | পুরো গাইড: https://ural-travel.pages.dev/bn/umrah
> 💬 প্যাকেজ নয়, নিজে করতে চান? WhatsApp: +8801784385335
**CTA:** `/bn/umrah` (+ comment drops: `/bn/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost`, `/bn/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh`)
**UTM:** `...&utm_campaign=launch-umrah-budget&utm_content=post-05-bn`
**Receipts (must be in the comments, screenshot or exact quote + date):** `nusuk.sa` (e-Visa/permit), `hajj.gov.bd` (Hajj registration), airline/hotel booking terms for the fare lines.
**Do not:** promise a package price, invent a discount, or imply visa approval.

---

### Post 6 — Nepal: the free visa + real 5-day costs · Day 7 · Facebook + Instagram

**Goal:** the highest-shareability post for first-time travelers; Nepal is the classic first-stamp destination.
**Hook:** `বাংলাদেশি পাসপোর্টে বছরে প্রথমবার নেপালের ভিসা — ফ্রি। ৫ দিনে খরচ কত?`

**Caption (BN):**
> নেপাল ভিসা ফ্রি (ক্যালেন্ডার বছরে বাংলাদেশিদের প্রথম ভিসা — SAARC সুবিধা)।
> ৫ দিনের হিসাব, ঢাকা থেকে ফ্লাইটসহ:
> 💰 বাজেট: ~৪৫,০০০ টাকা
> 💰 মিড-রেঞ্জ: ~৬৫,০০০ টাকা
> 💰 লাক্সারি: ~১,২০,০০০+ টাকা
> 🚌 কাঠমান্ডু → পোখরা ট্যুরিস্ট বাস: প্রায় ১,২০০–১,৮০০ টাকা (প্রাইভেট ট্যাক্সির তুলনায় অনেক কম)
> ⚠️ হোটেলে ১০% সার্ভিস + ১৩% VAT আলাদা যোগ হতে পারে — বুক করার আগে জিজ্ঞেস করুন।
> 👉 পূর্ণ খরচের ছক: https://ural-travel.pages.dev/bn/costs/nepal-costs
> 💬 কার্ড নেই? BDT-তে বুকিং: +8801784385335
**CTA:** `/bn/costs/nepal-costs` · **UTM:** `...&utm_campaign=launch-nepal&utm_content=post-06-bn`
**Receipts:** Nepal Department of Immigration portal for the VOA rule (`nepalimmigration.gov.np`), re-checked on post day; the cost lines come from `TRIP_COSTS_DATA`.

---

### Post 7 — The dual-currency card trap (highest-intent, least-covered topic) · Day 9 · Facebook + Instagram

**Goal:** own a topic nobody else explains plainly. This is the post most likely to be forwarded to a family member mid-transaction.
**Hook:** `"Transaction Declined — Exceeds Single Transaction Limit" — এই SMS কেন আসে, আর সমাধান কী?`

**Caption (BN):**
> ৯৫ হাজার টাকার ফ্লাইট বা ৫ রাতের মক্কা হোটেল — কার্ড থাকা সত্ত্বেও ডিক্লাইন?
> কারণ: Travel Quota কার্ডে অনেক ব্যাংকে ডিফল্ট **এক লেনদেনে ~$300** সীমা থাকে।
> দুটি স্থায়ী সমাধান (বাংলাদেশ ব্যাংকের সার্কুলার অনুযায়ী):
> ১. **RFCD অ্যাকাউন্ট** — বিদেশ থেকে ফেরার সময় আনা ক্যাশ জমা রেখে হাই-ভ্যালু পেমেন্ট
> ২. **Temporary High-Ticket Merchant Relaxation** — ব্যাংক শাখায় অগ্রিম অনুমোদন
> 👉 পূর্ণ গাইড: https://ural-travel.pages.dev/bn/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix
> 👉 কার্ড এনডোর্সমেন্ট: /bn/blog/dual-currency-card-endorsement-bangladesh
> কার্ড নেই বা সীমা বাড়াতে সময় নেই? ঢাকা ডেস্ক BDT-তে বুক করে দেয়: +8801784385335
**CTA:** the two blog URLs above · **UTM:** `...&utm_campaign=launch-card-300&utm_content=post-07-bn`
**Receipts:** `bb.org.bd` FX circulars — cite the circular reference, not "a bank said". Never state a specific bank's current limit as universal; say "many banks".

---

### Post 8 — DAC first-timer immigration checklist · Day 11 · Facebook + Instagram (save-optimised)

**Goal:** the "save this for your trip" post — high save rate, low controversy, evergreen.
**Hook:** `প্রথমবার বিমানবন্দরে? ইমিগ্রেশনের আগে এই ৯টি জিনিস হাতের কাছে রাখুন।`

**Caption (BN):**
> ঢাকা (DAC) থেকে প্রথমবার বিদেশ যাচ্ছেন? ক্রম অনুযায়ী চেকলিস্ট:
> ১. পাসপোর্ট (৬ মাসের বেশি মেয়াদ) ২. ভিসা/ভিসা অন-অ্যারাইভাল কাগজ ৩. রিটার্ন টিকিট ৪. হোটেল বুকিং ৫. ভ্রমণের উদ্দেশ্য অনুযায়ী কাগজ (NOC/GO যেখানে প্রযোজ্য) ৬. পর্যাপ্ত ফান্ড প্রমাণ ৭. বোর্ডিং পাস ৮. ব্যাগেজ ওজন ৯. ইমিগ্রেশন প্রশ্নের উত্তর নিজের ভাষায়, গোপন কিছু নয়
> 👉 প্রতিটি ধাপের ব্যাখ্যা ও সোর্স: https://ural-travel.pages.dev/bn/blog/dhaka-airport-outbound-immigration-checklist-noc-go
> 📌 ট্রিপের আগে সেভ করে রাখুন, বন্ধুকে পাঠান।
**CTA:** the checklist article (+ `/bn/visa` hub) · **UTM:** `...&utm_campaign=launch-dac-checklist&utm_content=post-08-bn`
**Receipts:** Immigration/police clearance and airline baggage rules as cited in the article. Do not give legal advice; point to the article's citations.

---

### Post 9 — LinkedIn launch (English authority) · Day 12 · LinkedIn

**Goal:** stake the company claim, attract partners/press, and give the brand a citable English home.
**Format:** text post + one clean image (navy, gold mark, three data points). No hashtag spam; 3–5 tags.

**Copy (EN):**
> Bangladesh's outbound travel market runs on verified information — yet most of what travelers see in Bangla is unverified, undated, or copied from 2023.
>
> We built URAL to fix that, starting with small things that matter:
> • Every visa/entry/baggage claim traced to the official portal (hajj.gov.bd, nusuk.sa, thaievisa.go.th, imi.gov.my, bb.org.bd) and stamped with a verification date.
> • Every trip costed in BDT — flights, hotels, food, transit — not in a foreign currency the traveler has to translate at 2 AM.
> • A Dhaka WhatsApp desk that books in BDT for travelers without an endorsed dual-currency card — because the $300 single-transaction cap is a real barrier, not a small inconvenience.
>
> 83 English pages. 76 Bengali pages. One standard: it must be checkable.
>
> If you work on travel, fintech (cross-border payments for BD cardholders), or diaspora communities — we publish our sources and we're open to comparing notes: https://ural-travel.pages.dev
**CTA:** homepage · **UTM:** `...&utm_campaign=launch-linkedin&utm_content=post-09-en`
**Receipts:** link the two most defensible pages in the first comment (Umrah guide + dual-currency guide).

---

### Post 10 — Engagement seed: "কোথায় যেতে চান ২০২৬-এ?" · Day 13–14 · Facebook + Instagram

**Goal:** build the reply habit and gather the audience's destination intent for the next month's content (and for [04-keywords](04-keywords.md)).
**Format:** poll + simple graphic ("২০২৬ সালের প্রথম ট্রিপ — কোথায়?") with 4 options: নেপাল / থাইল্যান্ড / মালয়েশিয়া / ওমরাহ (or Sri Lanka–Maldives).
**Hook:** `২০২৬-এর প্রথম ট্রিপ কোথায়? ভোট দিন — যে দেশ জিতবে, তার পূর্ণ গাইড আগে বানাব।`

**Mechanic:** reply to every vote with the matching cost page (`/bn/costs/nepal-costs`, `/bn/costs/thailand-costs`, `/bn/costs/malaysia-costs`, `/bn/umrah`). The destination with the most votes becomes next month's flagship post.
**UTM:** `...&utm_campaign=launch-2026-poll&utm_content=post-10-bn`

---

## 5. Recurring weekly formats — the engine after launch

Cadence: **Facebook 4–5 posts/week, Instagram 4/week (2 carousels, 2 Reels), LinkedIn 1–2/week, WhatsApp desk daily.** Bengali is the default; English appears on LinkedIn and as bilingual IG slides.

| Format | Cadence | What it is | Data source | Example |
|---|---|---|---|---|
| **ভিসা ট্রুথ** | 1–2×/week, on change | Rule-change alert, posted within 24 h of a portal update | Official portal + the matching `/bn/blog/...` page | "থাইল্যান্ড e-Visa ডকুমেন্ট তালিকা আপডেট — যাচাই: আজ" |
| **কত টাকা লাগে?** | 1×/week | Cost-reveal carousel, one destination, 3 budget tiers | `TRIP_COSTS_DATA` (`/bn/costs/<id>` routes) | Nepal 45k/65k/120k · Thailand 55k/80k/135k |
| **মিথ vs ভেরিফাইড** | 1×/week | One viral claim, checked on camera, verdict + source | Portal screenshot + article | "$300 limit ঠিক কী, কতটুকু মিথ" |
| **প্রথমবার যাত্রী** | 1×/week | First-timer nerves: airport, immigration, packing, money | `dhaka-airport-outbound-immigration-checklist-noc-go` etc. | "ইমিগ্রেশন অফিসার কী জিজ্ঞেস করেন" |
| **ওমরাহ পাথ** | 1×/week (double in Ramadan) | Umrah/Hajj planning: hotel zones, Haramain train, Nusuk, parents | 12 Hajj & Umrah guides + `/umrah` hub | "মক্কায় কোন জোনে হোটেল নেবেন" |
| **Behind the verification** | 1×/2 weeks | Process transparency: how a claim was checked or corrected | Real edits + correction log | "পুরনো পোস্টে ভুল ছিল — সংশোধনী" |
| **ঢাকা ডেস্ক** | 1×/week | Human desk: no-card BDT booking, bKash/Nagad, what travelers ask | WhatsApp desk logs (anonymised) | "এই সপ্তাহে সবচেয়ে বেশি প্রশ্ন: RFCD" |

**Rule:** every recurring post must link its matching **crawlable** page — Bengali post → `/bn/...` URL. That single rule connects reach (social) to the SEO pipeline (01–04) and to the newsletter (owned audience) instead of letting social traffic evaporate.

---

## 6. Platform playbooks

### Facebook (primary — the Bangladeshi audience lives here)
- **Page @uraltravelbd.** Native video for demos; carousels for costs and myths; text + single image for rule alerts.
- **Groups:** participate in Bangladeshi travel/Umrah/expat groups, but **answer questions with the receipt first, link second** (link only where group rules allow; otherwise link in a reply to whoever asks). Never mass-post the same link; that is how pages get restricted.
- **Reels:** repost every IG Reel natively (do not share the IG link) — FB distributes native uploads better.
- **Comment discipline:** reply with the specific page link, not "inbox please". Pinned first comment carries the source lines.

### Instagram (@uraltravelbd)
- 1080×1350 carousels (cost tables, myth vs verified), 9:16 Reels (demos, explainers), Stories for polls and "save this" reminders.
- Bilingual slides: Bangla headline, English subline — serves both the BD audience and the global visitors the site also serves.
- Highlights: `ভিসা`, `খরচ`, `ওমরাহ`, `প্রথমবার`, `সংশোধনী` (corrections as a highlight = unusual and trust-building).

### LinkedIn (/company/ural-travel-bangladesh)
- English only. Authority, partnerships, market data, diaspora/fintech angles. One post a week minimum, one long-form article a month built from a blog guide.
- Never cross-post Bangla consumer content; use the English pages (`/umrah`, `/costs/...`) as links.

### WhatsApp (+8801784385335)
- The conversion desk, not a broadcast channel. Status is used for short rule alerts; broadcasts only to people who opted in (newsletter consent).
- Keep 5 canned replies ready: flight hold, hotel voucher, Haramain train, RFCD/high-ticket, general visa-file question. Every reply links the matching page so the traveler can verify it themselves.

### Phase 2 (do not start before the launch month is measured)
- **YouTube Shorts / TikTok:** requires verification of local requirements first (TikTok's Bangladesh status, YouTube monetisation/partner rules for BD-based accounts), plus a repeatable caption-dubbing workflow. Treat as a separate project with its own step-0 compliance check; do not improvise.

---

## 7. Conversion & measurement architecture

### 7.1 Every post maps to a page (the only rule that matters)
| Post theme | Bengali CTA page | English CTA page |
|---|---|---|
| Intro / general | `/bn` | `/` |
| Destination cost | `/bn/costs/<id>` | `/costs/<id>` |
| Visa guide | `/bn/visa/<id>` | `/visa/<id>` |
| Flights/hotels demo | `/bn/flights/<route>` | `/flights/<route>` |
| Umrah/Hajj | `/bn/umrah` | `/umrah` |
| Long guide | `/bn/blog/<slug>` | `/blog/<slug>` |

### 7.2 UTM convention (mandatory on every link, including Stories swipe-ups)
`?utm_source=<facebook|instagram|linkedin|whatsapp>&utm_medium=social&utm_campaign=<launch-…|weekly-visatruth|…>&utm_content=<post-05-bn>`
Never modify the canonical path; never shorten into a redirect that drops the query string.

### 7.3 Comment-keyword auto-DM (manual at launch, zero cost)
Post rule: **"কমেন্টে লিখুন `<keyword>` — লিংক পাঠিয়ে দিচ্ছি"** — e.g. `নেপাল`, `ওমরাহ`, `কার্ড`. Reply to every comment within 2 hours with the `/bn/` page URL. This turns comments into reach signal *and* gives a direct link nobody has to click through a bio for. Keep a reply swipe file so it stays fast and consistent.

### 7.4 The CTA ladder (never skip a rung)
**Follow page → click the verified page → sign up to the newsletter → WhatsApp the desk.**
The newsletter (`functions/api/subscribe.js`) is the only audience you own; when a post drives site traffic, the on-page signup records the placement source. Use campaign-specific source labels (`source=IG-umrah-budget-post05`) in any campaign landing context so attribution survives.

### 7.5 The in-product shortcut
Every blog page already renders a **"📋 Copy Ready FB Post"** button that generates a caption and the correct `/bn/` link from the article's 50-word AEO snippet. Use it as the starting draft for weekly posts — the wording is already SEO-aligned, and it guarantees the link is the crawlable one.

---

## 8. 30-day calendar skeleton (launch month)

| Day | Platform | Format | Post |
|---|---|---|---|
| 1 | FB + IG | Image/Reel | **1. URAL কী?** (anchor intro) |
| 2 | FB + IG | Carousel | **2. ৭টি ভুল তথ্য** |
| 3 | FB + IG | Native video | **3. Live DAC fare demo** |
| 4 | FB + IG | Carousel/Reel | **4. How a guide is built** |
| 5 | FB + IG | Carousel + Reel | **5. Flagship: 10-day Umrah budget** |
| 6 | — | — | Comment/reply day: answer every question with links |
| 7 | FB + IG | Carousel | **6. Nepal free visa + costs** |
| 8 | FB + IG | Reel | ভিসা ট্রুথ #1 (whatever the week's portal check found) |
| 9 | FB + IG | Carousel | **7. The $300 card trap** |
| 10 | FB + IG | Carousel | কত টাকা লাগে? #1 (Thailand tiers) |
| 11 | FB + IG | Carousel | **8. DAC first-timer checklist** |
| 12 | LinkedIn | Text post | **9. Launch (EN authority)** |
| 13 | FB + IG | Poll | **10. ২০২৬ poll** |
| 14 | — | — | **Week-1 review:** GSC + FB Insights + newsletter count (§9) |
| 15–30 | FB + IG | Weekly set | Monday ভিসা ট্রুথ · Wednesday কত টাকা লাগে? · Friday মিথ vs ভেরিফাইড · +1 first-timer/Umrah post; LinkedIn Mondays |
| 30 | — | — | **Month review:** double down on the top format, kill the weakest; update [04](04-keywords.md) with the poll's intent data |

---

## 9. KPIs & where to read them

| Metric | Target (first 90 days) | Source of truth |
|---|---|---|
| Page followers | FB 2,000 · IG 1,000 | Platform insights |
| Reach per post (median) | 3,000+ FB, 1,500+ IG | Platform insights |
| **Saves/shares per post** | Saves ≥ 50; shares ≥ 30 on cost/Umrah posts | IG/FB insights — this is the real quality metric |
| Outbound clicks | 500+/month | UTM-tagged sessions (Cloudflare/analytics) |
| Newsletter signups | 150+/month | `functions/api/subscribe.js` log + source labels |
| WhatsApp desk conversations | 100+/month | Desk log (count only, no personal data in reports) |
| Comment → reply-with-link rate | 100% within 2 h | Manual |
| Corrections published | Track all, publish all | Correction log in this file's §10.3 |

**Kill rule:** any format below 1,000 median reach after 4 attempts gets cut, not "fixed". Any format with high saves but low clicks gets a stronger pinned comment — the content works, the link is buried.

---

## 10. Operations

### 10.1 Weekly source scan (30 minutes, every Sunday)
Open and check the following for changes. If something changed → publish ভিসা ট্রুথ **and** update the matching site page in the same week (that update is a content edit, tier "low risk" in the playbook rules).

`hajj.gov.bd` · `nusuk.sa` · `ksavisa.sa` · `thaievisa.go.th` + `dhaka.thaiembassy.org` · `imi.gov.my` / `malaysiavisa.imi.gov.my` · `epassport.gov.bd` · `bb.org.bd` · `nbr.gov.bd` · `gaca.gov.sa` · `u.ae` / `gdrfad.gov.ae` · `szgmc.gov.ae` · `rta.ae` · `visitsaudi.com` · `rcmc.gov.sa` · `myrapid.com.my` · `islam.gov.my` · `malaysia.travel` · Nepal & Maldives immigration portals · `immigration.gov.sg`

### 10.2 Pre-publish checklist (every post)
- [ ] Hook contains the number/destination in the first line.
- [ ] Every factual claim has a source + verified date, in the post or pinned comment.
- [ ] Bengali post links a `/bn/` URL; link returns 200.
- [ ] UTM on every link.
- [ ] Affiliate disclosure present where a partner link is used.
- [ ] No promise of visa outcome, no invented discount, no unverified screenshot.
- [ ] Alt text / on-image text readable at phone size; brand navy + gold, wordmark present.

### 10.3 Correction log (append-only; never delete an entry)
| Date | Post | What was wrong | Correct source | Action taken |
|---|---|---|---|---|
| — | — | — | — | — |

### 10.4 Monthly loop
1. Review §9 metrics → decide next month's flagship.
2. Take the best-performing post and turn it into a blog content upgrade (feeds [03](03-content-topical-authority.md)).
3. Take comment questions that aren't answered on the site → queue new pages (feeds [04](04-keywords.md)).
4. Re-check that every high-traffic social page is still indexed in GSC (feeds [01](01-indexing-crawling.md)).
5. Update this file's "Prepared"/review date if anything material changed.

---

## Appendix A — Brand & template conventions

- **Colors:** navy `#0B192C` background, gold `#F6B73C` accents/CTA, white text. Bengali headline in gold, English subline in white/70%.
- **Wordmark:** `/assets/brand/svg/ural-wordmark.svg`; ascent mark for avatars. Full kit: `src/URAL-brand-assets/`.
- **Sizes:** 1080×1350 (carousel, FB/IG), 1080×1920 (Reels/Stories), 1200×630 (link previews — matches the generated `og-image.jpg`).
- **Receipt stamp:** bottom-left `সূত্র: <portal> · যাচাই: <date>` in 11–12 pt equivalent. Identical on every proof image.
- **Tone:** confident, plain, specific. Bangla: `আপনি` form, no over-formality, no fear-selling. English: factual, market-aware.

## Appendix B — What never to post

- Politics, party commentary, or anything that splits the audience.
- Religious rulings or fiqh opinions — cite the official body, never interpret.
- Medical advice — link the hospital's own page and the medical-visa guide.
- Competitor attacks by name.
- Screenshots of other people's travel-agent posts to mock them (screenshot the *claim*, redact the identity, and only when it is demonstrably wrong).
- Any fare or fee without a date stamp.

## Appendix C — Definition of done for this file

- [ ] 10 launch posts published on schedule with UTMs live.
- [ ] Every post's CTA returns 200 for both `/bn/...` and the matching English page.
- [ ] Newsletter has ≥ 100 signups attributable to social sources.
- [ ] At least one public correction published (proves the protocol is real, not marketing).
- [ ] Weekly source scan has run 4 consecutive weeks and produced ≥ 2 ভিসা ট্রুথ posts.
- [ ] Month-1 review completed; weakest format cut, strongest doubled.
