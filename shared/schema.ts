import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

export const skillSchema = z.object({
  name: z.string(),
  percentage: z.number().min(0).max(100),
  category: z.enum(["frontend", "backend", "database", "programming", "tools"]),
});

export type Skill = z.infer<typeof skillSchema>;

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  category: z.enum(["fullstack", "frontend", "ai", "backend"]),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  year: z.string(),
  score: z.string(),
  type: z.enum(["education", "certification", "achievement"]),
});

export type Education = z.infer<typeof educationSchema>;

// User schema for visitor tracking
export const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  visitCount: z.number().default(1),
  lastVisit: z.date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = Omit<User, 'id'>;
