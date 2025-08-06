import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { NeonButton } from "@/components/ui/neon-button";
import { ChevronDown, Rocket, User } from "lucide-react";

const roles = [
  "Frontend Developer",
  "Java Programmer", 
  "DSA Enthusiast",
  "Problem Solver",
  "Full Stack Developer",
  "Tech Explorer",
  "Code Optimizer",
  "Innovation Seeker"
];

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative hero-bg">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-40 h-40 mx-auto mb-8 relative"
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-full neon-border animate-glow flex items-center justify-center">
              <User size={80} className="text-white" />
            </div>
          </motion.div>
          
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-4 gradient-text animate-pulse-neon"
            data-testid="hero-name"
          >
            Ullas S A
          </motion.h1>
          
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 font-light"
            data-testid="hero-title"
          >
            Computer Science & Engineering Student
          </motion.h2>
          
          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-cyan-400 mb-8 h-16 flex items-center justify-center"
            data-testid="typing-animation"
          >
            <TypingAnimation 
              texts={roles}
              className="text-cyan-400 neon-text"
            />
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <NeonButton
              onClick={scrollToContact}
              neonColor="cyan"
              size="lg"
              className="text-lg px-8 py-4"
              data-testid="cta-button"
            >
              Let's Connect <Rocket className="ml-2" size={20} />
            </NeonButton>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-gray-400 animate-bounce" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
