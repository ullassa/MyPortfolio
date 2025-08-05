import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "dsa-journey",
    title: "DSA Journey",
    description: "Full-stack web application for tracking DSA practice with Firebase and MongoDB integration, featuring analytics dashboard and progress visualization.",
    technologies: ["JavaScript", "Firebase", "MongoDB", "HTML/CSS"],
    category: "fullstack",
    githubUrl: "https://github.com/ullassa/AlgoJourney",
    liveUrl: "https://dsa-journey.netlify.app",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    id: "animal-welfare",
    title: "Animal Herd Welfare Management",
    description: "Full-stack web application helping farmers manage animal health with buy/sell portal, veterinary support, and government schemes information.",
    technologies: ["Node.js", "Express.js", "JavaScript", "HTML/CSS"],
    category: "fullstack",
    githubUrl: "https://github.com/ullassa/Animal-Herd-Welfare-Management",
    liveUrl: "https://animal-herd-welfare-management.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
  {
    id: "custom-chatbot",
    title: "Custom Chat Bot",
    description: "AI-powered conversation interface with real-time interactions, typing indicators, and dynamic animations using Framer Motion.",
    technologies: ["AI/ML", "Tailwind CSS", "Framer Motion", "REST API"],
    category: "ai",
    githubUrl: "https://github.com/ullassa/gemini-chatbot",
    liveUrl: "https://gemini-chatbot-three-pi.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  },
];

const placeholderProjects = [
  { title: "Next Project", category: "fullstack", description: "Another exciting project is in development. Stay tuned for updates!" },
  { title: "AI Innovation", category: "ai", description: "Working on an exciting AI project that will showcase machine learning capabilities." },
  { title: "Web Application", category: "fullstack", description: "A modern web application with cutting-edge technologies and user experience." },
];

const filterTabs = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI/ML" },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter(
    project => activeFilter === "all" || project.category === activeFilter
  );

  const filteredPlaceholders = placeholderProjects.filter(
    project => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="projects-title">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
          
          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {filterTabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                variant={activeFilter === tab.id ? "default" : "outline"}
                className={cn(
                  "px-6 py-2 rounded-full transition-all duration-300",
                  activeFilter === tab.id
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-gray-700/50 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30"
                )}
                data-testid={`filter-${tab.id}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Real Projects */}
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card group hover:border-purple-500/50 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <img 
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      data-testid={`project-image-${project.id}`}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-cyan-400 mb-3" data-testid={`project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 flex-1" data-testid={`project-description-${project.id}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                        data-testid={`project-tech-${project.id}-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-6 pt-0">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-white"
                    data-testid={`project-github-${project.id}`}
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2" size={16} />
                      Code
                    </a>
                  </Button>
                  
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-white"
                    data-testid={`project-live-${project.id}`}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2" size={16} />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
          
          {/* Placeholder Projects */}
          {filteredPlaceholders.map((project, index) => (
            <motion.div
              key={`placeholder-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (filteredProjects.length + index) * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="text-4xl text-gray-500 mb-2 mx-auto" />
                        <p className="text-gray-500">{project.title}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-500 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-gray-500">
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
