import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { config } from "@/lib/config";
import "./globals.css";

// Run entire app on Edge to avoid Node cold starts and reduce TTFB
export const runtime = "edge";

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
        url: "/pfp.webp",
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
    images: ["/pfp.webp"],
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
        {/* Connection hints so the browser can warm up the main origin ASAP */}
        <link rel="preconnect" href="https://uvniche.com" />
        <link rel="dns-prefetch" href="//uvniche.com" />

        {/* Critical CSS for instant FCP - keeps initial layout stable before full stylesheet loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background:#000;
                margin:0;
                padding:0;
                height:100%;
                min-height:100vh;
                font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',arial,sans-serif;
                -webkit-font-smoothing:antialiased;
                -moz-osx-font-smoothing:grayscale;
                overflow:hidden;
              }
              body {
                display:flex;
                justify-content:center;
                align-items:center;
                position:fixed;
                width:100%;
              }
              #__next {
                background:#000;
                min-height:100%;
                width:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                position:relative;
              }
              h1, h2, h3, h4, h5, h6, p {
                min-height:1em;
                margin:0;
              }
              .profile-title {
                line-height:1.2;
                height:2.4rem;
                margin:0;
              }
              .profile-subtitle {
                line-height:1.5;
                height:1.5rem;
                margin:0;
              }
              .search-container {
                contain:layout;
              }
              img {
                max-width:100%;
                height:auto;
                display:block;
                image-rendering:-webkit-optimize-contrast;
              }
            `,
          }}
        />
        {/* Self-hosted Inter font CSS inlined to avoid extra render-blocking request */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/inter-latin-400.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }

              @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/inter-latin-700.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
            `,
          }}
        />
        {/* Favicon configuration */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preload LCP image first; only primary font to avoid competing with image */}
        <link rel="preload" as="image" href="/pfp.avif" fetchPriority="high" type="image/avif" />
        <link rel="preload" as="font" href="/fonts/inter-latin-400.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/inter-latin-700.woff2" type="font/woff2" crossOrigin="anonymous" fetchPriority="low" />
        
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        
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
                "https://youtube.com/@uvniche"
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
        
        {/* Deferred scripts - load after page is interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function initVH(){document.documentElement.style.setProperty('--vh',window.innerHeight*0.01+'px')}
                function initSW(){if('serviceWorker'in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){})}}
                if(document.readyState==='complete'){initVH();initSW()}else{window.addEventListener('load',function(){initVH();initSW();window.addEventListener('resize',initVH)})}
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
