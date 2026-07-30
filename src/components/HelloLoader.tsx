"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["700"], display: "swap" });

const WORDS = [
  "hello",      "bonjour",    "こんにちは",  "안녕하세요",
  "hola",       "ciao",       "мerhaba",    "नमस्ते",
  "你好",        "Olá",        "hallo",      "привет",
  "xin chào",   "שלום",       "χαίρετε",   "hello",
];

const SHOW_MS  = 600;  // how long each word is fully visible
const FADE_MS  = 400;  // ease-in fade duration

export default function HelloLoader() {
  const [index,   setIndex]   = useState(0);
  const [opacity, setOpacity] = useState(0);   // start invisible, ease-in
  const [exiting, setExiting] = useState(false);
  const [done,    setDone]    = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("hello-shown")) { setDone(true); return; }
    sessionStorage.setItem("hello-shown", "1");

    let i = 0;
    let cancelled = false;

    const showWord = () => {
      if (cancelled) return;
      setIndex(i);
      setOpacity(1); // ease-in on mount of each word

      const holdTimer = setTimeout(() => {
        if (cancelled) return;
        setOpacity(0); // ease-out before switching

        const nextTimer = setTimeout(() => {
          if (cancelled) return;
          i++;
          if (i >= WORDS.length) {
            // All done — fade overlay
            setExiting(true);
            setTimeout(() => setDone(true), 1200);
          } else {
            showWord();
          }
        }, FADE_MS);

        return () => clearTimeout(nextTimer);
      }, SHOW_MS + FADE_MS);

      return () => clearTimeout(holdTimer);
    };

    // Small delay before first word appears
    const start = setTimeout(showWord, 150);
    return () => { cancelled = true; clearTimeout(start); };
  }, []);

  if (done) return null;

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
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 1.2s ease-in" : undefined,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <span
        style={{
          fontFamily: caveat.style.fontFamily,
          fontWeight: 700,
          fontSize: "clamp(56px, 9vw, 112px)",
          color: "#ffffff",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
          opacity,
          transition: `opacity ${FADE_MS}ms ease-in`,
          userSelect: "none",
        }}
      >
        {WORDS[index]}
      </span>
    </div>
  );
}
