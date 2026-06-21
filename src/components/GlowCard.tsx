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
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
