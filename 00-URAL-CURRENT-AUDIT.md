# URAL — Current Audit and Diagnostic Baseline

**Audit date:** 25 October 2026 · **Audited repository:** `4f052a6982b1e8fbe5a2ab2ac7e915d06fb45697`

**Provenance:** the comprehensive audit presented to the owner immediately before the repository strategy cleanup. The owner designated that audit as the primary current diagnostic baseline. Its findings and recommendations are preserved below; older reports have not been merged into it.

**Authority boundary:** this is a dated diagnostic snapshot. The recommended repair batch, 30-day cycle, sample cadence and future gates below remain the audit's recommendations, not an approved implementation schedule. Current task authority and subsequent documents are in the [strategy index](00-URAL-STRATEGY-INDEX.md).

**26 October 2026 context update:** the owner subsequently supplied corrected historical pages.dev GSC query/page excerpts and very early `.co.uk` signals, and requested a master editorial guide plus an existing-content social production programme. See the [content optimization guide](URAL-CONTENT-OPTIMIZATION-GUIDE.md), [social ecosystem](URAL-SOCIAL-CONTENT-ECOSYSTEM.md) and [search-evidence record](docs/03-social/SEARCH-EVIDENCE.md). The proposed social duration is now derived from the selected assets and workload rather than inherited from this audit's 30-day example. Full GSC periods/filters, GA4/partner outcomes and the implementation issues below remain unverified. The dated audit findings and recommendations are preserved below.

## Recommendation

Run a focused, 30-day Bangladesh Umrah distribution-and-conversion cycle, preceded by a small reliability repair batch.

URAL already has a substantial publishing and planning foundation. The immediate opportunity is to turn that existing work into qualified visits, useful planning actions, genuine enquiries and attributable partner bookings.

UK Muslim independent travel remains a credible future expansion direction. The evidence does not yet justify making it the current operating focus.

No repository files were changed during the audit. The later documentation cleanup is a separate task.

## A. Executive understanding

URAL's strongest current proposition is:

> Practical travel intelligence for Bangladeshi travellers: passport-specific rules, BDT-first planning, bilingual guidance and clear next steps before spending money.

Umrah gives this proposition a particularly useful focus: eligibility, accommodation, elderly-family logistics, flights, payments and permits are connected decisions.

### What the evidence supports

**FACT**
- Production has **260 sitemap URLs: 130 English and 130 Bengali**.
- The current build contains **51 articles in each language**.
- Twelve articles are classified under Hajj & Umrah, supported by additional banking, transport and destination material.
- The Umrah cluster already has substantial references and curated internal links.
- The site includes a quote-entry budget worksheet, affiliate integrations and human-contact routes.

**INFERENCE**
- URAL has enough material to test a coherent traveller journey immediately.
- The likely bottlenecks are distribution and conversion reliability, rather than insufficient publishing volume.
- Actual audience demand and commercial performance remain unproven without current GSC, GA4 and Travelpayouts data.

**RECOMMENDATION**
- Make Bangladesh Umrah the initial commercial learning cycle.
- Use Banking & Forex content to resolve payment obstacles within that journey.
- Keep Fard Hajj as a distinct, linked planning topic.
- Expand internationally through measured audience tests after the existing journey becomes reliable.

## B. Current-state audit

### 1. Technical foundation: strong, with a client-side SEO exception

**Verified**
- All **260 production sitemap URLs returned HTTP 200**.
- The crawl found matching self-canonicals and `og:url` values, with language alternates present.
- All **102 article URLs** carried Article schema.
- No `Product` or `Offer` markup presented partner inventory as products sold by URAL.
- Tested HTTP, `www` and legacy `pages.dev` redirects returned **301**, preserving tested paths and queries.
- Unknown routes returned genuine **404** responses.
- The isolated validation passed:
  - `npm run lint`
  - `npm run build`
  - `npm run verify:build` — **356 checks**
  - All **15 existing test suites**

This is a valuable foundation worth maintaining.

### Implementation status

