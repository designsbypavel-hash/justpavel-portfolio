"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { cardHover } from "@/lib/motion";
import GlowCard from "@/components/GlowCard";
import { playClickSound } from "@/lib/sound";
import { highlightNumbers } from "@/components/HighlightNumbers";

function ProjectLogo({ src, alt }: { src: string; alt: string; accent?: string }) {
  return (
    <div className="mb-4 inline-flex">
      <div
        className="flex items-center justify-center rounded-lg px-3 py-2"
        style={{ background: "var(--surface-pill)", backdropFilter: "blur(8px)" }}
      >
        <img
          src={src}
          alt={alt}
          className="h-6 w-auto object-contain"
          style={{ maxWidth: 110 }}
        />
      </div>
    </div>
  );
}

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
        onClick={playClickSound}
        className="group grid gap-6 sm:grid-cols-2 sm:items-start"
      >
        <GlowCard className="glow-card--hover-only relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={priority}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
          {project.gif && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.gif}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </GlowCard>
        <div>
          {project.logo && (
            <ProjectLogo src={project.logo.src} alt={project.logo.alt} accent={project.logo.accent} />
          )}
          <TitleTag className="mb-2 text-2xl font-semibold transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/80">
            {highlightNumbers(project.title)}
          </TitleTag>
          {project.readTime && (
            <p className="mb-3 text-sm text-white/60">{project.readTime} read</p>
          )}
          <p className="mb-4 text-white/60">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/25 bg-white/[0.05] px-3 py-1 text-[13px] font-medium uppercase tracking-[0.08em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
