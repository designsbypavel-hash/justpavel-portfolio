import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design case studies by Pavel Mondal — AI platforms, enterprise SaaS, and high-conversion B2C mobile experiences.",
  alternates: { canonical: "https://www.justpaveldesign.com/works" },
  openGraph: {
    title: "Work — Pavel Mondal, Product Designer",
    description: "Product design case studies covering AI platforms, enterprise SaaS, and B2C mobile.",
    url: "https://www.justpaveldesign.com/works",
    images: [{ url: "https://www.justpaveldesign.com/site-assets/og-image.png", width: 1200, height: 630 }],
  },
};

export default function WorksPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/35">Case Studies</p>
          <h1 className="mb-4 font-(family-name:--font-heading) text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            All Projects
          </h1>
          <p className="max-w-xl text-lg text-white/50">
            End-to-end UX across AI platforms, enterprise SaaS, and high-conversion consumer products.
          </p>
        </div>
        <div className="space-y-16">
          {projects.map((project) => (
            <FadeInSection key={project.slug}>
              <ProjectCard project={project} titleAs="h3" />
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
}
