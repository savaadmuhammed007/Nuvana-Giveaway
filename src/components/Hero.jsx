import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  Gift, 
  ArrowRight, 
  Sparkles, 
  Plane, 
  Package, 
  ShieldCheck, 
  Ticket, 
  MapPin, 
  Users, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function Hero() {
  const { openGiveaway, totalCount, qrSource } = useCampaign();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGiveaway = () => {
    const el = document.getElementById('giveaway');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 min-h-[85vh] flex flex-col justify-center">
      {/* Background Decorative Gradients & Radiant Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-b from-[#FF6B00]/20 via-amber-500/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FF6B00]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-5xl mx-auto space-y-7 sm:space-y-9">

          {/* Campaign Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#FF6B00]/30 text-xs font-mono tracking-[0.2em] text-[#FF6B00] uppercase shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
              NUVANA.GO ARRIVAL • PAPPINISSERI 2026
            </span>

            {totalCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong>{totalCount.toLocaleString()}+</strong> Joined</span>
              </span>
            )}
          </div>

          {/* Main Cinematic Arrival Headlines: HI PAPPINISSERI. WE'RE HERE. */}
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-200 uppercase drop-shadow-2xl font-heading">
              Hi Pappinisseri,
            </h2>
            
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.88] text-gradient-orange glow-orange-lg drop-shadow-2xl">
              We're Here.
            </h1>
          </div>

          {/* Sub-copy with exact brand positioning */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <p className="text-lg sm:text-2xl md:text-3xl text-slate-200 font-light tracking-wide leading-relaxed">
              A new <strong className="font-bold text-white">Nuvana<span className="text-[#FF6B00]">.go</span></strong> & <strong className="font-bold text-white">Nuvana<span className="text-[#FF6B00]">.ex</span></strong> experience is coming your way.
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Travel. Cargo. And everything that takes you further — now in Pappinisseri, Kannur.
            </p>
          </div>

          {/* Primary Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 pt-3">
            <button
              onClick={() => openGiveaway('Hero Section')}
              className="w-full sm:w-auto px-9 py-4 sm:py-4.5 rounded-2xl font-black text-base sm:text-lg text-slate-950 bg-gradient-to-r from-amber-400 via-[#FF6B00] to-amber-500 hover:from-amber-300 hover:to-[#FF6B00] shadow-2xl shadow-[#FF6B00]/40 hover:shadow-[#FF6B00]/60 transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95 cursor-pointer"
            >
              <Gift className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>Enter Launch Giveaway</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950 text-[11px] uppercase tracking-wider font-black">
                FREE
              </span>
            </button>

            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto px-8 py-4 sm:py-4.5 rounded-2xl font-bold text-base text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Key Value Pillars Row */}
          <div className="pt-6 pb-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80 bg-slate-950/40">
              <Plane className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Kannur (CNN) Flights</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80 bg-slate-950/40">
              <Package className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span className="text-xs font-semibold text-slate-200">GCC & Global Cargo</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80 bg-slate-950/40">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">100% Visa Stamping</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80 bg-slate-950/40">
              <Ticket className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Holidays & Tours</span>
            </div>
          </div>

          {/* Office Location Pill */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800/80">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Opp Kattilepalli, Pappinisseri - 670561, Kannur, Kerala</span>
          </div>

        </div>
      </div>
    </section>
  );
}
