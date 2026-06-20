import Image from "next/image";

const competencies = [
  {
    title: "Efficient Workflow",
    description: "Streamlined design process for rapid delivery.",
  },
  {
    title: "Collaborative Process",
    description: "Close integration of feedback throughout design.",
  },
  {
    title: "Attention to Detail",
    description: "Meticulous approach ensuring polished, cohesive outputs.",
  },
];

export default function AboutPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-(family-name:--font-heading) text-4xl font-extrabold leading-tight sm:text-5xl">
          I turn complex problems into products that feel effortless.
        </h1>
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <Image src="/site-assets/about-image.jpg" alt="Pavel at work" fill className="object-cover" />
        </div>
        <p className="mb-4 text-lg text-white/70">
          Based in London with 7+ years spanning B2B SaaS and B2C work. Led UX for an AI platform
          enabling teams to build and manage AI-powered experiences.
        </p>
        <p className="mb-16 text-lg text-white/70">
          Specializes in conversion-focused mobile design and end-to-end processes from research
          through shipped products. Values accessible, scalable design.
        </p>

        <h2 className="mb-6 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
          From My Lens
        </h2>
        <p className="mb-16 text-white/60">
          Observes patterns, details, and flow across cities, spaces, and products. Personal
          reference points include York Minster, the University of York, Liverpool, Kingston, and
          St. Paul&apos;s Cathedral.
        </p>

        <h2 className="mb-6 font-(family-name:--font-heading) text-2xl font-extrabold uppercase tracking-tight">
          Core Competencies
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {competencies.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
