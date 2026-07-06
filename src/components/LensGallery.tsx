"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

type Photo = { src: string; caption: string };

const SEED_LAYOUT = [
  { x: 0,   y: 0,   rot: -3  },
  { x: 200, y: 20,  rot:  4  },
  { x: 405, y: -10, rot: -2  },
  { x: 605, y: 15,  rot:  5  },
  { x: 810, y: -5,  rot: -4  },
  { x: 1015,y: 20,  rot:  3  },
  { x: 1215,y: -15, rot: -5  },
  { x: 1415,y: 10,  rot:  2  },
  { x: 1615,y: -10, rot: -3  },
];

export default function LensGallery({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(() =>
    photos.map((_, i) => ({ ...SEED_LAYOUT[i % SEED_LAYOUT.length] }))
  );
  const [zOrder, setZOrder] = useState(() => photos.map((_, i) => i));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dragging = useRef<{
    idx: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  } | null>(null);

  const bringToFront = useCallback((idx: number) => {
    setZOrder((prev) => {
      const next = prev.filter((z) => z !== idx);
      next.push(idx);
      return next;
    });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, idx: number) => {
      e.preventDefault();
      bringToFront(idx);
      dragging.current = {
        idx,
        startX: e.clientX,
        startY: e.clientY,
        origX: positions[idx].x,
        origY: positions[idx].y,
        moved: false,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [positions, bringToFront]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragging.current.startX;
    const dy = e.clientY - dragging.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragging.current.moved = true;
    const { idx, origX, origY } = dragging.current;
    setPositions((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, x: origX + dx, y: origY + dy } : p))
    );
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent, idx: number) => {
      if (dragging.current && !dragging.current.moved) {
        setLightbox(idx);
      }
      dragging.current = null;
    },
    []
  );

  // close lightbox on Escape
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

  const CARD_W = 160;
  const CARD_H = 220;

  return (
    <>
      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden rounded-2xl border border-white/8"
        style={{ height: 340, background: "rgba(255,255,255,0.02)", cursor: "default" }}
      >
        <p className="pointer-events-none absolute bottom-3 right-4 text-xs text-white/20">
          drag · click to expand
        </p>

        {photos.map((photo, i) => {
          const pos = positions[i];
          const z = zOrder.indexOf(i);
          return (
            <div
              key={photo.src}
              onPointerDown={(e) => onPointerDown(e, i)}
              onPointerMove={onPointerMove}
              onPointerUp={(e) => onPointerUp(e, i)}
              className="absolute touch-none"
              style={{
                left: `calc(50% + ${pos.x - (photos.length * 100)}px)`,
                top: `calc(50% - ${CARD_H / 2}px + ${pos.y}px)`,
                width: CARD_W,
                zIndex: z + 1,
                cursor: dragging.current?.idx === i ? "grabbing" : "grab",
                transform: `rotate(${pos.rot}deg)`,
                transition: dragging.current?.idx === i ? "none" : "box-shadow 0.2s",
              }}
            >
              <figure
                className="rounded-sm bg-white p-2 pb-5 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.7)]"
                style={{
                  boxShadow:
                    z === zOrder.length - 1
                      ? "0 20px 50px -10px rgba(0,0,0,0.9)"
                      : "0 10px 24px -6px rgba(0,0,0,0.6)",
                }}
              >
                <div className="relative overflow-hidden" style={{ width: CARD_W - 16, height: CARD_H - 40 }}>
                  <Image src={photo.src} alt={photo.caption} fill className="object-cover" draggable={false} />
                </div>
                <figcaption className="mt-2 truncate text-center text-[10px] text-black/60">
                  {photo.caption}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-white/50 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            type="button"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl leading-none px-3"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-4xl leading-none px-3"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
          >
            ›
          </button>

          <figure
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" style={{ width: "min(560px, 90vw)", height: "min(560px, 70vh)" }}>
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                fill
                className="object-contain"
                sizes="560px"
              />
            </div>
            <figcaption className="mt-4 text-sm text-white/50">
              {photos[lightbox].caption}
            </figcaption>
            <p className="mt-1 text-xs text-white/25">
              {lightbox + 1} / {photos.length}
            </p>
          </figure>
        </div>
      )}
    </>
  );
}
