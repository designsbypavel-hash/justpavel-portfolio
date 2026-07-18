"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cardHover } from "@/lib/motion";
import GlowCard from "@/components/GlowCard";
import { playClickSound } from "@/lib/sound";

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
  const topStat = project.stats?.[0];

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" variants={cardHover}>
      <Link
        href={`/work/${project.slug}`}
        onClick={playClickSound}
        className="group grid gap-8 sm:grid-cols-2 sm:items-center"
      >
        {/* Thumbnail */}
        <GlowCard className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            priority={priority}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
          {/* Outcome stat badge */}
          {topStat && (
            <div className="absolute right-3 top-3 flex flex-col items-end rounded-xl border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-sm">
              <span className="font-(family-name:--font-heading) text-xl font-extrabold leading-none text-white">
                {topStat.value}
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-white/55">
                {topStat.label}
              </span>
            </div>
          )}
        </GlowCard>

        {/* Text */}
        <div>
          {/* Category */}
          {project.category && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/35">
              {project.category}
            </p>
          )}

          <TitleTag className="mb-2 text-2xl font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
            {project.title}
          </TitleTag>

          {project.readTime && (
            <p className="mb-3 text-sm text-white/35">{project.readTime} read</p>
          )}

          <p className="mb-5 leading-relaxed text-white/55">{project.description}</p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 transition-all duration-300 group-hover:gap-2.5 group-hover:text-white/70">
            Read case study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
