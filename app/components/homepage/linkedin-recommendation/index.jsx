"use client";

import { motion } from "framer-motion";
import { FiLinkedin, FiStar, FiExternalLink } from "react-icons/fi";
import { TbQuote } from "react-icons/tb";

const linkedinRecommendations = [
  {
    text: "Saad is one of the most reliable developers I've worked with. He consistently delivered high-quality code ahead of schedule and communicated proactively throughout the project.",
    author: "Jane Doe",
    role: "CTO at Example Co.",
    profileUrl: "https://www.linkedin.com/in/jane-doe-example/",
    highlight: "Reliable & Proactive",
  },
  {
    text: "Working with Saad was a game-changer for our startup. His technical expertise and ability to understand business requirements made our product launch a success.",
    author: "John Smith",
    role: "Founder at TechStart",
    profileUrl: "https://www.linkedin.com/in/john-smith-example/",
    highlight: "Business-Minded Engineer",
  },
  {
    text: "Saad's attention to detail and problem-solving skills are exceptional. He transformed our complex requirements into an elegant, scalable solution.",
    author: "Sarah Johnson",
    role: "Product Manager",
    profileUrl: "https://www.linkedin.com/in/sarah-johnson-example/",
    highlight: "Problem Solver",
  },
];

function LinkedInRecommendations() {
  return (
    <section className="py-24 border-t border-line bg-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#0A66C2]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

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
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center">
                <FiLinkedin className="w-6 h-6 text-[#0A66C2]" />
              </div>
            </motion.div>
            <h2 className="sec-title">LinkedIn Recommendations</h2>
            <p className="sec-subtitle mt-4">
              Verified professional endorsements from colleagues and clients on LinkedIn.
            </p>
          </div>
        </motion.div>

        {/* Recommendations grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {linkedinRecommendations.map((rec, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="h-full"
            >
              <motion.a
                href={rec.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card border border-line rounded-2xl p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden spotlight-hover"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center"
                    >
                      <TbQuote size={20} />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1"
                    >
                      <FiLinkedin size={18} className="text-[#0A66C2] opacity-70 group-hover:opacity-100 transition-opacity" />
                      <FiExternalLink size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] text-xs font-bold mb-4">
                    <FiStar size={12} />
                    {rec.highlight}
                  </div>

                  {/* Recommendation text */}
                  <p className="text-sm text-muted leading-relaxed mb-6 italic">
                    &ldquo;{rec.text}&rdquo;
                  </p>
                </div>

                {/* Author info */}
                <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-line/60">
                  {rec.avatar ? (
                    <img
                      src={rec.avatar}
                      alt={rec.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-line"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-[#0A66C2]/20 flex items-center justify-center text-ink font-bold text-sm border-2 border-line">
                      {rec.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-sm text-ink group-hover:text-accent transition-colors">
                      {rec.author}
                    </div>
                    <div className="text-xs text-muted">{rec.role}</div>
                  </div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLinkedin size={18} />
            <span>View all recommendations on LinkedIn</span>
            <FiExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default LinkedInRecommendations;