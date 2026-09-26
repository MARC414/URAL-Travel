import React, { useState, useMemo } from "react";
import { ArrowRight, Check, Copy, Download, ExternalLink, Search } from "lucide-react";
import {
  generateSitemap,
  generateSitemapXml,
  SitemapEntry,
} from "../utils/sitemap";

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

const CATEGORIES: Array<"All" | SitemapEntry["category"]> = [
  "All",
  "Flight Routes",
  "Visa Checklists",
  "Hotel Guides",
  "Destination Plans",
  "Trip Budgets (BDT)",
  "Travel Blog & Guides",
  "Core Pages",
];

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | SitemapEntry["category"]>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"directory" | "xml">("directory");
  const [copiedXml, setCopiedXml] = useState(false);

  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://ural-travel.pages.dev";

  const allEntries = useMemo(() => generateSitemap("https://ural-travel.pages.dev"), []);
  const xmlString = useMemo(
    () => generateSitemapXml("https://ural-travel.pages.dev"),
    []
  );

  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      const matchesCategory =
        selectedCategory === "All" || entry.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.subtitle.toLowerCase().includes(q) ||
        entry.path.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [allEntries, selectedCategory, searchQuery]);

  const groupedEntries = useMemo<Record<string, SitemapEntry[]>>(() => {
    const groups: Record<string, SitemapEntry[]> = {};
    for (const item of filteredEntries) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredEntries]);

  const handleCopyXml = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(xmlString);
      setCopiedXml(true);
      setTimeout(() => setCopiedXml(false), 2500);
    }
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlString], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-10 border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#F6B73C] font-mono">
              <span>Search Engine Indexing Architecture</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{allEntries.length} Indexed URLs</span>
              <span aria-hidden="true">·</span>
              <span>Sitemaps.org v0.9 Protocol</span>
            </div>
            <h1
              className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: "balance" }}
            >
              Dynamic XML Sitemap & Complete Route Index
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every flight route, embassy visa checklist, neighborhood hotel guide, destination
              itinerary, BDT trip cost matrix, and banking article on URAL is dynamically indexed
              here for Google Search Console and fast internal crawling.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-slate-800/90 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode("directory")}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === "directory"
                    ? "bg-[#F6B73C] text-[#0F172A] font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                HTML Route Directory
              </button>
              <button
                type="button"
                onClick={() => setViewMode("xml")}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  viewMode === "xml"
                    ? "bg-[#F6B73C] text-[#0F172A] font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Live XML Source
              </button>
            </div>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <span>Open /sitemap.xml</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 border-t border-slate-800/80 text-left">
          {[
            {
              label: "Flight Routes",
              count: allEntries.filter((e) => e.category === "Flight Routes").length,
              note: "Dhaka (DAC) hubs",
            },
            {
              label: "Visa Checklists",
              count: allEntries.filter((e) => e.category === "Visa Checklists").length,
              note: "VOA & e-Visa guides",
            },
            {
              label: "Hotel Guides",
              count: allEntries.filter((e) => e.category === "Hotel Guides").length,
              note: "Halal & transit zones",
            },
            {
              label: "Destinations",
              count: allEntries.filter((e) => e.category === "Destination Plans").length,
              note: "Day-by-day plans",
            },
            {
              label: "BDT Cost Sheets",
              count: allEntries.filter((e) => e.category === "Trip Budgets (BDT)").length,
              note: "3-tier price matrices",
            },
            {
              label: "Travel Articles",
              count: allEntries.filter((e) => e.category === "Travel Blog & Guides").length,
              note: "Cards & budget hacks",
            },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                {stat.count}
              </div>
              <div className="text-xs font-medium text-white">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Interactive Category Filter Bar */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Filter Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by country, city, or URL..."
              className="w-full bg-white border border-slate-200 focus:border-[#102A43] rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {viewMode === "directory" ? (
        <div className="space-y-8">
          {(Object.entries(groupedEntries) as [string, SitemapEntry[]][]).map(([category, items], groupIdx) => (
            <section
              key={category}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                <h2 className="font-serif text-lg font-bold text-slate-900">
                  0{groupIdx + 1}. {category}
                </h2>
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  {items.length} {items.length === 1 ? "route" : "routes"}
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {items.map((entry) => (
                  <div
                    key={entry.path}
                    className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => onNavigate(entry.path)}
                        className="text-sm font-semibold text-slate-900 group-hover:text-[#102A43] hover:underline text-left block truncate cursor-pointer"
                      >
                        {entry.title}
                      </button>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono text-slate-600">{entry.path}</span>
                        <span aria-hidden="true">·</span>
                        <span>{entry.subtitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs text-slate-500 font-mono tabular-nums">
                      <span>Priority {entry.priority}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.changefreq}</span>
                      <button
                        type="button"
                        onClick={() => onNavigate(entry.path)}
                        className="px-3 py-1.5 bg-slate-100 group-hover:bg-[#102A43] text-slate-800 group-hover:text-white rounded-md font-sans font-medium transition-colors inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                      >
                        <span>Visit Page</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {filteredEntries.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No routes match "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500">
                Try searching for Nepal, Singapore, Maldives, Thailand, Malaysia, Dubai, or Visa.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Dynamically Generated XML Sitemap Output
              </h2>
              <p className="text-xs text-slate-500">
                Automatically compiled from live route definitions in URAL's travel database (
                <code className="font-mono text-slate-700">{baseUrl}/sitemap.xml</code>).
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyXml}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                {copiedXml ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedXml ? "Copied XML" : "Copy XML"}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadXml}
                className="px-4 py-2 text-xs font-semibold bg-[#102A43] hover:bg-slate-800 text-white rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Download size={13} />
                <span>Download sitemap.xml</span>
              </button>
            </div>
          </div>

          <pre className="bg-[#0F172A] text-slate-200 p-5 rounded-xl text-xs font-mono overflow-x-auto max-h-[540px] leading-relaxed select-all">
            {xmlString}
          </pre>
        </div>
      )}

      {/* Google Search Console Submission Guide for Site Owner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif text-base font-bold text-slate-900">
          How This Sitemap Accelerates Google Indexing for URAL
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">01. Static + Dynamic Parity</div>
            <p>
              Search engine bots fetching <code className="font-mono">/sitemap.xml</code> receive
              the raw XML feed immediately, while visitors and crawlers navigating{" "}
              <code className="font-mono">/sitemap</code> discover direct internal links to every
              country guide.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">02. Google Search Console Ready</div>
            <p>
              Submit <code className="font-mono">https://ural-travel.pages.dev/sitemap.xml</code>{" "}
              under the "Sitemaps" tab in Google Search Console so Google crawls your new Singapore,
              Maldives, and Dual-Currency Card guides right away.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">03. Zero Orphan Routes</div>
            <p>
              Every query-based route (<code className="font-mono">?route=</code>,{" "}
              <code className="font-mono">?city=</code>,{" "}
              <code className="font-mono">?country=</code>,{" "}
              <code className="font-mono">?slug=</code>) is cross-linked with Schema.org JSON-LD and
              canonical tags in <code className="font-mono">useSeoMeta</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
