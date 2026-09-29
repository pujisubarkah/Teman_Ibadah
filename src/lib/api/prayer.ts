import { PrayerData, PrayerTimes } from "@/lib/types";

export interface CityOption {
  name: string;
  province?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const INDONESIAN_CITIES: CityOption[] = [
  // DKI Jakarta & Bodetabek
  { name: "Jakarta Pusat", province: "DKI Jakarta", country: "Indonesia", latitude: -6.1805, longitude: 106.8284, timezone: "Asia/Jakarta" },
  { name: "Jakarta Selatan", province: "DKI Jakarta", country: "Indonesia", latitude: -6.2615, longitude: 106.8106, timezone: "Asia/Jakarta" },
  { name: "Jakarta Timur", province: "DKI Jakarta", country: "Indonesia", latitude: -6.2250, longitude: 106.9004, timezone: "Asia/Jakarta" },
  { name: "Jakarta Barat", province: "DKI Jakarta", country: "Indonesia", latitude: -6.1683, longitude: 106.7589, timezone: "Asia/Jakarta" },
  { name: "Jakarta Utara", province: "DKI Jakarta", country: "Indonesia", latitude: -6.1384, longitude: 106.8640, timezone: "Asia/Jakarta" },
  { name: "Kepulauan Seribu", province: "DKI Jakarta", country: "Indonesia", latitude: -5.6122, longitude: 106.5615, timezone: "Asia/Jakarta" },
  { name: "Kota Bogor", province: "Jawa Barat", country: "Indonesia", latitude: -6.5971, longitude: 106.8060, timezone: "Asia/Jakarta" },
  { name: "Kab. Bogor (Cibinong)", province: "Jawa Barat", country: "Indonesia", latitude: -6.4816, longitude: 106.8538, timezone: "Asia/Jakarta" },
  { name: "Kota Depok", province: "Jawa Barat", country: "Indonesia", latitude: -6.4025, longitude: 106.7942, timezone: "Asia/Jakarta" },
  { name: "Kota Tangerang", province: "Banten", country: "Indonesia", latitude: -6.1783, longitude: 106.6319, timezone: "Asia/Jakarta" },
  { name: "Kota Tangerang Selatan", province: "Banten", country: "Indonesia", latitude: -6.2889, longitude: 106.7181, timezone: "Asia/Jakarta" },
  { name: "Kab. Tangerang (Tigaraksa)", province: "Banten", country: "Indonesia", latitude: -6.2570, longitude: 106.4839, timezone: "Asia/Jakarta" },
  { name: "Kota Bekasi", province: "Jawa Barat", country: "Indonesia", latitude: -6.2383, longitude: 106.9756, timezone: "Asia/Jakarta" },
  { name: "Kab. Bekasi (Cikarang)", province: "Jawa Barat", country: "Indonesia", latitude: -6.3644, longitude: 107.1725, timezone: "Asia/Jakarta" },

  // Jawa Barat & Banten
  { name: "Kota Bandung", province: "Jawa Barat", country: "Indonesia", latitude: -6.9175, longitude: 107.6191, timezone: "Asia/Jakarta" },
  { name: "Kab. Bandung (Soreang)", province: "Jawa Barat", country: "Indonesia", latitude: -7.0274, longitude: 107.5198, timezone: "Asia/Jakarta" },
  { name: "Kab. Bandung Barat (Ngamprah)", province: "Jawa Barat", country: "Indonesia", latitude: -6.8458, longitude: 107.4950, timezone: "Asia/Jakarta" },
  { name: "Kota Cimahi", province: "Jawa Barat", country: "Indonesia", latitude: -6.8723, longitude: 107.5420, timezone: "Asia/Jakarta" },
  { name: "Kota Cirebon", province: "Jawa Barat", country: "Indonesia", latitude: -6.7320, longitude: 108.5523, timezone: "Asia/Jakarta" },
  { name: "Kota Sukabumi", province: "Jawa Barat", country: "Indonesia", latitude: -6.9277, longitude: 106.9300, timezone: "Asia/Jakarta" },
  { name: "Kota Tasikmalaya", province: "Jawa Barat", country: "Indonesia", latitude: -7.3274, longitude: 108.2207, timezone: "Asia/Jakarta" },
  { name: "Kab. Garut", province: "Jawa Barat", country: "Indonesia", latitude: -7.2278, longitude: 107.9087, timezone: "Asia/Jakarta" },
  { name: "Kab. Karawang", province: "Jawa Barat", country: "Indonesia", latitude: -6.3073, longitude: 107.3019, timezone: "Asia/Jakarta" },
  { name: "Kota Serang", province: "Banten", country: "Indonesia", latitude: -6.1104, longitude: 106.1634, timezone: "Asia/Jakarta" },
  { name: "Kota Cilegon", province: "Banten", country: "Indonesia", latitude: -6.0174, longitude: 106.0538, timezone: "Asia/Jakarta" },

  // Jawa Tengah & D.I. Yogyakarta
  { name: "Kota Semarang", province: "Jawa Tengah", country: "Indonesia", latitude: -6.9667, longitude: 110.4167, timezone: "Asia/Jakarta" },
  { name: "Kota Surakarta (Solo)", province: "Jawa Tengah", country: "Indonesia", latitude: -7.5755, longitude: 110.8243, timezone: "Asia/Jakarta" },
  { name: "Kota Yogyakarta", province: "D.I. Yogyakarta", country: "Indonesia", latitude: -7.7956, longitude: 110.3695, timezone: "Asia/Jakarta" },
  { name: "Kab. Sleman", province: "D.I. Yogyakarta", country: "Indonesia", latitude: -7.7167, longitude: 110.3556, timezone: "Asia/Jakarta" },
  { name: "Kab. Bantul", province: "D.I. Yogyakarta", country: "Indonesia", latitude: -7.8897, longitude: 110.3289, timezone: "Asia/Jakarta" },
  { name: "Kab. Banyumas (Purwokerto)", province: "Jawa Tengah", country: "Indonesia", latitude: -7.4243, longitude: 109.2304, timezone: "Asia/Jakarta" },
  { name: "Kab. Cilacap", province: "Jawa Tengah", country: "Indonesia", latitude: -7.7181, longitude: 109.0159, timezone: "Asia/Jakarta" },
  { name: "Kota Magelang", province: "Jawa Tengah", country: "Indonesia", latitude: -7.4706, longitude: 110.2178, timezone: "Asia/Jakarta" },
  { name: "Kota Pekalongan", province: "Jawa Tengah", country: "Indonesia", latitude: -6.8886, longitude: 109.6753, timezone: "Asia/Jakarta" },
  { name: "Kota Tegal", province: "Jawa Tengah", country: "Indonesia", latitude: -6.8694, longitude: 109.1402, timezone: "Asia/Jakarta" },
  { name: "Kab. Kudus", province: "Jawa Tengah", country: "Indonesia", latitude: -6.8048, longitude: 110.8405, timezone: "Asia/Jakarta" },

  // Jawa Timur
  { name: "Kota Surabaya", province: "Jawa Timur", country: "Indonesia", latitude: -7.2575, longitude: 112.7521, timezone: "Asia/Jakarta" },
  { name: "Kota Malang", province: "Jawa Timur", country: "Indonesia", latitude: -7.9666, longitude: 112.6326, timezone: "Asia/Jakarta" },
  { name: "Kota Batu", province: "Jawa Timur", country: "Indonesia", latitude: -7.8671, longitude: 112.5239, timezone: "Asia/Jakarta" },
  { name: "Kab. Sidoarjo", province: "Jawa Timur", country: "Indonesia", latitude: -7.4478, longitude: 112.7183, timezone: "Asia/Jakarta" },
  { name: "Kab. Gresik", province: "Jawa Timur", country: "Indonesia", latitude: -7.1566, longitude: 112.6555, timezone: "Asia/Jakarta" },
  { name: "Kota Kediri", province: "Jawa Timur", country: "Indonesia", latitude: -7.8480, longitude: 112.0178, timezone: "Asia/Jakarta" },
  { name: "Kota Madiun", province: "Jawa Timur", country: "Indonesia", latitude: -7.6298, longitude: 111.5239, timezone: "Asia/Jakarta" },
  { name: "Kab. Jember", province: "Jawa Timur", country: "Indonesia", latitude: -8.1845, longitude: 113.6681, timezone: "Asia/Jakarta" },
  { name: "Kab. Banyuwangi", province: "Jawa Timur", country: "Indonesia", latitude: -8.2192, longitude: 114.3692, timezone: "Asia/Jakarta" },

  // Sumatera
  { name: "Kota Banda Aceh", province: "Aceh", country: "Indonesia", latitude: 5.5483, longitude: 95.3238, timezone: "Asia/Jakarta" },
  { name: "Kota Medan", province: "Sumatera Utara", country: "Indonesia", latitude: 3.5952, longitude: 98.6722, timezone: "Asia/Jakarta" },
  { name: "Kota Padang", province: "Sumatera Barat", country: "Indonesia", latitude: -0.9471, longitude: 100.4172, timezone: "Asia/Jakarta" },
  { name: "Kota Bukittinggi", province: "Sumatera Barat", country: "Indonesia", latitude: -0.3055, longitude: 100.3692, timezone: "Asia/Jakarta" },
  { name: "Kota Pekanbaru", province: "Riau", country: "Indonesia", latitude: 0.5071, longitude: 101.4478, timezone: "Asia/Jakarta" },
  { name: "Kota Batam", province: "Kepulauan Riau", country: "Indonesia", latitude: 1.1301, longitude: 104.0529, timezone: "Asia/Jakarta" },
  { name: "Kota Tanjung Pinang", province: "Kepulauan Riau", country: "Indonesia", latitude: 0.9167, longitude: 104.4500, timezone: "Asia/Jakarta" },
  { name: "Kota Jambi", province: "Jambi", country: "Indonesia", latitude: -1.6101, longitude: 103.6131, timezone: "Asia/Jakarta" },
  { name: "Kota Palembang", province: "Sumatera Selatan", country: "Indonesia", latitude: -2.9761, longitude: 104.7754, timezone: "Asia/Jakarta" },
  { name: "Kota Bengkulu", province: "Bengkulu", country: "Indonesia", latitude: -3.8004, longitude: 102.2655, timezone: "Asia/Jakarta" },
  { name: "Kota Bandar Lampung", province: "Lampung", country: "Indonesia", latitude: -5.4500, longitude: 105.2667, timezone: "Asia/Jakarta" },
  { name: "Kota Pangkal Pinang", province: "Bangka Belitung", country: "Indonesia", latitude: -2.1290, longitude: 106.1139, timezone: "Asia/Jakarta" },

  // Bali & Nusa Tenggara
  { name: "Kota Denpasar", province: "Bali", country: "Indonesia", latitude: -8.6705, longitude: 115.2126, timezone: "Asia/Makassar" },
  { name: "Kota Mataram (Lombok)", province: "Nusa Tenggara Barat", country: "Indonesia", latitude: -8.5833, longitude: 116.1167, timezone: "Asia/Makassar" },
  { name: "Kota Bima", province: "Nusa Tenggara Barat", country: "Indonesia", latitude: -8.4533, longitude: 118.7278, timezone: "Asia/Makassar" },
  { name: "Kota Kupang", province: "Nusa Tenggara Timur", country: "Indonesia", latitude: -10.1772, longitude: 123.607, timezone: "Asia/Makassar" },
  { name: "Labuan Bajo", province: "Nusa Tenggara Timur", country: "Indonesia", latitude: -8.4964, longitude: 119.8877, timezone: "Asia/Makassar" },

  // Kalimantan
  { name: "Kota Pontianak", province: "Kalimantan Barat", country: "Indonesia", latitude: -0.0263, longitude: 109.3425, timezone: "Asia/Pontianak" },
  { name: "Kota Palangkaraya", province: "Kalimantan Tengah", country: "Indonesia", latitude: -2.2161, longitude: 113.9139, timezone: "Asia/Pontianak" },
  { name: "Kota Banjarmasin", province: "Kalimantan Selatan", country: "Indonesia", latitude: -3.3194, longitude: 114.5908, timezone: "Asia/Makassar" },
  { name: "Kota Banjarbaru", province: "Kalimantan Selatan", country: "Indonesia", latitude: -3.4572, longitude: 114.8103, timezone: "Asia/Makassar" },
  { name: "Kota Samarinda", province: "Kalimantan Timur", country: "Indonesia", latitude: -0.5021, longitude: 117.1537, timezone: "Asia/Makassar" },
  { name: "Kota Balikpapan", province: "Kalimantan Timur", country: "Indonesia", latitude: -1.2379, longitude: 116.8289, timezone: "Asia/Makassar" },
  { name: "Kota Tarakan", province: "Kalimantan Utara", country: "Indonesia", latitude: 3.3273, longitude: 117.5785, timezone: "Asia/Makassar" },
  { name: "IKN Nusantara (Sepaku)", province: "Kalimantan Timur", country: "Indonesia", latitude: -0.9634, longitude: 116.7118, timezone: "Asia/Makassar" },

  // Sulawesi
  { name: "Kota Makassar", province: "Sulawesi Selatan", country: "Indonesia", latitude: -5.1477, longitude: 119.4327, timezone: "Asia/Makassar" },
  { name: "Kota Manado", province: "Sulawesi Utara", country: "Indonesia", latitude: 1.4748, longitude: 124.8421, timezone: "Asia/Makassar" },
  { name: "Kota Palu", province: "Sulawesi Tengah", country: "Indonesia", latitude: -0.9003, longitude: 119.8779, timezone: "Asia/Makassar" },
  { name: "Kota Kendari", province: "Sulawesi Tenggara", country: "Indonesia", latitude: -3.9985, longitude: 122.5126, timezone: "Asia/Makassar" },
  { name: "Kota Gorontalo", province: "Gorontalo", country: "Indonesia", latitude: 0.5435, longitude: 123.0568, timezone: "Asia/Makassar" },
  { name: "Kota Mamuju", province: "Sulawesi Barat", country: "Indonesia", latitude: -2.6772, longitude: 118.8872, timezone: "Asia/Makassar" },

  // Maluku & Papua
  { name: "Kota Ambon", province: "Maluku", country: "Indonesia", latitude: -3.6547, longitude: 128.1906, timezone: "Asia/Jayapura" },
  { name: "Kota Ternate", province: "Maluku Utara", country: "Indonesia", latitude: 0.7904, longitude: 127.3820, timezone: "Asia/Jayapura" },
  { name: "Kota Jayapura", province: "Papua", country: "Indonesia", latitude: -2.5916, longitude: 140.669, timezone: "Asia/Jayapura" },
  { name: "Kota Sorong", province: "Papua Barat Daya", country: "Indonesia", latitude: -0.8762, longitude: 131.2558, timezone: "Asia/Jayapura" },
  { name: "Kota Manokwari", province: "Papua Barat", country: "Indonesia", latitude: -0.8615, longitude: 134.0620, timezone: "Asia/Jayapura" },
  { name: "Kota Merauke", province: "Papua Selatan", country: "Indonesia", latitude: -8.4991, longitude: 140.4011, timezone: "Asia/Jayapura" },
  { name: "Kota Timika", province: "Papua Tengah", country: "Indonesia", latitude: -4.5467, longitude: 136.8837, timezone: "Asia/Jayapura" },

  // Tanah Suci & Internasional
  { name: "Makkah Al-Mukarramah", province: "Makkah", country: "Saudi Arabia", latitude: 21.4225, longitude: 39.8262, timezone: "Asia/Riyadh" },
  { name: "Madinah Al-Munawwarah", province: "Madinah", country: "Saudi Arabia", latitude: 24.4672, longitude: 39.6111, timezone: "Asia/Riyadh" },
  { name: "Kuala Lumpur", province: "Wilayah Persekutuan", country: "Malaysia", latitude: 3.1390, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur" },
  { name: "Singapura", province: "Singapore", country: "Singapore", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
];

export const HIJRI_MONTHS_ID: Record<number, string> = {
  1: "Muharram",
  2: "Safar",
  3: "Rabi'ul Awwal",
  4: "Rabi'ul Akhir",
  5: "Jumadil Awwal",
  6: "Jumadil Akhir",
  7: "Rajab",
  8: "Sya'ban",
  9: "Ramadhan",
  10: "Syawal",
  11: "Dzulqa'dah",
  12: "Dzulhijjah",
};

export const INDONESIAN_DAYS = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
export const INDONESIAN_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

/**
 * Format date to standard Indonesian Gregorian representation (e.g. "Ahad, 27 September 2026")
 */
export function formatIndonesianGregorian(date: Date = new Date()): string {
  const dayName = INDONESIAN_DAYS[date.getDay()];
  const dayNum = date.getDate();
  const monthName = INDONESIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

/**
 * Format Hijri date with standard Indonesian terms (e.g. "15 Rabi'ul Awwal 1448 H")
 */
export function formatIndonesianHijri(hijri: { day: string | number; month: { number: number; en?: string }; year: string | number }): string {
  if (!hijri) return "";
  const monthNumber = Number(hijri.month?.number) || 1;
  const monthName = HIJRI_MONTHS_ID[monthNumber] || hijri.month?.en || "Hijriyah";
  return `${hijri.day} ${monthName} ${hijri.year} H`;
}

/**
 * Reverse geocodes coordinates to get the human-readable city/district name in Indonesia.
 */
export async function reverseGeocodeCoords(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=id`,
      { cache: "force-cache" }
    );
    if (res.ok) {
      const json = await res.json();
      const city = json.city || json.locality || json.principalSubdivision;
      const province = json.principalSubdivision;
      if (city && province && !city.includes(province)) {
        return `${city}, ${province}`;
      }
      if (city) return city;
    }
  } catch (err) {
    console.warn("Reverse geocode bigdatacloud failed, trying fallback:", err);
  }

  // Fallback: calculate nearest city from our list
  let nearestCity = "Lokasi Saya";
  let minDistance = Infinity;

  for (const c of INDONESIAN_CITIES) {
    const dLat = c.latitude - lat;
    const dLng = c.longitude - lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = c.province ? `${c.name}, ${c.province}` : c.name;
    }
  }

  return nearestCity;
}

export function getCityTimezone(cityName: string): string {
  const clean = cityName.toLowerCase();
  const city = INDONESIAN_CITIES.find(
    (c) => clean.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(clean)
  );
  return city?.timezone || "Asia/Jakarta";
}

export function getCurrentDateFormatted(timezone: string = "Asia/Jakarta"): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatter.format(now).replace(/\//g, "-");
  } catch {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, "0");
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const y = now.getFullYear();
    return `${d}-${m}-${y}`;
  }
}

export async function getPrayerTimesByCity(
  city: string = "Jakarta",
  country: string = "Indonesia"
): Promise<PrayerData> {
  try {
    const timezone = getCityTimezone(city);
    const dateStr = getCurrentDateFormatted(timezone);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=20`,
      { next: { revalidate: 1800 }, signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Gagal mengambil jadwal shalat");
    const data = await res.json();
    if (data.data && !data.data.meta.timezone) {
      data.data.meta.timezone = timezone;
    }
    return data.data;
  } catch {
    return getFallbackPrayerData(city);
  }
}

export async function getPrayerTimesByCoords(
  lat: number,
  lng: number
): Promise<PrayerData> {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=20`,
      { next: { revalidate: 1800 }, signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Gagal mengambil jadwal shalat koordinat");
    const data = await res.json();
    return data.data;
  } catch {
    return getFallbackPrayerData("Lokasi Anda");
  }
}

export function calculateQiblaDirection(latitude: number, longitude: number): number {
  const kaabaLat = 21.4225 * (Math.PI / 180);
  const kaabaLng = 39.8262 * (Math.PI / 180);

  const userLat = latitude * (Math.PI / 180);
  const userLng = longitude * (Math.PI / 180);

  const dLng = kaabaLng - userLng;

  const y = Math.sin(dLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLng);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;

  return (qiblaDeg + 360) % 360;
}

export interface NextPrayerInfo {
  name: string;
  time: string;
  timeRemaining: string;
  isToday: boolean;
  progressPercent: number;
}

export function getCurrentMinutesInTimezone(timezone: string = "Asia/Jakarta"): number {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const second = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);
    return hour * 60 + minute + second / 60;
  } catch {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  }
}

export function getNextPrayer(
  timings: PrayerTimes,
  timezone: string = "Asia/Jakarta"
): NextPrayerInfo {
  const prayers = [
    { name: "Subuh", key: "Fajr" },
    { name: "Dzuhur", key: "Dhuhr" },
    { name: "Ashar", key: "Asr" },
    { name: "Maghrib", key: "Maghrib" },
    { name: "Isya", key: "Isha" },
  ];

  const currentMinutes = getCurrentMinutesInTimezone(timezone);

  const parsedPrayers = prayers.map((p) => {
    const rawTime = timings[p.key] || "00:00";
    const cleanTime = rawTime.split(" ")[0]; // clean possible (WIB) suffix
    const [h, m] = cleanTime.split(":").map(Number);
    const minutes = (h || 0) * 60 + (m || 0);
    return { ...p, minutes, timeString: cleanTime };
  });

  // Find next prayer today
  let next = parsedPrayers.find((p) => p.minutes > currentMinutes);
  let prev = parsedPrayers[parsedPrayers.length - 1];

  let diffMinutes = 0;
  let isToday = true;

  if (next) {
    const nextIdx = parsedPrayers.indexOf(next);
    prev =
      nextIdx > 0
        ? parsedPrayers[nextIdx - 1]
        : {
            ...parsedPrayers[parsedPrayers.length - 1],
            minutes: parsedPrayers[parsedPrayers.length - 1].minutes - 24 * 60,
          };
    diffMinutes = next.minutes - currentMinutes;
  } else {
    // Next prayer is Fajr tomorrow
    next = { ...parsedPrayers[0], minutes: parsedPrayers[0].minutes + 24 * 60 };
    prev = parsedPrayers[parsedPrayers.length - 1];
    diffMinutes = next.minutes - currentMinutes;
    isToday = false;
  }

  const hours = Math.floor(diffMinutes / 60);
  const mins = Math.floor(diffMinutes % 60);
  const secs = Math.floor((diffMinutes * 60) % 60);

  const timeRemaining = `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  const totalWindow = next.minutes - prev.minutes;
  const elapsed = currentMinutes - prev.minutes;
  const progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / totalWindow) * 100)));

