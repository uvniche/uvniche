"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  Github,
  Instagram,
  Twitter,
  Music,
  Linkedin,
  Youtube,
  Headphones,
  Play,
  Radio,
  PenSquare,
} from "lucide-react"

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const searchLinks = [
  {
    name: "Apple Music",
    icon: Play,
    url: "https://music.apple.com/us/artist/avaneesh/1832229432",
  },
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
    name: "SoundCloud",
    icon: Radio,
    url: "https://soundcloud.com/uvniche",
  },
  {
    name: "Spotify",
    icon: Headphones,
    url: "https://open.spotify.com/artist/2WZKTiJucQd5UTC5LICRZ6",
  },
  {
    name: "Substack",
    icon: PenSquare,
    url: "https://substack.com/@uvniche",
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
    url: "https://www.youtube.com/@uvniche",
  },
]

// Animation variants for smooth transitions
const containerVariants: Variants = {
  expanded: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  collapsed: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  }
}

const listVariants: Variants = {
  expanded: {
    height: "auto",
    opacity: 1,
    marginTop: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
}

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  collapsed: {
    opacity: 0,
    scale: 0.95,
    y: 8,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
}

export function Search() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
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

  // Ensure component is mounted before running browser-specific code
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const calculateDropdownPosition = useCallback(() => {
    if (!containerRef.current || !isMounted) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    
    // Use visualViewport for accurate viewport height that accounts for keyboard
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const viewportWidth = window.visualViewport?.width || window.innerWidth
    
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
  }, [isMounted])

  const handleLinkSelect = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
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
    // Calculate position when opening, with delay for keyboard animation
    setTimeout(calculateDropdownPosition, 0)
    setTimeout(calculateDropdownPosition, 100)
    setTimeout(calculateDropdownPosition, 300)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    // Don't immediately close - let the click outside handler manage it
  }

  const handleInputClick = () => {
    // Ensure input is focused and dropdown stays open when clicking
    setIsFocused(true)
    setIsExpanded(true)
    // Calculate position when opening
    setTimeout(calculateDropdownPosition, 0)
  }

  // Determine if dropdown should be visible
  const shouldShowDropdown = isFocused || isTyping || inputValue.length > 0 || isExpanded

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isMounted) return

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
  }, [isExpanded, isMounted])

  // Update isExpanded based on shouldShowDropdown
  useEffect(() => {
    if (!isMounted) return
    
    setIsExpanded(shouldShowDropdown)
    if (shouldShowDropdown) {
      // Recalculate position when expanding
      setTimeout(calculateDropdownPosition, 0)
    }
  }, [shouldShowDropdown, calculateDropdownPosition, isMounted])

  // Handle window resize and visualViewport changes (keyboard) to recalculate position
  useEffect(() => {
    if (!isMounted) return

    const handleResize = () => {
      if (isExpanded) {
        calculateDropdownPosition()
      }
    }

    const handleVisualViewportResize = () => {
      if (isExpanded) {
        // Recalculate immediately when keyboard shows/hides
        calculateDropdownPosition()
      }
    }

    window.addEventListener('resize', handleResize)
    
    // Listen for visualViewport changes (keyboard show/hide on mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportResize)
      window.visualViewport.addEventListener('scroll', handleVisualViewportResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportResize)
        window.visualViewport.removeEventListener('scroll', handleVisualViewportResize)
      }
    }
  }, [isExpanded, calculateDropdownPosition, isMounted])

  // Completely lock page scroll when dropdown is open
  useEffect(() => {
    if (!isMounted) return

    // Skip scroll locking on mobile devices to prevent layout issues
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isExpanded && !isMobile) {
      // Get current scroll position
      const scrollY = window.scrollY
      
      // Apply comprehensive body lock
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100dvh'
      document.body.style.width = '100vw'
      
      // Also lock html element for extra security
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100dvh'
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString())
    } else if (!isExpanded && !isMobile) {
      // Restore everything
      const scrollY = document.body.getAttribute('data-scroll-y')
      
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.width = ''
      
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
        document.body.removeAttribute('data-scroll-y')
      }
    }
    
    return () => {
      // Cleanup on unmount
      if (!isMobile) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        document.body.style.height = ''
        document.body.style.width = ''
        document.documentElement.style.overflow = ''
        document.documentElement.style.height = ''
        document.body.removeAttribute('data-scroll-y')
      }
    }
  }, [isExpanded, isMounted])

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative w-full search-container">
        <div className="w-full">
          <Command className="rounded-lg border shadow-md w-full">
            <CommandInput 
              placeholder="Search" 
              className="transition-all duration-300 ease-out h-9"
            />
          </Command>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full search-container" ref={containerRef}>
      <motion.div
        className={`group w-full ${isExpanded ? '' : 'cursor-pointer'}`}
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
          scale: 1.005,
          transition: { 
            duration: 0.15,
            ease: "easeOut"
          }
        }}
        whileTap={{ 
          scale: 0.995,
          transition: { 
            duration: 0.1,
            ease: "easeOut"
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
            onClick={handleInputClick}
            onTouchStart={handleInputFocus}
            className="transition-all duration-300 ease-out h-9"
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
                  touchAction: 'pan-y',
                }}
              >
                <CommandList
                  className="overflow-y-scroll scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
                  style={{
                    maxHeight: dropdownPosition.maxHeight || 300,
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                    overscrollBehaviorY: 'contain',
                    touchAction: 'pan-y',
                    scrollbarWidth: 'thin',
                    msOverflowStyle: 'auto',
                  }}
                >
                  <CommandGroup>
                    {searchLinks.map((link) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                      >
                        <CommandItem 
                          onSelect={() => handleLinkSelect(link.url)}
                          className="cursor-pointer h-9 flex items-center py-0"
                        >
                          <link.icon className="size-4" />
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
