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
        "In 8 out of 8 sales meetings, the same question came up: \"What happens when Kai gets it wrong, and who is accountable?\" Companies weren't asking whether the AI could do the job. They were asking how they'd know before it was too late.",
    },
    opportunity:
      "If we give teams a safe way to simulate real customer conversations before going live, they will gain the confidence to commit, reduce the risk of deploying something broken, and adopt AI faster. The gap wasn't a missing AI feature. It was a missing sense of safety. Every competitor treated testing as something you did in a separate environment before a demo. Nobody had made it part of the daily setup experience. That was the opening.",
    hypothesis: {
      weBelieved:
        "Companies weren't afraid of AI. They were afraid of finding out it didn't work in front of a real customer. Give teams a safe way to check before going live, and they'll move forward with confidence.",
      ifWe:
        "we built a live test window directly into the setup experience, visible every time someone made a change,",
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
      "A separate testing environment: we considered keeping testing isolated, but that recreated the exact problem we were solving. Teams would still need to switch contexts, and the friction would mean they'd skip it.",
      "A test button on the instructions screen only: simpler to build, but any change to training content or tone rules would be invisible. Problems introduced outside instructions would only surface in production.",
      "A manual QA checklist before go-live: this puts the burden on teams to remember steps. Research showed people don't follow checklists under pressure. The test needed to be present at the moment of change, not at the end of a process.",
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
      "Businesses wanted to use Kai to handle customer support but had no way to check if it was ready before switching it on. Every test required engineers, a separate environment, or going live and hoping for the best.",
    tldrWhatIDid:
      "Designed a live test window built into every part of the setup experience. Make a change, see exactly how the assistant responds, right there before anything goes live. No engineering needed.",
    tldrImpact:
      "Companies that had paused because they couldn't verify the AI moved forward. The question changed from 'what if it gets it wrong?' to 'let me check right now.'",
    context: [
      {
        heading: "What is Kai?",
        paragraphs: [
          "Kai is an AI assistant platform for businesses. Companies use it to set up a customer-facing chatbot that answers support questions, qualifies sales leads, and routes customers to the right team, without needing engineers to build it.",
          "Think of it like hiring a customer service agent who never sleeps, handles thousands of conversations at once, and can be trained by the business team themselves, not the tech team.",
          "Old-style chatbots followed rigid scripts and broke the moment a customer asked something unexpected. Kai understands natural language, learns from the company's own content, and knows when to hand off to a human.",
        ],
      },
      {
        heading: "The Problem",
        image: "/site-assets/case-studies/agent-ai/img-06.png",
        paragraphs: [
          "Companies were interested. But something kept stopping them from committing.",
          "Whenever they made a change to the assistant, whether updating its instructions, adding new content, or adjusting how it handled certain questions, they had no way to see what effect that change would have before it went live.",
          "The only option was to deploy it and see what happened. For someone responsible for customer satisfaction, that wasn't good enough.",
        ],
      },
      {
        heading: "What Research Showed",
        paragraphs: [
          "We ran 8 interviews with customer support managers and operations leads at enterprise companies that were actively evaluating Kai. These were people responsible for customer satisfaction scores, not engineering or product. They were the ones who would own the outcome if the AI got it wrong.",
          "I expected the sessions to be about performance: accuracy rates, speed, resolution numbers. Instead, every single meeting turned to the same question.",
          "\"What happens when Kai gets it wrong, and who is accountable?\"",
          "They could see the AI worked in the demo. The question was whether they could be sure before putting it in front of their own customers. 3 out of 4 companies in advanced talks had paused at exactly this point.",
        ],
      },
      {
        heading: "Who Uses the Platform",
        image: "/site-assets/case-studies/agent-ai/img-02.png",
        paragraphs: [
          "Five different types of people needed to use the same testing space: a trainer uploading new content, an ops manager reviewing responses, an IT admin controlling who can make changes, a viewer monitoring results, and a super admin overseeing everything.",
          "Each of them had a different idea of what 'safe to test' and 'ready to go live' meant. The design had to work for all of them.",
        ],
      },
      {
        heading: "Three Things That Kept Coming Up in Research",
        paragraphs: [
          "People talked about what they needed the assistant to do, not how it worked underneath. They didn't care about the technology. They cared about the outcome.",
          "They would happily spend more time on setup if they felt confident in the result. This wasn't about speed. It was about certainty.",
          "Every time they updated something, they had no way to check what changed without going live. That single gap was the reason deals were stalling.",
        ],
      },
      {
        heading: "What Every Competitor Was Missing",
        image: "/site-assets/case-studies/agent-ai/img-03.png",
        paragraphs: [
          "Every other AI platform treated testing as a separate activity. Something you did in a different environment before a demo, not something built into daily use.",
          "Nobody had made testing a natural part of the setup experience itself. That gap was the opportunity.",
        ],
      },
      {
        heading: "From 30 Questions to 3 Priorities",
        image: "/site-assets/case-studies/agent-ai/img-11.png",
        paragraphs: [
          "Research didn't hand us a roadmap. It handed us 30 open design questions spread across 6 functional areas: how people create assistants, how they train them, how they test them, how teams share access, how AI behaviour should be controlled, and how governance would work at enterprise scale.",
          "Every question got a priority label based on what users said they needed before they'd commit. MVP, Phase 2, Phase 3, or Deferred. Testing Experience had the highest density of MVP tags by a significant margin. People weren't asking for more features. They were asking for confidence before going live.",
          "Those 30 questions collapsed into three design themes: reduce cognitive load for first-time users setting up the assistant from scratch, build confidence through continuous testing at the point of change, and roll out more advanced controls progressively so the platform doesn't feel overwhelming on day one. Everything we built traced back to one of those three.",
        ],
      },
      {
        heading: "What Usage Data Showed After Launch",
        image: "/site-assets/case-studies/agent-ai/img-12.png",
        paragraphs: [
          "After launch, we tracked test session volume daily across all active accounts. The data showed something specific: usage wasn't just happening at setup. Teams were returning to the test window repeatedly throughout the day, especially after content updates and instruction changes.",
          "The stacked breakdown by user age segment showed that the 25 to 29 age group drove the majority of daily sessions, consistent with operations and customer support roles at the companies using the platform. Average daily sessions per user held steady around 80 to 84 across age groups, showing the test window became a regular part of how these teams worked, not a one-time onboarding step.",
          "The late-April spike in the 30-day view mapped to a batch of new accounts going live simultaneously. Session volume climbed to over 2,000 in a single day, without any additional onboarding support from us. Teams could find it, understand it, and use it without being walked through it.",
        ],
      },
    ],
    decisions: [
      {
        title: "The test window follows you everywhere, not just one screen",
        image: "/site-assets/case-studies/agent-ai/img-04.png",
        why: "My first instinct was to add the test window to just one part of the setup experience. But everything affects how the assistant responds: its instructions, the documents it learns from, its tone rules. A problem introduced in one place would be invisible if the test window wasn't there. I needed it to be present wherever a change could be made.",
        alternativesConsidered: [
          "One tab only: simpler to build, but a broken content upload wouldn't be caught until a customer hit it.",
          "A toggle to show or hide it: adds an extra step at exactly the moment you most need immediate feedback.",
        ],
        whatChanged: [
          "The test window is visible across every setup screen: instructions, content, tone, and behaviour settings",
          "The same conversation carries across screens, so you test a realistic flow rather than a single isolated response",
          "Compact on smaller screens; always open on desktop where setup work happens",
        ],
        result:
          "Someone uploading new content could test it immediately. Someone adjusting the assistant's instructions could see the effect straight away. Problems were caught the moment they were introduced, not when a customer discovered them.",
        tradeOff:
          "Keeping one live conversation thread in sync across multiple screens required more engineering work than a simpler, single-screen version would have.",
        businessReasoning:
          "A broken content upload only surfaces when a customer hits it. The cost of missing that is a bad customer experience and a lost trust signal. Far more expensive than the extra build effort.",
      },
      {
        title: "Different people get different levels of access, for good reasons",
        image: "/site-assets/case-studies/agent-ai/img-09.png",
        why: "Five types of people needed to use the same testing space, but for very different reasons. A trainer uploading content, a manager approving the assistant before launch, and an IT admin controlling who can make changes all need to be in the same place, but with different things visible and different things they're allowed to do.",
        whatChanged: [
          "Five roles mapped directly from interviews: Super Admin, Admin, Operator, Trainer, Viewer",
          "Each role sees and can do exactly what their job requires, nothing more",
        ],
        result:
          "Everyone who needed to be involved in testing could be, without stepping on each other. The right person could test, the right person could approve, and the right person could lock things down.",
        tradeOff:
          "Adding access rules to a feature designed to remove friction risked making it feel more complicated. Getting the role definitions right from the start was critical.",
        businessReasoning:
          "The five roles came directly from the people I interviewed. They weren't invented. That meant the access model matched how teams actually worked, instead of being an abstract system they'd have to adapt to.",
      },
    ],
    businessImpact: [
      {
        category: "Deals moved forward",
        points: [
          "3 out of 4 companies that had paused, all stuck at the same question, moved forward once they could test the assistant themselves before going live.",
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
          "Customer queries handled in 45 seconds on average. Teams could update the assistant's behaviour and test it themselves. No engineering ticket needed.",
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
        heading: "How We Got There",
        paragraphs: [
          "Before any high-fidelity work, I mapped the five roles on a whiteboard against what each person needed to do, what they needed to see, and what they should never be able to touch. That exercise exposed the permission model problem early, before it could become a late-stage design fix.",
          "Early concepts were rough: one put the test window in a drawer that slid out from the right, which kept it accessible but made it feel like an afterthought. Another treated it as a full-page mode you had to navigate to, which added the exact friction we were trying to remove. The version that worked kept the test window anchored beside the config screen at all times, visible without being forced on you.",
          "I tested three structural approaches with two ops leads before committing to the final layout. The insight that shifted everything: people didn't want to open a test window. They wanted testing to already be there when they looked up.",
        ],
      },
      {
        heading: "How the Test Window Works in Practice",
        image: "/site-assets/case-studies/agent-ai/img-07.png",
        paragraphs: [
          "When someone updates the assistant's instructions, changing how it introduces itself or how it handles a refund request, the test window shows the effect immediately. No saving. No refreshing. Just change and see.",
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
          "Automatic checks after every update: right now, testing is something a person has to remember to do. The next step is running a standard set of test scenarios automatically every time something changes, so problems are flagged before anyone has to go looking for them.",
          "A way to test together: currently one person tests and reports back. But the person who knows the edge cases and the person who signs off on go-live are often different people. A shared test session would let both of them look at the same thing at the same time.",
          "Shared examples across companies: teams build their own test scenarios from scratch. But the same types of problems come up again and again across different businesses. A library of common test cases, built from anonymised examples, would give new teams a head start.",
        ],
      },
      {
        heading: "What I Learned",
        paragraphs: [
          "I went into this project thinking the problem was about making the AI smarter. Research showed the problem was simpler: people had no way to check whether it was ready.",
          "The solution wasn't a new AI feature. It was giving people a safe place to find out for themselves, before it mattered.",
          "One thing I'd do differently: I added user access levels late in the process, once I realised different people needed different permissions. That should have been part of the design from day one, not something bolted on once the gap became obvious.",
        ],
      },
    ],
  },
  {
    slug: "sonyliv-check",
    title: "Reducing payment hesitation at SonyLIV's most critical screen",
    description:
      "When a user decides to subscribe, the checkout screen should get out of the way. SonyLIV's didn't. I redesigned it to remove the friction that was turning intent into drop-off.",
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
      "If users arrive at checkout having already decided to subscribe, the screen's job is not to make them reconsider every payment option. It is to confirm the easiest path and get out of the way. The opportunity was to convert a five-way evaluation into a clear default with alternatives still accessible. That reframe mattered because it was a hierarchy problem, not an infrastructure problem: fixable within the two-month window, without touching the backend, and ownable end-to-end by design.",
    designPrinciples: [
      "Lead with a default, not a menu: surface the highest-success path first. Never remove alternatives, but never make them compete for equal attention.",
      "Hierarchy carries the cognitive load so the user doesn't have to: when every option looks the same, the user has to evaluate all of them.",
      "Every claim must be verifiable on screen: a discount the user cannot confirm is not a benefit, it is a reason to pause.",
      "Failure is not an edge case: at scale, payment failures are guaranteed. Design the recovery path with the same care as the happy path.",
      "Solve with order and emphasis before adding new UI: the problem was not that the screen was missing something. It was that everything on it had equal weight.",
    ],
    designPrinciplesImage: "/site-assets/case-studies/sonyliv-check/img-03.png",
    stats: [
      { value: "+28%", label: "UPI adoption" },
      { value: "-14%", label: "Failed payments" },
      { value: "-21%", label: "Time to complete" },
    ],
    tldrProblem:
      "Users who had already decided to subscribe were pausing at checkout and not completing. Too many payment options with equal visual weight, unclear offer states, and dead-end failure screens were creating hesitation at the worst possible moment.",
    tldrWhatIDid:
      "Simplified decision-making by giving UPI a clear default position, made offers verifiable on screen, and designed payment failure as a recoverable state rather than a dead end.",
    tldrImpact:
      "Post-launch analytics showed a 28% increase in UPI adoption, 14% fewer failed payments, and 21% faster checkout completion.",
    context: [
      {
        heading: "Business context",
        image: "/site-assets/case-studies/sonyliv-check/img-01.png",
        paragraphs: [
          "SonyLIV had 350M+ users and a growing catalogue. Subscription revenue was the business model. The checkout screen sat at the end of the entire funnel: every marketing campaign, every content investment, every recommendation led here.",
          "The business goal was straightforward: more people completing subscriptions, fewer falling out at payment. The design challenge was more specific: a screen that supported India's fragmented payment landscape without that fragmentation costing conversions.",
        ],
      },
      {
        heading: "Constraints",
        paragraphs: [
          "India's payment ecosystem is genuinely complex. UPI, cards, net banking, wallets, and operator billing all have meaningful user bases. Removing any of them was not an option.",
          "The existing payment backend and gateway integrations were fixed scope. Any changes had to work with the current ranking and routing logic, not replace it.",
          "The fix had to ship within a two-month window, which ruled out anything requiring backend restructuring. That constraint was actually clarifying: it confirmed this was a hierarchy and hierarchy problem, not an infrastructure problem.",
          "Low-end Android devices accounted for a significant share of SonyLIV's user base. Any redesign had to perform consistently across device tiers, not just on flagships.",
        ],
      },
      {
        heading: "Research",
        paragraphs: [
          "I started with a heuristic evaluation of the existing checkout flow, mapping every point where a user might pause, doubt, or abandon. That gave me a rough diagnosis before talking to anyone.",
          "I then benchmarked against Prime Video, Hotstar, PhonePe, and Paytm to understand how the market had already solved payment hierarchy and failure states for Indian users. The pattern was consistent across the better performers: one method led, others followed.",
          "I also reviewed Play Store reviews and internal customer support patterns to find recurring complaints. The themes that kept surfacing were not about missing features. They were about confusion: which method to pick, whether a discount had actually applied, and what to do after a payment failed.",
          "The picture that emerged was not that checkout was broken. It was that it treated a decision that most users had already made as if they still needed to evaluate everything from scratch.",
        ],
      },
      {
        heading: "What research changed",
        paragraphs: [
          "I went in expecting the problem to be about payment method support or technical failures. The research redirected that completely.",
          "Users were not failing because the payment options were wrong or the backend was unreliable. They were stalling because the screen gave them no signal about what to do next. Every option looked equally valid, which made choosing feel like a decision that could go wrong.",
          "That shifted the design brief from adding capability to removing uncertainty. The question was not what else to support but what to lead with.",
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
    rejectedConcepts: [
      "A tabbed layout separating payment methods: I considered grouping UPI, cards, and wallets into separate tabs to reduce visible options. The problem was that it buried methods users might want to switch to mid-flow, and added a navigation layer on a screen where speed matters most.",
      "A recommendation engine choosing the method automatically: surfacing only the user's most-used method and hiding the rest felt like an overreach on a payment screen. Users need the reassurance that alternatives exist, even if they don't use them.",
      "A full visual redesign with new components: benchmarking showed the existing layout structure was not the problem. A redesign would have taken the two-month window and delivered something that looked different without addressing the actual friction. The winning approach was hierarchy change, not visual change.",
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
        heading: "How thinking changed during the project",
        image: "/site-assets/case-studies/sonyliv-check/img-02.png",
        paragraphs: [
          "My initial assumption was that the checkout drop-off was a trust problem: users were not confident enough in SonyLIV's payment security, so they were abandoning. I expected the solution to involve clearer security signals, trust badges, and better error messaging around card details.",
          "The heuristic evaluation and competitor benchmarking contradicted that. Users were not dropping off because they distrusted the platform. They were dropping off because the screen gave them no signal about what to do. Security was not the bottleneck. Decision-making was.",
          "That meant the highest-leverage fix was not adding more reassurance but removing the requirement to evaluate everything. Leading with UPI was the clearest expression of that reframe: it made the decision for most users without taking the decision away from anyone.",
        ],
      },
      {
        heading: "How this scales beyond checkout",
        paragraphs: [
          "The default-plus-hierarchy pattern that came out of this project is not specific to payment methods. It applies anywhere SonyLIV adds a new offer type, a new subscription tier, or a new payment rail.",
          "Rather than re-litigating the layout each time something is added, the principle holds: one path leads, others remain accessible. That made the pattern reusable across Android, iOS, and tablet surfaces without redesigning from scratch each time.",
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "The most useful thing I learned from this project was about where to look for friction. I went in assuming the problem was visible: a broken step, a confusing label, a missing feature. The research showed the problem was structural: a screen that treated a near-certain decision as an open question.",
          "The fix with the single highest measured impact, leading with UPI, was also the simplest to ship. That is a pattern worth carrying forward: when the bottleneck is decision architecture rather than missing capability, the solution is often subtraction, not addition.",
          "If I were doing this again, I would involve engineering earlier in the constraints conversation. Understanding the backend limitations from day one would have let me scope alternatives more accurately at the start, rather than discovering some were off the table partway through exploration.",
        ],
      },
    ],
  },
  {
    slug: "fintech-autonomous",
    title: "Using AI to help AR analysts spend less time on admin and more time recovering debt",
    description:
      "Accounts receivable analysts were managing hundreds of accounts per cycle across disconnected tools. Every call left a trail of manual work. I redesigned the workflow to remove that overhead.",
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
      { value: "15%", label: "Less manual effort per account" },
      { value: "13%", label: "Faster DSO" },
    ],
    tldrProblem:
      "AR analysts managed hundreds of accounts per cycle but spent a significant portion of that time on admin: switching between tools, writing call notes, setting manual reminders, and rebuilding context they had already gathered before the call. That overhead left less time for the actual collections work.",
    tldrWhatIDid:
      "Redesigned the end-to-end collections workflow, unifying account preparation, calling, call logging, and follow-up scheduling into one continuous surface with AI-assisted summaries removing the manual write-up after every call.",
    tldrImpact:
      "Post-launch tracking showed 40% fewer missed follow-ups, 15% less manual effort per account, and a 13% reduction in days sales outstanding across the collections operation.",
    context: [
      {
        heading: "Business context",
        image: "/site-assets/case-studies/fintech-autonomous/img-02.jpg",
        paragraphs: [
          "Days sales outstanding is a core metric for any finance team. The longer it takes to collect on an invoice, the worse the company's cash flow. The collections team's job is to close that gap: contact the right accounts, at the right time, and follow up consistently until payment is received.",
          "The business problem was simple to state. The team was not keeping up. DSO was higher than it should have been, and the root cause was not that analysts were working slowly. It was that the tools they were working with were adding overhead at every step of the process.",
        ],
      },
      {
        heading: "Who I was designing for",
        paragraphs: [
          "AR analysts are not casual software users. They work through a structured daily worklist, handling dozens of accounts per day. Every minute spent on admin is a minute not spent on a collection call. They are measured on outcomes: how much debt was recovered, how many follow-ups were completed on schedule, how quickly DSO came down.",
          "They were not asking for new features. They were asking for less friction between the thing they needed to do and being able to do it.",
        ],
      },
      {
        heading: "Constraints",
        paragraphs: [
          "The existing CRM and accounting system integrations were fixed scope. The redesign had to work with the data those systems provided, not require a new data pipeline.",
          "Analysts were resistant to tools that felt like monitoring rather than support. Any AI-generated content, whether a suggested call script or an automated summary, had to be editable and clearly presented as a starting point, not a directive.",
          "The workflow had to support both high-volume low-value accounts, where speed matters most, and high-value strategic accounts, where context and relationship history matter more. The same interface had to serve both without being optimised only for one.",
          "Call recording and automated transcription raised compliance considerations that determined what could be automated and what required explicit analyst review before saving.",
        ],
      },
      {
        heading: "Research",
        paragraphs: [
          "I spent time observing analysts working through their daily worklist before designing anything. What I saw was not a tool problem in isolation. It was a workflow problem expressed through tools: a browser tab for the CRM, a separate dialer, a spreadsheet for notes, and a calendar for follow-up reminders, all open at once.",
          "I ran structured interviews with analysts across different account tiers to understand where the overhead was concentrated. Two themes surfaced consistently. First, the period between ending a call and logging the outcome was where context was most frequently lost, because analysts often moved to the next account before completing the write-up. Second, follow-up reminders set outside the workflow tool were regularly missed, because they had no connection to the account context when they fired.",
          "I also spoke with team managers to understand how they monitored analyst performance and where they saw the most variability in outcomes. Inconsistent call logging was a recurring concern: different analysts recorded different levels of detail, which made account history unreliable for anyone picking up an account later.",
        ],
      },
      {
        heading: "What research changed",
        paragraphs: [
          "I went into the project expecting the core problem to be the calling experience: analysts were using a separate dialer, which felt like the obvious friction point to fix.",
          "The research showed the call itself was not where things went wrong. Analysts were comfortable making calls. The breakdown happened in the ten minutes after: writing up what was discussed, deciding what the next step was, and setting a reminder that would actually surface at the right time in the right context.",
          "That shifted the design priority from improving the call experience to improving everything that surrounds it. The call is the event. The prep before and the logging after are where the workflow was actually failing.",
        ],
      },
    ],
    opportunity:
      "If analysts could move from finishing a call directly into a structured, partly pre-filled log, and have the follow-up tied automatically to the account, they would spend less time on admin and more time on the next account. The opportunity was not to make the product smarter. It was to remove the manual steps that were adding up across hundreds of accounts per cycle.",
    designPrinciples: [
      "Reduce the gap between finishing a task and recording it: the longer the gap, the more context is lost.",
      "AI generates the first draft, the analyst owns the final version: automated summaries are a starting point, not a record.",
      "Follow-ups should be tied to accounts, not to calendars: a reminder with no context is easy to ignore.",
      "The workflow should work for both high-volume and high-value accounts: speed for one, depth for the other, same interface.",
      "Never make analysts feel monitored: tools that feel like surveillance create resistance, not adoption.",
      "Consistency in logging benefits everyone downstream: a well-structured call record is as useful to the next analyst on the account as it is to the one who made the call.",
    ],
    rejectedConcepts: [
      "A fully automated collections workflow where AI prioritised accounts and drafted outreach without analyst input: analysts were clear that they needed to feel in control of their worklist. A system that made decisions for them rather than surfacing information to help them decide would not have been adopted, and in collections, where relationship and context matter, full automation was not appropriate for anything beyond low-value accounts.",
      "A new standalone tool to replace the existing CRM: the team was already working in established systems with years of account history. A replacement tool would have required data migration, retraining, and a change management effort that was outside the project scope and would have created resistance regardless of how good the design was.",
      "A chat-based AI interface for querying account information: I explored whether an analyst could ask a conversational AI questions about an account instead of navigating structured screens. The problem was that experienced analysts already knew what information they needed. A chat interface added steps between knowing what you want and getting it. Structured screens with the right information surfaced by default were faster.",
    ],
    decisions: [
      {
        title: "Unify preparation, calling, and logging into one continuous flow",
        image: "/site-assets/case-studies/fintech-autonomous/img-03.jpg",
        why: "Analysts were rebuilding context three times for every account: before the call to prepare, during the call to reference, and after the call to log. Each switch between tools cost time and introduced the risk of losing what had just happened. A single surface that carried context through all three stages removed that overhead.",
        whatChanged: [
          "Account summary, payment history, and previous call notes visible before and during the call",
          "Call outcome logging opens immediately after a call ends, pre-filled with account context",
          "Follow-up scheduling tied directly to the log, not to a separate calendar",
        ],
        result: "Analysts moved from call to log without switching context. The information they needed to write the log was already on screen. Follow-ups were set in the same action as completing the log.",
        tradeOff: "A unified workflow means the design has to serve preparation, active calling, and post-call logging simultaneously. Those three modes have different information needs, which required careful thinking about what to surface at each stage without cluttering the others.",
        businessReasoning: "Every minute an analyst spends rebuilding context is a minute not spent on the next account. At the scale of hundreds of accounts per cycle, that overhead compounds quickly.",
      },
      {
        title: "Bring calling inside the product rather than alongside it",
        image: "/site-assets/case-studies/fintech-autonomous/img-04.jpg",
        why: "Using a separate dialer broke the workflow at its most critical point. The moment an analyst switched to a dialer, they lost the account context the tool had been showing them. When the call ended, they had to switch back, reconstruct what they had been looking at, and then write up what happened.",
        whatChanged: [
          "In-app calling with account context, payment history, and previous notes visible during the call",
          "Call duration and connection status tracked within the workflow, not in a separate tool",
          "Call outcome state available immediately when the call ends",
        ],
        result: "Analysts no longer lost context mid-call. The information they needed to reference during a conversation was visible without switching screens.",
        tradeOff: "Bringing telephony inside the product added a meaningful engineering dependency and introduced a new failure mode: if the calling integration had issues, it could disrupt the core workflow. That trade-off was accepted because the context loss from an external dialer was a daily cost, and a calling integration failure was a recoverable exception.",
        businessReasoning: "A collections call is more effective when the analyst has account context in front of them during the conversation. Better calls produce better outcomes, which means faster recovery of debt.",
      },
      {
        title: "Use AI to generate the first draft of call summaries",
        image: "/site-assets/case-studies/fintech-autonomous/img-05.jpg",
        why: "Manual call logging was the single biggest source of inconsistency in account records. Different analysts captured different levels of detail. Some logged immediately, others logged hours later. The information quality degraded as time passed. Automated summaries gave every analyst a structured starting point immediately after the call ended.",
        whatChanged: [
          "AI-generated call summary presented for review immediately after call ends",
          "Summary is editable before saving, with analyst able to add or remove detail",
          "Structured format ensures consistent fields across all call records: outcome, agreed next step, amount discussed, payment commitment if any",
        ],
        result: "Call records became consistent across the team. Analysts who previously skipped detailed logging had a complete draft to confirm rather than a blank field to fill. Account history became more reliable for anyone picking up an account later.",
        tradeOff: "AI-generated summaries are only as good as the call transcription they are based on. Calls with poor audio quality or heavy domain-specific language produced weaker summaries that required more editing. Analysts needed to understand they were reviewing a draft, not a record.",
        businessReasoning: "Consistent account records reduce the time any analyst spends getting up to speed on an account they did not work previously. In a team where accounts are sometimes reassigned, that is a real operational cost.",
      },
      {
        title: "Tie follow-up scheduling to the account, not to a calendar",
        image: "/site-assets/case-studies/fintech-autonomous/img-06.jpg",
        why: "Follow-up reminders set in a calendar fired with no account context. An analyst would see a reminder, not remember why they had set it, open a separate tool to find the account, and then begin rebuilding context before they could act. Reminders that are disconnected from context are easy to defer. Reminders that open directly into the account with the previous call summary visible are harder to ignore.",
        whatChanged: [
          "Follow-up date and type set as part of call logging, not in a separate step",
          "Follow-up surfaces in the daily worklist at the right time with account context already loaded",
          "Previous call summary visible when the follow-up opens, so no context rebuilding is needed",
        ],
        result: "Post-launch tracking showed a 40% reduction in missed follow-ups. Analysts reported that follow-ups felt easier to complete because the context was already there when they needed to act.",
        tradeOff: "The follow-up system only works well if call logging is completed consistently. If an analyst skips the log, the follow-up has no context. This created a dependency between two parts of the workflow that previously operated independently.",
        businessReasoning: "Missed follow-ups are the most direct cause of extended DSO. An account that falls off the worklist because a follow-up was not set or was ignored is an account that takes longer to collect. Reducing missed follow-ups is the single most direct lever on the metric the business cares about.",
      },
    ],
    closingSections: [
      {
        heading: "How thinking changed during the project",
        paragraphs: [
          "I assumed at the start that the calling experience was the core problem. Analysts were using a separate dialer, which seemed like the obvious friction point. I expected the solution to be primarily about integrating telephony.",
          "Observing analysts working showed something different. The call itself was the part of the workflow they were most comfortable with. The breakdown happened before and after: the scramble to pull up account context before dialling, and the manual write-up and reminder-setting that happened after hanging up.",
          "That shifted my focus from the call to everything surrounding it. Integrating telephony was still important, but it was one piece of a larger problem about context continuity across a three-stage workflow.",
        ],
      },
      {
        heading: "How this scales beyond collections",
        paragraphs: [
          "The pattern that came out of this project, a continuous workflow that carries context through preparation, action, and follow-up, is not specific to AR collections. It applies to any role where someone works through a structured list of accounts or cases, takes an action, and needs to record and schedule a next step.",
          "The AI summary approach is also reusable. The same principle of generating a structured first draft and letting the user confirm rather than create applies to any workflow where note-taking is currently a manual bottleneck.",
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "The most important decision in this project was to observe before designing. I could have assumed the calling friction was the problem, built a solution around it, and shipped something that improved one step without addressing the workflow as a whole. The observation sessions prevented that.",
          "The hardest part of the design was making AI-generated summaries feel trustworthy without feeling authoritative. Analysts needed to see them as a draft to edit, not a record to accept. Getting that framing right in the interface, in the language, in the editability of the content, took more iteration than I expected.",
          "If I were doing this again, I would spend more time with team managers at the start of the project. Their perspective on where variability was costing the business most would have helped me prioritise the logging consistency problem earlier, rather than discovering it through the analyst interviews.",
        ],
      },
    ],
  },
  {
    slug: "sonyliv-ott-subscription",
    title: "Turning a broken subscription funnel into SonyLIV’s biggest revenue lever",
    description:
      "SonyLIV had 350M+ users and a growing content library, but the Android TV subscription flow was haemorrhaging revenue. Users reached the paywall, couldn’t make sense of the plans, and left. I redesigned the entire selection-to-checkout journey for a 10-foot, remote-control interface, and turned a conversion problem into a business win.",
    category: "B2C · OTT",
    readTime: "6 min",
    tags: ["Subscriptions", "Conversion", "Android TV", "10-foot UX"],
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
    platform: "OTT · Android TV · B2C",
    team: "1 Product Designer · 1 PM · 3 Engineers",
    teamBreakdown: [
      { function: "Design", members: "1 Product Designer (me, end-to-end)" },
      { function: "Product", members: "1 PM" },
      { function: "Engineering", members: "3 Engineers" },
    ],
    stats: [
      { value: "+22%", label: "Paid subscriptions vs. prior quarter" },
      { value: "-40%", label: "Checkout drop-off rate" },
      { value: "40%", label: "Faster plan decision-making" },
      { value: "2x", label: "Engagement with plan selection" },
    ],
    tldrProblem:
      "SonyLIV’s Android TV paywall was losing revenue every day, users hit plan selection, couldn’t tell what they were paying for, and left without subscribing.",
    tldrWhatIDid:
      "I rethought the entire flow for a lean-back TV context: rebuilt plan comparison from scratch, collapsed a 5-step funnel to 3, and made pricing scannable with a remote in hand.",
    tldrImpact:
      "Paid subscriptions rose 22% quarter-over-quarter, checkout drop-offs fell 40%, and plan decision time dropped by nearly half.",
    context: [
      {
        heading: "The business problem",
        paragraphs: [
          "SonyLIV was growing fast. The platform had 350M+ registered users, a library expanding with cricket, originals, and international content, and a subscription model that was supposed to monetise that audience. It wasn’t working.",
          "Our Android TV funnel was the worst offender. Session data showed that users who reached the subscription paywall were leaving at a rate that translated to millions of rupees in monthly lost revenue. The problem wasn’t awareness, it wasn’t content, and it wasn’t pricing, it was the moment users had to make a decision about what to buy.",
          "The PM framing was stark: the funnel was technically functional, but functionally broken. We needed to fix it.",
        ],
      },
      {
        heading: "What users were actually experiencing",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-03.jpg",
        paragraphs: [
          "I started with session recordings and ran remote usability sessions with a panel of Android TV users. The same pattern emerged again and again. Users would reach the plan selection screen, slow down, start pressing directional keys back and forth, and eventually back out entirely.",
          "In their own words: “I couldn’t work out what I was actually getting with the more expensive plan” and “I wanted to just click Subscribe but I had to go through too many screens first.”",
          "The plans were presented as a flat list. Feature differences were described in small-print labels that were almost unreadable at TV viewing distance. Pricing per duration was buried. There was no hierarchy, every plan looked equally weighted, which meant users had to do the comparison work themselves, with a remote control, from across the room.",
          "On a mobile touch interface, this might have been manageable. On a 10-foot interface with directional navigation, it created decision paralysis. Every second of uncertainty on a TV is more costly than on a phone, users can’t just quickly re-scan; they have to navigate to re-read.",
        ],
      },
      {
        heading: "The design constraint nobody planned for",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-04.jpg",
        paragraphs: [
          "Android TV is a categorically different medium. Users are seated 8–10 feet from the screen, using a directional remote with 4-way navigation. There’s no tap, no pinch, no scroll-by-thumb. Every interaction is deliberate.",
          "This meant that design patterns borrowed from SonyLIV’s mobile subscription flow, which the team had been working from as a template, were fundamentally wrong for this surface. A 5-tap mobile flow becomes a 15-key-press TV ordeal. Dense comparison tables that feel fine on a phone become walls of text across the room.",
          "My first task was convincing the team that we couldn’t iterate on the existing TV flow, we had to start from the TV context and reason upward from there.",
        ],
      },
    ],
    keyInsight: {
      title: "Confusion isn’t a preference problem, it’s a design problem",
      description:
        "Users weren’t indecisive about subscribing. They were indecisive because the UI made the decision hard. Once we realised the drop-off was confusion-driven (not price-sensitivity), the design direction became obvious: make the right plan obvious at a glance, from 10 feet away.",
      image: "/site-assets/case-studies/sonyliv-ott-subscription/img-05.jpg",
    },
    designPrinciples: [
      "One clear recommendation per screen, never make users compare more than 3 options at once on a TV",
      "Scannable at 10 feet, key information must be readable from the couch without leaning in",
      "Every key press earns its place, if a step doesn’t advance the decision, it doesn’t exist",
      "Surface the value, not the features, lead with what you unlock, not a checklist of what’s included",
    ],
    decisions: [
      {
        title: "Rebuild plan comparison from the TV viewport up",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-06.jpg",
        why: "The existing plan list was a direct port from the mobile UI, flat, text-heavy, with no visual hierarchy. At TV distance, users couldn’t tell the plans apart or understand the value difference.",
        whatChanged: [
          "Redesigned plans as distinct visual cards with a recommended plan visually elevated and pre-selected",
          "Feature differences expressed as benefit statements (‘Watch live cricket on any device’) not capability labels (‘Multi-device streaming’)",
          "Pricing per month shown in large type; annual vs monthly toggle prominent at the top of the screen",
          "Removed 2 plans that had been creating unnecessary choice paralysis, worked with PM to consolidate",
        ],
        result: "Time-on-plan-selection screen dropped by 40%. Directional key activity between plans reduced, indicating users were making decisions faster with less re-scanning.",
      },
      {
        title: "Collapse the funnel from 5 steps to 3",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-02.jpg",
        why: "The original flow was: Plan Selection → Plan Confirmation → Payment Method → Payment Details → Confirmation. Each screen transition on a TV requires a page load. Five pages meant five moments for users to reconsider and bail.",
        whatChanged: [
          "Merged Plan Confirmation into Plan Selection, selecting a plan now shows a summary panel inline, no separate screen",
          "Payment Method and Payment Details combined into a single screen with a tab-style switcher between UPI, card, and net banking",
          "Confirmation screen retained as the only non-mergeable step (receipt + next-steps CTA)",
        ],
        result: "Checkout drop-offs fell 40%. The biggest single drop, between Plan Confirmation and Payment Method, was eliminated by removing the screen entirely.",
      },
      {
        title: "Introduce a recommended plan signal",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-07.jpg",
        why: "Without a clear default, users felt the weight of the decision entirely. Adding a ‘Most Popular’ or recommended signal gives users a socially-validated anchor, particularly important in a lean-back context where the cognitive cost of deliberation is higher.",
        whatChanged: [
          "Added a ‘Most popular’ badge to the mid-tier plan (the plan with highest purchase volume)",
          "Pre-highlighted the recommended plan on page load, remote focus starts there, not at the cheapest option",
          "Visual weight designed so the recommended plan reads as the default, not an upsell trick",
        ],
        result: "Mid-tier plan selection increased by 2x. Users who previously selected the cheapest plan and then upgraded were now committing to the recommended tier on first pass.",
      },
      {
        title: "Handle payment failure in-flow instead of starting over",
        image: "/site-assets/case-studies/sonyliv-ott-subscription/img-01.jpg",
        why: "Session recordings showed a painful pattern: users who hit a UPI or card failure were being dropped back to the plan selection screen. Starting over completely was killing a significant number of nearly-completed purchases.",
        whatChanged: [
          "Payment failure now surfaces inline with a retry prompt and an alternative payment method suggestion, no navigation away from the payment screen",
          "Clear error copy written for each failure type (insufficient funds, wrong UPI PIN, timeout) with specific recovery instructions",
          "Auto-retry for transient failures with a countdown, user doesn’t have to manually retry within 10 seconds",
        ],
        result: "Payment retry success rate improved. A segment of users who previously abandoned after first-attempt payment failure were completing subscriptions on retry.",
      },
    ],
    rejectedConcepts: [
      "A full-screen comparison table with all plans side-by-side, looks clean in Figma, unreadable at TV distance with 9pt labels",
      "Gamified upsell (‘Upgrade now to unlock 4K’) overlay between plan selection and payment, tested as high-pressure and caused distrust in usability sessions",
      "Single-plan ‘smart recommendation’ flow where only the recommended plan is shown and others are hidden, removed too much user agency; felt like the app was hiding options",
      "Persistent side-panel showing plan summary during payment, complex focus management on TV navigation, frequent focus-trap bugs in prototype, removed in favour of a simpler back-navigation pattern",
    ],
    closingSections: [
      {
        heading: "What I’d do differently",
        paragraphs: [
          "The plan consolidation decision, removing two of the original five plans, was the right call, but I’d push for it earlier and harder. We spent two weeks designing for five plans before the PM data confirmed that two of them had combined purchase share below 4%. That’s two weeks of layout work that never shipped.",
          "I also underestimated how differently Android TV users think about payment. Mobile payment flows assume familiarity with UPI and digital wallets. Our TV audience skewed older, with higher rates of net banking preference, and we found this out halfway through engineering, forcing a late-stage redesign of the payment screen. Earlier research specifically scoped to payment behaviour on TV would have caught it.",
        ],
      },
      {
        heading: "What this project taught me about platform-specific design",
        paragraphs: [
          "Every medium has a cognitive tax. Mobile is high attention, high interaction, users expect to tap quickly and get feedback instantly. TV is low attention, low interaction, users expect to make one considered choice per screen, then lean back. The same information architecture that feels appropriately detailed on mobile feels overwhelming on TV.",
          "The lesson isn’t that TV UX needs to be simpler. It’s that simplicity means something different depending on the context in which a decision is made. In a darkened living room with a remote, clarity is the product.",
        ],
      },
    ],
  },

  {
    slug: "sonyliv-search",
    title: "Helping millions find something worth watching faster",
    description:
      "SonyLIV's catalogue kept growing. Search didn't keep up. Users were abandoning searches they should have been able to complete. I redesigned the experience to reduce that friction.",
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
      "Users were abandoning searches they should have been able to complete. The experience punished imperfect queries, gave no help when results were weak, and made live sports nearly impossible to discover quickly.",
    tldrWhatIDid:
      "Redesigned search as a discovery surface, not just a retrieval tool. Added autocomplete, rich suggestions, recent and trending searches, and forgiving query handling, validated through prototypes before any build commitment.",
    tldrImpact:
      "A search experience that works for users who know exactly what they want and for users still figuring it out, across all device tiers in SonyLIV's user base.",
    context: [
      {
        heading: "Business context",
        paragraphs: [
          "SonyLIV serves 350M+ users across movies, TV shows, originals, live sports, and regional content. As the catalogue grew, so did the surface area where search could fail. A user who cannot find what they are looking for does not stay on the platform. They leave.",
          "The business case for search improvement was straightforward: reduce the drop-off between search intent and content found. Every successful search is a session that continues. Every abandoned search is a session that ends.",
        ],
      },
      {
        heading: "Constraints",
        paragraphs: [
          "Live sports content changes by the minute. Match schedules, scores, and availability shift constantly, and search results for sports needed to reflect that without the team having to manually update anything.",
          "The existing search ranking and indexing system was not in scope for this project. Any redesign had to work with the current backend, not require a new one.",
          "SonyLIV's user base spans a wide range of Android devices, including low-end hardware with limited processing power. Autocomplete and suggestions had to be designed to perform consistently, not just on flagships.",
          "Users search in multiple languages and often with inconsistent spelling, partial titles, or actor names instead of show titles. The experience had to handle imperfect input without dead ends.",
          "The catalogue includes content with inconsistent metadata quality. Some titles had rich information, others did not. The design had to degrade gracefully when metadata was thin.",
        ],
      },
      {
        heading: "Research",
        paragraphs: [
          "I reviewed Play Store reviews filtered for search-related complaints, which gave an unfiltered picture of where users were hitting walls: spelling mistakes returning nothing, sports content invisible unless you knew the exact fixture name, and no way to recover from a failed search without starting again.",
          "I looked at internal analytics to understand where in the search flow users were dropping off. The signal was clearest at two points: immediately after typing a query that returned weak results, and when users had to choose between many similarly-presented results with no visual differentiation.",
          "I benchmarked against Netflix, Prime Video, Hotstar, and YouTube to understand how the market was handling the same tensions between retrieval and discovery. The consistent pattern in the stronger experiences was that they treated search as the start of a conversation, not a one-shot lookup.",
          "I also spoke with the customer support team about the most common search-related tickets, which surfaced a category I had not prioritised initially: repeat searches. A meaningful portion of users searched for the same content across multiple sessions, which pointed to a simple fix with high return.",
        ],
      },
      {
        heading: "What research changed",
        paragraphs: [
          "I went into this project assuming the core problem was relevance: the algorithm was surfacing the wrong results, and improving ranking would fix search.",
          "The research contradicted that. Users were not failing because results were irrelevant. They were failing before they got to results at all. Partial titles returned nothing. A misspelling killed the query. Users who did not know a title had no way to browse toward what they wanted.",
          "The problem was not that search was finding the wrong things. It was that search required users to already know what they were looking for. That shifted the entire brief from improving retrieval to enabling discovery.",
        ],
      },
    ],
    opportunity:
      "If users could search with partial information, recover from mistakes without starting over, and browse intelligently when they had no specific title in mind, they would spend less time searching and more time watching. The opportunity was to redesign search as a discovery surface, not just a retrieval tool, without requiring any changes to the backend ranking system.",
    designPrinciples: [
      "Search should forgive imperfect input: a spelling mistake or a partial title should never be a dead end.",
      "Help users discover, not just retrieve: some users know what they want, others are still deciding. The experience should serve both.",
      "Reduce typing wherever possible: suggestions, recent searches, and trending content should do the work so users do not have to.",
      "Surface intent early: autocomplete should reflect what users are likely looking for, not just what matches the characters typed.",
      "Make failure recoverable: a weak result set should offer a next step, not a blank screen.",
      "Design for the device in the user's hand, not the one in the demo: low-end Android performance is part of the brief, not an afterthought.",
    ],
    rejectedConcepts: [
      "A category-first browse approach: I considered leading with genres and content categories rather than a search field, on the basis that many users were exploring rather than retrieving. The problem was that it did not serve users who had a specific title or person in mind, and it added a navigation layer in front of the most-used path into the catalogue.",
      "A personalised search surface showing each user different suggestions based on watch history: the engineering cost was significant and the project timeline did not allow for it. More importantly, personalisation would have addressed discovery for returning users but done nothing for new ones. The higher-leverage fix was improving the base experience for everyone.",
      "Redesigning the results page layout: early explorations changed how results were presented on screen. Testing with prototypes showed that users were not struggling with results layout. They were struggling to reach relevant results at all. Changing the layout did not address the actual abandonment point.",
    ],
    decisions: [
      {
        title: "Add autocomplete that starts helping from the first character",
        image: "/site-assets/case-studies/sonyliv-search/img-04.jpg",
        why: "Analytics showed users were abandoning searches after typing a full query and finding nothing. Autocomplete moves the feedback loop earlier: instead of discovering a dead end after submitting, users can see whether content exists while they are still typing and adjust accordingly.",
        whatChanged: [
          "Autocomplete suggestions appear from the first character",
          "Suggestions include titles, genres, actors, and sports fixtures",
          "Selecting a suggestion bypasses the results page and goes directly to content where possible",
        ],
        result: "Users could course-correct mid-query rather than after a failed submission. The abandonment point moved earlier in the flow, where recovery was easier.",
        tradeOff: "Autocomplete at this level of coverage required close coordination with the engineering team on what the backend could surface in real time without degrading performance on low-end devices.",
        businessReasoning: "Every query that is redirected toward relevant content before submission is a search session that does not end in abandonment. The return on the engineering investment was direct.",
      },
      {
        title: "Surface recent and trending searches on the empty state",
        image: "/site-assets/case-studies/sonyliv-search/img-06.jpg",
        why: "The empty search state was a blank field. It gave users who did not have a specific title in mind nothing to work with. Research had surfaced two patterns: users who repeated the same searches across sessions, and users who were open to watching something trending but had no way to find it from search.",
        whatChanged: [
          "Recent searches shown immediately when search is opened",
          "Trending searches shown below, updated to reflect current viewing patterns",
          "Live sports fixtures surfaced prominently when matches are in progress",
        ],
        result: "The search screen became useful before the user typed anything. Repeat searches were one tap. Discovery for undecided users had a starting point.",
        tradeOff: "Trending content can feel algorithmically imposed if not implemented carefully. The presentation had to feel like helpful context, not a recommendation engine overriding the user's intent.",
        businessReasoning: "Reducing the effort required to find already-known content has a direct effect on return session engagement. A user who opens search and immediately sees what they were looking for last time does not need to think.",
      },
      {
        title: "Show rich results with visual context, not just text titles",
        image: "/site-assets/case-studies/sonyliv-search/img-08.jpg",
        why: "SonyLIV's catalogue includes many titles that users recognise visually but cannot name precisely. A list of text titles required users to read and evaluate each result. Adding thumbnails, content type labels, and brief metadata let users recognise what they were looking for rather than read their way to it.",
        whatChanged: [
          "Results display thumbnail, title, content type, and year at minimum",
          "Sports results show fixture status and scheduled time where available",
          "Content type labels distinguish movies, series, originals, and live events",
        ],
        result: "Users could scan results rather than read them, which reduced the time between submitting a query and starting to watch.",
        tradeOff: "Rich results require consistent metadata. Titles with thin metadata fell back to text-only display, which created some visual inconsistency in mixed result sets.",
        businessReasoning: "Visual recognition is faster than reading for catalogue browsing. Reducing the cognitive cost of evaluating results directly affects whether a search session ends in a watch session.",
      },
      {
        title: "Design for scale across every device in the user base",
        image: "/site-assets/case-studies/sonyliv-search/img-10.jpg",
        why: "SonyLIV's user base is not concentrated on flagship devices. Low-end Android hardware is a significant portion of actual usage. A search experience that performs well on a flagship and degrades badly on entry-level hardware is not a search experience that works for SonyLIV's users.",
        whatChanged: [
          "All interactions and layouts validated across low-end Android, mid-range Android, iOS, and tablet",
          "Autocomplete debounced to avoid performance issues on slower processors",
          "Image loading in results designed to degrade gracefully on slow connections",
        ],
        result: "Consistent search behaviour regardless of device tier. The redesign did not create a two-class experience between newer and older hardware.",
        tradeOff: "Some visual richness available on higher-end devices had to be scaled back to maintain acceptable performance on lower-end ones.",
        businessReasoning: "A redesign that improves search for flagship users while degrading it for low-end users is a net negative at SonyLIV's scale. Consistent performance across the device spectrum was a requirement, not a preference.",
      },
    ],
    closingSections: [
      {
        heading: "How thinking changed during the project",
        paragraphs: [
          "The most significant shift was in how I understood the problem. I started the project expecting to improve search relevance. The research showed that relevance was not where users were failing.",
          "Users were failing before they got to results at all. The barrier was not that results were wrong, it was that the experience required users to already know exactly what they were looking for. A partial title returned nothing. A misspelling killed the query. That is not a ranking problem. That is a design problem.",
          "Reframing the brief from improving retrieval to enabling discovery changed almost every decision that followed. Autocomplete, suggestions, rich results, and the empty state were all consequences of that single shift in understanding.",
        ],
      },
      {
        heading: "How this scales beyond search",
        paragraphs: [
          "The patterns that came out of this project, forgiving input handling, visual recognition over text reading, surfacing context before the user asks for it, are not specific to the search screen.",
          "The same principles apply to any content discovery surface on SonyLIV: the home screen, category pages, and recommendation surfaces. Framing search as a discovery tool rather than a retrieval tool opened up a way of thinking about the whole product that the team carried forward.",
        ],
      },
      {
        heading: "Reflection",
        paragraphs: [
          "The most useful thing this project taught me was to question what problem I was actually solving before designing anything. My initial diagnosis was wrong. The research corrected it. That correction was worth more than any individual design decision that followed.",
          "If I were doing this again, I would involve the engineering team in the constraints conversation earlier. Understanding the limits of what the backend could surface in real time would have let me scope the autocomplete work more accurately from the start, rather than discovering some constraints mid-exploration.",
          "I would also have pushed harder to instrument the search flow before starting design work, so that post-launch we had a clear baseline to measure against. The absence of pre-redesign benchmarks made it harder to quantify exactly what changed.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
