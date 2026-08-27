import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { openConsultationModal } from '../lib/enquiry';

const categoryStyles: Record<string, { bg: string; color: string }> = {
  'SIP Basics': { bg: '#FFF3EB', color: '#FF6100' },
  'Personal Finance': { bg: '#EBF2FA', color: '#00448B' },
  'Insurance': { bg: '#FEF2F2', color: '#DC2626' },
  'Market Updates': { bg: '#EFF6FF', color: '#1D4ED8' },
  'Beginners': { bg: '#F0FDF4', color: '#16A34A' },
};

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**') && !block.includes('\n')) {
      return <h3 key={i} className="text-xl font-heading font-bold text-[#00448B] mt-8 mb-3">{block.slice(2, -2)}</h3>;
    }
    if (block.startsWith('- ') || block.includes('\n- ')) {
      const items = block.split('\n').filter((l) => l.startsWith('- '));
      return (
        <ul key={i} className="space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[#5C7089] font-body">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ background: '#FF6100' }} />
              <span>{item.slice(2)}</span>
            </li>
          ))}
        </ul>
      );
    }
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="font-body leading-[1.8] mb-4 text-[17px]" style={{ color: '#0F1C2E' }}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold text-[#0F1C2E]">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const style = categoryStyles[post.category] || { bg: '#EBF2FA', color: '#00448B' };
  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="pt-24">
      <section className="py-14 bg-white border-b border-[#DDE5F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to="/blog"
            className="inline-flex items-center gap-2 text-sm font-body mb-8 transition-colors"
            style={{ color: '#5C7089' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00448B')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#5C7089')}>
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
              style={{ background: style.bg, color: style.color }}>{post.category}</span>
            <div className="flex items-center gap-1 text-xs font-body" style={{ color: '#9BAEC8' }}>
              <Clock size={11} />{post.readTime} read
            </div>
            <span className="text-xs font-body" style={{ color: '#9BAEC8' }}>{post.date}</span>
          </div>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5 leading-tight">{post.title}</h1>
          <p className="text-xl text-[#5C7089] font-body leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">{renderContent(post.content)}</div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
            <h3 className="text-2xl font-heading font-extrabold text-white mb-3">Book a free 20-min portfolio review</h3>
            <p className="text-blue-200 font-body mb-6">No sales pitch. Just your numbers, laid out clearly.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button type="button" onClick={() => openConsultationModal({ source: 'blog-post' })} className="btn-cta text-base px-7 py-3.5">
                Book Free Review <ArrowRight size={16} />
              </button>
              <a href="https://wa.me/918962692479" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-heading font-semibold px-7 py-3.5 rounded-xl transition-colors"
                style={{ background: '#25D366', color: 'white' }}>
                <MessageCircle size={16} strokeWidth={2} />WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {otherPosts.length > 0 && (
        <section className="py-12 bg-[#F7F9FC]">
          <div className="container-max">
            <h3 className="text-2xl font-heading font-extrabold text-[#00448B] mb-8">More Articles</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {otherPosts.map((p) => {
                const s = categoryStyles[p.category] || { bg: '#EBF2FA', color: '#00448B' };
                return (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="card group block">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: s.bg, color: s.color }}>{p.category}</span>
                      <div className="flex items-center gap-1 text-xs font-body" style={{ color: '#9BAEC8' }}>
                        <Clock size={11} /> {p.readTime}
                      </div>
                    </div>
                    <h4 className="font-heading font-bold text-[#00448B] text-base mb-2 leading-snug group-hover:text-[#FF6100] transition-colors">{p.title}</h4>
                    <p className="text-[#5C7089] font-body text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
