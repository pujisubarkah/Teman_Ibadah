"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_HADITHS } from "@/lib/api/hadith";
import { ScrollText, Copy, Check, Share2, ArrowRight } from "lucide-react";

export default function HadithOfTheDay() {
  const [copied, setCopied] = useState(false);
  // Pick today's hadith deterministically based on day of year
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const hadith = FEATURED_HADITHS[dayOfYear % FEATURED_HADITHS.length];

  const handleCopy = () => {
    const text = `"${hadith.id}"\n— (HR. ${hadith.book} No. ${hadith.number})\nDibagikan via QuranTrack`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs relative overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Hadits Pilihan Hari Ini
            </span>
            <h4 className="font-bold text-slate-800 text-sm">{hadith.title}</h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-white hover:bg-stone-100 text-slate-600 border border-stone-200 text-xs flex items-center gap-1.5 transition-colors"
            title="Salin Hadits"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? "Tersalin!" : "Salin"}</span>
          </button>
        </div>
      </div>

      {/* Hadith Content */}
      <div className="my-4 space-y-4">
        <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
          {hadith.arab}
        </p>
        <p className="text-sm text-slate-600 italic leading-relaxed bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/50">
          "{hadith.id}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-amber-200/60 text-xs">
        <span className="font-semibold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-lg">
          HR. {hadith.book} No. {hadith.number}
        </span>
        <Link
          href="/hadits"
          className="font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors"
        >
          <span>Jelajahi 9 Kitab Hadits</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
