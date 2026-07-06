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

export default function Testimonials() {
  return (
    <section className="mb-16">
      <h2 className="mb-10 uppercase">What People Say</h2>
      <div className="flex flex-col gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl p-6"
            style={{ background: t.bg, border: `1px solid ${t.border}` }}
          >
            <p className="mb-6 text-base leading-relaxed text-white/80">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-white/8 pt-5">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: t.initial, color: t.initialText }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-white/45">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
