"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function CaseStudyHero({ category, title, description, readingTime }: { category: string; title: string; description: string; readingTime: number }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const muted = L ? "rgba(17,17,17,0.50)" : "rgba(255,255,255,0.50)";
  const body = L ? "#222222" : "rgba(255,255,255,0.70)";
  return (
    <div className="mb-12">
      <Link href="/works" className="mb-10 block text-sm transition-opacity hover:opacity-70" style={{ color: muted }}>← All Projects</Link>
      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-widest" style={{ color: muted }}>
        <span>{category}</span><span aria-hidden>·</span><span>{readingTime} min read</span>
      </div>
      <h1 className="mb-6">{title}</h1>
      <p className="text-lg" style={{ color: body }}>{description}</p>
    </div>
  );
}
