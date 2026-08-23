import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { 
  Users, 
  Sparkles, 
  MessageCircle, 
  Copy, 
  Check, 
  Search, 
  Gift, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import { buildWhatsAppShareUrl, copyToClipboard } from '../utils/shareHelpers';

export default function ReferralSection() {
  const { myEntry, entries, showToast, setIsSuccessOpen, openGiveaway } = useCampaign();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedEntry, setSearchedEntry] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeEntry = searchedEntry || myEntry;

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchedEntry(null);
      return;
    }

    const cleanDigits = query.replace(/\D/g, '').slice(-10);
    const found = entries.find(e => 
      e.entryId.toLowerCase() === query || 
      (cleanDigits && e.phone.replace(/\D/g, '').slice(-10) === cleanDigits)
    );

    setSearchedEntry(found || null);
    if (!found) {
      showToast('No entry found for that mobile number or Entry ID.', 'warning');
    }
  };

  const handleCopy = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedLink(true);
      showToast('Referral link copied!', 'success');
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl border border-slate-700 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Explainer */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Viral Referral Program
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Invite Friends & Multiply Your{' '}
                <span className="text-gradient-orange">Chances to Win!</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                For every friend or family member in Kerala who enters our launch giveaway through your personal referral link, you automatically receive <strong className="text-amber-400">+1 additional raffle ticket</strong> in the lucky draw!
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Maximum 5 bonus tickets per participant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Instant WhatsApp Sharing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Status / Search / Action */}
            <div className="lg:col-span-5">
              {activeEntry ? (
                /* Active entry found */
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Active Participant</div>
                      <div className="text-base font-bold text-white">{activeEntry.fullName}</div>
                    </div>
                    <div className="text-right font-mono text-xs font-bold text-amber-400 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      {activeEntry.entryId}
                    </div>
                  </div>

                  {/* Referral count pill */}
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Your Referrals:</span>
                      <span className="text-amber-400 font-bold font-mono">
                        {activeEntry.referralCount || 0} / 5 Friends Joined
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        style={{ width: `${Math.min(100, ((activeEntry.referralCount || 0) / 5) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={buildWhatsAppShareUrl(activeEntry.entryId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Share on WhatsApp (+1 Ticket)</span>
                    </a>

                    <button
                      onClick={() => handleCopy(typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?ref=${activeEntry.entryId}` : `https://nuvanago.in/?ref=${activeEntry.entryId}`)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center justify-center gap-2"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Referral Link'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Search / Lookup Widget or Quick Enter */
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-4">
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white mb-1">
                      Already entered the giveaway?
                    </h3>
                    <p className="text-xs text-slate-400">
                      Check your referral progress & grab your WhatsApp link:
                    </p>
                  </div>

                  <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number or PAP-2026-XXXXX"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs outline-none focus:border-amber-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Lookup</span>
                    </button>
                  </form>

                  <div className="pt-2 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-400 mb-2">Haven't entered yet?</p>
                    <button
                      onClick={() => openGiveaway('Referral Widget')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Enter Giveaway Now (Free)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
