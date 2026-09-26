import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import QuickNavigation from "@/components/home/QuickNavigation";
import DailyStreakCard from "@/components/home/DailyStreakCard";
import HadithOfTheDay from "@/components/home/HadithOfTheDay";
import { getPrayerTimesByCity } from "@/lib/api/prayer";
import { getAllSurahs } from "@/lib/api/quran";

export const metadata = {
  title: "QuranTrack — Islamic Daily Companion",
  description: "Aplikasi web companion ibadah harian Muslim: Al-Quran Reader, Jadwal & Panduan Shalat, Kumpulan Hadits, dan Dzikir Harian.",
};

export default async function HomePage() {
  const prayerData = await getPrayerTimesByCity("Jakarta");

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Prayer Timer & Last Read */}
      <HeroBanner initialPrayerData={prayerData} />

      {/* Daily Streak & Prayer Checklist */}
      <DailyStreakCard />

      {/* Quick Navigation / Core Features */}
      <QuickNavigation />

      {/* Hadith of The Day Card */}
      <HadithOfTheDay />
    </div>
  );
}