| Area | Classification | Current assessment |
|---|---|---|
| Prerendering, sitemap, metadata and redirects | Implemented | Production HTML and build verification are substantially healthy. |
| Client-side SEO | Partial / conflicting | Attraction-detail canonicals become incorrect after JavaScript runs. |
| AEO structure | Implemented / partial | Answers, articles, FAQs, authorship and references exist; accuracy and visibility still require editorial and performance evidence. |
| Content library | Implemented / partial | Enough material for distribution; reference and linking debt remains outside the strongest cluster. |
| Umrah planning | Implemented / partial | Strong content and worksheet; booking sequence and commercial handoffs need alignment. |
| Information architecture | Implemented / partial | Existing hubs and intent ownership are useful; planned campaign links do not consistently respect real routes. |
| Bengali localization | Partial | Crawlable pages are implemented; editorial links and some interface copy lack parity. |
| Affiliate infrastructure | Partial | Registry, fallback and expiry mechanisms exist; several embeds bypass them and some handoffs discard selections. |
| Analytics | Partial / missing configuration | Data-layer events exist, but the published GTM container lacks the required custom-event forwarding. |
| Enquiries and subscriptions | Partial / unreliable | Interfaces can report success without confirmed delivery or enrollment. |
| Social execution | Planned / conflicting | Existing plans contain usable material alongside broken links, stale claims and conflicting audience priorities. |
| UK/Europe expansion | Future | Research and briefs exist; validated URAL-specific demand and economics do not. |

### 2. P0 — Measurement cannot yet support a trustworthy campaign decision

**FACT**
The downloaded public GTM container contains the Google tag and a pageview tag triggered by `virtual_page_view`. It does not define forwarding for URAL's custom affiliate and enquiry events.

In `src/utils/analytics.ts`, the delegated click classifier also:
- Counts internal `/kkday-hotels` navigation as an affiliate click.
- Counts an internal article link containing `airhelp` as an affiliate click.
- Can classify a Travelpayouts editorial-source link as commercial.
- Uses the same `whatsapp_click` event for sharing a guide and contacting the desk.
- Does not propagate an incoming social `sub_id` into ordinary partner links.

These classification errors were reproduced.

**INFERENCE**
A social test could appear to generate commercial activity while counting internal navigation—or fail to expose genuine activity in GA4.

**RECOMMENDATION**
Establish one verified measurement chain:

**Campaign → landing page → meaningful planning action → genuine partner handoff or enquiry → confirmed downstream outcome**

The repair should:
- Correct outbound-link classification.
- Distinguish sharing, contact attempts and received enquiries.
- Cover button-driven handoffs as well as ordinary links.
- Forward the intended events through GTM and verify them in GA4.
- Use supported partner SubIDs for downstream attribution.
- Verify one pageview per navigation before adding further tracking.

**Important distinction:** a WhatsApp opening is not a received enquiry; an affiliate click is not a booking.

### 3. P0 — Forms and alerts overstate completion

**FACT**
- `src/routes/ContactRouteView.tsx` sets success in `finally`, regardless of response success.
- Subscription handling in `src/App.tsx` similarly marks the visitor subscribed without checking delivery results.
- With both subscription requests simulated as HTTP 502, the browser still displayed **“The travel newsletter is enabled.”**
- `PriceAlertModal.tsx` stores a local badge and opens WhatsApp, then displays **“Price Alert Registered!”**
- The inspected subscription backend sends notifications to an inbox. The audit did not establish an audience-list system, unsubscribe workflow or automated fare-monitoring service.

**INFERENCE**
Potential leads can be lost while visitors believe the task is complete. Audience-growth figures can also overstate genuine enrollment.

**RECOMMENDATION**
- Base success on a confirmed server outcome.
- Provide useful failure and retry states.
- Consolidate delivery through a clear, verifiable path.
- Match “newsletter” and “fare alert” promises to services the owner actually operates.
- Measure confirmed subscriptions and received enquiries separately from attempts.

### 4. P0 for the promoted journey — Hotel-search inputs do not survive the handoff

**FACT**
On `/umrah`, changing the hotel city from **Makkah to Madinah** changed the button text but left its destination unchanged: the same generic Klook affiliate URL.

The link construction in `TravelpayoutsCustomWidget.tsx` does not encode hotel city, dates or guest selection. Following the affiliate redirect led to Klook's general site.

Other integration inconsistencies include:
- Generic transfer/car widgets collecting fields but opening provider-level links.
- `AiraloEmbed.tsx`, `KiwitaxiEmbed.tsx` and `QeeqEmbed.tsx` containing hardcoded affiliate URLs outside the registry.

