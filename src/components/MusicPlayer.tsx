"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from "framer-motion";
import { TRACKS, useMusicPlayer } from "@/contexts/MusicContext";
import { premiumEase } from "@/lib/motion";

const STORAGE_KEY = "music-player-pos";
const PLAYER_W = 272;

export default function MusicPlayer() {
  const { currentIndex, setCurrentIndex, isOpen, setIsOpen } = useMusicPlayer();
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  // Drag position — persisted in localStorage
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const didInitPos = useRef(false);

  // Theme observer
  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const read = () => setIsDark(html.getAttribute("data-theme") !== "light");
    read();
    const obs = new MutationObserver(read);
    obs.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Init drag position from storage (bottom-left by default)
  useEffect(() => {
    if (didInitPos.current) return;
    didInitPos.current = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        x.set(p.x);
        y.set(p.y);
      } else {
        // Default: bottom-left, ~20px inset
        x.set(20);
        y.set(Math.max(window.innerHeight - 460, 20));
      }
    } catch {
      x.set(20);
      y.set(Math.max(window.innerHeight - 460, 20));
    }
  }, [x, y]);

  const track = TRACKS[currentIndex];

  const embedSrc = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator${isDark ? "&theme=0" : ""}`;

  // Design tokens
  const cardBg = isDark ? "rgba(18,18,18,0.95)" : "rgba(252,252,252,0.96)";
  const cardBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const cardShadow = isDark
    ? "0 24px 64px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset"
    : "0 12px 48px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.9) inset";
  const textPrimary = isDark ? "rgba(255,255,255,0.95)" : "rgba(15,15,15,0.95)";
  const textSecondary = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)";
  const divider = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const tabActiveBg = isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.07)";
  const tabActiveBorder = isDark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.10)";
  const spotifyGreen = "#1DB954";

  if (!mounted) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y, position: "fixed", zIndex: 50, width: PLAYER_W, touchAction: "none" }}
      onDragEnd={() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: x.get(), y: y.get() }));
        } catch {}
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="open"
            initial={reduce ? false : { opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.28, ease: premiumEase }}
            style={{
              background: cardBg,
              border: `1px solid ${cardBorder}`,
              borderRadius: 18,
              boxShadow: cardShadow,
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            {/* Album art */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "#111" }}>
              {!imgError ? (
                <img
                  key={track.id}
                  src={track.art}
                  alt={`${track.title} album art`}
                  onError={() => setImgError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  draggable={false}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1a1a2e,#16213e)" }} />
              )}

              {/* Top bar — Spotify mark + collapse */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={spotifyGreen} aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimise player"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "none",
                    borderRadius: 999,
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 7L5 3L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Track info */}
            <div
              style={{
                padding: "12px 14px 8px",
                borderBottom: `1px solid ${divider}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: textPrimary,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {track.title}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11.5, color: textSecondary, letterSpacing: "0.01em" }}>
                {track.artist}
              </p>
            </div>

            {/* Mood tabs */}
            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "8px 14px",
                borderBottom: `1px solid ${divider}`,
              }}
            >
              {TRACKS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setImgError(false);
                    setCurrentIndex(i);
                  }}
                  style={{
                    flex: 1,
                    padding: "5px 0",
                    borderRadius: 999,
                    fontSize: 10.5,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    border: `1px solid ${i === currentIndex ? tabActiveBorder : "transparent"}`,
                    background: i === currentIndex ? tabActiveBg : "transparent",
                    color: i === currentIndex ? textPrimary : textSecondary,
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  }}
                >
                  {t.mood}
                </button>
              ))}
            </div>

            {/* Spotify embed — handles all playback */}
            <div style={{ lineHeight: 0 }}>
              <iframe
                key={`${track.id}-${isDark}`}
                src={embedSrc}
                width={PLAYER_W}
                height={80}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Now playing: ${track.title}`}
                style={{ display: "block" }}
              />
            </div>
          </motion.div>
        ) : (
          /* Collapsed pill */
          <motion.button
            key="collapsed"
            onClick={() => setIsOpen(true)}
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22, ease: premiumEase }}
            aria-label="Open music player"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 14px 0 4px",
              height: 44,
              borderRadius: 999,
              border: `1px solid ${cardBorder}`,
              background: cardBg,
              boxShadow: cardShadow,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {/* Tiny album art */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                overflow: "hidden",
                flexShrink: 0,
                background: "#111",
              }}
            >
              <img
                src={track.art}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: textPrimary,
                flex: 1,
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {track.title}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: textSecondary, flexShrink: 0 }}>
              <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
