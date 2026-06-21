"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import GradientWordLoop from "@/components/GradientWordLoop";

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-32">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="font-(family-name:--font-heading) text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Designing in London
          <br />
          <GradientWordLoop />
          <br />
          Built with clarity
          <br />
          Measured by impact
        </motion.h1>
      </div>
    </section>
  );
}
