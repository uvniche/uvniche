"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, type Variants } from "framer-motion"

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
    url: "https://music.apple.com/us/artist/avaneesh/1832229432",
  },
  {
    name: "GitHub",
    url: "https://github.com/uvniche",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/uvniche",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/uvniche",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/2WZKTiJucQd5UTC5LICRZ6",
  },
  {
    name: "X",
    url: "https://x.com/uvniche",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@uvniche",
  },
]

// Animation variants for dropdown transitions
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
      position.right = 0
    } else {
      position.left = 0
    }
    
    setDropdownPosition(position)
  }, [isMounted])

  const handleLinkSelect = (url: string) => {
    setIsExpanded(false)
    window.location.assign(url)
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

    const recalculateIfExpanded = () => {
      if (isExpanded) calculateDropdownPosition()
    }

    window.addEventListener('resize', recalculateIfExpanded)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', recalculateIfExpanded)
      window.visualViewport.addEventListener('scroll', recalculateIfExpanded)
    }

    return () => {
      window.removeEventListener('resize', recalculateIfExpanded)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', recalculateIfExpanded)
        window.visualViewport.removeEventListener('scroll', recalculateIfExpanded)
      }
    }
  }, [isExpanded, calculateDropdownPosition, isMounted])

  useEffect(() => {
    if (!isMounted) return

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return

    const unlockBodyScroll = () => {
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

    if (isExpanded) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100dvh'
      document.body.style.width = '100vw'
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.height = '100dvh'
      document.body.setAttribute('data-scroll-y', scrollY.toString())
    } else {
      const scrollY = document.body.getAttribute('data-scroll-y')
      unlockBodyScroll()
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
      }
    }

    return unlockBodyScroll
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
        <Command label="Search" className="rounded-lg border shadow-md w-full">
          <CommandInput
            expanded={false}
            placeholder="Search"
            className="transition-all duration-300 ease-out h-9"
          />
          <CommandList className="hidden" />
        </Command>
      </div>
    )
  }

  return (
    <div className="relative w-full search-container" ref={containerRef}>
      <motion.div
        className={`group w-full ${isExpanded ? '' : 'cursor-pointer'}`}
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
      >
        <Command label="Search" className="rounded-lg border shadow-md w-full">
          {/* Search Input - Always visible and maintains layout */}
          <div 
            onClick={(e) => {
              // Force expansion and focus for in-app browsers
              setIsExpanded(true)
              setIsFocused(true)
              setTimeout(calculateDropdownPosition, 0)
              // Try to focus the actual input element
              const input = e.currentTarget.querySelector('input')
              if (input) {
                input.focus()
              }
            }}
            onPointerDown={(e) => {
              // Additional pointer event handler for better compatibility
              setIsExpanded(true)
              setIsFocused(true)
              setTimeout(calculateDropdownPosition, 0)
            }}
          >
            <CommandInput 
              expanded={isExpanded}
              placeholder="Search" 
              value={inputValue}
              onValueChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onTouchStart={handleInputFocus}
              className="transition-all duration-300 ease-out h-9"
            />
          </div>
          
          {/* Dropdown - Absolutely positioned to not affect layout */}
          <motion.div
                variants={listVariants}
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                className={`absolute w-full z-50 bg-popover rounded-lg border shadow-md overflow-hidden ${isExpanded ? '' : 'pointer-events-none'}`}
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
                  className="overflow-y-scroll"
                  style={{
                    maxHeight: dropdownPosition.maxHeight || 300,
                    WebkitOverflowScrolling: 'touch',
                    overscrollBehavior: 'contain',
                    touchAction: 'pan-y',
                    scrollbarWidth: 'thin',
                    msOverflowStyle: 'auto',
                  }}
                >
                  <CommandGroup>
                    {searchLinks.map((link) => (
                      <CommandItem 
                        key={link.name}
                        onSelect={() => handleLinkSelect(link.url)}
                        className="cursor-pointer h-9 flex items-center py-0"
                      >
                        <span
                          className="size-1.5 shrink-0 rounded-full bg-current opacity-50"
                          aria-hidden="true"
                        />
                        <span>{link.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
          </motion.div>
        </Command>
      </motion.div>
    </div>
  )
}
