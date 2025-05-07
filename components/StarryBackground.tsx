"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  blinking: boolean
  blinkDuration: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  width: number
  color: string
  active: boolean
  timeCreated: number
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationFrameRef = useRef<number>(0)
  const lastShootingStarTimeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Cover the entire scrollable area
    }

    // Generate background stars
    const generateStars = () => {
      const stars: Star[] = []
      const starCount = Math.floor((canvas.width * canvas.height) / 35000)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3, // Higher opacity for better visibility
          blinking: Math.random() > 0.7,
          blinkDuration: Math.random() * 3 + 2,
        })
      }

      starsRef.current = stars
    }

    // Create a new shooting star
    const createShootingStar = () => {
      const now = Date.now()

      // Add 1-3 shooting stars
      const count = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < count; i++) {
        const shootingStar: ShootingStar = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 3), // Start in top third
          length: Math.random() * 80 + 50,
          speed: Math.random() * 300 + 150,
          opacity: Math.random() * 0.3 + 0.7, // Higher opacity (0.7-1.0) for better visibility
          width: Math.random() * 2 + 1,
          color: "255, 255, 255",
          active: true,
          timeCreated: now + i * 100, // Stagger creation times
        }

        shootingStarsRef.current.push(shootingStar)
      }

      lastShootingStarTimeRef.current = now
    }

    // Draw a single star
    const drawStar = (star: Star, time: number) => {
      let opacity = star.opacity

      if (star.blinking) {
        opacity = star.opacity * (0.5 + 0.5 * Math.sin(time / star.blinkDuration))
      }

      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()

      // Add glow to larger stars
      if (star.size > 1.5) {
        ctx.beginPath()
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
        glow.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`)
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = glow
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Draw a shooting star
    const drawShootingStar = (star: ShootingStar, deltaTime: number) => {
      // Move the shooting star
      star.x += star.speed * deltaTime
      star.y += star.speed * deltaTime

      // Check if the shooting star is still on screen
      if (star.x > canvas.width + star.length || star.y > canvas.height + star.length) {
        star.active = false
        return
      }

      // Draw the shooting star
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y - star.length)
      gradient.addColorStop(0, `rgba(${star.color}, ${star.opacity})`)
      gradient.addColorStop(1, `rgba(${star.color}, 0)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = star.width
      ctx.moveTo(star.x, star.y)
      ctx.lineTo(star.x - star.length, star.y - star.length)
      ctx.stroke()

      // Draw the head of the shooting star with glow
      ctx.beginPath()
      ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
      ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2)
      ctx.fill()

      // Add glow
      ctx.beginPath()
      const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.width * 4)
      glow.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.5})`)
      glow.addColorStop(1, `rgba(${star.color}, 0)`)
      ctx.fillStyle = glow
      ctx.arc(star.x, star.y, star.width * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Animation loop
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000 // Convert to seconds
      lastTime = time

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background stars
      const currentTime = time / 1000 // Convert to seconds for star blinking
      starsRef.current.forEach((star) => drawStar(star, currentTime))

      // Check if we should create new shooting stars
      const now = Date.now()
      if (now - lastShootingStarTimeRef.current > 1500) {
        // Create new stars every 1.5 seconds
        if (Math.random() > 0.3) {
          // 70% chance to create new stars
          createShootingStar()
        }
      }

      // Draw and update shooting stars
      shootingStarsRef.current.forEach((star) => {
        if (star.active && now >= star.timeCreated) {
          drawShootingStar(star, deltaTime)
        }
      })

      // Remove inactive shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => star.active)

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    generateStars() // <-- Call this here

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Add event listeners
    window.addEventListener("resize", resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-screen pointer-events-none z-0"
      style={{ height: "300vh" }} // Cover the entire scrollable area
    />
  )
}
