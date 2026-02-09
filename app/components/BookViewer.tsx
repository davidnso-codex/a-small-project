"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Each "day" is a page spread (left + right).                       */
/*  unlockDate is midnight ET on that day.                            */
/*  On mobile, left and right become two separate swipeable pages.    */
/* ------------------------------------------------------------------ */
interface PageSpread {
  unlockDate: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

const SPREADS: PageSpread[] = [
  /* ---- Intro spread (always unlocked) ---- */
  {
    unlockDate: "2026-02-09",
    left: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-3xl sm:text-4xl mb-6">✨</div>
        <p className="text-base sm:text-lg md:text-xl font-elegant text-rose-800/80 leading-relaxed mb-6">
          I spent the last few days trying to think of the best ways to tell you
          that I love you, I appreciate you and I care about you.
        </p>
        <p className="text-base sm:text-lg md:text-xl font-elegant text-rose-800/80 leading-relaxed">
          I&apos;ve also been thinking a lot about the memories we made so far
          and about the day we officially met.
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="w-16 h-px bg-pink-300 mx-auto mb-8" />
        <p className="text-sm sm:text-base md:text-lg font-serif text-rose-400 leading-relaxed">
          Throughout this week, leading up to Valentine&apos;s Day, each day
          will start with a few words or a memory.
        </p>
      </div>
    ),
  },

  /* ---- Monday February 9 ---- */
  {
    unlockDate: "2026-02-09",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Monday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 9th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-600 italic mb-6">
          Preface
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed">
          I was thinking about spring, and the first day I met you. These are
          separate ideas, but all fall under the same general theme.
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-600 italic mb-6">
          Spring's Promise
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed mb-6 italic">
          The month of April feels like a dive into the unknown, a pleasant
          surprise that starts with an unexpected encounter.
        </p>
        <p className="text-base sm:text-lg md:text-xl font-serif text-rose-600 leading-loose">
          Spring Flower&apos;s Bloom.
          <br />
          Hope in motion.
          <br />
          Tomorrow arriving Early
        </p>
        <div className="w-12 h-px bg-pink-300 my-6" />
      </div>
    ),
  },

  /* ---- Monday Feb 9 — poem ---- */
  {
    unlockDate: "2026-02-09",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-600 italic mb-6">
          Your Name
        </h3>
        <p className="text-base sm:text-lg md:text-xl font-elegant text-rose-700 leading-relaxed mb-4">
          You&apos;re here!
        </p>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-loose">
          I knew I would see you soon—
          <br />
          Not logically,
          <br />
          Maybe prophetically—
          <br />
          I can&apos;t explain why.
          <br />
          No one will understand and
          <br />
          I wouldn&apos;t ask them to.
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-loose mb-4">
          But I could feel it.
          <br />
          <span className="italic">&ldquo;I will see her soon&rdquo;</span>
          <br />
          Words spoken in faith and
          <br />
          Faith became inevitable
          <br />
          Where will it lead?
          <br />
          Only God knows.
        </p>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-loose">
          But I&apos;ll do my part.
          <br />
          I&apos;ll start by saying your name—
        </p>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-loose">
          <strong>Bianca.</strong>
        </p>
      </div>
    ),
  },

  /* ---- Tuesday February 10 ---- */
  {
    unlockDate: "2026-02-10",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Tuesday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 10th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed italic">
          Coming soon...
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-sm sm:text-base md:text-lg font-serif text-rose-400">
          More to come...
        </p>
      </div>
    ),
  },

  /* ---- Wednesday February 11 ---- */
  {
    unlockDate: "2026-02-11",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Wednesday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 11th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed italic">
          Coming soon...
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-sm sm:text-base md:text-lg font-serif text-rose-400">
          More to come...
        </p>
      </div>
    ),
  },

  /* ---- Thursday February 12 ---- */
  {
    unlockDate: "2026-02-12",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Thursday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 12th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed italic">
          Coming soon...
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-sm sm:text-base md:text-lg font-serif text-rose-400">
          More to come...
        </p>
      </div>
    ),
  },

  /* ---- Friday February 13 ---- */
  {
    unlockDate: "2026-02-13",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Friday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 13th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed italic">
          Coming soon...
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-sm sm:text-base md:text-lg font-serif text-rose-400">
          More to come...
        </p>
      </div>
    ),
  },

  /* ---- Saturday February 14 ---- */
  {
    unlockDate: "2026-02-14",
    left: (
      <div className="flex flex-col justify-center h-full px-6 sm:px-10">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mb-2 font-serif">
          Saturday
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant text-rose-700 mb-6">
          February 14th
        </h2>
        <div className="w-12 h-px bg-pink-300 mb-6" />
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-rose-600 italic mb-4">
          Valentine&apos;s Day
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-elegant text-rose-800/80 leading-relaxed italic">
          The final chapter...
        </p>
      </div>
    ),
    right: (
      <div className="flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="text-5xl mb-4">✨</div>
        <p className="text-base sm:text-lg md:text-xl font-serif text-rose-500">
          Happy Valentine&apos;s Day, Bianca
        </p>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function nowET(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
}

function isUnlocked(unlockDate: string): boolean {
  const now = nowET();
  const [y, m, d] = unlockDate.split("-").map(Number);
  const unlock = new Date(y, m - 1, d, 0, 0, 0);
  return now >= unlock;
}

function lastAccessibleIndex(): number {
  let last = 0;
  for (let i = 0; i < SPREADS.length; i++) {
    if (isUnlocked(SPREADS[i].unlockDate)) last = i;
  }
  return last;
}

/** Flatten spreads into individual pages for mobile single-page view */
function flattenPages(): { node: React.ReactNode; spreadIdx: number }[] {
  const pages: { node: React.ReactNode; spreadIdx: number }[] = [];
  for (let i = 0; i < SPREADS.length; i++) {
    pages.push({ node: SPREADS[i].left, spreadIdx: i });
    pages.push({ node: SPREADS[i].right, spreadIdx: i });
  }
  return pages;
}

/** Find the last accessible flat-page index */
function lastAccessiblePage(pages: { spreadIdx: number }[]): number {
  const maxSpread = lastAccessibleIndex();
  let last = 0;
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].spreadIdx <= maxSpread) last = i;
  }
  return last;
}

