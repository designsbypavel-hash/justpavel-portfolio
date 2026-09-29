"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRACKS, useMusicPlayer } from "@/contexts/MusicContext";
import { premiumEase } from "@/lib/motion";

export default function MusicPlayer() {
  const { currentIndex, setCurrentIndex, isOpen, setIsOpen } = useMusicPlayer();
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Sync with site's data-theme attribute
  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;

    const read = () => {
      const t = html.getAttribute("data-theme");
      setIsDark(t !== "light");
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const track = TRACKS[currentIndex];

  // Spotify embed URL — theme=0 = dark embed, no theme param = light
  const embedSrc = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator${isDark ? "&theme=0" : ""}`;

  // Tokens driven by isDark
  const bg = isDark ? "rgba(18,18,18,0.88)" : "rgba(255,255,255,0.92)";
  const border = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";
  const shadow = isDark
    ? "0 8px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset"
    : "0 8px 40px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.8) inset";
  const labelActive = isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)";
  const labelInactive = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const tabActiveBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)";
  const tabInactiveBg = "transparent";
  const tabActiveBorder = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)";
  const collapseColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)";

  return (
    <div
      className="fixed bottom-5 right-5 z-50"
      style={{ width: 312 }}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="player-open"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 16,
              boxShadow: shadow,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div
              className="flex items-center justify-between px-4 pt-3 pb-2"
            >
              {/* Mood tabs */}
              <div className="flex items-center gap-1.5">
                {TRACKS.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentIndex(i)}
                    className="rounded-full px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-200"
                    style={{
                      background: i === currentIndex ? tabActiveBg : tabInactiveBg,
                      border: `1px solid ${i === currentIndex ? tabActiveBorder : "transparent"}`,
                      color: i === currentIndex ? labelActive : labelInactive,
                    }}
                  >
                    {t.mood}
                  </button>
                ))}
              </div>

              {/* Collapse button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Minimise player"
                className="w-6 h-6 flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{ color: collapseColor }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Spotify embed — key forces iframe remount on track switch */}
            <div style={{ margin: "0 0 0 0", lineHeight: 0 }}>
              <iframe
                key={`${track.id}-${isDark}`}
                src={embedSrc}
                width="312"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Now playing: ${track.title}`}
                style={{ display: "block", borderRadius: "0 0 15px 15px" }}
              />
            </div>
          </motion.div>
        ) : (
          /* Collapsed pill */
          <motion.button
            key="player-collapsed"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: premiumEase }}
            aria-label="Open music player"
            className="flex items-center gap-2.5 rounded-full px-4 py-2.5 w-auto"
            style={{
              background: bg,
              border: `1px solid ${border}`,
              boxShadow: shadow,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Spotify mark */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span
              className="text-[12px] font-medium tracking-wide truncate max-w-[160px]"
              style={{ color: labelActive }}
            >
              {track.title}
            </span>
            {/* Chevron down */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ color: collapseColor, flexShrink: 0 }}>
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
