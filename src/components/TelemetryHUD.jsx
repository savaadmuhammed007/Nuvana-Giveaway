import React from 'react';

export default function TelemetryHUD({ scrollProgress = 0 }) {
  // Current act determination
  let currentAct = 1;
  let actName = 'THE JOURNEY';
  if (scrollProgress >= 0.35 && scrollProgress < 0.70) {
    currentAct = 2;
    actName = 'ARRIVAL';
  } else if (scrollProgress >= 0.70) {
    currentAct = 3;
    actName = 'THE NEW OFFICE';
  }

  // Simulated altitude descent from 14,000 FT down to 0 FT (Touchdown)
  const altitude = Math.max(0, Math.round(14000 * (1 - scrollProgress)));

  return (
    <aside aria-label="Flight telemetry" className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none p-6 md:p-8 flex items-end justify-between select-none">
      {/* Bottom-Left: 3 Acts Indicator */}
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((act) => (
            <div
              key={act}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentAct === act
                  ? 'w-6 bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]'
                  : currentAct > act
                  ? 'w-2 bg-white/40'
                  : 'w-2 bg-white/15'
              }`}
            />
          ))}
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-300 uppercase">
          ACT 0{currentAct} <span className="text-white/40">/</span> {actName}
        </div>
      </div>

      {/* Bottom-Right: Flight Altitude / Telemetry */}
      <div className="hidden sm:flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl font-mono text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 uppercase tracking-widest text-[10px]">ALT</span>
          <span className="text-white font-bold">{altitude.toLocaleString()} FT</span>
        </div>
        <span className="text-white/20">|</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 uppercase tracking-widest text-[10px]">DEST</span>
          <span className="text-[#FF6B00] font-bold">PAPPINISSERI</span>
        </div>
      </div>
    </aside>
  );
}
