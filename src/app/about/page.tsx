import Image from "next/image";
import type { Metadata } from "next";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
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
    <div className="py-24">
      <div className="mx-auto max-w-6xl px-6">

        {/* Hero two-column */}
        <div className="mb-28 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* Left: intro text */}
          <div className="flex-1">
            <p className="mb-5 text-xs uppercase tracking-widest text-white/45">About</p>
            <h1 className="mb-8 text-5xl font-bold leading-[1.06] tracking-[0.01em] sm:text-6xl lg:text-7xl">
              I design products. But I spend most of my time understanding people.
            </h1>
            <p className="text-lg leading-relaxed text-white/50">
              Eight years across <strong className="font-semibold text-white">AI products, enterprise SaaS, and consumer apps</strong> used by 350M+ people. I started most projects the same way: by ignoring the brief long enough to understand the actual problem. The technology, the roadmap, the timelines are real constraints. But the real question is always <strong className="font-semibold text-white">what the person using this actually needs.</strong> Outside of work, I mentor designers who are trying to figure out where to start. I remember what that felt like.
            </p>
          </div>

          {/* Right: portrait card */}
          <div className="relative flex-shrink-0 lg:w-72">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-white/5" />
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
                <p className="text-xs text-white/50">Senior Product Designer, London</p>
              </div>
            </div>
          </div>
        </div>

        {/* Outside of work */}
        <div className="mb-28">
          <h2 className="mb-6">Outside of work</h2>
          <div className="space-y-5 text-lg leading-relaxed text-white/50">
            <p>
              I grew up in <strong className="font-semibold text-white">West Bengal, India.</strong> Design was not part of how I was raised. I found it later, pushed in by curiosity and pulled in by the work. Getting here took longer than I expected. I am glad it did.
            </p>
            <p>
              I walk a lot. Almost always with a camera. Cities mostly: London, York, Paris, Liverpool. I am not trying to make good photos. I am just trying to be somewhere <strong className="font-semibold text-white">without a deliverable attached to it.</strong> It helps more than I can explain.
            </p>
            <p>
              I am an <strong className="font-semibold text-white">Arsenal fan</strong> and I follow Formula 1 closely. What I love about both is <strong className="font-semibold text-white">the part that does not make the highlights.</strong> How Arteta rebuilt Arsenal's culture from the inside, the way the whole squad moves differently now compared to three years ago. In F1, the driver gets the trophy but <strong className="font-semibold text-white">the pitstop crew rehearses thousands of times</strong> to shave one second off a stop that already takes less than two. That kind of <strong className="font-semibold text-white">unseen work, done over and over until it becomes automatic,</strong> is what I find genuinely fascinating.
            </p>
            <div className="my-6 overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/site-assets/pitstop.webp"
                alt="F1 pitstop crew in action"
                width={1200}
                height={675}
                className="block h-auto w-full object-cover"
                quality={90}
              />
            </div>
            <p>
              The result is visible. <strong className="font-semibold text-white">The work that makes it possible is not.</strong> I think about that a lot.
            </p>
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-28">
          <h2 className="mb-6">How I work</h2>
          <div className="space-y-5 text-lg leading-relaxed text-white/50">
            <p>
              When something is not working in a product, it is almost never the thing that looks broken. The button nobody clicks. The checkout that loses people at the last step. The dashboard nobody opens after week one. <strong className="font-semibold text-white">I have spent eight years learning to not fix the button.</strong> To go back far enough to find the real problem.
            </p>
            <p>
              Before I open Figma, I map what I know and what I am guessing. I write down the hypothesis: not a vague direction, but a specific belief that can be wrong. Then I try to prove it wrong. I pull PMs and stakeholders into decisions early, not because it is good process, but because <strong className="font-semibold text-white">I have seen what happens when they are not there.</strong> The design ships perfectly and gets changed in engineering because nobody understood why a decision was made. I would rather have the argument early.
            </p>
            <p>
              Then I test. Not to confirm what I think, but to find out what I got wrong. <strong className="font-semibold text-white">There is always something.</strong>
            </p>
          </div>
        </div>

        {/* Jobs quotes */}
        <div className="mb-28">
          {/* Featured quote */}
          <div className="mb-0">
            <div className="border-l border-white/15 py-8 pl-8">
              <blockquote className="text-2xl font-medium leading-snug tracking-[-0.01em] text-white/80 sm:text-3xl">
                "Design is not just what it looks like and feels like. Design is how it works."
              </blockquote>
              <p className="mt-4 text-sm text-white/35">Steve Jobs</p>
            </div>
          </div>
          {/* Two smaller quotes */}
          <div className="grid grid-cols-1 gap-0 pt-px lg:grid-cols-2">
            <div className="border-l border-white/15 py-8 pl-8 lg:border-r-0 lg:pr-12">
              <blockquote className="text-lg leading-relaxed text-white/55">
                "Simple can be harder than complex. You have to work hard to get your thinking clean to make it simple."
              </blockquote>
              <p className="mt-4 text-sm text-white/30">Steve Jobs</p>
            </div>
            <div className="border-l border-white/15 py-8 pl-8 lg:pl-12">
              <blockquote className="text-lg leading-relaxed text-white/55">
                "Details matter. It is worth waiting to get it right."
              </blockquote>
              <p className="mt-4 text-sm text-white/30">Steve Jobs</p>
            </div>
          </div>
        </div>

        {/* Tool Stack full-width marquee */}
        <ToolStack />

        {/* Testimonials */}
        <TestimonialsCarousel />

        {/* From My Lens */}
        <div>
          <h2 className="mb-2">From my lens</h2>
          <p className="mb-10 text-base text-white/50">These are from walks I have taken in London, York, Paris, Liverpool, and a few places in between. No brief. No output. Just looking.</p>
        </div>
        <LensGallery photos={lensPhotos} />

      </div>
    </div>
  );
}
