import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Tag, Briefcase, Star, Trophy, Medal } from "lucide-react";

const education = [
  {
    id: "btech",
    institution: "K S Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Computer Science & Engineering",
    year: "2022-26",
    score: "CGPA: 8.19",
    icon: GraduationCap,
  },
  {
    id: "puc",
    institution: "Shree Gitam PU College",
    degree: "Pre University",
    field: "",
    year: "2020-22",
    score: "95.3%",
    icon: Star,
  },
  {
    id: "sslc",
    institution: "Jnana Poorna English Medium School",
    degree: "SSLC",
    field: "",
    year: "2020",
    score: "90%",
    icon: Medal,
  },
];

const achievements = [
  {
    id: "icriet",
    title: "Tag of Appreciation",
    organization: "ICRIET 2025, KSIT, Bengaluru",
    description: "Presented Animal Herd Welfare Management System, a socially impactful tech solution for agriculture.",
    icon: Tag,
    color: "border-purple-500",
  },
  {
    id: "web-bootcamp",
    title: "Web Development Bootcamp",
    organization: "Udemy Certification",
    description: "HTML, CSS, JavaScript, Responsive Design",
    icon: Award,
    color: "border-cyan-500",
  },
  {
    id: "java-course",
    title: "Java Complete Course",
    organization: "Udemy Certification",
    description: "OOPs, Core Java, DSA Programs using Visual Studio Code",
    icon: Tag,
    color: "border-green-500",
  },
  {
    id: "internship",
    title: "Java Programming Intern",
    organization: "InternPe Technologies (Mar 2025)",
    description: "Hands-on experience with Java programming, OOP concepts, and DSA implementation.",
    icon: Briefcase,
    color: "border-yellow-500",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="education-title">
            Education & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto" />
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-8" data-testid="education-timeline-title">
              Educational Journey
            </h3>
            <div className="space-y-8">
              {education.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8"
                  >
                    {/* Timeline connector */}
                    <div className="absolute left-0 top-6 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                    {index < education.length - 1 && (
                      <div className="absolute left-1.5 top-9 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                    )}
                    
                    <Card className="glass-card p-6" data-testid={`education-${item.id}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold text-white">{item.degree}</h4>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {item.year}
                        </Badge>
                      </div>
                      
                      {item.field && (
                        <p className="text-cyan-400 mb-2">{item.field}</p>
                      )}
                      
                      <p className="text-gray-400 mb-2">{item.institution}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-bold">{item.score}</span>
                        <Icon className="text-yellow-400" size={24} />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Achievements & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-8" data-testid="achievements-title">
              Achievements & Certifications
            </h3>
            <div className="space-y-6">
              {achievements.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`glass-card p-6 border-l-4 ${item.color}`} data-testid={`achievement-${item.id}`}>
                      <div className="flex items-start">
                        <Icon className="text-2xl mr-4 mt-1" 
                              style={{ color: item.color.replace('border-', '').replace('-500', '') === 'purple' ? '#a855f7' : 
                                           item.color.replace('border-', '').replace('-500', '') === 'cyan' ? '#06b6d4' :
                                           item.color.replace('border-', '').replace('-500', '') === 'green' ? '#10b981' : '#f59e0b' }} />
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-gray-400 mb-2">{item.organization}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
