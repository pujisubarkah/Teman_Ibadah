import React from "react";
import DzikirDoaSection from "@/components/dzikir/DzikirDoaSection";

export const metadata = {
  title: "Dzikir & Doa Harian — QuranTrack",
  description: "Dzikir pagi dan petang (Al-Matsurat), kumpulan doa harian sehari-hari, 99 Asmaul Husna, dan tasbih digital interaktif.",
};

export default function DzikirPage() {
  return (
    <div className="pb-12">
      <DzikirDoaSection />
    </div>
  );
}
