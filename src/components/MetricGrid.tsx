import type { ImpactStat } from "@/lib/projects";
import GlowCard from "@/components/GlowCard";

export default function MetricGrid({ stats }: { stats: ImpactStat[] }) {
  if (stats.length === 0) return null;

  const gridCols = stats.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className={`mb-12 grid gap-4 ${gridCols}`}>
      {stats.map((stat, i) => (
        <GlowCard key={`${stat.label}-${i}`} delay={i * 3.5} className="rounded-2xl p-5">
          <div className="font-(family-name:--font-heading) text-4xl font-extrabold">
            {stat.value}
          </div>
          <div className="mt-2 text-sm text-white/60">{stat.label}</div>
        </GlowCard>
      ))}
    </div>
  );
}
