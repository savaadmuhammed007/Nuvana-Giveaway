import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  Luggage, 
  Home, 
  ShoppingCart, 
  SearchCheck, 
  Ship, 
  ShieldCheck, 
  Plane, 
  BedDouble, 
  FileText, 
  Map, 
  Car, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { buildDirectWhatsAppInquiry } from '../utils/shareHelpers';

export const CORE_OPERATIONS = [
  {
    id: 'excess-baggage',
    title: 'Excess Baggage',
    desc: 'Transport personal effects globally to avoid airline penalties.',
    icon: Luggage,
  },
  {
    id: 'door-to-door',
    title: 'Door-to-Door Courier',
    desc: 'Express courier services picked up from your doorstep.',
    icon: Home,
  },
  {
    id: 'shop-and-ship',
    title: 'Shop and Ship',
    desc: 'We shop locally and ship securely directly to you worldwide.',
    icon: ShoppingCart,
  },
  {
    id: 'product-sourcing',
    title: 'Product Sourcing',
    desc: 'We find, verify, and procure high-quality goods on your behalf.',
    icon: SearchCheck,
  },
  {
    id: 'air-sea-freight',
    title: 'Air & Sea Freight',
    desc: 'Commercial shipping routed for maximum speed and cost-efficiency.',
    icon: Ship,
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance',
    desc: 'Our specialists handle complex paperwork and border compliance.',
    icon: ShieldCheck,
  }
];

export const TRAVEL_SERVICES = [
  {
    id: 'flight-bookings',
    title: 'Flight Bookings',
    desc: 'Global flight reservations with competitive pricing and seamless booking experiences tailored to your schedule.',
    icon: Plane,
  },
  {
    id: 'hotel-reservations',
    title: 'Hotel Reservations',
    desc: 'Premium stays at vetted hotels, resorts, and luxury villas worldwide — hand-picked for every trip type.',
    icon: BedDouble,
  },
  {
    id: 'holiday-packages',
    title: 'Holiday Packages',
    desc: 'All-inclusive bundles tailored for families, couples, and solo travelers. Worry-free from day one.',
    icon: Luggage,
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance',
    desc: 'Hassle-free visa processing with expert guidance and complete documentation support for every destination.',
    icon: FileText,
  },
  {
    id: 'international-tours',
    title: 'International Tours',
    desc: 'Guided tours across iconic global destinations with knowledgeable local experts leading the way.',
    icon: Map,
  },
  {
    id: 'seamless-transit',
    title: 'Seamless Transit',
    desc: 'Premium airport transfers from Calicut / Kannur International Airport (CNN/CCJ) ensuring a stress-free start and finish.',
    icon: Car,
  }
];

export default function Services() {
  const { openGiveaway } = useCampaign();

  return (
    <section id="services" className="relative py-20 lg:py-28 overflow-hidden bg-[#040812]">
      {/* Dynamic Background Ambiance */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FF6B00]/5 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* ========================================================================= */}
        {/* 1. CORE OPERATIONS SECTION (NUVANA.EX — WARM SUNSET / AMBER PALETTE) */}
        {/* ========================================================================= */}
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-[#0B1220]/70 via-[#070D18]/50 to-transparent border border-amber-500/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          {/* Header with Nuvana.ex Logo */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 flex flex-col items-center">
            {/* Massive Transparent Nuvana.ex PNG Logo */}
            <div className="relative flex items-center justify-center w-full my-1 group">
              <div className="absolute w-[300px] sm:w-[500px] md:w-[650px] h-24 bg-[#FF6B00]/25 blur-[80px] rounded-full pointer-events-none -z-10" />
              <img 
                src="/nuvana-ex-logo.png" 
                alt="Nuvana.ex" 
                className="w-72 sm:w-[26rem] md:w-[34rem] lg:w-[44rem] max-w-[94vw] h-auto object-contain drop-shadow-[0_12px_40px_rgba(255,107,0,0.4)] hover:scale-105 transition-transform duration-300" 
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
              EXPRESS CARGO & LOGISTICS
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight pt-1">
              Core <span className="text-gradient-orange">Operations</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Express international cargo, door-to-door courier, and seamless global logistics powered by Nuvana.ex.
            </p>
          </div>

          {/* 6 Grid Cards (Amber Themed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_OPERATIONS.map((op) => {
              const Icon = op.icon;
              return (
                <div
                  key={op.id}
                  className="bg-[#09101C]/90 hover:bg-[#0E192D] border border-amber-500/15 hover:border-amber-400/50 p-6 sm:p-7 rounded-2xl transition-all duration-300 group flex flex-col justify-between text-left shadow-lg shadow-black/30 hover:shadow-[0_10px_30px_rgba(255,107,0,0.12)] hover:-translate-y-1"
                >
                  <div>
                    {/* Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:border-amber-400/50 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading group-hover:text-amber-400 transition-colors">
                      {op.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {op.desc}
                    </p>
                  </div>

                  {/* Quick WhatsApp Inquiry */}
                  <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                    <a
                      href={buildDirectWhatsAppInquiry(`Core Operations: ${op.title}`, 'cargo')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enquiry</span>
                    </a>

                    <button
                      onClick={() => openGiveaway(op.title)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Win Prize</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. OUR TRAVEL SERVICES SECTION (NUVANA.GO — AZURE SKY / CYAN PALETTE) */}
        {/* ========================================================================= */}
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-[#06162A]/70 via-[#051120]/50 to-transparent border border-cyan-500/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          {/* Header with Nuvana.go Logo */}
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 flex flex-col items-center">
            {/* Massive Transparent Nuvana.go PNG Logo */}
            <div className="relative flex items-center justify-center w-full my-1 group">
              <div className="absolute w-[300px] sm:w-[500px] md:w-[650px] h-24 bg-cyan-500/25 blur-[80px] rounded-full pointer-events-none -z-10" />
              <img 
                src="/nuvana-go-logo.png" 
                alt="Nuvana.go" 
                className="w-72 sm:w-[26rem] md:w-[34rem] lg:w-[44rem] max-w-[94vw] h-auto object-contain drop-shadow-[0_12px_40px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform duration-300" 
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
              HOLIDAYS & WORLDWIDE TRAVEL
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight pt-1">
              Our <span className="text-gradient-sky">Travel Services</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need for a perfect journey, under one roof. Flight bookings, holiday packages, and visa facilitation.
            </p>
          </div>

          {/* 6 Grid Cards (Azure / Cyan Themed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRAVEL_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-[#061222]/90 hover:bg-[#0A1E38] border border-cyan-500/15 hover:border-cyan-400/50 p-6 sm:p-7 rounded-2xl transition-all duration-300 group flex flex-col justify-between text-left shadow-lg shadow-black/30 hover:shadow-[0_10px_30px_rgba(6,182,212,0.12)] hover:-translate-y-1"
                >
                  <div>
                    {/* Icon Box */}
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading group-hover:text-cyan-400 transition-colors">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Quick WhatsApp Inquiry */}
                  <div className="mt-5 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                    <a
                      href={buildDirectWhatsAppInquiry(`Travel Service: ${srv.title}`, 'travel')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enquiry</span>
                    </a>

                    <button
                      onClick={() => openGiveaway(srv.title)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Win Prize</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
