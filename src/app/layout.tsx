import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { config } from "@/lib/config";
import "./globals.css";

// Use edge runtime for faster responses
export const runtime = 'edge';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black h-full overflow-hidden">
      <head>
        {/* Performance optimizations */}
        <link rel="preload" as="image" href="/pfp.jpeg" fetchPriority="high" />
        <link rel="preload" href="/pfp.jpeg" as="image" type="image/jpeg" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//instagram.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//tiktok.com" />
        <link rel="dns-prefetch" href="//twitter.com" />
        <link rel="dns-prefetch" href="//youtube.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://instagram.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        <link rel="preconnect" href="https://tiktok.com" />
        <link rel="preconnect" href="https://twitter.com" />
        <link rel="preconnect" href="https://youtube.com" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="none" />
        <meta name="robots" content="index, follow" />
        <meta name="referrer" content="no-referrer" />
        <meta name="X-UA-Compatible" content="IE=edge" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-black h-full overflow-hidden flex items-center justify-center`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
