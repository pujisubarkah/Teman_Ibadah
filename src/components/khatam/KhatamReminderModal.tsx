"use client";

import React, { useState } from "react";
import { 
  X, 
  Bell, 
  BellRing, 
  Check, 
  Clock, 
  Volume2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import { useQuranStore } from "@/lib/store/useQuranStore";
import { requestNotificationPermission, sendKhatamNotification, playReminderChime } from "@/lib/utils/notification";
import { cn } from "@/lib/utils";

interface KhatamReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_REMINDER_TIMES = [
  { id: "05:00", label: "Ba'da Subuh", time: "05:00", desc: "Awal hari penuh berkah & ketenangan", icon: "🌅" },
  { id: "12:30", label: "Ba'da Dzuhur", time: "12:30", desc: "Istirahat siang yang produktif", icon: "☀️" },
  { id: "15:45", label: "Ba'da Ashar", time: "15:45", desc: "Sore hari sebelum maghrib", icon: "🌇" },
  { id: "18:45", label: "Ba'da Maghrib", time: "18:45", desc: "Waktu utama mengaji bersama keluarga", icon: "🌙" },
  { id: "21:00", label: "Sebelum Tidur", time: "21:00", desc: "Menutup malam dengan ayat suci", icon: "🌌" },
];

export default function KhatamReminderModal({ isOpen, onClose }: KhatamReminderModalProps) {
  const { khatam, updateKhatamReminders } = useQuranStore();
  const currentReminders = khatam?.reminders || {
    enabled: true,
    times: ["05:00", "18:45", "21:00"],
    soundEnabled: true,
    dailyMethod: "per-day",
  };

  const [enabled, setEnabled] = useState(currentReminders.enabled);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(currentReminders.times || ["05:00", "18:45"]);
  const [soundEnabled, setSoundEnabled] = useState(currentReminders.soundEnabled);
  const [permissionStatus, setPermissionStatus] = useState<string>(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "default";
  });
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggleTime = (timeId: string) => {
    setSelectedTimes((prev) => {
      if (prev.includes(timeId)) {
        return prev.filter((t) => t !== timeId);
      } else {
        return [...prev, timeId];
      }
    });
  };

  const handleRequestPermission = async () => {
    const perm = await requestNotificationPermission();
    setPermissionStatus(perm);
    if (perm === "granted") {
      setEnabled(true);
    }
  };

  const handleTestNotification = () => {
    playReminderChime();
    sendKhatamNotification(
      "✨ Waktunya Tilawah Al-Qur'an!",
      "Yuk luangkan 5-10 menit untuk melanjutkan target khatam hari ini. Semoga berkah selalu menyertai!",
      "/khatam"
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleSave = () => {
    updateKhatamReminders({
      enabled,
      times: selectedTimes,
      soundEnabled,
      dailyMethod: "per-day",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <BellRing className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <span>Pengingat Tilawah Harian</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase">
                  On-Track
                </span>
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Biar tidak lupa dan selalu konsisten mencapai target khatam
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[60vh]">
          {/* Main switch */}
          <div className="flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-slate-800">
                Aktifkan Notifikasi Pengingat
              </h4>
              <p className="text-xs text-slate-500">
                Kirim notifikasi di browser pada jam yang Anda tentukan
              </p>
            </div>

            <button
              onClick={() => {
                if (!enabled && permissionStatus !== "granted") {
                  handleRequestPermission();
                } else {
                  setEnabled(!enabled);
                }
              }}
              className={cn(
                "w-12 h-7 rounded-full transition-colors relative cursor-pointer",
                enabled ? "bg-emerald-600" : "bg-stone-300"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white shadow-md transition-transform absolute top-1",
                  enabled ? "left-6" : "left-1"
                )}
              />
            </button>
          </div>

          {/* Browser Permission Alert if not granted */}
          {permissionStatus !== "granted" && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <h5 className="font-bold text-xs text-amber-900">
                  Izin Notifikasi Browser Diperlukan
                </h5>
                <p className="text-xs text-amber-700/90 leading-relaxed">
                  Agar pengingat dapat berbunyi dan muncul di layar, mohon izinkan notifikasi browser Anda.
                </p>
                <button
                  onClick={handleRequestPermission}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Izinkan Notifikasi Sekarang
                </button>
              </div>
            </div>
          )}

          {/* Preset Reminder Times */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pilih Waktu Pengingat Favorit ({selectedTimes.length} Terpilih):
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_REMINDER_TIMES.map((preset) => {
                const isSelected = selectedTimes.includes(preset.id);
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleToggleTime(preset.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 group cursor-pointer",
                      isSelected
                        ? "bg-emerald-50/90 border-emerald-400 ring-1 ring-emerald-400 shadow-xs"
                        : "bg-white border-stone-200 hover:bg-stone-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg">{preset.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-xs text-slate-800 truncate">
                            {preset.label}
                          </h5>
                          <span className="font-mono text-xs font-bold text-emerald-700">
                            {preset.time}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">
                          {preset.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "border border-stone-300 group-hover:border-stone-400"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound toggle & Test Button */}
          <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
              />
              <Volume2 className="w-4 h-4 text-slate-500" />
              <span>Bunyikan Chime / Suara Lembut</span>
            </label>

            <button
              onClick={handleTestNotification}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{testSent ? "Terkirim! ✅" : "Uji Coba Pengingat"}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-500">
          <span>* Pengingat tersimpan di browser Anda.</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs shadow-emerald-600/20"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
