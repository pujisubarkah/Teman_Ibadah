import { ReciterOption } from "@/lib/types";

export const QURAN_RECITERS: ReciterOption[] = [
  {
    id: "ar.alafasy",
    name: "Syaikh Misyari Rasyid Al-Afasy",
    arabicName: "مشاري راشد العفاسي",
    subtitle: "Kuwait — Merdu, jelas & paling populer",
    bitrate: 128,
  },
  {
    id: "ar.abdurrahmaansudais",
    name: "Syaikh Abdurrahman As-Sudais",
    arabicName: "عبد الرحمن السديس",
    subtitle: "Imam Besar Masjidil Haram, Makkah",
    bitrate: 192,
  },
  {
    id: "ar.mahermuaiqly",
    name: "Syaikh Maher Al-Muaiqly",
    arabicName: "ماهر المعيقلي",
    subtitle: "Imam Masjidil Haram, Makkah (Tartil Khusyuk)",
    bitrate: 128,
  },
  {
    id: "ar.saoodshuraym",
    name: "Syaikh Sa'ud Asy-Syuraim",
    arabicName: "سعود الشريم",
    subtitle: "Imam Masjidil Haram, Makkah (Tempo Cepat)",
    bitrate: 64,
  },
  {
    id: "ar.hudhaify",
    name: "Syaikh Ali Al-Hudaify",
    arabicName: "علي بن عبد الرحمن الحذيفي",
    subtitle: "Imam Masjid Nabawi, Madinah (Sangat Cocok Belajar Tajwid)",
    bitrate: 128,
  },
  {
    id: "ar.husary",
    name: "Syaikh Mahmud Khalil Al-Husary",
    arabicName: "محمود خليل الحصري",
    subtitle: "Mesir — Standar Emas Ketepatan Makhraj & Tajwid",
    bitrate: 128,
  },
  {
    id: "ar.abdulbasitmurattal",
    name: "Syaikh Abdul Basit Abdul Samad",
    arabicName: "عبد الباسط عبد الصمد",
    subtitle: "Mesir — Qari Legendaris Dunia (Murattal)",
    bitrate: 192,
  },
  {
    id: "ar.minshawi",
    name: "Syaikh Muhammad Siddiq Al-Minshawi",
    arabicName: "محمد صديق المنشاوي",
    subtitle: "Mesir — Lantunan Syahdu Menyentuh Hati",
    bitrate: 128,
  },
  {
    id: "ar.ahmedajamy",
    name: "Syaikh Ahmed ibn Ali Al-Ajami",
    arabicName: "أحمد بن علي العجمي",
    subtitle: "Arab Saudi — Tartil Lantang & Bersemangat",
    bitrate: 128,
  },
  {
    id: "ar.shaatree",
    name: "Syaikh Abu Bakr Asy-Syathiri",
    arabicName: "أبو بكر الشاطري",
    subtitle: "Arab Saudi — Tartil Tenang & Mengalir",
    bitrate: 128,
  },
  {
    id: "ar.hanirifai",
    name: "Syaikh Hani Ar-Rifai",
    arabicName: "هاني الرفاعي",
    subtitle: "Arab Saudi — Doa & Lantunan Penuh Haru",
    bitrate: 192,
  },
];

export const DEFAULT_RECITER_ID = "ar.alafasy";

export function getReciterById(id: string): ReciterOption {
  return (
    QURAN_RECITERS.find((r) => r.id === id) ||
    QURAN_RECITERS[0]
  );
}

export function buildAyahAudioUrl(ayahGlobalNumber: number, reciterId: string = DEFAULT_RECITER_ID): string {
  const reciter = getReciterById(reciterId);
  return `https://cdn.islamic.network/quran/audio/${reciter.bitrate}/${reciter.id}/${ayahGlobalNumber}.mp3`;
}
