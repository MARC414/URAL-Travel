/**
 * The four homepage FAQ pairs at `/`.
 *
 * SINGLE SOURCE OF TRUTH. Three surfaces read this file so they can never drift:
 *   - `index.html` is not edited by hand any more; `scripts/prerender.ts` renders
 *     the visible `#home-faqs` block into `dist/index.html` from this array;
 *   - `scripts/prerender.ts` also builds the FAQPage JSON-LD in the static head;
 *   - `src/App.tsx` renders the same visible section and the same schema at runtime.
 *
 * Why it matters: Google requires the marked-up answer to be the answer the reader
 * can see. Before this file existed, the homepage had three different wordings of
 * the same question — the static HTML, the static schema, and the React schema —
 * so the FAQPage node described text that was not on the page.
 *
 * Editorial rules:
 *   1. Each answer is the one already published and reviewed on `/`; treat this as
 *      the canonical wording, not a draft.
 *   2. Money claims must stay inside the safe wordings in
 *      `docs/growth/A1-CLAIMS-LEDGER.md` (M1). The 18,000 / 5,000 figures below are
 *      M1 and nothing here promises an automatic release.
 *   3. The visa-free answer is attributed to the Henley Passport Index and carries
 *      the "confirm on the official site" caveat, matching `visaFreeData.ts`.
 *   4. Homepage questions must stay unique to `/`; do not copy `HAJJ_UMRAH_FAQS` or
 *      a blog post's FAQ in here, or the same answer appears at two URLs.
 *   5. This array is English-only by design: `/` is the English homepage and `/bn`
 *      carries no FAQ block today.
 */

export interface HomeFaq {
  question: string;
  answer: string;
}

export const HOME_FAQ_HEADING = "Frequently Asked Questions for Bangladeshi Travelers";

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "How do I get a dual-currency card endorsement on a Bangladeshi passport?",
    answer:
      "Visit your authorised dealer bank with your original passport and NID. Under Bangladesh Bank FEPD-1 Circular No. 33 (6 September 2026), banks may release up to USD 18,000 per calendar year to an adult Bangladeshi resident, with US dollar cash notes capped at USD 5,000 per person within that limit. Confirm the endorsement process with your bank, then enable e-commerce and 3D Secure in your bank app before booking abroad.",
  },
  {
    question: "What are the top budget-friendly family destinations from Dhaka?",
    answer:
      "Nepal (from BDT 42,000 per person with free Visa on Arrival), Malaysia (from BDT 68,000 with 4-day online e-Visa and universal Halal dining), Thailand, and the Maldives local islands (Maafushi and Hulhumalé) are the top budget-friendly family destinations from Dhaka.",
  },
  {
    question: "Which countries can Bangladeshi passport holders visit without a visa before departure?",
    answer:
      "According to the July 2026 Henley Passport Index, six Asian destinations are accessible without a traditional visa obtained in advance: Nepal, Bhutan, the Maldives, Cambodia and Timor-Leste (visa-free or on arrival) and Sri Lanka (online ETA). Henley is a ranking, not a government source, so confirm fees, stay limits and entry conditions on each country's official immigration site before booking.",
  },
  {
    question: "Is URAL a travel agency that sells tickets?",
    answer:
      "No. URAL is an independent outbound travel intelligence desk for Bangladeshi travellers: it publishes flight price guidance in BDT, official visa checklists, itineraries and realistic trip-cost breakdowns, then links out to the airline, hotel or visa portal so you book directly at the source price.",
  },
];
