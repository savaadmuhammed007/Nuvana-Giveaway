import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { CampaignProvider, useCampaign } from './context/CampaignContext';

// 3D Flight Hero Components
import FlightCanvas from './components/FlightCanvas';
import CinematicNavigation from './components/CinematicNavigation';
import HeroArrivalOverlay from './components/HeroArrivalOverlay';

// Campaign & Giveaway Sections Below Hero
import CampaignStory from './components/CampaignStory';
import Services from './components/Services';
import GiveawaySection from './components/GiveawaySection';
import ReferralSection from './components/ReferralSection';
import FAQ from './components/FAQ';
import CompanyInfo from './components/CompanyInfo';
import Footer from './components/Footer';

// Modals, Admin & Global UI
import AdminPage from './components/AdminPage';
import GiveawayModal from './components/GiveawayModal';
import SuccessModal from './components/SuccessModal';
import QRGeneratorModal from './components/QRGeneratorModal';
import LiveActivity from './components/LiveActivity';
import Toast from './components/Toast';
import BottomMobileBar from './components/BottomMobileBar';
import ExploreDrawer from './components/ExploreDrawer';
import { Sparkles } from 'lucide-react';

function UnifiedExperience() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [exploreOpen, setExploreOpen] = useState(false);
  const heroRef = useRef(null);
  const { openGiveaway } = useCampaign();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function onScroll() {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollableDistance = heroHeight - window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollableDistance > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / scrollableDistance));
        setHeroProgress(progress);
      }
    }

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToGiveaway = () => {
    const el = document.getElementById('giveaway-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#03060C] text-slate-100 selection:bg-[#FF6B00] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HIGH-SPEED 3D FLIGHT HERO (Visual-Only Scrub -> Climax Reveal) */}
      {/* ========================================================================= */}
      <section ref={heroRef} className="relative w-full h-[200vh]">
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 3D Flight Canvas Sequence (Scrubbed in Speed) */}
          <FlightCanvas scrollProgress={heroProgress} />

          {/* Minimal Navigation Header */}
          <CinematicNavigation
            scrollProgress={heroProgress}
            onOpenExplore={() => setExploreOpen(true)}
          />

          {/* Arrival Reveal: Shows "Hi Pappinisseri, We're Here." after flight scrub */}
          <HeroArrivalOverlay
            scrollProgress={heroProgress}
            onScrollToGiveaway={scrollToGiveaway}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. GRAND LAUNCH CAMPAIGN & GIVEAWAY (Smoothly Flowing Below Hero) */}
      {/* ========================================================================= */}
      <main className="relative z-30 bg-[#070B14] border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.9)]">
        {/* Launch Campaign Tag */}
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF6B00]/20 via-amber-500/10 to-[#FF6B00]/20 border border-[#FF6B00]/30 text-xs sm:text-sm font-mono tracking-widest text-[#FF6B00] uppercase shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>PAPPINISSERI GRAND LAUNCH CAMPAIGN & SERVICES</span>
          </div>
        </div>

        {/* 2.1 Grand Launch Giveaway Section */}
        <div id="giveaway-section">
          <GiveawaySection />
        </div>

        {/* 2.2 Campaign Story */}
        <CampaignStory />

        {/* 2.3 Core Travel & Cargo Services */}
        <div id="services">
          <Services />
        </div>

        {/* 2.4 Viral Referral Program */}
        <ReferralSection />

        {/* 2.5 FAQ */}
        <FAQ />

        {/* 2.6 Pappinisseri Physical Office & Contact Hub */}
        <CompanyInfo />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Global Float UI */}
      <LiveActivity />
      <BottomMobileBar />

      {/* 5. Modals */}
      <GiveawayModal />
      <SuccessModal />
      <QRGeneratorModal />
      <ExploreDrawer
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onOpenStayTuned={() => {
          setExploreOpen(false);
          openGiveaway('Explore Drawer');
        }}
      />
    </div>
  );
}

function AppContent() {
  const { currentRoute } = useCampaign();

  // Admin Portal (/admin or #admin)
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-[#060A13] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
        <Toast />
        <AdminPage />
        <QRGeneratorModal />
      </div>
    );
  }

  // Unified High-Speed Hero -> Climax Reveal -> Giveaway Campaign
  return (
    <>
      <Toast />
      <UnifiedExperience />
    </>
  );
}

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}
