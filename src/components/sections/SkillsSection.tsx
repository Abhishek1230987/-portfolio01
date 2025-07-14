import { useState } from 'react';
import { Code, Database, Cloud, Wrench } from 'lucide-react';

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      icon: Code,
      title: "Frontend",
      color: "primary",
      skills: [
        { name: "React/Next.js", level: 95 },
        { name: "TypeScript", level: 40 },
        { name: "Tailwind CSS", level: 80 },
        {name: "Html/CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Responsive Design", level: 70 },


      ]
    },
    backend: {
      icon: Database,
      title: "Backend",
      color: "secondary",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "PostgreSQL", level: 40 },
        { name: "MongoDB", level: 80 }
      ]
    },
    cloud: {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "accent",
      skills: [
        { name: "Docker", level: 80 },   
        { name: "Monitoring", level: 72 }
      ]
    },
    tools: {
      icon: Wrench,
      title: "Tools & AI",
      color: "success",
      skills: [
        { name: "Git/GitHub", level: 80 },
        { name: "AI/ML Integration", level: 70 },
        { name: "WebGL/WebRTC", level: 65 },
        { name: "Figma/Design", level: 80 },
        { name: "Testing", level: 70 },
        { name: "Performance", level: 75 }
      ]
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Skills.json
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-code max-w-2xl mx-auto">
            A comprehensive overview of technologies and tools in my digital arsenal.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-cyber font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-${category.color} text-${category.color}-foreground shadow-glow-${category.color}`
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="max-w-4xl mx-auto">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div
              key={key}
              className={`transition-all duration-500 ${
                activeCategory === key ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
              }`}
            >
              {activeCategory === key && (
                <div className="cyber-card p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className={`p-3 rounded-lg bg-${category.color}`}>
                      <category.icon className={`w-6 h-6 text-${category.color}-foreground`} />
                    </div>
                    <h3 className="font-cyber text-3xl font-bold text-foreground">
                      {category.title} Technologies
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-code text-foreground font-medium">
                            {skill.name}
                          </span>
                          <span className={`font-cyber font-bold text-${category.color}`}>
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-${category.color} rounded-full transition-all duration-1000 ease-out relative`}
                            style={{ width: `${skill.level}%` }}
                          >
                            <div className={`absolute inset-0 bg-${category.color} opacity-50 animate-pulse`}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 p-6 bg-muted/20 rounded-lg border border-border/20">
                    <h4 className="font-cyber text-lg font-bold text-foreground mb-3">
                      {category.title} Focus Areas
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm font-code text-muted-foreground">
                      {key === 'frontend' && (
                        <>
                          <div>• Modern React Patterns & Hooks</div>
                          <div>• Responsive Design & Animations</div>
                          <div>• Performance Optimization</div>
                          <div>• 3D Graphics & WebGL</div>
                        </>
                      )}
                      {key === 'backend' && (
                        <>
                          <div>• RESTful APIs</div>
                          <div>• Database Design & Optimization</div>
                          <div>• Authentication & Security</div>
                          <div>• Microservices Architecture</div>
                        </>
                      )}
                      {key === 'cloud' && (
                        <>
                          <div>• Container Orchestration</div>
                        
                          
                          <div>• Monitoring & Logging</div>
                        </>
                      )}
                      {key === 'tools' && (
                        <>
                          <div>• AI/ML Model Integration</div>
                          <div>• Version Control & Collaboration</div>
                          <div>• Testing & Quality Assurance</div>
                          <div>• UI/UX Design Principles</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Skill Matrix Overview */}
        <div className="mt-16 cyber-card p-8">
          <h3 className="font-cyber text-2xl font-bold text-accent mb-6 text-center">
            Skill Matrix Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(skillCategories).map(([key, category]) => {
              const avgLevel = Math.round(
                category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
              );
              return (
                <div key={key} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-${category.color} flex items-center justify-center`}>
                    <category.icon className={`w-8 h-8 text-${category.color}-foreground`} />
                  </div>
                  <div className="font-cyber text-lg font-bold text-foreground">
                    {avgLevel}%
                  </div>
                  <div className="font-code text-sm text-muted-foreground">
                    {category.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};