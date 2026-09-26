"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Compass, 
  Clock, 
  MapPin, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Flame,
  CheckCircle2
} from "lucide-react";
import { PrayerData } from "@/lib/types";
import { 
  getNextPrayer, 
  INDONESIAN_CITIES, 
  getPrayerTimesByCity,
  getCityTimezone 
} from "@/lib/api/prayer";
import { useQuranStore } from "@/lib/store/useQuranStore";

interface HeroBannerProps {
  initialPrayerData: PrayerData;
}

export default function HeroBanner({ initialPrayerData }: HeroBannerProps) {
  const [prayerData, setPrayerData] = useState<PrayerData>(initialPrayerData);
  const [selectedCity, setSelectedCity] = useState("Jakarta");
  const [loadingCity, setLoadingCity] = useState(false);
  const [nextPrayerInfo, setNextPrayerInfo] = useState(() =>
    getNextPrayer(initialPrayerData.timings, initialPrayerData.meta.timezone || "Asia/Jakarta")
  );
  const { lastRead, streak, khatam } = useQuranStore();

  // Client-side refresh on mount to sync browser time with selected city
  useEffect(() => {
    let isMounted = true;
    const tz = getCityTimezone(selectedCity);
    getPrayerTimesByCity(selectedCity).then((data) => {
      if (isMounted && data) {
        setPrayerData(data);
        setNextPrayerInfo(getNextPrayer(data.timings, data.meta.timezone || tz));
      }
    }).catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Real-time ticking countdown timer (every second)
  useEffect(() => {
    const timer = setInterval(() => {
      if (prayerData?.timings) {
        const tz = prayerData.meta?.timezone || getCityTimezone(selectedCity);
        setNextPrayerInfo(getNextPrayer(prayerData.timings, tz));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerData, selectedCity]);

  const handleCityChange = async (city: string) => {
    setSelectedCity(city);
    setLoadingCity(true);
    try {
      const data = await getPrayerTimesByCity(city);
      setPrayerData(data);
      const tz = data.meta?.timezone || getCityTimezone(city);
      setNextPrayerInfo(getNextPrayer(data.timings, tz));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCity(false);
    }
  };

  const completedSurahCount = khatam?.completedSurahs?.length || 0;
  const khatamPercent = Math.round((completedSurahCount / 114) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Next Prayer & Hijri Card (Lg: col-span-7) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-950/10 flex flex-col justify-between">
          {/* Subtle Islamic geometric pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header info */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-100 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {prayerData.date.hijri.day} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year} H
              </span>
            </div>

            {/* City Selector */}
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={loadingCity}
                className="bg-transparent border-none text-white text-xs font-medium focus:outline-hidden cursor-pointer pr-1"
              >
                {INDONESIAN_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="text-slate-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Next Prayer Countdown Hero */}
          <div className="relative z-10 my-auto py-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
                Menuju Waktu Shalat
              </span>
              <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold border border-amber-400/30">
                {nextPrayerInfo.name} • {nextPrayerInfo.time}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-mono text-white drop-shadow-xs">
                {nextPrayerInfo.timeRemaining}
              </h2>
            </div>
            <p className="text-xs text-emerald-200/80 mt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                Zona waktu: {prayerData.meta.timezone || "Asia/Jakarta"} • Kemenag RI
              </span>
            </p>
          </div>

          {/* Fast Prayer Times Bar */}
          <div className="relative z-10 pt-6 mt-4 border-t border-white/15 grid grid-cols-5 gap-2 text-center">
            {[
              { name: "Subuh", time: prayerData.timings.Fajr },
              { name: "Dzuhur", time: prayerData.timings.Dhuhr },
              { name: "Ashar", time: prayerData.timings.Asr },
              { name: "Maghrib", time: prayerData.timings.Maghrib },
              { name: "Isya", time: prayerData.timings.Isha },
            ].map((p) => {
              const isCurrentNext = p.name === nextPrayerInfo.name;
              return (
                <div
                  key={p.name}
                  className={`py-2 px-1 rounded-xl transition-all ${
                    isCurrentNext
                      ? "bg-amber-400 text-slate-950 font-bold shadow-lg scale-105"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <p className={`text-[11px] ${isCurrentNext ? "text-slate-900" : "text-emerald-100"}`}>
                    {p.name}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold tracking-tight mt-0.5">{p.time}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Last Read & Khatam Tracker (Lg: col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Last Read Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs flex-1 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">Terakhir Dibaca</h3>
                  <p className="text-xs text-slate-400">Lanjutkan tilawah Anda</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>Streak {streak.current} Hari</span>
              </div>
            </div>

            {lastRead ? (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 my-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">
                      {lastRead.surahName}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ayat {lastRead.ayahNumber} dari {lastRead.totalAyahs} ayat
                    </p>
                  </div>
                  <span className="font-arabic text-xl text-emerald-700">
                    {lastRead.surahArabic}
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((lastRead.ayahNumber / lastRead.totalAyahs) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 text-center my-2">
                <p className="text-xs text-slate-500">Belum ada riwayat bacaan.</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Mulai membaca Al-Fatihah sekarang!</p>
              </div>
            )}

            <Link
              href={lastRead ? `/quran/${lastRead.surahNumber}` : "/quran/1"}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-emerald-600/20"
            >
              <span>{lastRead ? "Lanjut Membaca" : "Buka Surah Al-Fatihah"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Khatam Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 border border-amber-200/60">
                <span className="text-sm">{khatamPercent}%</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800">Target Khatam Quran</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {completedSurahCount} dari 114 Surah terselesaikan
                </p>
              </div>
            </div>
            <Link
              href="/khatam"
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Atur Target</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
