import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Gift, Menu, X, Sparkles, Compass, PhoneCall, QrCode } from 'lucide-react';

export default function Navbar() {
  const { openGiveaway, setIsQRGenOpen, qrSource } = useCampaign();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600/90 via-orange-500/90 to-amber-600/90 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-black/30 text-[10px] font-bold uppercase tracking-wider">
          Pappinisseri Launch 2026
        </span>
        <span className="hidden sm:inline">Grand Opening Campaign • Scan, Explore Services & Win Grand Prizes!</span>
        <span className="sm:hidden">Scan • Explore • Win Giveaway is LIVE!</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-amber-500/30 shadow-lg shadow-amber-500/10 group-hover:border-amber-500/60 transition-all p-1.5">
                <img 
                  src="/nuvana-logo.png" 
                  alt="Nuvana.go Logo" 
                  className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform" 
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1 font-heading">
                  Nuvana<span className="text-amber-500">.go</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                  Cargo • Travels • Visa • Ticketing
                </span>
              </div>
            </a>

            {/* Pappinisseri Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-medium text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Pappinisseri Office Launch</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => scrollToSection('story')}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              Campaign Story
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('giveaway')}
              className="text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Gift className="w-4 h-4" />
              Giveaway
            </button>
            <button 
              onClick={() => scrollToSection('office')}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              Pappinisseri Office
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsQRGenOpen(true)}
              className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all text-xs font-medium flex items-center gap-1.5"
              title="Campaign Poster QR Maker"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline">QR Posters</span>
            </button>

            <button
              onClick={() => openGiveaway('General')}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center gap-2"
            >
              <Gift className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Enter Giveaway</span>
              <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openGiveaway('Mobile Quick')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Win</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-slate-700/60 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
            <span>📍 Active Source: <strong>{qrSource}</strong></span>
            <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono">QR LINKED</span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <button
              onClick={() => scrollToSection('story')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>From Pappinisseri to the World</span>
              <Compass className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>Our 4 Core Services</span>
              <span className="text-xs text-amber-400 font-bold">✈️ 📦 🛂 🎫</span>
            </button>
            <button
              onClick={() => scrollToSection('giveaway')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
            >
              <span>🎁 Pappinisseri Launch Giveaway</span>
              <span className="text-xs bg-amber-400 text-black px-1.5 py-0.5 rounded font-extrabold">WIN PRIZES</span>
            </button>
            <button
              onClick={() => scrollToSection('office')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span>Pappinisseri Office Location</span>
              <PhoneCall className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsQRGenOpen(true); }}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Poster Kit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
