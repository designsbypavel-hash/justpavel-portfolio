"use client";

import Image from "next/image";
import { useState } from "react";

const tools = [
  { name: "Claude", icon: "/site-assets/tools/claude.png" },
  { name: "Cursor", icon: "/site-assets/tools/cursor.png" },
  { name: "Figma", icon: "/site-assets/tools/figma.png" },
  { name: "FigJam", icon: "/site-assets/tools/figjam.png" },
  { name: "Linear", icon: "/site-assets/tools/linear.png" },
  { name: "Framer", icon: "/site-assets/tools/framer.svg" },
  { name: "v0", icon: "/site-assets/tools/v0.ico" },
  { name: "Webflow", icon: "/site-assets/tools/webflow.png" },
  { name: "Dovetail", icon: "/site-assets/tools/dovetail.png" },
  { name: "Notion", icon: "/site-assets/tools/notion.png" },
  { name: "Miro", icon: "/site-assets/tools/miro.png" },
  { name: "Adobe", icon: "/site-assets/tools/adobe.png" },
  { name: "Protopie", icon: "/site-assets/tools/protopie.svg" },
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
        and mastering new tools — here&rsquo;s my current rotation.
      </p>

      <div className="group relative overflow-hidden">
        {/* fade edges */}
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

        <div
          className="marquee-track flex w-max gap-5 [animation-duration:28s] group-hover:[animation-play-state:paused]"
        >
          {doubled.map((tool, i) => (
            <button
              key={`${tool.name}-${i}`}
              type="button"
              aria-label={tool.name}
              onMouseEnter={() => setHovered(`${tool.name}-${i}`)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center gap-3 outline-none"
            >
              <div
                className="relative h-20 w-20 overflow-hidden rounded-[22px] border border-white/10 transition-all duration-300 sm:h-24 sm:w-24"
                style={{
                  boxShadow:
                    hovered === `${tool.name}-${i}`
                      ? "0 0 0 2px rgba(255,255,255,0.25), 0 20px 40px -10px rgba(0,0,0,0.6)"
                      : "0 8px 24px -6px rgba(0,0,0,0.5)",
                  transform: hovered === `${tool.name}-${i}` ? "scale(1.1) translateY(-4px)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  fill
                  className="object-cover"
                  unoptimized={tool.icon.endsWith(".svg") || tool.icon.endsWith(".ico")}
                />
              </div>
              <span
                className="text-xs transition-colors duration-200"
                style={{ color: hovered === `${tool.name}-${i}` ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
              >
                {tool.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
