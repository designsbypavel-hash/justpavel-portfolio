import Link from "next/link";

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
        className="group flex items-center justify-between gap-4 text-xl font-semibold sm:text-2xl"
      >
        <span className="transition group-hover:text-white/70">{title}</span>
        <span aria-hidden className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white">
          →
        </span>
      </Link>
    </div>
  );
}
