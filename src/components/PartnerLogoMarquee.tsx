import React, { useState } from "react";
import { ExternalLink, Pause, Plane, Play } from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";
import { Language } from "../translations";

interface PartnerLogoMarqueeProps {
  lang?: Language;
  /** Kept for the existing App call-site API; partner links stay outbound. */
  onNavigate?: (path: string) => void;
}

interface PartnerItem {
  id: string;
  name: string;
  wordmark: string;
  logoSrc: string;
  roleEn: string;
  roleBn: string;
  href: string;
  brandColor: string;
}

/**
 * Travelpayouts partner wordmark carousel.
 *
 * Uses the partner artwork supplied under public/assets/partners rather than
 * hand-drawn lookalikes. HotelLook currently has a supplied PNG; use an SVG
 * only when an authorized vector is available.
 */
export const PartnerLogoMarquee: React.FC<PartnerLogoMarqueeProps> = ({ lang = "en" }) => {
  const isBn = lang === "bn";
  const [isPaused, setIsPaused] = useState(false);

  const partners: PartnerItem[] = [
    {
      id: "klook",
      name: "Klook",
      wordmark: "klook",
      logoSrc: "/assets/partners/klook.svg",
      roleEn: "Tours & attractions",
      roleBn: "ট্যুর ও অ্যাক্টিভিটি",
      href: resolvePartnerUrl(AFFILIATE_LINKS.klook),
      brandColor: "#FF5B00",
    },
    {
      id: "kkday",
      name: "KKday",
      wordmark: "KKday",
      logoSrc: "/assets/partners/kkday.svg",
      roleEn: "Tours & rail passes",
      roleBn: "ট্যুর ও রেল পাস",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kkday),
      brandColor: "#008D86",
    },
    {
      id: "aviasales",
      name: "Aviasales",
      wordmark: "aviasales",
      logoSrc: "/assets/partners/aviasales.svg",
      roleEn: "Flight search",
      roleBn: "ফ্লাইট সার্চ",
      href: resolvePartnerUrl(AFFILIATE_LINKS.aviasales),
      brandColor: "#1E60F2",
    },
    {
      id: "kiwi",
      name: "Kiwi.com",
      wordmark: "kiwi.com",
      logoSrc: "/assets/partners/kiwi.com.svg",
      roleEn: "Flight combinations",
      roleBn: "মাল্টি-সিটি ফ্লাইট",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kiwi),
      brandColor: "#008B80",
    },
    {
      id: "tiqets",
      name: "Tiqets",
      wordmark: "tiqets",
      logoSrc: "/assets/partners/tiqets.svg",
      roleEn: "Attraction tickets",
      roleBn: "আকর্ষণ ও মিউজিয়াম টিকিট",
      href: resolvePartnerUrl(AFFILIATE_LINKS.tiqets),
      brandColor: "#2800A0",
    },
    {
      id: "airhelp",
      name: "AirHelp",
      wordmark: "AirHelp",
      logoSrc: "/assets/partners/airhelp.svg",
      roleEn: "Flight disruption help",
      roleBn: "ফ্লাইট ক্ষতিপূরণ সহায়তা",
      href: resolvePartnerUrl(AFFILIATE_LINKS.airhelp),
      brandColor: "#D92D24",
    },
    {
      id: "airalo",
      name: "Airalo",
      wordmark: "airalo",
      logoSrc: "/assets/partners/Airalo.svg",
      roleEn: "Travel eSIM",
      roleBn: "ট্রাভেল eSIM",
      href: resolvePartnerUrl(AFFILIATE_LINKS.airalo),
      brandColor: "#E74848",
    },
    {
      id: "yesim",
      name: "Yesim",
      wordmark: "yesim",
      logoSrc: "/assets/partners/yesim.svg",
      roleEn: "Travel eSIM",
      roleBn: "ট্রাভেল eSIM",
      href: resolvePartnerUrl(AFFILIATE_LINKS.yesim),
      brandColor: "#168442",
    },
    {
      id: "hotellook",
      name: "Hotellook",
      wordmark: "hotellook",
      logoSrc: "/assets/partners/hotellook-logo.png",
      roleEn: "Hotel search",
      roleBn: "হোটেল সার্চ",
      href: "https://search.hotellook.com/?marker=675992&trs=540277",
      brandColor: "#287C3A",
    },
    {
      id: "kiwitaxi",
      name: "Kiwitaxi",
      wordmark: "kiwitaxi",
      logoSrc: "/assets/partners/kiwitaxi.svg",
      roleEn: "Airport transfers",
      roleBn: "এয়ারপোর্ট ট্রান্সফার",
      href: resolvePartnerUrl(AFFILIATE_LINKS.kiwitaxi),
      brandColor: "#E85B00",
    },
    {
      id: "welcomePickups",
      name: "Welcome Pickups",
      wordmark: "Welcome Pickups",
      logoSrc: "/assets/partners/welcome-pickups.svg",
      roleEn: "Airport meet & greet",
      roleBn: "এয়ারপোর্ট মিট অ্যান্ড গ্রিট",
      href: resolvePartnerUrl(AFFILIATE_LINKS.welcomePickups),
      brandColor: "#007F73",
    },
    {
      id: "qeeq",
      name: "QEEQ",
      wordmark: "QEEQ",
      logoSrc: "/assets/partners/qeeq.svg",
      roleEn: "Car rental search",
      roleBn: "গাড়ি ভাড়া সার্চ",
      href: resolvePartnerUrl(AFFILIATE_LINKS.qeeq),
      brandColor: "#B66A00",
    },
    {
      id: "radicalStorage",
      name: "Radical Storage",
      wordmark: "Radical Storage",
      logoSrc: "/assets/partners/radical-storage.svg",
      roleEn: "Luggage storage",
      roleBn: "লাগেজ স্টোরেজ",
      href: resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage),
      brandColor: "#D94F2D",
    },
    {
      id: "goCity",
      name: "Go City",
      wordmark: "Go City",
      logoSrc: "/assets/partners/go-city.svg",
      roleEn: "City attraction passes",
      roleBn: "সিটি অ্যাট্রাকশন পাস",
      href: resolvePartnerUrl(AFFILIATE_LINKS.goCity),
      brandColor: "#0B1426",
    },
  ];

  const renderPartner = (partner: PartnerItem, duplicate = false) => (
    <a
      key={`${partner.id}-${duplicate ? "duplicate" : "primary"}`}
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={
        duplicate
          ? undefined
          : `${partner.name} — ${isBn ? partner.roleBn : partner.roleEn}; affiliate link opens in a new tab`
      }
      title={`${partner.name} · ${isBn ? partner.roleBn : partner.roleEn}`}
      className="partner-marquee__item"
      style={{ "--partner-color": partner.brandColor } as React.CSSProperties}
    >
      <span className="partner-marquee__logo-lockup" aria-hidden="true">
        <img
          src={partner.logoSrc}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          className="partner-marquee__logo"
        />
        <span className={`partner-marquee__wordmark partner-marquee__wordmark--${partner.id}`}>
          {partner.wordmark}
        </span>
      </span>
      <span className="partner-marquee__role">
        {isBn ? partner.roleBn : partner.roleEn}
      </span>
      <ExternalLink size={12} className="partner-marquee__external" aria-hidden="true" />
    </a>
  );

  return (
    <section
      id="travel-booking-partners-section"
      aria-label={isBn ? "ট্রাভেল বুকিং পার্টনার" : "Travel booking partners"}
      aria-roledescription="carousel"
      className={`partner-marquee ${isPaused ? "partner-marquee--paused" : ""}`}
    >
      <div className="partner-marquee__inner">
        <div className="partner-marquee__header">
          <div className="partner-marquee__heading">
            <span className="partner-marquee__eyebrow">
              <Plane size={13} aria-hidden="true" />
              {isBn ? "Travelpayouts পার্টনার নেটওয়ার্ক" : "Travelpayouts partner network"}
            </span>
            <p className="partner-marquee__description">
              {isBn
                ? "ফ্লাইট, হোটেল, ট্রান্সফার ও ট্রাভেল এসেনশিয়ালস"
                : "Flights, stays, transfers and travel essentials"}
            </p>
          </div>

          <div className="partner-marquee__controls">
            <span className="partner-marquee__count">
              {isBn ? "১৪টি পার্টনার · একসাথে ৫টি" : "14 partners · 5 shown at once"}
            </span>
            <button
              type="button"
              className="partner-marquee__toggle"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-pressed={isPaused}
              aria-label={
                isPaused
                  ? isBn
                    ? "পার্টনার লোগো স্ক্রল চালু করুন"
                    : "Resume partner logo scrolling"
                  : isBn
                    ? "পার্টনার লোগো স্ক্রল থামান"
                    : "Pause partner logo scrolling"
              }
            >
              {isPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
              <span>
                {isPaused
                  ? isBn
                    ? "চালু করুন"
                    : "Resume"
                  : isBn
                    ? "থামান"
                    : "Pause"}
              </span>
            </button>
          </div>
        </div>

        <div className="partner-marquee__viewport" aria-live="off">
          <div className="partner-marquee__track">
            <div className="partner-marquee__group" role="list">
              {partners.map((partner) => (
                <div className="partner-marquee__list-item" role="listitem" key={partner.id}>
                  {renderPartner(partner)}
                </div>
              ))}
            </div>
            <div className="partner-marquee__group partner-marquee__group--clone" aria-hidden="true">
              {partners.map((partner) => (
                <div className="partner-marquee__list-item" key={`clone-${partner.id}`}>
                  {renderPartner(partner, true)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partner-marquee {
          --partner-gap: 16px;
          width: 100%;
          background: linear-gradient(105deg, #fff 0%, #fbfaf6 52%, #fff 100%);
          border: 1px solid rgba(11, 20, 38, 0.08);
          border-radius: 20px;
          box-shadow: 0 8px 28px rgba(11, 20, 38, 0.055);
          padding: 18px 20px 16px;
          color: #0B1426;
        }
        .partner-marquee__inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .partner-marquee__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 15px;
        }
        .partner-marquee__heading {
          min-width: 0;
        }
        .partner-marquee__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #475569;
          font: 700 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }
        .partner-marquee__eyebrow svg {
          color: #0F4A3F;
        }
        .partner-marquee__description {
          margin: 5px 0 0;
          color: #64748B;
          font: 500 12px/1.35 Inter, Arial, sans-serif;
        }
        .partner-marquee__controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex: 0 0 auto;
        }
        .partner-marquee__count {
          color: #64748B;
          font: 500 10px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
          white-space: nowrap;
        }
        .partner-marquee__toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 34px;
          padding: 0 10px;
          border: 1px solid #DCE3E8;
          border-radius: 999px;
          background: #fff;
          color: #0B1426;
          font: 700 11px/1 Inter, Arial, sans-serif;
          cursor: pointer;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .partner-marquee__toggle:hover {
          background: #F5F1E8;
          border-color: #B7C1CA;
        }
        .partner-marquee__toggle:focus-visible,
        .partner-marquee__item:focus-visible {
          outline: 3px solid #0B1426;
          outline-offset: 3px;
        }
        .partner-marquee__viewport {
          width: 100%;
          overflow: hidden;
          container-type: inline-size;
          mask-image: linear-gradient(90deg, transparent 0, #000 2.5%, #000 97.5%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 2.5%, #000 97.5%, transparent 100%);
        }
        .partner-marquee__track {
          display: flex;
          width: max-content;
          align-items: stretch;
          animation: ural-partner-marquee 76s linear infinite;
          will-change: transform;
        }
        .partner-marquee--paused .partner-marquee__track,
        .partner-marquee__viewport:hover .partner-marquee__track,
        .partner-marquee__viewport:focus-within .partner-marquee__track {
          animation-play-state: paused;
        }
        .partner-marquee__group {
          display: flex;
          align-items: stretch;
          gap: var(--partner-gap);
          width: max-content;
          padding-right: var(--partner-gap);
        }
        .partner-marquee__list-item {
          flex: 0 0 calc(20cqw - 12.8px);
          width: calc(20cqw - 12.8px);
          min-width: 0;
        }
        .partner-marquee__item {
          position: relative;
          display: flex;
          width: 100%;
          min-height: 110px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 12px 10px;
          overflow: hidden;
          border: 1px solid #E7E9EA;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.96);
          text-decoration: none;
          box-shadow: 0 2px 7px rgba(11, 20, 38, 0.035);
          transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }
        .partner-marquee__item::after {
          position: absolute;
          right: 14px;
          bottom: 0;
          left: 14px;
          height: 2px;
          border-radius: 2px 2px 0 0;
          background: var(--partner-color);
          content: "";
          opacity: 0.7;
          transform: scaleX(0.28);
          transform-origin: center;
          transition: transform 180ms ease, opacity 180ms ease;
        }
        .partner-marquee__item:hover {
          border-color: color-mix(in srgb, var(--partner-color) 40%, #DCE3E8);
          box-shadow: 0 9px 22px rgba(11, 20, 38, 0.10);
          transform: translateY(-2px);
        }
        .partner-marquee__item:hover::after {
          opacity: 1;
          transform: scaleX(1);
        }
        .partner-marquee__logo-lockup {
          display: flex;
          min-height: 66px;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        .partner-marquee__logo {
          display: block;
          width: 44px;
          height: 44px;
          max-width: 76px;
          flex: 0 0 auto;
          object-fit: contain;
        }
        .partner-marquee__wordmark {
          display: block;
          max-width: 100%;
          overflow: hidden;
          color: #0B1426;
          font-family: Inter, Arial, sans-serif;
          font-size: clamp(14px, 1.35vw, 17px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .partner-marquee__wordmark--welcomePickups,
        .partner-marquee__wordmark--radicalStorage {
          font-size: clamp(12px, 1.05vw, 14px);
          letter-spacing: -0.035em;
        }
        .partner-marquee__wordmark--qeeq {
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 900;
          letter-spacing: 0.03em;
        }
        .partner-marquee__wordmark--kkday {
          letter-spacing: -0.06em;
        }
        .partner-marquee__role {
          max-width: 100%;
          overflow: hidden;
          color: #64748B;
          font: 500 10px/1.2 Inter, Arial, sans-serif;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .partner-marquee__external {
          position: absolute;
          top: 9px;
          right: 9px;
          color: #94A3B8;
          opacity: 0;
          transition: opacity 160ms ease;
        }
        .partner-marquee__item:hover .partner-marquee__external,
        .partner-marquee__item:focus-visible .partner-marquee__external {
          opacity: 1;
        }
        @keyframes ural-partner-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 900px) {
          .partner-marquee { --partner-gap: 12px; padding: 16px 15px 14px; }
          .partner-marquee__list-item { flex-basis: calc(25cqw - 9px); width: calc(25cqw - 9px); }
          .partner-marquee__count { display: none; }
        }
        @media (max-width: 640px) {
          .partner-marquee { padding: 14px 12px 12px; border-radius: 16px; }
          .partner-marquee__header { align-items: flex-start; margin-bottom: 12px; }
          .partner-marquee__description { font-size: 11px; }
          .partner-marquee__count { display: none; }
          .partner-marquee__toggle { min-height: 32px; padding: 0 8px; }
          .partner-marquee__list-item { flex-basis: calc(50cqw - 6px); width: calc(50cqw - 6px); }
          .partner-marquee__item { min-height: 104px; padding: 10px 7px; }
          .partner-marquee__logo-lockup { min-height: 62px; gap: 4px; }
          .partner-marquee__logo { width: 38px; height: 38px; }
          .partner-marquee__wordmark { font-size: clamp(13px, 3.4vw, 15px); }
          .partner-marquee__wordmark--welcomePickups,
          .partner-marquee__wordmark--radicalStorage { font-size: clamp(11px, 3vw, 13px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee__viewport {
            overflow-x: auto;
            mask-image: none;
            -webkit-mask-image: none;
            scrollbar-width: thin;
            scroll-snap-type: x mandatory;
          }
          .partner-marquee__track { animation: none; will-change: auto; }
          .partner-marquee__group--clone,
          .partner-marquee__toggle { display: none; }
          .partner-marquee__list-item { scroll-snap-align: start; }
          .partner-marquee__item { transition: none; }
        }
        @supports not (width: 1cqw) {
          .partner-marquee__list-item { flex-basis: calc(20vw - 20px); width: calc(20vw - 20px); }
          @media (max-width: 900px) {
            .partner-marquee__list-item { flex-basis: calc(25vw - 12px); width: calc(25vw - 12px); }
          }
          @media (max-width: 640px) {
            .partner-marquee__list-item { flex-basis: calc(50vw - 12px); width: calc(50vw - 12px); }
          }
        }
      `}</style>
    </section>
  );
};
