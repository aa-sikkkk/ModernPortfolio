"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight } from "lucide-react"
import Image from "next/image"
import { projectsContent } from "@/data/content"

// Custom 3D Card component
function Card3D({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform mouse position to rotation values
  // Using small values (0.5 to 1.5 degrees) for subtle effect
  const rotateX = useTransform(y, [-300, 300], [1.5, -1.5])
  const rotateY = useTransform(x, [-300, 300], [-1.5, 1.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    // Reset to flat position when mouse leaves
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full transition-all duration-200 ease-out"
    >
      {/* Add perspective to children */}
      <div style={{ perspective: "1000px" }}>{children}</div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const { subtitle, title, description, projects, viewAllText, codeButtonText, demoButtonText } = projectsContent

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const nextProject = () => {
    if (isChanging) return
    setIsChanging(true)
    if (activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
    setTimeout(() => setIsChanging(false), 500)
  }

  const prevProject = () => {
    if (isChanging) return
    setIsChanging(true)
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(projects.length - 1)
    }
    setTimeout(() => setIsChanging(false), 500)
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 mb-4"
          >
            {subtitle}
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden"
          style={{ perspective: "1200px" }}
        >
          <Card3D>
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden shadow-2xl border-4 border-transparent bg-gradient-to-br from-white/10 via-violet-500/10 to-violet-900/20 backdrop-blur-md transition-all duration-300 ease-out hover:shadow-violet-500/30 hover:border-violet-500/40">
              {/* Animated background elements */}
              <motion.div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ transform: "translateZ(-10px)" }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  delay: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ transform: "translateZ(-10px)" }}
              />

              {/* Project number indicator */}
              <motion.div
                className="absolute top-4 right-4 text-xs font-mono text-gray-400"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ transform: "translateZ(20px)" }}
              >
                {activeIndex + 1}/{projects.length}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                >
                  {/* Project Image with animation */}
                  <motion.div
                    className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-xl border-2 border-violet-500/30 bg-black/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                    }}
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <Image
                      src={projects[activeIndex].image || "/placeholder.svg"}
                      alt={projects[activeIndex].title}
                      fill
                      className="object-cover transition-all duration-500 border-2 border-violet-500/40"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </motion.div>

                  {/* Project Details with staggered animation */}
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3,
                        },
                      },
                    }}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.h3
                      className="text-2xl font-bold gradient-text"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                    >
                      {projects[activeIndex].title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-300"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.1,
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                    >
                      {projects[activeIndex].description}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-2 my-4"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            delay: 0.2,
                          },
                        },
                      }}
                    >
                      {projects[activeIndex].techStack.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: 0.3 + index * 0.05,
                            },
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(139, 92, 246, 0.3)",
                            z: 50,
                          }}
                          style={{ transform: "translateZ(50px)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex gap-4"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.4,
                            type: "spring",
                            stiffness: 100,
                          },
                        },
                      }}
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <motion.a
                        href={projects[activeIndex].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#161622] hover:bg-[#1f1f2e] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span>{codeButtonText}</span>
                      </motion.a>
                      <motion.a
                        href={projects[activeIndex].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-violet-600 hover:from-violet-700 hover:to-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span>{demoButtonText}</span>
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card3D>
        </motion.div>

        {/* Project Navigation */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={prevProject}
            className="p-3 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-violet-500" : "bg-violet-500/20"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: index === activeIndex ? 1.2 : 1,
                  opacity: 1,
                  transition: {
                    delay: index * 0.05,
                  },
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextProject}
            className="p-3 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* "View all projects" link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 transition-colors"
            whileHover={{
              x: 5,
              textShadow: "0 0 8px rgba(139, 92, 246, 0.5)",
            }}
          >
            {viewAllText}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
