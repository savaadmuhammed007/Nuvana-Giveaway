import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Sparkles, 
  Building2,
  Navigation
} from 'lucide-react';
import { buildDirectWhatsAppInquiry } from '../utils/shareHelpers';

export default function CompanyInfo() {
  const googleMapsUrl = 'https://maps.google.com/?q=Pappinisseri,Kannur,Kerala';

  return (
    <section id="office" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            New Physical Hub
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Visit Our <span className="text-gradient-orange">Pappinisseri Office.</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base">
            While the giveaway is 100% online, our new full-service office is always open for in-person holiday planning, cargo drop-offs, and visa consulting.
          </p>
        </div>

        {/* Office Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Office Highlights Card */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-700 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/40 p-2 flex items-center justify-center">
                  <img src="/nuvana-logo.png" alt="Nuvana.go" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    Nuvana<span className="text-amber-500">.go</span> Cargo & Travels
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Pappinisseri Branch • Kannur District, Kerala
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Office Address:</strong>
                    <span>Main Road, Near Railway Station / Highway Junction, Pappinisseri, Kannur, Kerala - 670561</span>
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
                    <span>+91 98765 43210 / +91 98765 43211</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Email Support:</strong>
                    <span>pappinisseri@nuvana.go / support@nuvana.go</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={buildDirectWhatsAppInquiry('Pappinisseri Office Inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Get Directions (Maps)</span>
              </a>
            </div>

          </div>

          {/* Right: Map / Visual Preview Card */}
          <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Convenient Local Connectivity
              </div>
              
              <h4 className="text-xl font-bold text-white font-heading">
                Serving All Surrounding Areas
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                Our strategic location in Pappinisseri offers easy access for residents across North Kannur:
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white">📍 Keecheri & Aaron</div>
                  <div className="text-[11px] text-slate-400">2 - 5 Mins away</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white">📍 Kalliasseri</div>
                  <div className="text-[11px] text-slate-400">3 - 6 Mins away</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white">📍 Dharmasala Hub</div>
                  <div className="text-[11px] text-slate-400">8 - 10 Mins away</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white">📍 Valapattanam</div>
                  <div className="text-[11px] text-slate-400">5 - 7 Mins away</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                💡 <strong>Doorstep Cargo Pickup Available:</strong> We provide free luggage & parcel pickup service across Pappinisseri and adjacent towns!
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
