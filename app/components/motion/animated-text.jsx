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
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          className="inline-block"
          variants={textContainer(0.025)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          style={{ marginRight: "0.3em" }}
        >
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={textChar}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </Tag>
  );
}
