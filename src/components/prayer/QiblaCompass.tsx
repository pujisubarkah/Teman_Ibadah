"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Compass, Navigation, MapPin, Sparkles, CheckCircle2, RotateCw, Smartphone } from "lucide-react";
import { calculateQiblaDirection, INDONESIAN_CITIES, CityOption } from "@/lib/api/prayer";
import { cn } from "@/lib/utils";

export default function QiblaCompass() {
  const [selectedCity, setSelectedCity] = useState<CityOption>(INDONESIAN_CITIES[0]);
  const [userHeading, setUserHeading] = useState<number>(0);
  const [hasCompassSupport, setHasCompassSupport] = useState(false);
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied" | "unsupported">("prompt");
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Sync city with localStorage if saved
  useEffect(() => {
    try {
      const savedLoc = localStorage.getItem("teman_ibadah_prayer_loc");
      if (savedLoc) {
        const parsed = JSON.parse(savedLoc);
        if (parsed.lat && parsed.lng) {
          const match = INDONESIAN_CITIES.find(
            (c) =>
              c.name.toLowerCase().includes(parsed.cityName?.toLowerCase() || "") ||
              (parsed.cityName && parsed.cityName.toLowerCase().includes(c.name.toLowerCase()))
          );
          if (match) {
            setSelectedCity(match);
          } else {
            setSelectedCity({
              name: parsed.cityName || "Lokasi Anda",
              country: "Indonesia",
              latitude: parsed.lat,
              longitude: parsed.lng,
              timezone: "Asia/Jakarta",
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const qiblaAngle = calculateQiblaDirection(
    selectedCity.latitude,
    selectedCity.longitude
  );

  // Handle device orientation
  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    let heading = 0;
    // iOS Safari uses webkitCompassHeading (0 is magnetic North, clockwise)
    if ("webkitCompassHeading" in e && typeof (e as any).webkitCompassHeading === "number") {
      heading = (e as any).webkitCompassHeading;
      setHasCompassSupport(true);
      setPermissionState("granted");
    } else if (e.alpha !== null) {
      // Android / Standard Chrome: alpha is 0 to 360 (counter-clockwise)
      // On Android absolute orientation is (360 - alpha) % 360
      heading = (360 - e.alpha) % 360;
      setHasCompassSupport(true);
      setPermissionState("granted");
    }
    setUserHeading(heading);
  }, []);

  const requestCompassPermission = async () => {
    setIsCalibrating(true);
    try {
      if (
        typeof window !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === "granted") {
          setPermissionState("granted");
          window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
          setPermissionState("denied");
        }
      } else if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", handleOrientation, true);
        setPermissionState("granted");
      } else {
        setPermissionState("unsupported");
      }
    } catch (err) {
      console.warn("Compass permission error:", err);
      setPermissionState("denied");
    } finally {
      setIsCalibrating(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      // If not iOS requiring explicit permission, try attaching automatically
      if (typeof (DeviceOrientationEvent as any).requestPermission !== "function") {
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    }

    return () => {
      if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation, true);
      }
    };
  }, [handleOrientation]);

  // Calculate angles
  // Compass dial rotates counter to user heading so North stays aligned with real world
  const dialRotation = hasCompassSupport ? -userHeading : 0;
  // Qibla needle relative to device
  const relativeQiblaAngle = (qiblaAngle - userHeading + 360) % 360;
  // Alignment detection (within 4 degrees)
  const angleDifference = Math.abs(((relativeQiblaAngle + 180) % 360) - 180);
  const isAligned = hasCompassSupport && angleDifference <= 4;

  // Haptic feedback when aligned
  useEffect(() => {
    if (isAligned && typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore vibrate error
      }
    }
  }, [isAligned]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Arah Kiblat ke Ka'bah (Makkah)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Kompas Presisi & Arah Kiblat
            {isAligned && (
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-600 text-white font-semibold px-2 py-0.5 rounded-full animate-pulse">
                <CheckCircle2 className="w-3 h-3" /> Tepat Kiblat!
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dihitung menggunakan rumus geodesik Great-Circle Bearing ke koordinat Ka'bah
          </p>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const found = INDONESIAN_CITIES.find((c) => c.name === e.target.value);
              if (found) setSelectedCity(found);
            }}
            className="bg-stone-50 border border-stone-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer max-w-[200px] truncate"
          >
            {INDONESIAN_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} {c.province ? `(${c.province})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Compass UI */}
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8 py-2">
        {/* Realistic Compass Dial Container */}
        <div className="relative flex flex-col items-center">
          {/* Outer Bezel Glow on Alignment */}
          <div
            className={cn(
              "relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-2.5 transition-all duration-300 flex items-center justify-center",
              isAligned
                ? "shadow-[0_0_40px_rgba(16,185,129,0.55)] ring-4 ring-emerald-500 bg-gradient-to-tr from-emerald-600 to-emerald-400"
                : "shadow-xl bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 ring-1 ring-stone-300"
            )}
          >
            {/* Inner Metallic Ring */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-stone-900 via-stone-800 to-slate-900 p-2 shadow-inner relative flex items-center justify-center overflow-hidden">
              
              {/* Rotating Compass Face */}
              <div
                className="relative w-full h-full rounded-full transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${dialRotation}deg)` }}
              >
                {/* SVG Compass Face: Ticks, Degrees, Islamic Star Pattern */}
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full absolute inset-0 select-none pointer-events-none"
                >
                  <defs>
                    {/* Radial gradient for dial depth */}
                    <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#0f172a" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                    </radialGradient>
                    
                    {/* Gold gradient for Kiblat highlight */}
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                  </defs>

                  {/* Dark Dial Background */}
                  <circle cx="150" cy="150" r="145" fill="url(#dialGlow)" stroke="#334155" strokeWidth="2" />
                  <circle cx="150" cy="150" r="115" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2,3" />

                  {/* Islamic 8-Point Geometric Star Rosette in center */}
                  <g transform="translate(150, 150)" opacity="0.18">
                    <polygon
                      points="0,-60 18,-18 60,0 18,18 0,60 -18,18 -60,0 -18,-18"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="-42,-42 0,-25 42,-42 25,0 42,42 0,25 -42,42 -25,0"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="1.5"
                    />
                    <circle cx="0" cy="0" r="30" fill="none" stroke="#10b981" strokeWidth="1" />
                  </g>

                  {/* Degree Ticks every 5° and 15° */}
                  {Array.from({ length: 72 }).map((_, i) => {
                    const angle = i * 5;
                    const isMajor = angle % 30 === 0;
                    const isMedium = angle % 15 === 0;
                    const tickLength = isMajor ? 12 : isMedium ? 8 : 4;
                    const strokeColor = isMajor ? "#e2e8f0" : isMedium ? "#94a3b8" : "#475569";
                    const strokeWidth = isMajor ? 2 : 1;

                    return (
                      <line
                        key={angle}
                        x1="150"
                        y1={8}
                        x2="150"
                        y2={8 + tickLength}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        transform={`rotate(${angle} 150 150)`}
                      />
                    );
                  })}

                  {/* Degree Numbers every 30° */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                    const rad = ((deg - 90) * Math.PI) / 180;
                    const r = 126;
                    const x = 150 + r * Math.cos(rad);
                    const y = 150 + r * Math.sin(rad);
                    return (
                      <text
                        key={deg}
                        x={x}
                        y={y + 3}
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="600"
                        fill="#64748b"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {deg}°
                      </text>
                    );
                  })}

                  {/* Cardinal Directions (U, T, S, B) */}
                  <text x="150" y="32" fontSize="14" fontWeight="800" fill="#ef4444" textAnchor="middle">
                    U
                  </text>
                  <text x="268" y="155" fontSize="13" fontWeight="700" fill="#cbd5e1" textAnchor="middle">
                    T
                  </text>
                  <text x="150" y="278" fontSize="13" fontWeight="700" fill="#cbd5e1" textAnchor="middle">
                    S
                  </text>
                  <text x="32" y="155" fontSize="13" fontWeight="700" fill="#cbd5e1" textAnchor="middle">
                    B
                  </text>

                  {/* Intercardinal Directions */}
                  <text x="232" y="72" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">TL</text>
                  <text x="232" y="238" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">TG</text>
                  <text x="68" y="238" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">BD</text>
                  <text x="68" y="72" fontSize="9" fontWeight="600" fill="#64748b" textAnchor="middle">BL</text>

                  {/* Magnetic North-South Needle on Dial */}
                  <g transform="translate(150, 150)">
                    {/* North Tip (Crimson Red with Luminous Core) */}
                    <polygon points="0,-100 -6,-15 0,0" fill="#dc2626" />
                    <polygon points="0,-100 6,-15 0,0" fill="#ef4444" />
                    {/* South Tip (Silver Slate) */}
                    <polygon points="0,100 -6,15 0,0" fill="#64748b" />
                    <polygon points="0,100 6,15 0,0" fill="#94a3b8" />
                  </g>

                  {/* Qibla Direction Sector / Gold Pointer */}
                  <g transform={`rotate(${qiblaAngle} 150 150)`}>
                    {/* Qibla Target Line */}
                    <line
                      x1="150"
                      y1="150"
                      x2="150"
                      y2="18"
                      stroke="url(#goldGrad)"
                      strokeWidth="2.5"
                      strokeDasharray="4,3"
                    />
                    {/* Glowing Ka'bah Marker at angle */}
                    <circle cx="150" cy="24" r="12" fill="#047857" stroke="#fbbf24" strokeWidth="2" />
                    <text x="150" y="28" fontSize="12" textAnchor="middle" dominantBaseline="middle">
                      🕋
                    </text>
                  </g>
                </svg>
              </div>

              {/* Center Metallic Hub & Ka'bah Degree Badge */}
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-slate-900 via-stone-800 to-slate-950 border-2 border-emerald-500/80 shadow-2xl flex flex-col items-center justify-center z-20 text-center pointer-events-none">
                <span className="text-xs font-black text-amber-400 font-mono tracking-tight">
                  {Math.round(qiblaAngle)}°
                </span>
                <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider -mt-0.5">
                  Kiblat
                </span>
              </div>
            </div>
          </div>

          {/* Heading / Live Gyro Status */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            {hasCompassSupport ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
                <Smartphone className="w-3.5 h-3.5" />
                Arah HP: <strong className="font-mono">{Math.round(userHeading)}°</strong>
              </span>
            ) : (
              <span className="text-slate-400 text-xs">
                Modus statis (Putar HP Anda menghadap <strong className="text-slate-700">{Math.round(qiblaAngle)}°</strong>)
              </span>
            )}
          </div>
        </div>

        {/* Info & Sensor Calibration Controls */}
        <div className="space-y-4 max-w-sm w-full text-left">
          {/* Summary Box */}
          <div
            className={cn(
              "rounded-2xl p-4.5 border transition-all duration-200 space-y-3",
              isAligned
                ? "bg-emerald-50/80 border-emerald-300 shadow-sm"
                : "bg-stone-50 border-stone-200/80"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Derajat Kiblat Ka'bah:</span>
              <span className="text-emerald-700 font-mono font-bold text-base">
                {qiblaAngle.toFixed(2)}°
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Arah Mata Angin:</span>
              <span className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-stone-200">
                Barat Laut (WNW)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Koordinat Kota:</span>
              <span className="text-xs text-slate-700 font-mono font-medium">
                {selectedCity.latitude.toFixed(2)}°, {selectedCity.longitude.toFixed(2)}°
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-stone-200/60 pt-2">
              <span className="text-xs font-medium text-slate-500">Jarak ke Makkah:</span>
              <span className="text-xs text-slate-700 font-mono font-semibold">
                ~7.900 km
              </span>
            </div>
          </div>

          {/* Sensor Calibration Button for Mobile Devices */}
          <div className="space-y-2">
            {!hasCompassSupport && (
              <button
                onClick={requestCompassPermission}
                disabled={isCalibrating}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all active:scale-[0.98]"
              >
                {isCalibrating ? (
                  <RotateCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
                Aktifkan Kompas Live (Sensor HP)
              </button>
            )}

            <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed space-y-1">
              <p className="font-semibold flex items-center gap-1 text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Tips Penggunaan Kompas:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                <li>Posisikan smartphone secara <strong>mendatar (horizontal)</strong> di telapak tangan atau meja.</li>
                <li>Jauhkan dari benda magnetis, laptop, atau speaker untuk menghindari distorsi arah.</li>
                <li>Putar tubuh sampai jarum emas 🕋 berada tepat di posisi atas.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

