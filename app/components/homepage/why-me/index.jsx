"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiX, FiZap, FiShield, FiTrendingUp, FiClock, FiAward, FiTarget } from "react-icons/fi";
import Reveal from "../../reveal";

const keyBenefits = [
  {
    icon: FiZap,
    title: "Ship Faster",
    value: "3-5 Days",
    description: "From idea to MVP",
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
  {
    icon: FiShield,
    title: "Built to Last",
    value: "99.9%",
    description: "Uptime guaranteed",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    icon: FiTarget,
    title: "ROI Focused",
    value: "100%",
    description: "Business first",
    gradient: "from-green-500 via-emerald-500 to-lime-500",
  },
  {
    icon: FiAward,
    title: "Top Quality",
    value: "5.0★",
    description: "Client rating",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
];

const differentiators = [
  {
    icon: FiZap,
    title: "Speed Without Shortcuts",
    desc: "I ship fast because I've solved these problems before. Your project benefits from battle-tested patterns and proven architectures.",
  },
  {
    icon: FiShield,
    title: "Production-Ready Code",
    desc: "Every feature is built thinking about scale, security, and maintenance. No technical debt, no \"we'll fix it later\" compromises.",
  },
  {
    icon: FiTrendingUp,
    title: "Business Thinking",
    desc: "I don't just code features—I help validate ideas, prioritize what moves the needle, and maximize your development budget.",
  },
  {
    icon: FiClock,
    title: "Time Zone Advantage",
    desc: "UTC+5 means overnight progress. You go to sleep with a question, wake up with solutions and working features.",
  },
];

const comparisons = [
  { label: "End-to-end ownership", you: true, others: false },
  { label: "Production deployment", you: true, others: false },
  { label: "Post-launch support", you: true, others: false },
  { label: "Performance optimization", you: true, others: false },
  { label: "Clean, maintainable code", you: true, others: "Sometimes" },
  { label: "Timeline transparency", you: true, others: false },
];

function WhyMe() {
  return (
    <section className="py-12 border-t border-line bg-gradient-to-b from-ink to-ink-light text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="wrap relative z-10">
        {/* Hero Section */}
        <Reveal direction="up" delay={0.1}>
          <div className="text-center max-w-4xl mx-auto mb-12 px-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent via-orange-500 to-yellow-500 flex items-center justify-center text-4xl shadow-2xl shadow-accent/50">
                ⚡
              </div>
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Why Choose Me?
            </h2>
            
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed font-medium">
              A technical partner who moves as fast as you think
            </p>
          </div>
        </Reveal>

        {/* Key Metrics - Compact */}
        <Reveal direction="up" delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-12 px-4">
            {keyBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="relative group cursor-default"
                >
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-accent/50 transition-all duration-300">
                    {/* Gradient glow on hover - removed white overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className={`text-2xl md:text-3xl font-black mb-1 bg-gradient-to-br ${benefit.gradient} bg-clip-text text-transparent`}>
                        {benefit.value}
                      </div>
                      
                      <div className="text-xs font-bold text-white mb-0.5">
                        {benefit.title}
                      </div>
                      
                      <div className="text-[10px] text-white/50">
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* Comparison Table - Better Version */}
        <Reveal direction="up" delay={0.3}>
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-black mb-2">
                Me vs Others
              </h3>
              <p className="text-white/60 text-sm">
                See the difference for yourself
              </p>
            </div>

            {/* Desktop Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="hidden sm:block bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/10 bg-black/20">
                <div className="text-sm font-bold text-white/40"></div>
                <div className="text-center">
                  <div className="text-base font-black text-white">Me</div>
                  <div className="text-[10px] text-green-400 font-semibold mt-0.5">✓ Full Stack</div>
                </div>
                <div className="text-center">
                  <div className="text-base font-black text-white/50">Others</div>
                  <div className="text-[10px] text-white/30 mt-0.5">Generic</div>
                </div>
              </div>

              {/* Comparison rows */}
              <div className="divide-y divide-white/5">
                {comparisons.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="grid grid-cols-3 gap-4 p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm text-white/70 font-medium flex items-center">
                      {item.label}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.you === true ? (
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-6 h-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                        >
                          <FiCheck className="text-green-400 w-4 h-4" />
                        </motion.div>
                      ) : (
                        <span className="text-xs text-white/50 font-semibold">{item.you}</span>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.others === false ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center"
                        >
                          <FiX className="text-red-400 w-4 h-4" />
                        </motion.div>
                      ) : (
                        <span className="text-xs text-white/50 font-semibold">{item.others}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Table - Same as Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
            >
              {/* Mobile Table header */}
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-2 p-3 border-b border-white/10 bg-black/20">
                <div className="text-xs font-bold text-white/40"></div>
                <div className="text-center">
                  <div className="text-sm font-black text-white">Me</div>
                  <div className="text-[9px] text-green-400 font-semibold mt-0.5">✓ Full</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-black text-white/50">Others</div>
                  <div className="text-[9px] text-white/30 mt-0.5">Generic</div>
                </div>
              </div>

              {/* Mobile Comparison rows */}
              <div className="divide-y divide-white/5">
                {comparisons.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    className="grid grid-cols-[2fr_1fr_1fr] gap-2 p-3"
                  >
                    <div className="text-xs text-white/70 font-medium flex items-center leading-tight">
                      {item.label}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.you === true ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                          <FiCheck className="text-green-400 w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-xs text-white/50 font-semibold">{item.you}</span>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {item.others === false ? (
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                          <FiX className="text-red-400 w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-xs text-white/50 font-semibold">{item.others}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* How I'm Different - Compact */}
        <Reveal direction="up" delay={0.4}>
          <div className="max-w-5xl mx-auto mb-12 px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-black mb-2">
                How I Work Differently
              </h3>
              <p className="text-white/60 text-sm">
                Not just another freelancer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {differentiators.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-accent/50 transition-all duration-300 h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border border-accent/20 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-accent" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-black text-white mb-2 group-hover:text-accent transition-colors">
                              {diff.title}
                            </h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {diff.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Strong CTA - Compact */}
        <Reveal direction="up" delay={0.5}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center px-4"
          >
            <div className="relative bg-gradient-to-br from-accent via-orange-500 to-yellow-500 rounded-2xl p-0.5 shadow-2xl">
              <div className="bg-gradient-to-br from-[#1a1d2e] to-[#252837] rounded-[14px] p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                  Ready to Ship Something Great?
                </h3>
                
                <p className="text-white/70 text-sm md:text-base mb-6 max-w-xl mx-auto">
                  Let's talk about your project. I'll give you honest feedback—no BS, no hard sell.
                </p>
                
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Let's Talk</span>
                  <motion.span 
                    className="text-xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
                
                <p className="text-white/40 text-xs mt-4">
                  Free consultation • No commitment • Honest advice
                </p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default WhyMe;
