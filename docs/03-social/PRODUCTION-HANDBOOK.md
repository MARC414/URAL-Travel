# Social production handbook

**Current working companion · 26 October 2026.** Start with the [master strategy](../../URAL-SOCIAL-CONTENT-ECOSYSTEM.md). The [optimization guide](../../URAL-CONTENT-OPTIMIZATION-GUIDE.md) supplies the editorial standard.

## 1. Production records and status

- `SOCIAL-ASSET-REGISTER.csv` owns IDs and asset metadata. Keep an ID when revising its copy; use a version suffix for exported media.
- `PHASE-A-PUBLISHING-CALENDAR.csv` has one row per platform placement. Repeated IDs there are placements, not extra concepts.
- `production/WEEK-N.md` contains the actual scripts, slide text, Facebook/Instagram captions, Story frames, WhatsApp text, visual directions and alternatives.
- `ASSET-SOURCE-TRACE.csv` retains source-section and claim boundaries; the source packet identifies the relevant primary evidence.
- `WEEKLY-SCORECARD.csv` starts blank. Duplicate a week row for each platform or observation unit; never combine unlike video denominators.

| Asset status | Meaning / next action |
|---|---|
| DRAFT — PRODUCTION / SOURCE CHECK | Copy is prepared; complete G-01, design/edit and read-through |
| NEEDS-UPDATE | A specific source or destination defect blocks promotion; resolve the named gate |
| HOLD — CHANNEL / SOURCE REVIEW | Useful optional adaptation; no channel commitment/date yet |
| HOLD — REAL THREAD / RULES REQUIRED | Community answer cannot be scheduled without an actual relevant question |
| READY | Producer has recorded source review, media/copy check and working link route |
| SCHEDULED | Actual platform scheduling recorded with a real date/time |
| PUBLISHED | Record the live post URL/date; verify the published text, media and link |
| PAUSED / CORRECTION | Material information changed or an error was found; stop reuse and correct visibly |

Do not change DRAFT to READY just because the source article is classified PROMOTE NOW. Source suitability, media completion and publication are different records.

## 2. One-producer workflow

### Initial setup: approximately two hours, then reuse

Create three editable masters: a 4:5 card/carousel, a 9:16 Reel and a two-frame Story. Use the existing URAL wordmark and palette. Set up the register and one media folder; no additional publishing platform is required by the plan.

Suggested media folder: `SOC-001/`, containing the editable master, final exports, captions/subtitles and a short source-check note. Source URLs belong in the register even when the public post has no outbound link.

### Weekly batch: working estimate 4–6 hours

| Task | Estimated time | Output |
|---|---:|---|
| Read the two sources and check applicable primary evidence/landing pages | 45–60 min | Source-check date and any hold |
| Produce the week's two core media assets | 90–150 min | Rehearsed Reel or proofed slides/graphic |
| Review Bengali captions, alt text and Story/WhatsApp derivatives | 30 min | Native channel copy ready |
| Schedule, test link placement and check the published result | 20–30 min | Actual scheduled/published records |
| Respond to genuine questions in short sessions | 30–45 min | Anonymized useful question notes |
| Weekly measurement and one next decision | 20–30 min | Scorecard with evidence and action |

Allow roughly another 20–30 minutes in LinkedIn weeks. These are workload estimates, not measured production times. If review or filming takes longer, stretch the calendar rather than omit evidence or add rushed formats. At one consumer asset a week, the same 16 assets take 16 weeks; that is a capacity adjustment, not a second strategy.

A one-person team can wear editor, designer, publisher and analyst roles. Keep the passes distinct enough to catch errors: factual review first, Bengali read-through after editing, published-link check last.

## 3. Format specifications

These are URAL production choices, not claims about platform maximums or ranking preferences. Check the current publishing interface before export.

| Format | Working specification | Essential check |
|---|---|---|
| Reel | 1080×1920, 9:16 MP4; normally 35–50 seconds after an actual read; voice plus readable captions | Hook → useful answer → takeaway; no fake current app/booking screen |
| Carousel | 1080×1350, 4:5; usually 4–6 slides, one idea per slide | Count follows the answer; never pad to eight slides |
| Static | 1080×1350; one distinction or a few short labels | The caption contains practical detail; not a wall of text |
| Story | 1080×1920; two frames in this pack | A question and useful answer; tested link sticker if used |
| WhatsApp | Short standalone reminder plus optional plain link; split Status frames if needed | Readable on a phone; no bulk unsolicited sending |
| LinkedIn | Prepared English text; optional simple diagram only if useful | Method/industry insight, not a consumer booking advertisement |
| Medium/Substack | Distinct English analysis/dispatch | Attribution, actual channel decision and current platform settings |

### Brand and readability

