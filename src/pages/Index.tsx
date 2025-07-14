import { ParticleBackground } from '@/components/ParticleBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection_new';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-border/20 bg-glass backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="font-code text-sm text-muted-foreground">
              © 2025 Matrix. Built with React, Tailwind CSS, and pure passion for code.
            </p>
            <p className="font-code text-xs text-muted-foreground mt-2">
              "In the matrix of possibilities, every line of code is a choice." -ABHISHEK
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
