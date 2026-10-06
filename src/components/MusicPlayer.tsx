"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMotionValue, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ─── Spotify iFrame API types ────────────────────────────────────────────────
interface SpotifyController {
  play(): void;
  pause(): void;
  setVolume(v: number): void;
  loadUri(uri: string): void;
  seekTo(positionMs: number): void;
  addListener(event: string, cb: (data: unknown) => void): void;
  destroy(): void;
}
interface SpotifyIFrameAPI {
  createController(
    el: HTMLElement,
    opts: { uri: string; width?: string | number; height?: number },
    cb: (c: SpotifyController) => void
  ): void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    SpotifyIframeApi?: SpotifyIFrameAPI;
  }
}

// ─── Tracks ───────────────────────────────────────────────────────────────────
const TRACKS = [
  {
    id:     "6WrUT7FOAlDscRWU7ndmyd",
    title:  "Viva La Vida",
    artist: "Coldplay",
    art:    "https://i.scdn.co/image/ab67616d0000b2732c8b5698137791e36e19a6a6",
  },
  {
    id:     "5r5cp9IpziiIsR6b93vcnQ",
    title:  "Walking On A Dream",
    artist: "Empire of the Sun",
    art:    "https://i.scdn.co/image/ab67616d0000b273f3aa0e6ca22a382007f61e4d",
  },
  {
    id:     "3KkXRkHbMCARz0aVfEt68P",
    title:  "Sunflower",
    artist: "Post Malone, Swae Lee",
    art:    "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f",
  },
  {
    id:     "5JVbvCHX10U2pLa5DEqGav",
    title:  "Safe and Sound",
    artist: "Capital Cities",
    art:    "https://i.scdn.co/image/ab67616d0000b273b03e92f4e7dcd9db3a06c869",
  },
] as const;

const POS_KEY  = "mp-pos-v35";
const DISC_D   = 116;          // disc diameter
const LABEL_D  = 72;           // center label diameter (holds album art + controls)
const W        = 148;          // widget width
const ARC_R    = 40;           // progress arc radius (just outside label edge)

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Arc circumference
const ARC_C = 2 * Math.PI * ARC_R; // ≈ 251.3

