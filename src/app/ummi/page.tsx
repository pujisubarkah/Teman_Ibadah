"use client";

import React, { useState, useEffect } from "react";
import { UMMI_CURRICULUM, UmmiJilid } from "@/lib/data/ummi-curriculum";
import UmmiJilidDashboard from "@/components/ummi/UmmiJilidDashboard";
import UmmiLessonView from "@/components/ummi/UmmiLessonView";

export default function UmmiLearningPage() {
  const [selectedJilid, setSelectedJilid] = useState<UmmiJilid | null>(null);
  const [completedPages, setCompletedPages] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load completed pages from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("teman_ibadah_ummi_completed");
      if (saved) {
        setCompletedPages(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load Ummi progress:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever completedPages changes
  const handleToggleCompletePage = (jilidId: number, pageNum: number) => {
    setCompletedPages((prev) => {
      const key = `${jilidId}-${pageNum}`;
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("teman_ibadah_ummi_completed", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save Ummi progress:", e);
      }
      return updated;
    });
  };

  const isPageCompleted = (jilidId: number, pageNum: number) => {
    return !!completedPages[`${jilidId}-${pageNum}`];
  };

  return (
    <div className="min-h-[85vh] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {selectedJilid ? (
        <UmmiLessonView
          jilid={selectedJilid}
          onBackToDashboard={() => setSelectedJilid(null)}
          isPageCompleted={isPageCompleted}
          onToggleCompletePage={handleToggleCompletePage}
        />
      ) : (
        <UmmiJilidDashboard
          onSelectJilid={(jilid) => setSelectedJilid(jilid)}
          completedPages={completedPages}
        />
      )}
    </div>
  );
}
