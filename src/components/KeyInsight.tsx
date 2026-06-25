export default function KeyInsight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mb-12">
      <div className="rounded-xl border border-white/15 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.03] to-orange-500/[0.08] p-6 sm:p-8">
        <span className="mb-3 inline-block rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
          Key Insight
        </span>
        <h2 className="mb-3">{title}</h2>
        <p className="text-white/70">{description}</p>
      </div>
    </section>
  );
}
