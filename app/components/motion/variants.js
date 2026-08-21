// Shared Framer Motion animation variants & utilities - Optimized for performance

// Stagger container: wraps children that animate sequentially
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Fade up (default reveal) - Reduced distance and duration
export const fadeUp = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// Fade in from left - Reduced distance
export const fadeLeft = (delay = 0, distance = 30) => ({
  hidden: { opacity: 0, x: -distance },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// Fade in from right - Reduced distance
export const fadeRight = (delay = 0, distance = 30) => ({
  hidden: { opacity: 0, x: distance },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// Scale up (optimized)
export const scaleUp = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// Blur in - Simple fade only (no actual blur filter)
export const blurIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  },
});

// Draw line / width grow
export const lineGrow = (delay = 0) => ({
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// Pop in (for icons, badges) - Reduced spring intensity
export const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      delay,
    },
  },
});

// Character-level text animation variant (parent) - Faster stagger
export const textContainer = (stagger = 0.015) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

// Character-level text animation variant (child) - Reduced distance
export const textChar = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Hover tilt spring config - Reduced intensity
export const tiltSpring = { type: "spring", stiffness: 300, damping: 20 };

// Viewport config for whileInView - More aggressive threshold
export const viewportOnce = { once: true, margin: "0px 0px -100px 0px", amount: 0.2 };

