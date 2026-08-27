import { useRef, useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Sharma', role: 'Senior Software Engineer', location: 'Pune', category: 'Mutual Funds', portfolioAmount: '₹28L+', rating: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', bg: '#00448B', text: "I had ₹4 lakh sitting in a savings account for almost two years, just labelled 'investment money'. I kept saying I'd get to it. In my first call, I was asked what I was actually saving for — nobody had asked me that before. Three weeks later that money was working in three different instruments based on my actual goals." },
  { name: 'Sneha Iyer', role: 'Product Manager', location: 'Bengaluru', category: 'Insurance Planning', portfolioAmount: '₹19L+', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', bg: '#FF6100', text: "My company gave me ₹50L group cover and I genuinely thought I was sorted on insurance. I was told in our first meeting that I needed at least ₹1.5 Crore. I had an instant reaction of disbelief — then I saw the math. I now have a ₹1 Crore term plan that costs me ₹780/month." },
  { name: 'Vikram Nair', role: 'Finance Analyst', location: 'Mumbai', category: 'Portfolio Review', portfolioAmount: '₹34L+', rating: 5, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', bg: '#00448B', text: "I was in 9 different mutual funds when I came in for my first review. I genuinely thought diversification meant more funds. I was shown that 6 of those 9 were holding largely the same stocks. I now hold 4 funds. My portfolio is simpler, and the returns are actually better." },
  { name: 'Ajay Mehta', role: 'Textile Business Owner', location: 'Surat', category: 'Wealth Planning', portfolioAmount: '₹55L+', rating: 5, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=400&q=80', bg: '#FF6100', text: "As a business owner I always reinvested everything back into the business. I had no personal financial plan. My first portfolio review showed me that my entire net worth was tied to one business in one sector. We separated personal wealth from business cash flow over six months." },
  { name: 'Ananya Krishnan', role: 'HR Manager', location: 'Chennai', category: 'SIP Planning', portfolioAmount: '₹14L+', rating: 5, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', bg: '#00448B', text: "I was 29 and had never invested a single rupee. The first conversation was just about my life goals, not funds or NAVs. By the end I had started a ₹8,000/month SIP and understood exactly why that specific fund was chosen for me. It did not feel like a sales meeting." },
  { name: 'Kartik Joshi', role: 'Marketing Executive', location: 'Pune', category: 'Retirement', portfolioAmount: '₹6L+', rating: 5, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', bg: '#FF6100', text: "I was 24 and making ₹35,000/month. I thought I needed to earn more before I could invest. I was told the single best thing I could do was start ₹3,000/month now rather than ₹10,000/month at 30. I did the maths on the calculator on the website and it made me slightly sick that I had been waiting." },
  { name: 'Priya Desai', role: 'Restaurant Chain Owner', location: 'Ahmedabad', category: 'Tax Planning', portfolioAmount: '₹41L+', rating: 5, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80', bg: '#00448B', text: "I had been sold a ULIP five years ago and kept paying premiums thinking I was investing. When I finally calculated my actual returns versus what a simple term + SIP combination would have given me — the difference was over ₹9 lakh." },
  { name: 'Riya Kapoor', role: 'Content Creator & Freelancer', location: 'Mumbai', category: 'Flexible SIP', portfolioAmount: '₹8L+', rating: 5, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', bg: '#FF6100', text: "My income is irregular — some months great, some slow. I thought SIPs were not for people like me because they are fixed. I learned about flexible SIP options and now I invest a base amount every month and top up in good months." },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── sync activeIndex when user scrolls (native or touch) ── */
  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.firstElementChild as HTMLElement)?.offsetWidth ?? 0;
    const gap = 20;
    const idx = Math.round(track.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, testimonials.length - 1));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', syncIndex, { passive: true });
    return () => track.removeEventListener('scroll', syncIndex);
  }, [syncIndex]);

  /* ── scroll to a specific card index ── */
  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.firstElementChild as HTMLElement)?.offsetWidth ?? 0;
    const gap = 20;
    track.scrollTo({ left: idx * (cardWidth + gap), behavior: 'smooth' });
    setActiveIndex(idx);
  }, []);

  /* ── mouse drag support ── */
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false });

  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { dragging: true, startX: e.pageX - track.offsetLeft, scrollLeft: track.scrollLeft, moved: false };
    track.style.scrollSnapType = 'none';
    track.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.2;
    if (Math.abs(walk) > 4) dragState.current.moved = true;
    track.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onMouseUp = () => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.dragging = false;
    track.style.cursor = 'grab';
    /* re-enable snap after drag ends */
    requestAnimationFrame(() => {
      track.style.scrollSnapType = 'x mandatory';
      syncIndex();
    });
  };

  return (
    <section className="section-pad bg-[#F7F9FC]">
      {/* scoped styles — scrollbar hide + snap + grab cursor */}
      <style>{`
        .testi-track {
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }
        .testi-track:active { cursor: grabbing; }
        .testi-track::-webkit-scrollbar { display: none; }
        .testi-track { -ms-overflow-style: none; scrollbar-width: none; }
        .testi-card {
          scroll-snap-align: start;
          /* desktop: 2 full + 0.45 peek */
          flex: 0 0 calc((100% - 40px) / 2.45);
        }
        @media (max-width: 1023px) {
          /* tablet: 1 full + 0.45 peek */
          .testi-card { flex: 0 0 calc((100% - 20px) / 1.45); }
        }
        @media (max-width: 767px) {
          /* mobile: 1 full + 0.25 peek */
          .testi-card { flex: 0 0 calc(100% / 1.25); }
        }
        .testi-card-dim {
          opacity: 0.55;
          transform: scale(0.97);
          transition: opacity 400ms ease, transform 400ms ease;
          pointer-events: auto;
        }
        .testi-card-dim:hover, .testi-card-dim:focus-visible {
          opacity: 0.75;
          transform: scale(0.98);
        }
        .testi-card-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 400ms ease, transform 400ms ease;
        }
      `}</style>

      <div className="container-max">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-3">Client Reviews</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B]">
            Real People. Real Results.
          </h2>
        </div>

        {/* Scrollable track — padded so box-shadows are not clipped */}
        <div
          ref={trackRef}
          className="testi-track flex gap-5 overflow-x-auto py-4 -my-4 select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          role="list"
          aria-label="Client testimonials"
        >
          {testimonials.map((t, i) => {
            const isActive = i === activeIndex;
            /* cards beyond active+1 are also dimmed; clicked card snaps into view */
            const isDim = i !== activeIndex;
            return (
              <div
                key={t.name}
                role="listitem"
                tabIndex={0}
                aria-label={`Testimonial by ${t.name}`}
                className={`testi-card card flex flex-col justify-between ${isDim ? 'testi-card-dim' : 'testi-card-active'}`}
                onClick={() => {
                  /* only scroll on click, not at end of drag */
                  if (!dragState.current.moved) scrollTo(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollTo(i); }
                  if (e.key === 'ArrowRight') scrollTo(Math.min(i + 1, testimonials.length - 1));
                  if (e.key === 'ArrowLeft') scrollTo(Math.max(i - 1, 0));
                }}
                style={{ outline: isActive ? '2px solid #00448B' : 'none', outlineOffset: '3px' }}
              >
                <div>
                  <Quote size={26} style={{ color: '#EBF2FA' }} className="mb-4" />
                  <p className="text-[#0F1C2E] font-accent italic text-[15px] leading-relaxed mb-6 opacity-80">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-start gap-3 pt-4 border-t border-[#DDE5F0]">
                  <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-sm text-[#0F1C2E] truncate">{t.name}</p>
                    <p className="text-xs text-[#5C7089] font-body">{t.role}, {t.location}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00448B]">{t.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-heading font-semibold" style={{ color: '#16A34A' }}>{t.portfolioAmount}</p>
                    <p className="text-[10px] text-[#9BAEC8] font-body">{t.rating}/5 rating</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot pagination */}
        <div className="flex justify-center gap-2 mt-8" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className="h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00448B]"
              style={{
                width: i === activeIndex ? '32px' : '8px',
                background: i === activeIndex ? '#00448B' : '#C8DCEF',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
