import { ArrowRight, ArrowUpRight, Sparkles, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal, StaggerContainer, StaggerItem, HoverScale } from '@/components/ui/motion';
import { Globe3D } from './Globe3D';
import aboutPhoto from '@/assets/about-photo.png';

export const BentoSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-main">
        {/* Section header */}
        <Reveal className="mb-16">
          <p className="text-muted-foreground mb-2">About</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Building websites that{' '}
            <span className="font-serif italic font-normal">Impact.</span>
          </h2>
        </Reveal>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.1}>
          {/* Large card - Collaboration */}
          <StaggerItem className="lg:col-span-2">
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all duration-500 h-full min-h-[320px]">
                {/* Orbit visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer orbit ring */}
                  <div className="absolute w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-border/20" />
                  {/* Middle orbit ring */}
                  <div className="absolute w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full border border-border/20" />
                  {/* Inner orbit ring */}
                  <div className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full border border-border/20" />
                  
                  {/* Center profile image */}
                  <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-[3px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <img 
                        src={aboutPhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Floating avatar 1 - top */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-border/40 overflow-hidden bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating avatar 2 - left */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[15%] md:left-[20%] w-8 h-8 rounded-full border-2 border-border/40 overflow-hidden bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Floating avatar 3 - bottom left */}
                  <div className="absolute bottom-[25%] left-[25%] md:left-[30%] w-9 h-9 rounded-full border-2 border-border/40 overflow-hidden bg-secondary">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Collaboration</p>
                  <p className="text-lg md:text-xl font-display max-w-md">
                    I prioritize client collaboration, fostering open communication
                  </p>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 mt-4 text-sm text-foreground hover:text-primary transition-colors group/link"
                  >
                    Book a call
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Experience card */}
          <StaggerItem>
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-8 hover:border-border/60 transition-all duration-500 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold mb-3">The Inside Scoop</h3>
                <p className="text-muted-foreground text-sm">
                  Currently building scalable SaaS applications and helping startups bring their vision to life.
                </p>
                <Button variant="outline" size="sm" className="mt-4" asChild>
                  <a href="#work">
                    View Work
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Globe card - Full width with timezone info */}
          <StaggerItem className="lg:col-span-3">
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all duration-500">
                {/* Header content */}
                <div className="text-center pt-8 pb-4 px-8">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6">
                    I'm very flexible with time{' '}
                    <span className="text-accent">zone communications</span>
                  </h3>
                  
                  {/* Country badges */}
                  <div className="flex justify-center gap-3 flex-wrap">
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-border/30 text-sm flex items-center gap-2">
                      <img src="https://flagcdn.com/w40/gb.png" alt="UK flag" className="w-5 h-4 object-cover rounded-sm" />
                      UK
                    </span>
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-accent/50 text-sm flex items-center gap-2 text-accent">
                      <img src="https://flagcdn.com/w40/in.png" alt="India flag" className="w-5 h-4 object-cover rounded-sm" />
                      India
                    </span>
                    <span className="px-4 py-2 rounded-full bg-card/80 border border-border/30 text-sm flex items-center gap-2">
                      <img src="https://flagcdn.com/w40/us.png" alt="USA flag" className="w-5 h-4 object-cover rounded-sm" />
                      USA
                    </span>
                  </div>
                </div>
                
                {/* Globe */}
                <div className="relative h-[400px] md:h-[450px]">
                  <Globe3D />
                  
                  {/* Location badge overlay */}
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-secondary/80 border border-border/30 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Remote</p>
                    <p className="text-xl font-display font-bold">India</p>
                  </div>
                </div>
              </div>
            </HoverScale>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
