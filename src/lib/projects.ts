export type ImpactStat = {
  value: string;
  label: string;
};

export type Decision = {
  title: string;
  phase?: string;
  image?: string;
  why: string;
  alternativesConsidered?: string[];
  whatChanged: string[];
  result: string;
  tradeOff?: string;
  businessReasoning?: string;
};

export type ImpactCategory = {
  category: string;
  points: string[];
};

export type Hypothesis = {
  weBelieved: string;
  ifWe: string;
  then: string;
  because: string;
  risks: string[];
};

export type Section = {
  heading: string;
  paragraphs: string[];
  image?: string;
};

export type JourneyStep = {
  label: string;
  before: string;
  after: string;
};

export type TeamGroup = {
  function: string;
  members: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  galleryImages: string[];
  prototypeVideo?: string;
  role: string;
  platform: string;
  team: string;
  teamBreakdown?: TeamGroup[];
  duration?: string;
  keyInsight?: { title: string; description: string; image?: string };
  opportunity?: string;
  hypothesis?: Hypothesis;
  designPrinciples?: string[];
  designPrinciplesImage?: string;
  businessImpactImage?: string;
  teamsHelped?: TeamGroup[];
  automationScope?: string[];
  escalationTriggers?: string[];
  rejectedConcepts?: string[];
  constraints?: string[];
  successMetrics?: ImpactCategory[];
  stats: ImpactStat[];
  tldrProblem: string;
  tldrWhatIDid: string;
  tldrImpact: string;
  context: Section[];
  journeySteps?: JourneyStep[];
  decisions: Decision[];
  businessImpact?: ImpactCategory[];
  closingSections: Section[];
};

