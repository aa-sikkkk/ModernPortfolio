# Portfolio Setup Guide

This guide provides detailed instructions for setting up, customizing, and deploying your portfolio website.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Content Customization](#content-customization)
- [Styling Customization](#styling-customization)
- [Performance Optimization](#performance-optimization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 16.8.0 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Content Customization

All website content is centralized in the `data/content.ts` file. Here's how to customize each section:

### 1. Basic Information
```typescript
// data/content.ts
export const siteConfig = {
  name: "Your Name",           // Your full name
  title: "Your Title",         // Your professional title
  email: "your.email@example.com",
  location: "Your Location",   // e.g., "San Francisco, CA"
  socials: {
    github: "your-github-url",
    linkedin: "your-linkedin-url",
  },
  copyright: `© ${new Date().getFullYear()} Your Name. All rights reserved.`,
}
```

### 2. Navigation Links
```typescript
export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]
```

### 3. Hero Section
```typescript
export const heroContent = {
  subtitle: "Your Subtitle",    // e.g., "Full Stack Developer"
  title: "Hi, I'm Your Name",
  roles: ["Role 1", "Role 2", "Role 3"],  // Your professional roles
  cta: "View My Work",          // Call to action button text
}
```

### 4. About Section
```typescript
export const aboutContent = {
  subtitle: "About Me",
  title: "Who I Am",
  description: [
    "Your first paragraph...",
    "Your second paragraph...",
    "Your third paragraph...",
  ],
  stats: [
    { label: "Years Exp.", value: "X+" },
    { label: "Projects", value: "Y+" },
    { label: "Languages", value: "Z+" },
  ],
  skills: [
    { name: "Skill 1", color: "bg-violet-500/20 text-violet-300" },
    { name: "Skill 2", color: "bg-emerald-500/20 text-emerald-300" },
    // Add more skills...
  ],
}
```

### 5. Skills Section
```typescript
export const skillsContent = {
  subtitle: "Skills & Expertise",
  title: "My Technical Proficiency",
  description: "Your skills description",
  skills: [
    { 
      name: "Skill Name",
      color: "bg-violet-500/20 text-violet-300",
      level: 95  // Skill level (0-100)
    },
    // Add more skills...
  ],
}
```

### 6. Projects Section
```typescript
export const projectsContent = {
  subtitle: "Featured Projects",
  title: "My Recent Work",
  description: "Your projects description",
  projects: [
    {
      title: "Project Title",
      description: "Project description",
      techStack: ["Tech 1", "Tech 2", "Tech 3"],
      demoUrl: "project-demo-url",
      githubUrl: "project-github-url",
      image: "/project-image.png",
    },
    // Add more projects...
  ],
}
```

### 7. Experience Section
```typescript
export const experienceContent = {
  subtitle: "Professional Experience",
  title: "My Career Journey",
  description: "Your experience description",
  experiences: [
    {
      title: "Job Title",
      company: "Company Name",
      period: "Duration",
      description: "Job description",
    },
    // Add more experiences...
  ],
}
```

### 8. Contact Section
```typescript
export const contactContent = {
  subtitle: "Get In Touch",
  title: "Let's Connect",
  description: "Your contact description",
  formLabels: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
    sending: "Sending...",
  },
  contactInfo: {
    email: {
      label: "Email",
      value: "your.email@example.com",
    },
    github: {
      label: "GitHub",
      value: "your-github-url",
    },
    linkedin: {
      label: "LinkedIn",
      value: "your-linkedin-url",
    },
  },
}
```

### Profile Image

1. Replace the profile image:
   - Place your profile image in the `public` directory
   - Name it `profile-avatar.png`
   - Recommended size: 500x500 pixels
   - Format: PNG with transparent background

## Styling Customization

The project uses Tailwind CSS with a custom theme. Main colors are violet and emerald:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        violet: {
          500: "#8B5CF6",
          // ...
        },
        emerald: {
          500: "#10B981",
          // ...
        }
      }
    }
  }
}
```

### Custom CSS Classes

The project includes several custom CSS classes in `app/globals.css`:

- `.gradient-text`: Gradient text effect
- `.glass-card`: Glassmorphism effect
- `.glow-text`: Text glow effect

## Performance Optimization

The portfolio includes several performance optimizations:

1. **Error Boundaries**: The `ErrorBoundary` component prevents app crashes
2. **Lazy Loading**: Components are loaded only when needed
3. **Responsive Design**: Optimized for all devices
4. **Safe Hooks**: Custom hooks ensure safe rendering
5. **Image Optimization**: Next.js Image component
6. **Code Splitting**: Components loaded on demand

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy!

### Other Platforms

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Serve the generated output from the `.next` directory

## Troubleshooting

### Common Issues

1. **Type Errors**
   - Make sure your TypeScript version matches the project requirements
   - Run `npm install typescript@latest` if needed

2. **Build Errors**
   - Clear the `.next` directory
   - Run `npm install` again
   - Try building with `npm run build`

3. **Image Issues**
   - Ensure images are in the correct format (PNG recommended)
   - Check image paths in `content.ts`
   - Verify image dimensions

4. **Styling Issues**
   - Clear browser cache
   - Check Tailwind configuration
   - Verify custom CSS classes

### Browser Compatibility

This portfolio is optimized for modern browsers:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+ 