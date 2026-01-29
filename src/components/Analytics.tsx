"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VercelAnalytics = dynamic(() => import("@vercel/analytics/react").then(mod => ({ default: mod.Analytics })), { ssr: false });
const VercelSpeedInsights = dynamic(() => import("@vercel/speed-insights/react").then(mod => ({ default: mod.SpeedInsights })), { ssr: false });

// Defer analytics until after page is interactive + idle so they don't compete with FCP/LCP
export function Analytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 2000);
    }
  }, []);

  if (!ready) return null;
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
    </>
  );
}

