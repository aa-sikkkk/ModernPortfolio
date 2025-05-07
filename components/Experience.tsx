"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Calendar, Briefcase, Code, Server } from "lucide-react"
import { experienceContent } from "@/data/content"

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"],
  })

  const { subtitle, title, description, experiences } = experienceContent

  // Transform the scrollYProgress to control the height of the timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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

  // Map experience titles to icons
  const getIcon = (title: string) => {
    if (title.includes("Python") || title.includes("Developer")) return <Code className="h-6 w-6 text-violet-400" />
    if (title.includes("Machine Learning")) return <Server className="h-6 w-6 text-emerald-400" />
    if (title.includes("Engineer")) return <Briefcase className="h-6 w-6 text-blue-400" />
    return <Calendar className="h-6 w-6 text-amber-400" />
  }

  return (
    <section id="experience" className="py-20 bg-[#0d0d11]">
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

        <div className="relative" ref={timelineRef}>
          {/* Timeline line with animation */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-800 rounded-full">
            <motion.div
              className="w-full bg-gradient-to-b from-violet-500 to-emerald-500 rounded-full"
              style={{ height: lineHeight, width: "4px", position: "absolute", top: 0, left: "-1.5px" }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: index * 0.2,
                  },
                }}
                viewport={{ once: false, amount: 0.3 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot with pulse animation */}
                <motion.div
                  className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 shadow-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.2,
                  }}
                >
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 opacity-75"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0.2, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <motion.div
                    className="glass-card p-6 rounded-lg"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div
                        className="mr-4 p-2 rounded-full bg-[#1a1a24]"
                        initial={{ rotate: -10, scale: 0.9 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {getIcon(exp.title)}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-violet-300">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{exp.description}</p>
                    <div className="flex items-center mt-4">
                      <Calendar className="h-4 w-4 text-emerald-300 mr-2" />
                      <span className="text-sm text-emerald-300">{exp.period}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
