"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GradientWordLoop from "@/components/GradientWordLoop";
import GlowCard from "@/components/GlowCard";
import { useTheme } from "@/components/ThemeProvider";

const heroStats = [
  {
    value: "350M+",
    company: "SonyLIV",
    description: "Users reached through a cross-platform design system across web, mobile, and TV.",
  },
  {
    value: "20%",
    company: "AWTG · Aruva AI",
    description: "Faster delivery across discovery, prototyping, and handoff for an enterprise AI platform.",
  },
  {
    value: "75%",
    company: "HighRadius",
    description: "Faster receivables recovery through AI-driven workflow redesign.",
  },
];

export default function Hero() {
  const { theme } = useTheme();
  const L = theme === "light";

  return (
    <section className="px-6 pt-24 pb-20">
      <div className="mx-auto max-w-6xl">

        {/* Identity pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Pavel Mondal · Senior Product Designer · London · 8 years
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-6 font-(family-name:--font-heading) text-[42px]! font-extrabold leading-[1.05] sm:text-[56px]! md:text-[76px]!"
        >
          <GradientWordLoop />{" "}
          <span className="text-white/90">for clarity.</span>
          <br />
          <span className="text-white/90">Measured by impact.</span>
        </motion.h1>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-xl text-lg leading-relaxed text-white/55"
        >
          I design products that remove friction and drive measurable results —
          from AI enterprise platforms to consumer apps with 350M+ users.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 flex flex-wrap gap-3"
        >
          <Link
            href="/works"
            style={{
              background: L ? "#111111" : "#ffffff",
              color: L ? "#ffffff" : "#000000",
            }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity duration-300 hover:opacity-75"
          >
            View work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/about"
            style={{
              border: `1px solid ${L ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.20)"}`,
              color: L ? "rgba(17,17,17,0.70)" : "rgba(255,255,255,0.75)",
            }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity duration-300 hover:opacity-70"
          >
            About me
          </Link>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-stretch gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat, i) => (
            <motion.div key={stat.value} variants={fadeInUp} className="h-full">
              <GlowCard delay={i * 3.5} className="flex h-full flex-col rounded-2xl p-6">
                <div
                  className="mb-1 font-(family-name:--font-heading) text-4xl font-extrabold"
                  style={{ color: L ? "#0d0d0d" : "#ffffff" }}
                >
                  {stat.value}
                </div>
                <div
                  className="mb-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)" }}
                >
                  {stat.company}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.55)" }}
                >
                  {stat.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
