"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useWindowEvent } from "@/hooks/useSafeLayoutEffect"
import { navLinks, siteConfig } from "@/data/content"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      // Update URL without the hash
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  // Handle scroll - wrapped in useCallback to maintain reference stability
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return

    const offset = window.scrollY
    setScrolled(offset > 50)

    // Update active section based on scroll position
    const sections = navLinks.map((link) => link.href.substring(1))

    for (const section of sections.reverse()) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [])

  // Use our safe window event hook
  useWindowEvent("scroll", handleScroll, { passive: true })

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true)
    // Initial check for active section
    handleScroll()
  }, [handleScroll])

  // Simple version until mounted
  if (!mounted) {
    return (
      <div className="fixed w-full z-30 py-4">
        <div className="mx-auto px-4 sm:px-6 max-w-7xl glassmorphism rounded-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label={siteConfig.name}
                >
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  <path d="M18 3L33 33H3L18 3Z" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" />
                  <path d="M12 22H24" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div
        className={`mx-auto px-4 sm:px-6 max-w-7xl transition-all duration-300 ${
          scrolled ? "glassmorphism shadow-lg rounded-none" : "bg-transparent rounded-full"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold gradient-text flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={siteConfig.name}
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M18 3L33 33H3L18 3Z" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" />
                <path d="M12 22H24" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    activeSection === link.href.substring(1) ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glassmorphism mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    scrollToSection(link.href.substring(1));
                    setIsOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === link.href.substring(1)
                      ? "text-white bg-violet-500/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
