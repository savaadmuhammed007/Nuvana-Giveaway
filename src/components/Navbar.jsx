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
          <a href="#" className="flex items-center group py-1">
            <img 
              src="/nuvana-go-logo.png" 
              alt="Nuvana.go" 
              className="h-8 sm:h-10 w-auto max-w-[160px] sm:max-w-[210px] object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-200" 
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <button 
              onClick={() => scrollToSection('giveaway')}
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Giveaway
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('office')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Office
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
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-[#F7941D] hover:bg-[#ff9f2e] shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>Enter Giveaway</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openGiveaway('Mobile Header')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-slate-950 bg-[#F7941D] flex items-center gap-1.5 shadow-sm cursor-pointer"
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
            onClick={() => scrollToSection('giveaway')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#F7941D] bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
          >
            <span>🎁 Launch Giveaway</span>
            <span className="text-[10px] bg-[#F7941D] text-slate-950 font-black px-1.5 py-0.5 rounded">FREE</span>
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Services & Operations
          </button>
          <button
            onClick={() => scrollToSection('office')}
            className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900"
          >
            Pappinisseri Office
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
