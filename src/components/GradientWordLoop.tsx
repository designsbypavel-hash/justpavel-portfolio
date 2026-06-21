"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gradientWordLoop } from "@/lib/motion";

const WORDS = [
  "Product Design",
  "UX Strategy",
  "AI Platforms",
  "Design Systems",
  "Human-Centred UX",
];

export default function GradientWordLoop({ intervalMs = 3000 }: { intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <span className="relative inline-block min-w-[1ch] align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          variants={gradientWordLoop}
          initial="initial"
          animate="animate"
          exit="exit"
          className="gradient-text-loop inline-block whitespace-nowrap"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
