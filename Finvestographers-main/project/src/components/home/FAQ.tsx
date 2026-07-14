import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is SIP and how does it work?',
    a: "A SIP (Systematic Investment Plan) is a method of investing a fixed amount in a mutual fund at regular intervals — usually monthly. SIPs work by buying more units when markets are low and fewer when markets are high, averaging your cost over time. This removes the need to time the market.",
  },
  {
    q: 'How much should I invest every month?',
    a: "There's no universal answer — it depends on your income, expenses, goals, and timeline. A rough starting point: aim to invest at least 20–30% of your take-home Income. More importantly, start with whatever you can sustain without disrupting your lifestyle, then increase by 10% each year.",
  },
  {
    q: 'How does financial planning actually help me?',
    a: "Most people invest randomly — a SIP here, a FD there, LIC policy because someone insisted. Financial planning replaces this chaos with a clear map: where you stand today, where you want to go, and the most efficient route between the two.",
  },
  {
    q: 'How often should my portfolio be reviewed?',
    a: "At minimum, once a year — ideally twice. A review checks if your funds are still performing relative to their category, if your asset allocation still matches your goals and risk tolerance, and if there are tax-loss harvesting opportunities.",
  },
  {
    q: 'I already have investments. Can I still come to you?',
    a: "Absolutely — and this is often where the most value is found. We regularly find funds that are underperforming, duplicate holdings, insurance products that are underinsuring, and tax-inefficient structures.",
  },
  {
    q: 'How do I get started?',
    a: "Book a free 20-minute call. That's it. No documents, no paperwork, no pre-meeting homework. We'll have a practical conversation about where you currently stand, what you want to achieve, and what's getting in the way.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="section-label mb-3">Got Questions?</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-5">
              The Questions We Get Most Often
            </h2>
            <p className="text-lg text-[#5C7089] font-body leading-relaxed mb-8">
              If something specific isn't answered here, our 20-minute consultation call exists precisely for that.
            </p>
            <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6" style={{ boxShadow: '0 4px 20px rgba(0,68,139,0.06)' }}>
              <p className="font-heading font-bold text-[#00448B] text-lg mb-2">Still have questions?</p>
              <p className="text-[#5C7089] text-sm font-body mb-4">Book a free 20-minute call. No obligation. Just clarity.</p>
              <a href="https://wa.me/918962692479" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-heading font-semibold text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
                Ask Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDE5F0] overflow-hidden"
                style={{ boxShadow: open === i ? '0 4px 16px rgba(0,68,139,0.08)' : '0 1px 3px rgba(0,68,139,0.04)' }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-heading font-semibold text-[#00448B] text-[15px] leading-snug pr-2">{faq.q}</span>
                  <span className="flex-shrink-0 p-1.5 rounded-full transition-colors"
                    style={{ background: open === i ? '#00448B' : '#EBF2FA', color: open === i ? 'white' : '#00448B' }}>
                    {open === i ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                <div className={`accordion-content ${open === i ? 'open' : ''}`}>
                  <div className="px-5 pb-5">
                    <div className="border-t border-[#DDE5F0] pt-4">
                      <p className="text-[#5C7089] font-body text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
