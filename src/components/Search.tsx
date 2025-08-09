"use client"

import * as React from "react"
import { Search as SearchIcon, Github, Instagram, Linkedin, Video, Twitter, Youtube } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight"

const socialLinks = [

  {
    name: "GitHub",
    url: "https://github.com/uvniche",
    icon: Github
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/uvniche/",
    icon: Instagram
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/uvniche/",
    icon: Linkedin
  },

  {
    name: "TikTok",
    url: "https://www.tiktok.com/@uvniche",
    icon: Video
  },
  {
    name: "Twitter",
    url: "https://x.com/uvniche",
    icon: Twitter
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@uvniche",
    icon: Youtube
  },
]

interface SearchProps {
  /** Maximum height of the search dropdown in pixels (default: 256) */
  maxDropdownHeight?: number
  /** Minimum height of the search dropdown in pixels (default: 120) */
  minDropdownHeight?: number
  /** Buffer space from bottom of viewport in pixels (default: 20) */
  bottomBuffer?: number
  /** Keyboard detection options */
  keyboardOptions?: Parameters<typeof useKeyboardHeight>[0]
}

export function Search({
  maxDropdownHeight = 256, // 16rem
  minDropdownHeight = 120,
  bottomBuffer = 20,
  keyboardOptions
}: SearchProps = {}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [maxHeight, setMaxHeight] = React.useState(maxDropdownHeight)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const { keyboardHeight, isKeyboardOpen } = useKeyboardHeight(keyboardOptions)

  const filteredLinks = socialLinks.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset selected index when search changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 300) // 300ms delay
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredLinks.length > 0) {
      e.preventDefault()
      handleLinkClick(filteredLinks[selectedIndex].url)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredLinks.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    }
  }

  React.useEffect(() => {
    const calculateMaxHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        let viewportHeight = window.innerHeight
        
        // If keyboard is open, subtract keyboard height from available space
        if (isKeyboardOpen && keyboardHeight > 0) {
          viewportHeight = viewportHeight - keyboardHeight
        }
        
        const availableSpace = viewportHeight - rect.bottom - bottomBuffer
        const maxAllowed = Math.min(maxDropdownHeight, availableSpace)
        setMaxHeight(Math.max(minDropdownHeight, maxAllowed))
      }
    }

    if (isOpen) {
      calculateMaxHeight()
      window.addEventListener('resize', calculateMaxHeight)
      return () => window.removeEventListener('resize', calculateMaxHeight)
    }
  }, [isOpen, isKeyboardOpen, keyboardHeight, maxDropdownHeight, minDropdownHeight, bottomBuffer])

  // Recalculate height immediately when keyboard state changes
  React.useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      let viewportHeight = window.innerHeight
      
      if (isKeyboardOpen && keyboardHeight > 0) {
        viewportHeight = viewportHeight - keyboardHeight
      }
      
      const availableSpace = viewportHeight - rect.bottom - bottomBuffer
      const maxAllowed = Math.min(maxDropdownHeight, availableSpace)
      setMaxHeight(Math.max(minDropdownHeight, maxAllowed))
    }
  }, [isKeyboardOpen, keyboardHeight, isOpen, maxDropdownHeight, minDropdownHeight, bottomBuffer])

  return (
    <div 
      ref={containerRef}
      className="w-64 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Search Input */}
      <motion.div 
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <SearchIcon className="h-4 w-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-zinc-100 text-base placeholder-zinc-500 outline-none"
        />
      </motion.div>

      {/* Links List - Only show when hovered, focused, or has search content AND there are results */}
      <AnimatePresence>
        {(isOpen || searchTerm) && filteredLinks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.4, 0.0, 0.2, 1] // Custom easing for smooth feel
            }}
            className="absolute top-full left-0 right-0 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden"
            style={{ maxHeight: `${maxHeight}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="p-1 overflow-y-auto"
              style={{ maxHeight: `${maxHeight - 2}px` }} // Account for border
            >
              {filteredLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: index * 0.05, // Stagger animation
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  onClick={() => handleLinkClick(link.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                    index === selectedIndex 
                      ? 'bg-zinc-800 text-zinc-100' 
                      : 'hover:bg-zinc-800 text-zinc-100'
                  }`}
                >
                  <link.icon className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}