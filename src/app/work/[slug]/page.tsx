import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/lib/projects";

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
        <Link href="/works" className="mb-10 block text-sm text-white/50 hover:text-white">
          ← All Projects
        </Link>

        <span className="mb-3 block text-xs uppercase tracking-widest text-white/50">
          {project.category}
        </span>
        <h1 className="mb-8 font-(family-name:--font-heading) text-3xl font-extrabold leading-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mb-8 text-lg text-white/70">{project.description}</p>

        <div className="mb-12 grid gap-4 border-y border-white/10 py-6 text-sm sm:grid-cols-4">
          <div>
            <span className="block text-white/40">Role</span>
            <span className="text-white/80">{project.role}</span>
          </div>
          <div>
            <span className="block text-white/40">Platform</span>
            <span className="text-white/80">{project.platform}</span>
          </div>
          <div>
            <span className="block text-white/40">Team</span>
            <span className="text-white/80">{project.team}</span>
          </div>
          {project.duration && (
            <div>
              <span className="block text-white/40">Duration</span>
              <span className="text-white/80">{project.duration}</span>
            </div>
          )}
        </div>

        <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>

        {project.stats.length > 0 && (
          <div className="mb-12 grid gap-8 sm:grid-cols-3">
            {project.stats.map((stat, i) => (
              <div key={`${stat.label}-${i}`} className="border-t border-white/30 pt-4">
                <div className="font-(family-name:--font-heading) text-4xl font-extrabold">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

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

        {/* TL;DR */}
        <section className="mb-12 rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <h2 className="mb-6 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
            TL;DR
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-white/50">Problem</h3>
              <p className="text-white/80">{project.tldrProblem}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-white/50">What I did</h3>
              <p className="text-white/80">{project.tldrWhatIDid}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-white/50">Impact</h3>
              <p className="text-white/80">{project.tldrImpact}</p>
            </div>
          </div>
        </section>

        {/* Context sections */}
        <div className="mb-12 space-y-10">
          {project.context.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* User Journey: Before vs After */}
        {project.journeySteps && project.journeySteps.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
              User Journey: Before vs After
            </h2>
            <div className="space-y-4">
              {project.journeySteps.map((step) => (
                <div key={step.label} className="rounded-xl border border-white/10 p-6">
                  <p className="mb-4 text-sm font-semibold text-white/80">{step.label}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-400/70">
                        Before
                      </p>
                      <p className="text-sm text-white/60">{step.before}</p>
                    </div>
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-400/70">
                        After
                      </p>
                      <p className="text-sm text-white/60">{step.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process & Visuals gallery */}
        {project.galleryImages.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
              Process &amp; Visuals
            </h2>
            <div className="space-y-6">
              {project.galleryImages.map((src, i) => (
                <div
                  key={src}
                  className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — process visual ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Decisions */}
        {project.decisions.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
              Key Decisions
            </h2>
            <div className="space-y-10">
              {project.decisions.map((decision, i) => (
                <div key={decision.title} className="rounded-xl border border-white/10 p-6 sm:p-8">
                  <h3 className="mb-4 text-lg font-semibold">
                    Decision {i + 1}: {decision.title}
                  </h3>
                  <p className="mb-4 text-sm text-white/60">
                    <span className="font-semibold text-white/40">Why — </span>
                    {decision.why}
                  </p>
                  {decision.alternativesConsidered && decision.alternativesConsidered.length > 0 && (
                    <div className="mb-4 rounded-lg border border-white/10 bg-black/30 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                        Alternatives Considered
                      </p>
                      <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
                        {decision.alternativesConsidered.map((alt, j) => (
                          <li key={j}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-white/70">
                    {decision.whatChanged.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-white/40">Result — </span>
                    {decision.result}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Closing sections (Impact, What's Next, Reflection, etc.) */}
        <div className="space-y-10">
          {project.closingSections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 font-(family-name:--font-heading) text-xl font-extrabold uppercase tracking-tight">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
