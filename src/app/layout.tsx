import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { config } from "@/lib/config";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: "avaneesh",
  description: "@uvniche",   // ✅ clean, no newline
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
    icon: [
      { url: "/favicon.ico", sizes: "16x16 24x24 32x32 48x48 64x64 128x128 256x256", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "320x320", type: "image/png" }
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
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
    <html lang="en" className="dark bg-black" suppressHydrationWarning>
      <head>
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Performance optimizations */}
        <link rel="preload" as="font" href="/fonts/inter-latin-400.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/inter-latin-700.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/pfp.jpeg" fetchPriority="high" type="image/jpeg" />
        
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        
        {/* Viewport height calculation for mobile browsers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.setProperty('--vh',\`\${window.innerHeight*0.01}px\`);window.addEventListener('resize',()=>document.documentElement.style.setProperty('--vh',\`\${window.innerHeight*0.01}px\`));`
          }}
        />
        
        {/* Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "@uvniche",
              "url": "https://uvniche.com",
              "logo": "https://uvniche.com/favicon.png",
              "sameAs": [
                "https://instagram.com/uvniche",
                "https://twitter.com/uvniche",
                "https://github.com/uvniche",
                "https://linkedin.com/in/uvniche",
                "https://youtube.com/@uvniche",
                "https://tiktok.com/@uvniche"
              ]
            })
          }}
        />
      </head>
      <body
        className="font-sans antialiased bg-black"
        style={{ 
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, arial, sans-serif',
          '--font-inter': 'Inter, system-ui, sans-serif',
          '--font-geist-mono': 'Geist Mono, monospace'
        } as React.CSSProperties}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
