"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Particle = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  twinklePhase: number;
};

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const isCaseStudy = pathname?.startsWith("/work/") ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const maxCount = isCaseStudy ? 140 : 280;
    const minCount = isCaseStudy ? 50 : 110;
    const divisor = isCaseStudy ? 16000 : 8000;
    const maxAlpha = isCaseStudy ? 0.22 : 0.45;
    const minAlpha = isCaseStudy ? 0.08 : 0.2;
    const twinkleAmplitude = isCaseStudy ? 0.12 : 0.35;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    function createParticles() {
      const area = width * height;
      const count = Math.min(maxCount, Math.max(minCount, Math.round(area / divisor)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.4,
        baseAlpha: Math.random() * maxAlpha + minAlpha,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.04,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    let t = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const twinkle = prefersReducedMotion
          ? p.baseAlpha
          : p.baseAlpha + Math.sin(t * p.twinkleSpeed + p.twinklePhase) * twinkleAmplitude;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, twinkle))})`;
        ctx.fill();
      }
      t += 1;
      frameId = requestAnimationFrame(draw);
    }

    if (prefersReducedMotion) {
      draw();
      window.removeEventListener("resize", resize);
      window.addEventListener("resize", resize);
    } else {
      frameId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, [isCaseStudy]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
