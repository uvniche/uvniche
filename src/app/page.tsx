import ProfileImage from "@/components/ProfileImage";
import DeferredSearch from "@/components/DeferredSearch";

// Edge runtime: no Node cold start, response from edge → lower TTFB
export const runtime = "edge";

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
          <DeferredSearch />
        </div>
      </div>
    </div>
  );
}
