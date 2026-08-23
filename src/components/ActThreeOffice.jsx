import React from 'react';
import { ArrowRight, Sparkles, MapPin, Compass, ChevronDown, Gift } from 'lucide-react';

export default function ActThreeOffice({ scrollProgress = 0, onOpenStayTuned, onOpenExplore, onScrollToCampaign }) {
  // Act 03 active zone: 0.68 -> 1.00
  const isVisible = scrollProgress >= 0.68;

  if (!isVisible) return null;

  // Calculate smooth fade-in
  const opacity = Math.min(1, Math.max(0, (scrollProgress - 0.68) / 0.08));

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col justify-between items-center p-6 md:p-10 text-center transition-opacity duration-500 overflow-y-auto select-none"
      style={{ opacity }}
    >
      {/* Calmer, Luxurious Dark Glass Backing */}
      <div className="absolute inset-0 bg-[#03060C]/75 backdrop-blur-2xl pointer-events-none" />

      {/* Spacer top */}
      <div className="h-12 sm:h-16 shrink-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center gap-5 sm:gap-7 my-auto">
        {/* Act Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-[0.25em] text-[#FF6B00] uppercase shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          ACT 03 // THE NEW OFFICE
        </div>

        {/* Launch Message Header */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider text-slate-300 uppercase">
          Our New Office is Coming Soon
        </h3>

        {/* Brand Lockup */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none drop-shadow-2xl">
            Nuvana<span className="text-[#FF6B00]">.go</span>
          </h1>
          <div className="flex items-center gap-3 mt-2 sm:mt-3">
            <span className="h-[1px] w-8 sm:w-16 bg-white/20" />
            <span className="text-2xl sm:text-4xl md:text-5xl font-light tracking-widest text-slate-200 uppercase">
              Pappinisseri
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-white/20" />
          </div>
        </div>

        {/* Exact Supporting Text Requested */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-light tracking-wide max-w-2xl leading-relaxed">
          Travel. Cargo. And everything that takes you further.
        </p>

        {/* Action Buttons (Sophisticated Glass Style) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-1 w-full max-w-md justify-center">
          {/* Primary CTA: Stay Tuned */}
          <button
            onClick={onOpenStayTuned}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-2xl glass-button-primary text-white font-semibold text-base md:text-lg flex items-center justify-center gap-3 cursor-pointer group shadow-2xl"
          >
            <span>Stay Tuned</span>
            <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Explore Nuvana.go */}
          <button
            onClick={onOpenExplore}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl glass-button-secondary text-slate-200 hover:text-white font-medium text-base md:text-lg flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Compass className="w-5 h-5 text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
            <span>Explore Nuvana.go</span>
          </button>
        </div>

        {/* Location & Status */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-3 w-full max-w-lg">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Pappinisseri, Kannur, Kerala</span>
          </div>
          <span>•</span>
          <span className="text-slate-300">Launch 2026</span>
        </div>
      </div>

      {/* Bottom Scroll Cue to Transition to Full Campaign & Giveaway */}
      <div className="relative z-10 flex flex-col items-center gap-2 pb-2">
        <button
          onClick={onScrollToCampaign}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-[#FF6B00]/30 to-amber-500/20 hover:from-amber-500/30 hover:to-[#FF6B00]/40 border border-[#FF6B00]/40 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#FF6B00]/10 transition-all cursor-pointer hover:scale-105"
        >
          <Gift className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Scroll to Enter Grand Launch Giveaway</span>
          <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </button>
      </div>
    </div>
  );
}
