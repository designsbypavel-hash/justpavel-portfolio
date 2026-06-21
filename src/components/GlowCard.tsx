import type { CSSProperties, ReactNode } from "react";

export default function GlowCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds to offset this card's animation so multiple cards don't pulse in sync. */
  delay?: number;
}) {
  return (
    <div
      className={`glow-card ${className}`}
      style={{ "--glow-delay": `${delay * -1}s` } as CSSProperties}
    >
      {/* Opaque surface sits between the outer blurred glow (::before, behind)
          and the content, so the glow only shows outside the card edges and
          never bleeds into the card's own interior. */}
      <div
        className="absolute inset-0 z-0 bg-[#0a0a0a]"
        style={{ borderRadius: "inherit" }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
