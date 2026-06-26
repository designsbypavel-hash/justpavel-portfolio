import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProjectBySlug } from "@/lib/projects";
import { estimateReadingTime } from "@/lib/readingTime";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyOverview from "@/components/CaseStudyOverview";
import MetricGrid from "@/components/MetricGrid";
import DarkImageSection from "@/components/DarkImageSection";
import { ChallengeSection, StrategySection } from "@/components/ChallengeStrategyResults";
import ProcessSection from "@/components/ProcessSection";
import PrototypeVideo from "@/components/PrototypeVideo";
import TeamComposition from "@/components/TeamComposition";
import KeyInsight from "@/components/KeyInsight";
import DesignPrinciples from "@/components/DesignPrinciples";
import BusinessImpact from "@/components/BusinessImpact";
import OutcomeSection from "@/components/OutcomeSection";
import NextProjectCTA from "@/components/NextProjectCTA";

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

  const readingTime = estimateReadingTime(project);
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <CaseStudyHero
          category={project.category}
          title={project.title}
          description={project.description}
          readingTime={readingTime}
        />

        {/* Visual: the headline numbers, right up top so the result is clear immediately */}
        <MetricGrid stats={project.stats} />

        <CaseStudyOverview
          role={project.role}
          platform={project.platform}
          team={project.team}
          duration={project.duration}
        />

        {project.teamBreakdown && <TeamComposition groups={project.teamBreakdown} />}

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
          <h2 className="mb-6 uppercase">
            TL;DR
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-white/50">Problem</h3>
              <p className="text-white/80">{project.tldrProblem}</p>
            </div>
            <div>
              <h3 className="mb-1 text-white/50">What I did</h3>
              <p className="text-white/80">{project.tldrWhatIDid}</p>
            </div>
            <div>
              <h3 className="mb-1 text-white/50">Impact</h3>
              <p className="text-white/80">{project.tldrImpact}</p>
            </div>
          </div>
        </section>

        {/* Visual: hero image, right after the intro is established */}
        <div className="mb-12">
          <DarkImageSection src={project.image} alt={project.title} priority aspect="16 / 10" />
        </div>

        {project.keyInsight && (
          <KeyInsight title={project.keyInsight.title} description={project.keyInsight.description} />
        )}

        {project.opportunity && (
          <section className="mb-12">
            <h2 className="mb-4 uppercase">Opportunity</h2>
            <p className="text-white/70">{project.opportunity}</p>
          </section>
        )}

        <ChallengeSection sections={project.context} />

        {/* User Journey: Before vs After (visual, right after the challenge is explained) */}
        {project.journeySteps && project.journeySteps.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-8 uppercase">
              User Journey: Before vs After
            </h2>
            <div className="space-y-6">
              {project.journeySteps.map((step, i) => (
                <div key={step.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/60">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-white/80">{step.label}</p>
                  </div>
                  <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/35">
                        Before
                      </p>
                      <p className="text-sm text-white/55">{step.before}</p>
                    </div>
                    <div className="flex items-center justify-center rotate-90 text-white/30 sm:rotate-0">
                      <span aria-hidden className="text-lg">→</span>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/[0.07] via-white/[0.03] to-orange-500/[0.07] p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">
                        After
                      </p>
                      <p className="text-sm text-white/80">{step.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Visual: the actual screens, right after the journey is explained */}
        <ProcessSection title={project.title} images={project.galleryImages} />

        {project.designPrinciples && project.designPrinciples.length > 0 && (
          <DesignPrinciples principles={project.designPrinciples} />
        )}

        <StrategySection decisions={project.decisions} />

        {/* Visual: the flow running, right after the decisions behind it are explained */}
        {project.prototypeVideo && <PrototypeVideo src={project.prototypeVideo} />}

        {project.businessImpact && project.businessImpact.length > 0 && (
          <BusinessImpact categories={project.businessImpact} />
        )}

        <OutcomeSection sections={project.closingSections} />

        <NextProjectCTA slug={nextProject.slug} title={nextProject.title} />
      </div>
    </div>
  );
}
