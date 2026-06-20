import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

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
        <SocialLinks />
      </div>
    </footer>
  );
}