**INFERENCE**
Visitors perform work that the next website cannot use. That weakens the most commercially important part of the journey.

**RECOMMENDATION**
Make the promoted hotel handoff truthful and task-specific. Use a verified, supported deep link where available; otherwise clearly communicate that selection happens on the partner site and simplify the preceding interaction.

Confirm Saudi accommodation availability and attribution before making this the main campaign CTA.

### 5. P1 — Static SEO passes, but attraction canonicals break after rendering

**FACT**
These pages initially return correct static metadata:

- `/attractions/london:992434`
- `/bn/attractions/london:992434`

After JavaScript runs, their canonicals change to `/experiences` and `/bn/experiences`. Bengali `og:url` and language alternates also changed to the hub.

The shared cause is in `src/hooks/useSeoMeta.ts`: attraction routes are reduced to `/experiences`.

A separate Bengali legacy-query check reached the correct article client-side but dropped the incoming UTM parameter.

**RECOMMENDATION**
Correct client/static route parity and preserve non-routing query parameters. Verify the result after JavaScript execution, not only in `dist/`.

### 6. P1 — Content quality is uneven, and summaries need the same care as articles

The build's non-blocking debt report identifies:

| Finding | Count |
|---|---:|
| Articles missing `references` metadata | 25 |
| Articles without a curated blog-to-blog link | 9 |
| Articles without a curated editorial inbound link | 9 |
| Bengali pages rendering no blog anchors | 10 |
| Bengali internal-link arrays shorter than English | 24 |

These counts overlap. They are **not** evidence that every affected page is unusable.

Likewise, a missing `affiliateCTA` field does not prove a page has no monetization: creator-referral and other placements exist separately.

**Priority corrections**
- Preserve the Umrah budget's stated basis: **BDT 116,000–132,000 is a retained historical reference**, not a fresh quote.
- Align the hub's visa-first introduction with its “Step 1: flights” navigation.
- Reconcile the hub's approximately 2¼-hour rail summary with its reviewed transport guidance.
- Describe fixed currency conversions accurately; the inspected widget rates are constants.
- Apply source corrections to snippets, FAQs, widgets and Bengali copy together.

Some unsupported hotel-access claims exist in dormant inline-results data. Because that results mode is not enabled by current call sites, those strings were **not counted as verified live-page claims**.

### 7. Performance, accessibility and mobile experience

**FACT**
- Eager JavaScript measured **202.9 KB gzip against a 205 KB budget**.
- Responsive image assets, localized font loading and route-level lazy loading are implemented.
- Sampled pages at an emulated **390px width** had no horizontal overflow.
- The first-visit cookie banner occupies a substantial part of the mobile viewport.
- The homepage accessibility scan flagged a visible-label/accessibility-name mismatch.
- The fare-alert modal lacks complete dialog semantics and focus management.
- The mechanical UI detector returned **38 font-size advisories**, not 38 blocking defects.

**Scoped UI assessment:** accessibility **2/4**, performance engineering **3/4**, theming **3/4**, responsiveness **3/4**, implementation integrity **2/4** — **13/20**. This is an engineering assessment of the inspected surfaces, not a Lighthouse performance score or WCAG certification.

**RECOMMENDATION**
Prioritize reliable task completion, modal accessibility and mobile comprehension. Preserve the existing brand system and tight loading budget.

Field Core Web Vitals and physical-device touch behavior remained unmeasured in this audit.

## C. Strategy reconciliation

| Conflict | Resolution |
|---|---|
| Early research advocates an immediate UK pivot; later research returns to Bangladesh Umrah | The latest owner direction and existing product foundation support Bangladesh execution now, international expansion later. |
| Banking-first plans, Umrah plans and the India gap inventory compete for attention | Use banking to support the Umrah journey. A large content gap does not automatically become the next publishing task. |
| Distribution-first freeze versus verified defects | Preserve the freeze's purpose while repairing measurement, forms, broken campaign links and misleading handoffs. |
| “Keep all platforms” versus the current four-channel priority | Allocate active effort to Facebook, Instagram/Reels, WhatsApp and LinkedIn. Additional channels need a specific audience and capacity case. |
| UK/diaspora draft plan versus publication readiness | `19-S4-UK-DIASPORA-DRAFTS-PLAN.md` contains briefs, not finished drafts. Its mixed passport/residency assumptions and terms such as “UMM,” “BIC” and “GBP-issued ticket proof” need correction before use. |
| Research labels niche demand and AI resistance “PROVEN” | Treat these as hypotheses unless supported by traceable evidence relevant to URAL's audience and operating model. |

