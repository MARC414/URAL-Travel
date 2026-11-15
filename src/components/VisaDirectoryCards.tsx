import { ArrowUpRight } from "lucide-react";
import type { VisaGuide } from "../types";
import { DESTINATION_HERO_IMAGES } from "../data/destinationHeroImages";
import { ResponsiveImage } from "./ResponsiveImage";

const CARDS: Record<string, { nameBn: string; image: string; en: string; bn: string }> = {
  "nepal-visa": { nameBn: "নেপাল", image: "nepal-guide",
    en: "Explore the Nepal entry route for Bangladeshi passport holders, including the circumstances in which a gratis visa on arrival may apply. Review the documents and arrival steps in the guide, then confirm current eligibility, fees and requirements with Nepal's immigration authorities before travelling.",
    bn: "বাংলাদেশি পাসপোর্টধারীদের জন্য নেপালে প্রবেশের পথ এবং কোন পরিস্থিতিতে বিনামূল্যের ভিসা অন অ্যারাইভাল প্রযোজ্য হতে পারে তা দেখুন। গাইডে নথি ও আগমনের ধাপ পড়ুন। ভ্রমণের আগে নেপালের অভিবাসন কর্তৃপক্ষের কাছে বর্তমান যোগ্যতা, ফি ও প্রয়োজনীয় শর্ত নিশ্চিত করুন।" },
  "thailand-visa": { nameBn: "থাইল্যান্ড", image: "thailand-guide",
    en: "Prepare for Thailand's advance e-Visa application with a guide to the official portal, supporting documents and application steps. Government fees, payment charges and optional agency fees are different. Check the current Dhaka mission instructions and the requirements for your own application before paying.",
    bn: "থাইল্যান্ডের অগ্রিম e-Visa আবেদনের সরকারি পোর্টাল, সহায়ক নথি ও ধাপ সম্পর্কে জানুন। সরকারি ফি, পেমেন্ট চার্জ ও ঐচ্ছিক এজেন্সি ফি আলাদা। টাকা দেওয়ার আগে ঢাকা মিশনের বর্তমান নির্দেশনা এবং আপনার আবেদনের জন্য প্রযোজ্য শর্ত যাচাই করুন।" },
  "malaysia-visa": { nameBn: "মালয়েশিয়া", image: "malaysia-guide",
    en: "Understand the Malaysia eVisa application and the documents to prepare, from passport details to supporting evidence. The arrival declaration is a separate step. Check current instructions, processing guidance and the full fee breakdown on official Malaysian channels before making travel commitments.",
    bn: "মালয়েশিয়ার eVisa আবেদন এবং পাসপোর্টের তথ্যসহ প্রস্তুত করার নথি সম্পর্কে জানুন। আগমনের ঘোষণা একটি আলাদা ধাপ। ভ্রমণের বুকিং চূড়ান্ত করার আগে সরকারি মালয়েশিয়ান মাধ্যমে বর্তমান নির্দেশনা, প্রসেসিং-সংক্রান্ত তথ্য ও ফি-এর সম্পূর্ণ হিসাব যাচাই করুন।" },
  "dubai-visa": { nameBn: "সংযুক্ত আরব আমিরাত", image: "dubai-guide",
    en: "Review UAE tourist visa application channels and the checks to make before using an airline, hotel or authorized provider. Compare the government and service charges separately, and verify the document list and current requirements with the relevant authority or provider for your circumstances.",
    bn: "সংযুক্ত আরব আমিরাতের ট্যুরিস্ট ভিসা আবেদনের পথ এবং এয়ারলাইন, হোটেল বা অনুমোদিত সেবাদাতা বেছে নেওয়ার আগে কী যাচাই করবেন তা দেখুন। সরকারি ও সেবা ফি আলাদা করে তুলনা করুন। নিজের পরিস্থিতি অনুযায়ী কর্তৃপক্ষ বা সেবাদাতার কাছে নথি ও বর্তমান শর্ত নিশ্চিত করুন।" },
  "singapore-visa": { nameBn: "সিঙ্গাপুর", image: "singapore-guide",
    en: "Plan for Singapore's advance visa process and review the guide to authorized submission, supporting documents and fees. The SG Arrival Card is separate from a visa. Before applying or travelling, check the latest Singapore ICA instructions and confirm the appropriate submission channel for your case.",
    bn: "সিঙ্গাপুরের অগ্রিম ভিসা প্রক্রিয়ায় অনুমোদিত আবেদনপথ, সহায়ক নথি ও ফি সম্পর্কে পড়ুন। SG Arrival Card ভিসা থেকে আলাদা। আবেদন বা ভ্রমণের আগে Singapore ICA-এর সর্বশেষ নির্দেশনা যাচাই করুন এবং আপনার পরিস্থিতির জন্য সঠিক আবেদনপথ নিশ্চিত করুন।" },
  "maldives-visa": { nameBn: "মালদ্বীপ", image: "maldives-guide",
    en: "Prepare for Maldives tourist entry with guidance on arrival requirements, accommodation and onward travel evidence. The IMUGA Traveller Declaration is a separate task for each traveller. Check the current rules directly with Maldives Immigration before departure; meeting the listed requirements does not guarantee entry.",
    bn: "মালদ্বীপে পর্যটক হিসেবে প্রবেশের জন্য আগমনের শর্ত, আবাসন ও পরবর্তী যাত্রার প্রমাণ সম্পর্কে জানুন। প্রত্যেক ভ্রমণকারীর IMUGA Traveller Declaration আলাদাভাবে পূরণ করতে হয়। রওনা হওয়ার আগে Maldives Immigration-এর বর্তমান নিয়ম যাচাই করুন; শর্ত পূরণ করলেই প্রবেশ নিশ্চিত হয় না।" },
  "saudi-arabia-visa": { nameBn: "সৌদি আরব", image: "passport",
    en: "Explore Saudi visa routes and the importance of checking your own eligibility, travel purpose and the appropriate application channel. Requirements and fees vary by route. Confirm current rules with Saudi authorities and accredited providers before paying, applying or making non-refundable bookings.",
    bn: "সৌদি ভিসার সম্ভাব্য পথ এবং নিজের যোগ্যতা, ভ্রমণের উদ্দেশ্য ও সঠিক আবেদনপদ্ধতি যাচাইয়ের গুরুত্ব সম্পর্কে জানুন। পথভেদে শর্ত ও ফি ভিন্ন হতে পারে। টাকা দেওয়া, আবেদন বা অফেরতযোগ্য বুকিংয়ের আগে সৌদি কর্তৃপক্ষ ও অনুমোদিত সেবাদাতার কাছে বর্তমান নিয়ম নিশ্চিত করুন।" },
};

