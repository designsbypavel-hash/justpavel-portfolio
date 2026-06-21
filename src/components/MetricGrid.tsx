import type { ImpactStat } from "@/lib/projects";

export default function MetricGrid({ stats }: { stats: ImpactStat[] }) {
  if (stats.length === 0) return null;

  const gridCols = stats.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className={`mb-12 grid gap-8 ${gridCols}`}>
      {stats.map((stat, i) => (
        <div key={`${stat.label}-${i}`} className="border-t border-white/30 pt-4">
          <div className="font-(family-name:--font-heading) text-4xl font-extrabold">
            {stat.value}
          </div>
          <div className="mt-2 text-sm text-white/60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
