"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function CaseStudyOverview({ role, platform, team, duration }: { role: string; platform: string; team: string; duration?: string }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const labelColor = L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)";
  const valueColor = L ? "#111111" : "rgba(255,255,255,0.80)";
  const borderColor = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  return (
    <div className="mb-12 grid gap-4 py-6 text-sm sm:grid-cols-4" style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}>
      {[{ label: "Role", value: role }, { label: "Platform", value: platform }, { label: "Team", value: team }, ...(duration ? [{ label: "Duration", value: duration }] : [])].map(({ label, value }) => (
        <div key={label}>
          <span className="block" style={{ color: labelColor }}>{label}</span>
          <span style={{ color: valueColor }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