/* ------------------------------------------------------------------ */
/*  Hook: detect mobile (<768px)                                      */
/* ------------------------------------------------------------------ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BookViewer() {
  const isMobile = useIsMobile();
  const allPages = flattenPages();

  /* ---- Shared state ---- */
  const [currentSpread, setCurrentSpread] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // for mobile
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [maxSpread, setMaxSpread] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  /* ---- Swipe handling ---- */
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMaxSpread(lastAccessibleIndex());
    setMaxPage(lastAccessiblePage(allPages));
    const interval = setInterval(() => {
      setMaxSpread(lastAccessibleIndex());
      setMaxPage(lastAccessiblePage(allPages));
    }, 60_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Desktop spread navigation ---- */
  const canGoNextSpread = currentSpread < maxSpread;
  const canGoPrevSpread = currentSpread > 0;

  const goNextSpread = useCallback(() => {
    if (!canGoNextSpread || isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread((p) => p + 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  }, [canGoNextSpread, isFlipping]);

  const goPrevSpread = useCallback(() => {
    if (!canGoPrevSpread || isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread((p) => p - 1);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  }, [canGoPrevSpread, isFlipping]);

  /* ---- Mobile page navigation ---- */
  const canGoNextPage = currentPage < maxPage;
  const canGoPrevPage = currentPage > 0;

  const goNextPage = useCallback(() => {
    if (!canGoNextPage || isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setIsFlipping(false);
      setFlipDirection(null);
      setSwipeOffset(0);
    }, 400);
  }, [canGoNextPage, isFlipping]);

  const goPrevPage = useCallback(() => {
    if (!canGoPrevPage || isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setIsFlipping(false);
      setFlipDirection(null);
      setSwipeOffset(0);
    }, 400);
  }, [canGoPrevPage, isFlipping]);

  /* ---- Touch / swipe handlers ---- */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    // Only track horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      touchDeltaX.current = deltaX;
      setSwipeOffset(deltaX);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 60;
    if (touchDeltaX.current < -threshold) {
      goNextPage();
    } else if (touchDeltaX.current > threshold) {
      goPrevPage();
    } else {
      setSwipeOffset(0);
    }
    touchDeltaX.current = 0;
  }, [goNextPage, goPrevPage]);

  /* ---- Tap zones for mobile (tap left 1/3 = prev, right 1/3 = next) ---- */
  const handleTap = useCallback(
    (e: React.MouseEvent) => {
      if (!isMobile || isFlipping) return;
      // Ignore if it was a swipe
      if (Math.abs(touchDeltaX.current) > 10) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const tapX = e.clientX - rect.left;
      const third = rect.width / 3;
      if (tapX < third) {
        goPrevPage();
      } else if (tapX > third * 2) {
        goNextPage();
      }
    },
    [isMobile, isFlipping, goNextPage, goPrevPage]
  );

  const spread = SPREADS[currentSpread];
  const mobilePageContent = allPages[currentPage];

  const nextSpreadLocked =
    currentSpread + 1 < SPREADS.length &&
    !isUnlocked(SPREADS[currentSpread + 1].unlockDate);

  const nextPageLocked =
    currentPage + 1 < allPages.length &&
    allPages[currentPage + 1].spreadIdx > lastAccessibleIndex();

  /* ================================================================ */
  /*  MOBILE: Single-page e-reader                                    */
  /* ================================================================ */
  if (isMobile) {
    return (
      <div className="book-viewer-mobile response-reveal">
        {/* Single page with swipe */}
        <div
          ref={containerRef}
          className="ebook-page-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleTap}
        >
          {/* Page */}
          <div
            className={`ebook-page ${
              flipDirection === "next"
                ? "ebook-slide-left"
                : flipDirection === "prev"
                ? "ebook-slide-right"
                : ""
            }`}
            style={
              !isFlipping && swipeOffset !== 0
                ? { transform: `translateX(${swipeOffset * 0.4}px)`, transition: "none" }
                : undefined
            }
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-amber-50/60 rounded-2xl" />
            <div className="relative z-10 h-full overflow-y-auto px-2 py-6">
              {mobilePageContent.node}
            </div>
            {/* Page number */}
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-rose-300 font-serif">
              {currentPage + 1} / {maxPage + 1}
            </span>
          </div>

          {/* Swipe hint arrows */}
          {canGoPrevPage && !isFlipping && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-rose-300/40 text-lg pointer-events-none">
              ‹
            </div>
          )}
          {canGoNextPage && !isFlipping && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-300/40 text-lg pointer-events-none">
              ›
            </div>
          )}
        </div>

        {/* Bottom navigation bar */}
        <div className="flex flex-col items-center w-full pt-3 pb-1 shrink-0">
          {/* Prev / Dots / Next row */}
          <div className="flex items-center justify-between w-full px-2">
            <button
              onClick={goPrevPage}
              disabled={!canGoPrevPage || isFlipping}
              className={`px-4 py-2 text-xs font-serif rounded-full transition-all duration-300 cursor-pointer ${
                canGoPrevPage
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              ← Prev
            </button>

            <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
              {allPages.map((p, i) => {
                const unlocked = p.spreadIdx <= lastAccessibleIndex();
                return (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? "bg-white scale-150"
                        : unlocked
                        ? "bg-white/30"
                        : "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={goNextPage}
              disabled={!canGoNextPage || isFlipping}
              className={`px-4 py-2 text-xs font-serif rounded-full transition-all duration-300 cursor-pointer ${
                canGoNextPage
                  ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              Next →
            </button>
          </div>

          {/* Locked teaser */}
          {nextPageLocked && currentPage === maxPage && (
            <p className="mt-1.5 text-xs text-white/40 font-serif tracking-wider animate-pulse">
              Next page unlocks at midnight ✨
            </p>
          )}

          {/* Swipe hint on first page */}
          {currentPage === 0 && !isFlipping && (
            <p className="mt-1.5 text-xs text-white/30 font-serif tracking-wider animate-pulse">
              Swipe or tap to turn pages
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  DESKTOP: Two-page spread with 3D page flip                      */
  /* ================================================================ */

  return (
    <div className="book-viewer response-reveal">
      <div
        className={`book-spread ${
          flipDirection === "next"
            ? "book-flip-next"
            : flipDirection === "prev"
            ? "book-flip-prev"
            : ""
        }`}
      >
        <div className="book-page book-page-left">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-amber-50/60" />
          <div className="absolute right-0 top-4 bottom-4 w-px bg-rose-200/40" />
          <div className="relative z-10 h-full">{spread.left}</div>
          <span className="absolute bottom-4 left-6 text-xs text-rose-300 font-serif">
            {currentSpread * 2 + 1}
          </span>
        </div>
        <div className="book-page book-page-right">
          <div className="absolute inset-0 bg-gradient-to-bl from-rose-50 to-amber-50/60" />
          <div className="absolute left-0 top-4 bottom-4 w-px bg-rose-200/40" />
          <div className="relative z-10 h-full">{spread.right}</div>
          <span className="absolute bottom-4 right-6 text-xs text-rose-300 font-serif">
            {currentSpread * 2 + 2}
          </span>
        </div>
        <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-r from-black/[0.06] via-black/[0.02] to-black/[0.06] pointer-events-none z-20" />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full max-w-2xl mt-6 px-4">
        <button
          onClick={goPrevSpread}
          disabled={!canGoPrevSpread || isFlipping}
          className={`px-5 py-2.5 text-sm font-serif rounded-full transition-all duration-300 cursor-pointer ${
            canGoPrevSpread
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "opacity-0 pointer-events-none"
          }`}
        >
          ← Previous
        </button>

        <div className="flex gap-1.5">
          {SPREADS.map((s, i) => {
            const unlocked = isUnlocked(s.unlockDate);
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentSpread
                    ? "bg-white scale-125"
                    : unlocked
                    ? "bg-white/40"
                    : "bg-white/15"
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={goNextSpread}
          disabled={!canGoNextSpread || isFlipping}
          className={`px-5 py-2.5 text-sm font-serif rounded-full transition-all duration-300 cursor-pointer ${
            canGoNextSpread
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "opacity-0 pointer-events-none"
          }`}
        >
          Next →
        </button>
      </div>

      {nextSpreadLocked && currentSpread === maxSpread && (
        <p className="mt-4 text-xs sm:text-sm text-white/40 font-serif tracking-wider animate-pulse">
          Next page unlocks at midnight ✨
        </p>
      )}
    </div>
  );
}
