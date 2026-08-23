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
  Sparkles,
  Gift,
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
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    id: 'door-to-door',
    title: 'Door-to-Door Courier',
    desc: 'Express courier services picked up from your doorstep.',
    icon: Home,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    id: 'shop-and-ship',
    title: 'Shop and Ship',
    desc: 'We shop locally and ship securely directly to you worldwide.',
    icon: ShoppingCart,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    id: 'product-sourcing',
    title: 'Product Sourcing',
    desc: 'We find, verify, and procure high-quality goods on your behalf.',
    icon: SearchCheck,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    id: 'air-sea-freight',
    title: 'Air & Sea Freight',
    desc: 'Commercial shipping routed for maximum speed and cost-efficiency.',
    icon: Ship,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    id: 'customs-clearance',
    title: 'Customs Clearance',
    desc: 'Our specialists handle complex paperwork and border compliance.',
    icon: ShieldCheck,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  }
];

export const TRAVEL_SERVICES = [
  {
    id: 'flight-bookings',
    title: 'Flight Bookings',
    desc: 'Global flight reservations with competitive pricing and seamless booking experiences tailored to your schedule.',
    icon: Plane,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  },
  {
    id: 'hotel-reservations',
    title: 'Hotel Reservations',
    desc: 'Premium stays at vetted hotels, resorts, and luxury villas worldwide — hand-picked for every trip type.',
    icon: BedDouble,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  },
  {
    id: 'holiday-packages',
    title: 'Holiday Packages',
    desc: 'All-inclusive bundles tailored for families, couples, and solo travelers. Worry-free from day one.',
    icon: Luggage,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance',
    desc: 'Hassle-free visa processing with expert guidance and complete documentation support for every destination.',
    icon: FileText,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  },
  {
    id: 'international-tours',
    title: 'International Tours',
    desc: 'Guided tours across iconic global destinations with knowledgeable local experts leading the way.',
    icon: Map,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  },
  {
    id: 'seamless-transit',
    title: 'Seamless Transit',
    desc: 'Premium airport transfers from Calicut / Kannur International Airport (CNN/CCJ) ensuring a stress-free start and finish.',
    icon: Car,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10'
  }
];

export default function Services() {
  const { openGiveaway } = useCampaign();

  return (
    <section id="services" className="relative py-20 lg:py-32 overflow-hidden bg-[#070D18]">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ========================================================================= */}
        {/* 1. CORE OPERATIONS SECTION */}
        {/* ========================================================================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#F7941D]">
              WHAT WE OFFER
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Core <span className="text-[#F7941D]">Operations</span>
            </h2>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_OPERATIONS.map((op) => {
              const Icon = op.icon;
              return (
                <div
                  key={op.id}
                  className="bg-[#0B1524] hover:bg-[#0F1C30] border border-[#17263C] hover:border-amber-500/50 p-7 sm:p-8 rounded-2xl transition-all duration-300 group flex flex-col justify-between text-left shadow-lg shadow-black/20"
                >
                  <div>
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-xl bg-[#142338] border border-[#1E334D] flex items-center justify-center text-amber-400 mb-6 group-hover:scale-105 group-hover:border-amber-500/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2.5 font-heading group-hover:text-amber-400 transition-colors">
                      {op.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {op.desc}
                    </p>
                  </div>

                  {/* Quick WhatsApp Inquiry */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={buildDirectWhatsAppInquiry(`Core Operations: ${op.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Quick Inquiry</span>
                    </a>

                    <button
                      onClick={() => openGiveaway(op.title)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Win Prize</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. OUR TRAVEL SERVICES SECTION */}
        {/* ========================================================================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#F7941D]">
              WHAT WE OFFER
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Our <span className="text-[#F7941D]">Travel Services</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base">
              Everything you need for a perfect journey, under one roof.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAVEL_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-[#0B1524] hover:bg-[#0F1C30] border border-[#17263C] hover:border-cyan-500/50 p-7 sm:p-8 rounded-2xl transition-all duration-300 group flex flex-col justify-between text-left shadow-lg shadow-black/20"
                >
                  <div>
                    {/* Icon Box */}
                    <div className="w-12 h-12 rounded-xl bg-[#142338] border border-[#1E334D] flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2.5 font-heading group-hover:text-cyan-400 transition-colors">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Quick WhatsApp Inquiry */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={buildDirectWhatsAppInquiry(`Travel Service: ${srv.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Book on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => openGiveaway(srv.title)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Win Prize</span>
                      <ArrowRight className="w-3 h-3" />
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
