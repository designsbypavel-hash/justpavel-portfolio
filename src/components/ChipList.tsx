export default function ChipList({
  heading,
  chips,
}: {
  heading: string;
  chips: string[];
}) {
  if (chips.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">{heading}</h2>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70"
          >
            {chip}
          </span>
        ))}
      </div>
    </section>
  );
}
