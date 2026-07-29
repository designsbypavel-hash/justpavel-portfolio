"use client";

import { useEffect, useRef, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "cs-overview", label: "Overview" },
  { id: "cs-insight", label: "Key insight" },
  { id: "cs-opportunity", label: "Opportunity" },
  { id: "cs-hypothesis", label: "Hypothesis" },
  { id: "cs-challenge", label: "Challenge" },
  { id: "cs-journey", label: "User journey" },
  { id: "cs-strategy", label: "Strategy" },
  { id: "cs-impact", label: "Impact" },
  { id: "cs-outcome", label: "Outcome" },
];

export default function CaseStudyNav({ visibleIds }: { visibleIds?: string[] }) {
  const [active, setActive] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const items = visibleIds
    ? NAV_ITEMS.filter((n) => visibleIds.includes(n.id))
    : NAV_ITEMS;

  useEffect(() => {
    const candidates = items.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (candidates.length === 0) return;

    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size === 0) return;

        // Pick the topmost visible section
        const sorted = candidates
          .filter((el) => visible.has(el.id))
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

        if (sorted.length > 0) setActive(sorted[0].id);
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    candidates.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="hidden xl:block"
      style={{ position: "sticky", top: "6rem", alignSelf: "start" }}
    >
      <p className="mb-4 text-[11px] font-semibold tracking-widest text-white/50">
        ON THIS PAGE
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="group relative flex w-full items-center gap-3 rounded py-1.5 text-left transition-colors duration-200"
              >
                {/* Track line */}
                <span
                  className="relative h-full shrink-0"
                  style={{ width: "2px" }}
                >
                  <span
                    className="absolute inset-0 rounded-full transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.20)",
                      transform: isActive ? "scaleY(1)" : "scaleY(0.5)",
                      transformOrigin: "top",
                    }}
                  />
                </span>

                <span
                  className="text-[13px] leading-none transition-colors duration-200"
                  style={{
                    color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
