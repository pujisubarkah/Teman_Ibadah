"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, Sparkles, BookOpen, Clock, Flame } from "lucide-react";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

const PRAYER_PORTIONS = [
  { id: "fajr", prayer: "Ba'da Subuh", pages: "4 Lembar (~1/5 Juz)", tip: "Waktu paling tenang untuk hafalan & tadabbur", icon: "🌅" },
  { id: "dhuhr", prayer: "Ba'da Dzuhur", pages: "4 Lembar (~1/5 Juz)", tip: "Menyegarkan pikiran di sela kesibukan siang", icon: "☀️" },
  { id: "asr", prayer: "Ba'da Ashar", pages: "4 Lembar (~1/5 Juz)", tip: "Menjelang senja sebelum aktivitas sore", icon: "🌇" },
  { id: "maghrib", prayer: "Ba'da Maghrib", pages: "4 Lembar (~1/5 Juz)", tip: "Waktu berkumpul & mengaji utama", icon: "🌙" },
  { id: "isha", prayer: "Ba'da Isya", pages: "4 Lembar (~1/5 Juz)", tip: "Menutup target 1 Juz penuh sebelum tidur", icon: "🌌" },
];

export default function DailyPrayerMicroChecklist() {
  const [completedPortions, setCompletedPortions] = useState<string[]>([]);

  const togglePortion = (id: string) => {
    setCompletedPortions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const completedCount = completedPortions.length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
              <span>Metode 5 Waktu Shalat (*One Day One Juz*)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {completedCount}/5 Selesai
              </span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Membagi target harian menjadi 5 sesi ringan setiap selesai shalat fardhu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{progressPercent}% Target Hari Ini</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {PRAYER_PORTIONS.map((p) => {
          const isDone = completedPortions.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => togglePortion(p.id)}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 group cursor-pointer",
                isDone
                  ? "bg-emerald-50/90 border-emerald-400 shadow-xs ring-1 ring-emerald-400"
                  : "bg-stone-50/80 border-stone-200/70 hover:bg-stone-100"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{p.icon}</span>
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-stone-300 group-hover:text-stone-400" />
                )}
              </div>

              <div>
                <h5 className="font-bold text-xs text-slate-800">{p.prayer}</h5>
                <p className="text-[11px] font-bold text-emerald-700 mt-0.5">{p.pages}</p>
                <p className="text-[10px] text-slate-400 leading-tight mt-1">{p.tip}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
