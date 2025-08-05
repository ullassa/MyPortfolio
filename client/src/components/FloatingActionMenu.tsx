import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp,
  Menu,
  X,
  FileText,
  Code,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: MessageCircle,
    label: "Contact",
    href: "#contact",
    color: "text-cyan-400 hover:text-cyan-300",
    bgColor: "bg-cyan-500/20 hover:bg-cyan-500/30",
  },
  {
    icon: Download,
    label: "Resume",
    href: "#resume",
    color: "text-green-400 hover:text-green-300",
    bgColor: "bg-green-500/20 hover:bg-green-500/30",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/ullassa",
    color: "text-purple-400 hover:text-purple-300",
    bgColor: "bg-purple-500/20 hover:bg-purple-500/30",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/ullas-sa",
    color: "text-blue-400 hover:text-blue-300",
    bgColor: "bg-blue-500/20 hover:bg-blue-500/30",
    external: true,
  },
  {
    icon: Code,
    label: "Projects",
    href: "#projects",
    color: "text-orange-400 hover:text-orange-300",
    bgColor: "bg-orange-500/20 hover:bg-orange-500/30",
  },
];

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank");
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <Button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              data-testid="scroll-to-top"
            >
              <ArrowUp size={20} className="text-gray-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 space-y-3"
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { delay: index * 0.1 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: 20, 
                      scale: 0.8,
                      transition: { delay: (menuItems.length - index) * 0.05 }
                    }}
                    className="flex items-center gap-3"
                  >
                    {/* Label */}
                    <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700">
                      <span className="text-sm text-gray-300 whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                    
                    {/* Button */}
                    <Button
                      onClick={() => handleItemClick(item.href, item.external)}
                      className={cn(
                        "w-12 h-12 rounded-full backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:scale-110",
                        item.bgColor
                      )}
                      data-testid={`floating-menu-${item.label.toLowerCase()}`}
                    >
                      <Icon size={20} className={item.color} />
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transition-all duration-300",
              isOpen ? "rotate-45" : "rotate-0"
            )}
            data-testid="floating-menu-toggle"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>

        {/* Pulse Animation for Main Button */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping opacity-20 pointer-events-none" />
      </div>
    </>
  );
}