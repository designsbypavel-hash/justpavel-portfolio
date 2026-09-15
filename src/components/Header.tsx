"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { playClickSound } from "@/lib/sound";
import { useTheme } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/works", label: "Work" },
  { href: "/games", label: "Games", tag: "Play" },
  { href: "/youtube", label: "Youtube" },
  { href: "/mentoring", label: "Mentoring" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  // /games is a full-bleed embed of a standalone app (Glow Rush) - it owns
  // its own chrome, so the site header would just be duplicate navigation
  // sitting on top of a game HUD that already has its own controls.
  if (pathname?.startsWith("/games")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <style>{`
        @keyframes hdr-tag-breathe {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.04); }
        }
        .hdr-nav-tag {
          animation: hdr-tag-breathe 2.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hdr-nav-tag { animation: none; }
        }
      `}</style>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => {
            playClickSound();
            setOpen(false);
          }}
          className="font-(family-name:--font-heading) text-lg font-extrabold tracking-[0.06em] transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
        >
          PAVEL
        </Link>

        <nav className="hidden gap-8 text-sm text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={playClickSound}
              className="relative flex items-center gap-1.5 py-1 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:w-full"
            >
              {link.label}
              {link.tag && (
                <span
                  className="hdr-nav-tag inline-flex items-center rounded-full px-1.5 py-px text-[9px] font-semibold tracking-wide uppercase leading-none"
                  style={{
                    background: "rgba(255,180,50,0.18)",
                    color: "#ffb432",
                    border: "1px solid rgba(255,180,50,0.30)",
                  }}
                >
                  {link.tag}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Theme toggle — desktop */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>

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
              <div className="flex items-center justify-between border-b border-white/5 py-3">
                <span className="text-sm text-white/50">Theme</span>
                <ThemeToggle />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    playClickSound();
                    setOpen(false);
                  }}
                  className="flex min-h-[44px] items-center gap-2 border-b border-white/5 text-base text-white/80 last:border-b-0 hover:text-white"
                >
                  {link.label}
                  {link.tag && (
                    <span
                      className="hdr-nav-tag inline-flex items-center rounded-full px-1.5 py-px text-[9px] font-semibold tracking-wide uppercase leading-none"
                      style={{
                        background: "rgba(255,180,50,0.18)",
                        color: "#ffb432",
                        border: "1px solid rgba(255,180,50,0.30)",
                      }}
                    >
                      {link.tag}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
