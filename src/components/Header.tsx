import Link from "next/link";

const navLinks = [
  { href: "/works", label: "Work" },
  { href: "/youtube", label: "Youtube" },
  { href: "/mentoring", label: "Mentoring" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-(family-name:--font-heading) text-lg font-extrabold tracking-tight transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-70"
        >
          PAVEL
        </Link>
        <nav className="hidden gap-8 text-sm text-white/80 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
