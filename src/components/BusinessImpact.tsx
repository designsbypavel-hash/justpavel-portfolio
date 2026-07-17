"use client";

import Image from "next/image";
import type { ImpactCategory } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

export default function BusinessImpact({
  categories,
  image,
  heading = "Business Impact",
}: {
  categories: ImpactCategory[];
  image?: string;
  heading?: string;
}) {
  const { theme } = useTheme();
  const L = theme === "light";
  if (categories.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.category} className="rounded-xl p-6" style={{ border: `1px solid ${L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)"}`, background: L ? "#ffffff" : "rgba(255,255,255,0.03)" }}>
            <h3 className="mb-3 text-sm uppercase tracking-wide" style={{ color: L ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.50)" }}>{cat.category}</h3>
            <ul className="list-inside list-disc space-y-2 text-sm" style={{ color: L ? "#222222" : "rgba(255,255,255,0.75)" }}>
              {cat.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        ))}
      </div>
      {image && (
        <div className="-mx-6 mt-6 flex justify-center sm:-mx-16">
          <div className="overflow-hidden rounded-xl" style={{ border: `1px solid ${L ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)"}` }}>
            <Image src={image} alt="Business impact" width={1920} height={1080} quality={100} className="block h-auto max-h-[640px] w-auto max-w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
