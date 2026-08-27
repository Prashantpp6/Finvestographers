import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { CONSULTATION_EVENT, buildMailtoUrl, buildWhatsAppUrl, openConsultationModal, submitEnquiry } from '../lib/enquiry';

interface ConsultationModalProps {
  defaultInterest?: string;
  defaultSource?: string;
}

const interestOptions = [
  'Mutual Funds',
  'Financial Planning',
  'Insurance',
  'Retirement',
  'Tax Saving',
  'Portfolio Review',
  'Others',
];

const emptyForm = {
  fullName: '',
  mobile: '',
  email: '',
  city: '',
  occupation: '',
  interest: '',
  investmentAmount: '',
  message: '',
};

export default function ConsultationModal({ defaultInterest = '', defaultSource = 'website' }: ConsultationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ interest?: string; source?: string }>;
      setForm((prev) => ({ ...prev, interest: customEvent.detail?.interest || defaultInterest || prev.interest }));
      setErrors({});
      setSubmitted(false);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener(CONSULTATION_EVENT, handleOpen as EventListener);
    return () => {
      window.removeEventListener(CONSULTATION_EVENT, handleOpen as EventListener);
      document.body.style.overflow = '';
    };
  }, [defaultInterest]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!form.mobile.trim()) nextErrors.mobile = 'Please enter your mobile number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!form.city.trim()) nextErrors.city = 'Please share your city.';
    if (!form.occupation.trim()) nextErrors.occupation = 'Please share your occupation.';
    if (!form.interest) nextErrors.interest = 'Please select an area of interest.';
    if (!form.message.trim()) nextErrors.message = 'Please share a short message.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        source: defaultSource,
      };
      await submitEnquiry(payload);
      setSubmitted(true);
      setForm(emptyForm);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewLink = useMemo(() => buildWhatsAppUrl({
    ...form,
    fullName: form.fullName || 'Your Name',
    mobile: form.mobile || 'Phone',
    email: form.email || 'Email',
    city: form.city || 'City',
    occupation: form.occupation || 'Occupation',
    interest: form.interest || 'Interest',
    investmentAmount: form.investmentAmount || 'N/A',
    message: form.message || 'Message',
    source: defaultSource,
  }), [form, defaultSource]);

  const mailtoPreview = useMemo(() => buildMailtoUrl({
    ...form,
    fullName: form.fullName || 'Your Name',
    mobile: form.mobile || 'Phone',
    email: form.email || 'Email',
    city: form.city || 'City',
    occupation: form.occupation || 'Occupation',
    interest: form.interest || 'Interest',
    investmentAmount: form.investmentAmount || 'N/A',
    message: form.message || 'Message',
    source: defaultSource,
  }), [form, defaultSource]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-3 py-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/40 bg-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full border border-[#DDE5F0] bg-white/80 p-2 text-[#00448B] transition hover:bg-[#EBF2FA]"
              aria-label="Close consultation form"
            >
              <X size={18} />
            </button>

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-gradient-to-br from-[#00448B] via-[#0057B3] to-[#002A62] p-7 text-white sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
                  <Sparkles size={14} />
                  Premium consultation
                </div>
                <h2 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">Let&apos;s build a financial plan that actually fits your life.</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/90 sm:text-base">
                  Share a few details and we’ll respond with the next best step — usually within a few working hours.
                </p>

                <div className="mt-8 space-y-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#FF6100]/20 p-2 text-[#FF6100]">
                      <MessageCircle size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Instant WhatsApp handoff</p>
                      <p className="text-xs text-blue-100/80">We open your enquiry directly with a prefilled message.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#FF6100]/20 p-2 text-[#FF6100]">
                      <Send size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Email sent to Finvestographers</p>
                      <p className="text-xs text-blue-100/80">Your enquiry is stored locally and shared with our advisory team.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-[#DDE5F0] bg-[#F7F9FC] p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4]">
                      <CheckCircle size={30} className="text-[#16A34A]" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-[#00448B]">Thanks! We&apos;ve received your enquiry.</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5C7089]">
                      Your request has been prepared for WhatsApp and email. We’ll follow up shortly.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a href={previewLink} target="_blank" rel="noreferrer" className="btn-orange text-sm px-5 py-3">Open WhatsApp</a>
                      <a href={mailtoPreview} className="btn-outline text-sm px-5 py-3">Open Email Draft</a>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Full Name</label>
                        <input className="input-field" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Aarav Mehta" />
                        {errors.fullName && <p className="mt-1 text-xs text-[#DC2626]">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Mobile Number</label>
                        <input className="input-field" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="98765 43210" />
                        {errors.mobile && <p className="mt-1 text-xs text-[#DC2626]">{errors.mobile}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Email</label>
                        <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                        {errors.email && <p className="mt-1 text-xs text-[#DC2626]">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">City</label>
                        <input className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Mumbai" />
                        {errors.city && <p className="mt-1 text-xs text-[#DC2626]">{errors.city}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Occupation</label>
                        <input className="input-field" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} placeholder="Software Engineer" />
                        {errors.occupation && <p className="mt-1 text-xs text-[#DC2626]">{errors.occupation}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Interested In</label>
                        <select className="input-field" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                          <option value="">Select one</option>
                          {interestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                        {errors.interest && <p className="mt-1 text-xs text-[#DC2626]">{errors.interest}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Investment Amount</label>
                        <input className="input-field" value={form.investmentAmount} onChange={(e) => setForm({ ...form, investmentAmount: e.target.value })} placeholder="₹5,00,000" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-[#0F1C2E]">Message</label>
                        <textarea className="input-field min-h-[96px] resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you’d like help with." />
                        {errors.message && <p className="mt-1 text-xs text-[#DC2626]">{errors.message}</p>}
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-3" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
