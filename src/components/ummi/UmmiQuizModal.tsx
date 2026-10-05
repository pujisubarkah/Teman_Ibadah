"use client";

import React, { useState } from "react";
import { UmmiQuizQuestion } from "@/lib/data/ummi-curriculum";
import { playArabicAudio, playChime } from "@/lib/utils/ummiAudio";
import confetti from "canvas-confetti";
import { Volume2, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, X } from "lucide-react";

interface UmmiQuizModalProps {
  questions: UmmiQuizQuestion[];
  pageTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onCompleted: (score: number) => void;
}

export default function UmmiQuizModal({
  questions,
  pageTitle,
  isOpen,
  onClose,
  onCompleted,
}: UmmiQuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = currentQ.options[index].isCorrect;
    playChime(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (currentQ.options[selectedOption ?? -1]?.isCorrect ? 1 : 0);
      onCompleted(finalScore);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-100">
              Kuis Evaluasi Pemahaman
            </span>
            <h3 className="font-bold text-lg text-white">{pageTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>
                  Pertanyaan {currentIndex + 1} dari {questions.length}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                  Skor: {score}
                </span>
              </div>

              {/* Question Text */}
              <div>
                <p className="text-base font-semibold text-slate-800 mb-3">
                  {currentQ.question}
                </p>

                {currentQ.arabicPrompt && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                    <span className="font-arabic text-3xl font-bold text-amber-950">
                      {currentQ.arabicPrompt}
                    </span>
                    <button
                      onClick={() => playArabicAudio(currentQ.arabicPrompt!)}
                      className="p-2.5 rounded-xl bg-amber-200/60 hover:bg-amber-200 text-amber-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
                      title="Dengarkan Suara"
                    >
                      <Volume2 className="w-4 h-4" />
                      Dengarkan
                    </button>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = opt.isCorrect;

                  let btnStyle = "bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200";

                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 text-emerald-800 border-emerald-400 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-50 text-rose-800 border-rose-400";
                    } else {
                      btnStyle = "bg-stone-50/50 text-slate-400 border-stone-200 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="text-sm md:text-base">{opt.text}</span>
                      {isAnswered && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs md:text-sm animate-in fade-in duration-150">
                  <span className="font-bold">Penjelasan: </span>
                  {currentQ.explanation}
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <Award className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800">
                  {score === questions.length ? "Luar Biasa, Mumtaz! 🌟" : "Alhamdulillah, Latihan Selesai!"}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Anda menjawab benar <span className="font-bold text-emerald-600">{score}</span> dari{" "}
                  <span className="font-bold text-slate-700">{questions.length}</span> soal.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-slate-700 text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ulangi Kuis
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-500/20 transition-colors"
                >
                  Selesai & Lanjut
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!isFinished && (
          <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
            <button
              disabled={!isAnswered}
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              {currentIndex + 1 < questions.length ? "Lanjut Soal" : "Lihat Hasil"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
