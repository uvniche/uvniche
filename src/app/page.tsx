"use client"

import { Search } from "@/components/Search";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            whileHover={{ 
              scale: 1.01,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.15
              }
            }}
            whileTap={{ 
              scale: 0.99,
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.1
              }
            }}
            className="cursor-pointer"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-border bg-muted">
              <Image
                src="/pfp.jpeg"
                alt="Profile Picture"
                width={96}
                height={96}
                sizes="96px"
                quality={80}
                placeholder="empty"
              />
            </div>
          </motion.div>
          
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
