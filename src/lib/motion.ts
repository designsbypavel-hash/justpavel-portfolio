import type { Variants, Transition } from "framer-motion";

export const premiumEase: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.015,
    transition: { duration: 0.4, ease: premiumEase },
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.4, ease: premiumEase },
  },
  tap: { scale: 0.98 },
};

// Page-level transition — used by PageTransition component in layout
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(3px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.28, ease: [0.36, 0, 0.66, 0] },
  },
};

export const gradientWordLoop: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.5, ease: premiumEase },
  },
};
