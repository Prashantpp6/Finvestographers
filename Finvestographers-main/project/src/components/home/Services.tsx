import { Link } from 'react-router-dom';
import { openConsultationModal } from '../../lib/enquiry';
import {
  DollarSign, TrendingUp, Umbrella, Building2, Lock,
  Rocket, PieChart, LayoutGrid, Users, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: DollarSign,
    problem: "I'm earning well, but I'm losing too much to taxes and hidden leaks.",
    title: 'Financial Planning',
    description: "We'll map your income, expenses, liabilities, and investments into a clear roadmap while legally optimizing your tax liabilities to maximize surplus wealth.",
    cta: 'Show Me My Financial Blind Spots',
    bg: '#EBF2FA', iconBg: '#00448B', iconColor: 'white',
    calculatorTab: 'track',
    blogSlug: 'salary-12-lakh-month-end-tight',
  },
  {
    icon: TrendingUp,
    problem: 'I want my money to work harder than my salary.',
    title: 'Mutual Funds & SIP',
    description: "Whether you're starting with ₹5,000/month or investing larger amounts, we'll create a strategy designed around your goals.",
    cta: 'Am I Investing Efficiently?',
    bg: '#FFF3EB', iconBg: '#FF6100', iconColor: 'white',
    calculatorTab: 'growth',
    blogSlug: 'sip-started-at-27-vs-32',
  },
  {
    icon: Umbrella,
    problem: "I don't want to work forever.",
    title: 'Retirement Planning',
    description: "Discover how much you'll actually need, whether you're on track, and what adjustments can improve your future lifestyle.",
    cta: 'Can I Retire Comfortably?',
    bg: '#F0FDF4', iconBg: '#16A34A', iconColor: 'white',
    calculatorTab: 'retirement',
    blogSlug: 'sip-started-at-27-vs-32',
  },
  {
    icon: Users,
    problem: 'If something happens to me, will my family be financially okay?',
    title: 'Insurance Solutions',
    description: 'Term insurance, health insurance, personal accident, business protection and other risk-management solutions.',
    cta: 'Do I Have Enough Protection?',
    bg: '#F8F4FF', iconBg: '#7C3AED', iconColor: 'white',
    calculatorTab: 'track',
    blogSlug: 'company-cover-50-lakh-not-enough',
  },
  {
    icon: Building2,
    problem: "I need money, but I don't want to disturb my investments.",
    title: 'Loans & Loan Against MF',
    description: 'Explore funding options while keeping long-term financial goals in focus.',
    cta: "What's My Smartest Borrowing Option?",
    bg: '#FFF8F0', iconBg: '#D97706', iconColor: 'white',
    calculatorTab: 'fd',
    blogSlug: 'salary-12-lakh-month-end-tight',
  },
  {
    icon: Lock,
    problem: "My money is sitting in FDs, but I feel it's not growing enough.",
    title: 'Bonds, P2P Lending & Fixed Income',
    description: 'For investors seeking stability, predictable income and portfolio balance.',
    cta: 'Is My Money Losing To Inflation?',
    bg: '#F0F4F8', iconBg: '#475569', iconColor: 'white',
    calculatorTab: 'fd',
    blogSlug: 'salary-12-lakh-month-end-tight',
  },
  {
    icon: Rocket,
    problem: 'I want access to opportunities most investors never hear about.',
    title: 'Pre-IPO Opportunities',
    description: 'Evaluate select pre-IPO opportunities and understand both the potential rewards and risks before investing.',
    cta: 'What Opportunities Am I Missing?',
    bg: '#FFF0F0', iconBg: '#DC2626', iconColor: 'white',
    calculatorTab: 'growth',
    blogSlug: 'sip-started-at-27-vs-32',
  },
  {
    icon: PieChart,
    problem: "I have investments everywhere. I don't know if they're helping me.",
    title: 'Portfolio Review',
    description: 'Review existing mutual funds, insurance policies, fixed-income products and overall asset allocation.',
    cta: 'Am I Actually On Track?',
    bg: '#F0FFFE', iconBg: '#0891B2', iconColor: 'white',
    calculatorTab: 'track',
    blogSlug: 'three-questions-before-first-sip',
  },
  {
    icon: LayoutGrid,
    problem: "I don't know which option is right for me.",
    title: 'Free Financial Clarity Session',
    description: "Sometimes the biggest problem isn't lack of money. It's lack of direction.",
    cta: 'Book A Free 20-Min Financial Reality Check',
    bg: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)', iconBg: 'rgba(255,255,255,0.15)', iconColor: 'white',
    dark: true,
    calculatorTab: 'track',
    blogSlug: 'salary-12-lakh-month-end-tight',
  },
];

export default function Services() {
  return (
    <section className="section-pad bg-[#F7F9FC]" id="services">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="section-label mb-3">What We Solve</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            What's Keeping You Financially Stuck?
          </h2>
          <p className="text-lg text-[#5C7089] font-body max-w-2xl mx-auto">
            <span>Most financial problems come down to one of these.</span>
            <span className="block">Which one sounds like you?</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <div
              key={svc.title}
              className={`relative rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1
                ${svc.dark ? 'text-white' : 'bg-white border border-[#DDE5F0] hover:shadow-card-hover'}`}
              style={svc.dark ? { background: svc.bg } : { background: svc.bg }}
            >
              <div
                className="inline-flex p-2.5 rounded-xl mb-4"
                style={{ background: svc.iconBg }}
              >
                <svc.icon size={18} strokeWidth={1.5} color={svc.iconColor} />
              </div>

              <p className={`text-xs font-accent italic mb-3 leading-snug ${svc.dark ? 'text-blue-200' : 'text-[#5C7089]'}`}>
                "{svc.problem}"
              </p>

              <h3 className={`text-base font-heading font-bold mb-2 ${svc.dark ? 'text-white' : 'text-[#00448B]'}`}>
                {svc.title}
              </h3>

              <p className={`text-sm leading-relaxed mb-5 ${svc.dark ? 'text-blue-200' : 'text-[#5C7089]'}`}>
                {svc.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/calculators?tab=${svc.calculatorTab}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-heading font-semibold transition-all duration-200
                    ${svc.dark ? 'text-[#FF6100]' : 'text-[#00448B] hover:text-[#FF6100]'}`}
                >
                  {svc.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to={`/blog/${svc.blogSlug}`} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-heading font-semibold transition-all duration-200 ${svc.dark ? 'bg-white/10 text-white' : 'bg-[#F7F9FC] text-[#00448B]'}`}>
                  Learn More
                </Link>
                <button type="button" onClick={() => openConsultationModal({ interest: svc.title, source: 'services-section' })} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-heading font-semibold transition-all duration-200 ${svc.dark ? 'bg-[#FF6100] text-white' : 'bg-[#FFF3EB] text-[#FF6100]'}`}>
                  Try Free
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
