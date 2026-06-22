"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GradientWordLoop from "@/components/GradientWordLoop";
import GlowCard from "@/components/GlowCard";

const heroStats = [
  {
    value: "350M+",
    description: "Contributed to a cross-platform design system at SonyLIV supporting 350M+ users across web, mobile, and TV.",
  },
  {
    value: "20%",
    description: "Led end-to-end UX for an enterprise AI platform (Aruva) at AWTG, reducing delivery time by 20% across discovery, prototyping, and delivery.",
  },
  {
    value: "75%",
    description: "Designed AI-driven workflows at HighRadius enabling 75% faster receivables recovery.",
  },
];

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12 font-(family-name:--font-heading) text-[42px] font-extrabold leading-[1.05] sm:text-[56px] md:text-[72px]"
        >
          Designing in London
          <br />
          <GradientWordLoop />
          <br />
          Built with clarity
          <br />
          Measured by impact
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-stretch gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat, i) => (
            <motion.div key={stat.value} variants={fadeInUp} className="h-full">
              <GlowCard delay={i * 3.5} className="flex h-full flex-col rounded-2xl p-6">
                <div className="mb-3 font-(family-name:--font-heading) text-4xl font-extrabold">
                  {stat.value}
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
