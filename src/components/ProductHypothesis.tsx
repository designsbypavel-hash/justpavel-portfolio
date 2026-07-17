"use client";

import type { Hypothesis } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function ProductHypothesis({ hypothesis }: { hypothesis: Hypothesis }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const border = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const cardBg = L ? "#ffffff" : "rgba(255,255,255,0.03)";
  const strong = L ? "#111111" : "rgba(255,255,255,0.90)";
  const dim = L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.55)";
  const muted = L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)";
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">Product Hypothesis</h2>
      <div className="rounded-xl p-6 sm:p-8" style={{ border: `1px solid ${border}`, background: cardBg }}>
        {[
          { label: "We believed:", value: hypothesis.weBelieved },
          { label: "If we:", value: hypothesis.ifWe },
          { label: "Then:", value: hypothesis.then },
          { label: "Because:", value: hypothesis.because },
        ].map(({ label, value }) => (
          <p key={label} className="mb-3" style={{ color: strong }}>
            <span className="font-semibold" style={{ color: muted }}>{label} </span>
            {value}
          </p>
        ))}
        {hypothesis.risks.length > 0 && (
          <div className="rounded-lg p-4" style={{ border: `1px solid ${border}`, background: cardBg }}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: muted }}>Risks</p>
            <ul className="list-inside list-disc space-y-1 text-sm" style={{ color: dim }}>
              {hypothesis.risks.map((risk, i) => <li key={i}>{risk}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
