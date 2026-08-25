"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { TbQuote } from "react-icons/tb";

const testimonials_review = [
  {
    text: "Saad delivered exactly what we needed. The platform handles hundreds of users daily with zero downtime. His attention to detail and proactive communication made the entire process smooth.",
    author: "Client Review",
    role: "Startup Founder",
    platform: "Upwork",
    rating: 5,
    highlight: "Production-Ready Quality",
  },
  {
    text: "What impressed me most was the speed. He understood our requirements immediately and delivered a working prototype within days, not weeks. The final product exceeded expectations.",
    author: "Project Stakeholder",
    role: "Product Manager",
    platform: "Direct Client",
    rating: 5,  
    highlight: "Fast Execution",
  },
  {
    text: "Beyond just coding - he thought through the user experience, suggested improvements we hadn't considered, and delivered a polished product that our customers love.",
    author: "Business Owner",
    role: "E-commerce",
    platform: "Fiverr",
    rating: 5,
    highlight: "Strategic Thinking",
  },
];

const achievements = [
  { icon: "🏆", label: "Top Rated", sublabel: "Upwork" },
  { icon: "⭐", label: "5.0 Rating", sublabel: "Client Feedback" },
  { icon: "✅", label: "100% Success", sublabel: "Project Completion" },
  { icon: "🚀", label: "20+ Projects", sublabel: "Delivered" },
];

const stats = [
  { id: 1, value: 100, label: "Job Success Score", icon: "📈", suffix: "%", prefix: "" },
  { id: 2, value: 15, label: "Happy Clients", icon: "😊", suffix: "+", prefix: "" },
  { id: 3, value: 24, label: "Response Time", icon: "⚡", suffix: "h", prefix: "<", showPrefix: true },
  { id: 4, value: 5.0, label: "Average Rating", icon: "⭐", suffix: "", prefix: "", decimal: true },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", prefix = "", decimal = false, showPrefix = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 60, 
    stiffness: 100,
    duration: 2 
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(decimal ? latest.toFixed(1) : Math.round(latest));
    });
  }, [springValue, decimal]);

  return (
    <span ref={ref}>
      {showPrefix && prefix}{displayValue}{suffix}
    </span>
  );
}

