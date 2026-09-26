import React from "react";
import KhatamTracker from "@/components/quran/KhatamTracker";
import { getAllSurahs } from "@/lib/api/quran";

export const metadata = {
  title: "Target Khatam Al-Quran — QuranTrack",
  description: "Tracker progres khatam 114 Surah Al-Quran, atur target harian (30, 60, 90 hari), dan rayakan setiap pencapaian.",
};

export default async function KhatamPage() {
  const surahs = await getAllSurahs();

  return (
    <div className="pb-12">
      <KhatamTracker surahs={surahs} />
    </div>
  );
}
