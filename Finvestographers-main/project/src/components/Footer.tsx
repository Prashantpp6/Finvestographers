import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle, ArrowRight, type LucideIcon } from 'lucide-react';

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
  { label: 'Mutual Funds', id: 'mutual-funds-sip' },
  { label: 'Retirement Planning', id: 'retirement-planning' },
  { label: 'Child Education Planning', id: 'child-education-planning' },
  { label: 'Insurance', id: 'insurance-solutions' },
  { label: 'Loans & Financing', id: 'loans-loan-against-mf' },
  { label: 'Bonds', id: 'bonds-p2p-lending-fixed-income' },
  { label: 'Pre-IPO', id: 'ipo-opportunities' },
];

const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/finvestographers?stkn=MTh3YnA5ZWpkMG03', icon: Instagram },
  { label: 'WhatsApp', href: 'https://wa.me/918962692479', icon: MessageCircle },
];

const contacts: { icon: LucideIcon; title: string; label: string; href?: string; external?: boolean }[] = [
  { icon: MapPin, title: 'Location', label: 'Indore, India' },
  { icon: Mail, title: 'Email', label: 'Finvestographers@gmail.com', href: 'mailto:Finvestographers@gmail.com' },
  { icon: Phone, title: 'Phone', label: '+91 89626 92479', href: 'tel:+918962692479' },
  { icon: MessageCircle, title: 'WhatsApp', label: 'Chat with us', href: 'https://wa.me/918962692479', external: true },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/contact' },
  { label: 'Terms & Conditions', to: '/contact' },
  { label: 'Disclaimer', to: '/contact' },
];

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6100] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF1F4]';

function ColumnHeading({ children }: { children: string }) {
  return (
    <h4 className="mb-6 font-heading text-base font-bold tracking-normal text-[#17324D]">
      {children}
      <span aria-hidden="true" className="mt-3 block h-0.5 w-9 rounded-full bg-[#FF6100]" />
    </h4>
  );
}

function FooterLink({ to, children }: { to: string; children: string }) {
  return (
    <Link
      to={to}
      className={`group flex w-fit max-w-full min-w-0 items-start gap-2.5 rounded font-body text-[15px] leading-snug text-[#526273] transition-colors duration-200 hover:text-[#00448B] ${focusRing}`}
    >
      <ArrowRight
        size={14}
        strokeWidth={2}
        aria-hidden="true"
        className="mt-0.5 flex-shrink-0 text-[#FF6100] transition-all duration-200 group-hover:translate-x-0.5"
      />
      <span className="min-w-0">{children}</span>
    </Link>
  );
}

