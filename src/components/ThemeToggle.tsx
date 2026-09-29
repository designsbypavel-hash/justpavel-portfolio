"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Toggle light/dark mode"
      onClick={toggle}
      className="relative flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        // Subtle track with visible border in both modes
        background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
        border: isLight ? "1px solid rgba(0,0,0,0.14)" : "1px solid rgba(255,255,255,0.28)",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      {/* Thumb — carries the active icon */}
      <motion.span
        className="absolute top-[3px] left-[3px] flex h-[18px] w-[18px] items-center justify-center rounded-full"
        style={{
          background: isLight ? "#1a1a1a" : "#ffffff",
          boxShadow: isLight
            ? "0 1px 3px rgba(0,0,0,0.20), 0 0 0 0.5px rgba(0,0,0,0.06)"
            : "0 1px 3px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.08)",
        }}
        animate={{ x: isLight ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {/* Icon on the thumb */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isLight ? "sun" : "moon"}
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            style={{
              fontSize: 10,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isLight ? "#f5b800" : "rgba(160,168,180,0.90)",
              fontFamily: "system-ui, sans-serif",
              userSelect: "none",
            }}
          >
            {isLight ? "☀" : "☽"}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
