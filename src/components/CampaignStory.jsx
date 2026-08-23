import React from 'react';
import { Globe, PlaneTakeoff, Truck, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

export default function CampaignStory() {
  return (
    <section id="story" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Navigation className="w-3.5 h-3.5" />
            Our Vision & Launch Story
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            From Pappinisseri to the <span className="text-gradient-orange">World.</span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            For years, residents of Pappinisseri, Keecheri, Aaron, Kalliasseri, Dharmasala, and Valapattanam had to travel far for reliable international ticketing, Gulf cargo couriers, and visa services.
          </p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            <strong className="text-white">Nuvana.go</strong> changes that today. We bring airline-direct flight bookings, fast door-to-door GCC express air & sea cargo, customized family holiday packages, and hassle-free visa documentation right to your doorstep in Pappinisseri.
          </p>
        </div>

        {/* 3 Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Direct Connectivity */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">
              Kannur & Global Gateway
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fast connectivity with Kannur International Airport (CNN), Calicut (CCJ), and Cochin (COK). Direct flight deals, seat selection, and 24/7 boarding assistance.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-amber-400/90 flex items-center gap-1.5">
              <span>✈️ All Major Domestic & Gulf Airlines</span>
            </div>
          </div>

          {/* Card 2: GCC & Worldwide Express Cargo */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">
              Hometown to Gulf & Beyond
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Send homemade snacks, pickles, clothing, essential goods, and heavy parcels to your family in UAE, Saudi Arabia, Qatar, Oman, Kuwait, UK, and USA.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-emerald-400/90 flex items-center gap-1.5">
              <span>📦 Doorstep Pickup & Real-time Tracking</span>
            </div>
          </div>

          {/* Card 3: 100% Trust & Transparent Guidance */}
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-heading">
              Personalized Local Care
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transparent visa documentation, embassy attestation, family tourist packages, and round-the-clock Malayalam & English customer support team.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-semibold text-cyan-400/90 flex items-center gap-1.5">
              <span>🌟 Honest Guidance • Zero Hidden Fees</span>
            </div>
          </div>

        </div>

        {/* Local Community Connectivity Bar */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Serving the North Malabar Community</h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Pappinisseri • Keecheri • Aaron • Kalliasseri • Dharmasala • Valapattanam • Azhikode • Kannur
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Launch Campaign 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
}
