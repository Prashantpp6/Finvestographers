export interface EnquiryData {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  occupation: string;
  interest: string;
  investmentAmount: string;
  message: string;
  source?: string;
}

export const ENQUIRY_STORAGE_KEY = 'finvestographers-enquiries';
export const CONSULTATION_EVENT = 'finvestographers:open-consultation';

export interface ConsultationDetails {
  interest?: string;
  source?: string;
}

export function openConsultationModal(details: ConsultationDetails = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CONSULTATION_EVENT, { detail: details }));
}

export function buildWhatsAppUrl(data: EnquiryData) {
  const message = [
    `Name: ${data.fullName || 'N/A'}`,
    `Phone: ${data.mobile || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `Interest: ${data.interest || 'N/A'}`,
    `City: ${data.city || 'N/A'}`,
    `Occupation: ${data.occupation || 'N/A'}`,
    `Investment Amount: ${data.investmentAmount || 'N/A'}`,
    `Message: ${data.message || 'N/A'}`,
  ].join('\n');

  return `https://wa.me/918962692479?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(data: EnquiryData) {
  const subject = encodeURIComponent(`New consultation enquiry from ${data.fullName || 'Website visitor'}`);
  const body = encodeURIComponent([
    `Name: ${data.fullName || 'N/A'}`,
    `Phone: ${data.mobile || 'N/A'}`,
    `Email: ${data.email || 'N/A'}`,
    `City: ${data.city || 'N/A'}`,
    `Occupation: ${data.occupation || 'N/A'}`,
    `Interest: ${data.interest || 'N/A'}`,
    `Investment Amount: ${data.investmentAmount || 'N/A'}`,
    `Message: ${data.message || 'N/A'}`,
  ].join('\n'));

  return `mailto:Finvestographers@gmail.com?subject=${subject}&body=${body}`;
}

export function persistEnquiry(data: EnquiryData) {
  if (typeof window === 'undefined') return;
  const previous = window.localStorage.getItem(ENQUIRY_STORAGE_KEY);
  const enquiries = previous ? JSON.parse(previous) : [];
  enquiries.unshift({
    ...data,
    submittedAt: new Date().toISOString(),
  });
  window.localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(enquiries.slice(0, 50)));
}

export async function submitEnquiry(data: EnquiryData) {
  persistEnquiry(data);

  const emailJsConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );

  if (emailJsConfigured) {
    try {
      const emailjs = await import('emailjs-com');
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          full_name: data.fullName,
          mobile: data.mobile,
          email: data.email,
          city: data.city,
          occupation: data.occupation,
          interest: data.interest,
          investment_amount: data.investmentAmount,
          message: data.message,
          to_email: 'Finvestographers@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      return { success: true, mode: 'emailjs' };
    } catch {
      // fall back to mailto if EmailJS is unavailable
    }
  }

  if (typeof window !== 'undefined') {
    window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer');
    window.location.assign(buildMailtoUrl(data));
  }

  return { success: true, mode: 'mailto' };
}
