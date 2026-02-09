"use client";

import { useState, useEffect } from "react";

export default function ValentineCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Auto-open the card after a brief pause
    const openTimer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Show inside content after the card finishes opening
      const contentTimer = setTimeout(() => setShowContent(true), 1200);
      return () => clearTimeout(contentTimer);
    }
  }, [isOpen]);

  return (
    <div className="card-scene response-reveal">
      {/* Card container */}
      <div className={`card ${isOpen ? "card-open" : ""}`}>
        {/* ---- LEFT SIDE (back of front cover, visible when open) ---- */}
        <div className="card-inside-left">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-l-xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            {showContent && (
              <div className="inside-left-content">
                <p className="text-lg sm:text-xl md:text-2xl font-elegant text-rose-400 mb-4 leading-relaxed">
                  From the moment I met you,
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-elegant text-rose-400 mb-6 leading-relaxed">
                  my world has been brighter ✨
                </p>
                <div className="w-16 h-px bg-pink-300 mx-auto mb-6" />
                <p className="text-base sm:text-lg md:text-xl font-serif text-rose-300 italic">
                  Every day with you is a gift
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ---- RIGHT SIDE (always visible back) ---- */}
        <div className="card-back">
          <div className="absolute inset-0 bg-gradient-to-bl from-rose-50 to-pink-50 rounded-r-xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
            {showContent && (
              <div className="inside-right-content">
                <p className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-500 mb-4">
                  Happy Valentine&apos;s Day
                </p>
                <p className="text-5xl sm:text-6xl md:text-7xl mb-4">
                  ✨
                </p>
                <p className="text-base sm:text-lg md:text-xl font-serif text-rose-400 mb-6 leading-relaxed max-w-xs">
                  You are my favorite person in the entire universe
                </p>
                <div className="w-16 h-px bg-pink-300 mx-auto mb-6" />
                <p className="text-lg sm:text-xl md:text-2xl font-elegant text-pink-400">
                  I love you 💫
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ---- FRONT COVER (folds open to the left) ---- */}
        <div className="card-front">
          {/* Outside of front cover */}
          <div className="card-front-outside">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-700 rounded-r-xl shadow-2xl" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-6">✨</div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-elegant text-white tracking-widest">
                For You
              </p>
              <div className="mt-6 w-20 h-px bg-white/50" />
              <p className="mt-4 text-sm sm:text-base font-serif text-white/70 tracking-wider uppercase">
                Open me
              </p>
            </div>
          </div>

          {/* Inside of front cover (visible when flipped) */}
          <div className="card-front-inside">
            <div className="absolute inset-0 bg-gradient-to-bl from-pink-50 to-rose-100 rounded-l-xl" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
              {showContent && (
                <div className="inside-left-content">
                  <div className="text-4xl mb-4">🌹</div>
                  <p className="text-lg sm:text-xl md:text-2xl font-elegant text-rose-400 mb-4 leading-relaxed">
                    You light up every room
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-elegant text-rose-400 leading-relaxed">
                    you walk into
                  </p>
                  <div className="w-16 h-px bg-pink-300 mx-auto mt-6" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tap to open hint (before open) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 font-serif text-sm tracking-wider animate-pulse cursor-pointer z-30"
        >
          Tap the card to open ✨
        </button>
      )}
    </div>
  );
}
