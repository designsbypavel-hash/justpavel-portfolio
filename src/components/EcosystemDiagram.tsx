import type { EcosystemDiagram as EcosystemDiagramType } from "@/lib/projects";

export default function EcosystemDiagram({ diagram }: { diagram: EcosystemDiagramType }) {
  return (
    <section className="mb-12">
      <span className="mb-3 inline-block rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
        Ecosystem Diagram
      </span>
      <h2 className="mb-2">{diagram.title}</h2>
      <p className="mb-8 text-white/60">{diagram.subtitle}</p>

      <div className="-mx-6 overflow-x-auto sm:-mx-16 sm:overflow-x-visible">
        <div className="min-w-[900px] px-6 sm:min-w-0 sm:px-16">
          {/* User Journey */}
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            User Journey
          </div>
          <div className="mb-6 flex items-stretch gap-2">
            {diagram.journeySteps.map((step, i) => (
              <div key={step.label} className="flex flex-1 items-center gap-2">
                <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="mb-1 text-sm font-semibold text-white/90">{step.label}</p>
                  <p className="text-xs text-white/55">{step.description}</p>
                </div>
                {i < diagram.journeySteps.length - 1 && (
                  <span aria-hidden className="shrink-0 text-white/30">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Supporting Systems */}
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Supporting Systems
          </div>
          <div className="mb-6 grid grid-cols-5 gap-2">
            {diagram.supportingSystems.map((system) => (
              <div key={system.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <p className="mb-2 text-sm font-semibold text-white/80">{system.name}</p>
                <ul className="space-y-1 text-xs text-white/55">
                  {system.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Data & Analytics Layer */}
          <div className="mb-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
              Data &amp; Analytics Layer
            </p>
            <p className="text-sm text-white/60">{diagram.dataLayerItems.join(" · ")}</p>
          </div>

          {/* Business Impact */}
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Business Impact
          </div>
          <div className="grid grid-cols-5 gap-2">
            {diagram.impactStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-1 text-xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
