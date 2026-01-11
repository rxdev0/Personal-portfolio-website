# Personal Portfolio Website

A modern, high-performance personal portfolio website built with Next.js 16, TypeScript, and Tailwind CSS v4. This site features a dynamic "Corporate/Creative" toggle, glassmorphic UI elements, and smooth custom animations to showcase skills, experience, and projects.

## 🚀 Features

- **Dynamic Hero Section**: Toggle between "Corporate" and "Creative" modes to display different personas and visual styles.
- **Modern UI/UX**:
  - Glassmorphism effects using `backdrop-filter`.
  - Custom cursor with context-aware interactions.
  - Smooth scrolling and reveal animations powered by **Framer Motion**.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Tech Stack Showcase**: Interactive grid highlighting various technologies and tools.
- **Case Studies**: Detailed project breakdowns (e.g., Flux AI).
- **Contact Form**: Integrated "Holla at me" / "Let's talk" call-to-actions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database/ORM**: [Prisma](https://www.prisma.io/)
- **Testing**: [Playwright](https://playwright.dev/)

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components
│   └── sections/         # Main page sections (Hero, About, Experience, etc.)
├── public/               # Static assets (images, icons)
├── prisma/               # Database schema and configuration
└── styles/               # Global styles and Tailwind configuration
