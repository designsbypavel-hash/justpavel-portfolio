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
    title: "About Pavel Mondal — Senior Product Designer",
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
      <div className="mx-auto max-w-3xl">

        {/* Hero */}
        <div className="mb-20">
          <p className="mb-6 text-xs uppercase tracking-widest text-white/35">About</p>
          <h1 className="mb-8 text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
            Hi, I&rsquo;m Pavel. I turn complexity into products people actually understand.
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-white/55">
            I&rsquo;m a <strong className="font-semibold text-white">Senior Product Designer</strong> who works end-to-end, from messy discovery to shipped product. With{" "}
            <strong className="font-semibold text-white">8 years across AI, enterprise SaaS, and consumer mobile</strong>, I bring both systems thinking and a relentless eye for detail.
            At AWTG I&rsquo;ve led UX across two AI platforms. At SonyLIV I worked on a design system reaching{" "}
            <strong className="font-semibold text-white">350M+ users</strong>. Today I build with AI tools and ship fast. This site was built with Claude Code.
          </p>

          {/* Full-width photo */}
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
            <Image
              src="/site-assets/about-lens/headshot-new.jpg"
              alt="Pavel"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              quality={100}
              priority
            />
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-24">
          <h2 className="mb-6 uppercase">How I Work</h2>
          <div className="space-y-4 text-white/65 leading-relaxed">
            <p>
              Good design isn't just a clean layout. It's simplifying complex problems, giving
              information clear structure, and building something people understand at a glance,
              whether that's an AI platform, an enterprise SaaS workflow, or a conversion-focused
              mobile journey.
            </p>
            <p>
              Design doesn't happen in a vacuum. There's usually an existing backend, a tight
              timeline, incomplete information, or a product direction that's still evolving.
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
