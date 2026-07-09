import React, { useState } from "react";
import { HelpCircle, Info, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface KeyFact {
  label: string;
  value: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface TravelIntelligenceProps {
  pageTitle: string;
  quickAnswer: string;
  keyFacts: KeyFact[];
  faqs: FAQItem[];
  schemaMarkup?: { type: string; description: string; code: string };
  metaDescription?: string;
}

export function TravelIntelligence({
  pageTitle,
  quickAnswer,
  keyFacts,
  faqs,
}: TravelIntelligenceProps) {
  // State to track which FAQ index is open (accordion style)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div id="travel-intelligence-panel" className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-8 my-8">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2.5 text-[#102A43] mb-1">
          <div className="p-1.5 bg-[#F6B73C]/10 rounded-lg text-[#F6B73C]">
            <Info size={18} />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900">Essential Travel Insights</h2>
        </div>
        <p className="text-sm text-slate-500">
          Quick guides, key metrics, and frequently asked questions for travelers from Bangladesh.
        </p>
      </div>

      {/* Quick Answer / AI Summary Highlight Block */}
      {quickAnswer && (
        <div className="bg-[#F6B73C]/5 border border-[#F6B73C]/20 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6B73C]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-sm font-mono font-bold text-[#F6B73C] bg-[#F6B73C]/10 px-2.5 py-1 rounded">
              SUMMARY
            </span>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#102A43] uppercase">
                Travel Summary & Key Takeaways
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed font-sans">
                {quickAnswer}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Facts Grid */}
      {keyFacts && keyFacts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-[#102A43] flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#F6B73C]" />
            Key Facts & Travel Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {keyFacts.map((fact, index) => (
              <div 
                key={index} 
                className="bg-slate-50/60 border border-slate-100 hover:border-slate-200/80 p-4 rounded-xl shadow-sm transition-all duration-200"
              >
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase block mb-1">
                  {fact.label}
                </span>
                <span className="font-sans font-bold text-slate-800 text-sm">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs Accordion */}
      {faqs && faqs.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-serif text-base font-bold text-[#102A43] flex items-center gap-2">
            <HelpCircle size={16} className="text-[#F6B73C]" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-xl transition-all duration-200 ${
                    isOpen 
                      ? "border-slate-200 bg-slate-50/30" 
                      : "border-slate-100 hover:border-slate-200/60 bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left px-4 py-3.5"
                  >
                    <span className="font-serif font-bold text-slate-800 text-sm pr-4">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
