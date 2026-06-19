import type { NextConfig } from "next";
import path from "node:path";

const nextModernPolyfills = path.resolve(
  process.cwd(),
  "node_modules/next/dist/build/polyfills/polyfill-module.js"
);
const projectPolyfills = path.resolve(
  process.cwd(),
  "src/lib/browser-polyfills.ts"
);

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (!isServer) {
      // Next injects fallback implementations for browsers older than the
      // versions supported by this project. Excluding that internal module
      // prevents those fallbacks from entering every modern client bundle.
      config.resolve.alias[nextModernPolyfills] = projectPolyfills;
    }

    return config;
  },

  // Performance optimizations
  experimental: {
    // The site has one small global stylesheet. Inline it so first paint does
    // not wait for a separate render-blocking CSS request.
    inlineCss: true,
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@vercel/analytics',
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
