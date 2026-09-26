"use client";

import React from "react";
import Link from "next/link";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { Bookmark, Trash2, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function BookmarkPage() {
  const { bookmarks, toggleBookmark, isLoaded } = useQuranStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
            <Bookmark className="w-3.5 h-3.5 fill-white" />
            <span>Ayat Tersimpan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Koleksi Bookmark Ayat Al-Quran
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Daftar ayat-ayat favorit yang Anda simpan untuk dibaca kembali atau ditadabburi.
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      {!isLoaded ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80">
          <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">
                      {b.surahName} : Ayat {b.ayahNumberInSurah}
                    </span>
                    <span className="font-arabic text-lg text-emerald-700">
                      {b.surahArabic}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(b)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus dari Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 bg-stone-50 p-4 rounded-2xl border border-stone-200/50 leading-relaxed italic">
                  "{b.textSnippet}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(b.timestamp).toLocaleDateString("id-ID")}</span>
                </span>

                <Link
                  href={`/quran/${b.surahNumber}#ayah-${b.ayahNumberInSurah}`}
                  className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Buka Ayat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-base">Belum Ada Bookmark</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Saat membaca Al-Quran, tekan ikon bookmark pada ayat yang ingin Anda simpan ke daftar ini.
          </p>
          <Link
            href="/quran"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors mt-2"
          >
            <span>Mulai Baca Al-Quran</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
