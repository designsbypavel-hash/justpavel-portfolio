import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Work | Pavel",
  description: "Case studies in AI-first B2B SaaS and high-conversion B2C mobile experiences.",
};

export default function WorksPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-16 uppercase">
          All Projects
        </h1>
        <div className="space-y-16">
          {projects.map((project) => (
            <FadeInSection key={project.slug}>
              <ProjectCard project={project} titleAs="h2" />
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
}
