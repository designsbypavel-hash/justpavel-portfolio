import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/youtube", label: "YouTube" },
  { href: "/mentoring", label: "Mentoring" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-10">
        <div>
          <span className="mb-6 block font-(family-name:--font-heading) text-lg font-extrabold lowercase">
            pavel
          </span>
          <nav className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
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

        <div className="text-right">
          <div className="mb-4 flex justify-end">
            <SocialLinks />
          </div>
          <p className="text-sm text-white/50">
            © {year} pavel. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Built with <span className="font-semibold text-white/70">Next.js</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
