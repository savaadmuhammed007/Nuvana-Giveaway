import React from 'react';

export default function ActTwoArrival({ scrollProgress = 0 }) {
  // Act 02 active zone: 0.33 to 0.72
  const isVisible = scrollProgress >= 0.33 && scrollProgress <= 0.73;

  if (!isVisible) return null;

  // Calculate smooth fade in / fade out
  let opacity = 1;
  if (scrollProgress < 0.38) {
    opacity = (scrollProgress - 0.33) / 0.05;
  } else if (scrollProgress > 0.67) {
    opacity = 1 - (scrollProgress - 0.67) / 0.05;
  }

  // Phase split: "HI PAPPINISSERI" -> "WE'RE HERE."
  const showHere = scrollProgress >= 0.46;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-center items-center p-6 md:p-12 text-center transition-opacity duration-300 select-none"
      style={{ opacity: Math.max(0, Math.min(1, opacity)) }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6">
        {/* Act Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-[0.25em] text-[#FF6B00] uppercase shadow-xl mb-1">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" />
          ACT 02 // ARRIVAL
        </div>

        {/* First Line: HI PAPPINISSERI */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100 uppercase drop-shadow-2xl">
          Hi Pappinisseri
        </h2>

        {/* Major Visual Moment: WE'RE HERE. */}
        <div className="overflow-hidden">
          <h1
            className={`text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter uppercase leading-[0.88] transition-all duration-700 ${
              showHere
                ? 'opacity-100 translate-y-0 scale-100 text-gradient-orange glow-orange-lg'
                : 'opacity-20 translate-y-8 scale-95 text-white/40'
            }`}
          >
            We're Here.
          </h1>
        </div>

        {/* Supporting Line */}
        <p
          className={`text-base sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide max-w-xl transition-all duration-700 delay-100 ${
            showHere ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A new <span className="font-semibold text-white">Nuvana<span className="text-[#FF6B00]">.go</span></span> experience is coming your way.
        </p>
      </div>
    </div>
  );
}