  return {
    name: next.name,
    time: next.timeString,
    timeRemaining,
    isToday,
    progressPercent: isNaN(progressPercent) ? 50 : progressPercent,
  };
}

function getFallbackPrayerData(city: string): PrayerData {
  const tz = getCityTimezone(city);
  return {
    timings: {
      Fajr: "04:35",
      Sunrise: "05:48",
      Dhuhr: "11:55",
      Asr: "15:08",
      Sunset: "18:01",
      Maghrib: "18:01",
      Isha: "19:10",
      Imsak: "04:25",
      Midnight: "23:55",
    },
    date: {
      readable: "27 Sep 2026",
      timestamp: "1790510400",
      gregorian: {
        date: "27-09-2026",
        format: "DD-MM-YYYY",
        day: "27",
        weekday: { en: "Sunday" },
        month: { number: 9, en: "September" },
        year: "2026",
      },
      hijri: {
        date: "15-03-1448",
        format: "DD-MM-YYYY",
        day: "15",
        weekday: { en: "Al Ahad", ar: "الأحد" },
        month: { number: 3, en: "Rabiul Awwal", ar: "رَبيع الأول", days: 30 },
        year: "1448",
        designation: { abbreviated: "H", expanded: "Hijriyah" },
      },
    },
    meta: {
      latitude: -6.2088,
      longitude: 106.8456,
      timezone: tz,
      method: { id: 20, name: "Kementerian Agama Republik Indonesia" },
    },
  };
}
