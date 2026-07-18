import Image from "next/image";
import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import ToolStack from "@/components/ToolStack";
import LensGallery from "@/components/LensGallery";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Product Designer in London with 8 years across AI platforms, B2B SaaS, and B2C mobile. Led UX at AWTG and SonyLIV, reaching 350M+ users.",
  alternates: { canonical: "https://www.justpaveldesign.com/about" },
  openGraph: {
    title: "About Pavel Mondal, Senior Product Designer",
    description:
      "8 years across AI platforms, B2B SaaS, and B2C mobile. Led UX at AWTG and SonyLIV, reaching 350M+ users.",
    url: "https://www.justpaveldesign.com/about",
    images: [{ url: "https://www.justpaveldesign.com/site-assets/og-image.png", width: 1200, height: 630 }],
  },
};

const lensPhotos = [
  { src: "/site-assets/about-lens/york-minster.jpg", caption: "York Minster" },
  { src: "/site-assets/about-lens/hampstead-heath-1.jpg", caption: "Hampstead Heath" },
  { src: "/site-assets/about-lens/york.jpg", caption: "York" },
  { src: "/site-assets/about-lens/paris-eiffel.jpg", caption: "Paris" },
  { src: "/site-assets/about-lens/in-winters.jpg", caption: "In winters" },
  { src: "/site-assets/about-lens/hampstead-heath-2.jpg", caption: "The Ponds" },
  { src: "/site-assets/about-lens/liverpool.jpg", caption: "Liverpool" },
  { src: "/site-assets/about-lens/kew-tree.jpg", caption: "Kew Gardens" },
  { src: "/site-assets/about-lens/dream.jpg", caption: "Dream" },
  { src: "/site-assets/about-lens/hastings-coast.jpg", caption: "Hastings" },
  { src: "/site-assets/about-lens/kingston-summer.jpg", caption: "Kingston in Summer" },
  { src: "/site-assets/about-lens/iconic-beatles.jpg", caption: "Iconic Beatles" },
  { src: "/site-assets/about-lens/st-paul-cathedral.jpg", caption: "St. Paul Cathedral" },
  { src: "/site-assets/about-lens/uni-of-york.jpg", caption: "Uni of York" },
];

export default function AboutPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Hero — two-column */}
        <div className="mb-24 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left: intro text */}
          <div className="flex-1">
            <p className="mb-5 text-xs uppercase tracking-widest text-white/35">About</p>
            <h1 className="mb-8 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              👋 Hi, I&rsquo;m Pavel, a Senior Product Designer with 8 years building digital products people actually understand.
            </h1>
            <p className="text-lg leading-relaxed text-white/55">
              My work is driven by curiosity, systems thinking, and a belief that the best design removes friction without drawing attention to itself. I&rsquo;ve led UX across AI platforms and consumer products reaching{" "}
              <strong className="font-semibold text-white">350M+ users</strong>, and I&rsquo;ve spent{" "}
              <strong className="font-semibold text-white">450+ hours mentoring</strong> designers early in their careers.
            </p>
          </div>

          {/* Right: portrait card */}
          <div className="relative flex-shrink-0 lg:w-72">
            {/* offset background element */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-white/5" />
            {/* card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">
              <div className="relative" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/site-assets/about-lens/headshot-new.jpg"
                  alt="Pavel Mondal"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  quality={100}
                  priority
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-white/80">Pavel Mondal</p>
                <p className="text-xs text-white/40">Senior Product Designer · London</p>
              </div>
            </div>

          </div>
        </div>

        {/* How I Work */}
        <div className="mb-24">
          <h2 className="mb-6 uppercase">How I Work</h2>
          <div className="space-y-4 text-white/65 leading-relaxed">
            <p>
              Good design isn&rsquo;t just a clean layout. It&rsquo;s simplifying complex problems, giving
              information clear structure, and building something people understand at a glance,
              whether that&rsquo;s an AI platform, an enterprise SaaS workflow, or a conversion-focused
              mobile journey.
            </p>
            <p>
              Design doesn&rsquo;t happen in a vacuum. There&rsquo;s usually an existing backend, a tight
              timeline, incomplete information, or a product direction that&rsquo;s still evolving.
              Working well inside those constraints, not around them, is most of the job.
            </p>
            <p>
              I care about accessible, scalable design, not just beautiful screens.
            </p>
          </div>
        </div>

        {/* Tool Stack — full-width marquee */}
        <ToolStack />

        {/* From My Lens */}
        <div>
          <h2 className="mb-2 uppercase">From My Lens</h2>
          <p className="mb-10 text-white/45 text-sm">I notice patterns, details, and flow in cities, spaces, and products.</p>
        </div>
        <LensGallery photos={lensPhotos} />

        {/* Testimonials */}
        <Testimonials />

      </div>
    </div>
  );
}
