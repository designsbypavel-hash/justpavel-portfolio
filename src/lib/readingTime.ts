import type { Project } from "@/lib/projects";

export function estimateReadingTime(project: Project): number {
  const allText: string[] = [
    project.description,
    project.tldrProblem,
    project.tldrWhatIDid,
    project.tldrImpact,
    ...project.context.flatMap((s) => s.paragraphs),
    ...project.decisions.flatMap((d) => [
      d.why,
      ...(d.alternativesConsidered ?? []),
      ...d.whatChanged,
      d.result,
    ]),
    ...project.closingSections.flatMap((s) => s.paragraphs),
  ];

  const wordCount = allText.join(" ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return minutes;
}
