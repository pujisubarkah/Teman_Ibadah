import { Surah, SurahDetail, Ayah } from "@/lib/types";

// lib/api/quran.ts
export async function getAllSurahs(): Promise<Surah[]> {
  try {
    const res = await fetch("https://api.alquran.cloud/v1/surah", {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });
    if (!res.ok) throw new Error("Gagal mengambil daftar surah");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching all surahs:", error);
    throw error;
  }
}

export async function getSurahDetail(number: number): Promise<SurahDetail> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Gagal mengambil detail surah nomor ${number}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching surah ${number}:`, error);
    throw error;
  }
}

import { buildAyahAudioUrl, DEFAULT_RECITER_ID } from "@/lib/data/reciters";

export function getAudioUrl(ayahNumber: number, reciterId: string = DEFAULT_RECITER_ID): string {
  return buildAyahAudioUrl(ayahNumber, reciterId);
}

/**
 * Mengambil detail surah lengkap dengan teks Arab Uthmani, Tajweed berwarna, & Terjemahan Bahasa Indonesia
 */
export async function getSurahWithTranslation(number: number): Promise<{
  surah: Surah;
  ayahs: Ayah[];
}> {
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,quran-tajweed,id.indonesian`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(`Gagal memuat surah ${number}`);
    }

    const data = await res.json();
    const uthmaniEdition = data.data.find(
      (e: { edition: { identifier: string } }) => e.edition.identifier === "quran-uthmani"
    ) || data.data[0];

    const tajweedEdition = data.data.find(
      (e: { edition: { identifier: string } }) => e.edition.identifier === "quran-tajweed"
    );

    const indonesianEdition = data.data.find(
      (e: { edition: { identifier: string } }) => e.edition.identifier === "id.indonesian"
    ) || data.data[1];

    const ayahs: Ayah[] = uthmaniEdition.ayahs.map(
      (ayah: Ayah, index: number) => {
        const tajweedAyah = tajweedEdition?.ayahs[index];
        const transAyah = indonesianEdition?.ayahs[index];
        return {
          ...ayah,
          tajweedText: tajweedAyah?.text || ayah.text,
          translation: transAyah?.text || "",
          audio: getAudioUrl(ayah.number),
        };
      }
    );

    const surah: Surah = {
      number: uthmaniEdition.number,
      name: uthmaniEdition.name,
      englishName: uthmaniEdition.englishName,
      englishNameTranslation: uthmaniEdition.englishNameTranslation,
      numberOfAyahs: uthmaniEdition.numberOfAyahs,
      revelationType: uthmaniEdition.revelationType,
    };

    return { surah, ayahs };
  } catch (error) {
    console.error(`Error in getSurahWithTranslation for ${number}:`, error);
    throw error;
  }
}
