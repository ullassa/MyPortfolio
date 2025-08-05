import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Medal, Star } from "lucide-react";

const stats = [
  { value: "50+", label: "DSA Problems Solved", color: "text-cyan-400" },
  { value: "3+", label: "Projects Completed", color: "text-green-400" },
  { value: "8.19", label: "CGPA", color: "text-purple-400" },
  { value: "2+", label: "Certifications", color: "text-yellow-400" },
];

const badges = [
  { label: "Problem Solver", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { label: "Full Stack", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { label: "DSA Expert", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "AI Explorer", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
];

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="about-title">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8 text-center">
              <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                <Code className="text-6xl text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-center gap-2 flex-wrap">
                  {badges.map((badge, index) => (
                    <Badge
                      key={index}
                      className={badge.color}
                      data-testid={`badge-${badge.label.toLowerCase().replace(' ', '-')}`}
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed" data-testid="about-description-1">
              Enthusiastic Computer Science and Engineering student with strong problem-solving skills in Data Structures and Algorithms using Java. Experienced in building responsive frontend web applications using HTML, CSS, JavaScript, and Tailwind CSS, along with basic backend development using SQL, Node.js, and Express.js.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed" data-testid="about-description-2">
              Currently exploring AI fundamentals and beginner-level Generative AI tools to stay updated with modern tech. Passionate about clean UI, efficient code, and contributing effectively in both individual and team-based projects.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card p-4 text-center hover:border-purple-500/50 transition-colors duration-300">
                    <div className={`text-3xl font-bold mb-2 ${stat.color}`} data-testid={`stat-value-${index}`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm" data-testid={`stat-label-${index}`}>
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
