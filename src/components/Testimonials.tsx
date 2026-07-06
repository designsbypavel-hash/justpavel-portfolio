const testimonials = [
  {
    name: "Peter Najm",
    role: "AI Product Manager",
    company: "AWTG",
    date: "June 2026",
    text: "I had the pleasure of working with Pavel on several product design tasks. He has a strong eye for clean, practical UI design and is able to turn product requirements and feedback into clear Figma designs quickly. What stood out to me was his ability to move fast while still keeping the user experience simple and well thought through. He is also very forward thinking in how he works — he understands how to use AI agents to accelerate his workflow in a way that feels genuinely integrated, not bolted on.",
    accent: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
    dot: "#6366f1",
  },
  {
    name: "Aislinn Finnegan",
    role: "Product Designer",
    company: "",
    date: "July 2026",
    text: "Pavel was an amazing mentor, and really helped me get my ducks in a row for a big interview where I ended up landing the role. We practised questions, and he helped me to make them much stronger and interview-focused — which was a complete game changer. Not only did we speak about interview settings, but we also had overall discussions around design and UX, which helped me get back into the design mindset. He was extremely understanding and helpful through all steps of the way.",
    accent: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.25)",
    dot: "#a855f7",
  },
  {
    name: "Prachi Chougule",
    role: "Senior UI/UX Designer",
    company: "Lemon Yellow LLP",
    date: "July 2023",
    text: "I highly recommend Pavel for his exceptional skills. I had the pleasure of working closely with Pavel for 1 year at Lemon Yellow LLP on the SonyLIV project. His dedication, expertise and positive attitude have always impressed me. He is an excellent communicator and collaborator with great observation skills — always willing to go the extra mile to ensure the success of the team.",
    accent: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.22)",
    dot: "#f97316",
  },
  {
    name: "Sayali Mangate",
    role: "Product Designer",
    company: "",
    date: "2023",
    text: "Pavel became part of the team really seamlessly and contributes really well, and has driven forward several projects with minimal involvement needed from others. He joined and hit the ground running — immediately knew what to do within his role, and managed to create some amazing deliverables within a short timeframe.",
    accent: "rgba(20,184,166,0.10)",
    border: "rgba(20,184,166,0.22)",
    dot: "#14b8a6",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", paddingLeft: "max(24px, calc(50vw - 512px))", paddingRight: "max(24px, calc(50vw - 512px))" }}
    >
      <h2 className="mb-12 uppercase">What People Say</h2>
      <div className="flex flex-col gap-5">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl p-7"
            style={{
              background: t.accent,
              border: `1px solid ${t.border}`,
            }}
          >
            {/* Accent bar */}
            <div className="mb-6 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full" style={{ background: t.dot }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.dot }}>
                LinkedIn Recommendation
              </span>
            </div>

            {/* Quote */}
            <p className="mb-8 text-base leading-loose text-white/85">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: t.accent, border: `1.5px solid ${t.border}` }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {t.role}{t.company ? ` · ${t.company}` : ""} · {t.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
