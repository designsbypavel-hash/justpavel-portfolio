"use client";

import type { TeamGroup } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function TeamComposition({ groups, platform }: { groups: TeamGroup[]; platform?: string }) {
  const { theme } = useTheme();
  const L = theme === "light";
  if (groups.length === 0) return null;
  const cardStyle = { border: `1px solid ${L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)"}`, background: L ? "#ffffff" : "rgba(255,255,255,0.03)" };
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">Team Composition</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.function} className="rounded-xl p-5" style={cardStyle}>
            <span className="mb-2 block text-xs uppercase tracking-widest" style={{ color: L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)" }}>{group.function}</span>
            <span style={{ color: L ? "#111111" : "rgba(255,255,255,0.80)" }}>{group.members}</span>
          </div>
        ))}
        {platform && (
          <div className="rounded-xl p-5" style={cardStyle}>
            <span className="mb-2 block text-xs uppercase tracking-widest" style={{ color: L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)" }}>Platform</span>
            <span style={{ color: L ? "#111111" : "rgba(255,255,255,0.80)" }}>{platform}</span>
          </div>
        )}
      </div>
    </section>
  );
}
