"use client";

import Link from "next/link";
import { playClickSound } from "@/lib/sound";
import { useTheme } from "@/components/ThemeProvider";

export default function NextProjectCTA({ slug, title }: { slug: string; title: string }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const border = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const muted = L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.40)";
  return (
    <div className="mt-16 pt-10" style={{ borderTop: `1px solid ${border}` }}>
      <span className="mb-2 block text-xs uppercase tracking-widest" style={{ color: muted }}>Next Project</span>
      <Link href={`/work/${slug}`} onClick={playClickSound} className="group flex items-center justify-between gap-4 text-xl font-semibold sm:text-2xl">
        <span className="transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">{title}</span>
        <span aria-hidden className="transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" style={{ color: muted }}>→</span>
      </Link>
    </div>
  );
}
