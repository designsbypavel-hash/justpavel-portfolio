"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import GradientWordLoop from "@/components/GradientWordLoop";

const heroStats = [
  {
    value: "350M+",
    description: "Contributed to a cross-platform design system at SonyLIV supporting 350M+ users across web, mobile, and TV.",
  },
  {
    value: "82%",
    description: "Led a full end-to-end redesign at Flatlay, driving 5,000+ downloads and reducing bounce rate by 82%.",
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
          className="mb-12 font-(family-name:--font-heading) text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
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
          className="grid gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeInUp}
              className="glow-card rounded-2xl p-6"
            >
              <div className="mb-3 font-(family-name:--font-heading) text-4xl font-extrabold">
                {stat.value}
              </div>
              <p className="text-sm text-white/60">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
