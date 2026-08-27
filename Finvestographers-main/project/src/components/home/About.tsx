import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, LifeBuoy, RefreshCw, ShieldCheck } from 'lucide-react';

const philosophy = [
  "We don't sell products—we build plans",
  'Transparent approach',
  'We stay with you until goal accomplishment',
  'Regular reviews, real accountability',
];

export default function About() {
  return (
    <section className="section-pad bg-[#F7F9FC]">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
                alt="Financial advisor meeting with client in a premium office"
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p className="text-white font-extrabold text-xl mb-1">Finvestographers</p>
                  <p className="text-blue-200 text-sm font-body">Financial Planner & AMFI Registered MFD</p>
                </div>
              </div>
            </div>
            {/* Our Promise — aligned to image, matching width */}
            <div className="mt-5 hidden lg:block max-w-md mx-auto lg:mx-0"
              style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #DDE5F0', boxShadow: '0 10px 30px rgba(0,68,139,0.08)' }}>
              <p className="text-[11px] text-[#5C7089] font-body uppercase tracking-wide mb-3">Our Promise</p>

              <p className="text-[#00448B] font-heading font-extrabold text-lg leading-tight mb-4">"We don't disappear after onboarding."</p>

              <div className="mt-4 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-4">
                    <div
                      className="flex flex-col items-center gap-2 p-3 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: '#EBF2FA', minWidth: 72 }}
                      role="img"
                      aria-label="Ongoing Support"
                    >
                      <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                        <LifeBuoy size={20} strokeWidth={2} style={{ color: '#00448B' }} />
                      </div>
                      <div className="text-xs font-semibold text-[#00448B]">Ongoing Support</div>
                    </div>

                    <div
                      className="flex flex-col items-center gap-2 p-3 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: '#FFF3EB', minWidth: 72 }}
                      role="img"
                      aria-label="Regular Reviews"
                    >
                      <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                        <RefreshCw size={20} strokeWidth={2} style={{ color: '#FF6100' }} />
                      </div>
                      <div className="text-xs font-semibold text-[#FF6100]">Regular Reviews</div>
                    </div>

                    <div
                      className="flex flex-col items-center gap-2 p-3 rounded-lg transition-transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ background: '#F0F7FF', minWidth: 72 }}
                      role="img"
                      aria-label="Accountability"
                    >
                      <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: 'white' }}>
                        <ShieldCheck size={20} strokeWidth={2} style={{ color: '#00448B' }} />
                      </div>
                      <div className="text-xs font-semibold text-[#00448B]">Accountability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="section-label mb-3">Who We Are</p>
            <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-5">
              We Graph Your Investment Journey
            </h2>
            <p className="text-lg text-[#5C7089] font-body leading-relaxed mb-4">
              Finvestographers helps individuals, families and businesses achieve financial goals through mutual fund investments, bonds, pre-IPO investments, tax-saving, retirement planning, child education planning and wealth management solutions.
            </p>
            <p className="text-[#5C7089] font-body leading-relaxed mb-6">
              We built this practice because we saw too many smart, hardworking people making the same avoidable mistakes — wrong insurance, idle savings, or investments scattered with no clear purpose.
            </p>
            <div className="space-y-3 mb-8">
              {philosophy.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#EBF2FA' }}>
                    <CheckCircle size={12} strokeWidth={2.5} style={{ color: '#00448B' }} />
                  </div>
                  <span className="font-body text-[#0F1C2E] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/calculators?tab=retirement" className="btn-primary">
              Our Approach <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
