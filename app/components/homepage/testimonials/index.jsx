"use client";

import React from "react";
import { motion } from "framer-motion";
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
  { icon: "🚀", label: "10+ Projects", sublabel: "Delivered" },
];

const stats = [
  { id: 1, value: "100%", label: "Job Success Score" },
  { id: 2, value: "<24h", label: "Typical Response" },
];

function Testimonials() {
  return (
    <section className="py-24 border-t border-line bg-gradient-to-br from-white via-bg-soft/30 to-white overflow-hidden relative">
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
          <div className="flex justify-center gap-6 mb-16 flex-wrap">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 px-5 py-3 glass-card rounded-full border border-line shadow-sm"
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-ink">{item.label}</div>
                  <div className="text-xs text-muted">{item.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials_review.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="h-full"
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

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-5 glass-card rounded-2xl border border-line">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.id}>
                {index > 0 && <div className="w-px h-12 bg-line"></div>}
                <div>
                  <div className="text-2xl font-extrabold text-ink">{stat.value}</div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;