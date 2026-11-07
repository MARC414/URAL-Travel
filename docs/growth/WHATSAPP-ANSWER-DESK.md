# WhatsApp Answer Desk — the manual

**What this is.** A one-page procedure for answering reader questions on WhatsApp with AI as a *drafting
assistant you control*, never as a published answer. Decided by the owner on 7 November 2026 in place of an
on-site AI helper.

**Why this way.** An on-site chatbot makes promises it cannot honour: no date, no source, no way for the reader
to check it, and a wrong visa answer costs someone a flight. This workflow keeps the speed benefit and drops
the risk, because **a human checks every answer against the authority before it is sent.** It costs £0 and needs
no setup.

**The one rule.** *You are the only thing that publishes.* The AI drafts. You verify. Only then does it leave
your phone.

---

## The loop — six steps

### 1. Receive
A question arrives on WhatsApp (+8801784385335).

### 2. Classify — is this a *fact* question or a *service* question?

| Kind | Example | What you do |
|---|---|---|
| **Fact** | "How long does a Malaysia eVisa take?" | Steps 3–6 |
| **Service** | "Can you book it for me?" | Reply with the standing line below, then treat any factual part as a fact question |

**Standing line for service requests** (this is URAL's actual position, not a brush-off):

> URAL doesn't sell tickets, visas or hotel bookings and takes no payment for travel services. What I can do is
> point you to the airline, hotel or official portal and tell you what to check before you pay. Want me to?

That sentence is the whole business model. Use it word for word until you have a better one.

### 3. Draft — with the AI, using the prompt below
Paste the question into any free chatbot with the **Drafting prompt**. Do not skip the prompt and ask casually;
the prompt is what stops the model inventing a number.

### 4. Verify — this step is not optional
Open the official portal for that country and confirm the specific claim. The sources are listed below.
**If you cannot confirm it, do not send it.** Say instead: *"I couldn't confirm this on the official page today —
here's the official link so you can see the current position."*

### 5. Send, in this shape
Every factual answer goes out as four parts, in this order:

1. **The answer**, in one or two sentences.
2. **The official source**, named and linked.
3. **The date you checked it** — "checked today, 7 November 2026".
4. **The caveat**, where relevant — "the portal publishes a range, not a promise".

### 6. Log it
Add one line to `WHATSAPP-QUESTION-LOG.md`. Thirty seconds. This is the actual output of the exercise.

---

## The drafting prompt

Copy this whole block. Replace the question at the end.

```
You are helping a UK-based travel-information editor reply to a reader question on WhatsApp.

RULES — follow all of them:
1. Answer ONLY what the question asks. Do not add travel tips, upsells or extra advice.
2. Give NO price, processing time, approval rate, or visa-validity figure unless I supply it.
   If a number is needed and I have not supplied it, write [NEEDS OFFICIAL FIGURE] in its place.
3. Never say an application is guaranteed, sure, certain, or will be approved.
4. Name the official authority that decides this, and say the reader should confirm on their site.
5. Maximum 120 words. Plain language. No marketing tone. No emoji.
6. If the question depends on something you cannot know (nationality, dates, embassy), say so and ask.

Question from reader:
<<<PASTE THE QUESTION HERE>>>
```

**What `[NEEDS OFFICIAL FIGURE]` is for.** It is the most important line in the prompt. It converts the model's
weakness — confidently inventing numbers — into a visible gap you then fill from the official page. When you see
that marker, you know exactly what to go and check.

---

## Official sources — check these, not the AI

Use the authority that *decides* the question, never a blog or an agency.

| Question is about | Official source |
|---|---|
| Saudi / Umrah / Hajj visa, Nusuk, permits | `umrah.nusuk.sa`, `hajj.nusuk.sa`, `haj.gov.sa` |
| Saudi tourism visa | `ksavisa.sa` |
| Malaysia eVisa, MDAC | `malaysiavisa.imi.gov.my`, `imigresen-online.imi.gov.my/mdac` |
| Thailand e-Visa | `thaievisa.go.th` |
| Singapore arrival card / visa | `eservices.ica.gov.sg/sgarrivalcard` |
| Bangladesh passport, endorsement, immigration | `passport.gov.bd`, `biman`/airline site for baggage |
| Nepal visa on arrival | `nepaliport.immigration.gov.np` |

If a page has a **"last updated"** date, quote it. If it does not, say the page carries no date — that is useful
information for the reader, not a failure.

---

## The refusal list — never send these

These are the exact claims the website already had to have removed. If a draft contains one, delete it:

- Any approval rate ("100% approval", "usually approved") — the deciding mission can refuse without giving a reason.
- A single processing-time figure where the authority publishes a range.
- "Guaranteed", "sure", "will be approved", "no chance of refusal".
- A price without a date and a source.
- Anything implying URAL books, issues tickets, or takes payment.
- A visa rule for a nationality you did not actually check.

If the AI's draft has one of these, the draft is wrong — not the rule.

---

## What to do when you do not know

Say this. It is never the wrong answer:

> I don't want to guess on a visa question — a wrong answer costs you a flight. The official page that decides
> this is [link]. If it's unclear there, the mission's own contact is [contact]. Shall I look at it with you?

Being the person who says "let me check" is the entire brand.

---

## The weekly 30 minutes

Once a week, open `WHATSAPP-QUESTION-LOG.md` and read the last twenty lines.

1. **Count repeats.** Three or more of the same question means it belongs on the website as a proper page —
   with a source and a date, under the Number rule.
2. **Spot the gaps.** Any question you could not answer from an existing page is a hole in the site, not a gap in
   your knowledge.
3. **Rank by pain.** The question that made someone most anxious goes to the top of the content queue, not the one
   with the most search volume.

**This is the only corpus worth building.** After twenty or thirty real questions you will know exactly what an
on-site helper would need to answer — and you can build it then, against real questions, with real sources.
Until that list exists, any AI helper would be guessing at what readers want. That is why it waits.

---

## When to revisit building the helper on site

Not on a date. On evidence:

- [ ] The question log has **30+ real questions**.
- [ ] At least **10 of them repeat** in some form.
- [ ] You have written at least **5 site pages** directly from the log.
- [ ] The answers are stable — the same question gets the same answer a month later.

When all four are true, the corpus exists and the helper becomes a small job instead of a guess. Until then, this
manual is the product.
