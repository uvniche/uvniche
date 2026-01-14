import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.12.97"],
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@vercel/analytics', '@vercel/speed-insights', 'cmdk'],
    scrollRestoration: true,
    optimizeServerReact: true,
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
  },
  
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  
  // Turbopack configuration (moved from deprecated experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Server external packages (moved from experimental)
  serverExternalPackages: [],
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [96, 128, 256, 384, 640, 750, 828],
    imageSizes: [16, 32, 48, 64, 96],
    qualities: [75, 90], // Configure allowed quality values
    // Optimize for faster loading
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
    remotePatterns: [],
  },
  
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Optimize for edge deployment
  trailingSlash: false,
  
  // Enable React optimizations
  reactStrictMode: true,
  
  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-Preload',
            value: 'prefetch'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
