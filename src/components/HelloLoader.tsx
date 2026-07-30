"use client";

import { useEffect, useState } from "react";
import { Great_Vibes } from "next/font/google";

const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

const WORDS = [
  { text: "Hello",      lang: "en" },
  { text: "Bonjour",    lang: "fr" },
  { text: "こんにちは",   lang: "ja" },
  { text: "안녕하세요",   lang: "ko" },
  { text: "مرحبًا",     lang: "ar" },
  { text: "Hola",       lang: "es" },
  { text: "Ciao",       lang: "it" },
  { text: "Olá",        lang: "pt" },
  { text: "Привет",     lang: "ru" },
  { text: "नमस्ते",      lang: "hi" },
  { text: "你好",        lang: "zh" },
  { text: "Hallo",      lang: "de" },
  { text: "مرحبا",      lang: "ar" },
  { text: "Hello",      lang: "en" },
];

const WORD_MS   = 620;  // total time each word occupies
const FADE_MS   = 220;  // css transition duration

export default function HelloLoader() {
  const [index, setIndex]     = useState(0);
  const [visible, setVisible] = useState(true);   // word opacity
  const [exiting, setExiting] = useState(false);  // overlay fade-out
  const [done, setDone]       = useState(false);  // unmount

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("hello-shown")) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("hello-shown", "1");

    let i = 0;
    // Cycle through words
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        i++;
        if (i >= WORDS.length) {
          // All done — fade out overlay
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => setDone(true), 700);
          }, 200);
          return;
        }
        setIndex(i);
        setVisible(true);
        setTimeout(cycle, WORD_MS);
      }, FADE_MS);
    };

    // Show first word, then start cycling
    setVisible(true);
    const first = setTimeout(cycle, WORD_MS);
    return () => clearTimeout(first);
  }, []);

  if (done) return null;

  const word = WORDS[index];
  const isLatin = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(word.text);

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
        transition: exiting ? "opacity 0.65s ease" : undefined,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <span
        lang={word.lang}
        style={{
          fontSize: "clamp(52px, 8vw, 96px)",
          fontFamily: isLatin
            ? `${script.style.fontFamily}, cursive`
            : "system-ui, sans-serif",
          fontWeight: isLatin ? 400 : 300,
          color: "#ffffff",
          letterSpacing: isLatin ? "0.01em" : "0.05em",
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
          userSelect: "none",
          lineHeight: 1.2,
        }}
      >
        {word.text}
      </span>
    </div>
  );
}
