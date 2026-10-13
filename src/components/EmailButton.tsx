"use client"

import { useState, useRef, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { Mail } from "lucide-react"

const listVariants: Variants = {
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
}

export function EmailButton() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown on touch screens
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Mail Icon Trigger Button */}
      <a
        href="mailto:uvniche@gmail.com"
        onClick={(e) => {
          // On touch devices, first tap reveals the dropdown
          const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
          if (isTouch && !isOpen) {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        className="flex items-center justify-center size-9 rounded-full border border-border hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-sm text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer group"
        aria-label="Email"
        title="Email"
        aria-expanded={isOpen}
      >
        <Mail
          className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        />
      </a>

      {/* Dropdown Menu - matches Search list styling and animation */}
      <div className="absolute right-0 top-full pt-1.5 pointer-events-none">
        <motion.div
          variants={listVariants}
          initial={false}
          animate={isOpen ? "expanded" : "collapsed"}
          className={`bg-popover rounded-lg border border-border shadow-md overflow-hidden whitespace-nowrap ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ transformOrigin: "top right" }}
        >
          <div className="p-1">
            <a
              href="mailto:uvniche@gmail.com"
              className="flex h-9 items-center gap-2 rounded-sm px-3 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer select-none"
            >
              <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
