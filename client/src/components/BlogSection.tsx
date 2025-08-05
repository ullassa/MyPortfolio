import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ArrowRight, Code, Cloud, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const blogPosts = [
  {
    id: "dsa-fundamentals",
    title: "Mastering Data Structures: A Comprehensive Guide to Arrays and Linked Lists",
    excerpt: "Deep dive into fundamental data structures with practical examples and implementation strategies for competitive programming.",
    category: "DSA",
    readTime: "8 min read",
    publishDate: "2025-01-15",
    tags: ["Arrays", "Linked Lists", "Java", "Problem Solving"],
    featured: true,
  },
  {
    id: "web-development-trends",
    title: "Modern Web Development: React Best Practices and Performance Optimization",
    excerpt: "Exploring the latest trends in web development, from React hooks to performance optimization techniques.",
    category: "Web Development",
    readTime: "12 min read",
    publishDate: "2025-01-10",
    tags: ["React", "JavaScript", "Performance", "Best Practices"],
    featured: true,
  },
  {
    id: "cloud-computing-basics",
    title: "Introduction to Cloud Computing: AWS Fundamentals for Beginners",
    excerpt: "Getting started with cloud computing concepts and AWS services for modern application deployment.",
    category: "Cloud Computing",
    readTime: "10 min read",
    publishDate: "2025-01-05",
    tags: ["AWS", "Cloud", "DevOps", "Deployment"],
    featured: false,
  },
  {
    id: "algorithm-optimization",
    title: "Algorithm Optimization Techniques: From Brute Force to Dynamic Programming",
    excerpt: "Learn how to optimize algorithms and improve time complexity using advanced programming techniques.",
    category: "DSA",
    readTime: "15 min read",
    publishDate: "2024-12-28",
    tags: ["Algorithms", "Dynamic Programming", "Optimization"],
    featured: false,
  },
  {
    id: "responsive-design",
    title: "Creating Responsive Web Applications with Tailwind CSS",
    excerpt: "Master responsive design principles and create beautiful, mobile-first web applications.",
    category: "Web Development",
    readTime: "9 min read",
    publishDate: "2024-12-20",
    tags: ["CSS", "Tailwind", "Responsive Design", "Mobile"],
    featured: false,
  },
  {
    id: "microservices-architecture",
    title: "Understanding Microservices Architecture in Modern Applications",
    excerpt: "Explore microservices patterns, benefits, and implementation strategies for scalable applications.",
    category: "Cloud Computing",
    readTime: "14 min read",
    publishDate: "2024-12-15",
    tags: ["Microservices", "Architecture", "Scalability"],
    featured: false,
  },
];

const categories = [
  { name: "All", icon: BookOpen, color: "text-cyan-400" },
  { name: "DSA", icon: Code, color: "text-purple-400" },
  { name: "Web Development", icon: Brain, color: "text-green-400" },
  { name: "Cloud Computing", icon: Cloud, color: "text-blue-400" },
];

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter(
    post => activeCategory === "All" || post.category === activeCategory
  );

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="blog-title">
            Knowledge Sharing
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sharing insights on DSA, web development, and cloud computing through detailed articles and tutorials.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                variant={activeCategory === category.name ? "default" : "outline"}
                className={cn(
                  "px-6 py-3 rounded-full transition-all duration-300",
                  activeCategory === category.name
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-gray-700/50 text-gray-400 hover:bg-purple-500/10"
                )}
                data-testid={`blog-filter-${category.name.toLowerCase().replace(' ', '-')}`}
              >
                <Icon size={18} className="mr-2" />
                {category.name}
              </Button>
            );
          })}
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Featured Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card group hover:border-purple-500/50 transition-all duration-300 hover:scale-105 h-full">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          Featured
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300" data-testid={`blog-post-title-${post.id}`}>
                        {post.title}
                      </h4>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3" data-testid={`blog-post-excerpt-${post.id}`}>
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs text-gray-500"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:text-white p-0"
                          data-testid={`blog-read-more-${post.id}`}
                        >
                          Read More <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-300 mb-6">Recent Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card group hover:border-gray-600/50 transition-all duration-300 h-full">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2" data-testid={`blog-post-title-${post.id}`}>
                        {post.title}
                      </h4>
                      
                      <p className="text-gray-400 mb-3 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:text-white p-0 h-auto"
                          data-testid={`blog-read-more-${post.id}`}
                        >
                          Read <ArrowRight size={12} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-gray-700/50 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 border-gray-600 hover:border-cyan-500/30"
            data-testid="blog-view-all"
          >
            <BookOpen size={20} className="mr-2" />
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
