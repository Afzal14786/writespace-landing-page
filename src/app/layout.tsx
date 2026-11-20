import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/content/site";
import { assets } from "@/lib/assets";
import "./globals.css";

/*
 * Keep font weights limited to the design system's required range.
 * next/font self-hosts the fonts and avoids a layout shift from external loading.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

/*
 * Derive metadata from the centralized site content so the browser title
 * and description stay aligned with the landing page's main message.
 */
const siteTitle = `${site.hero.headline.firstLine} ${site.hero.headline.secondLinePrefix}${site.hero.headline.highlightedPhrase}`;
const siteDescription = site.hero.description;

export const metadata: Metadata = {
  title: `${siteTitle} | Writespace`,
  description: siteDescription,

  icons: {
    icon: [
      {
        url: assets.brand.favicon.src,
        type: "image/svg+xml",
      },
      {
        url: assets.brand.favicon32.src,
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: [
      {
        url: assets.brand.appleTouchIcon.src,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: "Writespace",
    images: [
      {
        url: assets.social.openGraph.src,
        width: assets.social.openGraph.width,
        height: assets.social.openGraph.height,
        alt: assets.social.openGraph.alt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [assets.social.openGraph.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-screen bg-paper font-copy text-body antialiased">
        {children}
      </body>
    </html>
  );
}
