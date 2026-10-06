"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GameController,
  YoutubeLogo,
  Users,
  User,
  Envelope,
} from "@phosphor-icons/react";
import { playClickSound } from "@/lib/sound";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import SidebarScene from "@/components/SidebarScene";

const W_COLLAPSED = 60;
const W_EXPANDED  = 210;

const navLinks = [
  { href: "/works",     label: "Work",      Icon: Briefcase,      tag: null   },
  { href: "/games",     label: "Games",     Icon: GameController, tag: "Play" },
  { href: "/youtube",   label: "Youtube",   Icon: YoutubeLogo,    tag: null   },
  { href: "/mentoring", label: "Mentoring", Icon: Users,          tag: null   },
  { href: "/about",     label: "About",     Icon: User,           tag: null   },
  { href: "/contact",   label: "Contact",   Icon: Envelope,       tag: null   },
];

export default function SideNav() {
  const pathname    = usePathname();
  const { theme }   = useTheme();
  const [expanded, setExpanded] = useState(false);

  // Keep CSS var in sync so main content margin transitions
  useEffect(() => {
    const w = expanded ? W_EXPANDED : W_COLLAPSED;
    document.documentElement.style.setProperty("--sidebar-w", `${w}px`);
  }, [expanded]);

  if (pathname?.startsWith("/games")) return null;

  const isDark = theme === "dark";
  const w      = expanded ? W_EXPANDED : W_COLLAPSED;

  // ── Theme-aware design tokens ───────────────────────────────────────────
  const T = isDark ? {
    aside:       "bg-black/90 backdrop-blur border-white/10",
    divider:     "border-white/10",
    logo:        "text-white hover:opacity-70",
    navActive:   "bg-white/10 text-white",
    navInactive: "text-white/50 hover:bg-white/5 hover:text-white",
    tagBg:       "rgba(255,180,50,0.18)",
    tagColor:    "#ffb432",
    tagBorder:   "rgba(255,180,50,0.30)",
    tooltip:     "bg-zinc-800 text-white shadow-lg",
    themeLabel:  "text-white/50",
    mobileBg:    "bg-black/90 backdrop-blur border-white/10",
    mobileActive:"text-white",
    mobileBase:  "text-white/40 hover:text-white/80",
    mobileP:     "text-white/60 hover:text-white",
  } : {
    aside:       "bg-white/95 backdrop-blur border-zinc-200",
    divider:     "border-zinc-200",
    logo:        "text-zinc-900 hover:opacity-60",
    navActive:   "bg-zinc-100 text-zinc-900",
    navInactive: "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900",
    tagBg:       "rgba(161,98,7,0.10)",
    tagColor:    "#92400e",
    tagBorder:   "rgba(161,98,7,0.22)",
    tooltip:     "bg-zinc-900 text-white shadow-lg",
    themeLabel:  "text-zinc-400",
    mobileBg:    "bg-white/95 backdrop-blur border-zinc-200",
    mobileActive:"text-zinc-900",
    mobileBase:  "text-zinc-400 hover:text-zinc-600",
    mobileP:     "text-zinc-500 hover:text-zinc-800",
  };

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: w }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed inset-y-0 left-0 z-40 hidden md:flex flex-col border-r overflow-hidden ${T.aside}`}
        style={{ width: w }}
      >
        {/* Logo / wordmark */}
        <Link
          href="/"
          onClick={playClickSound}
          className={`flex h-[60px] shrink-0 items-center overflow-hidden border-b px-[18px] transition-opacity ${T.divider} ${T.logo}`}
          title="Home"
        >
          <span className="font-(family-name:--font-heading) text-base font-extrabold tracking-[0.06em] whitespace-nowrap">
            {expanded ? "PAVEL" : "P"}
          </span>
        </Link>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 px-2 pt-3 flex-1 overflow-hidden">
          {navLinks.map(({ href, label, Icon, tag }) => {
            const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={playClickSound}
                title={expanded ? undefined : label}
                className={`
                  group/item relative flex h-10 items-center gap-3 rounded-lg px-[10px]
                  text-sm transition-colors duration-150
                  ${active ? T.navActive : T.navInactive}
                `}
              >
                <Icon size={20} weight={active ? "fill" : "regular"} className="shrink-0" />

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.span
                      key="label"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.14 }}
                      className="whitespace-nowrap overflow-hidden font-medium"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {tag && expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-auto inline-flex items-center rounded-full px-1.5 py-px text-[9px] font-semibold tracking-wide uppercase leading-none"
                    style={{
                      background: T.tagBg,
                      color:      T.tagColor,
                      border:     `1px solid ${T.tagBorder}`,
                    }}
                  >
                    {tag}
                  </motion.span>
                )}

                {/* Tooltip in collapsed state */}
                {!expanded && (
                  <span
                    className={`pointer-events-none absolute left-[56px] whitespace-nowrap rounded-md px-2 py-1 text-xs opacity-0 transition-opacity group-hover/item:opacity-100 z-50 ${T.tooltip}`}
                  >
                    {label}
                    {tag && (
                      <span className="ml-1.5" style={{ color: T.tagColor }}>{tag}</span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Walking scene */}
        <SidebarScene expanded={expanded} />

        {/* Bottom: theme toggle */}
        <div className={`shrink-0 border-t px-2 py-3 ${T.divider}`}>
          <div className={`flex h-10 items-center gap-3 rounded-lg px-[10px] ${expanded ? "" : "justify-center"}`}>
            <ThemeToggle />
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.span
                  key="theme-label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.14 }}
                  className={`text-sm font-medium whitespace-nowrap ${T.themeLabel}`}
                >
                  Theme
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ── Mobile bottom tab bar ──────────────────────────────────────────── */}
      <nav className={`fixed bottom-0 inset-x-0 z-40 flex md:hidden border-t ${T.mobileBg}`}>
        <Link
          href="/"
          onClick={playClickSound}
          className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${T.mobileP}`}
        >
          <span className="font-(family-name:--font-heading) text-sm font-extrabold tracking-[0.06em]">P</span>
        </Link>

        {navLinks.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={playClickSound}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                active ? T.mobileActive : T.mobileBase
              }`}
            >
              <Icon size={20} weight={active ? "fill" : "regular"} />
              <span className="text-[9px] tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
