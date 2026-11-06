# The plan, in plain language — URAL live rates, currency choice, and a free AI helper

**Status: a plan only. Nothing here is built yet.** This version explains every piece in ordinary language, in
the order it will be done, so any person or AI can follow it without reading code.

---

## In one paragraph

Right now the site's money numbers use exchange rates typed into the code by hand, and some of those numbers are
wrong by up to 9%. The Umrah budget page only speaks in Taka. And there is no way for a visitor to ask a question
and get an answer. We are going to fix all three: get the exchange rates from a free source that updates every
day and say which day the rate is from; let the reader choose which currency to see the answer in; and add one
small question box that answers only from information we have already checked — and when its free daily
allowance runs out, it will say **"please come back after 6:00 AM"** instead of looking broken.

---

## The five pieces, in the order we do them

### Piece 1 — One place that knows today's exchange rate

**What it does.** Instead of numbers typed into the code, the site asks a free rate service once a day and
remembers the answer. Every page that shows a foreign currency uses that one remembered answer.

**Why.** Right now the site says 1 US dollar = 120 Taka. Today's real rate is about 124.6. On a single
Tk 160,000 visa line, that is a **$49 difference** — and the reader never sees it. Wrong numbers that look
official are worse than no numbers, because people trust them.

**What the visitor sees.** Nothing new yet. The numbers just quietly become right, and a small line appears
saying *"Rates by Exchange Rate API · updated 6 November 2026."* We are required to show that credit — it is the
price of using the free service.

**How we know it works.** The rate line always shows a real date. If the rate service is down, the page keeps
showing yesterday's rate with yesterday's date rather than breaking or showing a wrong figure.

**Cost: nothing. Takes about one to two days.**

---

### Piece 2 — Make the currency converter a proper tool

**What it does.** The site already has a currency converter, but it uses the hand-typed rates. It will now use
today's real rate, show the date, and include the currencies our readers actually use: **Saudi Riyal, Indonesian
Rupiah, UAE Dirham, Malaysian Ringgit**, plus the ones already there.

**Why.** A converter is one of the few tools people search for by name and use repeatedly. It is also the natural
doorway into our visa and Umrah pages: someone converting Riyals is usually someone planning a trip.

**What the visitor sees.** A converter with a clear line: *"1 Taka = 0.008026 US dollars, rate from 6 November
2026. This is a reference rate — your bank will differ."* Worked out on the page before anything loads, so it is
usable on a slow phone.

**How we know it works.** The date is never missing. The "your bank will differ" note is never removed. And we
never publish a public feed of rates for other websites to use — our free licence does not allow that, and
breaking it would get our access cut off.

**Cost: nothing. Takes about two to three days.**

---

### Piece 3 — A currency choice on the Umrah budget page

**What it does.** Adds **one** small dropdown at the top of the budget section: *Display currency*. A reader from
Dhaka starts on Taka. A reader from outside Bangladesh starts on US dollars and can switch to Riyals, Rupiah,
Dirhams or anything else on the list.

**Why.** This is the answer to "I don't want my site to be Taka-only." It is not a reversal of anything — the
site's flight search already does exactly this (Taka for a Dhaka departure, dollars for everyone else). We are
copying a rule we already use, not inventing a new one.

**The important rules that keep it sensible:**

1. **What the reader types does not change.** They enter their own quote totals in whatever currency their agent
   quoted. The dropdown only changes how the *answer* is shown. This avoids the mess of converting eight
   different lines in eight different currencies.
2. **No fake maths.** If we show a converted figure, it says which day's rate it used and that the bank's rate
   will differ. If the rate is missing, we fall back to Taka — never to zero, which would look like a free trip.
3. **The heading does not change.** It still says "Umrah cost from Bangladesh", because that is the phrase people
   actually search. We are adding a control, not deleting our best-performing words.
4. **One control, one small note.** Not a dropdown on every row. That would look cluttered and confuse the maths.

**What the visitor sees.**

```
What will your family's Umrah budget be?
Your quote-based worksheet · Not market prices
                              Display currency: ৳ BDT ▾
Rates updated 6 November 2026 · reference only · Rates by Exchange Rate API
```

**How we know it works.** All 25 existing tests still pass. Two new ones pass: a half-filled worksheet still
shows no total, and a missing rate shows Taka rather than zero.

**Cost: nothing. Takes about two days.**

---

### Piece 4 — The free AI helper (with the limit message you asked for)

This is the part with the most care needed, so it comes last.

**What it does.** One question box, in one place — on the Umrah page under the visa note. A visitor types a
question. It answers in three to five sentences, and **under every answer it shows where the answer came from,
with the date.** It never invents, because it is only allowed to repeat what we have already checked.

**Why one box in one place.** The free allowance is about **74 to 120 questions a day**, site-wide. That is
enough for one careful helper on one page. It is not enough for a chat window on every page — that would run dry
before lunchtime.

