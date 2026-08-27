import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { openConsultationModal } from '../lib/enquiry';

const categories = ['All', 'SIP Basics', 'Personal Finance', 'Insurance', 'Market Updates', 'Beginners'];

const categoryStyles: Record<string, { bg: string; color: string }> = {
  'SIP Basics': { bg: '#FFF3EB', color: '#FF6100' },
  'Personal Finance': { bg: '#EBF2FA', color: '#00448B' },
  'Insurance': { bg: '#FEF2F2', color: '#DC2626' },
  'Market Updates': { bg: '#EFF6FF', color: '#1D4ED8' },
  'Beginners': { bg: '#F0FDF4', color: '#16A34A' },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24">
      <section className="py-14 bg-white">
        <div className="container-max text-center">
          <p className="section-label mb-3">Insights & Education</p>
          <h1 className="text-display-lg font-heading font-extrabold text-[#00448B] mb-5">
            Financial Clarity, Not Jargon
          </h1>
          <p className="text-xl text-[#5C7089] font-body max-w-2xl mx-auto">
            First-person, colleague-tone articles. Not textbook. Written for people who want to understand their money — not study for an exam.
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-[#DDE5F0] sticky top-[64px] z-40">
        <div className="container-max py-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200"
                style={activeCategory === cat
                  ? { background: '#00448B', color: 'white' }
                  : { background: '#EBF2FA', color: '#00448B' }
                }>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#F7F9FC]">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => {
              const style = categoryStyles[post.category] || { bg: '#EBF2FA', color: '#00448B' };
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`}
                  className={`card group block ${i === 0 && activeCategory === 'All' ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full"
                      style={{ background: style.bg, color: style.color }}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-body" style={{ color: '#9BAEC8' }}>
                      <Clock size={11} />{post.readTime} read
                    </div>
                    <span className="text-xs font-body ml-auto" style={{ color: '#9BAEC8' }}>{post.date}</span>
                  </div>
                  <h2 className={`font-heading font-bold text-[#00448B] mb-3 leading-snug group-hover:text-[#FF6100] transition-colors ${i === 0 && activeCategory === 'All' ? 'text-2xl' : 'text-lg'}`}>
                    {post.title}
                  </h2>
                  <p className="text-[#5C7089] font-body text-sm leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#DDE5F0]">
                    <span className="text-xs font-heading font-semibold" style={{ color: '#FF6100' }}>{post.highlight}</span>
                    <div className="flex items-center gap-1 text-sm font-heading font-semibold" style={{ color: '#00448B' }}>
                      Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #00448B 0%, #002A62 100%)' }}>
        <div className="container-max">
          <p className="font-heading font-semibold text-sm uppercase tracking-widest mb-4" style={{ color: '#FF6100' }}>
            From The Blog to Reality
          </p>
          <h2 className="text-display-md font-heading font-extrabold text-white mb-4">
            Reading is useful. Action is better.
          </h2>
          <p className="text-blue-200 font-body text-lg max-w-xl mx-auto mb-8">
            Book a free 20-minute portfolio review. We'll apply what's in these articles to your actual situation.
          </p>
          <button type="button" onClick={() => openConsultationModal({ source: 'blog-page' })} className="btn-cta text-base px-8 py-4">
            Book Free Portfolio Review <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
