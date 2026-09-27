"use client";

import React, { useState } from "react";
import { X, Check, Volume2, Mic2, Search, Sparkles, UserCheck } from "lucide-react";
import { QURAN_RECITERS, getReciterById } from "@/lib/data/reciters";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

interface ReciterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReciterSelectorModal({ isOpen, onClose }: ReciterSelectorModalProps) {
  const { selectedReciter, setSelectedReciter } = useQuranStore();
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const currentReciter = getReciterById(selectedReciter);

  const filteredReciters = QURAN_RECITERS.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q) ||
      (r.arabicName && r.arabicName.includes(q))
    );
  });

  const handleSelect = (reciterId: string) => {
    setSelectedReciter(reciterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Mic2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <span>Pilih Qari / Suara Imam</span>
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Pilih lantunan murottal dari qari dan imam terkemuka dunia
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

        {/* Search & Active Reciter Banner */}
        <div className="p-4 bg-stone-50 border-b border-stone-200/80 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari imam atau negara (misal: Sudais, Misyari, Mesir)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  Qari Aktif Saat Ini
                </span>
                <p className="text-xs font-bold text-slate-800">{currentReciter.name}</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-semibold">
              Terpilih
            </span>
          </div>
        </div>

        {/* Reciters List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2 max-h-[50vh]">
          {filteredReciters.map((reciter) => {
            const isSelected = reciter.id === selectedReciter;
            return (
              <button
                key={reciter.id}
                onClick={() => handleSelect(reciter.id)}
                className={cn(
                  "w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 group cursor-pointer",
                  isSelected
                    ? "bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs"
                    : "bg-white border-stone-200 hover:bg-stone-50 hover:border-emerald-300"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                    )}
                  >
                    <Mic2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                        {reciter.name}
                      </h4>
                      {reciter.arabicName && (
                        <span className="font-arabic text-xs text-emerald-700 hidden sm:inline">
                          {reciter.arabicName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {reciter.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400 group-hover:text-emerald-600 font-medium hidden sm:inline">
                      Pilih
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>Audio berkualitas jernih (Official CDN Islamic Network).</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
