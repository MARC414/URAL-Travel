import React from "react";
import type { Language } from "../translations";
import { getDepartureHub } from "../data/departureHubs";
import { DepartureHub } from "./DepartureHub";

export default function BangladeshHubView({ lang }: { lang: Language }) {
  const record = getDepartureHub("bangladesh");
  if (!record) throw new Error("Bangladesh departure hub record is missing");
  return <DepartureHub record={record} lang={lang} />;
}
