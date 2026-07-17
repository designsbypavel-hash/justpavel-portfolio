"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ChipList({ heading, chips }: { heading: string; chips: string[] }) {
  const { theme } = useTheme();
  const L = theme === "light";
  if (chips.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">{heading}</h2>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full px-3 py-1.5 text-sm" style={{ border: `1px solid ${L ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)"}`, color: L ? "#333333" : "rgba(255,255,255,0.70)" }}>{chip}</span>
        ))}
      </div>
    </section>
  );
}
