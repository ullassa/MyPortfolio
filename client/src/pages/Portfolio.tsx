
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubStats } from "@/components/GitHubStats";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { SimpleBackground } from "@/components/SimpleBackground";
import { FloatingActionMenu } from "@/components/FloatingActionMenu";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Download, Eye, Github, Linkedin, Mail } from "lucide-react";

export default function Portfolio() {

  const downloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/api/resume/download';
    link.download = 'Ullas_SA_Resume.pdf';
    link.click();
  };

  const previewResume = () => {
    // Open resume in new tab for preview
    window.open('/api/resume/preview', '_blank');
  };

  return (
    <div className="min-h-screen bg-space text-white overflow-x-hidden">
      <SimpleBackground />
      <Navigation />

      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        
        {/* Resume Download Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 text-center">
            <Card className="glass-card p-8 max-w-2xl mx-auto">
              <Download className="text-6xl text-cyan-400 mb-6 mx-auto animate-bounce" />
              <h3 className="text-3xl font-bold gradient-text mb-4" data-testid="resume-section-title">
                Download My Resume
              </h3>
              <p className="text-gray-400 mb-8">
                Get a detailed overview of my skills, experience, and achievements in a comprehensive PDF format.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={downloadResume}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg animate-glow hover:scale-105 transition-transform duration-300 mr-4"
                  data-testid="download-resume-button"
                >
                  <Download className="mr-2" size={20} />
                  Download PDF
                </Button>
                <Button
                  onClick={previewResume}
                  variant="outline"
                  className="bg-gray-700/50 text-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                  data-testid="preview-resume-button"
                >
                  <Eye className="mr-2" size={20} />
                  Preview Resume
                </Button>
              </div>
            </Card>
          </div>
        </section>
        
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-cyan-500 hover:animate-glow transition-all duration-300"
                data-testid="footer-github"
              >
                <a href="https://github.com/ullassa" target="_blank" rel="noopener noreferrer">
                  <Github className="text-white" size={24} />
                </a>
              </Button>
              
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-cyan-500 hover:animate-glow transition-all duration-300"
                data-testid="footer-linkedin"
              >
                <a href="https://linkedin.com/in/ullas-s-a" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="text-white" size={24} />
                </a>
              </Button>
              
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-purple-500 hover:animate-glow transition-all duration-300"
                data-testid="footer-email"
              >
                <a href="mailto:ullas200410@gmail.com">
                  <Mail className="text-white" size={24} />
                </a>
              </Button>
            </div>
            
            <div className="text-gray-400">
              <p className="mb-2">© 2025 Ullas S A. All rights reserved.</p>
              <p className="text-sm">Built with passion using modern web technologies</p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Menu */}
      <FloatingActionMenu />
    </div>
  );
}
