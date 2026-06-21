import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "About | Pavel",
  description: "Senior Product Designer in London, 7+ years across B2B SaaS and B2C mobile.",
};

const competencies = [
  {
    title: "Efficient Workflow",
    description: "Streamlined design process for rapid delivery.",
  },
  {
    title: "Collaborative Process",
    description: "Close integration of feedback throughout design.",
  },
  {
    title: "Attention to Detail",
    description: "Meticulous approach ensuring polished, cohesive outputs.",
  },
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
      <div className="mx-auto max-w-6xl">
        {/* Hero: photo + intro */}
        <div className="mb-20 grid gap-10 sm:grid-cols-2 sm:items-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/site-assets/about-lens/headshot.jpg"
              alt="Pavel"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <span className="mb-4 inline-block rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
              About
            </span>
            <h1 className="mb-6 font-(family-name:--font-heading) text-4xl font-extrabold leading-tight sm:text-5xl">
              I turn complex <span className="font-extrabold text-white">problems</span> into
              products that feel effortless.
            </h1>
            <p className="text-lg text-white/70">
              Based in London, I&apos;m a Product Designer with 7+ years across B2B SaaS and B2C,
              from zero-to-one discovery to shipping high-fidelity UI at scale. I recently led UX
              for an AI platform where teams build and manage AI-powered experiences, and I&apos;ve
              shipped conversion-focused mobile journeys that move real business metrics. I work
              end-to-end: research, systems thinking, prototyping, and close collaboration with PMs
              and engineers until the thing is actually out the door. I care about accessible,
              scalable design — not just beautiful screens.
            </p>

            <div className="mt-10 border-t border-white/10 pt-6">
              <span className="block text-xs uppercase tracking-widest text-white/40">Location</span>
              <span className="text-lg font-semibold">London, UK</span>
            </div>
          </div>
        </div>

        {/* From My Lens */}
        <div className="mb-20 border-t border-white/10 pt-16">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
              From my lens
            </span>
            <p className="mx-auto max-w-3xl text-2xl text-white/50 sm:text-3xl">
              I notice <span className="font-semibold text-white">patterns, details,</span> and{" "}
              <span className="font-semibold text-white">flow,</span> in cities, spaces, and
              products.
            </p>
          </div>

          <div className="group relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-24"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-24"
            />
            <div className="marquee-track flex w-max gap-6 pb-4 [animation-duration:32s] group-hover:[animation-play-state:paused]">
              {[...lensPhotos, ...lensPhotos].map((photo, i) => (
                <figure
                  key={`${photo.caption}-${i}`}
                  className="shrink-0 rotate-(--tilt) rounded-sm bg-white p-2 pb-4 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)]"
                  style={{ "--tilt": `${i % 2 === 0 ? "-2deg" : "2deg"}` } as CSSProperties}
                >
                  <div className="relative h-44 w-36 overflow-hidden sm:h-52 sm:w-44">
                    <Image src={photo.src} alt={photo.caption} fill className="object-cover" />
                  </div>
                  <figcaption className="mt-2 max-w-36 text-center text-xs text-black/70 sm:max-w-44">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="border-t border-white/10 pt-16">
          <h2 className="mb-6 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
            Core Competencies
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {competencies.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
