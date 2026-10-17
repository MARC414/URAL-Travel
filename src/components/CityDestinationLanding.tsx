import React from "react";
import { ArrowRight, Compass, Info, MapPin, Ticket } from "lucide-react";
import type { BlogPost, DestinationGuide } from "../types";
import type { Language } from "../translations";
import { AFFILIATE_LINKS, PartnerLinkButton } from "./AffiliatePartners";
import {
  DESTINATION_AFFILIATE_PARTNERS,
  DESTINATION_PARTNER_COPY,
  DESTINATION_RELATED_BLOG_SLUGS,
} from "../data/destinationResources";

interface CityDestinationLandingProps {
  guide: DestinationGuide;
  blogs: BlogPost[];
  lang: Language;
  onNavigate: (path: string) => void;
}

const EXPERIENCE_PATHS: Record<string, string> = {
  "london-guide": "/experiences?region=west&city=london",
  "italy-guide": "/experiences?region=west&city=rome-italy",
  "paris-guide": "/experiences?region=west&city=paris",
  "new-york-guide": "/experiences?region=west&city=new-york",
};

const ACTIVITY_DESTINATION_NAMES: Record<string, { en: string; bn: string }> = {
  "london-guide": { en: "London", bn: "লন্ডন" },
  "italy-guide": { en: "Italy", bn: "ইতালি" },
  "paris-guide": { en: "Paris", bn: "প্যারিস" },
  "new-york-guide": { en: "New York City", bn: "নিউ ইয়র্ক সিটি" },
};

const DESTINATION_LINKS = [
  { path: "/destinations/nepal-guide", en: "Nepal", bn: "নেপাল" },
  { path: "/destinations/thailand-guide", en: "Thailand", bn: "থাইল্যান্ড" },
  { path: "/destinations/malaysia-guide", en: "Malaysia", bn: "মালয়েশিয়া" },
  { path: "/destinations/singapore-guide", en: "Singapore", bn: "সিঙ্গাপুর" },
  { path: "/destinations/maldives-guide", en: "Maldives", bn: "মালদ্বীপ" },
  { path: "/destinations/dubai-guide", en: "Dubai", bn: "দুবাই" },
  { path: "/destinations/london-guide", en: "London", bn: "লন্ডন" },
  { path: "/destinations/italy-guide", en: "Italy", bn: "ইতালি" },
  { path: "/destinations/paris-guide", en: "Paris", bn: "প্যারিস" },
  { path: "/destinations/new-york-guide", en: "New York City", bn: "নিউ ইয়র্ক সিটি" },
];

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";
const localizeNumber = (value: number) => String(value).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[Number(digit)]);

