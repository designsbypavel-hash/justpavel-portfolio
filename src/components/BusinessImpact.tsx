import type { ImpactCategory } from "@/lib/projects";

export default function BusinessImpact({ categories }: { categories: ImpactCategory[] }) {
  if (categories.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">Business Impact</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.category} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-3 text-sm uppercase tracking-wide text-white/50">{cat.category}</h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-white/75">
              {cat.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
