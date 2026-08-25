"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
} from "framer-motion";

// Animated number that counts up when scrolled into view
export default function AnimatedCounter({ 
  value, 
  suffix = "", 
  prefix = "", 
  className = "",
  immediate = false // New prop to start animation immediately
}) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    // If immediate is true, start animation right away
    // Otherwise wait for element to be in view
    if (immediate || isInView) {
      motionVal.set(value);
    }
  }, [immediate, isInView, value, motionVal]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