export default function CityDestinationLanding({ guide, blogs, lang, onNavigate }: CityDestinationLandingProps) {
  const isBn = lang === "bn";
  const experiencePath = EXPERIENCE_PATHS[guide.id];
  const relatedArticles = (DESTINATION_RELATED_BLOG_SLUGS[guide.id] ?? [])
    .map((slug) => blogs.find((post) => post.slug === slug))
    .filter((post): post is BlogPost => Boolean(post));
  const partnerKeys = DESTINATION_AFFILIATE_PARTNERS[guide.id] ?? [];
  const otherDestinationLinks = DESTINATION_LINKS.filter((item) => item.path !== `/destinations/${guide.id}`);
  const activityDestination = ACTIVITY_DESTINATION_NAMES[guide.id] ?? { en: guide.country, bn: guide.country };
  const localizedHref = (path: string) => isBn
    ? `/bn${path === "/" ? "/" : path}`
    : path;

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label={isBn ? "ব্রেডক্রাম্ব" : "Breadcrumb"} className="text-sm text-slate-500">
        <a href={localizedHref("/destinations")} onClick={(e) => navigate(e, "/destinations")} className="hover:text-brand-navy hover:underline">
          {isBn ? "গন্তব্যসমূহ" : "Destinations"}
        </a>
        <span className="mx-2" aria-hidden="true">/</span>
        <span aria-current="page" className="text-slate-700">{guide.country}</span>
      </nav>

      <header className="rounded-3xl bg-brand-navy p-6 text-white shadow-lg sm:p-9">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F6B73C]/40 bg-[#F6B73C]/10 px-3 py-1 text-xs font-semibold text-[#F6B73C]">
          <Compass size={14} aria-hidden="true" />
          {isBn ? "গন্তব্য গাইড" : "Destination guide"}
        </div>
        <h1 className="ural-page-title max-w-4xl font-serif text-3xl font-black leading-tight sm:text-5xl">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">{guide.quickAnswer}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {experiencePath && (
            <a href={localizedHref(experiencePath)} onClick={(e) => navigate(e, experiencePath)} className="inline-flex items-center gap-2 rounded-xl bg-[#F6B73C] px-4 py-3 text-sm font-bold text-brand-navy hover:bg-amber-300">
              <Ticket size={16} aria-hidden="true" />
              {isBn ? `${activityDestination.bn} আকর্ষণ ও কার্যক্রম দেখুন` : `Explore ${activityDestination.en} activities`}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          )}
          <a href={localizedHref("/flights")} onClick={(e) => navigate(e, "/flights")} className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">
            {isBn ? "ফ্লাইট পরিকল্পনা" : "Plan flights"}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)]">
        <article className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div>
            <h2 className="ural-section-title font-serif text-xl font-bold text-slate-900">
              {isBn ? `${guide.country} কীভাবে পরিকল্পনা করবেন` : `Planning a trip to ${guide.country}`}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{guide.description}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-700">
            <div className="flex items-start gap-2">
              <Info size={17} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
              <p>{isBn
                ? "আকর্ষণের সময়সূচি, প্রবেশের শর্ত, ভাড়া ও পরিবহন-তথ্য বদলাতে পারে। বুকিংয়ের আগে সংশ্লিষ্ট সরকারি সংস্থা বা অপারেটরের বর্তমান তথ্য যাচাই করুন। এখানে নির্দিষ্ট টিকিট-দাম বা মোট ভ্রমণ-খরচের নিশ্চয়তা দেওয়া হচ্ছে না।"
                : "Attraction schedules, entry conditions, fares and transport details can change. Check the relevant official authority or operator for current information before booking. This guide does not guarantee ticket prices or a total trip cost."}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl border border-slate-200 p-4">
              <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "ভ্রমণের তারিখ বাছাই" : "Choosing travel dates"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.bestTimeToVisit}</p>
            </section>
            <section className="rounded-xl border border-slate-200 p-4">
              <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "এক নজরে পরিকল্পনা" : "Planning at a glance"}</h2>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                {guide.keyFacts.map((fact, index) => <li key={index}><strong className="text-slate-800">{fact.label}:</strong> {fact.value}</li>)}
              </ul>
            </section>
          </div>
          <div>
            <h2 className="ural-section-title font-serif text-xl font-bold text-slate-900">{isBn ? "একটি নমনীয় ভ্রমণ-রূপরেখা" : "A flexible itinerary outline"}</h2>
            <ol className="mt-4 space-y-4">
              {guide.itinerary.map((day) => (
                <li key={day.day} className="rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-brand-navy">{isBn ? `দিন ${localizeNumber(day.day)}: ${day.title}` : `Day ${day.day}: ${day.title}`}</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                    {day.activities.map((activity, index) => <li key={index}>{activity}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="ural-section-title font-serif text-xl font-bold text-slate-900">{isBn ? "স্থানীয় পরিবহন পরিকল্পনা" : "Local transport planning"}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {guide.localTransport.map((item, index) => <li key={index} className="flex gap-2"><MapPin size={15} className="mt-1 shrink-0 text-brand-navy" aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "বাজেট পরিকল্পনার নোট" : "Budget planning note"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{guide.budgetBdt}</p>
          </div>
        </article>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "আরও গন্তব্য গাইড" : "More destination guides"}</h2>
            <ul className="mt-3 space-y-2">
              {otherDestinationLinks.map((item) => (
                <li key={item.path}>
                  <a href={localizedHref(item.path)} onClick={(e) => navigate(e, item.path)} className="inline-flex items-center gap-2 text-sm font-medium text-brand-navy hover:underline">
                    <ArrowRight size={14} aria-hidden="true" />{isBn ? item.bn : item.en}
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "সাধারণ প্রশ্ন" : "Common questions"}</h2>
            <div className="mt-3 space-y-4">
              {guide.faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-slate-800">{faq.question}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
          {relatedArticles.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "সম্পর্কিত ভ্রমণ-লেখা" : "Related travel articles"}</h2>
              <ul className="mt-3 space-y-3">
                {relatedArticles.map((post) => {
                  const path = `/blog/${post.slug}`;
                  return (
                    <li key={post.slug}>
                      <a href={localizedHref(path)} onClick={(e) => navigate(e, path)} className="text-sm font-medium leading-6 text-brand-navy hover:underline">{post.title}</a>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {partnerKeys.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "প্রাসঙ্গিক বুকিং পার্টনার" : "Relevant booking partners"}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">{isBn
                ? "এগুলো সহযোগী লিংক। লিংকের মাধ্যমে বুকিং হলে URAL কমিশন পেতে পারে—আপনার অতিরিক্ত খরচ ছাড়াই। গন্তব্যে তালিকা, প্রাপ্যতা, মূল্য ও শর্ত পার্টনারের সাইটে যাচাই করুন।"
                : "These are affiliate links. URAL may earn a commission if you book through them, at no extra cost to you. Check destination listings, availability, prices and terms on the partner site."}</p>
              <ul className="mt-4 space-y-4">
                {partnerKeys.map((partner) => {
                  const copy = DESTINATION_PARTNER_COPY[partner];
                  return (
                    <li key={partner} className="rounded-xl border border-slate-100 p-3">
                      <p className="text-sm font-medium text-slate-800">{isBn ? copy.bn : copy.en}</p>
                      <div className="mt-2">
                        <PartnerLinkButton href={AFFILIATE_LINKS[partner]} label={isBn ? copy.ctaBn : copy.ctaEn} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </aside>
      </section>
    </main>
  );
}
