import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justpaveldesign.com"),
  title: "Pavel - Product Designer and YouTuber",
  description:
    "I'm a London-based Product Designer building AI-first B2B SaaS and high-conversion B2C mobile experiences. I also share design process and AI workflows on YouTube.",
  openGraph: {
    type: "website",
    title: "Pavel - Product Designer and YouTuber",
    description:
      "I'm a London-based Product Designer building AI-first B2B SaaS and high-conversion B2C mobile experiences. I also share design process and AI workflows on YouTube.",
    images: ["/site-assets/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel - Product Designer and YouTuber",
    description:
      "I'm a London-based Product Designer building AI-first B2B SaaS and high-conversion B2C mobile experiences. I also share design process and AI workflows on YouTube.",
    images: ["/site-assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sen.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-(family-name:--font-sen)">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