export const projects: Project[] = [
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
    prototypeVideo: "/site-assets/case-studies/sonyliv-check/prototype.mp4",
    role: "Product Designer (End-to-end)",
    platform: "Mobile",
    team: "PM, PO, 3 Engineers",
    teamBreakdown: [
      { function: "Design", members: "1 Designer (me, end-to-end)" },
      { function: "Product", members: "1 PM, 1 PO" },
      { function: "Engineering", members: "3 Engineers" },
    ],
    duration: "2 months",
    keyInsight: {
      title: "Lead with UPI, without forcing it",
      description:
        "The single highest-leverage move in this redesign: surface UPI as the smoothest, most visually prominent path while keeping every other method available. Confidence beats choice at the payment moment, so the entire redesign builds outward from this one decision.",
    },
    opportunity:
      "The real opportunity wasn't a visual refresh, it was converting a five-way evaluation into a one-way default with an escape hatch. That reframe mattered because it's a hierarchy problem, not a visual-design problem: fixable without backend changes, ownable end-to-end by design, and shippable inside a 2-month window, which is what made it the highest-leverage fix available on checkout at the time.",
    designPrinciples: [
      "Default, don't decide for them: surface the highest-success path first, never remove alternatives.",
      "Hierarchy is the de-risking tool: when every option looks equal, the user carries the cognitive cost.",
      "Verify before you claim: any offer or discount must be confirmable on-screen, not just asserted.",
      "Design for the failure path as a first-class state, not an edge case.",
      "Solve confusion with order and emphasis before reaching for new UI surface.",
    ],
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
          "Picture someone who's just decided to go Premium on SonyLIV. They tap subscribe, and the payment screen opens: UPI, cards, wallets, netbanking, and partner offers, all lined up with equal visual weight, as if every option mattered equally to them. They pause.",
          "That pause is the whole problem. SonyLIV supports a wide range of payment methods because users in India pay in very different ways, but when everything looks equal, users slow down. And this is the one screen in the entire product where confidence matters more than choice, because hesitation here doesn't just cost time, it costs the subscription.",
        ],
      },
      {
        heading: "Research & Approach",
        paragraphs: [
          "Before changing a single pixel, I needed to know why that pause was happening. I ran a heuristic evaluation to map exactly where the friction sat, benchmarked the flow against Prime Video, Hotstar, PhonePe, and Paytm to see how others handled the same moment, and pulled in payment UX research specific to how Indian users actually build (or lose) trust on a checkout screen.",
          "The picture that came back wasn't about complexity. Users weren't confused, they were stalled, standing in front of too many doors that all looked the same.",
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
        before: "A failed payment was a dead end with no clear next step, so users abandoned.",
        after: "Calm failure messaging, a clear retry path, and a fallback to another method without restarting.",
      },
    ],
    decisions: [
      {
        title: "Lead with UPI, without forcing it",
        phase: "Phase 1: Simplify Decision-Making",
        why: "The research kept pointing to the same answer: UPI was already the payment method most users reached for instinctively, fast, familiar, no card details to dig up. The story I wanted the screen to tell was \"this is the easy way,\" not \"this is the only way,\" so I made UPI the obvious first move without ever closing the door to anything else.",
        whatChanged: [
          "UPI surfaced more clearly in the hierarchy",
          "Shortened the path from selection → payment initiation",
          "Reduced competing noise around it",
        ],
        result: "UPI adoption increased by 28%. We prioritised UPI visually and structurally to reduce decision time.",
        tradeOff: "Risk of reading as the platform pushing one method, potentially alienating users who default to cards or wallets.",
        businessReasoning: "Faster, higher-success payments reduce both checkout drop-off and downstream payment-processing failure cost.",
      },
      {
        title: "Reduce choice overload with clearer hierarchy",
        phase: "Phase 1: Simplify Decision-Making",
        why: "Even with UPI in the lead position, the rest of the screen was still asking users to evaluate five payment families at once before they could act. That's the moment confidence actually drains out of a checkout flow, not card numbers or OTPs, but standing in front of too many equal-looking doors.",
        whatChanged: [
          "Grouped payment methods logically",
          "\"Recommended / most used\" sits first",
          "Long-tail options remain available but not dominant",
        ],
        result: "Checkout time reduced by 21%. Hierarchy reduces thinking, so users move forward with confidence.",
        tradeOff: "Less-common methods (netbanking, PayPal) become one extra tap further away from the default view.",
        businessReasoning: "Confidence, not information density, was the bottleneck, so removing decisions had more leverage than adding clarity to existing ones.",
      },
      {
        title: "Make offers feel effortless, not risky",
        phase: "Phase 2: Build Trust at the Payment Moment",
        why: "Offers were supposed to build trust, but they were doing the opposite. A user could see a discount mentioned somewhere on screen with no way to confirm it had actually been applied to their total. An offer you can't verify isn't a perk, it's a reason to hesitate right before paying.",
        whatChanged: [
          "Clear \"applied\" state",
          "Eligibility explained in plain language",
          "Total cost always visible and consistent",
        ],
        result: "Higher confidence and fewer drop-offs during offer selection: offer clarity builds trust, so users don't feel surprised at the last step.",
        tradeOff: "More on-screen state to design and QA for every offer/eligibility permutation.",
        businessReasoning: "An unverifiable discount is a reputational risk, not just a UX gap: it reads as deceptive even when the underlying logic is correct.",
      },
      {
        title: "Design for failure recovery, because payments fail",
        phase: "Phase 3: Design for Recovery",
        why: "Payments fail. That's not a hypothetical, it's a guarantee at scale. The real test of a checkout flow isn't how it behaves when everything works, it's what happens in the half-second after a payment bounces, when a user is deciding whether to retry or just walk away.",
        whatChanged: [
          "Calm failure messaging",
          "Clear retry path",
          "Smart fallbacks: choose another method without restarting everything",
        ],
        result: "Failed payments reduced by 14%. Recovery is part of the product, designed to feel safe and guided.",
        tradeOff: "More design and engineering surface area spent on a state that's easy to deprioritize because it isn't the happy path.",
        businessReasoning: "Recovery design is retention design: a user who fails once and finds no clear next step doesn't just abandon this transaction, they reconsider the subscription itself.",
      },
    ],
    businessImpact: [
      {
        category: "Business impact",
        points: [
          "+28% UPI adoption shifted volume toward a faster, lower-friction payment rail.",
          "-14% failed payments recovered transactions that would otherwise have been lost revenue.",
        ],
      },
      {
        category: "User impact",
        points: [
          "-21% time to complete checkout reduced cognitive load at the highest-stakes screen in the product.",
        ],
      },
      {
        category: "Operational impact (expected outcome)",
        points: [
          "Fewer failed-payment support escalations, as a direct consequence of clearer retry and fallback paths.",
        ],
      },
      {
        category: "Long-term product impact",
        points: [
          "The default-plus-hierarchy pattern is reusable anywhere SonyLIV adds a new payment method or offer type, without re-litigating the layout each time.",
        ],
      },
    ],
    closingSections: [
      {
        heading: "Reflection",
        paragraphs: [
          "Looking back, the biggest unlock wasn't any single screen, it was realizing that checkout isn't a form, it's a decision made under mild stress. Every extra option, every unclear state, every dead end after a failure adds friction to that decision.",
          "Strip those away, and the numbers, more UPI adoption, fewer failed payments, faster completion, follow almost on their own. Payment is the one screen where users have the least patience for ambiguity and the most at stake if something goes wrong.",
          "What surprised me most: the fix with the single highest measured impact, leading with UPI, was also the simplest to ship. That's a good signal in hindsight: it confirmed the bottleneck was decision architecture, not a lack of features.",
        ],
      },
    ],
  },
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
    teamBreakdown: [
      { function: "Design", members: "1 Designer (me, end-to-end)" },
      { function: "Product", members: "2 PMs" },
      { function: "Engineering", members: "3 Engineers" },
    ],
    keyInsight: {
      title: "Capability was never the problem, risk was",
      image: "/site-assets/case-studies/agent-ai/img-01.png",
      description:
        "Every enterprise evaluation turned to the same question, in some form, in 8 of 8 interviews: what happens when Kai gets it wrong, and who's accountable? Teams weren't worried Kai couldn't do the job. They were worried they'd find out it couldn't in front of a customer.",
    },
    opportunity:
      "The opportunity wasn't another AI capability, it was removing the validation gap that had stalled 3 of 4 active enterprise prospects at the exact same point. Every competing AI platform treated testing as a separate, privileged activity bolted on for a demo, not something woven into daily configuration work, which made a persistent, no-redeploy Playground the highest-leverage fix available: it unblocked deals already in late-stage pipeline rather than competing for attention with platform-wide features.",
    hypothesis: {
      weBelieved:
        "Enterprise buyers were stalling on AI agent adoption not because of capability gaps, but because of unvalidated risk: they couldn't answer 'what happens when it gets it wrong' before going live.",
      ifWe:
        "we gave config teams a persistent, no-redeploy testing surface embedded in every configuration tab,",
      then:
        "deal velocity and trainer confidence would increase,",
      because:
        "risk would become something teams could observe and resolve themselves rather than discover in production.",
      risks: [
        "Teams might still not trust self-tested results without third-party sign-off.",
        "A testing surface available everywhere could become noise if not scoped to where regressions actually originate.",
      ],
    },
    designPrinciples: [
      "Trust over automation speed: users will trade setup time for confidence in where a response came from.",
      "Test at the point of change, not after deployment: regressions caught in the Playground, not in front of a customer.",
      "No save cycle, no redeploy: friction at the moment of testing kills the behaviour you're trying to encourage.",
      "Access is a trust model, not a feature toggle: five roles needed five different reasons to be in the same space safely.",
      "Outcome-first language over AI terminology: meet users where their mental model already is.",
      "Make risk observable, not theoretical: 'what happens when it's wrong' needs a real, safe place to find out.",
    ],
    designPrinciplesImage: "/site-assets/case-studies/agent-ai/img-05.png",
    teamsHelped: [
      { function: "Customer Support", members: "Reduced repetitive workload from password resets, order status, and FAQ-style queries." },
      { function: "Sales", members: "Received qualified leads routed directly into the CRM instead of lost in a chatbot dead end." },
      { function: "Marketing", members: "Gained visibility into customer intent and the questions people actually ask." },
      { function: "Customer Success", members: "Could see sentiment and interaction patterns instead of relying on anecdote." },
      { function: "Operations", members: "Got a self-serve way to update assistant behaviour without filing an engineering ticket." },
      { function: "Product & BI teams", members: "Used real conversation data to see customer pain points and report on adoption." },
    ],
    automationScope: [
      "FAQ responses",
      "Lead qualification",
      "Customer triage",
      "Appointment booking",
      "Information retrieval",
      "CRM updates",
      "Knowledge base search",
      "Support ticket creation",
      "Customer routing",
      "Basic troubleshooting",
      "Customer onboarding",
    ],
    escalationTriggers: [
      "Customer sentiment turns negative or frustrated.",
      "AI confidence in its own response falls below a defined threshold.",
      "A customer explicitly asks for a human.",
      "Sensitive account actions require verification.",
      "The query is complex, regulated, or requires business judgement.",
      "Multiple attempts have already failed, or a sales opportunity needs a human rep.",
    ],
    rejectedConcepts: [
      "Rule-based decision-tree chatbots: too rigid for real conversations.",
      "Static FAQ pages: low engagement, users still couldn't find the right answer.",
      "Keyword-only search: low accuracy against natural-language questions.",
      "Large menu-driven navigation: high cognitive load before reaching an answer.",
      "Manual support-only workflows: not scalable past a small support team.",
    ],
    constraints: [
      "Accuracy and hallucination prevention came before response creativity.",
      "Data privacy, security, and auditability were non-negotiable for enterprise buyers.",
      "Had to integrate with existing CRM and channel systems (Salesforce, HubSpot, WhatsApp, Email), not replace them.",
      "Had to stay no-code configurable for business users, not just engineers.",
      "LLM usage cost had to scale sustainably across many customer accounts, not just one pilot.",
    ],
    stats: [
      { value: "22%", label: "AI containment uplift" },
      { value: "45s", label: "Average handle time" },
      { value: "250k+", label: "Monthly sessions" },
    ],
    tldrProblem:
      "Enterprise teams couldn't test Kai before going live. Every validation required engineering, a separate environment, or putting AI in front of customers and seeing what happened.",
    tldrWhatIDid:
      "Designed a persistent Playground embedded beside every config tab, so teams could change instructions, training data, or rules and immediately see the effect, with no save cycle and no redeploy.",
    tldrImpact:
      "Buyers stopped asking 'can it do the job?' and started asking better questions, because they could find out for themselves. The Playground became the answer to 'what happens when it gets it wrong?'",
    context: [
      {
        heading: "Why We Built Kai",
        paragraphs: [
          "Kai is a no-code, agentic AI customer service platform that lets organisations deploy AI assistants without engineering effort: automating support, generating qualified leads, resolving common queries, integrating with existing systems (Salesforce, HubSpot, WhatsApp, Email), and escalating complex cases to a human. The goal was to improve customer experience while reducing operational cost.",
          "Traditional chatbots relied on rigid decision trees and FAQs, so customers struggled to find accurate answers quickly, support teams burned time on repetitive questions, and chatbots couldn't qualify or route leads intelligently. Businesses also had no visibility into customer intent or sentiment, and updating chatbot content always required a technical team, which slowed the business down. Kai's answer was to let business users configure the assistant themselves while the platform handled triage, lead qualification, analytics, and omnichannel engagement.",
        ],
      },
      {
        heading: "The Opportunity",
        image: "/site-assets/case-studies/agent-ai/img-06.png",
        paragraphs: [
          "As AI adoption accelerated, many businesses wanted to leverage AI assistants to automate support, generate leads, and improve operational efficiency. However, existing solutions often required technical expertise, complex configuration, and engineering support.",
          "Through stakeholder discussions and discovery activities, we identified a common challenge: users understood the outcomes they wanted from AI but struggled to understand how to create, train, and deploy AI assistants effectively.",
          "The opportunity was not to build another AI platform. It was to make AI accessible, understandable, and actionable for non-technical users. The challenge became: how might we help businesses create and deploy AI assistants confidently without requiring technical expertise?",
        ],
      },
      {
        heading: "Research Finding",
        paragraphs: [
          "Capability was never the problem, but perceived risk was. \"What happens when Kai gets it wrong?\" was said in some form in every enterprise evaluation session: 8 of 8 interviews.",
          "I'd expected questions about accuracy benchmarks and resolution rates. Instead, every evaluation turned to failure. Not \"can Kai answer?\" but \"what happens when it gets it wrong, and who's accountable?\" They weren't worried Kai couldn't do the job; they were worried they'd find out it couldn't in front of a customer. Risk is a feeling before it's a fact.",
          "Before, the only fallback was engineering-gated: ops spots a gap, files a ticket, a developer makes the change, with limited validation, or worse, deploy and find out, escalating only if it goes wrong. For a contact-centre ops manager accountable for CSAT, that was not an option.",
          "3 of 4 active enterprise prospects had stalled at exactly this point. The AI worked. The product had no answer to \"can we test it before we go live?\"",
        ],
      },
      {
        heading: "Organisational Complexity",
        image: "/site-assets/case-studies/agent-ai/img-02.png",
        paragraphs: [
          "Five roles needed access to the same Playground for different reasons, with five different definitions of what \"trusted\" means. Designing it wasn't a UI problem. It was an organisational trust problem.",
        ],
      },
      {
        heading: "Key Findings",
        paragraphs: [
          "Research and stakeholder discussions revealed three recurring themes.",
          "Insight 1: Users focused on business outcomes rather than AI terminology. Most participants understood what they wanted AI to accomplish but struggled with concepts such as models, prompts, knowledge bases, and agent configuration.",
          "Insight 2: Trust mattered more than automation. Users were willing to spend more time setting up assistants if they felt confident about where information came from and how responses were generated.",
          "Insight 3: Users wanted guidance rather than flexibility. While advanced configuration options were valuable, most participants preferred a structured workflow that reduced uncertainty and simplified decision-making.",
        ],
      },
      {
        heading: "Landscape",
        image: "/site-assets/case-studies/agent-ai/img-03.png",
        paragraphs: [
          "Every enterprise AI platform had the same gap. The category pattern was clear: enterprise AI tools treated testing as a separate, privileged activity, something bolted on for a demo, not something woven into daily configuration work.",
        ],
      },
    ],
    decisions: [
      {
        title: "Make the Playground available on every config tab, not just Instructions",
        image: "/site-assets/case-studies/agent-ai/img-04.png",
        why: "My first instinct was to scope the Playground to the Instructions tab. But training uploads, saved prompts, and completion criteria all affect Kai's responses. If the Playground isn't visible when those change, teams can't catch regressions there; they surface in production. AI Trainers needed immediate feedback when uploading knowledge documents; a bad upload only surfaced when a customer hit a wrong answer, days later.",
        alternativesConsidered: [
          "Instructions tab only: simpler to build, but misses training-quality checks entirely. A broken knowledge upload wouldn't be caught until a customer hit it.",
          "A show/hide toggle per tab: adds a click of friction at exactly the moment teams most need immediate feedback after making a change.",
        ],
        whatChanged: [
          "Playground persists across Details, Instructions, Training, and Prompts tabs",
          "Same conversation thread as you navigate, so you test a full flow rather than one isolated response",
          "Collapsed on smaller screens; always expanded on desktop where config work happens",
        ],
        result:
          "AI Trainers tested knowledge quality. Ops tested escalation logic. Both in the same session without context switching. Training regressions were discovered at the point of change instead of after customer-facing impact.",
        tradeOff:
          "More engineering surface to keep one conversation thread persistent and in sync across four separate config tabs.",
        businessReasoning:
          "A bad knowledge upload only surfaces when a customer hits it. The cost of missing this regression was customer-facing, not internal, so the build cost was justified by the downside it prevented.",
      },
      {
        title: "Build a role-based permission model around the Playground itself",
        image: "/site-assets/case-studies/agent-ai/img-09.png",
        why: "The Playground itself required a permission model. IT Admins needed control over who could run tests and who could push changes live.",
        whatChanged: [
          "Roles defined directly from research were implemented: Super Admin, Admin, Operator, Trainer, Viewer",
          "Access Management governs who can configure, test, and deploy",
        ],
        result:
          "Testing became testable the moment a change was made, not after it was deployed, with the right people able to do the right things.",
        tradeOff:
          "Added a permission layer to a feature meant to remove friction, which risked reintroducing gatekeeping if scoped wrong.",
        businessReasoning:
          "Roles were defined directly from the five roles already named in evaluation sessions, not invented, so the permission model mapped to how teams actually worked rather than an abstract default that would need rework later.",
      },
    ],
    businessImpact: [
      {
        category: "Business impact",
        points: [
          "Unblocked enterprise deals stalled at the validation question, 3 of 4 active prospects at the time were stuck at exactly this point.",
          "22% AI containment uplift post-launch, once teams could validate before go-live.",
        ],
      },
      {
        category: "Customer impact",
        points: [
          "45s average handle time.",
          "Trainers and Ops could test changes without filing an engineering ticket.",
        ],
      },
      {
        category: "Operational impact",
        points: [
          "Regression discovery moved from post-incident (customer hits a wrong answer) to point-of-change (caught in the Playground before going live).",
        ],
      },
      {
        category: "Product impact",
        points: [
          "250k+ monthly sessions through the Playground itself, making it a genuinely used product surface rather than a checkbox feature.",
        ],
      },
    ],
    businessImpactImage: "/site-assets/case-studies/agent-ai/img-10.png",
    successMetrics: [
      {
        category: "Tracked from launch",
        points: [
          "Support ticket reduction",
          "First response time",
          "Successful query resolution rate",
          "Customer Satisfaction (CSAT)",
          "AI adoption rate",
          "Human escalation rate",
          "Lead generation and lead conversion",
          "Customer engagement and sentiment analysis",
        ],
      },
      {
        category: "Defined but dependent on CRM integration",
        points: [
          "CRM conversion rates, sales pipeline progression, and campaign attribution, available once Kai is integrated with Salesforce or HubSpot.",
        ],
      },
      {
        category: "Also part of the KPI framework",
        points: [
          "Average resolution time, AI containment rate, qualified leads generated, customer retention, agent productivity, and cost per support interaction.",
        ],
      },
    ],
    closingSections: [
      {
        heading: "How the Playground Works Across Tabs",
        image: "/site-assets/case-studies/agent-ai/img-07.png",
        paragraphs: [
          "Agent Config: model settings, language, style, and behaviour controls. Every dimension of the assistant's behaviour, from tone to escalation triggers, is immediately testable with no save cycle required.",
          "Instructions: the most-used tab. Ops teams write the system prompt here and the Playground immediately shows the response. Change a word, see the effect, with no save cycle and no redeploy.",
          "Training: knowledge uploads, source files, token limits. The Playground here is critical: a bad knowledge upload only shows up when a customer hits it. AI Trainers now upload a document and immediately test the most common failure scenarios before it goes live.",
        ],
      },
      {
        heading: "Impact",
        paragraphs: [
          "Changed the buyer question, then the production numbers. The Playground's first measurable impact wasn't in the metrics. It was in the sales conversation, removing the single biggest blocker to enterprise deals closing.",
          "22% AI containment uplift, 45 second average handle time, and 250k+ monthly sessions followed once teams could validate confidently before go-live.",
        ],
      },
      {
        heading: "What's Next",
        paragraphs: [
          "Automatic regression testing on config changes: right now testing is manual. After every training upload or instruction change, the saved scenario set should run automatically, flagging anything that changed before an ops manager even opens the Playground.",
          "Shareable session links: currently one person tests and reports back. The AI Trainer who knows the edge cases and the Ops Manager who owns the KPIs need to review together, and a shareable session link would make pre-launch sign-off collaborative without a screen-share meeting.",
          "A shared failure-pattern library: teams build their own scenario sets in isolation, but failure patterns repeat across enterprise accounts. A shared library built from anonymised cross-account failures would give every new account a head start on what to test for.",
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "Designing Kai taught me that successful AI experiences are not defined by the sophistication of the technology, but by how confidently the people responsible for it can answer the question: what happens when it gets it wrong?",
          "I expected evaluation sessions to turn on accuracy benchmarks. They turned on accountability instead, every time. That gap between what I expected and what research actually surfaced is the clearest evidence the original framing (test the AI's capability) was wrong; the real product was a way to test trust.",
          "The permission model was built reactively, after recognising the Playground itself needed governance. In hindsight, role-based access should have been scoped from day one alongside the testing surface itself, not bolted on once the gap became obvious.",
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
    teamBreakdown: [
      { function: "Design", members: "1 Designer (me, end-to-end)" },
      { function: "Product", members: "2 PMs" },
      { function: "Engineering", members: "4 Engineers (2 FE, 2 BE)" },
    ],
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
          "Outcomes need structure. If they aren't captured in a consistent format, they get lost. An empathy map built from the discoveries showed analysts switching between tools constantly, losing context between prep, the call itself, and the follow-up.",
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
          "The real cost of this workflow wasn't any single broken step. It was the constant context-switching between tools that made every account take longer than it should have. Unifying prep, calling, and follow-up into one continuous flow mattered more than any individual feature inside it.",
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
    teamBreakdown: [
      { function: "Design", members: "1 Product Designer (me, end-to-end)" },
      { function: "Product", members: "1 PM" },
      { function: "Engineering", members: "3 Engineers" },
    ],
    stats: [
      { value: "+22%", label: "Paid subscriptions" },
      { value: "-40%", label: "Checkout drop-offs" },
      { value: "40%", label: "Faster plan decision-making" },
      { value: "2x", label: "Higher plan selection engagement" },
    ],
    tldrProblem:
      "Users were dropping because plan selection felt unclear and pricing differentiation wasn't obvious.",
    tldrWhatIDid:
      "Built clearer plan comparisons, added pricing/upsell clarity, and streamlined selection → checkout.",
    tldrImpact: "More subscriptions, fewer drop-offs, faster decisions, higher engagement with plan selection.",
    context: [
      {
        heading: "Context",
        paragraphs: [
          "SonyLIV's Android TV subscription flow asked users to compare plans with unclear feature differentiation and pricing that wasn't easy to compare at a glance, on a 10-foot interface, where every extra decision costs more attention than on mobile.",
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
          "Designing for a 10-foot, remote-control interface changes what \"simple\" means: every extra decision point costs more attention than it would on mobile, so clarity in plan comparison mattered more here than it would have in a touch-first flow.",
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
    teamBreakdown: [
      { function: "Design", members: "1 Designer (me, end-to-end)" },
      { function: "Product", members: "1 PM, 1 PO" },
      { function: "Engineering", members: "3 Engineers" },
    ],
    stats: [],
    tldrProblem:
      "Legacy search made it hard to surface relevant results, refine queries, and navigate content at scale.",
    tldrWhatIDid:
      "Redesigned the experience using failure patterns, user complaints, and global benchmarking, then validated changes through prototypes and quick feedback loops.",
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
          "At 350M+ users, the long tail of devices matters as much as the flagship experience, and a search redesign that only works well on the newest phones quietly excludes a meaningful share of the people who actually rely on it.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