### Historical findings that should not drive new work

- Bengali routes are already crawlable.
- Affiliate disclosure is visibly present.
- Drive integration already exists.
- Scheduled publishing now includes overdue recovery.
- The difference between committed feeds and due posts in `dist/` is intentional.
- Calling the KKday promotion expired on 25 October conflicts with the registry's **31 October 2026** expiry.

The monetization research also contains an important arithmetic error:

**6 bookings × $200 × 6% = $72, not $720.**

Actual forecasting must additionally use each programme's commission basis, cancellations and approved payouts.

### The social plan needs correction before reuse

Verified broken destinations include:

| Planned URL returning 404 | Existing destination to use |
|---|---|
| `/visa/thailand` | `/visa/thailand-visa` |
| `/hotels/bangkok` | `/hotels/bangkok-hotels` |
| `/visa/saudi-arabia` | The relevant existing Umrah eligibility guide |
| `/costs/saudi-arabia` | `/umrah` for the existing budget worksheet |

Planned hooks such as “41 visa-free countries,” “two apps, one Rawdah permit,” and a fixed DCC loss also conflict with the more qualified current guidance.

Finally, the measurement runbook's claim that declined visitors produce no analytics requests is too absolute: production sent GA4 requests with denied-consent flags. Drive remained gated. Multiple Google-tag requests alone do **not** establish duplicate pageviews.

## D. Missed opportunities worth pursuing

### 1. Promote a connected decision journey

The strongest opportunity is to connect existing assets around the reader's next decision:

**Eligible visa route → trip structure → comparable quotes → hotel access → flights and transfers → payment → booking**

A social post should enter at the relevant step, rather than asking every visitor to start at the homepage.

### 2. Make the existing quote worksheet a campaign asset

The worksheet offers a practical reason to visit:

> “Put your own flight, hotel, visa and transfer quotes into one comparable budget.”

That is useful without promising current market prices or automatic savings.

### 3. Match each commercial action to its article

Examples:
- Hotel-access article → a usable accommodation handoff.
- Elderly-family logistics → appropriate assistance and transfer options.
- Flight-routing article → a route-aware flight comparison.
- Nusuk guide → optional connectivity advice, clearly secondary to official permit instructions.

More affiliate buttons are less valuable than a relevant, dependable next step.

### 4. Learn from actual enquiries

Record the recurring planning obstacle: eligibility, card payment, accommodation access, trip cost or transport.

These questions can guide article improvements and social topics. Anonymized patterns are more useful than another broad keyword list.

### 5. Test the natural diaspora bridge

A potentially useful later segment is **relatives abroad helping family in Bangladesh arrange and pay for travel**.

That builds on current content. It should be distinguished from UK-passport Umrah guidance, which has different eligibility and departure assumptions.

## E. Prioritized roadmap — recommendations recorded by the audit

### P0 — Establish campaign readiness

**Before promoting the main journey**

| Work | Completion evidence |
|---|---|
| Repair event classification and GTM forwarding | One real action produces one correctly classified event; internal navigation produces none. |
| Confirm affiliate setup | Correct project/program status and an identifiable test click in Travelpayouts. |
| Repair form success handling | Failed delivery displays failure; confirmed delivery displays success. |
| Align alert/subscription promises | The interface describes an actual, fulfillable service. |
| Correct campaign URLs and claims | Every campaign destination works and matches the post's promise. |
| Repair the main hotel handoff | Its behavior matches the fields and CTA shown to the visitor. |

Current identifiers are marker **675992**, project **589561**, and white label **22462**. Working redirects alone do not establish programme approval or earnings.

### P1 — Run the 30-day Bangladesh Umrah cycle

Use a small set of existing destinations:
- Umrah eligibility/process guide.
- `/umrah` budget worksheet.
- Nusuk guide.
- Elderly-parent guide.
- Hotel-access/Haramain guide.
- Relevant payment guidance.

