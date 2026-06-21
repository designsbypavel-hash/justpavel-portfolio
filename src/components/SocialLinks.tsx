"use client";

import { motion } from "framer-motion";
import { buttonHover } from "@/lib/motion";

const links = [
  { href: "https://adplist.org/mentors/pavel-mondal", label: "Mentoring (ADPList)" },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          animate="rest"
          variants={buttonHover}
          className="flex h-9 w-9 items-center justify-center rounded border border-white/30 text-white/70 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/60 hover:text-white"
          aria-label={link.label}
        >
          in
        </motion.a>
      ))}
    </div>
  );
}
