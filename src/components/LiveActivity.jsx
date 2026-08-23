import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export default function LiveActivity() {
  const { recentNotification } = useCampaign();

  if (!recentNotification) return null;

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <div className="glass-panel p-3.5 rounded-2xl border border-amber-500/30 shadow-xl shadow-black/50 flex items-center gap-3 backdrop-blur-xl">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>New Giveaway Entry!</span>
          </div>
          <div className="text-xs font-bold text-white truncate max-w-[200px]">
            {recentNotification.name} <span className="text-slate-400 font-normal">from</span> {recentNotification.place}
          </div>
          <div className="text-[10px] text-slate-400">
            Selected: <span className="text-slate-300 font-medium">{recentNotification.service}</span> • Just now
          </div>
        </div>
      </div>
    </div>
  );
}
