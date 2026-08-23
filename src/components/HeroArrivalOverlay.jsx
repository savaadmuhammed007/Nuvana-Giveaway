import React from 'react';
import { ChevronDown, Gift } from 'lucide-react';

export default function HeroArrivalOverlay({ scrollProgress = 0, onScrollToGiveaway }) {
  // 1. Initial State (at top of page): subtle scroll hint
  const showInitialHint = scrollProgress < 0.12;

  // 2. Arrival Reveal: triggers after the high-speed flight scrub (>= 0.70)
  const isArrival = scrollProgress >= 0.70;
  const arrivalOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.70) / 0.15));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between items-center p-6 md:p-12 select-none">
      {/* Top spacer (under nav) */}
      <div className="h-16" />

      {/* Center Arrival Message (Reveals after flight scrub completes) */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 transition-opacity duration-300 pointer-events-auto"
        style={{
          opacity: isArrival ? arrivalOpacity : 0,
          pointerEvents: isArrival ? 'auto' : 'none'
        }}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono tracking-[0.25em] text-[#FF6B00] uppercase shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
            NUVANA.GO ARRIVAL
          </div>

          {/* First Line: HI PAPPINISSERI */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 uppercase drop-shadow-2xl">
            Hi Pappinisseri
          </h2>

          {/* Hero Line: WE'RE HERE. */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter uppercase leading-[0.88] text-gradient-orange glow-orange-lg drop-shadow-2xl">
            We're Here.
          </h1>

          {/* Short Supporting Line */}
          <p className="text-base sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide max-w-xl drop-shadow">
            A new <span className="font-semibold text-white">Nuvana<span className="text-[#FF6B00]">.go</span></span> experience is coming your way.
          </p>

          {/* Direct Giveaway Action Button */}
          <button
            onClick={onScrollToGiveaway}
            className="mt-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-[#FF6B00] to-amber-500 hover:from-amber-300 hover:to-[#FF6B00] text-slate-950 font-black text-base md:text-lg flex items-center justify-center gap-3 cursor-pointer shadow-2xl shadow-[#FF6B00]/40 hover:scale-105 active:scale-95 transition-all group"
          >
            <Gift className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Enter Launch Giveaway</span>
            <ChevronDown className="w-5 h-5 text-slate-950 group-hover:translate-y-1 transition-transform animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Initial Scroll Cue (fades out as soon as user starts scrolling) */}
      <div
        className="flex flex-col items-center justify-center gap-2 pb-4 transition-opacity duration-300"
        style={{ opacity: showInitialHint ? 1 : 0 }}
      >
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 opacity-80">
          Scroll to Fly In
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#FF6B00] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
