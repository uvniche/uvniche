import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.12.97"],
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'cmdk'
    ],
    scrollRestoration: true,
    optimizeServerReact: true,
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    optimizeCss: true,
  },
  
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
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
  
};

export default nextConfig;
