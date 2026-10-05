"use client";

import React from "react";
import { UMMI_CURRICULUM, UmmiJilid } from "@/lib/data/ummi-curriculum";
import { BookOpen, Sparkles, CheckCircle, ArrowRight, Award, Music2, HeartHandshake } from "lucide-react";

interface UmmiJilidDashboardProps {
  onSelectJilid: (jilid: UmmiJilid) => void;
  completedPages: Record<string, boolean>;
}

export default function UmmiJilidDashboard({
  onSelectJilid,
  completedPages,
}: UmmiJilidDashboardProps) {
  // Calculate total completed pages across curriculum
  let totalPages = 0;
  let totalCompleted = 0;

  UMMI_CURRICULUM.forEach((jilid) => {
    totalPages += jilid.pages.length;
    jilid.pages.forEach((page) => {
      if (completedPages[`${jilid.id}-${page.pageNumber}`]) {
        totalCompleted += 1;
      }
    });
  });

  const overallPercentage = totalPages > 0 ? Math.round((totalCompleted / totalPages) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <BookOpen className="w-80 h-80" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Metodologi Pembelajaran Al-Quran Terpadu
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Belajar Ngaji <span className="text-emerald-300">Metode Ummi</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Metode membaca Al-Quran dengan pendekatan bahasa ibu yang mengutamakan ketuntasan membaca tartil secara <strong>Mudah, Menyenangkan, dan Menyentuh Hati</strong>.
          </p>

          {/* Overall Progress Bar */}
          <div className="pt-2 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-lg">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-100 mb-2">
              <span>Progres Keseluruhan Jilid 1 - 6</span>
              <span className="text-emerald-300 font-bold">{overallPercentage}% Tuntas</span>
            </div>
            <div className="w-full bg-emerald-950/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-emerald-200/70">
              {totalCompleted} dari {totalPages} halaman materi telah dikuasai.
            </div>
          </div>
        </div>
      </div>

      {/* Jilid Grid (1 to 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Daftar Jilid Pembelajaran</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih jilid untuk memulai latihan membaca tartil secara bertahap.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {UMMI_CURRICULUM.map((jilid) => {
            const jilidPagesCount = jilid.pages.length;
            const completedCount = jilid.pages.filter(
              (p) => completedPages[`${jilid.id}-${p.pageNumber}`]
            ).length;
            const jilidPercent = Math.round((completedCount / jilidPagesCount) * 100);

            return (
              <div
                key={jilid.id}
                onClick={() => onSelectJilid(jilid)}
                className={`group relative flex flex-col justify-between p-6 bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${jilid.borderClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${jilid.bgLight}`}>
                      {jilid.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {jilid.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {jilid.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {jilid.description}
                  </p>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                      <span>Progres Jilid</span>
                      <span>{completedCount}/{jilidPagesCount} Halaman ({jilidPercent}%)</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${jilid.gradient}`}
                        style={{ width: `${jilidPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>Mulai Belajar</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Pillars of Ummi Method Info Cards */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-5">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          3 Prinsip Utama Membaca Metode Ummi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              1. Direct Method (Langsung)
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Langsung dibaca bunyi bunyinya tanpa dieja. Contoh: 'بَ' langsung dibaca 'BA', bukan 'Ba fathah ba'.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
              <Music2 className="w-4 h-4 text-blue-600" />
              2. Ketukan & Irama Stabil
            </div>
            <p className="text-xs text-blue-900/80 leading-relaxed">
              Panjang pendek dibaca teratur dengan ketukan stabil. 1 harakat = 1 ketukan cepat, 2 harakat = 1 ayunan nada.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              3. Kasih Sayang (Affection)
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Belajar dengan suasana sabar, menyenangkan, dan menyentuh hati seperti kasih sayang seorang ibu kepada anaknya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
