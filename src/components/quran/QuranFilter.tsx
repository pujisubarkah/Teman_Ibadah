"use client";

import React from "react";
import { Search, Filter, Layers, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuranFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedType: "all" | "Meccan" | "Medinan";
  setSelectedType: (type: "all" | "Meccan" | "Medinan") => void;
  totalSurahs: number;
}

export default function QuranFilter({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  totalSurahs,
}: QuranFilterProps) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari surah (e.g. Al-Kahfi, Yasin, 18, Sapi Betina)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Revelation Type Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedType("all")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              selectedType === "all"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-slate-600"
            )}
          >
            Semua ({totalSurahs})
          </button>
          <button
            onClick={() => setSelectedType("Meccan")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              selectedType === "Meccan"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-slate-600"
            )}
          >
            Makkiyyah (86)
          </button>
          <button
            onClick={() => setSelectedType("Medinan")}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              selectedType === "Medinan"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-stone-100 hover:bg-stone-200 text-slate-600"
            )}
          >
            Madaniyyah (28)
          </button>
        </div>
      </div>
    </div>
  );
}
