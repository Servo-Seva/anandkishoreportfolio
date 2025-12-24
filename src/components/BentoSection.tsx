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
              <div className="group relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all duration-500 h-full min-h-[340px]">
                {/* SVG Orbit curves */}
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 600 340" 
                  preserveAspectRatio="xMidYMid slice"
                  fill="none"
                >
                  {/* Curved orbit lines - elliptical arcs */}
                  <ellipse 
                    cx="400" cy="170" rx="180" ry="120" 
                    stroke="hsl(var(--border))" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    fill="none"
                  />
                  <ellipse 
                    cx="400" cy="170" rx="130" ry="85" 
                    stroke="hsl(var(--border))" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    fill="none"
                  />
                  <ellipse 
                    cx="400" cy="170" rx="80" ry="50" 
                    stroke="hsl(var(--border))" 
                    strokeWidth="1" 
                    strokeOpacity="0.3"
                    fill="none"
                  />
                </svg>
                
                {/* Main profile image - center right */}
                <div className="absolute right-[20%] md:right-[25%] top-1/2 -translate-y-1/2 z-10">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-[3px] shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                      <img 
                        src={aboutPhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating avatar 1 - top center */}
                <div className="absolute right-[35%] md:right-[40%] top-[10%] z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-border/40 overflow-hidden bg-secondary shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating avatar 2 - bottom left of center */}
                <div className="absolute right-[45%] md:right-[50%] bottom-[30%] z-10">
                  <div className="w-9 h-9 rounded-full border-2 border-border/40 overflow-hidden bg-secondary shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating avatar 3 - below main */}
                <div className="absolute right-[28%] md:right-[32%] bottom-[20%] z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-border/40 overflow-hidden bg-secondary shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
                      alt="Client" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content - bottom left */}
                <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Collaboration</p>
                  <p className="text-lg md:text-xl font-display max-w-xs mb-12">
                    I prioritize client collaboration, fostering open communication
                  </p>
                </div>
                
                {/* Book a call - absolute bottom left */}
                <a 
                  href="#contact" 
                  className="absolute bottom-6 left-8 z-20 inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                >
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </HoverScale>
          </StaggerItem>

          {/* Experience card */}
          <StaggerItem>
            <HoverScale>
              <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 p-6 hover:border-border/60 transition-all duration-500 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">The Inside Scoop</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Currently building scalable SaaS applications and helping startups bring their vision to life.
                </p>
                
                {/* Browser mockup - built with code */}
                <div className="mt-auto -mx-6 -mb-6">
                  <div className="bg-card/80 rounded-t-xl border border-border/30 mx-4">
                    {/* Browser header */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-border/20">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="bg-secondary/50 rounded-md px-3 py-0.5 text-[10px] text-muted-foreground flex items-center gap-1">
                          <span className="opacity-60">🔒</span>
                          mywebsite.io
                        </div>
                      </div>
                    </div>
                    {/* Browser content */}
                    <div className="p-4 text-center bg-gradient-to-b from-card/50 to-secondary/30 rounded-b-xl">
                      <p className="text-sm font-display text-foreground mb-0.5">Websites that</p>
                      <p className="text-base font-serif italic text-primary">Impact.</p>
                      <div className="flex justify-center gap-2 mt-3">
                        <span className="px-3 py-1 text-[10px] bg-foreground text-background rounded-full flex items-center gap-1">
                          Start <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                        <span className="px-3 py-1 text-[10px] border border-border/50 rounded-full text-muted-foreground">
                          Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
