import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yayin Kuthiala | 13 y/o Founder",
  description: "I’m a 13-year-old student building real products like Flux. Exploring full-stack development, UI/UX, cybersecurity, and entrepreneurship.",
  icons: {
    icon: "/logo.png",
  },
};

import { MouseFollower } from "@/components/ui/MouseFollower";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
