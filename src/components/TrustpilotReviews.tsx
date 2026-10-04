import React from "react";
import { Star, ExternalLink, Quote, ShieldCheck } from "lucide-react";

interface Review {
  name: string;
  location: string;
  flag: string;
  date: string;
  title: string;
  text: string;
}

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/travelpayouts.com";

const FEATURED_REVIEW: Review = {
  name: "Tonya T.",
  location: "United States",
  flag: "🇺🇸",
  date: "Nov 26, 2023",
  title: "Travelpayouts Wowed Me & Won My Loyalty",
  text: "Though initially skeptical, I took a chance on Travelpayouts based on positive word-of-mouth. Fourteen months later, I'm blown away by their stellar affiliate marketing tools, training resources, and personalized support — hands-down my highest recommendation."
};

const REVIEWS: Review[] = [
  {
    name: "Emily",
    location: "Australia",
    flag: "🇦🇺",
    date: "Feb 16, 2026",
    title: "Very happy blogger!",
    text: "As an emerging blogger, I have found Travelpayouts to be extremely user-friendly. I love their easy-to-read dashboard, and their automatic payment process is transparent and reliable."
  },
  {
    name: "Connor",
    location: "United Kingdom",
    flag: "🇬🇧",
    date: "Jan 21, 2026",
    title: "Top Quality, Actual Payouts — Highly Recommend",
    text: "We've been affiliates with Travelpayouts for over 1.5 years now and I can't fault them. Payments are on time and always received without issue."
  },
  {
    name: "Winfred Ese Abba",
    location: "Nigeria",
    flag: "🇳🇬",
    date: "Dec 13, 2024",
    title: "The Best Affiliate Program for Travel Bloggers",
    text: "They connect you with numerous well-known brands in the travel industry — flights, hotels, car rentals, and travel insurance. Their customer support sets them apart from all the others."
  },
  {
    name: "Katerina Xirouchaki",
    location: "Greece",
    flag: "🇬🇷",
    date: "Sep 11, 2023",
    title: "An Affiliate Platform for Content Creators",
    text: "Travelpayouts is ideal for every content creator like me. It saved me a lot of time creating affiliate links for different travel companies, including Booking and Viator."
  },
  {
    name: "Marchando Viaje",
    location: "Spain",
    flag: "🇪🇸",
    date: "Jan 3, 2026",
    title: "The Best Affiliate Platform",
    text: "You can have everything in one place. The interface is super easy and intuitive, and even when I've had issues with pending reservations, they always solve them incredibly fast."
  },
  {
    name: "Leona",
    location: "Italy",
    flag: "🇮🇹",
    date: "Aug 22, 2023",
    title: "Great Platform and Supportive Customer Service",
    text: "Been with Travelpayouts for almost a year and never had a problem with payouts or reservations. 100% recommended!"
  }
];

function StarRow({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-[#00b67a]">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size} fill="#00b67a" strokeWidth={0} />
      ))}
    </div>
  );
}

export function TrustpilotReviews() {
  return (
    <div id="trustpilot-reviews-section" className="space-y-6">

      {/* Dark header band with eyebrow, heading, rating chip, and spotlight quote */}
      <div className="relative rounded-3xl overflow-hidden bg-brand-navy text-white p-8 md:p-12 shadow-2xl border border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b2d] via-brand-navy/95 to-[#0b1b2d]/80 z-0" />
        <div className="relative z-10 space-y-8">

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#F6B73C] bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
                <ShieldCheck size={12} /> Verified on Trustpilot
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-white">
                Trusted by Travel Creators Worldwide
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                URAL's live flight and hotel search runs on Travelpayouts, a global travel partnership network used by over 300,000 bloggers and travel sites. Here's what their partners say — pulled directly from Trustpilot, unedited.
              </p>
            </div>

            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Travelpayouts reviews on Trustpilot"
              className="group bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-[#F6B73C]/50 rounded-2xl px-5 py-4 flex items-center gap-4 shrink-0 transition-all"
            >
              <div className="text-3xl font-serif font-black text-white">4.6</div>
              <div className="space-y-1">
                <StarRow size={15} />
                <div className="text-[10px] font-mono text-slate-300">
                  <span className="text-white font-bold">Excellent</span> · 238 reviews
                </div>
              </div>
              <ExternalLink size={14} className="text-slate-400 group-hover:text-[#F6B73C] transition-colors ml-1" />
            </a>
          </div>

          {/* Featured spotlight quote */}
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/[0.04] hover:bg-white/[0.07] border border-slate-700/60 hover:border-[#F6B73C]/40 rounded-2xl p-6 sm:p-8 transition-all"
          >
            <Quote size={28} className="text-[#F6B73C]/40 mb-3" />
            <p className="font-serif text-base sm:text-lg text-white leading-relaxed mb-4">
              "{FEATURED_REVIEW.text}"
            </p>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{FEATURED_REVIEW.flag} <span className="text-slate-200 font-bold">{FEATURED_REVIEW.name}</span> · {FEATURED_REVIEW.location}</span>
              <span className="flex items-center gap-1">
                {FEATURED_REVIEW.date}
                <ExternalLink size={11} className="group-hover:text-[#F6B73C] transition-colors" />
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* Review card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((review, idx) => (
          <a
            key={idx}
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read ${review.name}'s review on Trustpilot`}
            className="group bg-white border border-slate-200 hover:border-[#00b67a]/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between transform hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <StarRow size={13} />
                <ExternalLink size={12} className="text-slate-300 group-hover:text-[#00b67a] transition-colors" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900 leading-snug">{review.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{review.text}</p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-600 font-mono">
              <span>{review.flag} {review.name}</span>
              <span>{review.date}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Closing CTA + transparency line */}
      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <a
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          Read All 238 Reviews on Trustpilot <ExternalLink size={13} />
        </a>
        <p className="text-[10px] text-slate-600 max-w-md">
          Like any platform, not every review is five stars — the link above shows the complete, unfiltered review history on Trustpilot.
        </p>
      </div>

    </div>
  );
}
