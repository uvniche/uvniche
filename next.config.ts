import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Optimize for edge deployment
  trailingSlash: false,
  
  // Enable React optimizations
  reactStrictMode: true,
  
};

export default nextConfig;
