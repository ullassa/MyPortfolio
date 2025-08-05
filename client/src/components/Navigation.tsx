import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Home, User, Code, FolderOpen, GraduationCap, Mail, Github, Linkedin, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#hero", icon: Home, label: "Home" },
  { href: "#about", icon: User, label: "About" },
  { href: "#skills", icon: Code, label: "Skills" },
  { href: "#projects", icon: FolderOpen, label: "Projects" },
  { href: "#education", icon: GraduationCap, label: "Education" },
  { href: "#contact", icon: Mail, label: "Contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollProgress = useScrollProgress();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 floating-nav rounded-full px-6 py-3">
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.slice(1);
            
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 relative",
                  isActive && "text-cyan-400"
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline text-sm">{item.label}</span>
              </button>
            );
          })}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-300 hover:text-cyan-400"
            data-testid="theme-toggle"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </nav>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {showScrollTop && (
          <Button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 animate-glow"
            data-testid="scroll-to-top"
          >
            <ArrowUp size={20} className="text-white" />
          </Button>
        )}
        
        <Button
          asChild
          className="w-12 h-12 rounded-full bg-gray-700 hover:bg-cyan-500 transition-all duration-300"
          data-testid="github-link"
        >
          <a href="https://github.com/ullassa" target="_blank" rel="noopener noreferrer">
            <Github size={20} className="text-white" />
          </a>
        </Button>
        
        <Button
          asChild
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-cyan-500 transition-all duration-300"
          data-testid="linkedin-link"
        >
          <a href="https://linkedin.com/in/ullas-s-a" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} className="text-white" />
          </a>
        </Button>
      </div>
    </>
  );
}
