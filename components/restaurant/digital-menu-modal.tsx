"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export function DigitalMenuModal({
  isOpen,
  onClose,
  images = []
}: {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
    [isOpen, onClose, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 flex h-full w-full max-w-[1200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl pb-16 md:pb-0">
        
        {/* Header Ribbon */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 md:p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 md:opacity-100">
          <div className="font-[family:var(--font-oswald)] text-lg uppercase tracking-widest text-white/50">
            Меню <span className="mx-2 text-white/20">|</span> {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Gallery Area */}
        <div className="relative flex-1 bg-[#0c0c0e]/50">
          {images.map((src, idx) => (
            <div
              key={src}
              className="absolute inset-0 flex items-center justify-center p-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                opacity: currentIndex === idx ? 1 : 0,
                transform: `translateX(${(idx - currentIndex) * 10}%) scale(${currentIndex === idx ? 1 : 0.95})`,
                pointerEvents: currentIndex === idx ? "auto" : "none"
              }}
            >
              <div className="relative h-full w-full max-w-[600px] overflow-hidden rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <Image
                  src={src}
                  alt={`Menu page ${idx + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={idx === 0 || idx === 1}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between pointer-events-none px-2 md:px-6">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition disabled:opacity-0 hover:bg-black/80 border border-white/10"
            aria-label="Previous page"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))}
            disabled={currentIndex === images.length - 1}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition disabled:opacity-0 hover:bg-black/80 border border-white/10"
            aria-label="Next page"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Page Indicator & Close Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex md:hidden items-center justify-between bg-black/60 backdrop-blur-md p-4 border-t border-white/10">
           <div className="font-[family:var(--font-oswald)] text-base uppercase text-white/70">
            Страница {currentIndex + 1} из {images.length}
          </div>
          <button
            onClick={onClose}
            className="font-[family:var(--font-oswald)] text-base uppercase text-[var(--accent-red)]"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
