import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex items-center gap-6">
        {/* Black profile picture */}
        <div className="w-20 h-20 rounded-full bg-black" />
        {/* Name and username */}
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">avaneesh</span>
          <span className="text-muted-foreground text-lg">@uvniche</span>
        </div>
      </div>
    </div>
  );
}
