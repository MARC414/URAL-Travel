# Measurement runbook — GTM custom events and the GSC export

**Created:** 2 November 2026 · **Owner:** [your name here] · **Blocks:** the
short-article programme, per [Publication Standard v2](../growth/11-PUBLICATION-STANDARD-V2.md) §5.

This is the "this week" task from the 2 November review. Two jobs, about 90
minutes total once you are in the accounts:

1. Make URAL's own events actually reach GA4 (§1–§3).
2. Get one Search Console export that has **dates and click/impression values** (§4–§5).

Current state, verified in the repo:

| Thing | State |
| --- | --- |
| GTM container | `GTM-TMPVL82B` installed in `index.html`, loaded after first paint |
| GA4 property | `G-2EWKHC1KE1` (cited in the privacy policy) |
| Consent Mode v2 | Implemented in `index.html`; analytics denied until the cookie banner is accepted |
| Code-side events | Five, pushed to `dataLayer` from `src/utils/analytics.ts` |
| GTM-side forwarding | **Missing** — the 25 Oct audit found the published container defines only the pageview tag |
| GSC exports in repo | Two CSVs, **zero** click/impression values, period and filters "NOT SUPPLIED" |

---

## 1. The event contract (what the site already sends)

You do not need to change any code. `pushDataLayerEvent()` already pushes these
five events with these exact keys. GTM must be taught to forward them.

| DataLayer event | Fires when | Payload keys |
| --- | --- | --- |
| `virtual_page_view` | SPA route change | `page_path`, `page_title`, `page_location` |
| `page_view` | Initial load (inline, before GTM) | `page_path`, `page_title`, `page_location` |
| `affiliate_partner_click` | Any partner CTA | `partner_name`, `link_label`, `outbound_url`, `destination`, `page_path`, `affiliate_placement` |
| `travelpayouts_referral_click` | Creator-referral block only | `partner_name`, `link_label`, `outbound_url`, `page_path` |
| `whatsapp_click` | WhatsApp button | `link_label`, `page_path` |
| `whatsapp_inquiry` | WhatsApp enquiry intent | `link_label`, `page_path` |

Source of truth: `src/utils/analytics.ts` lines 15–230. If a key is renamed in
code, the GTM variable silently goes empty — that is the failure mode to watch.

---

## 2. GTM: forward the events (30–40 min)

Open <https://tagmanager.google.com> → container `GTM-TMPVL82B` → **Workspace**
(create one called "measurement-fix").

### 2.1 Variables (Data Layer Variables) — 6 of them

**Variables → New → Data Layer Variable**, one per key, named exactly:

| Variable name | Data Layer Variable Name |
| --- | --- |
| `DLV - partner_name` | `partner_name` |
| `DLV - link_label` | `link_label` |
| `DLV - outbound_url` | `outbound_url` |
| `DLV - destination` | `destination` |
| `DLV - page_path` | `page_path` |
| `DLV - affiliate_placement` | `affiliate_placement` |

### 2.2 Triggers (Custom Event) — 5 of them

**Triggers → New → Custom Event**, event name typed exactly, "All Custom Events"
left OFF:

`affiliate_partner_click` · `travelpayouts_referral_click` · `whatsapp_click` ·
`whatsapp_inquiry` · `virtual_page_view`

Do **not** create a trigger for `page_view`: the existing pageview tag already
handles it, and a second tag will double-count.

### 2.3 Tags (GA4 Event) — 5 of them, one per trigger

**Tags → New → Google Analytics: GA4 Event**. Measurement ID `G-2EWKHC1KE1`.
Map the GA4 event name to something readable and stable:

| DataLayer event | GA4 event name | Parameters to send |
| --- | --- | --- |
| `affiliate_partner_click` | `affiliate_click` | `partner_name`, `link_label`, `outbound_url`, `destination`, `affiliate_placement`, `page_path` |
| `travelpayouts_referral_click` | `referral_click` | `partner_name`, `link_label`, `outbound_url`, `page_path` |
| `whatsapp_click` | `whatsapp_click` | `link_label`, `page_path` |
| `whatsapp_inquiry` | `whatsapp_inquiry` | `link_label`, `page_path` |
| `virtual_page_view` | `virtual_page_view` | `page_path`, and send the page location as the GA4 page_location override |

**Consent settings:** on every one of these tags → *Advanced settings → Consent
settings* → **Require additional consent for tag to fire** is **not** what you
want. Leave tags on "no additional consent required" so they respect the
existing Consent Mode signals already set in `index.html`. If you start
requiring extra consent, analytics-goal clicks vanish until a second banner.

### 2.4 Test before publishing (non-negotiable)

1. In GTM, click **Preview**, enter `https://uraltravel.co.uk/umrah`.
2. Accept the cookie banner (otherwise Consent Mode blocks the hit — this is
   correct behaviour, not a bug).
3. Click an affiliate CTA and the WhatsApp button.
4. In the Preview pane confirm each event appears with its variables filled —
   `partner_name` must show a real provider name, not `undefined`.
5. In GA4 → **Admin → DebugView**, confirm `affiliate_click` and
   `whatsapp_inquiry` arrive with their parameters.
6. If a variable is empty, the code key and the DLV name disagree. Fix the DLV,
   do not change the code.

