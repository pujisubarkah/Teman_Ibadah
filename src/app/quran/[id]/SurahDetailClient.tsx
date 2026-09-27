"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Surah, Ayah } from "@/lib/types";
import AyahCard from "@/components/quran/AyahCard";
import TajweedLegendModal from "@/components/quran/TajweedLegendModal";
import ReciterSelectorModal from "@/components/audio/ReciterSelectorModal";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Type, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Palette,
  Mic2,
  HelpCircle,
  Volume2
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { getReciterById } from "@/lib/data/reciters";
import { cn } from "@/lib/utils";

interface SurahDetailClientProps {
  surah: Surah;
  ayahs: Ayah[];
  allSurahsList: Surah[];
}

export default function SurahDetailClient({
  surah,
  ayahs,
  allSurahsList,
}: SurahDetailClientProps) {
  const [mounted, setMounted] = useState(false);
  const [tajweedModalOpen, setTajweedModalOpen] = useState(false);
  const [reciterModalOpen, setReciterModalOpen] = useState(false);
  
  const { isPlaying, currentSurah, playAyah, togglePlay } = useAudio();
  const { 
    khatam, 
    toggleSurahCompleted, 
    arabicFontSize, 
    updateFontSize,
    showTranslation,
    toggleTranslationVisibility,
    isTajweedEnabled,
    toggleTajweed,
    selectedReciter
  } = useQuranStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && (khatam?.completedSurahs?.includes(surah.number) || false);
  const isSurahPlaying = currentSurah?.number === surah.number && isPlaying;
  const currentReciter = getReciterById(selectedReciter);

  const prevSurahNumber = surah.number > 1 ? surah.number - 1 : null;
  const nextSurahNumber = surah.number < 114 ? surah.number + 1 : null;

  const handlePlayFullSurah = () => {
    if (isSurahPlaying) {
      togglePlay();
    } else {
      playAyah(ayahs[0], surah, ayahs, 0);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Surah</span>
        </Link>

        {/* Quick Surah Prev/Next */}
        <div className="flex items-center gap-1.5">
          {prevSurahNumber && (
            <Link
              href={`/quran/${prevSurahNumber}`}
              className="p-2 bg-white rounded-xl text-slate-600 hover:text-emerald-600 border border-stone-200 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Surah Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Surah {prevSurahNumber}</span>
            </Link>
          )}
          {nextSurahNumber && (
            <Link
              href={`/quran/${nextSurahNumber}`}
              className="p-2 bg-white rounded-xl text-slate-600 hover:text-emerald-600 border border-stone-200 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Surah Selanjutnya"
            >
              <span className="hidden sm:inline">Surah {nextSurahNumber}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Surah Hero Header */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl text-center">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-100 border border-white/10">
            <span>Surah ke-{surah.number}</span>
            <span>•</span>
            <span>{surah.revelationType === "Meccan" ? "Makkiyyah" : "Madaniyyah"}</span>
            <span>•</span>
            <span>{surah.numberOfAyahs} Ayat</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {surah.englishName}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium mt-1">
              {surah.englishNameTranslation}
            </p>
          </div>

          <p className="font-arabic text-4xl sm:text-5xl text-amber-200 py-2">
            {surah.name}
          </p>

          {/* Action Buttons in Hero */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePlayFullSurah}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isSurahPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isSurahPlaying ? "Jeda Murottal" : "Putar Full Surah"}</span>
            </button>

            <button
              onClick={() => setReciterModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2 backdrop-blur-md transition-colors cursor-pointer"
              title="Ganti Pilihan Qari / Imam"
            >
              <Mic2 className="w-4 h-4 text-amber-300" />
              <span>Qari: <strong className="font-bold text-amber-200">{currentReciter.name.split(" ")[1] || currentReciter.name}</strong></span>
            </button>

            <button
              onClick={() => toggleSurahCompleted(surah.number)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-md transition-colors cursor-pointer",
                isCompleted
                  ? "bg-white text-emerald-800 shadow-md"
                  : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              <span>{isCompleted ? "Sudah Dibaca" : "Tandai Selesai"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating / Sticky Control Bar for Tajweed, Reciter, Font Size & Translation Toggle */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-16 md:top-20 z-30">
        {/* Left: Tajweed Toggle & Tajweed Legend */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tajweed Toggle Button */}
          <button
            onClick={toggleTajweed}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              mounted && isTajweedEnabled
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-slate-600"
            )}
            title="Nyalakan / Matikan Tajwid Berwarna"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{mounted && isTajweedEnabled ? "Tajwid: Aktif" : "Tajwid: Off"}</span>
          </button>

          {/* Tajweed Legend Button */}
          <button
            onClick={() => setTajweedModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Lihat Arti Warna & Hukum Tajwid"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Panduan Warna Tajwid</span>
          </button>

          {/* Reciter quick button */}
          <button
            onClick={() => setReciterModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Ganti Suara Imam / Qari"
          >
            <Mic2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="max-w-[120px] sm:max-w-[160px] truncate">
              {currentReciter.name}
            </span>
          </button>
        </div>

        {/* Right: Font Size & Translation Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Font size picker */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 px-1.5 hidden sm:inline">Ukuran:</span>
            {[24, 28, 32, 36].map((size) => (
              <button
                key={size}
                onClick={() => updateFontSize(size)}
                className={cn(
                  "w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  arabicFontSize === size
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-stone-200"
                )}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Translation visibility toggle */}
          <button
            onClick={toggleTranslationVisibility}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",
              showTranslation
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-stone-100 text-slate-600 hover:bg-stone-200"
            )}
          >
            {showTranslation ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{showTranslation ? "Terjemahan On" : "Terjemahan Off"}</span>
          </button>
        </div>
      </div>

      {/* Bismillah Banner (Except Surah At-Taubah #9 and Al-Fatihah #1 which already has Bismillah as verse 1) */}
      {surah.number !== 1 && surah.number !== 9 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 text-center shadow-xs">
          <p className="font-arabic text-3xl sm:text-4xl text-emerald-800 leading-relaxed">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
          </p>
        </div>
      )}

      {/* Ayahs List */}
      <div className="space-y-4">
        {ayahs.map((ayah, index) => (
          <AyahCard
            key={ayah.number}
            ayah={ayah}
            surah={surah}
            allAyahs={ayahs}
            index={index}
            fontSize={arabicFontSize}
            showTranslation={showTranslation}
          />
        ))}
      </div>

      {/* Bottom Surah Navigation */}
      <div className="pt-8 border-t border-stone-200 flex items-center justify-between">
        {prevSurahNumber ? (
          <Link
            href={`/quran/${prevSurahNumber}`}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-stone-100 text-slate-700 border border-stone-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Surah Sebelumnya</span>
          </Link>
        ) : <div />}

        {nextSurahNumber && (
          <Link
            href={`/quran/${nextSurahNumber}`}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
          >
            <span>Surah Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Modals */}
      <TajweedLegendModal
        isOpen={tajweedModalOpen}
        onClose={() => setTajweedModalOpen(false)}
      />

      <ReciterSelectorModal
        isOpen={reciterModalOpen}
        onClose={() => setReciterModalOpen(false)}
      />
    </div>
  );
}
