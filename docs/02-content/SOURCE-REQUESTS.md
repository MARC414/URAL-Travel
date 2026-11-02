# Source requests — what I need, and the exact prompt to get it

**For the owner. Two items are blocked on primary sources, nothing else.**

---

## Read this first: how NotebookLM actually works

NotebookLM **only answers from the sources you add to the notebook.** It does not
search the web. If you add a visa-agency blog, it will quote that blog back at you
with total confidence, and it will look like evidence.

**So the sources are the answer, not the prompt.** If a page in the lists below is
not a `.gov.sa` (or official embassy) domain, do not add it.

If NotebookLM cannot fetch a `.gov.sa` page — some government sites block automated
readers — download the page as PDF in your browser and upload the PDF to the
notebook instead. That works just as well and keeps the provenance.

---

# REQUEST 1 — Saudi visa eligibility (blocks `/visa/saudi-arabia-visa`)

## Sources to add to the notebook

| # | URL | Status when I checked |
| --- | --- | --- |
| 1 | `https://haj.gov.sa/en/Umrah` | ✅ live, dated 19 Oct 2026 |
| 2 | `https://haj.gov.sa/en/Umrah/Umrah-Pillars` | ✅ live, dated 19 Oct 2026 |
| 3 | `https://umrah.nusuk.sa/` | ✅ live |
| 4 | `https://umrah.nusuk.sa/Journey` | ✅ live |
| 5 | `https://visa.mofa.gov.sa/` | ✅ live (Arabic portal — add if it extracts) |
| 6 | `https://ksavisa.sa` | ⚠️ live but it is an interactive assistant — likely will not extract. Skip if it adds nothing. |
| 7 | The **Saudi Embassy in Bangladesh** site — search "Saudi Embassy Dhaka official", and check the domain really belongs to the Kingdom before adding | I could not verify a URL, so **do not let me invent one** |

**Do not add:** ivisa.com, saudivisaoffice.com, evisaudi.com, hudhudtrip.com,
hotelsinmakkah.com, or any agent/agency page. Even if they look official.

## The prompt — paste this into NotebookLM

```
You are helping verify facts for a travel guide aimed at Bangladeshi passport
holders. Answer ONLY from the sources in this notebook. Do not use outside
knowledge, and do not fill gaps with general knowledge.

For every answer, give:
  - the exact sentence or clause from the source, quoted verbatim
  - which source it came from (URL or document title)
  - the date the source was published or last updated, if shown

If a question cannot be answered from these sources, write exactly:
"NOT IN SOURCES" — do not guess.

Questions:

1. Is Bangladesh included on Saudi Arabia's list of countries eligible for the
   tourist eVisa? Quote the source's wording on eligible nationalities, or say
   NOT IN SOURCES.

2. If a Bangladeshi passport holder can obtain a Saudi eVisa or visa on arrival,
   under exactly what conditions? (For example: holding a valid and previously
   used visa from another country, or residency in a Gulf state.) Quote the
   conditions verbatim.

3. For a Bangladeshi pilgrim performing Umrah: what is the stated application
   route? Is a licensed agent or an authorised provider mandatory, or can the
   pilgrim apply directly? Quote the source.

4. What does the source say about the role of the Nusuk platform in booking
   Umrah packages, accommodation, or transport?

5. What validity period, number of entries, and permitted length of stay does
   each visa type state?

6. Are biometrics required? Is there a stated app or enrolment step? Quote it.

7. Are there stated health or vaccination requirements for Umrah? Quote them.

8. IMPORTANT — list what these sources do NOT state. Specifically: do they say
   anything about fees, processing times, or eligibility by nationality at all?
   Be explicit about the gaps.

Finally, summarise in plain English, in under 200 words, what a Bangladeshi
first-time pilgrim can rely on from these sources alone — and what they still
have to confirm elsewhere.
```

## What to send me back

Paste the whole output into chat. I need:
- the **verbatim quotes**, not a paraphrase
- the **page URL** for each
- the **date** you opened it

If the answer to Q1 and Q3 is `NOT IN SOURCES`, that is still useful — it tells me
the ministry does not publish nationality eligibility in English, and I will build
the page around what *is* official and send readers to the portal for eligibility,
rather than claiming eligibility myself.

