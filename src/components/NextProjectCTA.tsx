"use client";

import Link from "next/link";
import { playClickSound } from "@/lib/sound";

export default function NextProjectCTA({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  return (
    <div className="mt-16 border-t border-white/10 pt-10">
      <span className="mb-2 block text-xs uppercase tracking-widest text-white/40">
        Next Project
      </span>
      <Link
        href={`/work/${slug}`}
        onClick={playClickSound}
        className="group flex items-center justify-between gap-4 text-xl font-semibold sm:text-2xl"
      >
        <span className="transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white/70">
          {title}
        </span>
        <span
          aria-hidden
          className="text-white/40 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-white"
        >
          →
        </span>
      </Link>
    </div>
  );
}
