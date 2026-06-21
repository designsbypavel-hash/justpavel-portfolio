import Image from "next/image";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "Mentoring | Pavel",
  description:
    "Mentoring for designers who want real progress — portfolio storytelling, interview prep, and practical AI workflows.",
};

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

const skillRatings = [
  { label: "Communication", value: 100 },
  { label: "Motivational", value: 100 },
  { label: "Problem Solving", value: 100 },
  { label: "Subject Knowledge", value: 95 },
];

const tags = [
  "Analytical",
  "Positive attitude",
  "Constructive",
  "Tactful",
  "Detail-oriented",
  "Mindful",
  "Transparent",
];

const testimonials = [
  {
    quote:
      "I had such a great case study review with Pavel! He gave me real, honest feedback and provided ways to improve my presentation, plus follow-up questions I may get in a real interview. Super kind and relatable too!",
    name: "Mentee",
    role: "via ADPList",
    date: "May 07, 2026",
  },
  {
    quote:
      "I had an outstanding experience with my mentor, who provided amazing communication and motivation throughout our session. Their subject knowledge was exceptional, guiding me in building a strong portfolio while offering insightful, real feedback on my questions. Their problem-solving skills truly exceeded my expectations. I highly recommend booking a session.",
    name: "Rakhi Das",
    role: "Associate UX Designer, Fortmindz Pvt Ltd.",
    date: "March 14, 2026",
  },
  {
    quote: "He helped me a lot and gave me a lot of feedback it's useful and helpful",
    name: "Rais Hasnaa",
    role: "Student Product Design",
    date: "January 07, 2026",
  },
  {
    quote:
      "Pavel is incredibly knowledgeable and genuinely understands the struggles of breaking into the UX industry in the UK. He reviewed my CV and portfolio in detail and gave sharp, actionable insights that I hadn't considered before. His guidance was honest, specific, and extremely valuable. A truly refreshing and motivating session.",
    name: "Eshan Gupta",
    role: "UX/UI Designer, Synkcode",
    date: "November 16, 2025",
  },
];

export default function MentoringPage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeInSection>
          <div className="mb-12 flex flex-wrap items-center gap-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/20 shadow-[0_0_0_6px_rgba(255,255,255,0.04)]">
              <Image src="/site-assets/mentor-avatar.webp" alt="Pavel" fill className="object-cover" priority />
            </div>
            <div>
              <h1 className="mb-2">
                Mentoring for designers who want real progress
              </h1>
              <p className="max-w-2xl text-white/70">
                Coaching on portfolio storytelling, interview walkthroughs, and practical AI workflows.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {mentoringOffers.map((offer) => (
              <div key={offer.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2">{offer.title}</h2>
                <p className="text-sm text-white/60">{offer.description}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mb-16 grid gap-8 border-y border-white/10 py-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/30 pt-4 first:border-t-0 sm:border-t sm:first:border-t-white/30">
                <div className="font-(family-name:--font-heading) text-5xl font-extrabold">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="mb-8 uppercase">
            Mentee Ratings
          </h2>
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {skillRatings.map((skill) => (
              <div key={skill.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-white/70">{skill.label}</span>
                  <span className="text-white/50">{skill.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mb-16">
            <h2 className="mb-4 uppercase">
              People Often Say
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <h2 className="mb-8 uppercase">Mentee Testimonials</h2>
          <div className="mb-16 grid gap-6 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div
                key={t.name + t.date}
                className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <p className="mb-4 flex-1 text-white/80">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-white/40">
                    {t.role} · {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        <CTASection href="https://adplist.org/mentors/pavel-mondal" label="Book Now" external />
      </div>
    </div>
  );
}
