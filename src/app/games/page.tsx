import type { Metadata } from "next";
import GamesFrame from "@/components/GamesFrame";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Glow Rush, a tiny 2-3 minute game built and designed by Pavel Mondal. Collect light, build combos, and watch the world brighten.",
  alternates: { canonical: "https://www.justpaveldesign.com/games" },
  openGraph: {
    title: "Glow Rush, a game by Pavel Mondal",
    description: "A tiny game for a lighter moment. Play it right here.",
    url: "https://www.justpaveldesign.com/games",
    images: [{ url: "https://www.justpaveldesign.com/site-assets/og-image.png", width: 1200, height: 630 }],
  },
};

export default function GamesPage() {
  return <GamesFrame />;
}
