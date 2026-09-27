"use client";

import { useState, useEffect } from "react";
import { Bookmark, LastRead, KhatamState, KhatamReminderSettings } from "@/lib/types";

export type { KhatamState, KhatamReminderSettings };

export interface DailyPrayerChecklist {
  date: string;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  dhuha?: boolean;
  tahajjud?: boolean;
}

const STORAGE_KEYS = {
  BOOKMARKS: "qurantrack_bookmarks_v1",
  LAST_READ: "qurantrack_last_read_v1",
  KHATAM: "qurantrack_khatam_v1",
  PRAYER_CHECKLIST: "qurantrack_prayer_checklist_v1",
  STREAK: "qurantrack_streak_v1",
  SETTINGS: "qurantrack_settings_v1",
};

export function useQuranStore() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [khatam, setKhatam] = useState<KhatamState>({
    targetDays: 30,
    startDate: new Date().toISOString().split("T")[0],
    completedSurahs: [],
    notes: "",
  });
  const [prayerChecklist, setPrayerChecklist] = useState<DailyPrayerChecklist>({
    date: new Date().toISOString().split("T")[0],
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    dhuha: false,
    tahajjud: false,
  });
  const [streak, setStreak] = useState({ current: 1, best: 1, lastActive: new Date().toISOString().split("T")[0] });
  const [arabicFontSize, setArabicFontSize] = useState<number>(28);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [selectedReciter, setSelectedReciterState] = useState<string>("ar.alafasy");
  const [isTajweedEnabled, setIsTajweedEnabledState] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedLastRead = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      if (savedLastRead) setLastRead(JSON.parse(savedLastRead));

      const savedKhatam = localStorage.getItem(STORAGE_KEYS.KHATAM);
      if (savedKhatam) setKhatam(JSON.parse(savedKhatam));

      const todayStr = new Date().toISOString().split("T")[0];
      const savedChecklist = localStorage.getItem(STORAGE_KEYS.PRAYER_CHECKLIST);
      if (savedChecklist) {
        const parsed = JSON.parse(savedChecklist);
        if (parsed.date === todayStr) {
          setPrayerChecklist(parsed);
        } else {
          setPrayerChecklist({
            date: todayStr,
            fajr: false,
            dhuhr: false,
            asr: false,
            maghrib: false,
            isha: false,
            dhuha: false,
            tahajjud: false,
          });
        }
      }

      const savedStreak = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (savedStreak) {
        const parsed = JSON.parse(savedStreak);
        const lastDate = new Date(parsed.lastActive);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          // Continuous streak
          parsed.current += 1;
          parsed.best = Math.max(parsed.best, parsed.current);
          parsed.lastActive = todayStr;
          localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(parsed));
          setStreak(parsed);
        } else if (diffDays === 0) {
          setStreak(parsed);
        } else {
          // Reset streak
          const newStreak = { current: 1, best: parsed.best || 1, lastActive: todayStr };
          localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(newStreak));
          setStreak(newStreak);
        }
      }

      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.fontSize) setArabicFontSize(settings.fontSize);
        if (typeof settings.showTranslation === "boolean") setShowTranslation(settings.showTranslation);
        if (settings.selectedReciter) setSelectedReciterState(settings.selectedReciter);
        if (typeof settings.isTajweedEnabled === "boolean") setIsTajweedEnabledState(settings.isTajweedEnabled);
      }
    } catch (e) {
      console.error("Failed to load local storage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveLastRead = (data: LastRead) => {
    setLastRead(data);
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === bookmark.id);
      let updated: Bookmark[];
      if (exists) {
        updated = prev.filter((b) => b.id !== bookmark.id);
      } else {
        updated = [bookmark, ...prev];
      }
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const isAyahBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    const id = `surah-${surahNumber}-ayah-${ayahNumber}`;
    return bookmarks.some((b) => b.id === id);
  };

  const toggleSurahCompleted = (surahNumber: number) => {
    setKhatam((prev) => {
      const exists = prev.completedSurahs.includes(surahNumber);
      const updatedSurahs = exists
        ? prev.completedSurahs.filter((n) => n !== surahNumber)
        : [...prev.completedSurahs, surahNumber];

      const updated = { ...prev, completedSurahs: updatedSurahs };
      try {
        localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateKhatamTarget = (targetDays: number) => {
    setKhatam((prev) => {
      const updated = { ...prev, targetDays };
      try {
        localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const recalibrateKhatamTarget = (addedDays: number) => {
    setKhatam((prev) => {
      const currentDays = prev.targetDays || 30;
      const updated = { ...prev, targetDays: currentDays + addedDays };
      try {
        localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateKhatamReminders = (reminders: any) => {
    setKhatam((prev) => {
      const updated = { ...prev, reminders };
      try {
        localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetKhatamStartDate = (newDateStr?: string) => {
    setKhatam((prev) => {
      const updated = {
        ...prev,
        startDate: newDateStr || new Date().toISOString().split("T")[0],
      };
      try {
        localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const togglePrayerStatus = (prayerKey: keyof Omit<DailyPrayerChecklist, "date">) => {
    setPrayerChecklist((prev) => {
      const updated = { ...prev, [prayerKey]: !prev[prayerKey] };
      try {
        localStorage.setItem(STORAGE_KEYS.PRAYER_CHECKLIST, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateFontSize = (size: number) => {
    setArabicFontSize(size);
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const prev = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...prev, fontSize: size }));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTranslationVisibility = () => {
    setShowTranslation((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        const parsed = saved ? JSON.parse(saved) : {};
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...parsed, showTranslation: next }));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const setSelectedReciter = (reciterId: string) => {
    setSelectedReciterState(reciterId);
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      const parsed = saved ? JSON.parse(saved) : {};
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...parsed, selectedReciter: reciterId }));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTajweed = () => {
    setIsTajweedEnabledState((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        const parsed = saved ? JSON.parse(saved) : {};
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...parsed, isTajweedEnabled: next }));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return {
    isLoaded,
    bookmarks,
    lastRead,
    khatam,
    prayerChecklist,
    streak,
    arabicFontSize,
    showTranslation,
    selectedReciter,
    isTajweedEnabled,
    saveLastRead,
    toggleBookmark,
    isAyahBookmarked,
    toggleSurahCompleted,
    updateKhatamTarget,
    recalibrateKhatamTarget,
    updateKhatamReminders,
    resetKhatamStartDate,
    togglePrayerStatus,
    updateFontSize,
    toggleTranslationVisibility,
    setSelectedReciter,
    toggleTajweed,
  };
}
