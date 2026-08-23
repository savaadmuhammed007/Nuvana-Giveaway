import React from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignStory from './components/CampaignStory';
import Services from './components/Services';
import GiveawaySection from './components/GiveawaySection';
import ReferralSection from './components/ReferralSection';
import FAQ from './components/FAQ';
import CompanyInfo from './components/CompanyInfo';
import Footer from './components/Footer';

// Admin Page & Modals
import AdminPage from './components/AdminPage';
import GiveawayModal from './components/GiveawayModal';
import SuccessModal from './components/SuccessModal';
import QRGeneratorModal from './components/QRGeneratorModal';
import LiveActivity from './components/LiveActivity';
import Toast from './components/Toast';
import BottomMobileBar from './components/BottomMobileBar';

function AppContent() {
  const { currentRoute } = useCampaign();

  // Dedicated /admin portal page
  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-[#060A13] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
        <Toast />
        <AdminPage />
        <QRGeneratorModal />
      </div>
    );
  }

  // Main Campaign Website
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Toast Alert Provider */}
      <Toast />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Campaign Journey */}
      <main className="flex-grow">
        {/* 1. Cinematic Hero Section with QR Source Pill */}
        <Hero />

        {/* 2. Campaign Story: From Pappinisseri to the World */}
        <CampaignStory />

        {/* 3. Core Operations & Our Travel Services Showcase */}
        <Services />

        {/* 4. Grand Launch Giveaway Conversion Section */}
        <GiveawaySection />

        {/* 5. Viral Referral & Lookup Program */}
        <ReferralSection />

        {/* 6. Frequently Asked Questions */}
        <FAQ />

        {/* 7. Pappinisseri Physical Office & Contact Hub */}
        <CompanyInfo />
      </main>

      {/* Footer & Legal */}
      <Footer />

      {/* Floating Live Social Proof Activity Ticker */}
      <LiveActivity />

      {/* Mobile Sticky Quick Action Bar */}
      <BottomMobileBar />

      {/* Global Modals */}
      <GiveawayModal />
      <SuccessModal />
      <QRGeneratorModal />
    </div>
  );
}

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}
