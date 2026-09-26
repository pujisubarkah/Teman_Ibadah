"use client";

import React, { useState, useMemo } from "react";
import { Surah } from "@/lib/types";
import SurahCard from "@/components/quran/SurahCard";
import QuranFilter from "@/components/quran/QuranFilter";
import { BookOpen, Sparkles, Flame, CheckCircle2 } from "lucide-react";
import { useQuranStore } from "@/lib/store/useQuranStore";

interface QuranClientProps {
  initialSurahs: Surah[];
}

export default function QuranClient({ initialSurahs }: QuranClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "Meccan" | "Medinan">("all");
  const { khatam, lastRead } = useQuranStore();

  const filteredSurahs = useMemo(() => {
    return initialSurahs.filter((surah) => {
      // Type filter
      if (selectedType !== "all" && surah.revelationType !== selectedType) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = surah.englishName.toLowerCase().includes(query);
        const matchesTranslation = surah.englishNameTranslation.toLowerCase().includes(query);
        const matchesNumber = surah.number.toString() === query;
        const matchesArabic = surah.name.includes(query);
        return matchesName || matchesTranslation || matchesNumber || matchesArabic;
      }

      return true;
    });
  }, [initialSurahs, searchQuery, selectedType]);

  const completedCount = khatam?.completedSurahs?.length || 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Quran Header Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-100 border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Al-Quran Al-Karim</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Daftar 114 Surah Al-Quran
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg leading-relaxed">
              Membaca Al-Quran dengan teks Arab Uthmani, terjemahan Indonesia resmi, dan pemutar audio per ayat qari Misyari Rasyid Al-Afasy.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg">
              {completedCount}
            </div>
            <div>
              <span className="text-xs text-emerald-200">Khatam Progress:</span>
              <p className="text-sm font-bold text-white">
                {completedCount} / 114 Surah Selesai
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <QuranFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        totalSurahs={initialSurahs.length}
      />

      {/* Surahs Grid */}
      {filteredSurahs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-2">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700">Tidak ada surah yang cocok</h4>
          <p className="text-xs text-slate-400">
            Coba kata kunci lain atau ubah filter surah.
          </p>
        </div>
      )}
    </div>
  );
}
