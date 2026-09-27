import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const goals = [
  { emoji: '🏖️', title: 'Retirement Planning', description: 'Build a corpus that lets you live life on your own terms — not dependent on anyone.', accent: '#00448B', blogSlug: 'sip-started-at-27-vs-32' },
  { emoji: '🎓', title: "Child's Education", description: "Don't let inflation erode your child's future. Start today with a dedicated education fund.", accent: '#FF6100', blogSlug: 'three-questions-before-first-sip' },
  { emoji: '🏠', title: 'Dream Home', description: "Plan the down payment and EMI strategically—invest in the right instruments for your timeline.", accent: '#00448B', blogSlug: 'salary-12-lakh-month-end-tight' },
  { emoji: '💰', title: 'Wealth Creation', description: "Turn your monthly surplus into long-term wealth through disciplined, goal-aligned investing.", accent: '#FF6100', blogSlug: 'sip-started-at-27-vs-32' },
  { emoji: '🕊️', title: 'Financial Freedom', description: "Reach a point where your investments generate income — whether or not you choose to work.", accent: '#00448B', blogSlug: 'rbi-rate-decision-sip-plain-english' },
  { emoji: '🛡️', title: 'Emergency Fund', description: "6 months of expenses, liquid and safe. The foundation of any solid financial plan.", accent: '#FF6100', blogSlug: 'company-cover-50-lakh-not-enough' },
];

export default function GoalsSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Goal-Based Planning</p>
          <h2 className="text-display-md font-heading font-extrabold text-[#00448B] mb-4">
            Every Goal Has a Plan
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-[#5C7089] font-body">
            <span className="block">Whatever your goal, we'll build a specific investment strategy designed around it.</span>
            <span className="block">Not a generic portfolio.</span>
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <div
              key={goal.title}
              className="card group block hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{goal.emoji}</div>
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#00448B' }}>{goal.title}</h3>
              <p className="text-[#5C7089] font-body text-sm leading-relaxed mb-4">{goal.description}</p>
              <Link to={`/blog/${goal.blogSlug}`} className="flex items-center gap-1 text-sm font-heading font-semibold" style={{ color: goal.accent }}>
                Start Planning <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
