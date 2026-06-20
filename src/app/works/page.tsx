import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function WorksPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-16 font-(family-name:--font-heading) text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          All Projects
        </h1>
        <div className="space-y-16">
          {projects.map((project) => (
            <Link
              key={project.slug}
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
                <h2 className="mb-2 text-2xl font-semibold transition group-hover:text-white/80">
                  {project.title}
                </h2>
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
          ))}
        </div>
      </div>
    </div>
  );
}
