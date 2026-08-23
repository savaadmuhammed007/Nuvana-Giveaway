import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Gift, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { openGiveaway } = useCampaign();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070B14]/90 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 p-1.5 flex items-center justify-center group-hover:border-amber-500/60 transition-all shadow-md">
              <img 
                src="/nuvana-logo.png" 
                alt="Nuvana.go Logo" 
                className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform" 
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Nuvana<span className="text-[#F7941D]">.go</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Cargo • Travels • Visa • Ticketing
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('story')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Our Story
            </button>
            <button 
              onClick={() => scrollToSection('giveaway')}
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Giveaway
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openGiveaway('Navbar')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-[#F7941D] hover:bg-[#ff9f2e] shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center gap-2 active:scale-95"
            >
              <Gift className="w-4 h-4" />
              <span>Enter Giveaway</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openGiveaway('Mobile Header')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-slate-950 bg-[#F7941D] flex items-center gap-1.5 shadow-sm"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Win</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#070B14] border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
          <button
            onClick={() => scrollToSection('services')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Services & Operations
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection('giveaway')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#F7941D] bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
          >
            <span>🎁 Launch Giveaway</span>
            <span className="text-[10px] bg-[#F7941D] text-slate-950 font-black px-1.5 py-0.5 rounded">FREE</span>
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Frequently Asked Questions
          </button>
        </div>
      )}
    </header>
  );
}