Use current [PRODUCT.md](../../PRODUCT.md)/[DESIGN.md](../../DESIGN.md) tokens: navy `#0B1426`, emerald `#0F4A3F`, ivory `#F5F1E8` and gold `#F6B73C`. Gold is an accent, not small text on a pale background. Prefer navy on ivory or light text on navy.

Use **Noto Sans Bengali** for Bengali when available and **Inter** for English, matching the current site typography. Avoid decorative Bengali faces and all-caps paragraphs. Preview at phone size; a slide that requires zooming needs fewer words or a larger type size. Keep important text clear of platform controls.

For the core pack, original diagrams, blank checklists and typographic cards are enough. No new stock-photo search is needed. If reusing site photography, confirm rights and the subject; a place image is not proof of a property visit or access inspection. Existing optimized assets are under `public/img/` and `src/assets/optimized-social/`; image masters remain outside the repository as described in `AGENTS.md`.

### Media handoff

- Carousel/static: editable source plus ordered PNGs named `SOC-001_bn_feed_v01_01.png`, etc.
- Reel: editable project, `SOC-002_bn_reel_v01.mp4`, reviewed subtitle file if used, and thumbnail.
- Story: use its own global child ID, e.g. `SOC-023_bn_story_v01_01.png`.
- WhatsApp: copy from its child-ID block; keep the same source and claim limits.
- Alt text supplied in the pack describes the useful content. For a carousel, split it into slide-specific descriptions in the publishing interface where supported. Subtitle the spoken content; do not rely on auto-caption accuracy for Bengali or official names.

## 4. Language, hooks and copy review

Write Bengali as a practical Bangladeshi creator would speak it. Use familiar terms—Visa, Passport, Airport, Flight, Booking, Hotel, Umrah, Nusuk, eSIM—when natural. Do not translate every English word merely to make the copy look Bengali, and do not turn every sentence into technical Banglish.

The pack's scripts are a production starting point: read them aloud and improve phrasing while preserving the claim boundary. Avoid a new fact arriving during a casual voiceover edit.

| Hook family | Example from the programme | Value it must deliver |
|---|---|---|
| Question | Passport endorsed—card ready? | Separate actual preparation checks |
| Comparison | Jeddah arrival / Madinah return? | Same-basis options, not a cheapest-route claim |
| Clarification | Data eSIM versus bank SMS | Explain the distinction and who to ask |
| Checklist | Permit on your own phone | Check actual booking status and instructions |
| Decision | Hotel near the Haram | Questions about the actual entrance and route |
| Trust | Click, booking and payout | Clear measurement definitions |

No keyword pile, copied SERP heading, false urgency, fixed saving, “zero rejection” or empty travel slogan. Use zero to two relevant hashtags if helpful; none is required. Do not ask for a like, share, comment and follow together. A real planning question is welcome when its answer will shape future content.

### Platform adaptation

- Facebook gets the fuller useful explanation and an optional direct guide link.
- Instagram gets a shorter caption; do not paste a long URL as though it is a working feed-caption link. Publish the companion linked Story **before** the feed post and save it to a clearly named “গাইড” Highlight. Test that the specific guide remains reachable after the Story's normal display period. If the account cannot provide that route, remove the promise and choose a tested profile link when appropriate.
- WhatsApp gets the smallest useful reminder. Prefer Status; a message/broadcast needs an audience that actually asked for it. Do not drop the same text into every group.
- LinkedIn uses English for method and professional insight. Keep Bangladesh-specific facts scoped; exclude private performance numbers unless separately approved for public use.
- Community replies are written for the actual question. No real thread exists in this packet, so reply templates stay HOLD. A fabricated “what I wish I knew” experience is not a native adaptation.

## 5. Links and actions

### Acquisition tagging

All prepared website links use:

```text
utm_source=facebook | instagram | whatsapp | linkedin | medium | substack
utm_medium=social | referral (Medium) | email (Substack)
utm_campaign=bd_existing_a1
utm_content=soc-001 (the actual asset ID)
```

Copy the complete link from the calendar/production block. Use the direct current `.co.uk` locale path; do not invent a redirect, a new link hub or an old query-style route. Public captions use the Bengali twin for Bengali consumer content. English analytical links use the English source.

Source URLs are evidence locations. A source URL in a row does not authorize using it as a CTA when `landing_url` is blank. In particular SOC-007 and its derivatives have no tool/desk CTA.

UTMs describe the inbound visit. They do **not** create a supported Travelpayouts SubID on the later outbound link. Do not append `sub_id` to an inbound URL and report affiliate attribution as solved. Hotel-guide Klook links now carry a first-party `data-affiliate-placement` scope, which the site click event can record as `affiliate_placement`; this is local event context only, not a Travelpayouts SubID, partner-side attribution, or proof of bookings. Existing event-forwarding gaps still need verification before commercial reporting.

### CTA readiness

