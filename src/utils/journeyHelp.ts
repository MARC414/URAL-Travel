import type { AffiliatePartnerKey } from "../components/AffiliatePartners";

/**
 * Journey Help — stage-gated partner guidance.
 *
 * Contract: docs/growth/10-CONTENT-UPGRADE-STANDARD.md §4.4 (A2.2).
 *
 * WHY THIS IS NOT A GENERAL AD BLOCK
 * ----------------------------------
 * The reader of a Hajj or Umrah article is moving through a fixed sequence of
 * practical problems: visa → flight → arrival → connectivity → the rites →
 * customs on the way home. An article answers one of those and then leaves the
 * reader standing at the next one.
 *
 * The panel is chosen by STAGE, never by article topic. That is the whole
 * safety mechanism: an article cannot buy itself an airfare block by having
 * something to say about flights, because a `perform`-stage page is not offered
 * fares at all. If a stage has no partner that genuinely helps, the stage
 * carries fewer links — `perform` carries two, not three, and does not pad.
 *
 * HARD LIMITS (enforced by test, see scripts/test-journey-help.ts)
 * ---------------------------------------------------------------
 *  - 2–3 commercial links, never more.
 *  - Every link names the reader's actual next problem in one line (A4).
 *  - Approved AFFILIATE_LINKS keys only (A3) — no raw URLs, no .tpo.li literals.
 *  - No stage may offer a partner its own row forbids (A8).
 *  - Bengali copy is written, never machine-fallen-back.
 */

export type JourneyStage = "prepare" | "travel" | "perform" | "return";

export interface JourneyHelpLink {
  /** Key of AFFILIATE_LINKS. Typed, so a typo fails the build. */
  partner: AffiliatePartnerKey;
  /** Short action label on the button. */
  labelEn: string;
  labelBn: string;
  /** One line naming the reader's next problem — the reason this link is here. */
  reasonEn: string;
  reasonBn: string;
}

export interface JourneyStageConfig {
  /** Panel heading, localised. */
  headingEn: string;
  headingBn: string;
  /** One line placing the reader in their journey. */
  introEn: string;
  introBn: string;
  links: JourneyHelpLink[];
}

