import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import FadeInSection from "@/components/FadeInSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const featuredSlugs = ["agent-ai", "sonyliv-ott-subscription", "sonyliv-check", "fintech-autonomous"];
const featuredWorks = featuredSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    image: "/site-assets/youtube-ai-tools.png",
    url: "https://www.youtube.com/watch?v=g8tmgesVgEU",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    image: "/site-assets/youtube-mobbin.jpg",
    url: "https://www.youtube.com/watch?v=qloGX77CiyE",
  },
];

const mentoringOffers = [
  {
    title: "Portfolio & case study storytelling",
    description: "Problem → decisions → outcome framework for case studies that actually land interviews.",
  },
  {
    title: "Interview prep (mock + walkthroughs)",
    description: "Sharper answers, calmer delivery, and stronger design narratives.",
  },
];

const stats = [
  { value: "450h+", label: "Total mentoring time" },
  { value: "15+", label: "Sessions completed" },
  { value: "100%", label: "Average attendance" },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="works" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <h2 className="mb-12">
              Selected works
            </h2>
          </FadeInSection>
          <div className="space-y-16">
            {featuredWorks.map((work, index) => (
              <FadeInSection key={work.slug}>
                <ProjectCard project={work} priority={index === 0} />
              </FadeInSection>
            ))}
          </div>
          <div className="mt-16">
            <CTASection href="/works" label="View All Project" />
          </div>
        </div>
      </section>

      <section id="youtube" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <h2 className="mb-12">
              Thinking out loud
            </h2>
          </FadeInSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((video) => (
              <FadeInSection key={video.title}>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/30">
                    <Image src={video.image} alt={video.title} fill className="object-cover" />
                  </div>
                  <p className="font-medium transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/80">
                    {video.title}
                  </p>
                </a>
              </FadeInSection>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <a
              href="https://www.youtube.com/@DesignWithPavel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-black hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.25)]"
            >
              <Image src="/site-assets/logos/youtube.webp" alt="YouTube" width={20} height={20} className="object-contain" />
              View More
            </a>
          </div>
        </div>
      </section>

      <section
        id="mentoring"
        className="bg-gradient-to-b from-indigo-950 via-indigo-950/60 to-black px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <div className="mb-12 flex flex-wrap items-center gap-6">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/20 shadow-[0_0_0_6px_rgba(255,255,255,0.04)]">
                <Image src="/site-assets/mentor-avatar.webp" alt="Pavel" fill className="object-cover" />
              </div>
              <div>
                <h2 className="mb-2">
                  Mentoring for designers who want real progress
                </h2>
                <p className="max-w-2xl text-white/50">
                  Coaching on portfolio storytelling, interview walkthroughs, and practical AI workflows.
                </p>
              </div>
            </div>
          </FadeInSection>

          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {mentoringOffers.map((offer) => (
              <div key={offer.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-2">{offer.title}</h3>
                <p className="text-sm text-white/60">{offer.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/30 pt-4">
                <div className="font-(family-name:--font-heading) text-6xl font-extrabold tracking-[0.02em]" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          <CTASection
            href="https://adplist.org/mentors/pavel-mondal"
            label="Book Now"
            external
          />
        </div>
      </section>

      <TestimonialsCarousel />
    </div>
  );
}
