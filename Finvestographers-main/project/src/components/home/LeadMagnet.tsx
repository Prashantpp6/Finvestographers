import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const goals = ['Start my first SIP', 'Review my existing investments', 'Plan for retirement', 'Save more tax', 'Review my insurance', "Plan for child's education", 'Other'];

export default function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', goal: '' });

  return (
    <section className="section-pad" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-heading font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#FF6100' }}>
              Free Assessment
            </p>
            <h2 className="text-display-md font-heading font-extrabold text-white mb-5 leading-tight">
              <span className="block">Discover Hidden Gaps In</span>
              <span className="block" style={{ color: '#FF6100' }}>Your Financial Plan</span>
            </h2>
            <p className="text-blue-200 text-lg font-body leading-relaxed mb-8">
              Get a free financial assessment and uncover opportunities to optimise your investments.
            </p>
            <div className="space-y-4">
              {["Know if you're on track for your goals", "Find investments that are costing you money", "Identify your biggest financial blind spots", "Get a personalised action plan"].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,97,0,0.2)' }}>
                    <CheckCircle size={12} strokeWidth={2.5} style={{ color: '#FF6100' }} />
                  </div>
                  <span className="text-blue-100 font-body text-sm">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#F0FDF4' }}>
                  <CheckCircle size={32} style={{ color: '#16A34A' }} />
                </div>
                <h3 className="font-heading font-bold text-[#00448B] text-xl mb-2">We'll be in touch!</h3>
                <p className="text-[#5C7089] font-body text-sm">Expect a WhatsApp message within 4 working hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-[#00448B] text-xl mb-6">Get Your Free Financial Assessment</h3>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  {[
                    { label: 'Your Name', type: 'text', placeholder: 'Rahul Sharma', key: 'name' },
                    { label: 'Phone Number', type: 'tel', placeholder: 'Mob- 8962692479', key: 'phone' },
                    { label: 'Email Address', type: 'email', placeholder: 'rahul@example.com', key: 'email' },
                  ].map(({ label, type, placeholder, key }) => (
                    <div key={key}>
                      <label className="block text-sm font-heading font-semibold text-[#0F1C2E] mb-1.5">{label}</label>
                      <input type={type} required={key !== 'email'} placeholder={placeholder} className="input-field"
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-heading font-semibold text-[#0F1C2E] mb-1.5">What would you like to sort out?</label>
                    <select className="input-field" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                      <option value="">Select your goal...</option>
                      {goals.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="btn-cta w-full justify-center py-4 text-base mt-2">
                    Get Free Assessment <Send size={16} />
                  </button>
                </form>
                <p className="text-xs text-[#9BAEC8] font-body text-center mt-4">No spam. No sales pressure. Callback within 4 hours.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
