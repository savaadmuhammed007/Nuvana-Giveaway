import React from 'react';
import { X, Plane, Package, Compass, MapPin, Sparkles } from 'lucide-react';

export default function ExploreDrawer({ isOpen, onClose, onOpenStayTuned }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#020408]/85 backdrop-blur-xl transition-opacity animate-fadeIn"
      />

      {/* Content Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#090E18]/95 border border-white/[0.12] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]" />
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              About Nuvana<span className="text-[#FF6B00]">.go</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Narrative */}
        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#FF6B00] uppercase block mb-2">
              Our Vision
            </span>
            <p className="text-xl sm:text-2xl font-medium text-slate-100 leading-snug">
              "Travel. Cargo. And everything that takes you further."
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* 1. Travel */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-3">
                <Plane className="w-5 h-5 text-sky-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Travel</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Elevated flight journeys and bespoke worldwide holiday experiences.
              </p>
            </div>

            {/* 2. Cargo */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center mb-3">
                <Package className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Cargo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless express international logistics and Gulf connections.
              </p>
            </div>

            {/* 3. Further */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">And Beyond</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering your global journey from the heart of Pappinisseri.
              </p>
            </div>
          </div>

          {/* Location Focus */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#FF6B00]" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Pappinisseri Launch Hub</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Opp Kattilepalli, Pappinisseri - 670561, Kannur, Kerala.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono">
                <a href="tel:+917559966620" className="text-cyan-400 hover:underline">Travels: +91 755 996 6620</a>
                <span>•</span>
                <a href="tel:+917559966621" className="text-[#FF6B00] hover:underline">Cargo: +91 755 996 6621</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            LAUNCH SCHEDULED • 2026
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenStayTuned();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl glass-button-primary text-white text-sm font-semibold cursor-pointer"
          >
            Join Launch Notification List
          </button>
        </div>
      </div>
    </div>
  );
}
