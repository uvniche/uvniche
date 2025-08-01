import { Search } from "@/components/Search"

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Black profile picture */}
        <div className="w-20 h-20 rounded-full bg-black" />
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
