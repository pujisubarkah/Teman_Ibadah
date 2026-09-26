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
  CloudSun
} from "lucide-react";
import { PrayerData } from "@/lib/types";
import { 
  INDONESIAN_CITIES, 
  getPrayerTimesByCity, 
  getPrayerTimesByCoords, 
  getNextPrayer,
  getCityTimezone 
} from "@/lib/api/prayer";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { cn } from "@/lib/utils";

interface PrayerTimesCardProps {
  initialData: PrayerData;
}

export default function PrayerTimesCard({ initialData }: PrayerTimesCardProps) {
  const [data, setData] = useState<PrayerData>(initialData);
  const [selectedCity, setSelectedCity] = useState("Jakarta");
  const [loading, setLoading] = useState(false);
  const [nextInfo, setNextInfo] = useState(() =>
    getNextPrayer(initialData.timings, initialData.meta.timezone || "Asia/Jakarta")
  );
  const { prayerChecklist, togglePrayerStatus } = useQuranStore();

  // Client-side refresh on mount to sync with user's client time
  useEffect(() => {
    let isMounted = true;
    const tz = getCityTimezone(selectedCity);
    getPrayerTimesByCity(selectedCity).then((res) => {
      if (isMounted && res) {
        setData(res);
        setNextInfo(getNextPrayer(res.timings, res.meta.timezone || tz));
      }
    }).catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (data?.timings) {
        const tz = data.meta?.timezone || getCityTimezone(selectedCity);
        setNextInfo(getNextPrayer(data.timings, tz));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [data, selectedCity]);

  const handleCitySelect = async (cityName: string) => {
    setSelectedCity(cityName);
    setLoading(true);
    try {
      const res = await getPrayerTimesByCity(cityName);
      setData(res);
      const tz = res.meta?.timezone || getCityTimezone(cityName);
      setNextInfo(getNextPrayer(res.timings, tz));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await getPrayerTimesByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setData(res);
            setSelectedCity("Lokasi Saya (GPS)");
            setNextInfo(getNextPrayer(res.timings, res.meta?.timezone || "Asia/Jakarta"));
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          alert("Tidak dapat mengakses GPS. Menggunakan kota default.");
          setLoading(false);
        }
      );
    }
  };

  const prayers = [
    { key: "Imsak", label: "Imsak", time: data.timings.Imsak, icon: Sunrise, isFardhu: false },
    { key: "Fajr", label: "Subuh", time: data.timings.Fajr, icon: Sunrise, isFardhu: true, checkKey: "fajr" },
    { key: "Sunrise", label: "Terbit", time: data.timings.Sunrise, icon: Sun, isFardhu: false },
    { key: "Dhuhr", label: "Dzuhur", time: data.timings.Dhuhr, icon: CloudSun, isFardhu: true, checkKey: "dhuhr" },
    { key: "Asr", label: "Ashar", time: data.timings.Asr, icon: Sun, isFardhu: true, checkKey: "asr" },
    { key: "Maghrib", label: "Maghrib", time: data.timings.Maghrib, icon: Sunset, isFardhu: true, checkKey: "maghrib" },
    { key: "Isha", label: "Isya", time: data.timings.Isha, icon: Moon, isFardhu: true, checkKey: "isha" },
  ];

  return (
    <div className="space-y-6">
      {/* Prayer Times Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        {/* City and Date selector header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full w-fit mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {data.date.hijri.day} {data.date.hijri.month.en} {data.date.hijri.year} H
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
              Jadwal Shalat Wilayah {selectedCity}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {data.date.gregorian.weekday.en}, {data.date.gregorian.date} • {data.meta.timezone || "Asia/Jakarta"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* City Dropdown */}
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                disabled={loading}
                className="bg-stone-50 border border-stone-200 text-slate-700 text-xs font-semibold py-2.5 px-3.5 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {INDONESIAN_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GPS button */}
            <button
              onClick={handleUseLocation}
              disabled={loading}
              className="p-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-2xl transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Gunakan Lokasi GPS"
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">GPS</span>
            </button>
          </div>
        </div>

        {/* Live Next Prayer Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center font-bold text-white">
              <Clock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
                  Waktu Shalat Berikutnya:
                </span>
                <span className="bg-amber-400 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {nextInfo.name} ({nextInfo.time})
                </span>
              </div>
              <p className="text-2xl font-bold font-mono text-white mt-1">
                {nextInfo.timeRemaining} lagi
              </p>
            </div>
          </div>
          <div className="text-xs text-emerald-100 bg-black/15 px-3.5 py-2 rounded-xl self-start sm:self-auto border border-white/10">
            Zona: {data.meta.timezone || "Asia/Jakarta"} • Kemenag RI
          </div>
        </div>

        {/* 7 Prayer Times Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {prayers.map((p) => {
            const Icon = p.icon;
            const isNext = p.label === nextInfo.name;
            const checkVal = p.checkKey ? prayerChecklist[p.checkKey as keyof typeof prayerChecklist] : false;

            return (
              <div
                key={p.key}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 text-center relative",
                  isNext
                    ? "bg-emerald-50 border-emerald-400 shadow-md ring-1 ring-emerald-400"
                    : "bg-stone-50 border-stone-200/70 hover:bg-stone-100"
                )}
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon className={cn("w-4 h-4", isNext ? "text-emerald-600" : "text-slate-400")} />
                  {isNext && (
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Berikutnya
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-800">{p.label}</h4>
                  <p className="text-lg sm:text-xl font-bold font-mono text-emerald-700 mt-1">
                    {p.time}
                  </p>
                </div>

                {p.checkKey ? (
                  <button
                    onClick={() => togglePrayerStatus(p.checkKey as any)}
                    className={cn(
                      "mt-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer",
                      checkVal
                        ? "bg-emerald-600 text-white"
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
    </div>
  );
}