### 2.5 Publish and mark conversions

- **Submit → Publish**, version name "measurement-fix v1", with a note listing
  the five events.
- In GA4 → **Admin → Events**: mark `whatsapp_inquiry` as a **conversion key**.
  Mark `affiliate_click` only if you intend to optimise against outbound clicks.
- In GA4 → **Admin → Custom definitions**: register `partner_name`,
  `destination` and `affiliate_placement` as **event-scoped** custom dimensions,
  or you will never be able to segment by partner.

### 2.6 Prove it works

Within 24 hours, GA4 **Reports → Engagement → Events** should show all five
event names with non-zero counts. If `affiliate_click` is zero after real
traffic, the trigger name is wrong — compare character by character with §1.

---

## 3. Do not skip: the enquiry path is a known weak point

The 25 October audit classified enquiries as **"partial / unreliable — interfaces
can report success without confirmed delivery."** Events will now tell you a
button was clicked; they cannot tell you the enquiry arrived. Before you judge
conversion, send yourself a test enquiry and confirm it lands in the inbox.
Otherwise a broken form will look like a copy problem.

---

## 4. GSC: one export with dates, filters and values (20 min)

You need **two** exports, because a filtered export alone cannot show you what
you are missing.

Open <https://search.google.com/search-console> → property **uraltravel.co.uk**
→ **Performance → Search results**.

1. **Date range:** click the date pill → *Last 3 months* (or Custom: 1 Aug –
   31 Oct 2026). Turn the comparison toggle **off**; comparison columns confuse
   the join.
2. **Export 1 — Bangladesh:** Filter → **Country** → *Bangladesh* → Apply. Then
   **Export → Download CSV** on the **Queries** tab, and again on the **Pages**
   tab.
3. **Export 2 — unfiltered:** remove the country filter, re-export Queries and
   Pages for the same range. This is what tells you whether Bangladesh is
   actually your audience.
4. Optional but valuable: one more Queries export with **Search appearance** or
   **Device = Mobile**, since almost all of this audience is on Android.

**Naming:**

```
GSC-2026-08-01_2026-10-31_BD_queries.csv
GSC-2026-08-01_2026-10-31_BD_pages.csv
GSC-2026-08-01_2026-10-31_ALL_queries.csv
GSC-2026-08-01_2026-10-31_ALL_pages.csv
```

### If the UI export is capped

The browser export truncates at 1,000 rows. That is fine at your size. If it
ever is not, use the API instead — `searchconsole.searchanalytics.query` with
`dimensions: ["query"]`, `startDate`, `endDate`, `rowLimit: 25000`. The Python
`samples/searchconsole/` snippet in Google's docs is the shortest route.

---

## 5. Where to put the files, and the schema

Drop the CSVs in `docs/03-social/`. They must be **joinable** with the existing
evidence files, which use this header:

```csv
"evidence_id","property","query","clicks","impressions","period","filters","provenance","signal","social_priority","interpretation"
```

For a raw GSC export, keep Google's own columns and add the provenance
columns — do not reshape the numbers by hand:

| Repo column | Value for a raw export |
| --- | --- |
| `evidence_id` | new block, e.g. `GQ-2026Q3-001…` |
| `property` | `uraltravel.co.uk` |
| `query` | the GSC "Top queries" cell, verbatim |
| `clicks`, `impressions` | GSC values, verbatim, no rounding |
| `period` | `2026-08-01..2026-10-31` |
| `filters` | `country=BD` or `none` |
| `provenance` | `GSC export <date downloaded>` |
| `signal` | leave blank until reviewed |
| `social_priority` | leave blank until reviewed |
| `interpretation` | leave blank until reviewed |

Then commit them with a one-line note of what was exported and when. A raw
export with a date is evidence; a summary without values is what the repo has
today.

---

## 6. What I do with the export

Once the files are in, in one pass:

1. **Join** queries to pages on the Pages tab, so each row becomes
   *query → landing page → clicks → impressions*.
2. **Classify** every query into an intent that either has an owner or does not.
3. **Rank the uncovered intents** by impressions, not by guesswork. That ranked
   list replaces the "short articles on many topics" instinct with a ranked,
   evidence-backed queue that still obeys the ≤2-per-week cap.
4. **Flag cannibalisation** — the same query earning impressions on two URLs is
   the most common silent failure in a wide cluster, and it is invisible without
   this export.
5. **Set the 90-day review dates** for the first two articles from real
   baselines rather than zero.

---

## 7. Acceptance checklist

- [ ] Five Custom Event triggers exist in `GTM-TMPVL82B`, named exactly.
- [ ] Five GA4 Event tags reference `G-2EWKHC1KE1`.
- [ ] Preview shows non-empty `partner_name` and `page_path` on a real click.
- [ ] GA4 DebugView receives `affiliate_click` and `whatsapp_inquiry`.
- [ ] Container published with a version note.
- [ ] `whatsapp_inquiry` marked as a conversion key.
- [ ] `partner_name`, `destination`, `affiliate_placement` registered as custom dimensions.
- [ ] Test enquiry confirmed in the inbox (not just "sent" in the UI).
- [ ] Four GSC CSVs committed with real `period`, `filters` and values.
- [ ] One unfiltered export exists so the Bangladesh filter can be sanity-checked.
