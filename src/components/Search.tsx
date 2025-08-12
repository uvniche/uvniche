"use client"

import { useState, useRef, useEffect } from "react"
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
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    maxHeight?: number;
  }>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calculateDropdownPosition = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    
    // Dropdown dimensions (estimated)
    const dropdownHeight = 300 // max-h-[300px]
    const dropdownWidth = containerRect.width
    const padding = 16 // Safe padding from viewport edges
    
    const position: typeof dropdownPosition = {}
    
    // Calculate vertical position - always prefer below
    const spaceBelow = viewportHeight - containerRect.bottom
    const spaceAbove = containerRect.top
    const minItemHeight = 48 // Approximate height of a single search item
    
    if (spaceBelow >= dropdownHeight + padding) {
      // Enough space below for full dropdown - position normally
      position.top = containerRect.height + 4 // mt-1 equivalent
    } else if (spaceBelow >= minItemHeight + padding) {
      // Not enough space for full dropdown, but enough for at least one item - position below with scroll
      position.top = containerRect.height + 4
      position.maxHeight = Math.max(spaceBelow - padding, minItemHeight)
    } else if (spaceAbove >= dropdownHeight + padding) {
      // No space below even for one item, but full space above - position above
      position.bottom = containerRect.height + 4
    } else {
      // Not enough space anywhere for full dropdown - use the larger available space
      if (spaceBelow > spaceAbove) {
        // More space below (even if minimal)
        position.top = containerRect.height + 4
        position.maxHeight = Math.max(spaceBelow - padding, minItemHeight)
      } else {
        // More space above
        position.bottom = containerRect.height + 4
        position.maxHeight = Math.max(spaceAbove - padding, minItemHeight)
      }
    }
    
    // Calculate horizontal position
    if (containerRect.left + dropdownWidth > viewportWidth - padding) {
      // Would overflow right edge
      position.right = 0
    } else if (containerRect.left < padding) {
      // Would overflow left edge
      position.left = 0
    } else {
      // Normal positioning
      position.left = 0
    }
    
    setDropdownPosition(position)
  }

  const handleLinkSelect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setIsExpanded(false) // Close dropdown after selection
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setIsTyping(true)
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Set typing indicator to false after 500ms of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 500)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    setIsExpanded(true)
    // Calculate position when opening
    setTimeout(calculateDropdownPosition, 0)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    // Don't immediately close - let the click outside handler manage it
  }

  // Determine if dropdown should be visible
  const shouldShowDropdown = isFocused || isTyping || inputValue.length > 0 || isExpanded

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setIsFocused(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isExpanded])

  // Update isExpanded based on shouldShowDropdown
  useEffect(() => {
    setIsExpanded(shouldShowDropdown)
    if (shouldShowDropdown) {
      // Recalculate position when expanding
      setTimeout(calculateDropdownPosition, 0)
    }
  }, [shouldShowDropdown, calculateDropdownPosition])

  // Handle window resize to recalculate position
  useEffect(() => {
    const handleResize = () => {
      if (isExpanded) {
        calculateDropdownPosition()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isExpanded, calculateDropdownPosition])

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
              <motion.div
          className="group w-full cursor-pointer"
          variants={containerVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          initial="collapsed"
          onMouseEnter={() => {
            setIsExpanded(true)
            setTimeout(calculateDropdownPosition, 0)
          }}
          onMouseLeave={() => {
            // Only close on mouse leave if not focused and no input value
            if (!isFocused && !inputValue.length && !isTyping) {
              setIsExpanded(false)
            }
          }}
          whileHover={{ 
            scale: 1.01,
            y: -1,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.2
            }
          }}
          whileTap={{ 
            scale: 0.99,
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.1
            }
          }}
        >
        <Command className="rounded-lg border shadow-md w-full">
          {/* Search Input - Always visible and maintains layout */}
          <CommandInput 
            placeholder="Search" 
            value={inputValue}
            onValueChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onTouchStart={handleInputFocus}
            className="transition-all duration-300 ease-out"
          />
          
          {/* Dropdown - Absolutely positioned to not affect layout */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                ref={dropdownRef}
                variants={listVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="absolute w-full z-50 bg-popover rounded-lg border shadow-md overflow-hidden"
                style={{ 
                  transformOrigin: dropdownPosition.bottom !== undefined ? "bottom" : "top",
                  top: dropdownPosition.top,
                  bottom: dropdownPosition.bottom,
                  left: dropdownPosition.left,
                  right: dropdownPosition.right,
                }}
              >
                <CommandList 
                  className="overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
                  style={{ 
                    maxHeight: dropdownPosition.maxHeight || 300 
                  }}
                >
                  <CommandGroup>
                    {socialLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                        custom={index}
                      >
                        <CommandItem 
                          onSelect={() => handleLinkSelect(link.url)}
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
