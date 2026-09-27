"use client";

import React, { useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  Navigation, 
  CheckCircle2, 
  Circle,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  CloudSun,
  Calendar,
  Search,
  X,
  Loader2,
  RefreshCw
} from "lucide-react";
import { PrayerData } from "@/lib/types";
import { 
  INDONESIAN_CITIES, 
  CityOption,
  getPrayerTimesByCity, 
  getPrayerTimesByCoords, 
  getNextPrayer,
  getCityTimezone,
  formatIndonesianGregorian,
  formatIndonesianHijri,
  reverseGeocodeCoords
} from "@/lib/api/prayer";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

interface PrayerTimesCardProps {
  initialData: PrayerData;
}

export default function PrayerTimesCard({ initialData }: PrayerTimesCardProps) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<PrayerData>(initialData);
  const [selectedCity, setSelectedCity] = useState("Jakarta Pusat");
  const [isGpsMode, setIsGpsMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [searchCityQuery, setSearchCityQuery] = useState("");
  
  const [nextInfo, setNextInfo] = useState(() =>
    getNextPrayer(initialData.timings, initialData.meta.timezone || "Asia/Jakarta")
  );
  const { prayerChecklist, togglePrayerStatus } = useQuranStore();

  // Load saved location or attempt auto-detect on mount
  useEffect(() => {
    setMounted(true);

    try {
      const savedLoc = localStorage.getItem("teman_ibadah_prayer_loc");
      if (savedLoc) {
        const parsed = JSON.parse(savedLoc);
        if (parsed.lat && parsed.lng) {
          setSelectedCity(parsed.cityName || "Lokasi Saya");
          setIsGpsMode(Boolean(parsed.isGPS));
          getPrayerTimesByCoords(parsed.lat, parsed.lng).then((res) => {
            if (res) {
              setData(res);
              setNextInfo(getNextPrayer(res.timings, res.meta?.timezone || "Asia/Jakarta"));
            }
          });
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // If no saved location, automatically attempt geolocation smoothly
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            setLoading(true);
            const [prayerRes, cityName] = await Promise.all([
              getPrayerTimesByCoords(lat, lng),
              reverseGeocodeCoords(lat, lng),
            ]);

            if (prayerRes) {
              setData(prayerRes);
              setSelectedCity(cityName);
              setIsGpsMode(true);
              setNextInfo(getNextPrayer(prayerRes.timings, prayerRes.meta?.timezone || "Asia/Jakarta"));
              localStorage.setItem(
                "teman_ibadah_prayer_loc",
                JSON.stringify({ cityName, lat, lng, isGPS: true })
              );
            }
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          // If permission denied or unavailable, stay on default
          console.log("GPS auto-detect skipped:", err.message);
        },
        { timeout: 8000 }
      );
    }
  }, []);

  // Real-time interval for countdown
  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      if (data?.timings) {
        const tz = data.meta?.timezone || getCityTimezone(selectedCity);
        setNextInfo(getNextPrayer(data.timings, tz));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [mounted, data, selectedCity]);

  // Handle manual GPS button click
  const handleDetectGPS = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const [prayerRes, cityName] = await Promise.all([
              getPrayerTimesByCoords(lat, lng),
              reverseGeocodeCoords(lat, lng),
            ]);

            if (prayerRes) {
              setData(prayerRes);
              setSelectedCity(cityName);
              setIsGpsMode(true);
              setNextInfo(getNextPrayer(prayerRes.timings, prayerRes.meta?.timezone || "Asia/Jakarta"));
              localStorage.setItem(
                "teman_ibadah_prayer_loc",
                JSON.stringify({ cityName, lat, lng, isGPS: true })
              );
            }
          } catch (e) {
            console.error(e);
            alert("Gagal memuat jadwal untuk koordinat GPS.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          alert("Izin GPS tidak diberikan atau GPS belum aktif. Silakan pilih kota secara manual.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Browser Anda tidak mendukung deteksi lokasi otomatis.");
    }
  };

  // Handle city selection from modal/search
  const handleSelectCity = async (city: CityOption) => {
    setShowCityModal(false);
    setSelectedCity(city.province ? `${city.name}, ${city.province}` : city.name);
    setIsGpsMode(false);
    setLoading(true);
    try {
      const res = await getPrayerTimesByCoords(city.latitude, city.longitude);
      setData(res);
      setNextInfo(getNextPrayer(res.timings, city.timezone));
      localStorage.setItem(
        "teman_ibadah_prayer_loc",
        JSON.stringify({
          cityName: city.province ? `${city.name}, ${city.province}` : city.name,
          lat: city.latitude,
          lng: city.longitude,
          isGPS: false,
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = INDONESIAN_CITIES.filter((c) => {
    if (!searchCityQuery) return true;
    const q = searchCityQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.province && c.province.toLowerCase().includes(q))
    );
  });

  const prayers = [
    { key: "Imsak", label: "Imsak", time: data.timings.Imsak, icon: Sunrise, isFardhu: false },
    { key: "Fajr", label: "Subuh", time: data.timings.Fajr, icon: Sunrise, isFardhu: true, checkKey: "fajr" },
    { key: "Sunrise", label: "Terbit", time: data.timings.Sunrise, icon: Sun, isFardhu: false },
    { key: "Dhuhr", label: "Dzuhur", time: data.timings.Dhuhr, icon: CloudSun, isFardhu: true, checkKey: "dhuhr" },
    { key: "Asr", label: "Ashar", time: data.timings.Asr, icon: Sun, isFardhu: true, checkKey: "asr" },
    { key: "Maghrib", label: "Maghrib", time: data.timings.Maghrib, icon: Sunset, isFardhu: true, checkKey: "maghrib" },
    { key: "Isha", label: "Isya", time: data.timings.Isha, icon: Moon, isFardhu: true, checkKey: "isha" },
  ];

  const masehiDateStr = formatIndonesianGregorian(new Date());
  const hijriDateStr = formatIndonesianHijri(data.date.hijri);

  return (
    <div className="space-y-6">
      {/* Prayer Times Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        {/* Header with Prominent Hijri & Gregorian Dates */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-stone-100">
          <div className="space-y-2">
            {/* Dual Calendar Badge: Hijriah & Masehi */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1 rounded-full text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>🌙 {hijriDateStr || "15 Rabi'ul Awwal 1448 H"}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-stone-100 text-slate-700 border border-stone-200 px-3 py-1 rounded-full text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>🗓️ {masehiDateStr}</span>
              </div>
            </div>

            {/* City Title & Auto GPS status */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Jadwal Shalat {selectedCity}
                </h3>
                {isGpsMode && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                    <Navigation className="w-3 h-3 text-teal-600" />
                    Otomatis GPS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Zona: {data.meta?.timezone || "Asia/Jakarta"} • Kemenag Republik Indonesia</span>
              </p>
            </div>
          </div>

          {/* Location Actions: GPS & Change City */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleDetectGPS}
              disabled={loading}
              className="px-3.5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
              title="Deteksi Lokasi GPS Otomatis"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Navigation className="w-4 h-4 text-emerald-300" />
              )}
              <span>{loading ? "Mendeteksi..." : "Lokasi GPS"}</span>
            </button>

            <button
              onClick={() => setShowCityModal(true)}
              disabled={loading}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-200 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Pilih Kota / Kabupaten Manual"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Ganti Kota</span>
            </button>
          </div>
        </div>

        {/* Live Next Prayer Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-emerald-950 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-teal-700/40" suppressHydrationWarning>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-white border border-white/15">
              <Clock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                  Waktu Shalat Berikutnya:
                </span>
                <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs" suppressHydrationWarning>
                  {nextInfo.name} ({nextInfo.time})
                </span>
              </div>
              <p className="text-2xl font-bold font-mono text-white mt-1" suppressHydrationWarning>
                {mounted ? `${nextInfo.timeRemaining} lagi` : "Memuat waktu..."}
              </p>
            </div>
          </div>
          <div className="text-xs text-teal-100 bg-black/20 px-3.5 py-2 rounded-xl self-start sm:self-auto border border-white/10" suppressHydrationWarning>
            Metode: {data.meta?.method?.name || "Kemenag RI"}
          </div>
        </div>

        {/* 7 Prayer Times Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {prayers.map((p) => {
            const Icon = p.icon;
            const isNext = p.label === nextInfo.name;
            const checkVal = mounted && p.checkKey ? prayerChecklist[p.checkKey as keyof typeof prayerChecklist] : false;

            return (
              <div
                key={p.key}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 text-center relative",
                  isNext
                    ? "bg-teal-50/80 border-teal-400 shadow-md ring-1 ring-teal-400"
                    : "bg-stone-50 border-stone-200/70 hover:bg-stone-100"
                )}
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon className={cn("w-4 h-4", isNext ? "text-teal-700" : "text-slate-400")} />
                  {isNext && (
                    <span className="text-[10px] uppercase font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                      Berikutnya
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-800">{p.label}</h4>
                  <p className="text-lg sm:text-xl font-bold font-mono text-teal-800 mt-1">
                    {p.time}
                  </p>
                </div>

                {p.checkKey ? (
                  <button
                    onClick={() => togglePrayerStatus(p.checkKey as any)}
                    className={cn(
                      "mt-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer",
                      checkVal
                        ? "bg-teal-700 text-white"
                        : "bg-stone-200/80 hover:bg-stone-300 text-slate-600"
                    )}
                  >
                    {checkVal ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                    <span>{checkVal ? "Sudah" : "Check-in"}</span>
                  </button>
                ) : (
                  <div className="text-[10px] text-slate-400 py-1.5">Info Waktu</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Pilih Kota & Wilayah Se-Indonesia */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-700" />
                <h4 className="font-bold text-base text-slate-800">
                  Pilih Kota / Kabupaten
                </h4>
              </div>
              <button
                onClick={() => setShowCityModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ketik nama kota, kabupaten atau provinsi..."
                value={searchCityQuery}
                onChange={(e) => setSearchCityQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-slate-800"
              />
            </div>

            {/* GPS Quick Action in Modal */}
            <button
              onClick={() => {
                setShowCityModal(false);
                handleDetectGPS();
              }}
              className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-teal-200 transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-teal-600" />
              <span>Gunakan GPS Otomatis (Lokasi Saat Ini)</span>
            </button>

            {/* City List */}
            <div className="overflow-y-auto space-y-1 pr-1 flex-1 max-h-96">
              {filteredCities.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Kota tidak ditemukan. Coba ketik nama provinsi atau gunakan tombol GPS.
                </div>
              ) : (
                filteredCities.map((city) => {
                  const isCurrent = selectedCity.toLowerCase().includes(city.name.toLowerCase());
                  return (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city)}
                      className={cn(
                        "w-full text-left px-4 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer",
                        isCurrent
                          ? "bg-teal-700 text-white font-bold"
                          : "hover:bg-stone-100 text-slate-700 font-medium"
                      )}
                    >
                      <div>
                        <span>{city.name}</span>
                        {city.province && (
                          <span className={cn("text-[10px] ml-1.5", isCurrent ? "text-teal-200" : "text-slate-400")}>
                            • {city.province}
                          </span>
                        )}
                      </div>
                      <span className={cn("text-[10px]", isCurrent ? "text-teal-200" : "text-slate-400")}>
                        {city.timezone.replace("Asia/", "")}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
