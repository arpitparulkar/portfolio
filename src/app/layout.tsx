import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
