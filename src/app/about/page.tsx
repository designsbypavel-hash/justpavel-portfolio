import Image from "next/image";
import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import ToolStack from "@/components/ToolStack";
import LensGallery from "@/components/LensGallery";

export const metadata: Metadata = {
  title: "About | Pavel",
  description: "Senior Product Designer in London, 7+ years across B2B SaaS and B2C mobile.",
};

const experience = [
  {
    company: "AWTG",
    role: "Senior Product Designer",
    period: "Oct 2024 – Present",
    location: "London, UK",
    summary:
      "Leading UX across two enterprise AI platforms. Reduced design-to-dev cycle time by 20% through AI-assisted workflows, rebuilt a WCAG-compliant design system, and improved task completion through usability testing.",
  },
  {
    company: "Flatlay",
    role: "Product Designer",
    period: "Oct 2021 – Oct 2024",
    location: "Los Angeles (Remote)",
    summary:
      "Led end-to-end design for a consumer app from zero. Drove adoption to 5,000+ downloads and reduced bounce rate by 82%. Mentored junior designers and shipped across web and mobile.",
  },
  {
    company: "SonyLIV",
    role: "Product Designer",
    period: "Jul 2020 – Oct 2021",
    location: "Mumbai, India",
    summary:
      "Contributed to a cross-platform design system serving 350M+ users across web, TV, and mobile. Redesigned core experiences that increased engagement by 64%.",
  },
  {
    company: "HighRadius",
    role: "Product Designer",
    period: "Mar 2019 – Jul 2020",
    location: "Hyderabad, India",
    summary:
      "Designed AI-powered fintech workflows that improved receivables recovery by 75%. Conducted user research and worked closely with Finance stakeholders to simplify complex enterprise processes.",
  },
];

const skills = [
  "Product UX/UI",
  "Design Systems",
  "0-to-1 Discovery",
  "Prototyping",
  "AI-Powered Workflows",
  "Cross-Functional Collaboration",
  "Usability Testing",
  "Information Architecture",
  "Accessibility (WCAG)",
];


const lensPhotos = [
  { src: "/site-assets/about-lens/york-minster.jpg", caption: "York Minster (Favourite Cathedral)" },
  { src: "/site-assets/about-lens/uni-of-york.jpg", caption: "Uni of York" },
  { src: "/site-assets/about-lens/york.jpg", caption: "York" },
  { src: "/site-assets/about-lens/in-winters.jpg", caption: "In winters" },
  { src: "/site-assets/about-lens/dream.jpg", caption: "Dream" },
  { src: "/site-assets/about-lens/liverpool.jpg", caption: "Liverpool" },
  { src: "/site-assets/about-lens/kingston-summer.jpg", caption: "Kingston in Summer" },
  { src: "/site-assets/about-lens/iconic-beatles.jpg", caption: "Iconic Beatles" },
  { src: "/site-assets/about-lens/st-paul-cathedral.jpg", caption: "St. Paul Cathedral" },
];

export default function AboutPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl">

        {/* Hero */}
        <div className="mb-24 grid gap-12 sm:grid-cols-[200px_1fr] sm:items-start">
          <div className="relative aspect-square w-48 overflow-hidden rounded-2xl border border-white/10 sm:w-full">
            <Image
              src="/site-assets/about-lens/headshot-new.jpg"
              alt="Pavel"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
              I turn complex problems into products that feel effortless.
            </h1>
            <p className="text-white/65 leading-relaxed">
              Senior Product Designer with 8 years across AI, SaaS, and enterprise — based in London.
              MSc in Human-Computer Interaction from the University of York. I work end-to-end: research,
              systems thinking, prototyping, and close collaboration with PMs and engineers until
              the thing ships.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/40">
              <span>📍</span>
              <span>London, UK · Open to opportunities</span>
            </div>
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-24">
          <h2 className="mb-6 uppercase">How I Work</h2>
          <div className="space-y-4 text-white/65 leading-relaxed">
            <p>
              Good design isn't just a clean layout. It's simplifying complex problems, giving
              information clear structure, and building something people understand at a glance —
              whether that's an AI platform, an enterprise SaaS workflow, or a conversion-focused
              mobile journey.
            </p>
            <p>
              Design doesn't happen in a vacuum. There's usually an existing backend, a tight
              timeline, incomplete information, or a product direction that's still evolving.
              Working well inside those constraints — not around them — is most of the job.
            </p>
            <p>
              I care about accessible, scalable design, not just beautiful screens.
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-24">
          <h2 className="mb-8 uppercase">Experience</h2>
          <div className="flex flex-col gap-8">
            {experience.map((job) => (
              <div key={job.company} className="border-l border-white/10 pl-6">
                <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-semibold text-white">{job.company}</span>
                  <span className="text-sm text-white/45">{job.role}</span>
                </div>
                <div className="mb-3 text-xs text-white/30">{job.period} · {job.location}</div>
                <p className="text-sm text-white/60 leading-relaxed">{job.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <h2 className="mb-6 uppercase">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/65">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tool Stack — full-width marquee */}
        <ToolStack />

        {/* From My Lens */}
        <div>
          <h2 className="mb-2 uppercase">From My Lens</h2>
          <p className="mb-10 text-white/45 text-sm">I notice patterns, details, and flow — in cities, spaces, and products.</p>
        </div>
        <LensGallery photos={lensPhotos} />

        {/* Testimonials */}
        <Testimonials />

      </div>
    </div>
  );
}
