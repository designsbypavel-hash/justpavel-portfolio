import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <span className="font-(family-name:--font-heading) text-lg font-extrabold lowercase">
          pavel
        </span>
        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/works" className="hover:text-white">works</Link>
          <Link href="/youtube" className="hover:text-white">youtube</Link>
          <Link href="/about" className="hover:text-white">about</Link>
          <Link href="/contact" className="hover:text-white">contact</Link>
        </nav>
        <a
          href="https://adplist.org/mentors/pavel-mondal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded border border-white/30 text-white/70 hover:text-white"
          aria-label="LinkedIn"
        >
          in
        </a>
      </div>
    </footer>
  );
}