// ─── Vinyl disc with embedded controls ───────────────────────────────────────
function VinylDisc({
  artSrc, artAlt, pct,
  onPrev, onPlay, onNext, isPlaying,
  onArcClick,
}: {
  artSrc: string; artAlt: string; pct: number;
  onPrev: () => void; onPlay: () => void; onNext: () => void; isPlaying: boolean;
  onArcClick: (e: React.MouseEvent<SVGCircleElement>) => void;
}) {
  const cx = DISC_D / 2;  // 58
  const cy = DISC_D / 2;  // 58

  // dashoffset: full circle at 0%, empty at 100% — start from top (rotate -90°)
  const dashOffset = ARC_C * (1 - pct / 100);

  return (
    <>
      <style>{`
        @keyframes disc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .mp-disc { animation: disc-spin 3s linear infinite; will-change: transform; }
        .mp-ctrl-btn { transition: opacity 0.12s ease, transform 0.1s ease; }
        .mp-ctrl-btn:hover { opacity: 1 !important; }
        .mp-ctrl-btn:active { transform: scale(0.82); }
      `}</style>

      {/* Spinning vinyl */}
      <div style={{ position: "relative", width: DISC_D, height: DISC_D, flexShrink: 0 }}>

        {/* The spinning disc */}
        <div
          className="mp-disc"
          style={{
            width: DISC_D, height: DISC_D,
            borderRadius: "50%",
            background: "#070707",
            // Deep groove rings — tight alternation of near-black and jet black
            boxShadow: [
              "0 0 0 2px  #1a1a1a",
              "0 0 0 4px  #060606",
              "0 0 0 6px  #1c1c1c",
              "0 0 0 8px  #060606",
              "0 0 0 10px #1b1b1b",
              "0 0 0 12px #060606",
              "0 0 0 14px #1c1c1c",
              "0 0 0 16px #060606",
              "0 0 0 18px #1a1a1a",
              "0 0 0 20px #060606",
              "0 0 0 22px #1b1b1b",
              "0 0 0 24px #060606",
              "0 0 0 26px #191919",
              "0 0 0 28px #060606",
              "0 0 0 30px #181818",
              "0 0 0 32px #060606",
              // Outer rim gleam — bright highlight ring
              "0 0 0 33px rgba(255,255,255,0.07)",
              // Depth shadows
              "0 8px 32px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            ].join(", "),
            position: "relative",
          }}
        >
          {/* Rotating specular — simulates the vinyl catching light */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: [
              "conic-gradient(from 80deg,",
              "  rgba(255,255,255,0.10) 0deg,",
              "  transparent           40deg,",
              "  rgba(255,255,255,0.04) 90deg,",
              "  transparent           140deg,",
              "  rgba(255,255,255,0.08) 200deg,",
              "  transparent           260deg,",
              "  rgba(255,255,255,0.12) 310deg,",
              "  transparent           350deg,",
              "  rgba(255,255,255,0.10) 360deg",
              ")",
            ].join(""),
          }} />
          {/* Radial hot-spot — brighter centre reflection */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(ellipse 60% 40% at 35% 30%, rgba(255,255,255,0.09) 0%, transparent 70%)",
          }} />

          {/* Center label — album art */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: LABEL_D, height: LABEL_D,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.10)",
          }}>
            <img
              src={artSrc} alt={artAlt}
              width={LABEL_D} height={LABEL_D}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Dark scrim so controls read clearly */}
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.42)",
              borderRadius: "50%",
            }} />
          </div>
        </div>

        {/* SVG overlay — progress arc + controls (does NOT spin) */}
        <svg
          width={DISC_D} height={DISC_D}
          viewBox={`0 0 ${DISC_D} ${DISC_D}`}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {/* Arc track (background) */}
          <circle
            cx={cx} cy={cy} r={ARC_R}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={2.5}
          />
          {/* Arc fill (progress) — clickable */}
          <circle
            cx={cx} cy={cy} r={ARC_R}
            fill="none"
            stroke="rgba(255,255,255,0.72)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={ARC_C}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dashoffset 0.95s linear", pointerEvents: "stroke", cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); onArcClick(e); }}
          />
        </svg>

        {/* Controls inside the label — absolute over the whole disc, no spin */}
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex", alignItems: "center", gap: 6,
            pointerEvents: "auto",
            zIndex: 2,
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Skip back */}
          <button
            className="mp-ctrl-btn"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              background: "none", border: "none", padding: 0,
              cursor: "pointer", opacity: 0.7,
              color: "#fff", display: "flex", alignItems: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          {/* Play / Pause — central spindle button */}
          <button
            className="mp-ctrl-btn"
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              width: 26, height: 26,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.28)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              cursor: "pointer",
              color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {isPlaying
              ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            }
          </button>

          {/* Skip forward */}
          <button
            className="mp-ctrl-btn"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              background: "none", border: "none", padding: 0,
              cursor: "pointer", opacity: 0.7,
              color: "#fff", display: "flex", alignItems: "center",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const [mounted,   setMounted]   = useState(false);
  const [vpW,       setVpW]       = useState(0);
  const [vpH,       setVpH]       = useState(0);
  const [idx,       setIdx]       = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sdkReady,  setSdkReady]  = useState(false);
  const [posMs,     setPosMs]     = useState(0);
  const [durMs,     setDurMs]     = useState(0);

  const ctrl        = useRef<SpotifyController | null>(null);
  const apiSlot     = useRef<HTMLDivElement>(null);
  const iframeMO    = useRef<MutationObserver | null>(null);
  const lastLoaded  = useRef(-1);
  const seekPending = useRef(false);
  const posRef      = useRef({ ms: 0, at: 0, playing: false });
  const rafId       = useRef(0);
  const mx          = useMotionValue(24);
  const my          = useMotionValue(0);

  // Widget dimensions — disc only
  const CARD_H = DISC_D;

  // Tokens — inverted: dark site → near-white glass; light site → dark glass
  const bg      = isDark ? "rgba(16,16,18,0.88)"   : "rgba(248,248,250,0.90)";
  const txtMain = isDark ? "rgba(255,255,255,0.92)" : "rgba(8,8,12,0.92)";
  const txtSub  = isDark ? "rgba(255,255,255,0.38)" : "rgba(8,8,12,0.38)";
  const dotCol  = isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.16)";
  const dotAct  = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.72)";
  const border  = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const shadow  = isDark
    ? "0 16px 48px rgba(0,0,0,0.72), 0 2px 8px rgba(0,0,0,0.48)"
    : "0 16px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)";

  // ── Mount + restore position ────────────────────────────────────────────────
  useEffect(() => {
    const snap = () => {
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
      mx.set(Math.max(16, Math.min(mx.get(), window.innerWidth  - W      - 16)));
      my.set(Math.max(16, Math.min(my.get(), window.innerHeight - CARD_H - 16)));
    };
    setMounted(true);
    try {
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
      const s = localStorage.getItem(POS_KEY);
      if (s) {
        const { x, y } = JSON.parse(s) as { x: number; y: number };
        mx.set(Math.max(16, Math.min(x, window.innerWidth  - W      - 16)));
        my.set(Math.max(16, Math.min(y, window.innerHeight - CARD_H - 16)));
      } else {
        mx.set(window.innerWidth - W - 24);
        my.set(100);
      }
    } catch { /* no-op */ }
    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── RAF smooth progress ─────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const { ms, at, playing } = posRef.current;
      if (playing) setPosMs(ms + (Date.now() - at));
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // ── Spotify SDK ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const init = (API: SpotifyIFrameAPI) => {
      const el = apiSlot.current;
      if (!el || ctrl.current) return;
      API.createController(
        el,
        { uri: `spotify:track:${TRACKS[0].id}`, width: "100%", height: CARD_H },
        (controller) => {
          ctrl.current = controller;
          controller.addListener("ready", () => {
            const frame = document.querySelector('iframe[src*="spotify"]') as HTMLIFrameElement | null;
            if (frame) {
              frame.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
              frame.setAttribute("allowfullscreen", "");
              const enforce = () => {
                frame.style.setProperty("height", `${CARD_H}px`, "important");
                frame.style.setProperty("max-height", `${CARD_H}px`, "important");
                if (frame.height !== String(CARD_H)) frame.height = String(CARD_H);
              };
              enforce();
              iframeMO.current?.disconnect();
              iframeMO.current = new MutationObserver(enforce);
              iframeMO.current.observe(frame, { attributes: true, attributeFilter: ["height", "style", "width"] });
            }
            setSdkReady(true);
          });
          controller.addListener("playback_update", (raw) => {
            const d     = raw as Record<string, unknown>;
            const inner = (d.data ?? d) as Record<string, unknown>;
            const isPaused = typeof inner.isPaused === "boolean" ? inner.isPaused : null;
            const position = typeof inner.position === "number"  ? inner.position : 0;
            const duration = typeof inner.duration === "number"  ? inner.duration : 0;
            if (seekPending.current && duration > 0) {
              seekPending.current = false;
              controller.seekTo(0);
              setPosMs(0);
              posRef.current = { ms: 0, at: Date.now(), playing: false };
              return;
            }
            if (isPaused !== null) {
              setIsPlaying(!isPaused);
              posRef.current = { ms: position, at: Date.now(), playing: !isPaused };
            }
            if (position >= 0) setPosMs(position);
            if (duration  >  0) setDurMs(duration);
          });
        }
      );
    };
    if (window.SpotifyIframeApi) {
      init(window.SpotifyIframeApi);
    } else {
      window.onSpotifyIframeApiReady = (api) => { window.SpotifyIframeApi = api; init(api); };
      if (!document.querySelector('script[src*="spotify.com/embed/iframe-api"]')) {
        const s = document.createElement("script");
        s.src   = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.head.appendChild(s);
      }
    }
    return () => { iframeMO.current?.disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // ── Track switching ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!sdkReady || !ctrl.current || lastLoaded.current === idx) return;
    lastLoaded.current  = idx;
    seekPending.current = true;
    ctrl.current.loadUri(`spotify:track:${TRACKS[idx].id}`);
    setIsPlaying(false); setPosMs(0); setDurMs(0);
    posRef.current = { ms: 0, at: Date.now(), playing: false };
  }, [idx, sdkReady]);

  // ── Controls ────────────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    if (!ctrl.current || !sdkReady) return;
    if (isPlaying) {
      ctrl.current.pause();
      setIsPlaying(false);
      posRef.current = { ...posRef.current, playing: false };
    } else {
      ctrl.current.play();
      setIsPlaying(true);
      posRef.current = { ...posRef.current, at: Date.now(), playing: true };
    }
  }, [isPlaying, sdkReady]);

  const prev = useCallback(() => setIdx(i => (i - 1 + TRACKS.length) % TRACKS.length), []);
  const next = useCallback(() => setIdx(i => (i + 1) % TRACKS.length),                 []);

  const handleArcClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    if (!ctrl.current || durMs === 0) return;
    // Map click angle (relative to disc center) to progress pct
    const svgEl  = (e.currentTarget as SVGCircleElement).ownerSVGElement!;
    const rect   = svgEl.getBoundingClientRect();
    const dx     = e.clientX - (rect.left + rect.width  / 2);
    const dy     = e.clientY - (rect.top  + rect.height / 2);
    // atan2 from top = angle from 12 o'clock
    let angle = Math.atan2(dx, -dy) / (2 * Math.PI);
    if (angle < 0) angle += 1;
    const ms = Math.floor(angle * durMs);
    ctrl.current.seekTo(ms);
    setPosMs(ms);
    posRef.current = { ms, at: Date.now(), playing: isPlaying };
  }, [durMs, isPlaying]);

  const savePos = useCallback(() => {
    try { localStorage.setItem(POS_KEY, JSON.stringify({ x: mx.get(), y: my.get() })); }
    catch { /* no-op */ }
  }, [mx, my]);

  if (!mounted) return null;

  const track = TRACKS[idx];
  const pct   = durMs > 0 ? Math.min(100, (posMs / durMs) * 100) : 0;
  const rem   = Math.max(0, durMs - posMs);

  return (
    <>
      {/* Spotify audio engine — outside the motion.div (CSS transform would trap fixed children) */}
      <div
        ref={apiSlot}
        style={{
          position: "fixed",
          top: -9999, left: -9999,
          width: W, height: CARD_H,
          pointerEvents: "none",
          visibility: "hidden",
        }}
      />

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top:    16,
          left:   16,
          right:  (vpW || window.innerWidth)  - W      - 16,
          bottom: (vpH || window.innerHeight) - CARD_H - 16,
        }}
        onDragEnd={savePos}
        style={{
          position: "fixed", top: 0, left: 0,
          x: mx, y: my,
          zIndex: 9000,
          width: W,
          cursor: "grab",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            background: "transparent",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Vinyl disc with embedded controls */}
          <VinylDisc
            artSrc={track.art}
            artAlt={track.title}
            pct={pct}
            onPrev={prev}
            onPlay={togglePlay}
            onNext={next}
            isPlaying={isPlaying}
            onArcClick={handleArcClick}
          />

        </div>
      </motion.div>
    </>
  );
}
