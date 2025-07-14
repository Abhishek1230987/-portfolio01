import { ChevronDown, Play } from 'lucide-react';
import { TypingAnimation } from '../TypingAnimation';
import { Button } from '@/components/ui/button';
import cyberBg from '../../assets/cyber-bg.jpg';

export const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${cyberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
      
      {/* Scanning Lines */}
      <div className="absolute inset-0 scan-lines opacity-30"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Terminal Header */}
        <div className="cyber-card p-6 mb-8 text-left font-code text-sm">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-muted-foreground ml-4">matrix@dev-terminal:~$</span>
          </div>
          <div className="text-success">
            <span className="text-muted-foreground">$</span> sudo access_consciousness.exe
          </div>
          <div className="text-muted-foreground">Initializing neural interface...</div>
          <div className="text-primary">Connection established ✓</div>
          <div className="text-muted-foreground">Welcome to the matrix of my mind.</div>
        </div>

        {/* Main Heading */}
        <h1 className="font-cyber text-5xl md:text-7xl lg:text-8xl font-black mb-6">
          <span className="text-glow bg-gradient-cyber bg-clip-text text-transparent">
            ABHISHEK KUMAR SINGH
          </span>
          <br />
          <span className="glitch text-primary mt-5" data-text="MATRIX">
            MATRIX
          </span>
        </h1>

        {/* Typing Animation */}
        <div className="text-xl md:text-2xl lg:text-3xl mb-8 h-16 flex items-center justify-center">
          <TypingAnimation
            texts={[
              "Full Stack Developer",
              "AI Enthusiast", 
              "Digital Architect",
              "Code Wizard",
              "Tech Innovator"
            ]}
            className="text-muted-foreground font-code"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="cyber"
            onClick={scrollToNext}
            className="group"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Enter Matrix</span>
            </span>
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-secondary font-cyber font-bold text-sm uppercase tracking-wider"
          >
            Initialize Contact
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '2+', label: 'Projects' },
            { value: '1.5', label: 'Years of developing' },
            { value: '100%', label: 'Passion' },
            { value: '∞', label: 'Learning' }
          ].map((stat, index) => (
            <div key={index} className="cyber-card p-4">
              <div className="text-2xl md:text-3xl font-cyber font-bold text-primary text-glow">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-code uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary-glow transition-colors duration-300 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};