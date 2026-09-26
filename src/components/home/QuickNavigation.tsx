import React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Compass, 
  ScrollText, 
  Sparkles, 
  Target, 
  Bookmark, 
  Volume2, 
  CircleDot
} from "lucide-react";

const FEATURES = [
  {
    title: "Al-Quran Reader",
    description: "114 Surah lengkap audio per ayat Al-Afasy, terjemahan Indonesia & latin.",
    href: "/quran",
    icon: BookOpen,
    badge: "114 Surah",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  },
  {
    title: "Jadwal & Panduan Shalat",
    description: "Jadwal waktu shalat akurat se-Indonesia, arah kiblat, niat, & rukun shalat.",
    href: "/shalat",
    icon: Compass,
    badge: "Waktu & Kiblat",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200/70",
  },
  {
    title: "Kumpulan Hadits 9 Imam",
    description: "Bukhari, Muslim, Abu Dawud, Tirmidzi, Arbain Nawawi & pencarian hadits.",
    href: "/hadits",
    icon: ScrollText,
    badge: "9 Kitab Shahih",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 text-amber-700 border-amber-200/70",
  },
  {
    title: "Dzikir & Doa Harian",
    description: "Dzikir pagi-petang (Al-Matsurat), doa harian sehari-hari & 99 Asmaul Husna.",
    href: "/dzikir",
    icon: Sparkles,
    badge: "Al-Matsurat",
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-teal-50 text-teal-700 border-teal-200/70",
  },
  {
    title: "Target Khatam Tracker",
    description: "Rencanakan khatam Quran 30 hari atau kustom dengan checklist progres.",
    href: "/khatam",
    icon: Target,
    badge: "Khatam 30 Hari",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-purple-50 text-purple-700 border-purple-200/70",
  },
  {
    title: "Tasbih Digital",
    description: "Penghitung dzikir digital interaktif dengan getaran, target 33/99 & reset.",
    href: "/dzikir#tasbih",
    icon: CircleDot,
    badge: "Interactive Counter",
    color: "from-emerald-600 to-green-700",
    bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  },
];

export default function QuickNavigation() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Menu Utama Ibadah</h3>
        <span className="text-xs text-slate-400">Pilih amalan harian</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.bgColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                <span>Buka Fitur</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
