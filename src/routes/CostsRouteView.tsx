import React from "react";
import type { TripCostData } from "../types";
import { CostPlanningGuide, CostPlanningHub, costCountryLabel } from "../components/CostPlanningGuide";

type RouteViewProps = { context: Record<string, any> };

export default function CostsRouteView({ context }: RouteViewProps) {
  const { isBn, localizedCosts, parameterId, lang, TravelEssentials, TravelpayoutsEmbed,
    TravelpayoutsWidgetSkeleton, areTpScriptsReady, setAreTpScriptsReady, getCountryIata } = context;
  const costs = localizedCosts as TripCostData[];
  const activeCost = costs.find((cost) => cost.id === parameterId);
  const prefix = isBn ? "/bn" : "";
  if (!activeCost) return <CostPlanningHub costs={costs} isBn={isBn} />;

  return <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
    <nav aria-label={isBn ? "গন্তব্যের বাজেট গাইড" : "Destination budget guides"} className="space-y-2">
      <a href={`${prefix}/costs`} className="block px-3 py-2 text-sm font-bold text-brand-emerald underline underline-offset-4">{isBn ? "সব বাজেট গাইড" : "All budget guides"}</a>
      {costs.map((cost) => <a key={cost.id} href={`${prefix}/costs/${cost.id}`} aria-current={cost.id === activeCost.id ? "page" : undefined} className={`block min-h-11 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-emerald ${cost.id === activeCost.id ? "border-brand-navy bg-brand-navy text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{costCountryLabel(cost, isBn)}</a>)}
    </nav>
    <div className="min-w-0 space-y-8">
      <CostPlanningGuide cost={activeCost} isBn={isBn} />
      <section className="space-y-4 border-t border-slate-200 pt-6" aria-label={isBn ? "ফ্লাইট ও ট্রান্সফার সার্চ" : "Flight and transfer search"}>
        <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "ফ্লাইট ও ট্রান্সফার তুলনা করুন" : "Compare flights & transfers"}</h2>
        {areTpScriptsReady ? <React.Suspense fallback={<TravelpayoutsWidgetSkeleton variant="flights" isBn={isBn} onInteract={() => setAreTpScriptsReady(true)} />}><TravelpayoutsEmbed defaultDestination={getCountryIata(activeCost.country)} /></React.Suspense>
          : <TravelpayoutsWidgetSkeleton variant="flights" isBn={isBn} onInteract={() => setAreTpScriptsReady(true)} />}
        <React.Suspense fallback={null}><TravelEssentials country={activeCost.country} defaultTab="transfers" compactHeader lang={lang} /></React.Suspense>
      </section>
    </div>
  </div>;
}
