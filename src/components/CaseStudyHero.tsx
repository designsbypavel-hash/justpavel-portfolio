import Link from "next/link";

export default function CaseStudyHero({
  category,
  title,
  description,
  readingTime,
}: {
  category: string;
  title: string;
  description: string;
  readingTime: number;
}) {
  return (
    <div className="mb-12">
      <Link href="/works" className="mb-10 block text-sm text-white/50 hover:text-white">
        ← All Projects
      </Link>

      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-widest text-white/50">
        <span>{category}</span>
        <span aria-hidden>·</span>
        <span>{readingTime} min read</span>
      </div>

      <h1 className="mb-6">
        {title}
      </h1>
      <p className="text-lg text-white/70">{description}</p>
    </div>
  );
}
