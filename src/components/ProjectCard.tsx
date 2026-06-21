"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cardHover } from "@/lib/motion";

export default function ProjectCard({
  project,
  titleAs = "h3",
  priority = false,
}: {
  project: Project;
  titleAs?: "h2" | "h3";
  priority?: boolean;
}) {
  const TitleTag = titleAs;
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" variants={cardHover}>
      <Link
        href={`/work/${project.slug}`}
        className="group grid gap-6 sm:grid-cols-2 sm:items-center"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/30">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={priority}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div>
          <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
            {project.category}
          </span>
          <TitleTag className="mb-2 text-2xl font-semibold transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/80">
            {project.title}
          </TitleTag>
          <p className="text-white/60">{project.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
