"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Code, Brain, Database, Globe, ChevronRight } from "lucide-react"
import { aboutContent, siteConfig, skillsContent } from "@/data/content"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("about")

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

  const skillColors: Record<string, string> = {
    Python: "bg-violet-500/20 text-violet-300",
    "Machine Learning": "bg-emerald-500/20 text-emerald-300",
    "Data Analysis": "bg-blue-500/20 text-blue-300",
    "Deep Learning": "bg-purple-500/20 text-purple-300",
  };

  const skillPercent: Record<string, number> = {};
  skillsContent.skills.forEach(skill => {
    skillPercent[skill.name] = skill.level;
  });

  return (
    <section id="about" className="py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column - Profile */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <div className="relative">
              {/* Background elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-violet-500/10 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl"></div>

              {/* Profile card */}
              <div className="relative z-10 bg-gradient-to-br from-[#1a1a24] to-[#161622] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
                {/* Header gradient */}
                <div className="h-56 bg-gradient-to-r from-violet-500/20 to-emerald-500/20"></div>

                {/* Profile content */}
                <div className="relative px-6 pb-6 pt-32">
                  {/* Avatar */}
                  <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-[#161622] shadow-xl">
                      <Image
                        src="/profile-avatar.png"
                        alt={siteConfig.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        priority
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>

                  {/* Profile info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">{siteConfig.name}</h3>
                    <p className="text-violet-300 mb-4">{siteConfig.title}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 my-6">
                      {aboutContent.stats.map((stat, index) => (
                        <div key={index}>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                          <p className="text-xs text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Social links */}
                    <div className="flex justify-center space-x-4">
                      <a
                        href={siteConfig.socials.github}
                        className="p-2 bg-violet-500/10 rounded-full text-violet-300 hover:bg-violet-500/20 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </a>
                      <a
                        href={siteConfig.socials.linkedin}
                        className="p-2 bg-violet-500/10 rounded-full text-violet-300 hover:bg-violet-500/20 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      </a>
                      <a
                        href="#contact"
                        className="p-2 bg-violet-500/10 rounded-full text-violet-300 hover:bg-violet-500/20 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                      </a>
                    </div>

                    {/* Resume button */}
                    <a
                      href="/sample.pdf"
                     
                      className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
                      rel="noopener noreferrer"
                    >
                      Download Resume
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="md:col-span-7">
            <div className="mb-8">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 mb-4">
                {aboutContent.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">{aboutContent.title}</h2>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex border-b border-white/10">
              {aboutContent.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? "text-white border-b-2 border-violet-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.id === "about" && <Code className="w-4 h-4" />}
                  {tab.id === "expertise" && <Brain className="w-4 h-4" />}
                  {tab.id === "journey" && <Globe className="w-4 h-4" />}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="glass-card p-8 rounded-xl min-h-[400px]">
              {aboutContent.tabs.map((tab) => (
                <div key={tab.id} className={`${activeTab === tab.id ? "block" : "hidden"}`}>
                  {tab.id === "about" && (
                    <div className="space-y-4">
                      {aboutContent.description.map((paragraph, index) => (
                        <p key={index} className="text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      <div className="flex flex-wrap gap-3 mt-6">
                        {aboutContent.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`${skill.color} px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-all duration-300`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {tab.id === "expertise" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-violet-500/20 p-3 rounded-lg">
                          <Code className="w-5 h-5 text-violet-300" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Software Development</h4>
                          <p className="text-gray-300 text-sm">{tab.content}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-500/20 p-3 rounded-lg">
                          <Brain className="w-5 h-5 text-emerald-300" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Machine Learning</h4>
                          <p className="text-gray-300 text-sm">
                            Developing and deploying ML models for classification, regression, and clustering.
                            Experience with TensorFlow, PyTorch, and scikit-learn.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg">
                          <Database className="w-5 h-5 text-blue-300" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Data Engineering</h4>
                          <p className="text-gray-300 text-sm">
                            Creating efficient data pipelines and ETL processes. Skilled in SQL, NoSQL databases, and
                            big data technologies.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {tab.id === "journey" && (
                    <div className="space-y-4">
                      <div className="relative pl-6 border-l border-violet-500/30">
                        <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-violet-500"></div>
                        <h4 className="text-lg font-medium text-white">How I Got Started</h4>
                        <p className="text-gray-300 text-sm mb-6">I got into coding out of curiosity — watching YouTube videos, reading articles, and trying random snippets of Python just to see what they did. I didn't have a structured path at first, but I kept going because solving small problems with code felt rewarding.</p>
                      </div>

                      <div className="relative pl-6 border-l border-emerald-500/30">
                        <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-emerald-500"></div>
                        <h4 className="text-lg font-medium text-white">🔍 First Real Project: Automating Things</h4>
                        <p className="text-gray-300 text-sm mb-6">
                        One of the first things I built was a basic script that automated small repetitive tasks. That's when I realized how powerful Python could be. From there, I kept exploring — scraping data from websites, organizing files, and automating workflows.
                        </p>
                      </div>

                      <div className="relative pl-6 border-l border-blue-500/30">
                        <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                        <h4 className="text-lg font-medium text-white">🛠️ Turning Curiosity into Projects</h4>
                        <p className="text-gray-300 text-sm">
                        As I got more comfortable, I started building real tools:<br></br>• A web scraping tool that extracts and parses content with a clean terminal interface.<br></br>• An image upscaler using machine learning models in PyTorch.<br></br>• A C syntax checker written in C itself — just to understand how compilers work.
                        <br></br>These weren't just tutorials. They were real things I wanted to build, test, and use.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
