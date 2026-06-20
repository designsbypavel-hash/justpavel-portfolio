import Link from "next/link";

const featuredWorks = [
  {
    title: "Designing the control layer for enterprise AI agents",
    description:
      "Enterprise teams had the AI. They had no way to validate it before go-live — not against their own scenarios, not without engineering.",
    tag: "B2B SaaS",
    gradient: "from-blue-500/30 via-indigo-500/20 to-slate-900",
  },
  {
    title: "B2C Payments Checkout — SonyLIV",
    description: "Reduce drop-offs and increase successful checkouts (UPI-first, failure-recovery).",
    tag: "B2C Mobile",
    gradient: "from-emerald-500/30 via-slate-700/20 to-slate-900",
  },
  {
    title: "AI Fintech Collections (B2B SaaS)",
    description: "Faster decision-making and fewer missed follow-ups with AI-assisted workflows.",
    tag: "B2B SaaS",
    gradient: "from-orange-500/30 via-amber-700/20 to-slate-900",
  },
];

const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    gradient: "from-purple-700 via-indigo-700 to-black",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    gradient: "from-indigo-800 via-blue-900 to-black",
  },
];

const mentoringOffers = [
  {
    title: "Portfolio & case study storytelling",
    description: "Problem → decisions → outcome framework for case studies that actually land interviews.",
  },
  {
    title: "Interview prep (mock + walkthroughs)",
    description: "Sharper answers, calmer delivery, and stronger design narratives.",
  },
];

const stats = [
  { value: "450+", label: "Total mentoring time" },
  { value: "15+", label: "Sessions completed" },
  { value: "100%", label: "Average attendance" },
];

export default function Home() {
  return (
    <div>
      <section className="px-6 pt-28 pb-32">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-(family-name:--font-heading) text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl">
            Designing in London
            <br />
            <span className="gradient-text">software interfaces</span>
            <br />
            Built with clarity
            <br />
            Measured by impact
          </h1>
        </div>
      </section>

      <section id="works" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-(family-name:--font-heading) text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Featured Works
          </h2>
          <div className="space-y-16">
            {featuredWorks.map((work) => (
              <div key={work.title} className="grid gap-6 sm:grid-cols-2 sm:items-center">
                <div
                  className={`aspect-[4/3] w-full rounded-xl bg-gradient-to-br ${work.gradient} border border-white/10`}
                />
                <div>
                  <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
                    {work.tag}
                  </span>
                  <h3 className="mb-2 text-2xl font-semibold">{work.title}</h3>
                  <p className="text-white/60">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href="/works"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              View All Project
            </Link>
          </div>
        </div>
      </section>

      <section id="youtube" className="border-t border-white/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-(family-name:--font-heading) text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Youtube
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((video) => (
              <div key={video.title}>
                <div
                  className={`mb-4 aspect-video rounded-xl bg-gradient-to-br ${video.gradient} border border-white/10`}
                />
                <p className="font-medium">{video.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/youtube"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      <section
        id="mentoring"
        className="border-t border-white/10 bg-gradient-to-b from-indigo-950 via-indigo-950/60 to-black px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 font-(family-name:--font-heading) text-3xl font-extrabold sm:text-4xl">
            Mentoring for designers who want real progress
          </h2>
          <p className="mb-12 max-w-2xl text-white/70">
            Coaching on portfolio storytelling, interview walkthroughs, and practical AI workflows.
          </p>

          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {mentoringOffers.map((offer) => (
              <div key={offer.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-2 font-semibold">{offer.title}</h3>
                <p className="text-sm text-white/60">{offer.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/30 pt-4">
                <div className="font-(family-name:--font-heading) text-5xl font-extrabold">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="https://adplist.org/mentors/pavel-mondal"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
