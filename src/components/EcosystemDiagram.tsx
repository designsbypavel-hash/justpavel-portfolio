"use client";

import type { EcosystemDiagram as EcosystemDiagramType } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function EcosystemDiagram({ diagram }: { diagram: EcosystemDiagramType }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const border = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const cardBg = L ? "#ffffff" : "rgba(255,255,255,0.03)";
  const strong = L ? "#111111" : "rgba(255,255,255,0.90)";
  const dim = L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.55)";
  const muted = L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)";
  return (
    <section className="mb-12">
      <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs uppercase tracking-widest" style={{ border: `1px solid ${border}`, color: dim }}>Ecosystem Diagram</span>
      <h2 className="mb-2 h2-heading">{diagram.title}</h2>
      <p className="mb-8" style={{ color: dim }}>{diagram.subtitle}</p>
      <div className="-mx-6 overflow-x-auto sm:-mx-16 sm:overflow-x-visible">
        <div className="min-w-[900px] px-6 sm:min-w-0 sm:px-16">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: muted }}>User Journey</div>
          <div className="mb-6 flex items-stretch gap-2">
            {diagram.journeySteps.map((step, i) => (
              <div key={step.label} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-xl p-4" style={{ border: `1px solid ${border}`, background: cardBg }}>
                  <p className="mb-1 text-sm font-semibold" style={{ color: strong }}>{step.label}</p>
                  <p className="text-xs" style={{ color: dim }}>{step.description}</p>
                </div>
                {i < diagram.journeySteps.length - 1 && <span aria-hidden style={{ color: muted }}>→</span>}
              </div>
            ))}
          </div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: muted }}>Supporting Systems</div>
          <div className="mb-6 grid grid-cols-5 gap-2">
            {diagram.supportingSystems.map((system) => (
              <div key={system.name} className="rounded-xl p-4" style={{ border: `1px solid ${border}`, background: cardBg }}>
                <p className="mb-2 text-sm font-semibold" style={{ color: strong }}>{system.name}</p>
                <ul className="space-y-1 text-xs" style={{ color: dim }}>
                  {system.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-8 rounded-xl p-4" style={{ border: `1px solid ${border}`, background: cardBg }}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: muted }}>Data &amp; Analytics Layer</p>
            <p className="text-sm" style={{ color: dim }}>{diagram.dataLayerItems.join(" · ")}</p>
          </div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: muted }}>Business Impact</div>
          <div className="grid grid-cols-5 gap-2">
            {diagram.impactStats.map((stat) => (
              <div key={stat.label} className="rounded-xl p-4" style={{ border: `1px solid ${border}`, background: cardBg }}>
                <p className="mb-1 text-xl font-extrabold" style={{ color: strong }}>{stat.value}</p>
                <p className="text-xs" style={{ color: dim }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
