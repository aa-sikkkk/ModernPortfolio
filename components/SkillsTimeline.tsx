"use client"

import { useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// Define the skill types and data
interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "NextJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
    ],
  },
  {
    title: "Frameworks/Libraries",
    skills: [
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      { name: "Keras", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
]

export default function SkillsTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  return (
    <div className="py-20 max-w-5xl mx-auto px-4 sm:px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl"></div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 backdrop-blur-sm"
      >
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 mb-4">
            Technical Arsenal
          </span>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">My Tech Stack</h2>
        </motion.div>

        {/* Vertical timeline line with animation */}
        <div className="absolute left-0 top-32 bottom-0 w-1 ml-3 md:ml-4 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-violet-500 to-emerald-500 rounded-full"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Skill categories */}
        <div className="space-y-24">
          {skillsData.map((category, categoryIndex) => (
            <motion.div key={category.title} variants={itemVariants} custom={categoryIndex} className="relative">
              {/* Category dot with pulse animation */}
              <motion.div
                className="absolute left-0 z-20"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: categoryIndex * 0.2,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#161622] border-2 border-violet-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-violet-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Category title */}
              <motion.h3
                className="text-xl font-bold ml-12 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400 mb-8"
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{
                  delay: categoryIndex * 0.2 + 0.2,
                  duration: 0.5,
                }}
              >
                {category.title}
              </motion.h3>

              {/* Skills grid with staggered animation */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 ml-12">
                <AnimatePresence>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      custom={skillIndex}
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="flex flex-col items-center"
                    >
                      {/* Skill icon container with glass effect */}
                      <div className="w-14 h-14 md:w-18 md:h-18 bg-[#161622]/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 p-3 shadow-lg border border-white/5 hover:border-violet-500/30 transition-all duration-300 group">
                        <motion.div
                          className="relative w-full h-full flex items-center justify-center"
                          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={skill.icon || "/placeholder.svg"}
                            alt={skill.name}
                            className="w-full h-full object-contain group-hover:brightness-125 transition-all duration-300"
                            style={{
                              filter: skill.name === "GitHub" ? "invert(1)" : "none",
                            }}
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                          {/* Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 blur-md"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      </div>

                      {/* Skill name with hover effect */}
                      <motion.span
                        className="text-xs md:text-sm text-gray-300 text-center font-medium"
                        whileHover={{
                          color: "#ffffff",
                          textShadow: "0 0 8px rgba(139, 92, 246, 0.5)",
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
