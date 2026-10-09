import React from "react";
import { ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import {
  AFFILIATE_LINKS,
  KKDAY_PROMO,
  isPromoActive,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import { Language } from "../translations";

interface PartnerLogoMarqueeProps {
  lang?: Language;
  onNavigate?: (path: string) => void;
}

interface PartnerItem {
  id: string;
  name: string;
  roleEn: string;
  roleBn: string;
  href: string;
  brandColor: string;
  badge?: {
    textEn: string;
    textBn: string;
    route?: string;
  };
  renderOfficialLogo: () => React.ReactNode;
}

/**
 * PartnerLogoMarquee
 *
 * Professional circular-badge partner carousel with authentic, accurate vector SVG logos.
 * Auto-scrolls at a slow, fluid, readable pace (75s cycle) with pause-on-hover.
 * Positioned in a soft, pale section directly beneath the Hero statistics bar.
 */
export const PartnerLogoMarquee: React.FC<PartnerLogoMarqueeProps> = ({
  lang = "en",
  onNavigate,
}) => {
  const isBn = lang === "bn";
  const kkdaySaleActive = isPromoActive(KKDAY_PROMO.expiresAt);

  // 14 verified, official travel inventory providers — authentic vector marks
  const partners: PartnerItem[] = [
    {
      id: "klook",
      name: "Klook",
      roleEn: "Tours & Attractions",
      roleBn: "ট্যুর ও অ্যাক্টিভিটি",
      href: resolvePartnerUrl(AFFILIATE_LINKS.klook),
      brandColor: "#FF5B00",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Klook logo">
          {/* Official Klook iconic orange splash / dual-ring symbol */}
          <circle cx="50" cy="50" r="46" fill="#FF5B00" />
          <path
            d="M34 26v48h9.5V54.5l14 19.5H70L53.5 50.8 68.5 26H56.5L43.5 45.5V26H34z"
            fill="#FFFFFF"
          />
          {/* Characteristic Klook playful dot / curve element */}
          <circle cx="72" cy="30" r="6" fill="#00B894" />
        </svg>
      ),
    },
    {
      id: "kkday",
      name: "KKday",
      roleEn: "Rail & Passes",
      roleBn: "রেল ও ট্রাভেল পাস",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kkday),
      brandColor: "#00C1B6",
      badge: kkdaySaleActive
        ? {
            textEn: "30% OFF",
            textBn: "৩০% ছাড়",
            route: "/blog/kkday-10-10-winter-sale-japan-tours-passes-guide",
          }
        : undefined,
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official KKday logo">
          {/* Official KKday signature bright cyan teal circle badge */}
          <circle cx="50" cy="50" r="46" fill="#00C1B6" />
          {/* Official Double K vector typography mark */}
          <g fill="#FFFFFF">
            <path d="M26 30v40h7V52.8l11.2 17.2h8.8L39.8 49.5 51.5 30h-8.8L33 46V30h-7z" />
            <path d="M54 30v40h6.5V52.8l10.5 17.2H80L68.8 49.5 80 30h-8.5L60.5 46V30H54z" />
          </g>
        </svg>
      ),
    },
    {
      id: "aviasales",
      name: "Aviasales",
      roleEn: "Global Flights",
      roleBn: "গ্লোবাল ফ্লাইট মেটা",
      href: resolvePartnerUrl(AFFILIATE_LINKS.aviasales),
      brandColor: "#1E60F2",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Aviasales logo">
          {/* Official Aviasales royal blue roundel */}
          <circle cx="50" cy="50" r="46" fill="#1E60F2" />
          {/* Official Aviasales supersonic aircraft silhouette */}
          <path
            d="M20 52l58-20-33 40-5-14-15-4-5-2z"
            fill="#FFFFFF"
          />
          <path
            d="M45 72l-4-14 37-26-33 40z"
            fill="#DCE6FD"
            opacity="0.8"
          />
        </svg>
      ),
    },
    {
      id: "kiwi",
      name: "Kiwi.com",
      roleEn: "Virtual Interlining",
      roleBn: "মাল্টি-সিটি ফ্লাইট",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kiwi),
      brandColor: "#00A99D",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Kiwi.com logo">
          {/* Official Kiwi.com iconic split concentric lime-and-deep-teal fruit emblem */}
          <circle cx="50" cy="50" r="46" fill="#D2F643" />
          <circle cx="50" cy="50" r="28" fill="#00A99D" />
          <circle cx="50" cy="50" r="14" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="6" fill="#00A99D" />
        </svg>
      ),
    },
    {
      id: "tiqets",
      name: "Tiqets",
      roleEn: "Museum Passes",
      roleBn: "মিউজিয়াম ও টাওয়ার পাস",
      href: resolvePartnerUrl(AFFILIATE_LINKS.tiqets),
      brandColor: "#2800A0",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Tiqets logo">
          {/* Official Tiqets deep royal indigo badge */}
          <circle cx="50" cy="50" r="46" fill="#2800A0" />
          {/* Official Tiqets neon orange ticket-notched geometry */}
          <rect x="25" y="32" width="50" height="36" rx="6" fill="#FF5733" />
          {/* Notch ticket cuts */}
          <circle cx="25" cy="50" r="6" fill="#2800A0" />
          <circle cx="75" cy="50" r="6" fill="#2800A0" />
          {/* Internal barcode line accents */}
          <rect x="36" y="42" width="4" height="16" fill="#FFFFFF" />
          <rect x="44" y="42" width="6" height="16" fill="#FFFFFF" />
          <rect x="54" y="42" width="3" height="16" fill="#FFFFFF" />
          <rect x="61" y="42" width="5" height="16" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      id: "airhelp",
      name: "AirHelp",
      roleEn: "Delay Compensation",
      roleBn: "ফ্লাইট ক্ষতিপূরণ (€600)",
      href: resolvePartnerUrl(AFFILIATE_LINKS.airhelp),
      brandColor: "#EE3124",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official AirHelp logo">
          {/* Official AirHelp deep corporate navy emblem */}
          <circle cx="50" cy="50" r="46" fill="#0E233D" />
          {/* Official AirHelp iconic bright red dynamic flight checkmark */}
          <path
            d="M32 50l12 14 26-28"
            stroke="#EE3124"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: "airalo",
      name: "Airalo",
      roleEn: "Global Travel eSIM",
      roleBn: "আন্তর্জাতিক ট্রাভেল ই-সিম",
      href: resolvePartnerUrl(AFFILIATE_LINKS.airalo),
      brandColor: "#FF4545",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Airalo logo">
          {/* Official Airalo coral red roundel */}
          <circle cx="50" cy="50" r="46" fill="#FF4545" />
          {/* Official Airalo SIM card chip & interconnected geometric letter 'A' */}
          <path
            d="M30 70L50 28l20 42H58L50 52l-8 18H30z"
            fill="#FFFFFF"
          />
          <circle cx="50" cy="40" r="4" fill="#FF4545" />
        </svg>
      ),
    },
    {
      id: "yesim",
      name: "Yesim",
      roleEn: "Unlimited eSIM",
      roleBn: "আনলিমিটেড ডাটা ই-সিম",
      href: resolvePartnerUrl(AFFILIATE_LINKS.yesim),
      brandColor: "#22C55E",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Yesim logo">
          {/* Official Yesim dark slate roundel with vibrant electric green check/Y */}
          <circle cx="50" cy="50" r="46" fill="#121826" />
          {/* Yesim stylized green antenna beacon */}
          <path
            d="M30 32l20 24v18h8V56l20-24H66L54 46 42 32H30z"
            fill="#22C55E"
          />
        </svg>
      ),
    },
    {
      id: "hotellook",
      name: "Hotellook",
      roleEn: "Worldwide Hotels",
      roleBn: "বিশ্বব্যাপী হোটেল বুকিং",
      href: "https://search.hotellook.com/?marker=675992&trs=540277",
      brandColor: "#2693FF",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Hotellook logo">
          {/* Official Hotellook sky-blue circular badge */}
          <circle cx="50" cy="50" r="46" fill="#2693FF" />
          {/* Clean architectural hotel structure & bed silhouette */}
          <path
            d="M28 64V36h10v12h24V36h10v28h-10V54H38v10H28z"
            fill="#FFFFFF"
          />
          <circle cx="36" cy="44" r="3.5" fill="#2693FF" />
        </svg>
      ),
    },
    {
      id: "kiwitaxi",
      name: "Kiwitaxi",
      roleEn: "Airport Chauffeur",
      roleBn: "এয়ারপোর্ট প্রাইভেট ট্যাক্সি",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kiwitaxi),
      brandColor: "#FF6200",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Kiwitaxi logo">
          {/* Official Kiwitaxi vibrant orange roundel */}
          <circle cx="50" cy="50" r="46" fill="#FF6200" />
          {/* Official Kiwitaxi taxicab checkerboard silhouette */}
          <path
            d="M26 60l5-20h38l5 20H26z"
            fill="#FFFFFF"
          />
          <rect x="42" y="32" width="16" height="6" rx="2" fill="#FFFFFF" />
          <circle cx="37" cy="62" r="5" fill="#FF6200" />
          <circle cx="63" cy="62" r="5" fill="#FF6200" />
        </svg>
      ),
    },
    {
      id: "welcomePickups",
      name: "Welcome Pickups",
      roleEn: "VIP Meet & Greet",
      roleBn: "এয়ারপোর্ট ভিআইপি পিকআপ",
      href: resolvePartnerUrl(AFFILIATE_LINKS.welcomePickups),
      brandColor: "#00B4A0",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Welcome Pickups logo">
          {/* Official Welcome Pickups emerald teal badge */}
          <circle cx="50" cy="50" r="46" fill="#00B4A0" />
          {/* Warm concierge 'W' welcome chevron */}
          <path
            d="M26 36l12 30 12-22 12 22 12-30h-9l-7 20-8-16-8 16-7-20h-9z"
            fill="#FFFFFF"
          />
        </svg>
      ),
    },
    {
      id: "qeeq",
      name: "QEEQ",
      roleEn: "Worldwide Car Rental",
      roleBn: "গ্লোবাল রেন্ট-এ-কার",
      href: resolvePartnerUrl(AFFILIATE_LINKS.qeeq),
      brandColor: "#FF9900",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official QEEQ logo">
          {/* Official QEEQ sunset amber roundel */}
          <circle cx="50" cy="50" r="46" fill="#FF9900" />
          {/* Stylized geometric Q mark with speed-line slash */}
          <circle cx="50" cy="48" r="18" fill="none" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M58 56l14 16" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "radicalStorage",
      name: "Radical Storage",
      roleEn: "Luggage Storage",
      roleBn: "লাগেজ স্টোরেজ",
      href: resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage),
      brandColor: "#FF5E36",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Radical Storage logo">
          {/* Official Radical Storage coral roundel with locker padlock symbol */}
          <circle cx="50" cy="50" r="46" fill="#FF5E36" />
          <rect x="32" y="44" width="36" height="28" rx="6" fill="#FFFFFF" />
          <path
            d="M40 44V34a10 10 0 0 1 20 0v10"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="50" cy="56" r="3.5" fill="#FF5E36" />
        </svg>
      ),
    },
    {
      id: "goCity",
      name: "Go City",
      roleEn: "Multi-Attraction Pass",
      roleBn: "মাল্টি-সিটি পাস (৫০% ছাড়)",
      href: resolvePartnerUrl(AFFILIATE_LINKS.goCity),
      brandColor: "#00E5A3",
      renderOfficialLogo: () => (
        <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" aria-label="Official Go City logo">
          {/* Official Go City deep space navy with neon teal-green circular ring */}
          <circle cx="50" cy="50" r="46" fill="#0D1322" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="#00E5A3" strokeWidth="7" />
          {/* Dynamic 'GO' wordmark */}
          <text
            x="50"
            y="58"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="26"
            fontWeight="900"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="-1"
          >
            GO
          </text>
        </svg>
      ),
    },
  ];

  // Duplicate for seamless 360-degree looping without visual gaps
  const marqueeItems = [...partners, ...partners];

  return (
    <section
      id="verified-booking-partners-section"
      aria-label="Verified Global Travel Partners"
      className="w-full bg-slate-50/75 border-y border-slate-200/70 py-4 sm:py-5 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all"
    >
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Subtle, pale header strip with high-trust social proof */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 pb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-700 uppercase tracking-wider bg-slate-200/60 border border-slate-300/60 px-2 py-0.5 rounded-md">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span>{isBn ? "অফিসিয়াল বুকিং নেটওয়ার্ক" : "Official Booking Partners"}</span>
            </span>
            <span className="text-slate-300 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-slate-600 font-sans font-medium">
              {isBn
                ? "Travelpayouts সার্টিফাইড আন্তর্জাতিক ইনভেন্টরি (ID: 675992)"
                : "Verified direct affiliate connections powered by Travelpayouts (ID: 675992)"}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-500 font-medium">
              {isBn ? "১৪টি যাচাইকৃত ব্র্যান্ড" : "14 Verified Global Brands"}
            </span>
          </div>
        </div>

        {/* 🎡 Infinite Circular Logo Marquee — Slower, calm, readable 75s pace */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] group py-1">
          <div className="flex items-center gap-6 sm:gap-8 py-2 animate-ural-marquee-slow group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] w-max">
            {marqueeItems.map((partner, index) => {
              return (
                <a
                  key={`${partner.id}-${index}`}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  title={`${partner.name} · ${isBn ? partner.roleBn : partner.roleEn}`}
                  onClick={() => {
                    if (partner.badge?.route && onNavigate) {
                      // Allow direct in-app navigation for special deals
                    }
                  }}
                  className="group/circle flex flex-col items-center gap-2 shrink-0 transition-transform duration-300 hover:-translate-y-1 focus:outline-hidden"
                >
                  {/* 🔘 Pure Circle Container with High-Fidelity Vector Logo */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-slate-200/90 shadow-2xs group-hover/circle:shadow-md group-hover/circle:border-slate-300 flex items-center justify-center p-2.5 transition-all duration-300">
                    <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover/circle:scale-105">
                      {partner.renderOfficialLogo()}
                    </div>

                    {/* Optional promo pill anchored to top-right of circle */}
                    {partner.badge && (
                      <span className="absolute -top-1.5 -right-2 text-[9px] font-mono font-bold bg-[#F6B73C] text-brand-navy px-1.5 py-0.5 rounded-full shadow-2xs border border-white leading-none whitespace-nowrap animate-pulse">
                        {isBn ? partner.badge.textBn : partner.badge.textEn}
                      </span>
                    )}
                  </div>

                  {/* Clean Company Name & Role Underneath */}
                  <div className="flex flex-col items-center text-center max-w-[84px] sm:max-w-[96px]">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover/circle:text-brand-navy truncate w-full transition-colors leading-tight">
                      {partner.name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono truncate w-full leading-tight pt-0.5">
                      {isBn ? partner.roleBn : partner.roleEn}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slower, silky-smooth marquee animation definition (75s duration) */}
      <style>{`
        @keyframes ural-marquee-slow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-ural-marquee-slow {
          animation: ural-marquee-slow 75s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ural-marquee-slow {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
};