**Suggested weekly output**
- **Two short videos and one carousel**, adapted for Facebook and Instagram.
- WhatsApp Status sharing and genuine enquiry follow-up.
- One LinkedIn post focused on editorial method, useful findings or partnerships.

Use Bengali-first delivery for the current audience, with appropriate English adaptations. Choose posting times from audience response using an explicit timezone.

Example campaign link:

```text
https://uraltravel.co.uk/bn/umrah
?utm_source=facebook
&utm_medium=social
&utm_campaign=bd_umrah_30d
&utm_content=budget_carousel_01
```

UTMs identify acquisition. Partner-supported SubIDs identify downstream placements; simply adding a SubID to the incoming website URL does not connect the two.

### Weekly scorecard

Track:
1. Engaged campaign visits to the selected guides.
2. Useful planning actions.
3. Genuine partner handoffs.
4. Enquiries actually received and their quality.
5. Confirmed audience subscriptions.
6. Partner-reported bookings and approved commissions, allowing for reporting and travel delays.

**One hundred qualified visits is a reasonable initial learning checkpoint, not proof of market fit or a revenue forecast.**

At day 30:
- Low reach → improve distribution and hooks.
- Visits without planning actions → improve promise-to-page alignment.
- Planning actions without handoffs → inspect CTA relevance and usability.
- Handoffs without bookings → investigate inventory, checkout friction, eligibility and attribution.
- Too little data → extend the test rather than declaring the niche unsuccessful.

### P2 — Improve according to observed demand

Prioritize:
- References and Bengali links on pages receiving meaningful visits.
- Contextual affiliate integration consistency.
- Remaining client/static SEO discrepancies.
- Documentation that misstates current behavior.
- Performance changes tied to a measured problem.

### FUTURE — Controlled UK and Europe pilots

Open a small pilot when there is:
- Reliable current measurement.
- Repeated evidence of a specific UK/diaspora planning need.
- Correct passport/residence/departure segmentation.
- Suitable, attributable partner inventory.
- Capacity to verify and maintain the additional guidance.

Start with one clearly differentiated reader task. European rail, Benelux and Muslim-friendly city travel remain candidates to evaluate against that evidence.

## F. Final recommendation and approval point

The audit recommended **one bounded reliability repair batch, followed by a 30-day Bangladesh Umrah distribution-and-conversion cycle**.

This uses URAL's strongest existing assets and produces evidence for the next investment decision.

Two owner inputs remain needed:

1. **Desk scope:** what the Dhaka desk genuinely fulfils—advice/referrals, booking assistance, BDT payments, manual updates or ongoing fare monitoring.
2. **Private evidence:** current GSC page/query/country exports, GA4 acquisition/events, and Travelpayouts programme status, clicks and approved commissions.

The audit supports this direction; those private records are needed to establish the numerical baseline. The subsequent cleanup instruction authorizes documentation work, not the implementation proposals above.

**Verification note:** one contact-form retry may have submitted a clearly labelled “Audit Simulation” enquiry with a placeholder phone number. No delivery was established. No repository changes, commits or pushes were made during the audit.

## Evidence provenance

- Code and built-output inspection at the audited commit; validation performed in an isolated checkout.
- Full 260-URL production sitemap crawl; additional redirect/404 and affiliate-handoff requests.
- Public GTM-container inspection, controlled click-classifier reproduction, browser behavior checks, desktop and emulated mobile captures. No authenticated GA4/GSC/Travelpayouts outcome verification or physical-device test was claimed.
- Owner-supplied research reviewed: `01. reaserch and stratgy Guideline.docx`, `6 potential.docx`, `Niche Expansion strategy.docx`, `SERP.docx`, `URAL_Travel_NotebookLM_Migration_Pack.txt`, `ural-travel-sources-inventory.xlsx`, and `ural-travel-strategic-directions.xlsx`.
- Owner source folder: `E:\e-COMMERCE BUSINESS WEBSITE\URAL\Social Media\New direction\` (outside this repository).
- Original local audit evidence: `C:\Users\HP\AppData\Local\Temp\opencode\ural-audit-2026-10-25\`, including `build-inventory.json`, `live-crawl.json`, validation logs and browser captures. This temporary folder is local supporting evidence, not a required build input or a portable repository dependency.