export function getVisaCountryLabel(guide: VisaGuide, isBn: boolean): string {
  return isBn ? CARDS[guide.id]?.nameBn ?? guide.country : guide.country;
}

/** The same cards are rendered in the app and saved HTML. */
export function VisaDirectoryCards({ guides, isBn }: { guides: VisaGuide[]; isBn: boolean }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
    {guides.map((guide) => {
      const card = CARDS[guide.id];
      const image = card?.image === "passport"
        ? { src: "/assets/images/visa_directory_hero_20261112-1200.webp", altEn: "AI-generated illustration of travel documents at an airport", altBn: "বিমানবন্দরে ভ্রমণের নথির AI-তৈরি চিত্র" }
        : DESTINATION_HERO_IMAGES[card?.image];
      return <a key={guide.id} href={`${isBn ? "/bn" : ""}/visa/${guide.id}`} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2">
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          {image && <ResponsiveImage src={image.src} alt={isBn ? image.altBn : image.altEn} sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <h3 className="ural-card-title font-serif text-xl text-brand-navy">{isBn ? `${card?.nameBn ?? guide.country} ভিসা গাইড` : `${guide.country} visa guide`}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{card ? card[isBn ? "bn" : "en"] : guide.quickAnswer}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-brand-navy">{isBn ? "গাইড খুলুন (নতুন ট্যাবে)" : "Open guide (new tab)"}<ArrowUpRight size={16} aria-hidden="true" /></span>
        </div>
      </a>;
    })}
  </div>;
}
