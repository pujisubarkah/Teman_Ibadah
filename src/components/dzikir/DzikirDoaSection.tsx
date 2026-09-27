"use client";

import React, { useState, useEffect } from "react";
import { 
  DZIKIR_PAGI, 
  DZIKIR_PETANG, 
  DZIKIR_SHALAT_FARDHU,
  DAILY_DOA_LIST, 
  ASMAUL_HUSNA,
  DzikirItem,
  DailyDoa
} from "@/lib/data/dzikir-doa";
import { 
  Sparkles, 
  Sun, 
  Moon, 
  BookHeart, 
  Search, 
  Check, 
  Copy, 
  CircleDot,
  BookOpen,
  ShieldCheck,
  User,
  Heart,
  RotateCcw,
  Compass,
  CheckCircle2,
  Share2,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import DigitalTasbih from "./DigitalTasbih";

const CATEGORIES = [
  "Semua",
  "⭐ Favorit",
  "Aktivitas Harian",
  "Makanan & Minuman",
  "Shalat & Wudhu",
  "Hajat & Emosi",
  "Perlindungan & Sakit",
  "Safar & Kendaraan",
  "Keluarga & Sosial",
  "Fenomena Alam"
] as const;

export default function DzikirDoaSection() {
  const [activeTab, setActiveTab] = useState<"pagi" | "petang" | "shalat" | "doa" | "asmaul" | "tasbih">("pagi");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchDoa, setSearchDoa] = useState("");
  const [searchAsmaul, setSearchAsmaul] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // State for Dzikir repetition counters: { [itemId]: count }
  const [dzikirCounts, setDzikirCounts] = useState<Record<string, number>>({});
  
  // State for Bookmarked Doa IDs
  const [bookmarkedDoa, setBookmarkedDoa] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedBookmarks = localStorage.getItem("teman_ibadah_fav_doa");
      if (savedBookmarks) {
        setBookmarkedDoa(JSON.parse(savedBookmarks));
      }
      const savedCounts = localStorage.getItem("teman_ibadah_dzikir_counts");
      if (savedCounts) {
        setDzikirCounts(JSON.parse(savedCounts));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedDoa((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("teman_ibadah_fav_doa", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleIncrementDzikir = (item: DzikirItem) => {
    const current = dzikirCounts[item.id] || 0;
    if (current < item.repeat) {
      const next = current + 1;
      const updated = { ...dzikirCounts, [item.id]: next };
      setDzikirCounts(updated);
      try {
        localStorage.setItem("teman_ibadah_dzikir_counts", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }

      // Haptic feedback
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        if (next === item.repeat) {
          navigator.vibrate([60, 40, 60]); // complete burst
        } else {
          navigator.vibrate(30);
        }
      }
    }
  };

  const handleResetSingleDzikir = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...dzikirCounts, [id]: 0 };
    setDzikirCounts(updated);
    try {
      localStorage.setItem("teman_ibadah_dzikir_counts", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetAllTab = (items: DzikirItem[]) => {
    const updated = { ...dzikirCounts };
    items.forEach((item) => {
      updated[item.id] = 0;
    });
    setDzikirCounts(updated);
    try {
      localStorage.setItem("teman_ibadah_dzikir_counts", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredDoa = DAILY_DOA_LIST.filter((d) => {
    // Category check
    if (selectedCategory === "⭐ Favorit") {
      if (!bookmarkedDoa.includes(d.id)) return false;
    } else if (selectedCategory !== "Semua" && d.category !== selectedCategory) {
      return false;
    }

    // Search query check
    if (!searchDoa) return true;
    const q = searchDoa.toLowerCase();
    return (
      d.title.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.translation.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q) ||
      d.narrator.toLowerCase().includes(q)
    );
  });

  const filteredAsmaul = ASMAUL_HUSNA.filter((a) => {
    if (!searchAsmaul) return true;
    const q = searchAsmaul.toLowerCase();
    return (
      a.latin.toLowerCase().includes(q) ||
      a.meaning.toLowerCase().includes(q) ||
      a.number.toString().includes(q)
    );
  });

  // Calculate completion percentage for current dzikir tab
  const getTabProgress = (items: DzikirItem[]) => {
    if (!items.length) return 0;
    const completedCount = items.filter(
      (item) => (dzikirCounts[item.id] || 0) >= item.repeat
    ).length;
    return Math.round((completedCount / items.length) * 100);
  };

  const currentDzikirList = 
    activeTab === "pagi" 
      ? DZIKIR_PAGI 
      : activeTab === "petang" 
      ? DZIKIR_PETANG 
      : activeTab === "shalat"
      ? DZIKIR_SHALAT_FARDHU
      : [];

  const tabProgress = getTabProgress(currentDzikirList);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-teal-700/50">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-teal-100 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Rujukan Shahih: Hisnul Muslim & Kutubus Sittah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dzikir Sunnah, Doa Harian & Asmaul Husna
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Dilengkapi <strong>teks Arab berharakat, transliterasi Latin, sanad hadits shahih/hasan, faedah amalan,</strong> serta <strong>tasbih interaktif per repetisi</strong>.
          </p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
        {[
          { id: "pagi", label: "Dzikir Pagi", icon: Sun },
          { id: "petang", label: "Dzikir Petang", icon: Moon },
          { id: "shalat", label: "Setelah Shalat", icon: Compass },
          { id: "doa", label: "Doa Sehari-hari", icon: BookHeart },
          { id: "asmaul", label: "99 Asmaul Husna", icon: Sparkles },
          { id: "tasbih", label: "Tasbih Digital", icon: CircleDot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 select-none",
                isActive
                  ? "bg-teal-800 text-white shadow-md shadow-teal-900/20"
                  : "bg-white text-slate-600 hover:bg-stone-100 border border-stone-200 hover:border-stone-300"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* PROGRESS BAR & CONTROLS FOR DZIKIR TABS (Pagi / Petang / Shalat) */}
      {["pagi", "petang", "shalat"].includes(activeTab) && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1 w-full sm:w-auto">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                {activeTab === "pagi" && "Waktu: Ba'da Shubuh hingga Terbit Matahari / Dhuha"}
                {activeTab === "petang" && "Waktu: Ba'da Ashar hingga Maghrib / Isya"}
                {activeTab === "shalat" && "Waktu: Setiap selesai shalat fardhu 5 waktu"}
              </span>
              <span className="text-teal-800 font-bold">
                {tabProgress}% Selesai
              </span>
            </div>
            {/* Progress line */}
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${tabProgress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => handleResetAllTab(currentDzikirList)}
            className="text-xs font-bold text-slate-500 hover:text-rose-600 bg-stone-50 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
            title="Reset semua hitungan dzikir pada tab ini"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Hitungan</span>
          </button>
        </div>
      )}

      {/* RENDER DZIKIR ITEMS (Pagi / Petang / Shalat) */}
      {["pagi", "petang", "shalat"].includes(activeTab) && (
        <div className="space-y-4">
          {currentDzikirList.map((item, index) => {
            const currentCount = dzikirCounts[item.id] || 0;
            const isCompleted = currentCount >= item.repeat;

            return (
              <div
                key={item.id}
                className={cn(
                  "bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 space-y-4 shadow-xs",
                  isCompleted
                    ? "border-emerald-300 bg-emerald-50/15"
                    : "border-stone-200/90 hover:border-teal-300"
                )}
              >
                {/* Header Card */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center text-xs font-bold border border-teal-200">
                      {index + 1}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-800">
                      {item.title}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Selesai
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(`${item.arabic}\n\n${item.latin}\n\n"${item.translation}"\n(Sumber: ${item.source} - ${item.narrator})`, item.id)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-stone-100 transition-colors"
                      title="Salin Teks Lengkap"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <p className="font-arabic text-xl sm:text-2xl text-right text-slate-800 leading-loose">
                  {item.arabic}
                </p>

                {/* Latin Transliteration */}
                <p className="text-xs sm:text-sm text-teal-900 font-medium italic">
                  {item.latin}
                </p>

                {/* Indonesian Translation */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
                  "{item.translation}"
                </p>

                {/* Knowledge Card: Sanad & Fadhilah */}
                <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-slate-700 font-medium">
                    <span className="inline-flex items-center gap-1 bg-white text-slate-800 px-2.5 py-0.5 rounded-md font-semibold border border-stone-200">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      <span>{item.source}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white text-slate-700 px-2 py-0.5 rounded-md border border-stone-200">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.narrator}</span>
                    </span>
                    <span className="bg-emerald-700 text-white px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {item.grade}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed pt-1">
                    <strong className="text-teal-900">✨ Keutamaan / Fadhilah:</strong> {item.fadhilah}
                  </p>
                </div>

                {/* Interactive Counter Tap Button */}
                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <div className="text-xs text-slate-500 font-medium">
                    Target: <strong className="text-slate-800">{item.repeat}x repetisi</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentCount > 0 && (
                      <button
                        onClick={(e) => handleResetSingleDzikir(item.id, e)}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-stone-100 transition-colors text-xs"
                        title="Reset hitungan item ini"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleIncrementDzikir(item)}
                      disabled={isCompleted}
                      className={cn(
                        "px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer select-none active:scale-95 shadow-xs",
                        isCompleted
                          ? "bg-emerald-600 text-white cursor-default"
                          : "bg-teal-700 hover:bg-teal-800 text-white"
                      )}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Tuntas ({currentCount}/{item.repeat})</span>
                        </>
                      ) : (
                        <>
                          <CircleDot className="w-4 h-4 animate-pulse" />
                          <span>Hitung: {currentCount} / {item.repeat}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: DOA SEHARI-HARI (APA DOANYA) */}
      {activeTab === "doa" && (
        <div className="space-y-5">
          {/* Search Box */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-xs space-y-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari situasi doa (e.g. 'hutang', 'sakit', 'tidur', 'marah', 'hujan', 'wudhu', 'Bukhari')..."
                value={searchDoa}
                onChange={(e) => setSearchDoa(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                      isSelected
                        ? "bg-teal-700 text-white shadow-xs"
                        : "bg-stone-100 text-slate-600 hover:bg-stone-200"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doa Cards Grid */}
          {filteredDoa.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <BookHeart className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">Tidak Ada Doa yang Cocok</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Coba gunakan kata kunci pencarian yang lain atau pilih kategori "Semua".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoa.map((doa) => {
                const isFav = mounted && bookmarkedDoa.includes(doa.id);

                return (
                  <div
                    key={doa.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4 flex flex-col justify-between hover:border-teal-300 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full font-bold border border-teal-200/60 inline-block mb-1">
                            {doa.category}
                          </span>
                          <h4 className="font-bold text-sm sm:text-base text-slate-800 leading-snug">
                            {doa.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleBookmark(doa.id)}
                            className={cn(
                              "p-2 rounded-xl transition-colors cursor-pointer",
                              isFav
                                ? "text-rose-600 bg-rose-50"
                                : "text-slate-400 hover:text-slate-700 hover:bg-stone-100"
                            )}
                            title={isFav ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                          >
                            <Heart className={cn("w-4 h-4", isFav && "fill-rose-500 text-rose-500")} />
                          </button>

                          <button
                            onClick={() => handleCopy(`${doa.title}\n\n${doa.arabic}\n\n${doa.latin}\n\n"${doa.translation}"\n(Sumber: ${doa.source} - ${doa.narrator})`, doa.id)}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-stone-100 transition-colors"
                            title="Salin Teks Doa Lengkap"
                          >
                            {copiedId === doa.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Arabic */}
                      <p className="font-arabic text-xl text-right text-slate-800 leading-loose pt-1">
                        {doa.arabic}
                      </p>

                      {/* Latin */}
                      <p className="text-xs text-teal-800 font-medium italic">
                        {doa.latin}
                      </p>

                      {/* Translation */}
                      <p className="text-xs text-slate-600 leading-relaxed bg-stone-50 p-3.5 rounded-2xl border border-stone-200/50">
                        "{doa.translation}"
                      </p>
                    </div>

                    {/* Knowledge Card */}
                    <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200 space-y-1.5 text-xs mt-2">
                      <div className="flex flex-wrap items-center gap-1.5 font-medium">
                        <span className="bg-stone-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold">
                          📚 {doa.source}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          {doa.grade}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                        <strong className="text-slate-700">Perawi:</strong> {doa.narrator} • <em className="text-teal-900">{doa.fadhilah}</em>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: 99 ASMAUL HUSNA */}
      {activeTab === "asmaul" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari Asmaul Husna (e.g. Ar-Rahman, Maha Pengasih, 1)..."
                value={searchAsmaul}
                onChange={(e) => setSearchAsmaul(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredAsmaul.map((item) => (
              <div
                key={item.number}
                className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs text-center space-y-2 hover:border-teal-400 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-800 inline-flex items-center justify-center text-[10px] font-bold border border-teal-200">
                  {item.number}
                </span>
                <p className="font-arabic text-2xl text-teal-950 py-1">
                  {item.arabic}
                </p>
                <h4 className="font-bold text-xs text-slate-800">{item.latin}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: DIGITAL TASBIH */}
      {activeTab === "tasbih" && <DigitalTasbih />}
    </div>
  );
}
