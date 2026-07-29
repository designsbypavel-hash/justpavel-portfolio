"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Peter Najm",
    role: "AI Product Manager · AWTG · June 2026",
    text: "I had the pleasure of working with Pavel on several product design tasks. He has a strong eye for clean, practical UI design and is able to turn product requirements and feedback into clear Figma designs quickly. What stood out to me was his ability to move fast while still keeping the user experience simple and well thought through. He is also very forward thinking in how he works. He understands how to use AI agents to accelerate his workflow in a way that feels genuinely integrated, not bolted on.",
    bg: "rgba(224,231,255,0.04)",
    border: "rgba(199,210,254,0.15)",
    initial: "rgba(199,210,254,0.2)",
    initialText: "#c7d2fe",
  },
  {
    name: "Aislinn Finnegan",
    role: "Product Designer · July 2026",
    text: "Pavel was an amazing mentor, and really helped me get my ducks in a row for a big interview where I ended up landing the role. We practised questions, and he helped me to make them much stronger and interview-focused, which was a complete game changer. Not only did we speak about interview settings, but we also had overall discussions around design and UX, which helped me get back into the design mindset. He was extremely understanding and helpful through all steps of the way.",
    bg: "rgba(237,233,254,0.04)",
    border: "rgba(221,214,254,0.15)",
    initial: "rgba(221,214,254,0.2)",
    initialText: "#ddd6fe",
  },
  {
    name: "Prachi Chougule",
    role: "Senior UI/UX Designer · July 2023",
    text: "I highly recommend Pavel for his exceptional skills. I had the pleasure of working closely with Pavel for 1 year on the SonyLIV project. His dedication, expertise and positive attitude have always impressed me. He is an excellent communicator and collaborator with great observation skills, always willing to go the extra mile to ensure the success of the team.",
    bg: "rgba(255,237,213,0.04)",
    border: "rgba(254,215,170,0.15)",
    initial: "rgba(254,215,170,0.2)",
    initialText: "#fed7aa",
  },
  {
    name: "Sayali Mangate",
    role: "Product Designer · 2023",
    text: "Pavel became part of the team really seamlessly and contributes really well, and has driven forward several projects with minimal involvement needed from others. He joined and hit the ground running, immediately knew what to do within his role, and managed to create some amazing deliverables within a short timeframe.",
    bg: "rgba(204,251,241,0.04)",
    border: "rgba(153,246,228,0.15)",
    initial: "rgba(153,246,228,0.2)",
    initialText: "#99f6e4",
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10">What people say</h2>

        <div
          className="relative rounded-2xl p-8 transition-colors duration-500"
          style={{ background: t.bg, border: `1px solid ${t.border}` }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="mb-8 text-base leading-relaxed text-white/80 sm:text-lg">
            &ldquo;{t.text}&rdquo;
          </p>

          <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: t.initial, color: t.initialText }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/60">{t.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === active ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.20)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
