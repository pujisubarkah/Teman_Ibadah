"use client";

import React, { useState } from "react";
import { 
  DZIKIR_PAGI, 
  DZIKIR_PETANG, 
  DAILY_DOA_LIST, 
  ASMAUL_HUSNA 
} from "@/lib/data/dzikir-doa";
import { 
  Sparkles, 
  Sun, 
  Moon, 
  BookHeart, 
  Search, 
  Check, 
  Copy, 
  CircleDot,
  BookOpen,
  ShieldCheck,
  User,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import DigitalTasbih from "./DigitalTasbih";

export default function DzikirDoaSection() {
  const [activeTab, setActiveTab] = useState<"pagi" | "petang" | "doa" | "asmaul" | "tasbih">("pagi");
  const [searchDoa, setSearchDoa] = useState("");
  const [searchAsmaul, setSearchAsmaul] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDoa = DAILY_DOA_LIST.filter((d) => {
    if (!searchDoa) return true;
    const q = searchDoa.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.translation.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q)
    );
  });

  const filteredAsmaul = ASMAUL_HUSNA.filter((a) => {
    if (!searchAsmaul) return true;
    const q = searchAsmaul.toLowerCase();
    return (
      a.latin.toLowerCase().includes(q) ||
      a.meaning.toLowerCase().includes(q) ||
      a.number.toString().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Shahih & Dilengkapi Sumber Rujukan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Dzikir Pagi Petang, Doa Harian & Asmaul Husna
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Seluruh doa dan dzikir dilengkapi <strong>Kitab Hadits, Sanad Perawi Sahabat, Derajat Hadits, dan Fadhilah</strong> agar ibadah semakin berilmu dan terhindar dari taklid buta.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {[
          { id: "pagi", label: "Dzikir Pagi", icon: Sun },
          { id: "petang", label: "Dzikir Petang", icon: Moon },
          { id: "doa", label: "Doa Sehari-hari", icon: BookHeart },
          { id: "asmaul", label: "99 Asmaul Husna", icon: Sparkles },
          { id: "tasbih", label: "Tasbih Digital", icon: CircleDot },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-teal-700 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: DZIKIR PAGI */}
      {activeTab === "pagi" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dzikir Pagi (Al-Matsurat / Sunnah Nabawiyyah)
            </span>
            <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              Dibaca setelah Shubuh hingga Terbit Matahari
            </span>
          </div>

          <div className="space-y-4">
            {DZIKIR_PAGI.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4 hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{item.title}</span>
                    <span className="text-xs font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
                      Ulangi {item.repeat}x
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"\n(Sumber: ${item.source} - ${item.narrator})`, item.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Salin Teks Lengkap"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                  {item.arabic}
                </p>

                <p className="text-xs sm:text-sm text-teal-800 font-medium italic">
                  {item.latin}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/50">
                  "{item.translation}"
                </p>

                {/* Knowledge Card: Sanad & Fadhilah */}
                <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-200/60 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-emerald-950 font-medium">
                    <span className="inline-flex items-center gap-1 bg-emerald-100/90 text-emerald-900 px-2.5 py-0.5 rounded-md font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{item.source}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white text-slate-700 px-2 py-0.5 rounded-md border border-stone-200">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.narrator}</span>
                    </span>
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-emerald-900/90 leading-relaxed pt-1">
                    <strong>✨ Keutamaan / Fadhilah:</strong> {item.fadhilah}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DZIKIR PETANG */}
      {activeTab === "petang" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dzikir Petang (Sore Hari)
            </span>
            <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Dibaca setelah Ashar hingga Maghrib
            </span>
          </div>

          <div className="space-y-4">
            {DZIKIR_PETANG.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{item.title}</span>
                    <span className="text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                      Ulangi {item.repeat}x
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"\n(Sumber: ${item.source} - ${item.narrator})`, item.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                  {item.arabic}
                </p>

                <p className="text-xs sm:text-sm text-amber-900 font-medium italic">
                  {item.latin}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/50">
                  "{item.translation}"
                </p>

                {/* Knowledge Card */}
                <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/60 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-amber-950 font-medium">
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md font-semibold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{item.source}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white text-slate-700 px-2 py-0.5 rounded-md border border-stone-200">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.narrator}</span>
                    </span>
                    <span className="bg-amber-600 text-white px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-amber-950/90 leading-relaxed pt-1">
                    <strong>✨ Keutamaan / Fadhilah:</strong> {item.fadhilah}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DOA SEHARI-HARI */}
      {activeTab === "doa" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari doa & sumber (e.g. bangun tidur, makan, keluar rumah, orang tua, Bukhari)..."
                value={searchDoa}
                onChange={(e) => setSearchDoa(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoa.map((doa) => (
              <div
                key={doa.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{doa.title}</h4>
                      <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-semibold border border-teal-200/60">
                        {doa.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(`${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"\n(Sumber: ${doa.source} - ${doa.narrator})`, doa.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      {copiedId === doa.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="font-arabic text-xl text-right text-slate-800 leading-loose">
                    {doa.arabic}
                  </p>

                  <p className="text-xs text-teal-800 font-medium italic">
                    {doa.latin}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50">
                    "{doa.translation}"
                  </p>
                </div>

                {/* Knowledge Card */}
                <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 space-y-1 text-xs mt-2">
                  <div className="flex flex-wrap items-center gap-1.5 font-medium">
                    <span className="bg-stone-200/80 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                      📚 {doa.source}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {doa.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    <strong>Perawi:</strong> {doa.narrator} • <em>{doa.fadhilah}</em>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: 99 ASMAUL HUSNA */}
      {activeTab === "asmaul" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari Asmaul Husna (e.g. Ar-Rahman, Maha Pengasih, 1)..."
                value={searchAsmaul}
                onChange={(e) => setSearchAsmaul(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredAsmaul.map((item) => (
              <div
                key={item.number}
                className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs text-center space-y-2 hover:border-teal-300 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-stone-100 text-slate-600 inline-flex items-center justify-center text-[10px] font-bold">
                  {item.number}
                </span>
                <p className="font-arabic text-2xl text-emerald-800 py-1">
                  {item.arabic}
                </p>
                <h4 className="font-bold text-xs text-slate-800">{item.latin}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DIGITAL TASBIH */}
      {activeTab === "tasbih" && <DigitalTasbih />}
    </div>
  );
}
