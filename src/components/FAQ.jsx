import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'Who can participate in this launch giveaway?',
    answer: 'Anyone residing in Pappinisseri, Kannur, or anywhere across Kerala and India can participate. The giveaway is 100% online and free to enter for all residents and Non-Resident Keralites (NRIs).'
  },
  {
    question: 'Is there any entry fee or purchase required?',
    answer: 'No! Participation is 100% free. You do NOT need to pay anything or make any booking or purchase. It is our grand launch celebration gift to our community.'
  },
  {
    question: 'How does the giveaway work?',
    answer: 'Simply scan any Nuvana.go QR poster in public spots, fill in your Name, WhatsApp Number, Area, and service interest. You will instantly receive a unique Entry ID (e.g. PAP-2026-00421) which is entered into the official launch prize draw.'
  },
  {
    question: 'Can I participate more than once with the same phone number?',
    answer: 'To ensure complete fairness for all community members, only one primary entry is allowed per WhatsApp number. However, you can earn up to 5 additional bonus entries by referring your friends!'
  },
  {
    question: 'How does the referral system work?',
    answer: 'After entering, you will receive your personal referral link (e.g. ?ref=PAP-2026-00421) and a ready-to-share WhatsApp button. For every friend who enters using your link, your referral count increases and you get +1 bonus entry (up to a maximum of 5 bonus entries).'
  },
  {
    question: 'When will the winners be announced?',
    answer: 'The lucky winners will be drawn and announced live during our official Grand Launch Ceremony in Pappinisseri. Follow our WhatsApp channel and social pages for the exact date and live stream.'
  },
  {
    question: 'How will the winner be contacted?',
    answer: 'Winners will be contacted directly via WhatsApp and phone call using the mobile number registered during entry. We will also publish the winning Entry IDs on our website and social media.'
  },
  {
    question: 'Where can I learn more about your Cargo, Travel, Visa & Flight Ticketing services?',
    answer: 'You can explore each service section above, chat directly with our customer support on WhatsApp, or visit our brand-new office in Pappinisseri (Near Highway / Railway Junction).'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            Clear Answers
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-gradient-orange">Questions.</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about the Nuvana.go Pappinisseri Launch Giveaway & Services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-amber-400 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-heading">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800/80 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400 bg-amber-500/10' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
