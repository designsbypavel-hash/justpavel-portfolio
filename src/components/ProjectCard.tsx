import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

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
      className="group grid gap-6 sm:grid-cols-2 sm:items-center"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 transition group-hover:border-white/30">
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
        <TitleTag className="mb-2 text-2xl font-semibold transition group-hover:text-white/80">
          {project.title}
        </TitleTag>
        <p className="text-white/60">{project.description}</p>
      </div>
    </Link>
  );
}
