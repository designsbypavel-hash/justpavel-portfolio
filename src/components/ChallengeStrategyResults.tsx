import Image from "next/image";
import type { Decision, Section } from "@/lib/projects";

export function ChallengeSection({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">
        Challenge
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

function DecisionCard({ decision, index }: { decision: Decision; index: number }) {
  return (
    <div className="rounded-xl border border-white/10 p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="mb-0">
          Decision {index + 1}: {decision.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Shipped
        </span>
      </div>
      <p className="mb-4 text-sm text-white/60">
        <span className="font-semibold text-white/40">Why: </span>
        {decision.why}
      </p>
      {decision.image && (
        <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10">
          <Image src={decision.image} alt={decision.title} fill className="object-cover" />
        </div>
      )}
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
      <p className="mb-4 text-sm text-white/80">
        <span className="font-semibold text-white/40">Result: </span>
        {decision.result}
      </p>
      {decision.tradeOff && (
        <p className="mb-2 text-sm text-white/60">
          <span className="font-semibold text-white/40">Trade-off: </span>
          {decision.tradeOff}
        </p>
      )}
      {decision.businessReasoning && (
        <p className="text-sm text-white/60">
          <span className="font-semibold text-white/40">Business reasoning: </span>
          {decision.businessReasoning}
        </p>
      )}
    </div>
  );
}

export function StrategySection({ decisions }: { decisions: Decision[] }) {
  if (decisions.length === 0) return null;

  const hasPhases = decisions.some((d) => d.phase);

  if (!hasPhases) {
    return (
      <section className="mb-12">
        <h2 className="mb-8 uppercase">Strategy</h2>
        <div className="space-y-10">
          {decisions.map((decision, i) => (
            <DecisionCard key={decision.title} decision={decision} index={i} />
          ))}
        </div>
      </section>
    );
  }

  const phases: { phase: string; decisions: { decision: Decision; index: number }[] }[] = [];
  decisions.forEach((decision, i) => {
    const phaseLabel = decision.phase ?? "Strategy";
    const group = phases.find((p) => p.phase === phaseLabel);
    if (group) {
      group.decisions.push({ decision, index: i });
    } else {
      phases.push({ phase: phaseLabel, decisions: [{ decision, index: i }] });
    }
  });

  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">Strategy</h2>
      <div className="space-y-14">
        {phases.map((group) => (
          <div key={group.phase}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <h3 className="mb-0 text-sm font-semibold uppercase tracking-wide text-white/50">
                {group.phase}
              </h3>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div className="space-y-10">
              {group.decisions.map(({ decision, index }) => (
                <DecisionCard key={decision.title} decision={decision} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
