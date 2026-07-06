import Image from "next/image";
import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import ToolStack from "@/components/ToolStack";
import LensGallery from "@/components/LensGallery";

export const metadata: Metadata = {
  title: "About | Pavel",
  description: "Senior Product Designer in London, 7+ years across B2B SaaS and B2C mobile.",
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
