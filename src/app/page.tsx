"use client"

import nextDynamic from "next/dynamic";

const SocialLinksSearch = nextDynamic(
  () => import("@/components/Search").then(m => ({ default: m.SocialLinksSearch })),
  { ssr: false }
);
import { motion } from "framer-motion";
import Image from "next/image";

// Force static generation for better performance
export const dynamic = 'force-static';
export const runtime = 'edge';

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
                priority
                fetchPriority="high"
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                loading="eager"
              />
            </div>
          </motion.div>
          
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold profile-title">avaneesh</h1>
            <p className="text-primary profile-subtitle">@uvniche</p>
          </div>
        </div>

        {/* Search Links Section */}
        <div className="w-full min-h-[3rem]">
          <SocialLinksSearch />
        </div>
      </div>
    </div>
  );
}
