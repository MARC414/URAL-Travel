import React, { useEffect, useRef, useState } from "react";
import { Calendar, ExternalLink, MapPin, MessageCircle, Plane, ShieldCheck, Users } from "lucide-react";

const WELCOME_PICKUPS_SCRIPT_SRC =
  "https://tpemd.com/content?promo_id=8951&campaign_id=627&powered_by=true&show_header=true&locale=en&shmarker=675992&trs=589561";

export const WELCOME_PICKUPS_PARTNER_URL =
  "https://tp.media/r?marker=675992&trs=589561&p=8951&u=https%3A%2F%2Fwww.welcomepickups.com&campaign_id=627";

interface WelcomePickupsEmbedProps {
  /** Context label only; it is not sent through the generic partner link. */
  defaultCountry?: string;
  lang?: "en" | "bn";
}

export function WelcomePickupsEmbed({
  defaultCountry = "",
  lang = "en",
}: WelcomePickupsEmbedProps) {
  const isBn = lang === "bn";
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [passengers, setPassengers] = useState(2);
  const [showOfficialWidget, setShowOfficialWidget] = useState(false);
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showOfficialWidget || !scriptContainerRef.current) return;
    scriptContainerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = WELCOME_PICKUPS_SCRIPT_SRC;
    script.async = true;
    script.charset = "utf-8";
    scriptContainerRef.current.appendChild(script);
  }, [showOfficialWidget]);

  const whatsappMessage = [
    "Hi URAL desk — I have a question about arranging an airport transfer.",
    `Destination context: ${defaultCountry || "not specified"}`,
    `Arrival airport: ${arrivalAirport.trim() || "not provided"}`,
    `Destination area/address: ${destinationAddress.trim() || "not provided"}`,
    `Flight number: ${flightNumber.trim() || "not provided"}`,
    `Pickup date: ${pickupDate || "not selected"}`,
    `Passengers: ${passengers}`,
    "Please confirm whether this service is available, whether BDT payment is possible, and the current total and terms before I pay. This is an inquiry, not a confirmed booking.",
  ].join("\n");
  const whatsappUrl = `https://wa.me/8801784385335?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      aria-label={isBn ? "Welcome Pickups ট্রান্সফার অপশন" : "Welcome Pickups transfer options"}
      className="w-full space-y-4 rounded-xl border border-slate-200 bg-white p-4 font-sans sm:p-5"
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-lg bg-brand-navy p-2 text-[#F6B73C]">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <div>
            <h4 className="font-serif text-base font-bold text-slate-900">
              {isBn ? "Welcome Pickups ট্রান্সফার সার্চ" : "Search transfers on Welcome Pickups"}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              {isBn
                ? `গন্তব্যের প্রসঙ্গ: ${defaultCountry || "নির্বাচিত নয়"}. পার্টনার লিংকে এখানকার বিমানবন্দর, ঠিকানা, তারিখ বা যাত্রীর তথ্য যায় না—সাইটে আবার দিন এবং চূড়ান্ত দাম ও শর্ত যাচাই করুন।`
                : `Destination context: ${defaultCountry || "not selected"}. The partner link does not carry an airport, address, date or passenger details from here; enter them on the partner site and verify the current total and terms.`}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-expanded={showOfficialWidget}
          onClick={() => setShowOfficialWidget((visible) => !visible)}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 self-start rounded-md bg-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
        >
          {showOfficialWidget
            ? isBn ? "অফিশিয়াল উইজেট বন্ধ করুন" : "Hide official widget"
            : isBn ? "অফিশিয়াল উইজেট দেখুন" : "Show official partner widget"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-[11px] font-semibold text-slate-700">
          <span className="mb-1 flex items-center gap-1"><MapPin size={11} aria-hidden="true" />{isBn ? "আগমনের বিমানবন্দর" : "Arrival airport"}</span>
          <input
            type="text"
            value={arrivalAirport}
            onChange={(event) => setArrivalAirport(event.target.value)}
            placeholder={isBn ? "বিমানবন্দরের নাম বা কোড" : "Airport name or code"}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          />
        </label>
        <label className="block text-[11px] font-semibold text-slate-700">
          <span className="mb-1 flex items-center gap-1"><MapPin size={11} aria-hidden="true" />{isBn ? "গন্তব্য এলাকা বা হোটেলের ঠিকানা" : "Destination area or hotel address"}</span>
          <input
            type="text"
            value={destinationAddress}
            onChange={(event) => setDestinationAddress(event.target.value)}
            placeholder={isBn ? "সঠিক এলাকা বা ঠিকানা লিখুন" : "Enter the specific area or address"}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          />
        </label>
        <label className="block text-[11px] font-semibold text-slate-700">
          <span className="mb-1 flex items-center gap-1"><Plane size={11} aria-hidden="true" />{isBn ? "ফ্লাইট নম্বর (ঐচ্ছিক)" : "Flight number (optional)"}</span>
          <input
            type="text"
            value={flightNumber}
            onChange={(event) => setFlightNumber(event.target.value)}
            placeholder={isBn ? "যেমন: BG 388" : "e.g. BG 388"}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-[11px] font-semibold text-slate-700">
            <span className="mb-1 flex items-center gap-1"><Calendar size={11} aria-hidden="true" />{isBn ? "পিকআপের তারিখ" : "Pickup date"}</span>
            <input
              type="date"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
            />
          </label>
          <label className="block text-[11px] font-semibold text-slate-700">
            <span className="mb-1 flex items-center gap-1"><Users size={11} aria-hidden="true" />{isBn ? "যাত্রী" : "Passengers"}</span>
            <select
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-slate-600">
        {isBn
          ? "উপরের তথ্যগুলো সরাসরি Welcome Pickups-এ পাঠানো হয় না। WhatsApp বোতামটি এই তথ্য দিয়ে URAL-কে একটি খসড়া বার্তা তৈরি করে—পাঠানোর আগে দেখে বা সম্পাদনা করুন। পার্টনার সাইটে সার্চ করলে বর্তমান প্রাপ্যতা, পিকআপের শর্ত ও চূড়ান্ত দাম মিলিয়ে নিন। URAL যোগ্য বুকিংয়ে কমিশন পেতে পারে।"
          : "The details above are not sent to Welcome Pickups by the direct link. The WhatsApp button drafts a message to URAL using these fields—review or edit it before sending. Search the partner site to check current availability, pickup terms and the final price. URAL may earn a commission on qualifying bookings."}
      </p>

      <div className="flex flex-wrap gap-2.5">
        <a
          href={WELCOME_PICKUPS_PARTNER_URL}
          data-affiliate-placement="travel_essentials_welcome_pickups_transfer"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#F6B73C] px-4 py-2.5 text-xs font-bold text-brand-navy transition-colors hover:bg-[#ffc654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
        >
          {isBn ? "Welcome Pickups-এ সার্চ করুন" : "Search Welcome Pickups"}
          <ExternalLink size={12} aria-hidden="true" />
        </a>
        <a
          href={whatsappUrl}
          data-contact-placement="ural_transfer_availability_inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <MessageCircle size={13} className="text-emerald-700" aria-hidden="true" />
          {isBn ? "URAL ডেস্কে ট্রান্সফার সম্পর্কে জিজ্ঞাসা করুন" : "Ask URAL about transfer options"}
        </a>
      </div>

      <p className="flex gap-1.5 text-[11px] leading-relaxed text-slate-500">
        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
        <span>
          {isBn
            ? "WhatsApp বার্তাটি কেবল অনুসন্ধান; এটি নিশ্চিত বুকিং বা ভাড়ার কোট নয়। পেমেন্টের আগে সেবার প্রাপ্যতা, BDT-তে পরিশোধের সুযোগ, মোট দাম ও শর্ত URAL ডেস্কের সঙ্গে নিশ্চিত করুন।"
            : "The WhatsApp message is an inquiry, not a confirmed booking or fare quote. Before paying, confirm availability, whether BDT payment is possible, the full amount and terms with URAL."}
        </span>
      </p>

      {showOfficialWidget && (
        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>{isBn ? "পার্টনার-পরিচালিত অফিসিয়াল উইজেট" : "Partner-provided official widget"}</span>
            <a
              href={WELCOME_PICKUPS_PARTNER_URL}
              data-affiliate-placement="travel_essentials_welcome_pickups_official_widget_link"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:underline"
            >
              {isBn ? "পার্টনার সাইট খুলুন" : "Open partner site"}
              <ExternalLink size={10} aria-hidden="true" />
            </a>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600">
            {isBn
              ? "উইজেটের তথ্য পার্টনারের নিয়ন্ত্রণে। সার্চের আগে রুট ও তারিখ যাচাই করুন এবং পেমেন্টের আগে চূড়ান্ত দাম ও শর্ত পড়ুন।"
              : "The widget is controlled by the partner. Confirm the route and date in its search, then review the final price and terms before paying."}
          </p>
          <div ref={scriptContainerRef} className="min-h-[120px] w-full overflow-x-auto" />
        </div>
      )}
    </section>
  );
}
