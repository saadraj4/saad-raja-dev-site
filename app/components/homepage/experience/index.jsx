import Reveal from "../../reveal";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    role: "Full Stack Web Developer",
    org: "Vantage Soft (NASTP)",
    location: "Rawalpindi, Pakistan",
    date: "Feb 2026 — Present",
    status: "Current",
    desc: "Architecting and developing production web applications, robust client dashboards, and responsive frontends.",
  },
  {
    role: "Full Stack Web Developer",
    org: "Upwork",
    location: "Global Remote",
    date: "Jan 2025 — Present",
    status: "Freelance",
    desc: "Delivering end-to-end full-stack web solutions, API integrations, and tailored software products for international clients.",
  },
  {
    role: "Full Stack Web Developer",
    org: "Ai Pinnacle (NASTP)",
    location: "Rawalpindi, Pakistan",
    date: "Aug — Dec 2024",
    desc: "Engineered performant full-stack modules, data workflows, and intuitive web interfaces.",
  },
  {
    role: "MERN Stack Developer",
    org: "EESS Solutions",
    location: "Karachi, Pakistan (Remote)",
    date: "Sept 2023 — July 2024",
    desc: "Built scalable web features across React frontend and Node/Express/MongoDB backend services.",
  },
  {
    role: "Web Developer & Freelancer",
    org: "Fiverr",
    location: "Global Remote",
    date: "Sept 2022 — Dec 2023",
    desc: "Developed responsive web pages, custom UI components, and client web applications.",
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-line bg-white">
      <div className="wrap">
        <Reveal>
          <div className="kicker">Experience &amp; Track Record</div>
          <h2 className="sec-title">Where I&apos;ve built and shipped</h2>
          <p className="sec-subtitle">
            A track record of engineering impact across technology hubs, software
            studios, and international client collaborations.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {experiences.map((exp, idx) => (
            <Reveal
              key={exp.role + exp.org}
              delay={0.06 * (idx + 1)}
              className="timeline-row group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-bg-soft text-muted group-hover:text-accent group-hover:bg-accent-tint transition-colors mt-0.5">
                  <FiBriefcase size={16} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-ink">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-accent">
                      @ {exp.org}
                    </span>
                    {exp.status && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200">
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1 leading-relaxed max-w-xl">
                    {exp.desc}
                  </p>
                </div>
              </div>

              <div className="mt-2 sm:mt-0 text-left sm:text-right shrink-0">
                <div className="text-xs font-semibold text-ink">{exp.date}</div>
                <div className="text-[11px] text-muted-2">{exp.location}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;