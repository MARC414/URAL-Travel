import React, { useState } from "react";
import { Eye, ShieldCheck, Terminal, Award, FileSpreadsheet, Search } from "lucide-react";

interface AeoInspectorProps {
  pageTitle: string;
  quickAnswer: string;
  keyFacts: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  schemaMarkup: { type: string; description: string; code: string };
  metaDescription: string;
}

export function AeoInspector({
  pageTitle,
  quickAnswer,
  keyFacts,
  faqs,
  schemaMarkup,
  metaDescription
}: AeoInspectorProps) {
  const [activeTab, setActiveTab] = useState<"ai-overview" | "schemas" | "seo-tags">("ai-overview");

  return (
    <div id="aeo-inspector-panel" className="bg-[#102A43] text-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 my-8">
      {/* Panel Header */}
      <div className="bg-[#0c2033] px-5 py-4 border-b border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F6B73C]/20 rounded-lg text-[#F6B73C]">
            <Terminal size={18} />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-base tracking-wide text-white">URAL AI & SEO Optimization Engine</h3>
            <p className="text-xs text-slate-400 font-mono">Live Answer Engine Optimization (AEO) Auditor</p>
          </div>
        </div>
        <div className="flex bg-[#102A43] p-1 rounded-lg border border-slate-700 text-xs">
          <button
            id="tab-ai-overview"
            onClick={() => setActiveTab("ai-overview")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "ai-overview"
                ? "bg-[#F6B73C] text-[#102A43] shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Google AI Overview
          </button>
          <button
            id="tab-schemas"
            onClick={() => setActiveTab("schemas")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "schemas"
                ? "bg-[#F6B73C] text-[#102A43] shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            JSON-LD Schema
          </button>
          <button
            id="tab-seo-tags"
            onClick={() => setActiveTab("seo-tags")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "seo-tags"
                ? "bg-[#F6B73C] text-[#102A43] shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            SEO Metadata
          </button>
        </div>
      </div>

      {/* Panel Content Body */}
      <div className="p-6">
        {activeTab === "ai-overview" && (
          <div className="space-y-5">
            <div className="bg-slate-900/60 border border-[#F6B73C]/30 p-5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#F6B73C] animate-pulse"></div>
                <span className="text-xs font-mono font-medium tracking-wider text-[#F6B73C] uppercase">AI-Synthesized Quick Answer</span>
              </div>
              <h4 className="font-serif text-lg font-medium text-white mb-2">Google AI Overviews & Perplexity Target Preview:</h4>
              <p className="text-sm text-slate-200 leading-relaxed italic bg-[#0f172a] p-4 rounded border border-slate-700/50">
                "{quickAnswer}"
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <span>⚡ Length: {quickAnswer.split(" ").length} words (Perfect AEO size)</span>
                <span className="flex items-center gap-1"><Award size={12} className="text-[#F6B73C]" /> Optimized for Direct Extraction</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-900/40 border border-slate-700 p-4 rounded-lg">
                <span className="text-xs font-mono text-slate-400 block mb-2">AI Key Info Extraction Matrix:</span>
                <div className="space-y-2">
                  {keyFacts.slice(0, 3).map((fact, index) => (
                    <div key={index} className="flex justify-between items-center text-xs py-1 border-b border-slate-800">
                      <span className="text-slate-400">{fact.label}</span>
                      <span className="font-mono font-medium text-white bg-slate-800 px-2 py-0.5 rounded">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-700 p-4 rounded-lg">
                <span className="text-xs font-mono text-slate-400 block mb-2">FAQ Schema Mapping:</span>
                <div className="space-y-2 text-xs">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <div key={index} className="truncate">
                      <span className="text-[#F6B73C] font-semibold">Q:</span> <span className="text-slate-300 font-medium">{faq.question}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schemas" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono"><FileSpreadsheet size={14} /> Schema Type: <strong className="text-[#F6B73C]">{schemaMarkup.type}</strong></span>
              <span className="bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded font-semibold text-[10px]">Google Rich Snippet Ready</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              URAL wraps all intelligence data in JSON-LD structure dynamically. Review the valid schema code injected into head:
            </p>
            <div className="bg-slate-950 p-4 rounded-md border border-slate-800 font-mono text-xs overflow-x-auto text-green-400 max-h-[180px]">
              <pre>{schemaMarkup.code}</pre>
            </div>
          </div>
        )}

        {activeTab === "seo-tags" && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white mb-2">HTML Meta Head Headers:</h4>
            <div className="space-y-2 font-mono text-xs text-slate-300 bg-slate-900/80 p-4 rounded-lg border border-slate-800">
              <div>
                <span className="text-pink-400">&lt;title&gt;</span>
                <span className="text-white font-serif font-medium">{pageTitle} | URAL Travel Intelligence</span>
                <span className="text-pink-400">&lt;/title&gt;</span>
              </div>
              <div className="border-t border-slate-800 my-2 pt-2">
                <span className="text-yellow-400">&lt;meta</span> <span className="text-slate-400">name=</span><span className="text-green-300">"description"</span> <span className="text-slate-400">content=</span><span className="text-green-300">"{metaDescription}"</span><span className="text-yellow-400"> /&gt;</span>
              </div>
              <div>
                <span className="text-yellow-400">&lt;meta</span> <span className="text-slate-400">name=</span><span className="text-green-300">"keywords"</span> <span className="text-slate-400">content=</span><span className="text-green-300">"Bangladesh, travel cost, visa, Dhaka flights, hotels, {pageTitle.split(" ")[0]}"</span><span className="text-yellow-400"> /&gt;</span>
              </div>
            </div>

            {/* Core Web Vitals Panel */}
            <div className="bg-slate-900/40 p-4 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 block">Core Web Vitals Projection:</span>
                <span className="text-xs text-slate-200">Static caching system yields flawless mobile load speeds.</span>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-green-400 text-sm font-bold font-mono">1.1s</div>
                  <div className="text-[10px] text-slate-500 font-mono">LCP</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-bold font-mono">0.02</div>
                  <div className="text-[10px] text-slate-500 font-mono">CLS</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-sm font-bold font-mono">85ms</div>
                  <div className="text-[10px] text-slate-500 font-mono">INP</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Internal Link Graph Indicator */}
      <div className="bg-[#0c2033] px-5 py-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1 text-[#F6B73C]"><ShieldCheck size={14} strokeWidth={2.5} /> Ranking Interlink Loop Activated</span>
        <span className="font-mono">Route: Flights ↔ Visa ↔ Hotels</span>
      </div>
    </div>
  );
}
