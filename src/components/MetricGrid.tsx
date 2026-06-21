import type { ImpactStat } from "@/lib/projects";

export default function MetricGrid({ stats }: { stats: ImpactStat[] }) {
  const items: ImpactStat[] =
    stats.length > 0
      ? stats
      : [
          { value: "[Add real metric here]", label: "Primary outcome" },
          { value: "[Add real metric here]", label: "Secondary outcome" },
          { value: "[Add real metric here]", label: "Secondary outcome" },
        ];

  return (
    <div className="mb-12 grid gap-8 sm:grid-cols-3">
      {items.map((stat, i) => (
        <div key={`${stat.label}-${i}`} className="border-t border-white/30 pt-4">
          <div
            className={
              stats.length > 0
                ? "font-(family-name:--font-heading) text-4xl font-extrabold"
                : "font-(family-name:--font-heading) text-sm font-semibold text-white/40 italic"
            }
          >
            {stat.value}
          </div>
          <div className="mt-2 text-sm text-white/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
