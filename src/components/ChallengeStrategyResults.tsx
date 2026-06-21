import type { Decision, Section } from "@/lib/projects";

export function ChallengeSection({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
        Challenge
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

export function StrategySection({ decisions }: { decisions: Decision[] }) {
  if (decisions.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
        Strategy
      </h2>
      <div className="space-y-10">
        {decisions.map((decision, i) => (
          <div key={decision.title} className="rounded-xl border border-white/10 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold">
              Decision {i + 1}: {decision.title}
            </h3>
            <p className="mb-4 text-sm text-white/60">
              <span className="font-semibold text-white/40">Why — </span>
              {decision.why}
            </p>
            {decision.alternativesConsidered && decision.alternativesConsidered.length > 0 && (
              <div className="mb-4 rounded-lg border border-white/10 bg-black/30 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Alternatives Considered
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
                  {decision.alternativesConsidered.map((alt, j) => (
                    <li key={j}>{alt}</li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-white/70">
              {decision.whatChanged.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white/40">Result — </span>
              {decision.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
