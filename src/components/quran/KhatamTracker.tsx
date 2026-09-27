"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Target, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  RefreshCw,
  Award
} from "lucide-react";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { Surah } from "@/lib/types";
import { cn } from "@/lib/utils";

import KhatamOnTrackCard from "@/components/khatam/KhatamOnTrackCard";
import DailyPrayerMicroChecklist from "@/components/khatam/DailyPrayerMicroChecklist";

interface KhatamTrackerProps {
  surahs: Surah[];
}

export default function KhatamTracker({ surahs }: KhatamTrackerProps) {
  const [mounted, setMounted] = useState(false);
  const { khatam, toggleSurahCompleted, updateKhatamTarget } = useQuranStore();
  const [selectedDays, setSelectedDays] = useState(30);
  const [filterMode, setFilterMode] = useState<"all" | "completed" | "uncompleted">("all");

  useEffect(() => {
    setMounted(true);
    if (khatam.targetDays) setSelectedDays(khatam.targetDays);
  }, [khatam.targetDays]);

  const completedCount = mounted ? khatam.completedSurahs.length : 0;
  const percentage = Math.round((completedCount / 114) * 100);

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleTargetChange = (days: number) => {
    setSelectedDays(days);
    updateKhatamTarget(days);
  };

  const filteredSurahs = surahs.filter((s) => {
    const isDone = khatam.completedSurahs.includes(s.number);
    if (filterMode === "completed") return isDone;
    if (filterMode === "uncompleted") return !isDone;
    return true;
  });

  const dailySurahTarget = (114 / selectedDays).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Target & Tracker Khatam Al-Quran</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Raih Khatam dengan Istiqamah
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
              Pantau progres membaca 114 Surah Al-Quran. Tandai surah yang telah selesai dibaca dan rayakan setiap pencapaian.
            </p>
          </div>

          {/* Target Selector */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 flex flex-col gap-2">
            <span className="text-xs font-semibold text-emerald-200">
              Target Waktu Khatam:
            </span>
            <div className="flex items-center gap-1.5">
              {[30, 60, 90, 120].map((days) => (
                <button
                  key={days}
                  onClick={() => handleTargetChange(days)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    selectedDays === days
                      ? "bg-amber-400 text-slate-900 shadow-md"
                      : "bg-white/15 text-white hover:bg-white/25"
                  )}
                >
                  {days} Hari
                </button>
              ))}
            </div>
            <span className="text-[11px] text-emerald-200/80 mt-1">
              Rata-rata <strong>{dailySurahTarget} surah/hari</strong> (1 Juz = ~20 halaman/hari)
            </span>
          </div>
        </div>

        {/* Progress Bar in Banner */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Progres Keseluruhan: {completedCount} dari 114 Surah</span>
            <span className="text-amber-300 font-bold text-sm">{percentage}% Selesai</span>
          </div>
          <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Smart Khatam On-Track Assistant & Recovery Widget */}
      <KhatamOnTrackCard allSurahs={surahs} />

      {/* 5 Daily Prayer Micro-Target Breakdown */}
      <DailyPrayerMicroChecklist />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">{completedCount}</h4>
            <p className="text-xs text-slate-400">Surah Selesai Dibaca</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">{114 - completedCount}</h4>
            <p className="text-xs text-slate-400">Surah Tersisa</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">
                {percentage === 100 ? "Alhamdulillah Khatam!" : `${percentage}% Tercapai`}
              </h4>
              <p className="text-xs text-slate-400">Rayakan Milestone</p>
            </div>
          </div>
          <button
            onClick={handleCelebrate}
            className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-bold transition-colors cursor-pointer"
          >
            🎉 Rayakan
          </button>
        </div>
      </div>

      {/* Filter Tabs & Surah Checklist Grid */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Checklist 114 Surah Al-Quran
            </h3>
            <p className="text-xs text-slate-400">
              Klik lingkaran centang untuk menandai surah yang sudah dibaca.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterMode("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                filterMode === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              )}
            >
              Semua (114)
            </button>
            <button
              onClick={() => setFilterMode("completed")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                filterMode === "completed"
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              )}
            >
              Selesai ({completedCount})
            </button>
            <button
              onClick={() => setFilterMode("uncompleted")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer",
                filterMode === "uncompleted"
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              )}
            >
              Belum ({114 - completedCount})
            </button>
          </div>
        </div>

        {/* 114 Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredSurahs.map((s) => {
            const isDone = khatam.completedSurahs.includes(s.number);
            return (
              <div
                key={s.number}
                className={cn(
                  "p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3",
                  isDone
                    ? "bg-emerald-50/60 border-emerald-300 text-emerald-950"
                    : "bg-stone-50 border-stone-200/70 hover:bg-stone-100 text-slate-700"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                      isDone ? "bg-emerald-600 text-white" : "bg-stone-200 text-slate-600"
                    )}
                  >
                    {s.number}
                  </div>
                  <Link
                    href={`/quran/${s.number}`}
                    className="font-bold text-xs hover:text-emerald-700 truncate"
                  >
                    {s.englishName}
                  </Link>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-arabic text-sm text-emerald-800">
                    {s.name}
                  </span>
                  <button
                    onClick={() => toggleSurahCompleted(s.number)}
                    className="p-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    title={isDone ? "Batalkan tanda" : "Tandai selesai"}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
