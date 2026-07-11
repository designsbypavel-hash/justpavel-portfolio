import Image from "next/image";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "YouTube",
  description: "Pavel Mondal on YouTube — videos on AI tools for designers, UX workflows, and product design practice.",
  alternates: { canonical: "https://www.justpaveldesign.com/youtube" },
  openGraph: {
    title: "YouTube — Pavel Mondal, Product Designer",
    description: "Videos on AI tools for designers, UX workflows, and product design practice.",
    url: "https://www.justpaveldesign.com/youtube",
    images: [{ url: "https://www.justpaveldesign.com/site-assets/og-image.png", width: 1200, height: 630 }],
  },
};

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

export default function YoutubePage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-16 uppercase">
          Youtube
        </h1>
        <div className="grid gap-8 sm:grid-cols-2">
          {videos.map((video) => (
            <a
              key={video.title}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/30">
                <Image src={video.image} alt={video.title} fill className="object-cover" />
              </div>
              <p className="font-medium transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/80">
                {video.title}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-12">
          <CTASection
            href="https://www.youtube.com/@DesignWithPavel"
            label="Visit My Channel"
            external
          />
        </div>
      </div>
    </div>
  );
}
