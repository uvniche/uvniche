"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Github,
  Instagram,
  Twitter,
  Music,
  Linkedin,
  Youtube,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/uvniche",
  },
  {
    name: "Instagram", 
    icon: Instagram,
    url: "https://instagram.com/uvniche",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/uvniche",
  },
  {
    name: "TikTok",
    icon: Music,
    url: "https://tiktok.com/@uvniche",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/uvniche",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@uvniche",
  },
]

// Animation variants for smooth transitions
const containerVariants: Variants = {
  expanded: {
    scale: 1,
    transition: {
      duration: 0.15,
      ease: [0.4, 0.0, 0.2, 1], // Apple's standard easing
    }
  },
  collapsed: {
    scale: 1,
    transition: {
      duration: 0.1,
      ease: [0.4, 0.0, 0.2, 1],
    }
  }
}

const listVariants: Variants = {
  expanded: {
    height: "auto",
    opacity: 1,
    marginTop: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08, // Slower stagger for better visual effect
      delayChildren: 0.1, // Delay children until container animation starts
    }
  },
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.03,
      staggerDirection: -1, // Reverse stagger on collapse
    }
  }
}

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 600,
      mass: 0.6,
    }
  },
  collapsed: {
    opacity: 0,
    scale: 0.88,
    y: 12,
    transition: {
      duration: 0.08,
      ease: [0.4, 0.0, 1, 1], // Apple's ease-out
    }
  }
}

export function SocialLinksSearch() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative w-full">
      <motion.div
        className="group w-full"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onTouchStart={() => setIsExpanded(true)}
        variants={containerVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        initial="collapsed"
      >
        <Command className="rounded-lg border shadow-md w-full">
          {/* Search Input - Always visible and maintains layout */}
          <CommandInput 
            placeholder="Search" 
            onFocus={() => setIsExpanded(true)}
            className="transition-all duration-300 ease-out"
          />
          
          {/* Dropdown - Absolutely positioned to not affect layout */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={listVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="absolute top-full left-0 w-full z-50 mt-1 bg-popover rounded-lg border shadow-md overflow-hidden"
                style={{ transformOrigin: "top" }}
              >
                <CommandList className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                  <CommandGroup>
                    {socialLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                        custom={index}
                      >
                        <CommandItem 
                          onSelect={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                          className="cursor-pointer"
                        >
                          <link.icon />
                          <span>{link.name}</span>
                        </CommandItem>
                      </motion.div>
                    ))}
                  </CommandGroup>
                </CommandList>
              </motion.div>
            )}
          </AnimatePresence>
        </Command>
      </motion.div>
    </div>
  )
}
