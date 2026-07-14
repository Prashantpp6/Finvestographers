import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Start Here', path: '/start-here' },
  { label: 'Services', path: '/services' },
  { label: 'Calculators', path: '/calculators' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path) && path !== '/';
  };

  const navBg = scrolled || menuOpen
    ? 'bg-white shadow-nav'
    : 'bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 min-w-0">
              <img
                src={import.meta.env.BASE_URL + 'Logo_transparent_FINVESTOGRAPHERS.png'}
                alt="Finvestographers Logo"
                className="h-9 w-9 object-contain flex-shrink-0"
              />
              <img
                src={import.meta.env.BASE_URL + 'logo_text.png'}
                alt="Finvestographers"
                className="h-[18px] sm:h-[20px] md:h-[22px] object-contain flex-shrink-0"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link relative flex items-center h-full px-4 font-body font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    isActive(link.path)
                      ? 'text-[#00448B] active font-semibold'
                      : scrolled
                      ? 'text-[#0F1C2E] hover:text-[#00448B]'
                      : 'text-[#0F1C2E] hover:text-[#00448B]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                {/* Phone removed per design — keep WhatsApp and CTA aligned */}

              {/* WhatsApp */}
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-heading font-semibold text-white px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 wa-pulse"
                style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
              >
                <MessageCircle size={15} strokeWidth={2} />
                WhatsApp
              </a>

              {/* Book consultation CTA */}
              <Link to="/contact" className="btn-orange text-sm py-2.5 px-5">
                Book Consultation
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl text-[#00448B] hover:bg-[#EBF2FA] transition-colors flex-shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#DDE5F0] shadow-lg">
            <div className="container-max py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl font-body font-medium text-sm transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#EBF2FA] text-[#00448B] font-semibold'
                      : 'text-[#0F1C2E] hover:bg-[#F7F9FC] hover:text-[#00448B]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#DDE5F0] mt-2 space-y-3">
                <a
                  href="https://wa.me/919XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mx-4 py-3 rounded-xl text-white text-sm font-heading font-semibold"
                  style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
                >
                  <MessageCircle size={16} strokeWidth={2} />
                  Chat on WhatsApp
                </a>
                <Link to="/contact" className="btn-orange w-[calc(100%-2rem)] mx-4 justify-center text-sm">
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Fixed WhatsApp button — mobile only */}
      <a
        href="https://wa.me/919XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg wa-pulse"
        style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} strokeWidth={2} />
      </a>
    </>
  );
}
