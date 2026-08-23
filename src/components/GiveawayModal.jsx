import React, { useState, useEffect } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  X, 
  Gift, 
  User, 
  Phone, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Loader2
} from 'lucide-react';

const SERVICE_OPTIONS = [
  { id: 'Flight Bookings', label: '✈️ Flight Bookings' },
  { id: 'Door-to-Door Courier', label: '📦 Door-to-Door Courier' },
  { id: 'Holiday Packages', label: '🏖️ Holiday Packages' },
  { id: 'Visa Assistance', label: '🛂 Visa Assistance' },
  { id: 'Excess Baggage', label: '🧳 Excess Baggage' },
  { id: 'Air & Sea Freight', label: '🚢 Air & Sea Freight' },
  { id: 'Hotel Reservations', label: '🏨 Hotel Reservations' },
  { id: 'Shop and Ship', label: '🛒 Shop and Ship' }
];

export default function GiveawayModal() {
  const { 
    isGiveawayOpen, 
    closeGiveaway, 
    submitForm, 
    prefilledService, 
    referredBy 
  } = useCampaign();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    service: 'Flight Bookings',
    consent: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prefilled service if opened from a specific card
  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService === 'General' ? 'Flight Bookings' : prefilledService
      }));
    }
  }, [prefilledService, isGiveawayOpen]);

  if (!isGiveawayOpen) return null;

  const validatePhone = (phoneStr) => {
    const clean = phoneStr.replace(/\D/g, '');
    const last10 = clean.slice(-10);
    if (last10.length === 10 && /^[6-9]\d{9}$/.test(last10)) {
      return true;
    }
    return false;
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp number is required.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your area or location.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive launch updates to participate.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, phone: val }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const clean10 = formData.phone.replace(/\D/g, '').slice(-10);
      const formattedPhone = `+91 ${clean10.slice(0, 5)} ${clean10.slice(5)}`;

      await submitForm({
        ...formData,
        phone: formattedPhone
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl glass-panel rounded-3xl border border-amber-500/40 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeGiveaway}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            Pappinisseri Launch Giveaway
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Enter to <span className="text-gradient-orange">Win Exciting Prizes!</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300">
            Fill in your details below. You will receive an instant <strong>Entry ID</strong> and referral link.
          </p>

          {/* Referral Notice if user came via friend link */}
          {referredBy && (
            <div className="mt-2 py-1 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium inline-block">
              🎉 Referred by participant: <strong>{referredBy}</strong>
            </div>
          )}
        </div>

        {/* Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Full Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Nambiar"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-500 text-sm outline-none transition-all`}
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp Mobile Number <span className="text-amber-400">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-sm font-semibold border-r border-slate-700 pr-2">
                +91
              </span>
              <input
                type="tel"
                placeholder="98765 43210"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={15}
                className={`w-full pl-16 pr-4 py-3 rounded-xl bg-slate-900/90 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-500 text-sm outline-none transition-all font-mono`}
              />
            </div>
            {errors.phone ? (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            ) : (
              <p className="text-slate-500 text-[11px] mt-1">
                Winner notification will be sent via WhatsApp.
              </p>
            )}
          </div>

          {/* Location / Area */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              Location / Area <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Pappinisseri, Keecheri, Kannur..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${errors.location ? 'border-red-500' : 'border-slate-700'} focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-500 text-sm outline-none transition-all`}
            />
            {errors.location && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.location}
              </p>
            )}
          </div>

          {/* Interested Service */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Interested Service:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SERVICE_OPTIONS.map((srv) => (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => setFormData({ ...formData, service: srv.id })}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${formData.service === srv.id ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                >
                  {srv.label}
                </button>
              ))}
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I agree to receive updates, launch offers, and promotional information from Nuvana.go via WhatsApp/SMS.
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.consent}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Entry...</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>SUBMIT & GET ENTRY ID</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Secure • Safe Google Sheets backend • No Spam Guarantee
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
