"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  size: number
  opacity: number
  top: number
  left: number
  duration: number
  delay: number
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate random stars
  const generateStars = (count: number) => {
    const newStars: Star[] = []
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1, // Size between 1-3px
        opacity: Math.random() * 0.7 + 0.3, // Opacity between 0.3-1
        top: Math.random() * dimensions.height,
        left: Math.random() * dimensions.width,
        duration: Math.random() * 2 + 1, // Duration between 1-3s
        delay: Math.random() * 10, // Random delay for more natural effect
      })
    }
    setStars(newStars)
  }

  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight * 3, // Make it 3x the viewport height to cover all sections
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Generate stars when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      // Number of stars based on screen size
      const starCount = Math.floor((dimensions.width * dimensions.height) / 15000)
      generateStars(starCount)
    }
  }, [dimensions])

  // Regenerate stars periodically for continuous effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (dimensions.width > 0 && dimensions.height > 0) {
        // Add a few new stars periodically
        const newStarCount = Math.floor(Math.random() * 3) + 1
        const currentLength = stars.length

        const newStars = Array.from({ length: newStarCount }, (_, i) => ({
          id: currentLength + i,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          top: Math.random() * dimensions.height,
          left: Math.random() * dimensions.width,
          duration: Math.random() * 2 + 1,
          delay: 0, // No delay for new stars
        }))

        setStars((prev) => [...prev.slice(-30), ...newStars]) // Keep max 30 stars
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [dimensions, stars.length])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen pointer-events-none overflow-hidden z-0"
      style={{ height: "300vh" }} // Cover the entire scrollable area
    >
      {stars.map((star) => (
        <ShootingStar key={star.id} star={star} />
      ))}
    </div>
  )
}

function ShootingStar({ star }: { star: Star }) {
  return (
    <motion.div
      className="absolute"
      style={{
        top: star.top,
        left: star.left,
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, star.opacity, 0],
        x: [0, 150 + star.size * 50],
        y: [0, 150 + star.size * 30],
      }}
      transition={{
        duration: star.duration,
        delay: star.delay,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 15 + 10, // Random delay between 10-25s before repeating
      }}
    >
      <div className="relative">
        {/* Star */}
        <div
          className="rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
        />

        {/* Trail */}
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-l from-transparent to-white/80"
          style={{
            height: star.size / 2,
            width: star.size * (10 + Math.random() * 20),
            opacity: star.opacity * 0.7,
            right: star.size,
          }}
        />
      </div>
    </motion.div>
  )
}
