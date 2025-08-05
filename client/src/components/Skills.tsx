import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Monitor, Server, Database, Code } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Monitor,
    color: "text-cyan-400",
    skills: [
      { name: "HTML/CSS", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
      { name: "Tailwind CSS", percentage: 80 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-green-400",
    skills: [
      { name: "Node.js", percentage: 75 },
      { name: "Express.js", percentage: 70 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "text-purple-400",
    skills: [
      { name: "SQL", percentage: 80 },
      { name: "MongoDB", percentage: 75 },
    ],
  },
  {
    title: "Programming",
    icon: Code,
    color: "text-yellow-400",
    skills: [
      { name: "Java", percentage: 95 },
      { name: "Python", percentage: 70 },
      { name: "Git/GitHub", percentage: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="skills-title">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card p-8 h-full">
                  <div className="text-center mb-6">
                    <Icon className={`text-4xl ${category.color} mb-4 mx-auto`} />
                    <h3 className={`text-xl font-semibold ${category.color} mb-4`} data-testid={`skill-category-${category.title.toLowerCase()}`}>
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                        className="skill-item"
                        data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span className="text-cyan-400">{skill.percentage}%</span>
                        </div>
                        <ProgressBar 
                          value={skill.percentage} 
                          neonColor={category.title === "Frontend" ? "cyan" : category.title === "Backend" ? "green" : category.title === "Database" ? "purple" : "cyan"}
                        />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
