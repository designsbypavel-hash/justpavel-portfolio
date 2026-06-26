import Image from "next/image";
import type { ImpactCategory } from "@/lib/projects";

export default function BusinessImpact({
  categories,
  image,
  heading = "Business Impact",
}: {
  categories: ImpactCategory[];
  image?: string;
  heading?: string;
}) {
  if (categories.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">{heading}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.category} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="mb-3 text-sm uppercase tracking-wide text-white/50">{cat.category}</h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-white/75">
              {cat.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {image && (
        <div className="-mx-6 mt-6 overflow-hidden rounded-xl border border-white/10 sm:-mx-16">
          <Image
            src={image}
            alt="Business impact dashboard"
            width={1920}
            height={1080}
            quality={100}
            className="mx-auto h-auto max-h-[640px] w-auto max-w-full"
          />
        </div>
      )}
    </section>
  );
}
