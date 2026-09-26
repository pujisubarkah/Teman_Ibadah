"use client";

import React, { useState } from "react";
import { RotateCcw, Volume2, VolumeX, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DigitalTasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [round, setRound] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleTap = () => {
    // Haptic feedback if supported
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(40);
    }

    const nextCount = count + 1;
    if (nextCount >= target) {
      setCount(0);
      setRound((r) => r + 1);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([80, 50, 80]);
      }
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setRound(1);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div id="tasbih" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tasbih Digital Interaktif</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Penghitung Dzikir & Shalawat
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tekan lingkaran di bawah untuk menghitung dzikir.
          </p>
        </div>

        {/* Target Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 font-semibold mr-1">Target:</span>
          {[33, 99, 100].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t);
                setCount(0);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                target === t
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-stone-100 text-slate-600 hover:bg-stone-200"
              )}
            >
              {t}x
            </button>
          ))}
        </div>
      </div>

      {/* Tasbih Main Circle Display */}
      <div className="flex flex-col items-center justify-center py-6 space-y-6">
        {/* Round Counter info */}
        <div className="text-xs font-semibold text-slate-500 bg-stone-50 px-4 py-1.5 rounded-full border border-stone-200">
          Putaran ke-<strong>{round}</strong> • Target: <strong>{target}x</strong>
        </div>

        {/* Big Tap Button */}
        <button
          onClick={handleTap}
          className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-2xl shadow-emerald-700/30 flex flex-col items-center justify-center relative cursor-pointer active:scale-95 transition-all duration-150 select-none group ring-8 ring-emerald-50"
        >
          {/* Circular progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-white/20 fill-none"
              strokeWidth="6"
            />
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              className="stroke-amber-400 fill-none transition-all duration-200"
              strokeWidth="6"
              strokeDasharray="600"
              strokeDashoffset={600 - (600 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          <span className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight group-hover:scale-105 transition-transform">
            {count}
          </span>
          <span className="text-xs uppercase tracking-widest text-emerald-200 font-semibold mt-2">
            Tekan untuk Dzikir
          </span>
        </button>

        {/* Reset button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Hitungan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
