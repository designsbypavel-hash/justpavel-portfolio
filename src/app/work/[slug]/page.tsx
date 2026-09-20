import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
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
import ProductHypothesis from "@/components/ProductHypothesis";
import OutcomeSection from "@/components/OutcomeSection";
import NextProjectCTA from "@/components/NextProjectCTA";
import ChipList from "@/components/ChipList";
import RejectedConcepts from "@/components/RejectedConcepts";
import EcosystemDiagram from "@/components/EcosystemDiagram";
import ThemeVarProvider from "@/components/ThemeVarProvider";
import CaseStudyNav from "@/components/CaseStudyNav";
import ConceptComparison from "@/components/ConceptComparison";
import KeyMomentCallout from "@/components/KeyMomentCallout";

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
    title: project.title,
    description: project.description,
    alternates: { canonical: `https://www.justpaveldesign.com/work/${slug}` },
    openGraph: {
      title: `${project.title}, Pavel Mondal`,
      description: project.description,
      url: `https://www.justpaveldesign.com/work/${slug}`,
      type: "article",
      images: [{ url: `https://www.justpaveldesign.com${project.image}`, width: 1200, height: 630, alt: project.title }],
    },
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

  const usedImages = new Set(
    [
      project.keyInsight?.image,
      project.designPrinciplesImage,
      project.businessImpactImage,
      ...project.context.map((s) => s.image),
      ...project.decisions.map((d) => d.image),
      ...project.closingSections.map((s) => s.image),
    ].filter(Boolean)
  );
  const remainingGalleryImages = project.galleryImages.filter((img) => !usedImages.has(img));

  const visibleNavIds = [
    "cs-overview",
    project.keyInsight ? "cs-insight" : null,
    project.opportunity ? "cs-opportunity" : null,
    project.hypothesis ? "cs-hypothesis" : null,
    "cs-challenge",
    project.journeySteps && project.journeySteps.length > 0 ? "cs-journey" : null,
    "cs-strategy",
    (project.businessImpact && project.businessImpact.length > 0) ||
    (project.successMetrics && project.successMetrics.length > 0)
      ? "cs-impact"
      : null,
    "cs-outcome",
  ].filter(Boolean) as string[];

  return (
    <ThemeVarProvider>
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Two-column layout: sticky nav left, content right */}
        <div className="xl:grid xl:grid-cols-[160px_1fr] xl:gap-16">

          {/* Left: sticky nav — hidden on mobile/tablet */}
          <CaseStudyNav visibleIds={visibleNavIds} />

          {/* Right: case study content */}
          <div className="min-w-0 max-w-4xl">
            <CaseStudyHero
              category={project.category}
              title={project.title}
              description={project.description}
              readingTime={readingTime}
              gif={project.gif}
            />

            {/* Visual: the headline numbers, right up top so the result is clear immediately */}
            <MetricGrid stats={project.stats} />

            {project.teamBreakdown && <TeamComposition groups={project.teamBreakdown} platform={project.platform} />}

            <div className="mb-12 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ border: "1px solid var(--cs-border)", color: "var(--cs-text-dim)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* TL;DR */}
            <section id="cs-overview" className="mb-12 rounded-xl p-6 sm:p-8" style={{ border: "1px solid var(--cs-border)", background: "var(--cs-card-bg)" }}>
              <h2 className="mb-6">
                TL;DR
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="mb-1" style={{ color: "var(--cs-text-muted)" }}>Problem</h3>
                  <p style={{ color: "var(--cs-text-body)" }}>{project.tldrProblem}</p>
                </div>
                <div>
                  <h3 className="mb-1" style={{ color: "var(--cs-text-muted)" }}>What I did</h3>
                  <p style={{ color: "var(--cs-text-body)" }}>{project.tldrWhatIDid}</p>
                </div>
                <div>
                  <h3 className="mb-1" style={{ color: "var(--cs-text-muted)" }}>Impact</h3>
                  <p style={{ color: "var(--cs-text-body)" }}>{project.tldrImpact}</p>
                </div>
              </div>
            </section>

            {/* Visual: hero image, right after the intro is established */}
            <div className="mb-12">
              <DarkImageSection src={project.image} alt={project.title} priority aspect="16 / 10" />
            </div>

            {project.keyInsight && (
              <div id="cs-insight">
                <KeyInsight
                  title={project.keyInsight.title}
                  description={project.keyInsight.description}
                  image={project.keyInsight.image}
                />
              </div>
            )}

            {project.slug === "agent-ai" && (
              <section className="mb-16">
                <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--cs-border)", background: "var(--cs-card-bg)" }}>
                  <div className="relative flex items-center justify-center" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(129,140,248,0.10) 0%, transparent 70%)" }}>
                    <img
                      src="/site-assets/case-studies/agent-ai/kai-voice.gif"
                      alt="Kai Voice — the AI assistant in active listening mode, mid-conversation with a customer"
                      className="w-full max-w-sm mx-auto"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--cs-accent, #818cf8)" }}>
                      The product
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--cs-text-body)" }}>
                      Kai Voice — the AI assistant in active listening mode. This is what businesses were deploying to their customers. The orb pulses when it is processing. The waveform confirms it is hearing the right things. The question every enterprise buyer was asking was simple: how do I know it is ready before a real customer sees this?
                    </p>
                  </div>
                </div>
              </section>
            )}

            {project.ecosystemDiagramImage ? (
              <section className="mb-12">
                <div className="flex justify-center" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}>
                  <div className="w-full max-w-5xl overflow-hidden rounded-xl px-4" style={{ border: "1px solid var(--cs-border)" }}>
                    <Image
                      src={project.ecosystemDiagramImage}
                      alt="SonyLIV subscription ecosystem diagram"
                      width={1536}
                      height={1024}
                      quality={100}
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </section>
            ) : (
              project.ecosystemDiagram && <EcosystemDiagram diagram={project.ecosystemDiagram} />
            )}

            {project.slug === "bestway-loyalty" && (
              <KeyMomentCallout
                accent={project.logo?.accent}
                label="System thinking"
                headline="I mapped the system before I mapped the screens."
                detail="Understanding how loyalty connected to purchasing, ordering, and account hierarchy shaped every decision that followed. Without that picture, the design would have solved the wrong surface."
              />
            )}

            {project.opportunity && (
              <section id="cs-opportunity" className="mb-12">
                <h2 className="mb-4">Opportunity</h2>
                <p style={{ color: "var(--cs-text-body)" }}>{project.opportunity}</p>
              </section>
            )}

            {project.rejectedConcepts && project.rejectedConcepts.length > 0 && (
              <RejectedConcepts heading="Concepts we rejected" items={project.rejectedConcepts} />
            )}

            {project.hypothesis && (
              <div id="cs-hypothesis">
                <ProductHypothesis hypothesis={project.hypothesis} />
              </div>
            )}

            {project.slug === "bestway-loyalty" && (
              <KeyMomentCallout
                accent={project.logo?.accent}
                label="Design decision"
                headline="I wrote a hypothesis before opening Figma."
                detail="Framing the problem as a testable belief gave the PM and me a shared definition of what success actually meant. It stopped the project from drifting into 'make it nicer' territory."
              />
            )}

            <div id="cs-challenge">
              <ChallengeSection sections={project.context} />
            </div>

            {project.teamsHelped && project.teamsHelped.length > 0 && (
              <TeamComposition groups={project.teamsHelped} />
            )}

            {project.automationScope && project.automationScope.length > 0 && (
              <ChipList heading="What Kai automates" chips={project.automationScope} />
            )}

            {/* User Journey: Before vs After (visual, right after the challenge is explained) */}
            {project.journeySteps && project.journeySteps.length > 0 && (
              <section id="cs-journey" className="mb-12">
                <h2 className="mb-8">
                  User journey: before vs after
                </h2>
                <div className="space-y-6">
                  {project.journeySteps.map((step, i) => (
                    <div key={step.label} className="rounded-xl p-6" style={{ border: "1px solid var(--cs-border)", background: "var(--cs-card-bg)" }}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold" style={{ border: "1px solid var(--cs-border)", color: "var(--cs-text-dim)" }}>
                          {i + 1}
                        </span>
                        <p className="text-sm font-semibold" style={{ color: "var(--cs-text-body)" }}>{step.label}</p>
                      </div>
                      <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                        <div className="rounded-lg p-4" style={{ border: "1px solid var(--cs-border)", background: "var(--cs-bg-inset)" }}>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--cs-text-muted)" }}>
                            Before
                          </p>
                          <p className="text-sm" style={{ color: "var(--cs-text-dim)" }}>{step.before}</p>
                        </div>
                        <div className="flex items-center justify-center rotate-90 sm:rotate-0" style={{ color: "var(--cs-text-dim)" }}>
                          <span aria-hidden className="text-lg">→</span>
                        </div>
                        <div className="rounded-lg bg-gradient-to-br from-blue-500/[0.07] via-transparent to-orange-500/[0.07] p-4" style={{ border: "1px solid var(--cs-border)" }}>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--cs-text-muted)" }}>
                            After
                          </p>
                          <p className="text-sm" style={{ color: "var(--cs-text-body)" }}>{step.after}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.designPrinciples && project.designPrinciples.length > 0 && (
              <DesignPrinciples principles={project.designPrinciples} image={project.designPrinciplesImage} />
            )}

            {project.constraints && project.constraints.length > 0 && (
              <DesignPrinciples principles={project.constraints} heading="Constraints That Shaped The Solution" />
            )}

            {project.escalationTriggers && project.escalationTriggers.length > 0 && (
              <DesignPrinciples principles={project.escalationTriggers} heading="When Kai Escalates To A Human" />
            )}

            <div id="cs-strategy">
              <StrategySection decisions={project.decisions} />
            </div>

            {project.conceptComparison && project.conceptComparison.length > 0 && (
              <ConceptComparison concepts={project.conceptComparison} />
            )}

            {project.slug === "bestway-loyalty" && (
              <KeyMomentCallout
                accent={project.logo?.accent}
                label="Collaboration"
                headline="I showed all three directions to the PM, not just the one I preferred."
                detail="Presenting the discarded concepts alongside the final direction made the rationale visible. The PM understood the trade-offs and the decision felt shared, not handed down."
              />
            )}

            {project.userTesting && (
              <section className="mb-16">
                <h2 className="mb-6">Testing with real customers</h2>

                {/* First image: prototype test flows */}
                <div className="mb-8 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--cs-border)" }}>
                  <Image
                    src={project.userTesting.images[0]}
                    alt="User test flows: Purchase Power, Joining Reward Club, Rewards Points"
                    width={1400}
                    height={700}
                    className="w-full"
                  />
                </div>

                {/* Narrative */}
                <div className="mb-8 space-y-4">
                  {project.userTesting.narrative.slice(0, 2).map((p, i) => (
                    <p key={i} style={{ color: "var(--cs-text-body)" }}>{p}</p>
                  ))}
                </div>

                {/* Second image: live session screenshot */}
                <div className="mb-8 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--cs-border)" }}>
                  <Image
                    src={project.userTesting.images[1]}
                    alt="Remote user testing session with a Bestway customer over video call"
                    width={1400}
                    height={788}
                    className="w-full"
                  />
                </div>

                {/* Rest of narrative */}
                <div className="space-y-4">
                  {project.userTesting.narrative.slice(2).map((p, i) => (
                    <p key={i} style={{ color: "var(--cs-text-body)" }}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {project.slug === "bestway-loyalty" && project.userTesting && (
              <KeyMomentCallout
                accent={project.logo?.accent}
                label="Evidence-based"
                headline="User feedback changed a core assumption."
                detail="Customers did not just want a points balance. They wanted the balance to tell them what to do next. That reframing drove the contextual loyalty design and is the most important thing testing gave us."
              />
            )}

            {/* Visual: the flow running, right after the decisions behind it are explained */}
            {project.prototypeVideo && <PrototypeVideo src={project.prototypeVideo} />}

            {(project.businessImpact && project.businessImpact.length > 0) && (
              <div id="cs-impact">
                <BusinessImpact categories={project.businessImpact} image={project.businessImpactImage} />
              </div>
            )}

            {project.successMetrics && project.successMetrics.length > 0 && (
              <BusinessImpact categories={project.successMetrics} heading="Success Metrics We Defined" />
            )}

            {/* Remaining screens not already paired with specific copy above */}
            {remainingGalleryImages.length > 0 && (
              <ProcessSection title={project.title} images={remainingGalleryImages} />
            )}

            <div id="cs-outcome">
              <OutcomeSection sections={project.closingSections} />
            </div>

            {project.gif && (
              <div className="mb-16 overflow-hidden rounded-2xl">
                <img src={project.gif} alt={`${project.title} prototype`} className="w-full" />
              </div>
            )}

            <NextProjectCTA slug={nextProject.slug} title={nextProject.title} />
          </div>
        </div>
      </div>
    </div>
    </ThemeVarProvider>
  );
}
