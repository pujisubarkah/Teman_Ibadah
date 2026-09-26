"use client";

import React, { useState } from "react";
import { Ayah, Surah } from "@/lib/types";
import { 
  Play, 
  Pause, 
  Bookmark, 
  Check, 
  Copy, 
  BookMarked, 
  Share2, 
  Volume2,
  Sparkles
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn, formatNumberArabic } from "@/lib/utils";

interface AyahCardProps {
  ayah: Ayah;
  surah: Surah;
  allAyahs: Ayah[];
  index: number;
  fontSize?: number;
  showTranslation?: boolean;
}

export default function AyahCard({
  ayah,
  surah,
  allAyahs,
  index,
  fontSize = 28,
  showTranslation = true,
}: AyahCardProps) {
  const { isPlaying, currentAyah, playAyah, togglePlay } = useAudio();
  const { 
    isAyahBookmarked, 
    toggleBookmark, 
    saveLastRead, 
    lastRead 
  } = useQuranStore();

  const [copied, setCopied] = useState(false);
  const [markedReadToast, setMarkedReadToast] = useState(false);

  const isCurrentPlaying = currentAyah?.number === ayah.number && isPlaying;
  const isSelectedForAudio = currentAyah?.number === ayah.number;
  const isBookmarked = isAyahBookmarked(surah.number, ayah.numberInSurah);
  const isLastRead = lastRead?.surahNumber === surah.number && lastRead?.ayahNumber === ayah.numberInSurah;

  const handlePlay = () => {
    if (isSelectedForAudio) {
      togglePlay();
    } else {
      playAyah(ayah, surah, allAyahs, index);
    }
  };

  const handleBookmark = () => {
    toggleBookmark({
      id: `surah-${surah.number}-ayah-${ayah.numberInSurah}`,
      surahNumber: surah.number,
      surahName: surah.englishName,
      surahArabic: surah.name,
      ayahNumberInSurah: ayah.numberInSurah,
      ayahGlobalNumber: ayah.number,
      textSnippet: ayah.translation || ayah.text.slice(0, 80),
      timestamp: Date.now(),
    });
  };

  const handleSetLastRead = () => {
    saveLastRead({
      surahNumber: surah.number,
      surahName: surah.englishName,
      surahArabic: surah.name,
      ayahNumber: ayah.numberInSurah,
      totalAyahs: surah.numberOfAyahs,
      timestamp: Date.now(),
    });
    setMarkedReadToast(true);
    setTimeout(() => setMarkedReadToast(false), 2000);
  };

  const handleCopy = () => {
    const content = `${ayah.text}\n\n"${ayah.translation || ""}"\n(QS. ${surah.englishName}: ${ayah.numberInSurah})`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={cn(
        "rounded-3xl p-5 sm:p-7 border transition-all duration-300 relative scroll-mt-28",
        isSelectedForAudio
          ? "bg-emerald-50/50 border-emerald-400 shadow-md ring-1 ring-emerald-400"
          : "bg-white border-stone-200/80 hover:border-stone-300 shadow-xs"
      )}
    >
      {/* Top action row */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-stone-100">
        {/* Ayah number badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200/70">
            {ayah.numberInSurah}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Juz {ayah.juz} • Halaman {ayah.page}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Play audio */}
          <button
            onClick={handlePlay}
            className={cn(
              "p-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer",
              isSelectedForAudio
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-stone-100 border border-stone-200"
            )}
            title={isCurrentPlaying ? "Jeda Audio" : "Putar Audio Ayat"}
          >
            {isCurrentPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Putar</span>
              </>
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmark}
            className={cn(
              "p-2.5 rounded-xl transition-colors cursor-pointer",
              isBookmarked
                ? "bg-amber-50 text-amber-600 border border-amber-200"
                : "text-slate-500 hover:bg-stone-100 border border-stone-200"
            )}
            title={isBookmarked ? "Hapus dari Bookmark" : "Simpan ke Bookmark"}
          >
            <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-amber-500")} />
          </button>

          {/* Mark as Last Read */}
          <button
            onClick={handleSetLastRead}
            className={cn(
              "p-2.5 rounded-xl transition-colors cursor-pointer",
              isLastRead
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "text-slate-500 hover:bg-stone-100 border border-stone-200"
            )}
            title={isLastRead ? "Sedang ditandai sebagai terakhir dibaca" : "Tandai sebagai Terakhir Dibaca"}
          >
            <BookMarked className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl text-slate-500 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
            title="Salin Ayat & Terjemahan"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Toast Feedback for Last Read */}
      {markedReadToast && (
        <div className="absolute top-3 right-4 bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200 flex items-center gap-1.5 z-10">
          <Check className="w-3.5 h-3.5" />
          <span>Ditandai sebagai bacaan terakhir</span>
        </div>
      )}

      {/* Arabic Ayah Text */}
      <div className="my-6">
        <p
          dir="rtl"
          className="font-arabic text-right text-slate-800 leading-loose tracking-wide select-text"
          style={{ fontSize: `${fontSize}px`, lineHeight: `${Math.round(fontSize * 2.2)}px` }}
        >
          {ayah.text}{" "}
          <span className="inline-flex items-center justify-center font-sans text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-sm border border-emerald-200/80 align-middle mr-2">
            {formatNumberArabic(ayah.numberInSurah)}
          </span>
        </p>
      </div>

      {/* Indonesian Translation */}
      {showTranslation && ayah.translation && (
        <div className="pt-4 border-t border-stone-100">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {ayah.translation}
          </p>
        </div>
      )}
    </div>
  );
}
