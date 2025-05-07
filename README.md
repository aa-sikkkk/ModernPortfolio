# Modern Portfolio Website

A sleek, modern portfolio website built with Next.js, featuring smooth animations, interactive UI elements, and a beautiful design. This portfolio showcases professional experience, skills, and projects with stunning visual effects powered by Framer Motion.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features
[Modern-Portfolio-Python-Developer-ML-Enthusiast.webm](https://github.com/user-attachments/assets/d7c1704b-4c15-4cfb-b519-93738044d07e)


- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Elements**:
  - Smooth scroll navigation
  - Custom cursor
  - Animated background with shooting stars
  - Typewriter effect in hero section
  - Interactive skill bars
  - Project showcases
- **Dynamic Content**: Easily customizable content through a centralized data file
- **Performance Optimized**: Lazy loading and error boundaries
- **Accessibility**: Built with accessibility best practices

## 💻 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Custom CSS animations
- **Animation**: 
  - Framer Motion
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Form Handling**: Custom form implementation

## 📁 Project Structure

```
portfolio/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── About.tsx         # About section with tabs
│   ├── Contact.tsx       # Contact form
│   ├── CustomCursor.tsx  # Custom cursor
│   ├── ErrorBoundary.tsx # Error handling
│   ├── Experience.tsx    # Experience timeline
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── LoadingAnimation.tsx # Loading state
│   ├── Navbar.tsx        # Navigation
│   ├── Projects.tsx      # Projects showcase
│   ├── ShootingStars.tsx # Background effect
│   ├── Skills.tsx        # Skills display
│   ├── SkillsTimeline.tsx # Skills timeline
│   └── StarryBackground.tsx # Starry background
├── data/                 # Data files
│   └── content.ts        # Centralized content
├── hooks/                # Custom React hooks
│   └── useSafeLayoutEffect.ts # Safe layout effect
├── public/               # Static assets
│   └── profile-avatar.png # Profile image
└── styles/              # Additional styles
```

## 🏁 Quick Start

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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📚 Documentation

For detailed instructions on how to customize and deploy the portfolio, please refer to [SETUP.md](./SETUP.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/f1`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/f1`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Framer Motion
