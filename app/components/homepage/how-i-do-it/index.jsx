import Reveal from "../../reveal";
import { FiCode, FiServer, FiDatabase, FiCpu } from "react-icons/fi";

const stackGroups = [
  {
    category: "Frontend Architecture",
    icon: FiCode,
    desc: "Fast, accessible, type-safe user interfaces designed for conversion.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend & Systems",
    icon: FiServer,
    desc: "Robust APIs, authentication flows, and resilient business logic.",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "Stripe API"],
  },
  {
    category: "Data & Infrastructure",
    icon: FiDatabase,
    desc: "Optimized schemas, indexing, and performant data retrieval.",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Docker", "Git"],
  },
  {
    category: "Specialized & Machine Learning",
    icon: FiCpu,
    desc: "Smart contract audit trails and predictive data pipelines.",
    items: ["Ethereum", "Web3.js", "Python", "scikit-learn", "NumPy"],
  },
];

function HowIDoIt() {
  return (
    <section id="stack" className="py-24 border-t border-line bg-white">
      <div className="wrap">
        <Reveal>
          <div className="kicker">How I Actually Do It</div>
          <h2 className="sec-title">The stack behind the outcome</h2>
          <p className="sec-subtitle">
            Technology is the tool, not the goal. Here is the modern, production-proven
            stack I use to build scalable web products.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {stackGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <Reveal
                key={group.category}
                delay={0.06 * (idx + 1)}
                className="p-6 rounded-2xl border border-line bg-bg-soft/40 hover:bg-white hover:border-line hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white border border-line text-ink">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    {group.category}
                  </h3>
                </div>

                <p className="text-xs text-muted leading-relaxed mb-4">
                  {group.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowIDoIt;
