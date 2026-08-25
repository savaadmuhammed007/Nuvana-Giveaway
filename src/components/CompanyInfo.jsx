import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Building2,
  Navigation
} from 'lucide-react';
import { buildDirectWhatsAppInquiry } from '../utils/shareHelpers';

export default function CompanyInfo() {
  const googleMapsUrl = 'https://maps.google.com/?q=Pappinisseri,Kannur,Kerala';

  return (
    <section id="office" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            New Physical Hub
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Visit Our <span className="text-gradient-orange">Pappinisseri Office.</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base">
            While the giveaway is 100% online, our new full-service office is open for in-person holiday planning, cargo drop-offs, and visa consulting.
          </p>
        </div>

        {/* Office Details Card */}
        <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-2xl shadow-black/40 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/40 p-2 flex items-center justify-center">
                <img src="/nuvana-logo.png" alt="Nuvana.go" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Nuvana<span className="text-amber-500">.go</span> & Nuvana<span className="text-[#FF6B00]">.ex</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  Pappinisseri Branch • Kannur District, Kerala
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Office Address:</strong>
                  <span>Opp Kattilepalli, Pappinisseri - 670561, Kannur, Kerala</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Working Hours:</strong>
                  <span>Monday - Saturday: 9:00 AM to 8:30 PM • Sunday: 10:00 AM to 5:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Phone & WhatsApp:</strong>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <a href={buildDirectWhatsAppInquiry('Flight Tickets & Travel Services', 'travel')} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="font-semibold text-white">+91 755 996 6620</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">Travels</span>
                    </a>
                    <a href={buildDirectWhatsAppInquiry('GCC & Worldwide Cargo Services', 'cargo')} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B00] transition-colors flex items-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="font-semibold text-white">+91 755 996 6621</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30">Cargo</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Email Support:</strong>
                  <a href="mailto:nuvanago.fly@gmail.com" className="hover:text-[#FF6B00] transition-colors">
                    nuvanago.fly@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={buildDirectWhatsAppInquiry('Flight Tickets & Travel Services', 'travel')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Get Directions (Maps)</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
