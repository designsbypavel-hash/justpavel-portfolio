"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { playClickSound } from "@/lib/sound";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/works", label: "Work" },
  { href: "/youtube", label: "Youtube" },
  { href: "/mentoring", label: "Mentoring" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => {
            playClickSound();
            setOpen(false);
          }}
          className="font-(family-name:--font-heading) text-lg font-extrabold tracking-tight transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
        >
          PAVEL
        </Link>

        <nav className="hidden gap-8 text-sm text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={playClickSound}
              className="relative py-1 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

<button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => {
            playClickSound();
            setOpen((v) => !v);
          }}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    playClickSound();
                    setOpen(false);
                  }}
                  className="flex min-h-[44px] items-center border-b border-white/5 text-base text-white/80 last:border-b-0 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
