import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialLinksSearch } from "@/components/Search";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border border-border">
            <AvatarImage src="/pfp.jpeg" alt="Profile Picture" />
            <AvatarFallback className="bg-transparent text-transparent">
              PF
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">avaneesh</h1>
            <p className="text-gray-400">@uvniche</p>
          </div>
        </div>

        {/* Search Links Section */}
        <div className="w-full max-w-md">
          <SocialLinksSearch />
        </div>
      </div>
    </div>
  );
}
