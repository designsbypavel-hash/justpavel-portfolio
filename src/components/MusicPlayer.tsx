"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMotionValue, motion } from "framer-motion";

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

// ─── Tracks — Viva La Vida first ─────────────────────────────────────────────
const TRACKS = [
  {
    id:     "6WrUT7FOAlDscRWU7ndmyd",
    title:  "Viva La Vida",
    artist: "Coldplay",
    album:  "Viva la Vida or Death and All His Friends",
    art:    "https://i.scdn.co/image/ab67616d0000b2732c8b5698137791e36e19a6a6",
  },
  {
    id:     "5r5cp9IpziiIsR6b93vcnQ",
    title:  "Walking On A Dream",
    artist: "Empire of the Sun",
    album:  "Walking on a Dream",
    art:    "https://i.scdn.co/image/ab67616d0000b273f3aa0e6ca22a382007f61e4d",
  },
  {
    id:     "3KkXRkHbMCARz0aVfEt68P",
    title:  "Sunflower",
    artist: "Post Malone, Swae Lee",
    album:  "Spider-Man: Into the Spider-Verse",
    art:    "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f",
  },
  {
    id:     "5JVbvCHX10U2pLa5DEqGav",
    title:  "Safe and Sound",
    artist: "Capital Cities",
    album:  "In a Tidal Wave of Mystery",
    art:    "https://i.scdn.co/image/ab67616d0000b273b03e92f4e7dcd9db3a06c869",
  },
] as const;

const POS_KEY  = "mp-pos-v29";

function getDims(vpW: number) {
  const W       = Math.min(340, vpW - 32);
  const compact = W < 280;
  const PAD     = compact ? 14 : 18;
  const ART     = compact ? 64 : 80;
  const mBar    = compact ? 12 : 16;
  const mTs     = compact ? 5  : 6;
  const mDots   = compact ? 10 : 12;
  const CARD_H  = PAD + ART + mBar + 3 + mTs + 13 + mDots + 5 + PAD;
  return { W, PAD, ART, CARD_H, mBar, mTs, mDots };
}

// ─── Design tokens (INVERTED) ────────────────────────────────────────────────
// dark site  → white card (matches screenshot)
// light site → dark card
type Tk = {
  bg: string; border: string; shadow: string;
  title: string; sub: string;
  ctrl: string; ctrlHov: string;
  barBg: string; barFill: string;
  ts: string; dot: string; dotActive: string;
};

const FOR_DARK_SITE: Tk = {
  bg:        "#ffffff",
  border:    "rgba(0,0,0,0.07)",
  shadow:    "0 12px 48px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)",
  title:     "#0d0d0f",
  sub:       "#8a8a8a",
  ctrl:      "#3d3d3d",
  ctrlHov:   "#000000",
  barBg:     "#e5e5e5",
  barFill:   "#777777",
  ts:        "#b0b0b0",
  dot:       "rgba(0,0,0,0.15)",
  dotActive: "rgba(0,0,0,0.65)",
};

const FOR_LIGHT_SITE: Tk = {
  bg:        "#111113",
  border:    "rgba(255,255,255,0.08)",
  shadow:    "0 12px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
  title:     "#ffffff",
  sub:       "rgba(255,255,255,0.44)",
  ctrl:      "rgba(255,255,255,0.65)",
  ctrlHov:   "#ffffff",
  barBg:     "rgba(255,255,255,0.12)",
  barFill:   "rgba(255,255,255,0.5)",
  ts:        "rgba(255,255,255,0.32)",
  dot:       "rgba(255,255,255,0.22)",
  dotActive: "rgba(255,255,255,0.8)",
};

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const SkipBackIco = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
  </svg>
);
const SkipFwdIco = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);
const PlayIco = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);
const PauseIco = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

