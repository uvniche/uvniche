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
        <meta property="og:title" content="avaneesh" />
        <meta property="og:description" content="@uvniche" />
        <meta property="og:image" content="https://www.uvniche.com/pfp.jpeg" />
        <link rel="icon" href="/pfp-circle.png" type="image/png" />
        <link rel="apple-touch-icon" href="/window.svg" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
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
