"use client"

import { useEffect, useLayoutEffect } from "react"

// Use useLayoutEffect on client, useEffect on server
export const useSafeLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Safe window event hook
export function useWindowEvent<K extends keyof WindowEventMap>(
  event: K,
  callback: (e: WindowEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Add event listener
    window.addEventListener(event, callback, options)

    // Cleanup
    return () => {
      window.removeEventListener(event, callback, options)
    }
  }, [event, callback, options])
}
