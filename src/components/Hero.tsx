"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GlowCard from "@/components/GlowCard";
import { useTheme } from "@/components/ThemeProvider";

const PHRASES = ["Problem solver.", "Systems thinker.", "Product designer."];

const heroStats = [
  {
    value: "350M+",
    description: "Contributed to a cross-platform design system at SonyLIV supporting 350M+ users across web, mobile, and TV.",
    logo: "/site-assets/logos/sonyliv.png",
    logoAlt: "SonyLIV",
  },
  {
    value: "20%",
    description: "Led end-to-end UX for an enterprise AI platform (Kai) at AWTG, reducing delivery time by 20% across discovery, prototyping, and delivery.",
    logo: "/site-assets/logos/awtg.png",
    logoAlt: "AWTG Kai",
  },
  {
    value: "75%",
    description: "Designed AI-driven workflows at HighRadius enabling 75% faster receivables recovery.",
    logo: "/site-assets/logos/highradius.png",
    logoAlt: "HighRadius",
  },
];

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhraseIdx(i => (i + 1) % PHRASES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Top row: headline + intro left, photo right */}
        <div className="mb-14 flex items-center justify-between gap-10">
          <div>
            <h1 className="font-(family-name:--font-heading) text-[38px]! font-bold leading-[1.12] tracking-[0.01em] sm:text-[48px]! md:text-[64px]!">
              {/* Static anchor line */}
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block" }}
              >
                I&rsquo;m Pavel.
              </motion.span>

              {/* Cycling phrase — same line, fades in/out, animated gradient */}
              <span style={{ display: "block", minHeight: "1.12em" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={PHRASES[phraseIdx]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-cycle-gradient"
                    style={{ display: "block" }}
                  >
                    {PHRASES[phraseIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Intro line — sits directly under headline */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: isLight ? "rgba(17,17,17,0.55)" : "rgba(255,255,255,0.55)" }}
            >
              Right now, I&rsquo;m leading UX for{" "}
              <a
                href="https://awtg.ai/home-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-70"
                style={{ color: "inherit" }}
              >
                Kai at AWTG
              </a>
              , an enterprise AI platform that helps teams build and validate AI assistants before they go live.
            </motion.p>
          </div>

          {/* Polaroid with ambient glow */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="hidden shrink-0 md:block"
            style={{ position: "relative" }}
          >
            {/* Animated ambient glow behind the polaroid — styles in globals.css */}
            <div
              className="polaroid-glow"
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: 8,
                zIndex: 0,
              }}
            />
            {/* Polaroid frame */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: "white",
                padding: "10px 10px 44px 10px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.30)",
                borderRadius: 2,
              }}
            >
              <div className="relative overflow-hidden" style={{ width: 260, height: 320 }}>
                <Image
                  src="/site-assets/about-lens/headshot-new.jpg"
                  alt="Pavel Mondal"
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                />
              </div>
            </div>
          </motion.div>
        </div>

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
                {/* Top row: stat + logo aligned on same baseline */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="font-(family-name:--font-heading) text-5xl font-extrabold leading-none tracking-[0.02em]" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {stat.value}
                  </div>
                  {/* Logo badge — frosted pill so any logo reads on dark */}
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      background: "var(--surface-pill)",
                      padding: "8px",
                      width: 52,
                      height: 52,
                    }}
                  >
                    <Image
                      src={stat.logo}
                      alt={stat.logoAlt}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm text-white/60">{stat.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
