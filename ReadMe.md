# Ullas S A Portfolio Website

## Overview

This is a modern, futuristic portfolio website built for Ullas S A, a Computer Science Engineering student. The application showcases his skills, projects, education, and achievements through an interactive, dark-themed interface with neon accents and smooth animations. The portfolio features a full-stack architecture with both client-side rendering and server-side API endpoints.

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

## 🚀 Live Deployment

### Production URL
- **Live Website**: [Coming Soon - Deploy in Progress]
- **Repository**: [https://github.com/ullassa/MyPortfolio](https://github.com/ullassa/MyPortfolio)

## 📦 Deployment Guide

### Prerequisites
- Node.js 18+ installed
- Git installed
- SendGrid account (for email functionality)

### Quick Deploy to Railway (Free Hosting)

1. **Fork/Clone Repository**
   ```bash
   git clone https://github.com/ullassa/MyPortfolio.git
   cd MyPortfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file:
   ```bash
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=ullas200410@gmail.com
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy to Railway**
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub account
   - Select "Deploy from GitHub repo"
   - Choose your forked repository
   - Add environment variables in Railway dashboard
   - Deploy automatically

### Alternative Deployment Options

#### Vercel (Frontend Only)
```bash
npm run build
npx vercel --prod
```

#### Render (Full-Stack)
- Connect GitHub repo at [render.com](https://render.com)
- Build Command: `npm run build`
- Start Command: `npm start`

#### Local Development
```bash
npm run dev
# Visit http://localhost:5000
```

### Environment Variables Required
| Variable | Description | Required |
|----------|-------------|----------|
| `SENDGRID_API_KEY` | SendGrid API key for email functionality | Yes |
| `SENDGRID_FROM_EMAIL` | Verified sender email address | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (auto-set by hosting platforms) | No |

### 🚨 Deployment Troubleshooting

#### Common Issues & Solutions

**1. Application Crashes on Railway/Render**
```bash
# Check these configurations:
- Ensure NODE_ENV=production in environment variables
- Verify SENDGRID_API_KEY is set correctly
- Check that build command completes successfully
```

**2. Email Functionality Not Working**
```bash
# Solutions:
- Regenerate SendGrid API key if exposed publicly
- Verify sender email is authenticated in SendGrid
- Check SENDGRID_FROM_EMAIL matches verified sender
```

**3. Build Failures**
```bash
# Run locally to debug:
npm run build
npm start

# Check for missing dependencies:
npm install
```

**4. Port Issues**
```bash
# For production deployment:
# Let hosting platform set PORT automatically
# Don't hardcode port in production
```

#### Deployment Status Check
After deployment, verify these endpoints:
- `GET /` - Homepage loads correctly
- `GET /api/health` - Server health check
- `POST /api/contact` - Contact form functionality
- `GET /api/resume/download` - Resume download works

### Live Demo
🌐 **Portfolio URL**: [Your deployed URL will be here]

### Features
- ✅ Responsive design for all devices
- ✅ Contact form with email notifications
- ✅ Resume download functionality
- ✅ GitHub stats integration
- ✅ Project showcase with live demos
- ✅ Dark theme with neon accents
- ✅ Smooth animations and transitions
- ✅ SEO optimized

## 🛠️ Local Development