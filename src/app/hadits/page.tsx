import React from "react";
import HadithExplorer from "@/components/hadith/HadithExplorer";

export const metadata = {
  title: "Kumpulan Hadits Shahih — QuranTrack",
  description: "Kumpulan hadits dari 9 Imam (Bukhari, Muslim, Abu Dawud, Tirmidzi, dll.) dan 40 Hadits Arbain An-Nawawiyah lengkap dengan terjemahan dan pencarian.",
};

export default function HaditsPage() {
  return (
    <div className="pb-12">
      <HadithExplorer />
    </div>
  );
}
