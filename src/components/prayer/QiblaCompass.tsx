"use client";

import React, { useState, useEffect } from "react";
import { Compass, Navigation, MapPin, Sparkles } from "lucide-react";
import { calculateQiblaDirection, INDONESIAN_CITIES } from "@/lib/api/prayer";

export default function QiblaCompass() {
  const [selectedCity, setSelectedCity] = useState(INDONESIAN_CITIES[0]);
  const [userHeading, setUserHeading] = useState(0);
  const [hasCompassSupport, setHasCompassSupport] = useState(false);

  const qiblaAngle = calculateQiblaDirection(
    selectedCity.latitude,
    selectedCity.longitude
  );

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setHasCompassSupport(true);
        // alpha is degree from magnetic north (0 - 360)
        setUserHeading(e.alpha);
      }
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const relativeQiblaAngle = (qiblaAngle - userHeading + 360) % 360;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Arah Kiblat ke Ka'bah (Makkah)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            Kompas & Derajat Kiblat
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dihitung berdasarkan rumus bola bumi (Haversine/Great Circle bearing)
          </p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const found = INDONESIAN_CITIES.find((c) => c.name === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="bg-stone-50 border border-stone-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {INDONESIAN_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compass UI */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-4">
        {/* Visual Dial */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-stone-200 bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center shadow-inner">
          {/* Compass Rose Markings */}
          <div className="absolute top-2 text-xs font-bold text-slate-500">U</div>
          <div className="absolute bottom-2 text-xs font-bold text-slate-500">S</div>
          <div className="absolute left-2 text-xs font-bold text-slate-500">B</div>
          <div className="absolute right-2 text-xs font-bold text-slate-500">T</div>

          {/* Compass needle pointing to Qibla */}
          <div
            className="absolute w-full h-full flex items-center justify-center transition-transform duration-500"
            style={{ transform: `rotate(${hasCompassSupport ? relativeQiblaAngle : qiblaAngle}deg)` }}
          >
            <div className="w-1.5 h-1/2 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600 rounded-t-full -translate-y-1/4 relative shadow-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md">
                🕋
              </div>
            </div>
          </div>

          {/* Center Hub */}
          <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-500 shadow-md flex flex-col items-center justify-center z-10 text-center">
            <span className="text-xs font-bold text-slate-800 font-mono">
              {Math.round(qiblaAngle)}°
            </span>
            <span className="text-[9px] text-slate-400 font-medium -mt-0.5">Kiblat</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="space-y-4 max-w-sm text-left">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Sudut Derajat Kiblat:</span>
              <strong className="text-emerald-700 font-mono text-base">
                {qiblaAngle.toFixed(2)}° (Barat Laut)
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Koordinat Ka'bah:</span>
              <span className="text-xs text-slate-700 font-mono">21.42° N, 39.82° E</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Koordinat Kota:</span>
              <span className="text-xs text-slate-700 font-mono">
                {selectedCity.latitude.toFixed(2)}°, {selectedCity.longitude.toFixed(2)}°
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            {hasCompassSupport
              ? "Kompas bergerak secara otomatis mengikuti arah putaran perangkat Anda."
              : "Untuk wilayah Indonesia, arah kiblat umumnya berkisar antara 290° hingga 295° dari arah Utara ke arah Barat."}
          </p>
        </div>
      </div>
    </div>
  );
}
