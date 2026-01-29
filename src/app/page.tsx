import dynamic from "next/dynamic";
import ProfileImage from "@/components/ProfileImage";

// Lazy-load Search (framer-motion, cmdk, lucide) so initial JS bundle is smaller
const Search = dynamic(() => import("@/components/Search").then((m) => ({ default: m.Search })), {
  ssr: true,
  loading: () => (
    <div className="relative w-full search-container">
      <div className="w-full rounded-lg border shadow-md h-9 bg-popover/50 animate-pulse" />
    </div>
  ),
});

// Enable ISR with 1-hour revalidation for optimal performance
export const revalidate = 3600;

export default function Home() {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <ProfileImage />
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold profile-title">avaneesh</h1>
            <p className="text-primary profile-subtitle">@uvniche</p>
          </div>
        </div>

        {/* Search Links Section */}
        <div className="w-full">
          <Search />
        </div>
      </div>
    </div>
  );
}