function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef(null);

  // Track scroll position to update active dot
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // 85vw width
      const currentIndex = Math.round(scrollLeft / cardWidth);
      setActiveSlide(currentIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-12 border-t border-line bg-gradient-to-br from-white via-bg-soft/30 to-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="wrap relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1 mb-4"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <FiStar className="w-6 h-6 text-accent fill-accent" />
                </motion.div>
              ))}
            </motion.div>
            <h2 className="sec-title">Trusted by clients who value results</h2>
            <p className="sec-subtitle mt-4">
              Don&apos;t just take my word for it. Here&apos;s what people say after working with me.
            </p>
          </div>
        </motion.div>

        {/* Achievement badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:flex md:justify-center md:flex-wrap gap-3 md:gap-4 mb-12 md:mb-16 max-w-4xl mx-auto">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 glass-card rounded-full border border-line shadow-sm"
              >
                <span className="text-xl md:text-2xl flex-shrink-0">{item.icon}</span>
                <div className="text-left min-w-0">
                  <div className="text-xs md:text-sm font-bold text-ink truncate">{item.label}</div>
                  <div className="text-[10px] md:text-xs text-muted truncate">{item.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials grid - Desktop grid, Mobile carousel */}
        <div className="md:grid md:grid-cols-3 md:gap-6 mb-12 md:mb-16">
          {/* Mobile: Horizontal scroll container */}
          <div className="md:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1 -mx-4"
            >
              {testimonials_review.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="flex-shrink-0 w-[85vw] snap-center first:ml-4 last:mr-4"
                >
                  <motion.div
                    className="glass-card border border-line rounded-2xl p-6 h-full flex flex-col justify-between spotlight-hover group cursor-pointer relative overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      {/* Quote icon */}
                      <motion.div
                        whileHover={{ rotate: 180, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4"
                      >
                        <TbQuote size={20} />
                      </motion.div>

                      {/* Rating stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="w-4 h-4 text-accent fill-accent" />
                        ))}
                      </div>

                      {/* Highlight badge */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-tint border border-accent-border text-accent text-xs font-bold mb-4">
                        {testimonial.highlight}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-sm text-muted leading-relaxed mb-6 italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                    </div>

                    {/* Author info */}
                    <div className="relative z-10 pt-4 border-t border-line/60">
                      <div className="font-bold text-sm text-ink">{testimonial.author}</div>
                      <div className="text-xs text-muted">{testimonial.role}</div>
                      <div className="text-xs text-accent font-semibold mt-1">
                        via {testimonial.platform}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials_review.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    const container = scrollContainerRef.current;
                    if (container) {
                      const cardWidth = container.offsetWidth * 0.85;
                      container.scrollTo({
                        left: cardWidth * idx,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === idx 
                      ? 'w-8 h-2 bg-accent' 
                      : 'w-2 h-2 bg-line hover:bg-accent/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          {testimonials_review.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="h-full hidden md:block"
            >
              <motion.div
                className="glass-card border border-line rounded-2xl p-6 h-full flex flex-col justify-between spotlight-hover group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4"
                  >
                    <TbQuote size={20} />
                  </motion.div>

                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-tint border border-accent-border text-accent text-xs font-bold mb-4">
                    {testimonial.highlight}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-sm text-muted leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Author info */}
                <div className="relative z-10 pt-4 border-t border-line/60">
                  <div className="font-bold text-sm text-ink">{testimonial.author}</div>
                  <div className="text-xs text-muted">{testimonial.role}</div>
                  <div className="text-xs text-accent font-semibold mt-1">
                    via {testimonial.platform}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators - Premium Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 relative"
        >
          {/* Sophisticated background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-blue-500/5 to-purple-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12 md:mb-14">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-4"
              >
                <span className="text-lg md:text-xl">📊</span>
                <span className="text-xs md:text-sm font-semibold text-accent uppercase tracking-wider">Impact Metrics</span>
              </motion.div>
              
              <motion.h3 
                className="text-2xl md:text-4xl font-black text-ink mb-3 leading-tight px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Results That{" "}
                <span className="bg-gradient-to-r from-accent via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Matter
                </span>
              </motion.h3>
              
              <motion.p 
                className="text-sm md:text-base text-muted max-w-2xl mx-auto px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                These aren&apos;t just numbers—they&apos;re a testament to quality, reliability, and client satisfaction
              </motion.p>
            </div>

            {/* Stats Grid with Unique Design */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.15 * index, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-default relative"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Main Card */}
                  <div className="relative h-full bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-5 md:p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    
                    {/* Top decorative line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + (0.1 * index), duration: 0.8 }}
                    />
                    
                    {/* Mesh gradient background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                    </div>
                    
                    {/* Sparkle effects */}
                    <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-accent rounded-full"
                          style={{
                            left: `${20 + i * 25}%`,
                            top: `${25 + (i % 2) * 35}%`,
                          }}
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon with circular background */}
                      <div className="mb-3 md:mb-4">
                        <motion.div
                          className="relative inline-block"
                          whileHover={{ 
                            rotate: [0, -15, 15, -15, 0],
                            transition: { duration: 0.6 }
                          }}
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: index * 0.3,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-blue-500/30 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-xl text-2xl md:text-3xl border border-accent/20">
                            {stat.icon}
                          </div>
                        </motion.div>
                      </div>
                      
                      <motion.div
                        className="mb-2 flex-grow flex items-center"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.3 + (0.1 * index),
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-none tracking-tight">
                          <AnimatedCounter 
                            value={stat.value} 
                            suffix={stat.suffix} 
                            prefix={stat.prefix}
                            decimal={stat.decimal}
                            showPrefix={stat.showPrefix}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Label */}
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (0.1 * index) }}
                      >
                        <div className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider leading-tight">
                          {stat.label}
                        </div>
                        
                        {/* Animated underline */}
                        <motion.div
                          className="h-0.5 bg-gradient-to-r from-accent to-blue-500 mt-1.5"
                          initial={{ width: 0 }}
                          whileInView={{ width: "50%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + (0.1 * index), duration: 0.8 }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Corner decoration */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent/5 to-transparent rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Tagline */}
            <motion.div
              className="text-center mt-10 md:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs md:text-sm text-muted italic px-4">
                Real performance. Real results. Real impact on your business.
              </p>
            </motion.div>

            {/* Floating ambient particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    left: `${5 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(var(--accent-rgb), 0.4)' : 'rgba(59, 130, 246, 0.4)'} 0%, transparent 70%)`,
                  }}
                  animate={{
                    y: [-30, -80, -30],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;