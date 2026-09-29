import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalAudioPlayer from "@/components/audio/GlobalAudioPlayer";
import PWAInstaller from "@/components/layout/PWAInstaller";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981",
};

export const metadata: Metadata = {
  title: "Teman Ibadah — Islamic Daily Companion",
  description: "Aplikasi web companion ibadah harian Muslim: Al-Quran Reader, Jadwal & Panduan Shalat, Kumpulan Hadits, dan Dzikir Harian.",
  keywords: ["Quran", "Al-Quran", "Jadwal Shalat", "Hadits", "Dzikir", "Khatam Tracker", "Teman Ibadah", "PWA"],
  authors: [{ name: "Teman Ibadah" }],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Teman Ibadah",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icons/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${amiri.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-stone-50 text-slate-700 antialiased selection:bg-emerald-100 selection:text-emerald-800">
        <AudioProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            {children}
          </main>
          <GlobalAudioPlayer />
          <PWAInstaller />
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
}
