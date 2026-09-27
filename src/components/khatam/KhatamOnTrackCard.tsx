"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Target, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Flame, 
  Bell, 
  RefreshCw,
  BookOpen,
  HelpCircle,
  Check
} from "lucide-react";
import { KhatamState, Surah } from "@/lib/types";
import { analyzeKhatamPace } from "@/lib/utils/khatamRecovery";
import { useQuranStore } from "@/lib/store/useQuranStore";
import KhatamReminderModal from "./KhatamReminderModal";
import { cn } from "@/lib/utils";

interface KhatamOnTrackCardProps {
  allSurahs: Surah[];
  compact?: boolean; // if true, suitable for Homepage Hero
}

export default function KhatamOnTrackCard({ allSurahs, compact = false }: KhatamOnTrackCardProps) {
  const { khatam, recalibrateKhatamTarget, resetKhatamStartDate } = useQuranStore();
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [recalibrateToast, setRecalibrateToast] = useState(false);

  const pace = analyzeKhatamPace(khatam, allSurahs);

  const handleApplyRecalibration = (days: number) => {
    recalibrateKhatamTarget(days);
    setRecalibrateToast(true);
    setTimeout(() => setRecalibrateToast(false), 3000);
  };

  const isBehind = pace.status === "slightly-behind" || pace.status === "far-behind";

  if (compact) {
    // Compact widget for Homepage
    return (
      <>
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm border border-amber-200/70 shrink-0">
                <span>{pace.percentage}%</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800">Target Khatam Qur'an</h4>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", pace.statusBg, pace.statusColor)}>
                    {pace.statusLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hari ke-{pace.daysElapsed} dari {pace.targetDays} hari • {pace.completedCount}/114 Surah
                </p>
              </div>
            </div>

            <button
              onClick={() => setReminderModalOpen(true)}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              title="Atur Pengingat Tilawah Harian"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Next Target Surah Box */}
          {pace.nextSurah && (
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/60 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  Target Bacaan Selanjutnya
                </span>
                <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                  Surah {pace.nextSurah.number}. {pace.nextSurah.englishName}
                </h5>
              </div>
              <Link
                href={`/quran/${pace.nextSurah.number}`}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs transition-colors"
              >
                <span>Buka</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Quick status message */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[11px] text-slate-500 truncate max-w-[240px]">
              {isBehind ? `⚡ ${pace.statusMessage}` : "✨ Ritme bacaan on-track!"}
            </span>
            <Link
              href="/khatam"
              className="font-bold text-emerald-600 hover:text-emerald-700 text-xs flex items-center gap-1 shrink-0"
            >
              <span>Buka Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <KhatamReminderModal
          isOpen={reminderModalOpen}
          onClose={() => setReminderModalOpen(false)}
        />
      </>
    );
  }

  // Full detailed widget for Khatam page
  return (
    <>
      <div className="space-y-6">
        {/* Main Smart Pace Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Smart On-Track Assistant
                </span>
                <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full border", pace.statusBg, pace.statusColor)}>
                  {pace.statusLabel}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                Pace & Target Khatam Al-Qur'an
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {pace.statusMessage}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setReminderModalOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4 text-amber-600" />
                <span>Atur Pengingat</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
              <span className="text-[11px] font-semibold text-slate-400">Hari Berjalan</span>
              <p className="text-xl font-bold text-slate-800 mt-1 font-mono">
                Hari ke-{pace.daysElapsed}
              </p>
              <span className="text-[10px] text-slate-400">dari {pace.targetDays} hari</span>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
              <span className="text-[11px] font-semibold text-slate-400">Target Ideal Hari Ini</span>
              <p className="text-xl font-bold text-emerald-700 mt-1 font-mono">
                {pace.idealSurahsByNow} Surah
              </p>
              <span className="text-[10px] text-slate-400">Terselesaikan: {pace.completedCount}</span>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
              <span className="text-[11px] font-semibold text-slate-400">Kecepatan Sisa</span>
              <p className="text-xl font-bold text-slate-800 mt-1 font-mono">
                ~{pace.dailyPaceRemaining}
              </p>
              <span className="text-[10px] text-slate-400">Surah / hari tersisa</span>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
              <span className="text-[11px] font-semibold text-slate-400">Sisa Hari Target</span>
              <p className="text-xl font-bold text-amber-600 mt-1 font-mono">
                {pace.daysRemaining} Hari
              </p>
              <span className="text-[10px] text-slate-400">{pace.remainingCount} Surah lagi</span>
            </div>
          </div>

          {/* Next Target Surah 1-Click Action */}
          {pace.nextSurah && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                  {pace.nextSurah.number}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
                    Target Bacaan Hari Ini:
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Surah {pace.nextSurah.englishName} ({pace.nextSurah.name})
                  </h4>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Lanjutkan tilawah Anda sekarang untuk menjaga ritme khatam
                  </p>
                </div>
              </div>

              <Link
                href={`/quran/${pace.nextSurah.number}`}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-105 active:scale-95 shrink-0"
              >
                <span>Buka Surah Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Toast Notification when recalibrated */}
          {recalibrateToast && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold p-3.5 rounded-2xl flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Target waktu khatam berhasil disesuaikan secara otomatis! Tetap semangat & istiqamah ✨</span>
            </div>
          )}

          {/* Smart Catch-Up Recovery Box (Only shown if behind schedule) */}
          {isBehind && pace.recoveryPlans.length > 0 && (
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 border border-amber-200/80 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">
                    Opsi Pemulihan Ritme (*Smart Catch-Up Plan*)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pilih salah satu cara di bawah agar Anda bisa kembali on-track tanpa rasa terbebani:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {pace.recoveryPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-2xl p-4 border border-amber-200/70 shadow-xs flex flex-col justify-between gap-3 hover:border-amber-400 transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="font-bold text-xs text-slate-800">
                          {plan.title}
                        </h5>
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0", plan.badgeColor)}>
                          {plan.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {plan.recalibrateDays ? (
                      <button
                        onClick={() => handleApplyRecalibration(plan.recalibrateDays!)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        {plan.actionText}
                      </button>
                    ) : (
                      <Link
                        href={`/quran/${pace.nextSurah?.number || 1}`}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors shadow-xs"
                      >
                        {plan.actionText}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <KhatamReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
      />
    </>
  );
}
