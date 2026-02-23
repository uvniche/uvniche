"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Chunk (framer-motion, cmdk, lucide) loads only after idle so FCP/LCP aren’t delayed
const Search = dynamic(() => import("@/components/Search").then((m) => ({ default: m.Search })), {
  ssr: false,
  loading: () => (
    <div className="relative w-full search-container">
      <div className="w-full rounded-lg border shadow-md h-9 bg-popover/50 animate-pulse" />
    </div>
  ),
});

const Placeholder = () => (
  <div className="relative w-full search-container">
    <div className="w-full rounded-lg border shadow-md h-9 bg-popover/50 animate-pulse" />
  </div>
);

export default function DeferredSearch() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 1500);
    }
  }, []);

  if (!ready) return <Placeholder />;
  return <Search />;
}
