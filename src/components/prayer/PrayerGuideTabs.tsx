"use client";

import React, { useState } from "react";
import { 
  PRAYER_NIAT_LIST, 
  PRAYER_STEPS, 
  DOA_QUNUT, 
  DZIKIR_AFTER_PRAYER 
} from "@/lib/data/prayer-guide";
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Check, 
  Copy, 
  Layers, 
  HelpCircle,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrayerGuideTabs() {
  const [activeTab, setActiveTab] = useState<"niat" | "tata-cara" | "qunut" | "dzikir">("niat");
  const [niatFilter, setNiatFilter] = useState<"all" | "fardhu" | "sunnah">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNiat = PRAYER_NIAT_LIST.filter((item) => {
    if (niatFilter === "all") return true;
    return item.category === niatFilter;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      {/* Header & Main Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Panduan Bacaan & Tata Cara Shalat
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Pelajari niat, rukun, gerakan, doa qunut, dan dzikir sesudah shalat
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "niat", label: "Niat Shalat" },
            { id: "tata-cara", label: "Tata Cara & Rukun" },
            { id: "qunut", label: "Doa Qunut" },
            { id: "dzikir", label: "Dzikir Ba'da Shalat" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeTab === tab.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: NIAT SHALAT */}
      {activeTab === "niat" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Daftar Niat Shalat ({filteredNiat.length})
            </span>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
              <button
                onClick={() => setNiatFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  niatFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                )}
              >
                Semua
              </button>
              <button
                onClick={() => setNiatFilter("fardhu")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  niatFilter === "fardhu" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                )}
              >
                Wajib 5 Waktu
              </button>
              <button
                onClick={() => setNiatFilter("sunnah")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  niatFilter === "sunnah" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                )}
              >
                Shalat Sunnah
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNiat.map((item) => (
              <div
                key={item.id}
                className="bg-stone-50 rounded-3xl p-5 border border-stone-200/70 hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border",
                          item.category === "fardhu"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        {item.category === "fardhu" ? "Fardhu" : "Sunnah"} • {item.rakaat} Rakaat
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"`, item.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-200 transition-colors"
                      title="Salin Niat"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Arabic */}
                  <p className="font-arabic text-xl text-right text-slate-800 leading-loose">
                    {item.arabic}
                  </p>

                  {/* Latin */}
                  <p className="text-xs text-emerald-700 font-medium italic">
                    {item.latin}
                  </p>

                  {/* Translation */}
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-stone-200/50">
                    "{item.translation}"
                  </p>
                </div>

                <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-stone-200/40">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TATA CARA GERAKAN & RUKUN */}
      {activeTab === "tata-cara" && (
        <div className="space-y-6">
          <div className="space-y-4">
            {PRAYER_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-stone-50 rounded-3xl p-6 border border-stone-200/70 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-slate-800 flex items-center gap-2">
                    <span>{step.title}</span>
                  </h4>
                  <button
                    onClick={() => handleCopy(`${step.arabic}\n\n${step.latin}\n\n"${step.translation}"`, `step-${step.step}`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-200 transition-colors"
                    title="Salin Bacaan"
                  >
                    {copiedId === `step-${step.step}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                  {step.arabic}
                </p>

                <p className="text-xs sm:text-sm text-emerald-700 font-medium italic">
                  {step.latin}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/50">
                  <strong>Artinya:</strong> "{step.translation}"
                </p>

                <div className="text-xs text-slate-500 bg-amber-50/70 border border-amber-200/50 p-3 rounded-2xl">
                  <strong>Panduan Gerakan:</strong> {step.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOA QUNUT */}
      {activeTab === "qunut" && (
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/70 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg text-slate-800">{DOA_QUNUT.title}</h4>
              <p className="text-xs text-slate-400">{DOA_QUNUT.description}</p>
            </div>
            <button
              onClick={() => handleCopy(`${DOA_QUNUT.arabic}\n\n${DOA_QUNUT.latin}\n\n"${DOA_QUNUT.translation}"`, "qunut")}
              className="p-2 bg-white rounded-xl text-slate-600 hover:bg-stone-200 border border-stone-200 transition-colors"
              title="Salin Doa Qunut"
            >
              {copiedId === "qunut" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="font-arabic text-2xl sm:text-3xl text-right text-slate-800 leading-loose">
            {DOA_QUNUT.arabic}
          </p>

          <p className="text-xs sm:text-sm text-emerald-800 font-medium italic leading-relaxed">
            {DOA_QUNUT.latin}
          </p>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/70 space-y-1">
            <h5 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
              Terjemahan:
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "{DOA_QUNUT.translation}"
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: DZIKIR BA'DA SHALAT */}
      {activeTab === "dzikir" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DZIKIR_AFTER_PRAYER.map((item) => (
              <div
                key={item.id}
                className="bg-stone-50 rounded-3xl p-5 border border-stone-200/70 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{item.title}</span>
                    {item.count && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {item.count}x
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"`, item.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="font-arabic text-xl text-right text-slate-800 leading-loose">
                  {item.arabic}
                </p>

                <p className="text-xs text-emerald-700 font-medium italic">
                  {item.latin}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-stone-200/50">
                  "{item.translation}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
