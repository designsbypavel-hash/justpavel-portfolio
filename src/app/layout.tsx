import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarfieldBackground from "@/components/StarfieldBackground";
import JarvisChat from "@/components/JarvisChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justpaveldesign.com"),
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white" style={{ fontFamily: "'Google Sans Flex', 'Google Sans', system-ui, sans-serif" }}>
        <StarfieldBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <JarvisChat />
      </body>
    </html>
  );
}
