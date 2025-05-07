"use client"

import { useState, useEffect, useCallback } from "react"

interface MousePosition {
  x: number | null
  y: number | null
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })

  // Define updateMousePosition as a useCallback to prevent recreating it on each render
  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }, [])

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    // Add event listener safely
    window.addEventListener("mousemove", updateMousePosition)

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [updateMousePosition])

  return mousePosition
}
