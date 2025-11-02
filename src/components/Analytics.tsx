"use client"

import dynamic from "next/dynamic";

// Lazy load analytics to improve FCP - these load after hydration
const VercelAnalytics = dynamic(() => import("@vercel/analytics/react").then(mod => ({ default: mod.Analytics })), { ssr: false });
const VercelSpeedInsights = dynamic(() => import("@vercel/speed-insights/react").then(mod => ({ default: mod.SpeedInsights })), { ssr: false });

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
    </>
  );
}

