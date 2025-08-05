import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import type { ContactMessage } from "@shared/schema";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "ullas200410@gmail.com",
    color: "text-cyan-400",
    borderColor: "hover:border-cyan-500/50",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91-9380827703",
    color: "text-green-400",
    borderColor: "hover:border-green-500/50",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "github.com/ullassa",
    color: "text-purple-400",
    borderColor: "hover:border-purple-500/50",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/ullas-s-a",
    color: "text-blue-400",
    borderColor: "hover:border-blue-500/50",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const { toast } = useToast();

  const sendMessage = useMutation({
    mutationFn: async (data: ContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4" data-testid="contact-title">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to collaborate on exciting projects? Let's connect and build something amazing together!
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`glass-card p-6 flex items-center space-x-4 ${info.borderColor} transition-colors duration-300`} data-testid={`contact-info-${info.title.toLowerCase()}`}>
                    <div className={`w-12 h-12 ${info.color.replace('text-', 'bg-').replace('-400', '-500/20')} rounded-full flex items-center justify-center`}>
                      <Icon className={info.color} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                      <p className="text-gray-400">{info.value}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400"
                    placeholder="Your full name"
                    data-testid="input-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-600 focus:border-cyan-400 text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                    data-testid="input-message"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={sendMessage.isPending}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 font-semibold text-lg animate-glow hover:scale-105 transition-transform duration-300"
                  data-testid="submit-button"
                >
                  {sendMessage.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
