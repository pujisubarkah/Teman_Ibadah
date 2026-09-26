import React from "react";
import { notFound } from "next/navigation";
import { getSurahWithTranslation, getAllSurahs } from "@/lib/api/quran";
import SurahDetailClient from "./SurahDetailClient";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SurahPageProps) {
  const { id } = await params;
  const surahNumber = parseInt(id, 10);
  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return { title: "Surah Tidak Ditemukan — QuranTrack" };
  }

  try {
    const { surah } = await getSurahWithTranslation(surahNumber);
    return {
      title: `Surah ${surah.englishName} (${surah.name}) — QuranTrack`,
      description: `Baca Surah ${surah.englishName} (${surah.englishNameTranslation}) lengkap dengan audio Misyari Rasyid Al-Afasy dan terjemahan bahasa Indonesia.`,
    };
  } catch {
    return { title: `Surah #${id} — QuranTrack` };
  }
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahNumber = parseInt(id, 10);

  if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  try {
    const [{ surah, ayahs }, allSurahs] = await Promise.all([
      getSurahWithTranslation(surahNumber),
      getAllSurahs(),
    ]);

    return (
      <SurahDetailClient
        surah={surah}
        ayahs={ayahs}
        allSurahsList={allSurahs}
      />
    );
  } catch (error) {
    console.error("Error loading surah:", error);
    notFound();
  }
}
