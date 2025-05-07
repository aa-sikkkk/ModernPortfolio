"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Brain, Database, Globe, Cloud, Terminal, BarChart } from "lucide-react"
import { skillsContent } from "@/data/content"
import type { JSX } from "react/jsx-runtime"

// Map skill names to their respective icons
const skillIcons: Record<string, JSX.Element> = {
  Python: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10h10V2z" />
      <path d="M22 12h-10v10h10V12z" />
      <path d="M12 12H2v10h10V12z" />
    </svg>
  ),
  "Machine Learning": <Brain className="w-5 h-5" />,
  "Data Analysis": <BarChart className="w-5 h-5" />,
  "Web Development": <Globe className="w-5 h-5" />,
  "Deep Learning": <Brain className="w-5 h-5" />,
  "Cloud Computing": <Cloud className="w-5 h-5" />,
  DevOps: <Terminal className="w-5 h-5" />,
  "Database Management": <Database className="w-5 h-5" />,
}

function AnimatedCounter({ value, index, className }: { value: number; index: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(counterRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    // Use the same delay as the progress bar for synchronization
    const delay = index * 0.1
    const duration = 1.2 // Match the bar animation duration
    let startTime: number | null = null

    const updateCounter = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
        requestAnimationFrame(updateCounter)
        return
      }

      // Calculate elapsed time accounting for delay
      const elapsed = timestamp - startTime - delay * 1000

      if (elapsed < 0) {
        requestAnimationFrame(updateCounter)
        return
      }

      // Calculate progress using spring-like easing
      // This mimics the spring physics of the progress bar
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out

      const currentValue = Math.round(easedProgress * value)
      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [isInView, value, index])

  return (
    <span ref={counterRef} className={className}>
      {displayValue}%
    </span>
  )
}

function AnimatedSkillBar({ skill, index }: { skill: (typeof skillsContent.skills)[0]; index: number }) {
  const controls = useAnimation()
  const barRef = useRef(null)
  const isInView = useInView(barRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${skill.level}%`,
        transition: {
          duration: 1.5,
          delay: index * 0.2,
          type: "spring",
          stiffness: 30,
          damping: 15,
        },
      })
    }
  }, [controls, isInView, skill.level, index])

  return (
    <div className="h-4 bg-gray-800/50 rounded-full overflow-hidden" ref={barRef}>
      <motion.div 
        className={`h-full ${skill.color.split(" ")[0]}`} 
        initial={{ width: 0 }} 
        animate={controls}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-100px 0px 0px 0px", // Add top margin to account for navbar height
  })

  const { subtitle, title, description, skills } = skillsContent

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="skills" className="py-20 bg-[#0d0d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
          className="text-center mb-12"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 mb-4"
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 30px -10px rgba(139, 92, 246, 0.15)",
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
          className="glass-card p-8 rounded-xl relative overflow-hidden"
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-violet-500/10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              delay: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <div className="grid gap-6 relative z-10">
            {skills.map((skill, index) => (
              <motion.div key={skill.name} variants={itemVariants} whileHover={{ y: -2 }} custom={index}>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                      className={`p-1.5 rounded-md ${skill.color.split(" ")[0]}`}
                    >
                      {skillIcons[skill.name] || <Database className="w-5 h-5" />}
                    </motion.div>
                    <span className={`font-medium ${skill.color.split(" ")[1]}`}>{skill.name}</span>
                  </div>
                  <AnimatedCounter value={skill.level} index={index} className="text-gray-400" />
                </div>

                <AnimatedSkillBar skill={skill} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
