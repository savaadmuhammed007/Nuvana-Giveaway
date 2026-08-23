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
  CheckCircle2 
} from 'lucide-react';

export default function Hero() {
  const { openGiveaway, totalCount, qrSource } = useCampaign();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getSourceDisplay = (source) => {
    if (!source || source === 'direct-web') return 'Pappinisseri Launch Campaign';
    return source.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-32">
      {/* Background Decorative Gradients & Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-orange-600/15 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">

          {/* Campaign Badges & QR Source Tracking Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-amber-500/10">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              PAPPINISSERI LAUNCH 2026
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 text-xs sm:text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Location Poster: <strong>{getSourceDisplay(qrSource)}</strong></span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>{totalCount.toLocaleString()}+</strong> Joined</span>
            </span>
          </div>

          {/* Main Cinematic Headlines */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Something New Has Arrived in{' '}
              <span className="text-gradient-orange relative inline-block">
                Pappinisseri.
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-transparent rounded-full" />
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 font-heading">
              Your journeys. Your cargo. Your world.
            </p>
          </div>

          {/* Sub-copy with Kerala / North Malabar local connection */}
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong className="text-white">Nuvana.go</strong> — your premier international travel agency, worldwide cargo express, visa stamping & flight ticketing center right here in Pappinisseri, Kerala.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => openGiveaway('Hero Section')}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl font-extrabold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/45 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden active:scale-95"
            >
              <Gift className="w-5 h-5 text-slate-950 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
              <span>Enter Launch Giveaway</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950 text-xs uppercase tracking-wider font-black">
                FREE
              </span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Key Value Pillars Row */}
          <div className="pt-6 pb-2 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80">
              <Plane className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Kannur (CNN) Direct</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80">
              <Package className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">GCC & Global Cargo</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">100% Visa Support</span>
            </div>
            <div className="glass-card px-3.5 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-800/80">
              <Ticket className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Instant Ticketing</span>
            </div>
          </div>

          {/* No Office Visit Required Reminder */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Online Campaign • Enter from anywhere • No office visit required to win!</span>
          </div>

        </div>
      </div>
    </section>
  );
}
