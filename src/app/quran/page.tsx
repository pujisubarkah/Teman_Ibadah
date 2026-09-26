import React from "react";
import { getAllSurahs } from "@/lib/api/quran";
import QuranClient from "./QuranClient";

export const metadata = {
  title: "Baca Al-Quran — QuranTrack",
  description: "Daftar 114 Surah Al-Quran lengkap dengan terjemahan bahasa Indonesia, teks Arab Uthmani, dan audio per ayat.",
};

export default async function QuranPage() {
  const surahs = await getAllSurahs();

  return <QuranClient initialSurahs={surahs} />;
}
