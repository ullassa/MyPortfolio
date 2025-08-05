import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Dr. Rajesh Kumar",
    position: "Senior Faculty, K S Institute of Technology",
    company: "KSIT",
    content: "Ullas has consistently demonstrated exceptional problem-solving skills and a deep understanding of data structures and algorithms. His dedication to learning and innovative approach to projects makes him stand out among his peers.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "testimonial-2",
    name: "Priya Sharma",
    position: "Project Mentor",
    company: "InternPe Technologies",
    content: "During his internship, Ullas showed remarkable growth in Java programming and OOP concepts. His ability to implement complex DSA algorithms and deliver quality code within deadlines was impressive.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "testimonial-3",
    name: "Arjun Patil",
    position: "Fellow Student & Project Collaborator",
    company: "KSIT",
    content: "Working with Ullas on the Animal Herd Welfare Management System was an amazing experience. His frontend development skills and attention to UI/UX details helped create an impactful solution.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "testimonial-4",
    name: "Sneha Reddy",
    position: "Study Group Leader",
    company: "KSIT CSE Batch 2026",
    content: "Ullas is always willing to help fellow students with coding problems and DSA concepts. His explanations are clear, and his collaborative spirit makes him a valuable team member in any project.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "testimonial-5",
    name: "Prof. Anitha S",
    position: "HOD Computer Science",
    company: "K S Institute of Technology",
    content: "Ullas's presentation at ICRIET 2025 showcased his ability to create socially impactful technology solutions. His Animal Herd Welfare Management System demonstrated both technical excellence and real-world applicability.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="testimonials-title">
            What People Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Feedback from mentors, professors, and colleagues who have witnessed my journey and growth.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="glass-card p-8 md:p-12 relative overflow-hidden">
              {/* Quote Icon */}
              <Quote className="absolute top-6 left-6 text-purple-500/30" size={48} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                  data-testid={`testimonial-${testimonials[currentIndex].id}`}
                >
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-current"
                        size={24}
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg md:text-xl text-gray-300 text-center leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
                      />
                      <div className="text-center">
                        <h4 className="text-white font-semibold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-cyan-400 text-sm">
                          {testimonials[currentIndex].position}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-gray-700/50 border-gray-600 hover:bg-purple-500/20 hover:border-purple-500/30"
              data-testid="testimonial-prev"
            >
              <ChevronLeft size={20} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-purple-500 scale-125"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="w-12 h-12 rounded-full bg-gray-700/50 border-gray-600 hover:bg-purple-500/20 hover:border-purple-500/30"
              data-testid="testimonial-next"
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-cyan-400"
              data-testid="testimonial-autoplay-toggle"
            >
              {isAutoPlaying ? "Pause" : "Play"} Slideshow
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
