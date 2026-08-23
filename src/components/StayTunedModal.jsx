import React, { useState } from 'react';
import { X, Bell, CheckCircle2, Send, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import confetti from 'canvas-confetti';
import { playChime } from '../utils/audio';

export default function StayTunedModal({ isOpen, onClose }) {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vipNumber, setVipNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const randomCode = 'NV-' + Math.floor(1000 + Math.random() * 9000);
      setVipNumber(randomCode);

      // Play chime
      playChime();

      // Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#FA8C16', '#7DD3FC', '#FFFFFF']
      });
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setContact('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Dark Blur Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#020408]/85 backdrop-blur-xl transition-opacity animate-fadeIn"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-[#090E18]/90 border border-white/[0.12] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden animate-scaleUp">
        {/* Glow Accent Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#FF6B00]" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#FF6B00] uppercase">
                  VIP Launch List
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Be the First to Know
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Get notified the moment our <strong className="text-white">Nuvana.go Pappinisseri office</strong> officially opens its doors with exclusive launch privileges and travel benefits.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider text-slate-400 uppercase mb-2">
                  Email or WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. name@domain.com or +91 98..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl glass-button-primary text-white font-semibold text-base flex items-center justify-center gap-2 cursor-pointer mt-2 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Notify Me on Launch</span>
                    <Send className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero spam. Only official launch notifications.</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#FF6B00]" />
            </div>

            <span className="text-[11px] font-mono tracking-widest text-[#FF6B00] uppercase mb-1">
              Priority Pass Confirmed
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              You're On The List!
            </h3>

            <p className="text-slate-300 text-sm max-w-sm mb-6">
              We have reserved your launch invitation for the Pappinisseri office. We will reach out to you directly on launch day.
            </p>

            {/* Official Instagram Links */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-[#FF6B00]/10 border border-white/10 text-left mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider font-heading">
                    Follow Our Instagram
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase">Updates & Draws</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.instagram.com/nuvana.go/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/50 transition-all group"
                >
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-cyan-300 transition-colors">@nuvana.go</span>
                    <span className="text-[9px] text-slate-400">Travels</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                </a>

                <a
                  href="https://www.instagram.com/nuvana.ex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF6B00]/50 transition-all group"
                >
                  <div>
                    <span className="text-xs font-bold text-white block group-hover:text-amber-300 transition-colors">@nuvana.ex</span>
                    <span className="text-[9px] text-slate-400">Cargo</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#FF6B00] transition-colors" />
                </a>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl glass-button-secondary text-white font-medium text-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
