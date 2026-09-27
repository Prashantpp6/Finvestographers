import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { openConsultationModal } from '../../lib/enquiry';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';

const portfolioData = [
  { month: 'Jan', value: 8.2 },
  { month: 'Mar', value: 9.4 },
  { month: 'May', value: 8.8 },
  { month: 'Jul', value: 11.6 },
  { month: 'Sep', value: 13.2 },
  { month: 'Nov', value: 15.8 },
  { month: 'Dec', value: 18.6 },
];

const allocationData = [
  { name: 'Equity', value: 65, color: '#00448B' },
  { name: 'Debt', value: 20, color: '#FF6100' },
  { name: 'Gold', value: 10, color: '#F59E0B' },
  { name: 'Cash', value: 5, color: '#CBD5E1' },
];

const trustBadges = [
  'Goal-Based Investing',
  'Long-Term Wealth Creation',
  'Personalized Advisory',
  'Transparent Approach',
];

export default function Hero() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00448B" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <svg className="absolute bottom-0 right-0 w-[75%] h-[85%] opacity-[0.04]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00448B"/>
              <stop offset="100%" stopColor="#FF6100"/>
            </linearGradient>
          </defs>
          <path d="M0,500 C100,480 150,420 200,350 C250,280 280,200 350,150 C420,100 500,80 600,50 C700,20 760,10 800,5"
            fill="none" stroke="url(#bgGradient)" strokeWidth="6" strokeLinecap="round"/>
          <path d="M0,550 C100,530 150,470 200,400 C250,330 280,250 350,200 C420,150 500,130 600,100 C700,70 760,60 800,55 L800,600 L0,600Z"
            fill="url(#bgGradient)" opacity="0.15"/>
        </svg>

        <div
          className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #00448B 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-20 right-[30%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #FF6100 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      <div className="container-max relative z-10 py-10 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
          {/* LEFT — Content */}
          <div className={`space-y-8 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border px-4 py-2 text-sm font-heading font-semibold"
              style={{ borderColor: '#C8DCEF', background: '#EBF2FA', color: '#00448B' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FF6100' }} />
              AMFI Registered Mutual Fund Distributor
            </div>

            <div>
              <h1 className="font-heading font-extrabold leading-[1.08] tracking-tight mb-5 w-full max-w-none" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                <span className="block text-[#0F1C2E] lg:whitespace-nowrap">You May Be Closer To</span>
                <span className="block text-[#00448B]">Financial Freedom</span>
                <span className="block text-[#0F1C2E] relative">
                  Than You <span className="text-[#FF6100]">Think.</span>
                </span>
              </h1>
              <p className="text-lg text-[#5C7089] font-body leading-relaxed max-w-2xl">
                Whether you're starting your first SIP or optimizing an existing portfolio, we help turn financial goals into a practical investment plan.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => openConsultationModal({ interest: 'Financial Planning', source: 'hero' })} className="btn-orange w-full text-base sm:w-auto px-8 py-4">
                Book Free Consultation
                <ArrowRight size={18} />
              </button>
              <Link to="/start-here" className="btn-outline w-full text-base sm:w-auto px-7 py-4">
                Start Here
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#EBF2FA' }}>
                    <CheckCircle size={12} strokeWidth={2.5} style={{ color: '#00448B' }} />
                  </div>
                  <span className="text-sm font-body text-[#0F1C2E]">{badge}</span>
                </div>
              ))}
            </div>

            {/* statistics removed as per spec (keeps layout compact) */}
          </div>

          {/* RIGHT — Premium dashboard */}
          <div className={`transition-all duration-700 delay-200 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Top row: Track card + CAGR badge — no overlap */}
            <div className="hidden md:flex items-stretch gap-4 mb-4">
              <div className="glass-card p-4 flex items-center gap-3 animate-float flex-1">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F0FDF4' }}>
                  <CheckCircle size={18} strokeWidth={2} style={{ color: '#16A34A' }} />
                </div>
                <div>
                  <p className="text-xs font-heading font-semibold text-[#00448B]">Am I On The Right Track?</p>
                  <p className="text-[10px] text-[#5C7089] font-body">Your wealth score: <strong className="text-[#16A34A]">87/100</strong></p>
                </div>
              </div>
              <div className="glass-dark px-4 py-3 rounded-xl flex items-center gap-2 animate-float-delayed">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,97,0,0.15)' }}>
                  <TrendingUp size={11} strokeWidth={2} style={{ color: '#FF6100' }} />
                </div>
                <span className="text-xs font-body text-blue-200">CAGR</span>
                <span className="text-lg font-heading font-extrabold text-white ml-1">12.4<span style={{ color: '#FF6100' }}>%</span></span>
                <span className="text-[10px] text-blue-300 font-body">3yr avg</span>
              </div>
            </div>

            {/* Main dashboard card */}
            <div className="bg-white rounded-3xl border border-[#DDE5F0] p-6"
              style={{ boxShadow: '0 20px 60px rgba(0,68,139,0.12), 0 4px 20px rgba(0,68,139,0.06)' }}>

              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs font-body uppercase tracking-wider text-[#5C7089] mb-1">Portfolio Value</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-heading font-extrabold text-[#00448B]">₹18.6L</p>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-heading font-bold"
                      style={{ background: '#F0FDF4', color: '#16A34A' }}>
                      <TrendingUp size={11} strokeWidth={2.5} />
                      +18.6%
                    </div>
                  </div>
                  <p className="text-xs text-[#9BAEC8] font-body mt-0.5">Year-to-date growth · 2025</p>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    {allocationData.map((item) => (
                      <div key={item.name} className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                        <span className="text-[10px] text-[#5C7089] font-body">{item.name} <strong className="text-[#0F1C2E]">{item.value}%</strong></span>
                      </div>
                    ))}
                  </div>
                  <PieChart width={72} height={72}>
                    <Pie
                      data={allocationData}
                      cx={32}
                      cy={32}
                      innerRadius={20}
                      outerRadius={34}
                      dataKey="value"
                      strokeWidth={0}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {allocationData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>

              <div className="h-44 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00448B" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#00448B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,68,139,0.12)', fontSize: '12px' }}
                      formatter={(v: any) => [`₹${v}L`, 'Portfolio']}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00448B"
                      strokeWidth={2.5}
                      fill="url(#heroGrad)"
                      dot={(props: any) => {
                        const { cx, cy, index } = props;
                        if (index === portfolioData.length - 1) {
                          return (
                            <g key={`dot-${index}`}>
                              <circle cx={cx} cy={cy} r={6} fill="#FF6100" stroke="white" strokeWidth={2} />
                            </g>
                          );
                        }
                        return <g key={`dot-${index}`} />;
                      }}
                      activeDot={{ r: 5, fill: '#FF6100', stroke: 'white', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Goal progress + Wealth Score — side by side, no overlap */}
            <div className="mt-4 grid md:grid-cols-[1fr_auto] gap-4">
              <div className="bg-white rounded-2xl border border-[#DDE5F0] p-5"
                style={{ boxShadow: '0 4px 20px rgba(0,68,139,0.08)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #16A34A, #15803D)' }}>
                      <Target size={15} strokeWidth={2} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-[#0F1C2E]">Retirement Goal</p>
                      <p className="text-[10px] text-[#9BAEC8] font-body">Target: ₹2 Crore by 2045</p>
                    </div>
                  </div>
                  <span className="text-xs font-heading font-bold px-2.5 py-1 rounded-full"
                    style={{ background: '#F0FDF4', color: '#16A34A' }}>
                    On Track
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#9BAEC8] font-body">
                    <span>Progress</span>
                    <span className="font-semibold text-[#16A34A]">34%</span>
                  </div>
                  <div className="h-2.5 bg-[#DCFCE7] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: '34%', background: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#9BAEC8] font-body">
                    <span>₹68L achieved</span>
                    <span>18 years remaining</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 hidden md:flex flex-col items-center justify-center animate-float-slow"
                style={{ minWidth: '130px' }}>
                <p className="text-[10px] font-body text-[#5C7089] mb-1.5 uppercase tracking-wide">Wealth Score</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-heading font-extrabold text-[#00448B]">87</span>
                  <span className="text-sm text-[#9BAEC8] font-body">/100</span>
                </div>
                <div className="mt-1.5 w-full h-1.5 bg-[#EBF2FA] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '87%', background: 'linear-gradient(90deg, #16A34A, #22C55E)' }} />
                </div>
                <p className="text-[10px] font-heading font-semibold mt-1" style={{ color: '#16A34A' }}>Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
