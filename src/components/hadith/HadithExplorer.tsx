"use client";

import React, { useState, useEffect } from "react";
import { 
  getHadithsByBook, 
  HADITH_BOOKS, 
  FEATURED_HADITHS 
} from "@/lib/api/hadith";
import { ARBAIN_HADITHS } from "@/lib/data/arbain";
import { HadithItem, HadithResponse } from "@/lib/types";
import { 
  ScrollText, 
  Search, 
  BookOpen, 
  Check, 
  Copy, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Bookmark,
  Share2,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HadithExplorer() {
  const [activeTab, setActiveTab] = useState<"9-imam" | "arbain">("9-imam");
  const [selectedBook, setSelectedBook] = useState("bukhari");
  const [page, setPage] = useState(1);
  const [hadithData, setHadithData] = useState<HadithResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<string[]>([]);

  // Load hadiths when book or page changes
  useEffect(() => {
    if (activeTab === "9-imam") {
      let isMounted = true;
      setLoading(true);
      getHadithsByBook(selectedBook, page, 15)
        .then((res) => {
          if (isMounted) {
            setHadithData(res);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          if (isMounted) setLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [selectedBook, page, activeTab]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedHadiths((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter 9 Imam Hadiths
  const displayedItems = hadithData?.items?.filter((h) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.id.toLowerCase().includes(q) ||
      h.number.toString().includes(q) ||
      h.arab.includes(q)
    );
  }) || [];

  // Filter Arbain
  const displayedArbain = ARBAIN_HADITHS.filter((h) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      h.title.toLowerCase().includes(q) ||
      h.translation.toLowerCase().includes(q) ||
      h.theme.toLowerCase().includes(q) ||
      h.number.toString().includes(q)
    );
  });

  const currentBookInfo = HADITH_BOOKS.find((b) => b.slug === selectedBook);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
            <ScrollText className="w-3.5 h-3.5" />
            <span>Kumpulan Hadits Shahih</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Kumpulan Hadits 9 Imam & Arbain An-Nawawiyah
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Jelajahi ribuan hadits shahih Rasulullah ﷺ dengan teks Arab, terjemahan bahasa Indonesia, dan pencarian kata kunci.
          </p>
        </div>
      </div>

      {/* Main Tabs (9 Kitab Imam vs Arbain) */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => {
            setActiveTab("9-imam");
            setPage(1);
          }}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "9-imam"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
          )}
        >
          <BookOpen className="w-4 h-4" />
          <span>9 Kitab Hadits Utama</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("arbain");
            setPage(1);
          }}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "arbain"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>40 Hadits Arbain Nawawi</span>
        </button>
      </div>

      {/* Controls: Book Selection & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-4">
        {/* If 9 Imam tab, show Book Selector */}
        {activeTab === "9-imam" && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {HADITH_BOOKS.map((b) => (
              <button
                key={b.slug}
                onClick={() => {
                  setSelectedBook(b.slug);
                  setPage(1);
                }}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                  selectedBook === b.slug
                    ? "bg-amber-500 text-white shadow-xs font-bold"
                    : "bg-stone-100 text-slate-600 hover:bg-stone-200"
                )}
              >
                {b.name} ({b.total})
              </button>
            ))}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === "9-imam"
                ? `Cari hadits dalam ${currentBookInfo?.name} (contoh: niat, shalat, ilmu, nomor hadits)...`
                : "Cari hadits Arbain (contoh: niat, rukun islam, takdir, akhlak)..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800"
          />
        </div>
      </div>

      {/* HADITH LIST CARDS */}
      {activeTab === "9-imam" ? (
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-3">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Memuat hadits {currentBookInfo?.name}...</p>
            </div>
          ) : displayedItems.length > 0 ? (
            <div className="space-y-4">
              {displayedItems.map((item) => {
                const hadithId = `${selectedBook}-${item.number}`;
                const isBookmarked = bookmarkedHadiths.includes(hadithId);

                return (
                  <div
                    key={item.number}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4 hover:border-amber-300 transition-colors"
                  >
                    {/* Top Row */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-200">
                          {item.number}
                        </span>
                        <span className="font-bold text-sm text-slate-800">
                          {currentBookInfo?.name} No. {item.number}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleBookmark(hadithId)}
                          className={cn(
                            "p-2 rounded-xl text-xs border transition-colors cursor-pointer",
                            isBookmarked
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : "text-slate-400 hover:bg-stone-100 border-stone-200"
                          )}
                          title="Simpan Hadits"
                        >
                          <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-amber-500")} />
                        </button>

                        <button
                          onClick={() =>
                            handleCopy(
                              `${item.arab}\n\n"${item.id}"\n(HR. ${currentBookInfo?.name} No. ${item.number})`,
                              hadithId
                            )
                          }
                          className="p-2 rounded-xl text-slate-400 hover:bg-stone-100 border border-stone-200 text-xs transition-colors cursor-pointer"
                          title="Salin Hadits"
                        >
                          {copiedId === hadithId ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                      {item.arab}
                    </p>

                    {/* Indonesian Translation */}
                    <p className="text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/50">
                      "{item.id}"
                    </p>
                  </div>
                );
              })}

              {/* Pagination */}
              <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-xs flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs text-slate-500 font-semibold">
                  Halaman {page} dari {hadithData?.pagination?.totalPages || 1}
                </span>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={hadithData?.pagination && page >= hadithData.pagination.totalPages}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80">
              <p className="text-xs text-slate-500">Tidak ada hadits yang cocok dengan kata kunci.</p>
            </div>
          )}
        </div>
      ) : (
        /* ARBAIN TAB */
        <div className="space-y-4">
          {displayedArbain.map((item) => {
            const hadithId = `arbain-${item.number}`;
            return (
              <div
                key={item.number}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold text-xs border border-purple-200">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                      <span className="text-[10px] text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded-md">
                        {item.theme} • {item.narrator}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `${item.arabic}\n\n"${item.translation}"\n(Hadits Arbain Ke-${item.number}: ${item.title} - ${item.narrator})`,
                        hadithId
                      )
                    }
                    className="p-2 rounded-xl text-slate-400 hover:bg-stone-100 border border-stone-200 text-xs transition-colors cursor-pointer"
                  >
                    {copiedId === hadithId ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                  {item.arabic}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/50">
                  "{item.translation}"
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
