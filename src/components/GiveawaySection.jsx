import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  Gift, 
  Trophy, 
  Sparkles, 
  Plane, 
  Package, 
  Luggage, 
  CheckCircle2, 
  Users,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function GiveawaySection() {
  const { openGiveaway, totalCount, myEntry, setIsSuccessOpen } = useCampaign();

  return (
    <section id="giveaway" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Radiant Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-orange-500/15 to-transparent blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Box Card */}
        <div className="relative glass-panel rounded-3xl border border-amber-500/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl shadow-amber-500/10">
          
          {/* Background Decorative Graphic Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-400" />
                Pappinisseri Launch Giveaway
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                Limited Period Launch Event
              </span>
            </div>

            {/* Main Headline & Copy */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                Scan. Explore. Enter.{' '}
                <span className="text-gradient-orange">Win.</span>
              </h2>
              
              <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Be part of our new beginning. Enter our launch giveaway and stand a chance to win exciting prizes.
              </p>
            </div>

            {/* 2 Prize Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 max-w-3xl mx-auto">
              
              {/* Prize 1: Resort Stay */}
              <div className="glass-card p-7 sm:p-8 rounded-3xl border border-amber-500/40 text-center relative group hover:border-amber-400 transition-all bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent shadow-xl shadow-amber-500/10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-amber-400" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1.5 font-mono">
                  🥇 GRAND 1ST PRIZE
                </div>
                <h3 className="text-2xl font-black text-white mb-2 font-heading tracking-tight">
                  Luxury Resort Stay
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Complimentary luxury resort getaway experience for you and your family.
                </p>
              </div>

              {/* Prize 2: Free Shipment up to 10kg */}
              <div className="glass-card p-7 sm:p-8 rounded-3xl border border-[#FF6B00]/40 text-center relative group hover:border-[#FF6B00] transition-all bg-gradient-to-b from-[#FF6B00]/15 via-[#FF6B00]/5 to-transparent shadow-xl shadow-[#FF6B00]/10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF6B00] flex items-center justify-center shadow-lg shadow-[#FF6B00]/20 group-hover:scale-110 transition-transform">
                  <Package className="w-7 h-7 text-[#FF6B00]" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] mb-1.5 font-mono">
                  🥈 2ND PRIZE
                </div>
                <h3 className="text-2xl font-black text-white mb-2 font-heading tracking-tight">
                  Free Shipment (Up to 10kg)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  100% free international air cargo or express courier shipment up to 10kg by Nuvana.ex.
                </p>
              </div>

            </div>

            {/* CTA Button or Existing Entry Status */}
            <div className="pt-4">
              {myEntry ? (
                <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40">
                  <div className="text-left">
                    <div className="text-xs text-amber-400 font-semibold">You have entered this giveaway!</div>
                    <div className="text-sm font-bold text-white font-mono">Entry ID: {myEntry.entryId}</div>
                  </div>
                  <button
                    onClick={() => setIsSuccessOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-2"
                  >
                    <span>View My Entry & Referral Link</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => openGiveaway('Giveaway Section CTA')}
                  className="px-10 py-5 rounded-2xl font-black text-lg text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 inline-flex items-center gap-3 group relative overflow-hidden active:scale-95"
                >
                  <Gift className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
                  <span>ENTER GIVEAWAY</span>
                  <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
                  <span className="absolute inset-0 w-full h-full bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
              )}
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free Online Entry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Office Visit Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Transparent Public Lucky Draw</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span><strong>{totalCount.toLocaleString()}+</strong> Local Participants</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
