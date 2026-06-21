import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Pavel",
  description: "Get in touch about your project.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-sm uppercase tracking-widest text-white/50">Let&apos;s talk about</p>
          <h1 className="">
            Your Project
          </h1>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2">
          <div>
            <h2 className="mb-8">
              Get in touch
            </h2>
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
