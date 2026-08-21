"use client";

import Reveal from "../../reveal";
import { FiLayers, FiShield, FiTrendingUp, FiTool } from "react-icons/fi";
import MagneticCard from "../../motion/magnetic-card";
import { motion } from "framer-motion";

const problems = [
  {
    num: "01",
    icon: FiLayers,
    tag: "Zero-to-One",
    title: "Launch your product without the guesswork",
    desc: "You have an idea or a product spec. I take it from a blank repository to a live, working application — frontend, backend, database, and hosting, all handled by one developer with end-to-end accountability.",
  },
  {
    num: "02",
    icon: FiShield,
    tag: "High Trust & Security",
    title: "Make your transactions provably trustworthy",
    desc: "If you're handling bookings, customer checkout, or records that must be tamper-proof, I engineer trust directly into the architecture — verifiable on-chain or backed by robust transactional databases.",
  },
  {
    num: "03",
    icon: FiTrendingUp,
    tag: "Data to Revenue",
    title: "Turn your data into actionable decisions",
    desc: "If you have customer behavior or operational data sitting dormant, I build predictive models and intuitive analytics dashboards that surface what's actually happening and where to focus next.",
  },
  {
    num: "04",
    icon: FiTool,
    tag: "Speed & Reliability",
    title: "Fix and scale what's already built",
    desc: "Slow page loads, bugs, or brittle spaghetti code? I work inside existing codebases, diagnose performance bottlenecks, and ship high-impact refactors without forcing an expensive full rewrite.",
  },
];

function WhatICanDo() {
  return (
    <section id="solve" className="py-12 border-t border-line bg-bg-soft/20 overflow-hidden">
      <div className="wrap">
        <Reveal direction="up" delay={0.1}>
          <div className="kicker">What I Can Do For You</div>
          <h2 className="sec-title">Four problems I get hired to solve</h2>
          <p className="sec-subtitle">
            Clients hire me for tangible business outcomes, not just lines of
            code. Here is how I create immediate value for your product.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.num}
                direction={idx % 2 === 0 ? "left" : "right"}
                delay={0.1 * (idx + 1)}
                className="h-full"
              >
                <MagneticCard
                  intensity={6}
                  className="problem-card flex flex-col justify-between group h-full cursor-pointer overflow-hidden relative"
                >
                  {/* Subtle inner spotlight hover gradient */}
                  <div className="absolute inset-0 bg-radial-spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-2 uppercase tracking-wider">
                        <span className="text-accent font-extrabold text-sm">
                          {item.num}
                        </span>
                        <span>·</span>
                        <span>{item.tag}</span>
                      </span>
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent-tint transition-all"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon size={16} />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-bold text-ink tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted text-[14.5px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </MagneticCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhatICanDo;
