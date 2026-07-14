import { Link } from 'react-router-dom';
import {
  DollarSign, TrendingUp, Umbrella, Building2, Lock,
  Rocket, PieChart, Users, ArrowRight, CheckCircle, MessageCircle, FileText
} from 'lucide-react';

const services = [
  {
    icon: DollarSign,
    id: 'financial-planning',
    title: 'Financial Planning',
    tagline: "I'm earning well, but I'm losing too much to taxes and hidden leaks.",
    description: "We'll map your income, expenses, liabilities, and investments into a clear roadmap while legally optimizing your tax liabilities to maximize surplus wealth.",
    benefits: ['Complete cash flow mapping', 'Debt optimization strategy', 'Emergency fund sizing', 'Goal prioritization framework'],
    bg: '#EBF2FA', iconBg: '#00448B',
  },
  {
    icon: TrendingUp,
    id: 'mutual-funds-sip',
    title: 'Mutual Funds & SIP',
    tagline: 'I want my money to work harder than my salary.',
    description: "Whether you're starting with ₹5,000/month or investing larger amounts, we'll create a strategy designed around your goals — not a commission chart.",
    benefits: ['Curated fund selection (not 500 options)', 'SIP structure matched to your goals', 'Regular rebalancing reviews', 'Exit strategy for underperformers'],
    bg: '#FFF3EB', iconBg: '#FF6100',
  },
  {
    icon: Umbrella,
    id: 'retirement-planning',
    title: 'Retirement Planning',
    tagline: "I don't want to work forever.",
    description: "Discover how much you'll actually need, whether you're on track, and what adjustments can improve your future lifestyle.",
    benefits: ['Corpus target calculation', 'Inflation-adjusted projections', 'Withdrawal strategy design', 'Pension & annuity guidance'],
    bg: '#F0FDF4', iconBg: '#16A34A',
  },
  {
    icon: TrendingUp,
    id: 'child-education-planning',
    title: "Child Education Planning",
    tagline: "Don't let inflation erode your child's future.",
    description: "Plan for school and college costs with dedicated funds and goal-based investment strategies.",
    benefits: ['Education cost projections', 'Dedicated SIP planning', 'Inflation-adjusted targets', 'Fee & expense management'],
    bg: '#FFF3EB', iconBg: '#FF6100',
  },
  {
    icon: Users,
    id: 'insurance-solutions',
    title: 'Insurance Solutions',
    tagline: 'If something happens to me, will my family be financially okay?',
    description: 'Term insurance, health insurance, personal accident, business protection and other risk-management solutions. We recommend what you need — not what pays the highest commission.',
    benefits: ['Needs-based coverage audit', 'Term vs. ULIP comparison', 'Health insurance structuring', 'Family protection framework'],
    bg: '#FEF2F2', iconBg: '#DC2626',
  },
  {
    icon: Building2,
    id: 'loans-loan-against-mf',
    title: 'Loans & Loan Against MF',
    tagline: "I need money, but I don't want to disturb my investments.",
    description: 'Explore funding options while keeping long-term financial goals in focus. Use your portfolio as leverage without breaking compounding.',
    benefits: ['Loan against mutual fund options', 'Interest cost vs. redemption analysis', 'Structured repayment planning', 'Portfolio impact assessment'],
    bg: '#FFF8F0', iconBg: '#D97706',
  },
  {
    icon: Lock,
    id: 'bonds-p2p-lending-fixed-income',
    title: 'Bonds\nP2P Lending\n& Fixed Income',
    tagline: "My money is sitting in FDs, but I feel it's not growing enough.",
    description: 'For investors seeking stability, predictable income and portfolio balance. Better returns than FDs with managed risk.',
    benefits: ['Corporate bond opportunities', 'Government securities access', 'Fixed-income ladder strategy', 'Tax-efficient debt allocation'],
    bg: '#F0F4F8', iconBg: '#475569',
  },
  {
    icon: Rocket,
    id: 'ipo-opportunities',
    title: 'Pre-IPO Opportunities',
    tagline: 'I want access to opportunities most investors never hear about.',
    description: 'Evaluate select pre-IPO opportunities and understand both the potential rewards and risks before investing. High conviction, not hype.',
    benefits: ['Vetted opportunity pipeline', 'Risk-reward analysis', 'Allocation sizing guidance', 'Liquidity timeline clarity'],
    bg: '#FFF0F0', iconBg: '#DC2626',
  },
  {
    icon: PieChart,
    id: 'portfolio-review',
    title: 'Portfolio Review',
    tagline: "I have investments everywhere. I don't know if they're helping me.",
    description: 'Review existing mutual funds, insurance policies, fixed-income products and overall asset allocation. Find out what to keep, what to fix, and what to drop.',
    benefits: ['Holdings overlap analysis', 'Fee & expense audit', 'Risk concentration check', 'Actionable improvement plan'],
    bg: '#F0FFFE', iconBg: '#0891B2',
  },
  {
    icon: FileText,
    id: 'tax-consultancy-itr-filing',
    title: 'TAX Consultancy & ITR Filing',
    tagline: 'I want to save tax legally and file my returns without stress.',
    description: 'We help salaried professionals, business owners, and investors optimize taxes, claim eligible deductions, and file returns accurately and on time. Stay compliant while keeping more of what you earn.',
    benefits: ['Income tax planning', 'Tax-saving investment strategy', 'Accurate ITR filing support', 'Capital gains & investment tax guidance'],
    bg: '#F6F0FF', iconBg: '#7C3AED',
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-14 bg-white border-b border-[#DDE5F0]">
        <div className="container-max max-w-3xl text-center">
          <p className="section-label mb-3">What We Solve</p>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5">
            Services That Move You Forward
          </h1>
          <p className="text-xl text-[#5C7089] font-body leading-relaxed">
            Most financial problems come down to one of these. Which one sounds like you?
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad bg-[#F7F9FC]">
        <div className="container-max">
          <div className="space-y-6">
            {services.map((svc) => (
              <div id={svc.id} key={svc.title}
                className="bg-white rounded-2xl border border-[#DDE5F0] overflow-hidden transition-all duration-300 hover:shadow-card-hover"
                style={{ boxShadow: '0 1px 3px rgba(0,68,139,0.05), 0 4px 16px rgba(0,68,139,0.06)' }}>
                <div className="grid md:grid-cols-[auto_1fr] gap-0">
                  {/* Icon column */}
                  <div className="p-8 flex flex-col items-center justify-center md:w-[200px]"
                    style={{ background: svc.bg }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: svc.iconBg }}>
                      <svc.icon size={24} strokeWidth={1.5} color="white" />
                    </div>
                    <h2 className="text-lg font-heading font-bold text-[#00448B] text-center">
                      {svc.title.includes('\n') ? svc.title.split('\n').map((l, i) => <span key={i} className="block">{l}</span>) : svc.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <p className="text-sm font-body italic text-[#5C7089] mb-4">"{svc.tagline}"</p>
                    <p className="text-[#0F1C2E] font-body text-[15px] leading-relaxed mb-5">{svc.description}</p>

                    <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {svc.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: svc.bg }}>
                            <CheckCircle size={11} strokeWidth={2.5} style={{ color: svc.iconBg }} />
                          </div>
                          <span className="text-sm font-body text-[#0F1C2E]">{b}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
                        Get Started <ArrowRight size={14} />
                      </Link>
                      <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-heading font-semibold px-5 py-2.5 rounded-xl text-white transition-all duration-200 hover:scale-105"
                        style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
                        <MessageCircle size={15} strokeWidth={2} />
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free session CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="container-max">
          <p className="font-heading font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#FF6100' }}>
            Not Sure Where To Start?
          </p>
          <h2 className="text-display-md font-heading font-extrabold text-white mb-4">
            Book a Free 20-Min Financial Reality Check
          </h2>
          <p className="text-blue-200 font-body text-lg max-w-xl mx-auto mb-8">
            Sometimes the biggest problem isn't lack of money. It's lack of direction. Let's find yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-orange text-base px-8 py-4">
              Book Free Session <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-heading font-semibold px-7 py-4 rounded-xl transition-colors"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
              <MessageCircle size={18} strokeWidth={2} />WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
