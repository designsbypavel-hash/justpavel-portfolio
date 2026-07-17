"use client";

import Image from "next/image";
import type { Section } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function OutcomeSection({ sections }: { sections: Section[] }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const border = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const strong = L ? "#111111" : "rgba(255,255,255,0.90)";
  const body = L ? "#333333" : "rgba(255,255,255,0.75)";
  if (sections.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">Results</h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="mb-3" style={{ color: strong }}>{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((p, i) => (
                <p key={i} style={{ color: body }}>{p}</p>
              ))}
            </div>
            {section.image && (
              <div className="-mx-6 mt-4 flex justify-center sm:-mx-16">
                <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${border}` }}>
                  <Image src={section.image} alt={section.heading} width={1920} height={1080} quality={100} className="block h-auto max-h-[640px] w-auto max-w-full" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
