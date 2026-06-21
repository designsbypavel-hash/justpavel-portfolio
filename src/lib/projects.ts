export type ImpactStat = {
  value: string;
  label: string;
};

export type Decision = {
  title: string;
  why: string;
  alternativesConsidered?: string[];
  whatChanged: string[];
  result: string;
};

export type Section = {
  heading: string;
  paragraphs: string[];
};

export type JourneyStep = {
  label: string;
  before: string;
  after: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  galleryImages: string[];
  role: string;
  platform: string;
  team: string;
  duration?: string;
  stats: ImpactStat[];
  tldrProblem: string;
  tldrWhatIDid: string;
  tldrImpact: string;
  context: Section[];
  journeySteps?: JourneyStep[];
  decisions: Decision[];
  closingSections: Section[];
};

export const projects: Project[] = [
  {
    slug: "agent-ai",
    title: "Designing the control layer for enterprise AI agents",
    description:
      "Kai is a no-code AI agent platform that enables businesses to create, train, and deploy AI assistants without technical expertise.",
    category: "B2B SaaS",
    tags: ["AI", "Enterprise", "Validation", "Governance"],
    image: "/site-assets/ai-control-layer.png",
    galleryImages: [
      "/site-assets/case-studies/agent-ai/img-01.png",
      "/site-assets/case-studies/agent-ai/img-02.png",
      "/site-assets/case-studies/agent-ai/img-03.png",
      "/site-assets/case-studies/agent-ai/img-04.png",
      "/site-assets/case-studies/agent-ai/img-05.png",
      "/site-assets/case-studies/agent-ai/img-06.png",
      "/site-assets/case-studies/agent-ai/img-07.png",
      "/site-assets/case-studies/agent-ai/img-08.png",
      "/site-assets/case-studies/agent-ai/img-09.png",
      "/site-assets/case-studies/agent-ai/img-10.png",
    ],
    role: "Lead Product Designer (End-to-end)",
    platform: "Enterprise B2B SaaS · AI Agent",
    team: "1 designer · 2 PMs · 3 engineers",
    stats: [
      { value: "22%", label: "AI containment uplift" },
      { value: "45s", label: "Average handle time" },
      { value: "250k+", label: "Monthly sessions" },
    ],
    tldrProblem:
      "Enterprise teams couldn't test Kai before going live. Every validation required engineering, a separate environment, or putting AI in front of customers and seeing what happened.",
    tldrWhatIDid:
      "Designed a persistent Playground embedded beside every config tab, so teams could change instructions, training data, or rules and immediately see the effect — no save cycle, no redeploy.",
    tldrImpact:
      "Buyers stopped asking 'can it do the job?' and started asking better questions, because they could find out for themselves. The Playground became the answer to 'what happens when it gets it wrong?'",
    context: [
      {
        heading: "The Opportunity",
        paragraphs: [
          "As AI adoption accelerated, many businesses wanted to leverage AI assistants to automate support, generate leads, and improve operational efficiency. However, existing solutions often required technical expertise, complex configuration, and engineering support.",
          "Through stakeholder discussions and discovery activities, we identified a common challenge: users understood the outcomes they wanted from AI but struggled to understand how to create, train, and deploy AI assistants effectively.",
          "The opportunity was not to build another AI platform — it was to make AI accessible, understandable, and actionable for non-technical users. The challenge became: how might we help businesses create and deploy AI assistants confidently without requiring technical expertise?",
        ],
      },
      {
        heading: "Research Finding",
        paragraphs: [
          "Capability was never the problem, but perceived risk was. \"What happens when Kai gets it wrong?\" was said in some form in every enterprise evaluation session — 8 of 8 interviews.",
          "I'd expected questions about accuracy benchmarks and resolution rates. Instead, every evaluation turned to failure. Not \"can Kai answer?\" but \"what happens when it gets it wrong, and who's accountable?\" They weren't worried Kai couldn't do the job — they were worried they'd find out it couldn't in front of a customer. Risk is a feeling before it's a fact.",
          "Before, the only fallback was engineering-gated: ops spots a gap, files a ticket, a developer makes the change, with limited validation — or worse, deploy and find out, escalating only if it goes wrong. For a contact-centre ops manager accountable for CSAT, that was not an option.",
          "3 of 4 active enterprise prospects had stalled at exactly this point. The AI worked. The product had no answer to \"can we test it before we go live?\"",
        ],
      },
      {
        heading: "Organisational Complexity",
        paragraphs: [
          "Five roles needed access to the same Playground for different reasons, with five different definitions of what \"trusted\" means. Designing it wasn't a UI problem — it was an organisational trust problem.",
        ],
      },
      {
        heading: "Key Findings",
        paragraphs: [
          "Research and stakeholder discussions revealed three recurring themes.",
          "Insight 1 — Users focused on business outcomes rather than AI terminology. Most participants understood what they wanted AI to accomplish but struggled with concepts such as models, prompts, knowledge bases, and agent configuration.",
          "Insight 2 — Trust mattered more than automation. Users were willing to spend more time setting up assistants if they felt confident about where information came from and how responses were generated.",
          "Insight 3 — Users wanted guidance rather than flexibility. While advanced configuration options were valuable, most participants preferred a structured workflow that reduced uncertainty and simplified decision-making.",
        ],
      },
      {
        heading: "Landscape",
        paragraphs: [
          "Every enterprise AI platform had the same gap. The category pattern was clear: enterprise AI tools treated testing as a separate, privileged activity — something bolted on for a demo, not something woven into daily configuration work.",
        ],
      },
    ],
    decisions: [
      {
        title: "Make the Playground available on every config tab, not just Instructions",
        why: "My first instinct was to scope the Playground to the Instructions tab. But training uploads, saved prompts, and completion criteria all affect Kai's responses. If the Playground isn't visible when those change, teams can't catch regressions there — they surface in production. AI Trainers needed immediate feedback when uploading knowledge documents; a bad upload only surfaced when a customer hit a wrong answer, days later.",
        alternativesConsidered: [
          "Instructions tab only — simpler to build, but misses training-quality checks entirely. A broken knowledge upload wouldn't be caught until a customer hit it.",
          "A show/hide toggle per tab — adds a click of friction at exactly the moment teams most need immediate feedback after making a change.",
        ],
        whatChanged: [
          "Playground persists across Details, Instructions, Training, and Prompts tabs",
          "Same conversation thread as you navigate — test a full flow, not just one isolated response",
          "Collapsed on smaller screens; always expanded on desktop where config work happens",
        ],
        result:
          "AI Trainers tested knowledge quality. Ops tested escalation logic. Both in the same session without context switching. Training regressions were discovered at the point of change instead of after customer-facing impact.",
      },
      {
        title: "Build a role-based permission model around the Playground itself",
        why: "The Playground itself required a permission model. IT Admins needed control over who could run tests and who could push changes live.",
        whatChanged: [
          "Roles defined directly from research were implemented: Super Admin, Admin, Operator, Trainer, Viewer",
          "Access Management governs who can configure, test, and deploy",
        ],
        result:
          "Testing became testable the moment a change was made, not after it was deployed — with the right people able to do the right things.",
      },
    ],
    closingSections: [
      {
        heading: "How the Playground Works Across Tabs",
        paragraphs: [
          "Agent Config — model settings, language, style, and behaviour controls. Every dimension of the assistant's behaviour, from tone to escalation triggers, is immediately testable with no save cycle required.",
          "Instructions — the most-used tab. Ops teams write the system prompt here and the Playground immediately shows the response. Change a word, see the effect — no save cycle, no redeploy.",
          "Training — knowledge uploads, source files, token limits. The Playground here is critical: a bad knowledge upload only shows up when a customer hits it. AI Trainers now upload a document and immediately test the most common failure scenarios before it goes live.",
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "Changed the buyer question, then the production numbers. The Playground's first measurable impact wasn't in the metrics — it was in the sales conversation, removing the single biggest blocker to enterprise deals closing.",
          "22% AI containment uplift, 45 second average handle time, and 250k+ monthly sessions followed once teams could validate confidently before go-live.",
        ],
      },
      {
        heading: "What's Next",
        paragraphs: [
          "Automatic regression testing on config changes: right now testing is manual. After every training upload or instruction change, the saved scenario set should run automatically, flagging anything that changed before an ops manager even opens the Playground.",
          "Shareable session links: currently one person tests and reports back. The AI Trainer who knows the edge cases and the Ops Manager who owns the KPIs need to review together — a shareable session link would make pre-launch sign-off collaborative without a screen-share meeting.",
          "A shared failure-pattern library: teams build their own scenario sets in isolation, but failure patterns repeat across enterprise accounts. A shared library built from anonymised cross-account failures would give every new account a head start on what to test for.",
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "Designing Kai taught me that successful AI experiences are not defined by the sophistication of the technology, but by how confidently the people responsible for it can answer the question: what happens when it gets it wrong?",
        ],
      },
    ],
  },
  {
    slug: "sonyliv-check",
    title: "High-Conversion Checkout Experience",
    description:
      "SonyLIV's checkout needed to support India's diverse payment habits, without sacrificing speed or trust.",
    category: "B2C Mobile",
    tags: ["Payments", "Checkout", "Conversion Optimization"],
    image: "/site-assets/sonyliv-checkout.jpg",
    galleryImages: [
      "/site-assets/case-studies/sonyliv-check/img-01.png",
      "/site-assets/case-studies/sonyliv-check/img-02.png",
      "/site-assets/case-studies/sonyliv-check/img-03.png",
      "/site-assets/case-studies/sonyliv-check/img-04.png",
      "/site-assets/case-studies/sonyliv-check/img-05.png",
      "/site-assets/case-studies/sonyliv-check/img-06.png",
      "/site-assets/case-studies/sonyliv-check/img-07.png",
    ],
    role: "Product Designer (End-to-end)",
    platform: "Mobile",
    team: "PM, PO, 3 Engineers",
    duration: "2 months",
    stats: [
      { value: "+28%", label: "UPI adoption" },
      { value: "-14%", label: "Failed payments" },
      { value: "-21%", label: "Time to complete" },
    ],
    tldrProblem:
      "Checkout had too many competing options and trust gaps, leading to hesitation and failed payments at the most conversion-critical moment.",
    tldrWhatIDid:
      "I simplified decision-making, prioritised high-success payment paths, and redesigned failure/retry states so users always knew what to do next.",
    tldrImpact:
      "+28% UPI adoption, -14% failed payments, -21% time to complete checkout.",
    context: [
      {
        heading: "Context",
        paragraphs: [
          "SonyLIV supports a wide range of payment methods — UPI, cards, wallets, netbanking, and partner offers — because users in India pay in very different ways. But when everything looks equal, users slow down. Payment is a moment where confidence matters more than exploration.",
        ],
      },
    ],
    journeySteps: [
      {
        label: "Payment method selection",
        before: "All payment methods shown with equal visual weight, no guidance on which to pick.",
        after: "UPI surfaced first and recommended; long-tail options available but not competing for attention.",
      },
      {
        label: "Offers",
        before: "Unclear whether an offer applied, or what it actually changed about the price.",
        after: "Clear \"applied\" state, eligibility explained in plain language, total cost always visible.",
      },
      {
        label: "Payment failure",
        before: "A failed payment was a dead end — no clear next step, users abandoned.",
        after: "Calm failure messaging, a clear retry path, and a fallback to another method without restarting.",
      },
    ],
    decisions: [
      {
        title: "Lead with UPI, without forcing it",
        why: "UPI is familiar and fast for many users, and it has high adoption potential. If we make it the smoothest path, users complete faster without feeling pushed.",
        whatChanged: [
          "UPI surfaced more clearly in the hierarchy",
          "Shortened the path from selection → payment initiation",
          "Reduced competing noise around it",
        ],
        result: "UPI adoption increased by 28%. We prioritised UPI visually and structurally to reduce decision time.",
      },
      {
        title: "Reduce choice overload with clearer hierarchy",
        why: "When everything looks equal, users slow down. Payment is a moment where confidence matters more than exploration.",
        whatChanged: [
          "Grouped payment methods logically",
          "\"Recommended / most used\" sits first",
          "Long-tail options remain available but not dominant",
        ],
        result: "Checkout time reduced by 21%. Hierarchy reduces thinking — users move forward with confidence.",
      },
      {
        title: "Make offers feel effortless, not risky",
        why: "Offers can improve conversion, but unclear offers create mistrust: users hesitate if they don't understand whether it applied or what changed.",
        whatChanged: [
          "Clear \"applied\" state",
          "Eligibility explained in plain language",
          "Total cost always visible and consistent",
        ],
        result: "Higher confidence and fewer drop-offs during offer selection — offer clarity builds trust, users don't feel surprised at the last step.",
      },
      {
        title: "Design for failure recovery, because payments fail",
        why: "A failed payment is emotionally charged. If the next step isn't obvious, users abandon.",
        whatChanged: [
          "Calm failure messaging",
          "Clear retry path",
          "Smart fallbacks — choose another method without restarting everything",
        ],
        result: "Failed payments reduced by 14%. Recovery is part of the product — we designed it to feel safe and guided.",
      },
    ],
    closingSections: [
      {
        heading: "What I Learned",
        paragraphs: [
          "To ground these decisions, I combined three inputs: heuristic evaluation to spot friction patterns, benchmarking against Prime Video, Hotstar, PhonePe, and Paytm, and payment UX research specific to Indian users' habits and trust signals.",
        ],
      },
    ],
  },
  {
    slug: "fintech-autonomous",
    title: "Designing for Faster Collections in Autonomous Collections with AI",
    description:
      "Redesigned the core collections workflow so AR analysts could act faster, combining AI insights, in-app calling, automated summaries, and a structured follow-up system.",
    category: "B2B SaaS",
    tags: ["AI", "Fintech", "Collections", "Workflow"],
    image: "/site-assets/ai-fintech-collections.jpg",
    galleryImages: [
      "/site-assets/case-studies/fintech-autonomous/img-01.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-02.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-03.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-04.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-05.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-06.jpg",
      "/site-assets/case-studies/fintech-autonomous/img-07.jpg",
    ],
    role: "Product Designer (End-to-end)",
    platform: "Fintech & AI, B2B SaaS",
    team: "1 designer, 2 PMs, 4 engineers (2 FE, 2 BE)",
    stats: [
      { value: "40%", label: "Fewer missed follow-ups" },
      { value: "15%", label: "Less manual effort" },
      { value: "13%", label: "Faster DSO" },
    ],
    tldrProblem:
      "AR analysts manage hundreds of accounts per cycle, but the workflow was fragmented across tools, leading to manual work, errors, and missed follow-ups that impacted DSO.",
    tldrWhatIDid:
      "Redesigned the end-to-end collections workflow by integrating AI-assisted insights, in-app calling, automated summaries, and a post-call follow-up system.",
    tldrImpact: "Fewer missed follow-ups, less manual effort, faster DSO.",
    context: [
      {
        heading: "Discovery",
        paragraphs: [
          "Outcomes need structure — if they aren't captured in a consistent format, they get lost. An empathy map built from the discoveries showed analysts switching between tools constantly, losing context between prep, the call itself, and the follow-up.",
        ],
      },
    ],
    decisions: [
      {
        title: "Unify the workflow in one place",
        why: "Fragmentation created context switching and missed follow-ups.",
        whatChanged: ["Core dashboard now supports prep → call → log → next steps in one continuous flow"],
        result: "Reduced manual effort and friction, both qualitatively and in time spent per account.",
      },
      {
        title: "Bring calling inside the product",
        why: "Calls are central, but the work after calls was the real bottleneck.",
        whatChanged: ["In-app calling with call context visible during the interaction"],
        result: "Analysts no longer lost context switching between a separate dialer and the workflow tool.",
      },
      {
        title: "Automate summaries to remove admin work",
        why: "Notes and summaries were repetitive and inconsistent across analysts.",
        whatChanged: ["Automated call summaries that analysts can review and edit quickly"],
        result: "Consistent, structured call records without the manual write-up.",
      },
      {
        title: "Make follow-ups structured",
        why: "Missed follow-ups directly impacted DSO, and ad-hoc reminders weren't reliable.",
        whatChanged: ["A structured post-call follow-up system tied to the worklist"],
        result: "Fewer missed follow-ups and faster days-sales-outstanding across the collections operation.",
      },
    ],
    closingSections: [
      {
        heading: "Reflection",
        paragraphs: [
          "The real cost of this workflow wasn't any single broken step — it was the constant context-switching between tools that made every account take longer than it should have. Unifying prep, calling, and follow-up into one continuous flow mattered more than any individual feature inside it.",
        ],
      },
    ],
  },
  {
    slug: "sonyliv-ott-subscription",
    title: "Redefining SonyLIV's Android TV Subscription Flow",
    description:
      "SonyLIV was growing fast, but subscription conversions weren't scaling at the same pace. Redesigned the plan selection → payment journey to reduce confusion and increase purchase confidence.",
    category: "B2C Mobile",
    tags: ["Subscriptions", "Conversion", "UX"],
    image: "/site-assets/sonyliv-subscription.jpg",
    galleryImages: [
      "/site-assets/case-studies/sonyliv-ott-subscription/img-01.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-02.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-03.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-04.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-05.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-06.jpg",
      "/site-assets/case-studies/sonyliv-ott-subscription/img-07.jpg",
    ],
    role: "Product Designer (End-to-end)",
    platform: "OTT, B2C",
    team: "1 Product Designer · 1 PM · 3 Engineers",
    stats: [],
    tldrProblem:
      "Users were dropping because plan selection felt unclear and pricing differentiation wasn't obvious.",
    tldrWhatIDid:
      "Built clearer plan comparisons, added pricing/upsell clarity, and streamlined selection → checkout.",
    tldrImpact: "More subscriptions, fewer drop-offs, faster decisions, higher engagement with plan selection.",
    context: [
      {
        heading: "Context",
        paragraphs: [
          "SonyLIV's Android TV subscription flow asked users to compare plans with unclear feature differentiation and pricing that wasn't easy to compare at a glance — on a 10-foot interface where every extra decision costs more attention than on mobile.",
        ],
      },
    ],
    decisions: [
      {
        title: "Build clearer plan comparison",
        why: "Pricing differentiation wasn't obvious, so users couldn't tell what they'd actually be paying for.",
        whatChanged: ["Side-by-side plan comparison with feature checklists", "Clear pricing per duration option"],
        result: "Faster, more confident plan decisions.",
      },
      {
        title: "Streamline selection straight through to checkout",
        why: "Extra steps between choosing a plan and completing payment increased drop-off on a remote-control interface.",
        whatChanged: ["Reduced steps from plan selection to payment confirmation"],
        result: "Fewer checkout drop-offs and more completed, paid subscriptions.",
      },
    ],
    closingSections: [
      {
        heading: "Reflection",
        paragraphs: [
          "Designing for a 10-foot, remote-control interface changes what \"simple\" means — every extra decision point costs more attention than it would on mobile, so clarity in plan comparison mattered more here than it would have in a touch-first flow.",
        ],
      },
    ],
  },
  {
    slug: "sonyliv-search",
    title: "Enhancing Search for Seamless Discovery for 350M+ SonyLIV Users",
    description:
      "Search is the gateway to discovering Originals, Live Sports, Movies, and TV Shows for 350M+ users. The legacy search experience created friction finding relevant results.",
    category: "B2C Mobile",
    tags: ["Search", "Discovery", "Streaming"],
    image: "/site-assets/sonyliv-search.jpg",
    galleryImages: [
      "/site-assets/case-studies/sonyliv-search/img-01.jpg",
      "/site-assets/case-studies/sonyliv-search/img-02.jpg",
      "/site-assets/case-studies/sonyliv-search/img-03.jpg",
      "/site-assets/case-studies/sonyliv-search/img-04.jpg",
      "/site-assets/case-studies/sonyliv-search/img-05.jpg",
      "/site-assets/case-studies/sonyliv-search/img-06.jpg",
      "/site-assets/case-studies/sonyliv-search/img-07.jpg",
      "/site-assets/case-studies/sonyliv-search/img-08.jpg",
      "/site-assets/case-studies/sonyliv-search/img-09.jpg",
      "/site-assets/case-studies/sonyliv-search/img-10.jpg",
      "/site-assets/case-studies/sonyliv-search/img-11.jpg",
    ],
    role: "Product Designer (End-to-end)",
    platform: "OTT, B2C Mobile",
    team: "1 Designer, 1 PM, 1 PO, 3 Engineers",
    stats: [],
    tldrProblem:
      "Legacy search made it hard to surface relevant results, refine queries, and navigate content at scale.",
    tldrWhatIDid:
      "Redesigned the experience using failure patterns, user complaints, and global benchmarking — then validated changes through prototypes and quick feedback loops.",
    tldrImpact:
      "Faster, clearer, more intelligent search that scales across Android, iOS, tablets, and low-end devices.",
    context: [
      {
        heading: "Context",
        paragraphs: [
          "SonyLIV serves 350M+ users, and search is the gateway to discovering Originals, Live Sports, Movies, and TV Shows. The legacy experience created friction: people struggled to find relevant results, refine queries, and navigate a massive library.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "I grounded the redesign in failure patterns pulled from analytics, real user complaints, and benchmarking against global streaming search experiences, then validated each change through prototypes and quick feedback loops rather than a single big-bang release.",
        ],
      },
    ],
    decisions: [
      {
        title: "Design for scale across device tiers",
        why: "A search experience that only works well on flagship phones excludes a large share of SonyLIV's actual user base on low-end Android devices and tablets.",
        whatChanged: ["Layouts and interactions validated across Android, iOS, tablets, and low-end devices"],
        result: "Consistent search experience regardless of device tier.",
      },
    ],
    closingSections: [
      {
        heading: "Reflection",
        paragraphs: [
          "At 350M+ users, the long tail of devices matters as much as the flagship experience — a search redesign that only works well on the newest phones quietly excludes a meaningful share of the people who actually rely on it.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