**The four rules it must obey — built in, not hoped for:**

1. It may only answer using our own checked records. If it finds nothing, it says so and shows the right page.
2. Every answer shows its source and the date we checked it.
3. Every answer ends with *"This is not official guidance — please confirm on the official website."*
4. **It is never allowed to state a price, a processing time, or a visa validity period** unless those exact
   words appear in a source we recorded. A last check catches this and refuses, even if the AI tries.

**What happens when the free limit runs out — your new requirement.**

This is now a first-class part of the design, not an error state. When the day's allowance is used up:

> **Our free assistant has finished its allowance for today.**
> It comes back at **6:00 AM Bangladesh time** (00:00 UTC).
> While you wait, these pages answer most questions: [Saudi visa guide] [Umrah budget worksheet] [Nusuk app guide]
> — or message us on WhatsApp and a person will reply.

Details that make this feel like care rather than failure:

- The box **stays visible**, with the message in it. It never silently returns an error or pretends to think.
- It shows the **time in the reader's own timezone** where we can tell it, and always names the Bangladesh time
  too, so nobody has to do the arithmetic.
- It offers **the human route** (WhatsApp) — a limit is the perfect moment to hand someone to a person.
- The same message appears if the AI is briefly unavailable for any other reason. One honest message beats five
  different error codes.
- **No countdown timer.** A ticking clock invites people to sit and watch a broken feature.
- We count it *before* answering, so the message is accurate. We never promise an answer and then fail.

**How we know it works.** We deliberately test the limit message with a full allowance, and we craft a fake
answer containing "BDT 15,500" and "2–5 working days" and confirm the assistant refuses it. Those exact strings
are already banned elsewhere on the site, so the AI cannot contradict the articles.

**Cost: nothing on the free plan. Takes about four to six days, mostly writing and testing.**

---

### Piece 5 — Housekeeping

While we are in these files, fix one genuine mistake: the packing-checklist progress bar can show "100% ready"
when one item is still unticked. It is a one-character fix in a file we are touching anyway, and it is exactly
the kind of small wrongness that costs trust on a page whose whole job is "am I ready?"

---

## What we are NOT going to do, and why

| Not doing | Why not |
|---|---|
| Publishing our own free rates feed for other sites | Our licence does not allow re-sharing the data. We would lose access. |
| Using the AI to "check" official websites | It cannot check. It guesses confidently. We use plain code to fetch and record facts instead. |
| Removing Taka or the "cost from Bangladesh" heading | That phrase is how people find the page. We add a choice beside it. |
| A currency dropdown on every budget row | Cluttered, and makes the arithmetic ambiguous. |
| A "number of days" box that multiplies the total | Six of the eight budget lines are not daily costs. It would produce totals 14× too high. |
| Letting the AI state a visa price | It is the one mistake that could cost a reader real money. |

---

## The order, as a checklist

- [ ] **1. Agree the currency rule** — one short paragraph in the product document. Blocks step 3. *(hours)*
- [ ] **2. Build the one rate source** — fetch once a day, remember it, show the date and credit. *(1–2 days)*
- [ ] **3. Point all three places at it** — remove the hand-typed rates. *(inside step 2)*
- [ ] **4. Upgrade the converter** — live rates, date shown, add Riyal/Rupiah/Dirham/Ringgit. *(2–3 days)*
- [ ] **5. Add the currency dropdown** to the Umrah budget section. *(2 days)*
- [ ] **6. Add the AI helper** with its four rules and the limit message. *(4–6 days)*
- [ ] **7. Fix the progress bar.** *(minutes)*

Steps 1 and 2 unlock everything else, so that is where we start. Total cost: **£0**, using free services
throughout.

---

## Plain-words glossary

| Term we've been using | What it actually means |
|---|---|
| **Rate source / API** | A website that publishes today's exchange rates; we ask it once a day. |
| **Cache** | Remembering an answer so we don't ask again all day. |
| **Neuron** | Cloudflare's word for "one unit of AI work". We get 10,000 free per day. |
| **Limit / allowance** | Those 10,000 units. When they run out, the AI stops until the next morning. |
| **Retrieval** | Looking through our own recorded, checked notes to find the answer. |
| **RAG** | The formal name for that — answer from our notes, not from the internet. |
| **Guard / test** | An automatic check that fails the build if something wrong is published. |
| **Attribution** | The credit line we must show to the free rate service. |

---

## If everything goes right, what changes for a reader?

- A family in Dhaka opens the Umrah page and sees Taka, with a rate date they can check.
- A family in Jakarta opens the same page, sees dollars or Rupiah, and can still read everything in English.
- Someone converting Riyals for a hotel deposit gets today's rate instead of a number typed in months ago.
- Anyone can ask one question and get a short answer with a source under it — or a clear "come back at 6:00 AM"
  with a real person to talk to instead.
