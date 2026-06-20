"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="px-6 pt-28 pb-32">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-(family-name:--font-heading) text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Designing in London
          <br />
          <span className="gradient-text">software interfaces</span>
          <br />
          Built with clarity
          <br />
          Measured by impact
        </motion.h1>
      </div>
    </section>
  );
}
