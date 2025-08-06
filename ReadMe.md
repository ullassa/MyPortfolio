# Ullas S A Portfolio Website

## Overview

This is a modern, futuristic portfolio website built for Ullas S A, a Computer Science Engineering student. The application showcases his skills, projects, education, and achievements through an interactive, dark-themed interface with neon accents and smooth animations. The portfolio features a full-stack architecture with both client-side rendering and server-side API endpoints.

**🚀 Live Demo**: Deployed on Render

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