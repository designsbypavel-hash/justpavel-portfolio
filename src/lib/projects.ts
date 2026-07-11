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

export type EcosystemDiagram = {
  title: string;
  subtitle: string;
  journeySteps: { label: string; description: string }[];
  supportingSystems: { name: string; items: string[] }[];
  dataLayerItems: string[];
  impactStats: { value: string; label: string }[];
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
  readTime?: string;
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
  ecosystemDiagram?: EcosystemDiagram;
  ecosystemDiagramImage?: string;
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
    slug: "agent-ai",
    title: "How do you trust an AI assistant before it goes live?",
    description:
      "Businesses wanted to use Kai to handle customer support. But they had no way to check if it was ready before switching it on. I designed the solution.",
    category: "B2B SaaS",
    readTime: "8 min",
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
      title: "The AI worked. Nobody could verify that before going live.",
      image: "/site-assets/case-studies/agent-ai/img-01.png",
      description:
        "In 8 out of 8 sales meetings, the same question came up: \"What happens when Kai gets it wrong — and who is accountable?\" Companies weren't asking whether the AI could do the job. They were asking how they'd know before it was too late.",
    },
    opportunity:
      "The gap wasn't a missing feature. It was a missing sense of safety. Every competing platform treated testing as something you did in a separate environment before a demo — not something built into the daily setup experience. Giving teams a way to test changes the moment they made them, without involving engineering, was the highest-impact thing we could build.",
    hypothesis: {
      weBelieved:
        "Companies weren't afraid of AI. They were afraid of finding out it didn't work in front of a real customer. Give teams a safe way to check before going live, and they'll move forward with confidence.",
      ifWe:
        "we built a live test window directly into the setup experience — visible every time someone made a change —",
      then:
        "teams would feel confident going live, and stalled deals would move forward,",
      because:
        "the answer to 'what happens when it gets it wrong?' would no longer be 'we find out when a customer tells us.'",
      risks: [
        "Teams might feel they need a third party to sign off on test results, not trusting their own findings.",
        "A test window available everywhere could be ignored if it isn't surfaced at the right moments.",
      ],
    },
    designPrinciples: [
      "Let people check before they commit: a test window right next to every setting removes the fear of going live.",
      "Catch problems where they're made, not where they land: a bad change should show up in testing, not in a customer conversation.",
      "No extra steps: if testing requires saving, reloading, or filing a ticket, people won't do it.",
      "Different people, different trust levels: a trainer uploading content and a manager approving go-live need different access, for good reasons.",
      "Talk like the person using it: avoid AI jargon. Say what happens, not how it works under the hood.",
      "Make 'what if it goes wrong?' a question you can answer, not one you dread.",
    ],
    designPrinciplesImage: "/site-assets/case-studies/agent-ai/img-05.png",
    teamsHelped: [
      { function: "Customer Support", members: "Reduced repetitive workload from password resets, order status, and FAQ-style queries." },
      { function: "Sales", members: "Received qualified leads routed directly into the CRM instead of lost in a chatbot dead end." },
      { function: "Marketing", members: "Gained visibility into customer intent and the questions people actually ask." },
      { function: "Customer Success", members: "Could see sentiment and interaction patterns instead of relying on anecdote." },
      { function: "Operations", members: "Got a self-serve way to update assistant behaviour without filing an engineering ticket." },
      { function: "Product & BI teams", members: "Used real conversation data to see customer pain points and report on adoption." },
      { function: "Management", members: "Got direct visibility into usage, satisfaction, and escalation trends across the assistant." },
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
      "The core tension throughout: give the AI enough capability to be genuinely useful, while keeping control, safety, and human escalation firmly in place.",
      "Accuracy and hallucination prevention came before response creativity.",
      "Data privacy, security, and auditability were non-negotiable for enterprise buyers.",
      "Had to integrate with existing CRM and channel systems (Salesforce, HubSpot, WhatsApp, Email), not replace them.",
      "Had to stay no-code configurable for business users, not just engineers.",
      "LLM usage cost had to scale sustainably across many customer accounts, not just one pilot.",
    ],
    stats: [
      { value: "22%", label: "More queries resolved by AI after launch" },
      { value: "45s", label: "Average time to handle a customer query" },
      { value: "250k+", label: "Test sessions run every month" },
    ],
    tldrProblem:
      "Businesses wanted to use Kai to handle customer support — but had no way to check if it was ready before switching it on. Every test required engineers, a separate environment, or going live and hoping for the best.",
    tldrWhatIDid:
      "Designed a live test window built into every part of the setup experience. Make a change, see exactly how the assistant responds — right there, before anything goes live. No engineering needed.",
    tldrImpact:
      "Companies that had paused because they couldn't verify the AI moved forward. The question changed from 'what if it gets it wrong?' to 'let me check right now.'",
    context: [
      {
        heading: "What is Kai?",
        paragraphs: [
          "Kai is an AI assistant platform for businesses. Companies use it to set up a customer-facing chatbot — answering support questions, qualifying sales leads, and routing customers to the right team — without needing engineers to build it.",
          "Think of it like hiring a customer service agent who never sleeps, handles thousands of conversations at once, and can be trained by the business team themselves — not the tech team.",
          "Old-style chatbots followed rigid scripts and broke the moment a customer asked something unexpected. Kai understands natural language, learns from the company's own content, and knows when to hand off to a human.",
        ],
      },
      {
        heading: "The Problem",
        image: "/site-assets/case-studies/agent-ai/img-06.png",
        paragraphs: [
          "Companies were interested. But something kept stopping them from committing.",
          "Whenever they made a change to the assistant — updated its instructions, added new content, adjusted how it handled certain questions — they had no way to see what effect that change would have before it went live.",
          "The only option was to deploy it and see what happened. For someone responsible for customer satisfaction, that wasn't good enough.",
        ],
      },
      {
        heading: "What Research Showed",
        paragraphs: [
          "I expected sales meetings to be about performance: accuracy rates, speed, resolution numbers. Instead, every meeting turned to the same question.",
          "\"What happens when Kai gets it wrong — and who is accountable?\"",
          "This came up in 8 out of 8 sessions. Not \"does it work?\" — they could see it worked. The question was: can we be sure before we put it in front of our customers?",
          "3 out of 4 companies we were in advanced talks with had paused at exactly this point. The AI was fine. The product had no answer to 'can we check before going live?'",
        ],
      },
      {
        heading: "Who Uses the Platform",
        image: "/site-assets/case-studies/agent-ai/img-02.png",
        paragraphs: [
          "Five different types of people needed to use the same testing space — a trainer uploading new content, an ops manager reviewing responses, an IT admin controlling who can make changes, a viewer monitoring results, and a super admin overseeing everything.",
          "Each of them had a different idea of what 'safe to test' and 'ready to go live' meant. The design had to work for all of them.",
        ],
      },
      {
        heading: "Three Things That Kept Coming Up in Research",
        paragraphs: [
          "People talked about what they needed the assistant to do — not how it worked underneath. They didn't care about the technology. They cared about the outcome.",
          "They would happily spend more time on setup if they felt confident in the result. This wasn't about speed. It was about certainty.",
          "Every time they updated something, they had no way to check what changed without going live. That single gap was the reason deals were stalling.",
        ],
      },
      {
        heading: "What Every Competitor Was Missing",
        image: "/site-assets/case-studies/agent-ai/img-03.png",
        paragraphs: [
          "Every other AI platform treated testing as a separate activity — something you did in a different environment before a demo, not something built into daily use.",
          "Nobody had made testing a natural part of the setup experience itself. That gap was the opportunity.",
        ],
      },
    ],
    decisions: [
      {
        title: "The test window follows you everywhere — not just one screen",
        image: "/site-assets/case-studies/agent-ai/img-04.png",
        why: "My first instinct was to add the test window to just one part of the setup experience. But everything affects how the assistant responds — its instructions, the documents it learns from, its tone rules. A problem introduced in one place would be invisible if the test window wasn't there. I needed it to be present wherever a change could be made.",
        alternativesConsidered: [
          "One tab only: simpler to build, but a broken content upload wouldn't be caught until a customer hit it.",
          "A toggle to show or hide it: adds an extra step at exactly the moment you most need immediate feedback.",
        ],
        whatChanged: [
          "The test window is visible across every setup screen — instructions, content, tone, and behaviour settings",
          "The same conversation carries across screens, so you test a realistic flow, not a single isolated response",
          "Compact on smaller screens; always open on desktop where setup work happens",
        ],
        result:
          "Someone uploading new content could test it immediately. Someone adjusting the assistant's instructions could see the effect straight away. Problems were caught the moment they were introduced — not when a customer discovered them.",
        tradeOff:
          "Keeping one live conversation thread in sync across multiple screens required more engineering work than a simpler, single-screen version would have.",
        businessReasoning:
          "A broken content upload only surfaces when a customer hits it. The cost of missing that is a bad customer experience and a lost trust signal — far more expensive than the extra build effort.",
      },
      {
        title: "Different people get different levels of access — for good reasons",
        image: "/site-assets/case-studies/agent-ai/img-09.png",
        why: "Five types of people needed to use the same testing space, but for very different reasons. A trainer uploading content, a manager approving the assistant before launch, and an IT admin controlling who can make changes all need to be in the same place — but with different things visible and different things they're allowed to do.",
        whatChanged: [
          "Five roles mapped directly from interviews: Super Admin, Admin, Operator, Trainer, Viewer",
          "Each role sees and can do exactly what their job requires — nothing more",
        ],
        result:
          "Everyone who needed to be involved in testing could be, without stepping on each other. The right person could test, the right person could approve, and the right person could lock things down.",
        tradeOff:
          "Adding access rules to a feature designed to remove friction risked making it feel more complicated. Getting the role definitions right from the start was critical.",
        businessReasoning:
          "The five roles came directly from the people I interviewed — they weren't invented. That meant the access model matched how teams actually worked, instead of being an abstract system they'd have to adapt to.",
      },
    ],
    businessImpact: [
      {
        category: "Deals moved forward",
        points: [
          "3 out of 4 companies that had paused — all stuck at the same question — moved forward once they could test the assistant themselves before going live.",
        ],
      },
      {
        category: "Better AI performance",
        points: [
          "22% more customer queries resolved by the AI after launch, because teams could find and fix problems before going live instead of after.",
        ],
      },
      {
        category: "Faster for customers",
        points: [
          "Customer queries handled in 45 seconds on average. Teams could update the assistant's behaviour and test it themselves — no engineering ticket needed.",
        ],
      },
      {
        category: "A tool people actually use",
        points: [
          "250,000+ test sessions run every month. The test window became part of how teams work, not a feature they ignore.",
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
          "Task completion rate",
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
        heading: "How the Test Window Works in Practice",
        image: "/site-assets/case-studies/agent-ai/img-07.png",
        paragraphs: [
          "When someone updates the assistant's instructions — changing how it introduces itself, or how it handles a refund request — the test window shows the effect immediately. No saving. No refreshing. Just change and see.",
          "When someone uploads a new document to train the assistant on, they can ask it questions about that document right away. A bad upload shows up in the test, not when a customer asks a question the assistant can't answer.",
          "When someone adjusts the assistant's tone or the situations where it hands off to a human, the test window is right there to try it. Every screen, every change, same place to check.",
        ],
      },
      {
        heading: "What Changed in Sales Meetings",
        paragraphs: [
          "The question 'what happens when it gets it wrong?' didn't go away. But the answer changed. Instead of 'we'll find out,' it became 'let me show you.'",
          "Companies that had paused the deal could now see for themselves that changes were safe before going live. That shifted the conversation from risk to readiness.",
        ],
      },
      {
        heading: "What I'd Build Next",
        paragraphs: [
          "Automatic checks after every update: right now, testing is something a person has to remember to do. The next step is running a standard set of test scenarios automatically every time something changes — so problems are flagged before anyone has to go looking for them.",
          "A way to test together: currently one person tests and reports back. But the person who knows the edge cases and the person who signs off on go-live are often different people. A shared test session would let both of them look at the same thing at the same time.",
          "Shared examples across companies: teams build their own test scenarios from scratch. But the same types of problems come up again and again across different businesses. A library of common test cases — built from anonymised examples — would give new teams a head start.",
        ],
      },
      {
        heading: "What I Learned",
        paragraphs: [
          "I went into this project thinking the problem was about making the AI smarter. Research showed the problem was simpler: people had no way to check whether it was ready.",
          "The solution wasn't a new AI feature. It was giving people a safe place to find out for themselves — before it mattered.",
          "One thing I'd do differently: I added user access levels late in the process, once I realised different people needed different permissions. That should have been part of the design from day one — not something bolted on once the gap became obvious.",
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
    readTime: "6 min",
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
      image: "/site-assets/case-studies/sonyliv-check/img-04.png",
      description:
        "The single highest-leverage move in this redesign: surface UPI as the smoothest, most visually prominent path while keeping every other method available. Confidence beats choice at the payment moment, so the entire redesign builds outward from this one decision.",
    },
    ecosystemDiagramImage: "/site-assets/case-studies/sonyliv-check/ecosystem-diagram.webp",
    ecosystemDiagram: {
      title: "SonyLIV Subscription Ecosystem",
      subtitle: "Mapping the end-to-end subscription journey and all the systems that power a seamless checkout experience.",
      journeySteps: [
        { label: "1. Discover", description: "User explores content on SonyLIV" },
        { label: "2. Choose Plan", description: "User selects from available plans" },
        { label: "3. Checkout", description: "User proceeds to secure checkout" },
        { label: "4. Payment", description: "User completes payment via preferred method" },
        { label: "5. Access", description: "Subscription activated, content unlocked" },
      ],
      supportingSystems: [
        { name: "Content Platform", items: ["Content Catalog", "Recommendations", "Personalization", "Watch History"] },
        { name: "Entitlement Service", items: ["Plan Management", "Pricing & Offers", "Entitlements", "Feature Access"] },
        { name: "Checkout Experience", items: ["Plan Summary", "Payment Options", "Offers & Promos", "Secure Processing"] },
        { name: "Payment Gateway", items: ["UPI", "Cards", "Net Banking", "Wallets"] },
        { name: "Account & Access", items: ["User Management", "Subscription Status", "Device Management", "Access Control"] },
      ],
      dataLayerItems: ["User Behavior", "Funnel Analytics", "Payment Analytics", "Subscription Insights", "A/B Testing"],
      impactStats: [
        { value: "+28%", label: "Increase in UPI Adoption" },
        { value: "-14%", label: "Reduction in Payment Failures" },
        { value: "-21%", label: "Reduction in Checkout Time" },
        { value: "+18%", label: "Increase in Subscription Conversion" },
        { value: "+23%", label: "Growth in Paid Subscribers" },
      ],
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
    designPrinciplesImage: "/site-assets/case-studies/sonyliv-check/img-03.png",
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
        image: "/site-assets/case-studies/sonyliv-check/img-01.png",
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
        image: "/site-assets/case-studies/sonyliv-check/img-06.png",
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
        image: "/site-assets/case-studies/sonyliv-check/img-05.png",
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
    businessImpactImage: "/site-assets/case-studies/sonyliv-check/img-07.png",
    closingSections: [
      {
        heading: "Reflection",
        image: "/site-assets/case-studies/sonyliv-check/img-02.png",
        paragraphs: [
          "Looking back, the biggest unlock wasn't any single screen, it was realizing that checkout isn't a form, it's a decision made under mild stress. Every extra option, every unclear state, every dead end after a failure adds friction to that decision.",
          "Strip those away, and the numbers, more UPI adoption, fewer failed payments, faster completion, follow almost on their own. Payment is the one screen where users have the least patience for ambiguity and the most at stake if something goes wrong.",
          "What surprised me most: the fix with the single highest measured impact, leading with UPI, was also the simplest to ship. That's a good signal in hindsight: it confirmed the bottleneck was decision architecture, not a lack of features.",
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
    readTime: "7 min",
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
    readTime: "5 min",
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
    readTime: "6 min",
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
