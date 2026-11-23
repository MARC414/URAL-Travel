import React, { useMemo } from "react";


import { CORE_PRIORITY_SEO_COPY } from "../utils/coreSeoCopy";
import { FLIGHT_ROUTES } from "../data/flightRoutes";

export default function BangladeshHubView() {
  const isBn = typeof window !== "undefined" && window.location.pathname.startsWith("/bn");

  const routesList = useMemo(() => {
    return Object.entries(FLIGHT_ROUTES)
      .map(([id, r]) => ({ id, ...r }))
      .filter(r => r.origin === "DAC");
  }, []);

  const seo = CORE_PRIORITY_SEO_COPY["/bangladesh"];
  const title = seo?.title || "Bangladesh Travel Hub";
  const desc = seo?.description || "";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8 mt-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{isBn ? "বাংলাদেশ ট্রাভেল হাব" : "Bangladesh Travel Hub"}</h1>
          <p className="text-xl text-gray-600">{desc}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{isBn ? "ফ্লাইট রুট" : "Flights from Dhaka"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routesList.map(route => (
              <a 
                key={route.id} 
                href={`/flights/${route.id}`}
                className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-lg">{route.id.split('-').join(' to ').toUpperCase()}</div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
