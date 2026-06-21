"use client";

import { motion } from "framer-motion";
import { buttonHover } from "@/lib/motion";

export default function CTASection({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        animate="rest"
        variants={buttonHover}
        className="flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-black hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.25)]"
      >
        {label}
      </motion.a>
    </div>
  );
}
