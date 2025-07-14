import { Code, Brain, Zap, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const features = [
    {
      icon: Code,
      title: "Full Stack Mastery",
      description: "Proficient in both frontend and backend technologies, creating seamless end-to-end solutions."
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Specializing in implementing AI and machine learning solutions into modern applications."
    },
    {
      icon: Zap,
      title: "Performance Focused",
      description: "Optimizing applications for speed, efficiency, and scalability across all platforms."
    },
    {
      icon: Rocket,
      title: "Innovation Drive",
      description: "Constantly exploring new technologies and pushing the boundaries of what's possible."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
            <span className="text-glow bg-gradient-secondary bg-clip-text text-transparent">
              About.exe
            </span>
          </h2>
          <div className="cyber-card p-6 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground font-code leading-relaxed">
              I'm a passionate developer who transforms ideas into digital reality. 
              With expertise spanning modern web technologies, AI integration, and cloud solutions, 
              I craft experiences that bridge the gap between imagination and implementation.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="cyber-card p-8">
              <h3 className="font-cyber text-2xl font-bold text-primary mb-6">
                Personal Matrix
              </h3>
              
              <div className="space-y-4 font-code">
                <div className="flex items-center justify-between py-2 border-b border-border/20">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground">Developer</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/20">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">Global</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/20">
                  <span className="text-muted-foreground">Development:</span>
                  <span className="text-foreground">2 Years</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/20">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-success">Available for Projects</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Passion:</span>
                  <span className="text-primary">Creating Digital Magic</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="cyber-card p-8">
              <h3 className="font-cyber text-2xl font-bold text-secondary mb-6">
                Timeline.log
              </h3>
              
              <div className="space-y-6">
                {[
                  { year: '2022', event: 'Started Programming Journey', color: 'success' },
                  { year: '2023', event: 'First Full Stack Project(Threadsy)', color: 'primary' },
                  { year: '2024', event: '2nd Full Stack Project & WebRTC(MentorsHub)', color: 'secondary' },
                  { year: '2025', event: 'AI/ML Integrated project & Cloud', color: 'accent' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full bg-${item.color} shadow-glow-${item.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-code text-sm text-muted-foreground">{item.year}</span>
                        <span className="text-foreground">{item.event}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="cyber-card p-6 group hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-primary">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cyber text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground font-code text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="cyber-card p-8 text-center">
          <h3 className="font-cyber text-3xl font-bold text-accent mb-6">
            Core Philosophy
          </h3>
          <blockquote className="text-xl font-code text-muted-foreground italic leading-relaxed max-w-3xl mx-auto">
            "Code is poetry written in logic. Every function is a verse, every algorithm a stanza. 
            I don't just write programs—I compose digital symphonies that solve real-world problems."
          </blockquote>
        </div>
      </div>
    </section>
  );
};