/* Very low-opacity growth lines and curves that sit behind the footer content. */
function FooterBackdrop() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke="#FF6100" strokeWidth="1.2" opacity="0.07">
        <path d="M-40 720 C 240 690, 420 610, 640 560 S 1080 400, 1480 230" />
        <path d="M-40 760 C 260 735, 460 660, 700 610 S 1120 460, 1480 300" />
      </g>
      <g stroke="#FF6100" strokeWidth="1" opacity="0.045">
        <path d="M-40 800 C 280 780, 500 710, 760 660 S 1160 520, 1480 370" />
      </g>
      <g stroke="#00448B" strokeWidth="1.5" opacity="0.07">
        <circle cx="1380" cy="60" r="180" />
        <circle cx="1380" cy="60" r="260" />
        <circle cx="1380" cy="60" r="340" />
      </g>
      <g stroke="#00448B" strokeWidth="1" opacity="0.05">
        <path d="M1050 500V482h18v18h18v-32h18v32h18v-47h18v47h18v-62h18v62h18v-78h18v78h18" />
      </g>
      <g fill="#FF6100" opacity="0.08">
        <circle cx="640" cy="560" r="2.5" />
        <circle cx="1080" cy="400" r="2.5" />
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#EEF1F4] text-[#526273]">
      <FooterBackdrop />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00448B]/20 to-transparent" />

      <div className="container-max relative pt-16 pb-10 md:pt-20">
        <div className="grid min-w-0 grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.2fr)] lg:gap-x-5 xl:gap-x-8 2xl:gap-x-12">
          {/* Brand */}
          <div className="min-w-0 max-w-sm">
            <Link to="/" aria-label="Finvestographers home" className={`block w-fit max-w-full rounded ${focusRing}`}>
              <img
                src={import.meta.env.BASE_URL + 'logo.png'}
                alt="Finvestographers"
                className="h-auto w-[220px] max-w-full object-contain"
              />
            </Link>
            <p className="mt-6 font-body text-[15px] leading-relaxed text-[#526273]">
              Helping individuals, families and businesses achieve financial goals through disciplined long-term investing.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Finvestographers on ${label}`}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border border-[#D5DCE3] bg-[#E2E7EC] text-[#00448B] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00448B] hover:bg-[#00448B] hover:text-white ${focusRing}`}
                >
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links" className="min-w-0">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="min-w-0">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-3.5">
              {services.map((s) => (
                <li key={s.id}>
                  <FooterLink to={`/services#${s.id}`}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="min-w-0">
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="space-y-4">
              {contacts.map(({ icon: Icon, title, label, href, external }) => {
                const value = <span className="block font-body text-[15px] leading-snug text-[#526273] transition-colors duration-200 group-hover:text-[#00448B]">{label}</span>;
                const content = (
                  <>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#D5DCE3] bg-[#E2E7EC] text-[#00448B]">
                      <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block font-body text-xs font-medium uppercase tracking-wider text-[#526273]/80">{title}</span>
                      {value}
                    </span>
                  </>
                );
                return (
                  <li key={title}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className={`group flex items-start gap-3.5 rounded-lg ${focusRing}`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-3.5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 inline-flex max-w-full items-center gap-3 rounded-lg border border-[#D5DCE3] bg-[#E2E7EC] px-4 py-2.5">
              <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-full bg-[#00448B] ring-2 ring-[#00448B]/15" />
              <p className="font-body text-xs leading-tight text-[#526273]">
                AMFI Registered MFD <span className="ml-1 font-heading font-bold text-[#17324D]">ARN-345397</span>
              </p>
            </div>
          </div>
        </div>

        {/* CTA panel */}
        <div className="relative mt-14 overflow-hidden rounded-xl border border-[#D5DCE3] bg-[#E2E7EC] px-6 py-7 shadow-[0_8px_24px_rgba(23,50,77,0.05)] sm:px-8 md:mt-16 lg:px-10 lg:py-8">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[#FF6100]" />
          <div aria-hidden="true" className="absolute -right-16 -top-24 h-56 w-56 rounded-full border border-[#00448B]/10" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="font-heading text-xl font-bold leading-snug text-[#17324D] sm:text-2xl">
                Ready to take the next step toward your financial goals?
              </p>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-[#526273]">
                Get expert guidance and personalised solutions for a smarter, more secure future.
              </p>
            </div>
            <Link
              to="/start-here"
              className={`group inline-flex min-h-[48px] w-full flex-shrink-0 items-center justify-center gap-2 rounded-[11px] bg-[#FF6100] px-7 py-3 font-heading text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(255,97,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E55600] hover:shadow-[0_7px_20px_rgba(255,97,0,0.24)] sm:w-auto ${focusRing}`}
            >
              Start Your Journey
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-[#D5DCE3]">
        <div className="container-max py-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
            <p className="font-body text-sm text-[#526273]">
              &copy; {new Date().getFullYear()} FINVESTOGRAPHERS. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-y-1 font-body text-sm">
              {legalLinks.map((item, i) => (
                <li key={item.label} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-3 text-[#526273]/50">|</span>}
                  <Link to={item.to} className={`rounded text-[#526273] transition-colors duration-200 hover:text-[#00448B] ${focusRing}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-5 font-body text-xs leading-relaxed text-[#526273]/80">
            <strong className="font-semibold text-[#526273]">Disclaimer:</strong> Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future results. Finvestographers is an AMFI registered Mutual Fund Distributor (ARN-345397). This website is for informational purposes only and does not constitute investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
