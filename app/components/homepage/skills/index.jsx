"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Reveal from "../../reveal";
import { motion } from "framer-motion";

function Skills() {
  // Filter out any empty items from skills data
  const activeSkills = skillsData.filter(Boolean);

  return (
    <section id="skills" className="py-24 border-t border-line section-elevated overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="wrap relative z-10">
        <Reveal direction="up" delay={0.1}>
          <div className="kicker">My Tech Toolkit</div>
          <h2 className="sec-title">Skills &amp; Technologies</h2>
          <p className="sec-subtitle">
            A comprehensive ecosystem of frontend frameworks, backend engines,
            databases, and specialized development tools.
          </p>
        </Reveal>
      </div>

      <div className="w-full mt-14">
        <Marquee
          gradient={true}
          gradientColor={[248, 249, 250]} // matches bg-soft color #F8F9FA
          gradientWidth={100}
          speed={60}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {activeSkills.map((skill, id) => {
            const imgData = skillsImage(skill);
            return (
              <motion.div
                className="w-36 min-w-[140px] m-4 cursor-pointer"
                key={id}
                whileHover={{ scale: 1.08, y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="rounded-xl border border-line glass-card p-5 flex flex-col items-center justify-center gap-3 transition-all hover:border-accent/40 shadow-sm hover:shadow-lg layer-2 group relative overflow-hidden">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center relative z-10">
                    {imgData?.src ? (
                      <Image
                        src={imgData.src}
                        alt={skill}
                        width={44}
                        height={44}
                        className="h-full w-auto object-contain rounded"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded bg-accent-tint flex items-center justify-center font-bold text-accent text-xs">
                        {skill.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <p className="text-ink font-semibold text-xs sm:text-sm text-center truncate w-full relative z-10 group-hover:text-accent transition-colors">
                    {skill}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}

export default Skills;