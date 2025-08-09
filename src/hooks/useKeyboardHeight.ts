import { useState, useEffect } from 'react'

interface UseKeyboardHeightOptions {
  /** Minimum height difference to consider keyboard open (default: 150) */
  threshold?: number
  /** Delay for keyboard animation detection (default: 300) */
  animationDelay?: number
  /** Whether to enable keyboard detection (default: auto-detect mobile) */
  enabled?: boolean
}

export function useKeyboardHeight(options: UseKeyboardHeightOptions = {}) {
  const {
    threshold = 150,
    animationDelay = 300,
    enabled
  } = options

  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    // Determine if keyboard detection should be enabled
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const shouldEnable = enabled !== undefined ? enabled : isMobile
    
    if (!shouldEnable) {
      return
    }

    let initialViewportHeight = window.visualViewport?.height || window.innerHeight
    let initialInnerHeight = window.innerHeight

    const handleViewportChange = () => {
      if (window.visualViewport) {
        // Use Visual Viewport API (more reliable on modern browsers)
        const currentHeight = window.visualViewport.height
        const heightDiff = initialViewportHeight - currentHeight
        
        if (heightDiff > threshold) {
          setKeyboardHeight(heightDiff)
          setIsKeyboardOpen(true)
        } else {
          setKeyboardHeight(0)
          setIsKeyboardOpen(false)
        }
      } else {
        // Fallback for older browsers
        const currentHeight = window.innerHeight
        const heightDiff = initialInnerHeight - currentHeight
        
        if (heightDiff > threshold) {
          setKeyboardHeight(heightDiff)
          setIsKeyboardOpen(true)
        } else {
          setKeyboardHeight(0)
          setIsKeyboardOpen(false)
        }
      }
    }

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
    } else {
      window.addEventListener('resize', handleViewportChange)
    }

    // Also listen for focus/blur events on input elements as backup
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Delay to allow keyboard to animate in
        setTimeout(handleViewportChange, animationDelay)
      }
    }

    const handleFocusOut = () => {
      // Delay to allow keyboard to animate out
      setTimeout(handleViewportChange, animationDelay)
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange)
      } else {
        window.removeEventListener('resize', handleViewportChange)
      }
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [threshold, animationDelay, enabled])

  return { keyboardHeight, isKeyboardOpen }
}
