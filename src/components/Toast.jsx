import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useCampaign();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-emerald-950/80',
    error: 'border-red-500/40 bg-red-950/80',
    warning: 'border-amber-500/40 bg-amber-950/80',
    info: 'border-cyan-500/40 bg-cyan-950/80'
  };

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-50 max-w-sm animate-in slide-in-from-top-5 fade-in duration-200 pointer-events-auto">
      <div className={`p-4 rounded-2xl border ${borderColors[toast.type || 'info']} shadow-2xl backdrop-blur-xl flex items-center gap-3 text-left`}>
        {icons[toast.type || 'info']}
        <p className="text-xs font-semibold text-white leading-relaxed">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
