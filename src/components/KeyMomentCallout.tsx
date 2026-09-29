"use client";

import { useTheme } from "@/components/ThemeProvider";

const LABEL_COLORS: Record<string, { bg: string; bgLight: string; text: string; textLight: string }> = {
  "System thinking":     { bg: "rgba(99,179,237,0.12)",  bgLight: "rgba(37,99,235,0.08)",  text: "#63b3ed", textLight: "#1d4ed8" },
  "Design decision":     { bg: "rgba(251,191,36,0.12)",  bgLight: "rgba(217,119,6,0.10)",  text: "#fbbf24", textLight: "#b45309" },
  "Collaboration":       { bg: "rgba(167,243,208,0.12)", bgLight: "rgba(4,120,87,0.10)",   text: "#6ee7b7", textLight: "#065f46" },
  "Evidence-based":      { bg: "rgba(216,180,254,0.12)", bgLight: "rgba(109,40,217,0.10)", text: "#c084fc", textLight: "#6d28d9" },
};

export default function KeyMomentCallout({
  label,
  headline,
  detail,
  accent = "#e65c1a",
}: {
  label: string;
  headline: string;
  detail?: string;
  accent?: string;
}) {
  const { theme } = useTheme();
  const L = theme === "light";

  const lc = LABEL_COLORS[label] ?? LABEL_COLORS["Design decision"];
  const chipBg   = L ? lc.bgLight  : lc.bg;
  const chipText = L ? lc.textLight : lc.text;

  const headlineColor = L ? "rgba(17,17,17,0.92)" : "rgba(255,255,255,0.92)";
  const detailColor   = L ? "rgba(17,17,17,0.55)" : "rgba(255,255,255,0.50)";
  const bgColor       = L ? "rgba(0,0,0,0.025)"   : "rgba(255,255,255,0.025)";

  return (
    <div
      className="my-10 rounded-r-xl py-4 pl-5 pr-5"
      style={{
        borderLeft: `3px solid ${accent}`,
        background: bgColor,
      }}
    >
      <span
        className="mb-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
        style={{ background: chipBg, color: chipText }}
      >
        {label}
      </span>
      <p className="text-base font-semibold leading-snug" style={{ color: headlineColor }}>
        {headline}
      </p>
      {detail && (
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: detailColor }}>
          {detail}
        </p>
      )}
    </div>
  );
}
