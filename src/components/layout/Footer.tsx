import React from "react";
import Link from "next/link";
import { BookOpen, Heart, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-stone-200/80 mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-800">
                Quran<span className="text-emerald-600">Track</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Aplikasi pendamping ibadah harian Muslim modern. Membaca Al-Quran dengan audio per ayat, jadwal shalat akurat, panduan shalat, kumpulan hadits shahih 9 Imam, dzikir pagi petang, dan tracker khatam.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sumber data terpercaya (Al-Quran Cloud, AlAdhan, Hadith API)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Fitur Utama
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/quran" className="hover:text-emerald-600 transition-colors">
                  Baca Al-Quran
                </Link>
              </li>
              <li>
                <Link href="/shalat" className="hover:text-emerald-600 transition-colors">
                  Jadwal & Panduan Shalat
                </Link>
              </li>
              <li>
                <Link href="/hadits" className="hover:text-emerald-600 transition-colors">
                  Kumpulan Hadits 9 Imam
                </Link>
              </li>
              <li>
                <Link href="/khatam" className="hover:text-emerald-600 transition-colors">
                  Target & Khatam Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Extra Islamic Companion */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Amalan Harian
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/dzikir" className="hover:text-emerald-600 transition-colors">
                  Dzikir Pagi & Petang
                </Link>
              </li>
              <li>
                <Link href="/dzikir#tasbih" className="hover:text-emerald-600 transition-colors">
                  Tasbih Digital
                </Link>
              </li>
              <li>
                <Link href="/dzikir#asmaul-husna" className="hover:text-emerald-600 transition-colors">
                  99 Asmaul Husna
                </Link>
              </li>
              <li>
                <Link href="/bookmark" className="hover:text-emerald-600 transition-colors">
                  Ayat Tersimpan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} QuranTrack — Dibuat untuk memudahkan ibadah setiap hari.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Didesain dengan</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline" />
            <span>untuk Ummat</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
