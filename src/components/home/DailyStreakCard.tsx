"use client";

import React from "react";
import { Flame, CheckCircle2, Circle, Sparkles, Trophy } from "lucide-react";
import { useQuranStore, DailyPrayerChecklist } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

const PRAYERS_LIST: { key: keyof Omit<DailyPrayerChecklist, "date">; label: string; time: string }[] = [
  { key: "fajr", label: "Subuh", time: "Fajar" },
  { key: "dhuhr", label: "Dzuhur", time: "Siang" },
  { key: "asr", label: "Ashar", time: "Sore" },
  { key: "maghrib", label: "Maghrib", time: "Petang" },
  { key: "isha", label: "Isya", time: "Malam" },
  { key: "dhuha", label: "Dhuha", time: "Pagi" },
  { key: "tahajjud", label: "Tahajjud", time: "Malam" },
];

export default function DailyStreakCard() {
  const { streak, prayerChecklist, togglePrayerStatus } = useQuranStore();

  const completedCount = [
    prayerChecklist.fajr,
    prayerChecklist.dhuhr,
    prayerChecklist.asr,
    prayerChecklist.maghrib,
    prayerChecklist.isha,
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-800">Streak Ibadah Harian</h3>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                {streak.current} Hari Aktif
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsistensi adalah amalan yang paling dicintai Allah SWT.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/60 self-start sm:self-auto">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Rekor Terbaik: <strong className="text-slate-800">{streak.best} Hari</strong></span>
        </div>
      </div>

      {/* Shalat Check-in Tracker Section */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Check-in Shalat Hari Ini ({completedCount}/5 Wajib)
          </span>
          <span className="text-xs font-semibold text-emerald-600">
            {progressPercent}% Terlaksana
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {PRAYERS_LIST.map((p) => {
            const isChecked = !!prayerChecklist[p.key];
            const isSunnah = p.key === "dhuha" || p.key === "tahajjud";

            return (
              <button
                key={p.key}
                onClick={() => togglePrayerStatus(p.key)}
                className={cn(
                  "p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 group relative cursor-pointer",
                  isChecked
                    ? "bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-xs"
                    : "bg-stone-50/70 border-stone-200/70 hover:bg-stone-100/80 text-slate-600"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{p.label}</span>
                  {isChecked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                  )}
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className={isChecked ? "text-emerald-700 font-medium" : "text-slate-400"}>
                    {p.time}
                  </span>
                  {isSunnah && (
                    <span className="text-[9px] bg-amber-100/80 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                      Sunnah
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
