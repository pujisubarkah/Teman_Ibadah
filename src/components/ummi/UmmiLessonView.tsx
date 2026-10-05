"use client";

import React, { useState } from "react";
import { UmmiJilid, UmmiPage } from "@/lib/data/ummi-curriculum";
import { playArabicAudio } from "@/lib/utils/ummiAudio";
import UmmiQuizModal from "./UmmiQuizModal";
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Sparkles, 
  CheckCircle, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Play, 
  Square,
  BookOpen
} from "lucide-react";

interface UmmiLessonViewProps {
  jilid: UmmiJilid;
  initialPageNumber?: number;
  onBackToDashboard: () => void;
  isPageCompleted: (jilidId: number, pageNum: number) => boolean;
  onToggleCompletePage: (jilidId: number, pageNum: number) => void;
}

export default function UmmiLessonView({
  jilid,
  initialPageNumber = 1,
  onBackToDashboard,
  isPageCompleted,
  onToggleCompletePage,
}: UmmiLessonViewProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(
    Math.max(0, Math.min(initialPageNumber - 1, jilid.pages.length - 1))
  );
  const [showLatin, setShowLatin] = useState(true);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPlayingRow, setIsPlayingRow] = useState<number | null>(null);

  const currentPage: UmmiPage = jilid.pages[currentPageIndex];
  const isCompleted = isPageCompleted(jilid.id, currentPage.pageNumber);

  const handlePlayItem = async (id: string, arabic: string) => {
    setActivePlayingId(id);
    await playArabicAudio(arabic);
    setActivePlayingId(null);
  };

  const handlePlayRow = async (rowIndex: number) => {
    if (isPlayingRow === rowIndex) {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
      setIsPlayingRow(null);
      setActivePlayingId(null);
      return;
    }

    setIsPlayingRow(rowIndex);
    const row = currentPage.practiceRows[rowIndex];

    for (const item of row.items) {
      if (isPlayingRow !== null && isPlayingRow !== rowIndex) break;
      setActivePlayingId(item.id);
      await playArabicAudio(item.arabic);
      // Small pause between items
      await new Promise((r) => setTimeout(r, 200));
    }

    setActivePlayingId(null);
    setIsPlayingRow(null);
  };

  const handleNextPage = () => {
    if (currentPageIndex < jilid.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-700 bg-stone-100 hover:bg-stone-200/80 px-3 py-2 rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Daftar Jilid
        </button>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${jilid.bgLight}`}>
            {jilid.title}
          </span>
          <span className="text-sm font-medium text-slate-500">
            Halaman {currentPage.pageNumber} dari {jilid.pages.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLatin(!showLatin)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showLatin
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-stone-50 text-slate-500 border-stone-200 hover:bg-stone-100"
            }`}
            title="Tampilkan / Sembunyikan Teks Latin"
          >
            {showLatin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {showLatin ? "Latin Aktif" : "Latin Sembunyi"}
          </button>

          {currentPage.quiz && currentPage.quiz.length > 0 && (
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Kuis Latihan
            </button>
          )}
        </div>
      </div>

      {/* Main Ummi Book Board */}
      <div className="bg-white rounded-3xl border-2 border-emerald-600/30 shadow-xl overflow-hidden">
        {/* Header Header Board */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <BookOpen className="w-48 h-48" />
          </div>

          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <span>Metode Ummi</span>
              <span>•</span>
              <span>{jilid.title}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {currentPage.title}
            </h2>
          </div>
        </div>

        {/* Rule Box */}
        <div className="m-4 md:m-6 p-4 md:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <h3 className="text-sm font-bold tracking-wide uppercase text-amber-800">
              {currentPage.ruleTitle}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-amber-900/90 whitespace-pre-line">
            {currentPage.ruleDescription}
          </p>
          {currentPage.keyRuleTip && (
            <div className="pt-2 text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">Tips:</span>
              <span>{currentPage.keyRuleTip}</span>
            </div>
          )}
        </div>

        {/* Main Focus Big Cards */}
        {currentPage.mainFocus && currentPage.mainFocus.length > 0 && (
          <div className="px-4 md:px-6 pb-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-center">
                Pokok Huruf / Bahasan Utama
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {currentPage.mainFocus.map((focus, idx) => (
                  <button
                    key={idx}
                    onClick={() => playArabicAudio(focus.arabic)}
                    className="flex flex-col items-center justify-center p-4 min-w-[100px] md:min-w-[130px] rounded-2xl bg-white border-2 border-emerald-500/40 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group"
                  >
                    <span className="font-arabic text-4xl md:text-5xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {focus.arabic}
                    </span>
                    <span className="mt-1 text-sm font-bold text-emerald-700">
                      {focus.latin}
                    </span>
                    {focus.note && (
                      <span className="text-[11px] text-slate-400 font-medium text-center mt-0.5">
                        {focus.note}
                      </span>
                    )}
                    <span className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 group-hover:text-emerald-600">
                      <Volume2 className="w-3 h-3" />
                      Klik Suara
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Practice Rows Drill */}
        <div className="px-4 md:px-6 pb-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider pt-2 border-t border-stone-100">
            <span>Lembar Latihan Ketukan & Kelancaran</span>
            <span className="text-slate-400 font-normal">Klik kotak untuk mendengar lafal</span>
          </div>

          <div className="space-y-3">
            {currentPage.practiceRows.map((row, rIdx) => {
              const isCurrentRowPlaying = isPlayingRow === rIdx;

              return (
                <div
                  key={row.rowNumber}
                  className="rounded-2xl border border-stone-200 bg-stone-50/50 p-3 md:p-4 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">
                      Baris {row.rowNumber}
                    </span>
                    <button
                      onClick={() => handlePlayRow(rIdx)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                        isCurrentRowPlaying
                          ? "bg-rose-100 text-rose-700 hover:bg-rose-200"
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      }`}
                    >
                      {isCurrentRowPlaying ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          Putar Baris
                        </>
                      )}
                    </button>
                  </div>

                  {/* Grid of Arabic items */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {row.items.map((item) => {
                      const isItemPlaying = activePlayingId === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handlePlayItem(item.id, item.arabic)}
                          className={`p-3 md:p-4 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                            isItemPlaying
                              ? "bg-emerald-100 border-emerald-500 scale-102 shadow-md"
                              : "bg-white border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/30"
                          }`}
                        >
                          <span className="font-arabic text-2xl md:text-3xl font-bold text-slate-800">
                            {item.arabic}
                          </span>
                          {showLatin && (
                            <span className="text-xs font-semibold text-emerald-800 tracking-wider">
                              {item.latin}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination & Complete Button */}
        <div className="p-4 md:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <button
            disabled={currentPageIndex === 0}
            onClick={handlePrevPage}
            className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-200/80 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-sm font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Halaman Sebelumnya
          </button>

          <button
            onClick={() => onToggleCompletePage(jilid.id, currentPage.pageNumber)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
              isCompleted
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-white text-slate-700 border border-stone-300 hover:border-emerald-500 hover:text-emerald-700"
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${isCompleted ? "text-emerald-300" : "text-slate-400"}`} />
            {isCompleted ? "Sudah Dikuasai ✓" : "Tandai Tuntas"}
          </button>

          <button
            disabled={currentPageIndex === jilid.pages.length - 1}
            onClick={handleNextPage}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            Halaman Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      {currentPage.quiz && (
        <UmmiQuizModal
          questions={currentPage.quiz}
          pageTitle={`${jilid.title} • Halaman ${currentPage.pageNumber}`}
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onCompleted={(score) => {
            if (score >= Math.ceil(currentPage.quiz!.length / 2)) {
              onToggleCompletePage(jilid.id, currentPage.pageNumber);
            }
          }}
        />
      )}
    </div>
  );
}
