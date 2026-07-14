import { useState } from 'react';
import { MessageCircle, Phone, Calendar, CheckCircle, Clock, MapPin, Mail, Shield, Star, ArrowRight } from 'lucide-react';

const callbackSlots = ['Within 4 Hours', 'This Evening', 'This Weekend'];
const helpOptions = ["I want to start my first SIP", "Am I investing in the right funds?", "How much do I need for retirement?", "Can I save more tax?", "Do I have enough insurance?", "I want a plan for my child's future", "I want to retire early", "Something else"];

export default function Contact() {
  const [callbackForm, setCallbackForm] = useState({ phone: '', slot: '' });
  const [callbackSent, setCallbackSent] = useState(false);
  const [helpSelected, setHelpSelected] = useState('');
  const [shortForm, setShortForm] = useState({ name: '', phone: '', message: '' });
  const [shortSent, setShortSent] = useState(false);

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-14 bg-white border-b border-[#DDE5F0]">
        <div className="container-max max-w-3xl text-center">
          <p className="section-label mb-3">Contact Us</p>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5 text-center">
            <span className="block">Contact Us About Your</span>
            <span className="block" style={{ color: '#16A34A' }}>Financial Goals</span>
          </h1>
          <p className="text-xl text-[#5C7089] font-body leading-relaxed">
            No obligation. No sales pitch. Just a practical discussion about where you stand and what your options are.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#F7F9FC]">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {/* Left col */}
            <div className="lg:col-span-2 space-y-5">
              {/* WhatsApp */}
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
                    style={{ background: '#F0FDF4', color: '#16A34A' }}>Fastest Response</span>
                </div>
                <h2 className="text-xl font-heading font-bold text-[#00448B] mb-2">Option 1 — Chat on WhatsApp</h2>
                <p className="text-[#5C7089] font-body text-sm mb-5">70%+ of our clients reach out first on WhatsApp. It's the fastest way to connect.</p>
                <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 text-white font-heading font-semibold py-4 px-8 rounded-2xl transition-all hover:scale-105"
                  style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
                  <MessageCircle size={20} strokeWidth={2} />
                  Start WhatsApp Chat
                </a>
              </div>

              {/* Callback */}
              <div className="card">
                <h2 className="text-xl font-heading font-bold text-[#00448B] mb-2">Option 2 — Need a Quick Callback?</h2>
                <p className="text-[#5C7089] font-body text-sm mb-5">Enter your number and choose a time. We'll call you.</p>
                {callbackSent ? (
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#F0FDF4' }}>
                    <CheckCircle size={22} style={{ color: '#16A34A' }} className="flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold" style={{ color: '#16A34A' }}>Callback Requested!</p>
                      <p className="text-[#5C7089] text-sm font-body">We'll call you at your chosen time.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setCallbackSent(true); }} className="space-y-4">
                    <input type="tel" required placeholder="Your Mobile Number" className="input-field"
                      value={callbackForm.phone} onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })} />
                    <div className="grid grid-cols-2 gap-3">
                      {callbackSlots.map((slot) => (
                        <label key={slot}
                          className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                          style={{ borderColor: callbackForm.slot === slot ? '#00448B' : '#DDE5F0', background: callbackForm.slot === slot ? '#EBF2FA' : 'white' }}>
                          <input type="radio" name="slot" value={slot} checked={callbackForm.slot === slot}
                            onChange={() => setCallbackForm({ ...callbackForm, slot })}
                            style={{ accentColor: '#00448B' }} />
                          <span className="text-sm font-body text-[#0F1C2E]">{slot}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex flex-col items-center justify-center py-4">
                      <p className="text-xs font-body mb-1" style={{ color: '#5C7089' }}>AMFI Registered MFD</p>
                      <p className="font-heading font-bold text-[#00448B]">ARN-345397</p>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-3">
                      Request Callback <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>

              <div className="card">
                <h2 className="text-xl font-heading font-bold text-[#00448B] mb-2">Option 3 — Book a Free 20-Min Consultation</h2>
                <p className="text-[#5C7089] font-body text-sm mb-5">Prefer a scheduled discussion? Choose a convenient slot. Video or phone — your choice.</p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center py-4 w-auto inline-flex">
                  <Calendar size={18} />Book My Slot (Calendly)<ArrowRight size={16} />
                </a>
                <div className="mt-4 flex items-center gap-2 text-sm font-body" style={{ color: '#9BAEC8' }}>
                  <Clock size={13} strokeWidth={2} />20 minutes · Free · No commitment
                </div>
              </div>

              {/* What would you like help with */}
              <div className="card">
                <h2 className="text-xl font-heading font-bold text-[#00448B] mb-2">Option 4 — What Would You Like Help With?</h2>
                <p className="text-[#5C7089] font-body text-sm mb-5">Tell us what's on your mind and we'll come prepared.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {helpOptions.map((opt) => (
                    <label key={opt}
                      className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                      style={{ borderColor: helpSelected === opt ? '#00448B' : '#DDE5F0', background: helpSelected === opt ? '#EBF2FA' : 'white' }}>
                      <input type="radio" name="help" value={opt} checked={helpSelected === opt}
                        onChange={() => setHelpSelected(opt)} className="flex-shrink-0" style={{ accentColor: '#00448B' }} />
                      <span className="text-sm font-body text-[#0F1C2E]">{opt}</span>
                    </label>
                  ))}
                </div>
                {shortSent ? (
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#F0FDF4' }}>
                    <CheckCircle size={22} style={{ color: '#16A34A' }} className="flex-shrink-0" />
                    <div>
                      <p className="font-heading font-semibold" style={{ color: '#16A34A' }}>Message Received!</p>
                      <p className="text-[#5C7089] text-sm font-body">We'll be in touch within 4 hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setShortSent(true); }} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" required placeholder="Your Name" className="input-field"
                        value={shortForm.name} onChange={(e) => setShortForm({ ...shortForm, name: e.target.value })} />
                      <input type="tel" required placeholder="Phone Number" className="input-field"
                        value={shortForm.phone} onChange={(e) => setShortForm({ ...shortForm, phone: e.target.value })} />
                    </div>
                    <textarea placeholder="What would you like to sort out? (optional)" className="input-field h-24 resize-none"
                      value={shortForm.message} onChange={(e) => setShortForm({ ...shortForm, message: e.target.value })} />
                    <button type="submit" className="btn-primary w-full justify-center py-3">
                      Send Message <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-5">
              <div className="rounded-3xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
                <h3 className="font-heading font-bold text-white text-lg mb-5">Why Clients Trust Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, label: 'AMFI Registered', value: 'ARN-XXXXXX' },
                    { icon: Star, label: 'Client Satisfaction', value: '98%' },
                    { icon: CheckCircle, label: 'Families Guided', value: '87+' },
                    { icon: Clock, label: 'Experience', value: '5+ Years' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <Icon size={15} style={{ color: '#FF6100' }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-body" style={{ color: '#74A8D5' }}>{label}</p>
                        <p className="font-heading font-bold text-white text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card space-y-4">
                <h3 className="font-heading font-bold text-[#00448B] text-lg">Contact Details</h3>
                {[
                  { icon: Phone, label: 'Phone', value: 'Mob- 8962692479', href: 'tel:+918962692479' },
                  { icon: Mail, label: 'Email', value: 'Email- Finvestographers@gmail.com', href: 'mailto:Finvestographers@gmail.com' },
                  { icon: MapPin, label: 'Location', value: 'Address - Indore, India', href: undefined },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EBF2FA' }}>
                      <Icon size={13} style={{ color: '#00448B' }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-body" style={{ color: '#9BAEC8' }}>{label}</p>
                      {href
                        ? <a href={href} className="text-sm font-body text-[#0F1C2E] hover:text-[#00448B] transition-colors">{value}</a>
                        : <p className="text-sm font-body text-[#0F1C2E]">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl p-5 border border-[#DDE5F0]" style={{ background: '#F7F9FC' }}>
                <h3 className="font-heading font-bold text-[#00448B] text-sm uppercase tracking-wide mb-4">Registrations</h3>
                {[
                  { label: 'AMFI ARN Number', value: 'ARN-XXXXXX' },
                    { label: 'NISM Series V-A', value: 'Certified' },
                    { label: 'Experience', value: '5+ Years' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-[#DDE5F0] last:border-0">
                    <span className="text-xs text-[#5C7089] font-body">{label}</span>
                    <span className="text-xs font-heading font-semibold text-[#00448B]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl p-5 border" style={{ background: '#FFF3EB', borderColor: '#FFD9B8' }}>
                <div className="flex items-start gap-3">
                  <Clock size={17} style={{ color: '#FF6100' }} strokeWidth={1.5} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-semibold text-sm" style={{ color: '#E55600' }}>Response Promise</p>
                    <p className="text-xs font-body leading-relaxed mt-1" style={{ color: '#CC4D00' }}>
                      Every enquiry gets a personal response within 4 working hours — not an automated reply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
