import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Use edge runtime for faster responses
export const runtime = 'edge';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? "https://uvniche.com" : "http://localhost:3000"),
  title: "avaneesh",
  description: "@uvniche",
  openGraph: {
    title: "avaneesh",
    description: "@uvniche",
    url: "https://uvniche.com",
    siteName: "avaneesh",
    images: [
      {
        url: "/pfp.jpeg",
        width: 400,
        height: 400,
        alt: "avaneesh profile picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "avaneesh",
    description: "@uvniche",
    images: ["/pfp.jpeg"],
  },
  icons: {
    icon: "/pfp.jpeg",
    apple: "/pfp.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black h-full overflow-hidden">
      <head>
        <link rel="preload" as="image" href="/pfp.jpeg" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-black h-full overflow-hidden`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