export const JOURNEY_HELP: Readonly<Record<JourneyStage, JourneyStageConfig>> = {
  prepare: {
    headingEn: "Before you start: the three things that block a booking",
    headingBn: "শুরু করার আগে: যে তিনটি জিনিস বুকিং আটকে দেয়",
    introEn:
      "You are at the stage where documents and connectivity cause more delays than money does.",
    introBn:
      "এই ধাপে টাকার চেয়ে বেশি ঝামেলা করে কাগজপত্র আর ফোনে ইন্টারনেট।",
    links: [
      {
        partner: "airalo",
        labelEn: "Check Saudi eSIM plans",
        labelBn: "সৌদি eSIM প্ল্যান দেখুন",
        reasonEn:
          "Nusuk and the Rawdah permit both need a working phone the moment you land, and airport SIM queues are the first hour you lose.",
        reasonBn:
          "নুসুক আর রাওদা পারমিট — দুটোরই কাজ শুরু হয় নামার পরেই, আর বিমানবন্দরের সিমের লাইনে প্রথম ঘণ্টাটা নষ্ট হয়।",
      },
      {
        partner: "kiwitaxi",
        labelEn: "Compare Jeddah arrival transfers",
        labelBn: "জেদ্দা আগমন ট্রান্সফার দেখুন",
        reasonEn:
          "The distance from Jeddah airport to Makkah is the one leg nobody prices before they land.",
        reasonBn:
          "জেদ্দা বিমানবন্দর থেকে মক্কার রাস্তাটাই সেই অংশ, যার দাম কেউ আগে দেখে না।",
      },
      {
        partner: "klookHotels",
        labelEn: "Search Makkah and Madinah hotels",
        labelBn: "মক্কা ও মদিনার হোটেল খুঁজুন",
        reasonEn:
          "Compare the same room type and dates, not the headline rate — the hotel guide explains what to check.",
        reasonBn:
          "একই ধরনের রুম আর একই তারিখে তুলনা করুন, শুধু বড় করে লেখা দাম নয় — কী যাচাই করবেন তা হোটেল গাইডে আছে।",
      },
    ],
  },

  travel: {
    headingEn: "Getting there: fares, arrival and a working phone",
    headingBn: "পৌঁছানো পর্যন্ত: ভাড়া, আগমন আর চালু ফোন",
    introEn:
      "You are choosing flights or standing at an airport. These are the three things that go wrong on this leg.",
    introBn:
      "আপনি এখন ফ্লাইট বাছছেন বা বিমানবন্দরে দাঁড়িয়ে আছেন। এই অংশে যে তিনটি জিনিস বেশি ভোগায়।",
    links: [
      {
        partner: "aviasales",
        labelEn: "Compare live Dhaka fares",
        labelBn: "ঢাকার লাইভ ভাড়া তুলনা করুন",
        reasonEn:
          "Fares from Dhaka move overnight; check the same date twice before you commit to a package price.",
        reasonBn:
          "ঢাকা থেকে ভাড়া রাতারাতি বদলায়; প্যাকেজের দামে রাজি হওয়ার আগে একই তারিখে দুবার দেখুন।",
      },
      {
        partner: "kiwitaxi",
        labelEn: "Check the airport pickup",
        labelBn: "বিমানবন্দরের পিকআপ দেখুন",
        reasonEn:
          "Landing in Ihram with family and luggage is not the moment to negotiate a fare at the kerb.",
        reasonBn:
          "পরিবার আর লাগেজ নিয়ে ইহরামে নামার সময় কার্বসাইডে ভাড়া দরাদরার সময় নয়।",
      },
      {
        partner: "airalo",
        labelEn: "Check travel eSIM plans",
        labelBn: "ট্রাভেল eSIM দেখুন",
        reasonEn:
          "Install it before you fly; roaming that only activates on landing leaves you without a map at the worst moment.",
        reasonBn:
          "উড়ার আগেই ইনস্টল করুন; যে রোমিং নামার পর চালু হয়, সেটি সবচেয়ে দরকারের সময় ম্যাপহীন করে রাখে।",
      },
    ],
  },

  perform: {
    headingEn: "While you are there: the two things that help inside the Haram",
    headingBn: "সেখানে থাকাকালীন: হারামের ভেতরে যে দুটি জিনিস কাজে লাগে",
    introEn:
      "You are inside the rites. This is deliberately two links, not three — nothing else here is worth your attention.",
    introBn:
      "আপনি এখন ইবাদতের ভেতরে। ইচ্ছে করেই দুটি লিংক, তিনটি নয় — এখানে বাকি কিছু আপনার মনোযোগের যোগ্য নয়।",
    links: [
      {
        partner: "airalo",
        labelEn: "Check Saudi eSIM plans",
        labelBn: "সৌদি eSIM প্ল্যান দেখুন",
        reasonEn:
          "Your Rawdah slot and your family's meeting point are both on the phone; a dead battery or a dead SIM strands the group.",
        reasonBn:
          "রাওদার স্লট আর পরিবারের মিলনস্থল — দুটোই ফোনে; ব্যাটারি বা সিম মরে গেলে দল আটকে যায়।",
      },
      {
        partner: "kiwitaxi",
        labelEn: "Check Makkah ⇄ Madinah transfers",
        labelBn: "মক্কা ⇄ মদিনা ট্রান্সফার দেখুন",
        reasonEn:
          "The intercity leg and the Mina transfer are priced per vehicle, not per person — compare before the group leader commits.",
        reasonBn:
          "শহরান্তরের রাস্তা আর মিনার ট্রান্সফার গাড়ি-প্রতি হিসাবে, জনপ্রতি নয় — দলনেতা রাজি হওয়ার আগে তুলনা করুন।",
      },
    ],
  },

  return: {
    headingEn: "Coming home: bags, delays and the last day",
    headingBn: "ফেরার পথে: লাগেজ, দেরি আর শেষ দিন",
    introEn:
      "The return leg has its own three failure points, and two of them cost money.",
    introBn:
      "ফেরার পথেও তিনটি জায়গায় সমস্যা হয়, আর তার দুটোতে টাকা লাগে।",
    links: [
      {
        partner: "airhelp",
        labelEn: "Check delay or baggage compensation",
        labelBn: "দেরি বা লাগেজের ক্ষতিপূরণ দেখুন",
        reasonEn:
          "If the flight home is delayed or a bag goes missing, the claim window is short and most pilgrims never open one.",
        reasonBn:
          "ফেরার ফ্লাইট দেরি হলে বা ব্যাগ হারালে দাবির সময়সীমা কম, আর বেশিরভাগ হাজি দাবিই করেন না।",
      },
      {
        partner: "kiwitaxi",
        labelEn: "Book the airport run",
        labelBn: "বিমানবন্দরের যাওয়ার গাড়ি দেখুন",
        reasonEn:
          "A group of ten with Zamzam and suitcases needs a vehicle size agreed the night before, not at the door.",
        reasonBn:
          "জমজম আর স্যুটকেস নিয়ে দশজনের দল — গাড়ির সাইজ আগের রাতেই ঠিক করা দরকার, দরজায় নয়।",
      },
      {
        partner: "radicalStorage",
        labelEn: "Find last-day luggage storage",
        labelBn: "শেষ দিনের লাগেজ রাখার জায়গা",
        reasonEn:
          "Late flights after checkout are the normal case, and hauling bags around the Haram is not.",
        reasonBn:
          "চেকআউটের পর রাতের ফ্লাইট সাধারণ ব্যাপার, আর হারামের চারপাশে ব্যাগ টেনে ঘোরা নয়।",
      },
    ],
  },
};

export function getJourneyHelp(stage: JourneyStage | undefined): JourneyStageConfig | null {
  if (!stage) return null;
  return JOURNEY_HELP[stage] ?? null;
}
