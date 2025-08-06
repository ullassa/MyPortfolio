# Ullas S A Portfolio Website

## Overview

This is a modern, futuristic portfolio website built for Ullas S A, a Computer Science Engineering student. The application showcases his skills, projects, education, and achievements through an interactive, dark-themed interface with neon accents and smooth animations. The portfolio features a full-stack architecture with both client-side rendering and server-side API endpoints.

**🚀 Live Demo**: Deployed on Render
https://myportfolio-8p4w.onrender.com/

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client-side application is built with **React** and **TypeScript**, utilizing modern web technologies for an optimal user experience:

- **React Router**: Uses Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom neon theme variables and shadcn/ui components
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **3D Background**: Three.js integration for particle-based background effects
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation schemas
- **UI Components**: Radix UI primitives with custom styling for consistent design system

### Backend Architecture

The server is built with **Express.js** and follows RESTful API principles:

- **Framework**: Express.js with TypeScript for type safety
- **Middleware**: Custom logging, JSON parsing, and error handling
- **API Structure**: Modular route handling with separate service layers
- **Memory Storage**: In-memory data storage for visitor statistics and user data
- **Email Service**: SendGrid integration for contact form submissions to ullas200410@gmail.com with custom branded templates

### Data Storage Solutions

The application uses multiple storage approaches:

- **Database**: PostgreSQL with Drizzle ORM for potential future data persistence
- **In-Memory Storage**: Current implementation uses memory-based storage for visitor stats and user data
- **File Storage**: Static assets and images stored in the public directory
- **Local Storage**: Browser storage for theme preferences and user settings

### Authentication and Authorization

Currently implements a basic user management system:

- **User Schema**: Defined with Zod for type validation
- **Storage Interface**: Abstracted storage layer for future database integration
- **Session Management**: Basic in-memory user session handling

## External Dependencies

### Third-Party Services

- **SendGrid**: Email delivery service for contact form submissions with authenticated sender (ullas200410@gmail.com)
- **GitHub API**: Integration for displaying live GitHub statistics and repository data
- **LeetCode API**: Mock implementation for coding challenge statistics (ready for real API integration)

### Development and Build Tools

- **Vite**: Modern build tool and development server with hot module replacement
- **Drizzle Kit**: Database migration and schema management tool
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript**: Static type checking across the entire codebase

### UI and Animation Libraries

- **Framer Motion**: Advanced animation library for smooth transitions and interactive elements
- **Three.js**: 3D graphics library for particle background effects
- **Radix UI**: Accessible component primitives for building the design system
- **Tailwind CSS**: Utility-first CSS framework with custom theming

### Database and ORM

- **Neon Database**: Serverless PostgreSQL database (configured but not actively used)
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect
- **Connection Pooling**: Built-in connection management for database operations

The architecture is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend. The modular approach allows for easy feature additions and modifications while maintaining code quality and performance.

## Architecture & Functional Flow

### 🏗️ Project Architecture
MyPortfolio/ ├── client/ # Frontend (React + Vite) │ ├── src/ │ │ ├── components/ # React components │ │ │ ├── ui/ # Reusable UI components (shadcn/ui) │ │ │ ├── Hero.tsx # Landing section │ │ │ ├── About.tsx # About section │ │ │ ├── Skills.tsx # Skills showcase │ │ │ ├── Projects.tsx# Projects portfolio │ │ │ ├── Education.tsx# Education timeline │ │ │ ├── Contact.tsx # Contact form │ │ │ └── ... # Other components │ │ ├── hooks/ # Custom React hooks │ │ ├── lib/ # Utilities and configurations │ │ └── pages/ # Page components │ └── index.html # Entry point ├── server/ # Backend (Express.js) │ ├── index.ts # Server entry point │ ├── routes.ts # API routes │ ├── vite.ts # Vite integration │ └── services/ # Business logic │ ├── email.ts # Email service (SendGrid) │ ├── github.ts # GitHub API integration │ └── leetcode.ts # LeetCode stats ├── shared/ # Shared types and schemas │ └── schema.ts # Zod validation schemas └── public/ # Static assets


### 🔄 Functional Flow

#### 1. **Application Startup**
Server starts (Express.js)
Environment detection (development/production)
Middleware setup (CORS, JSON parsing, logging)
API routes registration
Static file serving configuration
Port binding (localhost for dev, 0.0.0.0 for production)


#### 2. **Client-Side Flow**
User Request → Vite Dev Server/Static Files → React App → Component Tree ↓ Components: Hero → About → Skills → Projects → Education → Contact ↓ State Management: React Query + Custom Hooks ↓ UI Rendering: Tailwind CSS + Framer Motion + shadcn/ui


#### 3. **API Endpoints Flow**
/api/contact → Contact form submission → SendGrid email service /api/github-stats → GitHub API integration → Repository statistics /api/leetcode-stats → LeetCode API scraping → Coding statistics /api/visitor-count → In-memory storage → Visitor analytics


#### 4. **Data Flow Architecture**
Frontend (React) ←→ API Layer (Express) ←→ External Services ↓ ↓ ↓

User interactions - Route handling - SendGrid (Email)
State management - Validation - GitHub API
UI updates - Error handling - LeetCode API
Animations - Response format - Analytics

### 🛠️ Technology Stack

#### **Frontend**
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation

#### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Validation**: Zod schemas
- **Email Service**: SendGrid API
- **HTTP Client**: node-fetch
- **Development**: tsx for TypeScript execution

#### **Build & Deployment**
- **Bundler**: Vite (client) + esbuild (server)
- **Package Manager**: npm
- **Version Control**: Git
- **Deployment**: Render/Railway/Vercel compatible
- **Environment**: Cross-platform (Windows/Linux/macOS)

### 🔧 Key Features

#### **Interactive Portfolio Sections**
- **Hero Section**: Animated introduction with typing effects
- **About**: Personal introduction and career objectives
- **Skills**: Technical skills with animated progress bars
- **Projects**: Showcase of development projects with GitHub links
- **Education**: Academic timeline and achievements
- **Contact**: Functional contact form with email integration

#### **Dynamic Data Integration**
- **GitHub Statistics**: Real-time repository and contribution data
- **LeetCode Stats**: Coding challenge statistics and progress
- **Visitor Analytics**: Page view and visitor tracking
- **Contact System**: Email notifications via SendGrid

#### **Performance & UX**
- **Responsive Design**: Mobile-first responsive layout
- **Dark Theme**: Modern dark UI with neon accents
- **Smooth Animations**: Framer Motion powered transitions
- **Fast Loading**: Vite-optimized bundle splitting
- **SEO Optimized**: Meta tags and semantic HTML

### 🚀 Development Workflow

#### **Local Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking


Environment Configuration

Development: localhost:5000 (Vite dev server + API proxy)
Production:  0.0.0.0:PORT (Static files + API server)


Deployment Process
1. Code push to GitHub
2. Automatic build trigger
3. Install dependencies (npm ci)
4. Build client (vite build)
5. Build server (esbuild)
6. Copy static assets
7. Start production server
8. Health check and go live


This gives a comprehensive overview of your portfolio's architecture and functionality that you can add to your README!
