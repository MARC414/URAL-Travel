import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "../utils/localeProvider";
import { CORE_PRIORITY_SEO_COPY } from "../utils/coreSeoCopy";
import { FLIGHT_ROUTES } from "../data/flightRoutes";
import { VISAS } from "../data/visaIndex";
import TopNavBar from "./TopNavBar";
import PageFooter from "./PageFooter";

export default function BangladeshHubView() {
  const { isBn } = useLocale();

  const routesList = useMemo(() => {
    return Object.values(FLIGHT_ROUTES).filter(r => r.from === "DAC");
  }, []);

  const seo = CORE_PRIORITY_SEO_COPY["/bangladesh"];
  const title = seo?.title || "Bangladesh Travel Hub";
  const desc = seo?.description || "";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <TopNavBar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{isBn ? "বাংলাদেশ ট্রাভেল হাব" : "Bangladesh Travel Hub"}</h1>
          <p className="text-xl text-gray-600">{isBn ? desc : desc}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{isBn ? "ফ্লাইট রুট" : "Flights from Dhaka"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder for real links to existing BD content */}
            {routesList.map(route => (
              <Link 
                key={route.id} 
                to={`/flights/${route.id}`}
                className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-lg">{route.id.split('-').join(' to ').toUpperCase()}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <PageFooter />
    </div>
  );
}
