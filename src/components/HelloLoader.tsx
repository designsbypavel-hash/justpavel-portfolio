"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";

// Caveat covers Latin, Latin-ext, Cyrillic, Vietnamese — the closest web match to the reference
const caveat = Caveat({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["400", "700"], display: "swap" });

// Exact color palette from reference — vibrant, saturated, no washed-out tones
const PALETTE = [
  "#2BC4BA", // teal
  "#F05050", // coral red
  "#F9C234", // yellow
  "#9B82F3", // soft purple
  "#F07830", // deep orange
  "#3DBF7A", // green
  "#5BA6F0", // sky blue
  "#E85CA0", // hot pink
  "#50C8B0", // mint
  "#F5894E", // warm orange
  "#7EC8F5", // light blue
  "#F07060", // salmon
  "#A0D850", // lime green
  "#C87CF0", // violet
  "#F0C060", // gold
];

// 24 greetings matching the reference image languages
const WORDS = [
  "merhaba",    "你好",       "привет",    "สวัสดี",
  "ciao",       "नमस्ते",    "hello",     "dobar dan",  "hei",
  "hallo",      "χαίρετε",   "ሰላም",      "ahoj",       "xin chào",
  "cześć",      "hola",      "안녕하세요",  "bonjour",
  "hey",        "こんにちは",  "helo",      "salut",      "merhaba",
  "你好",        "Olá",       "Sawubona",  "Hej",        "שלום",
];

// Assign a color per word (cycling through palette)
function coloredWords(startOffset: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    text: WORDS[(i + startOffset) % WORDS.length],
    color: PALETTE[(i + startOffset * 2) % PALETTE.length],
  }));
}

const ROWS = [
  { words: coloredWords(0,  18), dir: "left",  spd: 22 },
  { words: coloredWords(5,  18), dir: "right", spd: 18 },
  { words: coloredWords(10, 18), dir: "left",  spd: 25 },
  { words: coloredWords(15, 18), dir: "right", spd: 20 },
  { words: coloredWords(3,  18), dir: "left",  spd: 23 },
  { words: coloredWords(8,  18), dir: "right", spd: 19 },
];

export default function HelloLoader() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hello-shown")) { setDone(true); return; }
    sessionStorage.setItem("hello-shown", "1");

    const t1 = setTimeout(() => setExiting(true), 7000);
    const t2 = setTimeout(() => setDone(true), 8200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        // Dark navy — matches reference, not pure black
        background: "#0c0d18",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "clamp(4px, 1.2vw, 16px)",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 1.2s ease-in",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes slide-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes slide-right { from { transform: translateX(-50%) } to { transform: translateX(0) }   }
      `}</style>

      {ROWS.map((row, ri) => {
        // Duplicate for seamless loop
        const items = [...row.words, ...row.words];
        return (
          <div key={ri} style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "inline-flex",
                gap: "clamp(16px, 2.8vw, 52px)",
                whiteSpace: "nowrap",
                animation: `${row.dir === "left" ? "slide-left" : "slide-right"} ${row.spd}s linear infinite`,
                willChange: "transform",
              }}
            >
              {items.map((w, wi) => (
                <span
                  key={wi}
                  style={{
                    fontFamily: caveat.style.fontFamily,
                    fontWeight: 700,
                    // Responsive size — matches the large dense type in the reference
                    fontSize: "clamp(32px, 4.8vw, 72px)",
                    lineHeight: 1.15,
                    color: w.color,
                    flexShrink: 0,
                    // Slight text shadow to add depth like in the reference
                    textShadow: `0 0 24px ${w.color}33`,
                  }}
                >
                  {w.text}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
