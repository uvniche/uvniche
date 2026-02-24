"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Heavy search UI (framer-motion, cmdk, lucide) is only loaded
// after the user explicitly activates it, instead of on idle.
const Search = dynamic(
  () => import("@/components/Search").then((m) => ({ default: m.Search })),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full search-container">
        <div className="w-full rounded-lg border shadow-md h-9 bg-popover/50 animate-pulse" />
      </div>
    ),
  }
);

const InactiveSearch = ({ onActivate }: { onActivate: () => void }) => (
  <button
    type="button"
    onClick={onActivate}
    className="relative w-full search-container"
    aria-label="Open search links"
  >
    <div className="w-full rounded-lg border shadow-md h-9 bg-popover/50 flex items-center px-3 text-sm text-muted-foreground">
      Search links
    </div>
  </button>
);

export default function DeferredSearch() {
  const [activated, setActivated] = useState(false);

  if (!activated) {
    return <InactiveSearch onActivate={() => setActivated(true)} />;
  }

  return <Search />;
}
