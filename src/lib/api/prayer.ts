import { PrayerData, PrayerTimes } from "@/lib/types";

export interface CityOption {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export const INDONESIAN_CITIES: CityOption[] = [
  { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta" },
  { name: "Surabaya", country: "Indonesia", latitude: -7.2575, longitude: 112.7521, timezone: "Asia/Jakarta" },
  { name: "Bandung", country: "Indonesia", latitude: -6.9175, longitude: 107.6191, timezone: "Asia/Jakarta" },
  { name: "Medan", country: "Indonesia", latitude: 3.5952, longitude: 98.6722, timezone: "Asia/Jakarta" },
  { name: "Semarang", country: "Indonesia", latitude: -6.9667, longitude: 110.4167, timezone: "Asia/Jakarta" },
  { name: "Makassar", country: "Indonesia", latitude: -5.1477, longitude: 119.4327, timezone: "Asia/Makassar" },
  { name: "Palembang", country: "Indonesia", latitude: -2.9761, longitude: 104.7754, timezone: "Asia/Jakarta" },
  { name: "Yogyakarta", country: "Indonesia", latitude: -7.7956, longitude: 110.3695, timezone: "Asia/Jakarta" },
  { name: "Denpasar (Bali)", country: "Indonesia", latitude: -8.6705, longitude: 115.2126, timezone: "Asia/Makassar" },
  { name: "Banda Aceh", country: "Indonesia", latitude: 5.5483, longitude: 95.3238, timezone: "Asia/Jakarta" },
  { name: "Padang", country: "Indonesia", latitude: -0.9471, longitude: 100.4172, timezone: "Asia/Jakarta" },
  { name: "Pekanbaru", country: "Indonesia", latitude: 0.5071, longitude: 101.4478, timezone: "Asia/Jakarta" },
  { name: "Banjarmasin", country: "Indonesia", latitude: -3.3194, longitude: 114.5908, timezone: "Asia/Makassar" },
  { name: "Pontianak", country: "Indonesia", latitude: -0.0263, longitude: 109.3425, timezone: "Asia/Pontianak" },
  { name: "Samarinda", country: "Indonesia", latitude: -0.5021, longitude: 117.1537, timezone: "Asia/Makassar" },
  { name: "Balikpapan", country: "Indonesia", latitude: -1.2379, longitude: 116.8289, timezone: "Asia/Makassar" },
  { name: "Manado", country: "Indonesia", latitude: 1.4748, longitude: 124.8421, timezone: "Asia/Makassar" },
  { name: "Mataram (Lombok)", country: "Indonesia", latitude: -8.5833, longitude: 116.1167, timezone: "Asia/Makassar" },
  { name: "Kupang", country: "Indonesia", latitude: -10.1772, longitude: 123.607, timezone: "Asia/Makassar" },
  { name: "Ambon", country: "Indonesia", latitude: -3.6547, longitude: 128.1906, timezone: "Asia/Jayapura" },
  { name: "Jayapura", country: "Indonesia", latitude: -2.5916, longitude: 140.669, timezone: "Asia/Jayapura" },
  { name: "Makkah", country: "Saudi Arabia", latitude: 21.4225, longitude: 39.8262, timezone: "Asia/Riyadh" },
  { name: "Madinah", country: "Saudi Arabia", latitude: 24.4672, longitude: 39.6111, timezone: "Asia/Riyadh" },
];

export function getCityTimezone(cityName: string): string {
  const city = INDONESIAN_CITIES.find(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
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
    // returns DD/MM/YYYY -> convert to DD-MM-YYYY
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
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=20`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) throw new Error("Gagal mengambil jadwal shalat");
    const data = await res.json();
    if (data.data && !data.data.meta.timezone) {
      data.data.meta.timezone = timezone;
    }
    return data.data;
  } catch (error) {
    console.error("Prayer times fetch error:", error);
    return getFallbackPrayerData(city);
  }
}

export async function getPrayerTimesByCoords(
  lat: number,
  lng: number
): Promise<PrayerData> {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const res = await fetch(
      `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=20`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) throw new Error("Gagal mengambil jadwal shalat koordinat");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Prayer times coords fetch error:", error);
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
      readable: "26 Sep 2026",
      timestamp: "1790424000",
      gregorian: {
        date: "26-09-2026",
        format: "DD-MM-YYYY",
        day: "26",
        weekday: { en: "Saturday" },
        month: { number: 9, en: "September" },
        year: "2026",
      },
      hijri: {
        date: "15-04-1448",
        format: "DD-MM-YYYY",
        day: "15",
        weekday: { en: "Al Sabt", ar: "السبت" },
        month: { number: 4, en: "Rabiul Akhir", ar: "رَبيع الثاني", days: 30 },
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
