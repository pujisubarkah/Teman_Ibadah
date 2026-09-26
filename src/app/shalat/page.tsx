import React from "react";
import PrayerTimesCard from "@/components/prayer/PrayerTimesCard";
import QiblaCompass from "@/components/prayer/QiblaCompass";
import PrayerGuideTabs from "@/components/prayer/PrayerGuideTabs";
import { getPrayerTimesByCity } from "@/lib/api/prayer";

export const metadata = {
  title: "Jadwal & Panduan Shalat — QuranTrack",
  description: "Jadwal shalat harian akurat se-Indonesia, arah kiblat ke Ka'bah, niat shalat, tata cara rukun shalat, dan doa qunut.",
};

export default async function ShalatPage() {
  const initialPrayerData = await getPrayerTimesByCity("Jakarta");

  return (
    <div className="space-y-8 pb-12">
      {/* Jadwal Waktu Shalat Card */}
      <PrayerTimesCard initialData={initialPrayerData} />

      {/* Kompas & Arah Kiblat */}
      <QiblaCompass />

      {/* Panduan Niat, Rukun Shalat, Doa Qunut & Dzikir */}
      <PrayerGuideTabs />
    </div>
  );
}
