"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import BookViewer from "./components/BookViewer";

const SPLASH_IMAGES = ["/main.JPG", "/main_2.jpg", "/hands.JPG"];

export default function Home() {
  const [showDedication, setShowDedication] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
    if (index === 0) setImageLoaded(true);
  }, []);

  // On mount, check localStorage for a previous "yes"
  useEffect(() => {
    const saved = localStorage.getItem("valentine-answer");
    if (saved === "yes") {
      setAnswer("yes");
      setShowResponse(true);
      setShowBook(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    // Only start the intro flow if the question hasn't been answered yet
    if (imageLoaded && !showBook) {
      const dedicationTimer = setTimeout(() => setShowDedication(true), 800);
      return () => clearTimeout(dedicationTimer);
    }
  }, [imageLoaded, hydrated, showBook]);

  useEffect(() => {
    if (showDedication) {
      // Then show the question after the dedication sits for a moment
      const questionTimer = setTimeout(() => setShowQuestion(true), 2000);
      return () => clearTimeout(questionTimer);
    }
  }, [showDedication]);

  // Cycle through background images every 5 seconds
  useEffect(() => {
    if (showBook || showResponse) return; // Stop cycling once answered
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SPLASH_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showBook, showResponse]);

  const handleYes = () => {
    setAnswer("yes");
    setShowResponse(true);
    localStorage.setItem("valentine-answer", "yes");
    setTimeout(() => setShowBook(true), 2500);
  };

  const handleNo = () => {
    setAnswer("no");
    setShowResponse(true);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Full-screen splash images with crossfade */}
      <div className="absolute inset-0 splash-zoom">
        {SPLASH_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: i === currentImageIndex ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Us"
              fill
              className="object-cover"
              priority={i === 0}
              onLoad={() => handleImageLoad(i)}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
      </div>

      {/* ---- Dedication + Question ---- */}
      {hydrated && !showResponse && !showBook && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 sm:pb-20 md:pb-28">
          {/* Dedication line */}
          {showDedication && (
            <div className="text-center px-6 mb-6 question-reveal">
              <p className="text-lg sm:text-xl md:text-2xl font-elegant text-white/80 tracking-widest italic drop-shadow-lg">
                For my Lady Bianca
              </p>
            </div>
          )}

          {/* Question */}
          {showQuestion && (
            <div className="text-center px-6 question-reveal">
              <div className="w-16 h-px bg-white/30 mx-auto mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-3 text-white tracking-wide drop-shadow-lg">
                Will You Be My
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-cursive mb-10 text-pink-300 tracking-wider drop-shadow-lg">
                Valentine?
              </h1>

              <div className="flex gap-6 justify-center items-center buttons-reveal">
                <button
                  onClick={handleYes}
                  className="px-10 py-5 text-xl md:text-2xl font-serif bg-white/90 hover:bg-white text-black rounded-full shadow-xl shadow-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  Yes! ✨
                </button>
                <button
                  onClick={handleNo}
                  className="px-10 py-5 text-xl md:text-2xl font-serif bg-white/10 hover:bg-white/20 text-white rounded-full shadow-xl backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  No 🥀
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---- Brief "Yes" celebration before book ---- */}
      {showResponse && !showBook && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="text-center px-6 response-reveal">
            {answer === "yes" ? (
              <>
                {/* Blooming flower */}
                <div className="flower-container flower-bloom-done mb-4">
                  <div className="flower-stem" />
                  <div className="flower-leaf flower-leaf-left" />
                  <div className="flower-leaf flower-leaf-right" />
                  <div className="flower-petal flower-petal-1" />
                  <div className="flower-petal flower-petal-2" />
                  <div className="flower-petal flower-petal-3" />
                  <div className="flower-petal flower-petal-4" />
                  <div className="flower-petal flower-petal-5" />
                  <div className="flower-petal flower-petal-6" />
                  <div className="flower-petal flower-petal-7" />
                  <div className="flower-petal flower-petal-8" />
                  <div className="flower-center" />
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-elegant mb-4 text-white tracking-wider drop-shadow-lg">
                  Yay!
                </h1>
                <p className="text-2xl sm:text-3xl md:text-5xl font-serif text-white/90 drop-shadow-lg">
                  I have something special for you...
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-elegant mb-6 text-gray-300 tracking-wider drop-shadow-lg">
                  Nice Try!
                </h1>
                <p className="text-2xl sm:text-3xl md:text-5xl font-serif text-gray-200 mb-10 drop-shadow-lg">
                  There&apos;s only one option here
                </p>
                <button
                  onClick={() => {
                    setShowResponse(false);
                    setAnswer(null);
                  }}
                  className="px-10 py-5 text-xl md:text-2xl font-serif bg-white/90 hover:bg-white text-black rounded-full shadow-xl shadow-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  Let me try again ✨
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ---- Book View ---- */}
      {showBook && (
        <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center card-screen-enter">
          {/* Sparkle background */}
          <BookViewer />
        </div>
      )}
    </main>
  );
}
