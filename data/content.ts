// Centralized content file for all text in the application
// This makes it easier to update text and maintain consistency

export const siteConfig = {
  name: "Jane Smith",
  title: "Senior Software Engineer",
  email: "jane.smith@example.com",
  location: "San Francisco, CA",
  socials: {
    github: "#",
    linkedin: "#",
    // twitter: "https://twitter.com/aashikbaruwal",
  },
  copyright: `© ${new Date().getFullYear()} Jane Smith. All rights reserved.`,
}

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export const heroContent = {
  subtitle: "Senior Software Engineer",
  title: "Hi, I'm Jane Smith",
  roles: ["Full Stack Developer", "DevOps Engineer", "Cloud Architect"],
  cta: "View My Work",
}

export const aboutContent = {
  subtitle: "About Me",
  title: "Who I Am",
  description: [
    "I am a Senior Software Engineer with over 10 years of experience in developing scalable applications and leading engineering teams. My passion for technology drives me to continuously learn and adapt to new challenges.",
    "I specialize in cloud architecture and DevOps practices, ensuring high availability and performance for applications. I have worked on various projects that have significantly improved user experience and system efficiency.",
    "In my career, I have collaborated with cross-functional teams to deliver high-quality software solutions. I am committed to writing clean, maintainable code and fostering a collaborative environment.",
  ],
  stats: [
    { label: "Years Exp.", value: "10+" },
    { label: "Projects", value: "30+" },
    { label: "Languages", value: "8+" },
  ],
  tabs: [
    {
      id: "about",
      label: "About Me",
      content: "I am a Senior Software Engineer with a strong background in cloud computing and software development.",
    },
    {
      id: "expertise",
      label: "Expertise",
      content: "I have extensive experience in software development, cloud computing, and DevOps practices.",
    },
    {
      id: "journey",
      label: "My Journey",
      content: `
        My journey in technology began with a fascination for computers at a young age, tinkering with hardware and writing my first lines of code in BASIC. In college, I pursued a degree in Computer Science, where I developed a strong foundation in algorithms, data structures, and software engineering principles.

        My professional career started as a Junior Developer at a fast-paced startup, where I quickly learned the importance of agile development and teamwork. Over the years, I advanced to more senior roles, taking on responsibilities such as leading development teams, architecting scalable cloud solutions, and mentoring junior engineers.

        I have worked across various industries, including fintech, healthcare, and e-commerce, delivering impactful projects such as cloud migrations, microservices architectures, and automation pipelines. My passion for continuous learning has driven me to earn certifications in AWS and DevOps, and to stay up-to-date with the latest trends in technology.

        Today, I am a Senior Software Engineer, collaborating with cross-functional teams to build innovative products and drive digital transformation. I am committed to fostering a culture of excellence, sharing knowledge, and inspiring the next generation of engineers.
      `,
    },
  ],
  skills: [
    { name: "JavaScript", color: "bg-violet-500/20 text-violet-300" },
    { name: "React", color: "bg-emerald-500/20 text-emerald-300" },
    { name: "Node.js", color: "bg-blue-500/20 text-blue-300" },
    { name: "Python", color: "bg-purple-500/20 text-purple-300" },
    { name: "AWS", color: "bg-indigo-500/20 text-indigo-300" },
    { name: "Docker", color: "bg-red-500/20 text-red-300" },
    { name: "Kubernetes", color: "bg-teal-500/20 text-teal-300" },
    { name: "Machine Learning", color: "bg-yellow-500/20 text-yellow-300" },
    { name: "Data Analysis", color: "bg-pink-500/20 text-pink-300" },
    { name: "DevOps", color: "bg-orange-500/20 text-orange-300" },
  ],
}

export const skillsContent = {
  subtitle: "Skills & Expertise",
  title: "My Technical Proficiency",
  description: "I have a wide range of skills in software development, cloud computing, and DevOps.",
  skills: [
    { name: "JavaScript", color: "bg-violet-500/20 text-violet-300", level: 95 },
    { name: "React", color: "bg-emerald-500/20 text-emerald-300", level: 90 },
    { name: "Node.js", color: "bg-blue-500/20 text-blue-300", level: 85 },
    { name: "Python", color: "bg-purple-500/20 text-purple-300", level: 80 },
    { name: "AWS", color: "bg-indigo-500/20 text-indigo-300", level: 85 },
    { name: "Docker", color: "bg-red-500/20 text-red-300", level: 90 },
    { name: "Kubernetes", color: "bg-teal-500/20 text-teal-300", level: 85 },
  ],
}

export const projectsContent = {
  subtitle: "Featured Projects",
  title: "My Recent Work",
  description: "Here are some of my notable projects that showcase my skills and expertise.",
  viewAllText: "View all projects",
  projects: [
    {
      title: "Cloud Migration Project",
      description: "Led a team in migrating legacy applications to AWS, improving scalability and reducing costs.",
      techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/webscrape.png?height=300&width=500",
    },
    {
      title: "Microservices Architecture",
      description: "Designed and implemented a microservices architecture for a high-traffic e-commerce platform.",
      techStack: ["Node.js", "React", "MongoDB", "Docker", "Kubernetes"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/imgupscaler.png",
    },
    {
      title: "DevOps Automation",
      description: "Automated CI/CD pipelines for multiple projects, reducing deployment time by 50%.",
      techStack: ["Jenkins", "Docker", "Kubernetes", "AWS", "Terraform"],
      demoUrl: "#",
      githubUrl: "#",
      image: "/syncheck.png",
    },
  ],
  codeButtonText: "Code",
  demoButtonText: "Live Demo",
}

export const experienceContent = {
  subtitle: "Professional Experience",
  title: "My Career Journey",
  description: "My journey through the tech industry and the valuable experience I've gained along the way.",
  experiences: [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations",
      period: "2024 - Present",
      description: "Leading a team of developers in building scalable web applications and cloud solutions.",
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      period: "2024 - 2025",
      description: "Implemented CI/CD pipelines and automated deployment processes for various projects.",
    },
    {
      title: "Software Developer",
      company: "Startup Inc",
      period: "2020 - Present",
      description: "Developed and maintained web applications using modern technologies and frameworks.",
    },
  ],
}

export const contactContent = {
  subtitle: "Get In Touch",
  title: "Let's Connect",
  description: "Have a project in mind or want to discuss potential opportunities? Feel free to reach out!",
  formLabels: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
    sending: "Sending...",
  },
  successMessage: {
    title: "Message Sent Successfully!",
    description: "Thank you for reaching out. I'll get back to you as soon as possible.",
    button: "Send Another Message",
  },
  contactInfo: {
    title: "Contact Information",
    email: {
      label: "Email",
      value: "jane.smith@example.com",
    },
    github: {
      label: "GitHub",
      value: "#",
    },
    linkedin: {
      label: "LinkedIn",
      value: "#",
    },
    availability: "I'm currently available for freelance work and full-time positions. Feel free to reach out if you have any questions or want to discuss a project!",
  },
}

export const footerContent = {
  description: "Senior Software Engineer creating innovative solutions for complex problems.",
  quickLinks: ["Home", "About", "Skills", "Projects", "Experience", "Contact"],
  backToTop: "Back to top",
}
