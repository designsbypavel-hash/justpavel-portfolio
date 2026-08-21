"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GlowCard from "@/components/GlowCard";

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
  return (
    <section className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Top row: headline left, photo right */}
        <div className="mb-14 flex items-center justify-between gap-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-(family-name:--font-heading) text-[38px]! font-bold leading-[1.06] tracking-[-0.025em] sm:text-[48px]! md:text-[64px]!"
          >
            Pavel is a designer
            <br />
            who builds.
          </motion.h1>

          {/* Polaroid with ambient glow */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="hidden shrink-0 md:block"
            style={{ position: "relative" }}
          >
            {/* Animated ambient glow behind the polaroid */}
            <style>{`
              @keyframes ambientShift {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .polaroid-glow {
                animation: ambientShift 6s ease infinite;
                background: linear-gradient(
                  135deg,
                  #c084fc,
                  #818cf8,
                  #38bdf8,
                  #34d399,
                  #fb923c,
                  #f472b6,
                  #c084fc
                );
                background-size: 300% 300%;
                filter: blur(28px);
                opacity: 0.55;
              }
            `}</style>
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
                  <div className="font-(family-name:--font-heading) text-5xl font-extrabold tracking-tight leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {stat.value}
                  </div>
                  {/* Logo badge — frosted pill so any logo reads on dark */}
                  <div
                    className="shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.10)",
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
