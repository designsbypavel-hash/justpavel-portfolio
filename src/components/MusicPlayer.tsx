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

const POS_KEY = "mp-pos-v33";
const DISC_D  = 172;   // disc diameter px
const W       = 204;   // widget width px

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const SkipBackIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
);
const SkipFwdIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);
const PlayIco = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const PauseIco = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

// ─── Vinyl disc ───────────────────────────────────────────────────────────────
function VinylDisc({ artSrc, artAlt }: { artSrc: string; artAlt: string }) {
  const labelD = 72; // center label diameter
  return (
    <>
      <style>{`
        @keyframes disc-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .mp-disc-spin {
          animation: disc-spin 3.2s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div
        className="mp-disc-spin"
        style={{
          width:  DISC_D,
          height: DISC_D,
          borderRadius: "50%",
          position: "relative",
          flexShrink: 0,
          // Dark vinyl base
          background: "#111111",
          // Groove rings via box-shadow
          boxShadow: [
            "0 0 0 5px  #1c1c1c",
            "0 0 0 9px  #111111",
            "0 0 0 13px #1d1d1d",
            "0 0 0 17px #111111",
            "0 0 0 21px #1e1e1e",
            "0 0 0 25px #111111",
            "0 0 0 29px #1e1e1e",
            "0 0 0 33px #111111",
            "0 0 0 37px #1d1d1d",
            "0 0 0 41px #111111",
            "0 0 0 45px #1c1c1c",
            "0 0 0 49px #111111",
            "0 0 0 53px #1d1d1d",
            "0 0 0 57px #111111",
            // outer edge gleam
            "0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)",
          ].join(", "),
        }}
      >
        {/* Specular sheen over the grooves */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "conic-gradient(from 120deg, rgba(255,255,255,0.06) 0deg, transparent 60deg, rgba(255,255,255,0.03) 180deg, transparent 240deg, rgba(255,255,255,0.06) 360deg)",
          pointerEvents: "none",
        }} />

        {/* Center label with album art */}
        <div style={{
          position: "absolute",
          top:  "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width:  labelD,
          height: labelD,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
        }}>
          <img
            src={artSrc}
            alt={artAlt}
            width={labelD}
            height={labelD}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Spindle hole */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 6, height: 6,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.15)",
          zIndex: 2,
        }} />
      </div>
    </>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────
function Btn({ onClick, color, children }: {
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  const [act, setAct] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseDown={(e) => { e.stopPropagation(); setAct(true); }}
      onMouseUp={() => setAct(false)}
      onMouseLeave={() => setAct(false)}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        background: "none", border: "none",
        padding: "6px 8px",
        cursor: "pointer",
        color,
        transform: act ? "scale(0.82)" : "scale(1)",
        transition: "transform 0.08s ease, opacity 0.1s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 6, flexShrink: 0,
        opacity: act ? 0.6 : 1,
      }}
    >
      {children}
    </button>
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

  // Widget height (disc + info panel)
  const INFO_H = 148; // title + artist + controls + progress + dots
  const CARD_H = 16 + DISC_D + 14 + INFO_H + 16;

  // Design tokens — inverted: white card on dark site
  const bg       = isDark ? "rgba(18,18,20,0.92)"   : "rgba(255,255,255,0.92)";
  const textMain = isDark ? "rgba(255,255,255,0.95)" : "rgba(10,10,12,0.95)";
  const textSub  = isDark ? "rgba(255,255,255,0.45)" : "rgba(10,10,12,0.45)";
  const ctrlCol  = isDark ? "rgba(255,255,255,0.70)" : "rgba(10,10,12,0.70)";
  const barBg    = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const barFill  = isDark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.55)";
  const dotCol   = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)";
  const dotAct   = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)";
  const shadow   = isDark
    ? "0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)"
    : "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)";
  const border   = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

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
            const d      = raw as Record<string, unknown>;
            const inner  = (d.data ?? d) as Record<string, unknown>;
            const isPaused  = typeof inner.isPaused  === "boolean" ? inner.isPaused  : null;
            const position  = typeof inner.position  === "number"  ? inner.position  : 0;
            const duration  = typeof inner.duration  === "number"  ? inner.duration  : 0;
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

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctrl.current || durMs === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ms   = Math.floor(pct * durMs);
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
      {/* Spotify audio engine — outside the motion.div so transforms don't affect its fixed position */}
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

      {/* Visible disc UI */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: bg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          border: `1px solid ${border}`,
          boxShadow: shadow,
          padding: "16px 16px 16px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Vinyl disc */}
        <VinylDisc artSrc={track.art} artAlt={track.title} />

        {/* Track info */}
        <div style={{ marginTop: 14, width: "100%", textAlign: "center" }}>
          <div style={{
            fontSize: 14, fontWeight: 700, color: textMain,
            lineHeight: 1.2, letterSpacing: -0.2,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {track.title}
          </div>
          <div style={{
            fontSize: 11, color: textSub, marginTop: 3,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {track.artist}
          </div>
        </div>

        {/* Transport controls */}
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 4, marginTop: 10,
          }}
        >
          <Btn onClick={prev} color={ctrlCol}><SkipBackIco /></Btn>

          {/* Play/Pause — larger pill */}
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              width: 38, height: 38,
              borderRadius: "50%",
              border: `1px solid ${border}`,
              background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)",
              color: textMain,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.12s ease",
            }}
          >
            {isPlaying ? <PauseIco /> : <PlayIco />}
          </button>

          <Btn onClick={next} color={ctrlCol}><SkipFwdIco /></Btn>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", marginTop: 10 }}>
          <div
            onClick={handleSeek}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              height: 3, background: barBg,
              borderRadius: 2, cursor: "pointer", position: "relative",
            }}
          >
            <div style={{
              position: "absolute", left: 0, top: 0,
              height: "100%", width: `${pct}%`,
              background: barFill, borderRadius: 2,
              transition: "width 0.95s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            <span style={{ fontSize: 9, color: textSub, fontVariantNumeric: "tabular-nums" }}>
              {fmt(posMs)}
            </span>
            <span style={{ fontSize: 9, color: textSub, fontVariantNumeric: "tabular-nums" }}>
              -{fmt(rem)}
            </span>
          </div>
        </div>

        {/* Track dots */}
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10 }}
        >
          {TRACKS.map((_, i) => (
            <button key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: i === idx ? 14 : 5, height: 5,
                borderRadius: 99, border: "none", padding: 0, cursor: "pointer",
                background: i === idx ? dotAct : dotCol,
                transition: "width 0.18s ease, background 0.18s ease",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
    </>
  );
}
