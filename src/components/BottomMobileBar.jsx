import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Gift, Plane, MessageCircle, MapPin } from 'lucide-react';
import { buildDirectWhatsAppInquiry } from '../utils/shareHelpers';

export default function BottomMobileBar() {
  const { openGiveaway, myEntry, setIsSuccessOpen } = useCampaign();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden glass-panel border-t border-slate-700/80 px-4 py-2.5 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Services */}
        <button
          onClick={() => scrollTo('services')}
          className="flex-1 py-1.5 flex flex-col items-center justify-center text-slate-400 hover:text-amber-400 transition-colors"
        >
          <Plane className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Services</span>
        </button>

        {/* Primary Giveaway Button */}
        {myEntry ? (
          <button
            onClick={() => setIsSuccessOpen(true)}
            className="flex-[2] py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5 animate-pulse"
          >
            <Gift className="w-4 h-4" />
            <span>My Entry ID</span>
          </button>
        ) : (
          <button
            onClick={() => openGiveaway('Mobile Floating Bar')}
            className="flex-[2.5] py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/35 flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <Gift className="w-4 h-4" />
            <span>ENTER GIVEAWAY</span>
          </button>
        )}

        {/* WhatsApp Chat */}
        <a
          href={buildDirectWhatsAppInquiry('Flight Tickets & Travel Services', 'travel')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-1.5 flex flex-col items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Chat</span>
        </a>

        {/* Office Location */}
        <button
          onClick={() => scrollTo('office')}
          className="flex-1 py-1.5 flex flex-col items-center justify-center text-slate-400 hover:text-amber-400 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Office</span>
        </button>

      </div>
    </div>
  );
}
