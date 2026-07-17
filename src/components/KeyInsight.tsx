"use client";

import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";

export default function KeyInsight({ title, description, image }: { title: string; description: string; image?: string }) {
  const { theme } = useTheme();
  const L = theme === "light";
  const border = L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)";
  const dim = L ? "rgba(17,17,17,0.60)" : "rgba(255,255,255,0.55)";
  const body = L ? "#333333" : "rgba(255,255,255,0.75)";
  return (
    <section className="mb-12">
      <div className="rounded-xl bg-gradient-to-br from-blue-500/[0.08] via-transparent to-orange-500/[0.08] p-6 sm:p-8" style={{ border: `1px solid ${border}` }}>
        <span className="mb-3 inline-block rounded-full px-3 py-1 text-xs uppercase tracking-widest" style={{ border: `1px solid ${border}`, color: dim }}>Key Insight</span>
        <h2 className="mb-3 h2-heading">{title}</h2>
        <p style={{ color: body }}>{description}</p>
      </div>
      {image && (
        <div className="-mx-6 mt-4 flex justify-center sm:-mx-16">
          <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${border}` }}>
            <Image src={image} alt={title} width={1920} height={1080} quality={100} className="block h-auto max-h-[640px] w-auto max-w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
