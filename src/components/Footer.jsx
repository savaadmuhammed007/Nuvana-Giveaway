import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  Shield, 
  Heart, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Gift, 
  QrCode, 
  Sparkles, 
  X,
  ExternalLink
} from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { buildDirectWhatsAppInquiry } from '../utils/shareHelpers';

export default function Footer() {
  const { setIsAdminOpen, setIsQRGenOpen, openGiveaway, navigateTo } = useCampaign();
  const [legalModal, setLegalModal] = useState(null); // 'terms', 'privacy', 'giveaway'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05080F] border-t border-slate-800/80 pt-16 pb-24 sm:pb-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 p-1.5 flex items-center justify-center">
                <img src="/nuvana-logo.png" alt="Nuvana.go Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  Nuvana<span className="text-amber-500">.go</span>
                </span>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Cargo • Travels • Visa • Ticketing
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your comprehensive international travel agency, GCC express air & sea cargo courier, visa stamping, and 24/7 flight ticketing hub in Pappinisseri, Kerala.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/nuvana.go/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors group"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>@nuvana.go</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-300" />
              </a>

              <a
                href="https://www.instagram.com/nuvana.ex/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors group"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>@nuvana.ex</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-300" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Pappinisseri Launch Campaign 2026</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Campaign Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={scrollToTop} className="hover:text-amber-400 transition-colors">
                  Home & Hero
                </button>
              </li>
              <li>
                <button onClick={() => openGiveaway('Footer')} className="hover:text-amber-400 text-amber-400/90 font-semibold flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Enter Giveaway</span>
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Travel & Cargo Services
                </a>
              </li>
              <li>
                <a href="#office" className="hover:text-amber-400 transition-colors">
                  Pappinisseri Office
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Giveaway FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>✈️ Holiday & Travel Packages</li>
              <li>📦 GCC & Worldwide Express Cargo</li>
              <li>🛂 Tourist & Work Visa Assistance</li>
              <li>🎫 Domestic & International Flights</li>
              <li>📑 Embassy Attestation & Emigration</li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Pappinisseri Office
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Opp Kattilepalli, Pappinisseri - 670561, Kannur, Kerala
            </p>
            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-300">
              <a href="tel:+917559966620" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+91 755 996 6620 <strong className="text-slate-400 text-[10px]">(Travels)</strong></span>
              </a>
              <a href="tel:+917559966621" className="hover:text-[#FF6B00] flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>+91 755 996 6621 <strong className="text-slate-400 text-[10px]">(Cargo)</strong></span>
              </a>
              <a 
                href="https://wa.me/917559966620"
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-400 text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Travels (+91 755 996 6620)</span>
              </a>
              <a 
                href="https://wa.me/917559966621"
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#FF6B00] text-[#FF6B00] flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Cargo (+91 755 996 6621)</span>
              </a>
              <a href="mailto:nuvanago.fly@gmail.com" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>nuvanago.fly@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal & Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2">
            <span>© 2026 Nuvana.go Cargo & Travels. All rights reserved.</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('giveaway')}
              className="hover:text-amber-400 transition-colors font-medium"
            >
              Giveaway Rules
            </button>
            <span>•</span>
            <button
              onClick={() => setIsQRGenOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400"
            >
              <QrCode className="w-3 h-3" />
              <span>QR Poster Kit</span>
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('/admin')}
              className="hover:text-amber-400 transition-colors text-slate-500 hover:text-amber-400"
            >
              Admin
            </button>
          </div>

        </div>

      </div>

      {/* Legal Popups Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-slate-700 p-6 sm:p-8 text-left space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {legalModal === 'giveaway' && (
              <>
                <h3 className="text-xl font-bold text-white font-heading">
                  🎁 Pappinisseri Launch Giveaway Terms
                </h3>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>1. <strong>Eligibility:</strong> The giveaway is open to all residents in Pappinisseri, Kannur, Kerala, and across India. No purchase or fee is necessary to enter.</p>
                  <p>2. <strong>Entry Limit:</strong> 1 primary entry per valid Indian WhatsApp number. Participants can earn up to 5 additional bonus entries via valid referrals.</p>
                  <p>3. <strong>Prizes:</strong> 1st Prize: Luxury Resort Stay; 2nd Prize: Free Shipment up to 10kg by Nuvana.ex. Prizes cannot be exchanged for cash.</p>
                  <p>4. <strong>Winner Selection:</strong> Winners will be drawn in a transparent digital lucky draw during the official launch ceremony.</p>
                  <p>5. <strong>Contact:</strong> Winners will be notified via registered WhatsApp number within 48 hours of the draw.</p>
                </div>
              </>
            )}

            {legalModal === 'privacy' && (
              <>
                <h3 className="text-xl font-bold text-white font-heading">
                  🔒 Privacy Policy
                </h3>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>At Nuvana.go, we respect your privacy. All phone numbers, names, and location details submitted via this campaign are stored securely in Google Sheets for the purpose of the giveaway draw and occasional relevant service updates.</p>
                  <p>We do NOT sell, rent, or distribute your personal data to any third-party advertisers. You may request removal of your data at any time by contacting our support team.</p>
                </div>
              </>
            )}

            {legalModal === 'terms' && (
              <>
                <h3 className="text-xl font-bold text-white font-heading">
                  📜 Terms & Conditions
                </h3>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <p>Welcome to Nuvana.go Pappinisseri. By accessing this website and participating in the launch campaign, you agree to these terms.</p>
                  <p>All travel bookings, visa processes, flight ticketing, and cargo shipping operations are subject to standard airline, aviation, and customs regulatory guidelines.</p>
                  <p>Nuvana.go reserves the right to modify or adjust campaign timelines if necessary with prior public notice on our official social handles.</p>
                </div>
              </>
            )}

            <button
              onClick={() => setLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
