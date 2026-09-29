"use client";

import { useState } from "react";
import Image from "next/image";
import type { ConceptCard } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

const TAG_STYLES: Record<string, { bg: string; text: string }> = {
  Shipped: { bg: "rgba(34,197,94,0.12)", text: "#22c55e" },
  Discarded: { bg: "rgba(255,255,255,0.07)", text: "rgba(255,255,255,0.45)" },
};
const TAG_STYLES_LIGHT: Record<string, { bg: string; text: string }> = {
  Shipped: { bg: "rgba(22,163,74,0.10)", text: "#16a34a" },
  Discarded: { bg: "rgba(0,0,0,0.06)", text: "rgba(17,17,17,0.45)" },
};

export default function ConceptComparison({ concepts }: { concepts: ConceptCard[] }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const [active, setActive] = useState(0);

  const current = concepts[active];
  const tagMap = L ? TAG_STYLES_LIGHT : TAG_STYLES;
  const tagStyle = tagMap[current.tag] ?? TAG_STYLES[current.tag];

  const borderColor = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const cardBg = L ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)";
  const activeBg = L ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  const labelColor = L ? "rgba(17,17,17,0.50)" : "rgba(255,255,255,0.50)";
  const textColor = L ? "#111111" : "rgba(255,255,255,0.88)";
  const outcomeColor = L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.60)";

  return (
    <section className="mb-16">
      <h2 className="mb-2">Concepts explored</h2>
      <p className="mb-8 text-sm" style={{ color: labelColor }}>
        Three directions, one decision. Click each concept to see what we built, why we built it, and why we moved on.
      </p>

      {/* Tab strip */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {concepts.map((c, i) => {
          const ts = (L ? TAG_STYLES_LIGHT : TAG_STYLES)[c.tag] ?? TAG_STYLES[c.tag];
          const isActive = i === active;
          return (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              className="flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200"
              style={{
                background: isActive ? activeBg : "transparent",
                border: `1px solid ${isActive ? borderColor : "transparent"}`,
                color: isActive ? textColor : labelColor,
              }}
            >
              {c.label}
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: ts.bg, color: ts.text }}
              >
                {c.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{ border: `1px solid ${borderColor}`, background: cardBg }}
      >
        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          <Image
            key={current.image}
            src={current.image}
            alt={current.label}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-contain object-center"
          />
        </div>

        {/* Text */}
        <div className="grid gap-6 border-t p-6 sm:grid-cols-2" style={{ borderColor }}>
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>
              What we designed
            </p>
            <p className="text-sm leading-relaxed" style={{ color: textColor }}>
              {current.description}
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: labelColor }}>
              Why we moved on
            </p>
            <p className="text-sm leading-relaxed" style={{ color: outcomeColor }}>
              {current.outcome}
            </p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 pb-5 pt-1">
          {concepts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View ${concepts[i].label}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                background: i === active
                  ? (L ? "rgba(17,17,17,0.55)" : "rgba(255,255,255,0.55)")
                  : (L ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.20)"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
