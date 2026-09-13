"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { playClickSound } from "@/lib/sound";

const GAME_URL = "https://glow-rush.vercel.app";
// A cross-origin iframe's `load` event is not reliable enough to gate a
// reveal on by itself (it can fail to fire after a fast-refresh remount in
// dev, and some ad blockers swallow it in prod). So the reveal fires on
// EITHER `onLoad` or this cap, whichever comes first - the game is a small
// static bundle, so on any real connection this cap never actually shows;
// it exists purely so a dropped event can never leave the player stuck.
const REVEAL_CAP_MS = 2500;

/**
 * Full-bleed embed of Glow Rush (a standalone Vite app, deployed and
 * versioned independently at glow-rush.vercel.app). Kept as an iframe
 * rather than ported into this codebase on purpose: the game has its own
 * engine, its own React tree, and ships on its own schedule - merging it in
 * here would mean maintaining two copies.
 */
export default function GamesFrame() {
  const [loaded, setLoaded] = useState(false);
  const revealedRef = useRef(false);

  function reveal() {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setLoaded(true);
  }

  useEffect(() => {
    const capTimer = setTimeout(reveal, REVEAL_CAP_MS);
    return () => clearTimeout(capTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/10 bg-black/95 px-4">
        <Link
          href="/"
          onClick={playClickSound}
          className="font-(family-name:--font-heading) text-xs font-extrabold tracking-[0.06em] text-white/70 transition-colors duration-300 hover:text-white"
        >
          &larr; PAVEL
        </Link>
        <span className="text-[11px] text-white/35">Glow Rush</span>
      </div>

      <div className="relative flex-1">
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${
            loaded ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{
            background: "radial-gradient(120% 100% at 20% 10%, #f6f0e6 0%, #ded3ec 55%, #c9d3e0 100%)",
          }}
          aria-hidden={loaded}
        >
          <div className="relative h-16 w-16">
            <div
              className="absolute inset-[-14px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,209,102,0.55) 0%, rgba(255,209,102,0) 70%)" }}
            />
            <div
              className="absolute inset-0 animate-pulse rounded-full motion-reduce:animate-none"
              style={{
                background: "radial-gradient(circle at 35% 30%, #fff1c9, #ffd166 55%, #f4a640 100%)",
                boxShadow: "0 8px 24px rgba(244,166,64,0.35)",
              }}
            />
          </div>
          <p className="text-sm text-[#3a2e4d]/70">Loading Glow Rush&hellip;</p>
        </div>

        <iframe
          src={GAME_URL}
          title="Glow Rush, a tiny game for a lighter moment"
          onLoad={reveal}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
