"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileImage() {
  return (
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
          src="/pfp.avif"
          alt=""
          width={96}
          height={96}
          sizes="96px"
          quality={75}
          priority={true}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </motion.div>
  );
}
