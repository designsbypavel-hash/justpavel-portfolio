import type { Hypothesis } from "@/lib/projects";

export default function ProductHypothesis({ hypothesis }: { hypothesis: Hypothesis }) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">Product Hypothesis</h2>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p className="mb-3 text-white/80">
          <span className="font-semibold text-white/40">We believed: </span>
          {hypothesis.weBelieved}
        </p>
        <p className="mb-3 text-white/80">
          <span className="font-semibold text-white/40">If we: </span>
          {hypothesis.ifWe}
        </p>
        <p className="mb-3 text-white/80">
          <span className="font-semibold text-white/40">Then: </span>
          {hypothesis.then}
        </p>
        <p className="mb-5 text-white/80">
          <span className="font-semibold text-white/40">Because: </span>
          {hypothesis.because}
        </p>
        {hypothesis.risks.length > 0 && (
          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
              Risks
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
              {hypothesis.risks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
