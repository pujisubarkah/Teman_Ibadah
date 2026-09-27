"use client";

import React from "react";
import Link from "next/link";
import { Surah } from "@/lib/types";
import { CheckCircle2, Circle, ArrowUpRight } from "lucide-react";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

interface SurahCardProps {
  surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
  const [mounted, setMounted] = React.useState(false);
  const { khatam, toggleSurahCompleted } = useQuranStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted = mounted && (khatam?.completedSurahs?.includes(surah.number) || false);

  return (
    <div className="group bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between relative overflow-hidden">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        {/* Number badge */}
        <div className="w-11 h-11 rounded-2xl bg-stone-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center font-bold text-sm border border-stone-200 group-hover:border-emerald-200 transition-colors shrink-0">
          {surah.number}
        </div>

        {/* Khatam check button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSurahCompleted(surah.number);
          }}
          className={cn(
            "p-2 rounded-xl transition-colors text-xs flex items-center gap-1.5",
            isCompleted
              ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
              : "text-slate-400 hover:text-slate-600 hover:bg-stone-100"
          )}
          title={isCompleted ? "Tandai belum selesai" : "Tandai sudah dibaca"}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Surah Details */}
      <Link href={`/quran/${surah.number}`} className="mt-4 block space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-800 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
              <span>{surah.englishName}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {surah.englishNameTranslation}
            </p>
          </div>

          <span className="font-arabic text-2xl text-emerald-800 group-hover:text-emerald-600 transition-colors">
            {surah.name}
          </span>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-[11px] text-slate-500">
          <span className="bg-stone-100 px-2 py-0.5 rounded-md font-medium">
            {surah.revelationType === "Meccan" ? "Makkiyyah" : "Madaniyyah"}
          </span>
          <span>•</span>
          <span>{surah.numberOfAyahs} Ayat</span>
        </div>
      </Link>
    </div>
  );
}
