import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  X, 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  MapPin, 
  Printer,
  Gift,
  ExternalLink
} from 'lucide-react';
import { copyToClipboard } from '../utils/shareHelpers';

export default function QRGeneratorModal() {
  const { isQRGenOpen, setIsQRGenOpen, showToast } = useCampaign();
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isQRGenOpen) return null;

  const campaignUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') ? window.location.origin : 'https://nuvana-giveaway.vercel.app')
    : 'https://nuvanago.in';

  // Crisp High-Resolution Vector/PNG QR Code
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(campaignUrl)}&color=070B14&bgcolor=FFFFFF&margin=12`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(campaignUrl);
    if (success) {
      setCopiedUrl(true);
      showToast('Campaign URL copied to clipboard!', 'success');
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  const handlePrintPoster = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl glass-panel rounded-3xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQRGenOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            Official Campaign QR Poster
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
            Universal Launch QR Code
          </h3>
          <p className="text-xs text-slate-400">
            One single, official QR code used for all printed posters and public displays across all areas.
          </p>
        </div>

        {/* Single Printable Poster Card Preview */}
        <div className="bg-gradient-to-b from-[#0F172A] via-[#090F1C] to-[#060A14] p-6 rounded-3xl border-2 border-amber-500/50 text-center shadow-2xl space-y-4 relative overflow-hidden">
          
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#FF6B00] uppercase">
              SCAN • EXPLORE • WIN
            </div>
            
            <h4 className="text-2xl font-black text-white font-heading tracking-tight">
              Nuvana<span className="text-amber-500">.go</span> & Nuvana<span className="text-[#FF6B00]">.ex</span>
            </h4>
            
            <p className="text-xs text-slate-300 font-medium">
              Pappinisseri Grand Launch Giveaway
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-3.5 bg-white rounded-2xl inline-block shadow-2xl border-4 border-amber-400/80">
            <img 
              src={qrImageUrl} 
              alt="Official Nuvana Campaign QR Code" 
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-lg" 
            />
          </div>

          {/* Prize Highlights */}
          <div className="space-y-1 bg-white/[0.03] p-3 rounded-2xl border border-white/10 max-w-sm mx-auto">
            <div className="text-xs font-bold text-amber-400 flex items-center justify-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              <span>1st Prize: Luxury Resort Stay</span>
            </div>
            <div className="text-xs font-bold text-[#FF6B00] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2nd Prize: Free Shipment (Up to 10kg)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3 text-[#FF6B00]" />
            <span>Opp Kattilepalli, Pappinisseri - 670561</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={qrImageUrl}
            download="Nuvana_Official_Launch_QR.png"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download HD QR Code</span>
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedUrl ? 'Link Copied!' : 'Copy Campaign Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
