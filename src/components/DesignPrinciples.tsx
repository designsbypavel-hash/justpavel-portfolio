import Image from "next/image";

export default function DesignPrinciples({
  principles,
  image,
  heading = "Design Principles",
}: {
  principles: string[];
  image?: string;
  heading?: string;
}) {
  if (principles.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">{heading}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {principles.map((principle, i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/60">
              {i + 1}
            </span>
            <p className="text-sm text-white/75">{principle}</p>
          </div>
        ))}
      </div>
      {image && (
        <div className="-mx-6 mt-4 overflow-hidden rounded-xl border border-white/10 sm:-mx-16">
          <Image
            src={image}
            alt="Design principle trade-offs"
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
