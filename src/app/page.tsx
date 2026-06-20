import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

const featuredWorks = projects.slice(0, 3);

const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    image: "/site-assets/youtube-ai-tools.png",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    image: "/site-assets/youtube-mobbin.jpg",
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
              <Link
                key={work.slug}
                href={`/works/${work.slug}`}
                className="group grid gap-6 sm:grid-cols-2 sm:items-center"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 transition group-hover:border-white/30">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="mb-2 inline-block text-xs uppercase tracking-widest text-white/50">
                    {work.category}
                  </span>
                  <h3 className="mb-2 text-2xl font-semibold transition group-hover:text-white/80">
                    {work.title}
                  </h3>
                  <p className="text-white/60">{work.description}</p>
                </div>
              </Link>
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
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                </div>
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
