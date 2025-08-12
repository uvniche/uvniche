"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialLinksSearch } from "@/components/Search";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -2,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.2
              }
            }}
            whileTap={{ 
              scale: 0.98,
              y: -1,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                duration: 0.1
              }
            }}
            className="cursor-pointer"
          >
            <Avatar className="w-24 h-24 border-2 border-border">
              <AvatarImage src="/pfp.jpeg" alt="Profile Picture" />
              <AvatarFallback className="bg-transparent text-transparent">
                PF
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">avaneesh</h1>
            <p className="text-primary">@uvniche</p>
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
