export default function CTASection({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
      >
        {label}
      </a>
    </div>
  );
}
