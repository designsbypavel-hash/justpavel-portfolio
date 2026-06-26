export default function DesignPrinciples({ principles }: { principles: string[] }) {
  if (principles.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">Design Principles</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {principles.map((principle, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/60">
              {i + 1}
            </span>
            <p className="text-sm text-white/75">{principle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
