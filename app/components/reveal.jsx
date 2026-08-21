"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleUp,
  blurIn,
  popIn,
  viewportOnce,
} from "./motion/variants";

const variantMap = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleUp,
  blur: blurIn,
  pop: popIn,
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  direction = "up",
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;
  const getVariant = variantMap[direction] || fadeUp;
  const variant = getVariant(delay);

  // Disable animations for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>;
  }

  return (
    <MotionComponent
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionComponent>
  );
}
