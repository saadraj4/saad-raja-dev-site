import Link from "next/link";
import Reveal from "../../reveal";
import { FiExternalLink, FiGithub, FiCheckCircle } from "react-icons/fi";

const productionProjects = [
  {
    badge: "Production Client · Restaurant Web Experience",
    name: "Oven N Grill",
    domain: "ovenngrill.com",
    title: "High-Performance Restaurant Web Platform & Digital Ordering Experience",
    outcome:
      "Engineered a modern web presence for a restaurant brand to showcase menu offerings, improve local search visibility, and streamline customer discovery.",
    contribution:
      "Developed the responsive frontend interface using React and Vite, implemented dynamic menu displays, and integrated backend endpoints for order and customer engagement.",
    tools: ["React", "Vite", "JavaScript", "Tailwind CSS", "REST APIs"],
    link: "https://ovenngrill.com",
    isExternal: true,
  },
  {
    badge: "Production Client · Automotive Dealership (UK)",
    name: "Mandeville Motors",
    domain: "mandevillemotors.co.uk",
    title: "Automotive Vehicle Discovery & Lead Generation Platform",
    outcome:
      "Built a fast, search-optimized vehicle discovery platform for a UK-based motor dealership, facilitating vehicle catalog browsing and direct customer inquiries.",
    contribution:
      "Engineered the responsive vehicle catalog browsing experience, search and detail interfaces, and lead inquiry workflows with high mobile responsiveness.",
    tools: ["React", "Vite", "JavaScript", "Tailwind CSS", "Responsive Design"],
    link: "https://mandevillemotors.co.uk/",
    isExternal: true,
  },
  {
    badge: "Production Platform · Commercial B2B Marketplace",
    name: "CleanersCompare",
    domain: "cleanerscompare.com",
    title: "B2B Comparison Marketplace for Laundry & Dry Cleaning Industry",
    outcome:
      "Developed a dedicated commercial marketplace connecting laundry businesses with suppliers for new/used equipment, spare parts, and specialized engineering services.",
    contribution:
      "Contributed to the Next.js full-stack platform, implementing product catalog filtering, supplier product showcase flows, and SEO-optimized buyer landing pages.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Full Stack"],
    link: "https://www.cleanerscompare.com/",
    isExternal: true,
  },
];

const technicalProjects = [
  {
    badge: "Web3 Engineering",
    name: "Book It — Blockchain Ticketing",
    title: "Tamper-Proof Decentralized Booking & Ticket Verification System",
    outcome:
      "Solved ticket scalping and counterfeit fraud by logging bookings on Ethereum smart contracts, backed by Stripe for fiat payment onboarding.",
    tools: ["React", "Ethereum", "Express", "MongoDB", "Stripe"],
    link: "https://github.com/saadraj4/fyp-bookit",
  },
  {
    badge: "Machine Learning",
    name: "Telecom Churn Prediction",
    title: "Predictive Subscriber Churn Modeling & Risk Factor Identification",
    outcome:
      "Built predictive machine learning models to surface high-risk customer churn indicators, enabling data-backed retention intervention.",
    tools: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
    link: "https://github.com/saadraj4/Analysis-of-telecom-Customer-Churn",
  },
  {
    badge: "Signal Processing",
    name: "Sensor Motion Analysis",
    title: "Kalman Filter Pipeline for Real-Time Kinematic & Speed Estimation",
    outcome:
      "Processed raw accelerometer and gyroscope sensor telemetry into smoothed motion events and real-time velocity metrics.",
    tools: ["Python", "NumPy", "Kalman Filter", "Pandas"],
    link: "https://github.com/saadraj4/Motion_Analysis_using_Accelerometer_and_Gyroscope_Data",
  },
];

function WorkSection() {
  return (
    <section id="work" className="py-24 border-t border-line bg-bg-soft/40">
      <div className="wrap">
        <Reveal>
          <div className="kicker">Selected Production Work</div>
          <h2 className="sec-title">Real products. Real clients. Real outcomes.</h2>
          <p className="sec-subtitle">
            A showcase of production web applications and commercial platforms I
            have contributed to professionally.
          </p>
        </Reveal>

        {/* Production Projects Showcase */}
        <div className="mt-14 space-y-10">
          {productionProjects.map((project, idx) => (
            <Reveal
              key={project.name}
              delay={0.08 * (idx + 1)}
              className="showcase-card"
            >
              {/* Browser mockup top bar */}
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                </div>
                <div className="browser-address">https://{project.domain}</div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-accent uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Production
                </div>
              </div>

              {/* Project Content Body */}
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent-tint px-2.5 py-1 rounded border border-accent-border">
                    {project.badge}
                  </span>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-accent transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <FiExternalLink size={13} />
                  </Link>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                  {project.name} — {project.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 pt-5 border-t border-line">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                      The Business Problem &amp; Outcome
                    </div>
                    <p className="text-muted text-[14.5px] leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-2 mb-2">
                      My Engineering Contribution
                    </div>
                    <p className="text-ink font-medium text-[14.5px] leading-relaxed">
                      {project.contribution}
                    </p>
                  </div>
                </div>

                {/* Technologies used */}
                <div className="pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-2 font-semibold mr-1">
                      Tech:
                    </span>
                    {project.tools.map((tool) => (
                      <span key={tool} className="tag-pill">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs !py-2.5 !px-4"
                  >
                    <span>Visit {project.domain}</span>
                    <FiExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technical & Open Source Systems */}
        <div className="mt-20 pt-16 border-t border-line">
          <Reveal>
            <div className="kicker">Technical Projects &amp; Systems</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Experiments that sharpen the engineering
            </h2>
            <p className="text-muted text-sm mt-2 max-w-lg">
              Specialized open-source architectures exploring Web3 data
              integrity, machine learning risk modeling, and sensor processing.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {technicalProjects.map((item, idx) => (
              <Reveal
                key={item.name}
                delay={0.06 * (idx + 1)}
                className="problem-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-ink transition-colors"
                      title="View GitHub Repository"
                    >
                      <FiGithub size={16} />
                    </Link>
                  </div>

                  <h3 className="text-lg font-bold text-ink tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-4">
                    {item.outcome}
                  </p>
                </div>

                <div className="pt-4 border-t border-line">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] bg-bg-soft text-muted px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-accent transition-colors"
                  >
                    <span>View Repository</span>
                    <FiExternalLink size={12} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;