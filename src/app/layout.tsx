import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.justpaveldesign.com"),
  title: "Pavel | Product Designer in London",
  description:
    "Senior Product Designer in London building AI-first B2B SaaS and high-conversion B2C mobile experiences, case studies, process, and measurable impact.",
  openGraph: {
    type: "website",
    title: "Pavel | Product Designer in London",
    description:
      "Senior Product Designer in London building AI-first B2B SaaS and high-conversion B2C mobile experiences, case studies, process, and measurable impact.",
    images: ["/site-assets/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel | Product Designer in London",
    description:
      "Senior Product Designer in London building AI-first B2B SaaS and high-conversion B2C mobile experiences, case studies, process, and measurable impact.",
    images: ["/site-assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-(family-name:--font-inter)">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
