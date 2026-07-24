"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

type RejectedItem = string | { text: string; image?: string };

export default function RejectedConcepts({ heading, items }: { heading: string; items: RejectedItem[] }) {
  const { theme } = useTheme();
  const L = theme === "light";
  if (items.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => {
          const text = typeof item === "string" ? item : item.text;
          const image = typeof item === "string" ? undefined : item.image;
          return (
            <div key={i} className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
              <div className="flex items-start gap-3">
                <span aria-hidden className="mt-0.5 shrink-0 text-sm font-semibold text-red-400">✕</span>
                <p className="text-sm" style={{ color: L ? "#333333" : "rgba(255,255,255,0.75)" }}>{text}</p>
              </div>
              {image && (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <Image src={image} alt={text} width={800} height={500} quality={90} className="block h-auto w-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
