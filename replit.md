# Magne Software Solutions Landing Page

## Overview

This is a modern, bilingual (Spanish/English) landing page for Magne Software Solutions, a software consulting company specializing in game development and staff augmentation. The application is built using a full-stack architecture with React frontend, Express backend, and PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom color palette (blues, violets, oranges)
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React Context for language switching
- **Animations**: Anime.js and GSAP for smooth animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints
- **Request Handling**: Express middleware for JSON parsing and logging
- **Error Handling**: Centralized error handling middleware

### Database Architecture
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon serverless PostgreSQL adapter
- **Validation**: Zod for schema validation

## Key Components

### Core Features
1. **Bilingual Support**: Complete Spanish/English localization with persistent language preference
2. **Contact Form**: Validated contact form with backend API integration
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Interactive Animations**: Loading screen, particle effects, and scroll-triggered animations
5. **Modern UI**: Dark theme with custom color palette and gradient effects

### Frontend Components
- **Navigation**: Fixed header with language switcher and smooth scrolling
- **Hero Section**: Animated landing area with magnetic theme and CTAs
- **Services Section**: Grid layout showcasing company services with icons and descriptions
- **About Section**: Company values, mission, and vision with animated reveal
- **Contact Section**: Form with validation and success feedback
- **Footer**: Links and company information

### Backend Components
- **Contact API**: POST endpoint for form submissions with Zod validation
- **Storage Layer**: In-memory storage with interface for future database integration
- **Vite Integration**: Development server setup with HMR support

## Data Flow

1. **Client Requests**: React components make API calls using fetch
2. **Form Submission**: Contact form data validated client-side, then sent to `/api/contact`
3. **Server Processing**: Express routes handle requests, validate with Zod schemas
4. **Response Handling**: Client receives success/error responses and updates UI accordingly
5. **State Management**: TanStack Query handles caching and synchronization
6. **Language Switching**: Context provider manages translations and localStorage persistence

## External Dependencies

### Frontend Libraries
- **UI Framework**: React with TypeScript support
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Components**: Radix UI primitives, Shadcn/UI components
- **Animations**: Anime.js, GSAP with ScrollTrigger
- **Icons**: Font Awesome, Lucide React
- **Forms**: React Hook Form with Hookform Resolvers
- **Routing**: Wouter for lightweight routing
- **Fonts**: Inter and JetBrains Mono from Google Fonts

### Backend Libraries
- **Server**: Express.js with TypeScript
- **Database**: Drizzle ORM, Neon serverless adapter
- **Validation**: Zod for schema validation
- **Development**: TSX for TypeScript execution, ESBuild for production builds

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict configuration with path mapping
- **Linting**: Configured for React and TypeScript best practices
- **Replit Integration**: Runtime error overlay and cartographer plugins

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with HMR and TypeScript checking
- **Database**: Development database connection via environment variables
- **Asset Serving**: Vite handles static assets and client-side routing

### Production
- **Build Process**: 
  1. Vite builds frontend to `dist/public`
  2. ESBuild bundles server code to `dist/index.js`
- **Server**: Express serves built frontend and API routes
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Static Assets**: Express serves built assets from dist/public directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Build Output**: Separate client and server bundles for optimal deployment

The application follows modern full-stack practices with TypeScript throughout, proper separation of concerns, and a scalable architecture that can easily accommodate future features like user authentication, CMS integration, or expanded database schemas.