



type RouteViewProps = { context: Record<string, any> };



export default function AboutRouteView({ context }: RouteViewProps) {

  const { isBn, navigateTo, section } = context;

  return (

        <div className="ural-route-stack animate-fade-in font-sans max-w-4xl mx-auto">



          {/* Page Header */}

          <div className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center space-y-4">

            <span className="inline-flex items-center gap-2 text-[#F6B73C] text-xs font-mono font-bold uppercase tracking-widest">

              {isBn ? "আমাদের সম্পর্কে" : "About URAL"}

            </span>

            <h1 className="ural-page-title text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">

              {isBn

                ? "ভ্রমণ ইন্টেলিজেন্স — প্রচলিত এজেন্সি নয়"

                : "Travel Intelligence. Not a Travel Agency."}

            </h1>

            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">

              {isBn

                ? "URAL হলো বাংলাদেশি ভ্রমণকারীদের জন্য একটি স্বাধীন, নিরপেক্ষ ট্রাভেল গাইড প্ল্যাটফর্ম — যেখানে কোনো বিক্রিত রিভিউ, গোপন পার্টনার চুক্তি বা লুকানো কমিশন নেই।"

                : "URAL is an independent, unbiased travel intelligence platform built for Bangladeshi and global travelers — with no sponsored reviews, hidden partner deals, or undisclosed commissions."}

            </p>

          </div>



          {/* Mission & Model */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="ural-panel bg-white border border-border-subtle p-6 space-y-3">

              <div className="w-10 h-10 rounded-xl bg-[#F6B73C]/15 flex items-center justify-center text-[#F6B73C] font-bold text-lg">✦</div>

              <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">

                {isBn ? "আমাদের লক্ষ্য" : "Our Mission"}

              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">

                {isBn

                  ? "বাংলাদেশি ভ্রমণকারীদের প্রথম সারির ভিসা তথ্য, BDT-ভিত্তিক বাজেট এবং সত্যিকারের হালাল-বান্ধব গন্তব্য রিভিউ দিয়ে সক্ষম করা — যাতে প্রতিটি আউটবাউন্ড ট্রিপ হয় উপভোগ্য, সাশ্রয়ী এবং সঠিকভাবে পরিকল্পিত।"

                  : "To empower Bangladeshi travelers with first-hand visa intelligence, BDT-native budgets, and genuinely halal-friendly destination reviews — so every outbound trip is enjoyable, affordable, and correctly planned."}

              </p>

            </div>

            <div className="ural-panel bg-white border border-border-subtle p-6 space-y-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-lg">✓</div>

              <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">

                {isBn ? "আমরা কী নই" : "What We Are Not"}

              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">

                {isBn

                  ? "URAL কোনো লাইসেন্সপ্রাপ্ত ট্রাভেল এজেন্সি নয়, টিকিট বিক্রেতা নয় এবং কোনো এয়ারলাইন বা হোটেলের অফিসিয়াল প্রতিনিধি নয়। আমরা একটি সম্পাদকীয় ইন্টেলিজেন্স সিস্টেম যা আপনাকে সিদ্ধান্ত নিতে সাহায্য করে।"

                  : "URAL is not a licensed travel agency, ticket seller, or official representative of any airline or hotel brand. We are an editorial intelligence system that helps you make informed decisions."}

              </p>

            </div>

          </div>



          {/* Founder Profile */}

          <div className="ural-panel bg-slate-50 border border-border-subtle p-6 sm:p-8 space-y-4">

            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">

              {isBn ? "প্রতিষ্ঠাতা ও প্রধান সম্পাদক" : "Founder & Editor-in-Chief"}

            </span>

            <div className="flex items-start gap-5">

              <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center text-[#F6B73C] font-bold text-2xl shrink-0 select-none" aria-hidden="true">

                FM

              </div>

              <div className="space-y-2">

                <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">Farhan Momen</h2>

                <p className="text-slate-500 text-xs font-medium">

                  {isBn ? "প্রতিষ্ঠাতা ও ট্রাভেল এডিটর" : "Founder & Travel Editor"}

                </p>

                <p className="text-slate-600 text-sm leading-relaxed">

                  {isBn

                    ? "ফারহান মোমেন বাংলাদেশ থেকে আউটবাউন্ড ভ্রমণের জটিলতা সরল করার জন্য URAL প্রতিষ্ঠা করেছেন। তাঁর লক্ষ্য হলো প্রতিটি বাংলাদেশি ভ্রমণকারীকে এমন তথ্য দেওয়া যা আগে শুধুমাত্র এজেন্সি ভেতরে থাকত।"

                    : "Farhan Momen founded URAL to demystify outbound travel from Bangladesh. His goal is to give every Bangladeshi traveler access to the same information that was previously locked inside agency back offices."}

                </p>

              </div>

            </div>

          </div>



          {/* Trust Pillars */}

          <div className="space-y-3">

            <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">

              {isBn ? "আমাদের প্রতিশ্রুতি" : "Our Editorial Commitments"}

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {[

                {

                  icon: "⚖️",

                  titleBn: "নিরপেক্ষ তুলনা",

                  titleEn: "Unbiased Comparisons",

                  descBn: "কোনো এয়ারলাইন বা হোটেল ব্র্যান্ড থেকে পেইড এনডোর্সমেন্ট নেই।",

                  descEn: "No paid endorsements from any airline or hotel brand.",

                },

                {

                  icon: "📋",

                  titleBn: "যাচাইকৃত তথ্য",

                  titleEn: "Verified Information",

                  descBn: "প্রতিটি গাইড সরকারি উৎস ও প্রথম হাতের অভিজ্ঞতা থেকে তৈরি।",

                  descEn: "Every guide built from official sources and first-hand experience.",

                },

                {

                  icon: "💰",

                  titleBn: "কোনো লুকানো ফি নেই",

                  titleEn: "No Hidden Fees",

                  descBn: "অ্যাফিলিয়েট লিংক সম্পূর্ণ প্রকাশিত এবং আপনার জন্য বিনামূল্যে।",

                  descEn: "Affiliate links are fully disclosed and cost you nothing extra.",

                },

                {

                  icon: "🌐",

                  titleBn: "বাংলা ও ইংরেজি",

                  titleEn: "Bengali & English",

                  descBn: "৭৯টি বাংলা ও ৮৬টি ইংরেজি পৃষ্ঠায় সম্পূর্ণ দ্বিভাষিক।",

                  descEn: "Fully bilingual across 79 Bengali and 86 English pages.",

                },

              ].map((item, i) => (

                <div key={i} className="ural-card bg-white border border-border-subtle p-4 flex gap-3">

                  <span className="text-2xl shrink-0 leading-none mt-0.5" aria-hidden="true">{item.icon}</span>

                  <div>

                    <h3 className="ural-card-title text-sm font-bold text-brand-navy">{isBn ? item.titleBn : item.titleEn}</h3>

                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{isBn ? item.descBn : item.descEn}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* Contact CTA */}

          <div className="bg-brand-navy rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <div>

              <h2 className="ural-section-title text-white font-serif text-lg font-bold">

                {isBn ? "যোগাযোগ করতে চান?" : "Want to Get in Touch?"}

              </h2>

              <p className="text-slate-400 text-xs mt-1">

                {isBn

                  ? "আমাদের WhatsApp বা হটলাইনে সরাসরি কথা বলুন — +8801784385335"

                  : "Reach us directly on WhatsApp or hotline — +8801784385335"}

              </p>

            </div>

            <div className="flex gap-2 shrink-0">

              <a

                href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20found%20you%20via%20the%20About%20page"

                target="_blank"

                rel="noopener noreferrer"

                className="bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"

              >

                {isBn ? "WhatsApp-এ মেসেজ করুন" : "Message on WhatsApp"}

              </a>

              <button

                type="button"

                onClick={() => navigateTo("/contact")}

                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors"

              >

                {isBn ? "ইনকোয়েরি ফর্ম" : "Inquiry Form"}

              </button>

            </div>

          </div>



        </div>

      );

}
