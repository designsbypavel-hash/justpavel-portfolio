import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import CTASection from "@/components/CTASection";
import FadeInSection from "@/components/FadeInSection";

const featuredWorks = projects.slice(0, 3);

const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    image: "/site-assets/youtube-ai-tools.png",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    image: "/site-assets/youtube-mobbin.jpg",
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
  { value: "450+", label: "Total mentoring time" },
  { value: "15+", label: "Sessions completed" },
  { value: "100%", label: "Average attendance" },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="works" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <h2 className="mb-12 uppercase">
              Featured Works
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

      <section id="youtube" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeInSection>
            <h2 className="mb-12 uppercase">
              Youtube
            </h2>
          </FadeInSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((video) => (
              <FadeInSection key={video.title}>
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10">
                  <Image src={video.image} alt={video.title} fill className="object-cover" />
                </div>
                <p className="font-medium">{video.title}</p>
              </FadeInSection>
            ))}
          </div>
          <div className="mt-12">
            <CTASection href="/youtube" label="View More" />
          </div>
        </div>
      </section>

      <section
        id="mentoring"
        className="border-t border-white/10 bg-gradient-to-b from-indigo-950 via-indigo-950/60 to-black px-6 py-24"
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
                <p className="max-w-2xl text-white/70">
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
                <div className="font-(family-name:--font-heading) text-5xl font-extrabold">
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
    </div>
  );
}
