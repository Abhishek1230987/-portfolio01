import { ExternalLink, Github, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Threadsy",
      description: "A MERN stack e-commerce site with Stripe payments, user auth, cart, and admin dashboard, recommendation system, and more.",
      tech: ["React", "Node.js", "Stripe", "MongoDB", "Tailwind"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      github: "https://github.com/Abhishek1230987/Threadsy",
      demo: "#",
      featured: true
    },
    {
      title: "MentorsHub",
      description: "MentorsHub is a cutting-edge e-learning platform designed to enable real-time mentorship, pair programming, and collaborative learning experiences. Built for tech-savvy learners and mentors, it leverages modern web technologies like WebRTC, Socket.io",
      tech: ["Next", "TypeScript", "WebRTC", "Socket.io", "Tailwind"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      github: "https://github.com/Abhishek1230987/MentorHub",
      demo: "#",
      featured: true
    }
    
  ];

  const techColors: { [key: string]: string } = {
    "React": "bg-primary",
    "Node.js": "bg-success",
    "Next.js": "bg-foreground",
    "TypeScript": "bg-primary",
    "Python": "bg-secondary",
    "Vue.js": "bg-success",
    "Three.js": "bg-accent",
    "Docker": "bg-primary",
    "AWS": "bg-yellow-500",
    "WebSocket": "bg-secondary",
    "OpenAI": "bg-accent",
    "TensorFlow": "bg-yellow-500",
    "Web3.js": "bg-secondary",
    "Kubernetes": "bg-primary",
    "Rust": "bg-destructive",
    "WebGL": "bg-accent"
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
            <span className="text-glow bg-gradient-accent bg-clip-text text-transparent">
              Projects.db
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-code max-w-2xl mx-auto">
            A collection of digital creations that showcase the intersection of creativity and code.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h3 className="font-cyber text-2xl font-bold text-primary mb-8 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <div key={index} className="cyber-card p-0 overflow-hidden group hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <a 
                      href={project.github}
                      className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demo}
                      className="p-2 bg-background/80 backdrop-blur-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-cyber text-xl font-bold text-foreground mb-3">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground font-code text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-3 py-1 text-xs font-code uppercase tracking-wider rounded-full text-white ${techColors[tech] || 'bg-muted'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div>
          <h3 className="font-cyber text-2xl font-bold text-secondary mb-8">
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div key={index} className="cyber-card p-0 overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-cyber text-lg font-bold text-foreground mb-2">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground font-code text-xs mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-2 py-1 text-xs font-code rounded text-white ${techColors[tech] || 'bg-muted'}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs font-code rounded bg-muted text-white">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <a 
                      href={project.github}
                      className="text-primary hover:text-primary-glow transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.demo}
                      className="text-accent hover:text-accent-glow transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="cyber">
            <span className="relative z-10">Load More Projects</span>
          </Button>
        </div>
      </div>
    </section>
  );
};