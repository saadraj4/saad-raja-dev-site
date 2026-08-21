"use client";

import { motion, useReducedMotion } from "framer-motion";
import { textContainer, textChar, viewportOnce } from "./variants";

// Splits text into words, each word into characters, for staggered reveal
export default function AnimatedText({
  text,
  className = "",
  as = "span",
  wordDelay = 0,
}) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] || motion.span;

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag
      className={className}
      aria-label={text}
      variants={textContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          className="inline-block"
          variants={textChar}
          style={{ marginRight: "0.25em", willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
