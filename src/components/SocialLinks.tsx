"use client";

import { motion } from "framer-motion";
import { buttonHover } from "@/lib/motion";

const links = [
  {
    href: "https://bsky.app/profile/paveldesign.bsky.social",
    label: "Bluesky",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.276-.038.418-.058-.138.022-.277.04-.418.058-3.953.59-7.426 2.04-2.845 7.587 5.18 5.916 7.11-1.272 8.146-2.972.106-.176.179-.293.221-.359.045.066.117.183.222.36 1.035 1.7 2.967 8.887 8.148 2.97 4.58-5.547 1.107-6.996-2.845-7.587a8.183 8.183 0 0 1-.42-.058c.142.02.282.038.42.058 2.668.296 5.567-.628 6.383-3.364.246-.83.624-5.79.624-6.479 0-.687-.139-1.86-.902-2.203-.659-.299-1.664-.62-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8Z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@DesignWithPavel",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/paveldesign/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-3">
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
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
}
