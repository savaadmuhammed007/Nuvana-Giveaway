import React, { useState } from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';

// Core Sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

function MainExperience() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const { openGiveaway } = useCampaign();

  return (
    <div className="relative min-h-screen bg-[#03060C] text-slate-100 selection:bg-[#FF6B00] selection:text-white flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar onOpenExplore={() => setExploreOpen(true)} />

      {/* 2. Hero Section: "Hi Pappinisseri, We're Here." */}
      <Hero />

      {/* 3. Grand Launch Giveaway & Campaign Sections */}
      <main className="relative z-20 bg-[#070B14] border-t border-white/[0.06] shadow-[0_-25px_60px_rgba(0,0,0,0.9)]">
        
        {/* 3.1 Grand Launch Giveaway Section */}
        <div id="giveaway">
          <GiveawaySection />
        </div>

        {/* 3.2 Campaign Story */}
        <div id="story">
          <CampaignStory />
        </div>

        {/* 3.3 Core Travel & Cargo Services */}
        <div id="services">
          <Services />
        </div>

        {/* 3.4 Viral Referral Program */}
        <div id="referrals">
          <ReferralSection />
        </div>

        {/* 3.5 FAQ */}
        <div id="faq">
          <FAQ />
        </div>

        {/* 3.6 Pappinisseri Physical Office & Contact Hub */}
        <div id="office">
          <CompanyInfo />
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Global Float UI */}
      <LiveActivity />
      <BottomMobileBar />

      {/* 6. Modals */}
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

  // Main Campaign Experience
  return (
    <>
      <Toast />
      <MainExperience />
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
