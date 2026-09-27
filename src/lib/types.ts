export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan" | string;
}

export interface Ayah {
  number: number;
  text: string;
  tajweedText?: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
  translation?: string;
  audio?: string;
}

export interface ReciterOption {
  id: string;
  name: string;
  arabicName?: string;
  subtitle: string;
  bitrate: number;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
  edition?: {
    identifier: string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
  };
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  [key: string]: string;
}

export interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: {
    number: number;
    en: string;
    ar: string;
    days?: number;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
}

export interface PrayerData {
  timings: PrayerTimes;
  date: {
    readable: string;
    timestamp: string;
    gregorian: {
      date: string;
      format: string;
      day: string;
      weekday: { en: string };
      month: { number: number; en: string };
      year: string;
    };
    hijri: HijriDate;
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      id: number;
      name: string;
    };
  };
}

export interface HadithBook {
  name: string;
  slug: string;
  total: number;
}

export interface HadithItem {
  number: number;
  arab: string;
  id: string;
}

export interface HadithResponse {
  name: string;
  slug: string;
  total: number;
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
  };
  items: HadithItem[];
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  surahArabic: string;
  ayahNumberInSurah: number;
  ayahGlobalNumber: number;
  textSnippet: string;
  timestamp: number;
}

export interface LastRead {
  surahNumber: number;
  surahName: string;
  surahArabic: string;
  ayahNumber: number;
  totalAyahs: number;
  timestamp: number;
}

export interface KhatamReminderSettings {
  enabled: boolean;
  times: string[]; // e.g. ["05:00", "18:30", "21:00"]
  soundEnabled: boolean;
  dailyMethod: "per-day" | "per-prayer";
}

export interface KhatamState {
  targetDays: number;
  startDate: string;
  completedSurahs: number[];
  notes: string;
  reminders?: KhatamReminderSettings;
}

export interface KhatamPlan {
  targetDays: number;
  startDate: string;
  completedAyahs: number;
  completedSurahs: number[];
  dailyAyahTarget: number;
  history: {
    date: string;
    ayahsRead: number;
    surahNumbers: number[];
  }[];
}
