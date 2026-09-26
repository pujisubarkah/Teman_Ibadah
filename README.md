# Teman_Ibadah (QuranTrack) — Islamic Daily Companion

Aplikasi web companion ibadah harian Muslim modern berbasis Next.js 14+ (App Router), TypeScript, dan Tailwind CSS.

---

## 🌟 Fitur Utama

### 1. 📖 Al-Quran Reader & Khatam Tracker
- **114 Surah Lengkap**: Teks Arab dengan font [Amiri](https://fonts.google.com/specimen/Amiri) (ukuran font dapat disesuaikan 24–36px) dan terjemahan resmi Bahasa Indonesia.
- **Murottal Audio Per Ayat**: Audio berkualitas dari Syekh Misyari Rasyid Al-Afasy (`cdn.islamic.network`) dengan pemutar audio bar mengambang (*floating player*), kontrol kecepatan (0.75x–2x), putar berkelanjutan (*continuous play*), dan *live seekbar*.
- **Khatam Tracker & Checklist**: Atur target waktu khatam (30, 60, 90, 120 hari), checklist surah yang sudah dibaca, dan efek perayaan (*confetti*).
- **Bookmark & Riwayat Terakhir Dibaca**: Simpan ayat favorit dan lanjutkan tilawah secara instan.

### 2. 🕌 Shalat Guide & Jadwal Shalat
- **Jadwal Waktu Shalat Akurat**: Integrasi API jadwal shalat standar Kemenag RI dengan pilihan kota-kota di Indonesia dan deteksi lokasi GPS.
- **Countdown Real-time**: Hitung mundur langsung menuju waktu shalat berikutnya (Subuh, Dzuhur, Ashar, Maghrib, Isya, Imsak, Terbit).
- **Penanggalan Hijriyah**: Kalender Hijriyah otomatis diperbarui setiap hari.
- **Kompas Arah Kiblat**: Perhitungan sudut derajat kiblat ke Ka'bah (Makkah) dari lokasi pengguna.
- **Panduan Shalat Lengkap**: Niat shalat 5 waktu & sunnah, tata cara rukun gerakan 1–9, doa qunut subuh, dan dzikir/wirid ba'da shalat.
- **Check-in Shalat Harian**: Checklist 5 waktu shalat harian beserta penghitung *streak* keistiqamahan ibadah.

### 3. 📚 Kumpulan Hadits Shahih
- **9 Kitab Hadits Utama**: Shahih Bukhari, Shahih Muslim, Sunan Abu Dawud, Sunan At-Tirmidzi, Sunan An-Nasa'i, Sunan Ibnu Majah, Musnad Ahmad, Muwatha' Malik, dan Sunan Ad-Darimi.
- **40 Hadits Arbain An-Nawawiyah**: Lengkap dengan tema, perawi, teks Arab, dan terjemahan.
- **Pencarian Hadits**: Cari hadits berdasarkan kata kunci atau nomor hadits.
- **Hadits Pilihan Hari Ini (*Hadith of the Day*)**: Hadits harian inspiratif di beranda dengan fitur salin cepat (*copy to clipboard*).

### 4. 📿 Dzikir, Doa Harian & Tasbih Digital
- **Dzikir Pagi & Petang (Al-Matsurat)**: Bacaan dzikir sunnah lengkap dengan anjuran pengulangan.
- **Kumpulan Doa Sehari-hari**: Doa bangun tidur, makan, keluar rumah, orang tua, kebaikan dunia-akhirat, dan penenang hati.
- **99 Asmaul Husna**: Daftar nama-nama indah Allah beserta arti dan pelafalannya.
- **Tasbih Digital Interaktif**: Tombol hitung sentuh besar dengan *haptic vibration*, preset target (33x, 99x, 100x), dan penghitung putaran.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Inter (UI) + Amiri (Arab)
- **Audio & Animations:** HTML5 Audio API + Canvas Confetti
- **Deployment:** Vercel-ready

---

## 🚀 Memulai Proyek Lokal

1. Clone repositori:
```bash
git clone https://github.com/pujisubarkah/Teman_Ibadah.git
cd Teman_Ibadah
```

2. Install dependensi:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka di browser:
```
http://localhost:3000
```

---

## 📄 Lisensi
Dibuat untuk memudahkan ibadah harian kaum muslimin. Bebas digunakan dan dikembangkan untuk kebaikan umat.
