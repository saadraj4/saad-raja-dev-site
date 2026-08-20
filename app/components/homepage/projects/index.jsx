"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "../../reveal";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import MagneticCard from "../../motion/magnetic-card";
import { motion } from "framer-motion";

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
    image: "/image/oven-ngrill.jpg",
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
    image: "/image/mandeville-motors.jpg",
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
    image: "/image/cleaners-compare.jpg",
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
    <section id="work" className="py-24 border-t border-line bg-bg-soft/40 overflow-hidden">
      <div className="wrap">
        <Reveal direction="up" delay={0.1}>
          <div className="kicker">Selected Production Work</div>
          <h2 className="sec-title">Real products. Real clients. Real outcomes.</h2>
          <p className="sec-subtitle">
            A showcase of production web applications and commercial platforms I
            have contributed to professionally.
          </p>
        </Reveal>

        {/* Production Projects Showcase */}
        <div className="mt-14 space-y-12">
          {productionProjects.map((project, idx) => (
            <Reveal
              key={project.name}
              direction="up"
              delay={0.12 * (idx + 1)}
              className="showcase-card overflow-hidden border border-line bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Browser mockup top bar */}
              <div className="browser-header bg-bg-soft px-6 py-4 flex items-center justify-between border-b border-line">
                <div className="browser-dots flex gap-2">
                  <span className="browser-dot w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="browser-dot w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="browser-dot w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="browser-address bg-white border border-line rounded px-4 py-1 text-xs text-muted font-mono tracking-wide max-w-xs truncate">
                  https://{project.domain}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  Live Product
                </div>
              </div>

              {/* Project Content Body (Split Layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
                {/* Left Side: Metadata (7 columns on large screens) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent bg-accent-tint px-3 py-1 rounded-full border border-accent-border">
                      {project.badge}
                    </span>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-accent transition-colors group/btn"
                    >
                      <span>Visit Live Website</span>
                      <FiExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {project.name}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-muted leading-relaxed">
                    {project.title}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-line">
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-2">
                        The Business Problem &amp; Outcome
                      </div>
                      <p className="text-muted text-xs sm:text-sm leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-2">
                        My Engineering Contribution
                      </div>
                      <p className="text-ink font-medium text-xs sm:text-sm leading-relaxed">
                        {project.contribution}
                      </p>
                    </div>
                  </div>

                  {/* Technologies used */}
                  <div className="pt-5 border-t border-line/60 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-muted-2 font-semibold mr-1">
                        Tech:
                      </span>
                      {project.tools.map((tool) => (
                        <span key={tool} className="tag-pill bg-bg-soft border border-line text-muted text-[10px] sm:text-xs px-2.5 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs !py-2.5 !px-4 flex items-center gap-1.5"
                    >
                      <span>Launch {project.domain}</span>
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right Side: Visual Mockup (5 columns on large screens) */}
                <div className="lg:col-span-5 w-full h-full flex justify-center">
                  <motion.div
                    className="w-full relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[240px] rounded-xl overflow-hidden border border-line shadow-sm hover:shadow-lg bg-bg-soft"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} Screenshot Preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 400px"
                      className="object-cover object-top hover:object-bottom transition-all duration-[4s] ease-in-out cursor-pointer"
                    />
                  </motion.div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technical & Open Source Systems */}
        <div className="mt-24 pt-16 border-t border-line">
          <Reveal direction="up" delay={0.1}>
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
                direction="scale"
                delay={0.08 * (idx + 1)}
                className="h-full"
              >
                <MagneticCard
                  intensity={5}
                  className="problem-card flex flex-col justify-between h-full bg-white border border-line rounded-xl p-6 hover:shadow-md cursor-pointer group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-accent bg-accent-tint border border-accent-border px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-ink transition-colors"
                        title="View GitHub Repository"
                      >
                        <FiGithub size={18} />
                      </Link>
                    </div>

                    <h3 className="text-lg font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed">
                      {item.outcome}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-line">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-bg-soft border border-line text-muted px-2 py-0.5 rounded font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-accent transition-colors group/link"
                    >
                      <span>View Repository</span>
                      <FiExternalLink size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </MagneticCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;