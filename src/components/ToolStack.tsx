"use client";

import Image from "next/image";
import { useState } from "react";

type Tool = {
  name: string;
  icon: string;
  bg: string;
  pad?: boolean;
};

const tools: Tool[] = [
  { name: "Claude",    icon: "/site-assets/tools/claude.png",      bg: "#2B1810" },
  { name: "Cursor",    icon: "/site-assets/tools/cursor.png",      bg: "#0F0F0F" },
  { name: "Figma",     icon: "/site-assets/tools/figma.png",       bg: "#1E1E1E" },
  { name: "FigJam",    icon: "/site-assets/tools/figjam.svg",      bg: "#2D1B69", pad: true },
  { name: "Linear",    icon: "/site-assets/tools/linear_si.svg",   bg: "#5E6AD2", pad: true },
  { name: "Framer",    icon: "/site-assets/tools/framer_si.svg",   bg: "#0055FF", pad: true },
  { name: "v0",        icon: "/site-assets/tools/v0_si.svg",       bg: "#000000", pad: true },
  { name: "Webflow",   icon: "/site-assets/tools/webflow.png",     bg: "#146EF5" },
  { name: "Dovetail",  icon: "/site-assets/tools/dovetail_si.svg", bg: "#1A1A2E", pad: true },
  { name: "Notion",    icon: "/site-assets/tools/notion.png",      bg: "#191919" },
  { name: "Miro",      icon: "/site-assets/tools/miro_si.svg",     bg: "#FFD02F", pad: true },
];

export default function ToolStack() {
  const [hovered, setHovered] = useState<string | null>(null);
  const doubled = [...tools, ...tools];

  return (
    <section className="mb-24">
      <h2 className="mb-4 uppercase">Tool Stack</h2>
      <p className="mb-12 max-w-2xl text-white/55 leading-relaxed">
        AI has automated a lot of surface-level design work, so now the value lies in systems
        thinking and the ability to translate complexity into clarity. I am constantly exploring
        and mastering new tools. Here&rsquo;s my current rotation.
      </p>

      <div className="group relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
        />

        <div className="marquee-track flex w-max gap-5 [animation-duration:30s] group-hover:[animation-play-state:paused]">
          {doubled.map((tool, i) => {
            const key = `${tool.name}-${i}`;
            const isHovered = hovered === key;
            return (
              <button
                key={key}
                type="button"
                aria-label={tool.name}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col items-center gap-3 outline-none"
              >
                <div
                  className="relative h-20 w-20 overflow-hidden rounded-[22px] sm:h-24 sm:w-24"
                  style={{
                    background: tool.bg,
                    padding: tool.pad ? "18%" : undefined,
                    boxShadow: isHovered
                      ? "0 0 0 2px rgba(255,255,255,0.3), 0 20px 40px -8px rgba(0,0,0,0.7)"
                      : "0 4px 16px -4px rgba(0,0,0,0.5)",
                    transform: isHovered ? "scale(1.12) translateY(-5px)" : "scale(1)",
                    transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                >
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    fill={!tool.pad}
                    width={tool.pad ? 200 : undefined}
                    height={tool.pad ? 200 : undefined}
                    className={tool.pad ? "h-full w-full object-contain" : "object-cover"}
                    unoptimized
                  />
                </div>
                <span
                  className="text-xs transition-colors duration-200"
                  style={{ color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                >
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
