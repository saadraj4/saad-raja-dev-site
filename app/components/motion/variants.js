// Shared Framer Motion animation variants & utilities

// Stagger container: wraps children that animate sequentially
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Fade up (default reveal)
export const fadeUp = (delay = 0, duration = 0.6) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Fade in from left
export const fadeLeft = (delay = 0, distance = 50) => ({
  hidden: { opacity: 0, x: -distance },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Fade in from right
export const fadeRight = (delay = 0, distance = 50) => ({
  hidden: { opacity: 0, x: distance },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Scale up (optimized, no expensive CSS blur filter)
export const scaleUp = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Blur in only (optimized to clean fade-in to bypass expensive GPU blurs)
export const blurIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  },
});

// Draw line / width grow
export const lineGrow = (delay = 0) => ({
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

// Pop in (for icons, badges)
export const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay,
    },
  },
});

// Character-level text animation variant (parent)
export const textContainer = (stagger = 0.02) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

// Character-level text animation variant (child)
export const textChar = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hover tilt spring config
export const tiltSpring = { type: "spring", stiffness: 400, damping: 25 };

// Viewport config for whileInView
export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" };
