import React, { useState } from "react";

import { SERVICE_CONTACT_FAQS } from "../hooks/useSeoMeta";

import { ResponsiveImage } from "../components/ResponsiveImage";

import { TravelIntelligence } from "../components/AeoInspector";

import { URAL_SOCIAL_LINKS, URAL_SUPPORT_EMAIL } from "../utils/schema";



type RouteViewProps = { context: Record<string, any> };



export default function ContactRouteView({ context }: RouteViewProps) {

  const { contactDestination, contactLoading, contactMessage, contactName, contactPhone, contactSubject, contactSubmitted, isBn, section, setContactDestination, setContactLoading, setContactMessage, setContactName, setContactPhone, setContactSubject, setContactSubmitted } = context;

  const [contactEmail, setContactEmail] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  return (

        <div className="ural-route-stack animate-fade-in font-sans">



          {/* Hero banner — real support desk photo, text over the dark left side.
              The image is the page's LCP element: it is preloaded as AVIF by
              scripts/prerender.ts (lcpImageUrl), matching the first <source> that
              ResponsiveImage renders. Keep both in step (see ResponsiveImage.tsx). */}
          <div className="bg-brand-navy text-white rounded-3xl relative overflow-hidden shadow-xl border border-slate-800">

            <ResponsiveImage
              src="/assets/images/contact_support_desk_agent_1791600000000-1200.webp"
              sizes="100vw"
              alt={
                isBn
                  ? "হেডসেট পরা একজন URAL সাপোর্ট এজেন্ট অফিস ডেস্কে গ্রাহকের কল ধরছেন"
                  : "A URAL support agent wearing a headset at her desk, ready to take a traveller's call"
              }
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />

            {/* Scrim: keeps the headline readable over the photo on every viewport.
                Darkest at the left (where the text sits) and lighter to the right,
                where the agent is. */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/92 to-brand-navy/55 sm:via-brand-navy/85 sm:to-brand-navy/25" />

            <div className="relative z-10 p-8 sm:p-12 max-w-3xl space-y-4">

              <div className="inline-flex items-center gap-2 bg-[#F6B73C]/15 text-[#F6B73C] text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">

                <span className="w-2 h-2 rounded-full bg-[#F6B73C]"></span>

                {isBn ? "সরাসরি সাপোর্ট হটলাইন" : "Direct Assistance Hotline"}

              </div>



              <h1 className="ural-page-title font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">

                {isBn ? "সরাসরি আমাদের সাথে যোগাযোগ করুন" : "Let's Connect Directly"}

              </h1>



              <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">

                {isBn
                  ? "ফ্লাইট বুকিং, ভিসা প্রসেসিং, কিংবা Umrah ও ট্যুর প্যাকেজ সম্পর্কে জানতে চান? সরাসরি কল করুন, WhatsApp-এ মেসেজ দিন অথবা নিচের ফর্মটি পূরণ করুন। আমরা দ্রুততম সময়ে উত্তর দিই!"
                  : "Have inquiries about flight bookings, visa procedures, or destination travel packages? Contact our director directly through Call, WhatsApp, or the interactive travel inquiry form below. We respond instantly!"}

              </p>

            </div>

          </div>



          {/* Travel Inquiry Contact Form & Verification Section */}

          <div className="ural-panel bg-white border border-border-subtle p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">



            {/* Left Form (Col 7) */}

            <div className="lg:col-span-7 space-y-6">

              <div className="border-b border-slate-100 pb-4">

                <h2 className="ural-section-title font-serif text-xl font-bold text-slate-900">

                  {isBn ? "আপনার ভ্রমণ জিজ্ঞাসা পাঠান" : "Send an Interactive Travel Inquiry"}

                </h2>

                <p className="text-xs text-slate-500 mt-1">

                  {isBn ? "আপনার গন্তব্য এবং কী ধরনের সহায়তা প্রয়োজন তা উল্লেখ করুন, আমরা দ্রুত কলব্যাক করব।" : "Specify your target destination and desired assistance type to receive a custom callback."}

                </p>

              </div>



              {contactSubmitted ? (

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">

                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-sm shadow-emerald-500/20">

                    ✓

                  </div>

                  <div className="space-y-1">

                    <h3 className="ural-card-title font-serif text-lg font-bold text-slate-900">

                      {isBn ? "আপনার বার্তা সফলভাবে গৃহীত হয়েছে!" : "Inquiry Received Successfully!"}

                    </h3>

                    <p className="text-xs text-slate-600 max-w-md mx-auto">

                      {isBn ? (

                        <>

                          ধন্যবাদ <b>{contactName}</b>। আপনার <b>{contactSubject}</b> সংক্রান্ত অনুরোধটি নথিভুক্ত হয়েছে। আমরা দ্রুত <b>{contactPhone}</b> নাম্বারে কল বা WhatsApp-এ যোগাযোগ করব।

                        </>

                      ) : (

                        <>

                          Thank you <b>{contactName}</b>. Your request regarding <b>{contactSubject}</b> has been registered. We will contact you at <b>{contactPhone}</b> via Call and WhatsApp shortly.

                        </>

                      )}

                    </p>

                  </div>



                  <div className="bg-white rounded-xl p-4 border border-emerald-200 text-left space-y-2 max-w-md mx-auto font-mono text-[11px] text-slate-600">

                    <div className="flex justify-between border-b border-slate-100 pb-1">

                      <span className="font-bold text-slate-400">SUBJECT:</span>

                      <span className="text-slate-800 font-bold">{contactSubject}</span>

                    </div>

                    <div className="flex justify-between border-b border-slate-100 pb-1">

                      <span className="font-bold text-slate-400">DESTINATION:</span>

                      <span className="text-slate-800 font-bold">{contactDestination}</span>

                    </div>

                    <div className="flex justify-between pb-1">

                      <span className="font-bold text-slate-400">SUBMISSION ID:</span>

                      <span className="text-brand-navy font-bold">{submissionId || `URAL-REQ-${Math.floor(1000 + Math.random() * 9000)}`}</span>

                    </div>

                  </div>



                  <button

                    onClick={() => {

                      setContactSubmitted(false);

                      setContactName("");

                      setContactPhone("");

                      setContactEmail("");

                      setContactMessage("");

                    }}

                    className="bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors"

                  >

                    {isBn ? "আরেকটি জিজ্ঞাসা পাঠান" : "Send Another Inquiry"}

                  </button>

                </div>

              ) : (

                <form

                  onSubmit={async (e) => {

                    e.preventDefault();

                    if (!contactName || !contactPhone) {

                      return;

                    }

                    const generatedReqId = `URAL-REQ-${Math.floor(1000 + Math.random() * 9000)}`;

                    setSubmissionId(generatedReqId);

                    setContactLoading(true);



                    try {

                      const serverlessRequest = fetch("/api/contact", {

                        method: "POST",

                        headers: {

                          "Content-Type": "application/json",

                          "Accept": "application/json",

                        },

                        body: JSON.stringify({

                          submissionId: generatedReqId,

                          name: contactName,

                          phone: contactPhone,

                          email: contactEmail.trim(),

                          subject: contactSubject,

                          destination: contactDestination,

                          message: contactMessage,

                          pageUrl: typeof window !== "undefined" ? window.location.href : "https://uraltravel.co.uk/contact",

                        }),

                      }).catch(() => null);



                      const formSubmitRequest = fetch("https://formsubmit.co/ajax/marcwriter2025@gmail.com", {

                        method: "POST",

                        headers: {

                          "Content-Type": "application/json",

                          "Accept": "application/json",

                        },

                        body: JSON.stringify({

                          "Submission ID": generatedReqId,

                          Name: contactName,

                          "Phone / WhatsApp": contactPhone,

                          ...(contactEmail.trim() ? { Email: contactEmail.trim(), _replyto: contactEmail.trim() } : {}),

                          "Assistance Category": contactSubject,

                          "Travel Destination": contactDestination,

                          Message: contactMessage,

                          "_subject": `New URAL Travel Inquiry (${generatedReqId}) from ${contactName}`,

                          "_template": "table",

                        }),

                      }).catch(() => null);



                      await Promise.allSettled([serverlessRequest, formSubmitRequest]);

                    } catch (err) {

                      console.warn("Direct inquiry delivery fallback:", err);

                    } finally {

                      setContactLoading(false);

                      setContactSubmitted(true);

                    }

                  }}

                  className="space-y-4 text-xs"

                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Name input */}

                    <div className="space-y-1.5">

                      <label htmlFor="contact-full-name" className="font-bold text-slate-700 block">

                        {isBn ? "আপনার নাম" : "Full Name"} <span className="text-red-500">*</span>

                      </label>

                      <input

                        id="contact-full-name"

                        type="text"

                        required

                        placeholder={isBn ? "যেমন: Farhan Momen" : "e.g. Farhan Momen"}

                        value={contactName}

                        onChange={(e) => setContactName(e.target.value)}

                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"

                      />

                    </div>



                    {/* Phone input */}

                    <div className="space-y-1.5">

                      <label htmlFor="contact-phone-number" className="font-bold text-slate-700 block">

                        {isBn ? "ফোন বা WhatsApp নাম্বার" : "Phone or WhatsApp Number"} <span className="text-red-500">*</span>

                      </label>

                      <input

                        id="contact-phone-number"

                        type="tel"

                        required

                        placeholder="e.g. +8801784385335"

                        value={contactPhone}

                        onChange={(e) => setContactPhone(e.target.value)}

                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"

                      />

                    </div>

                  </div>



                  {/* Optional Email input for direct reply from support@uraltravel.co.uk */}

                  <div className="space-y-1.5">

                    <label htmlFor="contact-email-address" className="font-bold text-slate-700 block">

                      {isBn ? "ইমেইল ঠিকানা (ঐচ্ছিক — লিখিত উত্তরের জন্য)" : "Email Address (Optional — for written reply)"}

                    </label>

                    <input

                      id="contact-email-address"

                      type="email"

                      placeholder={isBn ? "যেমন: traveler@example.com" : "e.g. traveler@example.com"}

                      value={contactEmail}

                      onChange={(e) => setContactEmail(e.target.value)}

                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"

                    />

                  </div>



                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Assistance Category */}

                    <div className="space-y-1.5">

                      <label htmlFor="contact-subject-category" className="font-bold text-slate-700 block">

                        {isBn ? "সহায়তার বিষয়" : "Subject / Assistance Category"}

                      </label>

                      <select

                        id="contact-subject-category"

                        value={contactSubject}

                        onChange={(e) => setContactSubject(e.target.value)}

                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"

                      >

                        <option value="Visa Processing Checklist">{isBn ? "ভিসা প্রসেসিং চেকলিস্ট" : "Visa Processing Checklist"}</option>

                        <option value="Cheap Flight Package comparison">{isBn ? "সাশ্রয়ী ফ্লাইট টিকেট তুলনা" : "Cheap Flight Package comparison"}</option>

                        <option value="Custom Group Itinerary planning">{isBn ? "ফ্যামিলি বা গ্রুপ ট্যুর প্ল্যানিং" : "Custom Group Itinerary planning"}</option>

                        <option value="Hotel Booking Assistance">{isBn ? "হোটেল বুকিং সহায়তা (BDT)" : "Hotel Booking Assistance"}</option>

                        <option value="Umrah & Makkah/Madinah Booking">{isBn ? "Umrah ভিসা ও Makkah/Madinah হোটেল" : "Umrah & Makkah/Madinah Booking"}</option>

                      </select>

                    </div>



                    {/* Target Destination */}

                    <div className="space-y-1.5">

                      <label htmlFor="contact-travel-destination" className="font-bold text-slate-700 block">

                        {isBn ? "ভ্রমণ গন্তব্য" : "Travel Destination"}

                      </label>

                      <select

                        id="contact-travel-destination"

                        value={contactDestination}

                        onChange={(e) => setContactDestination(e.target.value)}

                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"

                      >

                        <option value="Saudi Arabia (Umrah / Hajj)">Saudi Arabia (Umrah / Hajj) 🇸🇦</option>

                        <option value="Nepal">Nepal 🇳🇵</option>

                        <option value="Thailand">Thailand 🇹🇭</option>

                        <option value="Malaysia">Malaysia 🇲🇾</option>

                        <option value="Singapore">Singapore 🇸🇬</option>

                        <option value="Maldives">Maldives 🇲🇻</option>

                        <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>

                        <option value="Other / Multi-Destination">Other / Multi-Destination</option>

                      </select>

                    </div>

                  </div>



                  {/* Message */}

                  <div className="space-y-1.5">

                    <label htmlFor="contact-message-body" className="font-bold text-slate-700 block">

                      {isBn ? "আপনার বার্তা / বিশেষ প্রয়োজন" : "Your Message / Specific Requirements"}

                    </label>

                    <textarea

                      id="contact-message-body"

                      rows={4}

                      placeholder={

                        isBn

                          ? "আপনার সম্ভাব্য ভ্রমণের তারিখ, যাত্রীর সংখ্যা বা বাজেট সম্পর্কে লিখুন যাতে আমরা সঠিক তথ্য দিয়ে সাহায্য করতে পারি..."

                          : "Please write down your budget constraints, travel dates, or special assistance needs so we can guide you effectively..."

                      }

                      value={contactMessage}

                      onChange={(e) => setContactMessage(e.target.value)}

                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all resize-none"

                    />

                  </div>



                  <button

                    type="submit"

                    disabled={contactLoading}

                    className="w-full bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-black text-xs uppercase py-3.5 rounded-xl shadow-md tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"

                  >

                    {contactLoading ? (

                      <>

                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>

                        <span>{isBn ? "পাঠানো হচ্ছে..." : "Processing Inquiry..."}</span>

                      </>

                    ) : (

                      <>

                        <span>{isBn ? "জিজ্ঞাসা সাবমিট করুন" : "Submit Travel Inquiry"}</span>

                        <span>→</span>

                      </>

                    )}

                  </button>

                </form>

              )}

            </div>



            {/* Right Side info card (Col 5) */}

            <div className="ural-panel lg:col-span-5 bg-slate-50 border border-border-subtle p-6 flex flex-col justify-between space-y-6">

              <div className="space-y-4">

                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest">SUPPORT COVENANT</span>

                <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">

                  {isBn ? "কেন সরাসরি URAL-এর সাথে কথা বলবেন?" : "Why Contact URAL Directly?"}

                </h2>



                <div className="space-y-3.5 text-xs text-text-secondary">

                  <div className="flex items-start gap-2.5">

                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>

                    <p>

                      {isBn ? (

                        <>

                          <b>১০০% ফ্রি পরামর্শ:</b> ভিসা ডকুমেন্ট চেক বা কম ভাড়ার ফ্লাইট খোঁজার জন্য আমরা কোনো কনসালটেশন ফি নিই না।

                        </>

                      ) : (

                        <>

                          <b>100% Free Consultation:</b> We never charge any fees to verify visa documents or search for cheap flights.

                        </>

                      )}

                    </p>

                  </div>

                  <div className="flex items-start gap-2.5">

                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>

                    <p>

                      {isBn ? (

                        <>

                          <b>ভেরিফায়েড পার্টনার নেটওয়ার্ক:</b> অনুমোদিত ভিসা ডেস্ক এবং বিশ্বস্ত ট্রাভেল অপারেটরের মাধ্যমে নিরাপদ বুকিং।

                        </>

                      ) : (

                        <>

                          <b>Authorized Referrals:</b> Connect to approved visa processing desks and Travelpayouts verified operators.

                        </>

                      )}

                    </p>

                  </div>

                  <div className="flex items-start gap-2.5">

                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>

                    <p>

                      {isBn ? (

                        <>

                          <b>দ্রুত কলব্যাক:</b> ফর্ম সাবমিট করার ১–২ ঘণ্টার মধ্যে আমাদের টিম সরাসরি কল বা WhatsApp-এ যোগাযোগ করে।

                        </>

                      ) : (

                        <>

                          <b>Direct Callback:</b> Bangladeshi tourists receive a personal callback within 1-2 hours of submission.

                        </>

                      )}

                    </p>

                  </div>

                </div>

              </div>



              <div className="space-y-3">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div className="bg-surface-soft p-4 rounded-xl border border-slate-300 text-center space-y-1">

                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">
                      {isBn ? "সরাসরি ফোন ও হোয়াটসঅ্যাপ" : "DIRECT DIAL DESK"}
                    </span>

                    <a
                      href="tel:+8801784385335"
                      className="text-sm font-serif font-black text-brand-navy hover:underline block"
                    >
                      +8801784385335
                    </a>

                    <span className="text-[10px] text-slate-500 block">
                      {isBn ? "২৪/৭ WhatsApp মেসেঞ্জারে সচল" : "Available 24/7 on WhatsApp"}
                    </span>

                  </div>

                  <div className="bg-surface-soft p-4 rounded-xl border border-slate-300 text-center space-y-1">

                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">
                      {isBn ? "অফিসিয়াল সাপোর্ট ইমেইল" : "OFFICIAL SUPPORT EMAIL"}
                    </span>

                    <a
                      href={`mailto:${URAL_SUPPORT_EMAIL}`}
                      className="text-sm font-serif font-black text-brand-navy hover:underline block break-all"
                    >
                      {URAL_SUPPORT_EMAIL}
                    </a>

                    <span className="text-[10px] text-slate-500 block">
                      {isBn ? "সাপোর্ট, ভিসা ও সাধারণ জিজ্ঞাসা" : "Support, visa & general inquiries"}
                    </span>

                  </div>

                </div>



                {/* Official Social Profiles on Contact Page */}

                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">

                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">

                    {isBn ? "অফিসিয়াল সোশ্যাল পেজ (@uraltravelbd)" : "OFFICIAL SOCIAL CHANNELS (@uraltravelbd)"}

                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">

                    <a

                      href={URAL_SOCIAL_LINKS.facebook}

                      target="_blank"

                      rel="me noopener noreferrer"

                      className="bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 rounded-lg py-2 px-2.5 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"

                    >

                      <span>Facebook</span>

                    </a>

                    <a

                      href={URAL_SOCIAL_LINKS.instagram}

                      target="_blank"

                      rel="me noopener noreferrer"

                      className="bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 rounded-lg py-2 px-2.5 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"

                    >

                      <span>Instagram</span>

                    </a>

                    <a

                      href={URAL_SOCIAL_LINKS.linkedin}

                      target="_blank"

                      rel="me noopener noreferrer"

                      className="bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 rounded-lg py-2 px-2.5 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"

                    >

                      <span>LinkedIn</span>

                    </a>

                    <a

                      href={URAL_SOCIAL_LINKS.tiktok}

                      target="_blank"

                      rel="me noopener noreferrer"

                      className="bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 rounded-lg py-2 px-2.5 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"

                    >

                      <span>TikTok</span>

                    </a>

                  </div>

                </div>

              </div>

            </div>



          </div>



          {/* Quick Contact Grid cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">



            {/* WhatsApp direct card */}

            <div className="ural-card bg-white border border-slate-200 hover:border-brand-emerald/40 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">

              <div className="p-3.5 bg-brand-emerald/10 text-brand-emerald rounded-xl shrink-0">

                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">

                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.35 1.489 5.513 0 10.002-4.486 10.005-9.999.001-2.671-1.037-5.182-2.924-7.071C17.192 1.685 14.685.648 12.012.648c-5.516 0-10.01 4.488-10.014 10.002-.001 1.902.483 3.654 1.401 5.247l-.952 3.479 3.599-.944z" />

                </svg>

              </div>

              <div className="space-y-2 flex-1">

                <span className="text-[10px] font-mono font-bold text-brand-emerald block uppercase tracking-widest">WHATSAPP CHAT</span>

                <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">

                  {isBn ? "সরাসরি WhatsApp চ্যাট করুন" : "Start Direct Chat"}

                </h2>

                <p className="text-xs text-slate-500 leading-normal">

                  {isBn

                    ? "কাস্টম সাপোর্ট পাওয়ার সবচেয়ে দ্রুত মাধ্যম। ভিসা চেকলিস্ট, রিটার্ন এয়ার টিকেট বা হোটেল বুকিংয়ের জন্য মেসেজ দিন।"

                    : "The fastest way to get custom support. Ask visa questions, seek roundtrip ticket packages, or request customized hotel bookings."}

                </p>

                <a

                  href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="inline-flex items-center gap-2 bg-brand-emerald text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"

                >

                  {isBn ? "WhatsApp-এ মেসেজ দিন (+8801784385335)" : "Chat on WhatsApp (+8801784385335)"}

                </a>

              </div>

            </div>



            {/* Phone Direct call card */}

            <div className="ural-card bg-white border border-slate-200 hover:border-brand-navy/30 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">

              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">

                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />

                </svg>

              </div>

              <div className="space-y-2 flex-1">

                <span className="text-[10px] font-mono font-bold text-blue-600 block uppercase tracking-widest">TELEPHONE HOTLINE</span>

                <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">

                  {isBn ? "সরাসরি ফোনে কথা বলুন" : "Direct Mobile Support"}

                </h2>

                <p className="text-xs text-slate-500 leading-normal">

                  {isBn

                    ? "সরাসরি আমাদের ডেস্কের সাথে কথা বলুন। ভিসা ডকুমেন্ট যাচাই, লাইভ ফ্লাইট ভাড়া এবং বিশ্বস্ত পরামর্শ পান।"

                    : "Talk directly to the director. Get immediate verification of requirements, active flight check comparisons, and reliable counsel."}

                </p>

                <a

                  href="tel:+8801784385335"

                  className="inline-flex items-center gap-2 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"

                >

                  {isBn ? "সরাসরি কল করুন (+8801784385335)" : "Call Directly (+8801784385335)"}

                </a>

              </div>

            </div>



          </div>



          {/* Contact & Booking Consultation FAQs */}

          <TravelIntelligence

            pageTitle={isBn ? "ট্রাভেল বুকিং সহায়তা ও সাপোর্ট ডেস্ক" : "Travel Booking Assistance & Desk Support"}

            quickAnswer={

              isBn

                ? "URAL বাংলাদেশি ভ্রমণকারীদের জন্য ট্যুর প্ল্যানিং, ভিসা ডকুমেন্ট রিভিউ এবং সরাসরি এজেন্সি বুকিং সহায়তা প্রদান করে (+8801784385335 WhatsApp ও হটলাইন)। ফ্লাইট টিকেট ও হোটেল বুকিংয়ের পেমেন্ট bKash, Nagad বা লোকাল ব্যাংক ট্রান্সফারের মাধ্যমে বাংলাদেশি টাকায় (BDT) সম্পন্ন করা যায়।"

                : "URAL connects Bangladeshi travelers with dedicated itinerary planning, visa checklist reviews, and direct agency booking services via WhatsApp (+8801784385335) and hotline. All ticket and hotel payments can be completed safely in BDT via domestic banking, bKash, or in person."

            }

            keyFacts={[

              { label: isBn ? "হেল্পলাইন" : "Helpline", value: "+8801784385335 (Direct / WhatsApp)" },

              { label: isBn ? "রেসপন্স সময়" : "Response Window", value: "15 to 30 Mins (Dhaka Time)" },

              { label: isBn ? "পেমেন্ট মাধ্যম" : "Payment Flexibility", value: "BDT (bKash / Nagad / Bank Transfer)" },

              { label: isBn ? "ভেরিফিকেশন" : "Desk Verification", value: "Verified IATA Agency Network" }

            ]}

            faqs={SERVICE_CONTACT_FAQS}

          />



        </div>

      );

}
