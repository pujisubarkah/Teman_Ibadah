"use client";

import React, { useState } from "react";
import { 
  PRAYER_NIAT_LIST, 
  PRAYER_STEPS, 
  DOA_QUNUT, 
  DZIKIR_AFTER_PRAYER,
  IFTITAH_VERSIONS 
} from "@/lib/data/prayer-guide";
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Check, 
  Copy, 
  Layers, 
  HelpCircle,
  Volume2,
  ShieldCheck,
  User,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrayerGuideTabs() {
  const [activeTab, setActiveTab] = useState<"niat" | "tata-cara" | "qunut" | "dzikir">("niat");
  const [niatFilter, setNiatFilter] = useState<"all" | "fardhu" | "sunnah">("all");
  const [selectedIftitahId, setSelectedIftitahId] = useState<string>("allahumma-baid");
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

  const selectedIftitah = IFTITAH_VERSIONS.find((v) => v.id === selectedIftitahId) || IFTITAH_VERSIONS[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      {/* Header & Main Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tuntunan Berdasarkan Dalil & Hadits Shahih</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Panduan Bacaan & Tata Cara Shalat
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dilengkapi sumber hadits, status hukum rukun, dan keutamaan amalan
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

                {/* Knowledge Card */}
                <div className="bg-white rounded-2xl p-3 border border-stone-200 mt-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">📚 {item.source}</span>
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    <strong>Keutamaan:</strong> {item.fadhilah}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TATA CARA GERAKAN & RUKUN */}
      {activeTab === "tata-cara" && (
        <div className="space-y-6">
          <div className="space-y-4">
            {PRAYER_STEPS.map((step) => {
              const isIftitah = step.step === 2;

              return (
                <div
                  key={step.step}
                  className="bg-stone-50 rounded-3xl p-6 border border-stone-200/70 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-slate-800">{step.title}</h4>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        {step.grade}
                      </span>
                    </div>

                    {/* If Iftitah Step, show Version selector */}
                    {isIftitah && (
                      <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                        {IFTITAH_VERSIONS.map((v, idx) => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedIftitahId(v.id)}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
                              selectedIftitahId === v.id
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "bg-white text-slate-600 hover:bg-stone-200 border border-stone-200"
                            )}
                          >
                            Versi {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}

                    {!isIftitah && (
                      <button
                        onClick={() => handleCopy(`${step.arabic}\n\n${step.latin}\n\n"${step.translation}"`, `step-${step.step}`)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-200 transition-colors self-end sm:self-auto"
                        title="Salin Bacaan"
                      >
                        {copiedId === `step-${step.step}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {/* Render content: If Iftitah, render active version */}
                  {isIftitah ? (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
                        <span>{selectedIftitah.title}</span>
                        <button
                          onClick={() => handleCopy(`${selectedIftitah.arabic}\n\n${selectedIftitah.latin}\n\n"${selectedIftitah.translation}"\n(Sumber: ${selectedIftitah.source} - ${selectedIftitah.narrator})`, "iftitah-active")}
                          className="p-1 text-emerald-700 hover:text-emerald-900 rounded transition-colors"
                        >
                          {copiedId === "iftitah-active" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                        {selectedIftitah.arabic}
                      </p>

                      <p className="text-xs sm:text-sm text-emerald-700 font-medium italic">
                        {selectedIftitah.latin}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/50">
                        <strong>Artinya:</strong> "{selectedIftitah.translation}"
                      </p>

                      {/* Knowledge Details */}
                      <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-2xl space-y-1.5 text-xs text-emerald-950">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold">📚 Sumber: {selectedIftitah.source}</span>
                          <span>•</span>
                          <span>👤 Perawi: {selectedIftitah.narrator}</span>
                          <span className="bg-emerald-600 text-white px-1.5 py-0.2 rounded text-[10px] font-bold">
                            {selectedIftitah.grade}
                          </span>
                        </div>
                        <p className="text-emerald-900">
                          <strong>✨ Keutamaan:</strong> {selectedIftitah.fadhilah}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                        {step.arabic}
                      </p>

                      <p className="text-xs sm:text-sm text-emerald-700 font-medium italic">
                        {step.latin}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200/50">
                        <strong>Artinya:</strong> "{step.translation}"
                      </p>

                      {/* Movement Notes & Hadith Source */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="text-slate-600 bg-white border border-stone-200 p-3 rounded-2xl">
                          <strong className="text-slate-800">Panduan Gerakan:</strong> {step.notes}
                        </div>
                        <div className="text-emerald-900 bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl space-y-1">
                          <strong className="text-emerald-950">📚 Dalil:</strong> {step.source}
                          <p className="text-[11px] text-emerald-800 pt-0.5">
                            <strong>Fadhilah:</strong> {step.fadhilah}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
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
              onClick={() => handleCopy(`${DOA_QUNUT.arabic}\n\n${DOA_QUNUT.latin}\n\n"${DOA_QUNUT.translation}"\n(Sumber: ${DOA_QUNUT.source})`, "qunut")}
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

          {/* Knowledge Card */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs text-emerald-950">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">📚 Sumber: {DOA_QUNUT.source}</span>
              <span>•</span>
              <span>👤 Perawi: {DOA_QUNUT.narrator}</span>
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                {DOA_QUNUT.grade}
              </span>
            </div>
            <p className="text-emerald-900 leading-relaxed">
              <strong>✨ Keutamaan:</strong> {DOA_QUNUT.fadhilah}
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
                className="bg-stone-50 rounded-3xl p-5 border border-stone-200/70 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
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
                      onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"\n(Sumber: ${item.source})`, item.id)}
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

                {/* Knowledge Card */}
                <div className="bg-white rounded-2xl p-3 border border-stone-200 mt-2 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">📚 {item.source}</span>
                    <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded text-[10px] font-bold">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    <strong>Keutamaan:</strong> {item.fadhilah}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
