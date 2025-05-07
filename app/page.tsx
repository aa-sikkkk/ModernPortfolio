"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import StarryBackground from "@/components/StarryBackground"
// Import the SkillsTimeline component
import SkillsTimeline from "@/components/SkillsTimeline"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple loading state until client-side code runs
  if (!mounted) {
    return (
      <div className="bg-[#0f0f13] text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  // Add the SkillsTimeline component after the Skills component
  return (
    <main className="bg-[#0f0f13] text-white min-h-screen overflow-x-hidden">
      {/* Shooting stars background */}
      <StarryBackground />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <SkillsTimeline />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  )
}
