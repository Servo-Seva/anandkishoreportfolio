import { Reveal } from '@/components/ui/motion';
import { Linkedin, Github, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import aboutPhoto from '@/assets/about-photo.png';
import travelPhoto from '@/assets/travel-photo.jpg';

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Bio */}
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">More About Me</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
                I'm Anand, a<br />
                creative <span className="font-serif italic font-normal text-primary">engineer</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm a proactive full-stack developer passionate about creating dynamic web experiences. 
                  From frontend to backend, I thrive on solving complex problems with clean, efficient code.
                </p>
                <p>
                  My expertise spans React, Next.js, and Node.js, and I'm always eager to learn more. 
                  When I'm not immersed in work, I'm exploring new ideas and staying curious.
                </p>
                <p className="text-foreground font-medium">
                  I believe in waking up each day eager to make a difference!
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary/60 border border-border/30 flex items-center justify-center hover:bg-secondary hover:border-primary/50 transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              {/* View Experience Link */}
              <Link to="/about#experience" className="inline-block mt-8">
                <Button variant="outline" className="group gap-2">
                  View Work Experience
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* Right - Images */}
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/30 overflow-hidden">
                    <img 
                      src={aboutPhoto} 
                      alt="Anand - Full Stack Developer" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <Link to="/travel" className="block aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border/30 overflow-hidden group cursor-pointer">
                    <div className="relative w-full h-full">
                      <img 
                        src={travelPhoto} 
                        alt="Anand traveling in the mountains" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-4">
                        <span className="text-foreground font-medium text-sm">View Travel</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
