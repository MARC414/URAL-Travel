



type RouteViewProps = { context: Record<string, any> };



export default function NotFoundRouteView({ context }: RouteViewProps) {

  const { isBn, navigateTo, section } = context;

  return (

        <div className="ural-route-stack animate-fade-in">



          {/* Hero Banner */}

          <div className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center space-y-4">

            <div className="font-mono text-6xl sm:text-7xl font-black text-[#F6B73C] opacity-20 select-none leading-none" aria-hidden="true">404</div>

            <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#F6B73C]">

              {isBn ? "পৃষ্ঠা পাওয়া যায়নি" : "Page Not Found"}

            </div>

            <h1 className="ural-page-title font-serif text-2xl sm:text-3xl font-black text-white leading-tight">

              {isBn

                ? "এই ভ্রমণ পৃষ্ঠাটি খুঁজে পাওয়া যায়নি"

                : "This Travel Page Doesn't Exist"}

            </h1>

            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">

              {isBn

                ? "এই ঠিকানাটি পরিবর্তিত হয়েছে, সরানো হয়েছে বা গাইডটি আর পাওয়া যাচ্ছে না। নিচের লিংকগুলো ব্যবহার করে আপনার গন্তব্য খুঁজুন।"

                : "The address may have changed, been moved, or the guide is no longer available. Use the links below to find your destination."}

            </p>

          </div>



          {/* Quick Navigation Cards */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {[

              { labelBn: "হোমপেজ", labelEn: "Homepage", path: "/", icon: "⌂" },

              { labelBn: "ব্লগ গাইড", labelEn: "Blog Guides", path: "/blog", icon: "✎" },

              { labelBn: "ফ্লাইট গাইড", labelEn: "Flight Guides", path: "/flights", icon: "✈" },

              { labelBn: "ভিসা চেকলিস্ট", labelEn: "Visa Checklists", path: "/visa", icon: "☑" },

            ].map((item) => (

              <button

                key={item.path}

                type="button"

                onClick={() => navigateTo(item.path)}

                className="ural-card bg-white border border-slate-200 p-4 text-center hover:border-[#F6B73C] hover:shadow-md transition-all group"

              >

                <div className="text-2xl mb-2 select-none" aria-hidden="true">{item.icon}</div>

                <div className="text-xs font-bold text-brand-navy group-hover:text-[#F6B73C] transition-colors">

                  {isBn ? item.labelBn : item.labelEn}

                </div>

              </button>

            ))}

          </div>



          {/* Popular Destination Quick Links */}

          <div className="ural-panel bg-slate-50 border border-border-subtle p-6">

            <h2 className="ural-section-title text-sm font-bold text-brand-navy mb-3">

              {isBn ? "জনপ্রিয় গন্তব্যে যান" : "Jump to a Popular Destination"}

            </h2>

            <div className="flex flex-wrap gap-2">

              {[

                { label: isBn ? "নেপাল গাইড" : "Nepal Guide", path: "/destinations/nepal-guide" },

                { label: isBn ? "থাইল্যান্ড গাইড" : "Thailand Guide", path: "/destinations/thailand-guide" },

                { label: isBn ? "মালয়েশিয়া গাইড" : "Malaysia Guide", path: "/destinations/malaysia-guide" },

                { label: isBn ? "দুবাই গাইড" : "Dubai Guide", path: "/destinations/dubai-guide" },

                { label: isBn ? "ওমরাহ হাব" : "Umrah Hub", path: "/umrah" },

                { label: isBn ? "সব গাইড দেখুন" : "All Guides", path: "/blog" },

              ].map((link) => (

                <button

                  key={link.path}

                  type="button"

                  onClick={() => navigateTo(link.path)}

                  className="text-xs font-semibold text-brand-navy bg-white border border-slate-300 rounded-full px-3 py-1.5 hover:border-[#F6B73C] hover:text-[#F6B73C] transition-colors"

                >

                  {link.label}

                </button>

              ))}

            </div>

          </div>



          {/* Contact CTA */}

          <div className="bg-brand-navy rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <div>

              <p className="text-white text-sm font-bold">

                {isBn ? "আপনি যা খুঁজছিলেন খুঁজে পাননি?" : "Can't find what you were looking for?"}

              </p>

              <p className="text-slate-400 text-xs mt-0.5">

                {isBn ? "আমাদের WhatsApp-এ মেসেজ করুন — আমরা সাহায্য করব।" : "Message us on WhatsApp — we'll point you in the right direction."}

              </p>

            </div>

            <a

              href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20was%20looking%20for%20something%20on%20your%20site%20but%20got%20a%20404%20error"

              target="_blank"

              rel="noopener noreferrer"

              className="shrink-0 bg-[#F6B73C] hover:bg-[#e5a832] text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"

            >

              {isBn ? "WhatsApp-এ মেসেজ" : "Message on WhatsApp"}

            </a>

          </div>



        </div>

      );

}
