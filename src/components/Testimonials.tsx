const testimonials = [
  {
    name: "Peter Najm",
    role: "AI Product Manager, AWTG",
    date: "June 2026",
    text: "I had the pleasure of working with Pavel on several product design tasks. He has a strong eye for clean, practical UI design and is able to turn product requirements and feedback into clear Figma designs quickly. What stood out to me was his ability to move fast while still keeping the user experience simple and well thought through. He is also very forward thinking in how he works. He understands how to use AI agents to accelerate his workflow in a way that feels genuinely integrated, not bolted on.",
    accent: "#c7d2fe",
    bg: "rgba(199,210,254,0.04)",
    border: "rgba(199,210,254,0.12)",
  },
  {
    name: "Aislinn Finnegan",
    role: "Product Designer",
    date: "July 2026",
    text: "Pavel was an amazing mentor, and really helped me get my ducks in a row for a big interview where I ended up landing the role. We practised questions, and he helped me to make them much stronger and interview-focused, which was a complete game changer. Not only did we speak about interview settings, but we also had overall discussions around design and UX, which helped me get back into the design mindset. He was extremely understanding and helpful through all steps of the way.",
    accent: "#ddd6fe",
    bg: "rgba(221,214,254,0.04)",
    border: "rgba(221,214,254,0.12)",
  },
  {
    name: "Prachi Chougule",
    role: "Senior UI/UX Designer",
    date: "July 2023",
    text: "I highly recommend Pavel for his exceptional skills. I had the pleasure of working closely with Pavel for 1 year on the SonyLIV project. His dedication, expertise and positive attitude have always impressed me. He is an excellent communicator and collaborator with great observation skills, always willing to go the extra mile to ensure the success of the team.",
    accent: "#fed7aa",
    bg: "rgba(255,237,213,0.04)",
    border: "rgba(254,215,170,0.12)",
  },
  {
    name: "Sayali Mangate",
    role: "Product Designer",
    date: "2023",
    text: "Pavel became part of the team really seamlessly and contributes really well, and has driven forward several projects with minimal involvement needed from others. He joined and hit the ground running, immediately knew what to do within his role, and managed to create some amazing deliverables within a short timeframe.",
    accent: "#99f6e4",
    bg: "rgba(204,251,241,0.04)",
    border: "rgba(153,246,228,0.12)",
  },
];

export default function Testimonials() {
  return (
    <section className="mb-16">
      <h2 className="mb-10">What people say</h2>
      <div className="flex flex-col gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative rounded-2xl p-6 overflow-hidden"
            style={{ background: t.bg, border: `1px solid ${t.border}` }}
          >
            {/* Decorative quote */}
            <div
              className="absolute top-4 right-6 select-none pointer-events-none leading-none"
              style={{ fontFamily: "'Neue Montreal', system-ui, sans-serif" }}
              style={{ fontSize: 80, color: t.accent, opacity: 0.07 }}
              aria-hidden
            >
              &ldquo;
            </div>
            <p className="relative mb-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: `${t.accent}22`, color: t.accent, border: `1px solid ${t.accent}33` }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {t.role}
                  <span className="mx-2" style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                  {t.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
