import { Search } from "@/components/Search"

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Black profile picture */}
        <img 
          src="/pfp.jpeg" 
          alt="pfp" 
          className="w-32 h-32 rounded-full object-cover border border-zinc-700"
          loading="eager"
          fetchPriority="high"
          width="128"
          height="128"
        />
        {/* Name and username */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold text-white">avaneesh</span>
          <span className="text-lg text-white">@uvniche</span>
        </div>
        {/* Search */}
        <Search />
      </div>
    </div>
  );
}
