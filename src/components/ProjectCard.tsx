import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/works/${project.slug}`}
      className="group grid gap-6 sm:grid-cols-2 sm:items-center"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 transition group-hover:border-white/30">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>
      <div>
        <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
          {project.category}
        </span>
        <h3 className="mb-2 text-2xl font-semibold transition group-hover:text-white/80">
          {project.title}
        </h3>
        <p className="text-white/60">{project.description}</p>
      </div>
    </Link>
  );
}
