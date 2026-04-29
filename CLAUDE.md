# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Francis Oladosu, a Senior Software Engineer. Built with React 19, TypeScript, Vite, and Tailwind CSS. Features smooth animations with Framer Motion and scroll-based interactions.

## Development Commands

```bash
# Navigate to project directory
cd my-portfolio

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Single-Page Application Structure

The entire portfolio is a single-page React application (`src/App.tsx`) with the following component sections:

- **Header**: Fixed vertical sidebar navigation (desktop) or top mobile menu
- **Hero**: Landing section with profile image, intro text, and CTA buttons
- **About**: Personal background and experience statistics
- **Skills**: Technical skills grid with icons and technologies
- **Experience**: Timeline of work history
- **Projects**: Featured and secondary project showcases
- **Contact**: Contact form using Formspree
- **Footer**: Copyright notice

### Key Design Patterns

- **Component-based architecture**: Each section is a separate functional component within App.tsx
- **Scroll-based navigation**: Uses smooth scrolling to navigate between sections via anchor links
- **Intersection Observer**: `react-intersection-observer` triggers animations when sections enter viewport
- **Responsive sidebar**: Fixed left sidebar (20px width) on desktop, collapsible top menu on mobile
- **All styles use Tailwind CSS**: Utility-first styling with custom Tailwind configuration

### Animation Strategy

- **Framer Motion** for all animations (entrance, hover, tap interactions)
- **useInView** hook triggers animations once when sections become visible (triggerOnce: true)
- Staggered animations for skill cards using `containerVariants` and `cardVariants`

## Technology Stack

- **React 19.1.1**: Latest React with modern hooks
- **TypeScript**: Full type safety throughout
- **Vite 7**: Fast build tool and dev server
- **Tailwind CSS 3.4**: Utility-first styling
- **Framer Motion 12**: Declarative animations
- **Lucide React**: Icon library
- **React Intersection Observer**: Scroll-based animation triggers

### Notable Dependencies (Currently Installed but Unused)

- `@react-three/fiber` and `@react-three/drei`: Three.js integration (commented out in code)
- `@tsparticles/react`: Particle effects (commented out in code)
- `three`: 3D graphics library (commented out in code)

## File Structure

```
my-portfolio/
├── src/
│   ├── App.tsx          # Main application component (all sections defined here)
│   ├── main.tsx         # React entry point
│   ├── App.css          # Component-specific styles (loading spinner)
│   ├── index.css        # Global styles and Tailwind imports
│   └── assets/
│       ├── Francis-Ola.jpg                      # Profile image
│       └── Francis-Oladosu-Resume-20250910.pdf  # Downloadable resume
├── public/              # Static assets (favicons)
├── dist/                # Production build output
└── index.html           # HTML entry point
```

## Styling Conventions

- **Black/neutral color scheme**: Uses `bg-black`, `bg-neutral-950`, `bg-neutral-900` for backgrounds
- **Consistent spacing**: `py-24` for section padding, `lg:ml-20` to account for sidebar
- **Border styling**: `border-neutral-800` for subtle borders
- **Responsive breakpoints**: Uses `lg:` prefix for desktop (sidebar appears at this breakpoint)
- **Hover states**: Transition effects on cards, buttons, and icons
- **Custom background**: Grid pattern defined in Tailwind config

## Deployment

The site deploys to GitHub Pages at `https://horlarepo.github.io/Portfolio/`:

- Base path configured in `vite.config.ts` as `/Portfolio/`
- Deploy script uses `gh-pages` package
- Production build outputs to `dist/` directory

## Important Notes

- The entire UI is contained in a single 975-line `App.tsx` file
- ESLint is configured but has disabled rules at the top of App.tsx for `no-unused-vars` and `no-explicit-any`
- Formspree endpoint in Contact form needs to be updated with actual form ID (currently placeholder)
- There's extensive commented-out code at the bottom of App.tsx for particle effects and 3D models
- Loading screen displays for 1.5 seconds on initial page load
- Active navigation state is determined by scroll position using intersection of sections with viewport center
