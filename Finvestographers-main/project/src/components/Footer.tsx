import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Start Here', to: '/start-here' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Contact', to: '/contact' },
];

const services = [
  { label: 'Financial Planning', id: 'financial-planning' },
  { label: 'Mutual Funds & SIP', id: 'mutual-funds-sip' },
  { label: 'Retirement Planning', id: 'retirement-planning' },
  { label: 'Child Education Planning', id: 'child-education-planning' },
  { label: 'Insurance Solutions', id: 'insurance-solutions' },
  { label: 'Loans & Loan Against MF', id: 'loans-loan-against-mf' },
  { label: 'Bonds, P2P Lending & Fixed Income', id: 'bonds-p2p-lending-fixed-income' },
  { label: 'Pre-IPO Opportunities', id: 'ipo-opportunities' },
  { label: 'Portfolio Review', id: 'portfolio-review' },
  { label: 'TAX Consultancy & ITR Filing', id: 'tax-consultancy-itr-filing' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #00448B 0%, #002A62 100%)' }}>
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)', padding: '4px' }}>
                <img
                  src={import.meta.env.BASE_URL + 'Logo_transparent_FINVESTOGRAPHERS.png'}
                  alt="Finvestographers"
                  className="h-9 w-9 object-contain"
                />
              </div>
                <div>
                <div className="font-extrabold text-base leading-none italic">
                  <span className="text-white">FINVESTO</span>
                  <span style={{ color: '#FF6100' }}>GRAPHERS</span>
                </div>
                {/* AMFI Registered label intentionally removed from logo area */}
              </div>
            </div>
            <p className="text-sm font-body leading-relaxed mb-5" style={{ color: '#A0C3E3' }}>
              Helping individuals, families and businesses achieve financial goals through disciplined long-term investing.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/finvestographers?stkn=MTh3YnA5ZWpkMG03" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FF6100')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                aria-label="Instagram">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="https://wa.me/918962692479" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                aria-label="WhatsApp">
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}
                    className="flex items-center gap-2 text-sm font-body transition-colors"
                    style={{ color: '#A0C3E3' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6100'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#A0C3E3'; }}
                  >
                    <ArrowRight size={12} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}
                    className="flex items-center gap-2 text-sm font-body transition-colors"
                    style={{ color: '#A0C3E3' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#FF6100'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#A0C3E3'; }}
                  >
                    <ArrowRight size={12} />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, label: '+91 89626 92479', href: 'tel:+918962692479' },
                { icon: Mail, label: 'Email- Finvestographers@gmail.com', href: 'mailto:Finvestographers@gmail.com' },
                { icon: MapPin, label: 'Address - Indore, India', href: undefined },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#FF6100' }} strokeWidth={2} />
                  {href ? (
                    <a href={href} className="text-sm font-body transition-colors break-all"
                      style={{ color: '#A0C3E3' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#A0C3E3')}>
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm font-body" style={{ color: '#A0C3E3' }}>{label}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* AMFI badge */}
            <div className="mt-6 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-xs font-body mb-1" style={{ color: '#74A8D5' }}>AMFI Registered MFD</p>
              <p className="text-white font-heading font-bold text-sm">ARN-345397</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container-max py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs font-body" style={{ color: '#74A8D5' }}>
              <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Terms of Use</Link>
            </div>
            <p className="text-xs font-body text-center" style={{ color: '#74A8D5' }}>
              &copy; {new Date().getFullYear()} Finvestographers. All rights reserved.
            </p>
          </div>
            <p className="mt-4 text-xs font-body leading-relaxed" style={{ color: '#4A8EC5' }}>
            <strong className="font-semibold" style={{ color: '#74A8D5' }}>Disclaimer:</strong> Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future results. Finvestographers is an AMFI registered Mutual Fund Distributor (ARN-345397). This website is for informational purposes only and does not constitute investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
