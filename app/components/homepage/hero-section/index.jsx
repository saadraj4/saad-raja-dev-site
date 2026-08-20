"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import AnimatedText from "../../motion/animated-text";
import AnimatedCounter from "../../motion/animated-counter";
import {
  staggerContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleUp,
  popIn,
  viewportOnce,
} from "../../motion/variants";

const metrics = [
  {
    value: 3,
    suffix: "+",
    label: "Years Shipping",
    sub: "Production web & cloud systems",
  },
  {
    value: 10,
    suffix: "+",
    label: "Projects Delivered",
    sub: "UAE, UK & Pakistan clients",
  },
  {
    value: 100,
    suffix: "%",
    label: "Full-Stack Ownership",
    sub: "Blank repo to deployed architecture",
  },
];

function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <header className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-accent/5 blur-[120px] -z-10 pointer-events-none"
        aria-hidden="true"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[60%] right-0 w-[400px] h-[400px] bg-accent/3 blur-[100px] -z-10 pointer-events-none rounded-full"
        aria-hidden="true"
        animate={
          reduced
            ? {}
            : {
                x: [0, 30, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -80 - i * 20],
              x: [0, (i % 2 === 0 ? 1 : -1) * 15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="wrap">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="show"
        >
          {/* Kicker badge — pops in */}
          <motion.div
            variants={popIn(0)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-tint border border-accent-border text-accent text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Outcome First Engineering
          </motion.div>

          {/* Title — character-by-character reveal with enhanced styling */}
          <motion.h1
            variants={fadeUp(0.05)}
            className="text-4xl sm:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight text-ink max-w-[860px] relative"
          >
            <AnimatedText text="You bring the problem." />
            <br />
            <span className="inline-block relative">
              <AnimatedText text="I bring the" />{" "}
              <motion.span
                className="relative inline-block"
                initial={{ backgroundSize: "0% 3px" }}
                animate={{ backgroundSize: "100% 3px" }}
                transition={{ duration: 1.2, delay: 1 }}
              >
                <span className="text-accent relative inline-block">
                  <AnimatedText text="working product." />
                  {/* Animated emphasis effect */}
                  <motion.span
                    className="absolute -inset-2 bg-accent/10 -z-10 rounded-lg blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent/30 via-accent/50 to-accent/30 -z-20 blur-sm"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle — slides from left */}
          <motion.p
            variants={fadeLeft(0.3)}
            className="text-lg sm:text-xl leading-relaxed text-muted max-w-[620px] mt-7 font-normal"
          >
            I build and ship web applications end to end — no half-finished
            handoffs, no &ldquo;it works on my machine.&rdquo; You describe what
            you need; I turn it into something live, tested, and actively used.
          </motion.p>

          {/* CTA buttons with stagger */}
          <motion.div
            variants={fadeUp(0.45)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="#contact" className="btn-primary group">
              <span>Tell me about your project</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FiArrowRight size={16} />
              </motion.span>
            </Link>
            <Link href="#work" className="btn-secondary group">
              <span>See what I&apos;ve built</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Proof metrics with animated counters and trust indicators */}
        <motion.div
          className="mt-16 pt-8 border-t border-line relative"
          variants={staggerContainer(0.1, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-6 flex items-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-2 text-xs text-muted">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
              <span className="font-semibold">Available for new projects</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="text-lg">⚡</span>
              <span>Avg. response time: <span className="font-bold text-ink">2 hours</span></span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="text-lg">🌍</span>
              <span>Remote-ready · <span className="font-bold text-ink">UTC+5</span></span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp(0)}
                className="metric-card flex items-start gap-3.5 p-4 rounded-xl bg-bg-soft/60 border border-line/60 group relative overflow-hidden"
                whileHover={{ y: -3, borderColor: "rgba(229,64,53,0.25)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />
                
                <motion.div
                  className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5 relative z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheckCircle size={16} />
                </motion.div>
                <div className="relative z-10">
                  <div className="text-2xl font-extrabold text-ink tracking-tight">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </div>
                  <div className="text-sm font-bold text-ink">{m.label}</div>
                  <div className="text-xs text-muted mt-0.5">{m.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default HeroSection;