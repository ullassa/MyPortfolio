import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { contactMessageSchema } from "@shared/schema";
import { z } from "zod";

import { sendEmail, createContactEmail } from "./services/email";
import fetch from "node-fetch";

// Get current directory in both CommonJS and ESM environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for visitor stats (in production, use a database)
let visitorStats = {
  totalVisitors: 1247,
  todayVisitors: 23,
  onlineUsers: 3,
  pageViews: 4582,
  uniqueVisitors: 892,
  averageSessionTime: "3m 45s",
  topCountries: [
    { country: "India", flag: "🇮🇳", visitors: 456 },
    { country: "United States", flag: "🇺🇸", visitors: 234 },
    { country: "Canada", flag: "🇨🇦", visitors: 123 },
    { country: "Germany", flag: "🇩🇪", visitors: 89 },
    { country: "Australia", flag: "🇦🇺", visitors: 67 },
  ],
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactMessageSchema.parse(req.body);
      
      console.log(`📧 New contact form submission from ${validatedData.name} (${validatedData.email})`);
      
      // Send email using SendGrid
      try {
        const emailData = createContactEmail(
          validatedData.name,
          validatedData.email,
          validatedData.message
        );
        
        const emailSent = await sendEmail(emailData);
        
        if (emailSent) {
          console.log(`✅ Email successfully sent to ullas200410@gmail.com`);
          res.json({ 
            success: true, 
            message: "Message sent successfully! I'll get back to you soon." 
          });
        } else {
          console.log(`⚠️ Email service not configured (missing SendGrid API key)`);
          res.json({ 
            success: true, 
            message: "Message received! I'll get back to you soon." 
          });
        }
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        res.json({ 
          success: true, 
          message: "Message received! I'll get back to you soon." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("❌ Form validation failed:", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.", 
          errors: error.errors 
        });
      } else {
        console.error("❌ Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // GitHub stats endpoint
  app.get("/api/github/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const stats = await getGitHubStats(username);
      res.json(stats);
    } catch (error) {
      console.error("GitHub API error:", error);
      res.status(500).json({ 
        error: "Failed to fetch GitHub data",
        message: "GitHub stats temporarily unavailable" 
      });
    }
  });


 


  // Resume download endpoint
  app.get("/api/resume/download", (req, res) => {
    const resumePath = path.join(__dirname, "..", "public", "resume.pdf");
    res.download(resumePath, "Ullas_SA_Resume.pdf", (err) => {
      if (err) {
        console.error("Resume download error:", err);
        res.status(404).json({ message: "Resume not found" });
      }
    });
  });

  // Resume preview endpoint
  app.get("/api/resume/preview", (req, res) => {
    const resumePath = path.join(__dirname, "..", "public", "resume.pdf");
    res.sendFile(resumePath, (err) => {
      if (err) {
        console.error("Resume preview error:", err);
        res.status(404).json({ message: "Resume not found" });
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

