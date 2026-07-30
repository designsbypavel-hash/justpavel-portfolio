"use client";

import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "cyrillic", "devanagari", "greek"],
  weight: ["300", "400"],
  display: "swap",
});

const COLORS = [
  "#4DD0E1", "#EF5350", "#FFCA28", "#AB47BC", "#FF7043",
  "#66BB6A", "#42A5F5", "#EC407A", "#80CBC4", "#FFA726",
  "#F06292", "#AED581", "#4FC3F7", "#FFD54F", "#CE93D8",
];

const ALL_WORDS = [
  "Hello", "Bonjour", "こんにちは", "안녕하세요", "Hola", "Ciao",
  "Olá", "Привет", "नमस्ते", "你好", "Hallo", "Merhaba",
  "Salut", "مرحبا", "Cześć", "Γεια", "Hei", "Hej",
  "Ahoj", "Xin chào", "สวัสดี", "שלום", "Sawubona", "Dobar dan",
];

// Build 5 rows, each starting at a different offset
function makeRow(offset: number, count = 12) {
  const words = [];
  for (let i = 0; i < count; i++) {
    const wi = (i + offset) % ALL_WORDS.length;
    const ci = (i + offset * 3) % COLORS.length;
    words.push({ text: ALL_WORDS[wi], color: COLORS[ci] });
  }
  return words;
}

const ROWS = [
  { words: makeRow(0),  dir: "left",  dur: 14, offset: 0   },
  { words: makeRow(5),  dir: "right", dur: 11, offset: -30 },
  { words: makeRow(10), dir: "left",  dur: 16, offset: -10 },
  { words: makeRow(15), dir: "right", dur: 12, offset: -50 },
  { words: makeRow(3),  dir: "left",  dur: 13, offset: -20 },
];

export default function HelloLoader() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hello-shown")) { setDone(true); return; }
    sessionStorage.setItem("hello-shown", "1");

    const t1 = setTimeout(() => setExiting(true), 3000);
    const t2 = setTimeout(() => setDone(true), 3750);
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
        background: "#0d0d12",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "clamp(14px, 2.2vw, 28px)",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes ml { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes mr { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      {ROWS.map((row, ri) => {
        // Duplicate words for seamless loop
        const items = [...row.words, ...row.words];
        return (
          <div key={ri} style={{ overflow: "hidden", lineHeight: 1 }}>
            <div
              style={{
                display: "flex",
                gap: "clamp(20px, 3vw, 48px)",
                whiteSpace: "nowrap",
                animation: `${row.dir === "left" ? "ml" : "mr"} ${row.dur}s linear infinite`,
                animationDelay: `${row.offset / 100 * row.dur}s`,
                willChange: "transform",
              }}
            >
              {items.map((w, wi) => (
                <span
                  key={wi}
                  style={{
                    fontFamily: roboto.style.fontFamily,
                    fontWeight: 300,
                    fontSize: "clamp(28px, 3.6vw, 58px)",
                    color: w.color,
                    letterSpacing: "0.02em",
                    flexShrink: 0,
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
