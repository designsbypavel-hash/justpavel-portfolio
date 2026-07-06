import Image from "next/image";

export default function KeyInsight({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="mb-12">
      <div className="rounded-xl border border-white/15 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.03] to-orange-500/[0.08] p-6 sm:p-8">
        <span className="mb-3 inline-block rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
          Key Insight
        </span>
        <h2 className="mb-3 h2-heading">{title}</h2>
        <p className="text-white/70">{description}</p>
      </div>
      {image && (
        <div className="-mx-6 mt-4 flex justify-center sm:-mx-16">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Image
              src={image}
              alt={title}
              width={1920}
              height={1080}
              quality={100}
              className="block h-auto max-h-[640px] w-auto max-w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
