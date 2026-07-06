const testimonials = [
  {
    name: "Peter Najm",
    role: "AI Product Manager",
    company: "AWTG",
    relationship: "Peter managed Pavel directly",
    date: "June 2026",
    text: "I had the pleasure of working with Pavel on several product design tasks. He has a strong eye for clean, practical UI design and is able to turn product requirements and feedback into clear Figma designs quickly. What stood out to me was his ability to move fast while still keeping the user experience simple and well thought through. He is also very forward thinking in how he works — he understands how to use AI agents to accelerate his workflow in a way that feels genuinely integrated, not bolted on.",
  },
  {
    name: "Aislinn Finnegan",
    role: "Product Designer",
    company: "",
    relationship: "Worked with Pavel on the same team",
    date: "July 2026",
    text: "Pavel was an amazing mentor, and really helped me get my ducks in a row for a big interview where I ended up landing the role. We practised questions, and he helped me to make them much stronger and interview-focused — which was a complete game changer. Not only did we speak about interview settings, but we also had overall discussions around design and UX, which helped me get back into the design mindset. He was extremely understanding and helpful through all steps of the way.",
  },
  {
    name: "Prachi Chougule",
    role: "Senior UI/UX Designer",
    company: "Lemon Yellow LLP",
    relationship: "Worked with Pavel on the same team",
    date: "July 2023",
    text: "I highly recommend Pavel for his exceptional skills. I had the pleasure of working closely with Pavel for 1 year at Lemon Yellow LLP on the SonyLIV project. His dedication, expertise and positive attitude have always impressed me. He is an excellent communicator and collaborator with great observation skills — always willing to go the extra mile to ensure the success of the team.",
  },
  {
    name: "Sayali Mangate",
    role: "Product Designer",
    company: "",
    relationship: "Worked with Pavel on the same team",
    date: "2023",
    text: "Pavel became part of the team really seamlessly and contributes really well, and has driven forward several projects with minimal involvement needed from others. He joined and hit the ground running — immediately knew what to do within his role, and managed to create some amazing deliverables within a short timeframe.",
  },
];

export default function Testimonials() {
  return (
    <section className="mb-16">
      <h2 className="mb-10 uppercase">What People Say</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            {/* Quote */}
            <p className="flex-1 text-sm leading-relaxed text-white/75">
              &ldquo;{t.text}&rdquo;
            </p>
            {/* Author */}
            <div className="border-t border-white/8 pt-4">
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="mt-0.5 text-xs text-white/45">
                {t.role}{t.company ? ` · ${t.company}` : ""} · {t.date}
              </p>
              <p className="mt-0.5 text-xs text-white/30">{t.relationship}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
