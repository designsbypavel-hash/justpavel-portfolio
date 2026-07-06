import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Pavel",
  description: "Get in touch about your project.",
};

const topics = [
  {
    label: "Product Design",
    description: "B2B SaaS and B2C mobile experiences, from discovery through shipped product.",
  },
  {
    label: "Mentoring",
    description: "Portfolio storytelling, interview prep, and practical AI workflows for designers.",
  },
  {
    label: "Content & Speaking",
    description: "AI tools and product design process, on YouTube or in a session with your team.",
  },
];

export default function ContactPage() {
  return (
    <div>
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="mb-6">Let&apos;s build something</h1>
            <p className="mb-8 text-lg text-white/70">
              I&apos;m always open to hearing about new projects, mentoring opportunities, and
              conversations about AI-first product design. Whether you&apos;re shipping a B2B SaaS
              platform or a conversion-focused mobile experience, I&apos;d love to hear about it.
            </p>

            <h2 className="mb-4 text-base font-semibold text-white/90">
              Reach out if you want to discuss:
            </h2>
            <ul className="mb-8 space-y-3">
              {topics.map((topic) => (
                <li key={topic.label} className="flex gap-2 text-white/70">
                  <span aria-hidden className="text-white/40">
                    •
                  </span>
                  <span>
                    <span className="font-semibold text-white">{topic.label}:</span>{" "}
                    {topic.description}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-white/80">Let&apos;s talk.</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2">
          <div>
            <h2 className="mb-8 h2-heading">Get in touch</h2>
            <a
              href="mailto:designsbypavel@gmail.com"
              className="inline-flex items-center gap-3 text-lg font-medium hover:underline"
            >
              <span aria-hidden>✉</span>
              designsbypavel@gmail.com
            </a>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
