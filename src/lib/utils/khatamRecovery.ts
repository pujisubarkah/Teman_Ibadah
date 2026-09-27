import { KhatamState, Surah } from "@/lib/types";

export type KhatamPaceStatus = "completed" | "ahead" | "on-track" | "slightly-behind" | "far-behind";

export interface RecoveryPlanOption {
  id: "prayer" | "weekend" | "recalibrate";
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  actionText: string;
  recalibrateDays?: number;
}

export interface KhatamPaceAnalysis {
  completedCount: number;
  remainingCount: number;
  percentage: number;
  daysElapsed: number;
  daysRemaining: number;
  targetDays: number;
  idealSurahsByNow: number;
  surahsDifference: number; // positive = behind, negative = ahead
  status: KhatamPaceStatus;
  statusLabel: string;
  statusColor: string;
  statusBg: string;
  statusMessage: string;
  estimatedMinutesToCatchUp: number;
  dailyPaceRemaining: number;
  nextSurah: { number: number; name: string; englishName: string } | null;
  todayTargetSurahs: number[];
  recoveryPlans: RecoveryPlanOption[];
}

export function analyzeKhatamPace(
  khatam: KhatamState,
  allSurahs: Surah[] = []
): KhatamPaceAnalysis {
  const targetDays = khatam.targetDays || 30;
  const completedSurahs = khatam.completedSurahs || [];
  const completedCount = completedSurahs.length;
  const remainingCount = 114 - completedCount;
  const percentage = Math.min(100, Math.round((completedCount / 114) * 100));

  // Calculate days elapsed
  const startDate = khatam.startDate ? new Date(khatam.startDate) : new Date();
  const now = new Date();
  const diffTime = Math.max(0, now.getTime() - startDate.getTime());
  const daysElapsed = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
  const daysRemaining = Math.max(0, targetDays - daysElapsed);

  // Ideal progress by today
  const idealSurahsByNow = Math.min(114, Math.round((daysElapsed / targetDays) * 114));
  const surahsDifference = idealSurahsByNow - completedCount;

  // Determine next uncompleted surah
  let nextSurah: { number: number; name: string; englishName: string } | null = null;
  for (let i = 1; i <= 114; i++) {
    if (!completedSurahs.includes(i)) {
      const found = allSurahs.find((s) => s.number === i);
      nextSurah = {
        number: i,
        name: found ? found.name : `Surah ${i}`,
        englishName: found ? found.englishName : `Surah ${i}`,
      };
      break;
    }
  }

  // Determine Pace Status
  let status: KhatamPaceStatus = "on-track";
  let statusLabel = "On-Track (Sesuai Target)";
  let statusColor = "text-emerald-700";
  let statusBg = "bg-emerald-50 border-emerald-200";
  let statusMessage = "Ritme bacaan Anda sangat baik dan konsisten dengan target khatam!";

  if (completedCount >= 114) {
    status = "completed";
    statusLabel = "Alhamdulillah Khatam!";
    statusColor = "text-purple-700";
    statusBg = "bg-purple-50 border-purple-200";
    statusMessage = "Selamat! Anda telah menyelesaikan seluruh 114 Surah Al-Qur'an.";
  } else if (surahsDifference <= -2) {
    status = "ahead";
    statusLabel = `Lebih Cepat (+${Math.abs(surahsDifference)} Surah)`;
    statusColor = "text-teal-700";
    statusBg = "bg-teal-50 border-teal-200";
    statusMessage = `Luar biasa! Progres Anda ${Math.abs(surahsDifference)} surah lebih cepat dari jadwal target.`;
  } else if (surahsDifference >= 1 && surahsDifference <= 3) {
    status = "slightly-behind";
    statusLabel = `Tertinggal ${surahsDifference} Surah`;
    statusColor = "text-amber-700";
    statusBg = "bg-amber-50 border-amber-200";
    statusMessage = `Anda tertinggal ${surahsDifference} surah. Cukup luangkan ~${surahsDifference * 6} menit hari ini untuk kembali on-track!`;
  } else if (surahsDifference > 3) {
    status = "far-behind";
    statusLabel = `Perlu Catch-up (${surahsDifference} Surah)`;
    statusColor = "text-rose-700";
    statusBg = "bg-rose-50 border-rose-200";
    statusMessage = `Jangan berkecil hati! Anda tertinggal ${surahsDifference} surah karena terlewat beberapa hari. Gunakan opsi pemulihan di bawah ini.`;
  }

  // Daily pace remaining
  const effectiveDaysRemaining = Math.max(1, daysRemaining);
  const dailyPaceRemaining = Number((remainingCount / effectiveDaysRemaining).toFixed(1));
  const estimatedMinutesToCatchUp = Math.max(0, surahsDifference * 6);

  // Next target surahs for today (e.g. 2-4 surahs ahead)
  const todayTargetSurahs: number[] = [];
  const targetCountToday = Math.max(1, Math.ceil(dailyPaceRemaining));
  let count = 0;
  for (let i = 1; i <= 114; i++) {
    if (!completedSurahs.includes(i)) {
      todayTargetSurahs.push(i);
      count++;
      if (count >= targetCountToday) break;
    }
  }

  // Generate Smart Recovery Plans
  const recoveryPlans: RecoveryPlanOption[] = [];

  if (surahsDifference > 0) {
    // 1. Shalat Fardhu Plan
    const daysToSpread = Math.min(7, Math.max(2, Math.ceil(surahsDifference / 3)));
    recoveryPlans.push({
      id: "prayer",
      title: "Kompensasi Ba'da Shalat (Recommended)",
      badge: "Paling Ringan",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: `Cukup baca 1 surah / 2 lembar setiap selesai shalat fardhu (5x sehari) selama ${daysToSpread} hari ke depan.`,
      actionText: "Terapkan Metode Ba'da Shalat",
    });

    // 2. Weekend Booster
    recoveryPlans.push({
      id: "weekend",
      title: "Weekend Tilawah Booster",
      badge: "Akhir Pekan",
      badgeColor: "bg-amber-100 text-amber-800",
      description: `Pertahankan ritme harian normal di hari kerja, lalu tuntaskan sisa ${surahsDifference} surah saat Sabtu & Ahad santai.`,
      actionText: "Jadwalkan di Akhir Pekan",
    });

    // 3. Guilt-free Recalibration
    const addedDays = Math.ceil(surahsDifference / (114 / targetDays));
    recoveryPlans.push({
      id: "recalibrate",
      title: `Rekalibrasi Target (+${addedDays} Hari)`,
      badge: "Bebas Beban",
      badgeColor: "bg-blue-100 text-blue-800",
      description: `Perpanjang target waktu menjadi ${targetDays + addedDays} hari secara otomatis agar target harian tetap terasa ringan.`,
      actionText: `Sesuaikan Jadi ${targetDays + addedDays} Hari`,
      recalibrateDays: addedDays,
    });
  }

  return {
    completedCount,
    remainingCount,
    percentage,
    daysElapsed,
    daysRemaining,
    targetDays,
    idealSurahsByNow,
    surahsDifference,
    status,
    statusLabel,
    statusColor,
    statusBg,
    statusMessage,
    estimatedMinutesToCatchUp,
    dailyPaceRemaining,
    nextSurah,
    todayTargetSurahs,
    recoveryPlans,
  };
}
