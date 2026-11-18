import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Fraunces,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteTitle = "Think out loud. Then go deep.";
const siteDescription =
  "Writespace brings short Posts and long-form Articles together for developers and technical communities. Join the waitlist for launch updates.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
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
