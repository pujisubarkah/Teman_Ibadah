import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Teman Ibadah — Daily Islamic Companion",
    short_name: "Teman Ibadah",
    description:
      "Aplikasi web companion ibadah harian Muslim: Al-Quran Reader, Jadwal & Panduan Shalat, Kumpulan Hadits, dan Dzikir Harian.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF9",
    theme_color: "#10B981",
    orientation: "portrait",
    categories: ["lifestyle", "education", "religion"],
    icons: [
      {
        src: "/icons/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    shortcuts: [
      {
        name: "Baca Al-Qur'an",
        short_name: "Al-Qur'an",
        description: "Membaca Al-Qur'an dan melanjutkan bacaan terakhir",
        url: "/quran",
        icons: [{ src: "/favicon.svg", sizes: "96x96" }],
      },
      {
        name: "Jadwal & Arah Kiblat",
        short_name: "Shalat",
        description: "Jadwal shalat otomatis dan penunjuk arah kiblat",
        url: "/shalat",
        icons: [{ src: "/favicon.svg", sizes: "96x96" }],
      },
      {
        name: "Dzikir & Doa Harian",
        short_name: "Dzikir",
        description: "Dzikir pagi petang & doa-doa harian",
        url: "/dzikir",
        icons: [{ src: "/favicon.svg", sizes: "96x96" }],
      },
      {
        name: "Target Khatam",
        short_name: "Khatam",
        description: "Rencana dan progres khatam Al-Qur'an",
        url: "/khatam",
        icons: [{ src: "/favicon.svg", sizes: "96x96" }],
      },
    ],
  };
}
