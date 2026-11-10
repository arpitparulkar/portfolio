import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Big_Shoulders({
  weight: ["800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const serifFont = Instrument_Serif({
  style: ["normal", "italic"],
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arpit Parulkar — AI Engineer & Web Developer",
  description:
    "The portfolio of Arpit Parulkar, an AI engineer and web developer in Mumbai building thoughtful digital experiences.",
  applicationName: "Arpit Parulkar Portfolio",
  keywords: [
    "Arpit Parulkar",
    "AI Engineer",
    "Web Developer",
    "Portfolio",
    "Mumbai",
  ],
  openGraph: {
    title: "Arpit Parulkar — AI Engineer & Web Developer",
    description:
      "Building thoughtful digital experiences at the intersection of AI and the web.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${serifFont.variable} ${monoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
