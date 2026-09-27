"use client";

import React, { useState } from "react";
import { X, Sparkles, BookOpen, Check, Info, Palette } from "lucide-react";
import { TAJWEED_RULES, TajweedRule } from "@/lib/utils/tajweed";
import { useQuranStore } from "@/lib/store/useQuranStore";

interface TajweedLegendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TajweedLegendModal({ isOpen, onClose }: TajweedLegendModalProps) {
  const { isTajweedEnabled, toggleTajweed } = useQuranStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (!isOpen) return null;

  const rulesList: TajweedRule[] = Object.values(TAJWEED_RULES);

  const categories = [
    { id: "all", label: "Semua Hukum" },
    { id: "mad", label: "Hukum Mad (Panjang)" },
    { id: "ghunnah", label: "Ghunnah & Ikhfa (Dengung)" },
    { id: "qalqalah", label: "Qalqalah (Pantulan)" },
    { id: "idgham", label: "Idgham & Iqlab (Peleburan)" },
    { id: "silent", label: "Huruf Tak Dibaca" },
  ];

  const filteredRules = rulesList.filter((r) => {
    if (activeCategory === "all") return true;
    return r.category === activeCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <span>Panduan Tajwid Berwarna</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase">
                  Standar Mushaf
                </span>
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Arti warna hukum bacaan tajwid pada setiap ayat Al-Qur'an
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tajweed Switch & Quick Info */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-slate-600">
              Status Tajwid Berwarna: <strong>{isTajweedEnabled ? "Aktif (Warna Hidup)" : "Nonaktif (Teks Polos)"}</strong>
            </span>
          </div>

          <button
            onClick={toggleTajweed}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              isTajweedEnabled
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-stone-200 text-slate-700 hover:bg-stone-300"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{isTajweedEnabled ? "Matikan Tajwid" : "Aktifkan Tajwid"}</span>
          </button>
        </div>

        {/* Filter Categories Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? "bg-emerald-100 text-emerald-800 font-bold"
                  : "bg-stone-100 hover:bg-stone-200 text-slate-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Rules Grid (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 divide-y divide-stone-100 max-h-[50vh]">
          {filteredRules.map((rule) => (
            <div key={rule.tag} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1 sm:max-w-md">
                <div className="flex items-center gap-2">
                  {/* Color swatch dot */}
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-2 ring-white"
                    style={{ backgroundColor: rule.color }}
                  />
                  <h4 className="font-bold text-sm text-slate-800">
                    {rule.name}
                  </h4>
                  <span className="font-arabic text-xs text-emerald-800 ml-1">
                    {rule.arabicName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {rule.description}
                </p>
                {rule.exampleLetters && (
                  <p className="text-[11px] text-slate-400 pt-0.5">
                    Contoh: <span className="font-arabic text-slate-700 font-semibold">{rule.exampleLetters}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${rule.bgBadge} ${rule.textBadge}`}>
                  {rule.harakat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>* Sentuh / hover huruf berwarna di teks ayat untuk melihat nama hukumnya.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
