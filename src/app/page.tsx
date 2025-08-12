import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/profile-picture.svg" alt="Profile Picture" />
            <AvatarFallback className="bg-gray-800 text-white text-2xl">
              PF
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">avaneesh</h1>
            <p className="text-gray-400">@uvniche</p>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              🐙 GitHub
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="mailto:your.email@example.com">
              ✉️ Email
            </a>
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-200 font-medium rounded-xl"
            asChild
          >
            <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
              🌐 Website
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
