import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Compass, Plane } from 'lucide-react';

export default function ActOneJourney({ scrollProgress = 0 }) {
  // Phase 1: Initial opening text (progress 0.00 -> 0.15)
  // Phase 2: "Pappinisseri / We are approaching" (progress 0.16 -> 0.34)
  const isPhase1 = scrollProgress < 0.15;
  const isPhase2 = scrollProgress >= 0.15 && scrollProgress < 0.35;
  const isVisible = scrollProgress < 0.36;

  if (!isVisible) return null;

  // Calculate smooth fade-out as we transition to Act 2
  const actFade = scrollProgress > 0.30 ? Math.max(0, 1 - (scrollProgress - 0.30) / 0.05) : 1;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-12 transition-opacity duration-300"
      style={{ opacity: actFade }}
    >
      {/* Top telemetry spacer (under nav) */}
      <div className="h-16" />

      {/* Center Cinematic Typography Stage */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
        {/* Phase 1: A NEW JOURNEY BEGINS */}
        {isPhase1 && (
          <div className="flex flex-col items-center gap-4 transition-all duration-700 animate-fadeIn">
            {/* Minimal editorial pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-[0.25em] text-slate-300 uppercase shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              ACT 01 // THE JOURNEY
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] drop-shadow-2xl">
              A NEW JOURNEY
              <span className="block text-gradient-hero">BEGINS</span>
            </h1>

            {/* Small supporting text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light tracking-wide max-w-md mt-2 drop-shadow">
              Something new is arriving.
            </p>
          </div>
        )}

        {/* Phase 2: PAPPINISSERI — We are approaching */}
        {isPhase2 && (
          <div className="flex flex-col items-center gap-4 transition-all duration-700 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-[0.25em] text-[#FF6B00] uppercase shadow-lg">
              <Plane className="w-3.5 h-3.5 text-[#FF6B00] -rotate-45" />
              WE ARE APPROACHING
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
              Pappinisseri
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 font-mono tracking-widest uppercase">
              11.9544° N, 75.3533° E • Kannur District
            </p>
          </div>
        )}
      </div>

      {/* Bottom Scroll Cue */}
      <div className="flex flex-col items-center justify-center gap-2 text-center pb-4">
        {scrollProgress < 0.08 && (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase opacity-70">
              Scroll to Fly In
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#FF6B00] animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
