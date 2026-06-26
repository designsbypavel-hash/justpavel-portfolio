export default function RejectedConcepts({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4"
          >
            <span aria-hidden className="mt-0.5 shrink-0 text-sm font-semibold text-red-400">
              ✕
            </span>
            <p className="text-sm text-white/65">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
