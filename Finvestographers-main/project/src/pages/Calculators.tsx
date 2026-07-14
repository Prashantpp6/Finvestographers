import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { ArrowRight, AlertTriangle, TrendingDown, TrendingUp, Lock, Target, Landmark, Sparkles } from 'lucide-react';

function formatIndianCurrency(v: number) {
  const abs = Math.abs(v);
  if (abs >= 10000000) {
    const crores = abs / 10000000;
    const formatted = crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1).replace(/\.0$/, '');
    return `₹${formatted} Cr`;
  }
  if (abs >= 100000) {
    const lakhs = abs / 100000;
    const formatted = lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1).replace(/\.0$/, '');
    return `₹${formatted}L`;
  }
  return `₹${Math.round(abs).toLocaleString('en-IN')}`;
}

function formatPercent(v: number) {
  if (!Number.isFinite(v)) return '0%';
  return `${Number(v.toFixed(2)).toString()}%`;
}

function formatYears(v: number) {
  return `${Math.round(v)} yrs`;
}

function formatRangeValue(v: number, inputType: 'currency' | 'percentage' | 'years' | 'number') {
  if (inputType === 'currency') return formatIndianCurrency(v);
  if (inputType === 'percentage') return `${v}%`;
  if (inputType === 'years') return `${Math.round(v)} yrs`;
  return `${v}`;
}

function formatCr(v: number) {
  if (!Number.isFinite(v)) return '₹0';
  return formatIndianCurrency(v);
}

function calcSIP(m: number, r: number, y: number) {
  const rM = r / 100 / 12;
  const n = y * 12;
  return m * (((Math.pow(1 + rM, n) - 1) / rM) * (1 + rM));
}
function calcLumpSum(p: number, r: number, y: number) { return p * Math.pow(1 + r / 100, y); }

function sanitizeInputValue(raw: string, inputType: 'currency' | 'percentage' | 'years' | 'number') {
  if (inputType === 'years' || inputType === 'currency') {
    return raw.replace(/[^0-9]/g, '');
  }
  return raw.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function parseInputValue(raw: string, inputType: 'currency' | 'percentage' | 'years' | 'number') {
  const cleaned = sanitizeInputValue(raw, inputType);
  if (cleaned === '') return null;
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return null;
  if (inputType === 'years' || inputType === 'currency') return Math.trunc(parsed);
  return parsed;
}

const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,68,139,0.12)', fontSize: '12px' };

interface SyncedInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  setter: (v: number) => void;
  accent: string;
  inputType: 'currency' | 'percentage' | 'years' | 'number';
  inputMin?: number;
  inputMax?: number;
  helperText?: string;
  errorText?: string;
}

