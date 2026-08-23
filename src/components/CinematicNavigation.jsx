import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { toggleFlightAudio, isAudioPlaying } from '../utils/audio';

export default function CinematicNavigation({ scrollProgress = 0, onOpenExplore }) {
  const [audioActive, setAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(scrollProgress > 0.05);
  }, [scrollProgress]);

  const handleAudioToggle = () => {
    const active = toggleFlightAudio();
    setAudioActive(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 select-none ${
        scrolled
          ? 'bg-[#03060C]/60 backdrop-blur-xl border-b border-white/[0.06] py-3.5 px-6 md:px-10 shadow-2xl'
          : 'bg-gradient-to-b from-[#03060C]/80 via-[#03060C]/30 to-transparent py-5 px-6 md:px-10'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenExplore}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Nuvana.go Home"
          >
            {/* Pulsing Orange Accent Dot */}
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_12px_#FF6B00]" />
              <span className="absolute w-4 h-4 rounded-full bg-[#FF6B00]/40 animate-ping" />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-[#FF6B00] transition-colors">
                Nuvana<span className="text-[#FF6B00]">.go</span>
              </span>
            </div>
          </button>
        </div>

        {/* Center: Subtle Flight Status (visible on md screens) */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-mono tracking-widest text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          <span className="uppercase text-slate-300">Inbound to Pappinisseri</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">FLT NV-07</span>
        </div>

        {/* Right: Destination & Sound Controller & Giveaway Button */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Launch Giveaway Link */}
          <button
            onClick={() => {
              if (window.location.hash !== '#giveaway') {
                window.location.hash = 'giveaway';
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B00]/15 hover:bg-[#FF6B00]/25 border border-[#FF6B00]/30 text-xs font-semibold text-[#FF6B00] transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105"
            title="Go to Grand Launch Giveaway"
          >
            <span className="text-sm">🎁</span>
            <span className="hidden sm:inline">Giveaway</span>
          </button>

          {/* Audio Ambience Button */}
          <button
            onClick={handleAudioToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-slate-300 transition-all duration-300 backdrop-blur-md group cursor-pointer"
            title={audioActive ? 'Mute Flight Ambience' : 'Play Flight Ambience'}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
                <span className="hidden sm:inline text-[11px] tracking-wider text-[#FF6B00]">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                <span className="hidden sm:inline text-[11px] tracking-wider text-slate-400">SOUND</span>
              </>
            )}
          </button>

          {/* Destination Tag */}
          <div className="flex items-center gap-2 text-right">
            <span className="text-sm md:text-base font-semibold tracking-wide text-white">
              Pappinisseri
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
