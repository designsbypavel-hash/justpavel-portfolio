import Image from "next/image";
import type { Section } from "@/lib/projects";

export default function OutcomeSection({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">
        Results
      </h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="mb-3 text-white/90">{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-white/70">
                  {p}
                </p>
              ))}
            </div>
            {section.image && (
              <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                <Image src={section.image} alt={section.heading} fill className="object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
