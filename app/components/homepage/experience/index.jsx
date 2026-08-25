"use client";

import { FiBriefcase } from "react-icons/fi";
import { motion } from "framer-motion";
import { experiences } from "@/utils/data/experience";

function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-line bg-gradient-to-b from-white to-bg-soft overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30 bg-grid-pattern pointer-events-none" />
      
      <div className="wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="kicker">Experience &amp; Track Record</div>
          <h2 className="sec-title">Where I&apos;ve built and shipped</h2>
          <p className="sec-subtitle">
            A track record of engineering impact across technology hubs, software
            studios, and international client collaborations.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[21px] before:w-[2px] before:bg-gradient-to-b before:from-accent/40 before:via-accent/20 before:to-transparent">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role + exp.org}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="relative z-10"
            >
              <motion.div
                className="timeline-row group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 glass-card border border-line rounded-xl hover:border-accent/30 hover:shadow-xl transition-all duration-300 cursor-pointer layer-2"
                whileHover={{ x: idx % 2 === 0 ? 8 : -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="p-2.5 rounded-xl bg-bg-soft text-muted group-hover:text-accent group-hover:bg-accent-tint border border-transparent group-hover:border-accent/10 transition-colors mt-0.5 shrink-0"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <FiBriefcase size={16} />
                  </motion.div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-base font-bold text-ink group-hover:text-accent transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-semibold text-accent/90">
                        @ {exp.org}
                      </span>
                      {exp.status && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 animate-pulse">
                          {exp.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted mt-1 leading-relaxed max-w-xl">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-2 sm:mt-0 text-left sm:text-right shrink-0 pl-14 sm:pl-0">
                  <div className="text-xs font-semibold text-ink">{exp.date}</div>
                  <div className="text-[11px] text-muted-2">{exp.location}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;