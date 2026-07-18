export interface JarvisMessage {
  role: "user" | "jarvis";
  text: string;
}

const responses: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ["who is pavel", "who are you", "tell me about", "about pavel", "introduce"],
    reply:
      "Pavel Mondal is a Senior Product Designer with 8 years of experience across AI, SaaS, and enterprise products. He's based in London, holds an MSc in Human-Computer Interaction from the University of York, and currently designs at AWTG. He bridges the gap between business strategy and user experience, translating messy research into products that actually ship.",
  },
  {
    keywords: ["available", "hire", "open to", "looking for", "job", "opportunity", "work with"],
    reply:
      "Pavel is currently open to the right opportunity. He's based in London on a Skilled Worker Visa (SOC 2134) and is particularly interested in Senior Product Designer or Lead Designer roles at AI-first, SaaS, or enterprise companies. If you'd like to get in touch, the contact form on this portfolio is the fastest route.",
  },
  {
    keywords: ["experience", "work history", "career", "background", "worked at", "companies"],
    reply:
      "Pavel has worked across four companies over 8 years: currently Senior Product Designer at AWTG (London), previously Product Designer at Flatlay (LA, remote), SonyLIV (Mumbai), and HighRadius (Hyderabad). His work spans AI agent platforms, streaming products, fintech enterprise tools, and consumer apps, with a consistent thread of turning complex systems into clear, usable experiences.",
  },
  {
    keywords: ["awtg", "current role", "current job", "current company"],
    reply:
      "At AWTG, Pavel is a Senior Product Designer working on enterprise AI platforms. He's reduced design-to-development cycle time by 20% using AI-assisted workflows, redesigned complex AI workflows into more trustworthy experiences, and evolved a WCAG-compliant design system that accelerated engineering handoffs.",
  },
  {
    keywords: ["flatlay", "los angeles"],
    reply:
      "At Flatlay, Pavel led end-to-end product design for a consumer app, from research through prototyping to delivery. He drove adoption to 5,000+ downloads while reducing bounce rate by 82%, and mentored junior designers along the way.",
  },
  {
    keywords: ["sonyliv", "sony"],
    reply:
      "At SonyLIV, Pavel contributed to a cross-platform design system supporting 350M+ users and $550K+ in revenue across web, TV, and mobile. He redesigned user experiences across platforms and increased engagement by 64%.",
  },
  {
    keywords: ["highradius", "fintech", "high radius"],
    reply:
      "At HighRadius, Pavel designed AI-powered fintech workflows that improved receivables recovery by 75%. He worked with enterprise users, finance stakeholders, and engineering to simplify complex financial processes, all while conducting user research and usability testing to validate improvements.",
  },
  {
    keywords: ["skills", "what can he do", "capabilities", "expertise", "specialise", "specialize"],
    reply:
      "Pavel's core skills span end-to-end product design: user research, interaction design, prototyping, design systems, accessibility (WCAG), and data-informed experimentation. On the strategic side: product discovery, stakeholder management, workshop facilitation, and cross-functional collaboration. Tools: Figma, FigJam, Protopie, Dovetail, and AI-assisted workflows with Claude Code and Cursor.",
  },
  {
    keywords: ["tools", "figma", "software", "uses"],
    reply:
      "Pavel's primary tools are Figma, FigJam, Protopie, and Dovetail. He also works with Claude Code and Cursor for AI-assisted design workflows, which means he can prototype and build faster than most designers. On the technical side: HTML, CSS, JavaScript, and React.",
  },
  {
    keywords: ["education", "degree", "university", "york", "study", "studied", "msc"],
    reply:
      "Pavel holds an MSc in Human-Computer Interaction from the University of York (UK), specialising in UX Design, User Research, Interaction Design, Accessibility, and Emerging Technologies. He also has a Bachelor of Technology in Computer Science (First Class Honours) from KIIT, India, which is why he's comfortable working directly with engineers.",
  },
  {
    keywords: ["mentor", "adplist", "mentoring", "community"],
    reply:
      "Pavel has mentored 27+ designers on ADPList, covering portfolio reviews, interview prep, UX career coaching, and product design guidance. He's also an active member of Design System London, engaging with the community around design systems, accessibility, and AI in design.",
  },
  {
    keywords: ["visa", "right to work", "work in uk", "uk"],
    reply:
      "Pavel is based in London and holds a Skilled Worker Visa (SOC 2134), so he has full right to work in the UK without sponsorship requirements on your end.",
  },
  {
    keywords: ["contact", "reach", "email", "get in touch", "talk"],
    reply:
      "The best way to reach Pavel is through the contact form on this portfolio, or directly at designsbypavel@gmail.com. He typically responds within 24 hours.",
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "agentic"],
    reply:
      "AI is Pavel's primary domain. At AWTG he's designing enterprise AI platforms, agent configuration, trust, and governance. His Kai case study on this portfolio shows how he tackled the AI capability vs. human control problem at scale. He also uses AI tools like Claude Code and Cursor in his own workflow, so he understands both the design and implementation side.",
  },
  {
    keywords: ["project", "case study", "work", "portfolio", "design"],
    reply:
      "Pavel's portfolio has five case studies: an enterprise AI agent platform (Kai at AWTG), a SonyLIV subscription redesign, a SonyLIV content discovery feature, a search experience redesign, and an autonomous fintech collections workflow. Each one documents the full PM-level thinking, not just screens, but the decisions, trade-offs, and outcomes.",
  },
  {
    keywords: ["strength", "best at", "good at", "differentiator", "unique", "stand out"],
    reply:
      "Pavel's differentiator is his PM-level thinking combined with strong craft. He doesn't just deliver screens, he shapes product decisions. With a Computer Science background, an MSc in HCI, and 8 years across AI and enterprise, he can hold a conversation with engineers, PMs, and stakeholders at the same time without losing the thread. That's rare.",
  },
  {
    keywords: ["salary", "rate", "compensation", "pay"],
    reply:
      "That's a conversation best had directly. Reach out via the contact form and Pavel will be happy to discuss.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    reply:
      "Good to meet you. I'm Jarvis, Pavel's AI assistant. You can ask me anything about his background, experience, skills, or availability. What would you like to know?",
  },
  {
    keywords: ["thanks", "thank you", "cheers", "appreciate"],
    reply: "Of course. Is there anything else I can help you with?",
  },
];

const fallback =
  "I don't have a specific answer for that, but you can reach Pavel directly at designsbypavel@gmail.com, he's the better source for anything I can't cover.";

export function getJarvisReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, reply } of responses) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return reply;
    }
  }
  return fallback;
}

export const suggestedQuestions = [
  "Who is Pavel?",
  "Is he available to hire?",
  "What has he worked on?",
  "What makes him different?",
  "What tools does he use?",
];
