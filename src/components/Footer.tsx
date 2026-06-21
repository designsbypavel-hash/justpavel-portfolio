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
          {[
            { href: "/works", label: "works" },
            { href: "/youtube", label: "youtube" },
            { href: "/about", label: "about" },
            { href: "/contact", label: "contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <SocialLinks />
      </div>
    </footer>
  );
}
