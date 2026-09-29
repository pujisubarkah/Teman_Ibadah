"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Moon,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Share2,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getRamadhanInfo, RamadhanInfo, RAMADHAN_PREP_TIPS } from "@/lib/utils/ramadhan";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RamadhanCountdownCard() {
  const [mounted, setMounted] = useState(false);
  const [ramadhanInfo, setRamadhanInfo] = useState<RamadhanInfo | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasAamiined, setHasAamiined] = useState(false);
  const [aamiinCount, setAamiinCount] = useState<number>(1);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    setMounted(true);
    const info = getRamadhanInfo(new Date());
    setRamadhanInfo(info);

    // Load saved Aamiin state from localStorage
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const savedDate = localStorage.getItem("ramadhan_aamiin_date");
      const savedCount = parseInt(localStorage.getItem("ramadhan_aamiin_count") || "1", 10);

      if (savedDate === todayStr) {
        setHasAamiined(true);
      }
      setAamiinCount(savedCount);
    } catch {
      // LocalStorage access fallback
    }

    const calculateTimeLeft = () => {
      if (!info) return;
      const target = info.status === "active" ? info.endDate : info.startDate;
      const difference = target.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Recalculate if time elapsed
        const updated = getRamadhanInfo(new Date());
        setRamadhanInfo(updated);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAamiin = () => {
    // Trigger festive gold and emerald confetti
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#F59E0B", "#10B981", "#FCD34D", "#059669", "#FFFFFF"],
    });

    const newCount = hasAamiined ? aamiinCount : aamiinCount + 1;
    setHasAamiined(true);
    setAamiinCount(newCount);

    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      localStorage.setItem("ramadhan_aamiin_date", todayStr);
      localStorage.setItem("ramadhan_aamiin_count", newCount.toString());
    } catch {
      // Ignore storage errors
    }
  };

  const handleShare = () => {
    const text = `🌙 Insya Allah dipertemukan dengan Ramadhan ${ramadhanInfo?.hijriYear || 1448} H!\nSisa waktu: ${timeLeft.days} hari ${timeLeft.hours} jam lagi.\nMari persiapkan diri dan perbanyak doa: "اللَّهُمَّ بَلِّغْنَا رَمَضَانَ" ✨`;
    if (navigator.share) {
      navigator.share({
        title: "Countdown Ramadhan - Teman Ibadah",
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Teks doa & countdown berhasil disalin!");
    }
  };

  if (!mounted || !ramadhanInfo) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white animate-pulse min-h-[260px]" />
    );
  }

  const isActiveRamadhan = ramadhanInfo.status === "active";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl shadow-emerald-950/40 transition-all duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
          <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>
            {isActiveRamadhan
              ? `Ramadhan ${ramadhanInfo.hijriYear} H • Hari ke-${ramadhanInfo.ramadhanDay}`
              : `Menuju Ramadhan ${ramadhanInfo.hijriYear} H`}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
          title="Bagikan countdown"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Bagikan</span>
        </button>
      </div>

      {/* Main Content & Doa */}
      <div className="text-center my-6 space-y-3 relative z-10">
        <p className="text-2xl sm:text-3xl font-bold tracking-wide font-arabic text-amber-200 drop-shadow-sm leading-relaxed">
          اللَّهُمَّ بَلِّغْنَا رَمَضَانَ
        </p>
        
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <span>&ldquo;Insya Allah dipertemukan dengan Ramadhan&rdquo;</span>
          <Sparkles className="w-4 h-4 text-amber-400 inline shrink-0 animate-pulse" />
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
          {isActiveRamadhan
            ? "Alhamdulillah, kita telah memasuki bulan suci Ramadhan. Semoga amal ibadah kita dilipatgandakan dan diterima oleh Allah SWT."
            : "Semoga Allah memanjangkan umur kita dalam ketaatan, memberkahi hari-hari kita, dan menyampaikan kita pada bulan yang penuh ampunan."}
        </p>
      </div>

      {/* Countdown Timer Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto my-6">
        {/* Days */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-4 text-center transform transition-transform hover:scale-105">
          <span className="block text-xl sm:text-3xl font-black text-amber-300 tracking-tight font-mono">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
            Hari
          </span>
        </div>

        {/* Hours */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-4 text-center transform transition-transform hover:scale-105">
          <span className="block text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
            Jam
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-4 text-center transform transition-transform hover:scale-105">
          <span className="block text-xl sm:text-3xl font-black text-white tracking-tight font-mono">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
            Menit
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-4 text-center transform transition-transform hover:scale-105">
          <span className="block text-xl sm:text-3xl font-black text-emerald-300 tracking-tight font-mono">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider font-semibold">
            Detik
          </span>
        </div>
      </div>

      {/* Target Date Note */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-300/80 mb-6 text-center">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          Perkiraan 1 Ramadhan: <strong>{ramadhanInfo.formattedTargetDate}</strong> (menunggu sidang isbat)
        </span>
      </div>

      {/* Interactive Aamiin Button */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <button
          onClick={handleAamiin}
          className={`group flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg ${
            hasAamiined
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-900/50 hover:brightness-110"
              : "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 text-slate-950 shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-125 ${
              hasAamiined ? "fill-white text-white" : "fill-slate-950 text-slate-950"
            }`}
          />
          <span>{hasAamiined ? "Aamiin ya Rabbal 'Alamin 🤲" : "Aminkan Doa Ini 🤲"}</span>
        </button>

        {hasAamiined && (
          <p className="text-xs text-emerald-300 flex items-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Doa telah diaminkan ({aamiinCount}x). Semoga Allah mengijabahnya!</span>
          </p>
        )}
      </div>

      {/* Collapsible Preparation Section */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between text-xs text-slate-300 hover:text-white font-medium transition-colors"
        >
          <span className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            Persiapan & Amalan Menyambut Ramadhan
          </span>
          {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showTips && (
          <div className="mt-4 space-y-2.5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RAMADHAN_PREP_TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-left"
                >
                  <h4 className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    {tip.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Link
                href="/khatam"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Rencanakan Target Khatam Ramadhan
              </Link>
              <Link
                href="/dzikir"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Dzikir & Doa Harian
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
