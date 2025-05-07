"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const mousePosition = useMousePosition()
  const [isPointer, setIsPointer] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Define event handlers with useCallback to prevent recreating them on each render
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  const handleCursorStyle = useCallback(() => {
    if (!mousePosition.x || !mousePosition.y || typeof document === "undefined") return

    try {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)

      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement)
        setIsPointer(
          computedStyle.cursor === "pointer" || hoveredElement.tagName === "A" || hoveredElement.tagName === "BUTTON",
        )
      } else {
        setIsPointer(false)
      }
    } catch (error) {
      console.error("Error in cursor style handler:", error)
    }
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true)

    // Delay setup to ensure DOM is fully loaded
    const readyTimer = setTimeout(() => {
      setIsReady(true)
    }, 1000)

    return () => {
      clearTimeout(readyTimer)
    }
  }, [])

  useEffect(() => {
    // Skip if not ready, not in browser, or DOM not available
    if (!isReady || typeof window === "undefined" || typeof document === "undefined") {
      return
    }

    try {
      // Add event listeners safely
      document.addEventListener("mouseenter", handleMouseEnter)
      document.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("mousemove", handleCursorStyle)
    } catch (error) {
      console.error("Error adding cursor event listeners:", error)
    }

    return () => {
      try {
        // Remove event listeners safely
        if (typeof document !== "undefined") {
          document.removeEventListener("mouseenter", handleMouseEnter)
          document.removeEventListener("mouseleave", handleMouseLeave)
        }
        if (typeof window !== "undefined") {
          window.removeEventListener("mousemove", handleCursorStyle)
        }
      } catch (error) {
        console.error("Error removing cursor event listeners:", error)
      }
    }
  }, [isReady, handleMouseEnter, handleMouseLeave, handleCursorStyle])

  // Don't render anything until mounted on client and ready
  if (!isMounted || !isReady) {
    return null
  }

  // Only on desktop (md and above)
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Outer cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#6E56CF] pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x ? mousePosition.x - 16 : 0,
          y: mousePosition.y ? mousePosition.y - 16 : 0,
          scale: isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Inner cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#10B981] pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x ? mousePosition.x - 4 : 0,
          y: mousePosition.y ? mousePosition.y - 4 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 10,
          mass: 0.05,
        }}
      />
    </>
  )
}
