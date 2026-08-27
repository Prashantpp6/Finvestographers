import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, AlertTriangle, MessageCircle, TrendingUp, Shield, Clock } from 'lucide-react';
import { openConsultationModal } from '../lib/enquiry';

const questions = [
  {
    number: '01',
    question: 'Do you know exactly what your money is doing right now?',
    context: 'Not just "I have some SIPs" — but which funds, at what allocation, toward which specific goals, with what expected outcome in how many years?',
    honest: "Most people can't answer this. That's not a personal failure. Nobody taught us this.",
  },
  {
    number: '02',
    question: 'If you lost your income tomorrow, how long could your family sustain their current lifestyle?',
    context: "Days? Weeks? Months? Years? This isn't meant to alarm you. It's meant to focus your attention on what matters.",
    honest: "If the answer is less than 6 months, that's a fire to put out before anything else.",
  },
  {
    number: '03',
    question: 'Is your money growing faster than inflation?',
    context: "India's inflation runs at 5–7%. If your savings account gives 3.5% and your FD gives 6.5%, your money is losing purchasing power — even when the number in your account goes up.",
    honest: "This is the ₹50,000 problem most people don't know they have.",
  },
];

const mistakes = [
  { icon: AlertTriangle, title: 'Keeping too much in savings accounts', detail: '₹2–3L sitting at 3.5% is losing money in real terms every single year.' },
  { icon: Shield, title: 'Stopping SIP During Market Dips', detail: "The best opportunities often appear when markets feel the worst. Stopping your SIP may cost more than the market fall itself." },
  { icon: TrendingUp, title: 'Investing in too many mutual funds', detail: "9 funds often hold 80% of the same stocks. More isn't more — it's just more confusion." },
  { icon: Clock, title: 'Waiting for "the right time" to start', detail: "There's no right time. Every month you wait is compounding working against you, not for you." },
];

export default function StartHere() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-semibold mb-8"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF6100' }} />
            You found us. Good decision.
          </div>
          <h1 className="text-display-lg font-heading font-extrabold text-white mb-6 leading-tight text-center">
            <span className="block">If you're already here,</span>
            <span className="block" style={{ color: '#FF6100' }}>start before anything else.</span>
          </h1>
          <p className="text-blue-200 text-xl font-body leading-relaxed">
            This page is designed for one thing — to give you enough context to decide if we're the right fit for where you are financially.
          </p>
        </div>
      </section>

      {/* Your situation */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Your Situation</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            You're probably in one of three situations.
          </h2>
          <p className="text-lg text-[#5C7089] font-body mb-10">
            We've worked with hundreds of clients. Almost everyone starts in one of these places:
          </p>
          <div className="space-y-4">
            {[
              { label: 'Situation A', title: "You're earning reasonably well but have no clear financial plan.",
                desc: "Money comes in. Money goes out. Some goes to SIPs. But you couldn't explain your financial strategy to someone else. You know you should do more — you just haven't found the right starting point.",
                bg: '#EBF2FA', border: '#C8DCEF', labelColor: '#00448B' },
              { label: 'Situation B', title: "You have investments but don't know if they're the right ones.",
                desc: "You've got a few SIPs, maybe an LIC policy, your company provides a group cover. But you don't know if any of this is actually moving you toward your goals. You want clarity, not a sales pitch.",
                bg: '#FFF3EB', border: '#FFD9B8', labelColor: '#FF6100' },
              { label: 'Situation C', title: "You've just had a financial wake-up call.",
                desc: "Someone close to you passed away without adequate insurance. You did the math on your FD returns and felt sick. Something clicked — and now you want to fix it.",
                bg: 'white', border: '#DDE5F0', labelColor: '#00448B' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-7 border" style={{ background: s.bg, borderColor: s.border }}>
                <p className="text-xs font-heading font-semibold uppercase tracking-widest mb-2" style={{ color: s.labelColor }}>{s.label}</p>
                <h3 className="font-heading font-bold text-[#00448B] text-lg mb-3">{s.title}</h3>
                <p className="text-[#5C7089] font-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">Before We Talk</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            Ask yourself these 3 questions.
          </h2>
          <p className="text-lg text-[#5C7089] font-body mb-10">
            Your honest answers to these will make our first conversation 10x more useful.
          </p>
          <div className="space-y-5">
            {questions.map((q) => (
              <div key={q.number} className="card">
                <div className="flex gap-5">
                  <span className="text-5xl font-heading font-extrabold flex-shrink-0 leading-none" style={{ color: '#EBF2FA' }}>{q.number}</span>
                  <div>
                    <h3 className="font-heading font-bold text-[#00448B] text-lg mb-3 leading-snug">{q.question}</h3>
                    <p className="text-[#5C7089] font-body text-sm leading-relaxed mb-3">{q.context}</p>
                    <div className="flex items-start gap-2 rounded-xl p-3" style={{ background: '#FFF3EB' }}>
                      <span className="text-base flex-shrink-0">💬</span>
                      <p className="text-sm font-body italic" style={{ color: '#CC4D00' }}>{q.honest}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">What We See</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            The 4 Most Common Mistakes
          </h2>
          <p className="text-lg text-[#5C7089] font-body mb-10">
            These aren't criticisms. They're patterns we see in almost every first-time client review.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {mistakes.map((m) => (
              <div key={m.title} className="card">
                <div className="p-2.5 rounded-xl w-fit mb-4" style={{ background: '#FEF2F2' }}>
                  <m.icon size={20} strokeWidth={1.5} style={{ color: '#DC2626' }} />
                </div>
                <h3 className="font-heading font-bold text-[#00448B] text-[15px] mb-2">{m.title}</h3>
                <p className="text-[#5C7089] font-body text-sm leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="section-label mb-3">What We Do</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            One clear plan. Regular accountability.
          </h2>
          <p className="text-lg text-[#5C7089] font-body leading-relaxed mb-8">
            We don't sell financial products. We build financial plans — and then stay with you to make sure they're actually working.
          </p>
          <div className="space-y-4">
            {[
              { label: 'First, we listen.', detail: 'A 20-minute call to understand your situation, your goals, and your concerns. No forms, no products, no commitments.' },
              { label: 'Then, we assess.', detail: "We review what you currently have and identify the gaps and opportunities." },
              { label: 'Then, we plan.', detail: "A personalized roadmap: which funds, what allocation, what insurance, built around your goals, not ours." },
              { label: "Then, we stay.", detail: "Regular reviews, market updates, and proactive adjustments. We don't disappear after onboarding." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl" style={{ background: '#EBF2FA' }}>
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-heading font-bold text-sm flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #00448B, #0057B3)' }}>{i + 1}</div>
                <div>
                  <p className="font-heading font-bold text-[#00448B] text-[15px] mb-1">{step.label}</p>
                  <p className="text-[#5C7089] font-body text-sm leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-display-md font-heading font-extrabold text-white mb-5">Ready to get some clarity?</h2>
          <p className="text-blue-200 text-lg font-body leading-relaxed mb-8">
            One call. 20 minutes. No obligation. You'll walk away knowing exactly where you stand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918962692479" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white font-heading font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
              <MessageCircle size={20} strokeWidth={2} />
              Start on WhatsApp
            </a>
            <button type="button" onClick={() => openConsultationModal({ source: 'start-here' })} className="btn-cta text-base px-8 py-4 justify-center">
              Book a 20-Min Call <ArrowRight size={18} />
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {['No sales pitch', 'No obligation', 'Callback within 4 hours'].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm font-body" style={{ color: '#74A8D5' }}>
                <CheckCircle size={14} style={{ color: '#FF6100' }} strokeWidth={2} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
