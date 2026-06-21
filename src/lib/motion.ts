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
  rest: { y: 0, scale: 1, boxShadow: "0 0px 0px 0 rgba(0,0,0,0)" },
  hover: {
    y: -4,
    scale: 1.01,
    boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5)",
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
