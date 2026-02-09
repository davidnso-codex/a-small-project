"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showResponse, setShowResponse] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  const handleYes = () => {
    setAnswer("yes");
    setShowResponse(true);
  };

  const handleNo = () => {
    setAnswer("no");
    setShowResponse(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse opacity-20">❤️</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-20 animation-delay-300">💕</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse opacity-20 animation-delay-600">💖</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse opacity-20 animation-delay-900">💗</div>
      </div>

      {!showResponse ? (
        <div className="z-10 max-w-4xl w-full flex flex-col items-center">
          {/* Animated Image */}
          <div className="mb-12 animate-fade-in-down">
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-pink-500 shadow-2xl shadow-pink-500/50">
              <Image
                src="/couple-photo.svg"
                alt="Us"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Main Question */}
          <div className="text-center animate-fade-in-up animation-delay-600">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-pink-100 tracking-wide">
              Will You Be My
            </h1>
            <h1 className="text-6xl md:text-8xl font-elegant mb-12 text-pink-300 tracking-wider">
              Valentine?
            </h1>

            {/* Buttons */}
            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleYes}
                className="px-12 py-6 text-2xl font-serif bg-pink-600 hover:bg-pink-500 text-white rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
              >
                Yes! 💕
              </button>
              <button
                onClick={handleNo}
                className="px-12 py-6 text-2xl font-serif bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-gray-500/50 transition-all duration-300 hover:scale-110"
              >
                No 💔
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-10 max-w-4xl w-full text-center animate-fade-in">
          {answer === "yes" ? (
            <div>
              <h1 className="text-6xl md:text-8xl font-elegant mb-8 text-pink-300 tracking-wider">
                Yay! 🎉💕
              </h1>
              <p className="text-3xl md:text-5xl font-serif text-pink-100 mb-8">
                You made my day!
              </p>
              <p className="text-2xl md:text-4xl font-elegant text-white">
                I love you so much! ❤️
              </p>
              <div className="mt-12 text-7xl animate-bounce">
                💖💕💗💝💓
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-6xl md:text-8xl font-elegant mb-8 text-gray-400 tracking-wider">
                Are you sure? 🥺
              </h1>
              <p className="text-3xl md:text-5xl font-serif text-gray-300 mb-8">
                Please reconsider...
              </p>
              <button
                onClick={() => {
                  setShowResponse(false);
                  setAnswer(null);
                }}
                className="px-12 py-6 text-2xl font-serif bg-pink-600 hover:bg-pink-500 text-white rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110"
              >
                Let me try again 💕
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
