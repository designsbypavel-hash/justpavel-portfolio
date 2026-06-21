import type { Section } from "@/lib/projects";

export default function OutcomeSection({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
        Results
      </h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="mb-3 text-lg font-semibold text-white/90">{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
