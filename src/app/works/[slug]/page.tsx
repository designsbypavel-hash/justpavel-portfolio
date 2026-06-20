import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Pavel`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/works" className="mb-10 inline-block text-sm text-white/50 hover:text-white">
          ← All Projects
        </Link>

        <span className="mb-3 block text-xs uppercase tracking-widest text-white/50">
          {project.category}
        </span>
        <h1 className="mb-8 font-(family-name:--font-heading) text-3xl font-extrabold leading-tight sm:text-5xl">
          {project.title}
        </h1>

        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>

        <div className="mb-12 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-3 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
              Problem
            </h2>
            <p className="text-white/70">{project.problem}</p>
          </section>
          <section>
            <h2 className="mb-3 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
              Approach
            </h2>
            <p className="text-white/70">{project.approach}</p>
          </section>
          <section>
            <h2 className="mb-3 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
              Outcome
            </h2>
            <p className="text-white/70">{project.outcome}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
