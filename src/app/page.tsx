import ProfileImage from "@/components/ProfileImage";
import { Search } from "@/components/Search";
import { Mail } from "lucide-react";

// Fully static HTML + CDN cache for best TTFB/FCP
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="size-full min-h-full relative flex items-center justify-center p-4">
      {/* Top right corner email */}
      <a
        href="mailto:uvniche@gmail.com"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 flex items-center justify-center size-10 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm text-foreground"
        aria-label="Email uvniche@gmail.com"
        title="uvniche@gmail.com"
      >
        <Mail className="size-5 shrink-0" aria-hidden="true" />
      </a>

      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <ProfileImage />
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold profile-title">avaneesh</h1>
            <p className="text-base text-primary profile-subtitle">@uvniche</p>
          </div>
        </div>

        {/* Search Links Section */}
        <div className="w-56 max-w-full">
          <Search />
        </div>
      </div>
    </div>
  );
}
