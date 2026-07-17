"use client";

import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

const DARK_VARS: CSSProperties = {
  "--cs-text-body":   "rgba(255,255,255,0.75)",
  "--cs-text-dim":    "rgba(255,255,255,0.55)",
  "--cs-text-muted":  "rgba(255,255,255,0.40)",
  "--cs-text-strong": "rgba(255,255,255,0.90)",
  "--cs-border":      "rgba(255,255,255,0.10)",
  "--cs-card-bg":     "rgba(255,255,255,0.03)",
} as CSSProperties;

const LIGHT_VARS: CSSProperties = {
  "--cs-text-body":   "rgba(17,17,17,0.80)",
  "--cs-text-dim":    "rgba(17,17,17,0.60)",
  "--cs-text-muted":  "rgba(17,17,17,0.45)",
  "--cs-text-strong": "rgba(17,17,17,0.95)",
  "--cs-border":      "rgba(0,0,0,0.10)",
  "--cs-card-bg":     "#ffffff",
} as CSSProperties;

export default function ThemeVarProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <div style={theme === "light" ? LIGHT_VARS : DARK_VARS}>
      {children}
    </div>
  );
}