function SyncedNumberInput({
  label,
  value,
  min,
  max,
  step,
  setter,
  accent,
  inputType,
  inputMin,
  inputMax,
  helperText,
  errorText
}: SyncedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const effectiveMin = inputMin !== undefined ? inputMin : min;
  const effectiveMax = inputMax !== undefined ? inputMax : max;

  const formatDisplay = (v: number): string => {
    if (inputType === 'currency') return formatIndianCurrency(v);
    if (inputType === 'percentage') return formatPercent(v);
    if (inputType === 'years') return formatYears(v);
    return v.toString();
  };

  const formatEdit = (v: number): string => {
    if (inputType === 'currency' || inputType === 'years') return Math.trunc(v).toString();
    return v.toString();
  };

  useEffect(() => {
    if (!isFocused) {
      setInputVal(formatDisplay(value));
    }
  }, [value, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const cleaned = sanitizeInputValue(text, inputType);
    setInputVal(cleaned);

    if (cleaned === '') return;

    const parsed = parseInputValue(cleaned, inputType);
    if (parsed === null) return;
    if (parsed < effectiveMin || parsed > effectiveMax) return;

    setter(parsed);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (inputVal === '') {
      setInputVal(formatEdit(value));
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    const parsed = parseInputValue(inputVal, inputType);
    if (parsed === null) {
      if (inputVal === '') {
        setInputVal(formatDisplay(value));
      }
      return;
    }
    if (parsed < effectiveMin || parsed > effectiveMax) {
      return;
    }
    setter(parsed);
    setInputVal(formatDisplay(parsed));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    setter(newVal);
    setInputVal(formatEdit(newVal));
  };

  const validationMessage = errorText || (() => {
    if (inputVal === '') return '';
    const parsed = parseInputValue(inputVal, inputType);
    if (parsed === null) return 'Please enter a valid number.';
    if (parsed < effectiveMin || parsed > effectiveMax) {
      return `Please enter a value between ${formatRangeValue(effectiveMin, inputType)} and ${formatRangeValue(effectiveMax, inputType)}.`;
    }
    return '';
  })();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-heading font-semibold text-[#0F1C2E]">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-heading font-bold" style={{ color: accent }}>
            {formatDisplay(value)}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.max(min, Math.min(max, value))}
        onChange={handleSliderChange}
        className="w-full h-2 rounded-full cursor-pointer mb-2"
        style={{ accentColor: accent }}
      />
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg focus:outline-none focus:border-[#00448B] font-heading"
        placeholder={`Enter ${inputType === 'currency' ? 'amount' : inputType === 'percentage' ? 'percentage' : 'value'}`}
      />
      {helperText && <p className="text-[11px] text-[#9BAEC8] font-body mt-2">{helperText}</p>}
      {validationMessage && <p className="text-[11px] text-[#DC2626] font-body mt-1">{validationMessage}</p>}
    </div>
  );
}

function OnTrackCalc() {
  const [age, setAge] = useState(30);
  const [sip, setSip] = useState(10000);
  const [targetCorpus, setTargetCorpus] = useState(200000000);
  const [rateP, setRateP] = useState(25);
  const [gated, setGated] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [unlocked, setUnlocked] = useState(false);

  const retireAge = 60;
  const years = retireAge - age;
  const projected = useMemo(() => calcSIP(sip, rateP, years), [sip, rateP, years]);
  const target = targetCorpus;
  const onTrack = projected >= target;
  const canRender = Number.isFinite(projected) && Number.isFinite(target) && years > 0 && age >= 18 && age <= 65 && sip >= 0 && sip <= 500000 && target >= 0 && target <= 250000000 && rateP >= 0 && rateP <= 25;

  const chartData = useMemo(() => {
    const pts = [];
    if (!canRender) return pts;
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 10))) {
      pts.push({ year: `Age ${age + y}`, projected: Math.round(calcSIP(sip, rateP, y)), target: Math.round(target * (y / years)) });
    }
    return pts;
  }, [sip, rateP, years, target, age, canRender]);

  const resetCalculator = () => {
    setAge(30);
    setSip(10000);
    setTargetCorpus(200000000);
    setRateP(25);
  };

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#EBF2FA' }}>
            <TrendingUp size={22} strokeWidth={1.5} style={{ color: '#00448B' }} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#00448B]">"Am I On Track?"</h2>
            <p className="text-sm text-[#5C7089] font-body">Calculate if your current SIP will hit your retirement target</p>
          </div>
        </div>
        <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SyncedNumberInput label="Current Age" value={age} min={18} max={65} step={1} inputType="years" setter={setAge} accent="#00448B" inputMin={18} inputMax={65} helperText="Allowed range: 18–65" />
          <SyncedNumberInput label="Monthly SIP" value={sip} min={0} max={500000} step={1000} inputType="currency" setter={setSip} accent="#00448B" inputMin={0} inputMax={500000} helperText="Allowed range: ₹0–₹5,00,000" />
          <SyncedNumberInput label="Target Corpus" value={targetCorpus} min={0} max={250000000} step={1000000} inputType="currency" setter={setTargetCorpus} accent="#FF6100" inputMin={0} inputMax={250000000} helperText="Allowed range: ₹0–₹25 Cr" />
          <SyncedNumberInput label="Expected Return" value={rateP} min={0} max={25} step={0.5} inputType="percentage" setter={setRateP} accent="#FF6100" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />

          <div className={`rounded-2xl p-4 border ${onTrack ? 'border-green-200' : 'border-red-200'}`}
            style={{ background: onTrack ? '#F0FDF4' : '#FEF2F2' }}>
            <p className="text-sm font-heading font-semibold mb-1" style={{ color: onTrack ? '#16A34A' : '#DC2626' }}>
              {onTrack ? 'You are on track!' : 'Gap identified'}
            </p>
            <p className="text-xs font-body text-[#5C7089]">
              Projected corpus: <strong className="text-[#0F1C2E]">{formatCr(projected)}</strong>
              {!onTrack && <><br />Shortfall: <strong style={{ color: '#DC2626' }}>{formatCr(Math.abs(target - projected))}</strong></>}
            </p>
          </div>
        </div>

        <div>
          {!gated ? (
            <div>
              <div className="h-48 mb-4">
                {canRender && chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                      <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="projected" name="Your SIP" stroke="#00448B" strokeWidth={2} fill="url(#pg1)" />
                      <Area type="monotone" dataKey="target" name="Your Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
                )}
              </div>
              <button type="button" onClick={() => setGated(true)} className="btn-primary w-full justify-center py-3 text-sm">
                <Lock size={14} /> Get Full Detailed Report
              </button>
            </div>
          ) : !unlocked ? (
            <form onSubmit={(e) => { e.preventDefault(); setUnlocked(true); }} className="space-y-4">
              <p className="font-heading font-semibold text-[#00448B] text-sm mb-2">Your free detailed report is ready:</p>
              <input type="text" required placeholder="Your Name" className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="tel" required placeholder="Phone Number" className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <button type="submit" className="btn-orange w-full justify-center">Get Full Report <ArrowRight size={14} /></button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="h-48">
                {canRender && chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                      <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                      <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="projected" name="Your SIP" stroke="#00448B" strokeWidth={2.5} fill="url(#pg2)" />
                      <Area type="monotone" dataKey="target" name="Your Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: '#EBF2FA' }}>
                  <p className="text-xs text-[#5C7089] font-body mb-1">Projected at {retireAge}</p>
                  <p className="font-heading font-bold text-[#00448B]">{formatCr(projected)}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: onTrack ? '#F0FDF4' : '#FEF2F2' }}>
                  <p className="text-xs text-[#5C7089] font-body mb-1">{onTrack ? 'Surplus' : 'Shortfall'}</p>
                  <p className="font-heading font-bold" style={{ color: onTrack ? '#16A34A' : '#DC2626' }}>{formatCr(Math.abs(target - projected))}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FDCalc() {
  const [fdRate, setFdRate] = useState(6.5);
  const [inflation, setInflation] = useState(15.0);
  const [taxSlab, setTaxSlab] = useState(30);
  const [principal, setPrincipal] = useState(3870000);

  const taxAdjusted = fdRate * (1 - taxSlab / 100);
  const realReturn = taxAdjusted - inflation;
  const isNeg = realReturn < 0;
  const canRender = Number.isFinite(realReturn) && Number.isFinite(principal) && principal >= 0 && fdRate >= 0 && fdRate <= 10 && inflation >= 0 && inflation <= 25;

  const compData = [
    { name: 'FD Rate', value: fdRate, fill: '#00448B' },
    { name: 'After Tax', value: parseFloat(taxAdjusted.toFixed(2)), fill: '#FF6100' },
    { name: 'Real Return', value: Math.max(0.01, parseFloat(Math.max(0, realReturn).toFixed(2))), fill: isNeg ? '#DC2626' : '#16A34A' },
  ];

  const after10FD = principal * Math.pow(1 + fdRate / 100 * (1 - taxSlab / 100), 10);
  const after10SIP = calcSIP(principal / 120, 12, 10);
  const showInflationWarning = inflation > fdRate;

  const resetCalculator = () => {
    setFdRate(6.5);
    setInflation(15);
    setTaxSlab(30);
    setPrincipal(3870000);
  };

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FEF2F2' }}>
            <TrendingDown size={22} strokeWidth={1.5} style={{ color: '#DC2626' }} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#00448B]">What Is My FD Really Earning?</h2>
            <p className="text-sm text-[#5C7089] font-body">FD rate minus tax minus inflation = actual real return (usually negative)</p>
          </div>
        </div>
        <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SyncedNumberInput label="FD Interest Rate" value={fdRate} min={0} max={10} step={0.25} inputType="percentage" setter={setFdRate} accent="#00448B" inputMin={0} inputMax={10} helperText="Allowed range: 0%–10%" />
          <SyncedNumberInput label="Inflation Rate" value={inflation} min={0} max={25} step={0.25} inputType="percentage" setter={setInflation} accent="#DC2626" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />

          <div>
            <label className="block text-sm font-heading font-semibold text-[#0F1C2E] mb-2">Income Tax Slab</label>
            <div className="flex gap-2 flex-wrap">
              {[0, 10, 20, 30].map((s) => (
                <button key={s} onClick={() => setTaxSlab(s)}
                  className="flex-1 min-w-12 py-2 rounded-lg text-sm font-heading font-semibold transition-colors"
                  style={taxSlab === s ? { background: '#00448B', color: 'white' } : { background: '#EBF2FA', color: '#00448B' }}>
                  {s}%
                </button>
              ))}
            </div>
          </div>

          <SyncedNumberInput label="FD Amount" value={principal} min={0} max={50000000} step={10000} inputType="currency" setter={setPrincipal} accent="#00448B" inputMin={0} inputMax={50000000} helperText="Allowed range: ₹0–₹5 Cr" />

          <div className={`rounded-2xl p-5 border ${isNeg ? 'border-red-200' : 'border-green-200'}`}
            style={{ background: isNeg ? '#FEF2F2' : '#F0FDF4' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={15} style={{ color: isNeg ? '#DC2626' : '#16A34A' }} />
              <span className="text-sm font-heading font-semibold" style={{ color: isNeg ? '#DC2626' : '#16A34A' }}>Your Real Return</span>
            </div>
            <p className="text-3xl font-heading font-extrabold" style={{ color: isNeg ? '#DC2626' : '#16A34A' }}>
              {realReturn.toFixed(2)}%
            </p>
            {isNeg && <p className="text-xs text-[#5C7089] font-body mt-2">Your money is losing purchasing power every year.</p>}
            {showInflationWarning && <p className="text-xs text-[#DC2626] font-body mt-2">Your FD may be losing purchasing power due to inflation.</p>}
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-44">
            {canRender ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" name="Rate %" radius={[6, 6, 0, 0]}>
                    {compData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
            )}
          </div>
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-[#00448B] text-sm">{formatCr(principal)} after 10 years:</h4>
            {[
              { label: 'In FD (after tax)', value: after10FD, color: '#0F1C2E' },
              { label: 'Real Value (inflation-adjusted)', value: principal * Math.pow(1 + (taxAdjusted - inflation) / 100, 10), color: isNeg ? '#DC2626' : '#16A34A' },
              { label: 'Equivalent SIP corpus', value: after10SIP, color: '#16A34A' },
            ].map((r) => (
              <div key={r.label} className="flex justify-between items-center py-2 border-b border-[#DDE5F0] last:border-0">
                <span className="text-sm font-body text-[#5C7089]">{r.label}</span>
                <span className="font-heading font-bold text-sm" style={{ color: r.color }}>{formatCr(r.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SIPvsLumpSum() {
  const [monthly, setMonthly] = useState(10000);
  const [lump, setLump] = useState(120000);
  const [rate, setRate] = useState(25);
  const [years, setYears] = useState(15);

  const sipCorpus = useMemo(() => calcSIP(monthly, rate, years), [monthly, rate, years]);
  const sipInvested = monthly * 12 * years;
  const lsCorpus = useMemo(() => calcLumpSum(lump, rate, years), [lump, rate, years]);
  const sipWins = sipCorpus >= lsCorpus;
  const canRender = Number.isFinite(sipCorpus) && Number.isFinite(lsCorpus) && years > 0 && monthly >= 0 && monthly <= 100000 && lump >= 0 && lump <= 5000000 && rate >= 0 && rate <= 25;

  const chartData = useMemo(() => {
    const pts = [];
    if (!canRender) return pts;
    for (let y = 1; y <= years; y++) {
      pts.push({ year: `Y${y}`, SIP: Math.round(calcSIP(monthly, rate, y)), 'Lump Sum': Math.round(calcLumpSum(lump, rate, y)) });
    }
    return pts;
  }, [monthly, rate, years, lump, canRender]);

  const pieData = [
    { name: 'Returns', value: Math.round(Math.max(0, sipCorpus - sipInvested)) },
    { name: 'Invested', value: sipInvested },
  ];

  const resetCalculator = () => {
    setMonthly(10000);
    setLump(120000);
    setRate(25);
    setYears(15);
  };

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FFF3EB' }}>
            <TrendingUp size={22} strokeWidth={1.5} style={{ color: '#FF6100' }} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#00448B]">SIP vs Lump Sum Comparator</h2>
            <p className="text-sm text-[#5C7089] font-body">Play with numbers to see which approach works better</p>
          </div>
        </div>
        <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SyncedNumberInput label="Monthly SIP" value={monthly} min={0} max={100000} step={1000} inputType="currency" setter={setMonthly} accent="#00448B" inputMin={0} inputMax={100000} helperText="Allowed range: ₹0–₹1,00,000" />
          <SyncedNumberInput label="Lump Sum Amount" value={lump} min={0} max={5000000} step={10000} inputType="currency" setter={setLump} accent="#FF6100" inputMin={0} inputMax={5000000} helperText="Allowed range: ₹0–₹50,00,000" />
          <SyncedNumberInput label="Annual Return" value={rate} min={0} max={25} step={0.5} inputType="percentage" setter={setRate} accent="#00448B" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />
          <SyncedNumberInput label="Duration" value={years} min={1} max={50} step={1} inputType="years" setter={setYears} accent="#FF6100" inputMin={1} inputMax={50} helperText="Allowed range: 1–50 years" />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'SIP', corpus: sipCorpus, invested: sipInvested, wins: sipWins },
              { label: 'Lump Sum', corpus: lsCorpus, invested: lump, wins: !sipWins },
            ].map((r) => (
              <div key={r.label} className="rounded-2xl p-4 border transition-all"
                style={r.wins
                  ? { background: 'linear-gradient(135deg, #00448B, #002A62)', borderColor: 'transparent', color: 'white' }
                  : { background: 'white', borderColor: '#DDE5F0' }}>
                <p className="text-xs font-heading font-semibold uppercase tracking-wide mb-1"
                  style={{ color: r.wins ? '#FF6100' : '#9BAEC8' }}>{r.label} {r.wins ? '\uD83C\uDFC6' : ''}</p>
                <p className="text-lg font-heading font-extrabold" style={{ color: r.wins ? 'white' : '#00448B' }}>{formatCr(r.corpus)}</p>
                <p className="text-xs mt-1 font-body" style={{ color: r.wins ? 'rgba(164,196,228,0.8)' : '#9BAEC8' }}>
                  Invested: {formatCr(r.invested)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-52">
            {canRender && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="lg3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6100" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#FF6100" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                  <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="SIP" stroke="#00448B" strokeWidth={2.5} fill="url(#sg3)" />
                  <Area type="monotone" dataKey="Lump Sum" stroke="#FF6100" strokeWidth={2} fill="url(#lg3)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
            )}
          </div>

          <div className="flex items-center gap-5">
            <PieChart width={90} height={90}>
              <Pie data={pieData} cx={40} cy={40} innerRadius={24} outerRadius={42} dataKey="value" strokeWidth={0}>
                <Cell fill="#00448B" />
                <Cell fill="#FF6100" />
              </Pie>
            </PieChart>
            <div className="space-y-2 flex-1">
              {[{ label: 'Returns', color: '#00448B', value: sipCorpus - sipInvested }, { label: 'Invested', color: '#FF6100', value: sipInvested }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[#5C7089] font-body">{item.label}: </span>
                  <span className="font-heading font-semibold text-[#00448B]">{formatCr(item.value)}</span>
                </div>
              ))}
              <p className="text-xs text-[#9BAEC8] font-body">
                Returns: {((sipCorpus - sipInvested) / sipInvested * 100).toFixed(0)}% of invested
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [existingCorpus, setExistingCorpus] = useState(500000);
  const [retireAge, setRetireAge] = useState(60);
  const [inflation, setInflation] = useState(15);
  const [returnRate, setReturnRate] = useState(25);

  const yearsToRetire = retireAge - currentAge;
  const futureMonthly = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetire);
  const annualAtRetire = futureMonthly * 12;
  const corpusNeeded = annualAtRetire * 25;
  const existingFuture = existingCorpus * Math.pow(1 + returnRate / 100, yearsToRetire);
  const gap = corpusNeeded - existingFuture;
  const monthlySIPNeeded = gap > 0 ? (() => {
    const rM = returnRate / 100 / 12;
    const n = yearsToRetire * 12;
    if (rM === 0) return gap / n;
    return gap / (((Math.pow(1 + rM, n) - 1) / rM) * (1 + rM));
  })() : 0;
  const canRender = Number.isFinite(corpusNeeded) && Number.isFinite(existingFuture) && yearsToRetire > 0 && currentAge >= 18 && currentAge <= 80 && monthlyExp >= 0 && monthlyExp <= 1000000 && existingCorpus >= 0 && existingCorpus <= 10000000 && retireAge >= 40 && retireAge <= 65 && inflation >= 0 && inflation <= 20 && returnRate >= 0 && returnRate <= 25;

  const chartData = useMemo(() => {
    const pts = [];
    if (!canRender) return pts;
    for (let y = 0; y <= yearsToRetire; y += Math.max(1, Math.floor(yearsToRetire / 8))) {
      const projected = existingCorpus * Math.pow(1 + returnRate / 100, y) + (monthlySIPNeeded > 0 ? calcSIP(monthlySIPNeeded, returnRate, y) : 0);
      pts.push({ year: `Age ${currentAge + y}`, corpus: Math.round(projected), target: Math.round(corpusNeeded * (y / yearsToRetire)) });
    }
    return pts;
  }, [existingCorpus, returnRate, monthlySIPNeeded, corpusNeeded, currentAge, yearsToRetire, canRender]);

  const resetCalculator = () => {
    setCurrentAge(30);
    setMonthlyExp(50000);
    setExistingCorpus(500000);
    setRetireAge(60);
    setInflation(15);
    setReturnRate(25);
  };

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#F0FDF4' }}>
            <Landmark size={22} strokeWidth={1.5} style={{ color: '#16A34A' }} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#00448B]">Retirement Corpus Calculator</h2>
            <p className="text-sm text-[#5C7089] font-body">Find out exactly how much you need to retire comfortably</p>
          </div>
        </div>
        <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SyncedNumberInput label="Current Age" value={currentAge} min={18} max={80} step={1} inputType="years" setter={setCurrentAge} accent="#00448B" inputMin={18} inputMax={80} helperText="Allowed range: 18–80" />
          <SyncedNumberInput label="Monthly Expenses" value={monthlyExp} min={0} max={1000000} step={5000} inputType="currency" setter={setMonthlyExp} accent="#FF6100" inputMin={0} inputMax={1000000} helperText="Allowed range: ₹0–₹10,00,000" />
          <SyncedNumberInput label="Existing Corpus" value={existingCorpus} min={0} max={10000000} step={50000} inputType="currency" setter={setExistingCorpus} accent="#16A34A" inputMin={0} inputMax={10000000} helperText="Allowed range: ₹0–₹1 Cr" />
          <SyncedNumberInput label="Retirement Age" value={retireAge} min={40} max={65} step={1} inputType="years" setter={setRetireAge} accent="#00448B" inputMin={40} inputMax={65} helperText="Allowed range: 40–65" errorText={retireAge <= currentAge ? 'Retirement age must be greater than current age.' : ''} />
          <SyncedNumberInput label="Inflation" value={inflation} min={0} max={20} step={0.5} inputType="percentage" setter={setInflation} accent="#DC2626" inputMin={0} inputMax={20} helperText="Allowed range: 0%–20%" />
          <SyncedNumberInput label="Expected Return" value={returnRate} min={0} max={25} step={0.5} inputType="percentage" setter={setReturnRate} accent="#16A34A" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#EBF2FA' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Corpus Needed</p>
              <p className="font-heading font-bold text-[#00448B]">{formatCr(corpusNeeded)}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Existing at Retire</p>
              <p className="font-heading font-bold text-[#16A34A]">{formatCr(existingFuture)}</p>
            </div>
            <div className={`rounded-xl p-4 col-span-2`} style={{ background: gap > 0 ? '#FEF2F2' : '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">{gap > 0 ? 'Gap to Fill' : 'Surplus'}</p>
              <p className="font-heading font-bold" style={{ color: gap > 0 ? '#DC2626' : '#16A34A' }}>{formatCr(Math.abs(gap))}</p>
            </div>
          </div>
          {gap > 0 && (
            <div className="rounded-xl p-4 border border-[#DDE5F0]" style={{ background: '#FFF8F0' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Monthly SIP needed to close the gap</p>
              <p className="text-2xl font-heading font-extrabold text-[#FF6100]">₹{Math.round(monthlySIPNeeded).toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-[#9BAEC8] font-body mt-1">for {yearsToRetire} years at {returnRate}% return</p>
            </div>
          )}
          <div className="h-40">
            {canRender && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={60} />
                  <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="corpus" name="Your Corpus" stroke="#16A34A" strokeWidth={2} fill="url(#rg1)" />
                  <Area type="monotone" dataKey="target" name="Target" stroke="#FF6100" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CostOfDelaySIPCalc() {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [returnRate, setReturnRate] = useState(25);
  const [investmentYears, setInvestmentYears] = useState(20);
  const [delayMonths, setDelayMonths] = useState(0);
  const [delayMonthsInput, setDelayMonthsInput] = useState('0');
  const [delayYearsInput, setDelayYearsInput] = useState('0');
  const [delayMonthsError, setDelayMonthsError] = useState('');
  const [delayYearsError, setDelayYearsError] = useState('');

  const delayYears = delayMonths / 12;
  const yearsImmediately = investmentYears;
  const yearsDelayed = Math.max(0, investmentYears - delayYears);

  const futureValueImmediate = useMemo(() => calcSIP(monthlySIP, returnRate, yearsImmediately), [monthlySIP, returnRate, yearsImmediately]);
  const futureValueDelayed = useMemo(() => calcSIP(monthlySIP, returnRate, yearsDelayed), [monthlySIP, returnRate, yearsDelayed]);
  
  const costOfDelay = futureValueImmediate - futureValueDelayed;
  const percentageLoss = futureValueImmediate > 0 ? (costOfDelay / futureValueImmediate) * 100 : 0;
  const canRender = Number.isFinite(futureValueImmediate) && Number.isFinite(futureValueDelayed) && monthlySIP >= 0 && monthlySIP <= 100000 && returnRate >= 0 && returnRate <= 25 && investmentYears >= 1 && investmentYears <= 50;

  const chartData = useMemo(() => {
    const pts = [];
    if (!canRender) return pts;
    for (let y = 0; y <= investmentYears; y++) {
      const immediateValue = y <= yearsImmediately ? calcSIP(monthlySIP, returnRate, y) : futureValueImmediate;
      const delayedValue = y <= delayYears ? 0 : calcSIP(monthlySIP, returnRate, y - delayYears);
      pts.push({
        year: y,
        'Start Today': Math.round(immediateValue),
        'Start Later': Math.round(delayedValue),
      });
    }
    return pts;
  }, [monthlySIP, returnRate, investmentYears, delayYears, yearsImmediately, yearsDelayed, futureValueImmediate, canRender]);

  const delayLabel = delayMonths === 0
    ? 'No delay'
    : delayMonths % 12 === 0
      ? `${delayMonths / 12} year${delayMonths / 12 > 1 ? 's' : ''}`
      : `${delayMonths} month${delayMonths > 1 ? 's' : ''}`;

  const insightMessage = delayMonths === 0
    ? 'No delay before starting SIP'
    : `Waiting ${delayLabel} to start investing could reduce your final wealth by ${formatCr(costOfDelay)}.`;

  const resetCalculator = () => {
    setMonthlySIP(10000);
    setReturnRate(25);
    setInvestmentYears(20);
    setDelayMonths(0);
    setDelayMonthsInput('0');
    setDelayYearsInput('0');
    setDelayMonthsError('');
    setDelayYearsError('');
  };

  return (
    <div className="space-y-8">
      <div className="card border border-[#DDE5F0]">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#FFF3EB' }}>
              <TrendingUp size={22} strokeWidth={1.5} style={{ color: '#FF6100' }} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-[#00448B]">Cost of Delay SIP Calculator</h2>
              <p className="text-sm text-[#5C7089] font-body">Every year you wait to invest can cost lakhs of rupees in future wealth. See the impact of delaying your SIP.</p>
            </div>
          </div>
          <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SyncedNumberInput label="Monthly SIP Amount" value={monthlySIP} min={0} max={100000} step={1000} inputType="currency" setter={setMonthlySIP} accent="#00448B" inputMin={0} inputMax={100000} helperText="Allowed range: ₹0–₹1,00,000" />
            <SyncedNumberInput label="Expected Annual Return" value={returnRate} min={0} max={25} step={0.5} inputType="percentage" setter={setReturnRate} accent="#FF6100" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />
            <SyncedNumberInput label="Target Investment Duration" value={investmentYears} min={1} max={50} step={1} inputType="years" setter={setInvestmentYears} accent="#00448B" inputMin={1} inputMax={50} helperText="Allowed range: 1–50 years" />

            <div>
              <label className="block text-sm font-heading font-semibold text-[#0F1C2E] mb-3">Delay Before Starting</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#5C7089] font-body mb-1">Months</label>
                  <input
                    type="text"
                    value={delayMonthsInput}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setDelayMonthsInput(raw);
                      if (raw === '') {
                        setDelayMonthsError('Please enter a value between 0 and 11.');
                        return;
                      }
                      const parsed = parseInt(raw, 10);
                      if (Number.isNaN(parsed) || parsed < 0 || parsed > 11) {
                        setDelayMonthsError('Please enter a value between 0 and 11.');
                        return;
                      }
                      setDelayMonthsError('');
                      setDelayMonths(parsed);
                      setDelayYearsInput((parsed / 12).toFixed(parsed % 12 === 0 ? 0 : 2));
                    }}
                    onBlur={() => {
                      const parsed = parseInt(delayMonthsInput, 10);
                      if (Number.isNaN(parsed) || parsed < 0 || parsed > 11) {
                        setDelayMonthsError('Please enter a value between 0 and 11.');
                        return;
                      }
                      setDelayMonthsError('');
                      setDelayMonths(parsed);
                      setDelayMonthsInput(parsed.toString());
                      setDelayYearsInput((parsed / 12).toFixed(parsed % 12 === 0 ? 0 : 2));
                    }}
                    className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg focus:outline-none focus:border-[#00448B] font-heading"
                    placeholder="e.g. 6"
                  />
                  {delayMonthsError && <p className="text-[11px] text-[#DC2626] font-body mt-1">{delayMonthsError}</p>}
                </div>
                <div>
                  <label className="block text-xs text-[#5C7089] font-body mb-1">Years</label>
                  <input
                    type="text"
                    value={delayYearsInput}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setDelayYearsInput(raw);
                      if (raw === '') {
                        setDelayYearsError('Please enter a value between 0 and 20.');
                        return;
                      }
                      const parsed = parseFloat(raw);
                      if (Number.isNaN(parsed) || parsed < 0 || parsed > 20) {
                        setDelayYearsError('Please enter a value between 0 and 20.');
                        return;
                      }
                      setDelayYearsError('');
                      const months = Math.round(parsed * 12);
                      setDelayMonths(months);
                      setDelayMonthsInput(months.toString());
                    }}
                    onBlur={() => {
                      const parsed = parseFloat(delayYearsInput);
                      if (Number.isNaN(parsed) || parsed < 0 || parsed > 20) {
                        setDelayYearsError('Please enter a value between 0 and 20.');
                        return;
                      }
                      setDelayYearsError('');
                      const months = Math.round(parsed * 12);
                      setDelayMonths(months);
                      setDelayMonthsInput(months.toString());
                      setDelayYearsInput((months / 12).toFixed(months % 12 === 0 ? 0 : 2));
                    }}
                    className="w-full px-3 py-2 text-sm border border-[#DDE5F0] rounded-lg focus:outline-none focus:border-[#00448B] font-heading"
                    placeholder="e.g. 1.5"
                  />
                  {delayYearsError && <p className="text-[11px] text-[#DC2626] font-body mt-1">{delayYearsError}</p>}
                </div>
              </div>
              <p className="text-xs text-[#9BAEC8] font-body mt-2">= {delayLabel} delay before starting SIP</p>
            </div>
          </div>

          <div className="h-64">
            {canRender && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="cd1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cd2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6100" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#FF6100" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                  <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="Start Today" stroke="#00448B" strokeWidth={2.5} fill="url(#cd1)" />
                  <Area type="monotone" dataKey="Start Later" stroke="#FF6100" strokeWidth={2} fill="url(#cd2)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#00448B', background: '#EBF2FA' }}>
          <h3 className="text-sm font-heading font-bold text-[#00448B] uppercase tracking-wide mb-4">Start Today</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#5C7089] font-body mb-1">Monthly SIP</p>
              <p className="text-lg font-heading font-bold text-[#00448B]">{formatIndianCurrency(monthlySIP)}</p>
            </div>
            <div>
              <p className="text-xs text-[#5C7089] font-body mb-1">Years Invested</p>
              <p className="text-lg font-heading font-bold text-[#00448B]">{yearsImmediately}</p>
            </div>
            <div className="pt-2 border-t border-[#DDE5F0]">
              <p className="text-xs text-[#5C7089] font-body mb-1">Future Value</p>
              <p className="text-2xl font-heading font-extrabold text-[#00448B]">{formatCr(futureValueImmediate)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#FF6100', background: '#FFF3EB' }}>
          <h3 className="text-sm font-heading font-bold text-[#FF6100] uppercase tracking-wide mb-4">Start After {delayLabel}</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#5C7089] font-body mb-1">Monthly SIP</p>
              <p className="text-lg font-heading font-bold text-[#FF6100]">{formatIndianCurrency(monthlySIP)}</p>
            </div>
            <div>
              <p className="text-xs text-[#5C7089] font-body mb-1">Years Invested</p>
              <p className="text-lg font-heading font-bold text-[#FF6100]">{yearsDelayed}</p>
            </div>
            <div className="pt-2 border-t border-[#FFD9B8]">
              <p className="text-xs text-[#5C7089] font-body mb-1">Future Value</p>
              <p className="text-2xl font-heading font-extrabold text-[#FF6100]">{formatCr(futureValueDelayed)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-6 border-2" style={{ borderColor: '#DC2626', background: '#FEF2F2' }}>
        <h3 className="text-sm font-heading font-bold text-[#DC2626] uppercase tracking-wide mb-4">💰 Cost of Delay</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-[#5C7089] font-body mb-1">Wealth Lost</p>
            <p className="text-3xl font-heading font-extrabold text-[#DC2626]">{formatCr(costOfDelay)}</p>
          </div>
          <div>
            <p className="text-xs text-[#5C7089] font-body mb-1">Percentage Loss</p>
            <p className="text-3xl font-heading font-extrabold text-[#DC2626]">{percentageLoss.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)', color: 'white' }}>
        <h3 className="text-sm font-heading font-bold uppercase tracking-wide mb-3 text-blue-200">Key Insight</h3>
        <p className="text-lg font-heading font-semibold leading-relaxed">{insightMessage}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4" style={{ background: '#EBF2FA' }}>
          <p className="text-xs text-[#5C7089] font-body mb-2">Future Wealth<br />(Start Today)</p>
          <p className="font-heading font-bold text-[#00448B]">{formatCr(futureValueImmediate)}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: '#FFF3EB' }}>
          <p className="text-xs text-[#5C7089] font-body mb-2">Future Wealth<br />(Delayed Start)</p>
          <p className="font-heading font-bold text-[#FF6100]">{formatCr(futureValueDelayed)}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: '#FEF2F2' }}>
          <p className="text-xs text-[#5C7089] font-body mb-2">Cost of<br />Delay</p>
          <p className="font-heading font-bold text-[#DC2626]">{formatCr(costOfDelay)}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
          <p className="text-xs text-[#5C7089] font-body mb-2">Delay Before<br />Starting</p>
          <p className="font-heading font-bold text-[#16A34A]">{delayLabel}</p>
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#F7F9FC', borderLeft: '4px solid #00448B' }}>
        <h3 className="text-sm font-heading font-bold text-[#00448B] uppercase tracking-wide mb-4">Why Does Delaying Matter?</h3>
        <ul className="space-y-3 text-sm text-[#5C7089] font-body">
          <li className="flex gap-3">
            <span className="text-[#00448B] font-bold flex-shrink-0">1.</span>
            <span><strong>Compounding works best when given more time.</strong> The longer your money stays invested, the more it grows exponentially.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00448B] font-bold flex-shrink-0">2.</span>
            <span><strong>Even if you invest the same monthly amount, a delayed start gives your money fewer years to grow.</strong> Each lost year is irreplaceable.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#00448B] font-bold flex-shrink-0">3.</span>
            <span><strong>Starting early is often more important than investing a larger amount later.</strong> Your 10,000 today is worth more than 20,000 five years from now.</span>
          </li>
        </ul>
      </div>

      <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #FF6100 0%, #DC2626 100%)', color: 'white' }}>
        <h3 className="text-xl font-heading font-bold mb-3">Ready to Stop Delaying?</h3>
        <p className="text-sm font-body mb-6 opacity-90">
          Let's create an investment plan that works for your goals and timeline.
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#FF6100] px-6 py-3 rounded-lg font-heading font-bold text-sm hover:bg-blue-50 transition-colors">
          Book Free Consultation <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function WealthGrowthCalc() {
  const [initialAmount, setInitialAmount] = useState(500000);
  const [monthlySIP, setMonthlySIP] = useState(15000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(15);

  const totalSIPInvested = monthlySIP * 12 * years;
  const totalInvested = initialAmount + totalSIPInvested;
  const lumpFuture = calcLumpSum(initialAmount, returnRate, years);
  const sipFuture = calcSIP(monthlySIP, returnRate, years);
  const totalCorpus = lumpFuture + sipFuture;
  const totalReturns = totalCorpus - totalInvested;
  const multiplier = totalInvested > 0 ? totalCorpus / totalInvested : 0;
  const canRender = Number.isFinite(totalCorpus) && Number.isFinite(totalReturns) && initialAmount >= 0 && initialAmount <= 5000000 && monthlySIP >= 0 && monthlySIP <= 100000 && returnRate >= 0 && returnRate <= 25 && years >= 1 && years <= 50;

  const chartData = useMemo(() => {
    const pts = [];
    if (!canRender) return pts;
    for (let y = 0; y <= years; y++) {
      const corpus = calcLumpSum(initialAmount, returnRate, y) + calcSIP(monthlySIP, returnRate, y);
      const invested = initialAmount + monthlySIP * 12 * y;
      pts.push({ year: `Y${y}`, corpus: Math.round(corpus), invested: Math.round(invested) });
    }
    return pts;
  }, [initialAmount, returnRate, monthlySIP, years, canRender]);

  const resetCalculator = () => {
    setInitialAmount(500000);
    setMonthlySIP(15000);
    setReturnRate(12);
    setYears(15);
  };

  return (
    <div className="card border border-[#DDE5F0]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: '#EBF2FA' }}>
            <Sparkles size={22} strokeWidth={1.5} style={{ color: '#00448B' }} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-[#00448B]">Wealth Growth Simulator</h2>
            <p className="text-sm text-[#5C7089] font-body">See how your wealth grows over time with compounding</p>
          </div>
        </div>
        <button type="button" onClick={resetCalculator} className="px-3 py-2 rounded-lg text-sm font-heading font-semibold border border-[#DDE5F0] text-[#00448B] bg-white">Reset Calculator</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SyncedNumberInput label="Initial Investment" value={initialAmount} min={0} max={5000000} step={50000} inputType="currency" setter={setInitialAmount} accent="#00448B" inputMin={0} inputMax={5000000} helperText="Allowed range: ₹0–₹50,00,000" />
          <SyncedNumberInput label="Monthly SIP" value={monthlySIP} min={0} max={100000} step={1000} inputType="currency" setter={setMonthlySIP} accent="#FF6100" inputMin={0} inputMax={100000} helperText="Allowed range: ₹0–₹1,00,000" />
          <SyncedNumberInput label="Expected Return" value={returnRate} min={0} max={25} step={0.5} inputType="percentage" setter={setReturnRate} accent="#16A34A" inputMin={0} inputMax={25} helperText="Allowed range: 0%–25%" />
          <SyncedNumberInput label="Duration" value={years} min={1} max={50} step={1} inputType="years" setter={setYears} accent="#00448B" inputMin={1} inputMax={50} helperText="Allowed range: 1–50 years" />

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#EBF2FA' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Total Corpus</p>
              <p className="text-2xl font-heading font-extrabold text-[#00448B]">{formatCr(totalCorpus)}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#F0FDF4' }}>
              <p className="text-xs text-[#5C7089] font-body mb-1">Wealth Multiplier</p>
              <p className="text-2xl font-heading font-extrabold text-[#16A34A]">{multiplier.toFixed(1)}x</p>
            </div>
          </div>

          <div className="rounded-xl p-4 border border-[#DDE5F0]" style={{ background: '#FFF8F0' }}>
            <p className="text-xs text-[#5C7089] font-body mb-1">Your {formatCr(totalInvested)} becomes</p>
            <p className="text-lg font-heading font-bold text-[#FF6100]">{formatCr(totalCorpus)} in {years} years</p>
            <p className="text-[10px] text-[#9BAEC8] font-body mt-1">That's {formatCr(totalReturns)} in returns alone</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="h-52">
            {canRender && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00448B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00448B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF3FA" />
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9BAEC8' }} axisLine={false} tickLine={false} tickFormatter={formatCr} width={65} />
                  <Tooltip formatter={(v: any) => formatCr(Number(v))} contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" dataKey="corpus" name="Total Corpus" stroke="#00448B" strokeWidth={2.5} fill="url(#wg1)" />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#FF6100" strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[#DDE5F0] text-sm text-[#5C7089] font-body">Enter values to generate projections.</div>
            )}
          </div>

          <div className="flex items-center gap-5">
            <PieChart width={90} height={90}>
              <Pie data={[
                { name: 'Returns', value: Math.round(Math.max(0, totalReturns)) },
                { name: 'Invested', value: Math.round(totalInvested) },
              ]} cx={40} cy={40} innerRadius={24} outerRadius={42} dataKey="value" strokeWidth={0}>
                <Cell fill="#00448B" />
                <Cell fill="#FF6100" />
              </Pie>
            </PieChart>
            <div className="space-y-2 flex-1">
              {[{ label: 'Returns', color: '#00448B', value: totalReturns }, { label: 'Invested', color: '#FF6100', value: totalInvested }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[#5C7089] font-body">{item.label}: </span>
                  <span className="font-heading font-semibold text-[#00448B]">{formatCr(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calculators() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Am I On Track?', icon: TrendingUp },
    { label: 'Wealth Growth', icon: Sparkles },
    { label: 'FD Real Return', icon: TrendingDown },
    { label: 'SIP vs Lump Sum', icon: TrendingUp },
    { label: 'Retirement Corpus', icon: Landmark },
    { label: 'Cost of Delay', icon: TrendingDown },
  ];

  return (
    <main className="pt-24">
      <section className="py-14 bg-white border-b border-[#DDE5F0]">
        <div className="container-max text-center">
          <p className="section-label mb-3">Financial Tools</p>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5">Know Your Numbers</h1>
          <p className="text-xl text-[#5C7089] font-body max-w-2xl mx-auto">
            These calculators give you clarity — not complexity. Spend 3 minutes with any of them and you'll know more about your financial situation than most people.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-[#DDE5F0] sticky top-[64px] z-40">
        <div className="container-max">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-4 text-sm font-heading font-semibold border-b-2 transition-all duration-200"
                style={activeTab === i
                  ? { borderColor: '#00448B', color: '#00448B' }
                  : { borderColor: 'transparent', color: '#9BAEC8' }}>
                <tab.icon size={14} strokeWidth={2} />{tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F7F9FC]">
        <div className="container-max max-w-5xl">
          {activeTab === 0 && <OnTrackCalc />}
          {activeTab === 1 && <WealthGrowthCalc />}
          {activeTab === 2 && <FDCalc />}
          {activeTab === 3 && <SIPvsLumpSum />}
          {activeTab === 4 && <RetirementCalc />}
          {activeTab === 5 && <CostOfDelaySIPCalc />}
        </div>
      </section>

      <section className="py-4 bg-[#F7F9FC] border-t border-[#DDE5F0]">
        <div className="container-max max-w-5xl">
          <p className="text-xs text-[#9BAEC8] font-body text-center">
            * All calculations are illustrative and for educational purposes only. Actual returns will vary. Please consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </section>

      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="container-max">
          <h2 className="text-display-md font-heading font-extrabold text-white mb-4">Numbers are useful. A plan is better.</h2>
          <p className="text-blue-200 font-body text-lg max-w-xl mx-auto mb-8">
            These tools show you where you stand. A 20-minute call shows you what to do about it.
          </p>
          <Link to="/contact" className="btn-orange text-base px-8 py-4">
            Book Free Portfolio Review <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
