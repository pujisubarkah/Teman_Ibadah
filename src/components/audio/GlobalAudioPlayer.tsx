"use client";

import React, { useState } from "react";
import { useAudio } from "@/context/AudioContext";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  X, 
  Volume2, 
  Repeat, 
  Gauge, 
  ChevronUp, 
  ChevronDown,
  Mic2
} from "lucide-react";
import { formatTime, cn } from "@/lib/utils";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { getReciterById } from "@/lib/data/reciters";
import ReciterSelectorModal from "./ReciterSelectorModal";

export default function GlobalAudioPlayer() {
  const {
    isPlaying,
    currentSurah,
    currentAyah,
    currentAyahIndex,
    playlist,
    duration,
    currentTime,
    playbackRate,
    autoPlayNext,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setPlaybackRate,
    setAutoPlayNext,
    stop,
  } = useAudio();

  const { selectedReciter } = useQuranStore();
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isReciterModalOpen, setIsReciterModalOpen] = useState(false);

  if (!currentAyah || !currentSurah) {
    return null;
  }

  const currentReciter = getReciterById(selectedReciter);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  return (
    <>
      <aside aria-label="Pemutar Audio Al-Quran" className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[500px] z-50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden ring-1 ring-emerald-500/10">
          {/* Progress Bar (Clickable) */}
          <div
            role="slider"
            aria-label="Progres pemutaran audio"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            tabIndex={0}
            className="w-full h-1.5 bg-stone-100 hover:h-2.5 transition-all cursor-pointer relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              seek(clickPos * duration);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek(Math.min(duration, currentTime + 5));
              if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5));
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 relative transition-all"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-700 rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>

          {/* Content */}
          <div className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              {/* Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-200">
                  {currentAyah.numberInSurah}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-slate-800 truncate">
                      {currentSurah.name} ({currentSurah.englishName})
                    </p>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-sm border border-emerald-200/60 shrink-0">
                      Ayat {currentAyah.numberInSurah}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                    <span className="hidden sm:inline">•</span>
                    <button
                      onClick={() => setIsReciterModalOpen(true)}
                      className="hidden sm:inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium hover:underline cursor-pointer truncate max-w-[140px]"
                      title="Klik untuk ganti Qari / Suara Imam"
                    >
                      <Mic2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{currentReciter.name.split(" ")[1] || currentReciter.name}</span>
                    </button>
                  </div>
                </div>
              </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Speed Button */}
              <div className="relative">
                <button
                  onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                  className="px-2 py-1 text-xs font-semibold rounded-lg text-slate-600 hover:bg-stone-100 border border-stone-200"
                  title="Kecepatan Audio"
                >
                  {playbackRate}x
                </button>
                {isSpeedMenuOpen && (
                  <div className="absolute bottom-full mb-2 right-0 bg-white rounded-xl shadow-xl border border-stone-200 p-1.5 flex flex-col gap-1 z-50">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setPlaybackRate(s);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={cn(
                          "px-3 py-1 text-xs rounded-lg text-left transition-colors",
                          playbackRate === s
                            ? "bg-emerald-50 text-emerald-700 font-bold"
                            : "text-slate-600 hover:bg-stone-100"
                        )}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Prev Button */}
              <button
                onClick={playPrev}
                disabled={currentAyahIndex <= 0}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 rounded-xl transition-colors"
                title="Ayat Sebelumnya"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
                title={isPlaying ? "Jeda" : "Putar"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
              </button>

              {/* Next Button */}
              <button
                onClick={playNext}
                disabled={currentAyahIndex >= playlist.length - 1}
                className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100 rounded-xl transition-colors"
                title="Ayat Selanjutnya"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Auto play toggle */}
              <button
                onClick={() => setAutoPlayNext(!autoPlayNext)}
                className={cn(
                  "p-2 rounded-xl transition-colors hidden sm:flex items-center justify-center",
                  autoPlayNext
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-400 hover:bg-stone-100"
                )}
                title={autoPlayNext ? "Auto-play ayat aktif" : "Auto-play ayat nonaktif"}
              >
                <Repeat className="w-4 h-4" />
              </button>

              {/* Close / Stop */}
              <button
                onClick={stop}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-stone-100 rounded-xl transition-colors ml-1"
                title="Tutup Pemutar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <ReciterSelectorModal
      isOpen={isReciterModalOpen}
      onClose={() => setIsReciterModalOpen(false)}
    />
  </>
);
}