// ─── Animated bars ────────────────────────────────────────────────────────────
function LiveBars() {
  return (
    <>
      <style>{`
        @keyframes mpBar {
          0%   { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
      `}</style>
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 12 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 3, height: "100%", borderRadius: 2,
            background: "rgba(255,255,255,0.88)",
            animation: `mpBar ${0.55 + i * 0.12}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }} />
        ))}
      </div>
    </>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────
function Btn({ onClick, tk, children }: { onClick: () => void; tk: Tk; children: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={(e) => { e.stopPropagation(); setAct(true); }}
      onMouseUp={() => setAct(false)}
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        background: "none", border: "none",
        padding: "6px 7px",
        cursor: "pointer",
        color: hov ? tk.ctrlHov : tk.ctrl,
        transform: act ? "scale(0.84)" : "scale(1)",
        transition: "transform 0.08s ease, color 0.1s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 6, flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const [mounted,   setMounted]   = useState(false);
  const [vpW,       setVpW]       = useState(0);
  const [vpH,       setVpH]       = useState(0);
  const [idx,       setIdx]       = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sdkReady,  setSdkReady]  = useState(false);
  const [posMs,     setPosMs]     = useState(0);
  const [durMs,     setDurMs]     = useState(0);

  const ctrl       = useRef<SpotifyController | null>(null);
  const apiSlot    = useRef<HTMLDivElement>(null);
  const iframeMO   = useRef<MutationObserver | null>(null);
  const lastLoaded = useRef(-1);
  const posRef     = useRef({ ms: 0, at: 0, playing: false });
  const rafId      = useRef(0);
  const mx         = useMotionValue(24);
  const my         = useMotionValue(0);


  // ── Mount + restore position ──────────────────────────────────────────────
  useEffect(() => {
    const snap = () => {
      const { W, CARD_H } = getDims(window.innerWidth);
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
      mx.set(Math.max(16, Math.min(mx.get(), window.innerWidth  - W      - 16)));
      my.set(Math.max(16, Math.min(my.get(), window.innerHeight - CARD_H - 16)));
    };

    setMounted(true);
    try {
      const { W, CARD_H } = getDims(window.innerWidth);
      setVpW(window.innerWidth);
      setVpH(window.innerHeight);
      const s = localStorage.getItem(POS_KEY);
      if (s) {
        const { x, y } = JSON.parse(s) as { x: number; y: number };
        mx.set(Math.max(16, Math.min(x, window.innerWidth  - W      - 16)));
        my.set(Math.max(16, Math.min(y, window.innerHeight - CARD_H - 16)));
      } else {
        mx.set(24);
        my.set(Math.min(window.innerHeight - CARD_H - 32, window.innerHeight * 0.65));
      }
    } catch { /* no-op */ }

    window.addEventListener("resize", snap);
    return () => window.removeEventListener("resize", snap);
  }, [mx, my]);

  // ── RAF smooth progress ───────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const { ms, at, playing } = posRef.current;
      if (playing) setPosMs(ms + (Date.now() - at));
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // ── Spotify SDK ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const init = (API: SpotifyIFrameAPI) => {
      const el = apiSlot.current;
      if (!el || ctrl.current) return;
      API.createController(
        el,
        { uri: `spotify:track:${TRACKS[0].id}`, width: "100%", height: getDims(window.innerWidth).CARD_H },
        (controller) => {
          ctrl.current = controller;
          controller.addListener("ready", () => {
            // Cross-origin iframes escape CSS overflow:hidden in compositor layers.
            // Only reliable fix: physically constrain the iframe's layout height via JS,
            // and watch for SDK resets with a MutationObserver.
            const frame = document.querySelector('iframe[src*="spotify"]') as HTMLIFrameElement | null;
            if (frame) {
              const enforce = () => {
                const h = getDims(window.innerWidth).CARD_H;
                frame.style.setProperty("height", `${h}px`, "important");
                frame.style.setProperty("max-height", `${h}px`, "important");
                if (frame.height !== String(h)) frame.height = String(h);
              };
              enforce();
              iframeMO.current?.disconnect();
              iframeMO.current = new MutationObserver(enforce);
              iframeMO.current.observe(frame, { attributes: true, attributeFilter: ["height", "style", "width"] });
            }
            setSdkReady(true);
          });
          controller.addListener("playback_update", (raw) => {
            const d   = raw as Record<string, unknown>;
            const inner = (d.data ?? d) as Record<string, unknown>;
            const isPaused = typeof inner.isPaused === "boolean" ? inner.isPaused : null;
            const position = typeof inner.position === "number" ? inner.position : 0;
            const duration = typeof inner.duration === "number" ? inner.duration : 0;
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
      window.onSpotifyIframeApiReady = (api) => {
        window.SpotifyIframeApi = api;
        init(api);
      };
      if (!document.querySelector('script[src*="spotify.com/embed/iframe-api"]')) {
        const s = document.createElement("script");
        s.src   = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.head.appendChild(s);
      }
    }
    return () => { iframeMO.current?.disconnect(); };
  }, [mounted]);

  // ── Track switching ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!sdkReady || !ctrl.current || lastLoaded.current === idx) return;
    lastLoaded.current = idx;
    ctrl.current.loadUri(`spotify:track:${TRACKS[idx].id}`);
    setIsPlaying(false); setPosMs(0); setDurMs(0);
    posRef.current = { ms: 0, at: Date.now(), playing: false };
  }, [idx, sdkReady]);

  // ── Controls ──────────────────────────────────────────────────────────────
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
  const next = useCallback(() => setIdx(i => (i + 1) % TRACKS.length), []);

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

  const { W, PAD, ART, CARD_H, mBar, mTs, mDots } = getDims(vpW || window.innerWidth);

  const tk    = FOR_DARK_SITE;
  const track = TRACKS[idx];
  const pct   = durMs > 0 ? Math.min(100, (posMs / durMs) * 100) : 0;
  const rem   = Math.max(0, durMs - posMs);

  return (
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
        height: CARD_H,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: tk.shadow,
        border: `1px solid ${tk.border}`,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {/* Spotify audio engine mounting point */}
      <div
        ref={apiSlot}
        style={{
          position: "absolute", top: 0, left: 0,
          width: W, height: CARD_H,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Visible card UI — absolute so it overlaps the iframe at top:0 */}
      <div
        style={{
          position: "absolute", top: 0, left: 0,
          zIndex: 1,
          width: W, height: CARD_H,
          background: tk.bg,
          padding: PAD,
          boxSizing: "border-box",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Art + Meta row */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

          {/* Album art */}
          <div style={{ position: "relative", flexShrink: 0, width: ART, height: ART }}>
            <img
              src={track.art}
              alt={track.title}
              width={ART} height={ART}
              style={{
                width: ART, height: ART,
                borderRadius: 10,
                objectFit: "cover",
                display: "block",
              }}
            />
            {isPlaying && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: 10,
                background: "rgba(0,0,0,0.32)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <LiveBars />
              </div>
            )}
          </div>

          {/* Title + artist + transport */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
            <div style={{
              fontSize: 16, fontWeight: 700, color: tk.title,
              lineHeight: 1.2, letterSpacing: -0.3,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {track.title}
            </div>

            <div style={{
              fontSize: 12, color: tk.sub, marginTop: 3, lineHeight: 1.35,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {track.artist} · {track.album}
            </div>

            {/* Transport controls */}
            <div
              onPointerDown={(e) => e.stopPropagation()}
              style={{ display: "flex", alignItems: "center", marginTop: 10 }}
            >
              <Btn onClick={prev} tk={tk}><SkipBackIco /></Btn>
              <Btn onClick={togglePlay} tk={tk}>
                {isPlaying ? <PauseIco /> : <PlayIco />}
              </Btn>
              <Btn onClick={next} tk={tk}><SkipFwdIco /></Btn>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: mBar }}>
          <div
            onClick={handleSeek}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              height: 3, background: tk.barBg,
              borderRadius: 2, cursor: "pointer", position: "relative",
            }}
          >
            <div style={{
              position: "absolute", left: 0, top: 0,
              height: "100%", width: `${pct}%`,
              background: tk.barFill, borderRadius: 2,
              transition: "width 0.95s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: mTs }}>
            <span style={{ fontSize: 10, color: tk.ts, fontVariantNumeric: "tabular-nums" }}>
              {fmt(posMs)}
            </span>
            <span style={{ fontSize: 10, color: tk.ts, fontVariantNumeric: "tabular-nums" }}>
              -{fmt(rem)}
            </span>
          </div>
        </div>

        {/* Track dots */}
        <div
          onPointerDown={(e) => e.stopPropagation()}
          style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: mDots }}
        >
          {TRACKS.map((_, i) => (
            <button key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: i === idx ? 14 : 5, height: 5,
                borderRadius: 99, border: "none", padding: 0, cursor: "pointer",
                background: i === idx ? tk.dotActive : tk.dot,
                transition: "width 0.18s ease, background 0.18s ease",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
