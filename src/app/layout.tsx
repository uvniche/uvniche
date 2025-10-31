import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    <html lang="en" className="dark bg-black overflow-hidden" suppressHydrationWarning>
      <head>
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Performance optimizations */}
        <link rel="preload" as="image" href="/pfp.jpeg" fetchPriority="high" type="image/jpeg" />
        <link rel="preload" as="font" href="/fonts/inter-latin-400.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/inter-latin-700.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* DNS prefetch only for Vercel analytics - removed social media preconnects */}
        <link rel="dns-prefetch" href="//vercel.com" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="robots" content="index, follow" />
        <meta name="referrer" content="no-referrer" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        
        {/* Viewport height calculation for mobile browsers */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setVH() {
                  const vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', vh + 'px');
                }
                setVH();
                window.addEventListener('resize', setVH);
                window.addEventListener('orientationchange', setVH);
              })();
            `
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
        className="font-sans antialiased bg-black overflow-hidden flex items-center justify-center"
        style={{ 
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, arial, sans-serif',
          '--font-inter': 'Inter, system-ui, sans-serif',
          '--font-geist-mono': 'Geist Mono, monospace'
        } as React.CSSProperties}
      >
        {children}
        
        {/* Load analytics after page is interactive */}
        <Script
          src="https://va.vercel-scripts.com/v1/script.debug.js"
          strategy="afterInteractive"
          data-endpoint="/api/_vercel/insights"
        />
        <Script
          src="https://va.vercel-scripts.com/v1/speed-insights/script.debug.js"
          strategy="afterInteractive"
          data-endpoint="/api/_vercel/speed-insights"
        />
      </body>
    </html>
  );
}
