/**
 * Ramadan Date & Hijri Utilities
 * Provides accurate estimates for upcoming Ramadan start dates and prayer quotes.
 */

export interface RamadhanInfo {
  hijriYear: number;
  startDate: Date;
  endDate: Date; // Estimated 1 Shawwal (Eid al-Fitr)
  status: "upcoming" | "active" | "ended";
  ramadhanDay?: number;
  totalDaysRemaining: number;
  formattedTargetDate: string;
}

// Known astronomical / estimated dates for 1 Ramadhan & 1 Syawal (WIB / GMT+7)
// Dates are based on standard Umm al-Qura / Indonesian Islamic Calendar calculations
export const RAMADHAN_SCHEDULE = [
  {
    hijriYear: 1445,
    start: new Date("2024-03-12T00:00:00+07:00"),
    end: new Date("2024-04-10T00:00:00+07:00"),
  },
  {
    hijriYear: 1446,
    start: new Date("2025-03-01T00:00:00+07:00"),
    end: new Date("2025-03-31T00:00:00+07:00"),
  },
  {
    hijriYear: 1447,
    start: new Date("2026-02-18T00:00:00+07:00"),
    end: new Date("2026-03-20T00:00:00+07:00"),
  },
  {
    hijriYear: 1448,
    start: new Date("2027-02-08T00:00:00+07:00"),
    end: new Date("2027-03-09T00:00:00+07:00"),
  },
  {
    hijriYear: 1449,
    start: new Date("2028-01-28T00:00:00+07:00"),
    end: new Date("2028-02-27T00:00:00+07:00"),
  },
  {
    hijriYear: 1450,
    start: new Date("2029-01-16T00:00:00+07:00"),
    end: new Date("2029-02-15T00:00:00+07:00"),
  },
  {
    hijriYear: 1451,
    start: new Date("2030-01-05T00:00:00+07:00"),
    end: new Date("2030-02-04T00:00:00+07:00"),
  },
];

export function getRamadhanInfo(now: Date = new Date()): RamadhanInfo {
  // Find current active or next upcoming Ramadan
  for (const item of RAMADHAN_SCHEDULE) {
    if (now >= item.start && now < item.end) {
      // Currently in Ramadan
      const diffMs = now.getTime() - item.start.getTime();
      const currentDay = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
      const daysUntilEnd = Math.max(
        0,
        Math.ceil((item.end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      );

      return {
        hijriYear: item.hijriYear,
        startDate: item.start,
        endDate: item.end,
        status: "active",
        ramadhanDay: currentDay,
        totalDaysRemaining: daysUntilEnd,
        formattedTargetDate: formatDateId(item.start),
      };
    }

    if (now < item.start) {
      // Upcoming Ramadan
      const diffMs = item.start.getTime() - now.getTime();
      const daysRemaining = Math.max(
        0,
        Math.ceil(diffMs / (1000 * 60 * 60 * 24))
      );

      return {
        hijriYear: item.hijriYear,
        startDate: item.start,
        endDate: item.end,
        status: "upcoming",
        totalDaysRemaining: daysRemaining,
        formattedTargetDate: formatDateId(item.start),
      };
    }
  }

  // Fallback if beyond schedule (approx ~354.36 days per lunar year)
  const lastSchedule = RAMADHAN_SCHEDULE[RAMADHAN_SCHEDULE.length - 1];
  const yearsAhead = Math.ceil(
    (now.getTime() - lastSchedule.start.getTime()) / (354.36 * 24 * 3600 * 1000)
  );
  const nextHijriYear = lastSchedule.hijriYear + Math.max(1, yearsAhead);
  const estimatedStart = new Date(
    lastSchedule.start.getTime() + yearsAhead * 354.36 * 24 * 3600 * 1000
  );
  const estimatedEnd = new Date(estimatedStart.getTime() + 30 * 24 * 3600 * 1000);

  const diffMs = estimatedStart.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return {
    hijriYear: nextHijriYear,
    startDate: estimatedStart,
    endDate: estimatedEnd,
    status: now >= estimatedStart && now < estimatedEnd ? "active" : "upcoming",
    totalDaysRemaining: daysRemaining,
    formattedTargetDate: formatDateId(estimatedStart),
  };
}

export function formatDateId(date: Date): string {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export interface RamadhanPreparationTip {
  title: string;
  description: string;
  icon: string;
}

export const RAMADHAN_PREP_TIPS: RamadhanPreparationTip[] = [
  {
    title: "Qadha Puasa yang Tertinggal",
    description: "Selesaikan tanggungan puasa tahun lalu sebelum bulan Ramadhan tiba.",
    icon: "CalendarCheck",
  },
  {
    title: "Membiasakan Tilawah Harian",
    description: "Mulai rutin membaca Al-Qur'an 1-2 juz setiap hari agar terbiasa saat Ramadhan.",
    icon: "BookOpen",
  },
  {
    title: "Melatih Puasa Sunnah",
    description: "Perbanyak puasa sunnah Senin-Kamis atau Ayyamul Bidh untuk membiasakan fisik.",
    icon: "HeartPulse",
  },
  {
    title: "Memperbanyak Istighfar & Doa",
    description: "Bersihkan hati dengan istighfar dan mohon disampaikan ke bulan yang penuh berkah.",
    icon: "Sparkles",
  },
];
