"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

type Photo = { src: string; caption: string };

// Three-row scatter across full canvas width — % x, px y from vertical center
const SEED_LAYOUT = [
  { xPct:  1,  y: -120, rot: -4 },
  { xPct:  8,  y:   30, rot:  3 },
  { xPct: 16,  y: -100, rot: -2 },
  { xPct: 23,  y:  110, rot:  5 },
  { xPct: 30,  y:  -90, rot: -5 },
  { xPct: 38,  y:   50, rot:  3 },
  { xPct: 45,  y: -115, rot: -3 },
  { xPct: 52,  y:   90, rot:  4 },
  { xPct: 59,  y:  -80, rot: -2 },
  { xPct: 66,  y:   40, rot:  5 },
  { xPct: 73,  y: -110, rot: -4 },
  { xPct: 80,  y:   70, rot:  3 },
  { xPct: 87,  y:  -95, rot: -3 },
  { xPct: 93,  y:   30, rot:  4 },
];

const CARD_W = 170;
const CARD_H = 230;

export default function LensGallery({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasW, setCanvasW] = useState(900);

  const [positions, setPositions] = useState(() =>
    photos.map((_, i) => {
      const seed = SEED_LAYOUT[i % SEED_LAYOUT.length];
      return { xPct: seed.xPct, y: seed.y, rot: seed.rot };
    })
  );
  const [zOrder, setZOrder] = useState(() => photos.map((_, i) => i));
  const [lightbox, setLightbox] = useState<number | null>(null);

  const dragging = useRef<{
    idx: number;
    startX: number;
    startY: number;
    origXPct: number;
    origY: number;
    moved: boolean;
  } | null>(null);

  // Track canvas width for pct→px conversion
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setCanvasW(entry.contentRect.width));
    ro.observe(el);
    setCanvasW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const bringToFront = useCallback((idx: number) => {
    setZOrder((prev) => [...prev.filter((z) => z !== idx), idx]);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, idx: number) => {
      e.preventDefault();
      bringToFront(idx);
      dragging.current = {
        idx,
        startX: e.clientX,
        startY: e.clientY,
        origXPct: positions[idx].xPct,
        origY: positions[idx].y,
        moved: false,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [positions, bringToFront]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragging.current.startX;
      const dy = e.clientY - dragging.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current.moved = true;
      const { idx, origXPct, origY } = dragging.current;
      setPositions((prev) =>
        prev.map((p, i) =>
          i === idx
            ? { ...p, xPct: origXPct + (dx / canvasW) * 100, y: origY + dy }
            : p
        )
      );
    },
    [canvasW]
  );

  const onPointerUp = useCallback((_e: React.PointerEvent, idx: number) => {
    if (dragging.current && !dragging.current.moved) setLightbox(idx);
    dragging.current = null;
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && lightbox !== null)
        setLightbox((lightbox + 1) % photos.length);
      if (e.key === "ArrowLeft" && lightbox !== null)
        setLightbox((lightbox - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, photos.length]);

  const CANVAS_H = 620;
  const MID_Y = CANVAS_H / 2 - CARD_H / 2;

  return (
    <>
      {/* Break out of max-w-3xl so canvas is full page width */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen px-4 sm:px-8 mb-24">
        <div
          ref={containerRef}
          className="relative select-none overflow-hidden rounded-2xl border border-white/10"
          style={{
            height: CANVAS_H,
            background: "rgba(255,255,255,0.025)",
            cursor: "default",
          }}
        >
          {/* Hint */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs text-white/60">drag to rearrange</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/60">click to expand</span>
          </div>

          {photos.map((photo, i) => {
            const pos = positions[i];
            const z = zOrder.indexOf(i);
            const isTop = z === zOrder.length - 1;
            const xPx = (pos.xPct / 100) * canvasW;

            return (
              <div
                key={photo.src}
                onPointerDown={(e) => onPointerDown(e, i)}
                onPointerMove={onPointerMove}
                onPointerUp={(e) => onPointerUp(e, i)}
                className="absolute touch-none"
                style={{
                  left: xPx,
                  top: MID_Y + pos.y,
                  width: CARD_W,
                  zIndex: z + 1,
                  cursor: dragging.current?.idx === i ? "grabbing" : "grab",
                  transform: `rotate(${pos.rot}deg)`,
                  filter: isTop ? "brightness(1.05)" : "none",
                  transition: dragging.current?.idx === i ? "none" : "filter 0.2s",
                }}
              >
                <figure
                  style={{
                    background: "#fff",
                    borderRadius: 4,
                    padding: "8px 8px 24px 8px",
                    boxShadow: isTop
                      ? "0 24px 60px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08)"
                      : "0 10px 28px -6px rgba(0,0,0,0.65)",
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ width: CARD_W - 16, height: CARD_H - 40 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      className="object-cover [image-orientation:from-image]"
                      draggable={false}
                      sizes="170px"
                    />
                  </div>
                  <figcaption
                    className="mt-2 truncate text-center"
                    style={{ fontSize: 10, color: "rgba(0,0,0,0.55)" }}
                  >
                    {photo.caption}
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white text-2xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white text-2xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
          >
            ›
          </button>

          <figure
            className="flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden rounded-sm bg-white p-3 pb-10 shadow-2xl"
              style={{ width: "min(520px, 88vw)" }}
            >
              <div
                className="relative w-full"
                style={{ height: "min(480px, 60vh)" }}
              >
                <Image
                  src={photos[lightbox].src}
                  alt={photos[lightbox].caption}
                  fill
                  className="object-contain"
                  sizes="520px"
                />
              </div>
              <p className="mt-3 text-center text-xs text-black/50">
                {photos[lightbox].caption}
              </p>
            </div>
            <p className="text-xs text-white/30">
              {lightbox + 1} / {photos.length} &nbsp;·&nbsp; ← → to navigate
            </p>
          </figure>
        </div>
      )}
    </>
  );
}
