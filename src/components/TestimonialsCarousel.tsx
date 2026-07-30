"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Peter Najm",
    role: "AI Product Manager, AWTG",
    date: "June 2026",
    text: "I had the pleasure of working with Pavel on several product design tasks. He has a strong eye for clean, practical UI design and is able to turn product requirements and feedback into clear Figma designs quickly. What stood out to me was his ability to move fast while still keeping the user experience simple and well thought through. He is also very forward thinking in how he works. He understands how to use AI agents to accelerate his workflow in a way that feels genuinely integrated, not bolted on.",
    accent: "#c7d2fe",
    glow: "rgba(199,210,254,0.06)",
    border: "rgba(199,210,254,0.12)",
  },
  {
    name: "Aislinn Finnegan",
    role: "Product Designer",
    date: "July 2026",
    text: "Pavel was an amazing mentor, and really helped me get my ducks in a row for a big interview where I ended up landing the role. We practised questions, and he helped me to make them much stronger and interview-focused, which was a complete game changer. Not only did we speak about interview settings, but we also had overall discussions around design and UX, which helped me get back into the design mindset. He was extremely understanding and helpful through all steps of the way.",
    accent: "#ddd6fe",
    glow: "rgba(221,214,254,0.06)",
    border: "rgba(221,214,254,0.12)",
  },
  {
    name: "Prachi Chougule",
    role: "Senior UI/UX Designer",
    date: "July 2023",
    text: "I highly recommend Pavel for his exceptional skills. I had the pleasure of working closely with Pavel for 1 year on the SonyLIV project. His dedication, expertise and positive attitude have always impressed me. He is an excellent communicator and collaborator with great observation skills, always willing to go the extra mile to ensure the success of the team.",
    accent: "#fed7aa",
    glow: "rgba(254,215,170,0.06)",
    border: "rgba(254,215,170,0.12)",
  },
  {
    name: "Sayali Mangate",
    role: "Product Designer",
    date: "2023",
    text: "Pavel became part of the team really seamlessly and contributes really well, and has driven forward several projects with minimal involvement needed from others. He joined and hit the ground running, immediately knew what to do within his role, and managed to create some amazing deliverables within a short timeframe.",
    accent: "#99f6e4",
    glow: "rgba(153,246,228,0.06)",
    border: "rgba(153,246,228,0.12)",
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[active];

  return (
    <section className="px-6 py-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12">What people say</h2>

        <div
          className="relative rounded-2xl p-8 sm:p-10 transition-all duration-500 overflow-hidden"
          style={{ background: t.glow, border: `1px solid ${t.border}` }}
        >
          {/* Corner glows */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className="absolute -top-16 -left-16 h-56 w-56 rounded-full transition-all duration-700"
              style={{ background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)` }}
            />
            <div
              className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full transition-all duration-700"
              style={{ background: `radial-gradient(circle, ${t.accent}14 0%, transparent 70%)` }}
            />
          </div>

          {/* Decorative quote mark */}
          <div
            className="absolute top-8 right-10 select-none pointer-events-none font-serif leading-none"
            style={{ fontSize: 120, lineHeight: 1, color: t.accent, opacity: 0.08 }}
            aria-hidden
          >
            &ldquo;
          </div>

          {/* Quote text */}
          <p className="relative mb-10 text-lg leading-relaxed sm:text-xl" style={{ color: "rgba(255,255,255,0.82)", maxWidth: "72ch" }}>
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Author row */}
          <div className="flex items-center justify-between gap-6 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-wide"
                style={{ background: `${t.accent}22`, color: t.accent, border: `1px solid ${t.accent}33` }}
              >
                {t.name.charAt(0)}
              </div>
              {/* Name + role */}
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{t.name}</p>
                <p className="mt-0.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {t.role}
                  <span className="mx-2" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  {t.date}
                </p>
              </div>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.accent + "66"; (e.currentTarget as HTMLButtonElement).style.color = t.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = t.accent + "66"; (e.currentTarget as HTMLButtonElement).style.color = t.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? item.accent : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