---

# REQUEST 2 — the Hajj rites, 8–13 Dhul-Hijjah (blocks Article B)

## Sources to add

| # | URL | Status when I checked |
| --- | --- | --- |
| 1 | `https://hajj.nusuk.sa/nusuk/hajj-rituals` | ⚠️ maintenance page, checked twice on 2 Nov. Retry — this is the page most likely to carry the sequence |
| 2 | `https://hajj.nusuk.sa/Journey` | ⚠️ also in the waiting room |
| 3 | `https://haj.gov.sa/en/Hajj` | ✅ live, dated 19 Oct 2026 |
| 4 | `https://haj.gov.sa/en/Hajj/Arafah` | ✅ live, dated 19 Oct 2026 |
| 5 | `https://haj.gov.sa/en/Hajj/Miqaats-Types-of-Rituals` | linked from the Hajj page |
| 6 | Mina Awareness Guide PDF — the ministry publishes one under `haj.gov.sa`; if you can open it in a browser, **download it and upload the PDF** | I could not fetch it; the direct link may need a browser |

**Do not add:** any Hajj blog, any tour operator, any "Hajj 2027 packages" site.

## The prompt — paste this into NotebookLM

```
Answer ONLY from the sources in this notebook. Quote verbatim. If something is
not stated, write "NOT IN SOURCES" rather than filling it in.

I need the sequence of Hajj rites from 8 to 13 Dhul-Hijjah as these official
sources describe it.

For each of the following, tell me what the source says, quoting it:

1. Day 8 (the 8th of Dhul-Hijjah). What happens? Where do pilgrims go, when, and
   what state must they be in? Is this described as obligatory, or recommended?
2. Day 9. The standing at Arafah: from when until when? What happens after
   sunset? Where do pilgrims go next?
3. The night of 9–10. Muzdalifah: what is done there, and is any act described
   as required versus recommended?
4. Day 10 (Yawm an-Nahr / Eid). List every act in the order the source gives:
   stoning of Jamrat al-Aqabah, the sacrifice (hady), shaving or shortening,
   Tawaf al-Ifadah. Quote the order exactly as written.
5. When on day 10 is the stoning done? Is a time of day stated (for example
   after the sun passes its zenith)? Quote it.
6. Days of Tashreeq, 11 and 12 Dhul-Hijjah. What is done, at which pillars, and
   in what order?
7. Leaving early (nafar awwal) versus staying for the 13th. What does the source
   require if a pilgrim is still in Mina at a certain point? Quote the condition.
8. What does the source say about Tawaf al-Wadaa, and when is it performed?
9. Are pebble counts stated anywhere? Quote them exactly if so.

Then, separately and clearly:

10. List every part of the 8–13 sequence that these sources do NOT cover. I need
    to know precisely where the official material stops, so I do not present
    anything else as sourced.

Finally: a plain numbered list of the sequence in the sources' own order, with a
"NOT IN SOURCES" marker on any step the material does not support.
```

## What to send me back

Same as above: verbatim quotes, URLs, dates. **Question 10 matters most** — I need
to know exactly where the official record stops so the article can say "the
ministry does not specify this" instead of inventing it.

---

# What else I need from you (nothing big)

1. **GTM:** when the five tags are published, click one affiliate link on a blog
   page and tell me — I will confirm the event shape matches what the site sends.
2. **One judgement call, when you have a minute:** the Journey Help panel currently
   sits below the article body, above "related links". Look at any Hajj article on
   your phone and tell me if that feels like the right place.
3. **Kill or keep:** I shipped a "rites" link group on `/umrah`, and a Journey Help
   panel on all 13 Hajj & Umrah posts. Both are live on the branch but not on
   `main`. Tell me when you want them merged, and I will open the PR.

## What I do NOT need

- Keyword research. I have enough from your GSC export.
- More article ideas. The list is longer than the capacity to write it well.
- Fees or prices for the visa page. I will deliberately publish no fee figure,
  because fees change by route and a wrong number is the most expensive mistake
  this site can make.
