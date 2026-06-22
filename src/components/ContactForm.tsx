"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { buttonHover } from "@/lib/motion";
import { playClickSound } from "@/lib/sound";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    playClickSound();
    const subject = encodeURIComponent(`Project inquiry from ${name || "your site"}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:designsbypavel@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <h3 className="mb-6 font-semibold">Send Message</h3>

      <label htmlFor="name" className="mb-2 block text-sm">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="mb-5 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
      />

      <label htmlFor="email" className="mb-2 block text-sm">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@gmail.com"
        className="mb-5 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
      />

      <label htmlFor="message" className="mb-2 block text-sm">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type Your Message"
        className="mb-6 w-full resize-y rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
      />

      <motion.button
        type="submit"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        animate="rest"
        variants={buttonHover}
        className="w-full rounded-md border border-white/20 bg-white/10 py-3 text-sm font-medium transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:text-black hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.25)]"
      >
        Send Message
      </motion.button>
    </form>
  );
}
