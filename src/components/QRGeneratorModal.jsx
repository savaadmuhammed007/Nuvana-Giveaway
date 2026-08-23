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
  ExternalLink,
  Printer
} from 'lucide-react';
import { copyToClipboard } from '../utils/shareHelpers';

const PRESET_LOCATIONS = [
  { id: 'pappinisseri-junction', label: 'Pappinisseri Main Junction' },
  { id: 'bus-stand', label: 'Pappinisseri Bus Stand' },
  { id: 'railway-station', label: 'Pappinisseri Railway Station' },
  { id: 'keechery-poster', label: 'Keecheri Market Poster' },
  { id: 'aaron-chowk', label: 'Aaron Junction' },
  { id: 'kalliasseri-center', label: 'Kalliasseri Town Center' },
  { id: 'dharmasala-hub', label: 'Dharmasala College Junction' },
  { id: 'valapattanam-bridge', label: 'Valapattanam Highway' }
];

export default function QRGeneratorModal() {
  const { isQRGenOpen, setIsQRGenOpen, showToast } = useCampaign();
  const [sourceKey, setSourceKey] = useState('pappinisseri-junction');
  const [posterTitle, setPosterTitle] = useState('Pappinisseri Main Junction Poster');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isQRGenOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nuvana.go';
  const fullQrUrl = `${baseUrl}?source=${encodeURIComponent(sourceKey)}`;

  // Quick reliable Google Chart API / QR Server URL for crisp QR image
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(fullQrUrl)}&color=070B14&bgcolor=FFFFFF&margin=10`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(fullQrUrl);
    if (success) {
      setCopiedUrl(true);
      showToast('QR Campaign URL copied to clipboard!', 'success');
      setTimeout(() => setCopiedUrl(false), 3000);
    }
  };

  const handleSelectPreset = (preset) => {
    setSourceKey(preset.id);
    setPosterTitle(preset.label);
  };

  const handlePrintPoster = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl glass-panel rounded-3xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQRGenOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            Campaign Poster QR Kit
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Generate Tracked QR Posters
          </h3>
          <p className="text-xs text-slate-400">
            Create unique QR codes for physical posters across Pappinisseri to track scans and lead conversions in real time.
          </p>
        </div>

        {/* Two-Column: Controls vs Live Poster Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          
          {/* Left: Settings */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Preset Public Locations:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESET_LOCATIONS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`p-2 rounded-xl text-left text-xs font-medium transition-all border ${sourceKey === p.id ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    📍 {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Custom Source Key (`?source=...`):
              </label>
              <input
                type="text"
                value={sourceKey}
                onChange={(e) => setSourceKey(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="e.g. tea-stall-01, auto-stand-keechery"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Full Scanned Destination URL:
              </label>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-400 break-all">
                {fullQrUrl}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
              </button>

              <a
                href={qrImageUrl}
                download={`Nuvana_QR_${sourceKey}.png`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR</span>
              </a>
            </div>

          </div>

          {/* Right: Realistic Poster Card Preview */}
          <div className="sm:col-span-5 bg-gradient-to-b from-[#0F172A] to-[#080D1A] p-5 rounded-2xl border-2 border-amber-500/40 text-center shadow-xl space-y-3">
            <div className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase">
              SCAN • EXPLORE • WIN
            </div>
            
            <div className="text-sm font-black text-white font-heading">
              Nuvana<span className="text-amber-500">.go</span> Pappinisseri
            </div>

            <div className="p-2.5 bg-white rounded-2xl inline-block shadow-lg">
              <img 
                src={qrImageUrl} 
                alt="Campaign QR Code" 
                className="w-36 h-36 mx-auto rounded-lg" 
              />
            </div>

            <div className="text-[10px] font-semibold text-slate-300">
              🎁 Win Free Flights & Cargo Credits!
            </div>

            <div className="text-[9px] font-mono text-slate-500 truncate px-1">
              Source: {sourceKey}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
