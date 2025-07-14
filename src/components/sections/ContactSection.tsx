import React, { useState } from 'react';
import { Mail, MessageSquare, Zap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending to both Discord and Telegram...');
    
    const formData = { name, email, subject, message };
    console.log('Sending form data:', formData);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setStatus('✅ ' + result.message);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setStatus('❌ Failed to send message: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('❌ Error: Cannot connect to server');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-cyber text-4xl md:text-6xl font-bold mb-6">
            <span className="text-glow bg-gradient-cyber bg-clip-text text-transparent">
              Contact.init()
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-code max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's establish a secure connection and start building something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="cyber-card p-8">
                <h3 className="font-cyber text-2xl font-bold text-primary mb-6">
                  Initialize Contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-cyber text-lg font-bold text-foreground mb-2">
                        Email Protocol
                      </h4>
                      <p className="text-muted-foreground font-code text-sm">
                        Direct email communication for formal inquiries and project discussions.
                      </p>
                      <a 
                        href="mailto:dev@matrix.com" 
                        className="text-primary hover:text-primary-glow transition-colors duration-300 font-code text-sm"
                      >
                        dev@matrix.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-secondary">
                      <MessageSquare className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-cyber text-lg font-bold text-foreground mb-2">
                        Discord Channel
                      </h4>
                      <p className="text-muted-foreground font-code text-sm">
                        Real-time communication for quick questions and project updates.
                      </p>
                      <span className="text-secondary font-code text-sm">
                        DevMatrix#1337
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-accent">
                      <Zap className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-cyber text-lg font-bold text-foreground mb-2">
                        Telegram Network
                      </h4>
                      <p className="text-muted-foreground font-code text-sm">
                        Secure messaging for confidential project discussions.
                      </p>
                      <span className="text-accent font-code text-sm">
                        @devmatrix_official
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="cyber-card p-6">
                <h4 className="font-cyber text-lg font-bold text-success mb-4">
                  Response Matrix
                </h4>
                <div className="space-y-3 font-code text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries:</span>
                    <span className="text-success">{"< 24 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Proposals:</span>
                    <span className="text-primary">{"< 48 hours"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Urgent Issues:</span>
                    <span className="text-accent">{"< 6 hours"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="cyber-card p-8">
              <h3 className="font-cyber text-2xl font-bold text-foreground mb-6">
                Send Transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-code text-muted-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-code text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm font-code text-blue-200 mb-2">
                    <strong>📱 Dual Platform Messaging:</strong>
                  </p>
                  <p className="text-xs font-code text-muted-foreground">
                    Your message will be automatically sent to both Discord and Telegram for faster response times.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-code text-muted-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-code text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm resize-none"
                    placeholder="Describe your project, requirements, timeline, budget, or any questions you have..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="cyber"
                  disabled={isLoading}
                  className="w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Transmitting to Both Platforms...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send to Discord & Telegram</span>
                      </>
                    )}
                  </span>
                </Button>
              </form>

              {/* Status Display */}
              {status && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  status.includes('✅') 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  <p className="text-sm font-code">{status}</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/20">
                <p className="text-xs font-code text-muted-foreground leading-relaxed">
                  <strong>Note:</strong> This form will send your message directly to both Discord and Telegram accounts.
                  Please ensure your contact information is correct so I can respond promptly. 
                  All communications are encrypted and confidential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};