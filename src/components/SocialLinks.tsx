const links = [
  { href: "https://adplist.org/mentors/pavel-mondal", label: "Mentoring (ADPList)" },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded border border-white/30 text-white/70 hover:text-white"
          aria-label={link.label}
        >
          in
        </a>
      ))}
    </div>
  );
}
