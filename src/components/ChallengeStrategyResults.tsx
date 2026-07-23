"use client";

import Image from "next/image";
import type { Decision, Section } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

function useCS() {
  const { theme } = useTheme();
  const L = theme === "light";
  return {
    border: L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)",
    cardBg: L ? "#ffffff" : "rgba(255,255,255,0.03)",
    strong: L ? "#111111" : "rgba(255,255,255,0.90)",
    body: L ? "#333333" : "rgba(255,255,255,0.75)",
    dim: L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.55)",
    muted: L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)",
  };
}

export function ChallengeSection({ sections }: { sections: Section[] }) {
  const cs = useCS();
  if (sections.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">Challenge</h2>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="mb-3" style={{ color: cs.strong }}>{section.heading}</h3>
            <div className="space-y-3">
              {section.paragraphs.map((p, i) => (
                <p key={i} style={{ color: cs.body }}>{p}</p>
              ))}
            </div>
            {section.image && (
              <div className="mt-6 overflow-hidden rounded-xl" style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", border: `1px solid ${cs.border}` }}>
                <Image src={section.image} alt={section.heading} width={1920} height={1080} quality={100} className="block h-auto w-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DecisionCard({ decision, index }: { decision: Decision; index: number }) {
  const cs = useCS();
  return (
    <div className="rounded-xl p-6 sm:p-8" style={{ border: `1px solid ${cs.border}` }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="mb-0">Decision {index + 1}: {decision.title}</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-500">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Shipped
        </span>
      </div>
      <p className="mb-4 text-sm" style={{ color: cs.dim }}>
        <span className="font-semibold" style={{ color: cs.muted }}>Why: </span>{decision.why}
      </p>
      {decision.image && (
        <div className="-mx-6 mb-4 flex justify-center sm:-mx-8">
          <div className="overflow-hidden rounded-lg" style={{ border: `1px solid ${cs.border}` }}>
            <Image src={decision.image} alt={decision.title} width={1920} height={1080} quality={100} className="block h-auto max-h-[640px] w-auto max-w-full" />
          </div>
        </div>
      )}
      {decision.alternativesConsidered && decision.alternativesConsidered.length > 0 && (
        <div className="mb-4 rounded-lg p-4" style={{ border: `1px solid ${cs.border}`, background: cs.cardBg }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: cs.muted }}>Alternatives Considered</p>
          <ul className="list-inside list-disc space-y-1 text-sm" style={{ color: cs.dim }}>
            {decision.alternativesConsidered.map((alt, j) => <li key={j}>{alt}</li>)}
          </ul>
        </div>
      )}
      <ul className="mb-4 list-inside list-disc space-y-1 text-sm" style={{ color: cs.body }}>
        {decision.whatChanged.map((item, j) => <li key={j}>{item}</li>)}
      </ul>
      <p className="mb-4 text-sm" style={{ color: cs.strong }}>
        <span className="font-semibold" style={{ color: cs.muted }}>Result: </span>{decision.result}
      </p>
      {decision.tradeOff && (
        <p className="mb-2 text-sm" style={{ color: cs.dim }}>
          <span className="font-semibold" style={{ color: cs.muted }}>Trade-off: </span>{decision.tradeOff}
        </p>
      )}
      {decision.businessReasoning && (
        <p className="text-sm" style={{ color: cs.dim }}>
          <span className="font-semibold" style={{ color: cs.muted }}>Business reasoning: </span>{decision.businessReasoning}
        </p>
      )}
    </div>
  );
}

export function StrategySection({ decisions }: { decisions: Decision[] }) {
  const cs = useCS();
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
              <span className="h-px flex-1" style={{ background: cs.border }} />
              <h3 className="mb-0 text-sm font-semibold uppercase tracking-wide" style={{ color: cs.dim }}>{group.phase}</h3>
              <span className="h-px flex-1" style={{ background: cs.border }} />
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
