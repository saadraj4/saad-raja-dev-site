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
export default function AnimatedCounter({ value, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
