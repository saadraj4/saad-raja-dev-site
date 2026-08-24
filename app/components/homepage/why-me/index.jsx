"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiX, FiZap, FiShield, FiTrendingUp, FiClock } from "react-icons/fi";
import Reveal from "../../reveal";

const comparisons = [
  { label: "Requirements gathering before coding", you: true, others: false },
  { label: "End-to-end ownership (no handoffs)", you: true, others: false },
  { label: "Production deployment included", you: true, others: false },
  { label: "Post-launch support and fixes", you: true, others: false },
  { label: "Performance optimization built-in", you: true, others: false },
  { label: "Clean, maintainable code", you: true, others: "Sometimes" },
  { label: "Transparent timeline estimates", you: true, others: false },
  { label: "Technical documentation", you: true, others: false },
];

const differentiators = [
  {
    icon: FiZap,
    title: "Speed Without Compromise",
    desc: "Fast delivery doesn't mean cutting corners. I ship quickly because I've built these systems before.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: FiShield,
    title: "Production-First Mindset",
    desc: "Every line of code is written thinking: 'Will this break at 3 AM?' Security, performance, and reliability are non-negotiable.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: FiTrendingUp,
    title: "Business-Oriented Engineering",
    desc: "I don't just build features. I help you validate ideas, prioritize what matters, and maximize ROI on development time.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: FiClock,
    title: "Time Zone Advantage",
    desc: "UTC+5 means your project moves forward while you sleep. Wake up to progress updates, not blockers.",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

function WhyMe() {
  const [hoveredDiff, setHoveredDiff] = useState(null);

  return (
    <section className="py-24 border-t border-line bg-gradient-to-b from-ink to-ink-light text-white overflow-hidden relative">
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="wrap relative z-10">
        <Reveal direction="up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-3xl shadow-lg">
                ⚡
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Why work with me?
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              You&apos;re not hiring a developer. You&apos;re getting a technical co-founder for your project — someone who thinks about your business, not just the code.
            </p>
          </div>
        </Reveal>

        {/* Comparison table */}
        <Reveal direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              {/* Table header */}
              <div className="grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-3 gap-2 sm:gap-4 p-4 sm:p-6 border-b border-white/10 bg-white/5">
                <div className="text-xs sm:text-sm font-bold text-white/50"></div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-extrabold text-white">Me</div>
                  <div className="text-[10px] sm:text-xs text-green-400 font-semibold mt-1 hidden sm:block">✓ Full Stack</div>
                </div>
                <div className="text-center">
                  <div className="text-sm sm:text-lg font-extrabold text-white/60">Others</div>
                  <div className="text-[10px] sm:text-xs text-white/40 mt-1 hidden sm:block">Generic</div>
                </div>
              </div>

              {/* Comparison rows */}
              <div className="divide-y divide-white/5">
                {comparisons.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-xs sm:text-sm text-white/80 font-medium flex items-center">
                      {item.label}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.you === true ? (
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                        >
                          <FiCheck className="text-green-400 w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                      ) : (
                        <span className="text-xs text-white/60 font-semibold">{item.you}</span>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.others === false ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-error/20 border-2 border-error/50 flex items-center justify-center"
                        >
                          <FiX className="text-error w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.div>
                      ) : (
                        <span className="text-xs text-white/60 font-semibold">{item.others}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Key differentiators */}
        <Reveal direction="up" delay={0.3}>
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
              What actually sets me apart
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto text-base">
              It&apos;s not just about technical skills. Here&apos;s what you really get:
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <Reveal key={idx} direction="up" delay={0.1 * (idx + 1)} className="h-full">
                <motion.div
                  className="border-2 border-white/30 rounded-2xl p-7 h-full relative overflow-hidden group cursor-pointer backdrop-blur-md shadow-2xl"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(30, 30, 40, 0.9) 100%)",
                  }}
                  whileHover={{ scale: 1.02, y: -4, borderColor: "rgba(229, 64, 53, 0.5)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onHoverStart={() => setHoveredDiff(idx)}
                  onHoverEnd={() => setHoveredDiff(null)}
                >
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${diff.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    animate={hoveredDiff === idx ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-5 group-hover:bg-accent/30 transition-colors border border-accent/30"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <h4 className="text-xl font-extrabold text-white mb-4 group-hover:text-accent transition-colors">
                      {diff.title}
                    </h4>
                    
                    <p className="text-base text-white leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Final CTA */}
        <Reveal direction="up" delay={0.5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center bg-gradient-to-br from-[#1a1d2e] to-[#252837] backdrop-blur-md rounded-3xl p-10 border-2 border-white/30 shadow-2xl relative z-20"
          >
            <p className="text-white mb-6 max-w-xl mx-auto text-lg font-medium">
              Still on the fence? Let&apos;s have a 15-minute call. I&apos;ll give you honest feedback on your project — even if it means I&apos;m not the right fit.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Schedule a Free Consultation</span>
              <span className="text-xl">→</span>
            </motion.a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyMe;
