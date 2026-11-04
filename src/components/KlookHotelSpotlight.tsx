import React from "react";
import { Building2, CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

import {
  AFFILIATE_LINKS,
  AFFILIATE_OFFER_REGISTRY,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import {
  KLOOK_CURATED_HOTEL_PICKS,
  KLOOK_HOTEL_CHECK_STEPS,
  KLOOK_HOTEL_COMMISSION_NOTE,
  KLOOK_PICKS_CHECKED_AT,
  KLOOK_PICKS_PROVENANCE,
  KLOOK_PICK_SIGNALS,
  buildKlookHotelDetailLink,
  getKlookHotelCommissionNote,
  groupKlookPicksByArea,
} from "./KlookHotelOffers";
import { getHotelGuideAffiliatePlacement } from "../utils/affiliatePlacement";

const CITY_BN: Record<string, string> = {
  Kathmandu: "কাঠমান্ডু",
  Bangkok: "ব্যাংকক",
  "Kuala Lumpur": "কুয়ালালামপুর",
  Dubai: "দুবাই",
  Singapore: "সিঙ্গাপুর",
  "Malé & Maafushi": "মালে ও মাফুশি",
};

const DUAL_CURRENCY_GUIDE = {
  en: "/blog/dual-currency-card-endorsement-bangladesh",
  bn: "/bn/blog/dual-currency-card-endorsement-bangladesh",
} as const;

const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

interface KlookHotelSpotlightProps {
  /** English city label from the hotel guide, used to key the Bengali label. */
  city: string;
  guideId: string;
  lang?: "en" | "bn";
  /** Static HTML must not cache a time-limited commission rate. */
  disclosure?: "current" | "evergreen";
}

/**
 * Second-quote module for the hotel guides.
 *
 * It sits beside accommodation content instead of running site-wide, and it
 * treats Klook as another quote for the areas already shortlisted above — not
 * as a traveller discount. The 8% figure is URAL's publisher commission and is
 * dropped automatically after KLOOK_PROMO.expiresAt (BST); the evergreen
 * sentence keeps the link useful afterwards.
 *
 * The hotel button uses the partner-provided tracked deep link to open the
 * curated hotel collection. Selected city/date/guest details are not forwarded,
 * so the copy tells travellers to enter those on Klook.
 *
 * Bangkok and Kuala Lumpur also get a shortlist pulled from the partner feed.
 * Each row carries the area, an area-fit note and Klook's own booking signal,
 * never a URAL verdict: the feed has no rates, room types or inspection notes,
 * so the checked date and the provenance line state exactly what was read.
 */
export function KlookHotelSpotlight({ city, guideId, lang = "en", disclosure = "current" }: KlookHotelSpotlightProps) {
  // A paused partner would make this Klook-specific copy false while
  // resolvePartnerUrl silently redirected readers to KKday. Hide it instead.
  if (
    AFFILIATE_OFFER_REGISTRY.klook.status === "paused" ||
    AFFILIATE_OFFER_REGISTRY.klookHotels.status === "paused"
  ) return null;

  const isBn = lang === "bn";
  const cityLabel = isBn ? CITY_BN[city] ?? city : city;
  const href = resolvePartnerUrl(AFFILIATE_LINKS.klookHotels);
  const curatedPicks = KLOOK_CURATED_HOTEL_PICKS[guideId] ?? [];
  const pickGroups = groupKlookPicksByArea(curatedPicks);

  const steps = KLOOK_HOTEL_CHECK_STEPS[lang];

  return (
    <section
      id="hotel-klook-check"
      lang={lang}
      aria-labelledby="klook-hotel-check"
      className="ural-guide-jump-target ural-hotel-partner"
    >
      <div className="hotel-partner-header">
        <span className="hotel-partner-eyebrow">
          <Building2 size={14} aria-hidden="true" />
          {isBn ? "পার্টনার হোটেল সার্চ · Klook" : "PARTNER HOTEL SEARCH · KLOOK"}
        </span>
        <span className="hotel-partner-meta">
          {isBn ? "নতুন ট্যাবে খুলবে" : "OPENS IN A NEW TAB"}
        </span>
      </div>

      <h2
        id="klook-hotel-check"
        className="hotel-partner-title"
      >
        {isBn
          ? `${cityLabel}-এর থাকার বিকল্প খুঁজতে Klook-এর হোটেল তালিকা সার্চ করুন`
          : `Search Klook’s hotel collection for ${city}`}
      </h2>

      <p className="hotel-partner-intro">
        {isBn
          ? `এই লিংকটি Klook-এর সাধারণ হোটেল তালিকা খুলবে—নির্বাচিত হোটেল বা আপনার তারিখের লাইভ কোট নয়। ${cityLabel}-এর বিকল্প খুঁজতে Klook-এ গন্তব্য, তারিখ ও অতিথিসংখ্যা আবার দিন। তালিকার ক্রম Klook-এর নিজস্ব বুকিং ডেটার ভিত্তিতে, স্বতন্ত্র মানের রেটিং নয়।`
          : `This link opens Klook’s general hotel collection, not a live quote for a selected property or your dates. Re-enter ${city}, your dates and guest count on Klook to search current options. Its selection reflects Klook’s own booking data, not an independent quality rating.`}
      </p>

      <ol className="hotel-partner-steps" role="list">
        {steps.map((step, index) => (
          <li key={step.title} className="hotel-partner-step">
            <span className="hotel-partner-step-number" aria-hidden="true">
              {isBn ? `০${BENGALI_DIGITS[index + 1]}` : `0${index + 1}`}
            </span>
            <strong>{step.title}</strong>
            <span className="hotel-partner-step-body">{step.body}</span>
          </li>
        ))}
      </ol>

      {curatedPicks.length > 0 && (
        <div className="hotel-partner-picks">
          <div className="hotel-picks-header">
            <h3 id="klook-hotel-picks" className="hotel-picks-title">
              {isBn
                ? `${cityLabel}-এর এলাকা অনুযায়ী Klook হোটেল শর্টলিস্ট`
                : `Klook hotel picks in ${city} by area`}
            </h3>
            <span className="hotel-partner-meta">
              {isBn
                ? `যাচাই: ${KLOOK_PICKS_CHECKED_AT.bn}`
                : `Checked ${KLOOK_PICKS_CHECKED_AT.en}`}
            </span>
          </div>

          <div className="hotel-pick-groups">
            {pickGroups.map((group, index) => (
              <div key={group.areaEn}>
                <h4 id={`klook-hotel-area-${index}`} className="hotel-pick-area">
                  {isBn ? group.areaBn : group.areaEn}
                </h4>
                <ul className="hotel-pick-list" aria-labelledby={`klook-hotel-area-${index}`} role="list">
                  {group.picks.map((pick) => (
                    <li key={pick.hotelId}>
                      <a
                        href={buildKlookHotelDetailLink(pick.hotelId, pick.subId)}
                        data-affiliate-placement={pick.subId}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        aria-label={
                          isBn
                            ? `${pick.name} — Klook-এ নতুন ট্যাবে দেখুন`
                            : `${pick.name} — open on Klook in a new tab`
                        }
                        className="hotel-pick-link"
                      >
                        <span className="hotel-pick-copy">
                          <span className="hotel-pick-name">
                            {pick.name}
                          </span>
                          <span className="hotel-pick-fit">
                            {isBn ? pick.bestForBn : pick.bestForEn}
                          </span>
                          <span className="hotel-pick-signal">
                            {isBn ? KLOOK_PICK_SIGNALS[pick.signal].bn : KLOOK_PICK_SIGNALS[pick.signal].en}
                          </span>
                        </span>
                        <ExternalLink
                          size={16}
                          className="hotel-pick-icon"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="hotel-partner-provenance">
            {isBn ? KLOOK_PICKS_PROVENANCE.bn : KLOOK_PICKS_PROVENANCE.en}
          </p>
        </div>
      )}

      <div className="hotel-partner-actions">
        <a
          href={href}
          data-affiliate-placement={getHotelGuideAffiliatePlacement(guideId)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="hotel-partner-action hotel-partner-action--primary"
        >
          {isBn ? "Klook-এ হোটেল সার্চ করুন" : "Search Klook hotel collection"}
          <ExternalLink size={15} aria-hidden="true" />
        </a>
        <a
          href="#hotel-curated-stays"
          className="hotel-partner-action"
        >
          {isBn ? "তুলনার চেকলিস্টে ফিরুন" : "Back to the comparison checklist"}
        </a>
      </div>

      <div className="hotel-partner-notes">
        <p className="hotel-partner-note">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>{disclosure === "evergreen" ? KLOOK_HOTEL_COMMISSION_NOTE[lang] : getKlookHotelCommissionNote(lang)}</span>
        </p>
        <p className="hotel-partner-note">
          <CreditCard size={14} aria-hidden="true" />
          <span>
            {isBn
              ? "Klook হোটেলের নিজস্ব মুদ্রায় চার্জ করে। BDT-তে বদলে তুলনার আগে কার্ডের বিদেশি লেনদেন ফি জেনে নিন। "
              : "Klook charges in the hotel's own currency. Check your card's foreign-transaction fee before comparing a converted BDT amount. "}
            <a
              href={DUAL_CURRENCY_GUIDE[lang]}
              className="hotel-partner-text-link"
            >
              {isBn ? "ডুয়াল-কারেন্সি কার্ড গাইড" : "Dual-currency card guide"}
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
