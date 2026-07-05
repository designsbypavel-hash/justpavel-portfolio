"use client";

import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link
      href={`/work/${project.slug}`}
      onClick={playClickSound}
      className="group grid gap-6 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/20 sm:grid-cols-2 sm:items-center"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
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
        <TitleTag className="mb-2 text-2xl font-semibold">
          {project.title}
        </TitleTag>
        <p className="mb-4 text-white/60">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
