"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap" });

export default function HelloLoader() {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    if (sessionStorage.getItem("hello-shown")) { setPhase("done"); return; }
    sessionStorage.setItem("hello-shown", "1");

    // ease-in → hold → ease-in out
    const t1 = setTimeout(() => setPhase("hold"), 900);   // fade-in done
    const t2 = setTimeout(() => setPhase("out"),  2800);  // start fade-out
    const t3 = setTimeout(() => setPhase("done"), 4000);  // unmount
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const visible = phase === "in" || phase === "hold";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Overlay itself fades out last
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 1.2s ease-in" : undefined,
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <span
        style={{
          fontFamily: caveat.style.fontFamily,
          fontWeight: 700,
          fontSize: "clamp(72px, 12vw, 140px)",
          color: "#fff",
          letterSpacing: "-0.01em",
          lineHeight: 1,
          userSelect: "none",
          // Fade-in with a gentle upward drift — matches Apple's motion
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
          transition: visible
            ? "opacity 0.9s ease-in, transform 0.9s ease-in"
            : undefined,
        }}
      >
        hello
      </span>
    </div>
  );
}
