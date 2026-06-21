import DarkImageSection from "@/components/DarkImageSection";

export default function ProcessSection({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  if (images.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">
        Process &amp; Visuals
      </h2>
      <div className="space-y-8">
        {images.map((src, i) => (
          <DarkImageSection key={src} src={src} alt={`${title} — process visual ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
