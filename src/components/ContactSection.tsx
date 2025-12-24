import { Mail, ArrowUpRight, Linkedin, Github, Twitter, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(258_90%_66%/0.08)_0%,transparent_50%)]" />
      
      <div className="container-main relative">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-muted-foreground mb-4">Let's work together on your next project</p>
            <motion.a 
              href="mailto:anandkishore060@gmail.com"
              className="text-xl sm:text-3xl md:text-5xl font-display font-bold gradient-text inline-block break-all"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              anandkishore060@gmail.com
            </motion.a>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <Button variant="default" size="lg" type="submit" className="w-full">
                Send Message
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </Reveal>

          {/* Contact info */}
          <div className="space-y-6">
            {/* Social links */}
            <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.05}>
              <StaggerItem>
                <HoverScale>
                  <a
                    href="https://www.linkedin.com/in/anandkishore060/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm">LinkedIn</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                </HoverScale>
              </StaggerItem>
              
              <StaggerItem>
                <HoverScale>
                  <a
                    href="https://github.com/anandkishore06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm">GitHub</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                </HoverScale>
              </StaggerItem>
              
              <StaggerItem>
                <HoverScale>
                  <a
                    href="https://x.com/anandkishore06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all"
                  >
                    <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm">Twitter</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                </HoverScale>
              </StaggerItem>
              
              <StaggerItem>
                <HoverScale>
                  <a
                    href="mailto:anandkishore060@gmail.com"
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm">Email</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                </HoverScale>
              </StaggerItem>
              
              <StaggerItem>
                <HoverScale>
                  <a
                    href="tel:+917070382594"
                    className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all"
                  >
                    <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm">+91 7070382594</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                </HoverScale>
              </StaggerItem>
            </StaggerContainer>

            {/* Location */}
            <Reveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-2xl font-display font-bold">India</p>
                <p className="text-muted-foreground text-sm mt-1">Open to remote work worldwide</p>
              </div>
            </Reveal>

            {/* Availability */}
            <Reveal delay={0.4}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm text-muted-foreground">Currently available</span>
                </div>
                <p className="text-lg font-medium">Looking for exciting opportunities to collaborate on innovative projects.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
