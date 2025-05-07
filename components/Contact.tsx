"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactContent, siteConfig } from "@/data/content"
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;



export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    message?: string
  }>({})

  const { subtitle, title, description, formLabels, successMessage, contactInfo } = contactContent

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

  const validateForm = () => {
    const newErrors: {
      name?: string
      email?: string
      message?: string
    } = {}

    // Validate name
    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate message
    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          title: formState.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      setFormState({ name: "", email: "", message: "" })
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      setErrors({ ...errors, message: "Failed to send message. Please try again later." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  return (
    <section id="contact" className="py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={containerVariants}>
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6 glass-card p-8 rounded-xl"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{successMessage.title}</h3>
                  <p className="text-gray-300">{successMessage.description}</p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-4 py-2 bg-violet-500/20 text-violet-300 rounded-lg hover:bg-violet-500/30 transition-colors"
                  >
                    {successMessage.button}
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      {formLabels.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`bg-[#1a1a24] border-gray-700 text-white ${
                        errors.name ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      {formLabels.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={`bg-[#1a1a24] border-gray-700 text-white ${
                        errors.email ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      {formLabels.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      className={`bg-[#1a1a24] border-gray-700 text-white ${
                        errors.message ? "border-red-500 focus:ring-red-500" : ""
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-emerald-600 hover:from-violet-700 hover:to-emerald-700 text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {formLabels.sending}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        {formLabels.submit}
                      </span>
                    )}
                  </Button>
                </>
              )}
            </motion.form>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mt-8 flex justify-center space-x-6">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-6 gradient-text">{contactInfo.title}</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-violet-400 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-medium">{contactInfo.email.label}</h4>
                  <p className="text-gray-300">{contactInfo.email.value}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Github className="text-violet-400 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-medium">{contactInfo.github.label}</h4>
                  <p className="text-gray-300">{contactInfo.github.value}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Linkedin className="text-violet-400 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-medium">{contactInfo.linkedin.label}</h4>
                  <p className="text-gray-300">{contactInfo.linkedin.value}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-violet-500/10 rounded-lg">
              <p className="text-gray-300 text-sm">{contactInfo.availability}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
