"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Compass, 
  ScrollText, 
  Sparkles, 
  Bookmark, 
  Menu, 
  X,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Beranda", href: "/", icon: Sparkles },
  { name: "Al-Quran", href: "/quran", icon: BookOpen },
  { name: "Jadwal & Shalat", href: "/shalat", icon: Compass },
  { name: "Hadits", href: "/hadits", icon: ScrollText },
  { name: "Dzikir & Doa", href: "/dzikir", icon: Sparkles },
  { name: "Khatam Tracker", href: "/khatam", icon: Target },
  { name: "Bookmark", href: "/bookmark", icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
                Quran<span className="text-emerald-600">Track</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 hidden sm:inline-block">
                  Companion
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden md:block -mt-1">
                Ibadah Harian Muslim
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-stone-100"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:bg-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-600 hover:bg-stone-100"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-emerald-600" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
