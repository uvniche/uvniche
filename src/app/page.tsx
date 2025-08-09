"use client"

import { Search } from "@/components/Search"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col items-center gap-6">
        {/* Profile picture optimized with Next.js Image */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <Image 
            src="/pfp.jpeg" 
            alt="pfp" 
            className="w-32 h-32 rounded-full object-cover border border-zinc-700"
            priority
            width={128}
            height={128}
          />
        </motion.div>
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
