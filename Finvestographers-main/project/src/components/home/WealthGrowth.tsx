import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

function formatCr(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString('en-IN')}`;
}
function calcSIP(monthly: number, ratePercent: number, years: number) {
  const r = ratePercent / 100 / 12;
  const n = years * 12;
  return monthly * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}
const durations = [10, 15, 20, 25, 30];

export default function WealthGrowth() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);

  const chartData = useMemo(() =>
    durations.map((years) => {
      const wealth = calcSIP(monthly, rate, years);
      const invested = monthly * 12 * years;
      return { years: `${years}Y`, Invested: invested, Wealth: wealth, Returns: wealth - invested };
    }), [monthly, rate]);

  const finalRow = chartData[chartData.length - 1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-[#DDE5F0] rounded-xl shadow-lg p-4 text-sm">
          <p className="font-heading font-bold text-[#00448B] mb-2">{label} of investing</p>
          {payload.map((p: any) => (
            <div key={p.name} className="flex justify-between gap-6">
              <span className="text-[#5C7089]">{p.name}</span>
              <span className="font-semibold text-[#00448B]">{formatCr(p.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="section-pad bg-[#F7F9FC]">
      <div className="container-max">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Wealth Compounding</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            See The Power of Long-Term Investing
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls */}
          <div className="bg-white rounded-2xl border border-[#DDE5F0] p-6 space-y-6" style={{ boxShadow: '0 4px 20px rgba(0,68,139,0.06)' }}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">Monthly SIP</label>
                <span className="text-xl font-heading font-extrabold text-[#00448B]">₹{monthly.toLocaleString('en-IN')}</span>
              </div>
              <input type="range" min={1000} max={100000} step={1000} value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: '#00448B' }} />
              <div className="flex justify-between text-xs text-[#9BAEC8] mt-1 font-body">
                <span>₹1,000</span><span>₹1,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-heading font-semibold text-[#0F1C2E]">Expected Return</label>
                <span className="text-xl font-heading font-extrabold text-[#FF6100]">{rate}%</span>
              </div>
              <input type="range" min={6} max={18} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 rounded-full cursor-pointer" style={{ accentColor: '#FF6100' }} />
              <div className="flex justify-between text-xs text-[#9BAEC8] mt-1 font-body">
                <span>6%</span><span>18%</span>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
