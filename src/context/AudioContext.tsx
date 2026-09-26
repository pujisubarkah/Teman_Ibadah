"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import { Ayah, Surah } from "@/lib/types";

interface AudioContextType {
  isPlaying: boolean;
  currentSurah: Surah | null;
  currentAyah: Ayah | null;
  currentAyahIndex: number;
  playlist: Ayah[];
  duration: number;
  currentTime: number;
  playbackRate: number;
  autoPlayNext: boolean;
  playAyah: (ayah: Ayah, surah: Surah, fullAyahs?: Ayah[], startIndex?: number) => void;
  togglePlay: () => void;
  pause: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  setAutoPlayNext: (val: boolean) => void;
  stop: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [currentAyah, setCurrentAyah] = useState<Ayah | null>(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number>(-1);
  const [playlist, setPlaylist] = useState<Ayah[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRateState] = useState<number>(1);
  const [autoPlayNext, setAutoPlayNext] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // If autoPlayNext is enabled and there's a next ayah in playlist
      if (autoPlayNext) {
        setCurrentAyahIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex;
        });
      }
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [autoPlayNext]);

  // Handle playing next ayah when currentAyahIndex changes
  useEffect(() => {
    if (currentAyahIndex >= 0 && playlist.length > 0 && currentAyahIndex < playlist.length) {
      const nextAyah = playlist[currentAyahIndex];
      setCurrentAyah(nextAyah);
      if (audioRef.current && nextAyah.audio) {
        audioRef.current.src = nextAyah.audio;
        audioRef.current.playbackRate = playbackRate;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Playback prevented:", err));
      }
    } else if (currentAyahIndex >= playlist.length && playlist.length > 0) {
      // Reached end of surah
      setIsPlaying(false);
    }
  }, [currentAyahIndex, playlist, playbackRate]);

  const playAyah = (
    ayah: Ayah,
    surah: Surah,
    fullAyahs: Ayah[] = [],
    startIndex: number = -1
  ) => {
    setCurrentSurah(surah);
    if (fullAyahs.length > 0) {
      setPlaylist(fullAyahs);
      const idx = startIndex >= 0 ? startIndex : fullAyahs.findIndex((a) => a.number === ayah.number);
      setCurrentAyahIndex(idx >= 0 ? idx : 0);
      setCurrentAyah(fullAyahs[idx >= 0 ? idx : 0]);
    } else {
      setPlaylist([ayah]);
      setCurrentAyahIndex(0);
      setCurrentAyah(ayah);
      if (audioRef.current && ayah.audio) {
        audioRef.current.src = ayah.audio;
        audioRef.current.playbackRate = playbackRate;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Playback prevented:", err));
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentAyah) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback failed:", err));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (currentAyahIndex < playlist.length - 1) {
      setCurrentAyahIndex((prev) => prev + 1);
    }
  };

  const playPrev = () => {
    if (currentAyahIndex > 0) {
      setCurrentAyahIndex((prev) => prev - 1);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAyah(null);
    setCurrentSurah(null);
    setCurrentAyahIndex(-1);
    setPlaylist([]);
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSurah,
        currentAyah,
        currentAyahIndex,
        playlist,
        duration,
        currentTime,
        playbackRate,
        autoPlayNext,
        playAyah,
        togglePlay,
        pause,
        playNext,
        playPrev,
        seek,
        setPlaybackRate,
        setAutoPlayNext,
        stop,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
