import React, { useEffect, useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Trophy, 
  Users, 
  MessageCircle, 
  Heart,
  ExternalLink
} from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { buildWhatsAppShareUrl, copyToClipboard } from '../utils/shareHelpers';

export default function SuccessModal() {
  const { isSuccessOpen, setIsSuccessOpen, myEntry, showToast } = useCampaign();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (isSuccessOpen) {
      // Fire celebratory confetti burst!
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#F7941D', '#FA8C16', '#F59E0B']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#10B981', '#06B6D4', '#FFFFFF']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        colors: ['#FFD700', '#FF8C00']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isSuccessOpen]);

  if (!isSuccessOpen || !myEntry) return null;

  const entryId = myEntry.entryId || 'NUV-2026-00001';
  const referralCount = myEntry.referralCount || 0;
  const maxReferrals = 5;
  
  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?ref=${entryId}`
    : `https://nuvanago.in/?ref=${entryId}`;

  const handleCopyId = async () => {
    const success = await copyToClipboard(entryId);
    if (success) {
      setCopiedId(true);
      showToast('Entry ID copied to clipboard!', 'success');
      setTimeout(() => setCopiedId(false), 3000);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(referralUrl);
    if (success) {
      setCopiedLink(true);
      showToast('Referral link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const whatsappShareUrl = buildWhatsAppShareUrl(entryId, referralUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl glass-panel rounded-3xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSuccessOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/20 animate-bounce">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mb-2">
          You're Officially Entered! 🎉
        </h3>
        
        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6">
          Thank you for joining the Nuvana.go Pappinisseri Launch Campaign, <strong className="text-white">{myEntry.fullName}</strong>!
        </p>

        {/* Entry ID Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/40 mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
            Your Official Entry ID
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-widest selection:bg-white selection:text-black">
              {entryId}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all text-xs font-semibold flex items-center gap-1"
              title="Copy Entry ID"
            >
              {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedId ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Selected Service: <span className="text-slate-200 font-semibold">{myEntry.service}</span> • Location: <span className="text-slate-200 font-semibold">{myEntry.location}</span>
          </div>
        </div>

        {/* Referral Section: Want another chance to win? */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-left space-y-4 mb-6">
          
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 font-heading">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Want another chance to win?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Share your personal link with friends. For every friend who enters, you earn <strong>+1 bonus lucky draw ticket</strong>!
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold shrink-0">
              Max {maxReferrals} Referrals
            </span>
          </div>

          {/* Referral Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Your Referrals:</span>
              <span className="text-amber-400 font-bold font-mono">
                {referralCount} / {maxReferrals} Completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (referralCount / maxReferrals) * 100)}%` }}
              />
            </div>
          </div>

          {/* WhatsApp Share Button */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all group"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>SHARE ON WHATSAPP (+1 TICKET)</span>
            <ExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedLink ? 'Referral Link Copied!' : 'Copy Personal Referral Link'}</span>
          </button>

        </div>

        {/* Official Social Media Follow Links */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-[#FF6B00]/10 border border-white/10 text-left mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Follow Us on Instagram
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Official Pages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Nuvana.go Travels */}
            <a
              href="https://www.instagram.com/nuvana.go/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  GO
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-cyan-300 transition-colors">@nuvana.go</span>
                  <span className="text-[10px] text-slate-400">Travels & Holidays</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
            </a>

            {/* Nuvana.ex Cargo */}
            <a
              href="https://www.instagram.com/nuvana.ex/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF6B00]/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] font-bold text-xs">
                  EX
                </div>
                <div>
                  <span className="text-xs font-bold text-white block group-hover:text-amber-300 transition-colors">@nuvana.ex</span>
                  <span className="text-[10px] text-slate-400">Cargo & Logistics</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
            </a>
          </div>
        </div>

        {/* Good Luck Footer Message */}
        <div className="text-center pt-1">
          <p className="text-xs text-amber-300/90 font-medium flex items-center justify-center gap-1.5">
            <span>Winners will be announced on our official launch day. Good luck!</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </p>
        </div>

      </div>
    </div>
  );
}
