import dynamic from "next/dynamic";
import Image from "next/image";

// Lazy load Search component - it's not needed for initial render
const Search = dynamic(() => import("@/components/Search").then(mod => ({ default: mod.Search })), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <div className="rounded-lg border shadow-md w-full h-9 animate-pulse bg-muted/50" />
    </div>
  )
});

// Lazy load motion components for profile animation - defer heavy animation library
const ProfileImage = dynamic(() => import("@/components/ProfileImage"), {
  ssr: true,
  loading: () => (
    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted">
      <Image
        src="/pfp.avif"
        alt=""
        width={96}
        height={96}
        sizes="96px"
        quality={90}
        priority={true}
      />
    </div>
  )
});

// Enable static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

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
