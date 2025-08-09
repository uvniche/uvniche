import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "avaneesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta property="og:title" content="avaneesh" />
        <meta property="og:description" content="@uvniche" />
        <meta property="og:image" content="https://www.uvniche.com/pfp.jpeg" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/window.svg" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ 
          fontFamily: 'var(--font-inter), sans-serif',
          overscrollBehavior: 'none',
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
          height: '100%'
        }}
      >
        {children}
        {/* Vercel Speed Insights */}
        <SpeedInsights />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
