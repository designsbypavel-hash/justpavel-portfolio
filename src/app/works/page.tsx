import Image from "next/image";

const projects = [
  {
    title: "Designing the control layer for enterprise AI agents",
    description:
      "Platform enabling enterprise teams to validate AI before deployment against their own scenarios, without engineering support.",
    category: "B2B SaaS",
    tags: ["AI", "Enterprise", "Validation", "Governance"],
    image: "/site-assets/ai-control-layer.png",
  },
  {
    title: "B2C Payments Checkout — SonyLIV",
    description:
      "UPI-focused checkout redesign reducing transaction failures and drop-offs through improved payment flows and failure recovery.",
    category: "B2C Mobile",
    tags: ["Payments", "Checkout", "Conversion Optimization"],
    image: "/site-assets/sonyliv-checkout.jpg",
  },
  {
    title: "Fintech AI-Assisted Collections (B2B SaaS)",
    description:
      "AI-assisted workflows improving decision velocity and reducing missed follow-ups in collections operations.",
    category: "B2B SaaS",
    tags: ["AI", "Fintech", "Collections", "Workflow"],
    image: "/site-assets/ai-fintech-collections.jpg",
  },
  {
    title: "B2C Subscription Growth — SonyLIV",
    description:
      "Subscription journey overhaul emphasizing plan transparency to lower abandonment and boost conversion rates.",
    category: "B2C Mobile",
    tags: ["Subscriptions", "Conversion", "UX"],
    image: "/site-assets/sonyliv-subscription.jpg",
  },
  {
    title: "OTT Search & Discovery (Mobile)",
    description: "Mobile search interface enabling faster content discovery and playback at scale.",
    category: "B2C Mobile",
    tags: ["Search", "Discovery", "Streaming"],
    image: "/site-assets/sonyliv-search.jpg",
  },
];

export default function WorksPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-16 font-(family-name:--font-heading) text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          All Projects
        </h1>
        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.title} className="grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
                <Image src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              <div>
                <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
                  {project.category}
                </span>
                <h2 className="mb-2 text-2xl font-semibold">{project.title}</h2>
                <p className="mb-4 text-white/60">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
