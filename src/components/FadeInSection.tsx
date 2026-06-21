"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { sectionReveal } from "@/lib/motion";

export default function FadeInSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionReveal}
      className={className}
    >
      {children}
    </motion.div>
  );
}
