"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </MotionComponent>
  );
}
