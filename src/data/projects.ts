export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "enterprise-ai-control-layer",
    title: "Designing the control layer for enterprise AI agents",
    description:
      "Platform enabling enterprise teams to validate AI before deployment against their own scenarios, without engineering support.",
    category: "B2B SaaS",
    tags: ["AI", "Enterprise", "Validation", "Governance"],
    image: "/site-assets/ai-control-layer.png",
    problem:
      "Enterprise teams had the AI. They had no way to validate it before go-live — not against their own scenarios, not without engineering.",
    approach:
      "Designed a self-serve playground where non-technical teams could write instructions, test assistant behavior against real scenarios, and iterate without filing engineering tickets.",
    outcome:
      "Teams could validate and ship AI assistant changes independently, cutting the validation cycle from weeks of engineering back-and-forth to same-day testing.",
  },
  {
    slug: "sonyliv-payments-checkout",
    title: "B2C Payments Checkout — SonyLIV",
    description: "Reduce drop-offs and increase successful checkouts (UPI-first, failure-recovery).",
    category: "B2C Mobile",
    tags: ["Payments", "Checkout", "Conversion Optimization"],
    image: "/site-assets/sonyliv-checkout.jpg",
    problem:
      "A large share of subscription purchases were failing or being abandoned at the payment step, with UPI users hit hardest by silent failures.",
    approach:
      "Redesigned the checkout flow to lead with UPI as the primary payment method, added clear failure states, and built a recovery flow that re-engaged users after a failed attempt.",
    outcome: "Reduced payment drop-offs and increased successful checkout completion across UPI users.",
  },
  {
    slug: "ai-fintech-collections",
    title: "AI Fintech Collections (B2B SaaS)",
    description: "Faster decision-making and fewer missed follow-ups with AI-assisted workflows.",
    category: "B2B SaaS",
    tags: ["AI", "Fintech", "Collections", "Workflow"],
    image: "/site-assets/ai-fintech-collections.jpg",
    problem:
      "Collections agents managed hundreds of accounts manually, with no prioritization, leading to missed follow-ups and slow decisions.",
    approach:
      "Built an AI-assisted worklist that prioritizes accounts by risk and aging, paired with an in-context assistant that surfaces next actions and drafts outreach.",
    outcome: "Faster decision-making and fewer missed follow-ups across collections operations.",
  },
  {
    slug: "sonyliv-subscription-growth",
    title: "B2C Subscription Growth — SonyLIV",
    description:
      "Subscription journey overhaul emphasizing plan transparency to lower abandonment and boost conversion rates.",
    category: "B2C Mobile",
    tags: ["Subscriptions", "Conversion", "UX"],
    image: "/site-assets/sonyliv-subscription.jpg",
    problem:
      "Users abandoned the subscription flow when plan comparisons were unclear, particularly across multiple pricing tiers and durations.",
    approach:
      "Rebuilt the plan-selection screen with a clear feature comparison table and transparent pricing across durations, reducing the cognitive load of choosing a plan.",
    outcome: "Lower abandonment in the subscription flow and improved conversion across plan tiers.",
  },
  {
    slug: "ott-search-discovery",
    title: "OTT Search & Discovery (Mobile)",
    description: "Mobile search interface enabling faster content discovery and playback at scale.",
    category: "B2C Mobile",
    tags: ["Search", "Discovery", "Streaming"],
    image: "/site-assets/sonyliv-search.jpg",
    problem:
      "Users struggled to find specific shows and movies quickly across a large content catalog, leading to drop-off before playback.",
    approach:
      "Designed a search experience with popular categories, trending searches, and visual content cards to help users land on playback faster.",
    outcome: "Faster content discovery and playback at scale across the catalog.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