| CTA | What must actually work |
|---|---|
| Read a checklist | Correct locale URL loads and contains the promised checklist |
| Use a tool | Tool performs that task and labels its data/limits honestly |
| Compare a partner offer | Correct partner/project/status, truthful destination and actual handoff |
| Ask the desk | Confirmed service scope and a real received-message path |
| Subscribe / receive alerts | Actual enrollment/fulfillment; UI success alone is insufficient |

The pack makes no direct social affiliate sale. If an authorized later asset recommends a partner, disclose the commercial relationship near the recommendation. Website links and expiry handling follow `AGENTS.md` and the central affiliate registry. Creator referral interest stays separate from pilgrim/booking enquiries.

## 6. Measurement definitions

The following is a **reporting specification**, not a claim that all events are already implemented or reaching GA4.

| Stage / metric | Operational definition | Evidence / denominator |
|---|---|---|
| Reach | Platform-reported accounts reached for that placement | Keep platform and period; do not add platforms as unique people |
| Retention | Chosen platform watch metric for a particular video length | Record numerator and exact platform denominator; compare similar formats |
| Save/share usefulness | Recorded saves/shares, plus substantive replies | Count separately; rates use that platform's reach if available |
| Link interest | Actual outbound post/Story link taps | Platform-reported taps; not automatically website sessions |
| Tagged landing visit | Session attributed to the campaign landing URL | Verified acquisition reporting, excluding known test traffic where possible |
| Useful-visit proxy | Engaged session on the intended landing page, using the property's confirmed engagement definition | Record that definition; this is a proxy, not proof the reader understood or intended to buy |
| Planning action | A specific completed task: e.g. purposeful tool use, an actual checklist download or a substantive planning question received | Verified event or manual evidence; a pageview/scroll is not task completion. Worksheet interactions are unverified until instrumented/tested |
| Contact attempt | A click/open toward the contact route | Separate from receipt; never call it a lead by itself |
| Received traveller enquiry | A non-test message actually received concerning a real travel question | Manual inbox/CRM record with date and anonymized identifier; not a success banner |
| Qualified enquiry | Received question with a relevant route/decision, planning stage and enough context for the desk's confirmed role | Count the defined criteria consistently; no passport/medical/OTP data needed in the social log |
| Genuine partner exit | Outbound navigation to the actual affiliate provider, correctly classified | Verified event; internal `/kkday-hotels`, article or editorial-source clicks are excluded |
| Partner outcome | Partner-reported booking, then separately approved commission and payout | Actual partner report, currency and period; account for pending/cancelled transactions and reporting lag |
| Creator interest | Creator referral/professional discussion | Separate field; never combine with pilgrim enquiries or traveller bookings |

The site's current event names include `affiliate_partner_click`, `whatsapp_click`, `whatsapp_inquiry` and `travelpayouts_referral_click`. Some hotel-guide click events also include the `affiliate_placement` property; it is not a separate event or partner attribution identifier. Event names and properties are not proof of what happened. The audit found misclassification and forwarding gaps; reconcile them with behavior before using them as commercial metrics.

### Weekly review

1. Record actual publishing and production time; identify source/link incidents.
2. Compare the week's assets with relevant prior formats, not unlike counts from different platforms.
3. Record useful questions and the exact stage where readers need help.
4. Add observed guide visits, planning actions, received enquiries and partner outcomes only where evidence exists.
5. Choose **one** next adjustment: hook, format, timing, source correction, landing clarity or a new angle from an existing article.

Weekly reviews are operational. A fortnightly review changes pacing/cadence if needed. The eight-week review decides whether to extend, refresh an existing owner or test a Phase B gap. It is not a deadline to declare revenue failure.

Do not import old targets such as 100 sessions, 20 affiliate clicks, 35% retention/open rate or a 30-visit channel-cut rule as validated thresholds. This campaign has no reliable baseline for those promises. For small counts, report counts with denominators and the missing-data limitation; avoid dramatic percentage changes.

### While measurement is incomplete

Use native platform insights and manual received-message records. Put **UNVERIFIED** beside unavailable planning/affiliate attribution; leave numeric cells blank. Record user self-reported source separately from measured UTMs. Never fabricate attribution because a message arrived shortly after a post.

## 7. Corrections and maintenance

If a rule changes or a post overstates the source, pause scheduled reuse, fix the asset and linked page within the authorized scope, and record what changed. Correct the visible post or add a clear update where the platform requires it. Propagate the correction to Story, WhatsApp and English derivatives; a disappearing Story does not repair a saved carousel.

Keep the original source/audit date; record a new check only when performed. Avoid adding the current year to every hook. Seasonal Hajj/Umrah information gets an applicable-season check before reuse.

New assets continue at **SOC-065**; do not reset IDs for a platform or new month. Phase B research items keep `GAP-` IDs until a specific asset is approved. Keep historical records and original research; supersede their authority in current navigation rather than overwriting their evidence.
