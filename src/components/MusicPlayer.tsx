"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMusicPlayer } from "@/contexts/MusicContext";
import { premiumEase } from "@/lib/motion";

const BAR_SCALES = [1, 0.55, 0.9, 0.4, 0.75];

export default function MusicPlayer() {
  const { tracks, currentIndex, isPlaying, isReady, needsInteraction, toggle, switchTo } =
    useMusicPlayer();
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Delay mount so player doesn't flash in during SSR hydration
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const current = tracks[currentIndex];

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-1.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: premiumEase, delay: 0.2 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
    >
      {/* Mood switcher — revealed on hover */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="mood-switcher"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: premiumEase }}
            className="flex flex-col gap-1 pl-1"
          >
            {tracks.map((track, i) => (
              <button
                key={track.id}
                onClick={() => switchTo(i)}
                className="text-left px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200"
                style={{
                  background:
                    i === currentIndex
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  color:
                    i === currentIndex
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.45)",
                }}
              >
                {track.mood}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main pill */}
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : needsInteraction ? "Play music" : "Resume music"}
        className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.11)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Animated waveform bars */}
        <span className="flex items-center gap-[2.5px]" aria-hidden="true">
          {BAR_SCALES.map((scale, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              style={{
                width: 2,
                height: 12,
                background: "rgba(255,255,255,0.75)",
                transformOrigin: "center",
              }}
              animate={
                isPlaying && !reduce
                  ? {
                      scaleY: [1, scale * 0.35 + 0.25, 1, scale * 0.55 + 0.2, 1],
                    }
                  : { scaleY: isPlaying ? 0.6 : 0.35 }
              }
              transition={
                isPlaying && !reduce
                  ? {
                      duration: 0.75 + i * 0.11,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.09,
                    }
                  : { duration: 0.3, ease: premiumEase }
              }
            />
          ))}
        </span>

        {/* Label */}
        <span
          className="text-[11px] font-medium tracking-wide max-w-[108px] truncate"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {needsInteraction ? "Play" : current.title}
        </span>
      </button>
    </motion.div>
  );
}
