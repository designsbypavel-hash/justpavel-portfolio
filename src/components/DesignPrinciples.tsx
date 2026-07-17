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
            className="flex gap-3 rounded-xl p-4"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "#1c1c1e" }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.50)" }}
            >
              {i + 1}
            </span>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              {principle}
            </p>
          </div>
        ))}
      </div>
      {image && (
        <div className="-mx-6 mt-4 flex justify-center sm:-mx-16">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <Image src={image} alt="Design principle trade-offs" width={1920} height={1080} quality={100} className="block h-auto max-h-[640px] w-auto max-w-full" />
          </div>
        </div>
      )}
    </section>
  );
}
