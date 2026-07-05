"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={playClickSound}
        className="group grid gap-6 sm:grid-cols-2 sm:items-center"
      >
        {/* Image with zoom + overlay */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              View Case Study
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        {/* Text content */}
        <div>
          <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
            {project.category}
          </span>
          <TitleTag className="mb-2 text-2xl font-semibold transition-colors duration-400 group-hover:text-white">
            {project.title}
          </TitleTag>
          <p className="mb-4 text-white/60 transition-colors duration-400 group-hover:text-white/75">
            {project.description}
          </p>
          {/* Staggered tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0.6, y: 0 }}
                animate={hovered ? { opacity: 1, y: -2 } : { opacity: 0.6, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition-colors group-hover:border-white/30 group-hover:text-white/80"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
