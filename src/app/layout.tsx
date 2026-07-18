import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarfieldBackground from "@/components/StarfieldBackground";
import JarvisChat from "@/components/JarvisChat";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justpaveldesign.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: "Pavel Mondal, Senior Product Designer, London",
    template: "%s | Pavel Mondal",
  },
  description:
    "Senior Product Designer in London specialising in AI-first B2B SaaS and high-conversion B2C mobile experiences. 8 years across enterprise and consumer products.",
  keywords: [
    "Product Designer London",
    "UX Designer London",
    "Senior Product Designer",
    "AI product design",
    "B2B SaaS design",
    "mobile UX design",
    "Pavel Mondal",
  ],
  authors: [{ name: "Pavel Mondal", url: "https://www.justpaveldesign.com" }],
  creator: "Pavel Mondal",
  openGraph: {
    type: "website",
    url: "https://www.justpaveldesign.com",
    siteName: "Pavel Mondal, Product Designer",
    title: "Pavel Mondal, Senior Product Designer, London",
    description:
      "Senior Product Designer in London specialising in AI-first B2B SaaS and high-conversion B2C mobile experiences. 8 years across enterprise and consumer products.",
    images: [
      {
        url: "https://www.justpaveldesign.com/site-assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pavel Mondal, Senior Product Designer, London",
      },
    ],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel Mondal, Senior Product Designer, London",
    description:
      "Senior Product Designer in London specialising in AI-first B2B SaaS and high-conversion B2C mobile experiences.",
    images: ["https://www.justpaveldesign.com/site-assets/og-image.png"],
    creator: "@justpaveldesign",
  },
  alternates: {
    canonical: "https://www.justpaveldesign.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@100..900&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of wrong theme on first load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pavel Mondal",
              url: "https://www.justpaveldesign.com",
              jobTitle: "Senior Product Designer",
              description:
                "Senior Product Designer in London specialising in AI-first B2B SaaS and high-conversion B2C mobile experiences.",
              address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
              sameAs: [
                "https://www.youtube.com/@justpaveldesign",
                "https://adplist.org/mentors/pavel-mondal",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white" style={{ fontFamily: "'Google Sans Flex', 'Google Sans', system-ui, sans-serif", fontWeight: 450 }}>
        <ThemeProvider>
          <StarfieldBackground />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <JarvisChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
