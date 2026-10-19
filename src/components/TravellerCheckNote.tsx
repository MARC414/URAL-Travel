import React from "react";
import { getTravellerCheck } from "../utils/travellerChecks";

/** Shared by the hydrated article and both static locale renderers. Non-interrupting, no fake alert. */
export function TravellerCheckNote({ paragraph }: { paragraph: string }) {
  const check = getTravellerCheck(paragraph);
  if (!check) return null;
  return (
    <aside
      role="note"
      aria-label={check.title}
      data-traveller-check={check.key}
      className="my-6 rounded-2xl border border-amber-300 border-l-4 border-l-amber-600 bg-amber-50 p-5 text-amber-950"
    >
      <p className="mb-2 text-base font-bold leading-snug">{check.title}</p>
      <p className="text-base leading-relaxed">{check.text}</p>
    </aside>
  );
}
